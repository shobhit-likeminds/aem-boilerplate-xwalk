import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, ...storyRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');

  const flickityWrap = document.createElement('div');
  flickityWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickityWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  storyRows.forEach((row) => {
    const [
      imageCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      summaryCell,
      readMoreLinkCell,
      readMoreLabelCell,
      dateCell,
      dateIsoCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    // Renamed 'slides' to 'slide-item' to avoid conflict with parent 'slidesContainer'
    // and to better reflect its role as an individual slide.
    slide.classList.add('slide-item');
    moveInstrumentation(row, slide);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const mainImage = imageCell.querySelector('picture > img');
    if (mainImage) {
      const thumbImg = document.createElement('img');
      thumbImg.classList.add('thumb-img', 'img-fluid');
      thumbImg.src = mainImage.src;
      thumbImg.alt = mainImage.alt;
      thumbImg.loading = 'lazy';

      const horizontalImage = imageHorizontalCell.querySelector('picture > img');
      if (horizontalImage) {
        thumbImg.setAttribute('data-img-horizontal', horizontalImage.src);
      }
      const verticalImage = imageVerticalCell.querySelector('picture > img');
      if (verticalImage) {
        thumbImg.setAttribute('data-img-vertical', verticalImage.src);
      }

      const optimizedPic = createOptimizedPicture(thumbImg.src, thumbImg.alt, false, [{ width: '750' }]);
      // Instrumentation should be moved from the original imageCell to the new picture element
      moveInstrumentation(imageCell, optimizedPic);
      imageWrap.append(optimizedPic);
    }
    wrap.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const category = document.createElement('div');
    category.classList.add('category');
    category.textContent = categoryCell.textContent.trim();
    contentWrap.append(category);

    const summary = document.createElement('div');
    summary.classList.add('text');
    summary.textContent = summaryCell.textContent.trim();
    contentWrap.append(summary);

    const readMoreLink = readMoreLinkCell.querySelector('a');
    if (readMoreLink) {
      const link = document.createElement('a');
      link.classList.add('btn', 'btn-link');
      link.href = readMoreLink.href;
      link.textContent = readMoreLabelCell.textContent.trim();
      contentWrap.append(link);
    }

    const date = document.createElement('div');
    date.classList.add('date');
    const time = document.createElement('time');
    time.setAttribute('datetime', dateIsoCell.textContent.trim());
    time.textContent = dateCell.textContent.trim();
    date.append(time);
    contentWrap.append(date);

    wrap.append(contentWrap);
    slide.append(wrap);
    slidesContainer.append(slide);
  });

  flickityWrap.append(slidesContainer);
  container.append(flickityWrap);
  section.append(container);

  block.replaceChildren(section);

  // Flickity initialization
  await loadCSS('/blocks/latest-stories/flickity.min.css'); // Assuming Flickity CSS is local or CDN
  await loadScript('/blocks/latest-stories/flickity.pkgd.min.js'); // Assuming Flickity JS is local or CDN

  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined') {
    // eslint-disable-next-line no-new, no-undef
    new Flickity(flickityWrap, {
      wrapAround: flickityWrap.dataset.flickity.includes('"wrapAround": true'),
      lazyLoad: flickityWrap.dataset.flickity.includes('"lazyLoad": true'),
      pageDots: flickityWrap.dataset.flickity.includes('"pageDots": true'),
      prevNextButtons: flickityWrap.dataset.flickity.includes('"prevNextButtons": true'),
      imagesLoaded: flickityWrap.dataset.flickity.includes('"imagesLoaded": true'),
      cellAlign: 'left', // Default from original HTML
      watchCSS: true, // Default from original HTML
      adaptiveHeight: flickityWrap.dataset.flickity.includes('"adaptiveHeight": true'),
    });
  }
}
