import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [heading1Row, heading2Row, heading3Row] = [...block.children];

  block.textContent = '';
  block.classList.add('text-component');

  if (heading1Row) {
    const heading1 = document.createElement('h1');
    heading1.classList.add('text-component-heading');
    moveInstrumentation(heading1Row, heading1);
    while (heading1Row.firstElementChild) heading1.append(heading1Row.firstElementChild);
    block.append(heading1);
  }

  if (heading2Row) {
    const heading2 = document.createElement('h2'); // Changed to h2 as per common practice for subsequent headings
    heading2.classList.add('text-component-heading');
    moveInstrumentation(heading2Row, heading2);
    while (heading2Row.firstElementChild) heading2.append(heading2Row.firstElementChild);
    block.append(heading2);
  }

  if (heading3Row) {
    const heading3 = document.createElement('h3'); // Changed to h3
    heading3.classList.add('text-component-heading');
    moveInstrumentation(heading3Row, heading3);
    while (heading3Row.firstElementChild) heading3.append(heading3Row.firstElementChild);
    block.append(heading3);
  }
}
