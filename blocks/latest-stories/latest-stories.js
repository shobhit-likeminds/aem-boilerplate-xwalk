import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...storyRows] = [...block.children];

  // Section header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  // Stories container
  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');

  const sliderWrap = document.createElement('div');
  sliderWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');

  const slides = document.createElement('div');
  slides.classList.add('slides');

  storyRows.forEach((row) => {
    // Destructuring with spread for robustness, though direct access is fine here
    // because the model defines exactly 6 cells per story row.
    const [imageCell, categoryCell, textCell, linkCell, linkLabelCell, dateCell] = [...row.children];

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        // Use the existing img src and alt, and add the thumb-img and img-fluid classes
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        optimizedImg.classList.add('thumb-img', 'img-fluid');
        // Copy data attributes from original img if they exist
        if (img.dataset.imgHorizontal) optimizedImg.dataset.imgHorizontal = img.dataset.imgHorizontal;
        if (img.dataset.imgVertical) optimizedImg.dataset.imgVertical = img.dataset.imgVertical;
        moveInstrumentation(picture, optimizedImg);
        imageWrap.append(optimizedPic);
      }
    }
    wrap.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const category = document.createElement('div');
    category.classList.add('category');
    moveInstrumentation(categoryCell, category);
    category.textContent = categoryCell.textContent.trim();
    contentWrap.append(category);

    const text = document.createElement('div');
    text.classList.add('text');
    moveInstrumentation(textCell, text);
    text.textContent = textCell.textContent.trim();
    contentWrap.append(text);

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('btn', 'btn-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkAnchor.href = foundLink.href;
    }
    // Use linkLabel for the anchor text
    moveInstrumentation(linkLabelCell, linkAnchor);
    linkAnchor.textContent = linkLabelCell.textContent.trim();
    contentWrap.append(linkAnchor);

    const date = document.createElement('div');
    date.classList.add('date');
    const time = document.createElement('time');
    moveInstrumentation(dateCell, time);
    time.setAttribute('datetime', dateCell.textContent.trim()); // Assuming date cell contains a parseable date string
    time.textContent = dateCell.textContent.trim();
    date.append(time);
    contentWrap.append(date);

    wrap.append(contentWrap);
    moveInstrumentation(row, wrap);
    slides.append(wrap);
  });

  sliderWrap.append(slides);
  container.append(sliderWrap);

  block.textContent = '';
  block.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');
  block.append(sectionHeader);
  block.append(container);

  // Flickity initialization based on data-flickity attribute from original HTML
  const flickityData = sliderWrap.dataset.flickity;
  if (flickityData) {
    // Dynamically import Flickity and initialize it
    import('flickity').then((FlickityModule) => {
      const Flickity = FlickityModule.default;
      try {
        const options = JSON.parse(flickityData.replace(/&quot;/g, '"'));
        // eslint-disable-next-line no-new
        new Flickity(slides, options);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse Flickity options or initialize Flickity:', e);
      }
    });
  }
}
