import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Heading and Description are the first two rows
  const [headingRow, descriptionRow, ...itemRows] = children;

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  // Description
  const description = document.createElement('p');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.innerHTML;
  sectionHeader.append(description);

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

  // Mobile view
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  mobileContainer.append(mobileSlider);

  // Flickity structure requires direct children to be slides
  // The viewport and slider divs are added by Flickity itself, not manually.
  // We will append 'slides' divs directly to mobileSlider.

  const mobileSlides = [];
  let currentMobileSlide = document.createElement('div');
  currentMobileSlide.classList.add('slides');
  mobileSlides.push(currentMobileSlide);
  let mobileSlideRowCount = 0;

  let mobileRowContainer = document.createElement('div');
  mobileRowContainer.classList.add('row', 'row-cols-1', 'gy-3');
  currentMobileSlide.append(mobileRowContainer);

  itemRows.forEach((row, index) => {
    const [imageDesktopCell, imageTabletCell, imageMobileCell, titleCell, arrowIconCell, ctaLinkCell] = [...row.children];

    // Desktop item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col');
    desktopRow.append(desktopCol);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    desktopCol.append(wrap);

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    wrap.append(imageDiv);

    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const optimizedPic = createOptimizedPicture(
        desktopPicture.querySelector('img').src,
        desktopPicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { width: '376' }],
      );
      moveInstrumentation(desktopPicture, optimizedPic.querySelector('img'));
      imageDiv.append(optimizedPic);
    }

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell.textContent.trim();
    wrap.append(titleDiv);

    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const img = arrowIcon.querySelector('img');
      const optimizedArrow = createOptimizedPicture(img.src, img.alt, false, [{ width: '10' }]);
      moveInstrumentation(img, optimizedArrow.querySelector('img'));
      titleDiv.append(optimizedArrow);
    }

    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const anchor = document.createElement('a');
      anchor.classList.add('stretched-link');
      anchor.href = ctaLink.href;
      anchor.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
      moveInstrumentation(ctaLink, anchor);
      wrap.append(anchor);
    }
    moveInstrumentation(row, desktopCol);

    // Mobile item
    if (mobileSlideRowCount >= 3) {
      currentMobileSlide = document.createElement('div');
      currentMobileSlide.classList.add('slides');
      mobileSlides.push(currentMobileSlide);
      
      mobileRowContainer = document.createElement('div'); // Create a new row container for the new slide
      mobileRowContainer.classList.add('row', 'row-cols-1', 'gy-3');
      currentMobileSlide.append(mobileRowContainer);
      
      mobileSlideRowCount = 0;
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    mobileRowContainer.append(mobileCol); // Append to the current slide's row container

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    mobileWrap.append(mobileImageDiv);

    const mobilePicture = imageMobileCell.querySelector('picture');
    if (mobilePicture) {
      const optimizedPic = createOptimizedPicture(
        mobilePicture.querySelector('img').src,
        mobilePicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 450px)', width: '376' }, { width: '376' }],
      );
      moveInstrumentation(mobilePicture, optimizedPic.querySelector('img'));
      mobileImageDiv.append(optimizedPic);
    }

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    mobileWrap.append(mobileTitleDiv);

    if (arrowIcon) {
      const img = arrowIcon.querySelector('img');
      const optimizedArrow = createOptimizedPicture(img.src, img.alt, false, [{ width: '10' }]);
      // No moveInstrumentation for arrowIcon here as it's a duplicate of desktop,
      // and the original arrowIconCell is already instrumented with desktopCol.
      mobileTitleDiv.append(optimizedArrow);
    }

    if (ctaLink) {
      const anchor = document.createElement('a');
      anchor.classList.add('stretched-link');
      anchor.href = ctaLink.href;
      anchor.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
      // No moveInstrumentation for ctaLink here as it's a duplicate of desktop.
      mobileWrap.append(anchor);
    }
    mobileSlideRowCount += 1;
  });

  mobileSlides.forEach((slide) => mobileSlider.append(slide)); // Append slides directly to mobileSlider

  block.replaceChildren(section);

  // Load Flickity for mobile slider
  await loadCSS('/libs/flickity/flickity.min.css');
  await loadScript('/libs/flickity/flickity.pkgd.min.js');

  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined' && mobileSlider) { // Check if Flickity is loaded and mobileSlider exists
    // eslint-disable-next-line no-new, no-undef
    new Flickity(mobileSlider, {
      wrapAround: false,
      lazyLoad: true,
      pageDots: true,
      prevNextButtons: false,
      imagesLoaded: true,
      cellAlign: 'left',
      adaptiveHeight: true,
    });
  }
}
