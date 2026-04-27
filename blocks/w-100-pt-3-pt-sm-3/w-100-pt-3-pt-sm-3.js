import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block model has no fields, so there are no authored rows to process.
  // The block itself will only receive the classes from the original HTML.
  // Since the block is empty, we just apply the classes directly to it.

  // The original HTML shows the block div itself has the classes:
  // <div class="w-100 pt-3 pt-sm-3" style="background: ;"></div>
  // We apply these classes to the block element directly.
  block.classList.add('w-100', 'pt-3', 'pt-sm-3');

  // There are no children to process, so no moveInstrumentation calls are needed.
  // The block is already the root element, so no replaceChildren is needed.
}
