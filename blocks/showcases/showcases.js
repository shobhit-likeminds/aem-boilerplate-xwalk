import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('sections', 'mt-0');

  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid');

  const row = document.createElement('div');
  row.classList.add('row');

  [...block.children].forEach((showcaseItemRow) => {
    const col = document.createElement('div');
    col.classList.add('col-12', 'col-lg-4');
    moveInstrumentation(showcaseItemRow, col);

    const boxCrslItems = document.createElement('div');
    boxCrslItems.classList.add('box-crsl-items', 'greybox');

    // Use content detection instead of index access
    const cells = [...showcaseItemRow.children];

    const imageCell = cells.find(cell => cell.querySelector('picture') || cell.querySelector('img'));
    const titleCell = cells.find(cell => cell.textContent.trim() && !cell.querySelector('picture') && !cell.querySelector('img') && !cell.querySelector('a') && cell.children.length === 0);
    const descriptionCell = cells.find(cell => cell.children.length > 0 && !cell.querySelector('picture') && !cell.querySelector('img') && !cell.querySelector('a'));
    const primaryLinkCell = cells.find(cell => cell.querySelector('a[href*="primaryLink"]'));
    const primaryLinkLabelCell = cells.find(cell => cell.querySelector('a[href*="primarylinklabel"]'));
    const secondaryLinkCell = cells.find(cell => cell.querySelector('a[href*="secondaryLink"]'));
    const secondaryLinkLabelCell = cells.find(cell => cell.querySelector('a[href*="secondarylinklabel"]'));


    // Image
    if (imageCell) {
      const iconDiv = document.createElement('div');
      iconDiv.classList.add('icon');
      const picture = imageCell.querySelector('picture');
      const img = imageCell.querySelector('img');

      if (picture) {
        const picImg = picture.querySelector('img');
        if (picImg) {
          const optimizedPic = createOptimizedPicture(picImg.src, picImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(picImg, optimizedPic.querySelector('img'));
          iconDiv.append(optimizedPic);
        }
      } else if (img) { // Handle direct img tags (e.g., SVG)
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.classList.add('img-fluid');
        moveInstrumentation(img, newImg);
        iconDiv.append(newImg);
      }
      boxCrslItems.append(iconDiv);
    }


    // Title
    if (titleCell) {
      const h3 = document.createElement('h3');
      h3.classList.add('title', 'text-capitalize');
      moveInstrumentation(titleCell, h3);
      h3.textContent = titleCell.textContent.trim();
      boxCrslItems.append(h3);
    }

    // Description
    if (descriptionCell) {
      moveInstrumentation(descriptionCell, boxCrslItems);
      while (descriptionCell.firstChild) {
        boxCrslItems.append(descriptionCell.firstChild);
      }
    }

    // Links (Primary and Secondary)
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');
    let hasButtonAction = false;
    let hasDirectLinks = false;

    // Primary Link
    if (primaryLinkCell && primaryLinkLabelCell) {
      const primaryLink = primaryLinkCell.querySelector('a');
      if (primaryLink) {
        const a = document.createElement('a');
        a.href = primaryLink.href;
        a.classList.add('btn', 'btn-outline-secondary');
        a.textContent = primaryLinkLabelCell.textContent.trim();
        moveInstrumentation(primaryLinkCell, a);
        actionsDiv.append(a);
        hasButtonAction = true;
      }
    }

    // Secondary Link
    if (secondaryLinkCell && secondaryLinkLabelCell) {
      const secondaryLink = secondaryLinkCell.querySelector('a');
      if (secondaryLink) {
        // Check if the secondary link should be a button (if primary was a button)
        // or a direct 'font-italic links' style (as seen in the 3rd item of original HTML)
        if (hasButtonAction) {
          const a = document.createElement('a');
          a.href = secondaryLink.href;
          a.classList.add('btn', 'btn-outline-secondary'); // Assuming same style as primary if both are actions
          a.textContent = secondaryLinkLabelCell.textContent.trim();
          moveInstrumentation(secondaryLinkCell, a);
          actionsDiv.append(a);
        } else {
          // If no primary button, or if the structure implies direct links (like the 3rd item)
          // The original HTML shows a div wrapper for these links.
          const linkWrapper = document.createElement('div');
          const a = document.createElement('a');
          a.href = secondaryLink.href;
          a.classList.add('font-italic', 'links');
          a.textContent = secondaryLinkLabelCell.textContent.trim();
          moveInstrumentation(secondaryLinkCell, a);
          linkWrapper.append(a);
          boxCrslItems.append(linkWrapper);
          hasDirectLinks = true;
        }
      }
    }

    if (hasButtonAction) {
      boxCrslItems.append(actionsDiv);
    }

    col.append(boxCrslItems);
    row.append(col);
  });

  containerFluid.append(row);
  block.textContent = ''; // Clear the original block content
  block.append(containerFluid);
}
