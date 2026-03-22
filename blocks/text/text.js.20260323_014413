import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [contentRow] = [...block.children];

  if (contentRow) {
    const contentCell = contentRow.firstElementChild;
    if (contentCell) {
      moveInstrumentation(contentRow, contentCell);
      block.innerHTML = '';
      block.classList.add('text-text'); // Corrected class name prefix
      block.append(contentCell);
    }
  }

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}

