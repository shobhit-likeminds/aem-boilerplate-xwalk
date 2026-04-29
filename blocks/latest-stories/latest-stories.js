import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, ...storyRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  // Container for stories
  const container = document.createElement('div');
  container.classList.add('container');

  // Swiper container setup
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('flickity-slider-mobile-wrap', 'grid-layout', 'swiper'); // Added 'swiper' class
  swiperContainer.dataset.flickity = '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }';

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('slides', 'swiper-wrapper'); // Added 'swiper-wrapper' class

  storyRows.forEach((row) => {
    const [
      imageMainCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      descriptionCell,
      storyLinkCell,
      storyLinkLabelCell,
      dateCell,
      dateTimeCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('slides', 'swiper-slide'); // Added 'swiper-slide' class

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');
    const mainPicture = imageMainCell.querySelector('picture');
    if (mainPicture) {
      const img = mainPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('thumb-img', 'img-fluid');
      optimizedImg.dataset.imgHorizontal = imageHorizontalCell.querySelector('img')?.src || '';
      optimizedImg.dataset.imgVertical = imageVerticalCell.querySelector('img')?.src || '';
      moveInstrumentation(img, optimizedImg);
      imageWrap.append(optimizedPic);
    }
    wrap.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const category = document.createElement('div');
    category.classList.add('category');
    category.textContent = categoryCell.textContent.trim();
    contentWrap.append(category);

    const description = document.createElement('div');
    description.classList.add('text');
    description.textContent = descriptionCell.textContent.trim();
    contentWrap.append(description);

    const storyLink = document.createElement('a');
    storyLink.classList.add('btn', 'btn-link');
    const foundLink = storyLinkCell.querySelector('a');
    if (foundLink) {
      storyLink.href = foundLink.href; // Correctly read href from aem-content cell
    }
    storyLink.textContent = storyLinkLabelCell.textContent.trim();
    moveInstrumentation(storyLinkCell, storyLink); // Move instrumentation from link cell
    contentWrap.append(storyLink);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const time = document.createElement('time');
    time.setAttribute('datetime', dateTimeCell.textContent.trim());
    time.textContent = dateCell.textContent.trim();
    dateDiv.append(time);
    contentWrap.append(dateDiv);

    wrap.append(contentWrap);
    moveInstrumentation(row, wrap); // Move instrumentation from the row to the wrap
    slide.append(wrap);
    swiperWrapper.append(slide);
  });

  swiperContainer.append(swiperWrapper);
  container.append(swiperContainer);
  section.append(container);

  block.replaceChildren(section);

  // Load Swiper if not already loaded
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // Initialize Swiper
  // eslint-disable-next-line no-undef
  if (typeof Swiper !== 'undefined') {
    // The original Flickity config is not directly compatible with Swiper.
    // We'll use a basic Swiper config and adapt from the Flickity dataset.
    const flickityConfig = JSON.parse(swiperContainer.dataset.flickity);
    // eslint-disable-next-line no-new
    new Swiper(swiperContainer, {
      slidesPerView: 'auto', // 'auto' for responsive slides
      loop: flickityConfig.wrapAround, // Map wrapAround to loop
      pagination: {
        el: '.swiper-pagination', // Placeholder, create if needed
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next', // Placeholder, create if needed
        prevEl: '.swiper-button-prev', // Placeholder, create if needed
      },
      // Swiper has no direct equivalent for lazyLoad: true, imagesLoaded: true, adaptiveHeight: true
      // These are handled by Swiper's internal lazy loading and auto height features
      // cellAlign: 'left' is default for Swiper slidesPerView: 'auto'
      // watchCSS is not directly applicable to Swiper init, it's a CSS media query concept
    });
  }
}
