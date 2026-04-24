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
      subWrap.classList.add('has-sub-child');
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
    viewAllLinkRow,
    viewAllLabelRow,
    ...itemRows
  ] = [...block.children];

  const mainContainer = document.createElement('section');
  mainContainer.classList.add('card-carousel');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');
  mainContainer.append(containerDiv);

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
  containerDiv.append(title);

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
  containerDiv.append(subtitle);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add(
    'card-carousel__swiper',
    'swiper',
    'container',
    'gx-0',
  );
  swiperContainer.setAttribute('data-loop', 'true');
  mainContainer.append(swiperContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add(
    'card-carousel__swiper--container',
    'mt-8',
    'mt-sm-10',
  );
  swiperContainer.append(swiperWrapper);

  const popularRecipeDiv = document.createElement('div');
  popularRecipeDiv.classList.add(
    'aem-Grid',
    'aem-Grid--12',
    'aem-Grid--default--12',
  );
  swiperWrapper.append(popularRecipeDiv);

  const popularRecipeColumn = document.createElement('div');
  popularRecipeColumn.classList.add(
    'popularRecipe',
    'aem-GridColumn',
    'aem-GridColumn--default--12',
  );
  popularRecipeDiv.append(popularRecipeColumn);

  const popularRecipeSection = document.createElement('section');
  popularRecipeSection.classList.add('popular-recipe', 'slide-in-anim');
  popularRecipeColumn.append(popularRecipeSection);

  const popularRecipeData = document.createElement('div');
  popularRecipeData.classList.add('popular-recipe__data', 'd-none');
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

  const socialMediaShareItems = [];
  const recipeCards = [];

  itemRows.forEach((row) => {
    if (row.children.length === 12) {
      // Recipe Card
      recipeCards.push(row);
    } else if (row.children.length === 3) {
      // Social Media Share Item
      socialMediaShareItems.push(row);
    }
  });

  recipeCards.forEach((row, index) => {
    const [
      linkCell,
      imageCell,
      imageAltCell,
      tagCell,
      tagIconCell,
      titleCell,
      descriptionCell,
      timeIconCell,
      timeCell,
      servesIconCell,
      servesCell,
      hierarchyTreeCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    if (index === 0) {
      slide.classList.add('swiper-slide-active');
    } else if (index === 1) {
      slide.classList.add('swiper-slide-next');
    }
    slide.setAttribute('data-swiper-slide-index', index);
    swiperRecipeWrapper.append(slide);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');
    moveInstrumentation(row, recipeCard);
    slide.append(recipeCard);

    const link = document.createElement('a');
    link.classList.add(
      'recipe-card__link',
      'd-block',
      'position-relative',
    );
    link.href = linkCell?.querySelector('a')?.href || '#';
    recipeCard.append(link);

    const imagePicture = imageCell?.querySelector('picture');
    if (imagePicture) {
      const img = imagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(
        img.src,
        imageAltCell?.textContent.trim() || img.alt,
        false,
        [{ width: '750' }],
      );
      optimizedPic.querySelector('img').classList.add(
        'recipe-card__image',
        'object-fit-cover',
        'w-100',
      );
      link.append(optimizedPic);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('recipe-card__content', 'py-6');
    link.append(contentDiv);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add(
      'recipe-card__info',
      'd-flex',
      'align-items-center',
      'justify-content-between',
    );
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
    tagSpan.textContent = tagCell?.textContent.trim() || '';
    infoDiv.append(tagSpan);

    const tagIconPicture = tagIconCell?.querySelector('picture');
    if (tagIconPicture) {
      const tagIconImg = tagIconPicture.querySelector('img');
      const optimizedTagIcon = createOptimizedPicture(
        tagIconImg.src,
        tagIconImg.alt,
        false,
        [{ width: '32' }],
      );
      infoDiv.append(optimizedTagIcon);
      moveInstrumentation(tagIconImg, optimizedTagIcon.querySelector('img'));
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
    titleH3.textContent = titleCell?.textContent.trim() || '';
    textDiv.append(titleH3);

    const descriptionP = document.createElement('p');
    descriptionP.classList.add(
      'recipe-card__desc',
      'font-default',
      'font-xl-18',
      'leading-24',
      'fw-medium',
      'text-dark-gray-100',
      'mt-4',
    );
    descriptionP.textContent = descriptionCell?.textContent.trim() || '';
    textDiv.append(descriptionP);

    const waveDiv = document.createElement('div');
    waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
    contentDiv.append(waveDiv);

    const propertiesUl = document.createElement('ul');
    propertiesUl.classList.add(
      'recipe-card__properties',
      'mt-4',
      'd-flex',
      'align-items-center',
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

    const timeIconPicture = timeIconCell?.querySelector('picture');
    if (timeIconPicture) {
      const timeIconImg = timeIconPicture.querySelector('img');
      const optimizedTimeIcon = createOptimizedPicture(
        timeIconImg.src,
        timeIconImg.alt,
        false,
        [{ width: '24' }],
      );
      timeLi.append(optimizedTimeIcon);
      moveInstrumentation(timeIconImg, optimizedTimeIcon.querySelector('img'));
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
    timeSpan.textContent = timeCell?.textContent.trim() || '';
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

    const servesIconPicture = servesIconCell?.querySelector('picture');
    if (servesIconPicture) {
      const servesIconImg = servesIconPicture.querySelector('img');
      const optimizedServesIcon = createOptimizedPicture(
        servesIconImg.src,
        servesIconImg.alt,
        false,
        [{ width: '24' }],
      );
      servesLi.append(optimizedServesIcon);
      moveInstrumentation(servesIconImg, optimizedServesIcon.querySelector('img'));
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
    servesSpan.textContent = servesCell?.textContent.trim() || '';
    servesLi.append(servesSpan);

    const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
    if (hierarchyRoot) {
      // Create a temporary div to hold the hierarchy content and apply instrumentation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML; // Use innerHTML to preserve structure
      moveInstrumentation(hierarchyTreeCell, tempDiv);

      // Apply classes to nested elements if needed, based on original HTML structure
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-link')); // Example class
      tempDiv.querySelectorAll('li').forEach(li => li.classList.add('nav-menu-item', 'list-item')); // Example class
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('nav-menu-list')); // Example class

      // Transform nested lists for interactivity
      transformNestedLists(tempDiv.querySelector('ul'));

      // Append the processed hierarchy content to a suitable location if it's meant to be rendered
      // For now, it's just processed, assuming it might be used for navigation or other features
      // If it needs to be rendered, append it to a specific element, e.g., recipeCard.append(tempDiv);
      // For this block, the hierarchy-tree is processed but not directly rendered in the card.
    }
  });

  const popularRecipeShare = document.createElement('div');
  popularRecipeShare.classList.add('popular-recipe__share');
  popularRecipeSection.append(popularRecipeShare);

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
  popularRecipeShare.append(socialMediaShareSection);

  const socialMediaShareWrapper = document.createElement('div');
  socialMediaShareWrapper.classList.add(
    'social-media-share__wrapper',
    'bg-cream-100',
    'py-8',
    'px-3',
    'px-md-8',
  );
  socialMediaShareSection.append(socialMediaShareWrapper);

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
  socialMediaShareWrapper.append(titleCloseDiv);

  const closeDiv = document.createElement('div');
  closeDiv.classList.add('social-media-share__wrapper--close');
  titleCloseDiv.append(closeDiv);
  // Add a placeholder for the close icon, as its source is hardcoded in original HTML
  const closeIcon = document.createElement('img');
  closeIcon.alt = 'Close Icon';
  // TODO: Make closeIcon.src authorable via a new model field if it's dynamic.
  // For now, using a placeholder.
  closeIcon.src = '/icons/close.svg';
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
  socialMediaShareWrapper.append(socialIconsWrapper);

  socialMediaShareItems.forEach((row) => {
    const [iconCell, linkCell, labelCell] = [...row.children];

    const iconLabelDiv = document.createElement('div');
    iconLabelDiv.classList.add(
      'social-media-share__wrapper--icon-label',
      'swiper-slide',
      'd-flex',
      'align-items-center',
    );
    socialIconsWrapper.append(iconLabelDiv);

    const shareLink = document.createElement('a');
    shareLink.classList.add(
      'social-media-share__link',
      'd-flex',
      'align-items-center',
      'text-decoration-none',
      'gap-4',
      'w-fit',
      'flex-md-column',
      'justify-content-center',
    );
    shareLink.target = '_blank';
    shareLink.href = linkCell?.querySelector('a')?.href || '#';
    iconLabelDiv.append(shareLink);

    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );
    shareLink.append(iconsDiv);

    const iconLinkDiv = document.createElement('div');
    iconLinkDiv.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    iconLinkDiv.target = '_blank';
    iconsDiv.append(iconLinkDiv);

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      const optimizedIcon = createOptimizedPicture(
        iconImg.src,
        iconImg.alt,
        false,
        [{ width: '32' }],
      );
      iconLinkDiv.append(optimizedIcon);
      moveInstrumentation(iconImg, optimizedIcon.querySelector('img'));
    }

    const labelDiv = document.createElement('div');
    labelDiv.classList.add(
      'social-media-share__wrapper--label',
      'text-center',
      'font-16',
      'leading-22',
      'text-black',
    );
    labelDiv.textContent = labelCell?.textContent.trim() || '';
    labelDiv.setAttribute('data-socialmedia-name', labelCell?.textContent.trim().toLowerCase() || '');
    shareLink.append(labelDiv);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    shareLink.append(screenReaderSpan);

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.classList.add('social-media-share__wrapper--url');
    hiddenInput.value = labelCell?.textContent.trim().toLowerCase() || '';
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
  const prevIcon = document.createElement('img');
  prevIcon.alt = 'Previous';
  // TODO: Make prevIcon.src authorable via a new model field if it's dynamic.
  // For now, using a placeholder.
  prevIcon.src = '/icons/arrow-left.svg';
  prevButton.append(prevIcon);
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
  const nextIcon = document.createElement('img');
  nextIcon.alt = 'Next';
  // TODO: Make nextIcon.src authorable via a new model field if it's dynamic.
  // For now, using a placeholder.
  nextIcon.src = '/icons/arrow-right.svg';
  nextButton.append(nextIcon);
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
  socialMediaShareWrapper.append(inputButtonDiv);

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
  const carouselPrevIcon = document.createElement('img');
  carouselPrevIcon.alt = 'Previous';
  // TODO: Make carouselPrevIcon.src authorable via a new model field if it's dynamic.
  // For now, using a placeholder.
  carouselPrevIcon.src = '/icons/arrow-left.svg';
  carouselPrevButton.append(carouselPrevIcon);
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
  const carouselNextIcon = document.createElement('img');
  carouselNextIcon.alt = 'Next';
  // TODO: Make carouselNextIcon.src authorable via a new model field if it's dynamic.
  // For now, using a placeholder.
  carouselNextIcon.src = '/icons/arrow-right.svg';
  carouselNextButton.append(carouselNextIcon);
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

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add(
    'd-flex',
    'justify-content-center',
    'align-items-center',
    'mt-8',
  );
  mainContainer.append(ctaWrapper);

  const viewAllLink = document.createElement('a');
  viewAllLink.classList.add(
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
  viewAllLink.href = viewAllLinkRow?.querySelector('a')?.href || '#';
  moveInstrumentation(viewAllLinkRow, viewAllLink);
  ctaWrapper.append(viewAllLink);

  const viewAllLabelSpan = document.createElement('span');
  viewAllLabelSpan.classList.add(
    'svasti-cta__label',
    'fw-semibold',
    'fs-default',
    'leading-26',
  );
  viewAllLabelSpan.textContent = viewAllLabelRow?.textContent.trim() || '';
  moveInstrumentation(viewAllLabelRow, viewAllLabelSpan);
  viewAllLink.append(viewAllLabelSpan);

  block.replaceChildren(mainContainer);

  // Image optimization for all pictures in the block
  mainContainer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
