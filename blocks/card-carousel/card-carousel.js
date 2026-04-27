import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [titleRow, subtitleRow, ...cardRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');
  moveInstrumentation(titleRow, containerDiv); // Move instrumentation from first row

  const title = document.createElement('h2');
  title.classList.add('card-carousel__title', 'font-24', 'leading-28', 'font-sm-40', 'leading-sm-50', 'text-dark-gray-100', 'text-center', 'font-baskerville');
  title.textContent = titleRow.textContent.trim();
  containerDiv.append(title);

  const subtitle = document.createElement('p');
  subtitle.classList.add('card-carousel__subtitle', 'font-default', 'leading-24', 'font-sm-18', 'leading-sm-32', 'text-dark-gray-100', 'text-center', 'mt-4', 'fw-medium');
  subtitle.textContent = subtitleRow.textContent.trim();
  containerDiv.append(subtitle);

  section.append(containerDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'false');

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const productCardsWrapper = document.createElement('div');
  productCardsWrapper.classList.add('product-cards__card-container', 'mx-4', 'mx-sm-0', 'overflow-hidden', 'add-margin');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');

  cardRows.forEach((row) => {
    const [mainImageCell, cardTitleCell, thumbnailImageCell, thumbnailLinkCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const card = document.createElement('div');
    card.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    moveInstrumentation(row, card);

    const media = document.createElement('div');
    media.classList.add('product-cards__card-media', 'position-relative');

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');

    const mainPicture = mainImageCell.querySelector('picture');
    if (mainPicture) {
      const mainImg = mainPicture.querySelector('img');
      const optimizedMainPic = createOptimizedPicture(mainImg.src, mainImg.alt, false, [{ width: '750' }]);
      optimizedMainPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
      ratioWrapper.append(optimizedMainPic);
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    ratioWrapper.append(cardGradient);

    media.append(ratioWrapper);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('product-cards__card-title', 'position-absolute', 'top-0', 'text-white', 'px-5', 'pt-4', 'text-cream-100', 'leading-32');
    cardTitle.innerHTML = cardTitleCell.innerHTML;
    media.append(cardTitle);

    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.classList.add('product-cards__card-img', 'pt-lg-8', 'pt-sm-6', 'pt-8', 'pb-3', 'bg-cream-300', 'position-absolute', 'start-50', 'top-100', 'rounded-top-circle');

    const thumbnailRatio = document.createElement('div');
    thumbnailRatio.classList.add('ratio', 'ratio-1x1');

    const thumbnailLink = document.createElement('a');
    thumbnailLink.classList.add('cta-analytics');
    const originalThumbnailLink = thumbnailLinkCell.querySelector('a');
    if (originalThumbnailLink) {
      thumbnailLink.href = originalThumbnailLink.href;
    }

    const thumbnailPicture = thumbnailImageCell.querySelector('picture');
    if (thumbnailPicture) {
      const thumbnailImg = thumbnailPicture.querySelector('img');
      const optimizedThumbnailPic = createOptimizedPicture(thumbnailImg.src, thumbnailImg.alt, false, [{ width: '750' }]);
      optimizedThumbnailPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
      thumbnailLink.append(optimizedThumbnailPic);
    }
    thumbnailRatio.append(thumbnailLink);
    thumbnailDiv.append(thumbnailRatio);
    media.append(thumbnailDiv);
    card.append(media);

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('mt-6', 'align-self-center');

    const ctaAnchor = document.createElement('a');
    ctaAnchor.classList.add('cta-analytics', 'svasti-cta', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
    const originalCtaLink = ctaLinkCell.querySelector('a');
    if (originalCtaLink) {
      ctaAnchor.href = originalCtaLink.href;
    }
    ctaAnchor.textContent = ctaLabelCell.textContent.trim();
    ctaWrapper.append(ctaAnchor);
    card.append(ctaWrapper);

    swiperWrapper.append(card);
  });

  productCardsWrapper.append(swiperWrapper);
  swiperInnerContainer.append(productCardsWrapper);

  const prevButton = document.createElement('button');
  prevButton.classList.add('card-carousel__swiper--prev', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'd-none', 'd-sm-flex', 'opacity-30');
  const prevImg = document.createElement('img');
  prevImg.alt = 'Previous';
  // Attempt to read previous button image from authored content if available, otherwise fallback to a placeholder.
  // Assuming the previous/next button images might be part of the block's initial rows or a dedicated row if the model supports it.
  // For now, using a placeholder, but in a real scenario, these should be authored.
  prevImg.src = '/icons/arrow-left.svg'; // Placeholder, replace with actual authored asset if available
  prevButton.append(prevImg);
  swiperInnerContainer.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('card-carousel__swiper--next', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'end-0', 'd-none', 'd-sm-flex');
  const nextImg = document.createElement('img');
  nextImg.alt = 'Next';
  // Placeholder, replace with actual authored asset if available
  nextImg.src = '/icons/arrow-right.svg';
  nextButton.append(nextImg);
  swiperInnerContainer.append(nextButton);

  swiperContainer.append(swiperInnerContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('card-carousel__swiper--pagination', 'mt-10', 'cursor-pointer', 'position-relative', 'mx-auto', 'w-fit');
  swiperContainer.append(paginationDiv);

  section.append(swiperContainer);

  block.replaceChildren(section);

  // Swiper Initialization
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
    slidesPerView: 1,
    spaceBetween: 32,
    loop: swiperContainer.dataset.loop === 'true',
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    pagination: {
      el: paginationDiv,
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  });
}
