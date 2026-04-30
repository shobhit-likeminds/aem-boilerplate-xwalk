import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const slideRows = [...block.children];

  const section = document.createElement('section');
  section.classList.add('hm-our-legacy');

  const containerWrp = document.createElement('div');
  containerWrp.classList.add('container-1600-wrp');
  section.append(containerWrp);

  const legacySliderHld = document.createElement('div');
  legacySliderHld.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  containerWrp.append(legacySliderHld);

  const swiperEl = document.createElement('div');
  swiperEl.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade');
  legacySliderHld.append(swiperEl);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperEl.append(swiperWrapper);

  slideRows.forEach((row) => {
    const [imageCell, subTitleCell, headlineCell, nameCell, designationCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    moveInstrumentation(row, swiperSlide);
    swiperWrapper.append(swiperSlide);

    const figure = document.createElement('figure');
    swiperSlide.append(figure);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1169' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    swiperSlide.append(overlay);

    const legacyDet = document.createElement('div');
    legacyDet.classList.add('legacy-det');
    swiperSlide.append(legacyDet);

    const subTitle = document.createElement('div'); // Changed to div for richtext safety
    subTitle.classList.add('sub-ttle');
    subTitle.innerHTML = subTitleCell.innerHTML; // Use innerHTML for richtext
    legacyDet.append(subTitle);

    const headline = document.createElement('h2');
    headline.classList.add('common-ttle');
    headline.innerHTML = headlineCell.innerHTML;
    legacyDet.append(headline);

    const desgCon = document.createElement('div');
    desgCon.classList.add('desg-con');
    legacyDet.append(desgCon);

    const name = document.createElement('div'); // Changed to div for richtext safety
    name.classList.add('name');
    name.innerHTML = nameCell.innerHTML; // Use innerHTML for richtext
    desgCon.append(name);

    // Check if designationCell has content before creating the element
    if (designationCell && designationCell.textContent.trim()) {
      const designation = document.createElement('div'); // Changed to div to avoid <p> inside <p>
      designation.innerHTML = designationCell.innerHTML;
      desgCon.append(designation);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const btnBox = document.createElement('a');
      btnBox.classList.add('btn-box');
      btnBox.href = ctaLink.href;
      btnBox.textContent = ctaLabelCell.textContent.trim();
      legacyDet.append(btnBox);
    }
  });

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next');
  swiperEl.append(swiperButtonNext);

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev');
  swiperEl.append(swiperButtonPrev);

  block.replaceChildren(section);

  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      prevEl: swiperButtonPrev,
      nextEl: swiperButtonNext,
    },
  });
}
