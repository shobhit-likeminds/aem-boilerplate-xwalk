import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...slideRows] = [...block.children];

  // Section header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  // Slides container
  const positionRelative = document.createElement('div');
  positionRelative.classList.add('position-relative', 'aos-init', 'aos-animate');
  // Add data-aos attributes from original HTML
  positionRelative.setAttribute('data-aos', 'fade-up');
  positionRelative.setAttribute('data-aos-offset', '100');
  positionRelative.setAttribute('data-aos-duration', '650');
  positionRelative.setAttribute('data-aos-easing', 'ease-in-out');


  const container = document.createElement('div');
  container.classList.add('container');

  const gridLayout = document.createElement('div');
  gridLayout.classList.add('grid-layout');
  // Add Flickity attributes for mobile slider
  gridLayout.classList.add('flickity-slider-mobile-wrap');
  gridLayout.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');


  slideRows.forEach((row) => {
    // Use content detection instead of index access for slide cells
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && !cell.querySelector('a'));
    const descriptionCell = cells.find(cell => cell.querySelector('p'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && !cell.textContent.trim().startsWith('http')); // CTA Link
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim().startsWith('http')); // CTA Label (which is the link itself)

    const slidesDiv = document.createElement('div');
    slidesDiv.classList.add('slides');

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    if (imageCell) {
      const imageWrap = document.createElement('div');
      imageWrap.classList.add('image-wrap');

      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageWrap.append(optimizedPic);
          optimizedPic.querySelector('img').classList.add('img-fluid');
        }
      }
      wrapDiv.append(imageWrap);
    }

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');

    if (titleCell) {
      const title = document.createElement('h3');
      title.classList.add('heading', 'font-regular');
      moveInstrumentation(titleCell, title);
      title.textContent = titleCell.textContent.trim();
      contentSectionHeader.append(title);
    }

    if (descriptionCell) {
      const description = document.createElement('p');
      description.classList.add('text-size-body');
      moveInstrumentation(descriptionCell, description);
      description.innerHTML = descriptionCell.innerHTML; // richtext content
      contentSectionHeader.append(description);
    }

    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
      const foundCtaLink = ctaLinkCell.querySelector('a');
      if (foundCtaLink) {
        ctaLink.href = foundCtaLink.href;
      } else {
        // Fallback if ctaLinkCell doesn't contain an <a> but ctaLinkLabelCell does
        const fallbackLink = ctaLinkLabelCell.querySelector('a');
        if (fallbackLink) {
          ctaLink.href = fallbackLink.href;
        }
      }
      ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
      moveInstrumentation(ctaLinkCell, ctaLink);
      contentSectionHeader.append(ctaLink);
    }


    contentWrap.append(contentSectionHeader);
    wrapDiv.append(contentWrap);
    slidesDiv.append(wrapDiv);
    gridLayout.append(slidesDiv);
  });

  container.append(gridLayout);
  positionRelative.append(container);

  block.textContent = '';
  block.classList.add('section', 'work-with-us', 'pb-0');
  block.append(sectionHeader, positionRelative);

  // Initialize Flickity for the carousel if it's present
  // This assumes Flickity is loaded globally or via a dynamic import elsewhere
  // For a robust solution, Flickity should be imported and initialized properly.
  // For this review, we'll just add the initialization logic.
  if (gridLayout.classList.contains('flickity-slider-mobile-wrap')) {
    import('flickity').then((Flickity) => {
      // eslint-disable-next-line no-new
      new Flickity.default(gridLayout, JSON.parse(gridLayout.dataset.flickity));
    }).catch((e) => console.error('Flickity not loaded', e));
  }
}
