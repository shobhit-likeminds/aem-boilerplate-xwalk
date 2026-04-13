import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('section-background-area');

  const container = document.createElement('div');
  container.classList.add('popular-search-container');

  const [headingRow, ...linkRows] = [...block.children];

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('popular-search-title');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  container.append(heading);

  // Links
  const linksWrapper = document.createElement('div');
  linkRows.forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a')); // Cell containing the actual link
    const linkLabelCell = cells.find(cell => cell !== linkCell); // The other cell is the label

    const span = document.createElement('span');

    const anchor = document.createElement('a');
    anchor.classList.add('popular-search-links');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      // Check if target="_blank" exists in the original HTML link
      if (foundLink.target === '_blank') {
        anchor.target = '_blank';
      }
    }
    anchor.textContent = linkLabelCell.textContent.trim();
    moveInstrumentation(row, anchor);
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
  block.append(container);
}
