import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel');
  carouselContainer.setAttribute('data-component', 'carousel');
  carouselContainer.setAttribute('data-show-infinite-scroll', 'false');
  carouselContainer.setAttribute('data-show-arrows', 'false');
  carouselContainer.setAttribute('data-show-dots', 'false');
  carouselContainer.setAttribute('data-item-count-per-slide', '1');
  carouselContainer.setAttribute('data-auto-play-is-enabled', 'false');
  carouselContainer.setAttribute('data-auto-play-speed-in-ms', '500');
  carouselContainer.setAttribute('data-reveal-next-item-partially', 'false');
  carouselContainer.setAttribute('data-show-center-zoom', 'false');
  carouselContainer.setAttribute('data-slides-to-scroll', '1');
  carouselContainer.setAttribute('data-initialized', 'true');

  const slickContainer = document.createElement('div');
  slickContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider');
  carouselContainer.append(slickContainer);

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');
  slickContainer.append(slickList);

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  slickList.append(slickTrack);

  [...block.children].forEach((row, index) => {
    const cells = [...row.children];
    // Use content detection instead of index access for robustness
    const backgroundImageCell = cells.find(cell => cell.querySelector('picture > img') && cell.querySelector('picture > img').alt === 'Background Image');
    const playIconCell = cells.find(cell => cell.querySelector('picture > img') && cell.querySelector('picture > img').alt === 'Play Icon');

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('cmp-carousel__item', 'slick-slide');
    if (index === 0) {
      carouselItem.classList.add('slick-current', 'slick-active');
      carouselItem.setAttribute('aria-hidden', 'false');
    } else {
      carouselItem.setAttribute('aria-hidden', 'true');
    }
    carouselItem.setAttribute('data-slick-index', index.toString());
    carouselItem.setAttribute('tabindex', '0');
    moveInstrumentation(row, carouselItem);

    const yippeeBannerItem = document.createElement('div');
    yippeeBannerItem.classList.add('cmp-yippee-banner__item');

    if (backgroundImageCell) {
      const backgroundImage = backgroundImageCell.querySelector('picture > img');
      if (backgroundImage) {
        yippeeBannerItem.style.backgroundImage = `url(${backgroundImage.src})`;
      }
    }

    const yippeeBannerItemWrapper = document.createElement('div');
    yippeeBannerItemWrapper.classList.add('cmp-yippee-banner__item-wrapper');

    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');

    if (playIconCell) {
      const playIcon = playIconCell.querySelector('picture > img');
      if (playIcon) {
        const optimizedPlayIcon = createOptimizedPicture(playIcon.src, playIcon.alt, false, [{ width: 'auto' }]);
        const imgEl = optimizedPlayIcon.querySelector('img');
        imgEl.classList.add('cmp-yippee-banner__play-icon', 'lazy-image', 'loaded');
        imgEl.setAttribute('loading', 'lazy');
        imgEl.setAttribute('fetchpriority', 'low');
        imgEl.style.opacity = '1';
        imgEl.style.transition = 'opacity 0.3s ease-in-out';
        // moveInstrumentation for the playIcon cell, not the img element itself
        moveInstrumentation(playIconCell, optimizedPlayIcon);
        lazyImageContainer.append(optimizedPlayIcon);
      }
    }

    yippeeBannerItemWrapper.append(lazyImageContainer);
    yippeeBannerItem.append(yippeeBannerItemWrapper);
    carouselItem.append(yippeeBannerItem);
    slickTrack.append(carouselItem);
  });

  block.replaceChildren(carouselContainer);
}
