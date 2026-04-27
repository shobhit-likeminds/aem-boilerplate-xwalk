import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [titleRow, subtitleRow, ...cardRows] = [...block.children];

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

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  // The data-loop attribute is not present in the original HTML for the swiper container itself.
  // It's usually a Swiper config option. Setting it to false as per Swiper default if not explicitly true.
  swiperContainer.setAttribute('data-loop', 'false');

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const productCardsGrid = document.createElement('div');
  productCardsGrid.classList.add('product-cards__card-container', 'mx-4', 'mx-sm-0', 'overflow-hidden', 'add-margin');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');

  cardRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection instead of index access for robustness
    const mainImageCell = cells.find((cell) => cell.querySelector('picture'));
    const cardTitleCell = cells.find((cell) => cell.innerHTML.includes('<p') && !cell.querySelector('picture') && !cell.querySelector('a'));
    const productImageCell = cells.find((cell) => cell.querySelector('picture') && cell !== mainImageCell);
    const productLinkCell = cells.find((cell) => cell.querySelector('a') && cell.textContent.startsWith('/content/'));
    const ctaLabelCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a') && cell !== cardTitleCell);

    const card = document.createElement('div');
    card.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    moveInstrumentation(row, card);

    const cardMedia = document.createElement('div');
    cardMedia.classList.add('product-cards__card-media', 'position-relative');

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');

    if (mainImageCell) {
      const mainPicture = mainImageCell.querySelector('picture');
      if (mainPicture) {
        const img = mainPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
        ratioWrapper.append(optimizedPic);
      }
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
    if (cardTitleCell) {
      cardTitle.innerHTML = cardTitleCell.innerHTML;
    }
    cardMedia.append(cardTitle);

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

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('cta-analytics');
    if (productLinkCell) {
      const productLink = productLinkCell.querySelector('a');
      if (productLink) {
        ctaLink.href = productLink.href;
      }
    }

    if (productImageCell) {
      const productPicture = productImageCell.querySelector('picture');
      if (productPicture) {
        const img = productPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
        ctaLink.append(optimizedPic);
      }
    }
    ratio1x1.append(ctaLink);
    cardImgWrapper.append(ratio1x1);
    cardMedia.append(cardImgWrapper);
    card.append(cardMedia);

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('mt-6', 'align-self-center');

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
    if (productLinkCell) {
      const productLink = productLinkCell.querySelector('a');
      if (productLink) {
        ctaButton.href = productLink.href;
      }
    }
    if (ctaLabelCell) {
      ctaButton.textContent = ctaLabelCell.textContent.trim();
    }
    ctaWrapper.append(ctaButton);
    card.append(ctaWrapper);

    swiperWrapper.append(card);
  });

  productCardsGrid.append(swiperWrapper);
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
  const prevImg = document.createElement('img');
  // The original HTML has a hardcoded SVG path. This should ideally be authored.
  // For now, assuming it's a static asset and using the path from the original HTML.
  prevImg.src = '/content/dam/aemigrate/uploaded-folder/image/1777284081757.svg+xml'; // Using path from original HTML
  prevImg.alt = 'Previous';
  prevButton.append(prevImg);
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
  const nextImg = document.createElement('img');
  // Same as prevImg, using path from original HTML.
  nextImg.src = '/content/dam/aemigrate/uploaded-folder/image/1777284081757.svg+xml'; // Using path from original HTML
  nextImg.alt = 'Next';
  nextButton.append(nextImg);
  swiperWrapperContainer.append(nextButton);

  swiperContainer.append(swiperWrapperContainer);

  const pagination = document.createElement('div');
  pagination.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    'mx-auto',
    'w-fit',
  );
  swiperContainer.append(pagination);

  block.replaceChildren(container, swiperContainer);

  // Load Swiper and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
    slidesPerView: 'auto',
    spaceBetween: 32, // Based on original HTML margin-right: 32px
    loop: swiperContainer.dataset.loop === 'true',
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    pagination: {
      el: pagination,
      clickable: true,
    },
    breakpoints: {
      // Adjust breakpoints based on typical mobile/tablet/desktop widths
      0: { // Mobile first
        slidesPerView: 1,
        spaceBetween: 16,
      },
      576: { // Small devices (sm)
        slidesPerView: 1.2, // Show part of the next slide
        spaceBetween: 24,
      },
      768: { // Medium devices (md)
        slidesPerView: 2,
        spaceBetween: 24,
      },
      992: { // Large devices (lg)
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
    on: {
      init() {
        // Update button states on init
        if (this.isBeginning) prevButton.disabled = true;
        if (this.isEnd) nextButton.disabled = true;
      },
      slideChange() {
        // Update button states on slide change
        prevButton.disabled = this.isBeginning;
        nextButton.disabled = this.isEnd;
      },
    },
  });
}
