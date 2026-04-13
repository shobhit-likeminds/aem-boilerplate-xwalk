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
    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselExampleSlidesOnly');
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const slideTo = parseInt(e.target.getAttribute('data-slide-to'), 10);
      const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
      const currentActiveIndicator = carouselIndicators.querySelector('.active');
      const targetItem = carouselInner.children[slideTo];
      const targetIndicator = carouselIndicators.children[slideTo];

      if (currentActiveItem) currentActiveItem.classList.remove('active');
      if (currentActiveIndicator) currentActiveIndicator.classList.remove('active');
      if (targetItem) targetItem.classList.add('active');
      if (targetIndicator) targetIndicator.classList.add('active');
    });
    carouselIndicators.append(indicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    // Use content detection instead of index access
    const cells = [...row.children];
    const desktopImageCell = cells.find(cell => cell.querySelector('picture') && cell.textContent.trim() === ''); // Assuming desktop image is the first picture cell
    const mobileImageCell = cells.find(cell => cell.querySelector('picture') && cell !== desktopImageCell); // Assuming mobile image is the second picture cell
    const headingCell = cells.find(cell => cell.querySelector('h1') || (cell.textContent.trim() !== '' && !cell.querySelector('picture') && !cell.querySelector('a') && !cell.querySelector('p'))); // Assuming heading is a text cell, potentially with h1
    const descriptionCell = cells.find(cell => cell.querySelector('p') && cell !== headingCell); // Assuming description is a richtext cell with p tags
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim() !== '' && cell.children.length === 1); // Assuming CTA link is an anchor cell
    const ctaLinkLabelCell = cells.find(cell => cell.textContent.trim() !== '' && !cell.querySelector('a') && !cell.querySelector('picture') && cell !== headingCell && cell !== descriptionCell); // Assuming CTA label is a text cell without other elements

    // Desktop Image
    if (desktopImageCell) {
      const desktopPicture = desktopImageCell.querySelector('picture');
      if (desktopPicture) {
        const desktopImg = desktopPicture.querySelector('img');
        if (desktopImg) {
          const optimizedPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
          optimizedPic.classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image');
          optimizedPic.querySelector('img').setAttribute('loading', index === 0 ? 'eager' : 'lazy');
          optimizedPic.querySelector('img').setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
          moveInstrumentation(desktopImg, optimizedPic.querySelector('img'));
          carouselItem.append(optimizedPic);
        }
      }
    }

    // Mobile Image
    if (mobileImageCell) {
      const mobilePicture = mobileImageCell.querySelector('picture');
      if (mobilePicture) {
        const mobileImg = mobilePicture.querySelector('img');
        if (mobileImg) {
          const optimizedPic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
          optimizedPic.classList.add('d-block', 'd-sm-none', 'w-100', 'mobile-image');
          optimizedPic.querySelector('img').setAttribute('loading', index === 0 ? 'eager' : 'lazy');
          optimizedPic.querySelector('img').setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
          moveInstrumentation(mobileImg, optimizedPic.querySelector('img'));
          carouselItem.append(optimizedPic);
        }
      }
    }

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    if (headingCell) {
      const h1 = document.createElement('h1');
      h1.classList.add('koi-carousel-heading', 'text-sm-left');
      moveInstrumentation(headingCell, h1);
      h1.innerHTML = headingCell.innerHTML;
      bannerContentWrapper.append(h1);
    }

    // Description
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('koi-carousel-description');
      moveInstrumentation(descriptionCell, descriptionDiv);
      descriptionDiv.innerHTML = descriptionCell.innerHTML;
      bannerContentWrapper.append(descriptionDiv);
    }

    // CTA Link
    if (ctaLinkCell || ctaLinkLabelCell) {
      const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
      const ctaLabel = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : (ctaLink ? ctaLink.textContent.trim() : '');

      if (ctaLink) {
        const anchor = document.createElement('a');
        anchor.href = ctaLink.href;
        anchor.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        anchor.textContent = ctaLabel;
        moveInstrumentation(ctaLinkCell, anchor);
        bannerContentWrapper.append(anchor);
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
  prevControl.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    if (activeItem && prevItem) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('.active');
      const prevIndicator = activeIndicator.previousElementSibling || carouselIndicators.lastElementChild;
      if (activeIndicator && prevIndicator) {
        activeIndicator.classList.remove('active');
        prevIndicator.classList.add('active');
      }
    }
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
  nextControl.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselInner.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    if (activeItem && nextItem) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('.active');
      const nextIndicator = activeIndicator.nextElementSibling || carouselIndicators.firstElementChild;
      if (activeIndicator && nextIndicator) {
        activeIndicator.classList.remove('active');
        nextIndicator.classList.add('active');
      }
    }
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
}
