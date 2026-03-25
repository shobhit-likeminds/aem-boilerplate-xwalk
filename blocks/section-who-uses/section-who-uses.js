import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, logosRow, ...logoItems] = [...block.children];

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Heading
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('row');
  const headingCol = document.createElement('div');
  headingCol.classList.add('col');
  const h2 = document.createElement('h2');
  moveInstrumentation(headingRow.firstElementChild, h2);
  h2.append(headingRow.firstElementChild.textContent);
  headingCol.append(h2);
  headingWrapper.append(headingCol);
  containerDiv.append(headingWrapper);

  // Logos
  const logosWrapper = document.createElement('div');
  logosWrapper.classList.add('row', 'row-cols-2', 'row-cols-sm-3', 'row-cols-md-6');
  moveInstrumentation(logosRow, logosWrapper);

  logoItems.forEach((row) => {
    const [imageCell, altTextCell] = [...row.children]; // Destructure to get both cells
    const col = document.createElement('div');
    col.classList.add('col', 'd-flex', 'align-items-center');
    moveInstrumentation(row, col);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      // Use alt text from the second cell, or fallback to img.alt if the cell is empty
      newImg.alt = altTextCell?.textContent.trim() || img.alt;
      
      // Copy height/width attributes if they exist in the original image
      if (img.hasAttribute('height')) {
        newImg.setAttribute('height', img.getAttribute('height'));
      }
      if (img.hasAttribute('width')) {
        newImg.setAttribute('width', img.getAttribute('width'));
      }
      moveInstrumentation(img, newImg);
      col.append(newImg);
    }
    logosWrapper.append(col);
  });

  containerDiv.append(logosWrapper);
  block.textContent = '';
  block.append(containerDiv);
}
