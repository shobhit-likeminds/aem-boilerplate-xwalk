import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];
  const [sectionHeadingRow, ...slideRows] = children;

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');
  moveInstrumentation(block, section);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-offset', '100');
  heading.setAttribute('data-aos-duration', '650');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  moveInstrumentation(sectionHeadingRow, heading);
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');
  positionRelativeDiv.setAttribute('data-aos', 'fade-up');
  positionRelativeDiv.setAttribute('data-aos-offset', '100');
  positionRelativeDiv.setAttribute('data-aos-duration', '650');
  positionRelativeDiv.setAttribute('data-aos-easing', 'ease-in-out');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout', 'swiper'); // Add swiper class for initialization

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  slideRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDesktopCell,
      slideHeadingCell,
      slideBodyCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides', 'swiper-slide'); // Add swiper-slide class
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    const imageWrapDiv = document.createElement('div');
    imageWrapDiv.classList.add('image-wrap');

    const picture = document.createElement('picture');
    let hasImage = false;

    const imgMobile576 = imageMobile576Cell.querySelector('img');
    if (imgMobile576) {
      const source576 = document.createElement('source');
      source576.media = '(max-width: 576px)';
      source576.srcset = imgMobile576.src;
      picture.append(source576);
      hasImage = true;
    }

    const imgMobile799 = imageMobile799Cell.querySelector('img');
    if (imgMobile799) {
      const source799 = document.createElement('source');
      source799.media = '(max-width: 799px)';
      source799.srcset = imgMobile799.src;
      picture.append(source799);
      hasImage = true;
    }

    const imgDesktop = imageDesktopCell.querySelector('img');
    if (imgDesktop) {
      const img = document.createElement('img');
      img.src = imgDesktop.src;
      img.alt = imgDesktop.alt;
      img.loading = 'lazy';
      img.classList.add('img-fluid');
      picture.append(img);
      hasImage = true;
    }

    if (hasImage) {
      imageWrapDiv.append(picture);
      slideDiv.classList.add('has-image');
    }

    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');

    const slideHeading = document.createElement('h3');
    slideHeading.classList.add('heading', 'font-regular');
    slideHeading.textContent = slideHeadingCell.textContent.trim();
    contentSectionHeader.append(slideHeading);

    const slideBody = document.createElement('p');
    slideBody.classList.add('text-size-body');
    slideBody.innerHTML = slideBodyCell.innerHTML;
    contentSectionHeader.append(slideBody);

    const ctaLink = document.createElement('a');
    const originalCtaLink = ctaLinkCell.querySelector('a');
    if (originalCtaLink) {
      ctaLink.href = originalCtaLink.href;
    }
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    contentSectionHeader.append(ctaLink);

    contentWrapDiv.append(contentSectionHeader);

    if (imageWrapDiv.children.length > 0) {
      wrapDiv.append(imageWrapDiv);
    }
    wrapDiv.append(contentWrapDiv);
    slideDiv.append(wrapDiv);
    swiperWrapper.append(slideDiv); // Append to swiperWrapper
  });

  gridLayoutDiv.append(swiperWrapper); // Append swiperWrapper to gridLayoutDiv

  // Add Swiper pagination and navigation if needed (based on original HTML comments)
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination');
  gridLayoutDiv.append(paginationDiv);

  containerDiv.append(gridLayoutDiv);
  positionRelativeDiv.append(containerDiv);
  section.append(positionRelativeDiv);

  block.replaceChildren(section);

  // Load Swiper CSS and JS
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // Initialize Swiper
  // eslint-disable-next-line no-undef
  new Swiper(gridLayoutDiv, {
    slidesPerView: 'auto',
    loop: false, // Original HTML data-flickity had wrapAround: false
    pagination: {
      el: paginationDiv,
      clickable: true,
    },
    // prevNextButtons: false from original HTML Flickity config
  });

  // Optimize images after the DOM is built and Swiper is initialized
  block.querySelectorAll('picture > img').forEach((img) => {
    // createOptimizedPicture expects the original image src, not the already optimized one
    // It also returns a new <picture> element, so we replace the whole picture.
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // moveInstrumentation needs to be called on the original img element's parent,
    // and then the new img element inside the optimized picture.
    // However, createOptimizedPicture replaces the entire picture, so we need to
    // move instrumentation from the original picture to the new one.
    // For simplicity, we'll move it from the original img to the new img.
    const originalPicture = img.closest('picture');
    if (originalPicture) {
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      originalPicture.replaceWith(optimizedPic);
    }
  });
}
