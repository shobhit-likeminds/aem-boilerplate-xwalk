import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...offerRows] = [...block.children];

  const productsOfferContainer = document.createElement('div');
  productsOfferContainer.classList.add('products-offer-container');

  // Heading
  const headingEl = document.createElement('h2');
  moveInstrumentation(headingRow.firstElementChild, headingEl);
  headingEl.textContent = headingRow.firstElementChild.textContent.trim();
  productsOfferContainer.append(headingEl);

  const swiperArea = document.createElement('div');
  swiperArea.classList.add('swiper-area');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-section', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiper.setAttribute('id', 'swiper-section'); // Add ID for potential Swiper initialization if needed

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');

  offerRows.forEach((row, index) => {
    const cells = [...row.children];
    // Use content detection instead of index access for robustness
    const titleCell = cells[0]; // Title is always the first cell based on model
    const featuresCell = cells[1]; // Features is always the second cell based on model
    const ctaLinkCell = cells.find(cell => cell.querySelector('a')); // CTA Link has an anchor
    const ctaLinkLabelCell = cells.find(cell => !cell.querySelector('a') && cell !== titleCell && cell !== featuresCell); // CTA Link Label is the remaining text cell

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'swiper-slide-area');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${offerRows.length}`);
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-active');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-next');
    }

    const productPlanSec = document.createElement('div');
    productPlanSec.classList.add('product-plan-sec');

    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('p');
    cardTitle.classList.add('card-title');
    moveInstrumentation(titleCell, cardTitle);
    cardTitle.textContent = titleCell.textContent.trim();
    card.append(cardTitle);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    moveInstrumentation(featuresCell, cardBody);
    while (featuresCell.firstChild) cardBody.append(featuresCell.firstChild);
    card.append(cardBody);

    const buttonSpace = document.createElement('div');
    buttonSpace.classList.add('button-space', 'product-card-btn');

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('button-tertiary');
    const originalCtaLink = ctaLinkCell.querySelector('a');
    if (originalCtaLink) {
      ctaLink.href = originalCtaLink.href;
    }
    // Use ctaLinkLabelCell for the text content
    const ctaLinkLabel = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : '';
    ctaLink.textContent = ctaLinkLabel;

    const iconArrowForward = document.createElement('span');
    iconArrowForward.classList.add('icon-arrow-forward', 'plan-card-icon2');
    ctaLink.append(iconArrowForward);

    moveInstrumentation(ctaLinkCell, ctaLink);
    buttonSpace.append(ctaLink);
    card.append(buttonSpace);

    productPlanSec.append(card);
    swiperSlide.append(productPlanSec);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);
  swiperArea.append(swiper);

  // Add swiper pagination
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiper.append(swiperPagination);

  // Add swiper notification
  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  swiper.append(swiperNotification);

  productsOfferContainer.append(swiperArea);

  block.textContent = '';
  block.classList.add('section-background-area');
  block.append(productsOfferContainer);

  // Image optimization (no images in this block structure, but good to keep the pattern)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
