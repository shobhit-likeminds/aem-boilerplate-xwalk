import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('social-link');

  // The first row is the container field "links", which is not rendered directly.
  // Item rows start from the second row.
  const itemRows = [...block.children].slice(1);

  itemRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const [classCell, urlCell, labelCell] = [...row.children];

    // Get the class name from the first cell
    const className = classCell.textContent.trim();
    if (className) {
      li.classList.add(className);
    }

    // Get the link from the second cell
    const anchor = urlCell.querySelector('a');
    if (anchor) {
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.target = '_blank'; // Original HTML has target="_blank"

      // Get the label from the third cell
      const label = labelCell.textContent.trim();
      newAnchor.textContent = label;

      li.append(newAnchor);
    }
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
