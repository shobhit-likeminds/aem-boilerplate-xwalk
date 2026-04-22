import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block has no fields in its model, so it's a simple wrapper div.
  // We just need to apply the class names from the original HTML.
  // The block element itself already has the class `w-100-pt-3-pt-sm-3` from the block name.
  // We need to add `w-100`, `pt-3`, `pt-sm-3` which are the actual CSS classes.
  // The block element itself is the target for these classes.

  // The original HTML shows: <div class="w-100 pt-3 pt-sm-3" style="background: ;"></div>
  // The block already has the block name as a class, which is `w-100-pt-3-pt-sm-3`.
  // We need to add the other classes: `w-100`, `pt-3`, `pt-sm-3`.
  // The block element itself is the final element. No new elements are created.
  // No instrumentation needs to be moved as there are no authored rows to replace.

  block.classList.add('w-100', 'pt-3', 'pt-sm-3');

  // If there were any child elements in the block (which there aren't based on the EDS structure),
  // they would be moved or transformed here. Since the block is empty, no further action is needed.
}
