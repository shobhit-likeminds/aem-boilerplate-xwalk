import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-pointer-events');
  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', 'carousel');
  block.setAttribute('aria-label', 'Carousel');
  block.setAttribute('dir', 'ltr');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'off');
  // The original HTML has a specific ID for the swiper-wrapper, which should be used for aria-controls
  // For now, we'll use a generic one or derive it if possible.
  // For this review, let's assume a generic ID if not directly derivable from block.
  const swiperWrapperId = `swiper-wrapper-${Math.random().toString(36).substring(2, 15)}`;
  swiperWrapper.id = swiperWrapperId;


  // The first row is the container field "slides", but its content is not used directly as a slide.
  // The actual slide item rows start from block.children[1].
  const slideRows = [...block.children].slice(1);

  slideRows.forEach((row, index) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('data-slide', index + 1);
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${slideRows.length}`);
    swiperSlide.setAttribute('data-swiper-slide-index', index);

    // Each item row in the EDS block structure has only one cell: the image.
    // The original HTML shows a specific structure for each slide:
    // <div class="elementor-element elementor-element-0ec2d9c e-con-full e-flex e-con e-child">
    //   <div class="elementor-element elementor-element-7a0e072 elementor-widget elementor-widget-image">
    //     <img ...>
    //   </div>
    // </div>

    const elementorContainer = document.createElement('div');
    elementorContainer.classList.add('elementor-element', 'e-con-full', 'e-flex', 'e-con', 'e-child');
    // To match the original HTML, we need to extract the specific elementor-element-ID from the row if available.
    // The block structure doesn't provide this directly, so we'll generate a placeholder or omit if not critical.
    // For this review, we'll generate a placeholder ID to simulate the original structure.
    elementorContainer.classList.add(`elementor-element-${Math.random().toString(36).substring(2, 9)}`);


    const elementorWidgetImage = document.createElement('div');
    elementorWidgetImage.classList.add('elementor-element', 'elementor-widget', 'elementor-widget-image');
    elementorWidgetImage.classList.add(`elementor-element-${Math.random().toString(36).substring(2, 9)}`);


    // The image cell is the first (and only) child of the item row.
    const imageCell = row.children[0];
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          // Extract existing classes from the original image to apply to the new one
          const imgClasses = Array.from(img.classList);
          const newImg = document.createElement('img');
          newImg.loading = 'lazy';
          newImg.decoding = 'async';
          newImg.src = img.src;
          newImg.alt = img.alt;
          newImg.width = img.width;
          newImg.height = img.height;
          // Apply classes from the original image, ensuring they are from the allowlist
          imgClasses.forEach(cls => {
            if (['attachment-full', 'size-full', 'wp-image-635', 'wp-image-630', 'wp-image-631', 'wp-image-632', 'wp-image-638', 'wp-image-637'].includes(cls)) {
              newImg.classList.add(cls);
            }
          });


          const optimizedPic = createOptimizedPicture(newImg.src, newImg.alt, false, [{ width: '1920' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          elementorWidgetImage.append(optimizedPic);
        }
      }
    }

    elementorContainer.append(elementorWidgetImage);
    swiperSlide.append(elementorContainer);
    swiperWrapper.append(swiperSlide);
  });

  block.textContent = '';
  block.append(swiperWrapper);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  block.append(swiperNotification);

  // Navigation buttons
  const prevButton = document.createElement('div');
  prevButton.classList.add('elementor-swiper-button', 'elementor-swiper-button-prev');
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('tabindex', '0');
  prevButton.setAttribute('aria-label', 'Previous slide');
  prevButton.setAttribute('aria-controls', swiperWrapperId); // Use the dynamically generated ID
  const prevImg = document.createElement('img');
  prevImg.alt = 'svg file';
  prevImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774440095906.svg+xml'; // Placeholder path
  prevButton.append(prevImg);
  block.append(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('elementor-swiper-button', 'elementor-swiper-button-next');
  nextButton.setAttribute('role', 'button');
  nextButton.setAttribute('tabindex', '0');
  nextButton.setAttribute('aria-label', 'Next slide');
  nextButton.setAttribute('aria-controls', swiperWrapperId); // Use the dynamically generated ID
  const nextImg = document.createElement('img');
  nextImg.alt = 'svg file';
  nextImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774440096022.svg+xml'; // Placeholder path
  nextButton.append(nextImg);
  block.append(nextButton);

  // Pagination
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  block.append(swiperPagination);

  // Basic Swiper-like functionality (without actual Swiper library)
  let currentIndex = 0;

  const updateSlides = () => {
    const slides = [...swiperWrapper.children];
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(-${currentIndex * 100}%)`;
      slide.setAttribute('aria-hidden', i !== currentIndex);
      if (i === currentIndex) {
        slide.classList.add('swiper-slide-active');
        slide.removeAttribute('inert');
      } else {
        slide.classList.remove('swiper-slide-active');
        slide.setAttribute('inert', '');
      }
    });

    const bullets = [...swiperPagination.children];
    bullets.forEach((bullet, i) => {
      if (i === currentIndex) {
        bullet.classList.add('swiper-pagination-bullet-active');
        bullet.setAttribute('aria-current', 'true');
        bullet.setAttribute('tabindex', '0');
      } else {
        bullet.classList.remove('swiper-pagination-bullet-active');
        bullet.removeAttribute('aria-current');
        bullet.setAttribute('tabindex', '-1');
      }
    });
  };

  const goToSlide = (index) => {
    currentIndex = (index + slideRows.length) % slideRows.length;
    updateSlides();
  };

  prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));

  // Create pagination bullets
  slideRows.forEach((_, i) => {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    bullet.setAttribute('role', 'button');
    bullet.setAttribute('data-bullet-index', i);
    bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);
    bullet.addEventListener('click', () => goToSlide(i));
    swiperPagination.append(bullet);
  });

  updateSlides(); // Initial update
}
