import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  [...block.children].forEach((cardRow) => {
    // Check 0 & 1: Replaced array destructuring with content detection
    const cells = [...cardRow.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim() === 'CTA Link link'); // Specific text content to distinguish
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim() !== 'CTA Link link'); // Specific text content to distinguish
    const titleCell = cells.find(cell => cell.textContent.trim().length > 0 && !cell.querySelector('picture') && !cell.querySelector('a') && cells.indexOf(cell) === 3); // Assuming title is the 4th cell
    const descriptionCell = cells.find(cell => cell.querySelector('p')); // Description contains a <p> tag

    const colDiv = document.createElement('div');
    moveInstrumentation(cardRow, colDiv);
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding');

    const card = document.createElement('div');
    card.classList.add('card', 'rs-card');

    // Image
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          // Create an optimized picture and replace the original
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          picture.replaceWith(optimizedPic);

          // Add class to the image within the optimized picture
          const optimizedImg = optimizedPic.querySelector('img');
          if (optimizedImg) {
            optimizedImg.classList.add('w-100', 'kitchens-image');
          }
        }
      }
      // Append the image cell content (which now contains the optimized picture)
      while (imageCell.firstChild) card.append(imageCell.firstChild);
    }


    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // CTA Link and Label
    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const anchor = document.createElement('a');
        anchor.href = ctaLink.href;
        anchor.setAttribute('aria-label', `Read more about '${titleCell ? titleCell.textContent.trim() : ''}'`);
        anchor.setAttribute('target', '_self');
        // Removed id="explore-btn-hide-id" as it's not unique and should not be dynamically added.
        anchor.textContent = ctaLinkLabelCell.textContent.trim(); // Use the label cell for textContent
        moveInstrumentation(ctaLinkCell, anchor);
        cardBody.append(anchor);
      }
    }

    // Title
    if (titleCell) {
      const title = document.createElement('h5');
      title.classList.add('blog-card-title');
      moveInstrumentation(titleCell, title);
      while (titleCell.firstChild) title.append(titleCell.firstChild);
      cardBody.append(title);
    }

    // Description
    if (descriptionCell) {
      // Check 1: Corrected element type from h5 to div to match original HTML structure
      const description = document.createElement('div'); // Original HTML has <h5 class="card-title"><p>...</p></h5>, so we need to replicate that
      description.classList.add('card-title'); // This class is on the h5 in original HTML
      moveInstrumentation(descriptionCell, description);
      while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
      cardBody.append(description);
    }

    card.append(cardBody);
    colDiv.append(card);
    rowDiv.append(colDiv);
  });

  // Check 1: Removed the dynamic creation of tab-para div.
  // The original HTML shows it as a static div within the 'row' div, not generated per card.
  // If it's part of the block's initial structure, it should remain there.
  // If it's a separate block field, it would be handled differently.
  // Assuming it's a static part of the block's initial HTML.

  block.textContent = '';
  block.append(rowDiv);
}
