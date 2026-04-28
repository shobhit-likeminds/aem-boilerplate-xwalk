import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...itemRows] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('container');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.innerHTML;
  sectionHeader.append(description);

  root.append(sectionHeader);

  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');

  // Desktop view
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  desktopContainer.append(desktopRow);

  // Mobile view (Swiper)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider', 'swiper'); // Add swiper class for Swiper initialization
  mobileContainer.append(mobileSlider);
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper'); // Correct Swiper wrapper class
  mobileSlider.append(swiperWrapper);

  // Swiper pagination and navigation
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination');
  mobileSlider.append(swiperPagination);

  itemRows.forEach((row, index) => {
    const [imageDesktopCell, imageTabletCell, mainImageCell, titleCell, arrowIconCell, linkCell] = [...row.children];

    // Desktop item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col', 'aos-init', 'aos-animate');
    desktopCol.setAttribute('data-aos', 'fade-up');
    desktopCol.setAttribute('data-aos-delay', `${(index % 3) * 300 + 100}`); // Stagger delays
    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');
    moveInstrumentation(row, desktopWrap);

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const optimizedPic = createOptimizedPicture(
        desktopPicture.querySelector('img').src,
        desktopPicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }],
      );
      optimizedPic.querySelector('img').classList.add('img-fluid'); // Add img-fluid class
      desktopImageDiv.append(optimizedPic);
      moveInstrumentation(desktopPicture, optimizedPic.querySelector('img'));
    }
    desktopWrap.append(desktopImageDiv);

    const desktopTitleDiv = document.createElement('div');
    desktopTitleDiv.classList.add('title');
    desktopTitleDiv.textContent = titleCell.textContent.trim();
    const arrowIcon = arrowIconCell.querySelector('picture');
    if (arrowIcon) {
      const arrowImg = arrowIcon.querySelector('img');
      const arrowOptimizedPic = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '10' }]);
      desktopTitleDiv.append(arrowOptimizedPic);
      moveInstrumentation(arrowIcon, arrowOptimizedPic.querySelector('img'));
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
    desktopCol.append(desktopWrap);
    desktopRow.append(desktopCol);

    // Mobile item (Swiper slide)
    let mobileSlide;
    let mobileSlideRow;

    if (index % 3 === 0) { // Start a new slide for every 3 items
      mobileSlide = document.createElement('div');
      mobileSlide.classList.add('swiper-slide'); // Correct Swiper slide class
      mobileSlideRow = document.createElement('div');
      mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
      mobileSlide.append(mobileSlideRow);
      swiperWrapper.append(mobileSlide);
    } else {
      mobileSlide = swiperWrapper.lastElementChild;
      mobileSlideRow = mobileSlide.querySelector('.row');
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    moveInstrumentation(row, mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    const mobilePicture = imageTabletCell.querySelector('picture');
    if (mobilePicture) {
      const optimizedPic = createOptimizedPicture(
        mobilePicture.querySelector('img').src,
        mobilePicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }, { media: '(min-width: 450px)', width: '376' }],
      );
      optimizedPic.querySelector('img').classList.add('img-fluid'); // Add img-fluid class
      mobileImageDiv.append(optimizedPic);
      moveInstrumentation(mobilePicture, optimizedPic.querySelector('img'));
    }
    mobileWrap.append(mobileImageDiv);

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    if (arrowIcon) {
      const arrowImg = arrowIcon.querySelector('img');
      const arrowOptimizedPic = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '10' }]);
      mobileTitleDiv.append(arrowOptimizedPic);
      moveInstrumentation(arrowIcon, arrowOptimizedPic.querySelector('img'));
    }
    mobileWrap.append(mobileTitleDiv);

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundLink) {
      mobileLink.href = foundLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    mobileWrap.append(mobileLink);
    mobileCol.append(mobileWrap);
    mobileSlideRow.append(mobileCol);
  });

  ourBusinessVerticals.append(desktopContainer, mobileContainer);
  block.replaceChildren(root, ourBusinessVerticals);

  // Initialize Swiper for mobile slider
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(mobileSlider, {
    slidesPerView: 1, // One slide per view for mobile
    spaceBetween: 0,
    loop: false, // Original HTML has no loop
    pagination: {
      el: swiperPagination,
      clickable: true,
    },
    // No prev/next buttons in original HTML
    // imagesLoaded: true, // Swiper handles image loading
    // adaptiveHeight: true, // Swiper handles adaptive height
  });

  block.classList.add('section');
}
