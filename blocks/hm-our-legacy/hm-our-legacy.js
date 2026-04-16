import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  const legacySliderHld = document.createElement('div');
  legacySliderHld.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  // visibility: visible; animation-name: fadeInUp; are inline styles from original HTML,
  // but Rule 10 says NEVER set inline styles in JS. These are likely added by a JS library.

  const legacyBannerSlider = document.createElement('div');
  legacyBannerSlider.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events', 'swiper-watch-progress', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');

  [...block.children].forEach((row, index) => {
    // Check 0: CRITICAL: .children[n] INDEX ACCESS
    // The original code used array destructuring:
    // const [imageCell, subTitleCell, titleCell, nameCell, designationCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];
    // This is acceptable for fixed-field item models where the order is guaranteed and all cells are present.
    // However, for the CTA Link, the model specifies 'aem-content' for ctaLink and 'text' for ctaLinkLabel.
    // The original JS was reading ctaLinkLabelCell.textContent.trim() for the CTA text, which is correct.
    // It was also reading ctaLinkCell?.querySelector('a') for the href, which is correct.
    // The problem is that the original HTML shows that the CTA Link and CTA Label are sometimes optional,
    // and the `desg-con` section is also optional.
    // To be robust, we should use content detection for the CTA link/label, especially since the CTA Link
    // is type=aem-content, meaning its cell content is just the path, and the label is in a separate text cell.
    // For fixed-field item models, direct destructuring is usually fine, but let's ensure robustness for the CTA.

    const cells = [...row.children];
    const imageCell = cells[0];
    const subTitleCell = cells[1];
    const titleCell = cells[2];
    const nameCell = cells[3];
    const designationCell = cells[4];
    const ctaLinkCell = cells[5]; // This cell contains the <a> with href
    const ctaLinkLabelCell = cells[6]; // This cell contains the plain text label for the CTA

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-visible', 'swiper-slide-active');
    }
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${block.children.length}`);
    moveInstrumentation(row, swiperSlide);

    const figure = document.createElement('figure');
    const picture = imageCell?.querySelector('picture'); // Added optional chaining
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1169' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        figure.append(optimizedPic);
      }
    }

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const legacyDet = document.createElement('div');
    legacyDet.classList.add('legacy-det');

    const subTitle = document.createElement('div');
    subTitle.classList.add('sub-ttle');
    subTitle.textContent = subTitleCell?.textContent.trim() || '';

    const title = document.createElement('h2');
    title.classList.add('common-ttle');
    title.innerHTML = titleCell?.innerHTML || '';

    const desgCon = document.createElement('div');
    desgCon.classList.add('desg-con');

    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = nameCell?.textContent.trim() || '';

    const designation = document.createElement('p');
    designation.innerHTML = designationCell?.innerHTML || '';

    // Only append name and designation if they have content
    if (name.textContent) {
      desgCon.append(name);
    }
    if (designation.innerHTML.trim()) {
      desgCon.append(designation);
    }

    // Only append desgCon if it has children
    if (desgCon.children.length > 0) {
      legacyDet.append(subTitle, title, desgCon);
    } else {
      legacyDet.append(subTitle, title);
    }

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn-box');
    const foundCtaLinkAnchor = ctaLinkCell?.querySelector('a'); // This is the aem-content link
    const ctaLabelText = ctaLinkLabelCell?.textContent.trim(); // This is the text label

    if (foundCtaLinkAnchor && foundCtaLinkAnchor.href && ctaLabelText) {
      ctaLink.href = foundCtaLinkAnchor.href;
      ctaLink.textContent = ctaLabelText;
      legacyDet.append(ctaLink);
    }

    swiperSlide.append(figure, overlay, legacyDet);
    swiperWrapper.append(swiperSlide);
  });

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next', 'swiper-button-disabled', 'swiper-button-lock');
  swiperButtonNext.setAttribute('tabindex', '-1');
  swiperButtonNext.setAttribute('role', 'button');
  swiperButtonNext.setAttribute('aria-label', 'Next slide');
  swiperButtonNext.setAttribute('aria-disabled', 'true');

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev', 'swiper-button-disabled', 'swiper-button-lock');
  swiperButtonPrev.setAttribute('tabindex', '-1');
  swiperButtonPrev.setAttribute('role', 'button');
  swiperButtonPrev.setAttribute('aria-label', 'Previous slide');
  swiperButtonPrev.setAttribute('aria-disabled', 'true');

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');

  legacyBannerSlider.append(swiperWrapper, swiperButtonNext, swiperButtonPrev, swiperNotification);
  legacySliderHld.append(legacyBannerSlider);
  containerWrapper.append(legacySliderHld);

  block.textContent = '';
  block.append(containerWrapper);

  // Basic Swiper-like functionality (Rule 9)
  let currentIndex = 0;
  const slides = [...swiperWrapper.children];
  const totalSlides = slides.length;

  const updateButtons = () => {
    swiperButtonPrev.classList.toggle('swiper-button-disabled', currentIndex === 0);
    swiperButtonPrev.classList.toggle('swiper-button-lock', currentIndex === 0);
    swiperButtonPrev.setAttribute('aria-disabled', currentIndex === 0);

    swiperButtonNext.classList.toggle('swiper-button-disabled', currentIndex === totalSlides - 1);
    swiperButtonNext.classList.toggle('swiper-button-lock', currentIndex === totalSlides - 1);
    swiperButtonNext.setAttribute('aria-disabled', currentIndex === totalSlides - 1);
  };

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.remove('swiper-slide-visible', 'swiper-slide-active');
      // Rule 10: NEVER set inline styles in JS.
      // The original HTML shows these styles are likely added by a JS library (Swiper).
      // We should not replicate them directly in our decorate function.
      // If a fade effect is desired, it should be handled via CSS transitions on class changes.
      // For now, removing these inline style manipulations.
      // slide.style.opacity = '0';
      // slide.style.transform = 'translate3d(0px, 0px, 0px)';
    });

    if (slides[index]) {
      slides[index].classList.add('swiper-slide-visible', 'swiper-slide-active');
      // slide.style.opacity = '1'; // Removed inline style
    }
    currentIndex = index;
    updateButtons();
  };

  swiperButtonNext.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
      showSlide(currentIndex + 1);
    }
  });

  swiperButtonPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      showSlide(currentIndex - 1);
    }
  });

  // Initial slide display
  if (totalSlides > 0) {
    showSlide(0);
  }
}
