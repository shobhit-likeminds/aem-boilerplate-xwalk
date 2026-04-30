import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const sectionHeaderRow = children[0];
  const slideRows = children.slice(1);

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(sectionHeaderRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = sectionHeaderRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  // Slides container
  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');

  const container = document.createElement('div');
  container.classList.add('container');

  const gridLayout = document.createElement('div');
  gridLayout.classList.add('grid-layout');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides', 'swiper'); // Add swiper class for initialization

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper'); // Swiper wrapper

  slideRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDefaultCell,
      imageAltCell,
      imageTitleCell,
      headingCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const wrap = document.createElement('div');
    wrap.classList.add('wrap', 'swiper-slide'); // Add swiper-slide class
    moveInstrumentation(row, wrap);

    // Image Wrap
    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const picture = document.createElement('picture');

    const source576 = document.createElement('source');
    source576.media = '(max-width: 576px)';
    source576.srcset = imageMobile576Cell.querySelector('img')?.src || '';
    picture.append(source576);

    const source799 = document.createElement('source');
    source799.media = '(max-width: 799px)';
    source799.srcset = imageMobile799Cell.querySelector('img')?.src || '';
    picture.append(source799);

    const defaultImg = imageDefaultCell.querySelector('img');
    if (defaultImg) {
      const img = createOptimizedPicture(
        defaultImg.src,
        imageAltCell.textContent.trim() || '',
        false,
        [{ width: '750' }],
      ).querySelector('img');
      img.classList.add('img-fluid');
      img.alt = imageAltCell.textContent.trim() || '';
      img.title = imageTitleCell.textContent.trim() || '';
      picture.append(img);
    }
    imageWrap.append(picture);
    wrap.append(imageWrap);

    // Content Wrap
    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const contentHeader = document.createElement('div');
    contentHeader.classList.add('section-header');

    const slideHeading = document.createElement('h3');
    slideHeading.classList.add('heading', 'font-regular');
    slideHeading.textContent = headingCell.textContent.trim();
    contentHeader.append(slideHeading);

    const description = document.createElement('p');
    description.classList.add('text-size-body');
    description.innerHTML = descriptionCell.innerHTML;
    contentHeader.append(description);

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.classList.add('btn', 'btn-primary', 'stretched-link');
      ctaAnchor.href = ctaLink.href; // Correctly read href from the <a> tag
      ctaAnchor.textContent = ctaLabelCell.textContent.trim();
      contentHeader.append(ctaAnchor);
    }
    contentWrap.append(contentHeader);
    wrap.append(contentWrap);
    swiperWrapper.append(wrap); // Append to swiperWrapper
  });

  slidesContainer.append(swiperWrapper); // Append swiperWrapper to slidesContainer

  // Add Swiper navigation and pagination elements
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination');
  slidesContainer.append(swiperPagination);

  const swiperButtonPrev = document.createElement('div');
  swiperButtonPrev.classList.add('swiper-button-prev');
  slidesContainer.append(swiperButtonPrev);

  const swiperButtonNext = document.createElement('div');
  swiperButtonNext.classList.add('swiper-button-next');
  slidesContainer.append(swiperButtonNext);

  gridLayout.append(slidesContainer);
  container.append(gridLayout);
  positionRelativeDiv.append(container);
  section.append(positionRelativeDiv);

  block.replaceChildren(section);

  // Load Swiper library and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(slidesContainer, {
    slidesPerView: 'auto',
    loop: false, // Set to true if data-loop="true" is present in original HTML
    navigation: {
      prevEl: swiperButtonPrev,
      nextEl: swiperButtonNext,
    },
    pagination: {
      el: swiperPagination,
      clickable: true,
    },
  });
}
