import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...itemRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);
  moveInstrumentation(descriptionRow, sectionHeader);
  container.append(sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.innerHTML = descriptionRow.innerHTML;
  sectionHeader.append(description);

  // Business Verticals
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
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  mobileContainer.append(mobileSlider);

  const mobileSlides = [];
  const itemsPerSlide = 3; // Based on original HTML structure

  itemRows.forEach((row, index) => {
    const [imageDesktopCell, imageMobileCell, titleCell, iconCell, linkCell] = [...row.children];

    // Desktop item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col');
    moveInstrumentation(row, desktopCol); // Move instrumentation for desktop item

    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');
    desktopCol.append(desktopWrap);

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      desktopImageDiv.append(optimizedPic);
    }
    desktopWrap.append(desktopImageDiv);

    const desktopTitleDiv = document.createElement('div');
    desktopTitleDiv.classList.add('title');
    desktopTitleDiv.textContent = titleCell.textContent.trim();
    const desktopIcon = iconCell.querySelector('picture');
    if (desktopIcon) {
      desktopTitleDiv.append(desktopIcon);
    }
    desktopWrap.append(desktopTitleDiv);

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
    let currentSlide;
    if (index % itemsPerSlide === 0) {
      currentSlide = document.createElement('div');
      currentSlide.classList.add('slides');
      mobileSlides.push(currentSlide);
    } else {
      currentSlide = mobileSlides[mobileSlides.length - 1];
    }

    let mobileRowContainer = currentSlide.querySelector('.row.row-cols-1.gy-3');
    if (!mobileRowContainer) {
      mobileRowContainer = document.createElement('div');
      mobileRowContainer.classList.add('row', 'row-cols-1', 'gy-3');
      currentSlide.append(mobileRowContainer);
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    moveInstrumentation(row, mobileCol); // Move instrumentation for mobile item

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    const mobilePicture = imageMobileCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileImageDiv.append(optimizedPic);
    }
    mobileWrap.append(mobileImageDiv);

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    const mobileIcon = iconCell.querySelector('picture');
    if (mobileIcon) {
      mobileTitleDiv.append(mobileIcon);
    }
    mobileWrap.append(mobileTitleDiv);

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundLink) {
      mobileLink.href = foundLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    mobileWrap.append(mobileLink);
    mobileRowContainer.append(mobileCol);
  });

  const flickityViewport = document.createElement('div');
  flickityViewport.classList.add('flickity-viewport');
  const flickitySlider = document.createElement('div');
  flickitySlider.classList.add('flickity-slider');
  flickityViewport.append(flickitySlider);

  mobileSlides.forEach((slide) => {
    flickitySlider.append(slide);
  });
  mobileSlider.append(flickityViewport);

  block.replaceChildren(section);

  // Initialize Flickity for mobile slider
  if (mobileSlides.length > 0) {
    // Dynamically load Flickity CSS and JS
    await loadCSS('/scripts/flickity.css'); // Assuming flickity.js handles CSS loading internally
    await loadScript('/scripts/flickity.js');
    // eslint-disable-next-line no-undef
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
