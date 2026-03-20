import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('rscards-rsCards');

  const rowContainer = document.createElement('div');
  rowContainer.classList.add('rscards-row');

  [...block.children].forEach((row) => {
    const cardCol = document.createElement('div');
    cardCol.classList.add(
      'rscards-col-xl-4',
      'rscards-col-lg-6',
      'rscards-pb-md-0',
      'rscards-pb-4',
      'rscards-row-gap-4',
      'rscards-rsCards-koi-rscard-padding',
    );
    moveInstrumentation(row, cardCol);

    const card = document.createElement('div');
    card.classList.add('rscards-card', 'rscards-rsCards-rs-card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('rscards-card-body');

    // Destructure cells based on the rsCardItem model: image, title, description, icon
    const cells = [...row.children];
    const imageCell = cells[0];
    const titleCell = cells[1];
    const descriptionCell = cells[2];
    const iconCell = cells[3];

    let imageEl = null;
    let titleEl = null;
    let descriptionEl = null;
    let iconEl = null;

    if (imageCell) {
      imageEl = imageCell.querySelector('picture');
    }
    if (titleCell) {
      titleEl = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
    }
    if (descriptionCell) {
      descriptionEl = descriptionCell; // The description is the cell itself
    }
    if (iconCell) {
      iconEl = iconCell.querySelector('a');
    }

    if (imageEl) {
      const newPicture = createOptimizedPicture(
        imageEl.querySelector('img').src,
        imageEl.querySelector('img').alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(imageEl, newPicture.querySelector('img'));
      card.append(newPicture);
    }

    if (iconEl) {
      const newIconLink = document.createElement('a');
      newIconLink.classList.add('rscards-rsCards-explore-btn'); // Add a class for styling if needed
      newIconLink.href = iconEl.href;
      newIconLink.setAttribute('aria-label', iconEl.getAttribute('aria-label'));
      newIconLink.target = iconEl.target;
      moveInstrumentation(iconEl, newIconLink);
      while (iconEl.firstChild) newIconLink.append(iconEl.firstChild);
      cardBody.append(newIconLink);
    }

    if (titleEl) {
      const newTitle = document.createElement('h5');
      newTitle.classList.add('rscards-rsCards-blog-card-title');
      moveInstrumentation(titleEl, newTitle);
      while (titleEl.firstChild) newTitle.append(titleEl.firstChild);
      cardBody.append(newTitle);
    }

    if (descriptionEl) {
      const newDescription = document.createElement('h5');
      newDescription.classList.add('rscards-card-title');
      moveInstrumentation(descriptionEl, newDescription);
      while (descriptionEl.firstChild) newDescription.append(descriptionEl.firstChild);
      cardBody.append(newDescription);
    }

    card.append(cardBody);
    cardCol.append(card);
    rowContainer.append(cardCol);
  });

  block.textContent = '';
  block.append(rowContainer);
}
