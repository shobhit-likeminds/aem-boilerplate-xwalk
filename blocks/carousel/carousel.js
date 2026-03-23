import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The first row is the container label, subsequent rows are carousel items.
  const itemRows = [...block.children].slice(1);

  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;
  block.id = carouselId;
  // Use classes directly from ORIGINAL HTML
  block.classList.add('carousel', 'slide', 'itc-club-carousel');

  const shiftDiv = document.createElement('div');
  shiftDiv.classList.add('itc-carousel-shift'); // Class from ORIGINAL HTML

  const innerDiv = document.createElement('div');
  innerDiv.classList.add('carousel-inner'); // Class from ORIGINAL HTML

  const indicators = document.createElement('ol');
  indicators.classList.add('carousel-indicators'); // Class from ORIGINAL HTML

  const carouselItemsContainer = document.createElement('div');
  carouselItemsContainer.classList.add('carousel-inner'); // This is where the actual items go

  itemRows.forEach((row, index) => {
    // BlockJson defines 4 fields for 'carousel-item'
    const [imageCell, imageAltCell, titleCell, descriptionCell] = [...row.children];

    // Create indicator
    const indicatorLi = document.createElement('li');
    indicatorLi.setAttribute('data-target', `#${carouselId}`);
    indicatorLi.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicatorLi.classList.add('active');
    }
    // Add event listener for indicator clicks
    indicatorLi.addEventListener('click', () => {
      const currentActiveItem = carouselItemsContainer.querySelector('.carousel-item.active');
      const currentActiveIndicator = indicators.querySelector('li.active');
      const targetItem = carouselItemsContainer.children[index];
      const targetIndicator = indicators.children[index];

      if (currentActiveItem) currentActiveItem.classList.remove('active');
      if (currentActiveIndicator) currentActiveIndicator.classList.remove('active');
      if (targetItem) targetItem.classList.add('active');
      if (targetIndicator) targetIndicator.classList.add('active');
    });
    indicators.append(indicatorLi);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item'); // Class from ORIGINAL HTML
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const contentWrapper = document.createElement('div');
    // Classes from ORIGINAL HTML
    contentWrapper.classList.add('d-md-flex', 'd-block');

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent.trim(), false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        // Classes from ORIGINAL HTML
        optimizedPic.classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
        contentWrapper.append(optimizedPic);
      }
    }

    // Text content
    const textWrapper = document.createElement('div');
    // Classes from ORIGINAL HTML
    textWrapper.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');

    const title = document.createElement('h2');
    title.classList.add('carousel-inner__title'); // Class from ORIGINAL HTML
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    textWrapper.append(title);

    const description = document.createElement('p');
    description.classList.add('carousel-inner__description'); // Class from ORIGINAL HTML
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    textWrapper.append(description);

    contentWrapper.append(textWrapper);
    carouselItem.append(contentWrapper);
    carouselItemsContainer.append(carouselItem);
  });

  innerDiv.append(indicators, carouselItemsContainer);
  shiftDiv.append(innerDiv);

  // Previous button
  const prevButton = document.createElement('button');
  // Classes from ORIGINAL HTML
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.addEventListener('click', () => {
    const activeItem = carouselItemsContainer.querySelector('.carousel-item.active');
    const activeIndicator = indicators.querySelector('li.active');
    if (activeItem && activeIndicator) {
      activeItem.classList.remove('active');
      activeIndicator.classList.remove('active');

      const prevItem = activeItem.previousElementSibling || carouselItemsContainer.lastElementChild;
      const prevIndicator = activeIndicator.previousElementSibling || indicators.lastElementChild;

      if (prevItem) prevItem.classList.add('active');
      if (prevIndicator) prevIndicator.classList.add('active');
    }
  });

  const prevIcon = document.createElement('span');
  // Classes from ORIGINAL HTML
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only'); // Class from ORIGINAL HTML
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);
  shiftDiv.append(prevButton);

  // Next button
  const nextButton = document.createElement('button');
  // Classes from ORIGINAL HTML
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.addEventListener('click', () => {
    const activeItem = carouselItemsContainer.querySelector('.carousel-item.active');
    const activeIndicator = indicators.querySelector('li.active');
    if (activeItem && activeIndicator) {
      activeItem.classList.remove('active');
      activeIndicator.classList.remove('active');

      const nextItem = activeItem.nextElementSibling || carouselItemsContainer.firstElementChild;
      const nextIndicator = activeIndicator.nextElementSibling || indicators.firstElementChild;

      if (nextItem) nextItem.classList.add('active');
      if (nextIndicator) nextIndicator.classList.add('active');
    }
  });

  const nextIcon = document.createElement('span');
  // Classes from ORIGINAL HTML
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only'); // Class from ORIGINAL HTML
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);
  shiftDiv.append(nextButton);

  block.textContent = '';
  block.append(shiftDiv);
}
