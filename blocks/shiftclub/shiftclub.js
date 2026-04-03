import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-club-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('carousel', 'slide', 'itc-club-carousel');
  container.append(carousel);

  const itcCarouselShift = document.createElement('div');
  itcCarouselShift.classList.add('itc-carousel-shift');
  carousel.append(itcCarouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');
  itcCarouselShift.append(carouselInner);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');
  carouselInner.append(carouselIndicators);

  [...block.children].forEach((row, index) => {
    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const dFlexWrapper = document.createElement('div');
    dFlexWrapper.classList.add('d-md-flex', 'd-block');
    carouselItem.append(dFlexWrapper);

    const cells = [...row.children];
    let imageCell;
    let altTextCell;
    let titleCell;
    let descriptionCell;

    // Use content detection to find cells
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        imageCell = cell;
      } else if (cell.textContent.trim().toLowerCase().includes('alt text')) { // Heuristic for alt text cell
        altTextCell = cell;
      } else if (cell.querySelector('h2') || (cell.textContent.trim().length > 0 && !titleCell && !descriptionCell)) { // Heuristic for title
        titleCell = cell;
      } else if (cell.querySelector('p') || (cell.textContent.trim().length > 0 && !descriptionCell)) { // Heuristic for description
        descriptionCell = cell;
      }
    });

    // Image
    const img = imageCell ? imageCell.querySelector('img') : null;
    const altTextValue = altTextCell ? altTextCell.textContent.trim() : (img ? img.alt : '');

    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, altTextValue, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      const newImg = optimizedPic.querySelector('img');
      newImg.classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
      dFlexWrapper.append(newImg);
    }

    // Right Wrapper
    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');
    dFlexWrapper.append(rightWrapper);

    // Title
    if (titleCell) {
      const title = document.createElement('h2');
      title.classList.add('carousel-inner__title');
      moveInstrumentation(titleCell, title);
      while (titleCell.firstChild) {
        title.append(titleCell.firstChild);
      }
      rightWrapper.append(title);
    }

    // Description
    if (descriptionCell) {
      const description = document.createElement('p');
      description.classList.add('carousel-inner__description');
      moveInstrumentation(descriptionCell, description);
      while (descriptionCell.firstChild) {
        description.append(descriptionCell.firstChild);
      }
      rightWrapper.append(description);
    }

    carouselInner.append(carouselItem);
  });

  // Previous Button
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling;
    if (prevItem && prevItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('li.active');
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
      carouselInner.lastElementChild.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('li.active');
      activeIndicator.classList.remove('active');
      carouselIndicators.lastElementChild.classList.add('active');
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
  itcCarouselShift.append(prevButton);

  // Next Button
  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.addEventListener('click', () => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling;
    if (nextItem && nextItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('li.active');
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
      carouselInner.firstElementChild.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('li.active');
      activeIndicator.classList.remove('active');
      carouselIndicators.firstElementChild.classList.add('active');
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
  itcCarouselShift.append(nextButton);

  block.textContent = '';
  block.append(section);
}
