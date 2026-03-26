import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-club-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carousel';
  carouselDiv.classList.add('carousel', 'slide', 'itc-club-carousel');
  container.append(carouselDiv);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('itc-carousel-shift');
  carouselDiv.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');
  carouselShift.append(carouselInner);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');
  carouselInner.append(carouselIndicators);

  // The first row is the container field, subsequent rows are carousel items
  const itemRows = [...block.children].slice(1);

  itemRows.forEach((row, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-target', '#carousel');
    li.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      li.classList.add('active');
    }
    carouselIndicators.append(li);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const dFlexDiv = document.createElement('div');
    dFlexDiv.classList.add('d-md-flex', 'd-block');
    carouselItem.append(dFlexDiv);

    // Each item row has 4 cells: image, alt, title, description
    const [imageCell, altTextCell, titleCell, descriptionCell] = [...row.children];

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
      dFlexDiv.append(optimizedPic);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');
    dFlexDiv.append(rightWrapper);

    const title = document.createElement('h2');
    title.classList.add('carousel-inner__title');
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    rightWrapper.append(title);

    const description = document.createElement('p');
    description.classList.add('carousel-inner__description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    rightWrapper.append(description);

    carouselInner.append(carouselItem);
  });

  const updateCarousel = (direction) => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const activeIndicator = carouselIndicators.querySelector('.active');
    let nextItem;
    let nextIndicator;

    if (direction === 'next') {
      nextItem = activeItem.nextElementSibling;
      if (!nextItem || !nextItem.classList.contains('carousel-item')) { // Loop to first item if at end
        nextItem = carouselInner.querySelector('.carousel-item:first-of-type');
      }
    } else { // 'prev'
      nextItem = activeItem.previousElementSibling;
      if (!nextItem || !nextItem.classList.contains('carousel-item')) { // Loop to last item if at beginning
        nextItem = carouselInner.querySelector('.carousel-item:last-of-type');
      }
    }

    if (nextItem) {
      activeItem.classList.remove('active');
      activeIndicator.classList.remove('active');
      nextItem.classList.add('active');
      
      const nextIndex = Array.from(carouselInner.children).indexOf(nextItem);
      nextIndicator = carouselIndicators.children[nextIndex];
      if (nextIndicator) {
        nextIndicator.classList.add('active');
      }
    }
  };

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.addEventListener('click', () => updateCarousel('prev'));
  carouselShift.append(prevButton);

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
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.addEventListener('click', () => updateCarousel('next'));
  carouselShift.append(nextButton);

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);

  block.textContent = '';
  block.append(section);
}
