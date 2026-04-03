import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The space-adder block is purely for adding vertical padding via CSS.
  // It does not have any content or interactive elements.
  // The original HTML already contains the section with the correct classes.
  // Therefore, no JavaScript manipulation of the DOM is needed for this block.
  // The block itself (the div with class "space-adder") will receive the styling.
  // No changes are required in the decorate function.
}
