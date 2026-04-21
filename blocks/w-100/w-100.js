import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block has no defined model fields or item components in BlockJson.
  // The original HTML only contains the block container with some classes and an empty style.
  // Therefore, the decorate function should primarily ensure these classes are present
  // and handle any potential content if the model were to evolve.

  // Add classes from the original HTML if they are not already present.
  // The block already has 'w-100' from the block name.
  block.classList.add('pt-3', 'pt-sm-3');

  // The original HTML had `style="background: ;"`.
  // If there's no authored background property, setting it to an empty string is fine.
  // However, if the block is truly empty and has no content to process,
  // this line might be redundant if the CSS handles default backgrounds.
  // For now, we'll keep it as it reflects the original HTML's style attribute.
  block.style.background = '';

  // Since BlockJson indicates no fields or components, there's no content to read or transform.
  // If the block were to contain rows, we would process them here.
  // Example for future expansion:
  // if (block.children.length > 0) {
  //   // Process rows if any content is added to the block later
  //   [...block.children].forEach((row) => {
  //     // Example: if a text field was added
  // FIXED: Using content detection instead of index access
  const cells = [...row.children];
  const textCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[0];
  //     // const p = document.createElement('p');
  //     // moveInstrumentation(row, p);
  //     // p.textContent = textCell.textContent.trim();
  //     // block.append(p);
  //     // row.remove(); // Remove original row after processing
  //   });
  // }
}
