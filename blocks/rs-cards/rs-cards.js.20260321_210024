import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rsCardsWrapper = document.createElement('div');
  rsCardsWrapper.classList.add('rs-cards-wrapper');

  const rsCardsRow = document.createElement('div');
  rsCardsRow.classList.add('rs-cards-row', 'container-row');

  [...block.children].forEach((row) => {
    const cardCol = document.createElement('div');
    moveInstrumentation(row, cardCol);
    cardCol.classList.add('rs-cards-col', 'container-col-xl-4', 'container-col-lg-6', 'container-pb-md-0', 'container-pb-4', 'container-row-gap-4', 'container-koi-rscard-padding');

    const card = document.createElement('div');
    card.classList.add('rs-cards-card', 'container-card', 'container-rs-card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('rs-cards-card-body', 'container-card-body');

    [...row.children].forEach((cell, cellIndex) => {
      if (cellIndex === 0) { // Image
        const picture = cell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            card.append(optimizedPic);
            optimizedPic.querySelector('img').classList.add('rs-cards-image', 'container-w-100', 'container-kitchens-image');
          }
        }
      } else if (cellIndex === 1) { // Heading
        const heading = document.createElement('h5');
        heading.classList.add('rs-cards-blog-card-title', 'container-blog-card-title');
        moveInstrumentation(cell, heading);
        while (cell.firstChild) heading.append(cell.firstChild);
        cardBody.append(heading);
      } else if (cellIndex === 2) { // Description
        const description = document.createElement('h5');
        description.classList.add('rs-cards-card-title', 'container-card-title');
        moveInstrumentation(cell, description);
        while (cell.firstChild) description.append(cell.firstChild);
        cardBody.append(description);
      }
    });

    card.append(cardBody);
    cardCol.append(card);
    rsCardsRow.append(cardCol);
  });

  rsCardsWrapper.append(rsCardsRow);
  block.textContent = '';
  block.append(rsCardsWrapper);
}
