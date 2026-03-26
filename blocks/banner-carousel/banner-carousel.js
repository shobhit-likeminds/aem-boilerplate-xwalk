import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-carousel-section');

  const carouselId = `carouselExampleSlidesOnly`; // Hardcoded ID from original HTML
  const carousel = document.createElement('div');
  carousel.id = carouselId;
  carousel.classList.add('bannerCarousel', 'carousel', 'slide');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  // Skip the first row which is just the container label
  const bannerRows = [...block.children].slice(1);

  bannerRows.forEach((row, index) => {
    const [desktopImageCell, mobileImageCell, headingCell, descriptionCell, ctaLinkCell] = [...row.children];

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
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem); // Move instrumentation from the row to the carousel item

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
      const newDesktopImg = optimizedDesktopPic.querySelector('img');
      moveInstrumentation(desktopImg, newDesktopImg);
      newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image');
      if (index === 0) {
        newDesktopImg.setAttribute('fetchpriority', 'high');
      } else {
        newDesktopImg.setAttribute('loading', 'lazy');
        newDesktopImg.setAttribute('fetchpriority', 'low');
      }
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      const newMobileImg = optimizedMobilePic.querySelector('img');
      moveInstrumentation(mobileImg, newMobileImg);
      newMobileImg.classList.add('d-block', 'd-sm-none', 'w-100', 'mobile-image');
      if (index === 0) {
        newMobileImg.setAttribute('fetchpriority', 'high');
      } else {
        newMobileImg.setAttribute('loading', 'lazy');
        newMobileImg.setAttribute('fetchpriority', 'low');
      }
      carouselItem.append(optimizedMobilePic);
    }

    // Content Wrapper
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
    if (ctaLink) {
      const newCta = document.createElement('a');
      newCta.href = ctaLink.href;
      newCta.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
      newCta.target = '_blank'; // From original HTML
      newCta.alt = ctaLink.textContent; // From original HTML
      moveInstrumentation(ctaLink, newCta);
      while (ctaLink.firstChild) newCta.append(ctaLink.firstChild);
      const srOnlySpan = document.createElement('span');
      srOnlySpan.classList.add('cmp-link__screen-reader-only');
      srOnlySpan.textContent = 'opens in a new tab';
      newCta.append(srOnlySpan);
      bannerContentWrapper.append(newCta);
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carousel.append(carouselIndicators, carouselInner);

  // Carousel navigation logic
  const slideCarousel = (direction) => {
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const activeIndicator = carouselIndicators.querySelector('.active');
    let nextItem;
    let nextIndicator;

    if (direction === 'next') {
      nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
      nextIndicator = activeIndicator.nextElementSibling || carouselIndicators.firstElementChild;
    } else { // 'prev'
      nextItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
      nextIndicator = activeIndicator.previousElementSibling || carouselIndicators.lastElementChild;
    }

    if (nextItem) {
      activeItem.classList.remove('active');
      activeIndicator.classList.remove('active');
      nextItem.classList.add('active');
      nextIndicator.classList.add('active');
    }
  };

  // Next and Previous Buttons
  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = `#${carouselId}`;
  prevControl.setAttribute('role', 'button');
  prevControl.addEventListener('click', (e) => {
    e.preventDefault();
    slideCarousel('prev');
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
  nextControl.href = `#${carouselId}`;
  nextControl.setAttribute('role', 'button');
  nextControl.addEventListener('click', (e) => {
    e.preventDefault();
    slideCarousel('next');
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextControl.append(nextIcon, nextSrOnly);

  nextCarouselBtn.append(prevControl, nextControl);
  carousel.append(nextCarouselBtn);

  section.append(carousel);

  block.textContent = '';
  block.append(section);
}
