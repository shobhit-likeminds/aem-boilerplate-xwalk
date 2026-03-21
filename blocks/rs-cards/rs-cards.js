import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('rs-cards-row', 'row');

  [...block.children].forEach((row) => {
    const cardWrapper = document.createElement('div');
    moveInstrumentation(row, cardWrapper);
    cardWrapper.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'rs-cards-koi-rscard-padding');

    const card = document.createElement('div');
    card.classList.add('card', 'rs-cards-rs-card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cells = [...row.children];

    // According to BlockJson, the order is: image, title, description, icon
    // The JS should read cells in this order.
    // The current JS tries to detect content, which is good for flexibility,
    // but needs to be precise about which cell corresponds to which model field.

    let imageCell;
    let titleCell;
    let descriptionCell;
    let iconCell;

    // Assuming the cells are in the order defined in the BlockJson: image, title, description, icon
    // If the order can vary, more robust content detection is needed.
    // For now, let's map based on expected content types and order.
    if (cells[0]) { // Image
      imageCell = cells[0];
    }
    if (cells[1]) { // Title
      titleCell = cells[1];
    }
    if (cells[2]) { // Description
      descriptionCell = cells[2];
    }
    if (cells[3]) { // Icon
      iconCell = cells[3];
    }


    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const newPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, newPicture.querySelector('img'));
        newPicture.querySelector('img').classList.add('w-100', 'rs-cards-kitchens-image');
        card.append(newPicture);
      }
    }

    if (iconCell) {
      const link = iconCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        moveInstrumentation(link, newLink);
        newLink.href = link.href;
        newLink.target = link.target;
        newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
        // Removed id="explore-btn-hide-id" as IDs must be unique across the document.
        // If this ID is for styling, it should be a class.
        while (link.firstChild) newLink.append(link.firstChild);
        cardBody.append(newLink);
      }
    }

    if (titleCell) {
      const hTag = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (hTag) {
        const newHTag = document.createElement('h5');
        moveInstrumentation(hTag, newHTag);
        newHTag.classList.add('rs-cards-blog-card-title'); // Corrected prefix
        while (hTag.firstChild) newHTag.append(hTag.firstChild);
        cardBody.append(newHTag);
      }
    }

    if (descriptionCell) {
      const pTag = descriptionCell.querySelector('p');
      if (pTag) {
        const newPTag = document.createElement('p'); // Changed to p tag as per original HTML structure for description
        newPTag.classList.add('rs-cards-card-description'); // Corrected prefix and class name
        moveInstrumentation(pTag, newPTag);
        while (pTag.firstChild) newPTag.append(pTag.firstChild);
        cardBody.append(newPTag);
      } else {
        // Fallback for description if it's an H tag, though BlockJson implies richtext for description
        const hTag = descriptionCell.querySelector('h1, h2, h3, h4, h5, h6');
        if (hTag) {
          const newHTag = document.createElement('h5');
          newHTag.classList.add('rs-cards-card-description'); // Corrected prefix and class name
          moveInstrumentation(hTag, newHTag);
          while (hTag.firstChild) newHTag.append(hTag.firstChild);
          cardBody.append(newHTag);
        }
      }
    }

    card.append(cardBody);
    cardWrapper.append(card);
    container.append(cardWrapper);
  });

  const tabPara = document.createElement('div');
  tabPara.classList.add('rs-cards-tab-para'); // Corrected prefix
  container.append(tabPara);

  block.textContent = '';
  block.append(container);
}
