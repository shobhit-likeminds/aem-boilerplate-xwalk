import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...businessVerticalRows] = [...block.children];

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  if (descriptionRow) {
    const description = document.createElement('p');
    description.classList.add('aos-init', 'aos-animate');
    moveInstrumentation(descriptionRow, description);
    description.textContent = descriptionRow.firstElementChild.textContent.trim();
    sectionHeader.append(description);
  }

  const container = document.createElement('div');
  container.classList.add('container');
  container.append(sectionHeader);

  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');

  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  desktopContainer.append(desktopRow);

  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  mobileSlider.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "adaptiveHeight": true }');
  mobileContainer.append(mobileSlider);

  const mobileSlides = [];
  let currentMobileSlide = document.createElement('div');
  currentMobileSlide.classList.add('row', 'row-cols-1', 'gy-3');
  mobileSlides.push(currentMobileSlide);

  businessVerticalRows.forEach((row) => {
    const cells = [...row.children];
    const imageCell = cells.find((cell) => cell.querySelector('picture'));
    const linkCell = cells.find((cell) => cell.querySelector('a'));
    const titleCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a'));
    const linkLabelCell = cells.find((cell) => cell !== imageCell && cell !== titleCell && cell !== linkCell);

    const col = document.createElement('div');
    col.classList.add('col', 'aos-init', 'aos-animate');
    moveInstrumentation(row, col);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageDiv.append(optimizedPic);
    }
    wrap.append(imageDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell?.textContent.trim() || '';

    // Add the arrow icon from the original HTML
    const arrowIcon = document.createElement('img');
    arrowIcon.loading = 'lazy';
    arrowIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1776145932783.svg+xml'; // Corrected path
    arrowIcon.alt = titleCell?.textContent.trim() || ''; // Use title as alt text
    arrowIcon.width = '10';
    arrowIcon.height = '29';
    titleDiv.append(' ', arrowIcon); // Add a space before the icon
    wrap.append(titleDiv);

    const anchor = document.createElement('a');
    anchor.classList.add('stretched-link');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.setAttribute('aria-label', `Learn more about ${linkLabelCell?.textContent.trim() || ''}`);
    } else {
      anchor.href = '#'; // Fallback if no link is found
    }
    wrap.append(anchor);

    col.append(wrap);
    desktopRow.append(col);

    // Mobile slider logic (3 items per slide)
    if (currentMobileSlide.children.length < 3) {
      const mobileCol = col.cloneNode(true);
      moveInstrumentation(row, mobileCol);
      currentMobileSlide.append(mobileCol);
    } else {
      currentMobileSlide = document.createElement('div');
      currentMobileSlide.classList.add('row', 'row-cols-1', 'gy-3');
      mobileSlides.push(currentMobileSlide);
      const mobileCol = col.cloneNode(true);
      moveInstrumentation(row, mobileCol);
      currentMobileSlide.append(mobileCol);
    }
  });

  mobileSlides.forEach((slide) => {
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('slides');
    slideWrapper.append(slide);
    mobileSlider.append(slideWrapper);
  });

  ourBusinessVerticals.append(desktopContainer, mobileContainer);

  block.textContent = '';
  block.append(container, ourBusinessVerticals);
}
