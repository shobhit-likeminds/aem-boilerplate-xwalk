import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselSection = document.createElement('section');
  carouselSection.classList.add('itc-carousel-section');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.id = 'carouselExampleSlidesOnly';
  carouselWrapper.classList.add('bannerCarousel', 'carousel', 'slide');
  carouselWrapper.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const itemRows = [...block.children];

  itemRows.forEach((row, index) => {
    const cells = [...row.children];

    // Content detection for cells
    const desktopImageCell = cells.find(cell => cell.querySelector('picture img.desktop-image') || (cell.querySelector('picture') && !cell.querySelector('picture img.mobile-image')));
    const mobileImageCell = cells.find(cell => cell.querySelector('picture img.mobile-image') || (cell.querySelector('picture') && !cell.querySelector('picture img.desktop-image')));
    const headingCell = cells.find(cell => cell.textContent.trim() && !cell.querySelector('picture') && !cell.querySelector('a') && !cell.querySelector('p'));
    const descriptionCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && !cell.textContent.trim().includes('http')); // CTA Link has an anchor
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim().includes('http')); // CTA Label is typically just the URL in the cell, but the original HTML shows it as a link with the URL as text content. We'll use the text content of the link itself.

    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselExampleSlidesOnly');
    indicator.setAttribute('data-slide-to', index);
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

    if (desktopImageCell) {
      const desktopPicture = desktopImageCell.querySelector('picture');
      if (desktopPicture) {
        const desktopImg = desktopPicture.querySelector('img');
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]); // Using a larger width for desktop
        const newDesktopImg = optimizedDesktopPic.querySelector('img');
        newDesktopImg.classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image');
        newDesktopImg.setAttribute('loading', index === 0 ? 'eager' : 'lazy');
        newDesktopImg.setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
        moveInstrumentation(desktopImg, newDesktopImg);
        carouselItem.append(optimizedDesktopPic);
      }
    }

    if (mobileImageCell) {
      const mobilePicture = mobileImageCell.querySelector('picture');
      if (mobilePicture) {
        const mobileImg = mobilePicture.querySelector('img');
        const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]); // Using a smaller width for mobile
        const newMobileImg = optimizedMobilePic.querySelector('img');
        newMobileImg.classList.add('d-block', 'd-sm-none', 'w-100', 'mobile-image');
        newMobileImg.setAttribute('loading', index === 0 ? 'eager' : 'lazy');
        newMobileImg.setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
        moveInstrumentation(mobileImg, newMobileImg);
        carouselItem.append(optimizedMobilePic);
      }
    }

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    if (headingCell) {
      const heading = document.createElement('h1');
      heading.classList.add('koi-carousel-heading', 'text-sm-left');
      heading.textContent = headingCell.textContent.trim();
      // Assuming data-color and style are dynamic, if not, hardcode from original or extract
      // For now, setting a default color if not found in data-color
      heading.style.color = '#3c2904'; // Default color from original HTML
      bannerContentWrapper.append(heading);
    }

    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('koi-carousel-description');
      // Assuming data-desc-color, if not, hardcode from original
      descriptionDiv.style.color = '#3c2904'; // Default color from original HTML
      moveInstrumentation(descriptionCell, descriptionDiv);
      while (descriptionCell.firstChild) {
        descriptionDiv.append(descriptionCell.firstChild);
      }
      bannerContentWrapper.append(descriptionDiv);
    }

    if (ctaLinkCell) {
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const ctaAnchor = document.createElement('a');
        ctaAnchor.href = ctaLink.href;
        ctaAnchor.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        ctaAnchor.setAttribute('target', '_blank'); // From original HTML
        // Use the text content of the CTA Link cell for alt, or a default
        ctaAnchor.setAttribute('alt', ctaLink.textContent.trim() || 'Shop Now');
        ctaAnchor.style.backgroundColor = '#6c3003'; // Default color from original HTML
        ctaAnchor.textContent = ctaLink.textContent.trim(); // Use the text content of the CTA Link

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

  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#carouselExampleSlidesOnly';
  prevControl.setAttribute('role', 'button');

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
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

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
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

  // Implement carousel functionality (simplified, without Bootstrap JS)
  let currentIndex = 0;
  const items = carouselInner.querySelectorAll('.carousel-item');
  const indicators = carouselIndicators.querySelectorAll('li');

  const showItem = (index) => {
    items.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  };

  prevControl.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  });

  nextControl.addEventListener('click', (e) => {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  });

  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = i;
      showItem(currentIndex);
    });
  });
}
