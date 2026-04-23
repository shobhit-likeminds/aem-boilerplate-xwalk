import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The w-100 block is an empty container block.
  // It only exists to provide a wrapper div with specific classes and styles.
  // The original HTML shows classes 'w-100 pt-3 pt-sm-3' and an inline style 'background: ;'.
  // We need to apply these classes and the style to the block itself.

  // The block already has the 'w-100' class from the block name.
  block.classList.add('pt-3', 'pt-sm-3');

  // The original HTML shows an empty background style.
  // If there was an actual background value, it would be set here.
  // Since it's empty, we'll set it to an empty string to match the original.
  block.style.background = '';

  // Since the block model has no fields, there are no authored rows to process or move.
  // The block itself serves as the final element.
}
