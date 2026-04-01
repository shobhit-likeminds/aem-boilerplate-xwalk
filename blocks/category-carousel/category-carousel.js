import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CRITICAL: Add page ID classes to the block root element
  block.classList.add('elementor', 'elementor-132');

  const [headingRow, ...itemRows] = [...block.children];

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('elementor-element', 'elementor-element-1c8724a2', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('e-con-inner');
  mainContainer.append(innerContainer);

  // Heading
  if (headingRow) {
    const headingWrapper = document.createElement('div');
    headingWrapper.classList.add('elementor-element', 'elementor-element-1b08eba', 'e-con-full', 'e-flex', 'e-con', 'e-child');

    const headingWidget = document.createElement('div');
    headingWidget.classList.add('elementor-element', 'elementor-element-4a5e4fe6', 'elementor-widget-mobile__width-inherit', 'elementor-widget', 'elementor-widget-heading');

    const headingWidgetContainer = document.createElement('div');
    headingWidgetContainer.classList.add('elementor-widget-container');

    const h2 = document.createElement('h2');
    h2.classList.add('elementor-heading-title', 'elementor-size-default');
    // Correctly extract heading text from the first child's text content
    moveInstrumentation(headingRow.firstElementChild, h2);
    h2.textContent = headingRow.firstElementChild.textContent.trim();

    headingWidgetContainer.append(h2);
    headingWidget.append(headingWidgetContainer);
    headingWrapper.append(headingWidget);
    innerContainer.append(headingWrapper);
  }

  // Carousel items
  if (itemRows.length > 0) {
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('elementor-element', 'elementor-element-67886307', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');

    const carouselInner = document.createElement('div');
    carouselInner.classList.add('e-con-inner');
    carouselContainer.append(carouselInner);

    const nCarouselWidget = document.createElement('div');
    nCarouselWidget.classList.add('elementor-element', 'elementor-element-56e2d22b', 'elementor-pagination-type-bullets', 'elementor-pagination-position-outside', 'elementor-widget', 'elementor-widget-n-carousel', 'e-widget-swiper');

    const nCarouselWidgetContainer = document.createElement('div');
    nCarouselWidgetContainer.classList.add('elementor-widget-container');
    nCarouselWidget.append(nCarouselWidgetContainer);

    const swiper = document.createElement('div');
    swiper.classList.add('e-n-carousel', 'swiper', 'offset-right', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events');
    swiper.setAttribute('role', 'region');
    swiper.setAttribute('aria-roledescription', 'carousel');
    swiper.setAttribute('aria-label', 'Explore Other Categories');
    swiper.setAttribute('dir', 'ltr');
    nCarouselWidgetContainer.append(swiper);

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    swiperWrapper.setAttribute('aria-live', 'polite');
    swiper.append(swiperWrapper);

    itemRows.forEach((row, index) => {
      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      swiperSlide.setAttribute('data-slide', index + 1);
      swiperSlide.setAttribute('role', 'group');
      swiperSlide.setAttribute('aria-roledescription', 'slide');
      swiperSlide.setAttribute('aria-label', `${index + 1} / ${itemRows.length}`);
      swiperSlide.setAttribute('data-swiper-slide-index', index);
      moveInstrumentation(row, swiperSlide);

      const itemContainer = document.createElement('div');
      itemContainer.classList.add('elementor-element', 'elementor-element-61ad71e4', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');

      const itemInner = document.createElement('div');
      itemInner.classList.add('e-con-inner');
      itemContainer.append(itemInner);

      const itemContentWrapper = document.createElement('div');
      itemContentWrapper.classList.add('elementor-element', 'elementor-element-655ab90f', 'e-con-full', 'e-flex', 'e-con', 'e-child');
      itemInner.append(itemContentWrapper);

      let imageLink = null;
      let labelLink = null;
      let labelText = '';

      // Extract content based on BlockJson structure: Image, Link, Label
      const cells = [...row.children];
      const imageCell = cells[0]; // field="image"
      const linkCell = cells[1];  // field="link"
      const labelCell = cells[2]; // field="label"

      // Process Image
      if (imageCell) {
        const picture = imageCell.querySelector('picture');
        const link = imageCell.querySelector('a'); // Check if the image itself is wrapped in a link
        if (picture) {
          const imgWidget = document.createElement('div');
          imgWidget.classList.add('elementor-element', 'elementor-element-7e3bdca', 'dce_masking-none', 'elementor-widget', 'elementor-widget-image');
          const imgWidgetContainer = document.createElement('div');
          imgWidgetContainer.classList.add('elementor-widget-container');

          const imgLink = document.createElement('a');
          imageLink = link ? link.href : '#'; // Use link from image cell if present
          imgLink.href = imageLink;

          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            imgLink.append(optimizedPic);
          }
          imgWidgetContainer.append(imgLink);
          imgWidget.append(imgWidgetContainer);
          itemContentWrapper.append(imgWidget);
        }
      }

      // Process Link and Label
      if (linkCell) {
        const link = linkCell.querySelector('a');
        if (link) {
          labelLink = link.href;
          labelText = link.textContent.trim();
        } else {
          // Fallback if link cell contains just text (though BlockJson says aem-content)
          labelText = linkCell.textContent.trim();
        }
      }

      if (labelCell && !labelLink) { // Only use labelCell for text if link wasn't found in linkCell
        labelText = labelCell.textContent.trim();
      }


      const buttonWidget = document.createElement('div');
      buttonWidget.classList.add('elementor-element', 'elementor-element-7ed0c910', 'elementor-align-justify', 'elementor-widget', 'elementor-widget-button');
      const buttonWidgetContainer = document.createElement('div');
      buttonWidgetContainer.classList.add('elementor-widget-container');
      const buttonWrapper = document.createElement('div');
      buttonWrapper.classList.add('elementor-button-wrapper');
      const buttonLink = document.createElement('a');
      buttonLink.classList.add('elementor-button', 'elementor-button-link', 'elementor-size-sm');
      buttonLink.href = labelLink || imageLink || '#'; // Prioritize labelLink, then imageLink

      const buttonContentWrapper = document.createElement('span');
      buttonContentWrapper.classList.add('elementor-button-content-wrapper');

      const buttonIcon = document.createElement('span');
      buttonIcon.classList.add('elementor-button-icon');
      const iconImg = document.createElement('img');
      iconImg.alt = 'svg file';
      iconImg.src = '/icons/arrow-right.svg'; // Placeholder for the SVG icon
      buttonIcon.append(iconImg);

      const buttonText = document.createElement('span');
      buttonText.classList.add('elementor-button-text');
      buttonText.textContent = labelText;

      buttonContentWrapper.append(buttonIcon, buttonText);
      buttonLink.append(buttonContentWrapper);
      buttonWrapper.append(buttonLink);
      buttonWidgetContainer.append(buttonWrapper);
      buttonWidget.append(buttonWidgetContainer);
      itemContentWrapper.append(buttonWidget);

      swiperSlide.append(itemContainer);
      swiperWrapper.append(swiperSlide);
    });

    const swiperNotification = document.createElement('span');
    swiperNotification.classList.add('swiper-notification');
    swiperNotification.setAttribute('aria-live', 'assertive');
    swiperNotification.setAttribute('aria-atomic', 'true');
    swiper.append(swiperNotification);

    const swiperPagination = document.createElement('div');
    swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
    swiper.append(swiperPagination);

    // Add pagination bullets (dummy for now, actual Swiper JS will populate)
    itemRows.forEach((_, index) => {
      const bullet = document.createElement('span');
      bullet.classList.add('swiper-pagination-bullet');
      if (index === 0) {
        bullet.classList.add('swiper-pagination-bullet-active');
        bullet.setAttribute('aria-current', 'true');
      }
      bullet.setAttribute('role', 'button');
      bullet.setAttribute('data-bullet-index', index);
      bullet.setAttribute('aria-label', `Go to slide ${index + 1}`);
      swiperPagination.append(bullet);
    });

    carouselInner.append(nCarouselWidget);
    innerContainer.append(carouselContainer);
  }

  block.textContent = '';
  block.append(mainContainer);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Basic Swiper-like functionality for navigation (no touch/drag)
  const swiperWrapper = block.querySelector('.swiper-wrapper');
  const swiperSlides = [...block.querySelectorAll('.swiper-slide')];
  const swiperBullets = [...block.querySelectorAll('.swiper-pagination-bullet')];
  let currentIndex = 0;
  let slideWidth = 0;

  const updateSlideWidth = () => {
    slideWidth = swiperSlides[0]?.offsetWidth || 0;
  };

  const updateCarousel = () => {
    updateSlideWidth(); // Recalculate slide width before updating transform
    swiperWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    swiperBullets.forEach((bullet, i) => {
      if (i === currentIndex) {
        bullet.classList.add('swiper-pagination-bullet-active');
        bullet.setAttribute('aria-current', 'true');
      } else {
        bullet.classList.remove('swiper-pagination-bullet-active');
        bullet.removeAttribute('aria-current');
      }
    });
  };

  swiperBullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Add a ResizeObserver to update slide width if the container size changes
  const resizeObserver = new ResizeObserver(() => {
    updateCarousel();
  });

  if (swiperWrapper) {
    resizeObserver.observe(swiperWrapper);
  }

  if (swiperSlides.length > 0) {
    updateCarousel(); // Initialize carousel position
  }
}
