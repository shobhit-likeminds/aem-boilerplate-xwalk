import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block is empty in the EDS structure and BlockJson, but the original HTML
  // and generated JS indicate a div with specific classes and inline style.
  // We create this div and apply the classes and style.
  const spaceAdderDiv = document.createElement('div');
  spaceAdderDiv.classList.add('w-100', 'pt-14', 'pt-sm-9');
  spaceAdderDiv.style.background = '#FFE2A5';

  // Since there are no authored rows in the block to instrument, moveInstrumentation is not needed.
  // The block's children are replaced with the newly created div.
  block.replaceChildren(spaceAdderDiv);
}
