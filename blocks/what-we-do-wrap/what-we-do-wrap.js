import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const rows = [...block.children];

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const headingRow = rows.shift();
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const descriptionRow = rows.shift();
  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.innerHTML;
  sectionHeader.append(description);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  containerDiv.append(sectionHeader);

  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');

  // Desktop view
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');

  // Mobile view (Flickity carousel)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider'); // Flickity adds flickity-enabled and is-draggable
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  mobileSlider.setAttribute('tabindex', '0');

  const flickityViewport = document.createElement('div');
  flickityViewport.classList.add('flickity-viewport');
  const flickitySlider = document.createElement('div');
  flickitySlider.classList.add('flickity-slider');

  const mobileSlides = [];
  let currentMobileSlide = document.createElement('div');
  currentMobileSlide.classList.add('slides');
  const currentMobileSlideRow = document.createElement('div');
  currentMobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
  currentMobileSlide.append(currentMobileSlideRow);
  mobileSlides.push(currentMobileSlide);

  rows.forEach((row, index) => {
    const [imageDesktopCell, imageTabletCell, imageFallbackCell, titleCell, arrowIconCell, linkCell] = [...row.children];

    const linkElement = linkCell.querySelector('a');
    const href = linkElement ? linkElement.href : '#';

    // Desktop item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col', 'aos-init', 'aos-animate');
    desktopCol.setAttribute('data-aos', 'fade-up');
    desktopCol.setAttribute('data-aos-delay', `${(index % 3) * 300 + 100}`); // Stagger delay

    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      desktopImageDiv.append(optimizedPic);
    }
    desktopWrap.append(desktopImageDiv);

    const desktopTitleDiv = document.createElement('div');
    desktopTitleDiv.classList.add('title');
    desktopTitleDiv.textContent = titleCell.textContent.trim();
    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const arrowImg = arrowIcon.querySelector('img');
      const optimizedArrow = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '10' }]);
      moveInstrumentation(arrowImg, optimizedArrow.querySelector('img'));
      desktopTitleDiv.append(' ', optimizedArrow);
    }
    desktopWrap.append(desktopTitleDiv);

    const desktopLink = document.createElement('a');
    desktopLink.classList.add('stretched-link');
    desktopLink.href = href;
    desktopLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    desktopWrap.append(desktopLink);

    moveInstrumentation(row, desktopCol);
    desktopCol.append(desktopWrap);
    desktopRow.append(desktopCol);

    // Mobile item (for Flickity)
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

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    const mobilePicture = imageTabletCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 450px)', width: '376' }]);
      // Instrumentation for mobile image is moved from the original image element
      // This is okay as it's a separate element from the desktop image
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileImageDiv.append(optimizedPic);
    }
    mobileWrap.append(mobileImageDiv);

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    if (arrowIcon) {
      const arrowImg = arrowIcon.querySelector('img');
      const optimizedArrow = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '10' }]);
      // Instrumentation for arrow icon is moved from the original img element
      moveInstrumentation(arrowImg, optimizedArrow.querySelector('img'));
      mobileTitleDiv.append(' ', optimizedArrow);
    }
    mobileWrap.append(mobileTitleDiv);

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    mobileLink.href = href;
    mobileLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    mobileWrap.append(mobileLink);

    mobileCol.append(mobileWrap);
    currentMobileSlideRow.append(mobileCol);
  });

  desktopContainer.append(desktopRow);
  ourBusinessVerticals.append(desktopContainer);

  flickitySlider.append(...mobileSlides);
  flickityViewport.append(flickitySlider);
  mobileSlider.append(flickityViewport);

  const flickityPageDots = document.createElement('ol');
  flickityPageDots.classList.add('flickity-page-dots');
  mobileSlides.forEach((_, i) => {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    if (i === 0) {
      dot.classList.add('is-selected');
      dot.setAttribute('aria-current', 'step');
    }
    dot.setAttribute('aria-label', `Page dot ${i + 1}`);
    flickityPageDots.append(dot);
  });
  mobileSlider.append(flickityPageDots);

  mobileContainer.append(mobileSlider);
  ourBusinessVerticals.append(mobileContainer);

  const wrapper = document.createElement('div');
  wrapper.classList.add('container');
  wrapper.append(sectionHeader, ourBusinessVerticals);

  block.replaceChildren(wrapper);

  // Load Flickity for mobile slider
  await loadCSS('https://unpkg.com/flickity@2/dist/flickity.min.css');
  await loadScript('https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js');

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
