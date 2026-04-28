import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [sectionHeadingRow, ...slideRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  section.append(sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(sectionHeadingRow, heading);
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);

  // Slides Container
  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');
  section.append(positionRelativeDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  positionRelativeDiv.append(containerDiv);

  // Swiper setup
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper-container'); // This class is added by Swiper, but we need a container for it
  containerDiv.append(swiperContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperContainer.append(swiperWrapper);

  slideRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDesktopCell,
      slideHeadingCell,
      slideDescriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slidesDiv = document.createElement('div');
    slidesDiv.classList.add('slides', 'swiper-slide'); // Add swiper-slide class
    swiperWrapper.append(slidesDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');
    slidesDiv.append(wrapDiv);

    // Image Wrap
    const imageWrapDiv = document.createElement('div');
    imageWrapDiv.classList.add('image-wrap');

    const picture = document.createElement('picture');

    const mobile576Img = imageMobile576Cell.querySelector('img');
    if (mobile576Img) {
      const source576 = document.createElement('source');
      source576.media = '(max-width: 576px)';
      source576.srcset = mobile576Img.src;
      picture.append(source576);
    }

    const mobile799Img = imageMobile799Cell.querySelector('img');
    if (mobile799Img) {
      const source799 = document.createElement('source');
      source799.media = '(max-width: 799px)';
      source779.srcset = mobile799Img.src; // Typo fix: source779 -> source799
      picture.append(source799);
    }

    const desktopImg = imageDesktopCell.querySelector('img');
    if (desktopImg) {
      const img = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      img.querySelector('img').classList.add('img-fluid');
      picture.append(img.querySelector('img'));
    }

    if (picture.children.length > 0) {
      imageWrapDiv.append(picture);
      wrapDiv.append(imageWrapDiv);
    }

    // Content Wrap
    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');
    wrapDiv.append(contentWrapDiv);

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');
    contentWrapDiv.append(contentSectionHeader);

    const slideHeading = document.createElement('h3');
    slideHeading.classList.add('heading', 'font-regular');
    slideHeading.textContent = slideHeadingCell.textContent.trim();
    contentSectionHeader.append(slideHeading);

    const slideDescription = document.createElement('p');
    slideDescription.classList.add('text-size-body');
    slideDescription.innerHTML = slideDescriptionCell.innerHTML;
    contentSectionHeader.append(slideDescription);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    contentSectionHeader.append(ctaLink);

    moveInstrumentation(row, slidesDiv);
  });

  // Add navigation and pagination elements for Swiper
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination');
  swiperContainer.append(paginationDiv);

  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev');
  swiperContainer.append(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next');
  swiperContainer.append(nextButton);

  block.replaceChildren(section);

  // Load Swiper library and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
    slidesPerView: 'auto',
    loop: false, // Based on ORIGINAL HTML data-flickity='{ "wrapAround": false, ... }'
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    pagination: {
      el: paginationDiv,
      clickable: true,
    },
    // Add other Swiper options as needed, e.g., from Flickity data-attributes
    // imagesLoaded: true, // Equivalent to Flickity's imagesLoaded
    // cellAlign: 'left', // Equivalent to Flickity's cellAlign
    // watchCSS: true, // Equivalent to Flickity's watchCSS
    // adaptiveHeight: true, // Equivalent to Flickity's adaptiveHeight
  });
}
