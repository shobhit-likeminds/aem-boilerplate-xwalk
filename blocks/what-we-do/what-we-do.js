import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...businessVerticalRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow, description);
  description.textContent = descriptionRow.textContent.trim();
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

  // Mobile view (Swiper)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider', 'swiper'); // Add 'swiper' class for Swiper init
  mobileContainer.append(mobileSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper'); // Swiper class

  const mobileSlides = [];
  let currentSlideWrapper = document.createElement('div'); // This will be a swiper-slide
  currentSlideWrapper.classList.add('slides', 'swiper-slide'); // Add swiper-slide class
  let mobileRowForSlide = document.createElement('div'); // This holds the actual content for the slide
  mobileRowForSlide.classList.add('row', 'row-cols-1', 'gy-3');
  currentSlideWrapper.append(mobileRowForSlide);
  mobileSlides.push(currentSlideWrapper);

  businessVerticalRows.forEach((row, index) => {
    const [
      imageDesktopCell,
      imageTabletCell,
      imageMobileCell,
      titleCell,
      arrowIconCell,
      linkCell,
    ] = [...row.children];

    // Desktop item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col', 'aos-init', 'aos-animate');
    desktopRow.append(desktopCol);

    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');
    desktopCol.append(desktopWrap);

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    desktopWrap.append(desktopImageDiv);

    if (imageDesktopCell) {
      const picture = imageDesktopCell.querySelector('picture');
      if (picture) {
        const desktopImg = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(
          desktopImg.src,
          desktopImg.alt,
          false,
          [{ media: '(min-width: 992px)', width: '376' }],
          [{ media: '(min-width: 450px)', width: '376' }],
          [{ width: '376' }],
        );
        moveInstrumentation(picture, optimizedPic.querySelector('img'));
        desktopImageDiv.append(optimizedPic);
      }
    }

    const desktopTitleDiv = document.createElement('div');
    desktopTitleDiv.classList.add('title');
    desktopTitleDiv.textContent = titleCell?.textContent.trim() || '';
    desktopWrap.append(desktopTitleDiv);

    if (arrowIconCell) {
      const arrowImg = arrowIconCell.querySelector('img');
      if (arrowImg) {
        const newArrowImg = document.createElement('img');
        newArrowImg.src = arrowImg.src;
        newArrowImg.alt = arrowImg.alt;
        newArrowImg.width = arrowImg.width;
        newArrowImg.height = arrowImg.height;
        newArrowImg.loading = 'lazy';
        desktopTitleDiv.append(newArrowImg);
      }
    }

    const desktopLink = document.createElement('a');
    desktopLink.classList.add('stretched-link');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      desktopLink.href = foundLink.href;
      desktopLink.setAttribute('aria-label', `Learn more about ${titleCell?.textContent.trim() || ''}`);
    }
    moveInstrumentation(row, desktopLink);
    desktopWrap.append(desktopLink);

    // Mobile item
    // Each mobile slide should contain 3 items, so create a new slide every 3 items (after the first one)
    if (index > 0 && index % 3 === 0) {
      currentSlideWrapper = document.createElement('div');
      currentSlideWrapper.classList.add('slides', 'swiper-slide'); // Add swiper-slide class
      mobileRowForSlide = document.createElement('div');
      mobileRowForSlide.classList.add('row', 'row-cols-1', 'gy-3');
      currentSlideWrapper.append(mobileRowForSlide);
      mobileSlides.push(currentSlideWrapper);
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    mobileRowForSlide.append(mobileCol); // Append to the current slide's row

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    mobileWrap.append(mobileImageDiv);

    if (imageMobileCell) {
      const picture = imageMobileCell.querySelector('picture');
      if (picture) {
        const mobileImg = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(
          mobileImg.src,
          mobileImg.alt,
          false,
          [{ media: '(min-width: 992px)', width: '376' }],
          [{ media: '(min-width: 450px)', width: '376' }],
          [{ width: '376' }],
        );
        moveInstrumentation(picture, optimizedPic.querySelector('img'));
        mobileImageDiv.append(optimizedPic);
      }
    }

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell?.textContent.trim() || '';
    mobileWrap.append(mobileTitleDiv);

    if (arrowIconCell) {
      const arrowImg = arrowIconCell.querySelector('img');
      if (arrowImg) {
        const newArrowImg = document.createElement('img');
        newArrowImg.src = arrowImg.src;
        newArrowImg.alt = arrowImg.alt;
        newArrowImg.width = arrowImg.width;
        newArrowImg.height = arrowImg.height;
        newArrowImg.loading = 'lazy';
        mobileTitleDiv.append(newArrowImg);
      }
    }

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundLink) {
      mobileLink.href = foundLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${titleCell?.textContent.trim() || ''}`);
    }
    mobileWrap.append(mobileLink);
  });

  mobileSlides.forEach((slide) => swiperWrapper.append(slide));
  mobileSlider.append(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination'); // Swiper pagination element
  mobileSlider.append(swiperPagination);

  block.replaceChildren(section);

  // Initialize Swiper for mobile slider
  if (mobileSlides.length > 0) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
    // eslint-disable-next-line no-undef
    new Swiper(mobileSlider, {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: false, // Original HTML has "wrapAround": false
      pagination: {
        el: '.swiper-pagination', // Reference the created pagination element
        clickable: true,
      },
      // Breakpoints from original Flickity config, adapted for Swiper
      breakpoints: {
        // No specific breakpoints for slidesPerView: 1 needed below 992px,
        // as it's already 1 and spaceBetween is 16.
        // The original HTML had 1 slide per view for all mobile sizes.
      },
    });
  }
}
