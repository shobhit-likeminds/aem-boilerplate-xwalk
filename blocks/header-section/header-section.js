import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('header');
  wrapper.classList.add('header-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('container');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('nav')) {
        div.classList.add('header-navbar', 'navbar', 'navbar-expand-xl', 'navbar-light', 'bg-light', 'px-xl-5', 'd-flex', 'justify-content-between', 'align-items-center');
      } else if (div.querySelector('div.header-modal-country-selector')) {
        div.classList.add('header-modal-country-selector', 'modal', 'fade', 'itc-country-selector', 'show');
      } else {
      }
    });
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
