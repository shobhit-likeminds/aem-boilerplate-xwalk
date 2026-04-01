import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use content detection instead of direct index access
  const cells = [...block.children].map((row) => [...row.children]);
  const linkCell = cells.find((c) => c[0].querySelector('a'))?.[0];
  const textCell = cells.find((c) => !c[0].querySelector('a'))?.[0];

  const anchor = document.createElement('a');
  if (linkCell) {
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      if (foundLink.id) {
        anchor.id = foundLink.id; // Copy ID if present
      }
      if (foundLink.getAttribute('data-request')) {
        anchor.setAttribute('data-request', foundLink.getAttribute('data-request'));
      }
    }
  }

  anchor.classList.add('cmp-button');
  anchor.tabIndex = 0;

  const span = document.createElement('span');
  span.classList.add('cmp-button__text');

  if (textCell) {
    moveInstrumentation(textCell, span);
    while (textCell.firstChild) {
      span.append(textCell.firstChild);
    }
  }

  anchor.append(span);

  block.textContent = '';
  block.append(anchor);

  // Add classes from the original block wrapper
  block.classList.add('cmp-button--primary-anchor');
}
