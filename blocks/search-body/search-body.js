import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid');

  const row = document.createElement('div');
  row.classList.add('row');

  const col = document.createElement('div');
  col.classList.add('col-md-12', 'text-center');

  // The EDS block structure indicates block.children[0] contains the heading.
  // The BlockJson confirms a single 'heading' field.
  const [headingRow] = [...block.children];

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'mb-2', 'h-title');
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      moveInstrumentation(headingCell, heading);
      heading.textContent = headingCell.textContent.trim();
    }
  }

  col.append(heading);
  row.append(col);
  containerFluid.append(row);

  block.textContent = '';
  // block.classList.add('search-body'); // Removed: 'search-body' is already on the <section> element (block)
  block.append(containerFluid);
}
