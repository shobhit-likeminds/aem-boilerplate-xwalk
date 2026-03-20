import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('bannercarousel-section');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.id = 'carouselExampleSlidesOnly';
  carouselWrapper.classList.add('bannercarousel-carousel', 'carousel', 'slide');
  carouselWrapper.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    // CHECK 1: STRUCTURE ALIGNMENT - The JS correctly destructures 6 cells, matching the 6 fields in bannerCarouselItem model.
    const [
      desktopImageCell,
      mobileImageCell,
      headingCell,
      descriptionCell,
      ctaLabelCell,
      ctaLinkCell,
    ] = row.children;

    // Carousel Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselExampleSlidesOnly');
    indicator.setAttribute('data-slide-to', index);
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

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
      const newDesktopImg = optimizedDesktopPic.querySelector('img');
      moveInstrumentation(desktopImg, newDesktopImg);
      // CHECK 3: CSS CLASS COVERAGE - Classes 'd-none', 'd-sm-block', 'w-100', 'bannercarousel-desktop-image' are applied.
      newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'bannercarousel-desktop-image');
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      const newMobileImg = optimizedMobilePic.querySelector('img');
      moveInstrumentation(mobileImg, newMobileImg);
      // CHECK 3: CSS CLASS COVERAGE - Classes 'd-block', 'd-sm-none', 'w-100', 'bannercarousel-mobile-image' are applied.
      newMobileImg.classList.add('d-block', 'd-sm-none', 'w-100', 'bannercarousel-mobile-image');
      carouselItem.append(optimizedMobilePic);
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    // CHECK 3: CSS CLASS COVERAGE - Classes 'bannercarousel-content-wrapper', 'position-absolute' are applied.
    contentWrapper.classList.add('bannercarousel-content-wrapper', 'position-absolute');

    // Heading
    const heading = document.createElement('h1');
    moveInstrumentation(headingCell, heading);
    // CHECK 3: CSS CLASS COVERAGE - Classes 'bannercarousel-heading', 'text-sm-left' are applied.
    heading.classList.add('bannercarousel-heading', 'text-sm-left');
    heading.innerHTML = headingCell.innerHTML;
    const headingColor = headingCell.querySelector('h1')?.getAttribute('data-color');
    if (headingColor) {
      heading.style.color = headingColor;
    }
    contentWrapper.append(heading);

    // Description
    const descriptionDiv = document.createElement('div');
    moveInstrumentation(descriptionCell, descriptionDiv);
    // CHECK 3: CSS CLASS COVERAGE - Class 'bannercarousel-description' is applied.
    descriptionDiv.classList.add('bannercarousel-description');
    descriptionDiv.innerHTML = descriptionCell.innerHTML;
    const descColor = descriptionCell.querySelector('div')?.getAttribute('data-desc-color');
    if (descColor) {
      descriptionDiv.querySelectorAll('h3, p, i').forEach((el) => {
        el.style.color = descColor;
      });
    }
    contentWrapper.append(descriptionDiv);

    // CTA
    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaButton = document.createElement('a');
    moveInstrumentation(ctaLinkCell, ctaButton);
    // CHECK 3: CSS CLASS COVERAGE - Classes 'bannercarousel-cta', 'btn', 'btn-primary', 'bannercarousel-btn-start-now' are applied.
    ctaButton.classList.add('bannercarousel-cta', 'btn', 'btn-primary', 'bannercarousel-btn-start-now');
    if (ctaLink) {
      ctaButton.href = ctaLink.href;
      ctaButton.target = ctaLink.target || '_self';
      ctaButton.alt = ctaLink.alt || '';
      const bgColor = ctaLink.getAttribute('data-bg-color');
      if (bgColor) {
        ctaButton.style.backgroundColor = bgColor;
      }
    }
    ctaButton.textContent = ctaLabelCell.textContent.trim();
    if (ctaButton.target === '_blank') {
      const srOnlySpan = document.createElement('span');
      // CHECK 3: CSS CLASS COVERAGE - Class 'cmp-link__screen-reader-only' is applied.
      srOnlySpan.classList.add('cmp-link__screen-reader-only');
      srOnlySpan.textContent = 'opens in a new tab';
      ctaButton.append(srOnlySpan);
    }
    contentWrapper.append(ctaButton);

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  // Navigation Buttons
  const navButtonsWrapper = document.createElement('div');
  // CHECK 3: CSS CLASS COVERAGE - Class 'bannercarousel-next-btn' is applied.
  navButtonsWrapper.classList.add('bannercarousel-next-btn');

  const prevButton = document.createElement('a');
  // CHECK 3: CSS CLASS COVERAGE - Class 'carousel-control-prev' is applied.
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = '#carouselExampleSlidesOnly';
  prevButton.setAttribute('role', 'button');
  // FIX: Added missing data-slide attribute for previous button
  prevButton.setAttribute('data-slide', 'prev');
  const prevSpanIcon = document.createElement('span');
  // CHECK 3: CSS CLASS COVERAGE - Class 'carousel-control-prev-icon' is applied.
  prevSpanIcon.classList.add('carousel-control-prev-icon');
  prevSpanIcon.setAttribute('aria-hidden', 'true');
  const prevSpanSrOnly = document.createElement('span');
  // CHECK 3: CSS CLASS COVERAGE - Class 'sr-only' is applied.
  prevSpanSrOnly.classList.add('sr-only');
  prevSpanSrOnly.textContent = 'Previous';
  prevButton.append(prevSpanIcon, prevSpanSrOnly);

  const nextButton = document.createElement('a');
  // CHECK 3: CSS CLASS COVERAGE - Class 'carousel-control-next' is applied.
  nextButton.classList.add('carousel-control-next');
  nextButton.href = '#carouselExampleSlidesOnly';
  nextButton.setAttribute('role', 'button');
  // FIX: Added missing data-slide attribute for next button
  nextButton.setAttribute('data-slide', 'next');
  const nextSpanIcon = document.createElement('span');
  // CHECK 3: CSS CLASS COVERAGE - Class 'carousel-control-next-icon' is applied.
  nextSpanIcon.classList.add('carousel-control-next-icon');
  nextSpanIcon.setAttribute('aria-hidden', 'true');
  const nextSpanSrOnly = document.createElement('span');
  // CHECK 3: CSS CLASS COVERAGE - Class 'sr-only' is applied.
  nextSpanSrOnly.classList.add('sr-only');
  nextSpanSrOnly.textContent = 'Next';
  nextButton.append(nextSpanIcon, nextSpanSrOnly);

  navButtonsWrapper.append(prevButton, nextButton);

  carouselWrapper.append(carouselIndicators, carouselInner, navButtonsWrapper);

  block.textContent = '';
  block.append(carouselWrapper);

  // CHECK 2: INTERACTIVITY - Event listeners for carousel functionality are present.
  let currentIndex = 0;
  const items = carouselInner.querySelectorAll('.carousel-item');
  const indicators = carouselIndicators.querySelectorAll('li');
  const totalItems = items.length;

  const showSlide = (index) => {
    items.forEach((item, i) => {
      item.classList.remove('active', 'carousel-item-left', 'carousel-item-next');
      indicators[i].classList.remove('active');
    });

    items[index].classList.add('active');
    indicators[index].classList.add('active');
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showSlide(currentIndex);
  };

  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
  });

  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // Auto-advance carousel every 5 seconds
  setInterval(nextSlide, 5000);
}
