import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('swiper-wrapper');

  [...block.children].forEach((row) => {
    // Destructuring based on the EDS Block Structure for legacy-slide item rows
    const [imageCell, altTextCell, subtitleCell, titleCell, nameCell, designationCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const slide = document.createElement('div');
    moveInstrumentation(row, slide);
    slide.classList.add('swiper-slide');

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '1169' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        figure.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('bg-cover');
      }
    }
    slide.append(figure);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    slide.append(overlay);

    const legacyDet = document.createElement('div');
    legacyDet.classList.add('legacy-det');

    if (subtitleCell.textContent.trim()) {
      const subTtle = document.createElement('div');
      subTtle.classList.add('sub-ttle');
      subTtle.textContent = subtitleCell.textContent.trim();
      legacyDet.append(subTtle);
    }

    if (titleCell.innerHTML.trim()) {
      const commonTtle = document.createElement('h2');
      commonTtle.classList.add('common-ttle');
      commonTtle.innerHTML = titleCell.innerHTML.trim();
      legacyDet.append(commonTtle);
    }

    if (nameCell.textContent.trim() || designationCell.innerHTML.trim()) {
      const desgCon = document.createElement('div');
      desgCon.classList.add('desg-con');

      if (nameCell.textContent.trim()) {
        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = nameCell.textContent.trim();
        desgCon.append(name);
      }

      if (designationCell.innerHTML.trim()) {
        const p = document.createElement('p');
        p.innerHTML = designationCell.innerHTML.trim();
        desgCon.append(p);
      }
      legacyDet.append(desgCon);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink && ctaLinkLabelCell.textContent.trim()) {
      const btnBox = document.createElement('a');
      btnBox.classList.add('btn-box');
      btnBox.href = ctaLink.href;
      btnBox.textContent = ctaLinkLabelCell.textContent.trim();
      legacyDet.append(btnBox);
    }

    slide.append(legacyDet);
    wrapper.append(slide);
  });

  block.textContent = '';

  const legacySliderHld = document.createElement('div');
  // Ensure all classes are from the allowlist
  legacySliderHld.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp');

  const legacyBannerSlider = document.createElement('div');
  // Ensure all classes are from the allowlist
  legacyBannerSlider.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events', 'swiper-watch-progress', 'swiper-backface-hidden');
  legacyBannerSlider.append(wrapper);

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next');
  legacyBannerSlider.append(swiperButtonNext);

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev');
  legacyBannerSlider.append(swiperButtonPrev);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  legacyBannerSlider.append(swiperNotification);

  legacySliderHld.append(legacyBannerSlider);
  block.append(legacySliderHld);

  // Swiper initialization (simplified, full Swiper logic would be in a separate script)
  // This is a placeholder to show where Swiper init would go.
  // In a real scenario, you'd import Swiper and initialize it here.
  // For EDS, we only render the static HTML structure.
  if (typeof window.Swiper === 'function') {
    // eslint-disable-next-line no-new
    new window.Swiper(legacyBannerSlider, {
      effect: 'fade',
      loop: true,
      navigation: {
        nextEl: swiperButtonNext,
        prevEl: swiperButtonPrev,
      },
    });
  } else {
    // Fallback for when Swiper is not loaded (e.g., in editor preview)
    // Add classes to make the first slide visible if Swiper is not active
    const firstSlide = wrapper.querySelector('.swiper-slide');
    if (firstSlide) {
      firstSlide.classList.add('swiper-slide-visible', 'swiper-slide-active');
    }
    // Disable navigation buttons if Swiper is not active
    swiperButtonNext.classList.add('swiper-button-disabled', 'swiper-button-lock');
    swiperButtonPrev.classList.add('swiper-button-disabled', 'swiper-button-lock');
  }
}
