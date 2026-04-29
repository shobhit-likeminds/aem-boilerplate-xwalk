import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headlineRow, ...slideRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  section.append(sectionHeader);

  const headline = document.createElement('h2');
  headline.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headlineRow, headline);
  headline.textContent = headlineRow.textContent.trim();
  sectionHeader.append(headline);

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');
  section.append(positionRelativeDiv);

  const container = document.createElement('div');
  container.classList.add('container');
  positionRelativeDiv.append(container);

  const gridLayout = document.createElement('div');
  gridLayout.classList.add('grid-layout');
  container.append(gridLayout);

  slideRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDefaultCell,
      slideHeadlineCell,
      slideDescriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');
    slideDiv.append(wrapDiv);

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const pictureMobile576 = imageMobile576Cell.querySelector('picture');
    const pictureMobile799 = imageMobile799Cell.querySelector('picture');
    const pictureDefault = imageDefaultCell.querySelector('picture');

    if (pictureMobile576 || pictureMobile799 || pictureDefault) {
      const picture = document.createElement('picture');

      if (pictureMobile576) {
        const img = pictureMobile576.querySelector('img');
        const source = document.createElement('source');
        source.media = '(max-width: 576px)';
        source.srcset = img.src;
        picture.append(source);
      }
      if (pictureMobile799) {
        const img = pictureMobile799.querySelector('img');
        const source = document.createElement('source');
        source.media = '(max-width: 799px)';
        source.srcset = img.src;
        picture.append(source);
      }
      if (pictureDefault) {
        const img = pictureDefault.querySelector('img');
        const defaultImg = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        defaultImg.querySelector('img').classList.add('img-fluid');
        picture.append(...defaultImg.children);
      }
      imageWrap.append(picture);
    }
    if (imageWrap.hasChildNodes()) {
      wrapDiv.append(imageWrap);
    }

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');
    wrapDiv.append(contentWrap);

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');
    contentWrap.append(contentSectionHeader);

    const slideHeadline = document.createElement('h3');
    slideHeadline.classList.add('heading', 'font-regular');
    slideHeadline.textContent = slideHeadlineCell.textContent.trim();
    contentSectionHeader.append(slideHeadline);

    const slideDescription = document.createElement('p');
    slideDescription.classList.add('text-size-body');
    slideDescription.innerHTML = slideDescriptionCell.innerHTML;
    contentSectionHeader.append(slideDescription);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href; // Correctly use the href from the authored link
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    contentSectionHeader.append(ctaLink);

    gridLayout.append(slideDiv);
  });

  block.replaceChildren(section);

  // Swiper Carousel Initialization (from original HTML's flickity-slider-mobile-wrap)
  // Although the original HTML comments out flickity, the structure implies a carousel.
  // Assuming Swiper for EDS.
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiperContainer = container; // The .container element will be the Swiper container
  const swiperWrapper = gridLayout; // The .grid-layout element will be the Swiper wrapper

  // Add Swiper specific classes to the elements
  swiperContainer.classList.add('swiper');
  swiperWrapper.classList.add('swiper-wrapper');

  // Add swiper-slide to each slideDiv
  swiperWrapper.querySelectorAll('.slides').forEach((slide) => {
    slide.classList.add('swiper-slide');
  });

  // Create navigation buttons and pagination if needed (based on common Swiper usage)
  const prevButton = document.createElement('div');
  prevButton.classList.add('swiper-button-prev');
  swiperContainer.append(prevButton);

  const nextButton = document.createElement('div');
  nextButton.classList.add('swiper-button-next');
  swiperContainer.append(nextButton);

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination');
  swiperContainer.append(pagination);

  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
    slidesPerView: 'auto',
    loop: false, // Based on original HTML data-flickity='{ "wrapAround": false ... }'
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    pagination: {
      el: pagination,
      clickable: true,
    },
    // Additional Swiper options can be added here if needed, e.g., breakpoints
    // breakpoints: {
    //   768: {
    //     slidesPerView: 2,
    //   },
    // },
  });
}
