import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-carousel-section');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.id = 'carouselExampleSlidesOnly';
  carouselWrapper.classList.add('bannerCarousel', 'carousel', 'slide');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
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

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    const cells = [...row.children];

    // EDS Block Structure cells are in order: desktop-image, mobile-image, heading, description, cta-link
    const desktopImageCell = cells[0];
    const mobileImageCell = cells[1];
    const headingCell = cells[2];
    const descriptionCell = cells[3];
    const ctaLinkCell = cells[4];

    // Process Desktop Image
    if (desktopImageCell && desktopImageCell.querySelector('picture')) {
      const picture = desktopImageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.classList.add('w-100', 'd-none', 'd-sm-block', 'desktop-image');
        newImg.setAttribute('loading', index === 0 ? 'eager' : 'lazy');
        newImg.setAttribute('fetchpriority', index === 0 ? 'high' : 'low');

        const optimizedPic = createOptimizedPicture(newImg.src, newImg.alt, index === 0, [{ width: '2000' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        moveInstrumentation(img, optimizedImg);
        optimizedImg.classList.add(...newImg.classList);
        carouselItem.append(optimizedPic);
      }
    }

    // Process Mobile Image
    if (mobileImageCell && mobileImageCell.querySelector('picture')) {
      const picture = mobileImageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.classList.add('w-100', 'd-block', 'd-sm-none', 'mobile-image');
        newImg.setAttribute('loading', index === 0 ? 'eager' : 'lazy');
        newImg.setAttribute('fetchpriority', index === 0 ? 'high' : 'low');

        const optimizedPic = createOptimizedPicture(newImg.src, newImg.alt, index === 0, [{ width: '2000' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        moveInstrumentation(img, optimizedImg);
        optimizedImg.classList.add(...newImg.classList);
        carouselItem.append(optimizedPic);
      }
    }

    // Process Heading
    if (headingCell && headingCell.querySelector('h1, h2, h3, h4, h5, h6')) {
      const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
      const newHeading = document.createElement('h1'); // Always render as h1 in the carousel
      moveInstrumentation(headingCell, newHeading);
      newHeading.classList.add('koi-carousel-heading', 'text-sm-left');
      while (headingCell.firstChild) newHeading.append(headingCell.firstChild);
      bannerContentWrapper.append(newHeading);
    }

    // Process Description
    if (descriptionCell && descriptionCell.querySelector('p')) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('koi-carousel-description');
      moveInstrumentation(descriptionCell, descriptionDiv);
      while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
      bannerContentWrapper.append(descriptionDiv);
    }

    // Process CTA Link
    if (ctaLinkCell && ctaLinkCell.querySelector('a')) {
      const foundLink = ctaLinkCell.querySelector('a');
      const ctaLink = document.createElement('a');
      moveInstrumentation(ctaLinkCell, ctaLink);
      ctaLink.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
      if (foundLink) {
        ctaLink.href = foundLink.href;
        ctaLink.alt = foundLink.textContent;
        ctaLink.target = '_blank';
        while (foundLink.firstChild) ctaLink.append(foundLink.firstChild);
      }
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      ctaLink.append(screenReaderSpan);
      bannerContentWrapper.append(ctaLink);
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselWrapper.append(carouselIndicators);
  carouselWrapper.append(carouselInner);

  // Add next and previous buttons
  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = '#carouselExampleSlidesOnly';
  prevButton.setAttribute('role', 'button');
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
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  nextCarouselBtn.append(prevButton, nextButton);
  carouselWrapper.append(nextCarouselBtn);

  section.append(carouselWrapper);
  block.textContent = '';
  block.append(section);

  // Implement carousel functionality with event listeners
  const carouselItems = [...carouselInner.children];
  const indicators = [...carouselIndicators.children];
  let currentIndex = 0;

  const updateCarousel = () => {
    carouselItems.forEach((item, i) => {
      item.classList.toggle('active', i === currentIndex);
    });
    indicators.forEach((indicatorEl, i) => {
      indicatorEl.classList.toggle('active', i === currentIndex);
    });
  };

  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
  });

  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
  });

  indicators.forEach((indicatorEl, i) => {
    indicatorEl.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = i;
      updateCarousel();
    });
  });
}
