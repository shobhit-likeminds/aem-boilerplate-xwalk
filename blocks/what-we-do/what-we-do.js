import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];
  const [headingRow, descriptionRow, ...businessVerticalRows] = children;

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);
  container.append(sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

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

  // Mobile view - Swiper setup
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  mobileContainer.append(mobileSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  mobileSlider.append(swiperWrapper);

  let currentSlide = document.createElement('div');
  currentSlide.classList.add('slides');
  let slideRow = document.createElement('div'); // Changed to let
  slideRow.classList.add('row', 'row-cols-1', 'gy-3');
  currentSlide.append(slideRow);
  swiperWrapper.append(currentSlide);

  businessVerticalRows.forEach((row, index) => {
    const [
      imageDesktopCell,
      imageTabletCell,
      imageMobileCell,
      titleCell,
      arrowIconCell,
      linkCell,
    ] = [...row.children];

    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col');
    desktopRow.append(desktopCol);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    moveInstrumentation(row, wrap);
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
        [{ media: '(min-width: 992px)', width: '376' }],
      );
      imageDiv.append(optimizedPic);
    }

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell.textContent.trim();
    wrap.append(titleDiv);

    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const arrowImg = arrowIcon.querySelector('img');
      const optimizedArrow = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '10' }]);
      titleDiv.append(optimizedArrow);
    }

    const link = document.createElement('a');
    link.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    wrap.append(link);

    // Mobile Slider Logic (3 items per slide)
    // Check if the current slideRow is full (3 items) or if it's the first item
    // and we need to create a new slide for it.
    // The original code had a bug where slideRow was const, preventing re-assignment.
    // Also, it created a new slide *after* adding the 3rd item, meaning the 3rd item
    // would be on the *new* slide, not the one it was supposed to fill.
    // Corrected logic: create new slide *before* adding the item if current slide is full.
    if (slideRow.children.length === 3) {
      currentSlide = document.createElement('div');
      currentSlide.classList.add('slides');
      slideRow = document.createElement('div');
      slideRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentSlide.append(slideRow);
      swiperWrapper.append(currentSlide);
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    slideRow.append(mobileCol);

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    moveInstrumentation(row, mobileWrap); // Ensure instrumentation is moved for mobile wrap too
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    mobileWrap.append(mobileImageDiv);

    const mobilePicture = imageMobileCell.querySelector('picture');
    const tabletPicture = imageTabletCell.querySelector('picture');

    if (mobilePicture || tabletPicture) {
      const img = (mobilePicture || tabletPicture).querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [
          { media: '(min-width: 450px)', width: '376' },
          { width: '376' },
        ],
      );
      mobileImageDiv.append(optimizedMobilePic);
    }

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    mobileWrap.append(mobileTitleDiv);

    if (arrowIcon) {
      const arrowImg = arrowIcon.querySelector('img');
      const optimizedArrow = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '10' }]);
      mobileTitleDiv.append(optimizedArrow);
    }

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundLink) {
      mobileLink.href = foundLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    mobileWrap.append(mobileLink);
  });

  block.replaceChildren(section);

  // Load Swiper for mobile slider
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(mobileSlider, {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: '.flickity-page-dots', // Corrected to match original HTML's pagination container
      clickable: true,
      renderBullet: (index, className) => `<li class="${className}" aria-label="Page dot ${index + 1}"></li>`,
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
    },
  });
}
