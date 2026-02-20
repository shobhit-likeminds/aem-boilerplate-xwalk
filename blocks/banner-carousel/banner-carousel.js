import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = 'carouselExampleSlidesOnly'; // ID from source HTML

  const carouselWrapper = document.createElement('div');
  carouselWrapper.id = carouselId;
  carouselWrapper.classList.add('bannercarousel-carousel', 'carousel', 'slide');
  carouselWrapper.setAttribute('data-ride', 'carousel');

  const indicators = document.createElement('ol');
  indicators.classList.add('bannercarousel-carousel-indicators', 'carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('bannercarousel-carousel-inner', 'carousel-inner');

  [...block.children].forEach((row, i) => {
    // Each row is a carousel item (slide)
    const carouselItem = document.createElement('div');
    moveInstrumentation(row, carouselItem);
    carouselItem.classList.add('bannercarousel-carousel-item', 'carousel-item');
    if (i === 0) {
      carouselItem.classList.add('active');
    }

    const cells = [...row.children];

    // Indicator for the current slide
    const indicatorLi = document.createElement('li');
    indicatorLi.setAttribute('data-target', `#${carouselId}`);
    indicatorLi.setAttribute('data-slide-to', i.toString());
    if (i === 0) {
      indicatorLi.classList.add('active');
    }
    indicators.append(indicatorLi);

    // Extract content from cells based on Block JSON fields
    const desktopImageCell = cells[0]; // desktopImage
    const mobileImageCell = cells[1]; // mobileImage
    const headingCell = cells[2];    // heading
    const descriptionCell = cells[3]; // description
    const ctaCell = cells[4];       // cta

    // Desktop Image
    if (desktopImageCell) {
      const desktopImg = desktopImageCell.querySelector('img');
      if (desktopImg) {
        const optimizedPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, i === 0, [{ width: '2000' }]);
        const newImg = optimizedPic.querySelector('img');
        if (newImg) {
          moveInstrumentation(desktopImg, newImg);
          newImg.classList.add('d-none', 'd-sm-block', 'w-100', 'bannercarousel-desktop-image');
          newImg.setAttribute('loading', i === 0 ? 'eager' : 'lazy');
          newImg.setAttribute('fetchpriority', i === 0 ? 'high' : 'low');
          carouselItem.append(optimizedPic);
        }
      }
    }

    // Mobile Image
    if (mobileImageCell) {
      const mobileImg = mobileImageCell.querySelector('img');
      if (mobileImg) {
        const optimizedPic = createOptimizedPicture(mobileImg.src, mobileImg.alt, i === 0, [{ width: '768' }]);
        const newImg = optimizedPic.querySelector('img');
        if (newImg) {
          moveInstrumentation(mobileImg, newImg);
          newImg.classList.add('d-block', 'd-sm-none', 'w-100', 'bannercarousel-mobile-image');
          newImg.setAttribute('loading', i === 0 ? 'eager' : 'lazy');
          newImg.setAttribute('fetchpriority', i === 0 ? 'high' : 'low');
          carouselItem.append(optimizedPic);
        }
      }
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('bannercarousel-content-wrapper', 'position-absolute');

    // Heading
    if (headingCell) {
      const h1 = document.createElement('h1');
      h1.classList.add('bannercarousel-heading', 'text-sm-left');
      h1.textContent = headingCell.textContent.trim();
      const dataColor = headingCell.querySelector('[data-color]');
      if (dataColor) {
        h1.setAttribute('data-color', dataColor.getAttribute('data-color'));
        h1.style.color = dataColor.style.color; // Copy inline style
      }
      contentWrapper.append(h1);
    }

    // Description
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('bannercarousel-description');
      const dataDescColor = descriptionCell.querySelector('[data-desc-color]');
      if (dataDescColor) {
        descriptionDiv.setAttribute('data-desc-color', dataDescColor.getAttribute('data-desc-color'));
      }
      // Append all children of the description cell to the new div
      while (descriptionCell.firstElementChild) {
        const child = descriptionCell.firstElementChild;
        // Copy inline styles for h3 and p if they exist
        if (child.tagName === 'H3' || child.tagName === 'P') {
          if (child.style.color) {
            child.style.color = child.style.color;
          }
          const iTag = child.querySelector('i');
          if (iTag && iTag.style.color) {
            iTag.style.color = iTag.style.color;
          }
        }
        descriptionDiv.append(child);
      }
      contentWrapper.append(descriptionDiv);
    }

    // CTA
    if (ctaCell) {
      const ctaLink = ctaCell.querySelector('a');
      if (ctaLink) {
        const newCta = document.createElement('a');
        newCta.href = ctaLink.href;
        newCta.textContent = ctaLink.textContent.trim();
        // Copy all classes from the source CTA link
        newCta.classList.add('bannercarousel-cta', 'btn', 'btn-primary', 'bannercarousel-start-now');
        // Copy attributes
        if (ctaLink.getAttribute('data-cmp-clickable')) newCta.setAttribute('data-cmp-clickable', ctaLink.getAttribute('data-cmp-clickable'));
        if (ctaLink.getAttribute('data-cmp-data-layer')) newCta.setAttribute('data-cmp-data-layer', ctaLink.getAttribute('data-cmp-data-layer'));
        if (ctaLink.getAttribute('data-bg-color')) newCta.setAttribute('data-bg-color', ctaLink.getAttribute('data-bg-color'));
        if (ctaLink.getAttribute('alt')) newCta.setAttribute('alt', ctaLink.getAttribute('alt'));
        if (ctaLink.getAttribute('target')) newCta.setAttribute('target', ctaLink.getAttribute('target'));
        if (ctaLink.style.backgroundColor) newCta.style.backgroundColor = ctaLink.style.backgroundColor; // Copy inline style
        
        const screenReaderOnly = ctaLink.querySelector('.cmp-link__screen-reader-only');
        if (screenReaderOnly) {
          const newScreenReaderOnly = document.createElement('span');
          newScreenReaderOnly.classList.add('cmp-link__screen-reader-only');
          newScreenReaderOnly.textContent = screenReaderOnly.textContent;
          newCta.append(newScreenReaderOnly);
        }

        contentWrapper.append(newCta);
      }
    }

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselWrapper.append(indicators);
  carouselWrapper.append(carouselInner);

  // Navigation buttons
  const navButtonsDiv = document.createElement('div');
  navButtonsDiv.classList.add('bannercarousel-next-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('bannercarousel-control-prev', 'carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
  navButtonsDiv.append(prevButton);

  const nextButton = document.createElement('a');
  nextButton.classList.add('bannercarousel-control-next', 'carousel-control-next');
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
  navButtonsDiv.append(nextButton);

  carouselWrapper.append(navButtonsDiv);

  block.textContent = ''; // Clear the original block content
  block.append(carouselWrapper);
}