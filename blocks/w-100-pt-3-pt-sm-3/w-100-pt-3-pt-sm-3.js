import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block has no authored content, as per the EDS Block Structure and BlockJson.
  // It only serves as a container for styling.
  // We apply the classes from the ORIGINAL HTML directly to the block element.
  block.classList.add('w-100', 'pt-3', 'pt-sm-3');

  // Since there are no fields in the model, there are no children to process
  // or instrumentation to move. The block itself is the final element.
}
