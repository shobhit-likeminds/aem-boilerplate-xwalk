import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-carousel-section');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.id = 'carouselExampleSlidesOnly';
  carouselWrapper.classList.add('bannerCarousel', 'carousel', 'slide');
  carouselWrapper.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselExampleSlidesOnly');
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    // Add event listener to indicator
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const currentActiveIndicator = carouselIndicators.querySelector('li.active');
      if (currentActiveIndicator) {
        currentActiveIndicator.classList.remove('active');
      }
      indicator.classList.add('active');

      const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
      if (currentActiveItem) {
        currentActiveItem.classList.remove('active');
      }
      const targetSlideIndex = parseInt(indicator.getAttribute('data-slide-to'), 10);
      const targetItem = carouselInner.children[targetSlideIndex];
      if (targetItem) {
        targetItem.classList.add('active');
      }
    });

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    // Destructure children for content detection
    const cells = [...row.children];
    const desktopImageCell = cells[0];
    const mobileImageCell = cells[1];
    const headingCell = cells[2];
    const descriptionCell = cells[3];
    const ctaLinkCell = cells[4];
    const ctaLinkLabelCell = cells[5];

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '2000' }]);
      optimizedDesktopPic.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image');
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '750' }]);
      optimizedMobilePic.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'mobile-image');
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      carouselItem.append(optimizedMobilePic);
    }

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    const heading = document.createElement('h1');
    heading.classList.add('koi-carousel-heading', 'text-sm-left');
    moveInstrumentation(headingCell, heading);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    bannerContentWrapper.append(heading);

    // Description
    const description = document.createElement('div');
    description.classList.add('koi-carousel-description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    bannerContentWrapper.append(description);

    // CTA Link
    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaLinkLabel = ctaLinkLabelCell.querySelector('a');
    if (ctaLink && ctaLinkLabel) {
      const ctaButton = document.createElement('a');
      ctaButton.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
      ctaButton.href = ctaLink.href;
      ctaButton.textContent = ctaLinkLabel.textContent;
      if (ctaLink.target) ctaButton.target = ctaLink.target;
      if (ctaLink.alt) ctaButton.alt = ctaLink.alt;

      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      // Check if target is _blank to add screen reader text
      if (ctaLink.target === '_blank') {
        screenReaderSpan.textContent = 'opens in a new tab';
      }
      ctaButton.append(screenReaderSpan);
      bannerContentWrapper.append(ctaButton);
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselWrapper.append(carouselIndicators, carouselInner);

  // Next and previous buttons
  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#carouselExampleSlidesOnly';
  prevControl.setAttribute('role', 'button');
  prevControl.setAttribute('data-slide', 'prev'); // Added data-slide attribute
  prevControl.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    if (activeItem && prevItem) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('li.active');
      const prevIndicator = activeIndicator.previousElementSibling || carouselIndicators.lastElementChild;
      if (activeIndicator && prevIndicator) {
        activeIndicator.classList.remove('active');
        prevIndicator.classList.add('active');
      }
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevControl.append(prevIcon, prevSrOnly);

  const nextControl = document.createElement('a');
  nextControl.classList.add('carousel-control-next');
  nextControl.href = '#carouselExampleSlidesOnly';
  nextControl.setAttribute('role', 'button');
  nextControl.setAttribute('data-slide', 'next'); // Added data-slide attribute
  nextControl.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    if (activeItem && nextItem) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('li.active');
      const nextIndicator = activeIndicator.nextElementSibling || carouselIndicators.firstElementChild;
      if (activeIndicator && nextIndicator) {
        activeIndicator.classList.remove('active');
        nextIndicator.classList.add('active');
      }
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextControl.append(nextIcon, nextSrOnly);

  nextCarouselBtn.append(prevControl, nextControl);
  carouselWrapper.append(nextCarouselBtn);

  section.append(carouselWrapper);
  block.textContent = '';
  block.append(section);
}
