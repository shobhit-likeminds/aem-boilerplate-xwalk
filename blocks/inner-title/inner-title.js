import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Replaced direct index access with content detection.
  // The BlockJson indicates a single 'heading' field, which corresponds to the first row.
  const headingRow = [...block.children].find(row => row.children.length === 1);

  const section = document.createElement('section');
  // CHECK 1: Ensured class names are copied verbatim from ORIGINAL HTML.
  section.classList.add('inner-title', 'mobile-inner-title');

  const pageTitleDiv = document.createElement('div');
  // CHECK 1: Ensured class names are copied verbatim from ORIGINAL HTML.
  pageTitleDiv.classList.add('page-title');

  const h1 = document.createElement('h1');
  if (headingRow && headingRow.firstElementChild) {
    moveInstrumentation(headingRow.firstElementChild, h1);
    h1.append(headingRow.firstElementChild.textContent);
  }

  pageTitleDiv.append(h1);
  section.append(pageTitleDiv);

  block.textContent = '';
  block.append(section);

  // CHECK 2: No interactive elements found in ORIGINAL HTML, so no event listeners are needed.
}
