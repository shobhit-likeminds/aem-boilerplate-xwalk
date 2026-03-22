import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'banner-carousel';
  block.classList.add(`${blockName}-section`);

  const carouselId = 'carouselExampleSlidesOnly';
  const carousel = document.createElement('div');
  carousel.id = carouselId;
  carousel.classList.add(`${blockName}-carousel`, 'carousel', 'slide');

  const indicators = document.createElement('ol');
  indicators.classList.add(`${blockName}-carousel-indicators`, 'carousel-indicators');

  const inner = document.createElement('div');
  inner.classList.add(`${blockName}-carousel-inner`, 'carousel-inner');

  [...block.children].forEach((row, index) => {
    const [desktopImageCell, mobileImageCell, headingCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    // Carousel indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicators.append(indicator);

    // Carousel item
    const item = document.createElement('div');
    item.classList.add(`${blockName}-carousel-item`, 'carousel-item');
    if (index === 0) {
      item.classList.add('active');
    }
    moveInstrumentation(row, item);

    // Desktop Image
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
      optimizedDesktopPic.classList.add('d-none', 'd-sm-block', 'w-100', `${blockName}-desktop-image`);
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      item.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
      optimizedMobilePic.classList.add('d-block', 'd-sm-none', 'w-100', `${blockName}-mobile-image`);
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      item.append(optimizedMobilePic);
    }

    // Content Wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add(`${blockName}-content-wrapper`, 'position-absolute');

    // Heading
    const heading = document.createElement('h1');
    heading.classList.add(`${blockName}-heading`, 'text-sm-left'); // Changed from banner-koi-carousel-heading
    moveInstrumentation(headingCell, heading);
    while (headingCell.firstChild) heading.append(headingCell.firstChild);
    contentWrapper.append(heading);

    // Description
    const description = document.createElement('div');
    description.classList.add(`${blockName}-description`); // Changed from banner-koi-carousel-description
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    contentWrapper.append(description);

    // CTA Link
    const ctaLinkElement = ctaLinkCell.querySelector('a');
    const ctaLabelElement = ctaLabelCell.querySelector('div');
    if (ctaLinkElement && ctaLabelElement) {
      const cta = document.createElement('a');
      cta.href = ctaLinkElement.href;
      cta.classList.add(`${blockName}-cta`, 'btn', 'btn-primary', 'btn-start-now'); // Changed from banner-koi-carousel-cta
      cta.target = '_blank';
      cta.textContent = ctaLabelElement.textContent.trim();
      const screenReaderOnly = document.createElement('span');
      screenReaderOnly.classList.add('cmp-link__screen-reader-only');
      screenReaderOnly.textContent = 'opens in a new tab';
      cta.append(screenReaderOnly);
      moveInstrumentation(ctaLinkCell, cta);
      moveInstrumentation(ctaLabelCell, cta);
      contentWrapper.append(cta);
    }

    item.append(contentWrapper);
    inner.append(item);
  });

  carousel.append(indicators, inner);

  // Navigation buttons
  const navButtonsWrapper = document.createElement('div');
  navButtonsWrapper.classList.add(`${blockName}-next-carousel-btn`);

  const prevButton = document.createElement('a');
  prevButton.classList.add(`${blockName}-carousel-control-prev`, 'carousel-control-prev'); // Added blockName prefix
  prevButton.href = `#${carouselId}`;
  prevButton.setAttribute('role', 'button');
  const prevIcon = document.createElement('span');
  prevIcon.classList.add(`${blockName}-carousel-control-prev-icon`, 'carousel-control-prev-icon'); // Added blockName prefix
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);

  const nextButton = document.createElement('a');
  nextButton.classList.add(`${blockName}-carousel-control-next`, 'carousel-control-next'); // Added blockName prefix
  nextButton.href = `#${carouselId}`;
  nextButton.setAttribute('role', 'button');
  const nextIcon = document.createElement('span');
  nextIcon.classList.add(`${blockName}-carousel-control-next-icon`, 'carousel-control-next-icon'); // Added blockName prefix
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  navButtonsWrapper.append(prevButton, nextButton);
  carousel.append(navButtonsWrapper);

  block.textContent = '';
  block.append(carousel);

  // Add event listeners for carousel functionality
  let currentIndex = 0;
  const carouselItems = [...inner.children];
  const carouselIndicators = [...indicators.children];
  const totalItems = carouselItems.length;

  const showSlide = (index) => {
    carouselItems.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    carouselIndicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalItems;
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
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

  carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // Auto-advance carousel
  let intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
  carousel.addEventListener('mouseleave', () => {
    intervalId = setInterval(nextSlide, 5000);
  });
}
