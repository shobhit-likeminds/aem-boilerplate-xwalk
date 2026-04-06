import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Apply the main block class from the original HTML
  block.classList.add('cmp-text');

  // The block structure indicates a single richtext field as the first (and only) row.
  // We can directly process this row.
  const [textRow] = [...block.children];

  if (textRow) {
    // The content of the richtext field is directly within the first cell of the row.
    // We want to move all content from the cell directly into the block.
    const textCell = textRow.firstElementChild;
    if (textCell) {
      moveInstrumentation(textRow, block); // Move instrumentation from the row to the block
      while (textCell.firstChild) {
        block.append(textCell.firstChild);
      }
    }
  }

  // Remove the original row as its content has been moved directly to the block
  if (textRow && textRow.parentElement === block) {
    textRow.remove();
  }

  // Optimize any images that might be present in the richtext content
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
