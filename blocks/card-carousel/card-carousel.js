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
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    titleRow,
    subtitleRow,
    carouselNavPrevIconRow,
    carouselNavNextIconRow,
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = children;

  const section = document.createElement('section');
  section.classList.add('card-carousel');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');

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
  title.innerHTML = titleRow.firstElementChild.innerHTML;
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
  subtitle.innerHTML = subtitleRow.firstElementChild.innerHTML;
  container.append(subtitle);

  section.append(container);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add(
    'card-carousel__swiper',
    'swiper',
    'container',
    'gx-0',
  );
  swiperContainer.setAttribute('data-loop', 'true');

  const swiperWrapperOuter = document.createElement('div');
  swiperWrapperOuter.classList.add(
    'card-carousel__swiper--container',
    'mt-8',
    'mt-sm-10',
  );

  const popularRecipeSection = document.createElement('section');
  popularRecipeSection.classList.add('popular-recipe', 'slide-in-anim');

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add(
    'popular-recipe__container',
    'overflow-hidden',
    'swiper-initialized',
    'swiper-horizontal',
    'swiper-backface-hidden',
  );
  popularRecipeContainer.setAttribute('data-swiper-init-async', 'true');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');

  const socialMediaShareItems = [];
  const recipeCards = [];

  itemRows.forEach((row) => {
    // Recipe Card item detection
    const cells = [...row.children];
    if (cells.length === 13) {
      recipeCards.push(row);
    }
    // Social Media Share Item detection
    else if (cells.length === 3) {
      socialMediaShareItems.push(row);
    }
  });

  recipeCards.forEach((row) => {
    const [
      recipeLinkCell,
      imageCell,
      imageAltCell,
      tagCell,
      tagIconCell,
      titleCell,
      descriptionCell,
      waveDividerCell,
      timeIconCell,
      timeTextCell,
      servesIconCell,
      servesTextCell,
      hierarchyTreeCell,
    ] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    moveInstrumentation(row, swiperSlide);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');

    const recipeCardLink = document.createElement('a');
    recipeCardLink.classList.add(
      'recipe-card__link',
      'd-block',
      'position-relative',
    );
    recipeCardLink.href = recipeLinkCell.querySelector('a')?.href || '#';

    const imagePicture = imageCell.querySelector('picture');
    if (imagePicture) {
      const img = imagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(
        img.src,
        imageAltCell.textContent.trim(),
        false,
        [{ width: '750' }],
      );
      optimizedPic.classList.add(
        'recipe-card__image',
        'object-fit-cover',
        'w-100',
      );
      recipeCardLink.append(optimizedPic);
    }

    const recipeCardContent = document.createElement('div');
    recipeCardContent.classList.add('recipe-card__content', 'py-6');

    const recipeCardInfo = document.createElement('div');
    recipeCardInfo.classList.add(
      'recipe-card__info',
      'd-flex',
      'align-items-center',
      'justify-content-between',
    );

    const recipeCardTag = document.createElement('span');
    recipeCardTag.classList.add(
      'recipe-card__tag',
      'text-uppercase',
      'text-red-100',
      'font-14',
      'font-xl-default',
      'leading-24',
      'fw-semibold',
    );
    recipeCardTag.textContent = tagCell.textContent.trim();
    recipeCardInfo.append(recipeCardTag);

    const tagIconPicture = tagIconCell.querySelector('picture');
    if (tagIconPicture) {
      const img = tagIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      recipeCardInfo.append(optimizedPic);
    }
    recipeCardContent.append(recipeCardInfo);

    const recipeCardText = document.createElement('div');
    recipeCardText.classList.add('recipe-card__text');

    const recipeCardTitle = document.createElement('h3');
    recipeCardTitle.classList.add(
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
    recipeCardTitle.textContent = titleCell.textContent.trim();
    recipeCardText.append(recipeCardTitle);

    const recipeCardDesc = document.createElement('p');
    recipeCardDesc.classList.add(
      'recipe-card__desc',
      'font-default',
      'font-xl-18',
      'leading-24',
      'fw-medium',
      'text-dark-gray-100',
      'mt-4',
    );
    recipeCardDesc.innerHTML = descriptionCell.innerHTML;
    recipeCardText.append(recipeCardDesc);
    recipeCardContent.append(recipeCardText);

    const recipeCardWave = document.createElement('div');
    recipeCardWave.classList.add(
      'recipe-card__wave',
      'mt-11',
      'mt-xl-7',
      'w-100',
    );
    const waveDividerPicture = waveDividerCell.querySelector('picture');
    if (waveDividerPicture) {
      const img = waveDividerPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      recipeCardWave.append(optimizedPic);
    }
    recipeCardContent.append(recipeCardWave);

    const recipeCardProperties = document.createElement('ul');
    recipeCardProperties.classList.add(
      'recipe-card__properties',
      'mt-4',
      'd-flex',
      'align-items-center',
    );

    const timeProperty = document.createElement('li');
    timeProperty.classList.add(
      'recipe-card__property',
      'recipe-card__property--left',
      'd-flex',
      'align-items-center',
    );
    const timeIconPicture = timeIconCell.querySelector('picture');
    if (timeIconPicture) {
      const img = timeIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
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
    timeSpan.textContent = timeTextCell.textContent.trim();
    timeProperty.append(timeSpan);
    recipeCardProperties.append(timeProperty);

    const servesProperty = document.createElement('li');
    servesProperty.classList.add(
      'recipe-card__property',
      'recipe-card__property--right',
      'flex-fill',
      'd-flex',
      'align-items-center',
      'justify-content-end',
    );
    const servesIconPicture = servesIconCell.querySelector('picture');
    if (servesIconPicture) {
      const img = servesIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
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
    recipeCardProperties.append(servesProperty);

    recipeCardContent.append(recipeCardProperties);
    recipeCardLink.append(recipeCardContent);
    recipeCard.append(recipeCardLink);
    swiperSlide.append(recipeCard);
    swiperWrapper.append(swiperSlide);

    const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRoot) {
      // Create a temporary div to hold the hierarchy content and apply classes
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
      moveInstrumentation(hierarchyTreeCell, tempDiv);

      // Apply classes to nested elements as per ORIGINAL HTML if needed for styling
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('nav-menu-list'));
      tempDiv.querySelectorAll('li').forEach(li => li.classList.add('nav-menu-item', 'list-item'));
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-link'));

      // If this hierarchy needs to be rendered, append it to a suitable parent.
      // For now, as per the comment, it's not rendered directly in the card.
      // We ensure instrumentation is moved and the content is processed correctly.
      // If it needs to be displayed, e.g., in a modal, the tempDiv can be used.
    }
  });

  popularRecipeContainer.append(swiperWrapper);
  popularRecipeSection.append(popularRecipeContainer);

  const popularRecipeShare = document.createElement('div');
  popularRecipeShare.classList.add('popular-recipe__share');

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
  socialMediaShareWrapper.classList.add(
    'social-media-share__wrapper',
    'bg-cream-100',
    'py-8',
    'px-3',
    'px-md-8',
  );

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

  const socialMediaShareClose = document.createElement('div');
  socialMediaShareClose.classList.add('social-media-share__wrapper--close');
  // Add event listener for the close button
  socialMediaShareClose.addEventListener('click', () => {
    socialMediaShare.classList.add('d-none');
  });
  // Assuming a close icon image is provided or hardcoded (if not authored)
  // For now, it's an empty div as no image is provided in the block structure for close.
  socialMediaShareTitleClose.append(socialMediaShareClose);
  socialMediaShareWrapper.append(socialMediaShareTitleClose);

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
    'swiper-initialized',
    'swiper-horizontal',
  );

  socialMediaShareItems.forEach((row) => {
    const [socialLinkCell, iconCell, labelCell] = [...row.children];

    const iconLabelDiv = document.createElement('div');
    iconLabelDiv.classList.add(
      'social-media-share__wrapper--icon-label',
      'swiper-slide',
      'd-flex',
      'align-items-center',
    );
    moveInstrumentation(row, iconLabelDiv);

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
    socialLink.href = socialLinkCell.querySelector('a')?.href || '#';
    socialLink.target = '_blank';

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );

    const iconLink = document.createElement('div'); // This should likely be an <a> tag if it's clickable
    iconLink.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    // iconLink.target = '_blank'; // target should be on the <a> tag

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      iconLink.append(optimizedPic);
    }
    iconWrapper.append(iconLink);
    socialLink.append(iconWrapper);

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

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    socialLink.append(screenReaderOnly);

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.classList.add('social-media-share__wrapper--url');
    // Assuming data-socialmedia-name comes from the label text or a specific field
    hiddenInput.value = labelCell.textContent.trim().toLowerCase().replace(/\s/g, '');
    iconLabelDiv.append(socialLink, hiddenInput);
    socialIconsWrapper.append(iconLabelDiv);
  });

  socialMediaShareWrapper.append(socialIconsWrapper);
  socialMediaShare.append(socialMediaShareWrapper);
  popularRecipeShare.append(socialMediaShare);
  popularRecipeSection.append(popularRecipeShare);

  swiperWrapperOuter.append(popularRecipeSection);

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
  const prevIconPicture = carouselNavPrevIconRow.querySelector('picture');
  if (prevIconPicture) {
    const img = prevIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    prevButton.append(optimizedPic);
  }
  moveInstrumentation(carouselNavPrevIconRow, prevButton);

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
  const nextIconPicture = carouselNavNextIconRow.querySelector('picture');
  if (nextIconPicture) {
    const img = nextIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    nextButton.append(optimizedPic);
  }
  moveInstrumentation(carouselNavNextIconRow, nextButton);

  swiperWrapperOuter.append(prevButton, nextButton);

  const pagination = document.createElement('div');
  pagination.classList.add(
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
  swiperWrapperOuter.append(pagination);

  swiperContainer.append(swiperWrapperOuter);
  section.append(swiperContainer);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add(
    'd-flex',
    'justify-content-center',
    'align-items-center',
    'mt-8',
  );

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
  ctaLink.href = ctaLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaLabel = document.createElement('span');
  ctaLabel.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabel.textContent = ctaLabelRow.textContent.trim();
  moveInstrumentation(ctaLabelRow, ctaLabel);
  ctaLink.append(ctaLabel);
  ctaWrapper.append(ctaLink);
  section.append(ctaWrapper);

  block.replaceChildren(section);

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
