import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...cardRows] = [...block.children];

  // Create main container
  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  moveInstrumentation(block, container);

  // Title
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
  title.textContent = titleRow.firstElementChild.textContent.trim();
  container.append(title);

  // Subtitle
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
  subtitle.textContent = subtitleRow.firstElementChild.textContent.trim();
  container.append(subtitle);

  block.textContent = ''; // Clear block content
  block.append(container);

  // Swiper container
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'false');

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('product-cards__card-container', 'mx-4', 'mx-sm-0', 'overflow-hidden', 'add-margin', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');

  const slideInAnim = document.createElement('div');
  slideInAnim.classList.add('swiper-wrapper', 'slide-in-anim');

  cardRows.forEach((row) => {
    const cells = [...row.children];
    // Using content detection for cells where type=aem-content or type=text
    // to avoid fragile index access, especially for CTA Link and CTA Label.
    const thumbImageCell = cells.find(cell => cell.querySelector('picture') && !cell.querySelector('a'));
    const cardTitleCell = cells.find(cell => cell.innerHTML.includes('<p>') || cell.innerHTML.includes('<ul>'));
    const mainImageCell = cells.find(cell => cell.querySelector('picture') && cell.querySelector('a')); // Main image is wrapped in CTA link
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.startsWith('/content/'));
    const ctaLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell !== thumbImageCell && cell !== cardTitleCell);

    const card = document.createElement('div');
    card.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    moveInstrumentation(row, card);

    const media = document.createElement('div');
    media.classList.add('product-cards__card-media', 'position-relative');

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');

    const thumbImage = thumbImageCell.querySelector('img');
    const thumbPicture = createOptimizedPicture(thumbImage.src, thumbImage.alt, false, [{ width: '750' }]);
    const thumbImgEl = thumbPicture.querySelector('img');
    thumbImgEl.classList.add('product-cards__card-thumb', 'object-fit-cover');
    moveInstrumentation(thumbImage, thumbImgEl);
    ratioWrapper.append(thumbPicture);

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
    moveInstrumentation(cardTitleCell, cardTitle);
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

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('cta-analytics');
    const ctaLinkHref = ctaLinkCell?.querySelector('a')?.href;
    if (ctaLinkHref) {
      ctaLink.href = ctaLinkHref;
    }

    const mainImage = mainImageCell.querySelector('img');
    const mainPicture = createOptimizedPicture(mainImage.src, mainImage.alt, false, [{ width: '750' }]);
    const mainImgEl = mainPicture.querySelector('img');
    mainImgEl.classList.add('w-100', 'h-100', 'object-fit-contain');
    moveInstrumentation(mainImage, mainImgEl);
    ctaLink.append(mainPicture);
    ratio1x1.append(ctaLink);
    cardImg.append(ratio1x1);
    media.append(cardImg);
    card.append(media);

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
    if (ctaLinkHref) {
      ctaAnchor.href = ctaLinkHref;
    }
    ctaAnchor.textContent = ctaLinkLabelCell.textContent.trim();
    moveInstrumentation(ctaLinkCell, ctaAnchor);
    moveInstrumentation(ctaLinkLabelCell, ctaAnchor);
    ctaWrapper.append(ctaAnchor);
    card.append(ctaWrapper);

    slideInAnim.append(card);
  });

  swiperWrapper.append(slideInAnim);
  swiperWrapperContainer.append(swiperWrapper);

  // Navigation buttons (prev/next)
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
  // Read image src from block's authored data if available, otherwise omit.
  // For this component, the original HTML shows a hardcoded SVG, but we should
  // avoid hardcoding paths. Since the block model doesn't have fields for these
  // icons, we'll create a placeholder or omit if no authored source.
  // For now, we'll use a placeholder as there's no model field for this.
  prevImg.alt = 'svg file';
  prevImg.src = '/icons/arrow-left.svg'; // Placeholder, ideally from block data
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
  nextImg.alt = 'svg file';
  nextImg.src = '/icons/arrow-right.svg'; // Placeholder, ideally from block data
  nextButton.append(nextImg);
  swiperWrapperContainer.append(nextButton);

  swiperContainer.append(swiperWrapperContainer);

  // Pagination
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
  pagination.style.width = '140px'; // This is a specific width from the original HTML
  swiperContainer.append(pagination);

  block.append(swiperContainer);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Add event listeners for navigation buttons (interactivity check)
  prevButton.addEventListener('click', () => {
    // Implement Swiper.js prev slide logic here
    // For a real Swiper instance, you'd call swiper.slidePrev()
    console.log('Previous button clicked');
  });

  nextButton.addEventListener('click', () => {
    // Implement Swiper.js next slide logic here
    // For a real Swiper instance, you'd call swiper.slideNext()
    console.log('Next button clicked');
  });
}
