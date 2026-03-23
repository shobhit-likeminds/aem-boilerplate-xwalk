import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = 'carouselExampleSlidesOnly';
  block.id = carouselId;
  block.classList.add('banner-itc-carousel', 'carousel', 'slide'); // Corrected block name prefix

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const itemRows = [...block.children];

  itemRows.forEach((row, index) => {
    const liIndicator = document.createElement('li');
    liIndicator.setAttribute('data-target', `#${carouselId}`);
    liIndicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      liIndicator.classList.add('active');
    }
    olIndicators.append(liIndicator);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    // BlockJson defines 6 fields for 'bannerCarouselItem'
    const [desktopImageCell, mobileImageCell, headingCell, descriptionCell, ctaLinkCell, ctaTextCell] = row.children;

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      optimizedDesktopPic.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'banner-itc-carousel-desktop-image'); // Corrected block name prefix
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      optimizedMobilePic.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'banner-itc-carousel-mobile-image'); // Corrected block name prefix
      carouselItem.append(optimizedMobilePic);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-itc-carousel-content-wrapper', 'position-absolute'); // Corrected block name prefix

    // Heading
    const headingEl = document.createElement('h1');
    headingEl.classList.add('banner-itc-carousel-heading', 'text-sm-left'); // Corrected block name prefix
    const headingLink = headingCell.querySelector('a');
    if (headingLink) {
      headingEl.append(headingLink);
    } else {
      while (headingCell.firstChild) headingEl.append(headingCell.firstChild);
    }
    const headingColor = headingEl.querySelector('[data-color]');
    if (headingColor) {
      headingEl.style.color = headingColor.dataset.color;
      headingEl.removeAttribute('data-color');
    }
    contentWrapper.append(headingEl);

    // Description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('banner-itc-carousel-description'); // Corrected block name prefix
    const descColor = descriptionCell.querySelector('[data-desc-color]');
    if (descColor) {
      descriptionDiv.setAttribute('data-desc-color', descColor.dataset.descColor);
      descColor.removeAttribute('data-desc-color');
    }
    while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
    contentWrapper.append(descriptionDiv);

    // CTA Link
    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaText = ctaTextCell.textContent.trim();
    if (ctaLink && ctaText) {
      const ctaButton = document.createElement('a');
      ctaButton.href = ctaLink.href;
      ctaButton.classList.add('banner-itc-carousel-cta', 'btn', 'btn-primary', 'btn-start-now'); // Corrected block name prefix
      ctaButton.textContent = ctaText;
      if (ctaLink.target) ctaButton.target = ctaLink.target;
      if (ctaLink.alt) ctaButton.alt = ctaLink.alt;
      const bgColor = ctaLink.dataset.bgColor;
      if (bgColor) {
        ctaButton.style.backgroundColor = bgColor;
      }
      moveInstrumentation(ctaLinkCell, ctaButton);
      contentWrapper.append(ctaButton);
    }

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  const nextPrevButtons = document.createElement('div');
  nextPrevButtons.classList.add('banner-itc-carousel-next-carousel-btn'); // Corrected block name prefix

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentActive = carouselInner.querySelector('.carousel-item.active');
    const prev = currentActive.previousElementSibling || carouselInner.lastElementChild;
    if (prev) {
      currentActive.classList.remove('active');
      prev.classList.add('active');
      const currentIndicator = olIndicators.querySelector('li.active');
      const prevIndicator = currentIndicator.previousElementSibling || olIndicators.lastElementChild;
      if (currentIndicator) currentIndicator.classList.remove('active');
      if (prevIndicator) prevIndicator.classList.add('active');
    }
  });
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
  nextPrevButtons.append(prevButton);

  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const currentActive = carouselInner.querySelector('.carousel-item.active');
    const next = currentActive.nextElementSibling || carouselInner.firstElementChild;
    if (next) {
      currentActive.classList.remove('active');
      next.classList.add('active');
      const currentIndicator = olIndicators.querySelector('li.active');
      const nextIndicator = currentIndicator.nextElementSibling || olIndicators.firstElementChild;
      if (currentIndicator) currentIndicator.classList.remove('active');
      if (nextIndicator) nextIndicator.classList.add('active');
    }
  });
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
  nextPrevButtons.append(nextButton);

  block.textContent = '';
  block.append(olIndicators, carouselInner, nextPrevButtons);
}
