import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...cardRows] = [...block.children];

  // Main container
  const productsOfferContainer = document.createElement('div');
  productsOfferContainer.classList.add('products-offer-container');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell && headingCell.textContent.trim()) {
      const h2 = document.createElement('h2');
      moveInstrumentation(headingCell, h2);
      h2.textContent = headingCell.textContent.trim();
      productsOfferContainer.append(h2);
    }
  }

  // Swiper area
  const swiperArea = document.createElement('div');
  swiperArea.classList.add('swiper-area');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-section', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiper.setAttribute('id', `swiper-section-${Math.random().toString(36).substring(2, 9)}`); // Unique ID for swiper instance

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');

  cardRows.forEach((row, index) => {
    // Use content detection instead of direct index access for robustness
    const cells = [...row.children];
    const cardTitleCell = cells.find(cell => cell.querySelector('a') === null && cell.querySelector('p') === null && cell.textContent.trim().length > 0);
    const featuresCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p'));
    const readMoreLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('/'));
    const readMoreLinkLabelCell = cells.find(cell => cell.querySelector('a') === null && cell.textContent.trim().length > 0 && cells.indexOf(cell) > cells.indexOf(readMoreLinkCell));

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'swiper-slide-area');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${cardRows.length}`);

    const productPlanSec = document.createElement('div');
    productPlanSec.classList.add('product-plan-sec');

    const card = document.createElement('div');
    card.classList.add('card');

    // Card Title
    if (cardTitleCell && cardTitleCell.textContent.trim()) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('card-title');
      moveInstrumentation(cardTitleCell, pTitle);
      pTitle.textContent = cardTitleCell.textContent.trim();
      card.append(pTitle);
    }

    // Features
    if (featuresCell && featuresCell.textContent.trim()) {
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      moveInstrumentation(featuresCell, cardBody);
      while (featuresCell.firstChild) cardBody.append(featuresCell.firstChild);
      card.append(cardBody);
    }

    // Read More Link
    const readMoreLink = readMoreLinkCell?.querySelector('a');
    if (readMoreLink) {
      const buttonSpace = document.createElement('div');
      buttonSpace.classList.add('button-space', 'product-card-btn');

      const anchor = document.createElement('a');
      anchor.classList.add('button-tertiary');
      anchor.href = readMoreLink.href;
      moveInstrumentation(readMoreLinkCell, anchor);

      const labelText = readMoreLinkLabelCell?.textContent.trim() || readMoreLink.textContent.trim();
      anchor.textContent = labelText;

      const icon = document.createElement('span');
      icon.classList.add('icon-arrow-forward', 'plan-card-icon2');
      anchor.append(icon);

      buttonSpace.append(anchor);
      card.append(buttonSpace);
    }

    productPlanSec.append(card);
    swiperSlide.append(productPlanSec);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);
  swiperArea.append(swiper);
  productsOfferContainer.append(swiperArea);

  // Swiper pagination (will be populated by Swiper JS)
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiper.append(swiperPagination);

  // Swiper notification (for accessibility)
  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  swiper.append(swiperNotification);

  block.textContent = '';
  block.classList.add('section-background-area'); // Add this class to the block itself
  block.append(productsOfferContainer);

  // Initialize Swiper (assuming a global Swiper object is available or loaded via script)
  // This part needs to be handled by the client-side script loading Swiper library.
  // For EDS, we only structure the HTML. The actual Swiper initialization would look something like this:
  // if (typeof Swiper !== 'undefined') {
  //   new Swiper(swiper, {
  //     slidesPerView: 'auto',
  //     spaceBetween: 30,
  //     pagination: {
  //       el: swiperPagination,
  //       clickable: true,
  //     },
  //   });
  // }
}
