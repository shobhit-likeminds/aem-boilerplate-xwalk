import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('banner-section');

  const bannerCarousel = document.createElement('div');
  bannerCarousel.id = 'bannerCarousel';
  bannerCarousel.classList.add('banner-carousel', 'carousel', 'slide');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    // Each row represents a banner item
    const [desktopImageCell, mobileImageCell, headingCell, descriptionCell, ctaCell] = [...row.children];

    // Create carousel indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#bannerCarousel');
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
    moveInstrumentation(row, carouselItem); // Move instrumentation from row to carouselItem

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '2000' }]);
      optimizedPic.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
      optimizedPic.querySelector('img').setAttribute('loading', index === 0 ? 'eager' : 'lazy');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      carouselItem.append(optimizedPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '750' }]);
      optimizedPic.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
      optimizedPic.querySelector('img').setAttribute('loading', index === 0 ? 'eager' : 'lazy');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      carouselItem.append(optimizedPic);
    }

    // Banner content wrapper
    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    const headingEl = document.createElement('h1');
    headingEl.classList.add('banner-heading', 'text-sm-left');
    const headingLink = headingCell.querySelector('a');
    if (headingLink) {
      moveInstrumentation(headingCell, headingEl);
      while (headingCell.firstChild) headingEl.append(headingCell.firstChild);
    } else {
      headingEl.innerHTML = headingCell.innerHTML;
    }
    const headingColor = headingEl.querySelector('span[data-color]');
    if (headingColor) {
      headingEl.style.color = headingColor.getAttribute('data-color');
      headingColor.remove();
    }
    bannerContentWrapper.append(headingEl);

    // Description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('banner-description');
    moveInstrumentation(descriptionCell, descriptionDiv);
    while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
    const descColor = descriptionDiv.querySelector('span[data-desc-color]');
    if (descColor) {
      const color = descColor.getAttribute('data-desc-color');
      descriptionDiv.querySelectorAll('*').forEach((el) => {
        if (el.tagName !== 'SPAN') { // Don't apply color to the span itself
          el.style.color = color;
        }
      });
      descColor.remove();
    }
    bannerContentWrapper.append(descriptionDiv);

    // CTA
    const ctaLink = ctaCell.querySelector('a');
    if (ctaLink) {
      const ctaButton = document.createElement('a');
      ctaButton.classList.add('banner-cta', 'btn', 'btn-primary', 'banner-start-now');
      ctaButton.href = ctaLink.href;
      ctaButton.textContent = ctaLink.textContent;
      if (ctaLink.target) {
        ctaButton.target = ctaLink.target;
      }
      if (ctaLink.getAttribute('data-bg-color')) {
        ctaButton.style.backgroundColor = ctaLink.getAttribute('data-bg-color');
      }
      moveInstrumentation(ctaCell, ctaButton);
      bannerContentWrapper.append(ctaButton);
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  // Carousel controls
  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#bannerCarousel';
  prevControl.setAttribute('role', 'button');
  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevControl.append(prevIcon, prevSrOnly);

  const nextControl = document.createElement('a');
  nextControl.classList.add('carousel-control-next');
  nextControl.href = '#bannerCarousel';
  nextControl.setAttribute('role', 'button');
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextControl.append(nextIcon, nextSrOnly);

  nextCarouselBtn.append(prevControl, nextControl);

  bannerCarousel.append(carouselIndicators, carouselInner, nextCarouselBtn);
  block.textContent = '';
  block.append(bannerCarousel);

  // Add event listeners for carousel functionality
  const items = carouselInner.querySelectorAll('.carousel-item');
  const indicators = carouselIndicators.querySelectorAll('li');
  let currentIndex = 0;

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

  prevControl.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  });

  nextControl.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      showSlide(currentIndex);
    });
  });
}
