import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const div = document.createElement('div');
  div.classList.add('w-100', 'pt-3', 'pt-sm-3');
  div.style.background = ''; // The original HTML had an empty background style, so we replicate it.

  // Since the block is empty, there are no authored rows to move instrumentation from.
  // We simply replace the block's children with the new div.
  block.replaceChildren(div);
}
