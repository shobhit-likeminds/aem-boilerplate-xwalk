import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const slides = [...block.children];

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('elementor-widget-container');

  const swiperEl = document.createElement('div');
  // Removed swiper-initialized, swiper-horizontal, swiper-pointer-events as Swiper adds them
  swiperEl.classList.add('e-n-carousel', 'swiper', 'offset-right', 'e-widget-swiper');
  swiperEl.setAttribute('role', 'region');
  swiperEl.setAttribute('aria-roledescription', 'carousel');
  swiperEl.setAttribute('aria-label', 'Explore Other Categories');
  swiperEl.setAttribute('dir', 'ltr');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');

  slides.forEach((slideRow, index) => {
    const [imageCell, imageLinkCell, ctaLinkCell, ctaLabelCell] = [...slideRow.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('data-slide', String(index + 1));
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${slides.length}`);
    swiperSlide.setAttribute('data-swiper-slide-index', String(index));

    const elementorElementContainer = document.createElement('div');
    elementorElementContainer.classList.add('elementor-element', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');
    // data-id is an invented attribute, not a class, so we skip it.

    const eConInner = document.createElement('div');
    eConInner.classList.add('e-con-inner');

    const eConFull = document.createElement('div');
    eConFull.classList.add('elementor-element', 'e-con-full', 'e-flex', 'e-con', 'e-child');
    // data-id is an invented attribute, not a class, so we skip it.

    const imageWidget = document.createElement('div');
    imageWidget.classList.add('elementor-element', 'dce_masking-none', 'elementor-widget', 'elementor-widget-image');
    // data-id and data-element_type are invented attributes, not classes, so we skip them.

    const imageWidgetContainer = document.createElement('div');
    imageWidgetContainer.classList.add('elementor-widget-container');

    const imageLink = document.createElement('a');
    const originalImageLink = imageLinkCell.querySelector('a');
    if (originalImageLink) {
      imageLink.href = originalImageLink.href;
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img')); // Move instrumentation from original img to optimized img
      imageLink.append(optimizedPic);
    }
    imageWidgetContainer.append(imageLink);
    imageWidget.append(imageWidgetContainer);

    const buttonWidget = document.createElement('div');
    buttonWidget.classList.add('elementor-element', 'elementor-align-justify', 'elementor-widget', 'elementor-widget-button');
    // data-id and data-element_type are invented attributes, not classes, so we skip them.

    const buttonWidgetContainer = document.createElement('div');
    buttonWidgetContainer.classList.add('elementor-widget-container');

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('elementor-button-wrapper');

    const ctaButton = document.createElement('a');
    ctaButton.classList.add('elementor-button', 'elementor-button-link', 'elementor-size-sm');
    const originalCtaLink = ctaLinkCell.querySelector('a');
    if (originalCtaLink) {
      ctaButton.href = originalCtaLink.href;
    }

    const buttonContentWrapper = document.createElement('span');
    buttonContentWrapper.classList.add('elementor-button-content-wrapper');

    const buttonIcon = document.createElement('span');
    buttonIcon.classList.add('elementor-button-icon');
    buttonIcon.innerHTML = `
      <svg aria-hidden="true" class="e-font-icon-svg e-fas-arrow-right" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path></svg>
    `;

    const buttonText = document.createElement('span');
    buttonText.classList.add('elementor-button-text');
    buttonText.textContent = ctaLabelCell.textContent.trim();

    buttonContentWrapper.append(buttonIcon, buttonText);
    ctaButton.append(buttonContentWrapper);
    buttonWrapper.append(ctaButton);
    buttonWidgetContainer.append(buttonWrapper);
    buttonWidget.append(buttonWidgetContainer);

    eConFull.append(imageWidget, buttonWidget);
    eConInner.append(eConFull);
    elementorElementContainer.append(eConInner);
    swiperSlide.append(elementorElementContainer);
    swiperWrapper.append(swiperSlide);

    moveInstrumentation(slideRow, swiperSlide);
  });

  const paginationEl = document.createElement('div');
  paginationEl.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  swiperEl.append(swiperWrapper);
  carouselContainer.append(swiperEl, paginationEl);

  block.replaceChildren(carouselContainer);

  // Initialize Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // Read loop setting from data-settings in original HTML, if available
  // The original HTML has data-settings="{...&quot;infinite&quot;:&quot;yes&quot;,...}"
  // We'll assume 'yes' means true, anything else (or missing) means false.
  const blockSettings = JSON.parse(block.parentElement.dataset.settings || '{}');
  const isLoop = blockSettings.infinite === 'yes';

  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 1, // Default to 1 for mobile
    spaceBetween: 16,
    loop: isLoop, // Use the parsed loop setting
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: blockSettings.slides_to_show_tablet || 3,
        spaceBetween: 16, // Assuming some default spacing
      },
      992: {
        slidesPerView: blockSettings.slides_to_show || 3,
        spaceBetween: 16, // Assuming some default spacing
      },
    },
  });
}
