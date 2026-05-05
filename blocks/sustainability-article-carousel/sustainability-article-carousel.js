import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [headlineRow, ...articleRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('sustainability-article-carousel', 'grid-container', 'bg--paper-green', 'animate-enter', 'in-view');

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

  const headline = document.createElement('h2');
  headline.classList.add('sustainability-article-carousel__title', 'animate-enter-fade-up-short');
  moveInstrumentation(headlineRow, headline);
  headline.textContent = headlineRow.children[0]?.textContent.trim() || '';
  textSection.append(headline);

  const gridXWrapper = document.createElement('div');
  gridXWrapper.classList.add('grid-x');
  section.append(gridXWrapper);

  const carouselWrapperCell = document.createElement('div');
  carouselWrapperCell.classList.add('cell', 'small-12', 'large-offset-1', 'large-11', 'sustainability-article-carousel__wrapper');
  gridXWrapper.append(carouselWrapperCell);

  const swiperEl = document.createElement('div');
  // Removed 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden' as Swiper.js adds them automatically
  swiperEl.classList.add('swiper', 'swipper--full-view-padding', 'sustainability-article-carousel__wrapper--inner');
  carouselWrapperCell.append(swiperEl);

  const prevBtnControl = document.createElement('div');
  prevBtnControl.classList.add('sustainability-article-carousel__btn-control', 'sustainability-article-carousel--prev', 'show-for-large');
  swiperEl.append(prevBtnControl);

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('swiper-control', 'swiper-button', 'swiper--prev', 'elevation-1');
  prevBtn.setAttribute('aria-label', 'Previous slide');
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
  nextBtn.classList.add('swiper-control', 'swiper-button', 'swiper--next', 'elevation-1');
  nextBtn.setAttribute('aria-label', 'Next slide');
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
    const [tagCell, imageCell, linkCell, titleCell, descriptionCell, readingDurationCell, readingDurationSuffixCell] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('swiper-slide', 'sustainability-article-carousel__list-item', 'animate-enter-fade-left-short', 'animate-delay-1');
    moveInstrumentation(row, listItem);

    const cardLink = document.createElement('a');
    cardLink.classList.add('sustainability-card', 'elevation-2', 'has-hover');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.setAttribute('aria-label', titleCell?.textContent.trim() || '');
    }
    listItem.append(cardLink);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('sustainability-card__img-container', 'animate-enter-fade', 'animate-delay-5');
    cardLink.append(imgContainer);

    const tagDiv = document.createElement('div');
    tagDiv.classList.add('sustainability-card__tag');
    imgContainer.append(tagDiv);

    const tagInner = document.createElement('div');
    tagInner.classList.add('tag', 'bg--brand-green');
    tagDiv.append(tagInner);

    const tagLabel = document.createElement('span');
    tagLabel.classList.add('tag__label');
    tagLabel.textContent = tagCell?.textContent.trim() || '';
    tagInner.append(tagLabel);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imgContainer.append(optimizedPic);
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('sustainability-card__content');
    cardLink.append(contentDiv);

    const contentInnerDiv = document.createElement('div');
    contentDiv.append(contentInnerDiv);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('sustainability-card__title', 'animate-enter-fade-up-short', 'animate-delay-7');
    contentInnerDiv.append(titleDiv);

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('labelLargeBold');
    titleSpan.innerHTML = titleCell?.textContent.trim() || '';
    titleDiv.append(titleSpan);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('sustainability-card__description', 'animate-enter-fade-up-short', 'animate-delay-9');
    contentInnerDiv.append(descriptionDiv);

    const bodyMediumRegular = document.createElement('div');
    bodyMediumRegular.classList.add('bodyMediumRegular');
    bodyMediumRegular.innerHTML = descriptionCell?.innerHTML || '';
    descriptionDiv.append(bodyMediumRegular);

    const signInTooltip = document.createElement('div');
    signInTooltip.classList.add('signIn-Info-Tooltip', 'animate-enter-fade-up-short', 'animate-delay-9');
    contentDiv.append(signInTooltip);

    const readingDurationDiv = document.createElement('div');
    readingDurationDiv.classList.add('sustainability-card__reading-duration');
    contentDiv.append(readingDurationDiv);

    const durationSpan = document.createElement('span');
    durationSpan.classList.add('labelSmallBold', 'animate-enter-fade-up-short', 'animate-delay-11');
    durationSpan.textContent = readingDurationCell?.textContent.trim() || '';
    readingDurationDiv.append(durationSpan);

    const suffixSpan = document.createElement('span');
    suffixSpan.classList.add('utilityTagHighCaps', 'text-uppercase', 'sustainability-card__reading-duration-suffix', 'animate-enter-fade-up-short', 'animate-delay-13');
    suffixSpan.textContent = readingDurationSuffixCell?.textContent.trim() || '';
    readingDurationDiv.append(suffixSpan);

    swiperWrapper.append(listItem);
  });

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('sustainability-article-carousel__pagination', 'animate-enter-fade-left-short', 'animate-delay-3');
  swiperEl.append(paginationDiv);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  paginationDiv.append(swiperPagination);

  block.replaceChildren(section);

  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 32,
    loop: false,
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
        slidesPerView: 1.2,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2.2,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3.2,
        spaceBetween: 32,
      },
      1440: {
        slidesPerView: 3.2,
        spaceBetween: 32,
      },
    },
  });
}
