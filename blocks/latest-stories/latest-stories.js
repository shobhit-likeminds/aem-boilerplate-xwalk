import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...storyRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  // Copy data-aos attributes from ORIGINAL HTML
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-offset', '100');
  heading.setAttribute('data-aos-duration', '650');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.children[0]?.textContent.trim() || '';
  sectionHeader.append(heading);
  section.append(sectionHeader);

  // Container for stories
  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  // Copy data-aos attributes from ORIGINAL HTML
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');

  const flickityWrap = document.createElement('div');
  flickityWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  // Copy data-flickity attribute from ORIGINAL HTML
  flickityWrap.setAttribute(
    'data-flickity',
    '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }',
  );

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  storyRows.forEach((row) => {
    const [
      imageCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      summaryCell,
      storyLinkCell,
      ctaLabelCell,
      dateCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('slides'); // This should be 'slides' as per original HTML structure for each item

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        // Add classes and data attributes from ORIGINAL HTML img
        optimizedImg.classList.add('thumb-img', 'img-fluid');
        optimizedImg.setAttribute('data-img-horizontal', imageHorizontalCell?.querySelector('img')?.src || '');
        optimizedImg.setAttribute('data-img-vertical', imageVerticalCell?.querySelector('img')?.src || '');
        moveInstrumentation(img, optimizedImg);
        imageWrap.append(optimizedPic);
      }
    }
    wrap.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const category = document.createElement('div');
    category.classList.add('category');
    category.textContent = categoryCell?.textContent.trim() || '';
    contentWrap.append(category);

    const text = document.createElement('div');
    text.classList.add('text');
    text.textContent = summaryCell?.textContent.trim() || '';
    contentWrap.append(text);

    const storyLink = storyLinkCell?.querySelector('a');
    if (storyLink) {
      const link = document.createElement('a');
      link.classList.add('btn', 'btn-link');
      link.href = storyLink.href;
      link.textContent = ctaLabelCell?.textContent.trim() || '';
      contentWrap.append(link);
    }

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const time = document.createElement('time');
    time.setAttribute('datetime', dateCell?.textContent.trim() || ''); // Assuming date cell contains ISO date string
    time.textContent = dateCell?.textContent.trim() || '';
    dateDiv.append(time);
    contentWrap.append(dateDiv);

    wrap.append(contentWrap);
    moveInstrumentation(row, wrap); // Move instrumentation from the row to the wrap
    slide.append(wrap);
    slidesContainer.append(slide);
  });

  flickityWrap.append(slidesContainer);
  container.append(flickityWrap);
  section.append(container);

  block.replaceChildren(section);
}
