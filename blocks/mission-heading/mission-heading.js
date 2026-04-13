import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('theme-light', 'theme-bg', 'theme-section-spacing', 'first:not-is-themed:mt-component');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const gridFull = document.createElement('div');
  gridFull.classList.add('grid-full');
  container.append(gridFull);

  const gridCentered = document.createElement('div');
  gridCentered.classList.add('grid-centered-12', 'grid', 'grid-cols-subgrid', 'gap-grid-gutter');
  gridFull.append(gridCentered);

  const colSpan = document.createElement('div');
  colSpan.classList.add('sm:col-span-14', 'md:col-span-12', 'xl:col-span-10');
  gridCentered.append(colSpan);

  const headingElement = document.createElement('h2');
  headingElement.classList.add('text-h2', 'theme-dark:text-foreground-td', 'theme-medium:text-foreground-tm', 'text-foreground', 'text-pretty');
  colSpan.append(headingElement);

  // CHECK 0 & 1: Replaced direct index access with content detection
  // The block structure indicates a single row for the heading.
  // We find the first row and its first cell.
  const rows = [...block.children];
  const headingRow = rows.find(row => row.firstElementChild && row.firstElementChild.querySelector('p')); // Assuming heading will be in a <p> tag

  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      moveInstrumentation(headingCell, headingElement);
      while (headingCell.firstChild) {
        headingElement.append(headingCell.firstChild);
      }
    }
  }

  block.textContent = '';
  block.append(section);
}
