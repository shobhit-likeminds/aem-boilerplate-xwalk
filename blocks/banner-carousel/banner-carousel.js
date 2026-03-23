import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('banner-itc-carousel-section');

  const carouselId = 'carouselExampleSlidesOnly';
  const carousel = document.createElement('div');
  carousel.id = carouselId;
  carousel.classList.add('banner-bannerCarousel', 'carousel', 'slide');

  const ol = document.createElement('ol');
  ol.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    // bannerCarouselItem (6 cells: desktopImage, mobileImage, heading, description, ctaLink, ctaLabel)
    const [
      desktopImageCell,
      mobileImageCell,
      headingCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = row.children;

    // Indicators
    const li = document.createElement('li');
    li.setAttribute('data-target', `#${carouselId}`);
    li.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      li.classList.add('active');
    }
    ol.append(li);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
      const newDesktopImg = optimizedDesktopPic.querySelector('img');
      moveInstrumentation(desktopImg, newDesktopImg);
      newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
      if (index === 0) {
        newDesktopImg.setAttribute('loading', 'eager');
        newDesktopImg.setAttribute('fetchpriority', 'high');
      } else {
        newDesktopImg.setAttribute('loading', 'lazy');
        newDesktopImg.setAttribute('fetchpriority', 'low');
      }
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      const newMobileImg = optimizedMobilePic.querySelector('img');
      moveInstrumentation(mobileImg, newMobileImg);
      newMobileImg.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
      if (index === 0) {
        newMobileImg.setAttribute('loading', 'eager');
        newMobileImg.setAttribute('fetchpriority', 'high');
      } else {
        newMobileImg.setAttribute('loading', 'lazy');
        newMobileImg.setAttribute('fetchpriority', 'low');
      }
      carouselItem.append(optimizedMobilePic);
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-banner-content-wrapper', 'position-absolute');

    // Heading
    const heading = document.createElement('h1');
    heading.classList.add('banner-koi-carousel-heading', 'text-sm-left');
    const headingColor = headingCell.querySelector('[data-color]');
    if (headingColor) {
      heading.style.color = headingColor.getAttribute('data-color');
    }
    moveInstrumentation(headingCell, heading);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    contentWrapper.append(heading);

    // Description
    const description = document.createElement('div');
    description.classList.add('banner-koi-carousel-description');
    const descriptionColor = descriptionCell.querySelector('[data-desc-color]');
    if (descriptionColor) {
      description.style.color = descriptionColor.getAttribute('data-desc-color');
    }
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    contentWrapper.append(description);

    // CTA Link
    const ctaLinkEl = ctaLinkCell.querySelector('a');
    const cta = document.createElement('a');
    cta.classList.add('banner-koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
    if (ctaLinkEl) {
      cta.href = ctaLinkEl.href;
      cta.target = '_blank';
      cta.setAttribute('alt', ctaLinkEl.textContent.trim());
      const bgColor = ctaLinkEl.getAttribute('data-bg-color');
      if (bgColor) {
        cta.style.backgroundColor = bgColor;
      }
    }
    moveInstrumentation(ctaLinkCell, cta);
    cta.textContent = ctaLabelCell.textContent.trim();
    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    cta.append(srOnlySpan);
    contentWrapper.append(cta);

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  carousel.append(ol, carouselInner);

  // Next and previous buttons
  const navButtonsWrapper = document.createElement('div');
  navButtonsWrapper.classList.add('banner-next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev'); // Added missing data-slide attribute
  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);

  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.setAttribute('data-slide', 'next'); // Added missing data-slide attribute
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  navButtonsWrapper.append(prevButton, nextButton);
  carousel.append(navButtonsWrapper);

  block.textContent = '';
  block.append(carousel);

  let slideInterval;
  const startCarousel = () => {
    let activeIndex = 0;
    const items = [...carouselInner.children];
    const indicators = [...ol.children];

    const showSlide = (index) => {
      items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    };

    const nextSlide = () => {
      activeIndex = (activeIndex + 1) % items.length;
      showSlide(activeIndex);
    };

    const prevSlide = () => {
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      showSlide(activeIndex);
    };

    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      resetInterval();
    });

    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      resetInterval();
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        activeIndex = index;
        showSlide(activeIndex);
        resetInterval();
      });
    });

    const resetInterval = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000); // 5 seconds
    };

    resetInterval();
  };

  startCarousel();
}
