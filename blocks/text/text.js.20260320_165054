import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const contentRow = block.children[0];
  const contentCell = contentRow.firstElementChild;

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-cmp-text');
  moveInstrumentation(contentCell, textContainer);

  while (contentCell.firstChild) {
    textContainer.append(contentCell.firstChild);
  }

  block.textContent = '';
  block.append(textContainer);

  // Image optimization (if any images are present in the richtext content)
  textContainer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
