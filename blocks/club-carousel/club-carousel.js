import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('clubsection-itc-club-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('clubsection-container');

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('clubsection-carousel', 'carousel', 'slide', 'clubsection-itc-club-carousel');
  carousel.setAttribute('data-ride', 'carousel');

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('clubsection-itc-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('clubsection-carousel-inner');

  const indicators = document.createElement('ol');
  indicators.classList.add('clubsection-carousel-indicators', 'carousel-indicators');

  const slides = [...block.children];
  slides.forEach((row, index) => {
    // indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicators.append(indicator);

    // carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('clubsection-carousel-item', 'carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('clubsection-d-md-flex', 'clubsection-d-block');

    const imageCell = row.children[0]; // image (reference)
    const altTextCell = row.children[1]; // alt (text)
    const titleCell = row.children[2]; // title (text)
    const descriptionCell = row.children[3]; // description (richtext)

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('clubsection-carousel__img', 'd-block', 'w-md-50', 'w-100');
      itemContentWrapper.append(optimizedPic);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('clubsection-w-md-50', 'clubsection-w-100', 'clubsection-itc-club-right-wrapper', 'clubsection-read-more');

    // Title
    const title = document.createElement('h2');
    title.classList.add('clubsection-carousel-inner__title');
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    rightWrapper.append(title);

    // Description
    const description = document.createElement('p');
    description.classList.add('clubsection-carousel-inner__description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    rightWrapper.append(description);

    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselInner.prepend(indicators);
  carouselShift.append(carouselInner);

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add('clubsection-carousel-control-prev', 'carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.clubsection-carousel-item.active');
    const prevItem = activeItem.previousElementSibling;
    const allItems = carouselInner.querySelectorAll('.clubsection-carousel-item');
    const targetItem = prevItem && prevItem.classList.contains('clubsection-carousel-item') ? prevItem : allItems[allItems.length - 1];

    if (targetItem) {
      activeItem.classList.remove('active');
      targetItem.classList.add('active');

      const activeIndicator = indicators.querySelector('li.active');
      const prevIndicator = activeIndicator.previousElementSibling;
      const allIndicators = indicators.querySelectorAll('li');
      const targetIndicator = prevIndicator || allIndicators[allIndicators.length - 1];
      activeIndicator.classList.remove('active');
      targetIndicator.classList.add('active');
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);
  carouselShift.append(prevButton);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add('clubsection-carousel-control-next', 'carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.clubsection-carousel-item.active');
    const nextItem = activeItem.nextElementSibling;
    const allItems = carouselInner.querySelectorAll('.clubsection-carousel-item');
    const targetItem = nextItem && nextItem.classList.contains('clubsection-carousel-item') ? nextItem : allItems[0];

    if (targetItem) {
      activeItem.classList.remove('active');
      targetItem.classList.add('active');

      const activeIndicator = indicators.querySelector('li.active');
      const nextIndicator = activeIndicator.nextElementSibling;
      const allIndicators = indicators.querySelectorAll('li');
      const targetIndicator = nextIndicator || allIndicators[0];
      activeIndicator.classList.remove('active');
      targetIndicator.classList.add('active');
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);
  carouselShift.append(nextButton);

  carousel.append(carouselShift);
  container.append(carousel);
  block.textContent = '';
  block.append(container);
}
