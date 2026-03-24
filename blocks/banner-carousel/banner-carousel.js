import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-itc-carousel-section');

  const carouselId = `carousel-${Math.random().toString(36).substring(2, 15)}`;
  const carousel = document.createElement('div');
  carousel.id = carouselId;
  carousel.classList.add('banner-bannerCarousel', 'carousel', 'slide');
  carousel.setAttribute('data-ride', 'carousel'); // Add data-ride for Bootstrap-like auto-play if needed

  const [bannersContainerRow, ...bannerRows] = [...block.children];
  // The first row is just the container label, not an actual banner item.
  moveInstrumentation(bannersContainerRow, carousel);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  bannerRows.forEach((row, index) => {
    const [desktopImageCell, mobileImageCell, headingCell, descriptionCell, ctaLinkCell] = [...row.children];

    // Create indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    // Add event listener for indicators
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const slideToIndex = parseInt(e.target.getAttribute('data-slide-to'), 10);
      const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
      const currentActiveIndicator = carouselIndicators.querySelector('li.active');
      const targetItem = carouselInner.children[slideToIndex];
      const targetIndicator = carouselIndicators.children[slideToIndex];

      if (currentActiveItem) currentActiveItem.classList.remove('active');
      if (currentActiveIndicator) currentActiveIndicator.classList.remove('active');
      if (targetItem) targetItem.classList.add('active');
      if (targetIndicator) targetIndicator.classList.add('active');
    });
    carouselIndicators.append(indicator);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '1200' }]);
      const newDesktopImg = optimizedDesktopPic.querySelector('img');
      moveInstrumentation(desktopImg, newDesktopImg);
      newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      const newMobileImg = optimizedMobilePic.querySelector('img');
      moveInstrumentation(mobileImg, newMobileImg);
      newMobileImg.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
      carouselItem.append(optimizedMobilePic);
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-banner-content-wrapper', 'position-absolute');

    // Heading
    const heading = document.createElement('h1');
    heading.classList.add('banner-koi-carousel-heading', 'text-sm-left');
    moveInstrumentation(headingCell, heading);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    contentWrapper.append(heading);

    // Description
    const description = document.createElement('div');
    description.classList.add('banner-koi-carousel-description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    contentWrapper.append(description);

    // CTA Link
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      const ctaLink = document.createElement('a');
      ctaLink.href = foundCtaLink.href;
      ctaLink.classList.add('banner-koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
      ctaLink.target = '_blank';
      ctaLink.alt = foundCtaLink.textContent.trim(); // Use link text as alt
      moveInstrumentation(ctaLinkCell, ctaLink);
      while (ctaLinkCell.firstChild) ctaLink.append(ctaLinkCell.firstChild);
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      ctaLink.append(screenReaderSpan);
      contentWrapper.append(ctaLink);
    }

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  carousel.append(carouselIndicators, carouselInner);

  // Next and previous buttons
  const navButtonsWrapper = document.createElement('div');
  navButtonsWrapper.classList.add('banner-next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev'); // Add data-slide attribute
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    const activeIndicator = carouselIndicators.querySelector('li.active');
    const prevIndicator = activeIndicator.previousElementSibling || carouselIndicators.lastElementChild;

    if (activeItem) activeItem.classList.remove('active');
    if (prevItem) prevItem.classList.add('active');
    if (activeIndicator) activeIndicator.classList.remove('active');
    if (prevIndicator) prevIndicator.classList.add('active');
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
  nextButton.setAttribute('data-slide', 'next'); // Add data-slide attribute
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    const activeIndicator = carouselIndicators.querySelector('li.active');
    const nextIndicator = activeIndicator.nextElementSibling || carouselIndicators.firstElementChild;

    if (activeItem) activeItem.classList.remove('active');
    if (nextItem) nextItem.classList.add('active');
    if (activeIndicator) activeIndicator.classList.remove('active');
    if (nextIndicator) nextIndicator.classList.add('active');
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  navButtonsWrapper.append(prevButton, nextButton);
  carousel.append(navButtonsWrapper);

  section.append(carousel);
  block.textContent = '';
  block.append(section);
}
