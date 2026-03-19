import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('shiftclub-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('container');

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('shiftclub-carousel', 'carousel', 'slide');

  const shiftclubCarouselShift = document.createElement('div');
  shiftclubCarouselShift.classList.add('shiftclub-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselItems = [...block.children];
  carouselItems.forEach((row, index) => {
    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const dFlexWrapper = document.createElement('div');
    dFlexWrapper.classList.add('d-md-flex', 'd-block');

    moveInstrumentation(row, carouselItem);

    let imageEl = null;
    let titleEl = null;
    let descriptionEl = null;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        imageEl = cell.querySelector('picture');
      } else if (cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        titleEl = cell.querySelector('h1, h2, h3, h4, h5, h6');
      } else if (cell.querySelector('p')) {
        descriptionEl = cell.querySelector('p');
      }
    });

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
      dFlexWrapper.append(optimizedPic);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'shiftclub-right-wrapper', 'read-more');
    if (titleEl) {
      titleEl.classList.add('shiftclub-carousel-inner__title');
      rightWrapper.append(titleEl);
    }
    if (descriptionEl) {
      descriptionEl.classList.add('shiftclub-carousel-inner__description');
      rightWrapper.append(descriptionEl);
    }
    dFlexWrapper.append(rightWrapper);
    carouselItem.append(dFlexWrapper);
    carouselInner.append(carouselItem);
  });

  shiftclubCarouselShift.append(carouselIndicators, carouselInner);

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
  prevButton.addEventListener('click', () => {
    const activeItem = carousel.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    if (prevItem && prevItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');

      const activeIndicator = carousel.querySelector('.carousel-indicators .active');
      const prevIndicator = activeIndicator.previousElementSibling || carouselIndicators.lastElementChild;
      activeIndicator.classList.remove('active');
      prevIndicator.classList.add('active');
    }
  });

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
  nextButton.addEventListener('click', () => {
    const activeItem = carousel.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    if (nextItem && nextItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');

      const activeIndicator = carousel.querySelector('.carousel-indicators .active');
      const nextIndicator = activeIndicator.nextElementSibling || carouselIndicators.firstElementChild;
      activeIndicator.classList.remove('active');
      nextIndicator.classList.add('active');
    }
  });

  shiftclubCarouselShift.append(prevButton, nextButton);
  carousel.append(shiftclubCarouselShift);
  container.append(carousel);
  block.textContent = '';
  block.append(container);
}
