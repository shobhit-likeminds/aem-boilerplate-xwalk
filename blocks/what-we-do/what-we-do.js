import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const rows = [...block.children];
  const [headingRow, introRow, ...businessVerticalRows] = rows;

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  section.append(containerDiv);

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);
  containerDiv.append(sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const intro = document.createElement('p');
  intro.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(introRow, intro);
  intro.innerHTML = introRow.innerHTML;
  sectionHeader.append(intro);

  // Our Business Verticals
  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');
  section.append(ourBusinessVerticals);

  // Desktop View
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  ourBusinessVerticals.append(desktopContainer);

  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  desktopContainer.append(desktopRow);

  // Mobile View - Swiper Carousel
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider');
  mobileContainer.append(mobileSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  mobileSlider.append(swiperWrapper);

  let currentSlideRow = document.createElement('div');
  currentSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
  let currentSlide = document.createElement('div');
  currentSlide.classList.add('swiper-slide');
  currentSlide.append(currentSlideRow);
  swiperWrapper.append(currentSlide);

  businessVerticalRows.forEach((row, index) => {
    const [imageDesktopCell, imageTabletCell, mainImageCell, titleCell, arrowIconCell, linkCell] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col', 'aos-init', 'aos-animate');
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', (index % 3) * 300 + 100); // Stagger delay

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    col.append(wrap);

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    wrap.append(imageDiv);

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureTablet = imageTabletCell.querySelector('picture');
    const pictureMain = mainImageCell.querySelector('picture');

    if (pictureDesktop) {
      const optimizedPic = createOptimizedPicture(
        pictureDesktop.querySelector('img').src,
        pictureDesktop.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }],
      );
      moveInstrumentation(imageDesktopCell, optimizedPic.querySelector('img'));
      imageDiv.append(optimizedPic);
    } else if (pictureTablet) {
      const optimizedPic = createOptimizedPicture(
        pictureTablet.querySelector('img').src,
        pictureTablet.querySelector('img').alt,
        false,
        [{ media: '(min-width: 450px)', width: '376' }],
      );
      moveInstrumentation(imageTabletCell, optimizedPic.querySelector('img'));
      imageDiv.append(optimizedPic);
    } else if (pictureMain) {
      const optimizedPic = createOptimizedPicture(
        pictureMain.querySelector('img').src,
        pictureMain.querySelector('img').alt,
        false,
        [{ width: '376' }],
      );
      moveInstrumentation(mainImageCell, optimizedPic.querySelector('img'));
      imageDiv.append(optimizedPic);
    }

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell.textContent.trim();
    moveInstrumentation(titleCell, titleDiv);
    wrap.append(titleDiv);

    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const img = arrowIcon.querySelector('img');
      const optimizedArrow = createOptimizedPicture(img.src, img.alt, false, [{ width: '10' }]);
      moveInstrumentation(arrowIconCell, optimizedArrow.querySelector('img'));
      titleDiv.append(optimizedArrow);
    }

    const anchor = document.createElement('a');
    anchor.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    moveInstrumentation(linkCell, anchor);
    wrap.append(anchor);

    // Append to desktop view
    desktopRow.append(col);

    // Append to mobile slider
    currentSlideRow.append(col.cloneNode(true)); // Clone for mobile view

    if (currentSlideRow.children.length === 3 && (index < businessVerticalRows.length - 1)) {
      currentSlideRow = document.createElement('div');
      currentSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentSlide = document.createElement('div');
      currentSlide.classList.add('swiper-slide');
      currentSlide.append(currentSlideRow);
      swiperWrapper.append(currentSlide);
    }
  });

  block.replaceChildren(section);

  // Create pagination dots for Swiper
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination');
  mobileSlider.append(paginationDiv);

  // Load Swiper for mobile slider
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(mobileSlider, {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: paginationDiv, // Use the created paginationDiv element
      clickable: true,
    },
    breakpoints: {
      // Original HTML shows 1 col for mobile, 3 for desktop. Swiper handles 1 here.
      // No explicit breakpoints for tablet in original mobile slider, so keep 1.
    },
  });
}
