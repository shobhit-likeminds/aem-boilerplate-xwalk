import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rscardsRow = document.createElement('div');
  rscardsRow.classList.add('rscards-row');

  [...block.children].forEach((row) => {
    const rscardsCol = document.createElement('div');
    moveInstrumentation(row, rscardsCol);
    rscardsCol.classList.add(
      'rscards-col-xl-4',
      'rscards-col-lg-6',
      'rscards-pb-md-0',
      'rscards-pb-4',
      'rscards-row-gap-4',
      'rscards-koi-rscard-padding',
    );

    const rscardsCard = document.createElement('div');
    rscardsCard.classList.add('rscards-card');

    const rscardsCardBody = document.createElement('div');
    rscardsCardBody.classList.add('rscards-card-body');

    // BlockJson defines 3 fields: image, title, description
    // Read cells by index as per BlockJson model, then apply content detection for specific elements
    const cells = [...row.children];

    // Cell 0: Image
    const imageCell = cells[0];
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.classList.add('rscards-w-100', 'rscards-kitchens-image');
        rscardsCard.append(newImg);
      }
    }

    // Cell 1: Title
    const titleCell = cells[1];
    if (titleCell) {
      const titleEl = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (titleEl) {
        const newTitle = document.createElement('h5');
        newTitle.classList.add('rscards-blog-card-title');
        moveInstrumentation(titleEl, newTitle);
        while (titleEl.firstChild) newTitle.append(titleEl.firstChild);
        rscardsCardBody.append(newTitle);
      }
    }

    // Cell 2: Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const pEl = descriptionCell.querySelector('p');
      if (pEl) {
        const newDescriptionWrapper = document.createElement('h5'); // Original HTML uses h5 for description wrapper
        newDescriptionWrapper.classList.add('rscards-card-title'); // Class for the h5 wrapper
        moveInstrumentation(pEl, newDescriptionWrapper);
        while (pEl.firstChild) newDescriptionWrapper.append(pEl.firstChild);
        rscardsCardBody.append(newDescriptionWrapper);
      }
    }

    rscardsCard.append(rscardsCardBody);
    rscardsCol.append(rscardsCard);
    rscardsRow.append(rscardsCol);
  });

  rscardsRow.querySelectorAll('img').forEach((img) => {
    // The original HTML uses <img> directly, not <picture>.
    // createOptimizedPicture expects a picture element or an img src.
    // We create a picture element around the img for optimization.
    const picture = document.createElement('picture');
    img.before(picture);
    picture.append(img);

    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    picture.replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.classList.add('rscards-container');
  block.append(rscardsRow);
}
