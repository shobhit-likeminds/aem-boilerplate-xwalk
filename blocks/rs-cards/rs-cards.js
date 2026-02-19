import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rscardsContainer = document.createElement('div');
  rscardsContainer.classList.add('rscards-container');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  rscardsContainer.append(rowDiv);

  [...block.children].forEach((row) => {
    const colDiv = document.createElement('div');
    moveInstrumentation(row, colDiv);
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'rscards-koi-rscard-padding');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('rscards-card', 'rscards-rs-card');
    colDiv.append(cardDiv);

    const cells = [...row.children];

    // Image
    const imgCell = cells[0]; // Assuming the first cell contains the image
    if (imgCell) {
      const img = imgCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        // The HTML has two images, one with display: none and one with display: block.
        // We'll use the one that is currently displayed (or the second one if both are present).
        const displayedImg = imgCell.querySelector('img[style*="display: block"]') || imgCell.querySelector('img:not([style*="display: none"])');
        if (displayedImg) {
          const optimizedDisplayedPic = createOptimizedPicture(displayedImg.src, displayedImg.alt);
          moveInstrumentation(displayedImg, optimizedDisplayedPic.querySelector('img'));
          optimizedDisplayedPic.querySelector('img').classList.add('w-100', 'rscards-kitchens-image');
          optimizedDisplayedPic.querySelector('img').setAttribute('loading', 'lazy');
          cardDiv.append(optimizedDisplayedPic);
        }
      }
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('rscards-card-body');
    cardDiv.append(cardBody);

    // Title (h5 with class rscards-blog-card-title)
    const titleCell = cells[1]; // Assuming the second cell contains the title
    if (titleCell) {
      const titleElement = titleCell.querySelector('h5.rscards-blog-card-title');
      if (titleElement) {
        const newTitle = document.createElement('h5');
        newTitle.classList.add('rscards-blog-card-title');
        newTitle.textContent = titleElement.textContent;
        cardBody.append(newTitle);
      }
    }

    // Description (h5 with class rscards-card-title containing a p tag)
    const descriptionCell = cells[2]; // Assuming the third cell contains the description
    if (descriptionCell) {
      const descriptionElement = descriptionCell.querySelector('h5.rscards-card-title p');
      if (descriptionElement) {
        const newDescriptionH5 = document.createElement('h5');
        newDescriptionH5.classList.add('rscards-card-title');
        const newDescriptionP = document.createElement('p');
        newDescriptionP.innerHTML = descriptionElement.innerHTML; // Keep inner HTML for rich text
        newDescriptionH5.append(newDescriptionP);
        cardBody.append(newDescriptionH5);
      }
    }

    rowDiv.append(colDiv);
  });

  block.textContent = '';
  block.append(rscardsContainer);
}
