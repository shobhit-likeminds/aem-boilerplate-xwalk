import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-carousel-section');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.id = 'carouselExampleSlidesOnly';
  carouselWrapper.classList.add('bannerCarousel', 'carousel', 'slide');
  carouselWrapper.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    const cells = [...row.children];

    // Content detection for cells
    const desktopImageCell = cells.find(cell => cell.querySelector('picture') && !cell.querySelector('.mobile-image'));
    const mobileImageCell = cells.find(cell => cell.querySelector('picture') && !cell.querySelector('.desktop-image'));
    const headingCell = cells.find(cell => cell.querySelector('h1, h2, h3, h4, h5, h6'));
    const descriptionCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && !cell.textContent.trim().startsWith('http'));
    const ctaLinkLabelCell = cells.find(cell => cell.textContent.trim().startsWith('http') || (cell.querySelector('a') && cell.textContent.trim().startsWith('http')));


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

    // Desktop Image
    if (desktopImageCell) {
      const desktopPicture = desktopImageCell.querySelector('picture');
      if (desktopPicture) {
        const desktopImg = desktopPicture.querySelector('img');
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
        const newDesktopImg = optimizedDesktopPic.querySelector('img');
        newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image');
        if (index === 0) {
          newDesktopImg.setAttribute('loading', 'eager');
          newDesktopImg.setAttribute('fetchpriority', 'high');
        } else {
          newDesktopImg.setAttribute('loading', 'lazy');
          newDesktopImg.setAttribute('fetchpriority', 'low');
        }
        moveInstrumentation(desktopPicture, optimizedDesktopPic.querySelector('img'));
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
          newMobileImg.setAttribute('loading', 'eager');
          newMobileImg.setAttribute('fetchpriority', 'high');
        } else {
          newMobileImg.setAttribute('loading', 'lazy');
          newMobileImg.setAttribute('fetchpriority', 'low');
        }
        moveInstrumentation(mobilePicture, optimizedMobilePic.querySelector('img'));
        carouselItem.append(optimizedMobilePic);
      }
    }

    // Banner Content Wrapper
    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    if (headingCell) {
      const heading = document.createElement('h1');
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
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const ctaAnchor = document.createElement('a');
        ctaAnchor.href = ctaLink.href;
        ctaAnchor.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        ctaAnchor.setAttribute('target', '_blank'); // Assuming target blank from original HTML
        ctaAnchor.setAttribute('alt', 'Shop Now'); // Assuming alt from original HTML

        // Set text content from ctaLinkLabelCell
        if (ctaLinkLabelCell && ctaLinkLabelCell.textContent.trim()) {
          ctaAnchor.textContent = ctaLinkLabelCell.textContent.trim();
        } else {
          ctaAnchor.textContent = ctaLink.textContent.trim();
        }

        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        ctaAnchor.append(screenReaderSpan);

        moveInstrumentation(ctaLinkCell, ctaAnchor);
        bannerContentWrapper.append(ctaAnchor);
      }
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselWrapper.append(carouselIndicators, carouselInner);

  // Next and previous buttons
  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#carouselExampleSlidesOnly';
  prevControl.setAttribute('role', 'button');
  prevControl.setAttribute('data-slide', 'prev'); // Added data-slide attribute
  prevControl.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
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
  prevControl.append(prevIcon, prevSrOnly);

  const nextControl = document.createElement('a');
  nextControl.classList.add('carousel-control-next');
  nextControl.href = '#carouselExampleSlidesOnly';
  nextControl.setAttribute('role', 'button');
  nextControl.setAttribute('data-slide', 'next'); // Added data-slide attribute
  nextControl.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
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
  nextControl.append(nextIcon, nextSrOnly);

  nextCarouselBtn.append(prevControl, nextControl);
  carouselWrapper.append(nextCarouselBtn);

  section.append(carouselWrapper);
  block.textContent = '';
  block.append(section);

  // Implement carousel functionality (simplified)
  let currentIndex = 0;
  const items = carouselInner.children;
  const indicators = carouselIndicators.children;

  const showSlide = (index) => {
    [...items].forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    [...indicators].forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  };

  [...indicators].forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
  });

  // Autoplay functionality (data-ride="carousel" implies autoplay)
  let intervalId;
  const startAutoplay = () => {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      showSlide(currentIndex);
    }, 5000); // 5 seconds interval
  };

  const stopAutoplay = () => {
    clearInterval(intervalId);
  };

  carouselWrapper.addEventListener('mouseenter', stopAutoplay);
  carouselWrapper.addEventListener('mouseleave', startAutoplay);

  // Initial display
  showSlide(currentIndex);
  startAutoplay();
}
