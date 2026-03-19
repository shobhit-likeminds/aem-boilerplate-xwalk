import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const bannerCarousel = document.createElement('div');
  bannerCarousel.id = 'bannerCarousel';
  bannerCarousel.classList.add('banner-carousel', 'carousel', 'slide');
  bannerCarousel.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-target', '#bannerCarousel');
    li.setAttribute('data-slide-to', index);
    if (index === 0) {
      li.classList.add('active');
    }
    carouselIndicators.append(li);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    [...row.children].forEach((cell, cellIndex) => {
      if (cellIndex === 0) { // Desktop Image
        const picture = cell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '2000' }]);
          optimizedPic.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
          if (index === 0) {
            optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
          } else {
            optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
            optimizedPic.querySelector('img').setAttribute('fetchpriority', 'low');
          }
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          carouselItem.append(optimizedPic);
        }
      } else if (cellIndex === 1) { // Mobile Image
        const picture = cell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '750' }]);
          optimizedPic.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
          if (index === 0) {
            optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
          } else {
            optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
            optimizedPic.querySelector('img').setAttribute('fetchpriority', 'low');
          }
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          carouselItem.append(optimizedPic);
        }
      } else if (cellIndex === 2) { // Heading
        const h1 = cell.querySelector('h1');
        if (h1) {
          h1.classList.add('banner-heading', 'text-sm-left');
          bannerContentWrapper.append(h1);
        }
      } else if (cellIndex === 3) { // Description
        const div = document.createElement('div');
        div.classList.add('banner-description');
        while (cell.firstChild) div.append(cell.firstChild);
        bannerContentWrapper.append(div);
      } else if (cellIndex === 4) { // Button Text
        const a = cell.querySelector('a');
        if (a) {
          a.classList.add('banner-cta', 'btn', 'btn-primary', 'banner-start-now');
          a.setAttribute('target', '_blank');
          const span = document.createElement('span');
          span.classList.add('cmp-link__screen-reader-only');
          span.textContent = 'opens in a new tab';
          a.append(span);
          bannerContentWrapper.append(a);
        }
      }
    });

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#bannerCarousel';
  prevControl.setAttribute('role', 'button');
  prevControl.setAttribute('data-slide', 'prev');

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevControl.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevControl.append(prevSrOnly);
  nextCarouselBtn.append(prevControl);

  const nextControl = document.createElement('a');
  nextControl.classList.add('carousel-control-next');
  nextControl.href = '#bannerCarousel';
  nextControl.setAttribute('role', 'button');
  nextControl.setAttribute('data-slide', 'next');

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextControl.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextControl.append(nextSrOnly);
  nextCarouselBtn.append(nextControl);

  bannerCarousel.append(carouselIndicators, carouselInner, nextCarouselBtn);
  bannerSection.append(bannerCarousel);

  block.textContent = '';
  block.append(bannerSection);
}
