import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, ...linkRows] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('popular-search-container');

  // Title
  const titleElement = document.createElement('h2');
  titleElement.classList.add('popular-search-title');
  moveInstrumentation(titleRow, titleElement);
  titleElement.textContent = titleRow.firstElementChild.textContent.trim();
  container.append(titleElement);

  // Links
  const linksWrapper = document.createElement('div');
  linkRows.forEach((row, index) => {
    const cells = [...row.children];
    // Find the cell containing the actual link (aem-content)
    const linkCell = cells.find(cell => cell.querySelector('a'));
    // Find the cell containing the link label (text)
    const linkLabelCell = cells.find(cell => !cell.querySelector('a') || cell.textContent.trim() === linkCell.textContent.trim());

    const span = document.createElement('span');
    moveInstrumentation(row, span);

    const anchor = document.createElement('a');
    anchor.classList.add('popular-search-links');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank'; // Original HTML has target="_blank"
    }
    anchor.textContent = linkLabelCell.textContent.trim();
    span.append(anchor);

    if (index < linkRows.length - 1) {
      const separator = document.createElement('span');
      separator.classList.add('separator');
      separator.textContent = '|';
      span.append(separator);
    }
    linksWrapper.append(span);
  });
  container.append(linksWrapper);

  block.textContent = '';
  block.classList.add('section-background-area'); // Add section-background-area class to the block
  block.append(container);
}
