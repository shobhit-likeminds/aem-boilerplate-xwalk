import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('countryselectormodal-modal', 'fade', 'itc-country-selector', 'show');
  wrapper.setAttribute('id', 'countryModal');
  wrapper.setAttribute('tabindex', '-1');
  wrapper.setAttribute('role', 'dialog');
  wrapper.setAttribute('aria-labelledby', 'countryModalLabel');
  wrapper.setAttribute('aria-modal', 'true');
  wrapper.setAttribute('style', 'display: block;');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('countryselectormodal-country-option', 'country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.classList.add('countryselectormodal-country-flag', 'country-flag');
      } else {
        div.classList.add('countryselectormodal-country-name', 'country-name');
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
