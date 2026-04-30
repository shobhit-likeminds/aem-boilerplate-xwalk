import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...itemRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  // Section Heading
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  // Section Description
  const description = document.createElement('p'); // Removed 'aos-init', 'aos-animate' from createElement
  description.classList.add('aos-init', 'aos-animate'); // Added classes via classList.add
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
  let currentSlide = document.createElement('div');
  currentSlide.classList.add('slides');
  let currentSlideRow = document.createElement('div'); // Declare with let
  currentSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
  currentSlide.append(currentSlideRow);
  mobileSlides.push(currentSlide);
  flickitySlider.append(currentSlide);

  itemRows.forEach((row, index) => {
    const [imageDesktopCell, imageTabletCell, titleCell, arrowIconCell, linkCell] = [...row.children];

    // Desktop Item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col', 'aos-init', 'aos-animate');
    desktopCol.setAttribute('data-aos', 'fade-up');
    desktopCol.setAttribute('data-aos-delay', `${100 + (index % 3) * 300}`); // Example delay logic
    desktopRow.append(desktopCol);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    desktopCol.append(wrap);

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    wrap.append(imageDiv);

    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const optimizedDesktopPic = createOptimizedPicture(
        desktopPicture.querySelector('img').src,
        desktopPicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
      );
      moveInstrumentation(desktopPicture, optimizedDesktopPic.querySelector('img'));
      imageDiv.append(optimizedDesktopPic);
    }

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell.textContent.trim();
    wrap.append(titleDiv);

    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const optimizedArrowIcon = createOptimizedPicture(
        arrowIcon.querySelector('img').src,
        arrowIcon.querySelector('img').alt,
        false,
        [{ width: '10' }],
      );
      moveInstrumentation(arrowIcon, optimizedArrowIcon.querySelector('img'));
      titleDiv.append(optimizedArrowIcon);
    }

    const linkEl = document.createElement('a');
    linkEl.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    moveInstrumentation(linkCell, linkEl);
    wrap.append(linkEl);

    // Mobile Item
    if (index > 0 && index % 3 === 0) {
      currentSlide = document.createElement('div');
      currentSlide.classList.add('slides');
      const newSlideRow = document.createElement('div');
      newSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentSlide.append(newSlideRow);
      mobileSlides.push(currentSlide);
      flickitySlider.append(currentSlide);
      currentSlideRow = newSlideRow; // Reassign currentSlideRow to the new row
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    currentSlideRow.append(mobileCol);

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    mobileWrap.append(mobileImageDiv);

    const tabletPicture = imageTabletCell.querySelector('picture');
    if (tabletPicture) {
      const optimizedTabletPic = createOptimizedPicture(
        tabletPicture.querySelector('img').src,
        tabletPicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }, { width: '376' }],
      );
      moveInstrumentation(tabletPicture, optimizedTabletPic.querySelector('img'));
      mobileImageDiv.append(optimizedTabletPic);
    }

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    mobileWrap.append(mobileTitleDiv);

    const mobileArrowIcon = arrowIconCell.querySelector('picture');
    if (mobileArrowIcon) {
      const optimizedMobileArrowIcon = createOptimizedPicture(
        mobileArrowIcon.querySelector('img').src,
        mobileArrowIcon.querySelector('img').alt,
        false,
        [{ width: '10' }],
      );
      moveInstrumentation(mobileArrowIcon, optimizedMobileArrowIcon.querySelector('img'));
      mobileTitleDiv.append(optimizedMobileArrowIcon);
    }

    const mobileLinkEl = document.createElement('a');
    mobileLinkEl.classList.add('stretched-link');
    if (foundLink) {
      mobileLinkEl.href = foundLink.href;
      mobileLinkEl.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    moveInstrumentation(row, mobileLinkEl); // Move instrumentation from the original row to one of the created elements
    mobileWrap.append(mobileLinkEl);
  });

  const flickityPageDots = document.createElement('ol');
  flickityPageDots.classList.add('flickity-page-dots');
  mobileSlider.append(flickityPageDots);

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

  block.replaceChildren(section);

  // Load Flickity CSS and JS
  await loadCSS('https://unpkg.com/flickity@2/dist/flickity.min.css');
  await loadScript('https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');

  // Initialize Flickity
  // eslint-disable-next-line no-undef
  new Flickity(mobileSlider, {
    wrapAround: mobileSlider.dataset.flickity.includes('"wrapAround": true'),
    lazyLoad: mobileSlider.dataset.flickity.includes('"lazyLoad": true'),
    pageDots: mobileSlider.dataset.flickity.includes('"pageDots": true'),
    prevNextButtons: mobileSlider.dataset.flickity.includes('"prevNextButtons": true'),
    imagesLoaded: mobileSlider.dataset.flickity.includes('"imagesLoaded": true'),
    cellAlign: 'left', // Default from original HTML
    adaptiveHeight: mobileSlider.dataset.flickity.includes('"adaptiveHeight": true'),
  });
}
