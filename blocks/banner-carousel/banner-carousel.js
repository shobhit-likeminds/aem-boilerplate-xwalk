import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-carousel-section');

  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;
  const carouselDiv = document.createElement('div');
  carouselDiv.id = carouselId;
  carouselDiv.classList.add('bannerCarousel', 'carousel', 'slide');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    // CRITICAL FIX: Replaced array destructuring with content detection
    const cells = [...row.children];
    const desktopImageCell = cells.find(cell => cell.querySelector('picture') && !cell.querySelector('picture').closest('div').nextElementSibling?.querySelector('picture'));
    const mobileImageCell = cells.find(cell => cell.querySelector('picture') && cell.querySelector('picture').closest('div').nextElementSibling?.querySelector('picture'));
    const headingCell = cells.find(cell => cell.querySelector('h1, h2, h3, h4, h5, h6'));
    const descriptionCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a'));

    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
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
    moveInstrumentation(row, carouselItem);

    // Desktop Image
    if (desktopImageCell) {
      const desktopPicture = desktopImageCell.querySelector('picture');
      if (desktopPicture) {
        const desktopImg = desktopPicture.querySelector('img');
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
        const newDesktopImg = optimizedDesktopPic.querySelector('img');
        newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image');
        if (index === 0) {
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
          newMobileImg.setAttribute('fetchpriority', 'high');
        } else {
          newMobileImg.setAttribute('loading', 'lazy');
          newMobileImg.setAttribute('fetchpriority', 'low');
        }
        moveInstrumentation(mobileImg, newMobileImg);
        carouselItem.append(optimizedMobilePic);
      }
    }

    // Banner Content Wrapper
    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    if (headingCell) {
      const heading = document.createElement('h1'); // Assuming h1 for main heading
      heading.classList.add('koi-carousel-heading', 'text-sm-left');
      moveInstrumentation(headingCell, heading);
      while (headingCell.firstChild) heading.append(headingCell.firstChild);
      bannerContentWrapper.append(heading);
    }

    // Description
    if (descriptionCell) {
      const description = document.createElement('div');
      description.classList.add('koi-carousel-description');
      moveInstrumentation(descriptionCell, description);
      while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
      bannerContentWrapper.append(description);
    }

    // CTA Link
    if (ctaLinkCell) {
      const ctaLinkFound = ctaLinkCell.querySelector('a');
      if (ctaLinkFound) {
        const ctaLink = document.createElement('a');
        ctaLink.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        ctaLink.href = ctaLinkFound.href;
        ctaLink.target = '_blank'; // Assuming target blank from original HTML
        ctaLink.alt = ctaLinkFound.textContent.trim(); // Use link text as alt
        moveInstrumentation(ctaLinkCell, ctaLink);
        while (ctaLinkCell.firstChild) ctaLink.append(ctaLinkCell.firstChild);
        const srOnlySpan = document.createElement('span');
        srOnlySpan.classList.add('cmp-link__screen-reader-only');
        srOnlySpan.textContent = 'opens in a new tab';
        ctaLink.append(srOnlySpan);
        bannerContentWrapper.append(ctaLink);
      }
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselDiv.append(carouselIndicators, carouselInner);

  // Next and Previous buttons
  const nextCarouselBtnDiv = document.createElement('div');
  nextCarouselBtnDiv.classList.add('next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev'); // Added data-slide attribute
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselDiv.querySelector('.carousel-item.active');
    let prevItem = activeItem.previousElementSibling;
    if (!prevItem) {
      prevItem = carouselInner.lastElementChild;
    }
    activeItem.classList.remove('active');
    prevItem.classList.add('active');

    const activeIndicator = carouselIndicators.querySelector('li.active');
    let prevIndicator = activeIndicator.previousElementSibling;
    if (!prevIndicator) {
      prevIndicator = carouselIndicators.lastElementChild;
    }
    activeIndicator.classList.remove('active');
    prevIndicator.classList.add('active');
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
  nextButton.setAttribute('data-slide', 'next'); // Added data-slide attribute
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselDiv.querySelector('.carousel-item.active');
    let nextItem = activeItem.nextElementSibling;
    if (!nextItem) {
      nextItem = carouselInner.firstElementChild;
    }
    activeItem.classList.remove('active');
    nextItem.classList.add('active');

    const activeIndicator = carouselIndicators.querySelector('li.active');
    let nextIndicator = activeIndicator.nextElementSibling;
    if (!nextIndicator) {
      nextIndicator = carouselIndicators.firstElementChild;
    }
    activeIndicator.classList.remove('active');
    nextIndicator.classList.add('active');
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
}
