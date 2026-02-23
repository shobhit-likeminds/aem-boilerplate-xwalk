import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('header');
  wrapper.classList.add('header-itc-header-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);

    const cells = [...row.children];

    // Cell 0: image
    const cell0 = cells[0];
    if (cell0) {
      const cell0Wrapper = document.createElement('div');
      cell0Wrapper.classList.add('header-logo', 'header-image');
      const img = cell0.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('header-cmp-image__image', 'header-itc-logo-image');
        cell0Wrapper.append(optimizedPic);
      }
      item.append(cell0Wrapper);
    }

    // Cell 1: link
    const cell1 = cells[1];
    if (cell1) {
      const linkEl = cell1.querySelector('a');
      if (linkEl) {
        const newLink = document.createElement('a');
        newLink.classList.add('header-checkLogoLink');
        newLink.href = linkEl.href;
        newLink.textContent = linkEl.textContent.trim();
        if (linkEl.title) newLink.title = linkEl.title;
        if (linkEl.target) newLink.target = linkEl.target;
        item.append(newLink);
      }
    }

    // Cell 2: image
    const cell2 = cells[2];
    if (cell2) {
      const cell2Wrapper = document.createElement('div');
      cell2Wrapper.classList.add('header-logo', 'header-image');
      const img = cell2.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('header-cmp-image__image');
        cell2Wrapper.append(optimizedPic);
      }
      item.append(cell2Wrapper);
    }

    // Cell 3: link
    const cell3 = cells[3];
    if (cell3) {
      const linkEl = cell3.querySelector('a');
      if (linkEl) {
        const newLink = document.createElement('a');
        newLink.classList.add('header-cmp-image__link');
        newLink.href = linkEl.href;
        newLink.textContent = linkEl.textContent.trim();
        if (linkEl.title) newLink.title = linkEl.title;
        if (linkEl.target) newLink.target = linkEl.target;
        item.append(newLink);
      }
    }

    // Cell 4: richtext
    const cell4 = cells[4];
    if (cell4) {
      const cell4Wrapper = document.createElement('div');
      cell4Wrapper.classList.add('header-nav-item', 'header-navigation');
      while (cell4.firstChild) {
        cell4Wrapper.append(cell4.firstChild);
      }
      item.append(cell4Wrapper);
    }

    // Cell 5: text
    const cell5 = cells[5];
    if (cell5) {
      const cell5El = document.createElement('span');
      cell5El.classList.add('header-country-code');
      cell5El.textContent = cell5.textContent.trim();
      item.append(cell5El);
    }

    // Cell 6: image
    const cell6 = cells[6];
    if (cell6) {
      const cell6Wrapper = document.createElement('div');
      const img = cell6.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cell6Wrapper.append(optimizedPic);
      }
      item.append(cell6Wrapper);
    }

    // Cell 7: image
    const cell7 = cells[7];
    if (cell7) {
      const cell7Wrapper = document.createElement('div');
      const img = cell7.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cell7Wrapper.append(optimizedPic);
      }
      item.append(cell7Wrapper);
    }

    // Cell 8: richtext
    const cell8 = cells[8];
    if (cell8) {
      const cell8Wrapper = document.createElement('div');
      cell8Wrapper.classList.add('header-modal-body');
      while (cell8.firstChild) {
        cell8Wrapper.append(cell8.firstChild);
      }
      item.append(cell8Wrapper);
    }

    // Cell 9: image
    const cell9 = cells[9];
    if (cell9) {
      const cell9Wrapper = document.createElement('div');
      const img = cell9.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cell9Wrapper.append(optimizedPic);
      }
      item.append(cell9Wrapper);
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
