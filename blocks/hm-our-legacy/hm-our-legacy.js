import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');

  const legacySliderHld = document.createElement('div');
  // 'animated' is a state class, not initial, 'animate__' is part of the class name
  legacySliderHld.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp');

  const legacyBannerSlider = document.createElement('div');
  legacyBannerSlider.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events', 'swiper-watch-progress', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');

  [...block.children].forEach((row, index) => {
    // Use content detection for cells that might be empty or have varying content
    const cells = [...row.children];
    const imageCell = cells[0]; // Image is always the first cell
    const subTitleCell = cells[1]; // Sub Title is always the second cell
    const headingCell = cells[2]; // Heading is always the third cell

    // Name, Designation, CTA Link, CTA Label might be optional or in varying order if not strictly enforced
    // Based on the model, they are fixed fields, so direct index access is acceptable IF the model is strictly followed.
    // However, for robustness, especially with CTA, it's safer to find them.
    // Given the BlockJson and EDS structure, direct index access is implied for fixed fields.
    // Let's stick to the fixed field assumption for now, but be mindful of potential issues if content authors deviate.
    const nameCell = cells[3];
    const designationCell = cells[4];
    const ctaLinkCell = cells[5];
    const ctaLinkLabelCell = cells[6];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${block.children.length}`);
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-visible', 'swiper-slide-active');
    }
    moveInstrumentation(row, swiperSlide);

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1169' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('bg-cover');
        figure.append(optimizedPic);
      }
    }

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const legacyDet = document.createElement('div');
    legacyDet.classList.add('legacy-det');

    const subTtle = document.createElement('div');
    subTtle.classList.add('sub-ttle');
    subTtle.textContent = subTitleCell.textContent.trim();

    const commonTtle = document.createElement('h2');
    commonTtle.classList.add('common-ttle');
    commonTtle.innerHTML = headingCell.innerHTML; // Use innerHTML for potential line breaks

    legacyDet.append(subTtle, commonTtle);

    // Check if name or designation cells have content before creating desg-con
    const hasName = nameCell && nameCell.textContent.trim();
    const hasDesignation = designationCell && designationCell.textContent.trim();

    if (hasName || hasDesignation) {
      const desgCon = document.createElement('div');
      desgCon.classList.add('desg-con');

      if (hasName) {
        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = nameCell.textContent.trim();
        desgCon.append(name);
      }

      if (hasDesignation) {
        const designation = document.createElement('p');
        designation.textContent = designationCell.textContent.trim();
        desgCon.append(designation);
      }
      legacyDet.append(desgCon);
    }

    // CTA Link and Label handling
    const ctaLinkElement = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
    const ctaLabelText = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : '';

    if (ctaLinkElement && ctaLinkElement.href && ctaLabelText) {
      const btnBox = document.createElement('a');
      btnBox.classList.add('btn-box');
      btnBox.href = ctaLinkElement.href;
      btnBox.textContent = ctaLabelText;
      legacyDet.append(btnBox);
    }

    swiperSlide.append(figure, overlay, legacyDet);
    swiperWrapper.append(swiperSlide);
  });

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next', 'swiper-button-disabled', 'swiper-button-lock'); // 'swiper-button-disabled' and 'swiper-button-lock' are initial states
  swiperButtonNext.setAttribute('tabindex', '-1');
  swiperButtonNext.setAttribute('role', 'button');
  swiperButtonNext.setAttribute('aria-label', 'Next slide');

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev', 'swiper-button-disabled', 'swiper-button-lock'); // 'swiper-button-disabled' and 'swiper-button-lock' are initial states
  swiperButtonPrev.setAttribute('tabindex', '-1');
  swiperButtonPrev.setAttribute('role', 'button');
  swiperButtonPrev.setAttribute('aria-label', 'Previous slide');

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');

  legacyBannerSlider.append(swiperWrapper, swiperButtonNext, swiperButtonPrev, swiperNotification);
  legacySliderHld.append(legacyBannerSlider);
  container1600Wrp.append(legacySliderHld);

  block.textContent = '';
  block.append(container1600Wrp);

  // Swiper initialization (simplified for EDS, full Swiper JS not loaded)
  // In a real scenario, you'd load Swiper JS and initialize it here.
  // For EDS, we just ensure the basic structure is correct.
  // If interactive behavior is required, it must be implemented with vanilla JS.
  let currentSlide = 0;
  const slides = [...swiperWrapper.children];

  const updateSwiperButtons = () => {
    swiperButtonPrev.classList.toggle('swiper-button-disabled', currentSlide === 0);
    swiperButtonPrev.classList.toggle('swiper-button-lock', currentSlide === 0);
    swiperButtonNext.classList.toggle('swiper-button-disabled', currentSlide === slides.length - 1);
    swiperButtonNext.classList.toggle('swiper-button-lock', currentSlide === slides.length - 1);
  };

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('swiper-slide-active', 'swiper-slide-visible');
      slide.style.opacity = '0';
      slide.style.transform = 'translate3d(0px, 0px, 0px)'; // Reset transform for fade effect
      if (i === index) {
        slide.classList.add('swiper-slide-active', 'swiper-slide-visible');
        slide.style.opacity = '1';
      }
    });
    currentSlide = index;
    updateSwiperButtons();
  };

  swiperButtonNext.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      showSlide(currentSlide + 1);
    }
  });

  swiperButtonPrev.addEventListener('click', () => {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
  });

  showSlide(0); // Initialize first slide
}
