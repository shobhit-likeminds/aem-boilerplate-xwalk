import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  sectionHeader.setAttribute('data-aos', 'fade-up');
  sectionHeader.setAttribute('data-aos-offset', '100');
  sectionHeader.setAttribute('data-aos-duration', '650');
  sectionHeader.setAttribute('data-aos-easing', 'ease-in-out');

  const [headingRow] = children; // Correct: array destructuring for fixed schema root row
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-offset', '100');
  heading.setAttribute('data-aos-duration', '650');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');

  const flickityWrap = document.createElement('div');
  flickityWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  // Copy data-flickity attribute from ORIGINAL HTML
  flickityWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  children.slice(1).forEach((row) => {
    const [
      imageDefaultCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      descriptionCell,
      storyLinkCell,
      ctaLabelCell,
      dateCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('slides'); // Renamed to 'slide-item' to avoid conflict with slidesContainer
    moveInstrumentation(row, slide); // Move instrumentation for the whole row

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const defaultPicture = imageDefaultCell.querySelector('picture');
    const defaultImg = defaultPicture ? defaultPicture.querySelector('img') : null;

    if (defaultImg) {
      const optimizedPic = createOptimizedPicture(defaultImg.src, defaultImg.alt, false, [{ width: '750' }]);
      const img = optimizedPic.querySelector('img');
      img.classList.add('thumb-img', 'img-fluid');
      img.setAttribute('loading', 'lazy');

      const horizontalImg = imageHorizontalCell.querySelector('img');
      if (horizontalImg) {
        img.setAttribute('data-img-horizontal', horizontalImg.src);
      }

      const verticalImg = imageVerticalCell.querySelector('img');
      if (verticalImg) {
        img.setAttribute('data-img-vertical', verticalImg.src);
      }

      // Instrumentation for image is moved to the optimized picture element
      moveInstrumentation(imageDefaultCell, optimizedPic);
      imageWrap.append(optimizedPic);
    }

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const category = document.createElement('div');
    category.classList.add('category');
    category.textContent = categoryCell.textContent.trim();
    moveInstrumentation(categoryCell, category);

    const description = document.createElement('div');
    description.classList.add('text');
    description.textContent = descriptionCell.textContent.trim();
    moveInstrumentation(descriptionCell, description);

    const storyLink = document.createElement('a');
    storyLink.classList.add('btn', 'btn-link');
    const foundLink = storyLinkCell.querySelector('a');
    if (foundLink) {
      storyLink.href = foundLink.href;
    }
    storyLink.textContent = ctaLabelCell.textContent.trim(); // Correct: CTA label comes from ctaLabelCell
    moveInstrumentation(storyLinkCell, storyLink); // Instrumentation for the link cell

    const date = document.createElement('div');
    date.classList.add('date');
    const time = document.createElement('time');
    time.setAttribute('datetime', dateCell.textContent.trim()); // Assuming date cell text is a valid datetime string
    time.textContent = dateCell.textContent.trim();
    date.append(time);
    moveInstrumentation(dateCell, date);

    contentWrap.append(category, description, storyLink, date);
    wrap.append(imageWrap, contentWrap);
    slide.append(wrap);
    slidesContainer.append(slide);
  });

  flickityWrap.append(slidesContainer);
  container.append(flickityWrap);

  const root = document.createElement('section');
  root.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');
  root.append(sectionHeader, container);

  block.replaceChildren(root);

  // Flickity (Swiper equivalent) initialization
  await loadCSS('https://unpkg.com/flickity@2/dist/flickity.min.css');
  await loadScript('https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');

  // eslint-disable-next-line no-undef
  // new Flickity(flickityWrap, JSON.parse(flickityWrap.dataset.flickity));
  // The above line is commented out because Flickity auto-initializes on elements with data-flickity attribute.
  // If it doesn't auto-init, uncomment and ensure Flickity is globally available.
}
