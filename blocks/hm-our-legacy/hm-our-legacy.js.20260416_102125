import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');

  const legacySliderHld = document.createElement('div');
  legacySliderHld.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  legacySliderHld.style.visibility = 'visible';
  legacySliderHld.style.animationName = 'fadeInUp';

  const legacyBannerSlider = document.createElement('div');
  legacyBannerSlider.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events', 'swiper-watch-progress', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');

  [...block.children].forEach((row, index) => {
    // Use content-based detection for cells that might be empty or have specific content types
    const cells = [...row.children];
    const imageCell = cells[0]; // type=reference, always present
    const imageAltCell = cells[1]; // type=text, always present
    const subTitleCell = cells[2]; // type=text, always present
    const titleCell = cells[3]; // type=text, always present
    const nameCell = cells[4]; // type=text, always present
    const designationCell = cells[5]; // type=richtext, always present
    const ctaLinkCell = cells[6]; // type=aem-content, always present
    const ctaLinkLabelCell = cells[7]; // type=text, always present

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-visible', 'swiper-slide-active');
    }
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${block.children.length}`);

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent.trim(), false, [{ width: '1169' }]);
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
    commonTtle.innerHTML = titleCell.innerHTML; // Use innerHTML to preserve potential line breaks

    legacyDet.append(subTtle, commonTtle);

    const desgCon = document.createElement('div');
    desgCon.classList.add('desg-con');

    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = nameCell.textContent.trim();
    desgCon.append(name);

    if (designationCell.textContent.trim()) {
      const designationP = document.createElement('p');
      designationP.innerHTML = designationCell.innerHTML;
      desgCon.append(designationP);
    }

    if (nameCell.textContent.trim() || designationCell.textContent.trim()) {
      legacyDet.append(desgCon);
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

    swiperSlide.append(figure, overlay, legacyDet);
    moveInstrumentation(row, swiperSlide);
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
  container1600Wrp.append(legacySliderHld);

  block.textContent = '';
  block.append(container1600Wrp);

  // Swiper initialization (simplified for EDS, no actual Swiper JS loaded)
  // The original HTML implies Swiper, but EDS does not load Swiper JS.
  // We simulate basic navigation if there are multiple slides.
  const slides = [...swiperWrapper.children];
  if (slides.length > 1) {
    let currentIndex = 0;

    const updateSwiperState = () => {
      slides.forEach((slide, i) => {
        slide.classList.remove('swiper-slide-visible', 'swiper-slide-active');
        slide.style.opacity = '0';
        slide.style.transform = 'translate3d(0px, 0px, 0px)';
        slide.setAttribute('aria-hidden', 'true');
      });

      slides[currentIndex].classList.add('swiper-slide-visible', 'swiper-slide-active');
      slides[currentIndex].style.opacity = '1';
      slides[currentIndex].style.transform = 'translate3d(0px, 0px, 0px)';
      slides[currentIndex].removeAttribute('aria-hidden');
      swiperWrapper.style.transform = `translate3d(-${currentIndex * 100}%, 0px, 0px)`; // Simulate slide
      swiperWrapper.setAttribute('aria-label', `${currentIndex + 1} / ${slides.length}`);

      swiperButtonPrev.classList.toggle('swiper-button-disabled', currentIndex === 0);
      swiperButtonPrev.classList.toggle('swiper-button-lock', currentIndex === 0);
      swiperButtonPrev.setAttribute('aria-disabled', currentIndex === 0);

      swiperButtonNext.classList.toggle('swiper-button-disabled', currentIndex === slides.length - 1);
      swiperButtonNext.classList.toggle('swiper-button-lock', currentIndex === slides.length - 1);
      swiperButtonNext.setAttribute('aria-disabled', currentIndex === slides.length - 1);
    };

    swiperButtonNext.addEventListener('click', () => {
      if (currentIndex < slides.length - 1) {
        currentIndex += 1;
        updateSwiperState();
      }
    });

    swiperButtonPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex -= 1;
        updateSwiperState();
      }
    });

    updateSwiperState(); // Initial state
  } else {
    // If only one slide, disable navigation buttons
    swiperButtonNext.classList.add('swiper-button-disabled', 'swiper-button-lock');
    swiperButtonPrev.classList.add('swiper-button-disabled', 'swiper-button-lock');
    swiperButtonNext.setAttribute('aria-disabled', 'true');
    swiperButtonPrev.setAttribute('aria-disabled', 'true');
  }
}
