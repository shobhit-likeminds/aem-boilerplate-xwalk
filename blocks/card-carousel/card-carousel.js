import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
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
      transformNestedLists(nested);
    }
  });
}

export default async function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    navigationPrevIconRow,
    navigationNextIconRow,
    viewAllLinkRow,
    viewAllLabelRow,
    ...itemRows
  ] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('container', 'gx-8', 'gx-sm-0');
  moveInstrumentation(block, root);

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
  root.append(title);

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
  root.append(subtitle);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'true');

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperContainer.append(swiperWrapperContainer);

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add('popular-recipe__container', 'overflow-hidden');
  swiperWrapperContainer.append(popularRecipeContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');
  popularRecipeContainer.append(swiperWrapper);

  const recipeCards = itemRows.filter((row) => row.children.length === 13);
  const socialMediaIcons = itemRows.filter((row) => row.children.length === 3);

  recipeCards.forEach((row) => {
    const [
      recipeLinkCell,
      recipeImageCell,
      recipeImageAltCell,
      recipeTagCell,
      tagIconCell,
      recipeTitleCell,
      recipeDescriptionCell,
      waveDividerCell,
      timeIconCell,
      cookingTimeCell,
      servesIconCell,
      servesTextCell,
      hierarchyTreeCell,
    ] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    moveInstrumentation(row, swiperSlide);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');
    swiperSlide.append(recipeCard);

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundRecipeLink = recipeLinkCell.querySelector('a');
    if (foundRecipeLink) recipeLink.href = foundRecipeLink.href;
    recipeCard.append(recipeLink);

    const recipeImagePicture = recipeImageCell.querySelector('picture');
    if (recipeImagePicture) {
      const img = recipeImagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, recipeImageAltCell.textContent.trim(), false, [
        { width: '750' },
      ]);
      optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
      recipeLink.append(optimizedPic);
    }

    const recipeContent = document.createElement('div');
    recipeContent.classList.add('recipe-card__content', 'py-6');
    recipeLink.append(recipeContent);

    const recipeInfo = document.createElement('div');
    recipeInfo.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');
    recipeContent.append(recipeInfo);

    const recipeTag = document.createElement('span');
    recipeTag.classList.add(
      'recipe-card__tag',
      'text-uppercase',
      'text-red-100',
      'font-14',
      'font-xl-default',
      'leading-24',
      'fw-semibold',
    );
    recipeTag.textContent = recipeTagCell.textContent.trim();
    recipeInfo.append(recipeTag);

    const tagIconPicture = tagIconCell.querySelector('picture');
    if (tagIconPicture) {
      const img = tagIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '50' }]);
      recipeInfo.append(optimizedPic);
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
    recipeDesc.textContent = recipeDescriptionCell.textContent.trim();
    recipeText.append(recipeDesc);

    const recipeWave = document.createElement('div');
    recipeWave.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
    const waveDividerPicture = waveDividerCell.querySelector('picture');
    if (waveDividerPicture) {
      const img = waveDividerPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      recipeWave.append(optimizedPic);
    }
    recipeContent.append(recipeWave);

    const recipeProperties = document.createElement('ul');
    recipeProperties.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center');
    recipeContent.append(recipeProperties);

    const timeProperty = document.createElement('li');
    timeProperty.classList.add('recipe-card__property', 'recipe-card__property--left', 'd-flex', 'align-items-center');
    recipeProperties.append(timeProperty);

    const timeIconPicture = timeIconCell.querySelector('picture');
    if (timeIconPicture) {
      const img = timeIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '50' }]);
      timeProperty.append(optimizedPic);
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
    timeSpan.textContent = cookingTimeCell.textContent.trim();
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
    recipeProperties.append(servesProperty);

    const servesIconPicture = servesIconCell.querySelector('picture');
    if (servesIconPicture) {
      const img = servesIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '50' }]);
      servesProperty.append(optimizedPic);
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
    servesSpan.textContent = servesTextCell.textContent.trim();
    servesProperty.append(servesSpan);

    // Hierarchy Tree (richtext)
    const hierarchyTreeWrapper = document.createElement('div');
    hierarchyTreeWrapper.classList.add('recipe-card__hierarchy-tree');
    moveInstrumentation(hierarchyTreeCell, hierarchyTreeWrapper);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = hierarchyTreeCell.innerHTML;

    tempDiv.querySelectorAll('ul').forEach((ul) => {
      ul.classList.add('nav-menu', 'list-unstyled');
    });
    tempDiv.querySelectorAll('li').forEach((li) => {
      li.classList.add('nav-menu-item', 'list-item');
    });
    tempDiv.querySelectorAll('a').forEach((a) => {
      a.classList.add('nav-menu-link', 'text-decoration-none', 'd-block');
    });

    while (tempDiv.firstChild) {
      hierarchyTreeWrapper.append(tempDiv.firstChild);
    }
    recipeContent.append(hierarchyTreeWrapper);
    transformNestedLists(hierarchyTreeWrapper.querySelector('ul'));

    swiperWrapper.append(swiperSlide);
  });

  const prevButton = document.createElement('button');
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
  );
  const prevIconPicture = navigationPrevIconRow.querySelector('picture');
  if (prevIconPicture) {
    const img = prevIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '50' }]);
    prevButton.append(optimizedPic);
  }
  swiperWrapperContainer.append(prevButton);

  const nextButton = document.createElement('button');
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
  );
  const nextIconPicture = navigationNextIconRow.querySelector('picture');
  if (nextIconPicture) {
    const img = nextIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '50' }]);
    nextButton.append(optimizedPic);
  }
  swiperWrapperContainer.append(nextButton);

  const pagination = document.createElement('div');
  pagination.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    'mx-auto',
    'w-fit',
  );
  swiperContainer.append(pagination);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');
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
  const foundViewAllLink = viewAllLinkRow.querySelector('a');
  if (foundViewAllLink) ctaLink.href = foundViewAllLink.href;
  moveInstrumentation(viewAllLinkRow, ctaLink);

  const ctaLabel = document.createElement('span');
  ctaLabel.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabel.textContent = viewAllLabelRow.textContent.trim();
  moveInstrumentation(viewAllLabelRow, ctaLabel);
  ctaLink.append(ctaLabel);
  ctaWrapper.append(ctaLink);

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

  const socialMediaShareWrapper = document.createElement('div');
  socialMediaShareWrapper.classList.add('social-media-share__wrapper', 'bg-cream-100', 'py-8', 'px-3', 'px-md-8');
  socialMediaShare.append(socialMediaShareWrapper);

  const socialMediaShareTitleClose = document.createElement('div');
  socialMediaShareTitleClose.classList.add(
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
  socialMediaShareWrapper.append(socialMediaShareTitleClose);

  const socialMediaShareClose = document.createElement('div');
  socialMediaShareClose.classList.add('social-media-share__wrapper--close');
  // Assuming close icon is part of the original HTML, but not provided in EDS block
  // If it's an image, it would be a reference field. For now, empty.
  socialMediaShareTitleClose.append(socialMediaShareClose);

  // Add event listener for the close button
  socialMediaShareClose.addEventListener('click', () => {
    socialMediaShare.classList.add('d-none');
  });

  const socialMediaShareIcons = document.createElement('div');
  socialMediaShareIcons.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
  );
  socialMediaShareWrapper.append(socialMediaShareIcons);

  socialMediaIcons.forEach((row) => {
    const [socialLinkCell, socialIconCell, socialLabelCell] = [...row.children];

    const iconLabelWrapper = document.createElement('div');
    iconLabelWrapper.classList.add('social-media-share__wrapper--icon-label', 'swiper-slide', 'd-flex', 'align-items-center');
    moveInstrumentation(row, iconLabelWrapper);

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

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );
    socialLink.append(iconWrapper);

    const iconLink = document.createElement('div');
    iconLink.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    const socialIconPicture = socialIconCell.querySelector('picture');
    if (socialIconPicture) {
      const img = socialIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '50' }]);
      iconLink.append(optimizedPic);
    }
    iconWrapper.append(iconLink);

    const labelDiv = document.createElement('div');
    labelDiv.classList.add(
      'social-media-share__wrapper--label',
      'text-center',
      'font-16',
      'leading-22',
      'text-black',
    );
    labelDiv.textContent = socialLabelCell.textContent.trim();
    socialLink.append(labelDiv);

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    socialLink.append(screenReaderOnly);

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.classList.add('social-media-share__wrapper--url');
    hiddenInput.value = socialLabelCell.textContent.trim().toLowerCase().replace(' ', '_');
    iconLabelWrapper.append(hiddenInput);

    socialMediaShareIcons.append(iconLabelWrapper);
  });

  const socialMediaShareInputButton = document.createElement('div');
  socialMediaShareInputButton.classList.add(
    'social-media-share__wrapper--input-button',
    'd-flex',
    'align-items-center',
    'mt-8',
    'justify-content-md-center',
    'flex-column',
    'flex-md-row',
  );
  socialMediaShareWrapper.append(socialMediaShareInputButton);

  const socialMediaShareInput = document.createElement('input');
  socialMediaShareInput.type = 'text';
  socialMediaShareInput.classList.add(
    'social-media-share__wrapper--input',
    'bg-white',
    'font-16',
    'leading-22',
    'px-4',
    'py-3',
    'shadow-none',
  );
  socialMediaShareInputButton.append(socialMediaShareInput);

  const socialMediaShareCopyButton = document.createElement('button');
  socialMediaShareCopyButton.classList.add(
    'social-media-share__wrapper--button',
    'font-18',
    'leading-24',
    'py-4',
    'px-8',
    'fw-bold',
    'text-white',
  );
  socialMediaShareCopyButton.textContent = 'Copy';
  socialMediaShareInputButton.append(socialMediaShareCopyButton);

  block.replaceChildren(root, swiperContainer, ctaWrapper, socialMediaShare);

  // Initialize Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
    slidesPerView: 'auto',
    spaceBetween: 34,
    loop: swiperContainer.dataset.loop === 'true',
    navigation: {
      prevEl: prevButton,
      nextEl: nextButton,
    },
    pagination: {
      el: pagination,
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });
}
