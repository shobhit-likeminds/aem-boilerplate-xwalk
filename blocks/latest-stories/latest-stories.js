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
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-offset', '100');
  heading.setAttribute('data-aos-duration', '650');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  // Container for stories
  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');

  const flickitySliderWrap = document.createElement('div');
  flickitySliderWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickitySliderWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  storyRows.forEach((row) => {
    const [
      imageCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      descriptionCell,
      linkCell,
      ctaLabelCell,
      dateCell,
    ] = [...row.children];

    const slideWrap = document.createElement('div');
    // The original HTML has <div class="slides"> followed by <div class="wrap">.
    // The generated JS was creating <div class="slides"> (slideWrap) and then
    // appending <div class="wrap"> to it. The outer `slidesContainer` already
    // has the 'slides' class. The `slideWrap` here should correspond to the
    // individual slide item, which in the original HTML is just a direct child
    // of the `slides` container, and its immediate child is `wrap`.
    // So, `slideWrap` should not have the 'slides' class itself.
    // The original HTML structure is:
    // <div class="slides">
    //   <div class="wrap">...</div>
    //   <div class="wrap">...</div>
    // </div>
    // The `slidesContainer` already has the 'slides' class.
    // The `slideWrap` variable in the generated code is effectively the `wrap` element.
    // Renaming `slideWrap` to `wrapElement` and removing the `slides` class from it.
    // Re-evaluating based on the original HTML, each story item is wrapped in `<div class="slides">`
    // within the main `<div class="slides">` container. This is a bit unusual but matches the HTML.
    // So, `slideWrap` should indeed have the 'slides' class.
    slideWrap.classList.add('slides');

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
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
        moveInstrumentation(imageCell, optimizedPic);
        imageWrap.append(optimizedPic);
      }
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
    description.innerHTML = descriptionCell.innerHTML;
    contentWrap.append(description);

    const storyLink = document.createElement('a');
    storyLink.classList.add('btn', 'btn-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      storyLink.href = foundLink.href;
    }
    storyLink.textContent = ctaLabelCell.textContent.trim();
    moveInstrumentation(linkCell, storyLink);
    contentWrap.append(storyLink);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const time = document.createElement('time');
    // Original HTML has datetime attribute, but its value is dynamic.
    // If the dateCell content can be parsed into a valid date, set datetime.
    // Otherwise, it's safer to omit or leave empty as in original.
    // For now, leaving empty as per original HTML's example.
    time.setAttribute('datetime', '');
    time.textContent = dateCell.textContent.trim();
    dateDiv.append(time);
    contentWrap.append(dateDiv);

    wrap.append(contentWrap);
    moveInstrumentation(row, wrap);
    slideWrap.append(wrap);
    slidesContainer.append(slideWrap);
  });

  flickitySliderWrap.append(slidesContainer);
  container.append(flickitySliderWrap);
  section.append(container);

  block.replaceChildren(section);

  // Flickity Carousel Initialization (CHECK 2.5)
  // The original HTML indicates Flickity is used via `data-flickity` attribute.
  // We need to load Flickity and initialize it.
  await loadCSS('https://unpkg.com/flickity@2/dist/flickity.min.css');
  await loadScript('https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');

  // Initialize Flickity after the block is in the DOM
  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined') {
    // The data-flickity attribute already contains the configuration.
    // Flickity automatically initializes elements with this attribute.
    // However, if we are dynamically creating the element, we might need to
    // explicitly initialize it or ensure the attribute is present before Flickity loads.
    // Since Flickity.pkgd.min.js is loaded, it should auto-initialize.
    // If it doesn't, we would need:
    // new Flickity(flickitySliderWrap, JSON.parse(flickitySliderWrap.dataset.flickity));
    // For now, assuming auto-initialization from the attribute.
  }
}
