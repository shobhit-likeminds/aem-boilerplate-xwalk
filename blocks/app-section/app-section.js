import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, imageRow, ...itemRows] = [...block.children];

  // Create the main container structure
  const container = document.createElement('div');
  container.classList.add('container');
  const row = document.createElement('div');
  row.classList.add('row');

  // Left column for heading and app list
  const leftCol = document.createElement('div');
  leftCol.classList.add('col-md-6');
  moveInstrumentation(headingRow, leftCol);

  const heading = document.createElement('h3');
  heading.classList.add('hd2', 'os-animation', 'animated', 'fadeInUp');
  heading.textContent = headingRow.firstElementChild?.textContent.trim() || '';
  leftCol.append(heading);

  const appList = document.createElement('ul');
  appList.classList.add('app-list');

  itemRows.forEach((itemRow, index) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...itemRow.children];
    const linkCell = cells.find(cell => cell.querySelector('a')); // 'aem-content' type
    const linkLabelCell = cells.find(cell => !cell.querySelector('a')); // 'text' type

    const li = document.createElement('li');
    li.classList.add('os-animation', 'animated', 'fadeInUp');
    // Apply animation delay if needed, based on original HTML pattern (e.g., 0.2s)
    li.style.animationDelay = `${0.2 + (index * 0.1)}s`;
    moveInstrumentation(itemRow, li);

    const anchor = document.createElement('a');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      } else {
        anchor.href = 'javascript:;'; // Fallback if no link, matching original 'nolink' behavior
        anchor.classList.add('nolink');
      }
    } else {
      anchor.href = 'javascript:;'; // Fallback if no link cell
      anchor.classList.add('nolink');
    }

    anchor.textContent = linkLabelCell?.textContent.trim() || '';
    li.append(anchor);
    appList.append(li);
  });
  leftCol.append(appList);

  // Right column for image
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-md-6', 'hidden-sm', 'hidden-xs', 'os-animation', 'animated', 'fadeInUp');
  rightCol.style.animationDelay = '.2s'; // Matching original HTML
  moveInstrumentation(imageRow, rightCol);

  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      // Replace the original picture element with the optimized one in the cell
      picture.replaceWith(optimizedPic);
      optimizedPic.querySelector('img').classList.add('img-responsive');
      rightCol.append(optimizedPic);
    }
  }

  row.append(leftCol, rightCol);
  container.append(row);

  block.textContent = '';
  block.append(container);
}
