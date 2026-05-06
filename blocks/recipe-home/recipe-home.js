import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const [
    iconImageRow,
    headlineRow,
    descriptionRow,
    ctaLinkRow,
    ctaLabelRow,
    ...recipeCardRows
  ] = children;

  const root = document.createElement('section');
  root.classList.add('recipe-home', 'grid-container', 'overflow-x-hidden', 'recipe-home--has-icon', 'bg--paper-white', 'animate-enter', 'in-view');

  const imageTextContainer = document.createElement('div');
  imageTextContainer.classList.add('grid-x', 'recipe-home--image-text');
  root.append(imageTextContainer);

  const cellWrapper = document.createElement('div');
  cellWrapper.classList.add('cell', 'small-12', 'large-10', 'large-offset-1');
  imageTextContainer.append(cellWrapper);

  // Icon Image Section
  const iconSection = document.createElement('div');
  iconSection.classList.add('recipe-home--icon-section', 'animate-enter-fade-left-long', 'animate-delay-3', 'text-center');
  if (iconImageRow) {
    const picture = iconImageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('recipe-home--icon-section-img');
      moveInstrumentation(iconImageRow, optimizedImg);
      iconSection.append(optimizedPic);
    }
  }
  cellWrapper.append(iconSection);

  // Text Section
  const textSection = document.createElement('div');
  textSection.classList.add('recipe-home--text-section', 'animate-enter-fade-up-short', 'animate-delay-3');
  cellWrapper.append(textSection);

  // Headline
  if (headlineRow) {
    const headline = document.createElement('h2');
    headline.classList.add('recipe-home--title');
    moveInstrumentation(headlineRow, headline);
    headline.textContent = headlineRow.textContent.trim();
    textSection.append(headline);
  }

  // Description
  if (descriptionRow) {
    const description = document.createElement('div');
    description.classList.add('recipe-home--desc', 'bodyMediumRegular');
    moveInstrumentation(descriptionRow, description);
    description.innerHTML = descriptionRow.children[0]?.innerHTML || '';
    textSection.append(description);
  }

  // Recipe Cards Wrapper (Swiper)
  const swiperWrapperCell = document.createElement('div');
  swiperWrapperCell.classList.add('cell', 'small-12', 'recipe-home--wrapper');
  root.append(swiperWrapperCell);

  const swiperEl = document.createElement('div');
  swiperEl.classList.add('swiper', 'swipper--full-view-padding', 'recipe-home--wrapper--in');
  swiperWrapperCell.append(swiperEl);

  // Swiper Navigation Buttons
  const prevBtnContainer = document.createElement('div');
  prevBtnContainer.classList.add('recipe-home--btn-control', 'recipe-home--prev', 'show-for-large');
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('swiper-control', 'swiper--prev', 'elevation-1', 'animate-enter-fade-right-short', 'animate-delay-9');
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = `
    <svg role="presentation" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L17 7M1 7L6.33333 2M1 7L6.33333 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  prevBtnContainer.append(prevBtn);
  swiperEl.append(prevBtnContainer);

  const nextBtnContainer = document.createElement('div');
  nextBtnContainer.classList.add('recipe-home--btn-control', 'recipe-home--next', 'show-for-large');
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('swiper-control', 'swiper--next', 'elevation-1', 'animate-enter-fade-left-short', 'animate-delay-9');
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = `
    <svg role="presentation" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7L1 7M17 7L11.6667 2M17 7L11.6667 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  nextBtnContainer.append(nextBtn);
  swiperEl.append(nextBtnContainer);

  const swiperList = document.createElement('ul');
  swiperList.classList.add('swiper-wrapper', 'recipe-home--list');
  swiperList.setAttribute('aria-live', 'polite');
  swiperEl.append(swiperList);

  recipeCardRows.forEach((row) => {
    const [
      cardLinkCell,
      imageDesktopCell,
      imageMobileCell,
      tagLabelCell,
      recipeTitleCell,
      recipeDescriptionCell,
      stepsCountCell,
      stepsLabelCell,
      ingredientsCountCell,
      ingredientsLabelCell,
    ] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('swiper-slide', 'recipe-home--list-item');
    moveInstrumentation(row, listItem);

    const cardLink = document.createElement('a');
    cardLink.classList.add('recipe-card-grid-view--link');
    cardLink.href = cardLinkCell.querySelector('a')?.href || '#';
    cardLink.setAttribute('title', recipeTitleCell.textContent.trim());
    cardLink.setAttribute('aria-label', recipeTitleCell.textContent.trim());
    listItem.append(cardLink);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('grid-x', 'recipe-card', 'recipe-card--grid-view-card', 'elevation-2', 'has-hover', 'recipe-card-grid-view');
    cardLink.append(recipeCard);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('cell', 'small-12', 'medium-12', 'large-6', 'recipe-img-container', 'animate-enter-fade', 'animate-delay-5');
    recipeCard.append(imgContainer);

    const tagMobile = document.createElement('div');
    tagMobile.classList.add('recipe-tag-mobile', 'animate-enter-fade-up-short', 'animate-delay-9');
    const tagMobileInner = document.createElement('div');
    tagMobileInner.classList.add('tag', 'bg--brand-green');
    const tagMobileLabel = document.createElement('span');
    tagMobileLabel.classList.add('tag__label');
    tagMobileLabel.textContent = tagLabelCell.textContent.trim();
    tagMobileInner.append(tagMobileLabel);
    tagMobile.append(tagMobileInner);
    imgContainer.append(tagMobile);

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureMobile = imageMobileCell.querySelector('picture');

    if (pictureDesktop && pictureMobile) {
      const desktopImg = pictureDesktop.querySelector('img');
      const mobileImg = pictureMobile.querySelector('img');

      const newPicture = document.createElement('picture');
      const sourceDesktop = document.createElement('source');
      sourceDesktop.media = '(min-width: 768px)';
      sourceDesktop.srcset = desktopImg.src;
      newPicture.append(sourceDesktop);

      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(min-width: 0px)';
      sourceMobile.srcset = mobileImg.src;
      newPicture.append(sourceMobile);

      const img = document.createElement('img');
      img.src = desktopImg.src; // Default src
      img.alt = desktopImg.alt;
      img.loading = 'lazy';
      img.classList.add('lazyloaded');
      newPicture.append(img);
      imgContainer.append(newPicture);
    }

    const recipeDetails = document.createElement('div');
    recipeDetails.classList.add('cell', 'small-12', 'medium-12', 'large-6', 'recipe-details');
    recipeCard.append(recipeDetails);

    const recipeInfo = document.createElement('div');
    recipeInfo.classList.add('recipe-info');
    recipeDetails.append(recipeInfo);

    const recipeName = document.createElement('div');
    recipeName.classList.add('recipe-name', 'labelLargeBold', 'animate-enter-fade-up-short', 'animate-delay-9');
    recipeName.textContent = recipeTitleCell.textContent.trim();
    recipeInfo.append(recipeName);

    const descriptionGrid = document.createElement('div');
    descriptionGrid.classList.add('grid-x');
    const descriptionCell = document.createElement('div');
    descriptionCell.classList.add('cell', 'recipe-description', 'bodySmallRegular', 'animate-enter-fade-up-short', 'animate-delay-11');
    descriptionCell.textContent = recipeDescriptionCell.textContent.trim();
    descriptionGrid.append(descriptionCell);
    recipeInfo.append(descriptionGrid);

    const stepsIngredientsGrid = document.createElement('div');
    stepsIngredientsGrid.classList.add('grid-x');
    const stepsIngredientsCell = document.createElement('div');
    stepsIngredientsCell.classList.add('cell', 'recipe-steps-and-ingredients', 'animate-enter-fade-up-short', 'animate-delay-11');
    stepsIngredientsGrid.append(stepsIngredientsCell);
    recipeInfo.append(stepsIngredientsGrid);

    const stepsContainer = document.createElement('div');
    stepsContainer.classList.add('recipe-steps-container');
    const stepsCount = document.createElement('span');
    stepsCount.classList.add('recipe-steps-count', 'labelSmallBold');
    stepsCount.textContent = stepsCountCell.textContent.trim();
    const stepsLabel = document.createElement('span');
    stepsLabel.classList.add('recipe-steps-label', 'utilityTagHighCaps');
    stepsLabel.textContent = stepsLabelCell.textContent.trim();
    stepsContainer.append(stepsCount, stepsLabel);
    stepsIngredientsCell.append(stepsContainer);

    const separator = document.createElement('div');
    separator.classList.add('recipe-steps-separator');
    stepsIngredientsCell.append(separator);

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('recipe-ingredients-container');
    const ingredientsCount = document.createElement('span');
    ingredientsCount.classList.add('recipe-ingredients-count', 'labelSmallBold');
    ingredientsCount.textContent = ingredientsCountCell.textContent.trim();
    const ingredientsLabel = document.createElement('span');
    ingredientsLabel.classList.add('recipe-ingredients-label', 'utilityTagHighCaps');
    ingredientsLabel.textContent = ingredientsLabelCell.textContent.trim();
    ingredientsContainer.append(ingredientsCount, ingredientsLabel);
    stepsIngredientsCell.append(ingredientsContainer);

    const tagDesktop = document.createElement('div');
    tagDesktop.classList.add('recipe-tag-desktop', 'animate-enter-fade-up-short', 'animate-delay-9');
    const tagDesktopInner = document.createElement('div');
    tagDesktopInner.classList.add('tag', 'bg--brand-green');
    const tagDesktopLabel = document.createElement('span');
    tagDesktopLabel.classList.add('tag__label');
    tagDesktopLabel.textContent = tagLabelCell.textContent.trim();
    tagDesktopInner.append(tagDesktopLabel);
    tagDesktop.append(tagDesktopInner);
    recipeInfo.append(tagDesktop);

    swiperList.append(listItem);
  });

  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('recipe-home--pagination', 'animate-enter-fade-left-long', 'animate-delay-8');
  const paginationEl = document.createElement('div');
  paginationEl.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  paginationContainer.append(paginationEl);
  swiperEl.append(paginationContainer);

  // CTA Container
  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('grid-x', 'recipe-home--cta-container', 'text-center', 'animate-enter-fade-up-short', 'animate-delay-10');
  root.append(ctaContainer);

  const ctaCell = document.createElement('div');
  ctaCell.classList.add('cell', 'large-10', 'large-offset-1', 'see-all-recipies-cta');
  ctaContainer.append(ctaCell);

  if (ctaLinkRow && ctaLabelRow) {
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('button', 'transparent-auto');
    ctaLink.href = ctaLinkRow.querySelector('a')?.href || '#';
    ctaLink.setAttribute('title', ctaLabelRow.textContent.trim());
    ctaLink.setAttribute('aria-label', ctaLabelRow.textContent.trim());
    ctaLink.setAttribute('rel', 'follow');

    const ctaText = document.createElement('span');
    ctaText.classList.add('button-text');
    ctaText.textContent = ctaLabelRow.textContent.trim();
    ctaLink.append(ctaText);
    moveInstrumentation(ctaLinkRow, ctaLink);
    moveInstrumentation(ctaLabelRow, ctaLink);
    ctaCell.append(ctaLink);
  }

  block.replaceChildren(root);

  // Image optimization
  root.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Load Swiper and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 32, // Based on original HTML margin-right: 32px
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
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 'auto',
        spaceBetween: 32,
      },
    },
  });
}
