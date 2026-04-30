import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [sectionHeadingRow, ...itemRows] = [...block.children];

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(sectionHeadingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);

  const root = document.createElement('div');
  root.classList.add('position-relative', 'aos-init', 'aos-animate'); // Copy classes from ORIGINAL HTML

  const container = document.createElement('div');
  container.classList.add('container');

  const gridLayout = document.createElement('div');
  gridLayout.classList.add('grid-layout');

  itemRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDesktopCell,
      cardHeadingCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('slides');
    moveInstrumentation(row, slide);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const picture = document.createElement('picture');

    // Image (max-width: 576px) srcset
    const source576 = document.createElement('source');
    source576.media = '(max-width: 576px)';
    const img576 = imageMobile576Cell.querySelector('img');
    if (img576) source576.srcset = img576.src;
    picture.append(source576);

    // Image (max-width: 799px) srcset
    const source799 = document.createElement('source');
    source799.media = '(max-width: 799px)';
    const img799 = imageMobile799Cell.querySelector('img');
    if (img799) source799.srcset = img799.src; // Corrected from img779.src
    picture.append(source799);

    // Desktop Image src
    const desktopImg = imageDesktopCell.querySelector('img');
    if (desktopImg) {
      const img = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      img.querySelector('img').classList.add('img-fluid');
      picture.append(img.querySelector('img'));
    }

    imageWrap.append(picture);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const cardSectionHeader = document.createElement('div');
    cardSectionHeader.classList.add('section-header');

    const cardHeading = document.createElement('h3');
    cardHeading.classList.add('heading', 'font-regular');
    cardHeading.textContent = cardHeadingCell.textContent.trim();
    cardSectionHeader.append(cardHeading);

    const description = document.createElement('p');
    description.classList.add('text-size-body');
    description.innerHTML = descriptionCell.innerHTML;
    cardSectionHeader.append(description);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
    const foundCtaLink = ctaLinkCell.querySelector('a');
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    cardSectionHeader.append(ctaLink);

    contentWrap.append(cardSectionHeader);
    wrap.append(imageWrap, contentWrap);
    slide.append(wrap);
    gridLayout.append(slide);
  });

  container.append(gridLayout);
  root.append(container);

  block.replaceChildren(sectionHeader, root);
}
