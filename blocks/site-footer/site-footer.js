import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Set attributes for the block element itself, which corresponds to the <footer>
  block.id = 'site-footer';
  block.classList.add('footer-site-footer');
  block.setAttribute('role', 'contentinfo');

  // The block is expected to have one row and one cell containing the rich text
  const row = block.children[0];
  const cell = row?.children[0];

  if (cell) {
    const designCreditDiv = document.createElement('div');
    designCreditDiv.classList.add('footer-design-credit');

    // Move instrumentation from the original cell to the new wrapper div
    moveInstrumentation(cell, designCreditDiv);

    // Append all content from the cell directly into the new div
    // The rich text content (span, a tags) will be preserved with their classes
    while (cell.firstElementChild) {
      designCreditDiv.append(cell.firstElementChild);
    }

    // Clear the original block content and append the new structure
    block.textContent = '';
    block.append(designCreditDiv);
  }
}
