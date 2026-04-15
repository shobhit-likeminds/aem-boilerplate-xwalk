import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, subheadingRow, ...cardRows] = [...block.children];

  block.textContent = '';
  block.classList.add('card-carousel');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');

  const heading = document.createElement('h2');
  heading.classList.add(
    'card-carousel__title',
    'font-24',
    'leading-28',
    'font-sm-40',
    'leading-sm-50',
    'text-dark-gray-100',
    'text-center',
    'font-baskerville',
  );
  // Use children[0] as per EDS block structure for single cell rows
  moveInstrumentation(headingRow.children[0], heading);
  heading.textContent = headingRow.children[0]?.textContent.trim() || '';
  containerDiv.append(heading);

  const subheading = document.createElement('p');
  subheading.classList.add(
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
  // Use children[0] as per EDS block structure for single cell rows
  moveInstrumentation(subheadingRow.children[0], subheading);
  subheading.textContent = subheadingRow.children[0]?.textContent.trim() || '';
  containerDiv.append(subheading);

  block.append(containerDiv);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperWrapper.setAttribute('data-loop', 'false');

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

  const swiperSlideWrapper = document.createElement('div');
  swiperSlideWrapper.classList.add('swiper-wrapper', 'slide-in-anim');

  cardRows.forEach((row) => {
    const [backgroundImageCell, titleCell, productImageCell, ctaLinkCell, ctaLinkLabelCell] = [
      ...row.children,
    ];

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

    const ratioDiv = document.createElement('div');
    ratioDiv.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');

    const bgImg = backgroundImageCell.querySelector('img');
    if (bgImg) {
      const optimizedBgPic = createOptimizedPicture(bgImg.src, bgImg.alt, false, [{ width: '750' }]);
      optimizedBgPic.classList.add('product-cards__card-thumb', 'object-fit-cover');
      moveInstrumentation(bgImg, optimizedBgPic.querySelector('img'));
      ratioDiv.append(optimizedBgPic);
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    ratioDiv.append(cardGradient);
    media.append(ratioDiv);

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
    cardTitle.innerHTML = titleCell.innerHTML;
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

    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaAnchor = document.createElement('a');
    ctaAnchor.classList.add('cta-analytics');
    if (ctaLink) {
      ctaAnchor.href = ctaLink.href;
    }

    const prodImg = productImageCell.querySelector('img');
    if (prodImg) {
      const optimizedProdPic = createOptimizedPicture(prodImg.src, prodImg.alt, false, [{ width: '750' }]);
      optimizedProdPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
      moveInstrumentation(prodImg, optimizedProdPic.querySelector('img'));
      ctaAnchor.append(optimizedProdPic);
    }
    ratio1x1.append(ctaAnchor);
    cardImgWrapper.append(ratio1x1);
    media.append(cardImgWrapper);
    card.append(media);

    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('mt-6', 'align-self-center');

    const ctaButton = document.createElement('a');
    ctaButton.classList.add(
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
    if (ctaLink) {
      ctaButton.href = ctaLink.href;
    }
    ctaButton.textContent = ctaLinkLabelCell.textContent.trim();
    ctaDiv.append(ctaButton);
    card.append(ctaDiv);

    swiperSlideWrapper.append(card);
  });

  productCardsContainer.append(swiperSlideWrapper);
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
  prevImg.alt = 'svg file';
  prevImg.src = '/icons/arrow.svg'; // Placeholder, replace with actual icon path if needed
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
  nextImg.alt = 'svg file';
  nextImg.src = '/icons/arrow.svg'; // Placeholder, replace with actual icon path if needed
  nextButton.append(nextImg);
  swiperContainer.append(nextButton);

  swiperWrapper.append(swiperContainer);

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
  swiperWrapper.append(pagination);

  block.append(swiperWrapper);

  // Add event listeners for carousel navigation
  // This assumes a Swiper.js instance will be initialized later
  // For a full implementation, Swiper.js would need to be imported and initialized here
  // For now, we'll add basic click listeners that would interact with a Swiper instance
  prevButton.addEventListener('click', () => {
    // Logic to navigate to previous slide, e.g., swiper.slidePrev();
    console.log('Previous button clicked');
    // Example: if (window.swiperInstance) window.swiperInstance.slidePrev();
  });

  nextButton.addEventListener('click', () => {
    // Logic to navigate to next slide, e.g., swiper.slideNext();
    console.log('Next button clicked');
    // Example: if (window.swiperInstance) window.swiperInstance.slideNext();
  });


  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
