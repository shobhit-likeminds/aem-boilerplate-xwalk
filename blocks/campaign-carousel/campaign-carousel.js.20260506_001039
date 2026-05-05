import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const [
    backgroundImageRow,
    titleRow,
    descriptionRow,
    ...slideRows
  ] = children;

  const section = document.createElement('section');
  section.classList.add('campaign-carousel', 'grid-container', 'bg--paper-white');

  // Background Image
  const parallaxBg = document.createElement('div');
  parallaxBg.classList.add('parallax-bg', 'js-parallax-bg', 'lazyLoadedImage');
  const bgPicture = backgroundImageRow.querySelector('picture');
  if (bgPicture) {
    const img = bgPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    parallaxBg.style.backgroundImage = `url(${optimizedPic.querySelector('img').src})`;
  }
  moveInstrumentation(backgroundImageRow, parallaxBg);
  section.append(parallaxBg);

  const contentWrapper = document.createElement('div');
  const headerGrid = document.createElement('div');
  headerGrid.classList.add('grid-x', 'campaign-carousel__header-grid');

  const emptyCell1 = document.createElement('div');
  emptyCell1.classList.add('cell', 'large-2', 'xlarge-3');
  headerGrid.append(emptyCell1);

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('cell', 'small-12', 'large-8', 'xlarge-6', 'campaign-carousel__header-wrapper');

  // Title
  const title = document.createElement('h2');
  title.classList.add('campaign-carousel__title');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.children[0]?.textContent.trim() || '';
  headerWrapper.append(title);

  // Description
  const description = document.createElement('div');
  description.classList.add('campaign-carousel__description', 'bodyMediumRegular');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.children[0]?.innerHTML || '';
  headerWrapper.append(description);

  headerGrid.append(headerWrapper);

  const emptyCell2 = document.createElement('div');
  emptyCell2.classList.add('cell', 'large-2', 'xlarge-3');
  headerGrid.append(emptyCell2);

  contentWrapper.append(headerGrid);

  // Swiper Container
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'campaign-carousel__swiper');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'campaign-carousel__swiper-wrapper');

  const quotationSlides = slideRows.filter((row) => row.children.length === 3);
  const recipeCardSlides = slideRows.filter((row) => row.children.length === 9);
  const factCardSlides = slideRows.filter((row) => row.children.length === 5);

  quotationSlides.forEach((row) => {
    const [quoteCell, authorCell, bgImageCell] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'campaign-carousel__swiper__quotation-slide');
    moveInstrumentation(row, slide);

    const campaignQuotation = document.createElement('div');
    campaignQuotation.classList.add('campaign-quotation');

    const blockquote = document.createElement('blockquote');
    blockquote.classList.add('campaign-quotation__text', 'headline-h4');
    blockquote.innerHTML = quoteCell.innerHTML;

    const quoteIconWrapper = document.createElement('span');
    quoteIconWrapper.classList.add('campaign-quotation__quote-icon-wrapper');
    quoteIconWrapper.innerHTML = '<i class="icon quote-start-brown"></i>';
    blockquote.append(quoteIconWrapper);
    campaignQuotation.append(blockquote);

    const authorLocationWrapper = document.createElement('div');
    authorLocationWrapper.classList.add('campaign-quotation__author-and-location-wrapper');

    const author = document.createElement('div');
    author.classList.add('labelSmallBold', 'campaign-quotation__author');
    author.textContent = authorCell.textContent.trim();
    authorLocationWrapper.append(author);
    campaignQuotation.append(authorLocationWrapper);

    const bgImageWrapper = document.createElement('div');
    bgImageWrapper.classList.add('campaign-quotation__background-image-wrapper');
    const picture = bgImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '794' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      bgImageWrapper.append(optimizedPic);
    }
    campaignQuotation.append(bgImageWrapper);
    slide.append(campaignQuotation);
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
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.setAttribute('aria-label', `${recipeNameCell.textContent.trim()} - Read More`);
    }

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('campaign-recipe-card__img-container');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '566' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imgContainer.append(optimizedPic);
    }
    cardLink.append(imgContainer);

    const details = document.createElement('div');
    details.classList.add('campaign-recipe-card__details');

    const tagDiv = document.createElement('div');
    tagDiv.classList.add('campaign-recipe-card__tag');
    const tag = document.createElement('div');
    tag.classList.add('tag', 'bg--brand-green');
    const tagLabel = document.createElement('span');
    tagLabel.classList.add('tag__label');
    tagLabel.textContent = tagLabelCell.textContent.trim();
    tag.append(tagLabel);
    tagDiv.append(tag);
    details.append(tagDiv);

    const recipeName = document.createElement('div');
    recipeName.classList.add('labelLargeBold', 'campaign-recipe-card__name');
    recipeName.textContent = recipeNameCell.textContent.trim();
    details.append(recipeName);

    const description = document.createElement('div');
    description.classList.add('bodySmallRegular', 'campaign-recipe-card__description');
    description.textContent = descriptionCell.textContent.trim();
    details.append(description);

    const stepsAndIngredients = document.createElement('div');
    stepsAndIngredients.classList.add('campaign-recipe-card__steps-and-ingredients');

    const stepsContainer = document.createElement('div');
    stepsContainer.classList.add('campaign-recipe-card__steps-container');
    const stepsCount = document.createElement('span');
    stepsCount.classList.add('labelSmallBold', 'campaign-recipe-card__steps-count');
    stepsCount.textContent = stepsCountCell.textContent.trim();
    const stepsLabel = document.createElement('span');
    stepsLabel.classList.add('utilityTagHighCaps', 'campaign-recipe-card__steps-label');
    stepsLabel.textContent = stepsLabelCell.textContent.trim();
    stepsContainer.append(stepsCount, stepsLabel);
    stepsAndIngredients.append(stepsContainer);

    const separator = document.createElement('div');
    separator.classList.add('campaign-recipe-card__steps-separator');
    stepsAndIngredients.append(separator);

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('campaign-recipe-card__ingredients-container');
    const ingredientsCount = document.createElement('span');
    ingredientsCount.classList.add('labelSmallBold', 'campaign-recipe-card__ingredients-count');
    ingredientsCount.textContent = ingredientsCountCell.textContent.trim();
    const ingredientsLabel = document.createElement('span');
    ingredientsLabel.classList.add('utilityTagHighCaps', 'campaign-recipe-card__ingredients-label');
    ingredientsLabel.textContent = ingredientsLabelCell.textContent.trim();
    ingredientsContainer.append(ingredientsCount, ingredientsLabel);
    stepsAndIngredients.append(ingredientsContainer);

    details.append(stepsAndIngredients);
    cardLink.append(details);
    slide.append(cardLink);
    swiperWrapper.append(slide);
  });

  factCardSlides.forEach((row) => {
    const [imageCell, factTitleCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'campaign-carousel__swiper__fact-card-slide');
    moveInstrumentation(row, slide);

    const factCard = document.createElement('div');
    factCard.classList.add('campaign-fact-card', 'campaign-fact', 'elevation-4');
    // Determine background color based on original HTML examples
    if (row.classList.contains('campaign-make-difference')) {
      factCard.classList.add('campaign-make-difference', 'bg--paper-brown');
    } else {
      factCard.classList.add('bg--paper-green');
    }

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('campaign-fact-card__img-container');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '630' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imgContainer.append(optimizedPic);
    }
    factCard.append(imgContainer);

    const details = document.createElement('div');
    details.classList.add('campaign-fact-card__details');

    const factTitle = document.createElement('div');
    factTitle.classList.add('campaign-fact-card__name', 'utilityScriptLarge');
    factTitle.textContent = factTitleCell.textContent.trim();
    details.append(factTitle);

    const description = document.createElement('div');
    description.classList.add('bodyMediumRegular', 'campaign-fact-card__description');
    description.innerHTML = descriptionCell.innerHTML;
    details.append(description);

    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('campaign-fact-card__cta');
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('link', 'link-auto', 'labelSmallBold');
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href;
      ctaLink.setAttribute('title', ctaLabelCell.textContent.trim());
      ctaLink.setAttribute('aria-label', ctaLabelCell.textContent.trim());
      ctaLink.setAttribute('rel', 'follow');
    }
    const ctaSpan = document.createElement('span');
    ctaSpan.classList.add('button-text');
    ctaSpan.textContent = ctaLabelCell.textContent.trim();
    ctaLink.append(ctaSpan);
    ctaDiv.append(ctaLink);
    details.append(ctaDiv);

    factCard.append(details);
    slide.append(factCard);
    swiperWrapper.append(slide);
  });

  swiperContainer.append(swiperWrapper);

  const prevBtnControl = document.createElement('div');
  prevBtnControl.classList.add('campaign-carousel__btn-control', 'campaign-carousel--prev', 'show-for-large');
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('swiper-control', 'swiper-button', 'swiper--prev', 'elevation-1');
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = `
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L17 7M1 7L6.33333 2M1 7L6.33333 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  prevBtnControl.append(prevBtn);
  swiperContainer.append(prevBtnControl);

  const nextBtnControl = document.createElement('div');
  nextBtnControl.classList.add('campaign-carousel__btn-control', 'campaign-carousel--next', 'show-for-large');
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('swiper-control', 'swiper-button', 'swiper--next', 'elevation-1');
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = `
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7L1 7M17 7L11.6667 2M17 7L11.6667 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  nextBtnControl.append(nextBtn);
  swiperContainer.append(nextBtnControl);

  const paginationEl = document.createElement('div');
  paginationEl.classList.add('swiper-pagination', 'campaign-carousel__swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiperContainer.append(paginationEl);

  contentWrapper.append(swiperContainer);
  section.append(contentWrapper);

  block.replaceChildren(section);

  // Optimize all pictures within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Load Swiper and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
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
      576: { slidesPerView: 1 }, // Adjusted to match visible behavior, assuming 1 for small
      768: { slidesPerView: 2 }, // Example, adjust based on actual design
      992: { slidesPerView: 3 }, // Example, adjust based on actual design
      1200: { slidesPerView: 3 }, // Example, adjust based on actual design
    },
  });
}
