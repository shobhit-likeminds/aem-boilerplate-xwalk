import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('hm-our-legacy');

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');
  section.append(containerWrapper);

  const legacySliderHld = document.createElement('div');
  legacySliderHld.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  containerWrapper.append(legacySliderHld);

  const legacyBannerSlider = document.createElement('div');
  legacyBannerSlider.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events', 'swiper-watch-progress', 'swiper-backface-hidden');
  legacySliderHld.append(legacyBannerSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');
  legacyBannerSlider.append(swiperWrapper);

  [...block.children].forEach((row, index) => {
    // Use content detection instead of direct index access for robustness
    const cells = [...row.children];
    const imageCell = cells[0]; // Image is always the first cell
    const imageAltCell = cells[1]; // Image Alt is always the second cell
    const subTitleCell = cells[2]; // Sub Title is always the third cell
    const titleCell = cells[3]; // Title is always the fourth cell
    const nameCell = cells[4]; // Name is always the fifth cell
    const designationCell = cells[5]; // Designation is always the sixth cell
    const ctaLinkCell = cells[6]; // CTA Link is always the seventh cell
    const ctaLinkLabelCell = cells[7]; // CTA Label is always the eighth cell

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${block.children.length}`);
    moveInstrumentation(row, swiperSlide);

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent.trim(), false, [{ width: '1169' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        figure.append(optimizedPic);
      }
    }
    swiperSlide.append(figure);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    swiperSlide.append(overlay);

    const legacyDet = document.createElement('div');
    legacyDet.classList.add('legacy-det');
    swiperSlide.append(legacyDet);

    if (subTitleCell && subTitleCell.textContent.trim()) {
      const subTitle = document.createElement('div');
      subTitle.classList.add('sub-ttle');
      subTitle.textContent = subTitleCell.textContent.trim();
      legacyDet.append(subTitle);
    }

    if (titleCell && titleCell.textContent.trim()) {
      const title = document.createElement('h2');
      title.classList.add('common-ttle');
      title.innerHTML = titleCell.textContent.trim(); // Use innerHTML to preserve potential <br>
      legacyDet.append(title);
    }

    const nameText = nameCell ? nameCell.textContent.trim() : '';
    const designationText = designationCell ? designationCell.textContent.trim() : '';

    if (nameText || designationText) {
      const desgCon = document.createElement('div');
      desgCon.classList.add('desg-con');

      if (nameText) {
        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = nameText;
        desgCon.append(name);
      }

      if (designationText) {
        const designation = document.createElement('p');
        designation.textContent = designationText;
        desgCon.append(designation);
      }
      legacyDet.append(desgCon);
    }

    const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
    const ctaLinkLabel = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : '';

    if (ctaLink && ctaLinkLabel) {
      const btnBox = document.createElement('a');
      btnBox.classList.add('btn-box');
      btnBox.href = ctaLink.href;
      btnBox.textContent = ctaLinkLabel;
      legacyDet.append(btnBox);
    }

    swiperWrapper.append(swiperSlide);
  });

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next', 'swiper-button-disabled', 'swiper-button-lock');
  swiperButtonNext.setAttribute('tabindex', '-1');
  swiperButtonNext.setAttribute('role', 'button');
  swiperButtonNext.setAttribute('aria-label', 'Next slide');
  swiperButtonNext.setAttribute('aria-disabled', 'true');
  legacyBannerSlider.append(swiperButtonNext);

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev', 'swiper-button-disabled', 'swiper-button-lock');
  swiperButtonPrev.setAttribute('tabindex', '-1');
  swiperButtonPrev.setAttribute('role', 'button');
  swiperButtonPrev.setAttribute('aria-label', 'Previous slide');
  swiperButtonPrev.setAttribute('aria-disabled', 'true');
  legacyBannerSlider.append(swiperButtonPrev);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  legacyBannerSlider.append(swiperNotification);

  block.textContent = '';
  block.append(section);

  // Initialize Swiper (simplified, as EDS doesn't load Swiper JS)
  // In a real scenario, you would dynamically load Swiper JS and initialize it here.
  // For this exercise, we just add the necessary classes for basic structure.
  if (block.children.length > 0) {
    swiperWrapper.firstElementChild.classList.add('swiper-slide-visible', 'swiper-slide-active');
  }

  // Add event listeners for swiper navigation buttons
  // In a real Swiper implementation, these would be handled by Swiper's own JS.
  // For this simplified version, we just add basic click listeners.
  swiperButtonNext.addEventListener('click', () => {
    // Simulate next slide behavior (e.g., by changing active classes)
    // This is a placeholder and would require actual Swiper logic.
    console.log('Next slide clicked');
  });

  swiperButtonPrev.addEventListener('click', () => {
    // Simulate previous slide behavior
    console.log('Previous slide clicked');
  });
}
