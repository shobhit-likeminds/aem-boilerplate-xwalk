import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block is empty and serves as a container for styling.
  // We only need to apply the classes from the original HTML to the block itself.
  // The block element already exists and has the correct class name from the block type.
  // We just need to add any additional classes from the ORIGINAL HTML.
  block.classList.add('w-100', 'pt-3', 'pt-sm-3');

  // Since there are no children to process or transform,
  // there's no need to create new elements or move instrumentation.
  // The block itself is the final decorated element.
}
