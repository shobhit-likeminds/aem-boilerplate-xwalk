import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('shiftclub-itc-club-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('shiftclub-container');
  section.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('shiftclub-carousel', 'slide', 'shiftclub-itc-club-carousel');
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('shiftclub-itc-carousel-shift');
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('shiftclub-carousel-inner');
  carouselShift.append(carouselInner);

  const indicators = document.createElement('ol');
  indicators.classList.add('shiftclub-carousel-indicators');
  carouselInner.append(indicators);

  const carouselItems = [...block.children];

  carouselItems.forEach((row, index) => {
    // Indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicators.append(indicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('shiftclub-carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('shiftclub-d-md-flex', 'd-block');
    carouselItem.append(itemContentWrapper);

    // Model fields: image, imageAlt, title, description
    const cells = [...row.children];
    const imageCell = cells[0];
    const imageAltCell = cells[1];
    const titleCell = cells[2];
    const descriptionCell = cells[3];

    let imageEl = null;
    let imageAlt = '';
    let titleEl = null;
    let descriptionEl = null;

    if (imageCell) {
      imageEl = imageCell.querySelector('picture');
    }
    if (imageAltCell) {
      imageAlt = imageAltCell.textContent.trim();
    }
    if (titleCell) {
      titleEl = titleCell;
    }
    if (descriptionCell) {
      descriptionEl = descriptionCell;
    }

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, imageAlt || img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      const newImg = optimizedPic.querySelector('img');
      newImg.classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
      itemContentWrapper.append(optimizedPic);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('shiftclub-w-md-50', 'w-100', 'shiftclub-itc-club-right-wrapper', 'read-more');
    itemContentWrapper.append(rightWrapper);

    if (titleEl) {
      const h2 = document.createElement('h2');
      h2.classList.add('shiftclub-carousel-inner__title');
      moveInstrumentation(titleEl, h2);
      while (titleEl.firstChild) h2.append(titleEl.firstChild);
      rightWrapper.append(h2);
    }

    if (descriptionEl) {
      const p = document.createElement('p');
      p.classList.add('shiftclub-carousel-inner__description');
      moveInstrumentation(descriptionEl, p);
      while (descriptionEl.firstChild) p.append(descriptionEl.firstChild);
      rightWrapper.append(p);
    }

    carouselInner.append(carouselItem);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel'); // Added for interactivity
  prevButton.setAttribute('data-slide', 'prev'); // Added for interactivity
  prevButton.setAttribute('aria-label', 'Previous'); // Added for accessibility
  carouselShift.append(prevButton);

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('shiftclub-carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevText = document.createElement('span');
  prevText.classList.add('shiftclub-sr-only');
  prevText.textContent = 'Previous';
  prevButton.append(prevText);

  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel'); // Added for interactivity
  nextButton.setAttribute('data-slide', 'next'); // Added for interactivity
  nextButton.setAttribute('aria-label', 'Next'); // Added for accessibility
  carouselShift.append(nextButton);

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('shiftclub-carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextText = document.createElement('span');
  nextText.classList.add('shiftclub-sr-only');
  nextText.textContent = 'Next';
  nextButton.append(nextText);

  let currentIndex = 0;
  const totalItems = carouselItems.length;

  // Initialize active state for the first item
  if (totalItems > 0) {
    carouselInner.querySelector('.shiftclub-carousel-item').classList.add('active');
    indicators.querySelector('li').classList.add('active');
  }

  const updateCarousel = () => {
    carouselInner.querySelectorAll('.shiftclub-carousel-item').forEach((item, i) => {
      item.classList.toggle('active', i === currentIndex);
    });
    indicators.querySelectorAll('li').forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentIndex);
    });
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  });

  indicators.querySelectorAll('li').forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  block.textContent = '';
  block.append(section);
}
