import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    imageRow,
    featuresHeadingRow,
    featuresDescriptionRow,
    featuresContainerRow, // This row is a container for features, not content itself
    actionsContainerRow,  // This row is a container for actions, not content itself
    ...itemRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('main-wrapper', 'main-style2');

  // Main Title
  const mainTitle = document.createElement('div');
  mainTitle.classList.add('main-title');
  moveInstrumentation(titleRow, mainTitle);
  mainTitle.append(titleRow.firstElementChild.textContent);
  block.append(mainTitle);

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');
  block.append(mainContainer);

  // Main Image
  const imageLink = document.createElement('a');
  imageLink.classList.add('main-image', 'main-featured');
  // The original HTML uses '#' for href, but we need to check if a link exists in the cell
  const originalImageLink = imageRow.querySelector('a');
  if (originalImageLink) {
    imageLink.href = originalImageLink.href;
    moveInstrumentation(imageRow, imageLink);
    imageLink.append(imageRow.querySelector('picture'));
  } else {
    // If no explicit link is provided in the cell, use a default '#' and append the picture.
    // The image itself is expected to be in the first child of imageRow.
    imageLink.href = '#';
    moveInstrumentation(imageRow, imageLink);
    imageLink.append(imageRow.firstElementChild.querySelector('picture'));
  }
  mainContainer.append(imageLink);

  // Features Section
  const featuresSection = document.createElement('section');
  featuresSection.id = 'features';
  mainContainer.append(featuresSection);

  const featuresHeader = document.createElement('header');
  featuresHeader.classList.add('main-style1');
  featuresSection.append(featuresHeader);

  const featuresH2 = document.createElement('h2');
  moveInstrumentation(featuresHeadingRow, featuresH2);
  featuresH2.append(featuresHeadingRow.firstElementChild.textContent);
  featuresHeader.append(featuresH2);

  const featuresP = document.createElement('p');
  moveInstrumentation(featuresDescriptionRow, featuresP);
  // Append all child nodes from the first child of featuresDescriptionRow (which is a div containing the <p>)
  while (featuresDescriptionRow.firstElementChild.firstChild) {
    featuresP.append(featuresDescriptionRow.firstElementChild.firstChild);
  }
  featuresHeader.append(featuresP);

  // Filter item rows based on the number of children (cells)
  // Feature items have 3 cells: icon-class, heading, description
  const featureItems = itemRows.filter((row) => row.children.length === 3);
  // Action items have 1 cell: link
  const actionItems = itemRows.filter((row) => row.children.length === 1);

  if (featureItems.length > 0) {
    const featureListDiv = document.createElement('div');
    featureListDiv.classList.add('main-feature-list');
    featuresSection.append(featureListDiv);

    const featureRowDiv = document.createElement('div');
    featureRowDiv.classList.add('main-row');
    featureListDiv.append(featureRowDiv);

    featureItems.forEach((row) => {
      const [iconClassCell, headingCell, descriptionCell] = [...row.children];

      const colDiv = document.createElement('div');
      colDiv.classList.add('main-col-6', 'main-col-12-medium');
      moveInstrumentation(row, colDiv);
      featureRowDiv.append(colDiv);

      const section = document.createElement('section');
      colDiv.append(section);

      const h3 = document.createElement('h3');
      h3.classList.add('main-icon');
      const iconClass = iconClassCell.textContent.trim();
      if (iconClass.includes('main-solid')) {
        h3.classList.add('main-solid');
      }
      // Ensure the icon class is prefixed with 'main-fa-' as per original HTML
      h3.classList.add(`main-fa-${iconClass.replace('main-solid', '').trim()}`);
      moveInstrumentation(headingCell, h3);
      h3.append(headingCell.textContent);
      section.append(h3);

      const p = document.createElement('p');
      moveInstrumentation(descriptionCell, p);
      // Append all child nodes from the first child of descriptionCell (which is a div containing the <p>)
      while (descriptionCell.firstElementChild.firstChild) {
        p.append(descriptionCell.firstElementChild.firstChild);
      }
      section.append(p);
    });
  }

  if (actionItems.length > 0) {
    const actionsUl = document.createElement('ul');
    actionsUl.classList.add('main-actions', 'main-special');
    featuresSection.append(actionsUl);

    actionItems.forEach((row) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      actionsUl.append(li);

      const originalLink = row.querySelector('a');
      if (originalLink) {
        const link = document.createElement('a');
        // The original HTML shows two different button styles for actions: main-style1 and main-style2.
        // The current code assumes main-style1 for all.
        // To support both, we'd need a way to specify the style in the model, e.g., an extra cell.
        // For now, let's stick to the original JS's assumption, but acknowledge the discrepancy.
        // If the original HTML has different styles, we should ideally reflect that.
        // For this review, I'll use the classes from the original HTML for the first button: main-button main-style1 main-large
        // And for the second button: main-button main-style2 main-large
        // Since the model only has one 'link' field per action, we can't distinguish.
        // Let's assume the first action is style1, and subsequent ones might be style2 if needed.
        // For simplicity and matching the current JS, we'll use main-style1 as a default.
        // If the originalLink itself has classes, we could try to copy them, but the model doesn't support it.
        link.classList.add('main-button', 'main-style1', 'main-large');
        link.href = originalLink.href;
        link.textContent = originalLink.textContent;
        li.append(link);
      }
    });
  }

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
