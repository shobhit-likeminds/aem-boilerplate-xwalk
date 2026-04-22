import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    backgroundImageRow,
    ctaLabelRow,
    ...itemRows
  ] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('cmp-product-tabs', 'cmp-product-tabs--yippee-without-image');

  const backgroundImage = backgroundImageRow.firstElementChild.textContent.trim();
  if (backgroundImage) {
    root.style.backgroundImage = `url(${backgroundImage})`;
  }

  // Temporary images container (from original HTML)
  const tempImages = document.createElement('div');
  tempImages.classList.add('cmp-product-tabs__temp-images');
  for (let i = 0; i < 6; i += 1) {
    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');
    tempImages.append(lazyImageContainer);
  }
  root.append(tempImages);

  // Block Title
  const title = document.createElement('h2');
  title.classList.add('cmp-product-tabs__title');
  moveInstrumentation(titleRow, title);
  // Title is richtext, so use innerHTML
  title.innerHTML = titleRow.firstElementChild.innerHTML;
  root.append(title);

  // Content wrapper for carousel
  const content = document.createElement('div');
  content.classList.add('cmp-product-tabs__content');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('slickcarousel', 'carousel', 'panelcontainer');

  const carousel = document.createElement('div');
  carousel.classList.add('cmp-carousel');
  carousel.setAttribute('data-component', 'carousel');
  carousel.setAttribute('data-show-infinite-scroll', 'false');
  carousel.setAttribute('data-show-arrows', 'true');
  carousel.setAttribute('data-show-dots', 'true');
  carousel.setAttribute('data-item-count-per-slide', '3');
  carousel.setAttribute('data-auto-play-is-enabled', 'false');
  carousel.setAttribute('data-auto-play-speed-in-ms', '500');
  carousel.setAttribute('data-reveal-next-item-partially', 'false');
  carousel.setAttribute('data-show-center-zoom', 'false');
  carousel.setAttribute('data-slides-to-scroll', '3');
  carousel.setAttribute('data-initialized', 'true');

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');

  // Slick Prev Button
  const prevButton = document.createElement('button');
  prevButton.classList.add('slick-prev', 'slick-arrow', 'slick-disabled');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-disabled', 'true');
  // Background image for button is usually set by CSS, if not, it should be an authored asset.
  // Removed hardcoded style attribute.
  carouselContainer.append(prevButton);

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  // Width and transform are handled by Slick.js, so we don't set them here.
  slickList.append(slickTrack);

  itemRows.forEach((row, index) => {
    const [imageCell, linkCell] = [...row.children];

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('cmp-carousel__item', 'slick-slide');
    if (index === 0) { // First item is active by default
      carouselItem.classList.add('slick-current', 'slick-active');
      carouselItem.setAttribute('aria-hidden', 'false');
      carouselItem.setAttribute('tabindex', '0');
    } else {
      carouselItem.setAttribute('aria-hidden', 'true');
      carouselItem.setAttribute('tabindex', '-1');
    }
    carouselItem.setAttribute('data-slick-index', index);
    carouselItem.setAttribute('role', 'tabpanel');
    carouselItem.id = `slick-slide3${index}`;
    carouselItem.setAttribute('aria-describedby', `slick-slide-control3${index}`);
    // Width is handled by Slick.js, so we don't set it here.

    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');
    const link = linkCell.querySelector('a');
    if (link) {
      lazyImageContainer.setAttribute('data-redirection-url', link.href);
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        // Use createOptimizedPicture with the correct alt text and loading state
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        lazyImageContainer.append(optimizedPic);
        const optimizedImg = optimizedPic.querySelector('img');
        optimizedImg.classList.add('is-clickable', 'lazy-image', 'loaded');
        // Opacity and transition are handled by CSS/JS, not directly set here.
      }
    }
    moveInstrumentation(row, carouselItem); // Move instrumentation from row to carouselItem
    carouselItem.append(lazyImageContainer);
    slickTrack.append(carouselItem);
  });

  carouselContainer.append(slickList);

  // Slick Next Button
  const nextButton = document.createElement('button');
  nextButton.classList.add('slick-next', 'slick-arrow');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('type', 'button');
  // Background image for button is usually set by CSS, if not, it should be an authored asset.
  // Removed hardcoded style attribute.
  nextButton.setAttribute('aria-disabled', 'false');
  carouselContainer.append(nextButton);

  // Slick Dots (pagination)
  const slickDots = document.createElement('ul');
  slickDots.classList.add('slick-dots');
  slickDots.setAttribute('role', 'tablist');
  // Style is handled by Slick.js, so we don't set it here.

  // Dynamically add dots based on itemRows
  itemRows.forEach((_, index) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    if (index === 0) {
      li.classList.add('slick-active');
    }
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'tab');
    button.id = `slick-slide-control3${index}`;
    button.setAttribute('aria-controls', `slick-slide3${index}`);
    button.setAttribute('aria-label', `${index + 1} of ${itemRows.length}`);
    button.textContent = index + 1;
    if (index === 0) {
      button.setAttribute('tabindex', '0');
      button.setAttribute('aria-selected', 'true');
    } else {
      button.setAttribute('tabindex', '-1');
    }
    li.append(button);
    slickDots.append(li);
  });
  carouselContainer.append(slickDots);

  carousel.append(carouselContainer);
  carouselWrapper.append(carousel);
  content.append(carouselWrapper);
  root.append(content);

  // CTA Button
  const ctaButtonContainer = document.createElement('div');
  ctaButtonContainer.classList.add('button', 'cmp-button--primary', 'cmp-button--primary-undefined', 'cmp-product-tabs__button-range');

  const ctaButton = document.createElement('button');
  ctaButton.classList.add('cmp-button');
  ctaButton.setAttribute('type', 'button');

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('cmp-button__text');
  moveInstrumentation(ctaLabelRow, ctaSpan);
  ctaSpan.textContent = ctaLabelRow.firstElementChild.textContent.trim();
  ctaButton.append(ctaSpan);
  ctaButtonContainer.append(ctaButton);
  root.append(ctaButtonContainer);

  block.replaceChildren(root);

  // --- Interactivity (Slick.js-like behavior) ---
  let currentIndex = 0;
  const totalSlides = itemRows.length;
  const slidesPerView = parseInt(carousel.getAttribute('data-item-count-per-slide'), 10) || 1;

  const updateCarousel = () => {
    const track = root.querySelector('.slick-track');
    const items = root.querySelectorAll('.cmp-carousel__item');
    const dots = root.querySelectorAll('.slick-dots li');

    // Update slide visibility and active state
    items.forEach((item, i) => {
      if (i >= currentIndex && i < currentIndex + slidesPerView) {
        item.classList.add('slick-current', 'slick-active');
        item.setAttribute('aria-hidden', 'false');
        item.setAttribute('tabindex', '0');
      } else {
        item.classList.remove('slick-current', 'slick-active');
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('tabindex', '-1');
      }
    });

    // Update dots
    dots.forEach((dot, i) => {
      if (i === Math.floor(currentIndex / slidesPerView)) {
        dot.classList.add('slick-active');
        dot.querySelector('button').setAttribute('aria-selected', 'true');
        dot.querySelector('button').setAttribute('tabindex', '0');
      } else {
        dot.classList.remove('slick-active');
        dot.querySelector('button').setAttribute('aria-selected', 'false');
        dot.querySelector('button').setAttribute('tabindex', '-1');
      }
    });

    // Update prev/next button states
    prevButton.setAttribute('aria-disabled', currentIndex === 0);
    prevButton.classList.toggle('slick-disabled', currentIndex === 0);

    nextButton.setAttribute('aria-disabled', currentIndex >= totalSlides - slidesPerView);
    nextButton.classList.toggle('slick-disabled', currentIndex >= totalSlides - slidesPerView);

    // Simulate transform for slick-track (simplified, actual Slick.js is more complex)
    const itemWidth = items.length > 0 ? items[0].offsetWidth : 0;
    track.style.transform = `translate3d(-${currentIndex * itemWidth}px, 0px, 0px)`;
  };

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= slidesPerView;
      if (currentIndex < 0) currentIndex = 0;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < totalSlides - slidesPerView) {
      currentIndex += slidesPerView;
      if (currentIndex > totalSlides - slidesPerView) currentIndex = totalSlides - slidesPerView;
      updateCarousel();
    }
  });

  slickDots.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (button && button.parentElement.tagName === 'LI') {
      const dotIndex = Array.from(button.parentElement.parentElement.children).indexOf(button.parentElement);
      currentIndex = dotIndex * slidesPerView;
      updateCarousel();
    }
  });

  // Initial update
  updateCarousel();
}
