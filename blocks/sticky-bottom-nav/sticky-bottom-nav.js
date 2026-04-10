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

    // Use content detection instead of fragile index access
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')); // Assuming label is the remaining cell

    const anchor = document.createElement('a');
    anchor.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');

    const foundLink = linkCell ? linkCell.querySelector('a') : null;
    if (foundLink) {
      anchor.href = foundLink.href;
      // Copy data attributes from the original link if present
      [...foundLink.attributes].forEach(attr => {
        if (attr.name.startsWith('data-')) {
          anchor.setAttribute(attr.name, attr.value);
        }
      });
    }

    if (iconCell) {
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]); // Assuming a small icon size
          const optimizedImg = optimizedPic.querySelector('img');
          optimizedImg.classList.add('sticky-bottom-nav__icon');
          moveInstrumentation(img, optimizedImg);
          anchor.append(optimizedPic);
        }
      }
    }

    const span = document.createElement('span');
    span.classList.add('sticky-bottom-nav__label');
    span.textContent = labelCell ? labelCell.textContent.trim() : '';
    anchor.append(span);

    li.append(anchor);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
