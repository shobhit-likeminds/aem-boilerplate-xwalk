import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  // Fixed fields: iconImage, title, description, ctaLink, ctaLabel
  const [iconImageRow, titleRow, descriptionRow, ctaLinkRow, ctaLabelRow, ...recipeRows] = children;

  const section = document.createElement('section');
  section.classList.add('recipe-home', 'grid-container', 'overflow-x-hidden', 'recipe-home--has-icon', 'bg--paper-white', 'animate-enter', 'in-view');

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x');
  section.append(gridX);

  const imageTextWrapper = document.createElement('div');
  imageTextWrapper.classList.add('grid-x', 'recipe-home--image-text');
  gridX.append(imageTextWrapper);

  const cellWrapper = document.createElement('div');
  cellWrapper.classList.add('cell', 'small-12', 'large-10', 'large-offset-1');
  imageTextWrapper.append(cellWrapper);

  // Icon Section
  const iconSection = document.createElement('div');
  iconSection.classList.add('recipe-home--icon-section', 'animate-enter-fade-left-long', 'animate-delay-3', 'text-center');
  if (iconImageRow) {
    const picture = iconImageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('recipe-home--icon-section-img');
        moveInstrumentation(iconImageRow, optimizedPic.querySelector('img'));
        iconSection.append(optimizedPic);
      }
    }
  }
  cellWrapper.append(iconSection);

  // Text Section
  const textSection = document.createElement('div');
  textSection.classList.add('recipe-home--text-section', 'animate-enter-fade-up-short', 'animate-delay-3');
  cellWrapper.append(textSection);

  // Title
  const title = document.createElement('h2');
  title.classList.add('recipe-home--title');
  if (titleRow) {
    moveInstrumentation(titleRow, title);
    title.textContent = titleRow.textContent.trim();
  }
  textSection.append(title);

  // Description
  const description = document.createElement('div');
  description.classList.add('recipe-home--desc', 'bodyMediumRegular');
  if (descriptionRow) {
    moveInstrumentation(descriptionRow, description);
    // FIX: description is richtext, use innerHTML from the cell directly
    description.innerHTML = descriptionRow.innerHTML;
  }
  textSection.append(description);

  // Recipe Wrapper
  const recipeHomeWrapper = document.createElement('div');
  recipeHomeWrapper.classList.add('cell', 'small-12', 'recipe-home--wrapper');
  gridX.append(recipeHomeWrapper);

  const swiperEl = document.createElement('div');
  // FIX: Removed swiper-initialized, swiper-horizontal, swiper-backface-hidden as Swiper adds them
  swiperEl.classList.add('swiper', 'swipper--full-view-padding', 'recipe-home--wrapper--in');
  recipeHomeWrapper.append(swiperEl);

  // Swiper Navigation Buttons
  const prevBtnControl = document.createElement('div');
  prevBtnControl.classList.add('recipe-home--btn-control', 'recipe-home--prev', 'show-for-large');
  const prevBtn = document.createElement('button');
  // FIX: Removed swiper-button-disabled as Swiper adds it
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

  recipeRows.forEach((row) => {
    const [
      recipeLinkCell,
      imageDesktopCell,
      imageMobileCell,
      tagLabelCell,
      nameCell,
      descriptionCell,
      stepsCountCell,
      stepsLabelCell,
      ingredientsCountCell,
      ingredientsLabelCell,
    ] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('swiper-slide', 'recipe-home--list-item'); // FIX: Removed swiper-slide-active
    swiperWrapper.append(listItem);

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe-card-grid-view--link');
    const foundRecipeLink = recipeLinkCell.querySelector('a');
    if (foundRecipeLink) {
      recipeLink.href = foundRecipeLink.href;
      recipeLink.title = nameCell?.textContent.trim() || '';
      recipeLink.ariaLabel = nameCell?.textContent.trim() || '';
    }
    moveInstrumentation(row, recipeLink);
    listItem.append(recipeLink);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('grid-x', 'recipe-card', 'recipe-card--grid-view-card', 'elevation-2', 'has-hover', 'recipe-card-grid-view');
    recipeLink.append(recipeCard);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('cell', 'small-12', 'medium-12', 'large-6', 'recipe-img-container', 'animate-enter-fade', 'animate-delay-5');
    recipeCard.append(imgContainer);

    // Tag Mobile
    const tagMobile = document.createElement('div');
    tagMobile.classList.add('recipe-tag-mobile', 'animate-enter-fade-up-short', 'animate-delay-9');
    const tagDivMobile = document.createElement('div');
    tagDivMobile.classList.add('tag', 'bg--brand-green');
    const tagSpanMobile = document.createElement('span');
    tagSpanMobile.classList.add('tag__label');
    tagSpanMobile.textContent = tagLabelCell?.textContent.trim() || '';
    tagDivMobile.append(tagSpanMobile);
    tagMobile.append(tagDivMobile);
    imgContainer.append(tagMobile);

    // Recipe Image
    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureMobile = imageMobileCell.querySelector('picture');

    if (pictureDesktop && pictureMobile) {
      const imgDesktop = pictureDesktop.querySelector('img');
      const imgMobile = pictureMobile.querySelector('img');

      if (imgDesktop && imgMobile) {
        const combinedPicture = document.createElement('picture');

        const sourceDesktop = document.createElement('source');
        sourceDesktop.media = '(min-width: 768px)';
        sourceDesktop.srcset = imgDesktop.src;
        combinedPicture.append(sourceDesktop);

        const sourceMobile = document.createElement('source');
        sourceMobile.media = '(min-width: 0px)';
        sourceMobile.srcset = imgMobile.src;
        combinedPicture.append(sourceMobile);

        const img = document.createElement('img');
        img.src = imgDesktop.src;
        img.loading = 'lazy';
        img.alt = imgDesktop.alt || '';
        combinedPicture.append(img);

        imgContainer.append(combinedPicture);
      }
    }

    const recipeDetails = document.createElement('div');
    recipeDetails.classList.add('cell', 'small-12', 'medium-12', 'large-6', 'recipe-details');
    recipeCard.append(recipeDetails);

    const recipeInfo = document.createElement('div');
    recipeInfo.classList.add('recipe-info');
    recipeDetails.append(recipeInfo);

    // Recipe Name
    const recipeName = document.createElement('div');
    recipeName.classList.add('recipe-name', 'labelLargeBold', 'animate-enter-fade-up-short', 'animate-delay-9');
    recipeName.textContent = nameCell?.textContent.trim() || '';
    recipeInfo.append(recipeName);

    // Recipe Description
    const descriptionGrid = document.createElement('div');
    descriptionGrid.classList.add('grid-x');
    const descriptionCellEl = document.createElement('div');
    descriptionCellEl.classList.add('cell', 'recipe-description', 'bodySmallRegular', 'animate-enter-fade-up-short', 'animate-delay-11');
    descriptionCellEl.textContent = descriptionCell?.textContent.trim() || '';
    descriptionGrid.append(descriptionCellEl);
    recipeInfo.append(descriptionGrid);

    // Steps and Ingredients
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
    stepsCount.textContent = stepsCountCell?.textContent.trim() || '';
    const stepsLabel = document.createElement('span');
    stepsLabel.classList.add('recipe-steps-label', 'utilityTagHighCaps');
    stepsLabel.textContent = stepsLabelCell?.textContent.trim() || '';
    stepsContainer.append(stepsCount, stepsLabel);
    stepsIngredientsCell.append(stepsContainer);

    const separator = document.createElement('div');
    separator.classList.add('recipe-steps-separator');
    stepsIngredientsCell.append(separator);

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('recipe-ingredients-container');
    const ingredientsCount = document.createElement('span');
    ingredientsCount.classList.add('recipe-ingredients-count', 'labelSmallBold');
    ingredientsCount.textContent = ingredientsCountCell?.textContent.trim() || '';
    const ingredientsLabel = document.createElement('span');
    ingredientsLabel.classList.add('recipe-ingredients-label', 'utilityTagHighCaps');
    ingredientsLabel.textContent = ingredientsLabelCell?.textContent.trim() || '';
    ingredientsContainer.append(ingredientsCount, ingredientsLabel);
    stepsIngredientsCell.append(ingredientsContainer);

    // Tag Desktop
    const tagDesktop = document.createElement('div');
    tagDesktop.classList.add('recipe-tag-desktop', 'animate-enter-fade-up-short', 'animate-delay-9');
    const tagDivDesktop = document.createElement('div');
    tagDivDesktop.classList.add('tag', 'bg--brand-green');
    const tagSpanDesktop = document.createElement('span');
    tagSpanDesktop.classList.add('tag__label');
    tagSpanDesktop.textContent = tagLabelCell?.textContent.trim() || '';
    tagDivDesktop.append(tagSpanDesktop);
    tagDesktop.append(tagDivDesktop);
    recipeInfo.append(tagDesktop);
  });

  // Swiper Pagination
  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('recipe-home--pagination', 'animate-enter-fade-left-long', 'animate-delay-8');
  const swiperPagination = document.createElement('div');
  // FIX: Removed swiper-pagination-clickable, swiper-pagination-bullets, swiper-pagination-horizontal as Swiper adds them
  swiperPagination.classList.add('swiper-pagination');
  paginationDiv.append(swiperPagination);
  swiperEl.append(paginationDiv);

  // CTA Container
  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('grid-x', 'recipe-home--cta-container', 'text-center', 'animate-enter-fade-up-short', 'animate-delay-10');
  const ctaCell = document.createElement('div');
  ctaCell.classList.add('cell', 'large-10', 'large-offset-1', 'see-all-recipies-cta');
  ctaContainer.append(ctaCell);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('button', 'transparent-auto');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
    ctaLink.title = ctaLabelRow?.textContent.trim() || '';
    ctaLink.ariaLabel = ctaLabelRow?.textContent.trim() || '';
    ctaLink.rel = 'follow';
  }
  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('button-text');
  ctaSpan.textContent = ctaLabelRow?.textContent.trim() || '';
  ctaLink.append(ctaSpan);
  moveInstrumentation(ctaLinkRow, ctaLink);
  moveInstrumentation(ctaLabelRow, ctaLink);
  ctaCell.append(ctaLink);
  gridX.append(ctaContainer);

  block.replaceChildren(section);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Load Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 32, // Based on original HTML margin-right: 32px
    // FIX: Swiper loop option should be boolean, read from dataset if available
    loop: swiperEl.dataset.loop === 'true',
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
      768: { // medium-12
        slidesPerView: 1.5,
        spaceBetween: 32,
      },
      1024: { // large-6
        slidesPerView: 2,
        spaceBetween: 32,
      },
    },
  });
}
