import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  const trendingNowContainer = document.createElement('div');
  trendingNowContainer.classList.add('trendingnow-container');

  const desktopTrendingNow = document.createElement('div');
  desktopTrendingNow.classList.add('desktop-trending-now');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('trending-heading');
      moveInstrumentation(headingCell, h2);
      h2.textContent = headingCell.textContent.trim();
      block.prepend(h2);
    }
  }

  itemRows.forEach((row, index) => {
    const cells = [...row.children];
    // Use content detection instead of index access
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && !cell.querySelector('a'));
    const descriptionCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim() !== '' && cell.querySelector('a').href);
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim() !== '' && !cell.querySelector('a').href);


    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'trending-swiperslide');
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-active');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-next');
    }
    moveInstrumentation(row, swiperSlide);

    const slideContentWrapper = document.createElement('div');
    swiperSlide.append(slideContentWrapper);

    const trendingNowBox = document.createElement('div');
    trendingNowBox.classList.add('trendingnow-box', `type-${index + 1}`);
    slideContentWrapper.append(trendingNowBox);

    // Image
    if (imageCell) {
      const p = document.createElement('p');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          p.append(optimizedPic);
        }
      }
      trendingNowBox.append(p);
    }

    // Title
    if (titleCell) {
      const h4 = document.createElement('h4');
      h4.classList.add('trendingnow-box-title');
      moveInstrumentation(titleCell, h4);
      h4.innerHTML = titleCell.innerHTML; // Use innerHTML to preserve strong tags
      trendingNowBox.append(h4);
    }

    // Description
    if (descriptionCell) {
      const divDesc = document.createElement('div');
      divDesc.classList.add('p2', 'trendingnow-box-desc');
      moveInstrumentation(descriptionCell, divDesc);
      while (descriptionCell.firstChild) {
        divDesc.append(descriptionCell.firstChild);
      }
      trendingNowBox.append(divDesc);
    }

    // CTA Link
    if (ctaLinkCell || ctaLinkLabelCell) {
      const p = document.createElement('p');
      const link = document.createElement('a');
      link.classList.add('read-more');

      const foundLink = ctaLinkCell?.querySelector('a'); // Use optional chaining
      if (foundLink) {
        link.href = foundLink.href;
      }
      link.textContent = ctaLinkLabelCell?.textContent.trim() || 'Know More'; // Default text if label is missing

      const em = document.createElement('em');
      em.classList.add('forward-arrow-icon', 'icon-arrow-forward');
      const span = document.createElement('span');
      span.classList.add('d-none');
      span.textContent = 'icon';
      em.append(span);
      link.append(' ', em);
      if (ctaLinkCell) moveInstrumentation(ctaLinkCell, link);
      if (ctaLinkLabelCell) moveInstrumentation(ctaLinkLabelCell, link);
      p.append(link);
      trendingNowBox.append(p);
    }

    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal', 'swiper-pagination-lock');
  swiper.append(swiperPagination);

  desktopTrendingNow.append(swiper);
  trendingNowContainer.append(desktopTrendingNow);

  block.textContent = '';
  block.classList.add('trending-now-template', 'section-background-area2'); // Add block-level classes
  block.append(trendingNowContainer);

  // Initialize Swiper
  import('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js').then((module) => {
    const Swiper = module.default;
    // eslint-disable-next-line no-new
    new Swiper(swiper, {
      slidesPerView: 'auto',
      spaceBetween: 32,
      pagination: {
        el: swiperPagination,
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 32,
        },
      },
    });
  });
}
