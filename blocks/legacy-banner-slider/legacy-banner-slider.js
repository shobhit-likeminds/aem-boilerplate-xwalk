import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('hm-our-legacy');

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');
  section.append(containerWrapper);

  const sliderHolder = document.createElement('div');
  sliderHolder.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp');
  containerWrapper.append(sliderHolder);

  const legacyBannerSlider = document.createElement('div');
  legacyBannerSlider.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events', 'swiper-watch-progress', 'swiper-backface-hidden');
  sliderHolder.append(legacyBannerSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');
  legacyBannerSlider.append(swiperWrapper);

  [...block.children].forEach((row, index) => {
    const [
      imageCell,
      imageAltCell,
      subtitleCell,
      headingCell,
      nameCell,
      descriptionCell,
      ctaLinkCell,
      ctaLinkLabelCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', `${index + 1} / ${block.children.length}`);
    moveInstrumentation(row, slide);

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent.trim(), false, [{ width: '1169' }]);
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
    slide.append(legacyDet);

    const subTitle = document.createElement('div');
    subTitle.classList.add('sub-ttle');
    subTitle.textContent = subtitleCell.textContent.trim();
    legacyDet.append(subTitle);

    const commonTitle = document.createElement('h2');
    commonTitle.classList.add('common-ttle');
    commonTitle.innerHTML = headingCell.textContent.trim();
    legacyDet.append(commonTitle);

    const nameText = nameCell.textContent.trim();
    const descriptionText = descriptionCell.textContent.trim();

    if (nameText || descriptionText) {
      const desgCon = document.createElement('div');
      desgCon.classList.add('desg-con');
      legacyDet.append(desgCon);

      if (nameText) {
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.textContent = nameText;
        desgCon.append(nameDiv);
      }

      if (descriptionText) {
        const descriptionP = document.createElement('p');
        descriptionP.textContent = descriptionText;
        desgCon.append(descriptionP);
      }
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaLinkLabel = ctaLinkLabelCell.textContent.trim();

    if (ctaLink && ctaLinkLabel) {
      const btnBox = document.createElement('a');
      btnBox.classList.add('btn-box');
      btnBox.href = ctaLink.href;
      btnBox.textContent = ctaLinkLabel;
      legacyDet.append(btnBox);
    }

    swiperWrapper.append(slide);
  });

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next', 'swiper-button-disabled', 'swiper-button-lock');
  swiperButtonNext.setAttribute('tabindex', '-1');
  swiperButtonNext.setAttribute('role', 'button');
  swiperButtonNext.setAttribute('aria-label', 'Next slide');
  swiperButtonNext.setAttribute('aria-controls', 'swiper-wrapper-7f560dba12e371d6'); // Placeholder ID
  swiperButtonNext.setAttribute('aria-disabled', 'true');
  legacyBannerSlider.append(swiperButtonNext);

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev', 'swiper-button-disabled', 'swiper-button-lock');
  swiperButtonPrev.setAttribute('tabindex', '-1');
  swiperButtonPrev.setAttribute('role', 'button');
  swiperButtonPrev.setAttribute('aria-label', 'Previous slide');
  swiperButtonPrev.setAttribute('aria-controls', 'swiper-wrapper-7f560dba12e371d6'); // Placeholder ID
  swiperButtonPrev.setAttribute('aria-disabled', 'true');
  legacyBannerSlider.append(swiperButtonPrev);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  legacyBannerSlider.append(swiperNotification);

  block.textContent = '';
  block.append(section);

  // Basic Swiper-like functionality (without actual Swiper library)
  let currentIndex = 0;
  const slides = [...swiperWrapper.children];

  function updateSlider() {
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('swiper-slide-active', 'swiper-slide-visible');
        slide.style.opacity = '1';
        slide.style.transform = 'translate3d(0px, 0px, 0px)';
      } else {
        slide.classList.remove('swiper-slide-active', 'swiper-slide-visible');
        slide.style.opacity = '0';
        slide.style.transform = 'translate3d(0px, 0px, 0px)'; // Hide off-screen slides
      }
    });

    swiperButtonPrev.classList.toggle('swiper-button-disabled', currentIndex === 0);
    swiperButtonPrev.classList.toggle('swiper-button-lock', currentIndex === 0);
    swiperButtonPrev.setAttribute('aria-disabled', currentIndex === 0);

    swiperButtonNext.classList.toggle('swiper-button-disabled', currentIndex === slides.length - 1);
    swiperButtonNext.classList.toggle('swiper-button-lock', currentIndex === slides.length - 1);
    swiperButtonNext.setAttribute('aria-disabled', currentIndex === slides.length - 1);
  }

  swiperButtonNext.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex += 1;
      updateSlider();
    }
  });

  swiperButtonPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateSlider();
    }
  });

  updateSlider(); // Initialize slider state
}
