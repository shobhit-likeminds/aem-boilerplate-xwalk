import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('text-component');
  moveInstrumentation(block, mainDiv);

  // Assuming the block's children are the rows, and each row contains a heading
  [...block.children].forEach((row) => {
    const h1 = row.querySelector('h1');
    if (h1) {
      const newH1 = document.createElement('h1');
      newH1.classList.add('text-component-heading');
      newH1.innerHTML = h1.innerHTML; // Use innerHTML to preserve any rich text formatting
      moveInstrumentation(h1, newH1);
      mainDiv.append(newH1);
    }
  });

  block.textContent = '';
  block.append(mainDiv);
}
