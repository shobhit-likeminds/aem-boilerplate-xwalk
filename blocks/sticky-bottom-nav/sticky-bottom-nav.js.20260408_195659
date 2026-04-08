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

    const linkEl = document.createElement('a');
    linkEl.classList.add('sticky-bottom-nav__link', 'd-flex', 'flex-column', 'align-items-center', 'gap-1', 'analytics_cta_click');

    const cells = [...row.children];

    // According to the EDS block structure and BlockJson, the order is: Link, Icon, Label
    const linkCell = cells[0];
    const iconCell = cells[1];
    const labelCell = cells[2];

    // Process Link
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        // Add data-consent and data-link attributes from the original HTML
        if (foundLink.dataset.consent) {
          linkEl.dataset.consent = foundLink.dataset.consent;
        }
        if (foundLink.dataset.link) {
          linkEl.dataset.link = foundLink.dataset.link;
        }
      }
    }

    // Process Icon
    if (iconCell) {
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const iconImg = document.createElement('img');
          iconImg.src = img.src;
          iconImg.alt = img.alt;
          iconImg.classList.add('sticky-bottom-nav__icon');
          linkEl.append(iconImg);
          moveInstrumentation(img, iconImg); // Move instrumentation from original img to new img
        }
      }
    }

    // Process Label
    if (labelCell) {
      const labelSpan = document.createElement('span');
      labelSpan.classList.add('sticky-bottom-nav__label');
      moveInstrumentation(labelCell, labelSpan);
      while (labelCell.firstChild) labelSpan.append(labelCell.firstChild);
      linkEl.append(labelSpan);
    }

    li.append(linkEl);
    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
