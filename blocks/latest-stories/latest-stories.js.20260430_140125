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
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  // moveInstrumentation for the heading row
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  // Stories Container
  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');

  const flickitySliderWrap = document.createElement('div');
  flickitySliderWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickitySliderWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesWrapper = document.createElement('div');
  slidesWrapper.classList.add('slides');

  storyRows.forEach((row) => {
    const [
      imageDefaultCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      headlineCell,
      ctaLinkCell,
      ctaLabelCell,
      dateCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('slide-item'); // Changed from 'slides' to 'slide-item' to match original HTML structure

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const defaultPicture = imageDefaultCell.querySelector('picture');
    const defaultImg = defaultPicture ? defaultPicture.querySelector('img') : null;

    if (defaultImg) {
      const optimizedPic = createOptimizedPicture(
        defaultImg.src,
        defaultImg.alt,
        false,
        [{ width: '750' }],
      );
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('thumb-img', 'img-fluid');
      optimizedImg.setAttribute('loading', 'lazy');

      const horizontalImg = imageHorizontalCell.querySelector('picture')?.querySelector('img');
      const verticalImg = imageVerticalCell.querySelector('picture')?.querySelector('img');

      if (horizontalImg) {
        optimizedImg.setAttribute('data-img-horizontal', horizontalImg.src);
      }
      if (verticalImg) {
        optimizedImg.setAttribute('data-img-vertical', verticalImg.src);
      }

      moveInstrumentation(imageDefaultCell, optimizedPic);
      imageWrap.append(optimizedPic);
    }
    wrap.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const category = document.createElement('div');
    category.classList.add('category');
    category.textContent = categoryCell.textContent.trim();
    moveInstrumentation(categoryCell, category);
    contentWrap.append(category);

    const text = document.createElement('div');
    text.classList.add('text');
    text.textContent = headlineCell.textContent.trim();
    moveInstrumentation(headlineCell, text);
    contentWrap.append(text);

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const button = document.createElement('a');
      button.classList.add('btn', 'btn-link');
      button.href = ctaLink.href;
      button.textContent = ctaLabelCell.textContent.trim();
      moveInstrumentation(ctaLinkCell, button);
      contentWrap.append(button);
    }

    const date = document.createElement('div');
    date.classList.add('date');
    const time = document.createElement('time');
    time.setAttribute('datetime', dateCell.textContent.trim()); // Assuming date cell contains a valid datetime string
    time.textContent = dateCell.textContent.trim();
    moveInstrumentation(dateCell, date);
    date.append(time);
    contentWrap.append(date);

    wrap.append(contentWrap);
    slide.append(wrap);
    slidesWrapper.append(slide);
  });

  flickitySliderWrap.append(slidesWrapper);
  container.append(flickitySliderWrap);
  section.append(container);

  block.replaceChildren(section);

  // Load Flickity CSS and JS
  await loadCSS('/libs/flickity/flickity.min.css'); // Assuming Flickity CSS is available at this path or a CDN
  await loadScript('/libs/flickity/flickity.pkgd.min.js'); // Assuming Flickity JS is available at this path or a CDN

  // Initialize Flickity
  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined') {
    // eslint-disable-next-line no-new
    new Flickity(flickitySliderWrap, {
      wrapAround: flickitySliderWrap.dataset.flickity.includes('"wrapAround": true'),
      lazyLoad: flickitySliderWrap.dataset.flickity.includes('"lazyLoad": true'),
      pageDots: flickitySliderWrap.dataset.flickity.includes('"pageDots": true'),
      prevNextButtons: flickitySliderWrap.dataset.flickity.includes('"prevNextButtons": true'),
      imagesLoaded: flickitySliderWrap.dataset.flickity.includes('"imagesLoaded": true'),
      cellAlign: 'left', // Default from original HTML
      watchCSS: true,
      adaptiveHeight: true,
    });
  }
}
