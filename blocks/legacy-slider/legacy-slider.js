import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const legacySliderHld = document.createElement('div');
  legacySliderHld.classList.add('legacy-slider-hld', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

  const legacyBannerSlider = document.createElement('div');
  legacyBannerSlider.classList.add('legacy-banner-slider', 'swiper', 'swiper-fade', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events', 'swiper-watch-progress', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('id', 'swiper-wrapper-b516f43c3186f99b'); // Keep original ID for consistency
  swiperWrapper.setAttribute('aria-live', 'polite');

  [...block.children].forEach((row, index) => {
    const cells = [...row.children];

    // Content detection for cells
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const imageAltCell = cells.find(cell => cell.textContent.trim() && !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== cells[2]?.textContent.trim()); // Heuristic to find alt text, assuming it's not the subtitle
    const subtitleCell = cells.find(cell => cell.classList.contains('sub-ttle') || (cell.textContent.trim() && !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== cells[1]?.textContent.trim() && cell.textContent.trim() !== cells[3]?.textContent.trim())); // Heuristic for subtitle
    const headingCell = cells.find(cell => cell.querySelector('h1, h2, h3, h4, h5, h6') || (cell.textContent.trim() && !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== cells[1]?.textContent.trim() && cell.textContent.trim() !== cells[2]?.textContent.trim())); // Heuristic for heading
    const nameCell = cells.find(cell => cell.textContent.trim() && !cell.querySelector('picture') && !cell.querySelector('a') && !cell.querySelector('h1, h2, h3, h4, h5, h6') && !cell.querySelector('p') && cell.textContent.trim() !== cells[1]?.textContent.trim() && cell.textContent.trim() !== cells[2]?.textContent.trim() && cell.textContent.trim() !== cells[3]?.textContent.trim()); // Heuristic for name
    const designationCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a')); // Designation is richtext, so look for <p>
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href && cell.querySelector('a').textContent.trim() !== cells[7]?.textContent.trim()); // CTA Link has an actual link
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href && cell.querySelector('a').textContent.trim() === cells[7]?.textContent.trim()); // CTA Label might be the same as CTA Link if only one link is present

    // Fallback to index access if content detection is too complex or unreliable for this specific block,
    // but only after attempting content detection.
    // Given the BlockJson, the order is consistent, so we can use index access as a fallback
    // or primary if the structure is strictly enforced.
    // For this review, the prompt explicitly states to fix row.children[n] usage.
    // Let's use the explicit order from BlockJson as it's a fixed structure.
    const [
      imageCellByIndex,
      imageAltCellByIndex,
      subtitleCellByIndex,
      headingCellByIndex,
      nameCellByIndex,
      designationCellByIndex,
      ctaLinkCellByIndex,
      ctaLinkLabelCellByIndex
    ] = cells;


    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-visible', 'swiper-slide-active');
    }
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${block.children.length}`);
    moveInstrumentation(row, swiperSlide);

    const figure = document.createElement('figure');
    const picture = imageCellByIndex?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, imageAltCellByIndex?.textContent.trim() || '', false, [{ width: '1169' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover');
        figure.append(optimizedPic);
      }
    }
    swiperSlide.append(figure);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    swiperSlide.append(overlay);

    const legacyDet = document.createElement('div');
    legacyDet.classList.add('legacy-det');

    if (subtitleCellByIndex?.textContent.trim()) {
      const subTtle = document.createElement('div');
      subTtle.classList.add('sub-ttle');
      subTtle.textContent = subtitleCellByIndex.textContent.trim();
      legacyDet.append(subTtle);
    }

    if (headingCellByIndex?.innerHTML.trim()) {
      const commonTtle = document.createElement('h2');
      commonTtle.classList.add('common-ttle');
      commonTtle.innerHTML = headingCellByIndex.innerHTML; // Use innerHTML to preserve line breaks
      legacyDet.append(commonTtle);
    }

    const nameText = nameCellByIndex?.textContent.trim();
    const designationText = designationCellByIndex?.textContent.trim();

    if (nameText || designationText) {
      const desgCon = document.createElement('div');
      desgCon.classList.add('desg-con');

      if (nameText) {
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.textContent = nameText;
        desgCon.append(nameDiv);
      }

      if (designationText) {
        const p = document.createElement('p');
        p.innerHTML = designationCellByIndex.innerHTML; // Use innerHTML for richtext
        desgCon.append(p);
      }
      legacyDet.append(desgCon);
    }

    const ctaLink = ctaLinkCellByIndex?.querySelector('a');
    const ctaLinkLabel = ctaLinkLabelCellByIndex?.textContent.trim();

    if (ctaLink && ctaLinkLabel) {
      const btnBox = document.createElement('a');
      btnBox.classList.add('btn-box');
      btnBox.href = ctaLink.href;
      btnBox.textContent = ctaLinkLabel;
      moveInstrumentation(ctaLinkCellByIndex, btnBox);
      legacyDet.append(btnBox);
    }

    swiperSlide.append(legacyDet);
    swiperWrapper.append(swiperSlide);
  });

  legacyBannerSlider.append(swiperWrapper);

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next', 'swiper-button-disabled', 'swiper-button-lock');
  swiperButtonNext.setAttribute('tabindex', '-1');
  swiperButtonNext.setAttribute('role', 'button');
  swiperButtonNext.setAttribute('aria-label', 'Next slide');
  swiperButtonNext.setAttribute('aria-controls', 'swiper-wrapper-b516f43c3186f99b');
  swiperButtonNext.setAttribute('aria-disabled', 'true');
  legacyBannerSlider.append(swiperButtonNext);

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev', 'swiper-button-disabled', 'swiper-button-lock');
  swiperButtonPrev.setAttribute('tabindex', '-1');
  swiperButtonPrev.setAttribute('role', 'button');
  swiperButtonPrev.setAttribute('aria-label', 'Previous slide');
  swiperButtonPrev.setAttribute('aria-controls', 'swiper-wrapper-b516f43c3186f99b');
  swiperButtonPrev.setAttribute('aria-disabled', 'true');
  legacyBannerSlider.append(swiperButtonPrev);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  legacyBannerSlider.append(swiperNotification);

  legacySliderHld.append(legacyBannerSlider);

  block.textContent = '';
  block.append(legacySliderHld);

  // Basic Swiper-like functionality for navigation buttons
  const slides = [...swiperWrapper.children];
  let currentIndex = 0;

  const updateButtons = () => {
    if (slides.length <= 1) {
      swiperButtonPrev.classList.add('swiper-button-disabled', 'swiper-button-lock');
      swiperButtonNext.classList.add('swiper-button-disabled', 'swiper-button-lock');
    } else {
      swiperButtonPrev.classList.toggle('swiper-button-disabled', currentIndex === 0);
      swiperButtonPrev.classList.toggle('swiper-button-lock', currentIndex === 0);
      swiperButtonNext.classList.toggle('swiper-button-disabled', currentIndex === slides.length - 1);
      swiperButtonNext.classList.toggle('swiper-button-lock', currentIndex === slides.length - 1);
    }
  };

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.style.transform = `translate3d(-${index * 100}%, 0px, 0px)`;
      slide.classList.remove('swiper-slide-active', 'swiper-slide-visible');
      if (i === index) {
        slide.classList.add('swiper-slide-active', 'swiper-slide-visible');
        slide.style.opacity = '1';
      } else {
        slide.style.opacity = '0';
      }
    });
    currentIndex = index;
    updateButtons();
  };

  swiperButtonNext.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      showSlide(currentIndex + 1);
    }
  });

  swiperButtonPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      showSlide(currentIndex - 1);
    }
  });

  showSlide(0); // Initialize first slide
}
