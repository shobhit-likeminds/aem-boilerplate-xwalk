import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('w-100', 'pt-3', 'pt-sm-3');
  wrapper.style.background = ''; // The original HTML has an inline style, so we apply it.

  // Since the block is empty according to the EDS BLOCK STRUCTURE,
  // there are no authored rows to process or move instrumentation from.
  // We simply replace the block's children with the new wrapper.
  block.replaceChildren(wrapper);
}
