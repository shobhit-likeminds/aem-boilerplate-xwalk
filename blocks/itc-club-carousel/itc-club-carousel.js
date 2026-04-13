import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItems = [...block.children];

  const section = document.createElement('section');
  section.classList.add('itc-club-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('container');

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carousel';
  carouselDiv.classList.add('carousel', 'slide', 'itc-club-carousel');
  carouselDiv.setAttribute('data-ride', 'carousel');

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('itc-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  carouselItems.forEach((row, index) => {
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('d-md-flex', 'd-block');

    // CRITICAL FIX: Replaced array destructuring with content detection
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !cell.querySelector('picture') && cell.querySelector('h1, h2, h3, h4, h5, h6'));
    const descriptionCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('h1, h2, h3, h4, h5, h6') && cell.querySelector('p'));


    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          itemContentWrapper.append(optimizedPic);
        }
      }
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');

    if (titleCell) {
      const title = document.createElement('h2'); // Assuming h2 based on original HTML
      title.classList.add('carousel-inner__title');
      moveInstrumentation(titleCell, title);
      while (titleCell.firstChild) title.append(titleCell.firstChild);
      rightWrapper.append(title);
    }

    if (descriptionCell) {
      const description = document.createElement('p');
      description.classList.add('carousel-inner__description');
      moveInstrumentation(descriptionCell, description);
      while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
      rightWrapper.append(description);
    }

    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselShift.append(carouselIndicators, carouselInner);

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel'); // Added from original HTML
  prevButton.setAttribute('data-slide', 'prev'); // Added from original HTML
  prevButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    if (activeItem) activeItem.classList.remove('active');
    if (prevItem) prevItem.classList.add('active');

    const activeIndicator = carouselIndicators.querySelector('li.active');
    const prevIndicator = activeIndicator.previousElementSibling || carouselIndicators.lastElementChild;
    if (activeIndicator) activeIndicator.classList.remove('active');
    if (prevIndicator) prevIndicator.classList.add('active');
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel'); // Added from original HTML
  nextButton.setAttribute('data-slide', 'next'); // Added from original HTML
  nextButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    if (activeItem) activeItem.classList.remove('active');
    if (nextItem) nextItem.classList.add('active');

    const activeIndicator = carouselIndicators.querySelector('li.active');
    const nextIndicator = activeIndicator.nextElementSibling || carouselIndicators.firstElementChild;
    if (activeIndicator) activeIndicator.classList.remove('active');
    if (nextIndicator) nextIndicator.classList.add('active');
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);

  carouselShift.append(prevButton, nextButton);
  carouselDiv.append(carouselShift);
  container.append(carouselDiv);
  section.append(container);

  block.textContent = '';
  block.append(section);
}
