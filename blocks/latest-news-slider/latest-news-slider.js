import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...slideRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.children[0]?.textContent.trim() || '';
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');

  const flickitySliderWrap = document.createElement('div');
  flickitySliderWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickitySliderWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  slideRows.forEach((row) => {
    const [
      imageCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      headlineCell,
      ctaLinkCell,
      ctaLabelCell,
      dateCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const mainPicture = imageCell.querySelector('picture');
    const mainImg = mainPicture ? mainPicture.querySelector('img') : null;
    if (mainImg) {
      const optimizedPic = createOptimizedPicture(mainImg.src, mainImg.alt, false, [{ width: '750' }]);
      const newImg = optimizedPic.querySelector('img');
      newImg.classList.add('thumb-img', 'img-fluid');
      newImg.setAttribute('loading', 'lazy');

      const horizontalImg = imageHorizontalCell.querySelector('picture')?.querySelector('img');
      if (horizontalImg) {
        newImg.setAttribute('data-img-horizontal', horizontalImg.src);
      }
      const verticalImg = imageVerticalCell.querySelector('picture')?.querySelector('img');
      if (verticalImg) {
        newImg.setAttribute('data-img-vertical', verticalImg.src);
      }

      moveInstrumentation(mainImg, newImg);
      imageWrap.append(optimizedPic);
    }
    wrapDiv.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.textContent = categoryCell?.textContent.trim() || '';
    contentWrap.append(categoryDiv);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.textContent = headlineCell?.textContent.trim() || '';
    contentWrap.append(textDiv);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-link');
    const foundCtaLink = ctaLinkCell?.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
    }
    ctaLink.textContent = ctaLabelCell?.textContent.trim() || '';
    contentWrap.append(ctaLink);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const timeEl = document.createElement('time');
    const dateText = dateCell?.textContent.trim();
    if (dateText) {
      timeEl.setAttribute('datetime', dateText); // Assuming dateText is in a parseable format
      timeEl.textContent = dateText;
    }
    dateDiv.append(timeEl);
    contentWrap.append(dateDiv);

    wrapDiv.append(contentWrap);
    moveInstrumentation(row, slideDiv);
    slideDiv.append(wrapDiv);
    slidesContainer.append(slideDiv);
  });

  flickitySliderWrap.append(slidesContainer);
  container.append(flickitySliderWrap);
  section.append(container);

  block.replaceChildren(section);
}
