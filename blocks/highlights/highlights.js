import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, ...highlightRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('wrapper', 'style3');
  moveInstrumentation(block, section);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  moveInstrumentation(titleRow, titleDiv);
  while (titleRow.firstChild) titleDiv.append(titleRow.firstChild);
  section.append(titleDiv);

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const row = document.createElement('div');
  row.classList.add('row', 'aln-center');
  container.append(row);

  highlightRows.forEach((highlightRow) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-4', 'col-12-medium');
    moveInstrumentation(highlightRow, colDiv);

    const highlightSection = document.createElement('section');
    highlightSection.classList.add('highlight');
    colDiv.append(highlightSection);

    const [imageCell, headingCell, descriptionCell, linkCell] = [...highlightRow.children];

    const imageLink = document.createElement('a');
    imageLink.classList.add('image', 'featured');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageLink.append(optimizedPic);
      }
    }
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      imageLink.href = foundLink.href;
    }
    highlightSection.append(imageLink);

    const heading = document.createElement('h3');
    const headingLink = document.createElement('a');
    if (foundLink) {
      headingLink.href = foundLink.href;
    }
    moveInstrumentation(headingCell, headingLink);
    while (headingCell.firstChild) headingLink.append(headingCell.firstChild);
    heading.append(headingLink);
    highlightSection.append(heading);

    const description = document.createElement('p');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    highlightSection.append(description);

    const actionsUl = document.createElement('ul');
    actionsUl.classList.add('actions');
    const actionsLi = document.createElement('li');
    const buttonLink = document.createElement('a');
    buttonLink.classList.add('button', 'style1');
    if (foundLink) {
      buttonLink.href = foundLink.href;
      buttonLink.textContent = foundLink.textContent;
    }
    actionsLi.append(buttonLink);
    actionsUl.append(actionsLi);
    highlightSection.append(actionsUl);

    row.append(colDiv);
  });

  block.textContent = '';
  block.append(section);
}
