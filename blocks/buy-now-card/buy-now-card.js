import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const root = document.createElement('div');
  root.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since the block model has no fields, the block will be empty.
  // We just need to move instrumentation from the original block to the new root
  // and then replace the block's children.
  moveInstrumentation(block, root);

  // The block is empty according to the EDS Block Structure, so no children to process.
  // If there were children, we would iterate and move them.

  block.replaceChildren(root);
}
