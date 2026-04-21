import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block model "w-100" has no fields, so the block div will be empty.
  // The original HTML shows that it's a simple div with specific classes and an inline style.
  // We need to apply these classes and the inline style to the block element itself.

  // Clear any existing content in the block, though it should be empty based on the model.
  block.textContent = '';

  // Apply classes from the ORIGINAL HTML
  block.classList.add('w-100', 'pt-3', 'pt-sm-3');

  // Apply inline style from the ORIGINAL HTML
  // Note: The original HTML has `style="background: ;"`, which is an empty background style.
  // We will replicate this exactly. If it had a value, we would copy that value.
  block.style.background = ''; // This sets an empty background style, matching the original.
}
