import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = 'itc-club-carousel'; // Use blockName as ID for consistency

  const section = document.createElement('section');
  section.classList.add('itc-club-carousel-section', 'mx-md-0', 'mx-4'); // Corrected class prefix

  const container = document.createElement('div');
  container.classList.add('itc-club-carousel-container'); // Corrected class prefix
  section.append(container);

  const carousel = document.createElement('div');
  carousel.id = carouselId;
  carousel.classList.add('itc-club-carousel', 'slide'); // Corrected class prefix
  carousel.setAttribute('data-ride', 'carousel');
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('itc-club-carousel-shift'); // Corrected class prefix
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('itc-club-carousel-inner'); // Corrected class prefix
  carouselShift.append(carouselInner);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('itc-club-carousel-indicators'); // Corrected class prefix
  carouselInner.append(carouselIndicators);

  const carouselItems = [...block.children];

  carouselItems.forEach((row, index) => {
    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    moveInstrumentation(row, carouselItem);
    carouselItem.classList.add('itc-club-carousel-item'); // Corrected class prefix
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('itc-club-carousel-d-md-flex', 'd-block'); // Corrected class prefix
    carouselItem.append(itemContentWrapper);

    const cells = [...row.children];
    // BlockJson fields: image, imageAlt, title, description
    const imageCell = cells[0];
    const imageAltCell = cells[1];
    const titleCell = cells[2];
    const descriptionCell = cells[3];

    let imageEl = null;
    let imageAlt = '';
    let titleEl = null;
    let descriptionEl = null;

    if (imageCell && imageCell.querySelector('picture')) {
      imageEl = imageCell.querySelector('picture');
    }
    if (imageAltCell) {
      imageAlt = imageAltCell.textContent.trim();
    }
    if (titleCell && titleCell.querySelector('h1, h2, h3, h4, h5, h6')) {
      titleEl = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
    } else if (titleCell && titleCell.querySelector('p')) { // Fallback for title if not a heading
      titleEl = titleCell.querySelector('p');
    }
    if (descriptionCell && descriptionCell.querySelector('p')) {
      descriptionEl = descriptionCell.querySelector('p');
    }

    if (imageEl) {
      const optimizedPic = createOptimizedPicture(
        imageEl.querySelector('img').src,
        imageAlt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(imageEl.querySelector('img'), optimizedPic.querySelector('img'));
      const img = optimizedPic.querySelector('img');
      img.classList.add('itc-club-carousel__img', 'd-block', 'w-md-50', 'w-100'); // Corrected class prefix
      img.setAttribute('loading', 'lazy');
      itemContentWrapper.append(optimizedPic);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('itc-club-carousel-w-md-50', 'w-100', 'itc-club-carousel-right-wrapper', 'read-more'); // Corrected class prefix
    itemContentWrapper.append(rightWrapper);

    if (titleEl) {
      const h2 = document.createElement('h2');
      h2.classList.add('itc-club-carousel-inner__title'); // Corrected class prefix
      moveInstrumentation(titleEl, h2);
      while (titleEl.firstChild) h2.append(titleEl.firstChild);
      rightWrapper.append(h2);
    }

    if (descriptionEl) {
      const p = document.createElement('p');
      p.classList.add('itc-club-carousel-inner__description'); // Corrected class prefix
      moveInstrumentation(descriptionEl, p);
      while (descriptionEl.firstChild) p.append(descriptionEl.firstChild);
      rightWrapper.append(p);
    }

    carouselInner.append(carouselItem);
  });

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add('itc-club-carousel-control-prev'); // Corrected class prefix
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Previous');
  const prevIcon = document.createElement('span');
  prevIcon.classList.add('itc-club-carousel-control-prev-icon'); // Corrected class prefix
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('itc-club-carousel-sr-only'); // Corrected class prefix
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);
  carouselShift.append(prevButton);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add('itc-club-carousel-control-next'); // Corrected class prefix
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next');
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('itc-club-carousel-control-next-icon'); // Corrected class prefix
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('itc-club-carousel-sr-only'); // Corrected class prefix
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);
  carouselShift.append(nextButton);

  // Add event listeners for carousel functionality
  let currentIndex = 0;
  const items = [...carouselInner.querySelectorAll('.itc-club-carousel-item')]; // Corrected class prefix
  const indicators = [...carouselIndicators.querySelectorAll('li')];
  const totalItems = items.length;

  const showItem = (index) => {
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      showItem(currentIndex);
    });
  });

  block.textContent = '';
  block.append(section);
}
