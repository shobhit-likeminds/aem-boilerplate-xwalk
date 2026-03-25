import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, subheadingRow, featuresContainerRow, actionsContainerRow, ...itemRows] = [...block.children];

  // Header section
  const header = document.createElement('header');
  header.classList.add('features-style1');
  moveInstrumentation(headingRow, header);

  const heading = document.createElement('h2');
  moveInstrumentation(headingRow.firstElementChild, heading);
  while (headingRow.firstElementChild.firstChild) {
    heading.append(headingRow.firstElementChild.firstChild);
  }
  header.append(heading);

  if (subheadingRow && subheadingRow.firstElementChild && subheadingRow.firstElementChild.textContent.trim()) {
    const subheading = document.createElement('p');
    moveInstrumentation(subheadingRow.firstElementChild, subheading);
    while (subheadingRow.firstElementChild.firstChild) {
      subheading.append(subheadingRow.firstElementChild.firstChild);
    }
    header.append(subheading);
  }

  // Features list
  const featuresList = document.createElement('div');
  featuresList.classList.add('features-feature-list');
  moveInstrumentation(featuresContainerRow, featuresList);

  const featuresRow = document.createElement('div');
  featuresRow.classList.add('features-row');
  featuresList.append(featuresRow);

  const featureItems = itemRows.filter((row) => row.children.length === 3);
  featureItems.forEach((row) => {
    const featureCol = document.createElement('div');
    featureCol.classList.add('features-col-6', 'features-col-12-medium');
    moveInstrumentation(row, featureCol);

    const section = document.createElement('section');
    featureCol.append(section);

    const [iconClassCell, titleCell, descriptionCell] = [...row.children];

    const title = document.createElement('h3');
    title.classList.add('features-icon');
    const iconClasses = iconClassCell.textContent.trim().split(' ');
    iconClasses.forEach((cls) => title.classList.add(cls));
    moveInstrumentation(titleCell, title);
    // The original code was appending titleCell.firstChild to title, but the title content
    // should come from titleCell, not iconClassCell.
    while (titleCell.firstChild) {
      title.append(titleCell.firstChild);
    }
    section.append(title);

    const description = document.createElement('p');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) {
      description.append(descriptionCell.firstChild);
    }
    section.append(description);

    featuresRow.append(featureCol);
  });

  // Actions list
  const actionsUl = document.createElement('ul');
  actionsUl.classList.add('features-actions', 'features-special');
  moveInstrumentation(actionsContainerRow, actionsUl);

  const actionItems = itemRows.filter((row) => row.children.length === 2);
  actionItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const [linkCell, labelCell] = [...row.children];
    const foundLink = linkCell.querySelector('a');
    const link = document.createElement('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.classList.add('features-button', 'features-large');
    // Apply style classes based on index or content if needed, for now use generic
    // For this specific block, the first action link has 'features-style1' and the second 'features-style2'
    if (actionsUl.children.length === 0) {
      link.classList.add('features-style1');
    } else {
      link.classList.add('features-style2');
    }

    moveInstrumentation(labelCell, link);
    while (labelCell.firstChild) {
      link.append(labelCell.firstChild);
    }
    li.append(link);
    actionsUl.append(li);
  });

  block.textContent = '';
  block.append(header, featuresList, actionsUl);
}
