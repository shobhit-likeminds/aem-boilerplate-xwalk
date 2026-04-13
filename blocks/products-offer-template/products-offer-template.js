import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  // Main container
  const productsOfferContainer = document.createElement('div');
  productsOfferContainer.classList.add('products-offer-container');
  moveInstrumentation(block, productsOfferContainer);

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell && headingCell.textContent.trim()) {
      const h2 = document.createElement('h2');
      h2.textContent = headingCell.textContent.trim();
      moveInstrumentation(headingRow, h2);
      productsOfferContainer.append(h2);
    }
  }

  // Swiper area
  const swiperArea = document.createElement('div');
  swiperArea.classList.add('swiper-area');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-section', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiper.setAttribute('id', 'swiper-section'); // Add ID for potential swiper initialization

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  // Corrected class name from 'swiper-wrapper-products-offer' to 'swiper-wrapper'
  // The ID 'swiper-wrapper-products-offer' was an invention; the original HTML uses a dynamic ID like 'swiper-wrapper-795bd36deb474a01'
  // For consistency with the original HTML, we should not invent IDs unless necessary for JS functionality.
  // The original HTML does not have a static ID for the wrapper that we can copy.
  // For now, we'll remove the invented ID and rely on the class for styling/selection.
  // If a specific ID is needed for Swiper initialization, it should be dynamically generated or passed.
  // For this review, we'll ensure classes match.
  // swiperWrapper.setAttribute('id', 'swiper-wrapper-products-offer'); // Removed invented ID
  swiperWrapper.setAttribute('aria-live', 'polite');

  itemRows.forEach((row, index) => {
    // Use content detection instead of index access for item row cells
    const cells = [...row.children];
    const titleCell = cells.find(cell => cell.querySelector('p.card-title') || (cell.textContent.trim() && !cell.querySelector('ul') && !cell.querySelector('a')));
    const featuresCell = cells.find(cell => cell.querySelector('ul'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href && cell.querySelector('a').textContent.trim() !== (cells.find(c => c !== titleCell && c !== featuresCell && c !== cell)?.textContent.trim() || ''));
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href && cell.textContent.trim() !== ctaLinkCell?.querySelector('a')?.textContent.trim());


    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'swiper-slide-area');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${itemRows.length}`);
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-active');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-next');
    }
    moveInstrumentation(row, swiperSlide);

    const productPlanSec = document.createElement('div');
    productPlanSec.classList.add('product-plan-sec');

    const card = document.createElement('div');
    card.classList.add('card');

    // Title
    if (titleCell && titleCell.textContent.trim()) {
      const cardTitle = document.createElement('p');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = titleCell.textContent.trim();
      card.append(cardTitle);
    }

    // Features
    if (featuresCell && featuresCell.textContent.trim()) {
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      // The features cell already contains the <ul> structure from the original HTML
      while (featuresCell.firstChild) {
        cardBody.append(featuresCell.firstChild);
      }
      card.append(cardBody);
    }

    // CTA Link
    const ctaLink = ctaLinkCell?.querySelector('a');
    if (ctaLink) {
      const buttonSpace = document.createElement('div');
      buttonSpace.classList.add('button-space', 'product-card-btn');

      const anchor = document.createElement('a');
      anchor.href = ctaLink.href;
      anchor.classList.add('button-tertiary');
      anchor.textContent = ctaLinkLabelCell?.textContent.trim() || ctaLink.textContent.trim();

      // Add the arrow icon if present in the original HTML
      const iconSpan = document.createElement('span');
      iconSpan.classList.add('icon-arrow-forward', 'plan-card-icon2');
      anchor.append(iconSpan);

      moveInstrumentation(ctaLinkCell, anchor);
      buttonSpace.append(anchor);
      card.append(buttonSpace);
    }

    productPlanSec.append(card);
    swiperSlide.append(productPlanSec);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Swiper pagination
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  // Dynamically create pagination bullets
  for (let i = 0; i < itemRows.length; i += 1) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    bullet.setAttribute('tabindex', '0');
    bullet.setAttribute('role', 'button');
    bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) {
      bullet.classList.add('swiper-pagination-bullet-active');
      bullet.setAttribute('aria-current', 'true');
    }
    bullet.addEventListener('click', () => {
      // Custom logic to handle slide change if Swiper JS is not loaded
      // For now, just toggling active class. Actual swiper.js would handle this.
      swiperPagination.querySelectorAll('.swiper-pagination-bullet').forEach((b) => {
        b.classList.remove('swiper-pagination-bullet-active');
        b.removeAttribute('aria-current');
      });
      bullet.classList.add('swiper-pagination-bullet-active');
      bullet.setAttribute('aria-current', 'true');

      // Simple slide transition simulation (without actual Swiper library)
      const slides = swiperWrapper.querySelectorAll('.swiper-slide');
      slides.forEach((slide, slideIndex) => {
        slide.classList.remove('swiper-slide-active', 'swiper-slide-next');
        if (slideIndex === i) {
          slide.classList.add('swiper-slide-active');
        } else if (slideIndex === i + 1) {
          slide.classList.add('swiper-slide-next');
        }
      });
      // The original HTML has a width of 393.333px and margin-right of 30px, totaling 423.333px per slide.
      // Using 423px as a close approximation for the transform.
      swiperWrapper.style.transform = `translate3d(-${i * 423.333}px, 0px, 0px)`;
    });
    swiperPagination.append(bullet);
  }
  swiper.append(swiperPagination);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  swiper.append(swiperNotification);

  swiperArea.append(swiper);
  productsOfferContainer.append(swiperArea);

  block.textContent = '';
  block.classList.add('section-background-area');
  block.append(productsOfferContainer);

  // Image optimization (no images in this block, but keeping the pattern)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
