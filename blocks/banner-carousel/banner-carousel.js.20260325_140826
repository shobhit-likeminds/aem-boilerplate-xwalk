import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];
  const bannerItems = allRows.slice(1); // Skip the first row which is the container label

  // Generate a unique ID for the carousel if not already present
  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;
  block.id = carouselId; // Set the ID on the block itself

  block.classList.add('carousel', 'slide');
  block.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  bannerItems.forEach((row, index) => {
    // Check if the row has the expected number of children (8 for banner items)
    if (row.children.length !== 8) {
      console.warn('Skipping malformed banner item row:', row);
      return;
    }

    const [
      desktopImageCell,
      mobileImageCell,
      desktopAltCell,
      mobileAltCell,
      headingCell,
      descriptionCell,
      ctaLinkCell,
      ctaTextCell,
    ] = row.children;

    // Create indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`); // Use dynamic ID
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    const desktopImg = desktopPicture ? desktopPicture.querySelector('img') : null;
    if (desktopImg) {
      const optimizedDesktopPic = createOptimizedPicture(
        desktopImg.src,
        desktopAltCell.textContent.trim() || desktopImg.alt,
        index === 0, // Eager load first image
        [{ media: '(min-width: 576px)', width: '2000' }], // Assuming a large desktop width
      );
      const newDesktopImg = optimizedDesktopPic.querySelector('img');
      newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
      newDesktopImg.setAttribute('loading', index === 0 ? 'eager' : 'lazy');
      newDesktopImg.setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      moveInstrumentation(desktopImg, newDesktopImg);
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    const mobileImg = mobilePicture ? mobilePicture.querySelector('img') : null;
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(
        mobileImg.src,
        mobileAltCell.textContent.trim() || mobileImg.alt,
        index === 0, // Eager load first image
        [{ width: '750' }], // Mobile width
      );
      const newMobileImg = optimizedMobilePic.querySelector('img');
      newMobileImg.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
      newMobileImg.setAttribute('loading', index === 0 ? 'eager' : 'lazy');
      newMobileImg.setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      moveInstrumentation(mobileImg, newMobileImg);
      carouselItem.append(optimizedMobilePic);
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

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
    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.classList.add('banner-koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
      newCtaLink.alt = ctaTextCell.textContent.trim();
      newCtaLink.target = '_blank'; // From original HTML
      moveInstrumentation(ctaLinkCell, newCtaLink);
      newCtaLink.textContent = ctaTextCell.textContent.trim(); // Use CTA Text for link content
      const srOnlySpan = document.createElement('span');
      srOnlySpan.classList.add('cmp-link__screen-reader-only');
      srOnlySpan.textContent = 'opens in a new tab';
      newCtaLink.append(srOnlySpan);
      contentWrapper.append(newCtaLink);
    }

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  // Next and previous buttons wrapper
  const navButtonsWrapper = document.createElement('div');
  navButtonsWrapper.classList.add('banner-next-carousel-btn');

  // Previous button
  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`; // Use dynamic ID
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev'); // Added missing data-slide attribute
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    let prevItem = activeItem.previousElementSibling;
    if (!prevItem || !prevItem.classList.contains('carousel-item')) {
      prevItem = carouselInner.lastElementChild;
    }
    if (prevItem) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('.active');
      const prevIndicator = carouselIndicators.children[Array.from(carouselInner.children).indexOf(prevItem)];
      if (activeIndicator) activeIndicator.classList.remove('active');
      if (prevIndicator) prevIndicator.classList.add('active');
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);
  navButtonsWrapper.append(prevButton);

  // Next button
  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = `#${carouselId}`; // Use dynamic ID
  nextButton.setAttribute('role', 'button');
  nextButton.setAttribute('data-slide', 'next'); // Added missing data-slide attribute
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    let nextItem = activeItem.nextElementSibling;
    if (!nextItem || !nextItem.classList.contains('carousel-item')) {
      nextItem = carouselInner.firstElementChild;
    }
    if (nextItem) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('.active');
      const nextIndicator = carouselIndicators.children[Array.from(carouselInner.children).indexOf(nextItem)];
      if (activeIndicator) activeIndicator.classList.remove('active');
      if (nextIndicator) nextIndicator.classList.add('active');
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);
  navButtonsWrapper.append(nextButton);

  block.textContent = ''; // Clear the block
  block.append(carouselIndicators, carouselInner, navButtonsWrapper);
}
