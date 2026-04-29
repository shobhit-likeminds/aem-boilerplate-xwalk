import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [sectionHeadingRow, ...slideRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'work-with-us', 'pb-0');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(sectionHeadingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular'); // aos-init, aos-animate are added by AOS library, not manually
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const positionRelativeDiv = document.createElement('div');
  positionRelativeDiv.classList.add('position-relative'); // aos-init, aos-animate are added by AOS library, not manually

  const container = document.createElement('div');
  container.classList.add('container');

  // Flickity setup
  await loadCSS('https://unpkg.com/flickity@2/dist/flickity.min.css');
  await loadScript('https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');

  const flickitySliderMobileWrap = document.createElement('div');
  flickitySliderMobileWrap.classList.add('grid-layout'); // Renamed to match original HTML structure
  flickitySliderMobileWrap.dataset.flickity = '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }';

  slideRows.forEach((row) => {
    const [
      imageMobile576Cell,
      imageMobile799Cell,
      imageDesktopCell,
      headingCell,
      descriptionCell,
      ctaLinkCell,
      ctaLabelCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides');
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

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

    const desktopImg = imageDesktopCell.querySelector('img');
    if (desktopImg) {
      const optimizedPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      const img = optimizedPic.querySelector('img');
      img.classList.add('img-fluid');
      img.title = desktopImg.title;
      img.loading = 'lazy';
      picture.append(img);
    }

    imageWrap.append(picture);
    wrapDiv.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const slideSectionHeader = document.createElement('div');
    slideSectionHeader.classList.add('section-header');

    const slideHeading = document.createElement('h3');
    slideHeading.classList.add('heading', 'font-regular');
    slideHeading.textContent = headingCell.textContent.trim();
    slideSectionHeader.append(slideHeading);

    const description = document.createElement('p');
    description.classList.add('text-size-body');
    description.innerHTML = descriptionCell.innerHTML;
    slideSectionHeader.append(description);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-primary', 'stretched-link');
    // Read href from the <a> tag inside ctaLinkCell, not textContent
    ctaLink.href = ctaLinkCell.querySelector('a')?.href || '#';
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    slideSectionHeader.append(ctaLink);

    contentWrap.append(slideSectionHeader);
    wrapDiv.append(contentWrap);
    slideDiv.append(wrapDiv);
    flickitySliderMobileWrap.append(slideDiv); // Append to Flickity container
  });

  container.append(flickitySliderMobileWrap);
  positionRelativeDiv.append(container);
  section.append(positionRelativeDiv);

  block.replaceChildren(section);

  // Initialize Flickity after elements are in the DOM
  // eslint-disable-next-line no-undef
  if (typeof Flickity === 'function') {
    // eslint-disable-next-line no-new
    new Flickity(flickitySliderMobileWrap, JSON.parse(flickitySliderMobileWrap.dataset.flickity));
  }
}
