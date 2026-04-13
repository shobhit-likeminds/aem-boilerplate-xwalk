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
    moveInstrumentation(row, carouselItem);

    // Use content detection instead of index access for robustness
    const cells = [...row.children];
    const desktopImageCell = cells.find((cell) => cell.querySelector('picture') && !cell.nextElementSibling?.querySelector('picture'));
    const mobileImageCell = cells.find((cell) => cell.querySelector('picture') && cell.previousElementSibling?.querySelector('picture'));
    const headingCell = cells.find((cell) => cell.querySelector('h1') || (cell.textContent.trim() && !cell.querySelector('picture') && !cell.querySelector('a')));
    const descriptionCell = cells.find((cell) => cell.querySelector('p') && !cell.querySelector('picture') && !cell.querySelector('a'));
    const ctaLinkCell = cells.find((cell) => cell.querySelector('a') && cell.querySelector('a').href && !cell.nextElementSibling?.querySelector('a'));
    const ctaLinkLabelCell = cells.find((cell) => cell.querySelector('a') && cell.querySelector('a').href && cell.previousElementSibling?.querySelector('a'));


    // Desktop Image
    if (desktopImageCell) {
      const desktopPicture = desktopImageCell.querySelector('picture');
      if (desktopPicture) {
        const desktopImg = desktopPicture.querySelector('img');
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, index === 0, [{ width: '2000' }]);
        optimizedDesktopPic.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'desktop-image');
        if (index === 0) {
          optimizedDesktopPic.querySelector('img').setAttribute('loading', 'eager');
          optimizedDesktopPic.querySelector('img').setAttribute('fetchpriority', 'high');
        } else {
          optimizedDesktopPic.querySelector('img').setAttribute('loading', 'lazy');
          optimizedDesktopPic.querySelector('img').setAttribute('fetchpriority', 'low');
        }
        moveInstrumentation(desktopImageCell, optimizedDesktopPic);
        carouselItem.append(optimizedDesktopPic);
      }
    }

    // Mobile Image
    if (mobileImageCell) {
      const mobilePicture = mobileImageCell.querySelector('picture');
      if (mobilePicture) {
        const mobileImg = mobilePicture.querySelector('img');
        const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, index === 0, [{ width: '750' }]);
        optimizedMobilePic.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'mobile-image');
        if (index === 0) {
          optimizedMobilePic.querySelector('img').setAttribute('loading', 'eager');
          optimizedMobilePic.querySelector('img').setAttribute('fetchpriority', 'high');
        } else {
          optimizedMobilePic.querySelector('img').setAttribute('loading', 'lazy');
          optimizedMobilePic.querySelector('img').setAttribute('fetchpriority', 'low');
        }
        moveInstrumentation(mobileImageCell, optimizedMobilePic);
        carouselItem.append(optimizedMobilePic);
      }
    }

    // Content Wrapper
    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    if (headingCell && headingCell.textContent.trim()) {
      const heading = document.createElement('h1');
      heading.classList.add('koi-carousel-heading', 'text-sm-left');
      moveInstrumentation(headingCell, heading);
      heading.textContent = headingCell.textContent.trim();
      bannerContentWrapper.append(heading);
    }

    // Description
    if (descriptionCell && descriptionCell.textContent.trim()) {
      const description = document.createElement('div');
      description.classList.add('koi-carousel-description');
      moveInstrumentation(descriptionCell, description);
      while (descriptionCell.firstChild) {
        description.append(descriptionCell.firstChild);
      }
      bannerContentWrapper.append(description);
    }

    // CTA Link
    if (ctaLinkCell) {
      const ctaLinkFound = ctaLinkCell.querySelector('a');
      if (ctaLinkFound) {
        const cta = document.createElement('a');
        cta.classList.add('koi-carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
        cta.href = ctaLinkFound.href;
        cta.alt = (ctaLinkLabelCell && ctaLinkLabelCell.textContent.trim()) || ctaLinkFound.textContent.trim();
        cta.target = '_blank'; // Assuming all CTAs open in new tab from original HTML
        cta.textContent = (ctaLinkLabelCell && ctaLinkLabelCell.textContent.trim()) || ctaLinkFound.textContent.trim();

        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        cta.append(screenReaderSpan);

        moveInstrumentation(ctaLinkCell, cta);
        bannerContentWrapper.append(cta);
      }
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselWrapper.append(carouselIndicators, carouselInner);

  // Next and Previous Buttons
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

  // Implement carousel functionality manually
  const carouselItems = carouselInner.querySelectorAll('.carousel-item');
  let currentSlide = 0;

  function showSlide(index) {
    carouselItems.forEach((item, i) => {
      item.classList.remove('active');
      carouselIndicators.children[i].classList.remove('active');
      if (i === index) {
        item.classList.add('active');
        carouselIndicators.children[i].classList.add('active');
      }
    });
  }

  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    showSlide(currentSlide);
  });

  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    currentSlide = (currentSlide + 1) % carouselItems.length;
    showSlide(currentSlide);
  });

  carouselIndicators.querySelectorAll('li').forEach((indicator, index) => {
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
}
