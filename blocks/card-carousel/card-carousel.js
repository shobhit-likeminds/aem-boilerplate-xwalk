import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    viewAllLinkRow,
    viewAllLabelRow,
    ...itemRows
  ] = [...block.children];

  const mainContainer = document.createElement('section');
  mainContainer.classList.add('card-carousel');

  // Header: title + subtitle
  const headerDiv = document.createElement('div');
  headerDiv.classList.add('container', 'gx-8', 'gx-sm-0');
  mainContainer.append(headerDiv);

  const title = document.createElement('h2');
  title.classList.add(
    'card-carousel__title', 'font-24', 'leading-28', 'font-sm-40',
    'leading-sm-50', 'text-dark-gray-100', 'text-center', 'font-baskerville',
  );
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  headerDiv.append(title);

  const subtitle = document.createElement('p');
  subtitle.classList.add(
    'card-carousel__subtitle', 'font-default', 'leading-24', 'font-sm-18',
    'leading-sm-32', 'text-dark-gray-100', 'text-center', 'mt-4', 'fw-medium',
  );
  moveInstrumentation(subtitleRow, subtitle);
  subtitle.textContent = subtitleRow.textContent.trim();
  headerDiv.append(subtitle);

  // Swiper outer wrapper
  const swiperOuter = document.createElement('div');
  swiperOuter.classList.add('card-carousel__swiper', 'container', 'gx-0');
  mainContainer.append(swiperOuter);

  const swiperInner = document.createElement('div');
  swiperInner.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperOuter.append(swiperInner);

  // Swiper element — Swiper.js is initialized on this element
  const cardContainer = document.createElement('div');
  cardContainer.classList.add(
    'product-cards__card-container', 'mx-4', 'mx-sm-0', 'overflow-hidden', 'add-margin',
  );
  swiperInner.append(cardContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');
  cardContainer.append(swiperWrapper);

  // Build product card slides
  itemRows.filter((row) => row.children.length >= 5).forEach((row) => {
    const [
      productLinkCell,
      backgroundImageCell,
      backgroundImageAltCell,
      cardTitleCell,
      productImageCell,
      productImageAltCell,
      ctaLabelCell,
    ] = [...row.children];

    const productHref = productLinkCell?.querySelector('a')?.href || '#';

    const slide = document.createElement('div');
    slide.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    moveInstrumentation(row, slide);
    swiperWrapper.append(slide);

    // Card media: background image + gradient + title overlay + product circle image
    const cardMedia = document.createElement('div');
    cardMedia.classList.add('product-cards__card-media', 'position-relative');
    slide.append(cardMedia);

    const bgRatioDiv = document.createElement('div');
    bgRatioDiv.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');
    cardMedia.append(bgRatioDiv);

    const bgImgPicture = backgroundImageCell?.querySelector('picture');
    if (bgImgPicture) {
      const bgImg = bgImgPicture.querySelector('img');
      const bgAlt = backgroundImageAltCell?.textContent.trim() || bgImg?.alt || '';
      const optimizedBg = createOptimizedPicture(bgImg.src, bgAlt, false, [{ width: '750' }]);
      optimizedBg.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
      bgRatioDiv.append(optimizedBg);
    }

    const gradient = document.createElement('div');
    gradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    bgRatioDiv.append(gradient);

    // Title overlay (richtext — preserve inner HTML)
    const cardTitleDiv = document.createElement('div');
    cardTitleDiv.classList.add(
      'product-cards__card-title', 'position-absolute', 'top-0',
      'text-white', 'px-5', 'pt-4', 'text-cream-100', 'leading-32',
    );
    cardTitleDiv.innerHTML = cardTitleCell?.innerHTML || '';
    cardMedia.append(cardTitleDiv);

    // Circular product image pinned at bottom of background image
    const productImgDiv = document.createElement('div');
    productImgDiv.classList.add(
      'product-cards__card-img', 'pt-lg-8', 'pt-sm-6', 'pt-8', 'pb-3',
      'bg-cream-300', 'position-absolute', 'start-50', 'top-100', 'rounded-top-circle',
    );
    cardMedia.append(productImgDiv);

    const productRatio = document.createElement('div');
    productRatio.classList.add('ratio', 'ratio-1x1');
    productImgDiv.append(productRatio);

    const productImgLink = document.createElement('a');
    productImgLink.classList.add('cta-analytics');
    productImgLink.href = productHref;
    productRatio.append(productImgLink);

    const productImgPicture = productImageCell?.querySelector('picture');
    if (productImgPicture) {
      const productImg = productImgPicture.querySelector('img');
      const productAlt = productImageAltCell?.textContent.trim() || productImg?.alt || '';
      const optimizedProduct = createOptimizedPicture(productImg.src, productAlt, false, [{ width: '400' }]);
      optimizedProduct.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
      productImgLink.append(optimizedProduct);
    }

    // CTA button
    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('mt-6', 'align-self-center');
    slide.append(ctaDiv);

    const ctaLink = document.createElement('a');
    ctaLink.href = productHref;
    ctaLink.classList.add(
      'cta-analytics', 'svasti-cta', 'w-fit', 'text-decoration-none',
      'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3',
      'text-cream-100', 'border', 'border-2', 'border-red-100',
      'border-maroon-100-hover', 'border-red-300-active',
      'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active',
    );
    ctaLink.textContent = ctaLabelCell?.textContent.trim() || 'Explore More';
    ctaDiv.append(ctaLink);
  });

  // Prev/Next navigation buttons
  const prevBtn = document.createElement('button');
  prevBtn.classList.add(
    'card-carousel__swiper--prev', 'card-carousel__navigation', 'cursor-pointer',
    'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover',
    'justify-content-center', 'align-items-center', 'position-absolute',
    'd-none', 'd-sm-flex',
  );
  prevBtn.setAttribute('aria-label', 'Previous');
  const prevSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  prevSvg.classList.add('icon', 'w-100', 'h-100');
  const prevUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  prevUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/etc.clientlibs/svasti/clientlibs/clientlib-site/resources/images/sprite/sprite.svg#arrow_right_carousel');
  prevSvg.append(prevUse);
  prevBtn.append(prevSvg);
  swiperInner.append(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.classList.add(
    'card-carousel__swiper--next', 'card-carousel__navigation', 'cursor-pointer',
    'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover',
    'justify-content-center', 'align-items-center', 'position-absolute',
    'end-0', 'd-none', 'd-sm-flex',
  );
  nextBtn.setAttribute('aria-label', 'Next');
  const nextSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  nextSvg.classList.add('icon', 'w-100', 'h-100');
  const nextUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  nextUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/etc.clientlibs/svasti/clientlibs/clientlib-site/resources/images/sprite/sprite.svg#arrow_right_carousel');
  nextSvg.append(nextUse);
  nextBtn.append(nextSvg);
  swiperInner.append(nextBtn);

  // Pagination
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add(
    'card-carousel__swiper--pagination', 'mt-10', 'cursor-pointer',
    'position-relative', 'swiper-pagination-clickable',
    'swiper-pagination-bullets', 'swiper-pagination-horizontal',
    'mx-auto', 'w-fit',
  );
  swiperOuter.append(paginationDiv);

  // View All CTA
  const viewAllWrapper = document.createElement('div');
  viewAllWrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');
  mainContainer.append(viewAllWrapper);

  const viewAllLink = document.createElement('a');
  viewAllLink.classList.add(
    'svasti-cta', 'cta-analytics', 'w-fit', 'text-decoration-none',
    'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3',
    'text-cream-100', 'border', 'border-2', 'border-red-100',
    'border-maroon-100-hover', 'border-red-300-active',
    'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active',
  );
  viewAllLink.href = viewAllLinkRow?.querySelector('a')?.href || '#';
  moveInstrumentation(viewAllLinkRow, viewAllLink);
  viewAllWrapper.append(viewAllLink);

  const viewAllLabelSpan = document.createElement('span');
  viewAllLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  viewAllLabelSpan.textContent = viewAllLabelRow?.textContent.trim() || '';
  moveInstrumentation(viewAllLabelRow, viewAllLabelSpan);
  viewAllLink.append(viewAllLabelSpan);

  block.replaceChildren(mainContainer);

  // Load Swiper from CDN and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(cardContainer, {
    slidesPerView: 1.4,
    spaceBetween: 32,
    loop: false,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: paginationDiv,
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 2.5 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });
}
