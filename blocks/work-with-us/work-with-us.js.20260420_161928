import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  block.classList.add('section', 'work-with-us', 'pb-0');

  // Section Header
  // The first row is the heading. Find it by checking if it's the only row or if it has only one cell.
  const blockHeadingRow = children.find(row => row.children.length === 1 || children.indexOf(row) === 0);
  const slideRows = children.filter(row => row !== blockHeadingRow);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  if (blockHeadingRow) {
    moveInstrumentation(blockHeadingRow, sectionHeader);

    const heading = document.createElement('h2');
    heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
    heading.textContent = blockHeadingRow.textContent.trim();
    sectionHeader.append(heading);
    block.replaceChild(sectionHeader, blockHeadingRow);
  } else {
    // If no heading row, prepend the sectionHeader to the block
    block.prepend(sectionHeader);
  }


  // Slides Container
  const positionRelative = document.createElement('div');
  positionRelative.classList.add('position-relative', 'aos-init', 'aos-animate');

  const container = document.createElement('div');
  container.classList.add('container');
  positionRelative.append(container);

  const gridLayout = document.createElement('div');
  gridLayout.classList.add('grid-layout');
  container.append(gridLayout);

  slideRows.forEach((row) => {
    // Destructuring is safe here as per EDS Block Structure for item rows
    const [imageCell, imageAltCell, imageTitleCell, slideHeadingCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');
    slideDiv.append(wrapDiv);

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const imageWrap = document.createElement('div');
      imageWrap.classList.add('image-wrap');
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent.trim(), false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('img-fluid');
        // Ensure alt and title attributes are set on the img within the optimized picture
        optimizedPic.querySelector('img').alt = imageAltCell.textContent.trim();
        optimizedPic.querySelector('img').title = imageTitleCell.textContent.trim();
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrap.append(optimizedPic);
      }
      wrapDiv.append(imageWrap);
    }

    // Content
    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');
    wrapDiv.append(contentWrap);

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');
    contentWrap.append(contentSectionHeader);

    const slideHeading = document.createElement('h3');
    slideHeading.classList.add('heading', 'font-regular');
    slideHeading.textContent = slideHeadingCell.textContent.trim();
    contentSectionHeader.append(slideHeading);

    const description = document.createElement('p');
    description.classList.add('text-size-body');
    description.textContent = descriptionCell.textContent.trim();
    contentSectionHeader.append(description);

    const ctaLinkAnchor = ctaLinkCell.querySelector('a'); // Get the anchor from the ctaLinkCell
    if (ctaLinkAnchor) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.classList.add('btn', 'btn-primary', 'stretched-link');
      ctaAnchor.href = ctaLinkAnchor.href; // Use the href from the anchor
      ctaAnchor.textContent = ctaLabelCell.textContent.trim();
      contentSectionHeader.append(ctaAnchor);
    }

    gridLayout.append(slideDiv);
  });

  block.append(positionRelative);
}
