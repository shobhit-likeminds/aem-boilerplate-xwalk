import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');

  [...block.children].forEach((row) => {
    const column = document.createElement('div');
    moveInstrumentation(row, column);
    column.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');

    let headingEl;
    let descriptionEl;
    const linksDiv = document.createElement('div');
    let actionImageEl;
    let actionLinkEl;

    const cells = [...row.children];

    // Heading (first cell, usually an h2 or p containing text)
    const headingCell = cells.find(cell => cell.textContent.trim() !== '' && !cell.querySelector('picture') && !cell.querySelector('a'));
    if (headingCell) {
      headingEl = document.createElement('h2');
      headingEl.classList.add('wp-block-heading');
      moveInstrumentation(headingCell, headingEl);
      while (headingCell.firstChild) headingEl.append(headingCell.firstChild);
    }

    // Description (second cell, usually a p containing text, distinct from links)
    const descriptionCell = cells.find(cell => cell !== headingCell && cell.textContent.trim() !== '' && !cell.querySelector('picture') && !cell.querySelector('a') && !cell.querySelector('p > a'));
    if (descriptionCell) {
      descriptionEl = document.createElement('div');
      moveInstrumentation(descriptionCell, descriptionEl);
      while (descriptionCell.firstChild) descriptionEl.append(descriptionCell.firstChild);
    }

    // Links (cell containing multiple 'a' tags, or 'p' tags with 'a' tags)
    const linksCell = cells.find(cell => cell !== headingCell && cell !== descriptionCell && cell.querySelector('a') && !cell.querySelector('picture'));
    if (linksCell) {
      moveInstrumentation(linksCell, linksDiv);
      // The original HTML shows links wrapped in <p> tags within the cell
      [...linksCell.children].forEach((child) => {
        if (child.tagName === 'P' && child.querySelector('a')) {
          linksDiv.append(child); // Append the <p> tag directly
        } else if (child.tagName === 'A') {
          const p = document.createElement('p');
          p.append(child);
          linksDiv.append(p);
        }
      });
    }

    // Action Image (cell containing a picture)
    const actionImageCell = cells.find(cell => cell.querySelector('picture'));
    if (actionImageCell) {
      const picture = actionImageCell.querySelector('picture');
      if (picture) {
        actionImageEl = picture.querySelector('img');
      }
    }

    // Action Link (cell containing an 'a' tag, distinct from the 'links' cell)
    const actionLinkCell = cells.find(cell => cell !== linksCell && cell.querySelector('a') && !cell.querySelector('picture'));
    if (actionLinkCell) {
      actionLinkEl = actionLinkCell.querySelector('a');
    }

    if (headingEl) column.append(headingEl);
    if (descriptionEl) column.append(descriptionEl);
    if (linksDiv.children.length > 0) column.append(linksDiv);

    if (actionImageEl && actionLinkEl) {
      const actionLinkWrapper = document.createElement('div');
      actionLinkWrapper.classList.add('nhsuk-action-link');

      const link = document.createElement('a');
      link.classList.add('nhsuk-action-link__link');
      link.href = actionLinkEl.href;
      if (actionLinkEl.target) link.target = actionLinkEl.target;

      const img = document.createElement('img');
      img.src = actionImageEl.src;
      img.alt = actionImageEl.alt;
      link.append(img);

      const span = document.createElement('span');
      span.classList.add('nhsuk-action-link__text');
      moveInstrumentation(actionLinkEl, span);
      while (actionLinkEl.firstChild) span.append(actionLinkEl.firstChild);
      link.append(span);

      actionLinkWrapper.append(link);
      column.append(actionLinkWrapper);
    }

    row.replaceWith(column);
  });

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
