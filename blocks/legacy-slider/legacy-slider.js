import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('hm-our-legacy');

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  const sliderHolder = document.createElement('div');
  sliderHolder.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

  const legacyBannerSlider = document.createElement('div');
  legacyBannerSlider.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events', 'swiper-watch-progress', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');

  [...block.children].forEach((row, index) => {
    // Use content detection instead of direct index access for robustness
    const cells = [...row.children];
    const imageCell = cells[0]; // Image is always the first cell
    const altTextCell = cells[1]; // Alt Text is always the second cell
    const subtitleCell = cells[2]; // Subtitle is always the third cell
    const titleCell = cells[3]; // Title is always the fourth cell
    const nameCell = cells[4]; // Name is always the fifth cell
    const descriptionCell = cells[5]; // Description is always the sixth cell
    const ctaLinkCell = cells[6]; // CTA Link is always the seventh cell
    const ctaLinkLabelCell = cells[7]; // CTA Link Label is always the eighth cell

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-visible', 'swiper-slide-active');
    }
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${block.children.length}`);
    moveInstrumentation(row, swiperSlide);

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '1169' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover');
        figure.append(optimizedPic);
      }
    }

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const legacyDet = document.createElement('div');
    legacyDet.classList.add('legacy-det');

    const subTitle = document.createElement('div');
    subTitle.classList.add('sub-ttle');
    subTitle.textContent = subtitleCell.textContent.trim();

    const commonTitle = document.createElement('h2');
    commonTitle.classList.add('common-ttle');
    commonTitle.textContent = titleCell.textContent.trim();

    const desgCon = document.createElement('div');
    desgCon.classList.add('desg-con');

    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = nameCell.textContent.trim();
    desgCon.append(name);

    // Description is richtext, so use innerHTML
    if (descriptionCell && descriptionCell.innerHTML.trim()) {
      const p = document.createElement('p');
      p.innerHTML = descriptionCell.innerHTML;
      desgCon.append(p);
    }

    legacyDet.append(subTitle, commonTitle, desgCon);

    // CTA Link is aem-content, so query for 'a' and get href
    const ctaLinkAnchor = ctaLinkCell.querySelector('a');
    if (ctaLinkAnchor && ctaLinkLabelCell.textContent.trim()) {
      const btnBox = document.createElement('a');
      btnBox.classList.add('btn-box');
      btnBox.href = ctaLinkAnchor.href; // Get href from the anchor
      btnBox.textContent = ctaLinkLabelCell.textContent.trim();
      legacyDet.append(btnBox);
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
  sliderHolder.append(legacyBannerSlider);
  containerWrapper.append(sliderHolder);
  block.textContent = '';
  block.append(containerWrapper);

  // Simple Swiper-like functionality (without actual Swiper library)
  const slides = [...swiperWrapper.children];
  let currentIndex = 0;

  function updateSlider() {
    slides.forEach((slide, i) => {
      slide.style.transform = `translate3d(-${currentIndex * 100}%, 0px, 0px)`;
      slide.classList.remove('swiper-slide-active', 'swiper-slide-visible');
      if (i === currentIndex) {
        slide.classList.add('swiper-slide-active', 'swiper-slide-visible');
      }
    });

    if (slides.length > 1) {
      swiperButtonPrev.classList.toggle('swiper-button-disabled', currentIndex === 0);
      swiperButtonPrev.classList.toggle('swiper-button-lock', currentIndex === 0);
      swiperButtonPrev.setAttribute('aria-disabled', currentIndex === 0);

      swiperButtonNext.classList.toggle('swiper-button-disabled', currentIndex === slides.length - 1);
      swiperButtonNext.classList.toggle('swiper-button-lock', currentIndex === slides.length - 1);
      swiperButtonNext.setAttribute('aria-disabled', currentIndex === slides.length - 1);
    }
  }

  if (slides.length > 1) {
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
  } else {
    // Disable navigation buttons if there's only one slide
    swiperButtonNext.classList.add('swiper-button-disabled', 'swiper-button-lock');
    swiperButtonNext.setAttribute('aria-disabled', 'true');
    swiperButtonPrev.classList.add('swiper-button-disabled', 'swiper-button-lock');
    swiperButtonPrev.setAttribute('aria-disabled', 'true');
  }

  updateSlider();
}
