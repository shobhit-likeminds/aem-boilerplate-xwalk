import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('clubsection-carousel', 'carousel', 'slide', 'clubsection-itc-club-carousel');
  wrapper.setAttribute('id', 'clubsection-carousel');
  wrapper.setAttribute('data-ride', 'carousel');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('clubsection-carousel-item', 'carousel-item');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'clubsection-carousel__img';
      } else {
        div.classList.add('clubsection-w-md-50', 'w-100', 'clubsection-itc-club-right-wrapper', 'clubsection-read-more');
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
