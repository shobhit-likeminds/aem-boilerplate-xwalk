import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [carouselItemsContainer, ...itemRows] = [...block.children];

  // Create the main section and container
  const section = document.createElement('section');
  section.classList.add('shiftclub-itc-club-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('shiftclub-container');
  section.append(container);

  // Create the carousel structure
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

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('shiftclub-carousel-indicators');
  carouselInner.append(carouselIndicators);

  const carouselItemsWrapper = document.createElement('div'); // This acts as the direct parent for carousel items

  itemRows.forEach((row, index) => {
    moveInstrumentation(row, carouselItemsWrapper);

    const li = document.createElement('li');
    li.setAttribute('data-target', '#carousel');
    li.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      li.classList.add('active');
    }
    // Add event listener for indicator clicks
    li.addEventListener('click', () => {
      const currentActiveItem = carouselItemsWrapper.querySelector('.shiftclub-carousel-item.active');
      const currentActiveIndicator = carouselIndicators.querySelector('li.active');

      if (currentActiveItem) currentActiveItem.classList.remove('active');
      if (currentActiveIndicator) currentActiveIndicator.classList.remove('active');

      carouselItemsWrapper.children[index].classList.add('active');
      li.classList.add('active');
    });
    carouselIndicators.append(li);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('shiftclub-carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('shiftclub-d-md-flex', 'd-block');
    carouselItem.append(itemContentWrapper);

    const [imageCell, titleCell, descriptionCell] = [...row.children];

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100'); // Add classes to the img inside picture
        itemContentWrapper.append(optimizedPic);
      }
    }

    // Right wrapper for title and description
    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('shiftclub-w-md-50', 'w-100', 'shiftclub-itc-club-right-wrapper', 'shiftclub-read-more');
    itemContentWrapper.append(rightWrapper);

    // Title
    const title = document.createElement('h2');
    moveInstrumentation(titleCell, title);
    title.classList.add('shiftclub-carousel-inner__title');
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    rightWrapper.append(title);

    // Description
    const description = document.createElement('p');
    moveInstrumentation(descriptionCell, description);
    description.classList.add('shiftclub-carousel-inner__description');
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    rightWrapper.append(description);

    carouselItemsWrapper.append(carouselItem);
  });

  carouselInner.append(carouselItemsWrapper);

  // Carousel controls
  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-carousel-control-prev'); // Corrected class name
  prevButton.type = 'button';
  prevButton.addEventListener('click', () => {
    const currentActive = carouselItemsWrapper.querySelector('.shiftclub-carousel-item.active');
    let prevElement = currentActive.previousElementSibling;
    if (!prevElement) {
      prevElement = carouselItemsWrapper.lastElementChild;
    }
    currentActive.classList.remove('active');
    prevElement.classList.add('active');

    const currentIndicator = carouselIndicators.querySelector('li.active');
    let prevIndicator = currentIndicator.previousElementSibling;
    if (!prevIndicator) {
      prevIndicator = carouselIndicators.lastElementChild;
    }
    currentIndicator.classList.remove('active');
    prevIndicator.classList.add('active');
  });
  const prevIcon = document.createElement('span');
  prevIcon.classList.add('shiftclub-carousel-control-prev-icon'); // Corrected class name
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('shiftclub-sr-only'); // Corrected class name
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);
  carouselShift.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-carousel-control-next'); // Corrected class name
  nextButton.type = 'button';
  nextButton.addEventListener('click', () => {
    const currentActive = carouselItemsWrapper.querySelector('.shiftclub-carousel-item.active');
    let nextElement = currentActive.nextElementSibling;
    if (!nextElement) {
      nextElement = carouselItemsWrapper.firstElementChild;
    }
    currentActive.classList.remove('active');
    nextElement.classList.add('active');

    const currentIndicator = carouselIndicators.querySelector('li.active');
    let nextIndicator = currentIndicator.nextElementSibling;
    if (!nextIndicator) {
      nextIndicator = carouselIndicators.firstElementChild;
    }
    currentIndicator.classList.remove('active');
    nextIndicator.classList.add('active');
  });
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('shiftclub-carousel-control-next-icon'); // Corrected class name
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('shiftclub-sr-only'); // Corrected class name
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);
  carouselShift.append(nextButton);

  block.textContent = '';
  block.append(section);
}
