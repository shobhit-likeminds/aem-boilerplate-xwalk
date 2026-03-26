import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textRow = block.children[0];
  const textCell = textRow.firstElementChild;

  if (textCell) {
    // The block itself already has the 'cmp-text' class.
    // No need to create a new wrapper div if the original structure is just the text content.
    // We just move the content directly into the block.
    moveInstrumentation(textRow, block);
    while (textCell.firstChild) {
      block.append(textCell.firstChild);
    }
  }

  // Remove the original row and cell as their content has been moved.
  textRow.remove();

  // Image optimization (if any images were present in the richtext)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
