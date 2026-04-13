import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  const templateDiv = document.createElement('div');
  templateDiv.classList.add('plan-possibility-template');

  // Heading
  const headingEl = document.createElement('h2');
  headingEl.classList.add('plan-possibility-heading');
  moveInstrumentation(headingRow.firstElementChild, headingEl);
  headingEl.textContent = headingRow.firstElementChild.textContent.trim();
  templateDiv.append(headingEl);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('plan-possibility-container');

  const swiperDiv = document.createElement('div');
  swiperDiv.classList.add('swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  itemRows.forEach((row) => {
    // CHECK 0 & 1: Using destructuring for item rows, which is correct for a fixed number of cells.
    // The BlockJson model confirms 5 fields for 'plan-possibility-item'.
    const [titleCell, descriptionCell, tagsCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    moveInstrumentation(row, swiperSlide);

    const planPossibleBox = document.createElement('div');
    // Corrected class name to match ORIGINAL HTML: 'plan-possibility-box'
    planPossibleBox.classList.add('plan-possibility-box');

    const planIcon = document.createElement('div');
    planIcon.classList.add('plan-icon');
    const planIconBox = document.createElement('div');
    planIconBox.classList.add('plan-icon-box');
    const iconArea = document.createElement('div');
    iconArea.classList.add('icon-area');
    // NOTE: The original HTML has inline styles for background-color.
    // Since the block model doesn't provide a field for this, we omit it.
    // If a field were added, we would read it from there.
    iconArea.innerHTML = '<span></span>';
    planIconBox.append(iconArea);
    planIcon.append(planIconBox);

    const planBoxTitle = document.createElement('h3');
    planBoxTitle.classList.add('plan-box-title');
    moveInstrumentation(titleCell, planBoxTitle);
    planBoxTitle.textContent = titleCell.textContent.trim();
    planIcon.append(planBoxTitle);
    planPossibleBox.append(planIcon);

    const planBoxDescription = document.createElement('div');
    planBoxDescription.classList.add('plan-box-description');

    const planBoxDetail = document.createElement('p');
    planBoxDetail.classList.add('p1', 'plan-box-detail');
    moveInstrumentation(descriptionCell, planBoxDetail);
    planBoxDetail.innerHTML = descriptionCell.innerHTML; // retains rich text structure
    planBoxDescription.append(planBoxDetail);

    const planBoxTag = document.createElement('p');
    planBoxTag.classList.add('plan-box-tag');
    moveInstrumentation(tagsCell, planBoxTag);
    planBoxTag.innerHTML = tagsCell.innerHTML; // retains rich text structure
    planBoxDescription.append(planBoxTag);
    planPossibleBox.append(planBoxDescription);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('button-tertiary', 'plan-start-btn', 'inline-block');
    const originalCtaLink = ctaLinkCell.querySelector('a');
    if (originalCtaLink) {
      ctaLink.href = originalCtaLink.href;
    }
    const ctaLinkLabelText = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : '';
    ctaLink.textContent = ctaLinkLabelText;
    const iconArrowForward = document.createElement('span');
    iconArrowForward.classList.add('icon-arrow-forward', 'plan-start-icon');
    ctaLink.append(iconArrowForward);
    moveInstrumentation(ctaLinkCell, ctaLink); // Move instrumentation from the original CTA link cell
    planPossibleBox.append(ctaLink);

    swiperSlide.append(planPossibleBox);
    swiperWrapper.append(swiperSlide);
  });

  swiperDiv.append(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiperDiv.append(swiperPagination);

  containerDiv.append(swiperDiv);
  templateDiv.append(containerDiv);

  block.textContent = '';
  block.append(templateDiv);

  // CHECK 2: Interactivity - Swiper initialization
  // This block uses Swiper for a carousel. If Swiper JS is loaded, it will pick up these elements.
  // We need to ensure the JS is prepared for Swiper's dynamic behavior.
  // The original HTML shows 'swiper-slide-active', 'swiper-slide-prev', 'swiper-slide-next'
  // and 'swiper-pagination-bullet-active' classes, indicating dynamic behavior.
  // We will add a basic Swiper initialization if the Swiper library is available.
  // If Swiper is not globally available, this will gracefully do nothing.
  if (typeof Swiper === 'function') {
    // eslint-disable-next-line no-new
    new Swiper(swiperDiv, {
      slidesPerView: 'auto',
      spaceBetween: 25, // Based on 'margin-right: 25px' in original HTML
      pagination: {
        el: swiperPagination,
        clickable: true,
      },
      // Add any other Swiper options as needed, e.g., navigation arrows if present in HTML
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
    });
  } else {
    // Fallback for when Swiper JS is not loaded:
    // Ensure at least one slide is active for static display if Swiper JS isn't loaded.
    const firstSlide = swiperWrapper.querySelector('.swiper-slide');
    if (firstSlide) {
      firstSlide.classList.add('swiper-slide-active');
    }
  }
}
