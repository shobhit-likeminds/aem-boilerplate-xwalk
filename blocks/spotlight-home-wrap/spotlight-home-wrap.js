import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];

  const slides = allRows.filter((row) => row.children.length === 7);
  const quickLinks = allRows.filter((row) => row.children.length === 2);

  const mainSlider = document.createElement('div');
  mainSlider.classList.add('beam-slider', 'main-slider', 'loading1', 'beam-slider-multi', 'swiper-initialized', 'swiper-horizontal', 'swiper-watch-progress', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('id', 'swiper-wrapper-f55dae73a5c7f746');
  swiperWrapper.setAttribute('aria-live', 'off');

  slides.forEach((row, index) => {
    const [imageCell, altTextCell, smallTextCell, headingCell, descriptionCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'nogradient');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${slides.length}`);
    swiperSlide.setAttribute('data-swiper-slide-index', index);

    const slideBgImg = document.createElement('div');
    slideBgImg.classList.add('slide-bgimg');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [
          { media: '(max-width: 576px)', width: '400' },
          { media: '(max-width: 799px)', width: '799' },
          { width: '1920' },
        ]);
        moveInstrumentation(picture, optimizedPic.querySelector('img'));
        slideBgImg.append(optimizedPic);
      }
    }

    const mobContentHomeSpotlight = document.createElement('div');
    mobContentHomeSpotlight.classList.add('mob-content-home-spotlight');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content', 'text-center', 'text-lg-start');

    if (smallTextCell.textContent.trim()) {
      const small = document.createElement('small');
      small.style.fontWeight = 'bold';
      small.textContent = smallTextCell.textContent.trim();
      contentDiv.append(small);
    }

    if (headingCell.textContent.trim()) {
      const heading = document.createElement('h2');
      heading.classList.add('heading', 'font-medium', 'font-size-tb');
      heading.textContent = headingCell.textContent.trim();
      contentDiv.append(heading);
    }

    if (descriptionCell.textContent.trim()) {
      const p = document.createElement('p');
      moveInstrumentation(descriptionCell, p);
      while (descriptionCell.firstChild) p.append(descriptionCell.firstChild);
      contentDiv.append(p);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const btn = document.createElement('a');
      btn.classList.add('btn', 'btn-primary');
      btn.href = ctaLink.href;
      btn.textContent = ctaLinkLabelCell.textContent.trim();
      moveInstrumentation(ctaLinkCell, btn);
      contentDiv.append(btn);
    }

    mobContentHomeSpotlight.append(contentDiv);
    swiperSlide.append(slideBgImg, mobContentHomeSpotlight);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(row, swiperSlide);
  });

  mainSlider.append(swiperWrapper);

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev', 'slide-home-btn', 'swiper-button-white');
  swiperButtonPrev.setAttribute('tabindex', '0');
  swiperButtonPrev.setAttribute('role', 'button');
  swiperButtonPrev.setAttribute('aria-label', 'Previous slide');
  swiperButtonPrev.setAttribute('aria-controls', 'swiper-wrapper-f55dae73a5c7f746');
  const prevImg = document.createElement('img');
  prevImg.alt = 'svg file';
  prevImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775753818272.svg+xml';
  swiperButtonPrev.append(prevImg);

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next', 'slide-home-btn', 'swiper-button-white');
  swiperButtonNext.setAttribute('tabindex', '0');
  swiperButtonNext.setAttribute('role', 'button');
  swiperButtonNext.setAttribute('aria-label', 'Next slide');
  swiperButtonNext.setAttribute('aria-controls', 'swiper-wrapper-f55dae73a5c7f746');
  const nextImg = document.createElement('img');
  nextImg.alt = 'svg file';
  nextImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775753818272.svg+xml';
  swiperButtonNext.append(nextImg);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'bullet-bottom');

  mainSlider.append(swiperButtonPrev, swiperButtonNext, swiperPagination);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  mainSlider.append(swiperNotification);

  const quickLinksParentDiv = document.createElement('div');
  quickLinksParentDiv.classList.add('mt-0', 'pt-1', 'pb-1', 'm-none1', 'bottom-0', 'w-100', 'quick-links-parents-div', 'position-relative');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'aos-init', 'aos-animate');
  containerDiv.setAttribute('data-aos', 'fade-up');
  containerDiv.setAttribute('data-aos-offset', '-100');
  containerDiv.setAttribute('data-aos-duration', '650');
  containerDiv.setAttribute('data-aos-easing', 'ease-in-out');

  const quickLinksUl = document.createElement('ul');
  quickLinksUl.classList.add('quick-links-div');

  quickLinks.forEach((row) => {
    const [linkCell, linkLabelCell] = [...row.children];

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const link = linkCell.querySelector('a');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.classList.add('with-full-underline');
      anchor.textContent = linkLabelCell.textContent.trim();
      li.append(anchor);
    }
    quickLinksUl.append(li);
  });

  containerDiv.append(quickLinksUl);
  quickLinksParentDiv.append(containerDiv);

  block.textContent = '';
  block.classList.add('m-0', 'p-0');
  block.append(mainSlider, quickLinksParentDiv);

  // Swiper initialization (simplified, as EDS doesn't load Bootstrap JS)
  // This would typically involve a Swiper library import and initialization
  // For this exercise, we'll just add basic navigation functionality
  let currentSlide = 0;
  const slidesCount = slides.length;

  const updateSlider = () => {
    swiperWrapper.style.transform = `translate3d(-${currentSlide * 100}%, 0px, 0px)`;
    [...swiperWrapper.children].forEach((slideEl, idx) => {
      if (idx === currentSlide) {
        slideEl.classList.add('swiper-slide-active', 'swiper-slide-fully-visible', 'swiper-slide-visible');
      } else {
        slideEl.classList.remove('swiper-slide-active', 'swiper-slide-fully-visible', 'swiper-slide-visible');
      }
      if (idx === (currentSlide - 1 + slidesCount) % slidesCount) {
        slideEl.classList.add('swiper-slide-prev');
      } else {
        slideEl.classList.remove('swiper-slide-prev');
      }
      if (idx === (currentSlide + 1) % slidesCount) {
        slideEl.classList.add('swiper-slide-next');
      } else {
        slideEl.classList.remove('swiper-slide-next');
      }
    });
  };

  swiperButtonNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slidesCount;
    updateSlider();
  });

  swiperButtonPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
    updateSlider();
  });

  updateSlider(); // Initialize slider position
}
