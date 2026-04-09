import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...slideRows] = [...block.children];

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-offset', '100');
  heading.setAttribute('data-aos-duration', '650');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');
  positionRelativeDiv.setAttribute('data-aos', 'fade-up');
  positionRelativeDiv.setAttribute('data-aos-offset', '100');
  positionRelativeDiv.setAttribute('data-aos-duration', '650');
  positionRelativeDiv.setAttribute('data-aos-easing', 'ease-in-out');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');

  slideRows.forEach((row) => {
    const cells = [...row.children];

    // Content detection for cells
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => cell.textContent.trim() && !cell.querySelector('picture') && !cell.querySelector('a'));
    const descriptionCell = cells.find(cell => cell.innerHTML.includes('<p>') && !cell.querySelector('picture') && !cell.querySelector('a'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('https://'));
    const ctaLinkLabelCell = cells.find(cell => cell.textContent.trim() && cell.querySelector('a') && !cell.querySelector('a').href.includes('https://'));


    const slidesDiv = document.createElement('div');
    slidesDiv.classList.add('slides');
    moveInstrumentation(row, slidesDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    if (imageCell && imageCell.querySelector('picture')) {
      const imageWrapDiv = document.createElement('div');
      imageWrapDiv.classList.add('image-wrap');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('img-fluid');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageWrapDiv.append(optimizedPic);
        }
      }
      wrapDiv.append(imageWrapDiv);
    }

    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');

    if (titleCell) {
      const title = document.createElement('h3');
      title.classList.add('heading', 'font-regular');
      title.textContent = titleCell.textContent.trim();
      contentSectionHeader.append(title);
    }

    if (descriptionCell) {
      const description = document.createElement('p');
      description.classList.add('text-size-body');
      description.innerHTML = descriptionCell.innerHTML;
      contentSectionHeader.append(description);
    }

    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
      const originalCtaLink = ctaLinkCell.querySelector('a');
      if (originalCtaLink) {
        ctaLink.href = originalCtaLink.href;
      }
      ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
      contentSectionHeader.append(ctaLink);
    }


    contentWrapDiv.append(contentSectionHeader);
    wrapDiv.append(contentWrapDiv);
    slidesDiv.append(wrapDiv);
    gridLayoutDiv.append(slidesDiv);
  });

  containerDiv.append(gridLayoutDiv);
  positionRelativeDiv.append(containerDiv);

  block.textContent = '';
  block.classList.add('section', 'pb-0'); // Add section and pb-0 classes to the block itself
  block.append(sectionHeader, positionRelativeDiv);

  // Interactivity: Initialize Flickity for mobile slider
  if (window.innerWidth <= 799) { // Assuming mobile breakpoint
    // Dynamically import Flickity
    import('flickity').then((Flickity) => {
      // Add flickity-slider-mobile-wrap class to gridLayoutDiv
      gridLayoutDiv.classList.add('flickity-slider-mobile-wrap');
      // Initialize Flickity
      // eslint-disable-next-line no-new
      new Flickity.default(gridLayoutDiv, {
        wrapAround: false,
        lazyLoad: true,
        pageDots: true,
        prevNextButtons: false,
        imagesLoaded: true,
        cellAlign: 'left',
        watchCSS: true,
        adaptiveHeight: true,
      });
    });
  }
}
