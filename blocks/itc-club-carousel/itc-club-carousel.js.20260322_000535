import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'itc-club-carousel';
  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add(`${blockName}-container`);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add(
    `${blockName}`,
    'shiftclub-carousel',
    'shiftclub-slide',
    'shiftclub-itc-club-carousel',
  );
  carousel.setAttribute('data-ride', 'carousel');

  const carouselShift = document.createElement('div');
  carouselShift.classList.add(`${blockName}-itc-carousel-shift`);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add(`${blockName}-carousel-inner`);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add(`${blockName}-carousel-indicators`);

  const carouselItems = [...block.children];

  carouselItems.forEach((row, index) => {
    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add(`${blockName}-active`);
    }
    carouselIndicators.append(indicator);

    // Add event listener to indicator
    indicator.addEventListener('click', () => {
      const currentActiveIndicator = carouselIndicators.querySelector(`.${blockName}-active`);
      if (currentActiveIndicator) {
        currentActiveIndicator.classList.remove(`${blockName}-active`);
      }
      indicator.classList.add(`${blockName}-active`);

      const currentActiveItem = carouselInner.querySelector(`.${blockName}-active`);
      if (currentActiveItem) {
        currentActiveItem.classList.remove(`${blockName}-active`);
      }
      carouselInner.children[index].classList.add(`${blockName}-active`);
    });

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add(`${blockName}-carousel-item`);
    if (index === 0) {
      carouselItem.classList.add(`${blockName}-active`);
    }

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add(
      'shiftclub-d-md-flex',
      'shiftclub-d-block',
    );
    moveInstrumentation(row, itemContentWrapper);

    const [imageCell, titleCell, descriptionCell] = [...row.children];

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(
          img.src,
          img.alt,
          false,
          [{ width: '750' }],
        );
        optimizedPic.classList.add(
          `${blockName}__img`, // Corrected class prefix
          'shiftclub-d-block',
          'shiftclub-w-md-50',
          'shiftclub-w-100',
        );
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itemContentWrapper.append(optimizedPic);
      }
    }

    // Right Wrapper
    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add(
      'shiftclub-w-md-50',
      'shiftclub-w-100',
      `${blockName}-itc-club-right-wrapper`, // Corrected class prefix
      'shiftclub-read-more',
    );

    // Title
    const title = document.createElement('h2');
    title.classList.add(`${blockName}-carousel-inner__title`); // Corrected class prefix
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    rightWrapper.append(title);

    // Description
    const description = document.createElement('p');
    description.classList.add(`${blockName}-carousel-inner__description`); // Corrected class prefix
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    rightWrapper.append(description);

    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselShift.append(carouselIndicators, carouselInner);

  // Previous Button
  const prevButton = document.createElement('button');
  prevButton.classList.add(`${blockName}-carousel-control-prev`); // Corrected class prefix
  prevButton.type = 'button';
  prevButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector(`.${blockName}-active`);
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    if (activeItem) {
      activeItem.classList.remove(`${blockName}-active`);
    }
    if (prevItem) {
      prevItem.classList.add(`${blockName}-active`);
      const prevIndex = [...carouselInner.children].indexOf(prevItem);
      carouselIndicators.querySelector(`.${blockName}-active`)?.classList.remove(`${blockName}-active`);
      carouselIndicators.children[prevIndex].classList.add(`${blockName}-active`);
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add(`${blockName}-carousel-control-prev-icon`); // Corrected class prefix
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('shiftclub-sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);
  carouselShift.append(prevButton);

  // Next Button
  const nextButton = document.createElement('button');
  nextButton.classList.add(`${blockName}-carousel-control-next`); // Corrected class prefix
  nextButton.type = 'button';
  nextButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector(`.${blockName}-active`);
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    if (activeItem) {
      activeItem.classList.remove(`${blockName}-active`);
    }
    if (nextItem) {
      nextItem.classList.add(`${blockName}-active`);
      const nextIndex = [...carouselInner.children].indexOf(nextItem);
      carouselIndicators.querySelector(`.${blockName}-active`)?.classList.remove(`${blockName}-active`);
      carouselIndicators.children[nextIndex].classList.add(`${blockName}-active`);
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add(`${blockName}-carousel-control-next-icon`); // Corrected class prefix
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('shiftclub-sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);
  carouselShift.append(nextButton);

  carousel.append(carouselShift);
  carouselContainer.append(carousel);

  block.textContent = '';
  block.classList.add('shiftclub-itc-club-section', 'shiftclub-mx-md-0', 'shiftclub-mx-4');
  block.append(carouselContainer);
}
