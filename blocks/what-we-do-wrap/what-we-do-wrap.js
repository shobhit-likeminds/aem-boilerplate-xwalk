import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headingRow, descriptionRow, ...businessVerticalsRows] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('container');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  heading.textContent = headingRow.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.innerHTML;
  sectionHeader.append(description);

  root.append(sectionHeader);

  // Our Business Verticals
  const ourBusinessVerticals = document.createElement('div');
  ourBusinessVerticals.classList.add('our-business-verticals');

  // Desktop view
  const desktopContainer = document.createElement('div');
  desktopContainer.classList.add('container', 'd-lg-block', 'd-none');
  const desktopRow = document.createElement('div');
  desktopRow.classList.add('row', 'row-cols-lg-3', 'row-cols-1', 'g-3');
  desktopContainer.append(desktopRow);

  // Mobile view (Swiper.js structure)
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container', 'd-lg-none', 'd-block');
  const swiperEl = document.createElement('div');
  swiperEl.classList.add('mobile-slider', 'swiper'); // Add 'swiper' class for Swiper.js
  mobileContainer.append(swiperEl);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper'); // Swiper wrapper
  swiperEl.append(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination'); // Swiper pagination
  swiperEl.append(swiperPagination);

  const createBusinessVerticalItem = (row, isMobile = false) => {
    const [imageDesktopCell, imageTabletCell, altTextCell, titleCell, arrowIconCell, linkCell] = [
      ...row.children,
    ];

    const col = document.createElement('div');
    col.classList.add('col');
    moveInstrumentation(row, col);

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    const picture = document.createElement('picture');
    const desktopImg = imageDesktopCell.querySelector('img');
    const tabletImg = imageTabletCell.querySelector('img');
    const altText = altTextCell.textContent.trim();

    if (desktopImg) {
      const sourceDesktop = document.createElement('source');
      sourceDesktop.media = '(min-width: 992px)';
      sourceDesktop.srcset = desktopImg.src;
      picture.append(sourceDesktop);
    }

    if (tabletImg) {
      const sourceTablet = document.createElement('source');
      sourceTablet.media = '(min-width: 450px)';
      sourceTablet.srcset = tabletImg.src;
      picture.append(sourceTablet);
    }

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.classList.add('img-fluid');
    img.alt = altText;
    // Use tablet for mobile, desktop for desktop if tablet not available
    img.src = isMobile && tabletImg ? tabletImg.src : desktopImg.src;
    picture.append(img);

    imageDiv.append(picture);
    wrap.append(imageDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = titleCell.textContent.trim();

    const arrowIcon = arrowIconCell.querySelector('img');
    if (arrowIcon) {
      const arrowImg = document.createElement('img');
      arrowImg.loading = 'lazy';
      arrowImg.src = arrowIcon.src;
      arrowImg.alt = arrowIcon.alt;
      arrowImg.width = arrowIcon.width;
      arrowImg.height = arrowIcon.height;
      titleDiv.append(' ', arrowImg);
    }
    wrap.append(titleDiv);

    const linkEl = document.createElement('a');
    linkEl.classList.add('stretched-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.setAttribute('aria-label', `Learn more about ${titleCell.textContent.trim()}`);
    }
    wrap.append(linkEl);

    col.append(wrap);
    return col;
  };

  businessVerticalsRows.forEach((row) => {
    // Desktop item
    desktopRow.append(createBusinessVerticalItem(row));

    // Mobile item (each item is a swiper slide)
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    const mobileSlideRow = document.createElement('div');
    mobileSlideRow.classList.add('row', 'row-cols-1', 'gy-3');
    mobileSlideRow.append(createBusinessVerticalItem(row, true));
    swiperSlide.append(mobileSlideRow);
    swiperWrapper.append(swiperSlide);
  });

  ourBusinessVerticals.append(desktopContainer);
  ourBusinessVerticals.append(mobileContainer);
  root.append(ourBusinessVerticals);

  block.replaceChildren(root);

  // Swiper.js initialization for mobile
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 1, // One slide per view for mobile
    spaceBetween: 16, // Adjust as needed
    loop: false, // Original HTML has "wrapAround": false
    pagination: {
      el: swiperPagination,
      clickable: true,
    },
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
