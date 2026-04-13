import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0 & 1: Replace block.children[0] with content detection
  // The block structure indicates a single rich text field.
  // We expect the first (and only) child of the block to contain the text.
  const textContentWrapper = [...block.children].find(row => row.querySelector('div'));

  if (textContentWrapper) {
    const textCell = textContentWrapper.querySelector('div');
    if (textCell) {
      const textDiv = document.createElement('div');
      // Check 1: Use class name from ORIGINAL HTML
      textDiv.classList.add('cmp-text');
      moveInstrumentation(textCell, textDiv);
      while (textCell.firstChild) {
        textDiv.append(textCell.firstChild);
      }
      block.textContent = '';
      block.append(textDiv);
    }
  }
  // Check 2: No interactive elements found in ORIGINAL HTML, so no event listeners needed.
}
