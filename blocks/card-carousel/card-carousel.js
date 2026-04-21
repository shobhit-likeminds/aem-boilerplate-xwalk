import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.classList.add('recipe-card__hierarchy-list'); // Add class to root ul
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('recipe-card__hierarchy-item'); // Add class to li
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      anchor.classList.add('recipe-card__hierarchy-link'); // Add class to anchor
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.classList.add('recipe-card__hierarchy-text'); // Add class to span
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-sub-child'); // Use original HTML class if available, otherwise a generic one
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
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    titleRow,
    subtitleRow,
    carouselPrevIconRow,
    carouselNextIconRow,
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = children;

  const rootSection = document.createElement('section');
  rootSection.classList.add('card-carousel'); // From ORIGINAL HTML

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0'); // From ORIGINAL HTML

  const title = document.createElement('h2');
  moveInstrumentation(titleRow, title);
  title.classList.add(
    'card-carousel__title',
    'font-24',
    'leading-28',
    'font-sm-40',
    'leading-sm-50',
    'text-dark-gray-100',
    'text-center',
    'font-baskerville',
  ); // From ORIGINAL HTML
  title.textContent = titleRow.textContent.trim();
  containerDiv.append(title);

  const subtitle = document.createElement('p');
  moveInstrumentation(subtitleRow, subtitle);
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
  ); // From ORIGINAL HTML
  subtitle.textContent = subtitleRow.textContent.trim();
  containerDiv.append(subtitle);

  rootSection.append(containerDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add(
    'card-carousel__swiper',
    'swiper',
    'container',
    'gx-0',
  ); // From ORIGINAL HTML
  swiperContainer.setAttribute('data-loop', 'true');

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add(
    'card-carousel__swiper--container',
    'mt-8',
    'mt-sm-10',
  ); // From ORIGINAL HTML
  swiperContainer.append(swiperInnerContainer);

  const popularRecipeSection = document.createElement('section');
  popularRecipeSection.classList.add('popular-recipe', 'slide-in-anim'); // From ORIGINAL HTML

  const popularRecipeData = document.createElement('div');
  popularRecipeData.classList.add('popular-recipe__data', 'd-none'); // From ORIGINAL HTML
  // Set data attributes if needed, based on ORIGINAL HTML
  popularRecipeSection.append(popularRecipeData);

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add(
    'popular-recipe__container',
    'overflow-hidden',
    'swiper-initialized',
    'swiper-horizontal',
    'swiper-backface-hidden',
  ); // From ORIGINAL HTML
  popularRecipeContainer.setAttribute('data-swiper-init-async', 'true');
  popularRecipeSection.append(popularRecipeContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper'); // From ORIGINAL HTML
  popularRecipeContainer.append(swiperWrapper);

  const socialMediaShareItems = [];
  const recipeCards = [];

  itemRows.forEach((row) => {
    if (row.children.length === 11) {
      // Recipe Card item
      recipeCards.push(row);
    } else if (row.children.length === 3) {
      // Social Media Share item
      socialMediaShareItems.push(row);
    }
  });

  recipeCards.forEach((row) => {
    const [
      cardLinkCell,
      imageCell,
      titleCell,
      descriptionCell,
      tagCell,
      infoIconCell,
      timeIconCell,
      timeTextCell,
      servesIconCell,
      servesTextCell,
      hierarchyCell,
    ] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide'); // From ORIGINAL HTML

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100'); // From ORIGINAL HTML
    swiperSlide.append(recipeCard);

    const cardLink = document.createElement('a');
    moveInstrumentation(cardLinkCell, cardLink);
    cardLink.classList.add('recipe-card__link', 'd-block', 'position-relative'); // From ORIGINAL HTML
    cardLink.href = cardLinkCell.querySelector('a')?.href || '#';
    recipeCard.append(cardLink);

    const imagePicture = imageCell.querySelector('picture');
    if (imagePicture) {
      const img = imagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100'); // From ORIGINAL HTML
      cardLink.append(optimizedPic);
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('recipe-card__content', 'py-6'); // From ORIGINAL HTML
    cardLink.append(contentDiv);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add(
      'recipe-card__info',
      'd-flex',
      'align-items-center',
      'justify-content-between',
    ); // From ORIGINAL HTML
    contentDiv.append(infoDiv);

    const tagSpan = document.createElement('span');
    moveInstrumentation(tagCell, tagSpan);
    tagSpan.classList.add(
      'recipe-card__tag',
      'text-uppercase',
      'text-red-100',
      'font-14',
      'font-xl-default',
      'leading-24',
      'fw-semibold',
    ); // From ORIGINAL HTML
    tagSpan.textContent = tagCell.textContent.trim();
    infoDiv.append(tagSpan);

    const infoIconPicture = infoIconCell.querySelector('picture');
    if (infoIconPicture) {
      const img = infoIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      infoDiv.append(optimizedPic);
    }

    const textDiv = document.createElement('div');
    textDiv.classList.add('recipe-card__text'); // From ORIGINAL HTML
    contentDiv.append(textDiv);

    const recipeTitle = document.createElement('h3');
    moveInstrumentation(titleCell, recipeTitle);
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
    ); // From ORIGINAL HTML
    recipeTitle.textContent = titleCell.textContent.trim();
    textDiv.append(recipeTitle);

    const recipeDesc = document.createElement('p');
    moveInstrumentation(descriptionCell, recipeDesc);
    recipeDesc.classList.add(
      'recipe-card__desc',
      'font-default',
      'font-xl-18',
      'leading-24',
      'fw-medium',
      'text-dark-gray-100',
      'mt-4',
    ); // From ORIGINAL HTML
    recipeDesc.textContent = descriptionCell.textContent.trim();
    textDiv.append(recipeDesc);

    const waveDiv = document.createElement('div');
    waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100'); // From ORIGINAL HTML
    contentDiv.append(waveDiv);

    const propertiesUl = document.createElement('ul');
    propertiesUl.classList.add(
      'recipe-card__properties',
      'mt-4',
      'd-flex',
      'align-items-center',
    ); // From ORIGINAL HTML
    contentDiv.append(propertiesUl);

    const timeLi = document.createElement('li');
    timeLi.classList.add(
      'recipe-card__property',
      'recipe-card__property--left',
      'd-flex',
      'align-items-center',
    ); // From ORIGINAL HTML
    propertiesUl.append(timeLi);

    const timeIconPicture = timeIconCell.querySelector('picture');
    if (timeIconPicture) {
      const img = timeIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      timeLi.append(optimizedPic);
    }

    const timeSpan = document.createElement('span');
    moveInstrumentation(timeTextCell, timeSpan);
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
    ); // From ORIGINAL HTML
    timeSpan.textContent = timeTextCell.textContent.trim();
    timeLi.append(timeSpan);

    const servesLi = document.createElement('li');
    servesLi.classList.add(
      'recipe-card__property',
      'recipe-card__property--right',
      'flex-fill',
      'd-flex',
      'align-items-center',
      'justify-content-end',
    ); // From ORIGINAL HTML
    propertiesUl.append(servesLi);

    const servesIconPicture = servesIconCell.querySelector('picture');
    if (servesIconPicture) {
      const img = servesIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      servesLi.append(optimizedPic);
    }

    const servesSpan = document.createElement('span');
    moveInstrumentation(servesTextCell, servesSpan);
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
    ); // From ORIGINAL HTML
    servesSpan.textContent = servesTextCell.textContent.trim();
    servesLi.append(servesSpan);

    // Hierarchy (if present)
    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const hierarchyWrapper = document.createElement('div');
      hierarchyWrapper.classList.add('recipe-card__hierarchy'); // Custom class for hierarchy
      moveInstrumentation(hierarchyCell, hierarchyWrapper); // Move instrumentation from original cell
      hierarchyWrapper.append(hierarchyRoot);
      contentDiv.append(hierarchyWrapper);
      transformNestedLists(hierarchyRoot);
    }

    swiperWrapper.append(swiperSlide);
  });

  swiperInnerContainer.append(popularRecipeSection);

  // Swiper navigation buttons
  const prevButton = document.createElement('button');
  moveInstrumentation(carouselPrevIconRow, prevButton);
  prevButton.classList.add(
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
  ); // From ORIGINAL HTML
  const prevIconPicture = carouselPrevIconRow.querySelector('picture');
  if (prevIconPicture) {
    const img = prevIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    prevButton.append(optimizedPic);
  }
  swiperInnerContainer.append(prevButton);

  const nextButton = document.createElement('button');
  moveInstrumentation(carouselNextIconRow, nextButton);
  nextButton.classList.add(
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
  ); // From ORIGINAL HTML
  const nextIconPicture = carouselNextIconRow.querySelector('picture');
  if (nextIconPicture) {
    const img = nextIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    nextButton.append(optimizedPic);
  }
  swiperInnerContainer.append(nextButton);

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
  ); // From ORIGINAL HTML
  swiperContainer.append(paginationDiv);

  rootSection.append(swiperContainer);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add(
    'd-flex',
    'justify-content-center',
    'align-items-center',
    'mt-8',
  ); // From ORIGINAL HTML
  rootSection.append(ctaWrapper);

  const ctaLink = document.createElement('a');
  moveInstrumentation(ctaLinkRow, ctaLink);
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
  ); // From ORIGINAL HTML
  ctaLink.href = ctaLinkRow.querySelector('a')?.href || '#';

  const ctaLabelSpan = document.createElement('span');
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26'); // From ORIGINAL HTML
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaLabelSpan);
  ctaWrapper.append(ctaLink);

  // Social Media Share Section (hidden by default)
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
  ); // From ORIGINAL HTML
  popularRecipeSection.append(socialMediaShareSection);

  const socialMediaShareWrapper = document.createElement('div');
  socialMediaShareWrapper.classList.add(
    'social-media-share__wrapper',
    'bg-cream-100',
    'py-8',
    'px-3',
    'px-md-8',
  ); // From ORIGINAL HTML
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
  ); // From ORIGINAL HTML
  socialMediaShareWrapper.append(titleCloseDiv);

  const closeDiv = document.createElement('div');
  closeDiv.classList.add('social-media-share__wrapper--close'); // From ORIGINAL HTML
  // Add close icon if needed, from ORIGINAL HTML
  titleCloseDiv.append(closeDiv);

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
    'swiper-initialized',
    'swiper-horizontal',
  ); // From ORIGINAL HTML
  socialMediaShareWrapper.append(socialIconsWrapper);

  socialMediaShareItems.forEach((row) => {
    const [shareLinkCell, iconCell, labelCell] = [...row.children];

    const iconLabelDiv = document.createElement('div');
    iconLabelDiv.classList.add(
      'social-media-share__wrapper--icon-label',
      'swiper-slide',
      'd-flex',
      'align-items-center',
    ); // From ORIGINAL HTML
    socialIconsWrapper.append(iconLabelDiv);

    const shareLink = document.createElement('a');
    moveInstrumentation(shareLinkCell, shareLink);
    shareLink.classList.add(
      'social-media-share__link',
      'd-flex',
      'align-items-center',
      'text-decoration-none',
      'gap-4',
      'w-fit',
      'flex-md-column',
      'justify-content-center',
    ); // From ORIGINAL HTML
    shareLink.href = shareLinkCell.querySelector('a')?.href || '#';
    shareLink.target = '_blank';
    iconLabelDiv.append(shareLink);

    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    ); // From ORIGINAL HTML
    shareLink.append(iconsDiv);

    const iconLinkDiv = document.createElement('div');
    iconLinkDiv.classList.add('social-media-share__wrapper--link', 'text-decoration-none'); // From ORIGINAL HTML
    iconLinkDiv.target = '_blank';
    iconsDiv.append(iconLinkDiv);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconLinkDiv.append(optimizedPic);
    }

    const labelDiv = document.createElement('div');
    moveInstrumentation(labelCell, labelDiv);
    labelDiv.classList.add(
      'social-media-share__wrapper--label',
      'text-center',
      'font-16',
      'leading-22',
      'text-black',
    ); // From ORIGINAL HTML
    labelDiv.textContent = labelCell.textContent.trim();
    shareLink.append(labelDiv);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only'); // From ORIGINAL HTML
    screenReaderSpan.textContent = 'opens in a new tab';
    shareLink.append(screenReaderSpan);

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.classList.add('social-media-share__wrapper--url'); // From ORIGINAL HTML
    hiddenInput.value = labelCell.textContent.trim().toLowerCase(); // Use label as value
    iconLabelDiv.append(hiddenInput);
  });

  const inputButtonDiv = document.createElement('div');
  inputButtonDiv.classList.add(
    'social-media-share__wrapper--input-button',
    'd-flex',
    'align-items-center',
    'mt-8',
    'justify-content-md-center',
    'flex-column',
    'flex-md-row',
  ); // From ORIGINAL HTML
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
  ); // From ORIGINAL HTML
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
  ); // From ORIGINAL HTML
  copyButton.textContent = 'Copy';
  inputButtonDiv.append(copyButton);

  block.replaceChildren(rootSection);

  // Initialize Swiper (example, actual Swiper init might be in a separate script)
  // This is a placeholder for Swiper initialization.
  // In a real scenario, you'd load Swiper JS and initialize it here.
  // For EDS, we generally avoid adding complex JS logic that isn't directly related
  // to DOM manipulation or simple event listeners. Swiper is usually handled by
  // a dedicated library or a global script.
  // If Swiper is expected to be initialized by a separate script, ensure the DOM structure
  // matches what that script expects.
  // const swiper = new Swiper(swiperContainer, {
  //   loop: true,
  //   pagination: {
  //     el: paginationDiv,
  //     clickable: true,
  //   },
  //   navigation: {
  //     nextEl: nextButton,
  //     prevEl: prevButton,
  //   },
  //   slidesPerView: 'auto',
  //   spaceBetween: 34,
  // });

  // Event listeners for navigation buttons (if Swiper is not used or custom navigation)
  prevButton.addEventListener('click', () => {
    // Implement custom carousel logic or trigger Swiper.slidePrev()
  });
  nextButton.addEventListener('click', () => {
    // Implement custom carousel logic or trigger Swiper.slideNext()
  });

  // Event listener for social media share close button
  closeDiv.addEventListener('click', () => {
    socialMediaShareSection.classList.add('d-none');
  });

  // Event listener for copy button
  copyButton.addEventListener('click', () => {
    inputField.select();
    document.execCommand('copy');
    // Optionally provide feedback to the user that text has been copied
  });
}
