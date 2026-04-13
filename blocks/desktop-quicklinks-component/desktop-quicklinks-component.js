import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block has no defined model fields, so it will be empty.
  // The original HTML also shows an empty div with just the component class.
  // Therefore, we just ensure the block has the correct class, which it already does.
  // No content needs to be moved or created.
  block.classList.add('desktop-quicklinks-component');
}
