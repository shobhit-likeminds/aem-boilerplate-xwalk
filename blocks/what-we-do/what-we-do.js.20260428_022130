import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...businessVerticalRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');

  const container = document.createElement('div');
  container.classList.add('container');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.innerHTML;
  sectionHeader.append(description);

  container.append(sectionHeader);
  section.append(container);

  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');

  // Desktop view
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');

  // Mobile view (Flickity structure)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block');
  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');

  const flickityViewport = document.createElement('div');
  flickityViewport.classList.add('flickity-viewport');
  const flickitySlider = document.createElement('div');
  flickitySlider.classList.add('flickity-slider');
  flickityViewport.append(flickitySlider);
  mobileSlider.append(flickityViewport);

  const mobileSlides = [];
  let currentMobileSlide = null;
  let currentMobileRow = null;

  businessVerticalRows.forEach((row, index) => {
    const [desktopImageCell, mobileImageCell, titleCell, titleIconCell, linkCell] = [...row.children];

    // Desktop item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col');
    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      desktopImageDiv.append(optimizedPic);
    }
    desktopWrap.append(desktopImageDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell.textContent.trim();
    const titleIconPicture = titleIconCell.querySelector('picture');
    if (titleIconPicture) {
      const img = titleIconPicture.querySelector('img');
      const optimizedIcon = createOptimizedPicture(img.src, img.alt, false, [{ width: '10' }]);
      moveInstrumentation(img, optimizedIcon.querySelector('img'));
      titleDiv.append(optimizedIcon);
    }
    desktopWrap.append(titleDiv);

    const anchor = document.createElement('a');
    anchor.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    desktopWrap.append(anchor);
    moveInstrumentation(row, desktopWrap);
    desktopCol.append(desktopWrap);
    desktopRow.append(desktopCol);

    // Mobile item
    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileImageDiv.append(optimizedPic);
    }
    mobileWrap.append(mobileImageDiv);

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    const mobileTitleIconPicture = titleIconCell.querySelector('picture');
    if (mobileTitleIconPicture) {
      const img = mobileTitleIconPicture.querySelector('img');
      const optimizedIcon = createOptimizedPicture(img.src, img.alt, false, [{ width: '10' }]);
      moveInstrumentation(img, optimizedIcon.querySelector('img'));
      mobileTitleDiv.append(optimizedIcon);
    }
    mobileWrap.append(mobileTitleDiv);

    const mobileAnchor = document.createElement('a');
    mobileAnchor.classList.add('stretched-link');
    if (foundLink) {
      mobileAnchor.href = foundLink.href;
      mobileAnchor.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    mobileWrap.append(mobileAnchor);
    // Instrumentation is moved to desktopWrap, so no need to move it again for mobileWrap
    mobileCol.append(mobileWrap);

    if (index % 3 === 0) {
      currentMobileSlide = document.createElement('div');
      currentMobileSlide.classList.add('slides');
      if (index === 0) currentMobileSlide.classList.add('is-selected');
      currentMobileRow = document.createElement('div');
      currentMobileRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentMobileSlide.append(currentMobileRow);
      mobileSlides.push(currentMobileSlide);
    }
    currentMobileRow.append(mobileCol);
  });

  mobileSlides.forEach((slide) => flickitySlider.append(slide));
  mobileContainer.append(mobileSlider);

  desktopContainer.append(desktopRow);
  ourBusinessVerticals.append(desktopContainer, mobileContainer);
  section.append(ourBusinessVerticals);

  block.replaceChildren(section);

  // Initialize Flickity for mobile slider
  if (mobileSlider.dataset.flickity) {
    // Dynamically load Flickity
    await loadCSS('/scripts/flickity.min.css'); // Assuming flickity.min.css is in scripts folder
    await loadScript('/scripts/flickity.min.js'); // Assuming flickity.min.js is in scripts folder
    // eslint-disable-next-line no-undef
    new Flickity(mobileSlider, JSON.parse(mobileSlider.dataset.flickity));
  }
}
