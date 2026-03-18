import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('shiftclub-section', 'shiftclub-mx-md-0', 'shiftclub-mx-4');

  const container = document.createElement('div');
  container.classList.add('shiftclub-container');
  moveInstrumentation(block, container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('shiftclub-carousel', 'carousel', 'slide', 'shiftclub-itc-club-carousel');
  carousel.setAttribute('data-ride', 'carousel');

  const itcCarouselShift = document.createElement('div');
  itcCarouselShift.classList.add('shiftclub-itc-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('shiftclub-carousel-inner', 'carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('shiftclub-carousel-indicators', 'carousel-indicators');

  [...block.children].forEach((row, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-target', '#carousel');
    li.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      li.classList.add('active');
    }
    carouselIndicators.append(li);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('shiftclub-carousel-item', 'carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const dFlexWrapper = document.createElement('div');
    dFlexWrapper.classList.add('shiftclub-d-md-flex', 'shiftclub-d-block');

    let imageCell;
    let contentCell;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture') || cell.querySelector('img')) {
        imageCell = cell;
      } else {
        contentCell = cell;
      }
    });

    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        img.classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
        dFlexWrapper.append(imageCell);
      }
    }

    if (contentCell) {
      const rightWrapper = document.createElement('div');
      rightWrapper.classList.add('shiftclub-w-md-50', 'shiftclub-w-100', 'shiftclub-itc-club-right-wrapper', 'shiftclub-read-more');
      moveInstrumentation(contentCell, rightWrapper);

      const title = contentCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (title) {
        title.classList.add('shiftclub-carousel-inner__title');
        rightWrapper.append(title);
      }

      const description = contentCell.querySelector('p');
      if (description) {
        description.classList.add('shiftclub-carousel-inner__description');
        rightWrapper.append(description);
      }
      dFlexWrapper.append(rightWrapper);
    }
    carouselItem.append(dFlexWrapper);
    carouselInner.append(carouselItem);
  });

  itcCarouselShift.append(carouselIndicators, carouselInner);

  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-carousel-control-prev', 'carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('shiftclub-carousel-control-prev-icon', 'carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('shiftclub-sr-only', 'sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);

  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-carousel-control-next', 'carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('shiftclub-carousel-control-next-icon', 'carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('shiftclub-sr-only', 'sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);

  itcCarouselShift.append(prevButton, nextButton);
  carousel.append(itcCarouselShift);
  container.append(carousel);
  block.textContent = '';
  block.append(container);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
