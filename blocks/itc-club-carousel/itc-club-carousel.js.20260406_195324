import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('carousel', 'slide', 'itc-club-carousel');
  carouselWrapper.id = 'carousel';

  const itcCarouselShift = document.createElement('div');
  itcCarouselShift.classList.add('itc-carousel-shift');
  carouselWrapper.append(itcCarouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');
  itcCarouselShift.append(carouselInner);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');
  carouselInner.append(carouselIndicators);

  [...block.children].forEach((row, index) => {
    // Create indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
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

    const flexWrapper = document.createElement('div');
    flexWrapper.classList.add('d-md-flex', 'd-block');
    carouselItem.append(flexWrapper);

    let imageEl = null;
    let altText = '';
    let titleText = '';
    let descriptionEl = null;
    let descriptionCell = null; // Store the cell for description content

    const cells = [...row.children];

    // Find image, alt text, title, and description cells based on content
    const imageCell = cells.find((cell) => cell.querySelector('picture'));
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        imageEl = img;
        altText = img.alt;
      }
    }

    // Find title and description. Alt text is derived from the image.
    // Assuming order is image, alt text, title, description.
    // We need to be careful with textContent.trim() === altText as altText can be empty.
    // Better to find cells based on their content type.
    const titleCell = cells.find((cell) =>
      !cell.querySelector('picture') && !cell.querySelector('p') && cell.textContent.trim() !== altText && cell.textContent.trim()
    );
    if (titleCell) {
      titleText = titleCell.textContent.trim();
    }

    descriptionCell = cells.find((cell) => cell.querySelector('p'));

    if (imageEl) {
      const imgTag = document.createElement('img');
      imgTag.loading = 'lazy';
      imgTag.src = imageEl.src;
      imgTag.alt = altText;
      imgTag.classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
      flexWrapper.append(imgTag);
    }

    if (descriptionCell) {
      descriptionEl = document.createElement('div');
      descriptionEl.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');
      const h2 = document.createElement('h2');
      h2.classList.add('carousel-inner__title');
      h2.textContent = titleText;
      descriptionEl.append(h2);
      const p = document.createElement('p');
      p.classList.add('carousel-inner__description');
      moveInstrumentation(descriptionCell, p);
      while (descriptionCell.firstChild) p.append(descriptionCell.firstChild);
      descriptionEl.append(p);
      flexWrapper.append(descriptionEl);
    }

    carouselInner.append(carouselItem);
  });

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Previous'); // Add aria-label for accessibility
  itcCarouselShift.append(prevButton);

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next'); // Add aria-label for accessibility
  itcCarouselShift.append(nextButton);

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);

  // Add event listeners for carousel functionality
  let currentIndex = 0;
  const carouselItems = [...carouselInner.querySelectorAll('.carousel-item')];
  const indicators = [...carouselIndicators.querySelectorAll('li')];
  const totalItems = carouselItems.length;

  function updateCarousel() {
    carouselItems.forEach((item, i) => {
      item.classList.remove('active');
      indicators[i].classList.remove('active');
    });
    carouselItems[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  carouselWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(carouselWrapper);
}
