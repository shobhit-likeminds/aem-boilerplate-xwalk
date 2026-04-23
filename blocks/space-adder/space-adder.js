import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The space-adder block is an empty block used for spacing.
  // It already exists in the DOM with its instrumentation.
  // We just need to apply the correct classes and styles directly to the block element.
  block.classList.add('w-100', 'pt-3', 'pt-sm-3');
  block.style.background = ''; // The original HTML has an empty style attribute for background

  // No need to create a new div or replace children for an empty spacing block.
  // The block itself serves as the container for the spacing.
}
