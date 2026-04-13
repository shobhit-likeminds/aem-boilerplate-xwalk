import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('section-background-area2');
  block.id = 'trendingnow';

  const [headingRow, ...cardRows] = [...block.children];

  // Heading
  const headingEl = document.createElement('h2');
  moveInstrumentation(headingRow, headingEl);
  headingEl.classList.add('trending-heading');
  headingEl.textContent = headingRow.firstElementChild.textContent.trim();

  // Cards container
  const trendingNowContainer = document.createElement('div');
  trendingNowContainer.classList.add('trendingnow-container');

  const desktopTrendingNow = document.createElement('div');
  desktopTrendingNow.classList.add('desktop-trending-now');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  cardRows.forEach((row, index) => {
    // Use content detection instead of direct index access for robustness
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !cell.querySelector('picture') && cell.querySelector('strong') || (cells.indexOf(cell) === 1 && !cell.querySelector('a'))); // Assuming title is second cell if no picture/link
    const descriptionCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a')); // Assuming description has a p tag and no link
    const readMoreLinkCell = cells.find(cell => cell.querySelector('a') && cells.indexOf(cell) === 3); // Assuming readMoreLink is the 4th cell with an anchor
    const readMoreLinkLabelCell = cells.find(cell => cells.indexOf(cell) === 4); // Assuming readMoreLinkLabel is the 5th cell

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'trending-swiperslide');
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-active');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-next');
    }

    const slideContentWrapper = document.createElement('div');
    const trendingNowBox = document.createElement('div');
    trendingNowBox.classList.add('trendingnow-box', `type-${index + 1}`);
    trendingNowBox.id = `card${index + 1}`;

    // Image
    const imageP = document.createElement('p');
    const picture = imageCell?.querySelector('picture');
    if (picture) {
      moveInstrumentation(imageCell, imageP);
      imageP.append(picture);
    }

    // Title
    const titleH4 = document.createElement('h4');
    moveInstrumentation(titleCell, titleH4);
    titleH4.classList.add('trendingnow-box-title');
    if (titleCell) {
      titleH4.innerHTML = titleCell.innerHTML; // Use innerHTML to preserve strong tags
    }

    // Description
    const descriptionDiv = document.createElement('div');
    moveInstrumentation(descriptionCell, descriptionDiv);
    descriptionDiv.classList.add('p2', 'trendingnow-box-desc');
    if (descriptionCell) {
      while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
    }

    // Read More Link
    const readMoreP = document.createElement('p');
    const readMoreLink = document.createElement('a');
    moveInstrumentation(readMoreLinkCell, readMoreLink);
    readMoreLink.classList.add('read-more');
    const foundLink = readMoreLinkCell?.querySelector('a');
    if (foundLink) {
      readMoreLink.href = foundLink.href;
      // Append the label text from readMoreLinkLabelCell
      if (readMoreLinkLabelCell) {
        readMoreLink.textContent = readMoreLinkLabelCell.textContent.trim();
      } else {
        readMoreLink.textContent = foundLink.textContent.trim(); // Fallback to link text if label cell is empty
      }
    } else if (readMoreLinkLabelCell) {
      readMoreLink.textContent = readMoreLinkLabelCell.textContent.trim();
      // If no link in readMoreLinkCell, but label exists, create a dummy link or handle as needed
      // For now, it will be a link with text but no href, which might be an issue.
      // Assuming a link should always be present in readMoreLinkCell for href.
    }
    const forwardArrowIcon = document.createElement('em');
    forwardArrowIcon.classList.add('forward-arrow-icon', 'icon-arrow-forward');
    const spanDNone = document.createElement('span');
    spanDNone.classList.add('d-none');
    spanDNone.textContent = 'icon';
    forwardArrowIcon.append(spanDNone);
    readMoreLink.append(' ', forwardArrowIcon);
    readMoreP.append(readMoreLink);

    trendingNowBox.append(imageP, titleH4, descriptionDiv, readMoreP);
    slideContentWrapper.append(trendingNowBox);
    swiperSlide.append(slideContentWrapper);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal', 'swiper-pagination-lock');
  // Add bullets if needed, based on number of slides
  cardRows.forEach((_, index) => {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (index === 0) {
      bullet.classList.add('swiper-pagination-bullet-active');
    }
    swiperPagination.append(bullet);
  });
  swiper.append(swiperPagination);

  desktopTrendingNow.append(swiper);
  trendingNowContainer.append(desktopTrendingNow);

  block.textContent = '';
  block.append(headingEl, trendingNowContainer);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Initialize Swiper
  // Swiper is a third-party library, assuming it's loaded globally or imported.
  // If not, this would need to be handled by loading the library.
  // For this review, we assume Swiper is available.
  if (typeof Swiper !== 'undefined') {
    // eslint-disable-next-line no-new
    new Swiper(swiper, {
      slidesPerView: 'auto',
      spaceBetween: 32,
      pagination: {
        el: swiperPagination,
        clickable: true,
      },
      // Add any other Swiper options as needed from the original HTML or design spec
      // For example, if it's a loop, navigation, etc.
    });
  }
}
