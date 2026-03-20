import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('shiftclub-itc-club-section', 'shiftclub-mx-md-0', 'shiftclub-mx-4');

  const container = document.createElement('div');
  container.classList.add('shiftclub-container');
  block.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('shiftclub-carousel', 'shiftclub-slide', 'shiftclub-itc-club-carousel');
  carousel.setAttribute('data-ride', 'carousel');
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('shiftclub-itc-carousel-shift');
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('shiftclub-carousel-inner');
  carouselShift.append(carouselInner);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('shiftclub-carousel-indicators');
  carouselInner.append(carouselIndicators);

  const carouselItems = [...block.children];
  carouselItems.forEach((row, index) => {
    // Carousel Indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('shiftclub-active');
    }
    carouselIndicators.append(indicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('shiftclub-carousel-item');
    if (index === 0) {
      carouselItem.classList.add('shiftclub-active');
    }
    moveInstrumentation(row, carouselItem);

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('shiftclub-d-md-flex', 'shiftclub-d-block');
    carouselItem.append(itemContentWrapper);

    const cells = [...row.children];
    // BlockJson model has 3 fields: image, title, description
    // The original JS was incorrectly assuming only 2 cells and trying to put title/description in the second cell.
    // It should read 3 distinct cells.
    if (cells.length >= 3) {
      const imageCell = cells[0];
      const titleCell = cells[1];
      const descriptionCell = cells[2];

      // Image cell
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('shiftclub-carousel__img', 'shiftclub-d-block', 'shiftclub-w-md-50', 'shiftclub-w-100');
        itemContentWrapper.append(optimizedPic);
      }

      // Title and description cells
      const rightWrapper = document.createElement('div');
      rightWrapper.classList.add('shiftclub-w-md-50', 'shiftclub-w-100', 'shiftclub-itc-club-right-wrapper', 'shiftclub-read-more');
      itemContentWrapper.append(rightWrapper);

      const title = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (title) {
        title.classList.add('shiftclub-carousel-inner__title');
        moveInstrumentation(title, title);
        rightWrapper.append(title);
      }

      const description = descriptionCell.querySelector('p');
      if (description) {
        description.classList.add('shiftclub-carousel-inner__description');
        moveInstrumentation(description, description);
        rightWrapper.append(description);
      }
    }


    carouselInner.append(carouselItem);
  });

  // Carousel controls
  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel'); // Added missing attribute
  prevButton.setAttribute('data-slide', 'prev'); // Added missing attribute
  prevButton.setAttribute('aria-label', 'Previous');
  const prevIcon = document.createElement('span');
  prevIcon.classList.add('shiftclub-carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('shiftclub-sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);
  carouselShift.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel'); // Added missing attribute
  nextButton.setAttribute('data-slide', 'next'); // Added missing attribute
  nextButton.setAttribute('aria-label', 'Next');
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('shiftclub-carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('shiftclub-sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);
  carouselShift.append(nextButton);

  let currentIndex = 0;
  const totalItems = carouselItems.length;

  const updateCarousel = () => {
    // The carouselInner.children[i + 1] was correct because carouselIndicators is the first child
    // and then carousel items follow.
    // However, the original JS was removing 'active' from all items and then adding it back.
    // It's better to find the currently active item and indicator and remove 'active' from them,
    // then add 'active' to the new current item and indicator.
    const currentActiveItem = carouselInner.querySelector('.shiftclub-carousel-item.shiftclub-active');
    if (currentActiveItem) {
      currentActiveItem.classList.remove('shiftclub-active');
    }
    const currentActiveIndicator = carouselIndicators.querySelector('li.shiftclub-active');
    if (currentActiveIndicator) {
      currentActiveIndicator.classList.remove('shiftclub-active');
    }

    carouselInner.children[currentIndex + 1].classList.add('shiftclub-active'); // +1 to account for indicators
    carouselIndicators.children[currentIndex].classList.add('shiftclub-active');
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });

  carouselIndicators.querySelectorAll('li').forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  block.textContent = '';
  block.append(container);
}
