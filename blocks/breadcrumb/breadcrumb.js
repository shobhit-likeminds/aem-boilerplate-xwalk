import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ol = document.createElement('ol');
  ol.classList.add('breadcrumb');

  // The first row is the 'Crumbs' container field, which we can ignore directly as its items follow.
  // All subsequent rows are 'crumb' items.
  const [, ...crumbRows] = [...block.children];

  crumbRows.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Each crumb item row has one cell: 'link'
    const linkCell = row.children[0]; // This cell contains the link

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');

      if (foundLink) {
        const a = document.createElement('a');
        a.href = foundLink.href;
        moveInstrumentation(foundLink, a);
        // Move all children from the foundLink to the new 'a' element
        while (foundLink.firstChild) a.append(foundLink.firstChild);
        li.append(a);
      } else {
        // If no link, just append the content of the cell
        moveInstrumentation(linkCell, li);
        while (linkCell.firstChild) li.append(linkCell.firstChild);
      }
    }

    // Add separator if not the last item
    // The original HTML shows the separator as a text node directly in the parent of the link,
    // or as a sibling of the <a> tag. We'll append it to the li for consistency.
    if (index < crumbRows.length - 1) {
      li.append(document.createTextNode(' > '));
    }

    ol.append(li);
  });

  const regionBreadcrumb = document.createElement('div');
  regionBreadcrumb.classList.add('region', 'region-breadcrumb');
  regionBreadcrumb.append(ol);

  block.textContent = '';
  block.append(regionBreadcrumb);
}
