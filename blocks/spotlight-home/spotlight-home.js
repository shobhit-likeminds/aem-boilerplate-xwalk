import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];

  const slideRows = allRows.filter((row) => row.children.length === 7);
  const quickLinkRows = allRows.filter((row) => row.children.length === 2);

  const spotlightHomeWrap = document.createElement('section');
  spotlightHomeWrap.classList.add('section', 'spotlight-home-wrap', 'm-0', 'p-0');
  moveInstrumentation(block, spotlightHomeWrap);

  const beamSlider = document.createElement('div');
  beamSlider.classList.add('beam-slider', 'main-slider', 'loading1', 'beam-slider-multi'); // swiper-initialized, swiper-horizontal, swiper-watch-progress, swiper-backface-hidden are added by Swiper JS
  spotlightHomeWrap.appendChild(beamSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('id', 'swiper-wrapper-spotlight');
  beamSlider.appendChild(swiperWrapper);

  slideRows.forEach((row, index) => {
    const [imageCell, altCell, headingCell, subheadingCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'nogradient');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${slideRows.length}`);
    swiperSlide.setAttribute('data-swiper-slide-index', index);
    moveInstrumentation(row, swiperSlide);

    const slideBgImg = document.createElement('div');
    slideBgImg.classList.add('slide-bgimg');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, altCell.textContent.trim(), false, [{ width: '1903' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      slideBgImg.appendChild(optimizedPic);
    }
    swiperSlide.appendChild(slideBgImg);

    const mobContentHomeSpotlight = document.createElement('div');
    mobContentHomeSpotlight.classList.add('mob-content-home-spotlight');
    swiperSlide.appendChild(mobContentHomeSpotlight);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content', 'text-center', 'text-lg-start');
    mobContentHomeSpotlight.appendChild(contentDiv);

    if (subheadingCell.textContent.trim()) {
      const small = document.createElement('small');
      small.style.fontWeight = 'bold';
      small.textContent = subheadingCell.textContent.trim();
      contentDiv.appendChild(small);
    }

    if (headingCell.textContent.trim()) {
      const heading = document.createElement('h2');
      heading.classList.add('heading', 'font-medium', 'font-size-tb');
      if (index === 0) heading.classList.add('banner-text-dark');
      if (headingCell.textContent.trim().split('<br>').length > 1) {
        heading.innerHTML = headingCell.textContent.trim();
      } else {
        heading.textContent = headingCell.textContent.trim();
      }
      contentDiv.appendChild(heading);
    }

    if (descriptionCell.textContent.trim()) {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${descriptionCell.textContent.trim()}</strong>`;
      contentDiv.appendChild(p);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaLabel = ctaLabelCell.textContent.trim();
    if (ctaLink && ctaLabel) {
      const anchor = document.createElement('a');
      anchor.href = ctaLink.href;
      anchor.textContent = ctaLabel;
      anchor.classList.add('btn', 'btn-primary');
      moveInstrumentation(ctaLinkCell, anchor);
      contentDiv.appendChild(anchor);
    }

    swiperWrapper.appendChild(swiperSlide);
  });

  // Swiper navigation buttons
  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev', 'slide-home-btn', 'swiper-button-white');
  prevButton.setAttribute('tabindex', '0');
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.setAttribute('aria-controls', 'swiper-wrapper-spotlight');
  prevButton.innerHTML = '<img alt="Previous" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'%3E%3Cpath fill=\'%23fff\' d=\'M9.88 13.88L4.76 8.76a.625.625 0 0 1 0-.88L9.88 3.76a.625.625 0 0 1 .88.88L6.03 8.32l4.73 4.73a.625.625 0 0 1-.88.83Z\'/%3E%3C/svg%3E">'; // Inline SVG for arrow
  beamSlider.appendChild(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next', 'slide-home-btn', 'swiper-button-white');
  nextButton.setAttribute('tabindex', '0');
  nextButton.setAttribute('role', 'button');
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.setAttribute('aria-controls', 'swiper-wrapper-spotlight');
  nextButton.innerHTML = '<img alt="Next" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'%3E%3Cpath fill=\'%23fff\' d=\'M6.12 13.88a.625.625 0 0 1-.88-.88l4.73-4.73L5.24 4.64a.625.625 0 0 1 .88-.88l5.12 5.12a.625.625 0 0 1 0 .88L6.12 13.88Z\'/%3E%3C/svg%3E">'; // Inline SVG for arrow
  beamSlider.appendChild(nextButton);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'bullet-bottom');
  beamSlider.appendChild(swiperPagination);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  beamSlider.appendChild(swiperNotification);

  // Quick Links section
  const quickLinksParentDiv = document.createElement('div');
  quickLinksParentDiv.classList.add('mt-0', 'pt-1', 'pb-1', 'm-none1', 'bottom-0', 'w-100', 'quick-links-parents-div', 'position-relative');
  spotlightHomeWrap.appendChild(quickLinksParentDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'aos-init', 'aos-animate');
  containerDiv.setAttribute('data-aos', 'fade-up');
  containerDiv.setAttribute('data-aos-offset', '-100');
  containerDiv.setAttribute('data-aos-duration', '650');
  containerDiv.setAttribute('data-aos-easing', 'ease-in-out');
  quickLinksParentDiv.appendChild(containerDiv);

  const quickLinksUl = document.createElement('ul');
  quickLinksUl.classList.add('quick-links-div');
  containerDiv.appendChild(quickLinksUl);

  quickLinkRows.forEach((row) => {
    const [linkCell, labelCell] = [...row.children];

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    anchor.classList.add('with-full-underline');
    li.appendChild(anchor);
    quickLinksUl.appendChild(li);
  });

  block.replaceWith(spotlightHomeWrap);

  // Initialize Swiper (assuming Swiper library is loaded globally or imported)
  // This part is typically handled by a separate script that loads Swiper JS.
  // For EDS, we only build the DOM structure.
  // If Swiper is needed, it should be loaded as a dependency and initialized here.
  // Example:
  // import Swiper from 'swiper/bundle';
  // new Swiper(beamSlider, {
  //   loop: true,
  //   slidesPerView: 1,
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //   },
  // });
}
