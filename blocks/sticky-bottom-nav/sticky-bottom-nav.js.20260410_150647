import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('position-fixed', 'bottom-0', 'p-3', 'd-flex', 'align-items-center', 'boing-container', 'bg-boing-primary');

  const ul = document.createElement('ul');
  ul.classList.add('sticky-bottom-nav__list', 'd-flex', 'justify-content-around', 'align-items-center', 'flex-grow-1');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('sticky-bottom-nav__item', 'position-relative');

    // Use content detection instead of direct index access
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    // Assuming altTextCell and linkLabelCell are the remaining text cells
    const textCells = cells.filter(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
    const altTextCell = textCells[0]; // Assuming order is consistent: alt text then link label
    const linkLabelCell = textCells[1];

    const anchor = document.createElement('a');
    anchor.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');

    const foundLink = linkCell ? linkCell.querySelector('a') : null;
    if (foundLink) {
      anchor.href = foundLink.href;
      // Copy data attributes from the original link if they exist
      if (foundLink.dataset.consent) anchor.dataset.consent = foundLink.dataset.consent;
      if (foundLink.dataset.link) anchor.dataset.link = foundLink.dataset.link;
    }

    if (iconCell) {
      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        if (img) {
          const iconImg = document.createElement('img');
          iconImg.classList.add('sticky-bottom-nav__icon');
          iconImg.src = img.src;
          iconImg.alt = altTextCell ? altTextCell.textContent.trim() : '';
          anchor.append(iconImg);
        }
      }
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('sticky-bottom-nav__label');
    labelSpan.textContent = linkLabelCell ? linkLabelCell.textContent.trim() : '';
    anchor.append(labelSpan);

    li.append(anchor);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    // The original HTML uses webp images, so we should optimize for that if possible.
    // The width is not explicitly defined in the original HTML, but a reasonable default can be applied.
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]); // Assuming a small icon size
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
