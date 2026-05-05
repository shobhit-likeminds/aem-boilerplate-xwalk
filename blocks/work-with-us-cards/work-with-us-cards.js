import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0: Replaced direct .children[n] access with array destructuring for root rows
  const [sectionTitleRow, ...cardItemRows] = [...block.children];

  const section = document.createElement('section');
  // CHECK 0.5: Block's own class 'work-with-us-cards' is NOT added to inner wrapper 'section'
  // It's already on the outer block div.
  section.classList.add('section', 'work-with-us', 'pb-0'); // Apply classes from ORIGINAL HTML

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(sectionTitleRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = sectionTitleRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');

  const slidesDiv = document.createElement('div');
  slidesDiv.classList.add('slides');

  cardItemRows.forEach((row) => {
    // CHECK 0: Array destructuring is correct for fixed-schema item rows
    const [
      imageDesktopCell,
      imageMobile576Cell,
      imageMobile799Cell,
      cardTitleCell,
      cardDescriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    const imageWrapDiv = document.createElement('div');
    imageWrapDiv.classList.add('image-wrap');

    // Create a temporary picture element to hold sources and img for createOptimizedPicture
    const tempPicture = document.createElement('picture');
    const imgDesktop = imageDesktopCell.querySelector('img');
    const imgMobile576 = imageMobile576Cell.querySelector('img');
    const imgMobile799 = imageMobile799Cell.querySelector('img');

    if (imgMobile576) {
      const source576 = document.createElement('source');
      source576.media = '(max-width: 576px)';
      source576.srcset = imgMobile576.src;
      tempPicture.append(source576);
    }
    if (imgMobile799) {
      const source799 = document.createElement('source');
      source799.media = '(max-width: 799px)';
      source799.srcset = imgMobile799.src;
      tempPicture.append(source799);
    }
    if (imgDesktop) {
      const img = document.createElement('img');
      img.src = imgDesktop.src;
      img.alt = imgDesktop.alt;
      img.loading = 'lazy';
      img.classList.add('img-fluid'); // Apply class from ORIGINAL HTML
      tempPicture.append(img);
    }

    // Use createOptimizedPicture for the main image
    if (imgDesktop) {
      const optimizedPic = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '750' }]);
      // Move sources from tempPicture to optimizedPic
      [...tempPicture.children].forEach((child) => {
        if (child.tagName === 'SOURCE') {
          optimizedPic.prepend(child); // Prepend sources to keep img last
        }
      });
      imageWrapDiv.append(optimizedPic);
    } else {
      imageWrapDiv.append(tempPicture); // Fallback if no desktop image
    }

    wrapDiv.append(imageWrapDiv);

    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('section-header');

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('heading', 'font-regular');
    cardTitle.textContent = cardTitleCell.textContent.trim();
    cardHeader.append(cardTitle);

    const cardDescription = document.createElement('div'); // CHECK 0.7 B: Changed to div to avoid <p> inside <p>
    cardDescription.classList.add('text-size-body');
    cardDescription.innerHTML = cardDescriptionCell.innerHTML; // richtext content
    cardHeader.append(cardDescription);

    const ctaLink = document.createElement('a');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
    }
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link'); // Apply classes from ORIGINAL HTML
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    cardHeader.append(ctaLink);

    contentWrapDiv.append(cardHeader);
    wrapDiv.append(contentWrapDiv);

    moveInstrumentation(row, wrapDiv); // Move instrumentation from original row to the new wrapDiv
    slidesDiv.append(wrapDiv);
  });

  gridLayoutDiv.append(slidesDiv);
  containerDiv.append(gridLayoutDiv);
  positionRelativeDiv.append(containerDiv);
  section.append(positionRelativeDiv);

  block.replaceChildren(section);

  // CHECK 3: Removed redundant image optimization loop as it's handled during card creation
  // and createOptimizedPicture is designed to replace the original picture element.
}
