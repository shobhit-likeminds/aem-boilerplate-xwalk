import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const slides = [...block.children];

  const section = document.createElement('section');
  section.classList.add('hm-our-legacy');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  section.append(container);

  const legacySliderHld = document.createElement('div');
  legacySliderHld.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  container.append(legacySliderHld);

  const swiperEl = document.createElement('div');
  // swiper-initialized, swiper-horizontal, swiper-pointer-events, swiper-watch-progress, swiper-backface-hidden are added by Swiper.js
  swiperEl.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade');
  legacySliderHld.append(swiperEl);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperEl.append(swiperWrapper);

  slides.forEach((slideRow) => {
    const [imageCell, subTitleCell, headlineCell, nameCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...slideRow.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    moveInstrumentation(slideRow, swiperSlide);

    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1169' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('bg-cover');
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
    subTtle.textContent = subTitleCell?.textContent.trim() || '';
    legacyDet.append(subTtle);

    const commonTtle = document.createElement('h2');
    commonTtle.classList.add('common-ttle');
    commonTtle.innerHTML = headlineCell?.innerHTML || '';
    legacyDet.append(commonTtle);

    const desgCon = document.createElement('div');
    desgCon.classList.add('desg-con');
    legacyDet.append(desgCon);

    const name = document.createElement('div');
    name.classList.add('name');
    name.textContent = nameCell?.textContent.trim() || '';
    desgCon.append(name);

    if (descriptionCell?.textContent.trim()) {
      const p = document.createElement('p');
      p.innerHTML = descriptionCell.innerHTML;
      desgCon.append(p);
    }

    const ctaLink = ctaLinkCell?.querySelector('a');
    const ctaLabel = ctaLabelCell?.textContent.trim();
    if (ctaLink && ctaLabel) {
      const btnBox = document.createElement('a');
      btnBox.classList.add('btn-box');
      btnBox.href = ctaLink.href;
      btnBox.textContent = ctaLabel;
      legacyDet.append(btnBox);
    }

    swiperWrapper.append(swiperSlide);
  });

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next');
  swiperEl.append(swiperButtonNext);

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev');
  swiperEl.append(swiperButtonPrev);

  block.replaceChildren(section);

  // Load Swiper library and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: swiperButtonNext,
      prevEl: swiperButtonPrev,
    },
  });
}
