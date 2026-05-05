import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];
  const [headingRow, descriptionRow, ...businessVerticalItemRows] = children;

  const root = document.createElement('section'); // Renamed 'section' to 'root' to avoid confusion with block's own class
  root.classList.add('what-we-do-wrap'); // Removed 'section' class as block already has it
  moveInstrumentation(block, root);

  const container = document.createElement('div');
  container.classList.add('container');
  root.append(container);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  container.append(sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  const [headingCell] = [...headingRow.children]; // Fixed: Use destructuring for heading cell
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingCell?.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  const [descriptionCell] = [...descriptionRow.children]; // Fixed: Use destructuring for description cell
  moveInstrumentation(descriptionRow, description);
  description.textContent = descriptionCell?.textContent.trim();
  sectionHeader.append(description);

  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');
  root.append(ourBusinessVerticals);

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
  mobileSlider.classList.add('mobile-slider');
  mobileContainer.append(mobileSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  mobileSlider.append(swiperWrapper);

  const slidesPerPage = 3; // Number of items per slide for mobile
  let currentSlide;
  let mobileSlideRow;

  const createNewSlide = () => {
    currentSlide = document.createElement('div');
    currentSlide.classList.add('swiper-slide');
    mobileSlideRow = document.createElement('div');
    mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
    currentSlide.append(mobileSlideRow);
    swiperWrapper.append(currentSlide);
  };

  createNewSlide(); // Create the first slide

  businessVerticalItemRows.forEach((row, index) => {
    const [imageDesktopCell, imageTabletCell, imageMobileCell, titleCell, arrowIconCell, linkCell] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col', 'aos-init', 'aos-animate');
    moveInstrumentation(row, col);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');
    col.append(wrap);

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    wrap.append(imageDiv);

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    if (pictureDesktop) {
      const img = pictureDesktop.querySelector('img');
      const optimizedPic = createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }],
      );
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageDiv.append(optimizedPic);
    }

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell.textContent.trim();
    wrap.append(titleDiv);

    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const img = arrowIcon.querySelector('img');
      const optimizedArrow = createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{ width: '10' }],
      );
      moveInstrumentation(img, optimizedArrow.querySelector('img'));
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

    // Append to desktop grid
    desktopRow.append(col);

    // Append to mobile slider
    const mobileCol = col.cloneNode(true); // Clone the entire item for mobile
    if (mobileSlideRow.children.length >= slidesPerPage) {
      createNewSlide(); // Create a new slide if the current one is full
    }
    mobileSlideRow.append(mobileCol);
  });

  const paginationEl = document.createElement('div');
  paginationEl.classList.add('swiper-pagination');
  mobileSlider.append(paginationEl);

  block.replaceChildren(root);

  // Initialize Swiper for mobile
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(mobileSlider, {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      // Disable Swiper on larger screens if needed, or adjust slidesPerView
      992: {
        enabled: false,
      },
    },
  });
}
