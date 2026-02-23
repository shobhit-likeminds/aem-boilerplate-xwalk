import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('footer');
  wrapper.classList.add('footer-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);

    const cells = [...row.children];

    // Cell 0: image
    const cell0 = cells[0];
    if (cell0) {
      const cell0Wrapper = document.createElement('div');
      cell0Wrapper.classList.add('footer-itc-logo', 'logo-image');
      const img = cell0.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cell0Wrapper.append(optimizedPic);
      }
      item.append(cell0Wrapper);
    }

    // Cell 1: image
    const cell1 = cells[1];
    if (cell1) {
      const cell1Wrapper = document.createElement('div');
      cell1Wrapper.classList.add('footer-fssai-logo', 'fssailogo-image');
      const img = cell1.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cell1Wrapper.append(optimizedPic);
      }
      item.append(cell1Wrapper);
    }

    // Cell 2: richtext
    const cell2 = cells[2];
    if (cell2) {
      const cell2Wrapper = document.createElement('div');
      cell2Wrapper.classList.add('list-4-container');
      while (cell2.firstChild) {
        cell2Wrapper.append(cell2.firstChild);
      }
      item.append(cell2Wrapper);
    }

    // Cell 3: richtext
    const cell3 = cells[3];
    if (cell3) {
      const cell3Wrapper = document.createElement('div');
      cell3Wrapper.classList.add('list-3-container');
      while (cell3.firstChild) {
        cell3Wrapper.append(cell3.firstChild);
      }
      item.append(cell3Wrapper);
    }

    // Cell 4: richtext
    const cell4 = cells[4];
    if (cell4) {
      const cell4Wrapper = document.createElement('div');
      cell4Wrapper.classList.add('footer-link-right');
      while (cell4.firstChild) {
        cell4Wrapper.append(cell4.firstChild);
      }
      item.append(cell4Wrapper);
    }

    // Cell 5: text
    const cell5 = cells[5];
    if (cell5) {
      const cell5El = document.createElement('h5');
      cell5El.classList.add('contact-details__title');
      cell5El.textContent = cell5.textContent.trim();
      item.append(cell5El);
    }

    // Cell 6: text
    const cell6 = cells[6];
    if (cell6) {
      const cell6El = document.createElement('p');
      cell6El.classList.add('contact-details__description');
      cell6El.textContent = cell6.textContent.trim();
      item.append(cell6El);
    }

    // Cell 7: text
    const cell7 = cells[7];
    if (cell7) {
      const cell7El = document.createElement('p');
      cell7El.classList.add('contact-details__description');
      cell7El.textContent = cell7.textContent.trim();
      item.append(cell7El);
    }

    // Cell 8: text
    const cell8 = cells[8];
    if (cell8) {
      const cell8El = document.createElement('p');
      cell8El.classList.add('contact-details__description');
      cell8El.textContent = cell8.textContent.trim();
      item.append(cell8El);
    }

    // Cell 9: text
    const cell9 = cells[9];
    if (cell9) {
      const cell9El = document.createElement('span');
      cell9El.classList.add('footer-link');
      cell9El.textContent = cell9.textContent.trim();
      item.append(cell9El);
    }

    // Cell 10: richtext
    const cell10 = cells[10];
    if (cell10) {
      const cell10Wrapper = document.createElement('ul');
      cell10Wrapper.classList.add('footer-secondary-container');
      while (cell10.firstChild) {
        cell10Wrapper.append(cell10.firstChild);
      }
      item.append(cell10Wrapper);
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
