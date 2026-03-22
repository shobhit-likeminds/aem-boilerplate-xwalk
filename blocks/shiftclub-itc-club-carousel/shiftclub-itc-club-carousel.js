import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block name from BlockJson is 'shiftclub-itc-club-carousel'
  // All class names should start with this prefix.
  block.classList.add('shiftclub-itc-club-carousel', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('shiftclub-itc-club-carousel-main', 'slide'); // Renamed for clarity and prefix
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('shiftclub-itc-club-carousel-shift');
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('shiftclub-itc-club-carousel-inner');
  carouselShift.append(carouselInner);

  const indicators = document.createElement('ol');
  indicators.classList.add('shiftclub-itc-club-carousel-indicators');
  carouselInner.append(indicators);

  const slides = [...block.children];
  slides.forEach((row, index) => {
    // image (picture)
    // imageAlt (text)
    // title (richtext)
    // description (richtext)

    const li = document.createElement('li');
    li.setAttribute('data-target', '#carousel');
    li.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      li.classList.add('active');
    }
    indicators.append(li);

    // Add event listener for indicator clicks
    li.addEventListener('click', () => {
      const currentActiveItem = carouselInner.querySelector('.shiftclub-itc-club-carousel-item.active');
      if (currentActiveItem) {
        currentActiveItem.classList.remove('active');
      }
      const targetItem = carouselInner.children[index + 1]; // +1 because indicators are before items
      if (targetItem) {
        targetItem.classList.add('active');
      }

      const currentActiveIndicator = indicators.querySelector('li.active');
      if (currentActiveIndicator) {
        currentActiveIndicator.classList.remove('active');
      }
      li.classList.add('active');
    });

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('shiftclub-itc-club-carousel-item');
    if (index === 0) {
      itemDiv.classList.add('active');
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('d-md-flex', 'd-block');
    itemDiv.append(contentWrapper);

    const cells = [...row.children];
    // BlockJson model 'carouselSlide' has 4 fields: image, imageAlt, title, description
    const imageCell = cells[0];
    const imageAltCell = cells[1];
    const titleCell = cells[2];
    const descriptionCell = cells[3];

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent.trim(), false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('shiftclub-itc-club-carousel__img', 'd-block', 'w-md-50', 'w-100');
      contentWrapper.append(optimizedPic);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'shiftclub-itc-club-carousel-right-wrapper', 'read-more'); // Prefix added
    contentWrapper.append(rightWrapper);

    const title = document.createElement('h2');
    title.classList.add('shiftclub-itc-club-carousel-inner__title'); // Prefix added
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    rightWrapper.append(title);

    const description = document.createElement('p');
    description.classList.add('shiftclub-itc-club-carousel-inner__description'); // Prefix added
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    rightWrapper.append(description);

    carouselInner.append(itemDiv);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-itc-club-carousel-control-prev'); // Prefix added
  prevButton.type = 'button';
  prevButton.addEventListener('click', () => {
    let currentActive = carouselInner.querySelector('.shiftclub-itc-club-carousel-item.active');
    let prev = currentActive.previousElementSibling;
    if (!prev || !prev.classList.contains('shiftclub-itc-club-carousel-item')) {
      prev = carouselInner.lastElementChild; // Wrap around to the last item
    }
    if (currentActive) currentActive.classList.remove('active');
    if (prev) prev.classList.add('active');

    let currentIndicator = indicators.querySelector('li.active');
    let prevIndicator = currentIndicator.previousElementSibling;
    if (!prevIndicator) {
      prevIndicator = indicators.lastElementChild;
    }
    if (currentIndicator) currentIndicator.classList.remove('active');
    if (prevIndicator) prevIndicator.classList.add('active');
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('shiftclub-itc-club-carousel-control-prev-icon'); // Prefix added
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);
  carouselShift.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-itc-club-carousel-control-next'); // Prefix added
  nextButton.type = 'button';
  nextButton.addEventListener('click', () => {
    let currentActive = carouselInner.querySelector('.shiftclub-itc-club-carousel-item.active');
    let next = currentActive.nextElementSibling;
    if (!next) {
      next = carouselInner.querySelector('.shiftclub-itc-club-carousel-item:first-child'); // Wrap around to the first item
    }
    if (currentActive) currentActive.classList.remove('active');
    if (next) next.classList.add('active');

    let currentIndicator = indicators.querySelector('li.active');
    let nextIndicator = currentIndicator.nextElementSibling;
    if (!nextIndicator) {
      nextIndicator = indicators.firstElementChild;
    }
    if (currentIndicator) currentIndicator.classList.remove('active');
    if (nextIndicator) nextIndicator.classList.add('active');
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('shiftclub-itc-club-carousel-control-next-icon'); // Prefix added
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);
  carouselShift.append(nextButton);

  // Clear the original block content
  block.textContent = '';
  block.append(container);
}
