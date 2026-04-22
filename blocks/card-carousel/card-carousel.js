import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      // Using a generic class, as 'has-sub-child' was not in the provided ORIGINAL HTML class list.
      // If a specific class from ORIGINAL HTML is intended, it should be added to the allowlist.
      subWrap.classList.add('nested-list-wrapper');
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
    }
  });
}

export default function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = [...block.children];

  const recipeCards = itemRows.filter((row) => row.children.length === 11);
  const socialShareIcons = itemRows.filter((row) => row.children.length === 3);

  const section = document.createElement('section');
  section.classList.add('card-carousel');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  if (titleRow) {
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
  }

  if (subtitleRow) {
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
  }

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add(
    'card-carousel__swiper',
    'swiper',
    'container',
    'gx-0',
  );
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
  // Data attributes are for client-side JS, not for EDS
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

  const recipeSwiperWrapper = document.createElement('div');
  recipeSwiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');
  popularRecipeContainer.append(recipeSwiperWrapper);

  recipeCards.forEach((row) => {
    const [
      linkCell,
      imageCell,
      titleCell,
      descriptionCell,
      tagCell,
      infoIconCell,
      timeIconCell,
      timeCell,
      servesIconCell,
      servesCell,
      hierarchyTreeCell,
    ] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    moveInstrumentation(row, swiperSlide);
    recipeSwiperWrapper.append(swiperSlide);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');
    swiperSlide.append(recipeCard);

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      recipeLink.href = foundLink.href;
    }
    recipeCard.append(recipeLink);

    const imagePicture = imageCell.querySelector('picture');
    if (imagePicture) {
      const img = imagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      recipeLink.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('recipe-card__content', 'py-6');
    recipeLink.append(contentDiv);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');
    contentDiv.append(infoDiv);

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
    infoDiv.append(tagSpan);

    const infoIconPicture = infoIconCell.querySelector('picture');
    if (infoIconPicture) {
      const img = infoIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      infoDiv.append(optimizedPic);
    }

    const textDiv = document.createElement('div');
    textDiv.classList.add('recipe-card__text');
    contentDiv.append(textDiv);

    const titleH3 = document.createElement('h3');
    titleH3.classList.add(
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
    titleH3.textContent = titleCell.textContent.trim();
    textDiv.append(titleH3);

    const descP = document.createElement('p');
    descP.classList.add(
      'recipe-card__desc',
      'font-default',
      'font-xl-18',
      'leading-24',
      'fw-medium',
      'text-dark-gray-100',
      'mt-4',
    );
    descP.textContent = descriptionCell.textContent.trim();
    textDiv.append(descP);

    const waveDiv = document.createElement('div');
    waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
    contentDiv.append(waveDiv);

    const propertiesUl = document.createElement('ul');
    propertiesUl.classList.add(
      'recipe-card__properties',
      'mt-4',
      'd-flex',
      'align-items-center',
      'mt-4',
    );
    contentDiv.append(propertiesUl);

    const timeLi = document.createElement('li');
    timeLi.classList.add(
      'recipe-card__property',
      'recipe-card__property--left',
      'd-flex',
      'align-items-center',
    );
    propertiesUl.append(timeLi);

    const timeIconPicture = timeIconCell.querySelector('picture');
    if (timeIconPicture) {
      const img = timeIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      timeLi.append(optimizedPic);
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
    timeLi.append(timeSpan);

    const servesLi = document.createElement('li');
    servesLi.classList.add(
      'recipe-card__property',
      'recipe-card__property--right',
      'flex-fill',
      'd-flex',
      'align-items-center',
      'justify-content-end',
    );
    propertiesUl.append(servesLi);

    const servesIconPicture = servesIconCell.querySelector('picture');
    if (servesIconPicture) {
      const img = servesIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      servesLi.append(optimizedPic);
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
    servesLi.append(servesSpan);

    const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
    if (hierarchyRoot) {
      const hierarchyWrapper = document.createElement('div');
      hierarchyWrapper.classList.add('recipe-card__hierarchy'); // Generic class
      moveInstrumentation(hierarchyTreeCell, hierarchyWrapper); // Move instrumentation from original cell
      
      // Create a temporary div to parse and process the innerHTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML;

      // Apply classes to nested elements from ORIGINAL HTML if they exist
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-link', 'text-decoration-none'));
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('nav-menu-list', 'list-unstyled'));
      tempDiv.querySelectorAll('li').forEach(li => li.classList.add('nav-menu-item', 'list-item'));

      // Move processed children from tempDiv to hierarchyWrapper
      while (tempDiv.firstChild) {
        hierarchyWrapper.append(tempDiv.firstChild);
      }
      
      contentDiv.append(hierarchyWrapper);
      transformNestedLists(hierarchyWrapper); // Apply interactivity to the nested lists
    }
  });

  const shareDiv = document.createElement('div');
  shareDiv.classList.add('popular-recipe__share');
  popularRecipeSection.append(shareDiv);

  const socialMediaShareSection = document.createElement('section');
  socialMediaShareSection.classList.add(
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
  shareDiv.append(socialMediaShareSection);

  const socialMediaWrapper = document.createElement('div');
  socialMediaWrapper.classList.add(
    'social-media-share__wrapper',
    'bg-cream-100',
    'py-8',
    'px-3',
    'px-md-8',
  );
  socialMediaShareSection.append(socialMediaWrapper);

  const titleCloseDiv = document.createElement('div');
  titleCloseDiv.classList.add(
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
  socialMediaWrapper.append(titleCloseDiv);

  const closeDiv = document.createElement('div');
  closeDiv.classList.add('social-media-share__wrapper--close');
  titleCloseDiv.append(closeDiv);

  // Close icon from original HTML - if it's a fixed asset, it should be in the block model.
  // For now, we'll create a placeholder or read from a dedicated cell if one existed.
  // If the model had a field for this icon, we would read it from there.
  // As per instructions, DO NOT hardcode DAM paths.
  // Assuming this icon is part of the block's fixed UI, but its source is not authored.
  // If it needs to be dynamic, a new field in the block model is required.
  // For now, we'll add a placeholder and a TODO.
  const closeIcon = document.createElement('img');
  closeIcon.alt = 'Close icon';
  // TODO: Add a field to the block model for the close icon if its source needs to be authored.
  // For now, it will be an empty img or rely on CSS background-image.
  closeDiv.append(closeIcon);

  // Add event listener for the close button
  closeDiv.addEventListener('click', () => {
    socialMediaShareSection.classList.add('d-none');
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
  socialIconsWrapper.append(socialIconsSwiperWrapper);

  socialShareIcons.forEach((row) => {
    const [linkCell, iconCell, labelCell] = [...row.children];

    const iconLabelDiv = document.createElement('div');
    iconLabelDiv.classList.add('social-media-share__wrapper--icon-label', 'swiper-slide', 'd-flex', 'align-items-center');
    moveInstrumentation(row, iconLabelDiv); // Move instrumentation for social share icon row
    socialIconsSwiperWrapper.append(iconLabelDiv);

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
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      socialLink.href = foundLink.href;
    }
    socialLink.target = '_blank';
    iconLabelDiv.append(socialLink);

    const iconDiv = document.createElement('div');
    iconDiv.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );
    socialLink.append(iconDiv);

    const linkDiv = document.createElement('div');
    linkDiv.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    // linkDiv.target = '_blank'; // target attribute is for <a>, not <div>
    iconDiv.append(linkDiv);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      linkDiv.append(optimizedPic);
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
    socialLink.append(labelDiv);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    socialLink.append(screenReaderSpan);

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.classList.add('social-media-share__wrapper--url');
    hiddenInput.value = labelCell.textContent.trim().toLowerCase().replace(/\s/g, ''); // Derive value from label
    iconLabelDiv.append(hiddenInput);
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
  // Omit image src for now as it's not in the model and hardcoding is forbidden.
  // TODO: Add a field to the block model for the prev button icon if its source needs to be authored.
  socialIconsWrapper.append(prevButton);

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
  // Omit image src for now as it's not in the model and hardcoding is forbidden.
  // TODO: Add a field to the block model for the next button icon if its source needs to be authored.
  socialIconsWrapper.append(nextButton);

  const inputButtonDiv = document.createElement('div');
  inputButtonDiv.classList.add(
    'social-media-share__wrapper--input-button',
    'd-flex',
    'align-items-center',
    'mt-8',
    'justify-content-md-center',
    'flex-column',
    'flex-md-row',
  );
  socialMediaWrapper.append(inputButtonDiv);

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
  inputButtonDiv.append(inputField);

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
  inputButtonDiv.append(copyButton);

  // Add event listener for the copy button
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(inputField.value);
      // Optionally provide user feedback
      console.log('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  });

  const carouselPrevButton = document.createElement('button');
  carouselPrevButton.classList.add(
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
  // Omit image src for now as it's not in the model and hardcoding is forbidden.
  // TODO: Add a field to the block model for the carousel prev button icon if its source needs to be authored.
  swiperWrapper.append(carouselPrevButton);

  const carouselNextButton = document.createElement('button');
  carouselNextButton.classList.add(
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
  // Omit image src for now as it's not in the model and hardcoding is forbidden.
  // TODO: Add a field to the block model for the carousel next button icon if its source needs to be authored.
  swiperWrapper.append(carouselNextButton);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add(
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
  swiperContainer.append(paginationDiv);

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');
  section.append(ctaDiv);

  if (ctaLinkRow && ctaLabelRow) {
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
    if (foundCtaLink) {
      ctaLink.href = foundCtaLink.href;
    }
    moveInstrumentation(ctaLinkRow, ctaLink);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
    moveInstrumentation(ctaLabelRow, ctaLabelSpan);
    ctaLink.append(ctaLabelSpan);
    ctaDiv.append(ctaLink);
  }

  block.replaceChildren(section);

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
