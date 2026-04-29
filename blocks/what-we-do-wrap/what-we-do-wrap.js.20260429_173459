import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Use array destructuring for root rows as per model
  const [headingRow, descriptionRow, ...itemRows] = children;

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.innerHTML; // Use innerHTML for richtext
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
  mobileContainer.append(mobileSlider);

  const mobileSlidesWrapper = document.createElement('div');
  mobileSlidesWrapper.classList.add('flickity-viewport');
  mobileSlider.append(mobileSlidesWrapper);

  const mobileSliderContent = document.createElement('div');
  mobileSliderContent.classList.add('flickity-slider');
  mobileSlidesWrapper.append(mobileSliderContent);

  const mobileSlides = [];
  let currentMobileSlide = document.createElement('div');
  currentMobileSlide.classList.add('slides');
  let currentMobileSlideRow = document.createElement('div');
  currentMobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
  currentMobileSlide.append(currentMobileSlideRow);
  mobileSlides.push(currentMobileSlide);

  itemRows.forEach((row) => {
    // Use array destructuring for item rows as per fixed model schema
    const [imageDesktopCell, imageTabletCell, imageMobileCell, titleCell, arrowIconCell, linkCell] = [...row.children];

    // Desktop item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col');
    moveInstrumentation(row, desktopCol);

    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');
    desktopCol.append(desktopWrap);

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    desktopWrap.append(desktopImageDiv);

    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      // Use createOptimizedPicture for desktop images
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }]);
      moveInstrumentation(desktopPicture, optimizedPic.querySelector('img'));
      desktopImageDiv.append(optimizedPic);
    }

    const desktopTitleDiv = document.createElement('div');
    desktopTitleDiv.classList.add('title');
    desktopTitleDiv.textContent = titleCell.textContent.trim();
    desktopWrap.append(desktopTitleDiv);

    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const arrowImg = arrowIcon.querySelector('img');
      const newArrowImg = document.createElement('img');
      newArrowImg.src = arrowImg.src;
      newArrowImg.alt = arrowImg.alt;
      newArrowImg.width = arrowImg.width;
      newArrowImg.height = arrowImg.height;
      newArrowImg.loading = 'lazy';
      desktopTitleDiv.append(' ', newArrowImg); // Add space before icon
    }

    const desktopLink = document.createElement('a');
    desktopLink.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      desktopLink.href = foundLink.href;
      desktopLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    desktopWrap.append(desktopLink);
    desktopRow.append(desktopCol);

    // Mobile item
    if (currentMobileSlideRow.children.length === 3) {
      currentMobileSlide = document.createElement('div');
      currentMobileSlide.classList.add('slides');
      currentMobileSlideRow = document.createElement('div');
      currentMobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentMobileSlide.append(currentMobileSlideRow);
      mobileSlides.push(currentMobileSlide);
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    // Instrumentation for mobile items is already moved with desktopCol,
    // so we don't move it again to avoid double instrumentation.

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    mobileWrap.append(mobileImageDiv);

    // Use createOptimizedPicture for mobile images as well
    const mobilePictureElement = document.createElement('picture');
    const desktopImgSrc = imageDesktopCell.querySelector('img')?.src;
    const tabletImgSrc = imageTabletCell.querySelector('img')?.src;
    const mobileImg = imageMobileCell.querySelector('img');

    if (desktopImgSrc) {
      const desktopSource = document.createElement('source');
      desktopSource.media = '(min-width: 992px)';
      desktopSource.srcset = desktopImgSrc;
      mobilePictureElement.append(desktopSource);
    }

    if (tabletImgSrc) {
      const tabletSource = document.createElement('source');
      tabletSource.media = '(min-width: 450px)';
      tabletSource.srcset = tabletImgSrc;
      mobilePictureElement.append(tabletSource);
    }

    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '376' }]);
      // moveInstrumentation is handled by createOptimizedPicture internally for the img element
      mobilePictureElement.append(optimizedMobilePic.querySelector('img'));
    }
    mobileImageDiv.append(mobilePictureElement);

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    mobileWrap.append(mobileTitleDiv);

    if (arrowIcon) {
      const arrowImg = arrowIcon.querySelector('img');
      const newArrowImg = document.createElement('img');
      newArrowImg.src = arrowImg.src;
      newArrowImg.alt = arrowImg.alt;
      newArrowImg.width = arrowImg.width;
      newArrowImg.height = arrowImg.height;
      newArrowImg.loading = 'lazy';
      mobileTitleDiv.append(' ', newArrowImg); // Add space before icon
    }

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundLink) {
      mobileLink.href = foundLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    mobileWrap.append(mobileLink);
    currentMobileSlideRow.append(mobileCol);
  });

  mobileSlides.forEach((slide) => mobileSliderContent.append(slide));

  // Flickity initialization
  await loadCSS('/libs/flickity/flickity.min.css'); // Assuming Flickity CSS is available
  await loadScript('/libs/flickity/flickity.pkgd.min.js'); // Assuming Flickity JS is available

  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined') {
    // The original HTML has data-flickity attributes, we should replicate that config
    // or provide a default. Using a default config here.
    const flkty = new Flickity(mobileSlider, {
      wrapAround: false,
      lazyLoad: true,
      pageDots: true,
      prevNextButtons: false,
      imagesLoaded: true,
      cellAlign: 'left',
      adaptiveHeight: true,
    });

    // Flickity creates its own page dots, so we don't need to manually create them.
    // However, if the original HTML had specific styling or structure for dots,
    // we might need to adjust Flickity's options or post-process.
    // For now, removing the manual dot creation as Flickity handles it.
    // The generated JS was manually creating dots, which Flickity would overwrite.
    // The `flickity-page-dots` class is added by Flickity itself.
    // We can remove the manual creation of `flickityPageDots` and `dot` elements.
  }

  block.replaceChildren(section);

  // The image optimization loops at the end are redundant because createOptimizedPicture
  // is already used during element creation. Removing them.
}
