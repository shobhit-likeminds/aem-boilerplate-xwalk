import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block itself should have the class 'text-cmp-text' from ORIGINAL HTML
  block.classList.add('text-cmp-text'); 

  // block.children[0] contains the 'content' richtext field
  const contentRow = block.children[0];
  const contentCell = contentRow.children[0];

  // The content should be moved directly into the block, not into an extra div,
  // as the original HTML shows the content directly inside the block.
  moveInstrumentation(contentRow, block);
  while (contentCell.firstChild) {
    block.append(contentCell.firstChild);
  }

  // Clear the original block content (which was the row div)
  // and then append the processed content.
  // The previous code was clearing block.textContent and then appending textContainer,
  // but the original HTML shows the content directly in the block.
  // So, we just move the content directly into the block.
  // The initial block.textContent = '' is not needed if we are moving children directly.
  // However, if we want to ensure the block only contains the content from contentCell,
  // we should clear it first.
  block.innerHTML = ''; // Clear existing content to ensure only processed content remains.
  while (contentCell.firstChild) {
    block.append(contentCell.firstChild);
  }
}
