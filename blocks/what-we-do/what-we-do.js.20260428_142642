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

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Section Heading
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  // Section Description
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

  // Mobile view (Flickity structure)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'mobile-slider');
  mobileContainer.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  ourBusinessVerticals.append(mobileContainer);

  const flickityViewport = document.createElement('div');
  flickityViewport.classList.add('flickity-viewport');
  mobileContainer.append(flickityViewport);

  const flickitySlider = document.createElement('div');
  flickitySlider.classList.add('flickity-slider');
  flickityViewport.append(flickitySlider);

  const mobileSlides = [];
  let currentMobileSlide = document.createElement('div');
  currentMobileSlide.classList.add('slides');
  flickitySlider.append(currentMobileSlide);

  let mobileSlideRow = document.createElement('div');
  mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
  currentMobileSlide.append(mobileSlideRow);
  mobileSlides.push(currentMobileSlide);

  itemRows.forEach((row, index) => {
    const [desktopImageCell, tabletImageCell, titleCell, arrowIconCell, linkCell] = [...row.children];

    // Desktop Item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col');
    desktopRow.append(desktopCol);

    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');
    desktopCol.append(desktopWrap);

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    if (desktopImageCell) {
      const picture = desktopImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(
          img.src,
          img.alt,
          false,
          [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
        );
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        desktopImageDiv.append(optimizedPic);
      }
    }
    desktopWrap.append(desktopImageDiv);

    const desktopTitleDiv = document.createElement('div');
    desktopTitleDiv.classList.add('title');
    desktopTitleDiv.textContent = titleCell?.textContent.trim() || '';
    if (arrowIconCell) {
      const arrowPicture = arrowIconCell.querySelector('picture');
      if (arrowPicture) {
        const arrowImg = arrowPicture.querySelector('img');
        const optimizedArrow = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '10' }]);
        moveInstrumentation(arrowImg, optimizedArrow.querySelector('img'));
        desktopTitleDiv.append(optimizedArrow);
      }
    }
    desktopWrap.append(desktopTitleDiv);

    const desktopLink = document.createElement('a');
    desktopLink.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      desktopLink.href = foundLink.href;
      desktopLink.setAttribute('aria-label', `Learn more about ${titleCell?.textContent.trim() || ''}`);
    }
    desktopWrap.append(desktopLink);
    moveInstrumentation(row, desktopLink); // Instrumentation for the desktop link

    // Mobile Item
    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    mobileSlideRow.append(mobileCol);

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    if (tabletImageCell) {
      const picture = tabletImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(
          img.src,
          img.alt,
          false,
          [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
        );
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        mobileImageDiv.append(optimizedPic);
      }
    }
    mobileWrap.append(mobileImageDiv);

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell?.textContent.trim() || '';
    if (arrowIconCell) {
      const arrowPicture = arrowIconCell.querySelector('picture');
      if (arrowPicture) {
        const arrowImg = arrowPicture.querySelector('img');
        const optimizedArrow = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '10' }]);
        mobileTitleDiv.append(optimizedArrow);
      }
    }
    mobileWrap.append(mobileTitleDiv);

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundLink) {
      mobileLink.href = foundLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${titleCell?.textContent.trim() || ''}`);
    }
    mobileWrap.append(mobileLink);
    // Instrumentation for the mobile link (important for UE)
    // We move instrumentation from the original row to the desktop link,
    // so for mobile, we create a new instrumentation element.
    const mobileLinkInstrumentation = document.createElement('span');
    moveInstrumentation(row, mobileLinkInstrumentation);
    mobileLink.append(mobileLinkInstrumentation);


    if ((index + 1) % 3 === 0 && (index + 1) < itemRows.length) {
      currentMobileSlide = document.createElement('div');
      currentMobileSlide.classList.add('slides');
      flickitySlider.append(currentMobileSlide);
      mobileSlideRow = document.createElement('div');
      mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentMobileSlide.append(mobileSlideRow);
      mobileSlides.push(currentMobileSlide);
    }
  });

  const flickityPageDots = document.createElement('ol');
  flickityPageDots.classList.add('flickity-page-dots');
  mobileSlides.forEach((_, i) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', `Page dot ${i + 1}`);
    if (i === 0) {
      dot.classList.add('is-selected');
      dot.setAttribute('aria-current', 'step');
    }
    flickityPageDots.append(dot);
  });
  mobileContainer.append(flickityPageDots);

  block.replaceChildren(section);

  // Load Flickity for mobile slider
  await loadCSS('/libs/flickity/flickity.min.css'); // Assuming Flickity CSS is available in libs
  await loadScript('/libs/flickity/flickity.pkgd.min.js'); // Assuming Flickity JS is available in libs

  // Initialize Flickity after block is in DOM and scripts are loaded
  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined') {
    // eslint-disable-next-line no-new
    new Flickity(mobileContainer, {
      wrapAround: mobileContainer.dataset.flickity.includes('"wrapAround": true'),
      lazyLoad: mobileContainer.dataset.flickity.includes('"lazyLoad": true'),
      pageDots: mobileContainer.dataset.flickity.includes('"pageDots": true'),
      prevNextButtons: mobileContainer.dataset.flickity.includes('"prevNextButtons": true'),
      imagesLoaded: mobileContainer.dataset.flickity.includes('"imagesLoaded": true'),
      cellAlign: mobileContainer.dataset.flickity.includes('"cellAlign": "right"') ? 'right' : 'left',
      adaptiveHeight: mobileContainer.dataset.flickity.includes('"adaptiveHeight": true'),
    });
  }
}
