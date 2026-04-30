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

  const flickitySliderWrap = document.createElement('div');
  flickitySliderWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickitySliderWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides'); // This is the actual Flickity container for slides

  storyRows.forEach((row) => {
    const [
      imageMainCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      summaryCell,
      linkCell,
      linkLabelCell,
      dateCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('slides'); // Each individual slide also gets the 'slides' class as per original HTML

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');
    const mainPicture = imageMainCell.querySelector('picture');
    if (mainPicture) {
      const img = mainPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        optimizedImg.classList.add('thumb-img', 'img-fluid');
        optimizedImg.setAttribute('loading', 'lazy');

        const horizontalImg = imageHorizontalCell.querySelector('img');
        if (horizontalImg) {
          optimizedImg.setAttribute('data-img-horizontal', horizontalImg.src);
        }
        const verticalImg = imageVerticalCell.querySelector('img');
        if (verticalImg) {
          optimizedImg.setAttribute('data-img-vertical', verticalImg.src);
        }
        // moveInstrumentation should be on the picture element, not just the img
        moveInstrumentation(imageMainCell, optimizedPic);
        imageWrap.append(optimizedPic);
      }
    }
    wrap.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const category = document.createElement('div');
    category.classList.add('category');
    category.textContent = categoryCell.textContent.trim();
    moveInstrumentation(categoryCell, category);
    contentWrap.append(category);

    const summary = document.createElement('div');
    summary.classList.add('text');
    summary.textContent = summaryCell.textContent.trim();
    moveInstrumentation(summaryCell, summary);
    contentWrap.append(summary);

    const link = document.createElement('a');
    link.classList.add('btn', 'btn-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = linkLabelCell.textContent.trim();
    moveInstrumentation(linkCell, link);
    contentWrap.append(link);

    const date = document.createElement('div');
    date.classList.add('date');
    const time = document.createElement('time');
    time.setAttribute('datetime', dateCell.textContent.trim()); // Assuming date cell contains a valid datetime string
    time.textContent = dateCell.textContent.trim();
    date.append(time);
    moveInstrumentation(dateCell, date);
    contentWrap.append(date);

    wrap.append(contentWrap);
    moveInstrumentation(row, wrap);
    slide.append(wrap);
    slidesContainer.append(slide);
  });

  flickitySliderWrap.append(slidesContainer);
  container.append(flickitySliderWrap);
  section.append(container);

  block.replaceChildren(section);

  // Load Flickity for mobile slider behavior
  await loadCSS('https://unpkg.com/flickity@2/dist/flickity.min.css');
  await loadScript('https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');

  // Parse the data-flickity attribute to get the configuration object
  const flickityConfig = JSON.parse(flickitySliderWrap.dataset.flickity);

  // eslint-disable-next-line no-undef
  new Flickity(slidesContainer, { // Initialize Flickity on slidesContainer, not flickitySliderWrap
    wrapAround: flickityConfig.wrapAround,
    lazyLoad: flickityConfig.lazyLoad,
    pageDots: flickityConfig.pageDots,
    prevNextButtons: flickityConfig.prevNextButtons,
    imagesLoaded: flickityConfig.imagesLoaded,
    cellAlign: flickityConfig.cellAlign,
    watchCSS: flickityConfig.watchCSS,
    adaptiveHeight: flickityConfig.adaptiveHeight,
  });
}
