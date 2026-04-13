import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...testimonialRows] = [...block.children];

  const customerSayTemplate = document.createElement('div');
  customerSayTemplate.classList.add('customer-say-template');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('customer-say-heading');
  // Use content detection for the heading cell
  const headingCell = headingRow.querySelector('div');
  if (headingCell) {
    moveInstrumentation(headingCell, heading);
    heading.textContent = headingCell.textContent.trim();
  }
  customerSayTemplate.append(heading);

  const customerSayContainer = document.createElement('div');
  customerSayContainer.classList.add('customer-say-container');

  const commonCustomerSayComponent = document.createElement('div');
  commonCustomerSayComponent.classList.add('common-customer-say-component');

  const desktopCustomerSay = document.createElement('div');
  desktopCustomerSay.classList.add('desktop-customer-say');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-initialized', 'swiper-horizontal');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  testimonialRows.forEach((row, index) => {
    const [imageCell, contentCell, authorCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    // Adjust initial slide classes to match original HTML (second slide is active)
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-prev');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-active');
    } else if (index === 2) {
      swiperSlide.classList.add('swiper-slide-next');
    }
    moveInstrumentation(row, swiperSlide);

    const testimonialContainer = document.createElement('div');
    testimonialContainer.classList.add('testimonial-container');

    const borderStrip = document.createElement('div');
    borderStrip.classList.add(index % 2 === 0 ? 'blue-border-strip' : 'red-border-strip');
    testimonialContainer.append(borderStrip);

    const testimonialBox = document.createElement('div');
    testimonialBox.classList.add('testimonial-box');

    const testimonialImgBox = document.createElement('div');
    testimonialImgBox.classList.add('testimonial-img-box');
    const testimonialImg = document.createElement('div');
    testimonialImg.classList.add('testimonial-img');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
        optimizedPic.querySelector('img').classList.add('w-[100px]', 'h-[100px]', 'object-contain');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        testimonialImg.append(optimizedPic);
      }
    }
    testimonialImgBox.append(testimonialImg);
    testimonialBox.append(testimonialImgBox);

    const testimonialTextBox = document.createElement('div');
    testimonialTextBox.classList.add('testimonial-text-box');

    const p1 = document.createElement('div');
    p1.classList.add('p1', 'testimonial-context');

    const testimonialContent = document.createElement('div');
    testimonialContent.classList.add('testimonial-content', 'inline');
    moveInstrumentation(contentCell, testimonialContent);
    while (contentCell.firstChild) testimonialContent.append(contentCell.firstChild);
    p1.append(testimonialContent);

    // Check if content needs 'Read More' button
    const contentText = testimonialContent.textContent.trim();
    if (contentText.length > 100) { // Arbitrary length for demonstration, adjust as needed
      const readMoreButton = document.createElement('button');
      readMoreButton.classList.add('readmore');
      readMoreButton.textContent = 'Read More';
      p1.append(readMoreButton);

      const fullContent = testimonialContent.innerHTML;
      const truncatedContent = contentText.substring(0, 100) + '...';
      testimonialContent.innerHTML = truncatedContent;

      readMoreButton.addEventListener('click', () => {
        if (testimonialContent.classList.contains('inline')) {
          testimonialContent.innerHTML = fullContent;
          testimonialContent.classList.remove('inline');
          readMoreButton.textContent = 'Read Less';
        } else {
          testimonialContent.innerHTML = truncatedContent;
          testimonialContent.classList.add('inline');
          readMoreButton.textContent = 'Read More';
        }
      });
    }

    testimonialTextBox.append(p1);

    const authorHeading = document.createElement('h3');
    moveInstrumentation(authorCell, authorHeading);
    authorHeading.textContent = authorCell.textContent.trim();
    testimonialTextBox.append(authorHeading);

    testimonialBox.append(testimonialTextBox);
    testimonialContainer.append(testimonialBox);
    swiperSlide.append(testimonialContainer);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  testimonialRows.forEach((_, index) => {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (index === 1) { // Assuming the second slide is active initially as per original HTML
      bullet.classList.add('swiper-pagination-bullet-active');
    }
    swiperPagination.append(bullet);
  });
  swiper.append(swiperPagination);

  desktopCustomerSay.append(swiper);
  commonCustomerSayComponent.append(desktopCustomerSay);
  customerSayContainer.append(commonCustomerSayComponent);
  customerSayTemplate.append(customerSayContainer);

  block.textContent = '';
  block.append(customerSayTemplate);

  // Basic Swiper-like functionality (simplified, not full Swiper.js)
  let currentIndex = 1; // Start with the second slide active as per original HTML
  const slides = [...swiperWrapper.children];
  const bullets = [...swiperPagination.children];

  const updateSlides = () => {
    slides.forEach((slide, i) => {
      slide.classList.remove('swiper-slide-prev', 'swiper-slide-active', 'swiper-slide-next');
      if (i === currentIndex - 1) slide.classList.add('swiper-slide-prev');
      if (i === currentIndex) slide.classList.add('swiper-slide-active');
      if (i === currentIndex + 1) slide.classList.add('swiper-slide-next');
      slide.style.width = '615px'; // Hardcoded from original HTML
      slide.style.marginRight = '10px'; // Hardcoded from original HTML
    });

    bullets.forEach((bullet, i) => {
      bullet.classList.toggle('swiper-pagination-bullet-active', i === currentIndex);
    });

    const offset = -currentIndex * (615 + 10); // slide width + margin
    swiperWrapper.style.transform = `translate3d(${offset}px, 0px, 0px)`;
    swiperWrapper.style.transitionDuration = '300ms';
  };

  // Auto-advance (simplified)
  let intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }, 5000); // Change slide every 5 seconds

  // Manual navigation via bullets
  bullets.forEach((bullet, i) => {
    bullet.addEventListener('click', () => {
      clearInterval(intervalId); // Stop auto-advance on manual interaction
      currentIndex = i;
      updateSlides();
      intervalId = setInterval(() => { // Restart auto-advance
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
      }, 5000);
    });
  });

  updateSlides(); // Initial update
}
