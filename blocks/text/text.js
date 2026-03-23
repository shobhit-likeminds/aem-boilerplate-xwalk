import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 1: STRUCTURE ALIGNMENT
  // BlockJson has 1 root model field 'text'.
  // The JS correctly reads block.children[0] for this row.
  const textContentRow = block.children[0];
  // The 'text' field is a richtext, which means it's the first cell in the row.
  // The JS correctly reads textContentRow.children[0] for this cell.
  const textCell = textContentRow.children[0];

  const wrapper = document.createElement('div');
  // IMPORTANT: All CSS class names must use the EXACT block name as prefix.
  // Block name is 'text', so class should be 'text-text'.
  wrapper.classList.add('text-text');
  moveInstrumentation(block, wrapper);

  while (textCell.firstChild) {
    wrapper.append(textCell.firstChild);
  }

  block.textContent = '';
  block.append(wrapper);

  // CHECK 2: INTERACTIVITY
  // Original HTML does not contain any interactive elements (buttons, toggles, etc.).
  // Therefore, no addEventListener calls are expected or needed.
}
