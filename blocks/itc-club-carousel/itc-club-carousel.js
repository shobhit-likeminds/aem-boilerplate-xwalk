import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];

  const section = block.closest('.itc-club-section') || document.createElement('section');
  if (!section.classList.contains('itc-club-section')) {
    section.classList.add('itc-club-section', 'mx-md-0', 'mx-4');
  }

  const container = document.createElement('div');
  container.classList.add('container');

  const carousel = document.createElement('div');
  carousel.classList.add('carousel', 'slide', 'itc-club-carousel');
  carousel.id = 'carousel'; // Hardcoded ID from original HTML
  carousel.setAttribute('data-ride', 'carousel');

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('itc-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  allRows.forEach((row, index) => {
    // Create indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
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

    let imageEl = null;
    let titleEl = null;
    let descriptionEl = null;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        imageEl = cell.querySelector('picture');
      } else if (cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        titleEl = cell.querySelector('h1, h2, h3, h4, h5, h6');
      } else if (cell.querySelector('p')) {
        descriptionEl = cell.querySelector('p');
      } else if (cell.textContent.trim()) {
        // Handle cases where title/description might be direct text in cell
        if (!titleEl) {
          titleEl = document.createElement('h2');
          titleEl.textContent = cell.textContent.trim();
        } else if (!descriptionEl) {
          descriptionEl = document.createElement('p');
          descriptionEl.textContent = cell.textContent.trim();
        }
      }
    });

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const newImg = document.createElement('img');
      newImg.loading = 'lazy';
      newImg.src = img.src;
      newImg.alt = img.alt;
      newImg.classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      newImg.replaceWith(optimizedPic.querySelector('img')); // Replace the img inside the newImg
      itemContentWrapper.append(newImg);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');

    if (titleEl) {
      const newTitle = document.createElement('h2');
      newTitle.classList.add('carousel-inner__title');
      moveInstrumentation(titleEl.closest('div'), newTitle);
      while (titleEl.firstChild) newTitle.append(titleEl.firstChild);
      rightWrapper.append(newTitle);
    }

    if (descriptionEl) {
      const newDescription = document.createElement('p');
      newDescription.classList.add('carousel-inner__description');
      moveInstrumentation(descriptionEl.closest('div'), newDescription);
      while (descriptionEl.firstChild) newDescription.append(descriptionEl.firstChild);
      rightWrapper.append(newDescription);
    }

    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselShift.append(carouselInner);
  carouselShift.prepend(carouselIndicators);

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel'); // Add data-target for Bootstrap
  prevButton.setAttribute('data-slide', 'prev'); // Add data-slide for Bootstrap
  prevButton.setAttribute('aria-label', 'Previous'); // Add aria-label for accessibility
  // No custom addEventListener needed for standard Bootstrap carousel controls

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
  nextButton.setAttribute('data-target', '#carousel'); // Add data-target for Bootstrap
  nextButton.setAttribute('data-slide', 'next'); // Add data-slide for Bootstrap
  nextButton.setAttribute('aria-label', 'Next'); // Add aria-label for accessibility
  // No custom addEventListener needed for standard Bootstrap carousel controls

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);
  carouselShift.append(nextButton);

  carousel.append(carouselShift);
  container.append(carousel);

  // If the block is not already inside a section, create one.
  if (block.parentElement !== section) {
    section.append(container);
    block.replaceWith(section);
  } else {
    block.textContent = '';
    block.append(container);
  }
}
