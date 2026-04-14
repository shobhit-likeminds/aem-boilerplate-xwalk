import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...slideRows] = [...block.children];

  // Section header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const h2 = document.createElement('h2');
  h2.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow.firstElementChild, h2);
  h2.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(h2);

  // Slides container
  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');

  slideRows.forEach((row) => {
    const cells = [...row.children];

    // Content detection for slide cells
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const slideHeadingCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && cell.querySelector('a') === null);
    const textCell = cells.find(cell => cell.querySelector('p'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href && cell.querySelector('a').textContent.trim() === '');
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').textContent.trim() !== '');

    const slidesDiv = document.createElement('div');
    slidesDiv.classList.add('slides');

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    // Image
    if (imageCell) {
      const imageWrapDiv = document.createElement('div');
      imageWrapDiv.classList.add('image-wrap');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('img-fluid');
          moveInstrumentation(picture, optimizedPic.querySelector('img'));
          imageWrapDiv.append(optimizedPic);
        }
      }
      if (imageWrapDiv.hasChildNodes()) {
        wrapDiv.append(imageWrapDiv);
      }
    }

    // Content
    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');

    const slideSectionHeader = document.createElement('div');
    slideSectionHeader.classList.add('section-header');

    if (slideHeadingCell) {
      const h3 = document.createElement('h3');
      h3.classList.add('heading', 'font-regular');
      moveInstrumentation(slideHeadingCell, h3);
      h3.textContent = slideHeadingCell.textContent.trim();
      slideSectionHeader.append(h3);
    }

    if (textCell) {
      const p = document.createElement('p');
      p.classList.add('text-size-body');
      moveInstrumentation(textCell, p);
      p.innerHTML = textCell.innerHTML;
      slideSectionHeader.append(p);
    }

    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const anchor = document.createElement('a');
        anchor.href = ctaLink.href;
        anchor.classList.add('btn', 'btn-primary', 'stretched-link');
        anchor.textContent = ctaLinkLabelCell.textContent.trim();
        moveInstrumentation(ctaLinkCell, anchor);
        slideSectionHeader.append(anchor);
      }
    }

    contentWrapDiv.append(slideSectionHeader);
    wrapDiv.append(contentWrapDiv);
    slidesDiv.append(wrapDiv);
    gridLayoutDiv.append(slidesDiv);
  });

  containerDiv.append(gridLayoutDiv);
  positionRelativeDiv.append(containerDiv);

  block.textContent = '';
  block.classList.add('section', 'work-with-us', 'pb-0'); // Add section classes to the block itself
  block.append(sectionHeader, positionRelativeDiv);
}
