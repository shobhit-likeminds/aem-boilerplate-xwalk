import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerElement = document.createElement('footer');
  moveInstrumentation(block, footerElement);

  // The block has only one field: "content" (richtext)
  // This content is expected to be in the first row, first cell.
  const contentRow = block.children[0];
  if (contentRow) {
    const contentCell = contentRow.querySelector('div');
    if (contentCell) {
      moveInstrumentation(contentRow, contentCell);
      // Append all children from the contentCell directly to the footerElement.
      // This will correctly transfer paragraphs, links, and any other rich text elements.
      while (contentCell.firstChild) {
        footerElement.append(contentCell.firstChild);
      }
    }
  }

  // Clear the original block content and append the new footer structure.
  block.textContent = '';
  block.append(footerElement);
}
