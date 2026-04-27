import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block is empty in the EDS structure and BlockJson,
  // but the original HTML shows a div with specific classes and style.
  // We need to create this div and apply the styles/classes.
  const decorativeSection = document.createElement('div');
  decorativeSection.classList.add('w-100', 'pt-16', 'pt-sm-16');
  decorativeSection.style.background = '#F4DBC3';

  // Move instrumentation from the original block element to the new decorativeSection div
  // This ensures Universal Editor can still interact with the block.
  moveInstrumentation(block, decorativeSection);

  // Replace the original block's children with the newly created decorativeSection.
  // Since the original block is empty, this effectively sets the content.
  block.replaceChildren(decorativeSection);
}
