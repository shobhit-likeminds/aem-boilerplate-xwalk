import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = 'carouselExampleSlidesOnly'; // Fixed ID as per original HTML

  const wrapper = document.createElement('div');
  wrapper.id = carouselId;
  wrapper.classList.add('banner-bannerCarousel', 'banner-carousel', 'banner-slide');
  // The original HTML has data-ride="carousel" on the wrapper, but since we are
  // implementing the carousel logic manually with JS, this attribute is not strictly needed
  // for functionality, but could be added for semantic consistency if desired.
  // wrapper.setAttribute('data-ride', 'carousel');

  const indicators = document.createElement('ol');
  indicators.classList.add('banner-carousel-indicators');
  wrapper.append(indicators);

  const inner = document.createElement('div');
  inner.classList.add('banner-carousel-inner');
  wrapper.append(inner);

  [...block.children].forEach((row, index) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('banner-carousel-item');
    if (index === 0) {
      item.classList.add('banner-active');
    }

    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('banner-active');
    }
    indicators.append(indicator);

    // CHECK 1: Structure Alignment - Correctly destructuring 6 cells as per BlockJson model
    const [desktopImageCell, mobileImageCell, headingCell, subheadingCell, descriptionCell, ctaLinkCell] = [...row.children];

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '1200' }]);
      optimizedDesktopPic.querySelector('img').classList.add('banner-d-none', 'banner-d-sm-block', 'banner-w-100', 'banner-desktop-image');
      moveInstrumentation(desktopPicture, optimizedDesktopPic.querySelector('img'));
      item.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      optimizedMobilePic.querySelector('img').classList.add('banner-d-block', 'banner-d-sm-none', 'banner-w-100', 'banner-mobile-image');
      moveInstrumentation(mobilePicture, optimizedMobilePic.querySelector('img'));
      item.append(optimizedMobilePic);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-banner-content-wrapper', 'banner-position-absolute');

    // Heading
    const heading = document.createElement('h1');
    heading.classList.add('banner-koi-carousel-heading', 'banner-text-sm-left');
    moveInstrumentation(headingCell, heading);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    contentWrapper.append(heading);

    // Description wrapper
    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('banner-koi-carousel-description');
    contentWrapper.append(descriptionWrapper);

    // Subheading (inside description wrapper)
    const subheading = document.createElement('h3');
    moveInstrumentation(subheadingCell, subheading);
    while (subheadingCell.firstChild) subheading.append(subheadingCell.firstChild);
    descriptionWrapper.append(subheading);

    // Description (inside description wrapper)
    const description = document.createElement('div');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    descriptionWrapper.append(description);

    // CTA Link
    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const newCta = document.createElement('a');
      newCta.href = ctaLink.href;
      newCta.target = '_blank'; // As per original HTML
      newCta.classList.add('banner-koi-carousel-cta', 'banner-btn', 'banner-btn-primary', 'banner-btn-start-now');
      moveInstrumentation(ctaLink, newCta);
      while (ctaLink.firstChild) newCta.append(ctaLink.firstChild);
      contentWrapper.append(newCta);
    }

    item.append(contentWrapper);
    inner.append(item);
  });

  const nextPrevButtons = document.createElement('div');
  nextPrevButtons.classList.add('banner-next-carousel-btn');

  const prevLink = document.createElement('a');
  prevLink.classList.add('banner-carousel-control-prev');
  prevLink.href = `#${carouselId}`;
  prevLink.setAttribute('role', 'button');
  prevLink.setAttribute('data-slide', 'prev'); // Added data-slide attribute as per original HTML
  // CHECK 2: Interactivity - Added/Corrected event listener for previous button
  prevLink.addEventListener('click', (e) => {
    e.preventDefault();
    const currentActiveItem = inner.querySelector('.banner-carousel-item.banner-active');
    const currentActiveIndicator = indicators.querySelector('li.banner-active');

    if (currentActiveItem && currentActiveIndicator) {
      const prevItem = currentActiveItem.previousElementSibling || inner.lastElementChild;
      const prevIndicator = currentActiveIndicator.previousElementSibling || indicators.lastElementChild;

      currentActiveItem.classList.remove('banner-active');
      currentActiveIndicator.classList.remove('banner-active');

      prevItem.classList.add('banner-active');
      prevIndicator.classList.add('banner-active');
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('banner-carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevLink.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('banner-sr-only');
  prevSrOnly.textContent = 'Previous';
  prevLink.append(prevSrOnly);
  nextPrevButtons.append(prevLink);

  const nextLink = document.createElement('a');
  nextLink.classList.add('banner-carousel-control-next');
  nextLink.href = `#${carouselId}`;
  nextLink.setAttribute('role', 'button');
  nextLink.setAttribute('data-slide', 'next'); // Added data-slide attribute as per original HTML
  // CHECK 2: Interactivity - Added/Corrected event listener for next button
  nextLink.addEventListener('click', (e) => {
    e.preventDefault();
    const currentActiveItem = inner.querySelector('.banner-carousel-item.banner-active');
    const currentActiveIndicator = indicators.querySelector('li.banner-active');

    if (currentActiveItem && currentActiveIndicator) {
      const nextItem = currentActiveItem.nextElementSibling || inner.firstElementChild;
      const nextIndicator = currentActiveIndicator.nextElementSibling || indicators.firstElementChild;

      currentActiveItem.classList.remove('banner-active');
      currentActiveIndicator.classList.remove('banner-active');

      nextItem.classList.add('banner-active');
      nextIndicator.classList.add('banner-active');
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('banner-carousel-next-icon'); // Corrected class name as per original HTML
  nextIcon.setAttribute('aria-hidden', 'true');
  nextLink.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('banner-sr-only');
  nextSrOnly.textContent = 'Next';
  nextLink.append(nextSrOnly);
  nextPrevButtons.append(nextLink);

  wrapper.append(nextPrevButtons);

  // CHECK 2: Interactivity - Event listener for indicators
  indicators.querySelectorAll('li').forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const currentActiveItem = inner.querySelector('.banner-carousel-item.banner-active');
      const currentActiveIndicator = indicators.querySelector('li.banner-active');
      const targetItem = inner.children[index];

      if (currentActiveItem) currentActiveItem.classList.remove('banner-active');
      if (currentActiveIndicator) currentActiveIndicator.classList.remove('banner-active');

      targetItem.classList.add('banner-active');
      indicator.classList.add('banner-active');
    });
  });

  block.textContent = '';
  block.classList.add('banner-itc-carousel-section'); // Add section class
  block.append(wrapper);
}
