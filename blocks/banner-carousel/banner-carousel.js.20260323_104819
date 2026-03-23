import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselSection = document.createElement('section');
  carouselSection.classList.add('banner-carousel-section'); // Changed from banner-itc-carousel-section

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carouselExampleSlidesOnly';
  carouselDiv.classList.add('banner-carousel', 'carousel', 'slide'); // Changed from bannerCarousel

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const bannerItems = [...block.children];

  bannerItems.forEach((row, index) => {
    const [
      desktopImageCell,
      mobileImageCell,
      desktopAltCell,
      mobileAltCell,
      headingCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = row.children;

    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselExampleSlidesOnly');
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

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopAltCell.textContent, index === 0, [{ width: '2000' }]);
      const newDesktopImg = optimizedDesktopPic.querySelector('img');
      newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-carousel-desktop-image'); // Changed from banner-desktop-image
      if (index === 0) {
        newDesktopImg.setAttribute('fetchpriority', 'high');
      } else {
        newDesktopImg.setAttribute('loading', 'lazy');
        newDesktopImg.setAttribute('fetchpriority', 'low');
      }
      moveInstrumentation(desktopImg, newDesktopImg);
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileAltCell.textContent, index === 0, [{ width: '750' }]);
      const newMobileImg = optimizedMobilePic.querySelector('img');
      newMobileImg.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-carousel-mobile-image'); // Changed from banner-mobile-image
      if (index === 0) {
        newMobileImg.setAttribute('fetchpriority', 'high');
      } else {
        newMobileImg.setAttribute('loading', 'lazy');
        newMobileImg.setAttribute('fetchpriority', 'low');
      }
      moveInstrumentation(mobileImg, newMobileImg);
      carouselItem.append(optimizedMobilePic);
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-carousel-content-wrapper', 'position-absolute'); // Changed from banner-content-wrapper

    const heading = document.createElement('h1');
    heading.classList.add('banner-carousel-heading', 'text-sm-left'); // Changed from banner-koi-carousel-heading
    heading.innerHTML = headingCell.innerHTML;
    const headingColor = headingCell.querySelector('[data-color]');
    if (headingColor) {
      heading.style.color = headingColor.getAttribute('data-color');
    }
    moveInstrumentation(headingCell, heading);
    contentWrapper.append(heading);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('banner-carousel-description'); // Changed from banner-koi-carousel-description
    descriptionDiv.innerHTML = descriptionCell.innerHTML;
    const descColor = descriptionCell.querySelector('[data-desc-color]');
    if (descColor) {
      descriptionDiv.style.color = descColor.getAttribute('data-desc-color');
      descriptionDiv.querySelectorAll('[style*="color"]').forEach((el) => {
        el.style.color = descColor.getAttribute('data-desc-color');
      });
    }
    moveInstrumentation(descriptionCell, descriptionDiv);
    contentWrapper.append(descriptionDiv);

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const ctaButton = document.createElement('a');
      ctaButton.href = ctaLink.href;
      ctaButton.target = '_blank';
      ctaButton.classList.add('banner-carousel-cta', 'btn', 'btn-primary', 'btn-start-now'); // Changed from banner-koi-carousel-cta
      ctaButton.textContent = ctaLabelCell.textContent;
      const bgColor = ctaLink.getAttribute('data-bg-color');
      if (bgColor) {
        ctaButton.style.backgroundColor = bgColor;
      }
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      ctaButton.append(screenReaderSpan);
      moveInstrumentation(ctaLinkCell, ctaButton);
      contentWrapper.append(ctaButton);
    }

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
    moveInstrumentation(row, carouselItem);
  });

  carouselDiv.append(carouselIndicators, carouselInner);

  // Navigation buttons
  const navButtonsDiv = document.createElement('div');
  navButtonsDiv.classList.add('banner-carousel-next-carousel-btn'); // Changed from banner-next-carousel-btn

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = '#carouselExampleSlidesOnly';
  prevButton.setAttribute('role', 'button');
  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);

  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = '#carouselExampleSlidesOnly';
  nextButton.setAttribute('role', 'button');
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  navButtonsDiv.append(prevButton, nextButton);
  carouselDiv.append(navButtonsDiv);

  carouselSection.append(carouselDiv);
  block.textContent = '';
  block.append(carouselSection);

  // Add event listeners for carousel functionality
  let currentIndex = 0;
  const items = carouselInner.querySelectorAll('.carousel-item');
  const indicators = carouselIndicators.querySelectorAll('li');

  const showSlide = (index) => {
    items.forEach((item, i) => {
      item.classList.remove('active');
      indicators[i].classList.remove('active');
      if (i === index) {
        item.classList.add('active');
        indicators[i].classList.add('active');
      }
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  };

  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
  });

  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });
}
