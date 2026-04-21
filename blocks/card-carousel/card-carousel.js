import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...cardRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(containerDiv);

  if (titleRow) {
    const title = document.createElement('h2');
    title.classList.add('card-carousel__title', 'font-24', 'leading-28', 'font-sm-40', 'leading-sm-50', 'text-dark-gray-100', 'text-center', 'font-baskerville');
    moveInstrumentation(titleRow, title);
    title.textContent = titleRow.textContent.trim();
    containerDiv.append(title);
  }

  if (subtitleRow) {
    const subtitle = document.createElement('p');
    subtitle.classList.add('card-carousel__subtitle', 'font-default', 'leading-24', 'font-sm-18', 'leading-sm-32', 'text-dark-gray-100', 'text-center', 'mt-4', 'fw-medium');
    moveInstrumentation(subtitleRow, subtitle);
    subtitle.textContent = subtitleRow.textContent.trim();
    containerDiv.append(subtitle);
  }

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'false');
  section.append(swiperContainer);

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperContainer.append(swiperInnerContainer);

  const productCardsDiv = document.createElement('div');
  productCardsDiv.classList.add('product-cards__card-container', 'mx-4', 'mx-sm-0', 'overflow-hidden', 'add-margin');
  swiperInnerContainer.append(productCardsDiv);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');
  productCardsDiv.append(swiperWrapper);

  cardRows.forEach((row) => {
    const [backgroundImageCell, cardTitleCell, mainImageCell, mainImageLinkCell, ctaLinkCell] = [...row.children];

    const card = document.createElement('div');
    card.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    moveInstrumentation(row, card);
    swiperWrapper.append(card);

    const cardMedia = document.createElement('div');
    cardMedia.classList.add('product-cards__card-media', 'position-relative');
    card.append(cardMedia);

    const ratioDiv = document.createElement('div');
    ratioDiv.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');
    cardMedia.append(ratioDiv);

    const backgroundPicture = backgroundImageCell?.querySelector('picture');
    if (backgroundPicture) {
      const img = backgroundPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      ratioDiv.append(optimizedPic);
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    ratioDiv.append(cardGradient);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('product-cards__card-title', 'position-absolute', 'top-0', 'text-white', 'px-5', 'pt-4', 'text-cream-100', 'leading-32');
    if (cardTitleCell) {
      cardTitle.innerHTML = cardTitleCell.innerHTML;
    }
    cardMedia.append(cardTitle);

    const cardImgDiv = document.createElement('div');
    cardImgDiv.classList.add('product-cards__card-img', 'pt-lg-8', 'pt-sm-6', 'pt-8', 'pb-3', 'bg-cream-300', 'position-absolute', 'start-50', 'top-100', 'rounded-top-circle');
    cardMedia.append(cardImgDiv);

    const ratio1x1Div = document.createElement('div');
    ratio1x1Div.classList.add('ratio', 'ratio-1x1');
    cardImgDiv.append(ratio1x1Div);

    const mainImageLink = mainImageLinkCell?.querySelector('a');
    const mainImageAnchor = document.createElement('a');
    mainImageAnchor.classList.add('cta-analytics');
    if (mainImageLink) {
      mainImageAnchor.href = mainImageLink.href;
    }

    const mainPicture = mainImageCell?.querySelector('picture');
    if (mainPicture) {
      const img = mainPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mainImageAnchor.append(optimizedPic);
    }
    ratio1x1Div.append(mainImageAnchor);

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('mt-6', 'align-self-center');
    card.append(ctaWrapper);

    const ctaLink = ctaLinkCell?.querySelector('a');
    if (ctaLink) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.href = ctaLink.href;
      ctaAnchor.classList.add(
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
      // Read CTA text from the authored cell, not hardcoded
      ctaAnchor.textContent = ctaLink.textContent.trim();
      ctaWrapper.append(ctaAnchor);
    }
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('card-carousel__swiper--prev', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'd-none', 'd-sm-flex', 'opacity-30');
  prevButton.setAttribute('disabled', '');
  const prevImg = document.createElement('img');
  // Assuming the SVG for navigation buttons is either a site-wide asset or should be authored.
  // If it's authored, it would be in a dedicated cell. For now, we'll try to find it in the original block.
  // If not found, it's a gap in the model and should be requested.
  const originalPrevImg = block.querySelector('.card-carousel__swiper--prev img');
  if (originalPrevImg) {
    prevImg.src = originalPrevImg.src;
    prevImg.alt = originalPrevImg.alt;
  } else {
    // Fallback or placeholder if not found in authored content
    prevImg.alt = 'Previous';
    // If no authored content for this, and it's not a site-wide asset handled by CSS,
    // this would be a hardcoded asset, which is a violation.
    // For now, we'll leave it empty and assume it's either handled by CSS or needs a model field.
  }
  prevButton.append(prevImg);
  swiperInnerContainer.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('card-carousel__swiper--next', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'end-0', 'd-none', 'd-sm-flex');
  const nextImg = document.createElement('img');
  const originalNextImg = block.querySelector('.card-carousel__swiper--next img');
  if (originalNextImg) {
    nextImg.src = originalNextImg.src;
    nextImg.alt = originalNextImg.alt;
  } else {
    nextImg.alt = 'Next';
  }
  nextButton.append(nextImg);
  swiperInnerContainer.append(nextButton);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('card-carousel__swiper--pagination', 'mt-10', 'cursor-pointer', 'position-relative', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal', 'mx-auto', 'w-fit');
  // width: 140px is a style, not a class. Do not apply.
  swiperContainer.append(paginationDiv);

  block.replaceChildren(section);

  // Initialize Swiper (simplified for demonstration, full Swiper setup would be in a separate JS file)
  // This part is for visual representation, actual Swiper init would be in a client-side script.
  const initSwiper = async () => {
    const swiperModule = await import('../../scripts/swiper-bundle.min.js');
    const Swiper = swiperModule.default;

    const swiperEl = block.querySelector('.card-carousel__swiper');
    if (swiperEl) {
      // eslint-disable-next-line no-new
      new Swiper(swiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 32,
        loop: swiperEl.dataset.loop === 'true',
        navigation: {
          nextEl: swiperEl.querySelector('.card-carousel__swiper--next'),
          prevEl: swiperEl.querySelector('.card-carousel__swiper--prev'),
        },
        pagination: {
          el: swiperEl.querySelector('.card-carousel__swiper--pagination'),
          clickable: true,
        },
        breakpoints: {
          0: {
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 32,
          },
        },
      });
    }
  };
  initSwiper();
}
