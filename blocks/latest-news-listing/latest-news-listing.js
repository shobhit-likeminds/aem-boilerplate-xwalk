import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [sectionHeadingRow, ...newsItemRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(sectionHeadingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-offset', '100');
  heading.setAttribute('data-aos-duration', '650');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  // Container for news items
  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');

  const flickitySliderWrap = document.createElement('div');
  flickitySliderWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  // The data-flickity attribute is correctly copied from ORIGINAL HTML
  flickitySliderWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  newsItemRows.forEach((row) => {
    const [imageDefaultCell, imageHorizontalCell, imageVerticalCell, categoryCell, titleCell, readMoreLinkCell, readMoreLabelCell, dateCell] = [...row.children];

    const slideWrap = document.createElement('div');
    // Removed redundant 'slides' class from slideWrap as it's already on slidesContainer
    // The original HTML has <div class="slides"> directly containing <div class="wrap">
    moveInstrumentation(row, slideWrap);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const defaultPicture = imageDefaultCell.querySelector('picture');
    const defaultImg = defaultPicture ? defaultPicture.querySelector('img') : null;

    if (defaultImg) {
      const thumbImg = document.createElement('img');
      thumbImg.src = defaultImg.src;
      thumbImg.alt = defaultImg.alt;
      thumbImg.classList.add('thumb-img', 'img-fluid');
      thumbImg.setAttribute('loading', 'lazy');

      const horizontalPicture = imageHorizontalCell.querySelector('picture');
      const horizontalImg = horizontalPicture ? horizontalPicture.querySelector('img') : null;
      if (horizontalImg) {
        thumbImg.setAttribute('data-img-horizontal', horizontalImg.src);
      }

      const verticalPicture = imageVerticalCell.querySelector('picture');
      const verticalImg = verticalPicture ? verticalPicture.querySelector('img') : null;
      if (verticalImg) {
        thumbImg.setAttribute('data-img-vertical', verticalImg.src);
      }

      imageWrap.append(thumbImg);
    }
    wrap.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const category = document.createElement('div');
    category.classList.add('category');
    category.textContent = categoryCell.textContent.trim();
    contentWrap.append(category);

    const title = document.createElement('div');
    title.classList.add('text');
    title.textContent = titleCell.textContent.trim();
    contentWrap.append(title);

    const readMoreLink = readMoreLinkCell.querySelector('a');
    if (readMoreLink) {
      const link = document.createElement('a');
      link.href = readMoreLink.href;
      link.classList.add('btn', 'btn-link');
      link.textContent = readMoreLabelCell.textContent.trim();
      contentWrap.append(link);
    }

    const date = document.createElement('div');
    date.classList.add('date');
    const time = document.createElement('time');
    time.setAttribute('datetime', dateCell.textContent.trim()); // Assuming date cell contains a valid datetime string
    time.textContent = dateCell.textContent.trim();
    date.append(time);
    contentWrap.append(date);

    wrap.append(contentWrap);
    slideWrap.append(wrap);
    slidesContainer.append(slideWrap);
  });

  flickitySliderWrap.append(slidesContainer);
  container.append(flickitySliderWrap);
  section.append(container);

  block.replaceChildren(section);

  // Load Flickity CSS and JS
  await loadCSS('/libs/flickity/flickity.min.css'); // Assuming Flickity CSS is available in /libs/flickity
  await loadScript('/libs/flickity/flickity.pkgd.min.js'); // Assuming Flickity JS is available in /libs/flickity

  // Initialize Flickity
  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined') {
    // Flickity is initialized on the element with data-flickity attribute
    // The data-flickity attribute is already on flickitySliderWrap
    // No explicit new Flickity() call is needed if data-flickity attribute is present and Flickity is loaded.
    // However, if it's not auto-initializing, we might need to manually init.
    // For now, assuming data-flickity attribute handles auto-init.
    // If auto-init doesn't work, uncomment and adjust the following:
    // new Flickity(flickitySliderWrap, {
    //   wrapAround: false,
    //   lazyLoad: true,
    //   pageDots: true,
    //   prevNextButtons: false,
    //   imagesLoaded: true,
    //   cellAlign: 'left',
    //   watchCSS: true,
    //   adaptiveHeight: true,
    // });
  }


  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
