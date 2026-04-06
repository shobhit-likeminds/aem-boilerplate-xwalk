import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block directly contains the rich text content.
  // We just need to ensure the class 'cmp-text' is on the block itself.
  // The content is already structured as it should be.
  // No need to create new elements or restructure, just move instrumentation.

  // The block is expected to have one row, which contains one cell with the rich text.
  // We need to find this cell and move its content directly into the block.
  const textCell = block.firstElementChild?.firstElementChild; // Access the first row's first cell
  if (textCell) {
    // Move instrumentation from the original row to the block if it exists
    const textRow = block.firstElementChild;
    if (textRow) {
      moveInstrumentation(textRow, block);
    }

    // Move all children from the textCell directly into the block
    while (textCell.firstChild) {
      block.append(textCell.firstChild);
    }
  }

  // Remove any empty rows that might be left after moving content
  // This handles the case where block.firstElementChild might be the row we just emptied
  while (block.firstElementChild && block.firstElementChild.children.length === 0) {
    block.firstElementChild.remove();
  }

  // Optimize any images that might be within the rich text.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
