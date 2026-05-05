import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const [
    backgroundImageRow,
    titleRow,
    descriptionRow,
    ...itemRows
  ] = children;

  const root = document.createElement('section');
  root.classList.add('campaign-carousel', 'grid-container', 'bg--paper-white');
  moveInstrumentation(block, root);

  // Background Image
  const parallaxBg = document.createElement('div');
  parallaxBg.classList.add('parallax-bg', 'js-parallax-bg', 'lazyLoadedImage');
  const bgPicture = backgroundImageRow.querySelector('picture');
  if (bgPicture) {
    const img = bgPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
    parallaxBg.style.backgroundImage = `url(${optimizedPic.querySelector('img').src})`;
    moveInstrumentation(backgroundImageRow, parallaxBg);
  }
  root.append(parallaxBg);

  const contentWrapper = document.createElement('div');
  root.append(contentWrapper);

  const headerGrid = document.createElement('div');
  headerGrid.classList.add('grid-x', 'campaign-carousel__header-grid');
  contentWrapper.append(headerGrid);

  const emptyCell1 = document.createElement('div');
  emptyCell1.classList.add('cell', 'large-2', 'xlarge-3');
  headerGrid.append(emptyCell1);

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('cell', 'small-12', 'large-8', 'xlarge-6', 'campaign-carousel__header-wrapper');
  headerGrid.append(headerWrapper);

  // Title
  const title = document.createElement('h2');
  title.classList.add('campaign-carousel__title');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  headerWrapper.append(title);

  // Description
  const description = document.createElement('div');
  description.classList.add('campaign-carousel__description', 'bodyMediumRegular');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.children[0]?.innerHTML || '';
  headerWrapper.append(description);

  const emptyCell2 = document.createElement('div');
  emptyCell2.classList.add('cell', 'large-2', 'xlarge-3');
  headerGrid.append(emptyCell2);

  // Swiper container
  const swiperEl = document.createElement('div');
  swiperEl.classList.add('swiper', 'campaign-carousel__swiper');
  contentWrapper.append(swiperEl);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'campaign-carousel__swiper-wrapper');
  swiperEl.append(swiperWrapper);

  const quotationSlides = itemRows.filter((row) => row.children.length === 3);
  const recipeCardSlides = itemRows.filter((row) => row.children.length === 9);
  const factCardSlides = itemRows.filter((row) => row.children.length === 5);

  quotationSlides.forEach((row) => {
    const [quoteTextCell, authorCell, bgImageCell] = [...row.children];
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'campaign-carousel__swiper__quotation-slide');
    moveInstrumentation(row, slide);

    const campaignQuotation = document.createElement('div');
    campaignQuotation.classList.add('campaign-quotation');
    slide.append(campaignQuotation);

    const blockquote = document.createElement('blockquote');
    blockquote.classList.add('campaign-quotation__text', 'headline-h4');
    blockquote.innerHTML = quoteTextCell.innerHTML;
    campaignQuotation.append(blockquote);

    const quoteIconWrapper = document.createElement('span');
    quoteIconWrapper.classList.add('campaign-quotation__quote-icon-wrapper');
    const quoteIcon = document.createElement('i');
    quoteIcon.classList.add('icon', 'quote-start-brown');
    quoteIconWrapper.append(quoteIcon);
    blockquote.append(quoteIconWrapper);

    const authorLocationWrapper = document.createElement('div');
    authorLocationWrapper.classList.add('campaign-quotation__author-and-location-wrapper');
    campaignQuotation.append(authorLocationWrapper);

    const author = document.createElement('div');
    author.classList.add('labelSmallBold', 'campaign-quotation__author');
    author.textContent = authorCell.textContent.trim();
    authorLocationWrapper.append(author);

    const bgImageWrapper = document.createElement('div');
    bgImageWrapper.classList.add('campaign-quotation__background-image-wrapper');
    campaignQuotation.append(bgImageWrapper);
    const picture = bgImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '794' }]);
      moveInstrumentation(bgImageCell, optimizedPic.querySelector('img'));
      bgImageWrapper.append(optimizedPic);
    }
    swiperWrapper.append(slide);
  });

  recipeCardSlides.forEach((row) => {
    const [
      cardLinkCell,
      imageCell,
      tagLabelCell,
      recipeNameCell,
      descriptionCell,
      stepsCountCell,
      stepsLabelCell,
      ingredientsCountCell,
      ingredientsLabelCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'campaign-carousel__swiper__recipe-card-slide');
    moveInstrumentation(row, slide);

    const cardLink = document.createElement('a');
    cardLink.classList.add('campaign-recipe-card', 'elevation-4');
    cardLink.href = cardLinkCell.querySelector('a')?.href || '#';
    cardLink.setAttribute('aria-label', `${recipeNameCell.textContent.trim()} - Read More`);
    slide.append(cardLink);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('campaign-recipe-card__img-container');
    cardLink.append(imgContainer);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '566' }]);
      moveInstrumentation(imageCell, optimizedPic.querySelector('img'));
      imgContainer.append(optimizedPic);
    }

    const details = document.createElement('div');
    details.classList.add('campaign-recipe-card__details');
    cardLink.append(details);

    const tag = document.createElement('div');
    tag.classList.add('campaign-recipe-card__tag');
    details.append(tag);

    const tagDiv = document.createElement('div');
    tagDiv.classList.add('tag', 'bg--brand-green');
    tag.append(tagDiv);

    const tagLabel = document.createElement('span');
    tagLabel.classList.add('tag__label');
    tagLabel.textContent = tagLabelCell.textContent.trim();
    tagDiv.append(tagLabel);

    const recipeName = document.createElement('div');
    recipeName.classList.add('labelLargeBold', 'campaign-recipe-card__name');
    recipeName.textContent = recipeNameCell.textContent.trim();
    details.append(recipeName);

    const descriptionText = document.createElement('div');
    descriptionText.classList.add('bodySmallRegular', 'campaign-recipe-card__description');
    descriptionText.textContent = descriptionCell.textContent.trim();
    details.append(descriptionText);

    const stepsAndIngredients = document.createElement('div');
    stepsAndIngredients.classList.add('campaign-recipe-card__steps-and-ingredients');
    details.append(stepsAndIngredients);

    const stepsContainer = document.createElement('div');
    stepsContainer.classList.add('campaign-recipe-card__steps-container');
    stepsAndIngredients.append(stepsContainer);

    const stepsCount = document.createElement('span');
    stepsCount.classList.add('labelSmallBold', 'campaign-recipe-card__steps-count');
    stepsCount.textContent = stepsCountCell.textContent.trim();
    stepsContainer.append(stepsCount);

    const stepsLabel = document.createElement('span');
    stepsLabel.classList.add('utilityTagHighCaps', 'campaign-recipe-card__steps-label');
    stepsLabel.textContent = stepsLabelCell.textContent.trim();
    stepsContainer.append(stepsLabel);

    const separator = document.createElement('div');
    separator.classList.add('campaign-recipe-card__steps-separator');
    stepsAndIngredients.append(separator);

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('campaign-recipe-card__ingredients-container');
    stepsAndIngredients.append(ingredientsContainer);

    const ingredientsCount = document.createElement('span');
    ingredientsCount.classList.add('labelSmallBold', 'campaign-recipe-card__ingredients-count');
    ingredientsCount.textContent = ingredientsCountCell.textContent.trim();
    ingredientsContainer.append(ingredientsCount);

    const ingredientsLabel = document.createElement('span');
    ingredientsLabel.classList.add('utilityTagHighCaps', 'campaign-recipe-card__ingredients-label');
    ingredientsLabel.textContent = ingredientsLabelCell.textContent.trim();
    ingredientsContainer.append(ingredientsLabel);

    swiperWrapper.append(slide);
  });

  factCardSlides.forEach((row) => {
    const [imageCell, factNameCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'campaign-carousel__swiper__fact-card-slide');
    moveInstrumentation(row, slide);

    const factCard = document.createElement('div');
    factCard.classList.add('campaign-fact-card', 'campaign-fact', 'elevation-4', 'bg--paper-green');
    slide.append(factCard);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('campaign-fact-card__img-container');
    factCard.append(imgContainer);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '630' }]);
      moveInstrumentation(imageCell, optimizedPic.querySelector('img'));
      imgContainer.append(optimizedPic);
    }

    const details = document.createElement('div');
    details.classList.add('campaign-fact-card__details');
    factCard.append(details);

    const factName = document.createElement('div');
    factName.classList.add('campaign-fact-card__name', 'utilityScriptLarge');
    factName.textContent = factNameCell.textContent.trim();
    details.append(factName);

    const descriptionText = document.createElement('div');
    descriptionText.classList.add('bodyMediumRegular', 'campaign-fact-card__description');
    descriptionText.innerHTML = descriptionCell.innerHTML;
    details.append(descriptionText);

    const cta = document.createElement('div');
    cta.classList.add('campaign-fact-card__cta');
    details.append(cta);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('link', 'link-auto', 'labelSmallBold');
    ctaLink.href = ctaLinkCell.querySelector('a')?.href || '#';
    ctaLink.setAttribute('title', ctaLabelCell.textContent.trim());
    ctaLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());
    ctaLink.setAttribute('rel', 'follow');
    cta.append(ctaLink);

    const ctaText = document.createElement('span');
    ctaText.classList.add('button-text');
    ctaText.textContent = ctaLabelCell.textContent.trim();
    ctaLink.append(ctaText);

    swiperWrapper.append(slide);
  });

  const prevBtnControl = document.createElement('div');
  prevBtnControl.classList.add('campaign-carousel__btn-control', 'campaign-carousel--prev', 'show-for-large');
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
  nextBtnControl.classList.add('campaign-carousel__btn-control', 'campaign-carousel--next', 'show-for-large');
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

  const paginationEl = document.createElement('div');
  paginationEl.classList.add('swiper-pagination', 'campaign-carousel__swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiperEl.append(paginationEl);

  block.replaceChildren(root);

  // Initialize Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: false,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 1.2 },
      768: { slidesPerView: 2.2 },
      992: { slidesPerView: 3.2 },
      1200: { slidesPerView: 3.2 },
      1440: { slidesPerView: 3.2 },
    },
  });

  root.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
