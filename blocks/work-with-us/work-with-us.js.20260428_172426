import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [sectionHeadingRow, ...slideRows] = [...block.children];

  const root = document.createElement('section');
  root.classList.add('section', 'work-with-us', 'pb-0');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(sectionHeadingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);
  root.append(sectionHeader);

  // Slides Container
  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');

  slideRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDesktopCell,
      slideHeadingCell,
      slideDescriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    // Image Wrap (if any image exists)
    const pictureMobile576 = imageMobile576Cell.querySelector('picture');
    const pictureMobile799 = imageMobile799Cell.querySelector('picture');
    const pictureDesktop = imageDesktopCell.querySelector('picture');

    if (pictureMobile576 || pictureMobile799 || pictureDesktop) {
      const imageWrap = document.createElement('div');
      imageWrap.classList.add('image-wrap');

      const picture = document.createElement('picture');

      if (pictureMobile576) {
        const source = document.createElement('source');
        source.media = '(max-width: 576px)';
        source.srcset = pictureMobile576.querySelector('img').src;
        picture.append(source);
      }
      if (pictureMobile799) {
        const source = document.createElement('source');
        source.media = '(max-width: 799px)';
        source.srcset = pictureMobile799.querySelector('img').src;
        picture.append(source);
      }
      if (pictureDesktop) {
        const img = pictureDesktop.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        picture.append(...optimizedPic.children);
        picture.querySelector('img').classList.add('img-fluid');
      }

      imageWrap.append(picture);
      wrapDiv.append(imageWrap);
    }

    // Content Wrap
    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

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

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.classList.add('btn', 'btn-primary', 'stretched-link');
      ctaAnchor.href = ctaLink.href;
      ctaAnchor.textContent = ctaLabelCell.textContent.trim();
      contentSectionHeader.append(ctaAnchor);
    }

    contentWrap.append(contentSectionHeader);
    wrapDiv.append(contentWrap);
    slideDiv.append(wrapDiv);
    gridLayoutDiv.append(slideDiv);
  });

  containerDiv.append(gridLayoutDiv);
  positionRelativeDiv.append(containerDiv);
  root.append(positionRelativeDiv);

  block.replaceChildren(root);
}
