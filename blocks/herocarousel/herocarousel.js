import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('herocarousel-bannerCarousel', 'herocarousel-carousel', 'herocarousel-slide');
  wrapper.setAttribute('id', 'carouselExampleSlidesOnly');
  wrapper.setAttribute('data-ride', 'carousel');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('herocarousel-carousel-item');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('img.herocarousel-desktop-image')) {
        div.classList.add('herocarousel-d-none', 'herocarousel-d-sm-block', 'herocarousel-w-100', 'herocarousel-desktop-image');
      } else if (div.querySelector('img.herocarousel-mobile-image')) {
        div.classList.add('herocarousel-d-block', 'herocarousel-d-sm-none', 'herocarousel-w-100', 'herocarousel-mobile-image');
      } else if (div.querySelector('h1')) {
        div.classList.add('herocarousel-koi-carousel-heading', 'herocarousel-text-sm-left');
      } else if (div.querySelector('div.herocarousel-koi-carousel-description')) {
        div.className = 'herocarousel-koi-carousel-description';
      } else if (div.querySelector('a')) {
        div.classList.add('herocarousel-koi-carousel-cta', 'herocarousel-btn', 'herocarousel-btn-primary', 'herocarousel-btn-start-now');
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
