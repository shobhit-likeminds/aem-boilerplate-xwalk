import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...productCardRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');

  const title = document.createElement('h2');
  moveInstrumentation(titleRow, title);
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
  title.textContent = titleRow.textContent.trim();
  container.append(title);

  const subtitle = document.createElement('p');
  moveInstrumentation(subtitleRow, subtitle);
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
  subtitle.textContent = subtitleRow.textContent.trim();
  container.append(subtitle);
  section.append(container);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'false');

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

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

  productCardRows.forEach((row) => {
    const [
      mainImageCell,
      cardTitleCell,
      secondaryImageCell,
      productLinkCell,
      ctaLabelCell,
      ctaLinkCell,
    ] = [...row.children];

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
    ratioWrapper.classList.add(
      'ratio',
      'ratio-3x4',
      'position-relative',
      'product-cards__card-video-wrapper',
    );

    const mainPicture = mainImageCell.querySelector('picture');
    if (mainPicture) {
      const img = mainPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
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

    const cardImg = document.createElement('div');
    cardImg.classList.add(
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

    const productLinkAnchor = document.createElement('a');
    productLinkAnchor.classList.add('cta-analytics');
    const productLink = productLinkCell.querySelector('a');
    if (productLink) {
      productLinkAnchor.href = productLink.href;
    }

    const secondaryPicture = secondaryImageCell.querySelector('picture');
    if (secondaryPicture) {
      const img = secondaryPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
      productLinkAnchor.append(optimizedPic);
    }
    ratio1x1.append(productLinkAnchor);
    cardImg.append(ratio1x1);
    media.append(cardImg);
    card.append(media);

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('mt-6', 'align-self-center');

    const ctaAnchor = document.createElement('a');
    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      ctaAnchor.href = ctaLink.href;
    }
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
    ctaAnchor.textContent = ctaLabelCell.textContent.trim();
    ctaWrapper.append(ctaAnchor);
    card.append(ctaWrapper);

    swiperWrapper.append(card);
  });

  productCardsContainer.append(swiperWrapper);
  swiperInnerContainer.append(productCardsContainer);

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
  // TODO: The original HTML uses a hardcoded SVG path here.
  // If this SVG is authored, a new 'prevButtonIcon' field of type 'reference'
  // should be added to the model. For now, using a generic icon path.
  prevImg.alt = 'Previous';
  prevImg.src = '/icons/arrow-left.svg'; // Using a generic icon path
  prevButton.append(prevImg);
  swiperInnerContainer.append(prevButton);

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
  // TODO: The original HTML uses a hardcoded SVG path here.
  // If this SVG is authored, a new 'nextButtonIcon' field of type 'reference'
  // should be added to the model. For now, using a generic icon path.
  nextImg.alt = 'Next';
  nextImg.src = '/icons/arrow-right.svg'; // Using a generic icon path
  nextButton.append(nextImg);
  swiperInnerContainer.append(nextButton);

  swiperContainer.append(swiperInnerContainer);

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

  // Initialize Swiper after elements are in DOM
  // eslint-disable-next-line import/no-unresolved, import/extensions
  import('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js').then((Swiper) => {
    // eslint-disable-next-line no-new
    new Swiper.default(swiperContainer, {
      slidesPerView: 'auto',
      spaceBetween: 32,
      loop: false,
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
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
    });
  });

  // Optimize all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
