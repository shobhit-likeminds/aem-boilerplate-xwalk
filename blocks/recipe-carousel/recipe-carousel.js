import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const [
    iconImageRow,
    titleRow,
    descriptionRow,
    ctaLinkRow,
    ctaLabelRow,
    ...recipeCardRows
  ] = children;

  const section = document.createElement('section');
  section.classList.add('recipe-home', 'grid-container', 'overflow-x-hidden', 'recipe-home--has-icon', 'bg--paper-white', 'animate-enter', 'in-view');
  moveInstrumentation(block, section);

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x');
  section.append(gridX);

  const imageTextGrid = document.createElement('div');
  imageTextGrid.classList.add('grid-x', 'recipe-home--image-text');
  gridX.append(imageTextGrid);

  const cellDiv = document.createElement('div');
  cellDiv.classList.add('cell', 'small-12', 'large-10', 'large-offset-1');
  imageTextGrid.append(cellDiv);

  // Icon Image
  const iconSection = document.createElement('div');
  iconSection.classList.add('recipe-home--icon-section', 'animate-enter-fade-left-long', 'animate-delay-3', 'text-center');
  const iconPicture = iconImageRow.querySelector('picture');
  if (iconPicture) {
    const iconImg = iconPicture.querySelector('img');
    if (iconImg) {
      const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '750' }]);
      const optimizedIconImg = optimizedIconPic.querySelector('img');
      optimizedIconImg.classList.add('recipe-home--icon-section-img');
      moveInstrumentation(iconPicture, optimizedIconPic.querySelector('img'));
      iconSection.append(optimizedIconPic);
    }
  }
  moveInstrumentation(iconImageRow, iconSection);
  cellDiv.append(iconSection);

  // Text Section
  const textSection = document.createElement('div');
  textSection.classList.add('recipe-home--text-section', 'animate-enter-fade-up-short', 'animate-delay-3');
  moveInstrumentation(titleRow, textSection); // Move instrumentation from titleRow

  const title = document.createElement('h2');
  title.classList.add('recipe-home--title');
  title.textContent = titleRow.textContent.trim();
  textSection.append(title);

  const description = document.createElement('div');
  description.classList.add('recipe-home--desc', 'bodyMediumRegular');
  description.innerHTML = descriptionRow.innerHTML;
  moveInstrumentation(descriptionRow, description);
  textSection.append(description);

  cellDiv.append(textSection);

  // Recipe Wrapper
  const recipeWrapper = document.createElement('div');
  recipeWrapper.classList.add('cell', 'small-12', 'recipe-home--wrapper');
  gridX.append(recipeWrapper);

  const swiperEl = document.createElement('div');
  swiperEl.classList.add('swiper', 'swipper--full-view-padding', 'recipe-home--wrapper--in');
  recipeWrapper.append(swiperEl);

  // Swiper Navigation Buttons
  const prevBtnControl = document.createElement('div');
  prevBtnControl.classList.add('recipe-home--btn-control', 'recipe-home--prev', 'show-for-large');
  const prevBtn = document.createElement('button');
  prevBtn.classList.add('swiper-control', 'swiper--prev', 'elevation-1', 'animate-enter-fade-right-short', 'animate-delay-9');
  prevBtn.innerHTML = `
    <svg role="presentation" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L17 7M1 7L6.33333 2M1 7L6.33333 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  prevBtnControl.append(prevBtn);
  swiperEl.append(prevBtnControl);

  const nextBtnControl = document.createElement('div');
  nextBtnControl.classList.add('recipe-home--btn-control', 'recipe-home--next', 'show-for-large');
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('swiper-control', 'swiper--next', 'elevation-1', 'animate-enter-fade-left-short', 'animate-delay-9');
  nextBtn.innerHTML = `
    <svg role="presentation" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7L1 7M17 7L11.6667 2M17 7L11.6667 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  nextBtnControl.append(nextBtn);
  swiperEl.append(nextBtnControl);

  const swiperWrapper = document.createElement('ul');
  swiperWrapper.classList.add('swiper-wrapper', 'recipe-home--list');
  swiperEl.append(swiperWrapper);

  recipeCardRows.forEach((row) => {
    const [
      linkCell,
      imageDesktopCell,
      imageMobileCell,
      tagLabelCell,
      recipeNameCell,
      recipeDescriptionCell,
      stepsCountCell,
      ingredientsCountCell,
    ] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('swiper-slide', 'recipe-home--list-item');

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe-card-grid-view--link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      recipeLink.href = foundLink.href;
      recipeLink.title = recipeNameCell.textContent.trim();
      recipeLink.setAttribute('aria-label', recipeNameCell.textContent.trim());
    }
    moveInstrumentation(linkCell, recipeLink);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('grid-x', 'recipe-card', 'recipe-card--grid-view-card', 'elevation-2', 'has-hover', 'recipe-card-grid-view');
    recipeLink.append(recipeCard);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('cell', 'small-12', 'medium-12', 'large-6', 'recipe-img-container', 'animate-enter-fade', 'animate-delay-5');
    recipeCard.append(imgContainer);

    const tagMobile = document.createElement('div');
    tagMobile.classList.add('recipe-tag-mobile', 'animate-enter-fade-up-short', 'animate-delay-9');
    const tagDivMobile = document.createElement('div');
    tagDivMobile.classList.add('tag', 'bg--brand-green');
    const tagSpanMobile = document.createElement('span');
    tagSpanMobile.classList.add('tag__label');
    tagSpanMobile.textContent = tagLabelCell.textContent.trim();
    tagDivMobile.append(tagSpanMobile);
    tagMobile.append(tagDivMobile);
    imgContainer.append(tagMobile);

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureMobile = imageMobileCell.querySelector('picture');

    if (pictureDesktop) {
      const imgDesktop = pictureDesktop.querySelector('img');
      if (imgDesktop) {
        const optimizedPic = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ media: '(min-width: 768px)', width: '1066' }, { width: '670' }]);
        moveInstrumentation(pictureDesktop, optimizedPic.querySelector('img'));
        imgContainer.append(optimizedPic);
      }
    } else if (pictureMobile) {
      const imgMobile = pictureMobile.querySelector('img');
      if (imgMobile) {
        const optimizedPic = createOptimizedPicture(imgMobile.src, imgMobile.alt, false, [{ media: '(min-width: 768px)', width: '1066' }, { width: '670' }]);
        moveInstrumentation(pictureMobile, optimizedPic.querySelector('img'));
        imgContainer.append(optimizedPic);
      }
    }

    const recipeDetails = document.createElement('div');
    recipeDetails.classList.add('cell', 'small-12', 'medium-12', 'large-6', 'recipe-details');
    recipeCard.append(recipeDetails);

    const recipeInfo = document.createElement('div');
    recipeInfo.classList.add('recipe-info');
    recipeDetails.append(recipeInfo);

    const recipeName = document.createElement('div');
    recipeName.classList.add('recipe-name', 'labelLargeBold', 'animate-enter-fade-up-short', 'animate-delay-9');
    recipeName.textContent = recipeNameCell.textContent.trim();
    moveInstrumentation(recipeNameCell, recipeName);
    recipeInfo.append(recipeName);

    const descriptionGrid = document.createElement('div');
    descriptionGrid.classList.add('grid-x');
    const recipeDescription = document.createElement('div');
    recipeDescription.classList.add('cell', 'recipe-description', 'bodySmallRegular', 'animate-enter-fade-up-short', 'animate-delay-11');
    recipeDescription.textContent = recipeDescriptionCell.textContent.trim();
    moveInstrumentation(recipeDescriptionCell, recipeDescription);
    descriptionGrid.append(recipeDescription);
    recipeInfo.append(descriptionGrid);

    const stepsIngredientsGrid = document.createElement('div');
    stepsIngredientsGrid.classList.add('grid-x');
    const stepsIngredients = document.createElement('div');
    stepsIngredients.classList.add('cell', 'recipe-steps-and-ingredients', 'animate-enter-fade-up-short', 'animate-delay-11');
    stepsIngredientsGrid.append(stepsIngredients);
    recipeInfo.append(stepsIngredientsGrid);

    const stepsContainer = document.createElement('div');
    stepsContainer.classList.add('recipe-steps-container');
    const stepsCount = document.createElement('span');
    stepsCount.classList.add('recipe-steps-count', 'labelSmallBold');
    stepsCount.textContent = stepsCountCell.textContent.trim();
    const stepsLabel = document.createElement('span');
    stepsLabel.classList.add('recipe-steps-label', 'utilityTagHighCaps');
    stepsLabel.textContent = 'Steps';
    stepsContainer.append(stepsCount, stepsLabel);
    moveInstrumentation(stepsCountCell, stepsContainer);
    stepsIngredients.append(stepsContainer);

    const separator = document.createElement('div');
    separator.classList.add('recipe-steps-separator');
    stepsIngredients.append(separator);

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('recipe-ingredients-container');
    const ingredientsCount = document.createElement('span');
    ingredientsCount.classList.add('recipe-ingredients-count', 'labelSmallBold');
    ingredientsCount.textContent = ingredientsCountCell.textContent.trim();
    const ingredientsLabel = document.createElement('span');
    ingredientsLabel.classList.add('recipe-ingredients-label', 'utilityTagHighCaps');
    ingredientsLabel.textContent = 'Ingredients';
    ingredientsContainer.append(ingredientsCount, ingredientsLabel);
    moveInstrumentation(ingredientsCountCell, ingredientsContainer);
    stepsIngredients.append(ingredientsContainer);

    const tagDesktop = document.createElement('div');
    tagDesktop.classList.add('recipe-tag-desktop', 'animate-enter-fade-up-short', 'animate-delay-9');
    const tagDivDesktop = document.createElement('div');
    tagDivDesktop.classList.add('tag', 'bg--brand-green');
    const tagSpanDesktop = document.createElement('span');
    tagSpanDesktop.classList.add('tag__label');
    tagSpanDesktop.textContent = tagLabelCell.textContent.trim();
    tagDivDesktop.append(tagSpanDesktop);
    tagDesktop.append(tagDivDesktop);
    moveInstrumentation(tagLabelCell, tagDesktop);
    recipeInfo.append(tagDesktop);

    listItem.append(recipeLink);
    swiperWrapper.append(listItem);
    moveInstrumentation(row, listItem);
  });

  // Swiper Pagination
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('recipe-home--pagination', 'animate-enter-fade-left-long', 'animate-delay-8');
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  paginationDiv.append(swiperPagination);
  swiperEl.append(paginationDiv);

  // CTA Container
  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('grid-x', 'recipe-home--cta-container', 'text-center', 'animate-enter-fade-up-short', 'animate-delay-10');
  gridX.append(ctaContainer);

  const ctaCell = document.createElement('div');
  ctaCell.classList.add('cell', 'large-10', 'large-offset-1', 'see-all-recipies-cta');
  ctaContainer.append(ctaCell);

  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add('button', 'transparent-auto');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaAnchor.href = foundCtaLink.href;
    ctaAnchor.title = ctaLabelRow.textContent.trim();
    ctaAnchor.setAttribute('aria-label', ctaLabelRow.textContent.trim());
    ctaAnchor.setAttribute('rel', 'follow');
  }
  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('button-text');
  ctaSpan.textContent = ctaLabelRow.textContent.trim();
  ctaAnchor.append(ctaSpan);
  moveInstrumentation(ctaLinkRow, ctaAnchor);
  moveInstrumentation(ctaLabelRow, ctaAnchor);
  ctaCell.append(ctaAnchor);

  block.replaceChildren(section);

  // Initialize Swiper
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
