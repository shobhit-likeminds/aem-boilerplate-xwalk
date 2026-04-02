import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow] = [...block.children];

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const brandsDetContDiv = document.createElement('div');
  brandsDetContDiv.classList.add('brands-det-cont');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      const h3 = document.createElement('h3');
      moveInstrumentation(headingCell, h3);
      while (headingCell.firstChild) {
        h3.append(headingCell.firstChild);
      }
      brandsDetContDiv.append(h3);
    }
  }

  // Description
  if (descriptionRow) {
    const descriptionCell = descriptionRow.firstElementChild;
    if (descriptionCell) {
      const p = document.createElement('p');
      moveInstrumentation(descriptionCell, p);
      while (descriptionCell.firstChild) {
        p.append(descriptionCell.firstChild);
      }
      brandsDetContDiv.append(p);
    }
  }

  containerDiv.append(brandsDetContDiv);
  block.textContent = '';
  block.append(containerDiv);
}
