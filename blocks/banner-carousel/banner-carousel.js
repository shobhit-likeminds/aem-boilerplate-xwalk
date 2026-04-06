import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-carousel-section');

  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;
  const carouselDiv = document.createElement('div');
  carouselDiv.id = carouselId;
  carouselDiv.classList.add('bannerCarousel', 'carousel', 'slide');
  // data-ride="carousel" is handled by custom JS below, no need for attribute
  // carouselDiv.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
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
    moveInstrumentation(row, carouselItem);

    const cells = [...row.children];

    // Content detection for cells instead of index access
    const desktopImageCell = cells.find(cell => cell.querySelector('picture') && !cell.nextElementSibling?.querySelector('picture'));
    const mobileImageCell = cells.find(cell => cell.querySelector('picture') && cell.previousElementSibling?.querySelector('picture'));
    const headingCell = cells.find(cell => cell.querySelector('h1, h2, h3, h4, h5, h6'));
    const descriptionCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a'));

    // Desktop Image
    if (desktopImageCell) {
      const desktopPicture = desktopImageCell.querySelector('picture');
      if (desktopPicture) {
        const desktopImg = desktopPicture.querySelector('img');
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '750' }]);
        const newDesktopImg = optimizedDesktopPic.querySelector('img');
        newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image');
        if (index === 0) {
          newDesktopImg.setAttribute('loading', 'eager');
          newDesktopImg.setAttribute('fetchpriority', 'high');
        } else {
          newDesktopImg.setAttribute('loading', 'lazy');
          newDesktopImg.setAttribute('fetchpriority', 'low');
        }
        moveInstrumentation(desktopImg, newDesktopImg);
        carouselItem.append(optimizedDesktopPic);
      }
    }

    // Mobile Image
    if (mobileImageCell) {
      const mobilePicture = mobileImageCell.querySelector('picture');
      if (mobilePicture) {
        const mobileImg = mobilePicture.querySelector('img');
        const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
        const newMobileImg = optimizedMobilePic.querySelector('img');
        newMobileImg.classList.add('d-block', 'd-sm-none', 'w-100', 'mobile-image');
        if (index === 0) {
          newMobileImg.setAttribute('loading', 'eager');
          newMobileImg.setAttribute('fetchpriority', 'high');
        } else {
          newMobileImg.setAttribute('loading', 'lazy');
          newMobileImg.setAttribute('fetchpriority', 'low');
        }
        moveInstrumentation(mobileImg, newMobileImg);
        carouselItem.append(optimizedMobilePic);
      }
    }

    // Content Wrapper
    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    if (headingCell) {
      const h1 = document.createElement('h1'); // Assuming the primary heading is h1
      h1.classList.add('koi-carousel-heading', 'text-sm-left');
      moveInstrumentation(headingCell, h1);
      while (headingCell.firstChild) h1.append(headingCell.firstChild);
      bannerContentWrapper.append(h1);
    }

    // Description
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('koi-carousel-description');
      moveInstrumentation(descriptionCell, descriptionDiv);
      while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
      bannerContentWrapper.append(descriptionDiv);
    }

    // CTA Link
    if (ctaLinkCell) {
      const foundLink = ctaLinkCell.querySelector('a');
      if (foundLink) {
        const ctaLink = document.createElement('a');
        ctaLink.href = foundLink.href;
        ctaLink.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        if (foundLink.target) { // Preserve target if present in original HTML
          ctaLink.target = foundLink.target;
        }
        if (foundLink.alt) { // Preserve alt if present in original HTML
          ctaLink.alt = foundLink.alt;
        }
        moveInstrumentation(foundLink, ctaLink);
        while (foundLink.firstChild) ctaLink.append(foundLink.firstChild);
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        ctaLink.append(screenReaderSpan);
        bannerContentWrapper.append(ctaLink);
      }
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselDiv.append(carouselIndicators, carouselInner);

  // Next and Previous Buttons
  const nextCarouselBtnDiv = document.createElement('div');
  nextCarouselBtnDiv.classList.add('next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev'); // Add data-slide attribute for clarity
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    stopSlideInterval(); // Stop interval on manual interaction
    const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
    const prevItem = currentActiveItem.previousElementSibling || carouselInner.lastElementChild;
    if (prevItem) {
      currentActiveItem.classList.remove('active');
      prevItem.classList.add('active');
      const prevIndex = [...carouselInner.children].indexOf(prevItem);
      carouselIndicators.querySelector('.active').classList.remove('active');
      carouselIndicators.children[prevIndex].classList.add('active');
    }
    startSlideInterval(); // Restart interval after interaction
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
  nextButton.setAttribute('data-slide', 'next'); // Add data-slide attribute for clarity
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    stopSlideInterval(); // Stop interval on manual interaction
    const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
    const nextItem = currentActiveItem.nextElementSibling || carouselInner.firstElementChild;
    if (nextItem) {
      currentActiveItem.classList.remove('active');
      nextItem.classList.add('active');
      const nextIndex = [...carouselInner.children].indexOf(nextItem);
      carouselIndicators.querySelector('.active').classList.remove('active');
      carouselIndicators.children[nextIndex].classList.add('active');
    }
    startSlideInterval(); // Restart interval after interaction
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  nextCarouselBtnDiv.append(prevButton, nextButton);
  carouselDiv.append(nextCarouselBtnDiv);

  section.append(carouselDiv);
  block.textContent = '';
  block.append(section);

  // Auto-slide functionality (mimicking data-ride="carousel")
  let slideInterval;
  const startSlideInterval = () => {
    // Clear any existing interval before starting a new one
    stopSlideInterval();
    slideInterval = setInterval(() => {
      const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
      const nextItem = currentActiveItem.nextElementSibling || carouselInner.firstElementChild;
      if (nextItem) {
        currentActiveItem.classList.remove('active');
        nextItem.classList.add('active');
        const nextIndex = [...carouselInner.children].indexOf(nextItem);
        carouselIndicators.querySelector('.active').classList.remove('active');
        carouselIndicators.children[nextIndex].classList.add('active');
      }
    }, 5000); // Default Bootstrap carousel interval is 5000ms
  };

  const stopSlideInterval = () => {
    clearInterval(slideInterval);
  };

  startSlideInterval(); // Start auto-sliding on load

  carouselDiv.addEventListener('mouseenter', stopSlideInterval);
  carouselDiv.addEventListener('mouseleave', startSlideInterval);

  // Handle indicator clicks
  [...carouselIndicators.children].forEach((indicator, idx) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      stopSlideInterval(); // Stop interval on manual interaction
      carouselIndicators.querySelector('.active').classList.remove('active');
      indicator.classList.add('active');
      carouselInner.querySelector('.carousel-item.active').classList.remove('active');
      carouselInner.children[idx].classList.add('active');
      startSlideInterval(); // Restart interval after interaction
    });
  });
}
