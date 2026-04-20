import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...businessVerticalRows] = [...block.children];

  // Section wrapper
  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');
  moveInstrumentation(block, section);

  // Container for header
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('container');
  section.append(headerContainer);

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  headerContainer.append(sectionHeader);

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow?.firstElementChild?.textContent.trim() || '';
  moveInstrumentation(headingRow, heading);
  sectionHeader.append(heading);

  // Description
  const description = document.createElement('p'); // Fixed: Added 'p' as the first argument
  description.classList.add('aos-init', 'aos-animate'); // Added missing classes
  description.textContent = descriptionRow?.firstElementChild?.textContent.trim() || '';
  moveInstrumentation(descriptionRow, description);
  sectionHeader.append(description);

  // Our Business Verticals section
  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');
  section.append(ourBusinessVerticals);

  // Desktop view
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  ourBusinessVerticals.append(desktopContainer);

  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  desktopContainer.append(desktopRow);

  // Mobile view (slider)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider', 'flickity-enabled', 'is-draggable');
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  mobileContainer.append(mobileSlider);

  const flickityViewport = document.createElement('div');
  flickityViewport.classList.add('flickity-viewport');
  mobileSlider.append(flickityViewport);

  const flickitySlider = document.createElement('div');
  flickitySlider.classList.add('flickity-slider');
  flickityViewport.append(flickitySlider);

  const mobileSlides = [];
  let currentMobileSlide = document.createElement('div');
  currentMobileSlide.classList.add('slides');
  flickitySlider.append(currentMobileSlide);
  mobileSlides.push(currentMobileSlide);

  let mobileSlideRowCount = 0;
  let mobileSlideRow = document.createElement('div');
  mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
  currentMobileSlide.append(mobileSlideRow);

  businessVerticalRows.forEach((row, index) => {
    const [imageCell, titleCell, titleIconCell, linkCell] = [...row.children];

    // Desktop item
    const col = document.createElement('div');
    col.classList.add('col', 'aos-init', 'aos-animate');
    desktopRow.append(col);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    col.append(wrap);

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '376' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageDiv.append(optimizedPic);
    }
    wrap.append(imageDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell?.textContent.trim() || '';
    const titleIcon = titleIconCell.querySelector('picture > img');
    if (titleIcon) {
      const svg = document.createElement('img');
      svg.src = titleIcon.src;
      svg.alt = titleIcon.alt;
      svg.width = titleIcon.width;
      svg.height = titleIcon.height;
      titleDiv.append(svg);
    }
    wrap.append(titleDiv);

    const link = document.createElement('a');
    link.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    moveInstrumentation(row, link);
    wrap.append(link);

    // Mobile item
    // Each mobile slide contains up to 3 items
    if (mobileSlideRowCount === 3) {
      currentMobileSlide = document.createElement('div');
      currentMobileSlide.classList.add('slides');
      flickitySlider.append(currentMobileSlide);
      mobileSlides.push(currentMobileSlide);

      mobileSlideRow = document.createElement('div');
      mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentMobileSlide.append(mobileSlideRow);
      mobileSlideRowCount = 0;
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    mobileSlideRow.append(mobileCol);

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '376' }]);
      mobileImageDiv.append(optimizedPic);
    }
    mobileWrap.append(mobileImageDiv);

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell?.textContent.trim() || '';
    if (titleIcon) {
      const svg = document.createElement('img');
      svg.src = titleIcon.src;
      svg.alt = titleIcon.alt;
      svg.width = titleIcon.width;
      svg.height = titleIcon.height;
      mobileTitleDiv.append(svg);
    }
    mobileWrap.append(mobileTitleDiv);

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundLink) {
      mobileLink.href = foundLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    mobileWrap.append(mobileLink);

    mobileSlideRowCount += 1;
  });

  // Flickity page dots
  const flickityPageDots = document.createElement('ol');
  flickityPageDots.classList.add('flickity-page-dots');
  mobileSlider.append(flickityPageDots);

  mobileSlides.forEach((slide, idx) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Page dot ${idx + 1}`);
    if (idx === 0) {
      dot.classList.add('is-selected');
      dot.setAttribute('aria-current', 'step');
    }
    flickityPageDots.append(dot);
  });

  // Replace the original block with the constructed section
  block.replaceWith(section);
}
