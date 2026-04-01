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
  moveInstrumentation(headingRow, headingEl);
  headingEl.classList.add('hd2', 'os-animation', 'animated', 'fadeInUp');
  headingEl.setAttribute('data-os-animation', 'fadeInUp');
  headingEl.setAttribute('data-os-animation-delay', '.2s');
  // The headingRow contains a div, which contains the text. We need to append the text directly.
  const headingTextDiv = headingRow.querySelector('div');
  if (headingTextDiv) {
    while (headingTextDiv.firstChild) headingEl.append(headingTextDiv.firstChild);
  }
  leftCol.append(headingEl);

  // App List
  const appList = document.createElement('ul');
  appList.classList.add('app-list');

  appItemRows.forEach((rowEl) => {
    const li = document.createElement('li');
    moveInstrumentation(rowEl, li);
    li.classList.add('os-animation', 'animated', 'fadeInUp');
    li.setAttribute('data-os-animation', 'fadeInUp');
    li.setAttribute('data-os-animation-delay', '0.2s');

    // Each app item row has one cell containing the text/link
    const cells = [...rowEl.children];
    const textCell = cells.find(cell => cell.textContent.trim() !== ''); // Find cell with text

    if (textCell) {
      const existingLink = textCell.querySelector('a');
      if (existingLink) {
        li.append(existingLink);
      } else {
        // If there's no link, create one and wrap the text
        const link = document.createElement('a');
        link.href = 'javascript:;'; // Use a placeholder for non-linked items
        link.classList.add('nolink');
        while (textCell.firstChild) link.append(textCell.firstChild);
        li.append(link);
      }
    }
    appList.append(li);
  });
  leftCol.append(appList);
  row.append(leftCol);

  // Image Column
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-md-6', 'hidden-sm', 'hidden-xs', 'os-animation', 'animated', 'fadeInUp');
  rightCol.setAttribute('data-os-animation', 'fadeInUp');
  rightCol.setAttribute('data-os-animation-delay', '.2s');

  // The imageRow contains a div, which contains the picture.
  const imageCell = imageRow.querySelector('div');
  const picture = imageCell ? imageCell.querySelector('picture') : null;

  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      rightCol.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('img-responsive'); // Apply class to the img inside picture
    }
  }
  row.append(rightCol);

  container.append(row);
  block.textContent = '';
  block.append(container);
}
