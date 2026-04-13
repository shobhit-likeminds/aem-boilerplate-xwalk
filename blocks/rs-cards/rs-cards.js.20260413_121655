import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  [...block.children].forEach((row) => {
    const colDiv = document.createElement('div');
    moveInstrumentation(row, colDiv);
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'rs-card');

    let imageEl = null;
    let titleEl = null;
    let descriptionEl = null;
    let linkEl = null; // Added to capture the anchor tag

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        imageEl = cell.querySelector('picture');
      } else if (cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        titleEl = cell.querySelector('h1, h2, h3, h4, h5, h6');
      } else if (cell.querySelector('p')) {
        descriptionEl = cell.querySelector('p');
      } else if (cell.querySelector('a')) { // Capture the anchor tag
        linkEl = cell.querySelector('a');
      } else if (cell.textContent.trim()) {
        // If title is just text without heading tag
        if (!titleEl) {
          titleEl = document.createElement('h5');
          titleEl.classList.add('blog-card-title'); // This class is present in original HTML for title
          titleEl.textContent = cell.textContent.trim();
        }
      }
    });

    if (imageEl) {
      const img = imageEl.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.loading = 'lazy';
        newImg.classList.add('w-100', 'kitchens-image'); // Use 'kitchens-image' as per original HTML
        newImg.alt = img.alt;
        newImg.src = img.src;
        cardDiv.append(newImg);
      }
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    if (linkEl) { // Append the link element if found
      cardBody.append(linkEl);
    }

    if (titleEl) {
      const h5Title = document.createElement('h5');
      h5Title.classList.add('blog-card-title'); // Use 'blog-card-title' as per original HTML
      moveInstrumentation(titleEl, h5Title);
      while (titleEl.firstChild) h5Title.append(titleEl.firstChild);
      cardBody.append(h5Title);
    }

    if (descriptionEl) {
      const h5Desc = document.createElement('h5');
      h5Desc.classList.add('card-title'); // Use 'card-title' as per original HTML
      moveInstrumentation(descriptionEl, h5Desc);
      while (descriptionEl.firstChild) h5Desc.append(descriptionEl.firstChild);
      cardBody.append(h5Desc);
    }

    cardDiv.append(cardBody);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  rowDiv.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(rowDiv);
}
