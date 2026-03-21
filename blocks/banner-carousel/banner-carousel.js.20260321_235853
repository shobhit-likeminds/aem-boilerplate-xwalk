import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('banner-carousel', 'banner-slide');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('banner-carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('banner-carousel-inner');

  const slides = [...block.children];
  slides.forEach((row, index) => {
    // Create indicator
    const indicator = document.createElement('li');
    indicator.classList.add('banner-carousel-indicator');
    if (index === 0) {
      indicator.classList.add('banner-active');
    }
    indicator.setAttribute('data-slide-to', index);
    carouselIndicators.append(indicator);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('banner-carousel-item');
    if (index === 0) {
      carouselItem.classList.add('banner-active');
    }
    moveInstrumentation(row, carouselItem);

    const [
      desktopImageCell, // field: desktopImage, type: reference
      mobileImageCell, // field: mobileImage, type: reference
      headingCell, // field: heading, type: text
      descriptionCell, // field: description, type: richtext
      ctaLinkCell, // field: ctaLink, type: aem-content
      ctaLabelCell, // field: ctaLabel, type: text
    ] = row.children;

    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('banner-d-none', 'banner-d-sm-block', 'banner-w-100', 'banner-desktop-image');
      carouselItem.append(optimizedPic);
    }

    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '768' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('banner-d-block', 'banner-d-sm-none', 'banner-w-100', 'banner-mobile-image');
      carouselItem.append(optimizedPic);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-content-wrapper', 'banner-position-absolute');

    const heading = document.createElement('h1');
    heading.classList.add('banner-carousel-heading', 'banner-text-sm-left'); // Corrected class name
    moveInstrumentation(headingCell, heading);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    contentWrapper.append(heading);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('banner-carousel-description'); // Corrected class name
    moveInstrumentation(descriptionCell, descriptionDiv);
    while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
    contentWrapper.append(descriptionDiv);

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const ctaButton = document.createElement('a');
      ctaButton.classList.add('banner-carousel-cta', 'banner-btn', 'banner-btn-primary', 'banner-btn-start-now');
      ctaButton.href = ctaLink.href;
      ctaButton.target = '_blank';
      ctaButton.rel = 'noopener noreferrer';
      const ctaLabel = ctaLabelCell.textContent.trim();
      if (ctaLabel) {
        ctaButton.textContent = ctaLabel;
      } else {
        moveInstrumentation(ctaLinkCell, ctaButton);
        while (ctaLinkCell.firstChild) ctaButton.append(ctaLinkCell.firstChild);
      }
      contentWrapper.append(ctaButton);
    }

    carouselItem.append(contentWrapper);
    carouselInner.append(carouselItem);
  });

  const nextPrevButtons = document.createElement('div');
  nextPrevButtons.classList.add('banner-next-carousel-btn');

  const prevButton = document.createElement('a');
  prevButton.classList.add('banner-carousel-control-prev');
  prevButton.href = '#';
  prevButton.role = 'button';
  prevButton.innerHTML = '<span class="banner-carousel-control-prev-icon" aria-hidden="true"></span><span class="banner-sr-only">Previous</span>';
  nextPrevButtons.append(prevButton);

  const nextButton = document.createElement('a');
  nextButton.classList.add('banner-carousel-control-next');
  nextButton.href = '#';
  nextButton.role = 'button';
  nextButton.innerHTML = '<span class="banner-carousel-control-next-icon" aria-hidden="true"></span><span class="banner-sr-only">Next</span>';
  nextPrevButtons.append(nextButton);

  block.textContent = '';
  block.append(carouselIndicators, carouselInner, nextPrevButtons);

  let currentIndex = 0;
  const items = [...carouselInner.children];
  const indicators = [...carouselIndicators.children];

  const showSlide = (index) => {
    items.forEach((item, i) => {
      item.classList.toggle('banner-active', i === index);
      indicators[i].classList.toggle('banner-active', i === index);
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  };

  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
  });

  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // Auto-advance carousel
  setInterval(nextSlide, 5000); // Change slide every 5 seconds
}
