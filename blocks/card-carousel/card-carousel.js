import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...itemRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  if (titleRow) {
    const title = document.createElement('h2');
    title.classList.add('card-carousel__title', 'font-24', 'leading-28', 'font-sm-40', 'leading-sm-50', 'text-dark-gray-100', 'text-center', 'font-baskerville');
    moveInstrumentation(titleRow, title);
    title.textContent = titleRow.textContent.trim();
    container.append(title);
  }

  if (subtitleRow) {
    const subtitle = document.createElement('p');
    subtitle.classList.add('card-carousel__subtitle', 'font-default', 'leading-24', 'font-sm-18', 'leading-sm-32', 'text-dark-gray-100', 'text-center', 'mt-4', 'fw-medium');
    moveInstrumentation(subtitleRow, subtitle);
    subtitle.textContent = subtitleRow.textContent.trim();
    container.append(subtitle);
  }

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'false');
  section.append(swiperContainer);

  const swiperWrapperOuter = document.createElement('div');
  swiperWrapperOuter.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperContainer.append(swiperWrapperOuter);

  const productCardsGrid = document.createElement('div');
  productCardsGrid.classList.add('product-cards__card-container', 'mx-4', 'mx-sm-0', 'overflow-hidden', 'add-margin', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperWrapperOuter.append(productCardsGrid);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');
  productCardsGrid.append(swiperWrapper);

  itemRows.forEach((row, index) => {
    const [
      cardThumbImageCell,
      cardThumbImageAltCell,
      cardTitleCell,
      cardMainImageCell,
      cardMainImageAltCell,
      cardMainImageLinkCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const card = document.createElement('div');
    card.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    if (index === 0) {
      card.classList.add('swiper-slide-active');
    } else if (index === 1) {
      card.classList.add('swiper-slide-next');
    }
    moveInstrumentation(row, card);

    const cardMedia = document.createElement('div');
    cardMedia.classList.add('product-cards__card-media', 'position-relative');
    card.append(cardMedia);

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');
    cardMedia.append(ratioWrapper);

    if (cardThumbImageCell) {
      const thumbPicture = cardThumbImageCell.querySelector('picture');
      if (thumbPicture) {
        const thumbImg = thumbPicture.querySelector('img');
        const optimizedThumbPic = createOptimizedPicture(thumbImg.src, cardThumbImageAltCell.textContent.trim(), false, [{ width: '750' }]);
        optimizedThumbPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
        moveInstrumentation(thumbImg, optimizedThumbPic.querySelector('img'));
        ratioWrapper.append(optimizedThumbPic);
      }
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    ratioWrapper.append(cardGradient);

    if (cardTitleCell) {
      const cardTitle = document.createElement('div');
      cardTitle.classList.add('product-cards__card-title', 'position-absolute', 'top-0', 'text-white', 'px-5', 'pt-4', 'text-cream-100', 'leading-32');
      moveInstrumentation(cardTitleCell, cardTitle); // Added moveInstrumentation for richtext cell
      cardTitle.innerHTML = cardTitleCell.innerHTML;
      cardMedia.append(cardTitle);
    }

    const cardImgWrapper = document.createElement('div');
    cardImgWrapper.classList.add('product-cards__card-img', 'pt-lg-8', 'pt-sm-6', 'pt-8', 'pb-3', 'bg-cream-300', 'position-absolute', 'start-50', 'top-100', 'rounded-top-circle');
    cardMedia.append(cardImgWrapper);

    const ratio1x1 = document.createElement('div');
    ratio1x1.classList.add('ratio', 'ratio-1x1');
    cardImgWrapper.append(ratio1x1);

    if (cardMainImageCell && cardMainImageLinkCell) {
      const mainImageLink = document.createElement('a');
      mainImageLink.classList.add('cta-analytics');
      const foundLink = cardMainImageLinkCell.querySelector('a');
      if (foundLink) {
        mainImageLink.href = foundLink.href;
      }

      const mainPicture = cardMainImageCell.querySelector('picture');
      if (mainPicture) {
        const mainImg = mainPicture.querySelector('img');
        const optimizedMainPic = createOptimizedPicture(mainImg.src, cardMainImageAltCell.textContent.trim(), false, [{ width: '750' }]);
        optimizedMainPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
        moveInstrumentation(mainImg, optimizedMainPic.querySelector('img'));
        mainImageLink.append(optimizedMainPic);
      }
      ratio1x1.append(mainImageLink);
    }

    if (ctaLinkCell && ctaLabelCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('mt-6', 'align-self-center');
      card.append(ctaWrapper);

      const ctaLink = document.createElement('a');
      ctaLink.classList.add('cta-analytics', 'svasti-cta', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
      const foundCtaLink = ctaLinkCell.querySelector('a');
      if (foundCtaLink) {
        ctaLink.href = foundCtaLink.href;
      }
      ctaLink.textContent = ctaLabelCell.textContent.trim();
      ctaWrapper.append(ctaLink);
    }

    swiperWrapper.append(card);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('card-carousel__swiper--prev', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'd-none', 'd-sm-flex', 'opacity-30');
  prevButton.setAttribute('disabled', '');
  const prevImg = document.createElement('img');
  // TODO: Replace with actual SVG loader or read from a model field if available
  prevImg.alt = 'Previous'; // Changed alt text to be more descriptive
  prevButton.append(prevImg);
  swiperWrapperOuter.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('card-carousel__swiper--next', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'end-0', 'd-none', 'd-sm-flex');
  const nextImg = document.createElement('img');
  // TODO: Replace with actual SVG loader or read from a model field if available
  nextImg.alt = 'Next'; // Changed alt text to be more descriptive
  nextButton.append(nextImg);
  swiperWrapperOuter.append(nextButton);

  const pagination = document.createElement('div');
  pagination.classList.add('card-carousel__swiper--pagination', 'mt-10', 'cursor-pointer', 'position-relative', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal', 'mx-auto', 'w-fit');
  swiperContainer.append(pagination);

  block.replaceChildren(section);

  // Image optimization for all pictures within the block
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Basic Swiper-like functionality (simplified for EDS)
  let currentIndex = 0;
  const slides = swiperWrapper.querySelectorAll('.swiper-slide');
  const totalSlides = slides.length;
  // Determine visible slides dynamically or from a responsive breakpoint config
  // For now, assuming 3 visible slides based on original HTML structure for desktop
  const getVisibleSlides = () => {
    // This is a simplified example. In a real scenario, you'd check window width
    // and apply different values based on breakpoints.
    if (window.innerWidth < 768) return 1; // Example for mobile
    return 3; // Example for desktop
  };

  function updateCarousel() {
    const visibleSlides = getVisibleSlides();
    const slideWidth = 100 / visibleSlides; // Percentage width for each visible slide

    slides.forEach((slide, i) => {
      slide.classList.remove('swiper-slide-active', 'swiper-slide-next');
      if (i === currentIndex) {
        slide.classList.add('swiper-slide-active');
      } else if (i === currentIndex + 1) {
        slide.classList.add('swiper-slide-next');
      }
      // Apply transform to shift the wrapper, not individual slides
      // Each slide should have a width defined by CSS (e.g., flex-basis: calc(100% / var(--visible-slides)))
      // For this simplified JS, we'll adjust the wrapper's transform
    });

    // Apply transform to the swiperWrapper to simulate sliding
    swiperWrapper.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    swiperWrapper.style.transition = 'transform 0.3s ease-in-out'; // Smooth transition

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= totalSlides - visibleSlides;

    // Update pagination
    pagination.innerHTML = '';
    const totalPages = Math.ceil(totalSlides / visibleSlides);
    for (let i = 0; i < totalPages; i += 1) {
      const bullet = document.createElement('span');
      bullet.classList.add('swiper-pagination-bullet');
      if (i === Math.floor(currentIndex / visibleSlides)) {
        bullet.classList.add('swiper-pagination-bullet-active', 'swiper-pagination-bullet-active-main');
      }
      bullet.addEventListener('click', () => {
        currentIndex = i * visibleSlides;
        updateCarousel();
      });
      pagination.append(bullet);
    }
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    if (currentIndex < totalSlides - visibleSlides) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  // Initial update and add resize listener for responsive carousel
  updateCarousel();
  window.addEventListener('resize', updateCarousel);
}
