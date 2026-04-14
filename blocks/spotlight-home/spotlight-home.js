import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];

  // Distinguish slide rows (7 cells) from quick link rows (2 cells)
  const slideRows = allRows.filter((row) => row.children.length === 7);
  const quickLinkRows = allRows.filter((row) => row.children.length === 2);

  const section = document.createElement('section');
  section.classList.add('section', 'spotlight-home-wrap', 'm-0', 'p-0');

  const beamSlider = document.createElement('div');
  beamSlider.classList.add('beam-slider', 'main-slider', 'loading1', 'beam-slider-multi', 'swiper-initialized', 'swiper-horizontal', 'swiper-watch-progress', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('aria-live', 'off');

  slideRows.forEach((row, index) => {
    // Destructuring is safe here because the filter ensures exactly 7 children
    const [imageCell, altTextCell, smallTextCell, headingCell, descriptionCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'nogradient');
    swiperSlide.setAttribute('role', 'group');
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${slideRows.length}`);
    swiperSlide.setAttribute('data-swiper-slide-index', index);

    const slideBgImg = document.createElement('div');
    slideBgImg.classList.add('slide-bgimg');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '576' }, { width: '799' }, { width: '1903' }]);
        moveInstrumentation(picture, optimizedPic);
        slideBgImg.append(optimizedPic);
      }
    }

    const mobContentHomeSpotlight = document.createElement('div');
    mobContentHomeSpotlight.classList.add('mob-content-home-spotlight');

    const content = document.createElement('div');
    content.classList.add('content', 'text-center', 'text-lg-start');

    if (smallTextCell.textContent.trim()) {
      const small = document.createElement('small');
      small.style.fontWeight = 'bold';
      small.textContent = smallTextCell.textContent.trim();
      content.append(small);
    }

    if (headingCell.textContent.trim()) {
      const h2 = document.createElement('h2');
      h2.classList.add('heading', 'font-medium', 'font-size-tb');
      h2.textContent = headingCell.textContent.trim();
      content.append(h2);
    }

    if (descriptionCell.textContent.trim()) {
      const p = document.createElement('p');
      moveInstrumentation(descriptionCell, p);
      while (descriptionCell.firstChild) p.append(descriptionCell.firstChild);
      content.append(p);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const anchor = document.createElement('a');
      anchor.href = ctaLink.href;
      anchor.classList.add('btn', 'btn-primary');
      anchor.textContent = ctaLinkLabelCell.textContent.trim() || ctaLink.textContent.trim();
      moveInstrumentation(ctaLinkCell, anchor);
      content.append(anchor);
    }

    mobContentHomeSpotlight.append(content);
    swiperSlide.append(slideBgImg, mobContentHomeSpotlight);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(row, swiperSlide);
  });

  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev', 'slide-home-btn', 'swiper-button-white');
  prevButton.setAttribute('tabindex', '0');
  prevButton.setAttribute('role', 'button');
  prevButton.setAttribute('aria-label', 'Previous slide');
  const prevButtonImg = document.createElement('img');
  prevButtonImg.alt = 'svg file';
  // Placeholder for navigation button image, as it's not part of the block model
  prevButtonImg.src = '/icons/arrow-left.svg';
  prevButton.append(prevButtonImg);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next', 'slide-home-btn', 'swiper-button-white');
  nextButton.setAttribute('tabindex', '0');
  nextButton.setAttribute('role', 'button');
  nextButton.setAttribute('aria-label', 'Next slide');
  const nextButtonImg = document.createElement('img');
  nextButtonImg.alt = 'svg file';
  // Placeholder for navigation button image, as it's not part of the block model
  nextButtonImg.src = '/icons/arrow-right.svg';
  nextButton.append(nextButtonImg);

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination', 'bullet-bottom');

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');

  beamSlider.append(swiperWrapper, prevButton, nextButton, pagination, swiperNotification);

  const quickLinksParentDiv = document.createElement('div');
  quickLinksParentDiv.classList.add('mt-0', 'pt-1', 'pb-1', 'm-none1', 'bottom-0', 'w-100', 'quick-links-parents-div', 'position-relative');

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '-100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');

  const quickLinksUl = document.createElement('ul');
  quickLinksUl.classList.add('quick-links-div');

  quickLinkRows.forEach((row) => {
    // Destructuring is safe here because the filter ensures exactly 2 children
    const [linkCell, linkLabelCell] = [...row.children];
    const li = document.createElement('li');
    const link = linkCell.querySelector('a');

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.classList.add('with-full-underline');
      anchor.textContent = linkLabelCell.textContent.trim() || link.textContent.trim();
      moveInstrumentation(linkCell, anchor);
      li.append(anchor);
    }
    quickLinksUl.append(li);
    moveInstrumentation(row, li);
  });

  container.append(quickLinksUl);
  quickLinksParentDiv.append(container);

  section.append(beamSlider, quickLinksParentDiv);

  block.textContent = '';
  block.append(section);

  // Initialize Swiper (simplified, actual Swiper library would be loaded separately)
  // This is a placeholder for Swiper initialization logic
  if (typeof window.Swiper === 'function') {
    // eslint-disable-next-line no-new
    new window.Swiper(beamSlider, {
      loop: true,
      pagination: {
        el: pagination,
        clickable: true,
      },
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      // Add other Swiper options as needed from original HTML behavior
    });
  } else {
    // Fallback if Swiper is not loaded, ensure navigation works
    let currentIndex = 0;
    const slides = [...swiperWrapper.children];
    const totalSlides = slides.length;

    const updateSlideVisibility = () => {
      slides.forEach((slide, i) => {
        slide.style.display = (i === currentIndex) ? 'block' : 'none';
        // Update aria-label for pagination fallback
        pagination.innerHTML = ''; // Clear existing bullets
        slides.forEach((_, i) => {
          const bullet = document.createElement('span');
          bullet.classList.add('swiper-pagination-bullet');
          if (i === currentIndex) {
            bullet.classList.add('swiper-pagination-bullet-active');
          }
          bullet.setAttribute('tabindex', '0');
          bullet.setAttribute('role', 'button');
          bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);
          bullet.addEventListener('click', () => {
            currentIndex = i;
            updateSlideVisibility();
          });
          pagination.append(bullet);
        });
        swiperNotification.textContent = `Slide ${currentIndex + 1} of ${totalSlides}`;
      });
    };

    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlideVisibility();
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlideVisibility();
    });

    updateSlideVisibility(); // Initial display
  }
}
