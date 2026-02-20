import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const bannerCarousel = document.createElement('div');
  bannerCarousel.id = 'bannerCarousel';
  bannerCarousel.classList.add('banner-carousel', 'carousel', 'slide');
  bannerCarousel.setAttribute('data-ride', 'carousel');
  moveInstrumentation(block, bannerCarousel);

  const bannerIndicators = document.createElement('ol');
  bannerIndicators.classList.add('banner-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    const cells = [...row.children];

    // Banner Indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#bannerCarousel');
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    bannerIndicators.append(indicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    // Extract content from cells
    const desktopImageCell = cells[0];
    const mobileImageCell = cells[1];
    const headingCell = cells[2];
    const descriptionCell = cells[3];
    const ctaTextCell = cells[4];
    const ctaLinkCell = cells[5];

    // Desktop Image
    const desktopImg = desktopImageCell.querySelector('img');
    if (desktopImg) {
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ media: '(min-width: 576px)', width: '2000' }, { width: '750' }]);
      optimizedDesktopPic.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
      optimizedDesktopPic.querySelector('img').setAttribute('loading', index === 0 ? 'eager' : 'lazy');
      optimizedDesktopPic.querySelector('img').setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobileImg = mobileImageCell.querySelector('img');
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      optimizedMobilePic.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
      optimizedMobilePic.querySelector('img').setAttribute('loading', index === 0 ? 'eager' : 'lazy');
      optimizedMobilePic.querySelector('img').setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      carouselItem.append(optimizedMobilePic);
    }

    // Banner Content Wrapper
    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    const heading = document.createElement('h1');
    heading.classList.add('banner-heading', 'text-sm-left');
    heading.innerHTML = headingCell.innerHTML;
    // Transfer data-color and style attribute if present in the original heading
    const originalHeading = headingCell.querySelector('h1') || headingCell.querySelector('div'); // Assuming original heading might be in h1 or div
    if (originalHeading) {
      if (originalHeading.hasAttribute('data-color')) {
        heading.setAttribute('data-color', originalHeading.getAttribute('data-color'));
      }
      if (originalHeading.hasAttribute('style')) {
        heading.setAttribute('style', originalHeading.getAttribute('style'));
      }
    }
    moveInstrumentation(headingCell, heading);
    bannerContentWrapper.append(heading);

    // Description
    const description = document.createElement('div');
    description.classList.add('banner-description');
    description.innerHTML = descriptionCell.innerHTML;
    // Transfer data-desc-color if present in the original description
    const originalDescription = descriptionCell.querySelector('div');
    if (originalDescription && originalDescription.hasAttribute('data-desc-color')) {
      description.setAttribute('data-desc-color', originalDescription.getAttribute('data-desc-color'));
    }
    moveInstrumentation(descriptionCell, description);
    bannerContentWrapper.append(description);

    // CTA Link
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('banner-cta', 'btn', 'btn-primary', 'banner-start-now');
    ctaLink.textContent = ctaTextCell.textContent.trim();
    const originalCta = ctaLinkCell.querySelector('a');
    if (originalCta) {
      ctaLink.href = originalCta.href;
      ctaLink.setAttribute('alt', originalCta.getAttribute('alt') || ctaLink.textContent);
      if (originalCta.hasAttribute('target')) {
        ctaLink.setAttribute('target', originalCta.getAttribute('target'));
      }
      if (originalCta.hasAttribute('data-cmp-clickable')) {
        ctaLink.setAttribute('data-cmp-clickable', originalCta.getAttribute('data-cmp-clickable'));
      }
      if (originalCta.hasAttribute('data-cmp-data-layer')) {
        ctaLink.setAttribute('data-cmp-data-layer', originalCta.getAttribute('data-cmp-data-layer'));
      }
      if (originalCta.hasAttribute('data-bg-color')) {
        ctaLink.setAttribute('data-bg-color', originalCta.getAttribute('data-bg-color'));
      }
      if (originalCta.hasAttribute('style')) {
        ctaLink.setAttribute('style', originalCta.getAttribute('style'));
      }
    } else {
      // Fallback if no <a> tag in cell, use plain text link
      ctaLink.href = ctaLinkCell.textContent.trim(); // Assuming ctaLinkCell contains the URL directly
      ctaLink.setAttribute('alt', ctaLink.textContent);
    }
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab'; // Assuming default for external links
    if (ctaLink.target === '_blank') {
      ctaLink.append(screenReaderSpan);
    }
    moveInstrumentation(ctaLinkCell, ctaLink);
    bannerContentWrapper.append(ctaLink);

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  // Next/Prev Buttons
  const nextBannerBtn = document.createElement('div');
  nextBannerBtn.classList.add('next-banner-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = '#bannerCarousel';
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
  nextBannerBtn.append(prevButton);

  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = '#bannerCarousel';
  nextButton.setAttribute('role', 'button');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
  nextBannerBtn.append(nextButton);

  bannerCarousel.append(bannerIndicators);
  bannerCarousel.append(carouselInner);
  bannerCarousel.append(nextBannerBtn);
  bannerSection.append(bannerCarousel);

  block.textContent = '';
  block.append(bannerSection);
}
