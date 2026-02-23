import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('howshift-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('howshift-mb-md-0', 'howshift-mb-3', 'howshift-text-center');

    const cells = [...row.children];

    // Cell 0: image
    const cell0 = cells[0];
    if (cell0) {
      const cell0Wrapper = document.createElement('div');
      cell0Wrapper.classList.add('howshift-left-image-div');
      const img = cell0.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cell0Wrapper.append(optimizedPic);
      }
      item.append(cell0Wrapper);
    }

    // Cell 1: text
    const cell1 = cells[1];
    if (cell1) {
      const cell1El = document.createElement('h1');
      cell1El.classList.add('howshift-heading', 'text-center', 'pb-4', 'koi-theme');
      cell1El.textContent = cell1.textContent.trim();
      item.append(cell1El);
    }

    // Cell 2: richtext
    const cell2 = cells[2];
    if (cell2) {
      const cell2Wrapper = document.createElement('div');
      cell2Wrapper.classList.add('howshift-read-more-text', 'read-more-text');
      while (cell2.firstChild) {
        cell2Wrapper.append(cell2.firstChild);
      }
      item.append(cell2Wrapper);
    }

    // Cell 3: richtext
    const cell3 = cells[3];
    if (cell3) {
      const cell3Wrapper = document.createElement('div');
      cell3Wrapper.classList.add('howshift-read-more-text', 'read-more-text');
      while (cell3.firstChild) {
        cell3Wrapper.append(cell3.firstChild);
      }
      item.append(cell3Wrapper);
    }

    // Cell 4: link
    const cell4 = cells[4];
    if (cell4) {
      const linkEl = cell4.querySelector('a');
      if (linkEl) {
        const newLink = document.createElement('a');
        newLink.classList.add('howshift-cmp-button', 'cmp-button');
        newLink.href = linkEl.href;
        newLink.textContent = linkEl.textContent.trim();
        if (linkEl.title) newLink.title = linkEl.title;
        if (linkEl.target) newLink.target = linkEl.target;
        item.append(newLink);
      }
    }

    // Cell 5: text
    const cell5 = cells[5];
    if (cell5) {
      const cell5El = document.createElement('span');
      cell5El.classList.add('howshift-cmp-button__text');
      cell5El.textContent = cell5.textContent.trim();
      item.append(cell5El);
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
