import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    navPrevIconRow,
    navNextIconRow,
    ...productRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');
  moveInstrumentation(block, section);

  // Title and Subtitle container
  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  if (titleRow) {
    const title = document.createElement('h2');
    title.classList.add(
      'card-carousel__title',
      'font-24',
      'leading-28',
      'font-sm-40',
      'leading-sm-50',
      'text-dark-gray-100',
      'text-center',
      'font-baskerville',
    );
    moveInstrumentation(titleRow, title);
    title.textContent = titleRow.textContent.trim();
    container.append(title);
  }

  if (subtitleRow) {
    const subtitle = document.createElement('p');
    subtitle.classList.add(
      'card-carousel__subtitle',
      'font-default',
      'leading-24',
      'font-sm-18',
      'leading-sm-32',
      'text-dark-gray-100',
      'text-center',
      'mt-4',
      'fw-medium',
    );
    moveInstrumentation(subtitleRow, subtitle);
    subtitle.textContent = subtitleRow.textContent.trim();
    container.append(subtitle);
  }

  // Swiper container
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add(
    'card-carousel__swiper',
    'swiper',
    'container',
    'gx-0',
  );
  swiperContainer.setAttribute('data-loop', 'false');
  section.append(swiperContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperContainer.append(swiperWrapper);

  const productCardsContainer = document.createElement('div');
  productCardsContainer.classList.add(
    'product-cards__card-container',
    'mx-4',
    'mx-sm-0',
    'overflow-hidden',
    'add-margin',
  );
  swiperWrapper.append(productCardsContainer);

  const swiperSlideWrapper = document.createElement('div');
  swiperSlideWrapper.classList.add('swiper-wrapper', 'slide-in-anim');
  productCardsContainer.append(swiperSlideWrapper);

  productRows.forEach((row) => {
    const [
      mainImageCell,
      titleRichCell,
      productImageCell,
      productLinkCell,
      ctaLabelCell,
      ctaLinkCell,
    ] = [...row.children];

    const productCard = document.createElement('div');
    productCard.classList.add(
      'product-cards__card',
      'swiper-slide',
      'd-flex',
      'flex-column',
      'cursor-pointer',
    );
    moveInstrumentation(row, productCard);

    const cardMedia = document.createElement('div');
    cardMedia.classList.add('product-cards__card-media', 'position-relative');
    productCard.append(cardMedia);

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add(
      'ratio',
      'ratio-3x4',
      'position-relative',
      'product-cards__card-video-wrapper',
    );
    cardMedia.append(ratioWrapper);

    // Main Product Image (Background)
    const mainPicture = mainImageCell?.querySelector('picture');
    if (mainPicture) {
      const img = mainPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
      moveInstrumentation(mainImageCell, optimizedPic.querySelector('img'));
      ratioWrapper.append(optimizedPic);
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add(
      'card-gradient',
      'position-absolute',
      'top-0',
      'bottom-0',
      'start-0',
      'end-0',
    );
    ratioWrapper.append(cardGradient);

    // Product Title Rich Text
    if (titleRichCell) {
      const cardTitle = document.createElement('div');
      cardTitle.classList.add(
        'product-cards__card-title',
        'position-absolute',
        'top-0',
        'text-white',
        'px-5',
        'pt-4',
        'text-cream-100',
        'leading-32',
      );
      cardTitle.innerHTML = titleRichCell.innerHTML;
      cardMedia.append(cardTitle);
    }

    // Product Image (Foreground/Packshot)
    const productImageWrapper = document.createElement('div');
    productImageWrapper.classList.add(
      'product-cards__card-img',
      'pt-lg-8',
      'pt-sm-6',
      'pt-8',
      'pb-3',
      'bg-cream-300',
      'position-absolute',
      'start-50',
      'top-100',
      'rounded-top-circle',
    );
    cardMedia.append(productImageWrapper);

    const ratio1x1 = document.createElement('div');
    ratio1x1.classList.add('ratio', 'ratio-1x1');
    productImageWrapper.append(ratio1x1);

    const productLink = document.createElement('a');
    productLink.classList.add('cta-analytics');
    const foundProductLink = productLinkCell?.querySelector('a');
    if (foundProductLink) {
      productLink.href = foundProductLink.href;
    }
    moveInstrumentation(productLinkCell, productLink);

    const productPicture = productImageCell?.querySelector('picture');
    if (productPicture) {
      const img = productPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
      moveInstrumentation(productImageCell, optimizedPic.querySelector('img'));
      productLink.append(optimizedPic);
    }
    ratio1x1.append(productLink);

    // CTA Link
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('mt-6', 'align-self-center');
    productCard.append(ctaWrapper);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add(
      'cta-analytics',
      'svasti-cta',
      'w-fit',
      'text-decoration-none',
      'd-flex',
      'align-items-center',
      'primary',
      'px-8',
      'pb-3',
      'text-cream-100',
      'border',
      'border-2',
      'border-red-100',
      'border-maroon-100-hover',
      'border-red-300-active',
      'bg-red-100',
      'bg-maroon-100-hover',
      'bg-red-300-active',
    );
    const foundCtaLink = ctaLinkCell?.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
    }
    ctaLink.textContent = ctaLabelCell?.textContent.trim() || '';
    moveInstrumentation(ctaLinkCell, ctaLink);
    ctaWrapper.append(ctaLink);

    swiperSlideWrapper.append(productCard);
  });

  // Navigation buttons
  const prevButton = document.createElement('button');
  prevButton.classList.add(
    'card-carousel__swiper--prev',
    'card-carousel__navigation',
    'cursor-pointer',
    'rounded-circle',
    'bg-transparent',
    'text-red-100',
    'text-maroon-600-hover',
    'justify-content-center',
    'align-items-center',
    'position-absolute',
    'd-none',
    'd-sm-flex',
    'opacity-30',
  );
  prevButton.disabled = true; // Initial state
  if (navPrevIconRow) {
    const prevIconPicture = navPrevIconRow.querySelector('picture');
    if (prevIconPicture) {
      const img = prevIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
      moveInstrumentation(navPrevIconRow, optimizedPic.querySelector('img'));
      prevButton.append(optimizedPic);
    }
  }
  swiperWrapper.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add(
    'card-carousel__swiper--next',
    'card-carousel__navigation',
    'cursor-pointer',
    'rounded-circle',
    'bg-transparent',
    'text-red-100',
    'text-maroon-600-hover',
    'justify-content-center',
    'align-items-center',
    'position-absolute',
    'end-0',
    'd-none',
    'd-sm-flex',
  );
  if (navNextIconRow) {
    const nextIconPicture = navNextIconRow.querySelector('picture');
    if (nextIconPicture) {
      const img = nextIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
      moveInstrumentation(navNextIconRow, optimizedPic.querySelector('img'));
      nextButton.append(optimizedPic);
    }
  }
  swiperWrapper.append(nextButton);

  // Pagination
  const pagination = document.createElement('div');
  pagination.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    'swiper-pagination-clickable',
    'swiper-pagination-bullets',
    'swiper-pagination-horizontal',
    'mx-auto',
    'w-fit',
  );
  swiperContainer.append(pagination);

  block.replaceChildren(section);

  // Swiper initialization (simplified for EDS, full Swiper logic would be in a separate JS)
  let currentIndex = 0;
  const slides = [...swiperSlideWrapper.children];
  const totalSlides = slides.length;
  const slidesPerView = 3; // Assuming 3 visible slides on desktop based on original HTML

  // Add swiper-initialized and swiper-horizontal classes dynamically
  productCardsContainer.classList.add('swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');


  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.style.display = 'none';
      if (i >= currentIndex && i < currentIndex + slidesPerView) {
        slide.style.display = 'flex';
        // Add swiper-slide-active for the active slides
        if (i === currentIndex) {
          slide.classList.add('swiper-slide-active');
        } else if (i === currentIndex + 1) {
          slide.classList.add('swiper-slide-next');
        } else {
          slide.classList.remove('swiper-slide-active', 'swiper-slide-next');
        }
      } else {
        slide.classList.remove('swiper-slide-active', 'swiper-slide-next');
      }
    });

    prevButton.disabled = currentIndex === 0;
    prevButton.classList.toggle('opacity-30', currentIndex === 0);
    nextButton.disabled = currentIndex >= totalSlides - slidesPerView;
    nextButton.classList.toggle('opacity-30', currentIndex >= totalSlides - slidesPerView);

    // Update pagination (basic implementation)
    pagination.innerHTML = '';
    for (let i = 0; i < totalSlides - slidesPerView + 1; i += 1) {
      const bullet = document.createElement('span');
      bullet.classList.add('swiper-pagination-bullet');
      if (i === currentIndex) {
        bullet.classList.add('swiper-pagination-bullet-active', 'swiper-pagination-bullet-active-main');
      }
      bullet.addEventListener('click', () => {
        currentIndex = i;
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
    if (currentIndex < totalSlides - slidesPerView) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  updateCarousel(); // Initial render
}
