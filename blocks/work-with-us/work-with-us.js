import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, ...slideRows] = [...block.children];

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(titleRow, sectionHeader);

  const titleHeading = document.createElement('h2');
  titleHeading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  titleHeading.textContent = titleRow.firstElementChild.textContent.trim();
  sectionHeader.append(titleHeading);

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');

  slideRows.forEach((row) => {
    const [
      imageCell,
      imageAltCell,
      imageTitleCell,
      headingCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    // Image Wrap
    const imageWrapDiv = document.createElement('div');
    imageWrapDiv.classList.add('image-wrap');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(
          img.src,
          imageAltCell?.textContent.trim() || img.alt,
          false,
          [{ width: '750' }],
        );
        optimizedPic.querySelector('img').classList.add('img-fluid');
        if (imageTitleCell?.textContent.trim()) {
          optimizedPic.querySelector('img').setAttribute('title', imageTitleCell.textContent.trim());
        }
        moveInstrumentation(picture, optimizedPic.querySelector('img'));
        imageWrapDiv.append(optimizedPic);
      }
    }
    wrapDiv.append(imageWrapDiv);

    // Content Wrap
    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');

    const contentHeader = document.createElement('div');
    contentHeader.classList.add('section-header');

    const heading = document.createElement('h3');
    heading.classList.add('heading', 'font-regular');
    heading.textContent = headingCell?.textContent.trim();
    contentHeader.append(heading);

    const description = document.createElement('p');
    description.classList.add('text-size-body');
    description.textContent = descriptionCell?.textContent.trim();
    contentHeader.append(description);

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.classList.add('btn', 'btn-primary', 'stretched-link');
      ctaAnchor.href = ctaLink.href;
      ctaAnchor.textContent = ctaLabelCell?.textContent.trim(); // Corrected: Use ctaLabelCell for text
      contentHeader.append(ctaAnchor);
    }

    contentWrapDiv.append(contentHeader);
    wrapDiv.append(contentWrapDiv);
    slideDiv.append(wrapDiv);
    gridLayoutDiv.append(slideDiv);
  });

  containerDiv.append(gridLayoutDiv);
  positionRelativeDiv.append(containerDiv);

  block.innerHTML = '';
  block.classList.add('section', 'pb-0');
  block.append(sectionHeader, positionRelativeDiv);
}
