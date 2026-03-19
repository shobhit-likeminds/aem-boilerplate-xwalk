import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('shiftclub-section', 'shiftclub-mx-md-0', 'shiftclub-mx-4');

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('carousel', 'slide', 'shiftclub-carousel');
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('shiftclub-carousel-shift');
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');
  carouselShift.append(carouselInner);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');
  carouselInner.append(carouselIndicators);

  [...block.children].forEach((row, index) => {
    // row0: image (reference), row1: title (text), row2: description (richtext)
    const [imageCell, titleCell, descriptionCell] = [...row.children];

    // Create indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('d-md-flex', 'd-block');
    carouselItem.append(itemContentWrapper);

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itemContentWrapper.append(optimizedPic);
      }
    }

    // Right wrapper for title and description
    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'shiftclub-right-wrapper', 'shiftclub-read-more');
    itemContentWrapper.append(rightWrapper);

    // Title
    const title = document.createElement('h2');
    title.classList.add('shiftclub-carousel-inner__title');
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    rightWrapper.append(title);

    // Description
    const description = document.createElement('p');
    description.classList.add('shiftclub-carousel-inner__description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    rightWrapper.append(description);

    carouselInner.append(carouselItem);
  });

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling;
    if (prevItem && prevItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('.active');
      const prevIndicator = activeIndicator.previousElementSibling;
      if (prevIndicator) {
        activeIndicator.classList.remove('active');
        prevIndicator.classList.add('active');
      } else {
        activeIndicator.classList.remove('active');
        carouselIndicators.lastElementChild.classList.add('active');
      }
    } else {
      activeItem.classList.remove('active');
      carouselInner.lastElementChild.classList.add('active'); // Loop to last
      const activeIndicator = carouselIndicators.querySelector('.active');
      activeIndicator.classList.remove('active');
      carouselIndicators.lastElementChild.classList.add('active');
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevText = document.createElement('span');
  prevText.classList.add('sr-only');
  prevText.textContent = 'Previous';
  prevButton.append(prevText);
  carouselShift.append(prevButton);


  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling;
    if (nextItem && nextItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('.active');
      const nextIndicator = activeIndicator.nextElementSibling;
      if (nextIndicator) {
        activeIndicator.classList.remove('active');
        nextIndicator.classList.add('active');
      } else {
        activeIndicator.classList.remove('active');
        carouselIndicators.firstElementChild.classList.add('active');
      }
    } else {
      activeItem.classList.remove('active');
      carouselInner.firstElementChild.classList.add('active'); // Loop to first
      const activeIndicator = carouselIndicators.querySelector('.active');
      activeIndicator.classList.remove('active');
      carouselIndicators.firstElementChild.classList.add('active');
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextText = document.createElement('span');
  nextText.classList.add('sr-only');
  nextText.textContent = 'Next';
  nextButton.append(nextText);
  carouselShift.append(nextButton);

  block.textContent = '';
  block.append(container);
}
