import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('whyustext-align-center', 'whyustext-koi-theme', 'whyustext-pm-left-right');

  const cmpTextDiv = document.createElement('div');
  cmpTextDiv.classList.add('whyustext-cmp-text');

  // The BlockJson model has 3 root fields: heading1, heading2, heading3.
  // Each field corresponds to a row in block.children.
  // The JS should read exactly 3 rows and create an h1 for each.
  // Destructuring is used here for clarity, but a forEach with rowIndex would also work.
  const [heading1Row, heading2Row, heading3Row] = block.children;

  const processHeadingRow = (row) => {
    if (row) {
      const cell = row.firstElementChild; // Each row contains a single cell with rich text
      if (cell) {
        const h1 = document.createElement('h1');
        moveInstrumentation(row, h1);
        while (cell.firstChild) {
          h1.append(cell.firstChild);
        }
        cmpTextDiv.append(h1);
      }
    }
  };

  processHeadingRow(heading1Row);
  processHeadingRow(heading2Row);
  processHeadingRow(heading3Row);

  block.textContent = '';
  block.append(cmpTextDiv);
}
