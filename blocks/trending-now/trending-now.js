import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import Swiper from '../../scripts/swiper-bundle.min.js';

export default function decorate(block) {
  block.classList.add('trending-now-template', 'section-background-area2');
  block.id = 'trendingnow';

  const [headingRow, ...itemRows] = [...block.children];

  // Heading
  const headingEl = document.createElement('h2');
  moveInstrumentation(headingRow, headingEl);
  headingEl.classList.add('trending-heading');
  headingEl.textContent = headingRow.firstElementChild.textContent.trim();

  // Trending Items Container
  const trendingContainer = document.createElement('div');
  trendingContainer.classList.add('trendingnow-container');

  const desktopTrendingNow = document.createElement('div');
  desktopTrendingNow.classList.add('desktop-trending-now');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  itemRows.forEach((row, index) => {
    // Use content detection instead of direct index access
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !imageCell || (cell !== imageCell && cell.querySelector('strong')));
    const descriptionCell = cells.find(cell => cell.querySelector('p') && cell !== imageCell && cell !== titleCell);
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('http')); // CTA Link has a real href
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && !cell.querySelector('a').href.includes('http')); // CTA Label might just be text or a dummy link

    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
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
    if (imageCell) {
      const imageWrapper = document.createElement('p');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageWrapper.append(optimizedPic);
        }
      }
      trendingNowBox.append(imageWrapper);
    }

    // Title
    if (titleCell) {
      const titleEl = document.createElement('h4');
      titleEl.classList.add('trendingnow-box-title');
      const strongTitle = document.createElement('strong');
      strongTitle.textContent = titleCell.textContent.trim();
      titleEl.append(strongTitle);
      trendingNowBox.append(titleEl);
    }

    // Description
    if (descriptionCell) {
      const descriptionEl = document.createElement('div');
      descriptionEl.classList.add('p2', 'trendingnow-box-desc');
      moveInstrumentation(descriptionCell, descriptionEl);
      while (descriptionCell.firstChild) {
        descriptionEl.append(descriptionCell.firstChild);
      }
      trendingNowBox.append(descriptionEl);
    }

    // CTA Link
    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLinkWrapper = document.createElement('p');
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('read-more');
      const originalCtaLink = ctaLinkCell.querySelector('a');
      if (originalCtaLink) {
        ctaLink.href = originalCtaLink.href;
      }
      const ctaLabelText = ctaLinkLabelCell.textContent.trim();
      ctaLink.textContent = ctaLabelText;

      const arrowIcon = document.createElement('em');
      arrowIcon.classList.add('forward-arrow-icon', 'icon-arrow-forward');
      const span = document.createElement('span');
      span.classList.add('d-none');
      span.textContent = 'icon';
      arrowIcon.append(span);
      ctaLink.append(' '); // Add a space between text and icon
      ctaLink.append(arrowIcon);

      moveInstrumentation(ctaLinkCell, ctaLink);
      moveInstrumentation(ctaLinkLabelCell, ctaLink);
      ctaLinkWrapper.append(ctaLink);
      trendingNowBox.append(ctaLinkWrapper);
    }

    slideContentWrapper.append(trendingNowBox);
    swiperSlide.append(slideContentWrapper);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal', 'swiper-pagination-lock');
  // The bullet is dynamically added by Swiper, no need to pre-add one
  // const bullet = document.createElement('span');
  // bullet.classList.add('swiper-pagination-bullet', 'swiper-pagination-bullet-active');
  // swiperPagination.append(bullet);
  swiper.append(swiperPagination);

  desktopTrendingNow.append(swiper);
  trendingContainer.append(desktopTrendingNow);

  block.textContent = '';
  block.append(headingEl, trendingContainer);

  // Initialize Swiper
  // Swiper is an interactive element, so it needs initialization here.
  // The classes 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden'
  // are added by Swiper itself, so we don't need to add them initially.
  // The original HTML had them, but for a dynamic Swiper, they are runtime classes.
  // We'll remove them from the initial `swiper.classList.add` call.
  const swiperInstance = new Swiper(swiper, {
    slidesPerView: 'auto',
    spaceBetween: 32,
    pagination: {
      el: swiperPagination,
      clickable: true,
    },
    // Add any other Swiper options based on desired behavior
    // For example, if it's a loop, or has navigation arrows
  });
}
