import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];
  const itemRows = allRows.slice(1); // Skip the first row which is just a label for the container

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carousel';
  carouselDiv.classList.add('carousel', 'slide', 'itc-club-carousel');
  // data-ride="carousel" is a Bootstrap attribute, not needed for custom JS implementation
  // carouselDiv.setAttribute('data-ride', 'carousel'); 

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('itc-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  itemRows.forEach((row, index) => {
    const [imageCell, altTextCell, titleCell, descriptionCell] = [...row.children];

    // Create indicator
    const indicatorLi = document.createElement('li');
    indicatorLi.setAttribute('data-target', '#carousel');
    indicatorLi.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicatorLi.classList.add('active');
    }
    indicatorLi.addEventListener('click', () => {
      const currentActive = carouselInner.querySelector('.carousel-item.active');
      const currentActiveIndicator = carouselIndicators.querySelector('.active');
      if (currentActive) {
        currentActive.classList.remove('active');
      }
      if (currentActiveIndicator) {
        currentActiveIndicator.classList.remove('active');
      }
      carouselInner.children[index].classList.add('active');
      indicatorLi.classList.add('active');
    });
    carouselIndicators.append(indicatorLi);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('d-md-flex', 'd-block');

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent, false, [{ width: '750' }]);
        optimizedPic.classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itemContentWrapper.append(optimizedPic);
      }
    }

    // Right wrapper for title and description
    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');

    const title = document.createElement('h2');
    title.classList.add('carousel-inner__title');
    moveInstrumentation(titleCell, title);
    title.append(...titleCell.childNodes);

    const description = document.createElement('p');
    description.classList.add('carousel-inner__description');
    moveInstrumentation(descriptionCell, description);
    description.append(...descriptionCell.childNodes);

    rightWrapper.append(title, description);
    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);

    // Move instrumentation from the original item row to the new carousel item div
    moveInstrumentation(row, carouselItem);
  });

  // Navigation buttons
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel'); // Added from original HTML
  prevButton.setAttribute('data-slide', 'prev'); // Added from original HTML
  prevButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const activeIndicator = carouselIndicators.querySelector('.active');
    let prevItem = activeItem.previousElementSibling;
    let prevIndicator;

    if (!prevItem) {
      prevItem = carouselInner.lastElementChild; // Loop to last item
      prevIndicator = carouselIndicators.lastElementChild;
    } else {
      prevIndicator = activeIndicator.previousElementSibling;
    }
    
    if (activeItem && activeIndicator && prevItem && prevIndicator) {
      activeItem.classList.remove('active');
      activeIndicator.classList.remove('active');
      prevItem.classList.add('active');
      prevIndicator.classList.add('active');
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel'); // Added from original HTML
  nextButton.setAttribute('data-slide', 'next'); // Added from original HTML
  nextButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const activeIndicator = carouselIndicators.querySelector('.active');
    let nextItem = activeItem.nextElementSibling;
    let nextIndicator;

    if (!nextItem) {
      nextItem = carouselInner.firstElementChild; // Loop to first item
      nextIndicator = carouselIndicators.firstElementChild;
    } else {
      nextIndicator = activeIndicator.nextElementSibling;
    }

    if (activeItem && activeIndicator && nextItem && nextIndicator) {
      activeItem.classList.remove('active');
      activeIndicator.classList.remove('active');
      nextItem.classList.add('active');
      nextIndicator.classList.add('active');
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  carouselInner.prepend(carouselIndicators); // Indicators should be inside carousel-inner
  carouselShift.append(carouselInner, prevButton, nextButton);
  carouselDiv.append(carouselShift);
  containerDiv.append(carouselDiv);

  block.textContent = '';
  block.append(containerDiv);
}
