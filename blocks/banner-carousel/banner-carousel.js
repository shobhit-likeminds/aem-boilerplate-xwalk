import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];
  // The first row is the container label, which we don't need to render.
  // The rest are banner items.
  const bannerItems = allRows.slice(1);

  const carouselSection = document.createElement('section');
  carouselSection.classList.add('banner-itc-carousel-section');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.id = 'carouselExampleSlidesOnly';
  carouselWrapper.classList.add('banner-bannerCarousel', 'carousel', 'slide');
  carouselWrapper.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  bannerItems.forEach((row, index) => {
    const [
      desktopImageCell,
      mobileImageCell,
      desktopImageAltCell,
      mobileImageAltCell,
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
    moveInstrumentation(row, carouselItem);

    const desktopPicture = desktopImageCell.querySelector('picture');
    const desktopImg = desktopPicture ? desktopPicture.querySelector('img') : null;
    if (desktopImg) {
      const optimizedDesktopPic = createOptimizedPicture(
        desktopImg.src,
        desktopImageAltCell.textContent.trim(),
        index === 0, // Eager load first image
        [{ width: '2000' }],
      );
      optimizedDesktopPic.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image'); // Corrected class name
      optimizedDesktopPic.querySelector('img').alt = desktopImageAltCell.textContent.trim();
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      carouselItem.append(optimizedDesktopPic);
    }

    const mobilePicture = mobileImageCell.querySelector('picture');
    const mobileImg = mobilePicture ? mobilePicture.querySelector('img') : null;
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(
        mobileImg.src,
        mobileImageAltCell.textContent.trim(),
        index === 0, // Eager load first image
        [{ width: '750' }],
      );
      optimizedMobilePic.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'mobile-image'); // Corrected class name
      optimizedMobilePic.querySelector('img').alt = mobileImageAltCell.textContent.trim();
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      carouselItem.append(optimizedMobilePic);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-banner-content-wrapper', 'position-absolute');

    const heading = document.createElement('h1');
    heading.classList.add('banner-koi-carousel-heading', 'text-sm-left');
    moveInstrumentation(headingCell, heading);
    heading.textContent = headingCell.textContent.trim();
    contentWrapper.append(heading);

    const description = document.createElement('div');
    description.classList.add('banner-koi-carousel-description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    contentWrapper.append(description);

    const ctaLinkElement = ctaLinkCell.querySelector('a');
    if (ctaLinkElement) {
      const cta = document.createElement('a');
      cta.href = ctaLinkElement.href;
      cta.classList.add('banner-koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
      cta.alt = ctaLabelCell.textContent.trim();
      cta.target = '_blank'; // Assuming target blank from original HTML
      moveInstrumentation(ctaLinkCell, cta);
      cta.textContent = ctaLabelCell.textContent.trim();

      const screenReaderOnlySpan = document.createElement('span');
      screenReaderOnlySpan.classList.add('cmp-link__screen-reader-only');
      screenReaderOnlySpan.textContent = 'opens in a new tab';
      cta.append(screenReaderOnlySpan);
      contentWrapper.append(cta);
    }

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('banner-next-carousel-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#carouselExampleSlidesOnly';
  prevControl.setAttribute('role', 'button');
  prevControl.setAttribute('data-slide', 'prev'); // data-slide is inert, but kept for semantic consistency
  prevControl.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    let prevItem = activeItem.previousElementSibling;
    if (!prevItem || !prevItem.classList.contains('carousel-item')) {
      prevItem = carouselInner.lastElementChild;
    }
    if (prevItem) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      updateIndicators(prevItem);
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon'); // Corrected class name
  prevIcon.setAttribute('aria-hidden', 'true');
  prevControl.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevControl.append(prevSrOnly);
  nextCarouselBtn.append(prevControl);

  const nextControl = document.createElement('a');
  nextControl.classList.add('carousel-control-next');
  nextControl.href = '#carouselExampleSlidesOnly';
  nextControl.setAttribute('role', 'button');
  nextControl.setAttribute('data-slide', 'next'); // data-slide is inert, but kept for semantic consistency
  nextControl.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    let nextItem = activeItem.nextElementSibling;
    if (!nextItem || !nextItem.classList.contains('carousel-item')) {
      nextItem = carouselInner.firstElementChild;
    }
    if (nextItem) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      updateIndicators(nextItem);
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon'); // Corrected class name
  nextIcon.setAttribute('aria-hidden', 'true');
  nextControl.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextControl.append(nextSrOnly);
  nextCarouselBtn.append(nextControl);

  carouselWrapper.append(carouselIndicators, carouselInner, nextCarouselBtn);
  carouselSection.append(carouselWrapper);

  block.textContent = '';
  block.append(carouselSection);

  function updateIndicators(activeItem) {
    const activeIndex = [...carouselInner.children].indexOf(activeItem);
    carouselIndicators.querySelectorAll('li').forEach((li, i) => {
      if (i === activeIndex) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  // Auto-advance carousel
  let currentIndex = 0;
  const intervalTime = 5000; // 5 seconds
  setInterval(() => {
    const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
    let nextItem = currentActiveItem.nextElementSibling;
    if (!nextItem || !nextItem.classList.contains('carousel-item')) {
      nextItem = carouselInner.firstElementChild;
    }
    if (nextItem) {
      currentActiveItem.classList.remove('active');
      nextItem.classList.add('active');
      updateIndicators(nextItem);
    }
  }, intervalTime);

  // Handle indicator clicks
  carouselIndicators.querySelectorAll('li').forEach((indicatorEl, index) => {
    indicatorEl.addEventListener('click', (e) => {
      e.preventDefault();
      carouselInner.querySelectorAll('.carousel-item').forEach((item, itemIndex) => {
        if (itemIndex === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      updateIndicators(carouselInner.children[index]);
    });
  });
}
