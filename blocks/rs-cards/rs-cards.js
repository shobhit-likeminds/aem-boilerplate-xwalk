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

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    let imageEl = null;
    let titleEl = null;
    let descriptionEl = null;
    let linkEl = null; // To capture the link if present in the original HTML

    // Find cells based on their content type as per BlockJson and EDS structure
    const cells = [...row.children];
    imageEl = cells[0]?.querySelector('picture'); // First cell is image
    titleEl = cells[1]; // Second cell is title
    descriptionEl = cells[2]; // Third cell is description

    // Check for an anchor tag within the description cell or any other cell if it exists
    // based on original HTML, it's inside card-body, but not explicitly in a cell in the block structure
    // We'll look for it after the main elements are processed.

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const newImg = document.createElement('img');
      newImg.classList.add('w-100', 'kitchens-image'); // Using kitchens-image as per original HTML
      newImg.src = img.src;
      newImg.alt = img.alt;
      newImg.loading = 'lazy';
      newImg.style.display = 'block'; // Ensure it's visible if it's the main image

      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      cardDiv.append(optimizedPic); // Append the optimized picture directly
    }

    if (titleEl) {
      const h5Title = document.createElement('h5');
      h5Title.classList.add('blog-card-title'); // Using blog-card-title as per original HTML
      h5Title.style.display = 'block';
      moveInstrumentation(titleEl, h5Title);
      while (titleEl.firstChild) h5Title.append(titleEl.firstChild);
      cardBodyDiv.append(h5Title);
    }

    if (descriptionEl) {
      const h5Description = document.createElement('h5');
      h5Description.classList.add('card-title'); // Using card-title as per original HTML
      moveInstrumentation(descriptionEl, h5Description);
      while (descriptionEl.firstChild) h5Description.append(descriptionEl.firstChild);
      cardBodyDiv.append(h5Description);
    }

    // Check for the interactive link from the original HTML
    const originalLink = row.querySelector('a[id="explore-btn-hide-id"]');
    if (originalLink) {
      linkEl = originalLink.cloneNode(true); // Clone to avoid moving it from original row
      linkEl.style.display = 'block'; // Ensure it's visible if it's meant to be
      cardBodyDiv.prepend(linkEl); // Prepend it before the title as in original HTML
      linkEl.addEventListener('click', (e) => {
        // Add any specific interactive behavior here if needed
        // For now, it just follows the link.
        console.log('Link clicked:', linkEl.href);
      });
    }


    cardDiv.append(cardBodyDiv);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  block.textContent = '';
  block.append(rowDiv);
}
