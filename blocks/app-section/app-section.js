import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Block structure:
  // block.children[0]: Heading row
  // block.children[1]: Image row
  // block.children[2...N]: Application item rows

  const [headingRow, imageRow, ...applicationRows] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row');

  // Left column for heading and applications list
  const leftCol = document.createElement('div');
  leftCol.classList.add('col-md-6');

  // Heading
  // The heading row has only one cell: block.children[0].firstElementChild
  const headingCell = headingRow.firstElementChild;
  const h3 = document.createElement('h3');
  moveInstrumentation(headingRow, h3);
  h3.classList.add('hd2', 'os-animation', 'animated', 'fadeInUp');
  h3.setAttribute('data-os-animation', 'fadeInUp');
  h3.setAttribute('data-os-animation-delay', '.2s');
  while (headingCell.firstChild) h3.append(headingCell.firstChild);
  leftCol.append(h3);

  // Applications List
  const ul = document.createElement('ul');
  ul.classList.add('app-list');

  applicationRows.forEach((appRow) => {
    const li = document.createElement('li');
    moveInstrumentation(appRow, li);
    li.classList.add('os-animation', 'animated', 'fadeInUp');
    li.setAttribute('data-os-animation', 'fadeInUp');
    li.setAttribute('data-os-animation-delay', '0.2s');

    // Each appRow has only one cell: appRow.firstElementChild
    const appTextCell = appRow.firstElementChild;
    const foundLink = appTextCell.querySelector('a');
    const link = document.createElement('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.classList.add('nolink');
      moveInstrumentation(appTextCell, link);
      while (appTextCell.firstChild) link.append(appTextCell.firstChild);
    } else {
      link.href = 'javascript:;'; // Default href if no link is found
      link.classList.add('nolink');
      moveInstrumentation(appTextCell, link);
      while (appTextCell.firstChild) link.append(appTextCell.firstChild);
    }
    li.append(link);
    ul.append(li);
  });
  leftCol.append(ul);
  row.append(leftCol);

  // Right column for image
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-md-6', 'hidden-sm', 'hidden-xs', 'os-animation', 'animated', 'fadeInUp');
  rightCol.setAttribute('data-os-animation', 'fadeInUp');
  rightCol.setAttribute('data-os-animation-delay', '.2s');

  // The imageRow has only one cell: imageRow.firstElementChild
  const imageCell = imageRow.firstElementChild;
  const picture = imageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      rightCol.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('img-responsive');
    }
  }
  row.append(rightCol);

  container.append(row);
  block.textContent = '';
  block.append(container);
}
