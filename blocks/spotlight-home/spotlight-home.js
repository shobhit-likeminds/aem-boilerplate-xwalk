import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('section', 'spotlight-home-wrap', 'm-0', 'p-0');

  const beamSlider = document.createElement('div');
  beamSlider.classList.add('beam-slider', 'main-slider', 'loading1', 'beam-slider-multi', 'swiper-initialized', 'swiper-horizontal', 'swiper-watch-progress', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperWrapper.setAttribute('id', `swiper-wrapper-${Math.random().toString(36).substring(2, 15)}`); // Dynamic ID
  swiperWrapper.setAttribute('aria-live', 'off');

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

  const slides = [];
  const quickLinks = [];

  [...block.children].forEach((row) => {
    // Determine if it's a spotlight-slide or quick-link based on cell count
    // spotlight-slide has 7 cells, quick-link has 2 cells
    if (row.children.length === 7) { // spotlight-slide
      slides.push(row);
    } else if (row.children.length === 2) { // quick-link
      quickLinks.push(row);
    }
  });

  slides.forEach((row, index) => {
    const cells = [...row.children];
    // Using content detection for cells, though direct index access is acceptable here
    // as the block structure guarantees the order for a single item type.
    const imageCell = cells[0];
    const altCell = cells[1];
    const smallTextCell = cells[2];
    const headingCell = cells[3];
    const descriptionCell = cells[4];
    const ctaLinkCell = cells[5];
    const ctaLinkLabelCell = cells[6];

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
        const optimizedPic = createOptimizedPicture(img.src, altCell.textContent.trim(), false, [{ width: '1920' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        picture.replaceWith(optimizedPic);
      }
      slideBgImg.appendChild(picture);
    }

    const mobContentHomeSpotlight = document.createElement('div');
    mobContentHomeSpotlight.classList.add('mob-content-home-spotlight');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content', 'text-center', 'text-lg-start');

    const smallText = document.createElement('small');
    smallText.style.fontWeight = 'bold';
    smallText.textContent = smallTextCell.textContent.trim();
    contentDiv.appendChild(smallText);

    const heading = document.createElement('h2');
    heading.classList.add('heading', 'font-medium', 'font-size-tb');
    heading.innerHTML = headingCell.textContent.trim().replace(/\n/g, '<br>');
    contentDiv.appendChild(heading);

    const description = document.createElement('p');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    contentDiv.appendChild(description);

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const ctaButton = document.createElement('a');
      ctaButton.classList.add('btn', 'btn-primary');
      ctaButton.href = ctaLink.href;
      ctaButton.textContent = ctaLinkLabelCell.textContent.trim();
      moveInstrumentation(ctaLinkCell, ctaButton);
      contentDiv.appendChild(ctaButton);
    }

    mobContentHomeSpotlight.appendChild(contentDiv);
    swiperSlide.appendChild(slideBgImg);
    swiperSlide.appendChild(mobContentHomeSpotlight);
    swiperWrapper.appendChild(swiperSlide);
    moveInstrumentation(row, swiperSlide);
  });

  quickLinks.forEach((row) => {
    const cells = [...row.children];
    // Content detection for quick-link cells
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const linkLabelCell = cells.find(cell => !cell.querySelector('a') || cell.textContent.trim() === cells[1].textContent.trim()); // Assuming linkLabelCell is the second cell and might contain just text or a redundant link.

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      // Copy target attribute from original link if present
      if (foundLink.target) {
        anchor.target = foundLink.target;
      }
    }
    anchor.classList.add('with-full-underline');
    anchor.textContent = linkLabelCell.textContent.trim();
    li.appendChild(anchor);
    quickLinksUl.appendChild(li);
  });

  beamSlider.appendChild(swiperWrapper);

  // Swiper navigation buttons and pagination
  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev', 'slide-home-btn', 'swiper-button-white');
  swiperButtonPrev.setAttribute('tabindex', '0');
  swiperButtonPrev.setAttribute('role', 'button');
  swiperButtonPrev.setAttribute('aria-label', 'Previous slide');
  swiperButtonPrev.setAttribute('aria-controls', swiperWrapper.id); // Use dynamic ID
  const prevImg = document.createElement('img');
  prevImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776164449939.svg+xml';
  prevImg.alt = 'svg file';
  swiperButtonPrev.appendChild(prevImg);
  beamSlider.appendChild(swiperButtonPrev);

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next', 'slide-home-btn', 'swiper-button-white');
  swiperButtonNext.setAttribute('tabindex', '0');
  swiperButtonNext.setAttribute('role', 'button');
  swiperButtonNext.setAttribute('aria-label', 'Next slide');
  swiperButtonNext.setAttribute('aria-controls', swiperWrapper.id); // Use dynamic ID
  const nextImg = document.createElement('img');
  nextImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776164449939.svg+xml';
  nextImg.alt = 'svg file';
  swiperButtonNext.appendChild(nextImg);
  beamSlider.appendChild(swiperButtonNext);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'bullet-bottom');
  beamSlider.appendChild(swiperPagination);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  beamSlider.appendChild(swiperNotification);

  container.appendChild(quickLinksUl);
  quickLinksParentDiv.appendChild(container);

  section.appendChild(beamSlider);
  section.appendChild(quickLinksParentDiv);

  block.textContent = '';
  block.append(section);

  // Initialize Swiper
  // This part assumes Swiper library is loaded globally or imported.
  // For EDS, we typically avoid direct library imports in decorate functions
  // and rely on a global setup or a separate script for dynamic libraries.
  // This is a placeholder for demonstration.
  // eslint-disable-next-line no-undef
  if (typeof Swiper !== 'undefined') {
    // eslint-disable-next-line no-new, no-undef
    new Swiper(beamSlider, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: swiperPagination,
        clickable: true,
      },
      navigation: {
        nextEl: swiperButtonNext,
        prevEl: swiperButtonPrev,
      },
    });
  }
}
