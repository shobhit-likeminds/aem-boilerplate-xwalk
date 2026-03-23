import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;
  block.id = carouselId;
  block.classList.add('banner-carousel', 'carousel', 'slide'); // Corrected block class name

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('banner-carousel-indicators'); // Corrected class name

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('banner-carousel-inner'); // Corrected class name

  [...block.children].forEach((row, index) => {
    moveInstrumentation(row, carouselInner);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('banner-carousel-item'); // Corrected class name
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const currentActiveItem = block.querySelector('.banner-carousel-item.active');
      const currentActiveIndicator = block.querySelector('.banner-carousel-indicators .active');
      const targetIndex = parseInt(e.target.getAttribute('data-slide-to'), 10);
      const targetItem = carouselInner.children[targetIndex];

      if (currentActiveItem) {
        currentActiveItem.classList.remove('active');
      }
      if (currentActiveIndicator) {
        currentActiveIndicator.classList.remove('active');
      }
      if (targetItem) {
        targetItem.classList.add('active');
        indicator.classList.add('active');
      }
    });
    olIndicators.append(indicator);

    const [desktopImageCell, mobileImageCell, headingCell, descriptionCell, ctaLinkCell] = [...row.children];

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      optimizedDesktopPic.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-carousel-desktop-image'); // Corrected class name
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      optimizedMobilePic.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-carousel-mobile-image'); // Corrected class name
      carouselItem.append(optimizedMobilePic);
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-carousel-content-wrapper', 'position-absolute'); // Corrected class name

    // Heading
    const headingEl = document.createElement('h1');
    moveInstrumentation(headingCell, headingEl);
    headingEl.classList.add('banner-carousel-heading', 'text-sm-left'); // Corrected class name
    while (headingCell.firstChild) headingEl.append(headingCell.firstChild);
    contentWrapper.append(headingEl);

    // Description
    const descriptionEl = document.createElement('div');
    moveInstrumentation(descriptionCell, descriptionEl);
    descriptionEl.classList.add('banner-carousel-description'); // Corrected class name
    while (descriptionCell.firstChild) descriptionEl.append(descriptionCell.firstChild);
    contentWrapper.append(descriptionEl);

    // CTA Link
    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const ctaButton = document.createElement('a');
      moveInstrumentation(ctaLinkCell, ctaButton);
      ctaButton.classList.add('banner-carousel-cta', 'btn', 'btn-primary', 'btn-start-now'); // Corrected class name
      ctaButton.href = ctaLink.href;
      if (ctaLink.target) {
        ctaButton.target = ctaLink.target;
        const srOnlySpan = document.createElement('span');
        srOnlySpan.classList.add('cmp-link__screen-reader-only');
        srOnlySpan.textContent = 'opens in a new tab';
        ctaButton.append(srOnlySpan);
      }
      while (ctaLinkCell.firstChild) ctaButton.append(ctaLinkCell.firstChild);
      contentWrapper.append(ctaButton);
    }

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  block.textContent = '';
  block.append(olIndicators, carouselInner);

  // Next and Previous buttons
  const navButtonsWrapper = document.createElement('div');
  navButtonsWrapper.classList.add('banner-carousel-nav-buttons-wrapper'); // Corrected class name

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = block.querySelector('.banner-carousel-item.active'); // Corrected class name
    let prevItem = activeItem.previousElementSibling;
    if (!prevItem) {
      prevItem = carouselInner.lastElementChild;
    }
    if (prevItem) {
      activeItem.classList.remove('active');
      block.querySelector('.banner-carousel-indicators .active').classList.remove('active'); // Corrected class name
      prevItem.classList.add('active');
      olIndicators.children[Array.from(carouselInner.children).indexOf(prevItem)].classList.add('active');
    }
  });
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
  navButtonsWrapper.append(prevButton);

  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = block.querySelector('.banner-carousel-item.active'); // Corrected class name
    let nextItem = activeItem.nextElementSibling;
    if (!nextItem) {
      nextItem = carouselInner.firstElementChild;
    }
    if (nextItem) {
      activeItem.classList.remove('active');
      block.querySelector('.banner-carousel-indicators .active').classList.remove('active'); // Corrected class name
      nextItem.classList.add('active');
      olIndicators.children[Array.from(carouselInner.children).indexOf(nextItem)].classList.add('active');
    }
  });
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
  navButtonsWrapper.append(nextButton);

  block.append(navButtonsWrapper);

  // Auto-slide functionality
  let slideInterval;
  const startCarousel = () => {
    slideInterval = setInterval(() => {
      const activeItem = block.querySelector('.banner-carousel-item.active'); // Corrected class name
      let nextItem = activeItem.nextElementSibling;
      if (!nextItem) {
        nextItem = carouselInner.firstElementChild;
      }
      if (nextItem) {
        activeItem.classList.remove('active');
        block.querySelector('.banner-carousel-indicators .active').classList.remove('active'); // Corrected class name
        nextItem.classList.add('active');
        olIndicators.children[Array.from(carouselInner.children).indexOf(nextItem)].classList.add('active');
      }
    }, 5000); // 5 seconds
  };

  const stopCarousel = () => {
    clearInterval(slideInterval);
  };

  block.addEventListener('mouseenter', stopCarousel);
  block.addEventListener('mouseleave', startCarousel);
  block.addEventListener('focusin', stopCarousel);
  block.addEventListener('focusout', startCarousel);

  startCarousel();
}
