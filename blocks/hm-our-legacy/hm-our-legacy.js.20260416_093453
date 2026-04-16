import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('container-1600-wrp');

  const legacySliderHld = document.createElement('div');
  legacySliderHld.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  block.append(legacySliderHld);

  const legacyBannerSlider = document.createElement('div');
  legacyBannerSlider.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events', 'swiper-watch-progress', 'swiper-backface-hidden');
  legacySliderHld.append(legacyBannerSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  legacyBannerSlider.append(swiperWrapper);

  [...block.children].forEach((row, index) => {
    // Check for legacy-slide item rows based on the BlockJson model (8 fields)
    if (row.children.length === 8) {
      const [imageCell, altTextCell, subtitleCell, titleCell, nameCell, descriptionCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      if (index === 0) {
        swiperSlide.classList.add('swiper-slide-visible', 'swiper-slide-active');
      }
      moveInstrumentation(row, swiperSlide);

      const figure = document.createElement('figure');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '1169' }]);
          optimizedPic.querySelector('img').classList.add('bg-cover');
          figure.append(optimizedPic);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
        }
      }
      swiperSlide.append(figure);

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      swiperSlide.append(overlay);

      const legacyDet = document.createElement('div');
      legacyDet.classList.add('legacy-det');
      swiperSlide.append(legacyDet);

      const subTtle = document.createElement('div');
      subTtle.classList.add('sub-ttle');
      subTtle.textContent = subtitleCell.textContent.trim();
      legacyDet.append(subTtle);

      const commonTtle = document.createElement('h2');
      commonTtle.classList.add('common-ttle');
      commonTtle.innerHTML = titleCell.textContent.trim();
      legacyDet.append(commonTtle);

      const desgCon = document.createElement('div');
      desgCon.classList.add('desg-con');
      legacyDet.append(desgCon);

      const name = document.createElement('div');
      name.classList.add('name');
      name.textContent = nameCell.textContent.trim();
      desgCon.append(name);

      if (descriptionCell.innerHTML.trim()) {
        const description = document.createElement('p');
        description.innerHTML = descriptionCell.innerHTML;
        desgCon.append(description);
      }

      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink && ctaLinkLabelCell.textContent.trim()) {
        const btnBox = document.createElement('a');
        btnBox.classList.add('btn-box');
        btnBox.href = ctaLink.href;
        btnBox.textContent = ctaLinkLabelCell.textContent.trim();
        moveInstrumentation(ctaLinkCell, btnBox);
        legacyDet.append(btnBox);
      }

      swiperWrapper.append(swiperSlide);
    }
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

  // Initialize Swiper (assuming Swiper library is loaded globally or imported)
  // This part assumes a Swiper instance needs to be created for the slider functionality.
  // If Swiper is loaded via a <script> tag, it might be available as a global variable.
  // For production, consider dynamic import or ensuring Swiper is available.
  if (typeof Swiper !== 'undefined') {
    // eslint-disable-next-line no-new
    new Swiper(legacyBannerSlider, {
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      loop: true, // Assuming a looping slider based on common patterns
      navigation: {
        nextEl: swiperButtonNext,
        prevEl: swiperButtonPrev,
      },
      // Add other Swiper options as needed, e.g., autoplay, pagination
    });
  } else {
    // eslint-disable-next-line no-console
    console.warn('Swiper library not found. Slider functionality may not work.');
  }
}
