import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...testimonialRows] = [...block.children];

  block.textContent = '';
  block.classList.add('customer-say-template');

  // Heading
  const headingElement = document.createElement('h2');
  headingElement.classList.add('customer-say-heading');
  moveInstrumentation(headingRow, headingElement);
  headingElement.textContent = headingRow.firstElementChild.textContent.trim();
  block.append(headingElement);

  // Testimonials container
  const customerSayContainer = document.createElement('div');
  customerSayContainer.classList.add('customer-say-container');
  block.append(customerSayContainer);

  const commonCustomerSayComponent = document.createElement('div');
  commonCustomerSayComponent.classList.add('common-customer-say-component');
  customerSayContainer.append(commonCustomerSayComponent);

  const desktopCustomerSay = document.createElement('div');
  desktopCustomerSay.classList.add('desktop-customer-say');
  commonCustomerSayComponent.append(desktopCustomerSay);

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-initialized', 'swiper-horizontal');
  desktopCustomerSay.append(swiper);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiper.append(swiperWrapper);

  testimonialRows.forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const textCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim().length > 0);
    const authorCell = cells.find(cell => cell !== imageCell && cell !== textCell);

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    // Corrected swiper-slide class logic based on original HTML and common Swiper behavior
    if (index === 0) {
      // Initially, the first slide might be active, or a specific one from HTML
      // For dynamic generation, we'll make the first one active by default
      swiperSlide.classList.add('swiper-slide-active');
    }
    // The original HTML shows specific slides as active, prev, next.
    // The JS's `updateSlides` function will handle these dynamically.
    // We should not hardcode prev/next classes here for all slides.
    // The initial state should reflect the first slide as active.

    // Set width and margin-right based on original HTML
    swiperSlide.style.width = '615px';
    swiperSlide.style.marginRight = '10px';
    moveInstrumentation(row, swiperSlide);
    swiperWrapper.append(swiperSlide);

    const testimonialContainer = document.createElement('div');
    testimonialContainer.classList.add('testimonial-container');
    swiperSlide.append(testimonialContainer);

    const borderStrip = document.createElement('div');
    borderStrip.classList.add(index % 2 === 0 ? 'blue-border-strip' : 'red-border-strip');
    testimonialContainer.append(borderStrip);

    const testimonialBox = document.createElement('div');
    testimonialBox.classList.add('testimonial-box');
    testimonialContainer.append(testimonialBox);

    const testimonialImgBox = document.createElement('div');
    testimonialImgBox.classList.add('testimonial-img-box');
    testimonialBox.append(testimonialImgBox);

    const testimonialImg = document.createElement('div');
    testimonialImg.classList.add('testimonial-img');
    testimonialImgBox.append(testimonialImg);

    if (imageCell) { // Ensure imageCell exists
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        // Ensure class names are verbatim from ORIGINAL HTML
        optimizedPic.querySelector('img').classList.add('w-[100px]', 'h-[100px]', 'object-contain');
        testimonialImg.append(optimizedPic);
      }
    }

    const testimonialTextBox = document.createElement('div');
    testimonialTextBox.classList.add('testimonial-text-box');
    testimonialBox.append(testimonialTextBox);

    const testimonialContext = document.createElement('div');
    testimonialContext.classList.add('p1', 'testimonial-context');
    testimonialTextBox.append(testimonialContext);

    const testimonialContent = document.createElement('div');
    testimonialContent.classList.add('testimonial-content', 'inline');
    if (textCell) { // Ensure textCell exists
      moveInstrumentation(textCell, testimonialContent);
      while (textCell.firstChild) testimonialContent.append(textCell.firstChild);
    }
    testimonialContext.append(testimonialContent);

    // Check if the text content is long and requires a "Read More" button
    const fullText = testimonialContent.textContent.trim();
    const shortTextLength = 150; // Arbitrary length for "short" text
    if (fullText.length > shortTextLength) {
      const shortText = fullText.substring(0, shortTextLength);
      testimonialContent.textContent = shortText;

      const readMoreButton = document.createElement('button');
      readMoreButton.classList.add('readmore'); // Class name from ORIGINAL HTML
      readMoreButton.textContent = 'Read More';
      testimonialContext.append(readMoreButton);

      const fullTextContainer = document.createElement('div');
      // Ensure class names are verbatim from ORIGINAL HTML, 'hidden' is not in allowlist
      // Assuming 'hidden' is a utility class or will be added by CSS
      fullTextContainer.classList.add('testimonial-content', 'inline');
      fullTextContainer.style.display = 'none'; // Use style for hiding if 'hidden' isn't in allowlist
      fullTextContainer.textContent = fullText;
      testimonialContext.append(fullTextContainer);

      readMoreButton.addEventListener('click', () => {
        if (testimonialContent.style.display === 'none') { // Check style.display
          testimonialContent.style.display = 'inline';
          fullTextContainer.style.display = 'none';
          readMoreButton.textContent = 'Read More';
        } else {
          testimonialContent.style.display = 'none';
          fullTextContainer.style.display = 'inline';
          readMoreButton.textContent = 'Read Less';
        }
      });
    }

    const authorHeading = document.createElement('h3');
    if (authorCell) { // Ensure authorCell exists
      moveInstrumentation(authorCell, authorHeading);
      authorHeading.textContent = authorCell.textContent.trim();
    }
    testimonialTextBox.append(authorHeading);
  });

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiper.append(swiperPagination);

  // Add pagination bullets (example, actual implementation would involve Swiper JS)
  testimonialRows.forEach((_, index) => {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (index === 0) {
      bullet.classList.add('swiper-pagination-bullet-active');
    }
    swiperPagination.append(bullet);
  });

  // Basic Swiper-like functionality (without full Swiper JS)
  let currentIndex = 0;
  const slides = [...swiperWrapper.children];
  const bullets = [...swiperPagination.children];

  const updateSlides = () => {
    slides.forEach((slide, i) => {
      slide.classList.remove('swiper-slide-active', 'swiper-slide-prev', 'swiper-slide-next');
      if (i === currentIndex) {
        slide.classList.add('swiper-slide-active');
      } else if (i === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add('swiper-slide-prev');
      } else if (i === (currentIndex + 1) % slides.length) {
        slide.classList.add('swiper-slide-next');
      }
      // Simple translation for demonstration
      // The original HTML uses `transform: translate3d(-1250px, 0px, 0px)`
      // and fixed widths. This simple `translateX` might not perfectly
      // replicate the original Swiper behavior without more complex calculations
      // based on slide width and margin.
      // For now, keep the simple translation, but note this might need adjustment
      // if the visual layout is off.
      slide.style.transform = `translateX(${(i - currentIndex) * (615 + 10)}px)`; // (slide width + margin)
    });
    bullets.forEach((bullet, i) => {
      bullet.classList.toggle('swiper-pagination-bullet-active', i === currentIndex);
    });
  };

  bullets.forEach((bullet, i) => {
    bullet.addEventListener('click', () => {
      currentIndex = i;
      updateSlides();
    });
  });

  // Initial update
  updateSlides();
}
