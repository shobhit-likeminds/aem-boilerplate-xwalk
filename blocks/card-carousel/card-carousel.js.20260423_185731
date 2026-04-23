import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    prevButtonIconRow,
    nextButtonIconRow,
    ...cardRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  moveInstrumentation(titleRow, container); // Move instrumentation from titleRow

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
  // Use content detection for title cell
  const titleCell = [...titleRow.children].find((cell) => cell.textContent.trim() !== '');
  if (titleCell) {
    title.textContent = titleCell.textContent.trim();
  }
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
  // Use content detection for subtitle cell
  const subtitleCell = [...subtitleRow.children].find((cell) => cell.textContent.trim() !== '');
  if (subtitleCell) {
    subtitle.textContent = subtitleCell.textContent.trim();
  }
  moveInstrumentation(subtitleRow, subtitle); // Move instrumentation from subtitleRow
  container.append(subtitle);
  section.append(container);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const productCardsGrid = document.createElement('div');
  productCardsGrid.classList.add('productCards', 'aem-GridColumn', 'aem-GridColumn--default--12');

  const productCardsCardContainer = document.createElement('div');
  productCardsCardContainer.classList.add(
    'product-cards__card-container',
    'mx-4',
    'mx-sm-0',
    'overflow-hidden',
    'add-margin',
  );

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');

  cardRows.forEach((row) => {
    // Destructuring is correct here as per BlockJson for product-card item
    const [mainImageCell, titleRichCell, productImageCell, productLinkCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const card = document.createElement('div');
    card.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    moveInstrumentation(row, card); // Move instrumentation from each card row

    const cardMedia = document.createElement('div');
    cardMedia.classList.add('product-cards__card-media', 'position-relative');

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');

    const mainImagePicture = mainImageCell.querySelector('picture');
    if (mainImagePicture) {
      const img = mainImagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('product-cards__card-thumb', 'object-fit-cover');
      ratioWrapper.append(optimizedPic);
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    ratioWrapper.append(cardGradient);
    cardMedia.append(ratioWrapper);

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
    cardTitle.innerHTML = titleRichCell.innerHTML; // Correctly using innerHTML for richtext
    cardMedia.append(cardTitle);

    const cardProductImg = document.createElement('div');
    cardProductImg.classList.add(
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

    const productRatioWrapper = document.createElement('div');
    productRatioWrapper.classList.add('ratio', 'ratio-1x1');

    const productLink = document.createElement('a');
    productLink.classList.add('cta-analytics');
    const productLinkHref = productLinkCell.querySelector('a')?.href;
    if (productLinkHref) {
      productLink.href = productLinkHref;
    }

    const productImagePicture = productImageCell.querySelector('picture');
    if (productImagePicture) {
      const img = productImagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('w-100', 'h-100', 'object-fit-contain');
      productLink.append(optimizedPic);
    }
    productRatioWrapper.append(productLink);
    cardProductImg.append(productRatioWrapper);
    cardMedia.append(cardProductImg);
    card.append(cardMedia);

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

  productCardsCardContainer.append(swiperWrapper);
  productCardsGrid.append(productCardsCardContainer);
  swiperWrapperContainer.append(productCardsGrid);

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

  const prevIconPicture = prevButtonIconRow.querySelector('picture');
  if (prevIconPicture) {
    const img = prevIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    prevButton.append(optimizedPic);
  }
  swiperWrapperContainer.append(prevButton);

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

  const nextIconPicture = nextButtonIconRow.querySelector('picture');
  if (nextIconPicture) {
    const img = nextIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    nextButton.append(optimizedPic);
  }
  swiperWrapperContainer.append(nextButton);

  swiperContainer.append(swiperWrapperContainer);

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

  // Initialize Swiper
  import('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js').then((module) => {
    const Swiper = module.default;
    const swiperElement = block.querySelector('.card-carousel__swiper');

    // eslint-disable-next-line no-new
    new Swiper(swiperElement, {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: false,
      navigation: {
        nextEl: '.card-carousel__swiper--next',
        prevEl: '.card-carousel__swiper--prev',
      },
      pagination: {
        el: '.card-carousel__swiper--pagination',
        clickable: true,
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
      },
    });
  });

  // The block.querySelectorAll('picture > img').forEach loop is redundant
  // because createOptimizedPicture is already called for each image where needed.
  // Removing it to prevent double optimization and potential issues.
}
