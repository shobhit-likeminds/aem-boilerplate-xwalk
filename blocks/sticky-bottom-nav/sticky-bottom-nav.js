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
    const navLinkCell = cells.find(cell => cell.querySelector('a'));
    const iconAltCell = cells.find(cell => cell !== iconCell && cell !== navLinkCell && !cell.querySelector('a') && !cell.querySelector('picture'));
    const navLinkLabelCell = cells.find(cell => cell !== iconCell && cell !== navLinkCell && cell !== iconAltCell);

    const navLink = document.createElement('a');
    navLink.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');

    const foundLink = navLinkCell.querySelector('a');
    if (foundLink) {
      navLink.href = foundLink.href;
      // Copy data attributes from the original HTML
      if (foundLink.dataset.consent) navLink.dataset.consent = foundLink.dataset.consent;
      if (foundLink.dataset.link) navLink.dataset.link = foundLink.dataset.link;
    }

    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, iconAltCell.textContent.trim(), false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        optimizedImg.classList.add('sticky-bottom-nav__icon');
        moveInstrumentation(img, optimizedImg);
        navLink.append(optimizedPic);
      }
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('sticky-bottom-nav__label');
    labelSpan.textContent = navLinkLabelCell.textContent.trim();
    navLink.append(labelSpan);

    li.append(navLink);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
