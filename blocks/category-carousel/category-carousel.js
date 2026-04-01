import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('elementor-element', 'elementor-element-1c8724a2', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('e-con-inner');
  mainContainer.append(innerContainer);

  // Heading
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('elementor-element', 'elementor-element-1b08eba', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  moveInstrumentation(headingRow, headingWrapper);

  const headingWidget = document.createElement('div');
  headingWidget.classList.add('elementor-element', 'elementor-element-4a5e4fe6', 'elementor-widget-mobile__width-inherit', 'elementor-widget', 'elementor-widget-heading');

  const headingWidgetContainer = document.createElement('div');
  headingWidgetContainer.classList.add('elementor-widget-container');

  const heading = document.createElement('h2');
  heading.classList.add('elementor-heading-title', 'elementor-size-default');
  heading.textContent = headingRow.firstElementChild.textContent;

  headingWidgetContainer.append(heading);
  headingWidget.append(headingWidgetContainer);
  headingWrapper.append(headingWidget);
  innerContainer.append(headingWrapper);

  // Carousel Wrapper
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('elementor-element', 'elementor-element-67886307', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');

  const carouselInnerContainer = document.createElement('div');
  carouselInnerContainer.classList.add('e-con-inner');
  carouselWrapper.append(carouselInnerContainer);

  const carouselWidget = document.createElement('div');
  carouselWidget.classList.add('elementor-element', 'elementor-element-56e2d22b', 'elementor-pagination-type-bullets', 'elementor-pagination-position-outside', 'elementor-widget', 'elementor-widget-n-carousel', 'e-widget-swiper');

  const carouselWidgetContainer = document.createElement('div');
  carouselWidgetContainer.classList.add('elementor-widget-container');
  carouselWidget.append(carouselWidgetContainer);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('e-n-carousel', 'swiper', 'offset-right', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events');
  swiperContainer.setAttribute('role', 'region');
  swiperContainer.setAttribute('aria-roledescription', 'carousel');
  swiperContainer.setAttribute('aria-label', 'Explore Other Categories');
  swiperContainer.setAttribute('dir', 'ltr');
  carouselWidgetContainer.append(swiperContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'polite');
  swiperContainer.append(swiperWrapper);

  itemRows.forEach((row) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    moveInstrumentation(row, swiperSlide);

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('elementor-element', 'e-flex', 'e-con-boxed', 'e-con', 'e-child'); // Specific element classes are dynamic, using generic ones

    const itemInnerContainer = document.createElement('div');
    itemInnerContainer.classList.add('e-con-inner');
    itemContainer.append(itemInnerContainer);

    const itemContentContainer = document.createElement('div');
    itemContentContainer.classList.add('elementor-element', 'e-con-full', 'e-flex', 'e-con', 'e-child');
    itemInnerContainer.append(itemContentContainer);

    let imageLink = '#';
    let imageSrc = '';
    let imageAlt = '';
    let buttonLabel = '';
    let buttonLink = '#';
    let iconSrc = '';

    // Content detection for cells
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a') && !cell.querySelector('picture')); // Link cell without an image
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')); // Label cell without image or link

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      imageSrc = img ? img.src : '';
      imageAlt = img ? img.alt : '';
      const link = imageCell.querySelector('a');
      if (link) {
        imageLink = link.href;
      }
    }

    if (linkCell) {
      const link = linkCell.querySelector('a');
      if (link) {
        buttonLink = link.href;
        buttonLabel = link.textContent.trim();
        const iconImg = link.querySelector('img');
        if (iconImg) {
          iconSrc = iconImg.src;
        }
      }
    } else if (labelCell) {
      // If no explicit link cell, the label might be in a separate text cell
      buttonLabel = labelCell.textContent.trim();
    }

    // Image Element
    const imageWidget = document.createElement('div');
    imageWidget.classList.add('elementor-element', 'dce_masking-none', 'elementor-widget', 'elementor-widget-image');

    const imageWidgetContainer = document.createElement('div');
    imageWidgetContainer.classList.add('elementor-widget-container');
    imageWidget.append(imageWidgetContainer);

    const imageAnchor = document.createElement('a');
    imageAnchor.href = imageLink;

    if (imageSrc) {
      const optimizedPic = createOptimizedPicture(imageSrc, imageAlt, false, [{ width: '1500' }]);
      imageAnchor.append(optimizedPic);
    }
    imageWidgetContainer.append(imageAnchor);
    itemContentContainer.append(imageWidget);

    // Button Element
    const buttonWidget = document.createElement('div');
    buttonWidget.classList.add('elementor-element', 'elementor-align-justify', 'elementor-widget', 'elementor-widget-button');

    const buttonWidgetContainer = document.createElement('div');
    buttonWidgetContainer.classList.add('elementor-widget-container');
    buttonWidget.append(buttonWidgetContainer);

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('elementor-button-wrapper');
    buttonWidgetContainer.append(buttonWrapper);

    const buttonAnchor = document.createElement('a');
    buttonAnchor.classList.add('elementor-button', 'elementor-button-link', 'elementor-size-sm');
    buttonAnchor.href = buttonLink;
    buttonWrapper.append(buttonAnchor);

    const buttonContentWrapper = document.createElement('span');
    buttonContentWrapper.classList.add('elementor-button-content-wrapper');
    buttonAnchor.append(buttonContentWrapper);

    if (iconSrc) {
      const buttonIcon = document.createElement('span');
      buttonIcon.classList.add('elementor-button-icon');
      const iconImg = document.createElement('img');
      iconImg.alt = 'svg file';
      iconImg.src = iconSrc;
      buttonIcon.append(iconImg);
      buttonContentWrapper.append(buttonIcon);
    }

    const buttonText = document.createElement('span');
    buttonText.classList.add('elementor-button-text');
    buttonText.textContent = buttonLabel;
    buttonContentWrapper.append(buttonText);

    itemContentContainer.append(buttonWidget);
    swiperSlide.append(itemContainer);
    swiperWrapper.append(swiperSlide);
  });

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  swiperContainer.append(swiperNotification);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  carouselWidgetContainer.append(swiperPagination);

  innerContainer.append(carouselWrapper);

  block.textContent = '';
  block.append(mainContainer);

  // Initialize Swiper (simplified - actual Swiper JS would be loaded externally)
  // This part assumes Swiper is loaded and available globally or imported.
  // For EDS, interactive behavior should be added via event listeners if Swiper JS isn't loaded.
  // Given the original HTML uses Swiper classes and structure, we'll assume Swiper JS is handled
  // at a higher level (e.g., in a global script or a specific block JS that loads Swiper).
  // If Swiper JS is not loaded, this carousel will not function interactively.
  // For this exercise, we only create the DOM structure.
  if (typeof Swiper !== 'undefined') {
    // eslint-disable-next-line no-unused-vars, no-new
    new Swiper(swiperContainer, {
      slidesPerView: 3,
      spaceBetween: 0,
      loop: true,
      pagination: {
        el: swiperPagination,
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
      },
    });
  }
}
