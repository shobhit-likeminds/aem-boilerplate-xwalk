import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const columnsWrapper = document.createElement('div');
  columnsWrapper.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');

  [...block.children].forEach((row) => {
    const columnDiv = document.createElement('div');
    moveInstrumentation(row, columnDiv);
    columnDiv.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');

    let headingEl;
    let descriptionEl;
    const linkParagraphs = [];
    let actionImageEl;
    let actionLabelText;
    let actionLinkHref;

    const cells = [...row.children];

    // cell[0]: field="heading" label="Heading" type=text
    const headingCell = cells[0];
    if (headingCell) {
      headingEl = document.createElement('h2');
      headingEl.classList.add('wp-block-heading');
      moveInstrumentation(headingCell, headingEl);
      while (headingCell.firstChild) headingEl.append(headingCell.firstChild);
    }

    // cell[1]: field="description" label="Description" type=richtext
    const descriptionCell = cells[1];
    if (descriptionCell) {
      descriptionEl = document.createElement('p');
      moveInstrumentation(descriptionCell, descriptionEl);
      while (descriptionCell.firstChild) descriptionEl.append(descriptionCell.firstChild);
    }

    // cell[2]: field="links" label="Links" type=container
    const linksCell = cells[2];
    if (linksCell) {
      [...linksCell.children].forEach((linkRow) => {
        const linkP = document.createElement('p');
        moveInstrumentation(linkRow, linkP);
        while (linkRow.firstChild) linkP.append(linkRow.firstChild);
        linkParagraphs.push(linkP);
      });
    }

    // Content detection for action-image, action-label, and action-link
    // These fields are not guaranteed to be in fixed positions after the first three
    // and might be missing. We need to find them based on their content.
    cells.slice(3).forEach((cell) => { // Start checking from the 4th cell onwards
      const picture = cell.querySelector('picture');
      const link = cell.querySelector('a');

      if (picture && !actionImageEl) { // Check if it's an action image and not already found
        actionImageEl = picture;
      } else if (link && !actionLinkHref) { // Check if it's an action link and not already found
        actionLinkHref = link.href;
        // The action label might be the text content of the cell containing the link,
        // or a separate cell. Given the structure, it's likely the text content of the link itself.
        // However, the model defines it as a separate text field.
        // Let's assume the action label is the text content of the cell if it's not a link or picture.
      } else if (!picture && !link && cell.textContent.trim() !== '' && !actionLabelText) {
        // This is a heuristic: if it's not a picture or a link, and has text,
        // it might be the action label. This is fragile if other text fields are added later.
        // A more robust solution would involve specific markers or a more complex detection.
        // Based on the model, action-label is a text field.
        actionLabelText = cell.textContent.trim();
      }
    });

    if (headingEl) columnDiv.append(headingEl);
    if (descriptionEl) columnDiv.append(descriptionEl);
    linkParagraphs.forEach((p) => columnDiv.append(p));

    if (actionImageEl || actionLabelText || actionLinkHref) {
      const actionLinkWrapper = document.createElement('div');
      // Corrected class name from 'nhsuk-action-link' to 'nhsuk-action-link' (already correct)
      actionLinkWrapper.classList.add('nhsuk-action-link');
      const actionLink = document.createElement('a');
      actionLink.classList.add('nhsuk-action-link__link');
      if (actionLinkHref) {
        actionLink.href = actionLinkHref;
      }
      if (actionImageEl) {
        actionLink.append(actionImageEl);
      }
      if (actionLabelText) {
        const span = document.createElement('span');
        span.classList.add('nhsuk-action-link__text');
        span.textContent = actionLabelText;
        actionLink.append(span);
      }
      actionLinkWrapper.append(actionLink);
      columnDiv.append(actionLinkWrapper);
    }

    columnsWrapper.append(columnDiv);
  });

  columnsWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(columnsWrapper);
}
