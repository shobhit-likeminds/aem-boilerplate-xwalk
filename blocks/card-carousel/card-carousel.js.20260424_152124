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
    containerDiv.append(title);
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
    containerDiv.append(subtitle);
  }

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add(
    'card-carousel__swiper',
    'swiper',
    'container',
    'gx-0',
  );
  swiperContainer.setAttribute('data-loop', 'true');
  mainContainer.append(swiperContainer);

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add(
    'card-carousel__swiper--container',
    'mt-8',
    'mt-sm-10',
  );
  swiperContainer.append(swiperInnerContainer);

  const popularRecipeSection = document.createElement('section');
  popularRecipeSection.classList.add('popular-recipe', 'slide-in-anim');
  swiperInnerContainer.append(popularRecipeSection);

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

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');
  popularRecipeContainer.append(swiperWrapper);

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
  popularRecipeSection.append(socialMediaShareSection);

  const socialMediaShareWrapper = document.createElement('div');
  socialMediaShareWrapper.classList.add(
    'social-media-share__wrapper',
    'bg-cream-100',
    'py-8',
    'px-3',
    'px-md-8',
  );
  socialMediaShareSection.append(socialMediaShareWrapper);

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
  socialMediaShareTitleClose.append(socialMediaShareClose);

  // Add event listener for social media share close button
  socialMediaShareClose.addEventListener('click', () => {
    socialMediaShareSection.classList.add('d-none');
  });

  const socialMediaShareIcons = document.createElement('div');
  socialMediaShareIcons.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
    'swiper-initialized',
    'swiper-horizontal',
  );
  socialMediaShareWrapper.append(socialMediaShareIcons);

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

  const shareInput = document.createElement('input');
  shareInput.type = 'text';
  shareInput.classList.add(
    'social-media-share__wrapper--input',
    'bg-white',
    'font-16',
    'leading-22',
    'px-4',
    'py-3',
    'shadow-none',
  );
  socialMediaShareInputButton.append(shareInput);

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
  socialMediaShareInputButton.append(copyButton);

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
  swiperInnerContainer.append(prevButton);

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
  );
  paginationDiv.style.width = '140px';
  swiperContainer.append(paginationDiv);

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add(
    'd-flex',
    'justify-content-center',
    'align-items-center',
    'mt-8',
  );
  mainContainer.append(ctaDiv);

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

  const viewAllAnchor = viewAllLinkRow.querySelector('a');
  if (viewAllAnchor) {
    viewAllLink.href = viewAllAnchor.href;
  } else {
    viewAllLink.href = '#';
  }

  const viewAllLabelSpan = document.createElement('span');
  viewAllLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  viewAllLabelSpan.textContent = viewAllLabelRow.textContent.trim();
  viewAllLink.append(viewAllLabelSpan);

  moveInstrumentation(viewAllLinkRow, viewAllLink);
  moveInstrumentation(viewAllLabelRow, viewAllLink);
  ctaDiv.append(viewAllLink);

  itemRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection to distinguish item types
    const isRecipeCard = cells.length === 12 && cells.some(cell => cell.querySelector('picture'));
    const isSocialMediaShare = cells.length === 6 && cells.some(cell => cell.querySelector('picture'));

    if (isRecipeCard) {
      // Recipe Card
      const [
        linkCell,
        imageCell,
        imageAltCell, // eslint-disable-line no-unused-vars
        tagCell,
        tagIconCell,
        recipeTitleCell,
        descriptionCell,
        timeIconCell,
        timeCell,
        servesIconCell,
        servesCell,
        hierarchyTreeCell,
      ] = cells;

      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      moveInstrumentation(row, swiperSlide);

      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');
      swiperSlide.append(recipeCard);

      const link = document.createElement('a');
      link.classList.add('recipe-card__link', 'd-block', 'position-relative');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      } else {
        link.href = '#';
      }
      recipeCard.append(link);

      const imagePicture = imageCell.querySelector('picture');
      if (imagePicture) {
        const img = imagePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        link.append(optimizedPic);
        optimizedPic.classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
      }

      const content = document.createElement('div');
      content.classList.add('recipe-card__content', 'py-6');
      link.append(content);

      const info = document.createElement('div');
      info.classList.add(
        'recipe-card__info',
        'd-flex',
        'align-items-center', // Corrected from align-items-items
        'justify-content-between',
      );
      content.append(info);

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
      info.append(tagSpan);

      const tagIconPicture = tagIconCell.querySelector('picture');
      if (tagIconPicture) {
        const img = tagIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        info.append(optimizedPic);
      }

      const textDiv = document.createElement('div');
      textDiv.classList.add('recipe-card__text');
      content.append(textDiv);

      const title = document.createElement('h3');
      title.classList.add(
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
      title.textContent = recipeTitleCell.textContent.trim();
      textDiv.append(title);

      const description = document.createElement('p');
      description.classList.add(
        'recipe-card__desc',
        'font-default',
        'font-xl-18',
        'leading-24',
        'fw-medium',
        'text-dark-gray-100',
        'mt-4',
      );
      description.textContent = descriptionCell.textContent.trim();
      textDiv.append(description);

      const wave = document.createElement('div');
      wave.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
      content.append(wave);

      const properties = document.createElement('ul');
      properties.classList.add(
        'recipe-card__properties',
        'mt-4',
        'd-flex',
        'align-items-center',
      );
      content.append(properties);

      const timeProperty = document.createElement('li');
      timeProperty.classList.add(
        'recipe-card__property',
        'recipe-card__property--left',
        'd-flex',
        'align-items-center',
      );
      properties.append(timeProperty);

      const timeIconPicture = timeIconCell.querySelector('picture');
      if (timeIconPicture) {
        const img = timeIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
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
      properties.append(servesProperty);

      const servesIconPicture = servesIconCell.querySelector('picture');
      if (servesIconPicture) {
        const img = servesIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
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
      servesSpan.textContent = servesCell.textContent.trim();
      servesProperty.append(servesSpan);

      // Handle hierarchy-tree richtext
      const hierarchyTreeDiv = document.createElement('div');
      hierarchyTreeDiv.classList.add('recipe-card__hierarchy-tree');
      moveInstrumentation(hierarchyTreeCell, hierarchyTreeDiv);
      hierarchyTreeDiv.innerHTML = hierarchyTreeCell.innerHTML; // Preserve HTML structure

      // Apply classes to nested elements if needed (example, adjust based on actual needs)
      hierarchyTreeDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('hierarchy-list'));
      hierarchyTreeDiv.querySelectorAll('li').forEach(li => li.classList.add('hierarchy-item'));
      hierarchyTreeDiv.querySelectorAll('a').forEach(a => a.classList.add('hierarchy-link'));

      content.append(hierarchyTreeDiv); // Append hierarchy tree to content or another suitable place

      swiperWrapper.append(swiperSlide);
    } else if (isSocialMediaShare) {
      // Social Media Share
      const [
        closeIconCell,
        shareItemsCell, // eslint-disable-line no-unused-vars
        prevButtonIconCell,
        nextButtonIconCell,
        inputPlaceholderCell,
        copyButtonLabelCell,
      ] = cells;

      const closeIconPicture = closeIconCell.querySelector('picture');
      if (closeIconPicture) {
        const img = closeIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        socialMediaShareClose.append(optimizedPic);
      }

      const socialSharePrevButton = document.createElement('button');
      socialSharePrevButton.classList.add(
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
      socialMediaShareIcons.append(socialSharePrevButton);

      const prevIconPicture = prevButtonIconCell.querySelector('picture');
      if (prevIconPicture) {
        const img = prevIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        socialSharePrevButton.append(optimizedPic);
      }

      const socialShareNextButton = document.createElement('button');
      socialShareNextButton.classList.add(
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
      socialMediaShareIcons.append(socialShareNextButton);

      const nextIconPicture = nextButtonIconCell.querySelector('picture');
      if (nextIconPicture) {
        const img = nextButtonIconCell.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        socialShareNextButton.append(optimizedPic);
      }

      shareInput.placeholder = inputPlaceholderCell.textContent.trim();
      copyButton.textContent = copyButtonLabelCell.textContent.trim();
    }
  });

  block.replaceChildren(mainContainer);

  mainContainer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
