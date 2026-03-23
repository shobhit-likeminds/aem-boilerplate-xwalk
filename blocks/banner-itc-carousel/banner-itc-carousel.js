import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;
  block.id = carouselId;
  // The class 'banner-bannerCarousel' is already present in the original HTML on the div with id="carouselExampleSlidesOnly"
  // and should not be added to the block element itself, which is the <div class="banner-itc-carousel">.
  // The block element should only have the generic 'carousel' and 'slide' classes if it's acting as the carousel container.
  // However, the original HTML shows the carousel functionality is on a div *inside* the section.
  // Let's assume the block itself *becomes* the carousel container as per the JS logic.
  // The original HTML uses 'banner-bannerCarousel carousel slide' on the inner div.
  // The JS is making the block itself the carousel container. So, these classes are appropriate for the block.
  block.classList.add('carousel', 'slide'); // 'banner-bannerCarousel' is already handled by the block name if it's 'banner-itc-carousel'

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const slides = [...block.children];

  slides.forEach((slideRow, index) => {
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    olIndicators.append(indicator);

    const carouselItem = document.createElement('div');
    moveInstrumentation(slideRow, carouselItem);
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    // According to BlockJson, there are exactly 5 fields per slide:
    // desktopImage, mobileImage, heading, description, ctaLink
    const cells = [...slideRow.children];
    const [desktopImageCell, mobileImageCell, headingCell, descriptionCell, ctaLinkCell] = cells;

    if (desktopImageCell) {
      const desktopPicture = desktopImageCell.querySelector('picture');
      if (desktopPicture) {
        const desktopImg = desktopPicture.querySelector('img');
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
        // Ensure the class names match the original HTML
        optimizedDesktopPic.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
        if (index === 0) {
          optimizedDesktopPic.querySelector('img').setAttribute('fetchpriority', 'high');
        } else {
          optimizedDesktopPic.querySelector('img').setAttribute('loading', 'lazy');
        }
        moveInstrumentation(desktopImageCell, optimizedDesktopPic);
        carouselItem.append(optimizedDesktopPic);
      }
    }

    if (mobileImageCell) {
      const mobilePicture = mobileImageCell.querySelector('picture');
      if (mobilePicture) {
        const mobileImg = mobilePicture.querySelector('img');
        const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '768' }]);
        // Ensure the class names match the original HTML
        optimizedMobilePic.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
        if (index === 0) {
          optimizedMobilePic.querySelector('img').setAttribute('fetchpriority', 'high');
        } else {
          optimizedMobilePic.querySelector('img').setAttribute('loading', 'lazy');
        }
        moveInstrumentation(mobileImageCell, optimizedMobilePic);
        carouselItem.append(optimizedMobilePic);
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-banner-content-wrapper', 'position-absolute');

    if (headingCell) {
      const h1 = headingCell.querySelector('h1');
      if (h1) {
        h1.classList.add('banner-koi-carousel-heading', 'text-sm-left');
        const color = h1.getAttribute('data-color');
        if (color) h1.style.color = color;
        moveInstrumentation(headingCell, h1);
        contentWrapper.append(h1);
      } else {
        // If it's not an h1, but the cell exists, append its content
        moveInstrumentation(headingCell, contentWrapper);
        while (headingCell.firstChild) contentWrapper.append(headingCell.firstChild);
      }
    }

    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('banner-koi-carousel-description');
      const descColor = descriptionCell.getAttribute('data-desc-color');
      if (descColor) descriptionDiv.setAttribute('data-desc-color', descColor);
      moveInstrumentation(descriptionCell, descriptionDiv);
      while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
      contentWrapper.append(descriptionDiv);
    }

    if (ctaLinkCell) {
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        // Ensure the class names match the original HTML
        newCtaLink.classList.add('banner-koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        newCtaLink.target = '_blank';
        newCtaLink.rel = 'noopener noreferrer'; // Add rel for security with target="_blank"
        const bgColor = ctaLink.getAttribute('data-bg-color');
        if (bgColor) newCtaLink.style.backgroundColor = bgColor;
        newCtaLink.textContent = ctaLink.textContent;
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only'); // Class from original HTML
        screenReaderSpan.textContent = 'opens in a new tab';
        newCtaLink.append(screenReaderSpan);
        moveInstrumentation(ctaLinkCell, newCtaLink);
        contentWrapper.append(newCtaLink);
      }
    }

    if (contentWrapper.children.length > 0) {
      carouselItem.append(contentWrapper);
    }

    carouselInner.append(carouselItem);
  });

  block.textContent = '';
  block.append(olIndicators, carouselInner);

  const nextPrevButtons = document.createElement('div');
  nextPrevButtons.classList.add('banner-next-carousel-btn'); // Class from original HTML

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev'); // Add data-slide attribute as in original HTML
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = block.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    if (prevItem && prevItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      const activeIndicator = olIndicators.querySelector('.active');
      const prevIndicator = activeIndicator.previousElementSibling || olIndicators.lastElementChild;
      if (activeIndicator) activeIndicator.classList.remove('active');
      if (prevIndicator) prevIndicator.classList.add('active');
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);

  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.setAttribute('data-slide', 'next'); // Add data-slide attribute as in original HTML
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = block.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    if (nextItem && nextItem.classList.contains('carousel-item')) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      const activeIndicator = olIndicators.querySelector('.active');
      const nextIndicator = activeIndicator.nextElementSibling || olIndicators.firstElementChild;
      if (activeIndicator) activeIndicator.classList.remove('active');
      if (nextIndicator) nextIndicator.classList.add('active');
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  nextPrevButtons.append(prevButton, nextButton);
  block.append(nextPrevButtons);

  // Add click listeners to indicators
  [...olIndicators.children].forEach((indicator, idx) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
      const currentActiveIndicator = olIndicators.querySelector('.active');
      const targetItem = carouselInner.children[idx];

      if (currentActiveItem) currentActiveItem.classList.remove('active');
      if (currentActiveIndicator) currentActiveIndicator.classList.remove('active');

      targetItem.classList.add('active');
      indicator.classList.add('active');
    });
  });

  // Automatic slide functionality
  let slideInterval;
  const startSlideShow = () => {
    slideInterval = setInterval(() => {
      const activeItem = block.querySelector('.carousel-item.active');
      const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
      if (nextItem && nextItem.classList.contains('carousel-item')) {
        activeItem.classList.remove('active');
        nextItem.classList.add('active');
        const activeIndicator = olIndicators.querySelector('.active');
        const nextIndicator = activeIndicator.nextElementSibling || olIndicators.firstElementChild;
        if (activeIndicator) activeIndicator.classList.remove('active');
        if (nextIndicator) nextIndicator.classList.add('active');
      }
    }, 5000); // Change slide every 5 seconds
  };

  const stopSlideShow = () => {
    clearInterval(slideInterval);
  };

  block.addEventListener('mouseenter', stopSlideShow);
  block.addEventListener('mouseleave', startSlideShow);

  startSlideShow();
}
