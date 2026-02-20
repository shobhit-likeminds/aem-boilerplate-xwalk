import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Add the main component class to the block itself
  block.classList.add('text-component');

  // Iterate through each row of the block (each rich text entry)
  [...block.children].forEach((row) => {
    // The row contains a single cell with the rich text content
    const cell = row.firstElementChild;
    if (cell) {
      // Move instrumentation from the row to the cell if the row is just a wrapper
      // In this case, the cell itself holds the content, so we can just move content directly.
      // If the row was to be replaced by a new element, moveInstrumentation(row, newElement) would be used.
      // Here, we are just unwrapping the content from the row/cell structure.
      
      // If the cell contains an H1 with the specific class, ensure it's preserved.
      // The source HTML shows h1 elements directly inside the block, which implies
      // that the content within each cell is already the desired heading structure.
      // We just need to ensure the classes are maintained and the content is directly appended to the block.
      
      // Move all children from the cell directly to the block
      while (cell.firstElementChild) {
        block.append(cell.firstElementChild);
      }
    }
    // Remove the original row after its content has been moved
    row.remove();
  });

  // The block now directly contains the heading elements with their original classes.
  // No need to clear block.textContent = '' as we are moving children and then removing empty rows.
}