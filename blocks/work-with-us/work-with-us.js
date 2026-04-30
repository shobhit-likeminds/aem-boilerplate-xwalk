import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, ...slideRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(titleRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  // Access the first cell of titleRow, which contains the text content
  heading.textContent = titleRow.children[0]?.textContent.trim() || '';
  sectionHeader.append(heading);
  section.append(sectionHeader);

  // Slides container
  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative', 'aos-init', 'aos-animate');
  section.append(positionRelativeDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  positionRelativeDiv.append(containerDiv);

  const gridLayoutDiv = document.createElement('div');
  gridLayoutDiv.classList.add('grid-layout');
  containerDiv.append(gridLayoutDiv);

  slideRows.forEach((row) => {
    const [
      imageDesktopCell,
      imageMobile576Cell,
      imageMobile799Cell,
      headlineCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');
    slideDiv.append(wrapDiv);

    // Image Wrap
    const imageWrapDiv = document.createElement('div');
    imageWrapDiv.classList.add('image-wrap');

    const picture = document.createElement('picture');
    const imgDesktop = imageDesktopCell?.querySelector('img');
    const imgMobile576 = imageMobile576Cell?.querySelector('img');
    const imgMobile799 = imageMobile799Cell?.querySelector('img');

    const sources = [];
    if (imgMobile576) {
      sources.push({ media: '(max-width: 576px)', srcset: imgMobile576.src });
    }
    if (imgMobile799) {
      sources.push({ media: '(max-width: 799px)', srcset: imgMobile799.src });
    }

    if (imgDesktop) {
      const optimizedPicture = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '750' }], sources);
      optimizedPicture.querySelector('img').classList.add('img-fluid');
      imageWrapDiv.append(optimizedPicture);
      wrapDiv.append(imageWrapDiv);
    } else if (sources.length > 0) {
      // If no desktop image but mobile sources exist, create a picture element with just sources
      const fallbackImg = document.createElement('img');
      fallbackImg.src = sources[sources.length - 1].srcset; // Use the last mobile source as a fallback
      fallbackImg.alt = imgDesktop?.alt || '';
      fallbackImg.classList.add('img-fluid');
      const optimizedPicture = createOptimizedPicture(fallbackImg.src, fallbackImg.alt, false, [{ width: '750' }], sources);
      optimizedPicture.querySelector('img').classList.add('img-fluid');
      imageWrapDiv.append(optimizedPicture);
      wrapDiv.append(imageWrapDiv);
    }


    // Content Wrap
    const contentWrapDiv = document.createElement('div');
    contentWrapDiv.classList.add('content-wrap');
    wrapDiv.append(contentWrapDiv);

    const contentSectionHeader = document.createElement('div');
    contentSectionHeader.classList.add('section-header');
    contentWrapDiv.append(contentSectionHeader);

    const slideHeadline = document.createElement('h3');
    slideHeadline.classList.add('heading', 'font-regular');
    slideHeadline.textContent = headlineCell?.textContent.trim() || '';
    contentSectionHeader.append(slideHeadline);

    const slideDescription = document.createElement('p');
    slideDescription.classList.add('text-size-body');
    slideDescription.innerHTML = descriptionCell?.innerHTML || '';
    contentSectionHeader.append(slideDescription);

    const ctaLink = ctaLinkCell?.querySelector('a');
    const ctaLabel = ctaLabelCell?.textContent.trim();

    if (ctaLink && ctaLabel) {
      const anchor = document.createElement('a');
      anchor.href = ctaLink.href;
      anchor.textContent = ctaLabel;
      anchor.classList.add('btn', 'btn-primary', 'stretched-link');
      contentSectionHeader.append(anchor);
    }

    gridLayoutDiv.append(slideDiv);
  });

  block.replaceChildren(section);
}
