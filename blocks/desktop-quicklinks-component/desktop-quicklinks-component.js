import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block has no defined fields or content in the EDS Block Structure.
  // It only has the wrapper div with the block name class.
  // Based on the provided BlockJson, this component has no fields.
  // Therefore, we just ensure the block has its base class.
  block.classList.add('desktop-quicklinks-component');
}
