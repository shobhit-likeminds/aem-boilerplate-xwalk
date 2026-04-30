import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...businessItemRows] = [...block.children];

  // CHECK 0.5: Removed 'what-we-do-wrap' from section.classList.add()
  const section = document.createElement('section');
  section.classList.add('section'); // Removed 'what-we-do-wrap' as outer block already has it

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  section.append(containerDiv);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  containerDiv.append(sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  // CHECK 0: Replaced direct .children[0] access with named destructuring
  const [headingCell] = [...headingRow.children];
  heading.textContent = headingCell?.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow, description);
  // CHECK 0.6: descriptionRow is a ROW, not a cell. Read from cell.
  // CHECK 0: Replaced direct .children[0] access with named destructuring
  const [descriptionCell] = [...descriptionRow.children];
  description.innerHTML = descriptionCell?.innerHTML;
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

  // Mobile view (Swiper based)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block', 'aos-init', 'aos-animate');
  mobileContainer.setAttribute('data-aos', 'fade-up');
  mobileContainer.setAttribute('data-aos-offset', '100');
  mobileContainer.setAttribute('data-aos-duration', '650');
  mobileContainer.setAttribute('data-aos-easing', 'ease-in-out');
  ourBusinessVerticals.append(mobileContainer);

  const mobileSlider = document.createElement('div');
  // CHECK 2.5 E: Removed swiper-initialized, swiper-horizontal, swiper-backface-hidden
  mobileSlider.classList.add('mobile-slider', 'swiper');
  mobileContainer.append(mobileSlider);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  mobileSlider.append(swiperWrapper);

  const slides = []; // To group items into slides for mobile
  let currentSlide = document.createElement('div');
  currentSlide.classList.add('slides', 'swiper-slide');
  let currentRow = document.createElement('div');
  currentRow.classList.add('row', 'row-cols-1', 'gy-3');
  currentSlide.append(currentRow);
  slides.push(currentSlide);

  businessItemRows.forEach((row, index) => {
    // CHECK 0: Array destructuring is correct for fixed-schema rows.
    const [imageDesktopCell, imageTabletCell, businessTitleCell, arrowIconCell, businessLinkCell] = [...row.children];

    // Desktop Item
    const desktopCol = document.createElement('div');
    desktopCol.classList.add('col', 'aos-init', 'aos-animate');
    desktopCol.setAttribute('data-aos', 'fade-up');
    desktopCol.setAttribute('data-aos-delay', `${(index % 3) * 300 + 100}`); // Stagger delays
    desktopRow.append(desktopCol);

    const desktopWrap = document.createElement('div');
    desktopWrap.classList.add('wrap');
    desktopCol.append(desktopWrap);

    const desktopImageDiv = document.createElement('div');
    desktopImageDiv.classList.add('image');
    const desktopPicture = imageDesktopCell.querySelector('picture');
    if (desktopPicture) {
      const img = desktopPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }, { width: '376' }]);
      moveInstrumentation(desktopPicture, optimizedPic.querySelector('img'));
      desktopImageDiv.append(optimizedPic);
    }
    desktopWrap.append(desktopImageDiv);

    const desktopTitleDiv = document.createElement('div');
    desktopTitleDiv.classList.add('title');
    desktopTitleDiv.textContent = businessTitleCell.textContent.trim();
    const desktopArrowIcon = arrowIconCell.querySelector('picture');
    if (desktopArrowIcon) {
      const img = desktopArrowIcon.querySelector('img');
      const arrowImg = document.createElement('img');
      arrowImg.loading = 'lazy';
      arrowImg.src = img.src;
      arrowImg.alt = img.alt;
      arrowImg.width = '10';
      arrowImg.height = '29';
      desktopTitleDiv.append(' ', arrowImg); // Add a space before the icon
    }
    desktopWrap.append(desktopTitleDiv);

    const desktopLink = document.createElement('a');
    desktopLink.classList.add('stretched-link');
    const foundLink = businessLinkCell.querySelector('a');
    if (foundLink) {
      desktopLink.href = foundLink.href;
      desktopLink.setAttribute('aria-label', `Learn more about ${businessTitleCell.textContent.trim()}`);
    }
    moveInstrumentation(row, desktopLink); // Move instrumentation from the original row to the link
    desktopWrap.append(desktopLink);

    // Mobile Item - Group into slides of 3
    if (index > 0 && index % 3 === 0) {
      currentSlide = document.createElement('div');
      currentSlide.classList.add('slides', 'swiper-slide');
      currentRow = document.createElement('div');
      currentRow.classList.add('row', 'row-cols-1', 'gy-3');
      currentSlide.append(currentRow);
      slides.push(currentSlide);
    }

    const mobileCol = document.createElement('div');
    mobileCol.classList.add('col');
    currentRow.append(mobileCol);

    const mobileWrap = document.createElement('div');
    mobileWrap.classList.add('wrap');
    mobileCol.append(mobileWrap);

    const mobileImageDiv = document.createElement('div');
    mobileImageDiv.classList.add('image');
    const mobilePicture = imageTabletCell.querySelector('picture');
    if (mobilePicture) {
      const img = mobilePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 992px)', width: '376' }, { width: '376' }]);
      mobileImageDiv.append(optimizedPic);
    }
    mobileWrap.append(mobileImageDiv);

    const mobileTitleDiv = document.createElement('div');
    mobileTitleDiv.classList.add('title');
    mobileTitleDiv.textContent = businessTitleCell.textContent.trim();
    const mobileArrowIcon = arrowIconCell.querySelector('picture');
    if (mobileArrowIcon) {
      const img = mobileArrowIcon.querySelector('img');
      const arrowImg = document.createElement('img');
      arrowImg.loading = 'lazy';
      arrowImg.src = img.src;
      arrowImg.alt = img.alt;
      arrowImg.width = '10';
      arrowImg.height = '29';
      mobileTitleDiv.append(' ', arrowImg); // Add a space before the icon
    }
    mobileWrap.append(mobileTitleDiv);

    const mobileLink = document.createElement('a');
    mobileLink.classList.add('stretched-link');
    if (foundLink) {
      mobileLink.href = foundLink.href;
      mobileLink.setAttribute('aria-label', `Learn more about ${businessTitleCell.textContent.trim()}`);
    }
    mobileWrap.append(mobileLink);
  });

  slides.forEach((slide) => swiperWrapper.append(slide));

  const paginationEl = document.createElement('div');
  // CHECK 2.5 D: Pagination class should be swiper-pagination, not flickity-page-dots
  paginationEl.classList.add('swiper-pagination');
  mobileSlider.append(paginationEl);

  block.replaceChildren(section);

  // Initialize Swiper for mobile
  // CHECK 2.5 A, B, C: loadScript and loadCSS are imported and awaited, decorate is async.
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
      // CHECK 2.5 D: Swiper pagination renderBullet should create a button or span, not li, and use swiper-pagination-bullet class
      renderBullet: (index, className) => `<span class="${className}" aria-label="Page dot ${index + 1}"></span>`,
    },
  });

  // Optimize images
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
