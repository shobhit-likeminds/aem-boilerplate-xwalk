import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('whyus-container', 'whyus-responsivegrid');

  const cmpContainer = document.createElement('div');
  cmpContainer.classList.add('whyus-cmp-container');

  const rsCards = document.createElement('div');
  rsCards.classList.add('whyus-rs-cards');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('whyus-row');

  [...block.children].forEach((row) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('whyus-col-xl-4', 'whyus-col-lg-6', 'whyus-pb-md-0', 'whyus-pb-4', 'whyus-row-gap-4', 'whyus-koi-rscard-padding');
    moveInstrumentation(row, colDiv);

    const card = document.createElement('div');
    card.classList.add('whyus-card', 'whyus-rs-card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('whyus-card-body');

    let pictureEl = null;
    let titleEl = null;
    let descriptionEl = null;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        pictureEl = cell.querySelector('picture');
      } else if (cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        titleEl = cell.querySelector('h1, h2, h3, h4, h5, h6');
      } else if (cell.querySelector('p')) {
        descriptionEl = cell.querySelector('p');
      } else {
        // Fallback for cases where title might be just text in a cell
        if (!titleEl && cell.textContent.trim() !== '') {
          const h5 = document.createElement('h5');
          h5.classList.add('whyus-blog-card-title');
          h5.textContent = cell.textContent.trim();
          titleEl = h5;
        }
      }
    });

    if (pictureEl) {
      const img = pictureEl.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        pictureEl.replaceWith(optimizedPic);
        optimizedPic.classList.add('whyus-w-100', 'whyus-kitchens-image');
        card.append(optimizedPic);
      }
    }

    if (titleEl) {
      const h5 = document.createElement('h5');
      h5.classList.add('whyus-blog-card-title');
      moveInstrumentation(titleEl, h5);
      while (titleEl.firstChild) h5.append(titleEl.firstChild);
      cardBody.append(h5);
    }

    if (descriptionEl) {
      const h5 = document.createElement('h5');
      h5.classList.add('whyus-card-title');
      moveInstrumentation(descriptionEl, h5);
      while (descriptionEl.firstChild) h5.append(descriptionEl.firstChild);
      cardBody.append(h5);
    }

    card.append(cardBody);
    colDiv.append(card);
    rowDiv.append(colDiv);
  });

  rsCards.append(rowDiv);
  cmpContainer.append(rsCards);
  block.textContent = '';
  block.append(cmpContainer);
}
