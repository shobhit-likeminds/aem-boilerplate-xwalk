import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import Swiper from '../../scripts/swiper-bundle.min.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...cardRows] = [...block.children];

  // Create container for title and subtitle
  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  moveInstrumentation(block, container);

  // Title
  const title = document.createElement('h2');
  title.classList.add('card-carousel__title', 'font-24', 'leading-28', 'font-sm-40', 'leading-sm-50', 'text-dark-gray-100', 'text-center', 'font-baskerville');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.firstElementChild.textContent.trim();
  container.append(title);

  // Subtitle
  const subtitle = document.createElement('p');
  subtitle.classList.add('card-carousel__subtitle', 'font-default', 'leading-24', 'font-sm-18', 'leading-sm-32', 'text-dark-gray-100', 'text-center', 'mt-4', 'fw-medium');
  moveInstrumentation(subtitleRow, subtitle);
  subtitle.textContent = subtitleRow.firstElementChild.textContent.trim();
  container.append(subtitle);

  // Card carousel swiper container
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'false');

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperContainer.append(swiperWrapperContainer);

  const productCardsContainer = document.createElement('div');
  productCardsContainer.classList.add('product-cards__card-container', 'mx-4', 'mx-sm-0', 'overflow-hidden', 'add-margin');
  swiperWrapperContainer.append(productCardsContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');
  productCardsContainer.append(swiperWrapper);

  cardRows.forEach((row) => {
    const [thumbImageCell, cardTitleCell, productImageCell, productLinkCell, productLinkLabelCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const card = document.createElement('div');
    card.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    moveInstrumentation(row, card);

    const cardMedia = document.createElement('div');
    cardMedia.classList.add('product-cards__card-media', 'position-relative');
    card.append(cardMedia);

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');
    cardMedia.append(ratioWrapper);

    // Thumb Image
    const thumbPicture = thumbImageCell.querySelector('picture');
    if (thumbPicture) {
      const thumbImg = thumbPicture.querySelector('img');
      const optimizedThumbPic = createOptimizedPicture(thumbImg.src, thumbImg.alt, false, [{ width: '750' }]);
      optimizedThumbPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
      moveInstrumentation(thumbImageCell, optimizedThumbPic.querySelector('img'));
      ratioWrapper.append(optimizedThumbPic);
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    ratioWrapper.append(cardGradient);

    // Card Title
    const cardTitle = document.createElement('div');
    cardTitle.classList.add('product-cards__card-title', 'position-absolute', 'top-0', 'text-white', 'px-5', 'pt-4', 'text-cream-100', 'leading-32');
    moveInstrumentation(cardTitleCell, cardTitle);
    cardTitle.innerHTML = cardTitleCell.innerHTML;
    cardMedia.append(cardTitle);

    const cardProductImgWrapper = document.createElement('div');
    cardProductImgWrapper.classList.add('product-cards__card-img', 'pt-lg-8', 'pt-sm-6', 'pt-8', 'pb-3', 'bg-cream-300', 'position-absolute', 'start-50', 'top-100', 'rounded-top-circle');
    cardMedia.append(cardProductImgWrapper);

    const ratio1x1 = document.createElement('div');
    ratio1x1.classList.add('ratio', 'ratio-1x1');
    cardProductImgWrapper.append(ratio1x1);

    // Product Link and Image
    const productLinkAnchor = document.createElement('a');
    productLinkAnchor.classList.add('cta-analytics');
    const foundProductLink = productLinkCell.querySelector('a');
    if (foundProductLink) {
      productLinkAnchor.href = foundProductLink.href;
    }
    moveInstrumentation(productLinkCell, productLinkAnchor);

    const productPicture = productImageCell.querySelector('picture');
    if (productPicture) {
      const productImg = productPicture.querySelector('img');
      const optimizedProductPic = createOptimizedPicture(productImg.src, productImg.alt, false, [{ width: '750' }]);
      optimizedProductPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
      moveInstrumentation(productImageCell, optimizedProductPic.querySelector('img'));
      productLinkAnchor.append(optimizedProductPic);
    }
    ratio1x1.append(productLinkAnchor);

    // CTA Link
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('mt-6', 'align-self-center');
    card.append(ctaWrapper);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('cta-analytics', 'svasti-cta', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
    }
    ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
    moveInstrumentation(ctaLinkCell, ctaLink);
    ctaWrapper.append(ctaLink);

    swiperWrapper.append(card);

    // Add click listener to the entire card
    card.addEventListener('click', () => {
      if (foundCtaLink && foundCtaLink.href) {
        window.location.href = foundCtaLink.href;
      }
    });
  });

  // Navigation buttons (prev/next)
  const prevButton = document.createElement('button');
  prevButton.classList.add('card-carousel__swiper--prev', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'd-none', 'd-sm-flex', 'opacity-30');
  prevButton.innerHTML = '<img alt="svg file" src="/icons/arrow.svg"/>'; // Assuming a generic arrow icon
  swiperWrapperContainer.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('card-carousel__swiper--next', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'end-0', 'd-none', 'd-sm-flex');
  nextButton.innerHTML = '<img alt="svg file" src="/icons/arrow.svg"/>'; // Assuming a generic arrow icon
  swiperWrapperContainer.append(nextButton);

  // Pagination
  const pagination = document.createElement('div');
  pagination.classList.add('card-carousel__swiper--pagination', 'mt-10', 'cursor-pointer', 'position-relative', 'mx-auto', 'w-fit');
  swiperContainer.append(pagination);

  block.textContent = '';
  block.append(container, swiperContainer);

  // Initialize Swiper
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(swiperContainer, {
    slidesPerView: 1,
    spaceBetween: 32,
    loop: swiperContainer.dataset.loop === 'true',
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
    },
    pagination: {
      el: pagination,
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
