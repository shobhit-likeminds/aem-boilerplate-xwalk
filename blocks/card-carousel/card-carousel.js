import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...itemRows] = [...block.children];

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

  const swiperSection = document.createElement('div');
  swiperSection.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperSection.setAttribute('data-loop', 'false');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

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

  itemRows.forEach((row) => {
    const [mainImageCell, cardTitleCell, productImageCell, productLinkCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const card = document.createElement('div');
    card.classList.add(
      'product-cards__card',
      'swiper-slide',
      'd-flex',
      'flex-column',
      'cursor-pointer',
    );
    moveInstrumentation(row, card);

    const cardMedia = document.createElement('div');
    cardMedia.classList.add('product-cards__card-media', 'position-relative');

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');

    const mainImagePicture = mainImageCell.querySelector('picture');
    if (mainImagePicture) {
      const img = mainImagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
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
    cardTitle.innerHTML = cardTitleCell.innerHTML;
    cardMedia.append(cardTitle);

    const productImageDiv = document.createElement('div');
    productImageDiv.classList.add(
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

    const productImageRatio = document.createElement('div');
    productImageRatio.classList.add('ratio', 'ratio-1x1');

    const productLinkAnchor = document.createElement('a');
    productLinkAnchor.classList.add('cta-analytics');
    const productLink = productLinkCell.querySelector('a');
    if (productLink) {
      productLinkAnchor.href = productLink.href;
    }

    const productImagePicture = productImageCell.querySelector('picture');
    if (productImagePicture) {
      const img = productImagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
      productLinkAnchor.append(optimizedPic);
    }
    productImageRatio.append(productLinkAnchor);
    productImageDiv.append(productImageRatio);
    cardMedia.append(productImageDiv);
    card.append(cardMedia);

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('mt-6', 'align-self-center');

    const ctaAnchor = document.createElement('a');
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
    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      ctaAnchor.href = ctaLink.href;
    }
    ctaAnchor.textContent = ctaLabelCell.textContent.trim();
    ctaWrapper.append(ctaAnchor);
    card.append(ctaWrapper);

    swiperWrapper.append(card);
  });

  productCardsContainer.append(swiperWrapper);
  swiperContainer.append(productCardsContainer);

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
  // TODO: Add a model field for 'prevIcon' (type=reference) to avoid hardcoding SVG path.
  // For now, using a placeholder.
  prevImg.src = '/icons/arrow-left.svg'; // Placeholder, ideally should come from authored content
  prevImg.alt = 'Previous';
  prevButton.append(prevImg);
  swiperContainer.append(prevButton);

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
  // TODO: Add a model field for 'nextIcon' (type=reference) to avoid hardcoding SVG path.
  // For now, using a placeholder.
  nextImg.src = '/icons/arrow-right.svg'; // Placeholder, ideally should come from authored content
  nextImg.alt = 'Next';
  nextButton.append(nextImg);
  swiperContainer.append(nextButton);

  swiperSection.append(swiperContainer);

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
  pagination.style.width = '140px';
  swiperSection.append(pagination);

  block.replaceChildren(container, swiperSection);

  // Initialize Swiper after all elements are in the DOM
  // eslint-disable-next-line import/no-unresolved, import/extensions
  import('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js').then((SwiperModule) => {
    const Swiper = SwiperModule.default;

    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper(swiperSection, {
      slidesPerView: 1,
      spaceBetween: 32,
      loop: false,
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      pagination: {
        el: pagination,
        clickable: true,
        renderBullet: (index, className) => `<span class="${className}" style="left: ${index * 20}px;"></span>`,
      },
      breakpoints: {
        600: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
      },
      on: {
        init: () => {
          prevButton.classList.toggle('d-none', swiper.isBeginning && window.innerWidth >= 600);
          nextButton.classList.toggle('d-none', swiper.isEnd && window.innerWidth >= 600);
        },
        slideChange: () => {
          prevButton.classList.toggle('d-none', swiper.isBeginning && window.innerWidth >= 600);
          nextButton.classList.toggle('d-none', swiper.isEnd && window.innerWidth >= 600);
        },
        resize: () => {
          prevButton.classList.toggle('d-none', swiper.isBeginning && window.innerWidth >= 600);
          nextButton.classList.toggle('d-none', swiper.isEnd && window.innerWidth >= 600);
        },
      },
    });
  });
}
