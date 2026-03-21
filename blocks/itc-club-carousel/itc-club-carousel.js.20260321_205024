import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'itc-club-carousel';

  const container = document.createElement('div');
  container.classList.add(`${blockName}-container`);

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carousel';
  carouselDiv.classList.add(
    `${blockName}`,
    `${blockName}-slide`,
    `${blockName}-itc-club-carousel`,
  );
  carouselDiv.setAttribute('data-ride', 'carousel');

  const itcCarouselShift = document.createElement('div');
  itcCarouselShift.classList.add(`${blockName}-itc-carousel-shift`);

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

    // Add event listener for indicator clicks
    indicator.addEventListener('click', () => {
      const currentActiveItem = carouselInner.querySelector(`.${blockName}-active`);
      const currentActiveIndicator = carouselIndicators.querySelector(`.${blockName}-active`);

      if (currentActiveItem) {
        currentActiveItem.classList.remove(`${blockName}-active`);
      }
      if (currentActiveIndicator) {
        currentActiveIndicator.classList.remove(`${blockName}-active`);
      }

      carouselItem.classList.add(`${blockName}-active`);
      indicator.classList.add(`${blockName}-active`);
    });

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add(`${blockName}-carousel-item`);
    if (index === 0) {
      carouselItem.classList.add(`${blockName}-active`);
    }
    moveInstrumentation(row, carouselItem);

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add(
      `${blockName}-d-md-flex`,
      `${blockName}-d-block`,
    );

    const cells = [...row.children];

    // Image (cells[0])
    const picture = cells[0].querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      // Alt Text (cells[1]) - Use alt text from the second cell if available, otherwise from the img
      const altText = cells[1]?.textContent.trim() || img.alt;
      const optimizedPic = createOptimizedPicture(img.src, altText, false, [
        { width: '750' },
      ]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      const newImg = optimizedPic.querySelector('img');
      newImg.classList.add(
        `${blockName}-carousel__img`,
        `${blockName}-d-block`,
        `${blockName}-w-md-50`,
        `${blockName}-w-100`,
      );
      itemContentWrapper.append(optimizedPic);
    }

    // Right Wrapper (title, description)
    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add(
      `${blockName}-w-md-50`,
      `${blockName}-w-100`,
      `${blockName}-itc-club-right-wrapper`,
      `${blockName}-read-more`,
    );

    // Title (cells[2])
    const titleEl = document.createElement('h2');
    titleEl.classList.add(`${blockName}-carousel-inner__title`);
    moveInstrumentation(cells[2], titleEl);
    while (cells[2].firstChild) titleEl.append(cells[2].firstChild);
    rightWrapper.append(titleEl);

    // Description (cells[3])
    const descriptionEl = document.createElement('p');
    descriptionEl.classList.add(`${blockName}-carousel-inner__description`);
    moveInstrumentation(cells[3], descriptionEl);
    while (cells[3].firstChild) descriptionEl.append(cells[3].firstChild);
    rightWrapper.append(descriptionEl);

    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);
  });

  itcCarouselShift.append(carouselIndicators, carouselInner);

  // Previous Button
  const prevButton = document.createElement('button');
  prevButton.classList.add(`${blockName}-carousel-control-prev`);
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector(`.${blockName}-active`);
    let prevItem = activeItem.previousElementSibling;
    if (!prevItem || !prevItem.classList.contains(`${blockName}-carousel-item`)) {
      prevItem = carouselInner.lastElementChild;
    }
    if (activeItem && prevItem) {
      activeItem.classList.remove(`${blockName}-active`);
      prevItem.classList.add(`${blockName}-active`);

      const activeIndicator = carouselIndicators.querySelector(`.${blockName}-active`);
      let prevIndicator = activeIndicator.previousElementSibling;
      if (!prevIndicator || prevIndicator.tagName !== 'LI') { // Corrected tagName check
        prevIndicator = carouselIndicators.lastElementChild;
      }
      if (activeIndicator && prevIndicator) {
        activeIndicator.classList.remove(`${blockName}-active`);
        prevIndicator.classList.add(`${blockName}-active`);
      }
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add(`${blockName}-carousel-control-prev-icon`);
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add(`${blockName}-sr-only`);
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);
  itcCarouselShift.append(prevButton);

  // Next Button
  const nextButton = document.createElement('button');
  nextButton.classList.add(`${blockName}-carousel-control-next`);
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector(`.${blockName}-active`);
    let nextItem = activeItem.nextElementSibling;
    if (!nextItem || !nextItem.classList.contains(`${blockName}-carousel-item`)) {
      nextItem = carouselInner.firstElementChild;
    }
    if (activeItem && nextItem) {
      activeItem.classList.remove(`${blockName}-active`);
      nextItem.classList.add(`${blockName}-active`);

      const activeIndicator = carouselIndicators.querySelector(`.${blockName}-active`);
      let nextIndicator = activeIndicator.nextElementSibling;
      if (!nextIndicator || nextIndicator.tagName !== 'LI') { // Corrected tagName check
        nextIndicator = carouselIndicators.firstElementChild;
      }
      if (activeIndicator && nextIndicator) {
        activeIndicator.classList.remove(`${blockName}-active`);
        nextIndicator.classList.add(`${blockName}-active`);
      }
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add(`${blockName}-carousel-control-next-icon`);
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add(`${blockName}-sr-only`);
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);
  itcCarouselShift.append(nextButton);

  carouselDiv.append(itcCarouselShift);
  container.append(carouselDiv);

  block.textContent = '';
  block.append(container);
}
