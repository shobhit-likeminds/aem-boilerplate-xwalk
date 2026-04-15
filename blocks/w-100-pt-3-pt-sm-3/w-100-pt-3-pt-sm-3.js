import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block has no fields in its model, so it's a simple container.
  // We just need to apply the classes from the block name to the block itself.
  // The block name is 'w-100-pt-3-pt-sm-3', which corresponds to classes 'w-100', 'pt-3', 'pt-sm-3'.

  // Clear existing content if any, though for this block it's likely empty.
  block.textContent = '';

  // The block already has the class 'w-100-pt-3-pt-sm-3' from the block name.
  // We need to add the individual classes 'w-100', 'pt-3', 'pt-sm-3' as per the original HTML.
  block.classList.add('w-100', 'pt-3', 'pt-sm-3');

  // If there were any child rows, they would be processed here.
  // Since the model has no fields, block.children will be empty.
  // No further DOM manipulation is needed for this specific block.
}
