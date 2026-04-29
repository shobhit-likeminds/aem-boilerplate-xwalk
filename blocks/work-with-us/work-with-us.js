import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [sectionHeadingRow, ...slideRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');
  moveInstrumentation(block, section); // Move instrumentation from block to section

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-offset', '100');
  heading.setAttribute('data-aos-duration', '650');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  moveInstrumentation(sectionHeadingRow, heading);
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');
  positionRelativeDiv.setAttribute('data-aos', 'fade-up');
  positionRelativeDiv.setAttribute('data-aos-offset', '100');
  positionRelativeDiv.setAttribute('data-aos-duration', '650');
  positionRelativeDiv.setAttribute('data-aos-easing', 'ease-in-out');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Add Flickity wrapper and data attributes
  const flickitySliderMobileWrap = document.createElement('div');
  flickitySliderMobileWrap.classList.add('flickity-slider-mobile-wrap');
  flickitySliderMobileWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');

  slideRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDesktopCell,
      imageAltCell,
      imageTitleCell,
      slideHeadingCell,
      slideBodyCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slidesDiv = document.createElement('div');
    slidesDiv.classList.add('slides');

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');
    moveInstrumentation(row, wrapDiv);

    const imageWrapDiv = document.createElement('div');
    imageWrapDiv.classList.add('image-wrap');

    const picture = document.createElement('picture');

    // Mobile Image (max-width: 576px)
    const mobile576Img = imageMobile576Cell.querySelector('img');
    if (mobile576Img) {
      const source576 = document.createElement('source');
      source576.media = '(max-width: 576px)';
      source576.srcset = mobile576Img.src;
      picture.append(source576);
    }

    // Mobile Image (max-width: 799px)
    const mobile799Img = imageMobile799Cell.querySelector('img');
    if (mobile799Img) {
      const source799 = document.createElement('source');
      source799.media = '(max-width: 799px)';
      source799.srcset = mobile799Img.src;
      picture.append(source799);
    }

    // Desktop/Main Image
    const desktopImg = imageDesktopCell.querySelector('img');
    if (desktopImg) {
      const img = createOptimizedPicture(
        desktopImg.src,
        imageAltCell.textContent.trim(),
        false,
        [{ width: '750' }],
      ).querySelector('img');
      img.classList.add('img-fluid');
      img.alt = imageAltCell.textContent.trim();
      img.title = imageTitleCell.textContent.trim();
      picture.append(img);
    }
    imageWrapDiv.append(picture);
    wrapDiv.append(imageWrapDiv);

    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');

    const slideHeading = document.createElement('h3');
    slideHeading.classList.add('heading', 'font-regular');
    slideHeading.textContent = slideHeadingCell.textContent.trim();
    contentSectionHeader.append(slideHeading);

    const slideBody = document.createElement('p');
    slideBody.classList.add('text-size-body');
    slideBody.innerHTML = slideBodyCell.innerHTML;
    contentSectionHeader.append(slideBody);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href; // Correctly get href from the <a> tag
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    contentSectionHeader.append(ctaLink);

    contentWrapDiv.append(contentSectionHeader);
    wrapDiv.append(contentWrapDiv);
    slidesDiv.append(wrapDiv);
    gridLayoutDiv.append(slidesDiv);
  });

  flickitySliderMobileWrap.append(gridLayoutDiv); // Append gridLayoutDiv to flickity wrapper
  containerDiv.append(flickitySliderMobileWrap); // Append flickity wrapper to containerDiv
  positionRelativeDiv.append(containerDiv);
  section.append(positionRelativeDiv);

  block.replaceChildren(section);

  // Load Flickity CSS and JS
  await loadCSS('/libs/flickity/flickity.min.css');
  await loadScript('/libs/flickity/flickity.pkgd.min.js');

  // Initialize Flickity
  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined') {
    // eslint-disable-next-line no-new, no-undef
    new Flickity(flickitySliderMobileWrap, {
      wrapAround: flickitySliderMobileWrap.dataset.flickity.includes('"wrapAround": true'),
      lazyLoad: flickitySliderMobileWrap.dataset.flickity.includes('"lazyLoad": true'),
      pageDots: flickitySliderMobileWrap.dataset.flickity.includes('"pageDots": true'),
      prevNextButtons: flickitySliderMobileWrap.dataset.flickity.includes('"prevNextButtons": true'),
      imagesLoaded: flickitySliderMobileWrap.dataset.flickity.includes('"imagesLoaded": true'),
      cellAlign: flickitySliderMobileWrap.dataset.flickity.includes('"cellAlign": "left"') ? 'left' : 'center', // Default to center if not specified
      watchCSS: flickitySliderMobileWrap.dataset.flickity.includes('"watchCSS": true'),
      adaptiveHeight: flickitySliderMobileWrap.dataset.flickity.includes('"adaptiveHeight": true'),
    });
  }
}
