import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  // Move data-aos attributes from headingRow to heading
  [...headingRow.attributes].forEach((attr) => {
    if (attr.name.startsWith('data-aos')) {
      heading.setAttribute(attr.name, attr.value);
    }
  });
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  // Content Wrapper
  const positionRelative = document.createElement('div');
  positionRelative.classList.add('position-relative', 'aos-init', 'aos-animate');
  // Move data-aos attributes from the second root div (which corresponds to positionRelative)
  if (block.children.length > 1) {
    const secondRootDiv = block.children[1];
    [...secondRootDiv.attributes].forEach((attr) => {
      if (attr.name.startsWith('data-aos')) {
        positionRelative.setAttribute(attr.name, attr.value);
      }
    });
  }

  const container = document.createElement('div');
  container.classList.add('container');
  const gridLayout = document.createElement('div');
  gridLayout.classList.add('grid-layout');

  itemRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDefaultCell,
      itemHeadingCell,
      itemDescriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slides = document.createElement('div');
    slides.classList.add('slides');
    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    // Image Wrap
    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const picture = document.createElement('picture');
    const source576 = document.createElement('source');
    source576.media = '(max-width: 576px)';
    source576.srcset = imageMobile576Cell.querySelector('img')?.src || '';
    picture.append(source576);

    const source799 = document.createElement('source');
    source799.media = '(max-width: 799px)';
    source799.srcset = imageMobile799Cell.querySelector('img')?.src || '';
    picture.append(source799);

    const defaultImg = imageDefaultCell.querySelector('img');
    if (defaultImg) {
      const optimizedPic = createOptimizedPicture(
        defaultImg.src,
        defaultImg.alt,
        false,
        [{ width: '750' }],
      );
      // moveInstrumentation from the original img to the new optimized img within the picture
      const newImg = optimizedPic.querySelector('img');
      if (newImg) {
        moveInstrumentation(defaultImg, newImg);
        newImg.classList.add('img-fluid'); // Add img-fluid class as per original HTML
      }
      picture.append(...optimizedPic.children);
    }
    imageWrap.append(picture);
    wrap.append(imageWrap);

    // Content Wrap
    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');
    const contentHeader = document.createElement('div');
    contentHeader.classList.add('section-header');

    const itemHeading = document.createElement('h3');
    itemHeading.classList.add('heading', 'font-regular');
    itemHeading.textContent = itemHeadingCell.textContent.trim();
    contentHeader.append(itemHeading);

    const itemDescription = document.createElement('p');
    itemDescription.classList.add('text-size-body');
    itemDescription.innerHTML = itemDescriptionCell.innerHTML;
    contentHeader.append(itemDescription);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
    // Read href from the <a> tag within ctaLinkCell, not textContent
    ctaLink.href = ctaLinkCell.querySelector('a')?.href || '#';
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    contentHeader.append(ctaLink);

    contentWrap.append(contentHeader);
    wrap.append(contentWrap);

    moveInstrumentation(row, slides);
    slides.append(wrap);
    gridLayout.append(slides);
  });

  container.append(gridLayout);
  positionRelative.append(container);
  section.append(positionRelative);

  block.replaceChildren(section);
}
