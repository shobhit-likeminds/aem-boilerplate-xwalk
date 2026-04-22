import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('cmp-yippee-banner');
  moveInstrumentation(block, rootDiv);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('cmp-yippee-banner--content-second-half-left-aligned');
  rootDiv.append(contentDiv);

  const carouselDiv = document.createElement('div');
  carouselDiv.classList.add('slickcarousel', 'carousel', 'panelcontainer', 'cmp-carousel');
  contentDiv.append(carouselDiv);

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');
  carouselDiv.append(carouselContainer);

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');
  carouselContainer.append(slickList);

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickList.append(slickTrack);

  // Process authored rows from block.children
  const rows = [...block.children];
  rows.forEach((row, index) => {
    const cells = [...row.children]; // Get all cells in the current row

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slick-slide');
    slideDiv.setAttribute('data-slick-index', index);
    slideDiv.setAttribute('aria-hidden', index !== 0); // First slide is visible by default
    slideDiv.setAttribute('tabindex', '-1');
    slideDiv.style.width = '100%'; // Example width, adjust as needed
    slideDiv.style.position = 'relative';
    slideDiv.style.left = `${-100 * index}%`; // Example positioning for slides
    slideDiv.style.opacity = index === 0 ? '1' : '0'; // Only first slide visible
    slideDiv.style.transition = 'opacity 0.5s ease-in-out';

    moveInstrumentation(row, slideDiv); // Move instrumentation from original row to new slide div

    // Assuming each row represents a slide with an image and text content
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const textCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '');

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        slideDiv.append(picture);
      }
    }

    if (textCell) {
      const textContent = document.createElement('div');
      textContent.classList.add('slide-text'); // Custom class for slide text
      textContent.innerHTML = textCell.innerHTML; // Use innerHTML to preserve rich text
      slideDiv.append(textContent);
    }

    slickTrack.append(slideDiv);
  });

  // Add previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add('slick-prev', 'slick-arrow', 'slick-disabled');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-disabled', 'true');
  carouselContainer.append(prevButton);

  // Add next button
  const nextButton = document.createElement('button');
  nextButton.classList.add('slick-next', 'slick-arrow');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-disabled', 'false');
  carouselContainer.append(nextButton);

  // Carousel navigation logic (simplified example)
  let currentIndex = 0;
  const slides = [...slickTrack.children];
  const totalSlides = slides.length;

  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== currentIndex);
      slide.style.opacity = i === currentIndex ? '1' : '0';
      slide.style.left = `${-100 * currentIndex}%`;
      slide.setAttribute('tabindex', i === currentIndex ? '0' : '-1');
    });

    prevButton.setAttribute('aria-disabled', currentIndex === 0);
    prevButton.classList.toggle('slick-disabled', currentIndex === 0);
    nextButton.setAttribute('aria-disabled', currentIndex === totalSlides - 1);
    nextButton.classList.toggle('slick-disabled', currentIndex === totalSlides - 1);
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Initialize carousel state
  if (totalSlides > 0) {
    updateCarousel();
  } else {
    // If no slides, disable buttons
    prevButton.setAttribute('aria-disabled', 'true');
    prevButton.classList.add('slick-disabled');
    nextButton.setAttribute('aria-disabled', 'true');
    nextButton.classList.add('slick-disabled');
  }

  // Replace the original block content with the new structure
  block.replaceChildren(rootDiv);
}
