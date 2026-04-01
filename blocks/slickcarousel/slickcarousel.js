import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');
  container.setAttribute('data-slick', '3'); // This might need to be dynamic based on the number of slides
  container.setAttribute('aria-atomic', 'false');

  const prevButton = document.createElement('button');
  prevButton.classList.add('slick-prev', 'slick-arrow', 'slick-disabled');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-disabled', 'true');
  prevButton.textContent = 'Previous';
  container.append(prevButton);

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');
  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  // slickTrack.style.width = '3132px'; // This value will be dynamic
  // slickTrack.style.transform = 'translate3d(0px, 0px, 0px)'; // This will be handled by CSS classes
  slickList.append(slickTrack);
  container.append(slickList);

  const nextButton = document.createElement('button');
  nextButton.classList.add('slick-next', 'slick-arrow');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-disabled', 'false');
  nextButton.textContent = 'Next';
  container.append(nextButton);

  const slickDots = document.createElement('ul');
  slickDots.classList.add('slick-dots');
  slickDots.setAttribute('role', 'tablist');
  container.append(slickDots);

  const carouselItems = [...block.children];
  carouselItems.forEach((row, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slick-slide'); // Assuming this class is applied to individual slides
    slideDiv.setAttribute('data-slick-index', index);
    slideDiv.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
    slideDiv.setAttribute('tabindex', index !== 0 ? '-1' : '0');
    moveInstrumentation(row, slideDiv);
    while (row.firstChild) slideDiv.append(row.firstChild);
    slickTrack.append(slideDiv);

    const dotLi = document.createElement('li');
    dotLi.setAttribute('role', 'presentation');
    if (index === 0) {
      dotLi.classList.add('slick-active');
    }
    const dotButton = document.createElement('button');
    dotButton.setAttribute('type', 'button');
    dotButton.setAttribute('role', 'tab');
    dotButton.id = `slick-slide-control1${index}`;
    dotButton.setAttribute('aria-controls', `slick-slide1${index}`);
    dotButton.setAttribute('aria-label', `${index + 1} of ${carouselItems.length}`);
    dotButton.setAttribute('tabindex', index !== 0 ? '-1' : '0');
    dotButton.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    dotButton.textContent = `${index + 1}`;
    dotLi.append(dotButton);
    slickDots.append(dotLi);
  });

  // Event Listeners for navigation
  let currentIndex = 0;
  const updateCarousel = () => {
    const slides = [...slickTrack.children];
    const slideWidth = slides[0]?.offsetWidth || 0; // Get the width of a single slide
    slickTrack.style.width = `${slideWidth * slides.length}px`; // Set total track width
    slickTrack.style.transform = `translate3d(-${currentIndex * slideWidth}px, 0px, 0px)`; // Apply transform

    slides.forEach((slide, i) => {
      slide.setAttribute('aria-hidden', i !== currentIndex ? 'true' : 'false');
      slide.setAttribute('tabindex', i !== currentIndex ? '-1' : '0');
      if (i === currentIndex) {
        slide.classList.add('slick-current', 'slick-active'); // Add active classes
      } else {
        slide.classList.remove('slick-current', 'slick-active'); // Remove active classes
      }
    });

    const dots = [...slickDots.children];
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('slick-active');
        dot.querySelector('button').setAttribute('aria-selected', 'true');
        dot.querySelector('button').setAttribute('tabindex', '0');
      } else {
        dot.classList.remove('slick-active');
        dot.querySelector('button').setAttribute('aria-selected', 'false');
        dot.querySelector('button').setAttribute('tabindex', '-1');
      }
    });

    prevButton.setAttribute('aria-disabled', currentIndex === 0 ? 'true' : 'false');
    if (currentIndex === 0) {
      prevButton.classList.add('slick-disabled');
    } else {
      prevButton.classList.remove('slick-disabled');
    }

    nextButton.setAttribute('aria-disabled', currentIndex === carouselItems.length - 1 ? 'true' : 'false');
    if (currentIndex === carouselItems.length - 1) {
      nextButton.classList.add('slick-disabled');
    } else {
      nextButton.classList.remove('slick-disabled');
    }
  };

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < carouselItems.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  slickDots.addEventListener('click', (event) => {
    const targetButton = event.target.closest('button');
    if (targetButton && targetButton.parentElement.tagName === 'LI') {
      const index = [...slickDots.children].indexOf(targetButton.parentElement);
      if (index !== -1 && index !== currentIndex) {
        currentIndex = index;
        updateCarousel();
      }
    }
  });

  block.textContent = '';
  block.classList.add('carousel', 'panelcontainer', 'cmp-carousel');
  block.setAttribute('data-placeholder-text', 'false');
  block.setAttribute('data-cmp-is', 'carousel');
  block.setAttribute('data-show-infinite-scroll', 'false');
  block.setAttribute('data-show-arrows', 'true');
  block.setAttribute('data-show-dots', 'true');
  block.setAttribute('data-item-count-per-slide', '1');
  block.setAttribute('data-auto-play-is-enabled', 'false');
  block.setAttribute('data-auto-play-speed-in-ms', '5000');
  block.setAttribute('data-reveal-next-item-partially', 'false');
  block.setAttribute('data-component', 'carousel');

  block.append(container);

  // Initial update after appending to DOM to ensure slideWidth is calculated correctly
  // Use a setTimeout to ensure layout has rendered and offsetWidth is available
  setTimeout(() => {
    updateCarousel();
  }, 0);


  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
