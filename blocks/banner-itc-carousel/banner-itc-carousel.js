import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = `carousel-${Math.random().toString(36).substring(2, 15)}`;
  block.id = carouselId;

  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('banner-itc-carousel', 'carousel', 'slide');

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('banner-itc-carousel-indicators', 'carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('banner-itc-carousel-inner', 'carousel-inner');

  [...block.children].forEach((row, index) => {
    moveInstrumentation(row, carouselInner);

    const liIndicator = document.createElement('li');
    liIndicator.setAttribute('data-target', `#${carouselId}`);
    liIndicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      liIndicator.classList.add('active');
    }
    olIndicators.append(liIndicator);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('banner-itc-carousel-item', 'carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const [
      desktopImageCell,
      mobileImageCell,
      headingCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = row.children;

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '1200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-itc-carousel-desktop-image');
      carouselItem.append(optimizedPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-itc-carousel-mobile-image');
      carouselItem.append(optimizedPic);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-itc-carousel-content-wrapper', 'position-absolute');

    // Heading
    const heading = document.createElement('h1');
    heading.classList.add('banner-itc-carousel-heading', 'text-sm-left');
    moveInstrumentation(headingCell, heading);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    contentWrapper.append(heading);

    // Description
    const description = document.createElement('div');
    description.classList.add('banner-itc-carousel-description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    contentWrapper.append(description);

    // CTA Link
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('banner-itc-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
    const authoredLink = ctaLinkCell.querySelector('a');
    if (authoredLink) {
      ctaLink.href = authoredLink.href;
      if (authoredLink.target) ctaLink.target = authoredLink.target;
      if (authoredLink.alt) ctaLink.alt = authoredLink.alt;
      // Append screen reader span if it exists in the original link
      const screenReaderSpan = authoredLink.querySelector('.cmp-link__screen-reader-only');
      if (screenReaderSpan) {
        ctaLink.append(screenReaderSpan.cloneNode(true));
      }
    }
    moveInstrumentation(ctaLabelCell, ctaLink);
    while (ctaLabelCell.firstChild) ctaLink.prepend(ctaLabelCell.firstChild); // Prepend label
    contentWrapper.append(ctaLink);

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselWrapper.append(olIndicators);
  carouselWrapper.append(carouselInner);

  // Next and Previous buttons
  const nextBtnWrapper = document.createElement('div');
  nextBtnWrapper.classList.add('banner-itc-carousel-next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('banner-itc-carousel-control-prev', 'carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentActive = carouselInner.querySelector('.carousel-item.active');
    const prev = currentActive.previousElementSibling || carouselInner.lastElementChild;
    if (prev) {
      currentActive.classList.remove('active');
      prev.classList.add('active');
      const currentIndicator = olIndicators.querySelector('.active');
      const prevIndicator = currentIndicator.previousElementSibling || olIndicators.lastElementChild;
      currentIndicator.classList.remove('active');
      prevIndicator.classList.add('active');
    }
  });
  const prevSpanIcon = document.createElement('span');
  prevSpanIcon.classList.add('banner-itc-carousel-control-prev-icon', 'carousel-control-prev-icon');
  prevSpanIcon.setAttribute('aria-hidden', 'true');
  const prevSpanSr = document.createElement('span');
  prevSpanSr.classList.add('sr-only');
  prevSpanSr.textContent = 'Previous';
  prevButton.append(prevSpanIcon, prevSpanSr);

  const nextButton = document.createElement('a');
  nextButton.classList.add('banner-itc-carousel-control-next', 'carousel-control-next');
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentActive = carouselInner.querySelector('.carousel-item.active');
    const next = currentActive.nextElementSibling || carouselInner.firstElementChild;
    if (next) {
      currentActive.classList.remove('active');
      next.classList.add('active');
      const currentIndicator = olIndicators.querySelector('.active');
      const nextIndicator = currentIndicator.nextElementSibling || olIndicators.firstElementChild;
      currentIndicator.classList.remove('active');
      nextIndicator.classList.add('active');
    }
  });
  const nextSpanIcon = document.createElement('span');
  nextSpanIcon.classList.add('banner-itc-carousel-control-next-icon', 'carousel-control-next-icon');
  nextSpanIcon.setAttribute('aria-hidden', 'true');
  const nextSpanSr = document.createElement('span');
  nextSpanSr.classList.add('sr-only');
  nextSpanSr.textContent = 'Next';
  nextButton.append(nextSpanIcon, nextSpanSr);

  nextBtnWrapper.append(prevButton, nextButton);
  carouselWrapper.append(nextBtnWrapper);

  block.textContent = '';
  block.append(carouselWrapper);

  // Auto-advance carousel
  let currentIndex = 0;
  const items = carouselInner.children;
  const indicators = olIndicators.children;

  const advanceCarousel = () => {
    items[currentIndex].classList.remove('active');
    indicators[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add('active');
    indicators[currentIndex].classList.add('active');
  };

  setInterval(advanceCarousel, 5000); // Advance every 5 seconds
}
