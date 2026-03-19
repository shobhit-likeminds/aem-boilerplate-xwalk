import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('banner-section');

  const carouselId = 'carouselExampleSlidesOnly'; // Fixed ID as per original HTML
  const carouselWrapper = document.createElement('div');
  carouselWrapper.id = carouselId;
  carouselWrapper.classList.add('banner-carousel', 'carousel', 'slide');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  [...block.children].forEach((row, index) => {
    // row is a bannerItem
    const [desktopImageCell, mobileImageCell, headingCell, subheadingCell, descriptionCell, ctaLabelCell, ctaUrlCell] = [...row.children];

    // Carousel Indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
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
    moveInstrumentation(row, carouselItem); // Move instrumentation from row to carouselItem

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '2000' }]);
      optimizedPic.classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
      optimizedPic.querySelector('img').setAttribute('loading', index === 0 ? 'eager' : 'lazy');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      carouselItem.append(optimizedPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '750' }]);
      optimizedPic.classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
      optimizedPic.querySelector('img').setAttribute('loading', index === 0 ? 'eager' : 'lazy');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      carouselItem.append(optimizedPic);
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    const heading = document.createElement('h1');
    heading.classList.add('banner-carousel-heading', 'text-sm-left');
    // Extract color from style if present, otherwise default
    const headingColor = headingCell.querySelector('h1')?.style.color || '#3c2904';
    heading.style.color = headingColor;
    heading.setAttribute('data-color', headingColor);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    contentWrapper.append(heading);

    // Description Wrapper
    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('banner-carousel-description');
    // Extract color from style if present, otherwise default
    const descriptionColor = subheadingCell.querySelector('h3')?.style.color || '#3c2904';
    descriptionWrapper.setAttribute('data-desc-color', descriptionColor);

    // Subheading
    const subheading = document.createElement('h3');
    subheading.style.color = descriptionColor;
    while (subheadingCell.firstChild) subheading.append(subheadingCell.firstChild);
    descriptionWrapper.append(subheading);

    // Paragraph Description
    const paragraph = document.createElement('p');
    paragraph.style.color = descriptionColor;
    while (descriptionCell.firstChild) paragraph.append(descriptionCell.firstChild);
    descriptionWrapper.append(paragraph);
    contentWrapper.append(descriptionWrapper);

    // CTA Button
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('banner-carousel-cta', 'btn', 'btn-primary', 'banner-btn-start-now');
    ctaLink.href = ctaUrlCell.textContent.trim();
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    ctaLink.target = '_blank'; // Always open in new tab as per original HTML

    const ctaBgColor = ctaLink.getAttribute('data-bg-color') || '#6c3003';
    ctaLink.style.backgroundColor = ctaBgColor;

    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    ctaLink.append(srOnlySpan);
    contentWrapper.append(ctaLink);

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  // Add navigation buttons
  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('carousel-control-prev');
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselWrapper.querySelector('.carousel-item.active');
    const prevItem = activeItem.previousElementSibling || carouselInner.lastElementChild;
    if (prevItem) {
      activeItem.classList.remove('active');
      prevItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('.active');
      const prevIndicator = activeIndicator.previousElementSibling || carouselIndicators.lastElementChild;
      if (activeIndicator) activeIndicator.classList.remove('active');
      if (prevIndicator) prevIndicator.classList.add('active');
    }
  });
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';

  const nextButton = document.createElement('a');
  nextButton.classList.add('carousel-control-next');
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    const activeItem = carouselWrapper.querySelector('.carousel-item.active');
    const nextItem = activeItem.nextElementSibling || carouselInner.firstElementChild;
    if (nextItem) {
      activeItem.classList.remove('active');
      nextItem.classList.add('active');
      const activeIndicator = carouselIndicators.querySelector('.active');
      const nextIndicator = activeIndicator.nextElementSibling || carouselIndicators.firstElementChild;
      if (activeIndicator) activeIndicator.classList.remove('active');
      if (nextIndicator) nextIndicator.classList.add('active');
    }
  });
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';

  nextCarouselBtn.append(prevButton, nextButton);

  carouselWrapper.append(carouselIndicators, carouselInner, nextCarouselBtn);

  block.textContent = '';
  block.append(carouselWrapper);
}
