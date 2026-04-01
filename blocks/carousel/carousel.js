import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel');
  carouselContainer.setAttribute('data-component', 'carousel');
  carouselContainer.setAttribute('data-show-infinite-scroll', 'false');
  carouselContainer.setAttribute('data-show-arrows', 'false');
  carouselContainer.setAttribute('data-show-dots', 'true');
  carouselContainer.setAttribute('data-item-count-per-slide', '1');
  carouselContainer.setAttribute('data-auto-play-is-enabled', 'false');
  carouselContainer.setAttribute('data-auto-play-speed-in-ms', '500');
  carouselContainer.setAttribute('data-reveal-next-item-partially', 'false');
  carouselContainer.setAttribute('data-show-center-zoom', 'false');
  carouselContainer.setAttribute('data-slides-to-scroll', '1');
  carouselContainer.setAttribute('data-initialized', 'true');

  const cmpCarouselContainer = document.createElement('div');
  cmpCarouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider');

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  // The original HTML has width: 1140px; transform: translate3d(0px, 0px, 0px);
  // However, setting width directly is a violation of Rule 7.
  // Instead, we will rely on CSS to define the width.
  // transform is also a dynamic property, best left to CSS or JS-driven animation.

  // The BlockJson indicates an empty model, so there should be no processing of block.children.
  // The original HTML also shows an empty slick-track.

  slickList.append(slickTrack);
  cmpCarouselContainer.append(slickList);
  carouselContainer.append(cmpCarouselContainer);

  block.textContent = '';
  // The block already has 'slickcarousel' and 'panelcontainer' classes from the original HTML.
  // No need to re-add them.
  block.append(carouselContainer);
}
