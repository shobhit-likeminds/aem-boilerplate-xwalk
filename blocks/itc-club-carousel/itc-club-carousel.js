import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('itc-club-carousel');

  const container = document.createElement('div');
  container.classList.add('container');

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('carousel', 'slide', 'itc-club-carousel');
  carousel.setAttribute('data-ride', 'carousel');

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

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('d-md-flex', 'd-block');

    const cells = [...row.children];
    // Based on BlockJson:
    // cell[0]: image
    // cell[1]: imageAlt
    // cell[2]: title
    // cell[3]: description

    let imageEl = null;
    let imageAltText = '';
    let titleEl = null;
    let descriptionEl = null;

    // Process image (cell[0])
    const imageCell = cells[0];
    if (imageCell && imageCell.querySelector('picture')) {
      const picture = imageCell.querySelector('picture');
      const img = picture.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.loading = 'lazy';
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
        moveInstrumentation(img, newImg);
        imageEl = newImg; // Use the new img element
      }
    }

    // Process imageAlt (cell[1])
    const imageAltCell = cells[1];
    if (imageAltCell && imageAltCell.textContent.trim().length > 0) {
      imageAltText = imageAltCell.textContent.trim();
      if (imageEl) { // Update alt text if image exists
        imageEl.alt = imageAltText;
      }
    }

    // Process title (cell[2])
    const titleCell = cells[2];
    if (titleCell && titleCell.textContent.trim().length > 0) {
      titleEl = document.createElement('h2');
      titleEl.classList.add('carousel-inner__title');
      moveInstrumentation(titleCell, titleEl);
      titleEl.append(titleCell.textContent.trim());
    }

    // Process description (cell[3])
    const descriptionCell = cells[3];
    if (descriptionCell && descriptionCell.textContent.trim().length > 0) {
      descriptionEl = document.createElement('div');
      descriptionEl.classList.add('carousel-inner__description');
      moveInstrumentation(descriptionCell, descriptionEl);
      // Append the first child (likely a P tag) or text content
      if (descriptionCell.firstElementChild && descriptionCell.firstElementChild.tagName === 'P') {
        descriptionEl.append(descriptionCell.firstElementChild);
      } else {
        descriptionEl.append(descriptionCell.textContent.trim());
      }
    }

    if (imageEl) {
      itemContentWrapper.append(imageEl);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');
    if (titleEl) {
      rightWrapper.append(titleEl);
    }
    if (descriptionEl) {
      rightWrapper.append(descriptionEl);
    }
    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselShift.append(carouselInner);
  carouselInner.prepend(carouselIndicators); // Indicators go inside carousel-inner

  // Carousel controls
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Previous'); // Add aria-label for accessibility
  // The original HTML uses data-target and data-slide attributes, but the JS implements its own logic.
  // We'll keep the JS logic but ensure the buttons have the correct classes and aria attributes.
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
  nextButton.setAttribute('aria-label', 'Next'); // Add aria-label for accessibility
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  carouselShift.append(prevButton, nextButton);
  carousel.append(carouselShift);
  container.append(carousel);

  block.textContent = '';
  block.append(container);

  // Add event listeners for carousel functionality
  let currentSlide = 0;
  const slides = carouselInner.querySelectorAll('.carousel-item');
  const indicators = carouselIndicators.querySelectorAll('li');

  const updateCarousel = () => {
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'carousel-item-left', 'carousel-item-next');
      indicators[i].classList.remove('active');
    });

    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  };

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
