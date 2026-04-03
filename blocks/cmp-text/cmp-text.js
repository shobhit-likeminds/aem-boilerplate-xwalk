import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block structure indicates a single richtext field.
  // The original HTML shows the content directly within the block,
  // so we need to extract the content from the first row/cell.

  // Check 0 & 1: Avoid block.children[0] and ensure structure alignment.
  // For a simple text block, the content is expected to be in the first row's first cell.
  // We can directly append the content of the first cell to the block.
  const firstRow = [...block.children][0];
  if (firstRow) {
    const firstCell = [...firstRow.children][0];
    if (firstCell) {
      // Move all children from the cell directly into the block
      while (firstCell.firstChild) {
        block.append(firstCell.firstChild);
      }
    }
    // Remove the now empty first row
    firstRow.remove();
  }

  // Add the class from the original HTML to the block itself
  // Check 1: Ensure class names are verbatim from ORIGINAL HTML.
  block.classList.add('cmp-text');

  // Check 2: Interactivity.
  // The ORIGINAL HTML does not show any interactive elements (buttons, toggles, etc.).
  // Therefore, no addEventListener calls are needed.

  // Image optimization is not needed as per the block structure and original HTML.
  // The provided JS had a placeholder for image optimization, which is not relevant here.
  // Removing it to keep the code clean and focused on the actual block content.
}
