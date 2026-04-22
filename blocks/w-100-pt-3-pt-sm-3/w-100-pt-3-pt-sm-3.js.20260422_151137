import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block has no fields in its model, so it's likely a simple container
  // that applies specific styling to its children or to itself.
  // In this case, the original HTML shows only classes applied to the block itself.

  // Apply the classes from the original HTML directly to the block element.
  // The original HTML is: <div class="w-100 pt-3 pt-sm-3" style="background: ;"></div>
  // The block element already has the class "w-100-pt-3-pt-sm-3" from the block name.
  // We need to add "w-100", "pt-3", and "pt-sm-3".
  block.classList.add('w-100', 'pt-3', 'pt-sm-3');

  // Since there are no fields, there are no authored rows to process or move instrumentation from.
  // The block itself is the only element, and its classes are set.
  // If the block were meant to wrap existing content, that content would already be inside `block`.
  // As per the EDS Block Structure, the block is empty.
}
