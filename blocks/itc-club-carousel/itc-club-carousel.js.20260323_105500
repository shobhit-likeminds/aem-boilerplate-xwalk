import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockPrefix = 'itc-club-carousel-';

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add(blockPrefix + 'container'); // Corrected class prefix

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add(blockPrefix + 'carousel', 'carousel', 'slide');
  carousel.setAttribute('data-ride', 'carousel');

  const carouselShift = document.createElement('div');
  carouselShift.classList.add(blockPrefix + 'itc-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add(blockPrefix + 'carousel-inner');

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add(blockPrefix + 'carousel-indicators');

  const itemRows = [...block.children];

  itemRows.forEach((row, index) => {
    // Create indicator
    const liIndicator = document.createElement('li');
    liIndicator.setAttribute('data-target', '#carousel');
    liIndicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      liIndicator.classList.add('active');
    }
    olIndicators.append(liIndicator);

    // Add event listener for indicator click
    liIndicator.addEventListener('click', () => {
      const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
      const currentActiveIndicator = olIndicators.querySelector('.active');

      if (currentActiveItem) {
        currentActiveItem.classList.remove('active');
      }
      if (currentActiveIndicator) {
        currentActiveIndicator.classList.remove('active');
      }

      carouselInner.children[index].classList.add('active');
      liIndicator.classList.add('active');
    });

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add(blockPrefix + 'carousel-item', 'carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add(blockPrefix + 'd-md-flex', 'd-block'); // Corrected class prefix

    moveInstrumentation(row, carouselItem);

    const [imageCell, headingCell, descriptionCell] = [...row.children];

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add(blockPrefix + 'carousel__img', 'd-block', 'w-md-50', 'w-100');
      itemContentWrapper.append(optimizedPic);
    }

    // Right wrapper for text content
    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add(blockPrefix + 'w-md-50', 'w-100', blockPrefix + 'right-wrapper', 'read-more'); // Corrected class prefix

    // Heading
    const heading = document.createElement('h2');
    heading.classList.add(blockPrefix + 'carousel-inner__title');
    moveInstrumentation(headingCell, heading);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    rightWrapper.append(heading);

    // Description
    const description = document.createElement('p');
    description.classList.add(blockPrefix + 'carousel-inner__description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    rightWrapper.append(description);

    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselShift.append(olIndicators, carouselInner);

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add(blockPrefix + 'carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    if (prevItem && prevItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      const activeIndicator = olIndicators.querySelector('.active');
      const prevIndicator = activeIndicator.previousElementSibling || olIndicators.lastElementChild;
      activeIndicator.classList.remove('active');
      prevIndicator.classList.add('active');
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add(blockPrefix + 'carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add(blockPrefix + 'sr-only'); // Corrected class prefix
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);
  carouselShift.append(prevButton);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add(blockPrefix + 'carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    if (nextItem && nextItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      const activeIndicator = olIndicators.querySelector('.active');
      const nextIndicator = activeIndicator.nextElementSibling || olIndicators.firstElementChild;
      activeIndicator.classList.remove('active');
      nextIndicator.classList.add('active');
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add(blockPrefix + 'carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add(blockPrefix + 'sr-only'); // Corrected class prefix
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);
  carouselShift.append(nextButton);

  carousel.append(carouselShift);
  carouselContainer.append(carousel);
  block.textContent = '';
  block.classList.add(blockPrefix + 'itc-club-section', 'mx-md-0', 'mx-4'); // Corrected class prefix
  block.append(carouselContainer);
}
