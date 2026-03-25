import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    imageRow,
    headingRow,
    descriptionRow,
    featuresContainerRow, // This row is just a placeholder for the container, its content is not used directly
    actionsContainerRow,  // This row is just a placeholder for the container, its content is not used directly
    ...itemRows
  ] = [...block.children];

  // Main container
  const section = document.createElement('section');
  section.classList.add('wrapper', 'style2');

  const titleDiv = document.createElement('div');
  moveInstrumentation(titleRow, titleDiv);
  titleDiv.classList.add('title');
  titleDiv.append(titleRow.firstElementChild);
  section.append(titleDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  section.append(containerDiv);

  // Image
  const imageLink = document.createElement('a');
  moveInstrumentation(imageRow, imageLink);
  imageLink.classList.add('image', 'featured');
  const picture = imageRow.querySelector('picture');
  if (picture) {
    imageLink.append(picture);
  }
  containerDiv.append(imageLink);

  // Features Section
  const featuresSection = document.createElement('section');
  featuresSection.id = 'features';
  containerDiv.append(featuresSection);

  const header = document.createElement('header');
  header.classList.add('style1');
  featuresSection.append(header);

  const heading = document.createElement('h2');
  moveInstrumentation(headingRow, heading);
  heading.append(headingRow.firstElementChild);
  header.append(heading);

  const description = document.createElement('p');
  moveInstrumentation(descriptionRow, description);
  description.append(descriptionRow.firstElementChild);
  header.append(description);

  const featureListDiv = document.createElement('div');
  featureListDiv.classList.add('feature-list');
  featuresSection.append(featureListDiv);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  featureListDiv.append(rowDiv);

  // Features items
  // A feature item has 3 cells: icon, title, text
  const featureItems = itemRows.filter((row) => row.children.length === 3);
  featureItems.forEach((row) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-6', 'col-12-medium');
    rowDiv.append(colDiv);

    const featureItemSection = document.createElement('section'); // Renamed to avoid conflict with featuresSection
    moveInstrumentation(row, featureItemSection);
    colDiv.append(featureItemSection);

    const [iconCell, titleCell, textCell] = [...row.children];

    const h3 = document.createElement('h3');
    moveInstrumentation(titleCell, h3);
    h3.classList.add('icon'); // Add base icon class
    const iconText = iconCell.textContent.trim();
    if (iconText) {
      // Assuming iconText contains the full class name like 'fa-comment' or 'solid fa-sync'
      // Split by space to add multiple classes if present (e.g., 'solid fa-sync')
      iconText.split(' ').forEach(cls => h3.classList.add(cls));
    }
    while (titleCell.firstChild) h3.append(titleCell.firstChild);
    featureItemSection.append(h3);

    const p = document.createElement('p');
    moveInstrumentation(textCell, p);
    while (textCell.firstChild) p.append(textCell.firstChild);
    featureItemSection.append(p);
  });

  // Actions
  const actionsUl = document.createElement('ul');
  actionsUl.classList.add('actions', 'special');
  featuresSection.append(actionsUl);

  // An action item has 2 cells: link, label
  const actionItems = itemRows.filter((row) => row.children.length === 2);
  actionItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    actionsUl.append(li);

    const [linkCell, labelCell] = [...row.children];
    const link = linkCell.querySelector('a');
    const button = document.createElement('a');
    if (link) {
      button.href = link.href;
    }
    // Use class names exactly as in ORIGINAL HTML
    button.classList.add('button', 'style1', 'large');
    moveInstrumentation(labelCell, button);
    while (labelCell.firstChild) button.append(labelCell.firstChild);
    li.append(button);
  });

  // Optimize images
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);
}
