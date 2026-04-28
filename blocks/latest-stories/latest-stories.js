import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headlineRow, ...storyRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const headline = document.createElement('h2');
  headline.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headlineRow, headline);
  headline.textContent = headlineRow.textContent.trim();
  sectionHeader.append(headline);
  section.append(sectionHeader);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');

  const flickitySliderMobileWrap = document.createElement('div');
  flickitySliderMobileWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickitySliderMobileWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  // The original HTML does not have a 'slides' div wrapping the 'wrap' divs directly under flickity-slider-mobile-wrap.
  // The 'slides' class is on the parent of 'wrap' elements in the original HTML, but the structure is different.
  // Based on the original HTML, the 'wrap' elements are direct children of flickity-slider-mobile-wrap.
  // However, the generated JS creates a 'slidesContainer' and appends 'wrap' to it, then appends 'slidesContainer' to 'flickitySliderMobileWrap'.
  // This seems to be a slight deviation from the original HTML structure for the 'slides' class.
  // Given the original HTML has `<div class="slides">` as a direct child of `flickity-slider-mobile-wrap`,
  // and then `wrap` divs inside it, we should follow that.
  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  storyRows.forEach((row) => {
    const [
      imageDefaultCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
      dateDisplayCell,
      dateIsoCell,
    ] = [...row.children];

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const img = imageDefaultCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('thumb-img', 'img-fluid');
      optimizedImg.setAttribute('data-img-horizontal', imageHorizontalCell.querySelector('img')?.src || '');
      optimizedImg.setAttribute('data-img-vertical', imageVerticalCell.querySelector('img')?.src || '');
      moveInstrumentation(img, optimizedImg);
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

    const description = document.createElement('div');
    description.classList.add('text');
    description.textContent = descriptionCell.textContent.trim();
    moveInstrumentation(descriptionCell, description);
    contentWrap.append(description);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-link');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
    }
    // FIX: Use ctaLabelCell.textContent.trim() for the link text, not hardcoded text.
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    moveInstrumentation(ctaLinkCell, ctaLink);
    moveInstrumentation(ctaLabelCell, ctaLink);
    contentWrap.append(ctaLink);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const date = document.createElement('time');
    date.setAttribute('datetime', dateIsoCell.textContent.trim());
    date.textContent = dateDisplayCell.textContent.trim();
    moveInstrumentation(dateIsoCell, date);
    moveInstrumentation(dateDisplayCell, date);
    dateDiv.append(date);
    contentWrap.append(dateDiv);

    wrap.append(contentWrap);
    moveInstrumentation(row, wrap);
    slidesContainer.append(wrap);
  });

  flickitySliderMobileWrap.append(slidesContainer);
  container.append(flickitySliderMobileWrap);
  section.append(container);

  block.replaceChildren(section);
}
