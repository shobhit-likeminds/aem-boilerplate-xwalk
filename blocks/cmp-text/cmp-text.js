import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block structure indicates a single richtext field.
  // The original HTML shows the content directly inside the block with class 'cmp-text'.
  // The EDS block structure shows the richtext content wrapped in a div (row) and another div (cell).

  // Find the row containing the text content.
  // Based on the EDS Block Structure, the first child of the block is the row.
  const textRow = [...block.children].find(row => row.firstElementChild);

  if (textRow) {
    // The text content is inside the first cell of this row.
    const textCell = textRow.firstElementChild;

    if (textCell) {
      // Move all children from the textCell directly into the block.
      // The instrumentation should already be on the block itself, or will be added by Franklin.
      // No need to move instrumentation from the row to the block here, as the row is being removed.
      while (textCell.firstChild) {
        block.append(textCell.firstChild);
      }
    }
    // Remove the original row from the block, as its content has been moved.
    textRow.remove();
  }

  // Optimize any pictures that might be present (though not expected for this specific block,
  // it's good practice for general EDS blocks).
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
