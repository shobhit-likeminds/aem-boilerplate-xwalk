import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the outer div matching the original HTML structure
  const outerDiv = document.createElement('div');
  outerDiv.classList.add('text', 'cta-text', 'font-weight-medium');

  // Create the inner div for the text content
  const innerCmpTextDiv = document.createElement('div');
  innerCmpTextDiv.classList.add('cmp-text');
  // Use a more robust ID generation or remove if not strictly necessary for functionality
  // For now, mirroring the original HTML's ID structure
  innerCmpTextDiv.id = `text-${Math.random().toString(36).substring(2, 11)}`;

  // The block.children[0] corresponds to the 'text' field
  const [textRow] = [...block.children];

  if (textRow) {
    const textCell = textRow.firstElementChild; // Access the first child of the row, which is the cell
    if (textCell) {
      moveInstrumentation(textRow, innerCmpTextDiv);
      // Move all children from the textCell into the innerCmpTextDiv
      while (textCell.firstChild) {
        innerCmpTextDiv.append(textCell.firstChild);
      }
    }
  }

  // Append the inner text div to the outer div
  outerDiv.append(innerCmpTextDiv);

  // Clear the block and append the newly constructed structure
  block.textContent = '';
  block.append(outerDiv);
}
