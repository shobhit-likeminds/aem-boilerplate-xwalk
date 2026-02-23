import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('clubsection-itc-club-section', 'mx-md-0', 'mx-4');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('clubsection-carousel-item');

    const cells = [...row.children];

    // Cell 0: image
    const cell0 = cells[0];
    if (cell0) {
      const cell0Wrapper = document.createElement('div');
      cell0Wrapper.classList.add('clubsection-d-md-flex', 'clubsection-d-block');
      const img = cell0.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('clubsection-carousel__img', 'clubsection-d-block', 'clubsection-w-md-50', 'clubsection-w-100');
        cell0Wrapper.append(optimizedPic);
      }
      item.append(cell0Wrapper);
    }

    // Cell 1: richtext
    const cell1 = cells[1];
    if (cell1) {
      const cell1Wrapper = document.createElement('div');
      cell1Wrapper.classList.add('clubsection-w-md-50', 'clubsection-w-100', 'clubsection-itc-club-right-wrapper', 'clubsection-read-more');
      while (cell1.firstChild) {
        cell1Wrapper.append(cell1.firstChild);
      }
      item.append(cell1Wrapper);
    }

    // Cell 2: richtext
    const cell2 = cells[2];
    if (cell2) {
      const cell2Wrapper = document.createElement('div');
      cell2Wrapper.classList.add('clubsection-w-md-50', 'clubsection-w-100', 'clubsection-itc-club-right-wrapper', 'clubsection-read-more');
      while (cell2.firstChild) {
        cell2Wrapper.append(cell2.firstChild);
      }
      item.append(cell2Wrapper);
    }

    section.append(item);
  });

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);
}
