import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('container');

  const carousel = document.createElement('div');
  carousel.classList.add('carousel', 'slide', 'itc-club-carousel');
  carousel.id = 'carousel';
  // data-ride="carousel" is for Bootstrap JS, which EDS does not load.
  // We'll implement the carousel logic with event listeners.

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('itc-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselItems = [...block.children];

  carouselItems.forEach((row, index) => {
    // Create indicator
    const indicator = document.createElement('li');
    // data-target and data-slide-to are for Bootstrap JS, which EDS does not load.
    // We'll implement the carousel logic with event listeners.
    indicator.setAttribute('data-slide-to', index);
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

    let imageCell;
    let altTextCell;
    let titleCell;
    let descriptionCell;

    const cells = [...row.children];
    imageCell = cells.find((cell) => cell.querySelector('picture'));
    // Alt text is the cell immediately following the image, and it's plain text.
    // Title is the cell immediately following alt text, and it's plain text.
    // Description is the cell immediately following title, and it contains a <p>.
    // This assumes a strict order and content type for these cells.
    if (imageCell) {
      const imageCellIndex = cells.indexOf(imageCell);
      if (imageCellIndex !== -1 && cells[imageCellIndex + 1] && !cells[imageCellIndex + 1].querySelector('picture') && !cells[imageCellIndex + 1].querySelector('p')) {
        altTextCell = cells[imageCellIndex + 1];
      }
      if (imageCellIndex !== -1 && cells[imageCellIndex + 2] && !cells[imageCellIndex + 2].querySelector('picture') && !cells[imageCellIndex + 2].querySelector('p')) {
        titleCell = cells[imageCellIndex + 2];
      }
      if (imageCellIndex !== -1 && cells[imageCellIndex + 3] && cells[imageCellIndex + 3].querySelector('p')) {
        descriptionCell = cells[imageCellIndex + 3];
      }
    }

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell?.textContent.trim() || img.alt, false, [{ width: '750' }]);
        optimizedPic.classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itemContentWrapper.append(optimizedPic);
      }
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');

    if (titleCell) {
      const title = document.createElement('h2');
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

  carouselShift.append(carouselInner);

  // Carousel controls
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.addEventListener('click', () => {
    navigateCarousel(-1);
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

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.addEventListener('click', () => {
    navigateCarousel(1);
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

  carousel.append(carouselIndicators, carouselShift);
  wrapper.append(carousel);

  block.textContent = '';
  block.append(wrapper);

  // Carousel navigation logic
  let currentIndex = 0;
  const totalItems = carouselItems.length;

  function updateCarousel() {
    [...carouselInner.children].forEach((item, i) => {
      item.classList.remove('active');
      if (i === currentIndex) {
        item.classList.add('active');
      }
    });
    [...carouselIndicators.children].forEach((indicator, i) => {
      indicator.classList.remove('active');
      if (i === currentIndex) {
        indicator.classList.add('active');
      }
    });
  }

  function navigateCarousel(direction) {
    currentIndex = (currentIndex + direction + totalItems) % totalItems;
    updateCarousel();
  }

  [...carouselIndicators.children].forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });
}
