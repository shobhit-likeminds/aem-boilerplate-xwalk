import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  [...block.children].forEach((row) => {
    const colDiv = document.createElement('div');
    moveInstrumentation(row, colDiv);
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'rs-cards-koi-rscard-padding');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'rs-cards-rs-card');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    // Initialize elements based on BlockJson model fields: image, title, description, icon
    let imageEl = null;
    let titleEl = null;
    let descriptionEl = null;
    let iconLinkEl = null;

    // The BlockJson model has 4 fields: image, title, description, icon
    // The JS should read exactly 4 cells per row, corresponding to these fields.
    // The order in the HTML/BlockJson is: image, title, description, icon.
    // However, the HTML provided shows image, then icon, then title, then description.
    // We need to adapt the cell reading to match the actual HTML structure.
    const cells = [...row.children];

    // Assuming the order in the HTML is: Image, Icon (link), Title (h5), Description (h5/p)
    // Let's re-evaluate based on the provided HTML structure:
    // Cell 0: Picture (image)
    // Cell 1: Anchor (icon)
    // Cell 2: H5 (title)
    // Cell 3: H5 (description, containing a p tag)

    if (cells[0]) { // Image
      imageEl = cells[0].querySelector('picture');
    }
    if (cells[1]) { // Icon (link)
      iconLinkEl = cells[1].querySelector('a');
    }
    if (cells[2]) { // Title (h5)
      titleEl = cells[2].querySelector('h5');
    }
    if (cells[3]) { // Description (h5 containing p)
      descriptionEl = cells[3].querySelector('h5') || cells[3].querySelector('p');
    }

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      cardDiv.append(optimizedPic);
      // The class in HTML is rs-cards-kitchens-image, not rs-cards-rightshift-image
      optimizedPic.classList.add('w-100', 'rs-cards-kitchens-image');
    }

    if (iconLinkEl) {
      const newIconLink = document.createElement('a');
      moveInstrumentation(iconLinkEl, newIconLink);
      newIconLink.href = iconLinkEl.href;
      if (iconLinkEl.getAttribute('aria-label')) {
        newIconLink.setAttribute('aria-label', iconLinkEl.getAttribute('aria-label'));
      }
      if (iconLinkEl.getAttribute('target')) {
        newIconLink.setAttribute('target', iconLinkEl.getAttribute('target'));
      }
      if (iconLinkEl.id) {
        newIconLink.id = iconLinkEl.id;
      }
      // The original HTML has an img inside the anchor for the icon
      while (iconLinkEl.firstChild) {
        newIconLink.append(iconLinkEl.firstChild);
      }
      cardBodyDiv.append(newIconLink);
    }

    if (titleEl) {
      const newTitle = document.createElement('h5');
      moveInstrumentation(titleEl, newTitle);
      newTitle.classList.add('rs-cards-blog-card-title');
      while (titleEl.firstChild) {
        newTitle.append(titleEl.firstChild);
      }
      cardBodyDiv.append(newTitle);
    }

    if (descriptionEl) {
      // The original HTML shows the description as an h5 containing a p tag,
      // or directly a p tag. The JS should create a p tag for the description.
      const newDescription = document.createElement('p'); // Changed from h5 to p
      moveInstrumentation(descriptionEl, newDescription);
      newDescription.classList.add('card-title'); // This class is on the h5 in HTML, but applies to the content.
      while (descriptionEl.firstChild) {
        newDescription.append(descriptionEl.firstChild);
      }
      cardBodyDiv.append(newDescription);
    }

    cardDiv.append(cardBodyDiv);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  block.textContent = '';
  block.append(rowDiv);
}
