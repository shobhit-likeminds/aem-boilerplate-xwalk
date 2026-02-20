import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rscardsContainer = document.createElement('div');
  rscardsContainer.classList.add('rscards-container');

  const rscardsRow = document.createElement('div');
  rscardsRow.classList.add('rscards-row');
  rscardsContainer.append(rscardsRow);

  [...block.children].forEach((row) => {
    // Each row from block.children represents one card
    const cardCol = document.createElement('div');
    moveInstrumentation(row, cardCol);
    cardCol.classList.add('rscards-col-xl-4', 'rscards-col-lg-6', 'rscards-pb-md-0', 'rscards-pb-4', 'rscards-row-gap-4', 'rscards-koi-rscard-padding');

    const rscardsCard = document.createElement('div');
    rscardsCard.classList.add('rscards-card');
    cardCol.append(rscardsCard);

    const cells = [...row.children];

    // Cell 0: Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('rscards-w-100', 'rscards-kitchens-image');
        rscardsCard.append(optimizedPic);
      }
    }

    // Card Body for Headline and Description
    const rscardsCardBody = document.createElement('div');
    rscardsCardBody.classList.add('rscards-card-body');

    // Cell 1: Headline
    const headlineCell = cells[1];
    if (headlineCell) {
      const h5BlogTitle = document.createElement('h5');
      h5BlogTitle.classList.add('rscards-blog-card-title');
      h5BlogTitle.textContent = headlineCell.textContent.trim();
      rscardsCardBody.append(h5BlogTitle);
    }

    // Cell 2: Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const h5CardTitle = document.createElement('h5');
      h5CardTitle.classList.add('rscards-card-title');
      const pDesc = document.createElement('p');
      pDesc.textContent = descriptionCell.textContent.trim();
      h5CardTitle.append(pDesc);
      rscardsCardBody.append(h5CardTitle);
    }

    rscardsCard.append(rscardsCardBody);
    rscardsRow.append(cardCol);
  });

  block.textContent = '';
  block.append(rscardsContainer);
}
