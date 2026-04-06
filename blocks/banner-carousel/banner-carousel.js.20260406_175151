import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselSection = document.createElement('section');
  carouselSection.classList.add('itc-carousel-section');

  const carouselContainer = document.createElement('div');
  carouselContainer.id = 'carouselExampleSlidesOnly';
  carouselContainer.classList.add('bannerCarousel', 'carousel', 'slide');
  carouselContainer.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
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
    moveInstrumentation(row, carouselItem);

    const cells = [...row.children];
    // Based on BlockJson:
    // cell[0]: desktop-image
    // cell[1]: mobile-image
    // cell[2]: heading
    // cell[3]: description
    // cell[4]: cta-link
    const desktopImageCell = cells[0];
    const mobileImageCell = cells[1];
    const headingCell = cells[2];
    const descriptionCell = cells[3];
    const ctaLinkCell = cells[4];

    if (desktopImageCell) {
      const desktopPic = desktopImageCell.querySelector('picture');
      const desktopImg = desktopPic ? desktopPic.querySelector('img') : null;
      if (desktopImg) {
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
        optimizedDesktopPic.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image');
        moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
        carouselItem.append(optimizedDesktopPic);
      }
    }

    if (mobileImageCell) {
      const mobilePic = mobileImageCell.querySelector('picture');
      const mobileImg = mobilePic ? mobilePic.querySelector('img') : null;
      if (mobileImg) {
        const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '768' }]);
        optimizedMobilePic.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'mobile-image');
        moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
        carouselItem.append(optimizedMobilePic);
      }
    }

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    if (headingCell) {
      const h1 = document.createElement('h1');
      h1.classList.add('koi-carousel-heading', 'text-sm-left');
      moveInstrumentation(headingCell, h1);
      while (headingCell.firstChild) h1.append(headingCell.firstChild);
      bannerContentWrapper.append(h1);
    }

    if (descriptionCell) {
      const descDiv = document.createElement('div');
      descDiv.classList.add('koi-carousel-description');
      moveInstrumentation(descriptionCell, descDiv);
      while (descriptionCell.firstChild) descDiv.append(descriptionCell.firstChild);
      bannerContentWrapper.append(descDiv);
    }

    if (ctaLinkCell) {
      const foundLink = ctaLinkCell.querySelector('a');
      if (foundLink) {
        const a = document.createElement('a');
        a.href = foundLink.href;
        a.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        a.target = '_blank';
        a.alt = foundLink.textContent.trim(); // Use link text as alt for button
        moveInstrumentation(ctaLinkCell, a);
        while (ctaLinkCell.firstChild) a.append(ctaLinkCell.firstChild);

        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        a.append(screenReaderSpan);
        bannerContentWrapper.append(a);
      }
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselContainer.append(carouselIndicators, carouselInner);

  // Next and previous buttons
  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#carouselExampleSlidesOnly';
  prevControl.setAttribute('role', 'button');
  // Add event listener for previous button
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
  prevControl.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevControl.append(prevSrOnly);

  const nextControl = document.createElement('a');
  nextControl.classList.add('carousel-control-next');
  nextControl.href = '#carouselExampleSlidesOnly';
  nextControl.setAttribute('role', 'button');
  // Add event listener for next button
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
  nextControl.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextControl.append(nextSrOnly);

  nextCarouselBtn.append(prevControl, nextControl);
  carouselContainer.append(nextCarouselBtn);

  carouselSection.append(carouselContainer);

  block.textContent = '';
  block.append(carouselSection);
}
