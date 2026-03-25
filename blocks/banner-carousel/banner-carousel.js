import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-carousel-section');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.id = 'carouselExampleSlidesOnly';
  carouselWrapper.classList.add('bannerCarousel', 'carousel', 'slide');
  carouselWrapper.setAttribute('data-ride', 'carousel');

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const nextPrevBtnWrapper = document.createElement('div');
  nextPrevBtnWrapper.classList.add('next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = '#carouselExampleSlidesOnly';
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev'); // Added data-slide attribute
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
  nextButton.setAttribute('data-slide', 'next'); // Added data-slide attribute
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  nextPrevBtnWrapper.append(prevButton, nextButton);

  const slideRows = [...block.children].slice(1); // Skip the first row which is just a label for slides container

  slideRows.forEach((row, index) => {
    const [desktopImageCell, mobileImageCell, headingCell, descriptionCell, ctaLinkCell] = row.children;

    // Indicators
    const liIndicator = document.createElement('li');
    liIndicator.setAttribute('data-target', '#carouselExampleSlidesOnly');
    liIndicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      liIndicator.classList.add('active');
    }
    olIndicators.append(liIndicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

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

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    const heading = document.createElement('h1');
    heading.classList.add('koi-carousel-heading', 'text-sm-left');
    moveInstrumentation(headingCell, heading);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);

    const description = document.createElement('div');
    description.classList.add('koi-carousel-description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);

    const ctaLink = document.createElement('a');
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href;
      ctaLink.textContent = foundLink.textContent;
      ctaLink.alt = foundLink.textContent; // Assuming alt is same as text content
      ctaLink.target = '_blank'; // Original HTML has target="_blank"
    }
    ctaLink.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
    moveInstrumentation(ctaLinkCell, ctaLink);
    // The original HTML has a screen reader span inside the link, which is not in EDS.
    // We create it here for consistency if the link content is just text.
    if (ctaLink.textContent && ctaLink.textContent.trim() !== '') {
      const srOnlySpan = document.createElement('span');
      srOnlySpan.classList.add('cmp-link__screen-reader-only');
      srOnlySpan.textContent = 'opens in a new tab';
      ctaLink.append(srOnlySpan);
    }

    bannerContentWrapper.append(heading, description, ctaLink);
    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselWrapper.append(olIndicators, carouselInner, nextPrevBtnWrapper);
  section.append(carouselWrapper);

  block.textContent = '';
  block.append(section);

  // The original HTML uses Bootstrap-like data attributes for carousel navigation.
  // No custom JavaScript event listeners are needed for prev/next buttons or indicators
  // if the underlying CSS/JS framework (like Bootstrap) is handling them based on data-attributes.
  // The `data-ride="carousel"` attribute on the main carousel wrapper typically initializes this behavior.
  // The `data-target` and `data-slide-to` on indicators, and `data-slide="prev/next"` on buttons
  // are sufficient for standard carousel functionality.
}
