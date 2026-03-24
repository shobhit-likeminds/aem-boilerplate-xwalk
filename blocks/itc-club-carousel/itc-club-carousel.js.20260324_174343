import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // block.children[0] is the "Carousel Items value" div, which is not used.
  // The actual item rows start from block.children[1].
  const [, ...itemRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('shiftclub-itc-club-section', 'mx-md-0', 'mx-4');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('shiftclub-container');
  section.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('shiftclub-carousel', 'slide', 'shiftclub-itc-club-carousel');
  carousel.setAttribute('data-ride', 'carousel');
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('shiftclub-itc-carousel-shift');
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('shiftclub-carousel-inner');
  carouselShift.append(carouselInner);

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('shiftclub-carousel-indicators');
  carouselInner.append(olIndicators);

  itemRows.forEach((row, index) => {
    const liIndicator = document.createElement('li');
    liIndicator.setAttribute('data-target', '#carousel');
    liIndicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      liIndicator.classList.add('active');
    }
    olIndicators.append(liIndicator);

    // Add event listener to indicators for direct navigation
    liIndicator.addEventListener('click', () => {
      const currentActiveItem = carouselInner.querySelector('.shiftclub-carousel-item.active');
      const currentActiveIndicator = olIndicators.querySelector('li.active');
      const targetSlideIndex = parseInt(liIndicator.getAttribute('data-slide-to'), 10);
      const targetItem = carouselInner.querySelectorAll('.shiftclub-carousel-item')[targetSlideIndex];

      if (currentActiveItem) {
        currentActiveItem.classList.remove('active');
      }
      if (currentActiveIndicator) {
        currentActiveIndicator.classList.remove('active');
      }

      if (targetItem) {
        targetItem.classList.add('active');
        liIndicator.classList.add('active');
      }
    });

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('shiftclub-carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const dFlexWrapper = document.createElement('div');
    dFlexWrapper.classList.add('shiftclub-d-md-flex', 'd-block');
    carouselItem.append(dFlexWrapper);

    // The BlockJson model for 'carousel-item' has 4 fields: image, alt, title, description
    const [imageCell, altCell, titleCell, descriptionCell] = [...row.children];

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altCell.textContent.trim(), false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        dFlexWrapper.append(optimizedPic);
      }
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('shiftclub-w-md-50', 'w-100', 'shiftclub-itc-club-right-wrapper', 'read-more');
    dFlexWrapper.append(rightWrapper);

    const title = document.createElement('h2');
    title.classList.add('shiftclub-carousel-inner__title');
    moveInstrumentation(titleCell, title);
    title.textContent = titleCell.textContent.trim();
    rightWrapper.append(title);

    const description = document.createElement('p');
    description.classList.add('shiftclub-carousel-inner__description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) {
      description.append(descriptionCell.firstChild);
    }
    rightWrapper.append(description);

    carouselInner.append(carouselItem);
  });

  const updateCarouselState = (newIndex) => {
    const items = [...carouselInner.querySelectorAll('.shiftclub-carousel-item')];
    const indicators = [...olIndicators.querySelectorAll('li')];

    if (newIndex < 0) {
      newIndex = items.length - 1;
    } else if (newIndex >= items.length) {
      newIndex = 0;
    }

    items.forEach((item, i) => {
      item.classList.toggle('active', i === newIndex);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === newIndex);
    });
  };

  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-carousel-control-prev');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('data-target', '#carousel'); // Added from original HTML
  prevButton.setAttribute('data-slide', 'prev'); // Added from original HTML
  prevButton.addEventListener('click', () => {
    const currentActiveItem = carouselInner.querySelector('.shiftclub-carousel-item.active');
    const currentIndex = [...carouselInner.children].indexOf(currentActiveItem);
    updateCarouselState(currentIndex - 1);
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('shiftclub-carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('shiftclub-sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);
  carouselShift.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-carousel-control-next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('data-target', '#carousel'); // Added from original HTML
  nextButton.setAttribute('data-slide', 'next'); // Added from original HTML
  nextButton.addEventListener('click', () => {
    const currentActiveItem = carouselInner.querySelector('.shiftclub-carousel-item.active');
    const currentIndex = [...carouselInner.children].indexOf(currentActiveItem);
    updateCarouselState(currentIndex + 1);
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('shiftclub-carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('shiftclub-sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);
  carouselShift.append(nextButton);

  block.textContent = '';
  block.append(section);
}
