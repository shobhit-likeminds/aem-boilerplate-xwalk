import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, imageRow, ...appItemRows] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row');

  const leftCol = document.createElement('div');
  leftCol.classList.add('col-md-6');

  // Heading
  const headingEl = document.createElement('h3');
  headingEl.classList.add('hd2', 'os-animation', 'animated', 'fadeInUp');
  moveInstrumentation(headingRow.firstElementChild, headingEl);
  headingEl.innerHTML = headingRow.firstElementChild.innerHTML;
  leftCol.append(headingEl);

  // App List
  const appList = document.createElement('ul');
  appList.classList.add('app-list');

  appItemRows.forEach((rowEl) => {
    const li = document.createElement('li');
    li.classList.add('os-animation', 'animated', 'fadeInUp');
    moveInstrumentation(rowEl, li);

    // Each app-item row has only one cell: label
    const cell = rowEl.firstElementChild;
    const link = cell.querySelector('a') || document.createElement('a');
    if (!cell.querySelector('a')) { // If no link exists, create one and move content
      link.classList.add('nolink');
      link.href = 'javascript:;'; // Placeholder href
      while (cell.firstChild) link.append(cell.firstChild);
    }
    li.append(link);
    appList.append(li);
  });
  leftCol.append(appList);
  row.append(leftCol);

  // Image
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-md-6', 'hidden-sm', 'hidden-xs', 'os-animation', 'animated', 'fadeInUp');

  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('img-responsive');
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    rightCol.append(optimizedPic);
  }
  row.append(rightCol);

  container.append(row);
  block.textContent = '';
  block.append(container);
}
