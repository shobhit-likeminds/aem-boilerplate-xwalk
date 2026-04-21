import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...cardRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');

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

  section.append(container);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'false');

  const swiperWrapperOuter = document.createElement('div');
  swiperWrapperOuter.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const productCardsContainer = document.createElement('div');
  productCardsContainer.classList.add(
    'product-cards__card-container',
    'mx-4',
    'mx-sm-0',
    'overflow-hidden',
    'add-margin',
    'swiper-initialized',
    'swiper-horizontal',
    'swiper-backface-hidden',
  );

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');

  cardRows.forEach((row) => {
    const [mainImageCell, cardTitleCell, thumbnailImageCell, productLinkCell, ctaLabelCell, ctaLinkCell] = [...row.children];

    const card = document.createElement('div');
    card.classList.add(
      'product-cards__card',
      'swiper-slide',
      'd-flex',
      'flex-column',
      'cursor-pointer',
    );
    moveInstrumentation(row, card);

    const media = document.createElement('div');
    media.classList.add('product-cards__card-media', 'position-relative');

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');

    const mainImagePicture = mainImageCell.querySelector('picture');
    if (mainImagePicture) {
      const mainImg = mainImagePicture.querySelector('img');
      if (mainImg) {
        const optimizedMainPic = createOptimizedPicture(mainImg.src, mainImg.alt, false, [{ width: '750' }]);
        optimizedMainPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
        ratioWrapper.append(optimizedMainPic);
      }
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    ratioWrapper.append(cardGradient);
    media.append(ratioWrapper);

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
    cardTitle.innerHTML = cardTitleCell.innerHTML;
    media.append(cardTitle);

    const cardImgWrapper = document.createElement('div');
    cardImgWrapper.classList.add(
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

    const ratio1x1 = document.createElement('div');
    ratio1x1.classList.add('ratio', 'ratio-1x1');

    const productLink = document.createElement('a');
    productLink.classList.add('cta-analytics');
    const productLinkHref = productLinkCell.querySelector('a')?.href;
    if (productLinkHref) {
      productLink.href = productLinkHref;
    }

    const thumbnailImagePicture = thumbnailImageCell.querySelector('picture');
    if (thumbnailImagePicture) {
      const thumbnailImg = thumbnailImagePicture.querySelector('img');
      if (thumbnailImg) {
        const optimizedThumbnailPic = createOptimizedPicture(thumbnailImg.src, thumbnailImg.alt, false, [{ width: '750' }]);
        optimizedThumbnailPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
        productLink.append(optimizedThumbnailPic);
      }
    }
    ratio1x1.append(productLink);
    cardImgWrapper.append(ratio1x1);
    media.append(cardImgWrapper);
    card.append(media);

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('mt-6', 'align-self-center');

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
    const ctaLinkHref = ctaLinkCell.querySelector('a')?.href;
    if (ctaLinkHref) {
      ctaLink.href = ctaLinkHref;
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    ctaWrapper.append(ctaLink);
    card.append(ctaWrapper);

    swiperWrapper.append(card);
  });

  productCardsContainer.append(swiperWrapper);
  swiperWrapperOuter.append(productCardsContainer);

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
  prevButton.disabled = true;
  const prevImg = document.createElement('img');
  prevImg.alt = 'svg file';
  // TODO: The icon path should be authored, not hardcoded. Add a field to the model for this.
  prevImg.src = '/icons/arrow-left.svg';
  prevButton.append(prevImg);
  swiperWrapperOuter.append(prevButton);

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
  const nextImg = document.createElement('img');
  nextImg.alt = 'svg file';
  // TODO: The icon path should be authored, not hardcoded. Add a field to the model for this.
  nextImg.src = '/icons/arrow-right.svg';
  nextButton.append(nextImg);
  swiperWrapperOuter.append(nextButton);

  swiperContainer.append(swiperWrapperOuter);

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

  section.append(swiperContainer);

  block.replaceChildren(section);

  // Swiper initialization (simplified, full Swiper logic would be in a separate script)
  let currentIndex = 0;
  const slides = [...swiperWrapper.children];
  // Calculate slideWidth dynamically, considering potential margins.
  // This assumes all slides have the same width and margin.
  // A more robust solution might involve a ResizeObserver or Swiper's internal calculations.
  const firstSlide = slides[0];
  let slideWidth = 0;
  if (firstSlide) {
    const slideStyle = window.getComputedStyle(firstSlide);
    const marginRight = parseFloat(slideStyle.marginRight);
    slideWidth = firstSlide.offsetWidth + marginRight;
  }

  function updateCarousel() {
    swiperWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= slides.length - 1;

    // Update pagination bullets (simplified)
    pagination.innerHTML = '';
    slides.forEach((_, i) => {
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
    });
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Initial update to set correct state
  updateCarousel();

  // Optional: Add a resize listener to recalculate slideWidth if layout changes
  window.addEventListener('resize', () => {
    if (slides[0]) {
      const slideStyle = window.getComputedStyle(slides[0]);
      const marginRight = parseFloat(slideStyle.marginRight);
      slideWidth = slides[0].offsetWidth + marginRight;
      updateCarousel(); // Re-render carousel position based on new width
    }
  });
}
