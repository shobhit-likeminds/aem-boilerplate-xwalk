import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  [...block.children].forEach((row) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'rsCards-koi-rscard-padding');
    moveInstrumentation(row, colDiv);

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'rsCards-rs-card');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    // Assuming the order of cells is image, link, title, description based on model
    const [imageCell, linkCell, titleCell, descriptionCell] = [...row.children];

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardDiv.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('w-100', 'rsCards-kitchens-image');
      }
    }

    // Link
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      const linkEl = document.createElement('a');
      linkEl.href = foundLink.href;
      linkEl.setAttribute('aria-label', foundLink.getAttribute('aria-label'));
      linkEl.target = foundLink.target;
      // The original HTML shows the link wrapping an image, not just text.
      // We need to preserve the content of the link cell, which might be an image.
      moveInstrumentation(linkCell, linkEl);
      while (linkCell.firstChild) linkEl.append(linkCell.firstChild);
      cardBodyDiv.append(linkEl);
    }

    // Title
    const titleEl = document.createElement('h5');
    titleEl.classList.add('rsCards-blog-card-title');
    moveInstrumentation(titleCell, titleEl);
    while (titleCell.firstChild) titleEl.append(titleCell.firstChild);
    cardBodyDiv.append(titleEl);

    // Description
    // The original HTML shows the description wrapped in a <p> inside an <h5>.
    // The model defines it as richtext. Let's create an h5 and append the content.
    const descriptionEl = document.createElement('h5');
    descriptionEl.classList.add('card-title'); // Class name from original HTML
    moveInstrumentation(descriptionCell, descriptionEl);
    while (descriptionCell.firstChild) descriptionEl.append(descriptionCell.firstChild);
    cardBodyDiv.append(descriptionEl);

    cardDiv.append(cardBodyDiv);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  block.textContent = '';
  block.append(rowDiv);

  // The 'rsCards-tab-para' div is present in the original HTML as a sibling to the 'row' div,
  // but it's not part of the model structure. It seems to be a static element.
  // The current JS appends it to rowDiv, which is incorrect based on the original HTML structure.
  // It should be a direct child of the main block div, after the row div.
  // However, the block.children loop only processes model items.
  // If 'rsCards-tab-para' is not part of the model, it should be handled outside the loop,
  // or if it's a fixed element that always appears, it should be created after the rowDiv.
  // Given it's an empty div, it's likely a placeholder or for styling.
  // For now, let's assume it's a static element that should be a direct child of the block,
  // after the generated row.
  const tabParaDiv = document.createElement('div');
  tabParaDiv.classList.add('rsCards-tab-para');
  block.append(tabParaDiv);
}
