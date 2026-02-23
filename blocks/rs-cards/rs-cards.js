import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('rscards-container');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('rscards-col-xl-4', 'rscards-col-lg-6', 'rscards-pb-md-0', 'rscards-pb-4', 'rscards-row-gap-4', 'rscards-koi-rscard-padding');

    const cells = [...row.children];

    // Cell 0: image
    const cell0 = cells[0];
    if (cell0) {
      const cell0Wrapper = document.createElement('div');
      cell0Wrapper.classList.add('rscards-card', 'rscards-rs-card');
      const img = cell0.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('rscards-w-100', 'rscards-kitchens-image');
        cell0Wrapper.append(optimizedPic);
      }
      item.append(cell0Wrapper);
    }

    // Cell 1: text
    const cell1 = cells[1];
    if (cell1) {
      const cell1El = document.createElement('img');
      cell1El.classList.add('rscards-w-100', 'rscards-kitchens-image');
      cell1El.textContent = cell1.textContent.trim();
      item.append(cell1El);
    }

    // Cell 2: text
    const cell2 = cells[2];
    if (cell2) {
      const cell2El = document.createElement('h5');
      cell2El.classList.add('rscards-blog-card-title');
      cell2El.textContent = cell2.textContent.trim();
      item.append(cell2El);
    }

    // Cell 3: richtext
    const cell3 = cells[3];
    if (cell3) {
      const cell3Wrapper = document.createElement('h5');
      cell3Wrapper.classList.add('rscards-card-title');
      while (cell3.firstChild) {
        cell3Wrapper.append(cell3.firstChild);
      }
      item.append(cell3Wrapper);
    }

    wrapper.append(item);
  });

  wrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(wrapper);
}
