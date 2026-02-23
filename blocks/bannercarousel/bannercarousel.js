import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('bannercarousel-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('carousel-item');

    const cells = [...row.children];

    // Cell 0: image
    const cell0 = cells[0];
    if (cell0) {
      const cell0Wrapper = document.createElement('div');
      const img = cell0.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'bannercarousel-desktop-image');
        cell0Wrapper.append(optimizedPic);
      }
      item.append(cell0Wrapper);
    }

    // Cell 1: image
    const cell1 = cells[1];
    if (cell1) {
      const cell1Wrapper = document.createElement('div');
      const img = cell1.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'bannercarousel-mobile-image');
        cell1Wrapper.append(optimizedPic);
      }
      item.append(cell1Wrapper);
    }

    // Cell 2: text
    const cell2 = cells[2];
    if (cell2) {
      const cell2El = document.createElement('h1');
      cell2El.classList.add('bannercarousel-heading', 'text-sm-left');
      cell2El.textContent = cell2.textContent.trim();
      item.append(cell2El);
    }

    // Cell 3: richtext
    const cell3 = cells[3];
    if (cell3) {
      const cell3Wrapper = document.createElement('div');
      cell3Wrapper.classList.add('bannercarousel-content-wrapper', 'position-absolute', 'bannercarousel-description');
      while (cell3.firstChild) {
        cell3Wrapper.append(cell3.firstChild);
      }
      item.append(cell3Wrapper);
    }

    // Cell 4: button
    const cell4 = cells[4];
    if (cell4) {
      const btnLink = cell4.querySelector('a');
      if (btnLink) {
        const newBtn = document.createElement('a');
        newBtn.classList.add('bannercarousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        newBtn.href = btnLink.href;
        newBtn.textContent = btnLink.textContent.trim();
        if (btnLink.title) newBtn.title = btnLink.title;
        if (btnLink.target) newBtn.target = btnLink.target;
        item.append(newBtn);
      }
    }

    // Cell 5: link
    const cell5 = cells[5];
    if (cell5) {
      const linkEl = cell5.querySelector('a');
      if (linkEl) {
        const newLink = document.createElement('a');
        newLink.classList.add('bannercarousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        newLink.href = linkEl.href;
        newLink.textContent = linkEl.textContent.trim();
        if (linkEl.title) newLink.title = linkEl.title;
        if (linkEl.target) newLink.target = linkEl.target;
        item.append(newLink);
      }
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
