import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('footer-list__item');

    // The model defines 'sectionLinks' as a richtext field.
    // It can contain various HTML elements, including paragraphs and lists.
    // We need to check if it contains an <a> tag to determine if it's a simple link
    // or more complex content (like a nested list, though not explicitly shown in this example).
    const [sectionLinksCell] = [...row.children]; // There's only one cell per item row

    if (sectionLinksCell) {
      const anchor = sectionLinksCell.querySelector('a');
      const list = sectionLinksCell.querySelector('ul');

      if (anchor) {
        // If an anchor exists, treat it as a direct link.
        // Copy its href and text content.
        const newAnchor = document.createElement('a');
        newAnchor.href = anchor.href;
        newAnchor.textContent = anchor.textContent.trim();
        newAnchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        moveInstrumentation(sectionLinksCell, newAnchor);
        li.append(newAnchor);
      } else if (list) {
        // If a list exists, append it directly.
        // This handles cases where sectionLinks contains a nested structure.
        moveInstrumentation(sectionLinksCell, list);
        li.append(list);
      } else {
        // Otherwise, append the raw content of the cell.
        // This handles plain text or paragraph content.
        moveInstrumentation(sectionLinksCell, li);
        while (sectionLinksCell.firstChild) {
          li.append(sectionLinksCell.firstChild);
        }
      }
    }
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
