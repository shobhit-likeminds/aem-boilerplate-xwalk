import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-club-carousel-section', 'mx-md-0', 'mx-4'); // Corrected class prefix

  const container = document.createElement('div');
  container.classList.add('itc-club-carousel-container'); // Corrected class prefix
  section.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('itc-club-carousel', 'slide'); // Corrected class prefix
  carousel.setAttribute('data-ride', 'carousel');
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('itc-club-carousel-shift'); // Corrected class prefix
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('itc-club-carousel-inner'); // Corrected class prefix
  carouselShift.append(carouselInner);

  const indicators = document.createElement('ol');
  indicators.classList.add('itc-club-carousel-indicators'); // Corrected class prefix
  carouselInner.append(indicators);

  const items = [...block.children];

  items.forEach((row, index) => {
    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicators.append(indicator);

    // Carousel Items
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('itc-club-carousel-item'); // Corrected class prefix
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('itc-club-carousel-d-md-flex', 'itc-club-carousel-d-block'); // Corrected class prefix
    carouselItem.append(itemContentWrapper);

    const [imageCell, altCell, titleCell, descriptionCell] = [...row.children];

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altCell.textContent.trim(), false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add(
          'itc-club-carousel__img', // Corrected class prefix
          'itc-club-carousel-d-block', // Corrected class prefix
          'itc-club-carousel-w-md-50', // Corrected class prefix
          'itc-club-carousel-w-100', // Corrected class prefix
        );
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itemContentWrapper.append(optimizedPic);
      }
    }

    // Right content wrapper
    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add(
      'itc-club-carousel-w-md-50', // Corrected class prefix
      'itc-club-carousel-w-100', // Corrected class prefix
      'itc-club-carousel-right-wrapper', // Corrected class prefix
      'itc-club-carousel-read-more', // Corrected class prefix
    );
    itemContentWrapper.append(rightWrapper);

    // Title
    const title = document.createElement('h2');
    title.classList.add('itc-club-carousel-inner__title'); // Corrected class prefix
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    rightWrapper.append(title);

    // Description
    const description = document.createElement('p');
    description.classList.add('itc-club-carousel-inner__description'); // Corrected class prefix
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    rightWrapper.append(description);

    carouselInner.append(carouselItem);
  });

  // Previous Button
  const prevButton = document.createElement('button');
  prevButton.classList.add('itc-club-carousel-control-prev'); // Corrected class prefix
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-target', '#carousel'); // Added data-target
  prevButton.setAttribute('data-slide', 'prev'); // Added data-slide
  carouselShift.append(prevButton);

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('itc-club-carousel-control-prev-icon'); // Corrected class prefix
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('itc-club-carousel-sr-only'); // Corrected class prefix
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);

  // Next Button
  const nextButton = document.createElement('button');
  nextButton.classList.add('itc-club-carousel-control-next'); // Corrected class prefix
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-target', '#carousel'); // Added data-target
  nextButton.setAttribute('data-slide', 'next'); // Added data-slide
  carouselShift.append(nextButton);

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('itc-club-carousel-control-next-icon'); // Corrected class prefix
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('itc-club-carousel-sr-only'); // Corrected class prefix
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);

  // Carousel logic
  let currentIndex = 0;
  const carouselItems = [...carouselInner.querySelectorAll('.itc-club-carousel-item')]; // Corrected class prefix
  const carouselIndicators = [...indicators.querySelectorAll('li')];
  const totalItems = carouselItems.length;

  const updateCarousel = () => {
    carouselItems.forEach((item, i) => {
      item.classList.remove('active');
      carouselIndicators[i].classList.remove('active');
      if (i === currentIndex) {
        item.classList.add('active');
        carouselIndicators[i].classList.add('active');
      }
    });
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  });

  carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  block.textContent = '';
  block.append(section);
}
