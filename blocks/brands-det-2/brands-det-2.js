import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const brndProductDiv = document.createElement('div');
  brndProductDiv.classList.add('brnd-product');

  // Heading
  if (headingRow) {
    const h4 = document.createElement('h4');
    moveInstrumentation(headingRow, h4);
    while (headingRow.firstChild) h4.append(headingRow.firstChild);
    brndProductDiv.append(h4);
  }

  const ul = document.createElement('ul');

  itemRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const brandImgSecDiv = document.createElement('div');
    brandImgSecDiv.classList.add('brand_img_sec');

    const a = document.createElement('a');

    const brndProductImgDiv = document.createElement('div');
    brndProductImgDiv.classList.add('brnd-product-img');

    const p = document.createElement('p');

    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture')); // Assuming the other cell is the label

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        moveInstrumentation(imageCell, brndProductImgDiv);
        brndProductImgDiv.append(picture);
      }
    }

    if (labelCell) {
      moveInstrumentation(labelCell, p);
      while (labelCell.firstChild) p.append(labelCell.firstChild);
    }

    a.append(brndProductImgDiv);
    a.append(p);
    brandImgSecDiv.append(a);
    li.append(brandImgSecDiv);
    ul.append(li);
  });

  brndProductDiv.append(ul);
  containerDiv.append(brndProductDiv);

  block.textContent = '';
  block.append(containerDiv);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
    optimizedPic.querySelector('img').classList.add('img-fluid', 'lozad');
  });
}
