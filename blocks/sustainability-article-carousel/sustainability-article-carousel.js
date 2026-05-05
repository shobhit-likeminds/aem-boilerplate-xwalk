import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [carouselTitleRow, ...articleRows] = [...block.children];

  const section = document.createElement('section');
  // Removed 'sustainability-article-carousel' as the outer block div already has it.
  section.classList.add('grid-container', 'bg--paper-green', 'animate-enter', 'in-view');

  const maxWidthContainer = document.createElement('div');
  maxWidthContainer.classList.add('max-width-container');
  section.append(maxWidthContainer);

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x');
  maxWidthContainer.append(gridX);

  const cell = document.createElement('div');
  cell.classList.add('cell', 'small-12', 'large-10', 'large-offset-1', 'xlarge-8', 'xlarge-offset-2');
  gridX.append(cell);

  const textSection = document.createElement('div');
  textSection.classList.add('sustainability-article-carousel__text-section');
  cell.append(textSection);

  const title = document.createElement('h2');
  title.classList.add('sustainability-article-carousel__title', 'animate-enter-fade-up-short');
  moveInstrumentation(carouselTitleRow, title);
  title.textContent = carouselTitleRow.children[0]?.textContent.trim();
  textSection.append(title);

  const gridXWrapper = document.createElement('div');
  gridXWrapper.classList.add('grid-x');
  section.append(gridXWrapper);

  const carouselWrapperCell = document.createElement('div');
  carouselWrapperCell.classList.add('cell', 'small-12', 'large-offset-1', 'large-11', 'sustainability-article-carousel__wrapper');
  gridXWrapper.append(carouselWrapperCell);

  const swiperEl = document.createElement('div');
  // Removed swiper-initialized, swiper-horizontal, swiper-backface-hidden as Swiper.js adds them.
  swiperEl.classList.add('swiper', 'swipper--full-view-padding', 'sustainability-article-carousel__wrapper--inner');
  carouselWrapperCell.append(swiperEl);

  const prevBtnControl = document.createElement('div');
  prevBtnControl.classList.add('sustainability-article-carousel__btn-control', 'sustainability-article-carousel--prev', 'show-for-large');
  swiperEl.append(prevBtnControl);

  const prevBtn = document.createElement('button');
  // Removed swiper-button-disabled, swiper-button-lock as Swiper.js manages these.
  prevBtn.classList.add('swiper-control', 'swiper-button', 'swiper--prev', 'elevation-1');
  prevBtn.innerHTML = `
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L17 7M1 7L6.33333 2M1 7L6.33333 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  prevBtnControl.append(prevBtn);

  const nextBtnControl = document.createElement('div');
  nextBtnControl.classList.add('sustainability-article-carousel__btn-control', 'sustainability-article-carousel--next', 'show-for-large');
  swiperEl.append(nextBtnControl);

  const nextBtn = document.createElement('button');
  // Removed swiper-button-disabled, swiper-button-lock as Swiper.js manages these.
  nextBtn.classList.add('swiper-control', 'swiper-button', 'swiper--next', 'elevation-1');
  nextBtn.innerHTML = `
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7L1 7M17 7L11.6667 2M17 7L11.6667 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  nextBtnControl.append(nextBtn);

  const swiperWrapper = document.createElement('ul');
  swiperWrapper.classList.add('swiper-wrapper', 'sustainability-article-carousel__list');
  swiperEl.append(swiperWrapper);

  articleRows.forEach((row) => {
    const [tagLabelCell, imageDesktopCell, imageMobileCell, titleCell, descriptionCell, readingDurationCell, articleLinkCell] = [...row.children];

    const listItem = document.createElement('li');
    // Removed swiper-slide-active as Swiper.js manages this.
    listItem.classList.add('swiper-slide', 'sustainability-article-carousel__list-item', 'animate-enter-fade-left-short', 'animate-delay-1');
    moveInstrumentation(row, listItem);

    const anchor = document.createElement('a');
    anchor.classList.add('sustainability-card', 'elevation-2', 'has-hover');
    anchor.href = articleLinkCell.querySelector('a')?.href || '#';
    listItem.append(anchor);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('sustainability-card__img-container', 'animate-enter-fade', 'animate-delay-5');
    anchor.append(imgContainer);

    const tagDiv = document.createElement('div');
    tagDiv.classList.add('sustainability-card__tag');
    imgContainer.append(tagDiv);

    const tag = document.createElement('div');
    tag.classList.add('tag', 'bg--brand-green');
    tagDiv.append(tag);

    const tagLabel = document.createElement('span');
    tagLabel.classList.add('tag__label');
    tagLabel.textContent = tagLabelCell.textContent.trim();
    tag.append(tagLabel);

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureMobile = imageMobileCell.querySelector('picture');

    if (pictureDesktop && pictureMobile) {
      const imgDesktop = pictureDesktop.querySelector('img');
      const imgMobile = pictureMobile.querySelector('img');

      const optimizedPicture = createOptimizedPicture(
        imgDesktop.src,
        imgDesktop.alt,
        false,
        [
          { media: '(min-width: 768px)', width: '750' },
          { width: '750' },
        ],
      );

      // Replace the default img with the mobile image source for smaller screens
      const sources = optimizedPicture.querySelectorAll('source');
      if (sources.length > 0 && imgMobile) {
        sources[sources.length - 1].media = '(max-width: 767px)';
        sources[sources.length - 1].srcset = imgMobile.src;
      }
      imgContainer.append(optimizedPicture);
    } else if (pictureDesktop) {
      const imgDesktop = pictureDesktop.querySelector('img');
      const optimizedPicture = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '750' }]);
      imgContainer.append(optimizedPicture);
    } else if (pictureMobile) {
      const imgMobile = pictureMobile.querySelector('img');
      const optimizedPicture = createOptimizedPicture(imgMobile.src, imgMobile.alt, false, [{ width: '750' }]);
      imgContainer.append(optimizedPicture);
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('sustainability-card__content');
    anchor.append(contentDiv);

    const innerContentDiv = document.createElement('div');
    contentDiv.append(innerContentDiv);

    const articleTitleDiv = document.createElement('div');
    articleTitleDiv.classList.add('sustainability-card__title', 'animate-enter-fade-up-short', 'animate-delay-7');
    innerContentDiv.append(articleTitleDiv);

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('labelLargeBold');
    titleSpan.textContent = titleCell.textContent.trim();
    articleTitleDiv.append(titleSpan);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('sustainability-card__description', 'animate-enter-fade-up-short', 'animate-delay-9');
    innerContentDiv.append(descriptionDiv);

    const descriptionInnerDiv = document.createElement('div');
    descriptionInnerDiv.classList.add('bodyMediumRegular');
    descriptionInnerDiv.innerHTML = descriptionCell.innerHTML;
    descriptionDiv.append(descriptionInnerDiv);

    const signInTooltip = document.createElement('div');
    signInTooltip.classList.add('signIn-Info-Tooltip', 'animate-enter-fade-up-short', 'animate-delay-9');
    contentDiv.append(signInTooltip);

    const readingDurationDiv = document.createElement('div');
    readingDurationDiv.classList.add('sustainability-card__reading-duration');
    contentDiv.append(readingDurationDiv);

    const durationSpan = document.createElement('span');
    durationSpan.classList.add('labelSmallBold', 'animate-enter-fade-up-short', 'animate-delay-11');
    durationSpan.textContent = readingDurationCell.textContent.trim();
    readingDurationDiv.append(durationSpan);

    const suffixSpan = document.createElement('span');
    suffixSpan.classList.add('utilityTagHighCaps', 'text-uppercase', 'sustainability-card__reading-duration-suffix', 'animate-enter-fade-up-short', 'animate-delay-13');
    suffixSpan.textContent = 'mins';
    readingDurationDiv.append(suffixSpan);

    swiperWrapper.append(listItem);
  });

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('sustainability-article-carousel__pagination', 'animate-enter-fade-left-short', 'animate-delay-3');
  swiperEl.append(paginationDiv);

  const swiperPagination = document.createElement('div');
  // Removed swiper-pagination-clickable, swiper-pagination-bullets, swiper-pagination-horizontal as Swiper.js adds these.
  swiperPagination.classList.add('swiper-pagination');
  paginationDiv.append(swiperPagination);

  block.replaceChildren(section);

  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 32, // Based on original HTML margin-right: 32px
    loop: false, // Original HTML does not have data-loop="true"
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: swiperPagination,
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
  });
}
