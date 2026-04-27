import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('w-100', 'pt-14', 'pt-sm-9');
  wrapper.style.background = '#FFE2A5';

  // Since the block has no fields, there are no authored rows to move instrumentation from.
  // We simply replace the block's content with the new wrapper.
  block.replaceChildren(wrapper);
}
