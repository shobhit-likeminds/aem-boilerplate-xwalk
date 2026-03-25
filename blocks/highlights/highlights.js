import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, highlightsContainerRow, ...highlightRows] = [...block.children];

  const section = document.createElement('section');
  section.id = 'highlights';
  section.classList.add('wrapper', 'style3');

  // Title
  const titleDiv = document.createElement('div');
  moveInstrumentation(titleRow, titleDiv);
  titleDiv.classList.add('title'); // Corrected class name
  while (titleRow.firstChild) titleDiv.append(titleRow.firstChild);
  section.append(titleDiv);

  // Container for highlights
  const containerDiv = document.createElement('div');
  moveInstrumentation(highlightsContainerRow, containerDiv);
  containerDiv.classList.add('container');
  // Remove the "Highlights value" text from the container row
  containerDiv.textContent = '';

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'aln-center');

  highlightRows.forEach((highlightRow) => {
    const colDiv = document.createElement('div');
    moveInstrumentation(highlightRow, colDiv);
    colDiv.classList.add('col-4', 'col-12-medium');

    const highlightSection = document.createElement('section');
    highlightSection.classList.add('highlight'); // Corrected class name

    const cells = [...highlightRow.children];
    const imageCell = cells[0];
    const headingCell = cells[1];
    const textCell = cells[2];
    const linkCell = cells[3];

    // Image and link
    const imageLink = document.createElement('a');
    imageLink.classList.add('image', 'featured');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      imageLink.href = foundLink.href;
    } else {
      imageLink.href = '#'; // Fallback if no link is provided
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      moveInstrumentation(imageCell, imageLink);
      imageLink.append(picture);
    }
    highlightSection.append(imageLink);

    // Heading
    const h3 = document.createElement('h3');
    const headingLink = document.createElement('a');
    if (foundLink) {
      headingLink.href = foundLink.href;
    } else {
      headingLink.href = '#';
    }
    moveInstrumentation(headingCell, headingLink);
    while (headingCell.firstChild) headingLink.append(headingCell.firstChild);
    h3.append(headingLink);
    highlightSection.append(h3);

    // Text
    const p = document.createElement('p');
    moveInstrumentation(textCell, p);
    while (textCell.firstChild) p.append(textCell.firstChild);
    highlightSection.append(p);

    // Button
    const ulActions = document.createElement('ul');
    ulActions.classList.add('actions');
    const liActions = document.createElement('li');
    const buttonLink = document.createElement('a');
    buttonLink.classList.add('button', 'style1');
    if (foundLink) {
      buttonLink.href = foundLink.href;
      moveInstrumentation(linkCell, buttonLink);
      buttonLink.textContent = foundLink.textContent;
    } else {
      buttonLink.href = '#';
      buttonLink.textContent = 'Learn More';
    }
    liActions.append(buttonLink);
    ulActions.append(liActions);
    highlightSection.append(ulActions);

    colDiv.append(highlightSection);
    rowDiv.append(colDiv);
  });

  containerDiv.append(rowDiv);
  section.append(containerDiv);

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);
}
