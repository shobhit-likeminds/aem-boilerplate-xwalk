import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    navigationPrevIconRow,
    navigationNextIconRow,
    ctaLinkRow,
    ctaLabelRow,
    closeIconRow, // New row for close icon
    ...itemRows
  ] = [...block.children];

  const recipeCards = itemRows.filter((row) => row.children.length === 12);
  const socialMediaShareItems = itemRows.filter((row) => row.children.length === 3);

  const section = document.createElement('section');
  section.classList.add('card-carousel');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  const title = document.createElement('h2');
  title.classList.add(
    'card-carousel__title',
    'font-24',
    'leading-28',
    'font-sm-40',
    'leading-sm-50',
    'text-dark-gray-100',
    'text-center',
    'font-baskerville',
  );
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  container.append(title);

  const subtitle = document.createElement('p');
  subtitle.classList.add(
    'card-carousel__subtitle',
    'font-default',
    'leading-24',
    'font-sm-18',
    'leading-sm-32',
    'text-dark-gray-100',
    'text-center',
    'mt-4',
    'fw-medium',
  );
  moveInstrumentation(subtitleRow, subtitle);
  subtitle.textContent = subtitleRow.textContent.trim();
  container.append(subtitle);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'true');
  section.append(swiperContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperContainer.append(swiperWrapper);

  const popularRecipeSection = document.createElement('section');
  popularRecipeSection.classList.add('popular-recipe', 'slide-in-anim');
  swiperWrapper.append(popularRecipeSection);

  const popularRecipeData = document.createElement('div');
  popularRecipeData.classList.add('popular-recipe__data', 'd-none');
  popularRecipeData.setAttribute('data-search-in', '/content/svasti/in/en/our-recipe');
  popularRecipeData.setAttribute('data-article-from', 'recipePage');
  popularRecipeData.setAttribute('data-limit', '6');
  popularRecipeData.setAttribute('data-hours-text', 'hrs');
  popularRecipeData.setAttribute('data-hour-text', 'hr');
  popularRecipeData.setAttribute('data-minutes-text', 'mins');
  popularRecipeData.setAttribute('data-minute-text', 'min');
  popularRecipeSection.append(popularRecipeData);

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add(
    'popular-recipe__container',
    'overflow-hidden',
    'swiper-initialized',
    'swiper-horizontal',
    'swiper-backface-hidden',
  );
  popularRecipeContainer.setAttribute('data-swiper-init-async', 'true');
  popularRecipeSection.append(popularRecipeContainer);

  const swiperRecipeWrapper = document.createElement('div');
  swiperRecipeWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');
  popularRecipeContainer.append(swiperRecipeWrapper);

  recipeCards.forEach((row, index) => {
    const [
      linkCell,
      imageCell,
      tagCell,
      tagIconCell,
      recipeTitleCell,
      descriptionCell,
      waveImageCell,
      timeIconCell,
      timeCell,
      servesIconCell,
      servesCell,
      hierarchyTreeCell, // Added for richtext
    ] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('data-swiper-slide-index', index);
    swiperSlide.style.width = '368px';
    swiperSlide.style.marginRight = '34px';
    moveInstrumentation(row, swiperSlide);
    swiperRecipeWrapper.append(swiperSlide);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');
    swiperSlide.append(recipeCard);

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) recipeLink.href = foundLink.href;
    recipeCard.append(recipeLink);

    const recipeImage = imageCell.querySelector('picture');
    if (recipeImage) {
      const img = recipeImage.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
      recipeLink.append(optimizedPic);
    }

    const recipeContent = document.createElement('div');
    recipeContent.classList.add('recipe-card__content', 'py-6');
    recipeLink.append(recipeContent);

    const recipeInfo = document.createElement('div');
    recipeInfo.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');
    recipeContent.append(recipeInfo);

    const tagSpan = document.createElement('span');
    tagSpan.classList.add(
      'recipe-card__tag',
      'text-uppercase',
      'text-red-100',
      'font-14',
      'font-xl-default',
      'leading-24',
      'fw-semibold',
    );
    tagSpan.textContent = tagCell.textContent.trim();
    recipeInfo.append(tagSpan);

    const tagIcon = tagIconCell.querySelector('picture');
    if (tagIcon) {
      const img = tagIcon.querySelector('img');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      moveInstrumentation(img, newImg);
      recipeInfo.append(newImg);
    }

    const recipeText = document.createElement('div');
    recipeText.classList.add('recipe-card__text');
    recipeContent.append(recipeText);

    const recipeTitle = document.createElement('h3');
    recipeTitle.classList.add(
      'recipe-card__title',
      'font-20',
      'font-xl-24',
      'leading-24',
      'leading-xl-30',
      'font-baskerville',
      'fw-bold',
      'text-dark-gray-100',
      'mt-4',
    );
    recipeTitle.textContent = recipeTitleCell.textContent.trim();
    recipeText.append(recipeTitle);

    const recipeDesc = document.createElement('p');
    recipeDesc.classList.add(
      'recipe-card__desc',
      'font-default',
      'font-xl-18',
      'leading-24',
      'fw-medium',
      'text-dark-gray-100',
      'mt-4',
    );
    recipeDesc.textContent = descriptionCell.textContent.trim();
    recipeText.append(recipeDesc);

    const waveImage = waveImageCell.querySelector('picture');
    if (waveImage) {
      const img = waveImage.querySelector('img');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      newImg.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
      moveInstrumentation(img, newImg);
      recipeContent.append(newImg);
    }

    const propertiesList = document.createElement('ul');
    propertiesList.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center');
    recipeContent.append(propertiesList);

    const timeProperty = document.createElement('li');
    timeProperty.classList.add(
      'recipe-card__property',
      'recipe-card__property--left',
      'd-flex',
      'align-items-center',
    );
    propertiesList.append(timeProperty);

    const timeIcon = timeIconCell.querySelector('picture');
    if (timeIcon) {
      const img = timeIcon.querySelector('img');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      moveInstrumentation(img, newImg);
      timeProperty.append(newImg);
    }

    const timeSpan = document.createElement('span');
    timeSpan.classList.add(
      'recipe-card__time',
      'text-dark-gray-100',
      'font-14',
      'font-xl-default',
      'leading-20',
      'fw-medium',
      'ms-2',
      'd-inline-block',
      'text-nowrap',
    );
    timeSpan.textContent = timeCell.textContent.trim();
    timeProperty.append(timeSpan);

    const servesProperty = document.createElement('li');
    servesProperty.classList.add(
      'recipe-card__property',
      'recipe-card__property--right',
      'flex-fill',
      'd-flex',
      'align-items-center',
      'justify-content-end',
    );
    propertiesList.append(servesProperty);

    const servesIcon = servesIconCell.querySelector('picture');
    if (servesIcon) {
      const img = servesIcon.querySelector('img');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      moveInstrumentation(img, newImg);
      servesProperty.append(newImg);
    }

    const servesSpan = document.createElement('span');
    servesSpan.classList.add(
      'serve-content',
      'recipe-card__serves',
      'text-dark-gray-100',
      'font-14',
      'font-xl-default',
      'leading-20',
      'fw-medium',
      'ms-2',
      'd-inline-block',
    );
    servesSpan.textContent = servesCell.textContent.trim();
    servesProperty.append(servesSpan);

    // Handle hierarchy-tree richtext field
    if (hierarchyTreeCell) {
      const hierarchyDiv = document.createElement('div');
      moveInstrumentation(hierarchyTreeCell, hierarchyDiv);
      hierarchyDiv.innerHTML = hierarchyTreeCell.innerHTML;

      // Apply classes to nested elements if needed, based on ORIGINAL HTML
      hierarchyDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('recipe-card__hierarchy-list'));
      hierarchyDiv.querySelectorAll('li').forEach(li => li.classList.add('recipe-card__hierarchy-item'));
      hierarchyDiv.querySelectorAll('a').forEach(a => a.classList.add('recipe-card__hierarchy-link'));

      // Append the hierarchy structure to recipeContent or another appropriate parent
      recipeContent.append(hierarchyDiv);
    }
  });

  const popularRecipeShare = document.createElement('div');
  popularRecipeShare.classList.add('popular-recipe__share');
  popularRecipeSection.append(popularRecipeShare);

  const socialMediaShare = document.createElement('section');
  socialMediaShare.classList.add(
    'social-media-share',
    'd-none',
    'w-100',
    'justify-content-center',
    'align-items-center',
    'position-fixed',
    'top-0',
    'start-0',
    'end-0',
    'bottom-0',
    'z-2',
  );
  popularRecipeShare.append(socialMediaShare);

  const socialMediaWrapper = document.createElement('div');
  socialMediaWrapper.classList.add('social-media-share__wrapper', 'bg-cream-100', 'py-8', 'px-3', 'px-md-8');
  socialMediaShare.append(socialMediaWrapper);

  const titleCloseWrapper = document.createElement('div');
  titleCloseWrapper.classList.add(
    'social-media-share__wrapper--title-close',
    'pb-8',
    'd-flex',
    'mx-3',
    'mx-md-0',
    'border-bottom',
    'border-dark-gray-100',
    'align-items-center',
    'justify-content-between',
  );
  socialMediaWrapper.append(titleCloseWrapper);

  const closeButtonWrapper = document.createElement('div');
  closeButtonWrapper.classList.add('social-media-share__wrapper--close');
  titleCloseWrapper.append(closeButtonWrapper);

  const closeIcon = document.createElement('img');
  closeIcon.alt = 'Close Icon';
  const closeIconPicture = closeIconRow.querySelector('picture');
  if (closeIconPicture) {
    const img = closeIconPicture.querySelector('img');
    closeIcon.src = img.src;
    closeIcon.alt = img.alt;
    moveInstrumentation(img, closeIcon);
  } else {
    // Fallback if no picture is provided for closeIconRow
    closeIcon.src = '/icons/close.svg'; // Placeholder, as no icon was provided in the block structure
  }
  closeButtonWrapper.append(closeIcon);

  // Add event listener for close button
  closeButtonWrapper.addEventListener('click', () => {
    socialMediaShare.classList.add('d-none');
  });

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
    'swiper-initialized',
    'swiper-horizontal',
  );
  socialMediaWrapper.append(socialIconsWrapper);

  const socialIconsSwiperWrapper = document.createElement('div');
  socialIconsSwiperWrapper.classList.add(
    'social-media-share__wrapper--social-icons-wrapper',
    'swiper-wrapper',
    'px-3',
    'px-md-0',
  );
  socialIconsSwiperWrapper.setAttribute('data-page-url', '#');
  socialIconsSwiperWrapper.style.transitionDuration = '0ms';
  socialIconsSwiperWrapper.style.transitionDelay = '0ms';
  socialIconsWrapper.append(socialIconsSwiperWrapper);

  socialMediaShareItems.forEach((row) => {
    const [socialLinkCell, iconCell, labelCell] = [...row.children];

    const iconLabelWrapper = document.createElement('div');
    iconLabelWrapper.classList.add('social-media-share__wrapper--icon-label', 'swiper-slide', 'd-flex', 'align-items-center');
    moveInstrumentation(row, iconLabelWrapper);
    socialIconsSwiperWrapper.append(iconLabelWrapper);

    const socialLink = document.createElement('a');
    socialLink.classList.add(
      'social-media-share__link',
      'd-flex',
      'align-items-center',
      'text-decoration-none',
      'gap-4',
      'w-fit',
      'flex-md-column',
      'justify-content-center',
    );
    const foundSocialLink = socialLinkCell.querySelector('a');
    if (foundSocialLink) socialLink.href = foundSocialLink.href;
    socialLink.target = '_blank';
    iconLabelWrapper.append(socialLink);

    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );
    socialLink.append(iconsDiv);

    const linkDiv = document.createElement('div');
    linkDiv.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    iconsDiv.append(linkDiv);

    const socialIcon = iconCell.querySelector('picture');
    if (socialIcon) {
      const img = socialIcon.querySelector('img');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      moveInstrumentation(img, newImg);
      linkDiv.append(newImg);
    }

    const labelDiv = document.createElement('div');
    labelDiv.classList.add(
      'social-media-share__wrapper--label',
      'text-center',
      'font-16',
      'leading-22',
      'text-black',
    );
    labelDiv.textContent = labelCell.textContent.trim();
    labelDiv.setAttribute('data-socialmedia-name', labelCell.textContent.trim().toLowerCase().replace(/\s/g, ''));
    socialLink.append(labelDiv);

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    socialLink.append(screenReaderOnly);

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.classList.add('social-media-share__wrapper--url');
    hiddenInput.value = labelCell.textContent.trim().toLowerCase().replace(/\s/g, '');
    iconLabelWrapper.append(hiddenInput);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add(
    'social-media-share__button',
    'bg-transparent',
    'border-0',
    'social-media-share__prev',
    'd-none',
    'z-2',
    'd-md-block',
    'position-absolute',
    'swiper-button-prev',
  );
  socialIconsWrapper.append(prevButton);

  const prevIcon = document.createElement('img');
  prevIcon.alt = 'svg file';
  prevIcon.src = navigationPrevIconRow.querySelector('img')?.src || '';
  moveInstrumentation(navigationPrevIconRow.querySelector('img'), prevIcon);
  prevButton.append(prevIcon);

  const nextButton = document.createElement('button');
  nextButton.classList.add(
    'social-media-share__button',
    'bg-transparent',
    'border-0',
    'social-media-share__next',
    'd-none',
    'z-2',
    'd-md-block',
    'position-absolute',
    'swiper-button-next',
  );
  socialIconsWrapper.append(nextButton);

  const nextIcon = document.createElement('img');
  nextIcon.alt = 'svg file';
  nextIcon.src = navigationNextIconRow.querySelector('img')?.src || '';
  moveInstrumentation(navigationNextIconRow.querySelector('img'), nextIcon);
  nextButton.append(nextIcon);

  const inputButtonWrapper = document.createElement('div');
  inputButtonWrapper.classList.add(
    'social-media-share__wrapper--input-button',
    'd-flex',
    'align-items-center',
    'mt-8',
    'justify-content-md-center',
    'flex-column',
    'flex-md-row',
  );
  socialMediaWrapper.append(inputButtonWrapper);

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.classList.add(
    'social-media-share__wrapper--input',
    'bg-white',
    'font-16',
    'leading-22',
    'px-4',
    'py-3',
    'shadow-none',
  );
  inputButtonWrapper.append(inputField);

  const copyButton = document.createElement('button');
  copyButton.classList.add(
    'social-media-share__wrapper--button',
    'font-18',
    'leading-24',
    'py-4',
    'px-8',
    'fw-bold',
    'text-white',
  );
  copyButton.textContent = 'Copy';
  inputButtonWrapper.append(copyButton);

  // Add event listener for copy button
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(inputField.value);
      // Optionally provide user feedback
      console.log('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  });

  const swiperNavPrev = document.createElement('button');
  swiperNavPrev.classList.add(
    'card-carousel__swiper--prev',
    'card-carousel__navigation',
    'cursor-pointer',
    'rounded-circle',
    'bg-transparent',
    'text-red-100',
    'text-maroon-600-hover',
    'justify-content-center',
    'align-items-center',
    'position-absolute',
    'd-none',
    'd-sm-flex',
  );
  swiperWrapper.append(swiperNavPrev);

  const swiperNavPrevIcon = navigationPrevIconRow.querySelector('picture');
  if (swiperNavPrevIcon) {
    const img = swiperNavPrevIcon.querySelector('img');
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt;
    moveInstrumentation(img, newImg);
    swiperNavPrev.append(newImg);
  }

  const swiperNavNext = document.createElement('button');
  swiperNavNext.classList.add(
    'card-carousel__swiper--next',
    'card-carousel__navigation',
    'cursor-pointer',
    'rounded-circle',
    'bg-transparent',
    'text-red-100',
    'text-maroon-600-hover',
    'justify-content-center',
    'align-items-center',
    'position-absolute',
    'end-0',
    'd-none',
    'd-sm-flex',
  );
  swiperWrapper.append(swiperNavNext);

  const swiperNavNextIcon = navigationNextIconRow.querySelector('picture');
  if (swiperNavNextIcon) {
    const img = swiperNavNextIcon.querySelector('img');
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt;
    moveInstrumentation(img, newImg);
    swiperNavNext.append(newImg);
  }

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    'swiper-pagination-clickable',
    'swiper-pagination-bullets',
    'swiper-pagination-horizontal',
    'mx-auto',
    'w-fit',
  );
  swiperPagination.style.width = '140px';
  swiperContainer.append(swiperPagination);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');
  section.append(ctaWrapper);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add(
    'svasti-cta',
    'cta-analytics',
    'w-fit',
    'text-decoration-none',
    'd-flex',
    'align-items-center',
    'primary',
    'px-8',
    'pb-3',
    'text-cream-100',
    'border',
    'border-2',
    'border-red-100',
    'border-maroon-100-hover',
    'border-red-300-active',
    'bg-red-100',
    'bg-maroon-100-hover',
    'bg-red-300-active',
  );
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) ctaLink.href = foundCtaLink.href;
  moveInstrumentation(ctaLinkRow, ctaLink);
  ctaWrapper.append(ctaLink);

  const ctaLabel = document.createElement('span');
  ctaLabel.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabel.textContent = ctaLabelRow.textContent.trim();
  moveInstrumentation(ctaLabelRow, ctaLabel);
  ctaLink.append(ctaLabel);

  block.replaceChildren(section);

  // Image optimization
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
