import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, featuresContainer, ...featureRows] = [...block.children];

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Heading section
  const headingSectionRow = document.createElement('div');
  headingSectionRow.classList.add('row');
  const headingCol = document.createElement('div');
  headingCol.classList.add('col');
  const h2 = document.createElement('h2');
  moveInstrumentation(headingRow.firstElementChild, h2);
  h2.append(...headingRow.firstElementChild.children);
  headingCol.append(h2);
  headingSectionRow.append(headingCol);
  containerDiv.append(headingSectionRow);

  // Features grid
  const featuresGridRow = document.createElement('div');
  featuresGridRow.classList.add('row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-lg-2');
  moveInstrumentation(featuresContainer, featuresGridRow);

  featureRows.forEach((row) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col');
    moveInstrumentation(row, colDiv);

    // According to BlockJson and EDS Block Structure, each feature item row has 3 cells:
    // cell[0]: image (picture)
    // cell[1]: title (text)
    // cell[2]: text (richtext with p tag)
    const [imageCell, titleCell, textCell] = row.children;

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          // The original HTML uses height="56" width="56" for the image.
          // createOptimizedPicture should reflect this.
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '56' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          colDiv.append(optimizedPic);
        }
      }
    }

    if (titleCell) {
      const h3 = document.createElement('h3');
      moveInstrumentation(titleCell, h3);
      while (titleCell.firstChild) h3.append(titleCell.firstChild);
      colDiv.append(h3);
    }

    if (textCell) {
      const p = document.createElement('p');
      moveInstrumentation(textCell, p);
      while (textCell.firstChild) p.append(textCell.firstChild);
      colDiv.append(p);
    }

    featuresGridRow.append(colDiv);
  });

  containerDiv.append(featuresGridRow);
  block.textContent = '';
  block.append(containerDiv);
}
