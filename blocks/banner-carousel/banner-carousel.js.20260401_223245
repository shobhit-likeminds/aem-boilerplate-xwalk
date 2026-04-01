import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('carousel-item');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('img.banner-desktop-image')) {
        div.className = 'banner-desktop-image';
      } else if (div.querySelector('img.banner-mobile-image')) {
        div.className = 'banner-mobile-image';
      } else if (div.querySelector('h1.banner-heading')) {
        div.className = 'banner-heading';
      } else if (div.querySelector('div.banner-description')) {
        div.className = 'banner-description';
      } else if (div.querySelector('a.banner-cta')) {
        div.className = 'banner-cta';
      } else {
        div.className = 'banner-content-wrapper';
      }
    });
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
