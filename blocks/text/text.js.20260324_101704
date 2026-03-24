import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [contentRow] = [...block.children];

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('text-cmp-text');
  moveInstrumentation(contentRow, contentDiv);

  // Append all children from the original content cell to the new contentDiv
  while (contentRow.firstElementChild) {
    const cell = contentRow.firstElementChild;
    moveInstrumentation(cell, contentDiv);
    while (cell.firstChild) {
      contentDiv.append(cell.firstChild);
    }
  }

  block.textContent = '';
  block.append(contentDiv);

  // Image optimization (if any images are present in the rich text)
  contentDiv.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
