import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const contentRow = block.children[0];
  const contentCell = contentRow.children[0];

  moveInstrumentation(contentRow, block);
  moveInstrumentation(contentCell, block);

  // Apply classes from original HTML to the block itself
  block.classList.add('text-component');

  // Move all content from the cell directly into the block
  while (contentCell.firstChild) {
    const child = contentCell.firstChild;
    // Apply heading class if it's an h1
    if (child.tagName === 'H1') {
      child.classList.add('text-component-heading');
    }
    block.append(child);
  }

  // Remove the original row and cell
  contentRow.remove();

  // Image optimization (if any images were present in the richtext)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
