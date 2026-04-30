import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...verticalRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'what-we-do-wrap');
  moveInstrumentation(block, section);

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
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  mobileSlider.classList.add('mobile-slider'); // Swiper container
  mobileContainer.append(mobileSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper'); // Swiper wrapper
  mobileSlider.append(swiperWrapper);

  const paginationEl = document.createElement('div');
  paginationEl.classList.add('flickity-page-dots'); // Used as Swiper pagination container
  mobileSlider.append(paginationEl);

  verticalRows.forEach((row, index) => {
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
    desktopCol.setAttribute('data-aos', 'fade-up');
    desktopCol.setAttribute('data-aos-delay', `${100 + (index % 3) * 300}`); // Example delay
    desktopRow.append(desktopCol);

    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');
    desktopCol.append(desktopWrap);

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    desktopWrap.append(desktopImageDiv);

    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const optimizedPic = createOptimizedPicture(
        desktopPicture.querySelector('img').src,
        desktopPicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 992px)', width: '376' }],
      );
      optimizedPic.querySelector('img').classList.add('img-fluid'); // Add img-fluid class
      moveInstrumentation(desktopPicture.querySelector('img'), optimizedPic.querySelector('img'));
      desktopImageDiv.append(optimizedPic);
    }

    const desktopTitleDiv = document.createElement('div');
    desktopTitleDiv.classList.add('title');
    desktopTitleDiv.textContent = titleCell.textContent.trim();
    desktopWrap.append(desktopTitleDiv);

    const desktopArrowIcon = arrowIconCell.querySelector('picture');
    if (desktopArrowIcon) {
      const img = desktopArrowIcon.querySelector('img');
      const arrowImg = document.createElement('img');
      arrowImg.loading = 'lazy';
      arrowImg.src = img.src;
      arrowImg.alt = img.alt;
      arrowImg.width = 10;
      arrowImg.height = 29;
      desktopTitleDiv.append(arrowImg);
    }

    const desktopLink = document.createElement('a');
    desktopLink.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      desktopLink.href = foundLink.href;
      desktopLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    moveInstrumentation(linkCell, desktopLink);
    desktopWrap.append(desktopLink);

    // Mobile item (Swiper slide)
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperWrapper.append(swiperSlide);

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    swiperSlide.append(mobileCol);

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    mobileWrap.append(mobileImageDiv);

    const mobilePicture = imageMobileCell.querySelector('picture');
    if (mobilePicture) {
      const optimizedPic = createOptimizedPicture(
        mobilePicture.querySelector('img').src,
        mobilePicture.querySelector('img').alt,
        false,
        [{ media: '(min-width: 450px)', width: '376' }],
      );
      optimizedPic.querySelector('img').classList.add('img-fluid'); // Add img-fluid class
      moveInstrumentation(mobilePicture.querySelector('img'), optimizedPic.querySelector('img'));
      mobileImageDiv.append(optimizedPic);
    }

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = titleCell.textContent.trim();
    mobileWrap.append(mobileTitleDiv);

    const mobileArrowIcon = arrowIconCell.querySelector('picture');
    if (mobileArrowIcon) {
      const img = mobileArrowIcon.querySelector('img');
      const arrowImg = document.createElement('img');
      arrowImg.loading = 'lazy';
      arrowImg.src = img.src;
      arrowImg.alt = img.alt;
      arrowImg.width = 10;
      arrowImg.height = 29;
      mobileTitleDiv.append(arrowImg);
    }

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundLink) {
      mobileLink.href = foundLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    // Move instrumentation from the original row to the link, as the row itself is not directly appended
    moveInstrumentation(row, mobileLink);
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
      el: paginationEl,
      clickable: true,
      bulletClass: 'dot', // Corrected to match ORIGINAL HTML
      bulletActiveClass: 'is-selected', // Corrected to match ORIGINAL HTML
    },
  });
}
