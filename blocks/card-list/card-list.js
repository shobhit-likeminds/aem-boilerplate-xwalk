import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('card-list-container');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('card-list-item');

    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add('card-list-image');
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-list-body');

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        moveInstrumentation(cell, cardImageDiv);
        while (cell.firstChild) cardImageDiv.append(cell.firstChild);
      } else {
        moveInstrumentation(cell, cardBodyDiv);
        while (cell.firstChild) cardBodyDiv.append(cell.firstChild);
      }
    });

    if (cardImageDiv.hasChildNodes()) {
      li.append(cardImageDiv);
    }
    if (cardBodyDiv.hasChildNodes()) {
      li.append(cardBodyDiv);
    }

    ul.append(li);
  });

  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
