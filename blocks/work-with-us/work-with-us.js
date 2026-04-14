import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...slideRows] = [...block.children];

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');

  // Check if Flickity is needed for mobile
  const isMobileCarousel = block.classList.contains('flickity-slider-mobile-wrap');
  if (isMobileCarousel) {
    gridLayoutDiv.classList.add('flickity-slider-mobile-wrap');
    gridLayoutDiv.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');
  }

  slideRows.forEach((row) => {
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    const cells = [...row.children];

    // Content detection for cells
    const imageCell = cells.find((cell) => cell.querySelector('picture'));
    const ctaLinkCell = cells.find((cell) => cell.querySelector('a'));
    const ctaLinkLabelCell = cells.find((cell) => ctaLinkCell && cell !== ctaLinkCell && cell.textContent.trim() === ctaLinkCell.href); // Assuming ctaLinkLabelCell contains the href if it's not the actual label
    const titleCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== '' && cell.innerHTML.indexOf('<p') === -1);
    const textCell = cells.find((cell) => cell.innerHTML.indexOf('<p') > -1);

    if (imageCell && imageCell.querySelector('picture')) {
      const imageWrapDiv = document.createElement('div');
      imageWrapDiv.classList.add('image-wrap');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapDiv.append(optimizedPic);
      }
      wrapDiv.append(imageWrapDiv);
    }

    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');

    if (titleCell) {
      const slideTitle = document.createElement('h3');
      slideTitle.classList.add('heading', 'font-regular');
      moveInstrumentation(titleCell, slideTitle);
      slideTitle.textContent = titleCell.textContent.trim();
      contentSectionHeader.append(slideTitle);
    }

    if (textCell) {
      const slideText = document.createElement('p');
      slideText.classList.add('text-size-body');
      moveInstrumentation(textCell, slideText);
      slideText.innerHTML = textCell.innerHTML; // richtext content
      contentSectionHeader.append(slideText);
    }

    if (ctaLinkCell) {
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const ctaAnchor = document.createElement('a');
        ctaAnchor.classList.add('btn', 'btn-primary', 'stretched-link');
        ctaAnchor.href = ctaLink.href;
        moveInstrumentation(ctaLinkCell, ctaAnchor);
        // Use ctaLinkLabelCell content if it exists and is different from ctaLink.href
        ctaAnchor.textContent = ctaLinkLabelCell && ctaLinkLabelCell.textContent.trim() !== ctaLink.href
          ? ctaLinkLabelCell.textContent.trim()
          : ctaLink.textContent.trim();
        contentSectionHeader.append(ctaAnchor);
      }
    }

    contentWrapDiv.append(contentSectionHeader);
    wrapDiv.append(contentWrapDiv);
    slideDiv.append(wrapDiv);
    gridLayoutDiv.append(slideDiv);
  });

  containerDiv.append(gridLayoutDiv);
  positionRelativeDiv.append(containerDiv);

  block.textContent = '';
  block.classList.add('pb-0'); // Add section classes to block div
  block.append(sectionHeader, positionRelativeDiv);

  // Initialize Flickity if the block has the class
  if (isMobileCarousel) {
    // Dynamically import Flickity
    import('flickity').then((Flickity) => {
      // eslint-disable-next-line no-new
      new Flickity.default(gridLayoutDiv, JSON.parse(gridLayoutDiv.dataset.flickity));
    });
  }
}
