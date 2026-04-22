import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const separatorDiv = document.createElement('div');
  separatorDiv.classList.add('cmp-separator');
  moveInstrumentation(block, separatorDiv);

  const hr = document.createElement('hr');
  hr.classList.add('cmp-separator__horizontal-rule');
  separatorDiv.append(hr);

  block.replaceChildren(separatorDiv);
}
