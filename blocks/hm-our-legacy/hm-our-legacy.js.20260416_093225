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
    // Use content detection for cells, especially for CTA link which can be wrapped in <p>
    const cells = [...row.children];
    const imageCell = cells[0]; // Image is always the first cell
    const subTitleCell = cells[1]; // Sub Title is always the second cell
    const titleCell = cells[2]; // Title is always the third cell
    const nameCell = cells[3]; // Name is always the fourth cell
    const descriptionCell = cells[4]; // Description is always the fifth cell
    const ctaLinkCell = cells[5]; // CTA Link is always the sixth cell
    const ctaLinkLabelCell = cells[6]; // CTA Label is always the seventh cell

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${block.children.length}`);

    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-visible', 'swiper-slide-active');
    }

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
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
    subTitle.textContent = subTitleCell.textContent.trim();

    const title = document.createElement('h2');
    title.classList.add('common-ttle');
    title.innerHTML = titleCell.textContent.trim().replace(/\n/g, '<br>');

    legacyDet.append(subTitle, title);

    if (nameCell.textContent.trim() || descriptionCell.textContent.trim()) {
      const desgCon = document.createElement('div');
      desgCon.classList.add('desg-con');

      if (nameCell.textContent.trim()) {
        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = nameCell.textContent.trim();
        desgCon.append(name);
      }

      if (descriptionCell.textContent.trim()) {
        const description = document.createElement('div');
        description.innerHTML = descriptionCell.innerHTML;
        desgCon.append(description);
      }
      legacyDet.append(desgCon);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink && ctaLinkLabelCell.textContent.trim()) {
      const ctaButton = document.createElement('a');
      ctaButton.classList.add('btn-box');
      ctaButton.href = ctaLink.href;
      ctaButton.textContent = ctaLinkLabelCell.textContent.trim();
      moveInstrumentation(ctaLink, ctaButton); // Instrumentation should move from the actual link
      legacyDet.append(ctaButton);
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

  // Basic Swiper-like functionality (without actual Swiper library)
  let currentIndex = 0;
  const slides = [...swiperWrapper.children];
  const totalSlides = slides.length;

  const updateSlideVisibility = () => {
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('swiper-slide-active', 'swiper-slide-visible');
        slide.style.opacity = '1';
        slide.style.transform = 'translate3d(0px, 0px, 0px)';
      } else {
        slide.classList.remove('swiper-slide-active', 'swiper-slide-visible');
        slide.style.opacity = '0';
        slide.style.transform = 'translate3d(100%, 0px, 0px)'; // Hide off to the right
      }
    });

    if (totalSlides > 1) {
      swiperButtonPrev.classList.toggle('swiper-button-disabled', currentIndex === 0);
      swiperButtonPrev.classList.toggle('swiper-button-lock', currentIndex === 0);
      swiperButtonPrev.setAttribute('aria-disabled', currentIndex === 0);

      swiperButtonNext.classList.toggle('swiper-button-disabled', currentIndex === totalSlides - 1);
      swiperButtonNext.classList.toggle('swiper-button-lock', currentIndex === totalSlides - 1);
      swiperButtonNext.setAttribute('aria-disabled', currentIndex === totalSlides - 1);
    } else {
      swiperButtonPrev.classList.add('swiper-button-disabled', 'swiper-button-lock');
      swiperButtonPrev.setAttribute('aria-disabled', 'true');
      swiperButtonNext.classList.add('swiper-button-disabled', 'swiper-button-lock');
      swiperButtonNext.setAttribute('aria-disabled', 'true');
    }
  };

  const showNextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlideVisibility();
    }
  };

  const showPrevSlide = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlideVisibility();
    }
  };

  if (totalSlides > 1) {
    swiperButtonNext.addEventListener('click', showNextSlide);
    swiperButtonPrev.addEventListener('click', showPrevSlide);
  } else {
    // Hide navigation buttons if only one slide
    swiperButtonNext.style.display = 'none';
    swiperButtonPrev.style.display = 'none';
  }

  updateSlideVisibility(); // Initialize visibility
}
