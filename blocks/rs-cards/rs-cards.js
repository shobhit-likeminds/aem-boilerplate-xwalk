import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rsCardsRow = document.createElement('div');
  rsCardsRow.classList.add('rsCards-row');

  [...block.children].forEach((row) => {
    const col = document.createElement('div');
    col.classList.add('rsCards-col-xl-4', 'rsCards-col-lg-6', 'rsCards-pb-md-0', 'rsCards-pb-4', 'rsCards-row-gap-4', 'rsCards-koi-rscard-padding');
    moveInstrumentation(row, col);

    const card = document.createElement('div');
    card.classList.add('rsCards-card', 'rsCards-rs-card');
    col.append(card);

    const cardBody = document.createElement('div');
    cardBody.classList.add('rsCards-card-body');

    // Assuming the order of cells is: image, title, description, icon, link
    const cells = [...row.children];

    // Image
    const imageCell = cells[0];
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        // Create a new img element and copy attributes
        const newImg = document.createElement('img');
        newImg.loading = 'lazy';
        newImg.classList.add('rsCards-w-100', 'rsCards-kitchens-image');
        newImg.alt = img.alt;
        newImg.src = img.src;
        newImg.style.display = 'block'; // As per original HTML

        // The original HTML has two img elements, one with display:none and one with display:block.
        // We will create the 'display:block' one and optimize it.
        const optimizedPic = createOptimizedPicture(newImg.src, newImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        card.append(optimizedPic);
      }
    }

    // Icon and Link (combined in original HTML, icon is inside link)
    const iconCell = cells[3];
    const linkCell = cells[4];

    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      const linkEl = document.createElement('a');
      linkEl.classList.add('rsCards-explore-btn'); // Added a class for styling if needed, not explicitly in original
      linkEl.href = foundLink.href;
      linkEl.setAttribute('aria-label', foundLink.getAttribute('aria-label'));
      linkEl.target = foundLink.target;
      moveInstrumentation(foundLink, linkEl);

      const foundIcon = iconCell.querySelector('picture') || iconCell.querySelector('img');
      if (foundIcon) {
        const iconImg = document.createElement('img');
        iconImg.loading = 'lazy';
        iconImg.src = foundIcon.src;
        iconImg.alt = foundIcon.alt || '';
        moveInstrumentation(foundIcon, iconImg);
        linkEl.append(iconImg);
      }
      cardBody.append(linkEl);
    }


    // Title
    const titleCell = cells[1];
    if (titleCell) {
      const h5Title = document.createElement('h5');
      h5Title.classList.add('rsCards-blog-card-title');
      h5Title.style.display = 'block'; // As per original HTML
      moveInstrumentation(titleCell, h5Title);
      while (titleCell.firstChild) h5Title.append(titleCell.firstChild);
      cardBody.append(h5Title);
    }

    // Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const h5Description = document.createElement('h5');
      h5Description.classList.add('rsCards-card-title');
      moveInstrumentation(descriptionCell, h5Description);
      while (descriptionCell.firstChild) h5Description.append(descriptionCell.firstChild);
      cardBody.append(h5Description);
    }

    card.append(cardBody);
    rsCardsRow.append(col);
  });

  block.textContent = '';
  block.classList.add('rsCards-rs-cards');
  block.append(rsCardsRow);

  // The original HTML structure already has optimized images.
  // The initial image handling in the loop creates optimized pictures.
  // This block-level image optimization is redundant and can be removed
  // or adjusted if there are other images outside the card structure.
  // For now, assuming the cards are the primary image source, this is removed.
}
