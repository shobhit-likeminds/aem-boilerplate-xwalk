import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [sectionHeadingRow, ...slideRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0'); // Apply classes from ORIGINAL HTML

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(sectionHeadingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  // FIX: Replaced direct children[0] access with named destructuring for sectionHeadingRow
  const [sectionHeadingCell] = [...sectionHeadingRow.children];
  heading.textContent = sectionHeadingCell.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides'); // This div contains all the individual slide wraps

  slideRows.forEach((row) => {
    const [
      imageDesktopCell,
      imageMobile576Cell,
      imageMobile799Cell,
      slideHeadingCell,
      slideDescriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');
    moveInstrumentation(row, wrapDiv);

    // Image Wrap
    const imageWrapDiv = document.createElement('div');
    imageWrapDiv.classList.add('image-wrap');

    const picture = document.createElement('picture');
    let hasImage = false;

    // Mobile Image (max-width: 576px)
    const mobile576Img = imageMobile576Cell.querySelector('img');
    if (mobile576Img) {
      const source576 = document.createElement('source');
      source576.media = '(max-width: 576px)';
      source576.srcset = mobile576Img.src;
      picture.append(source576);
      hasImage = true;
    }

    // Mobile Image (max-width: 799px)
    const mobile799Img = imageMobile799Cell.querySelector('img');
    if (mobile799Img) {
      const source799 = document.createElement('source');
      source799.media = '(max-width: 799px)';
      source799.srcset = mobile799Img.src;
      picture.append(source799);
      hasImage = true;
    }

    // Desktop Image
    const desktopImg = imageDesktopCell.querySelector('img');
    if (desktopImg) {
      const img = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      img.querySelector('img').classList.add('img-fluid');
      picture.append(img.querySelector('img'));
      hasImage = true;
    }

    if (hasImage) {
      imageWrapDiv.append(picture);
      wrapDiv.append(imageWrapDiv);
    }

    // Content Wrap
    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');

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
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href;
    }
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    contentSectionHeader.append(ctaLink);

    contentWrapDiv.append(contentSectionHeader);
    wrapDiv.append(contentWrapDiv);

    slidesContainer.append(wrapDiv);
  });

  gridLayoutDiv.append(slidesContainer);
  containerDiv.append(gridLayoutDiv);
  positionRelativeDiv.append(containerDiv);
  section.append(positionRelativeDiv);

  block.replaceChildren(section);

  // Optimize images after all elements are in the DOM
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
