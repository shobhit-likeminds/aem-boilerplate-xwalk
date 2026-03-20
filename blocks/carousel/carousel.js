import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;
  block.id = carouselId;
  block.classList.add('carousel-slide');

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = `#${carouselId}`;
  prevControl.setAttribute('role', 'button');
  prevControl.setAttribute('data-slide', 'prev'); // Added data-slide attribute
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
  nextControl.setAttribute('data-slide', 'next'); // Added data-slide attribute
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextControl.append(nextIcon, nextSrOnly);

  nextCarouselBtn.append(prevControl, nextControl);

  [...block.children].forEach((row, index) => {
    // Each row is a carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('carousel-item-active');
    }
    moveInstrumentation(row, carouselItem);

    // Create indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('carousel-indicator-active');
    }
    olIndicators.append(indicator);

    const cells = [...row.children];

    // desktopImage (cell 0)
    const desktopImageCell = cells[0];
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      optimizedDesktopPic.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'carousel-desktop-image');
      carouselItem.append(optimizedDesktopPic);
    }

    // mobileImage (cell 1)
    const mobileImageCell = cells[1];
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      optimizedMobilePic.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'carousel-mobile-image');
      carouselItem.append(optimizedMobilePic);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('carousel-content-wrapper', 'position-absolute');

    // heading (cell 2)
    const headingCell = cells[2];
    const heading = headingCell.querySelector('h1') || document.createElement('h1');
    if (!heading.parentElement) { // If it's a new H1, append content
      moveInstrumentation(headingCell, heading);
      while (headingCell.firstChild) heading.append(headingCell.firstChild);
    }
    heading.classList.add('carousel-heading', 'text-sm-left');
    contentWrapper.append(heading);

    // description (cell 3)
    const descriptionCell = cells[3];
    const description = document.createElement('div');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    description.classList.add('carousel-description');
    contentWrapper.append(description);

    // ctaLink (cell 4) and ctaText (cell 5)
    const ctaLinkCell = cells[4];
    const ctaTextCell = cells[5];

    const ctaLinkFound = ctaLinkCell.querySelector('a');
    const cta = document.createElement('a');
    if (ctaLinkFound) {
      cta.href = ctaLinkFound.href;
      cta.target = '_blank';
      cta.alt = ctaLinkFound.alt || ctaTextCell.textContent.trim();
    }
    moveInstrumentation(ctaLinkCell, cta);
    cta.classList.add('carousel-cta', 'btn', 'btn-primary', 'carousel-start-now');
    cta.textContent = ctaTextCell.textContent.trim();
    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    cta.append(srOnlySpan);
    contentWrapper.append(cta);

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  block.textContent = '';
  block.append(olIndicators, carouselInner, nextCarouselBtn);

  let currentIndex = 0;
  const items = [...carouselInner.children];
  const indicators = [...olIndicators.children];

  const showSlide = (index) => {
    items.forEach((item, i) => {
      item.classList.toggle('carousel-item-active', i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('carousel-indicator-active', i === index);
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

  prevControl.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
  });

  nextControl.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      showSlide(currentIndex);
    });
  });
}
