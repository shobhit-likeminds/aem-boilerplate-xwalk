import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...slideRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');
  moveInstrumentation(block, section);

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  section.append(sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  // Slides Container
  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');
  section.append(positionRelativeDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  positionRelativeDiv.append(containerDiv);

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');
  containerDiv.append(gridLayoutDiv);

  slideRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDesktopCell,
      slideHeadingCell,
      slideDescriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');
    slideDiv.append(wrapDiv);

    // Image Wrap
    const imageWrapDiv = document.createElement('div');
    imageWrapDiv.classList.add('image-wrap');

    const picture = document.createElement('picture');
    const imgMobile576 = imageMobile576Cell.querySelector('picture > img');
    const imgMobile799 = imageMobile799Cell.querySelector('picture > img');
    const imgDesktop = imageDesktopCell.querySelector('picture > img');

    if (imgMobile576) {
      const source576 = document.createElement('source');
      source576.media = '(max-width: 576px)';
      source576.srcset = imgMobile576.src;
      picture.append(source576);
    }
    if (imgMobile799) {
      const source799 = document.createElement('source');
      source799.media = '(max-width: 799px)';
      source799.srcset = imgMobile799.src;
      picture.append(source799);
    }
    if (imgDesktop) {
      // Use createOptimizedPicture for the main image, ensuring it gets the img-fluid class
      const mainImgElement = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '750' }]);
      mainImgElement.querySelector('img').classList.add('img-fluid');
      picture.append(mainImgElement.querySelector('img'));
    }
    imageWrapDiv.append(picture);
    wrapDiv.append(imageWrapDiv);

    // Content Wrap
    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');
    wrapDiv.append(contentWrapDiv);

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');
    contentWrapDiv.append(contentSectionHeader);

    const slideHeading = document.createElement('h3');
    slideHeading.classList.add('heading', 'font-regular');
    slideHeading.textContent = slideHeadingCell.textContent.trim();
    contentSectionHeader.append(slideHeading);

    const slideDescription = document.createElement('p');
    slideDescription.classList.add('text-size-body');
    slideDescription.innerHTML = slideDescriptionCell.innerHTML;
    contentSectionHeader.append(slideDescription);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    contentSectionHeader.append(ctaLink);

    gridLayoutDiv.append(slideDiv);
  });

  block.replaceChildren(section);
}
