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

    // Use content detection instead of index access
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    // linkLabelCell is not directly used for content, but its presence is implied by the structure
    // const linkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim().startsWith('https://')); // This is a guess, better to rely on order if it's consistent
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell !== linkCell); // Assuming label is the remaining text cell

    const anchor = document.createElement('a');
    anchor.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');

    const foundLink = linkCell ? linkCell.querySelector('a') : null;
    if (foundLink) {
      anchor.href = foundLink.href;
      // Copy data attributes from the original link if present, e.g., data-consent, data-link
      if (foundLink.dataset.consent) anchor.dataset.consent = foundLink.dataset.consent;
      if (foundLink.dataset.link) anchor.dataset.link = foundLink.dataset.link;
    }

    const iconPicture = iconCell ? iconCell.querySelector('picture') : null;
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const icon = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]); // Assuming a small icon size
        icon.querySelector('img').classList.add('sticky-bottom-nav__icon');
        moveInstrumentation(img, icon.querySelector('img'));
        anchor.append(icon);
      }
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('sticky-bottom-nav__label');
    labelSpan.textContent = labelCell ? labelCell.textContent.trim() : '';
    anchor.append(labelSpan);

    li.append(anchor);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
