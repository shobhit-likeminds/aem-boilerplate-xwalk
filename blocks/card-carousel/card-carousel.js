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
      subWrap.classList.add('has-sub-child'); // Assuming this class is from original HTML or a valid utility
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // Assuming 'active' is a valid class for interaction
          subWrap.classList.toggle('active'); // Assuming 'active' is a valid class for interaction
        });
      }
    }
  });
}

export default async function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    viewAllLinkRow,
    viewAllLabelRow,
    ...itemRows
  ] = [...block.children];

  const root = document.createElement('section');
  root.classList.add('card-carousel');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  root.append(container);

  if (titleRow) {
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
    );
    title.textContent = titleRow.textContent.trim();
    container.append(title);
  }

  if (subtitleRow) {
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
    );
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
  root.append(swiperContainer);

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add(
    'card-carousel__swiper--container',
    'mt-8',
    'mt-sm-10',
  );
  swiperContainer.append(swiperWrapperContainer);

  const popularRecipeSection = document.createElement('section');
  popularRecipeSection.classList.add('popular-recipe', 'slide-in-anim');
  swiperWrapperContainer.append(popularRecipeSection);

  const popularRecipeData = document.createElement('div');
  popularRecipeData.classList.add('popular-recipe__data', 'd-none');
  popularRecipeSection.append(popularRecipeData);

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add(
    'popular-recipe__container',
    'overflow-hidden',
  );
  popularRecipeSection.append(popularRecipeContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');
  popularRecipeContainer.append(swiperWrapper);

  const socialMediaShareItems = [];
  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 11) {
      // Recipe Card
      const [
        recipeLinkCell,
        recipeImageCell,
        titleCell,
        descriptionCell,
        tagCell,
        infoIconCell,
        timeIconCell,
        timeCell,
        servesIconCell,
        servesCell,
        hierarchyTreeCell,
      ] = cells;

      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      moveInstrumentation(row, swiperSlide);
      swiperWrapper.append(swiperSlide);

      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');
      swiperSlide.append(recipeCard);

      const recipeLink = document.createElement('a');
      recipeLink.classList.add(
        'recipe-card__link',
        'd-block',
        'position-relative',
      );
      recipeLink.href = recipeLinkCell?.querySelector('a')?.href || '#';
      recipeCard.append(recipeLink);

      if (recipeImageCell) {
        const picture = recipeImageCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(
            img.src,
            img.alt,
            false,
            [{ width: '750' }],
          );
          optimizedPic
            .querySelector('img')
            .classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
          recipeLink.append(optimizedPic);
        }
      }

      const recipeContent = document.createElement('div');
      recipeContent.classList.add('recipe-card__content', 'py-6');
      recipeLink.append(recipeContent);

      const recipeInfo = document.createElement('div');
      recipeInfo.classList.add(
        'recipe-card__info',
        'd-flex',
        'align-items-center',
        'justify-content-between',
      );
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
      tagSpan.textContent = tagCell?.textContent.trim() || '';
      recipeInfo.append(tagSpan);

      if (infoIconCell) {
        const picture = infoIconCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          recipeInfo.append(img);
        }
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
      recipeTitle.textContent = titleCell?.textContent.trim() || '';
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
      recipeDesc.textContent = descriptionCell?.textContent.trim() || '';
      recipeText.append(recipeDesc);

      const recipeWave = document.createElement('div');
      recipeWave.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
      recipeContent.append(recipeWave);

      const recipeProperties = document.createElement('ul');
      recipeProperties.classList.add(
        'recipe-card__properties',
        'mt-4',
        'd-flex',
        'align-items-center',
      );
      recipeContent.append(recipeProperties);

      const timeProperty = document.createElement('li');
      timeProperty.classList.add(
        'recipe-card__property',
        'recipe-card__property--left',
        'd-flex',
        'align-items-center',
      );
      recipeProperties.append(timeProperty);

      if (timeIconCell) {
        const picture = timeIconCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          timeProperty.append(img);
        }
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

      if (servesIconCell) {
        const picture = servesIconCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          servesProperty.append(img);
        }
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
      servesProperty.append(servesSpan);

      // Hierarchy tree (Rule 21)
      if (hierarchyTreeCell) {
        const tempDiv = document.createElement('div');
        moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation from the original cell
        tempDiv.innerHTML = hierarchyTreeCell.innerHTML; // Preserve original HTML structure

        const hierarchyRoot = tempDiv.querySelector('ul');
        if (hierarchyRoot) {
          const hierarchyWrapper = document.createElement('div');
          hierarchyWrapper.classList.add('nav-dropdown'); // Use original HTML class if applicable
          
          // Apply classes to nested elements as per original HTML or design
          hierarchyRoot.querySelectorAll('ul').forEach(ul => ul.classList.add('nav-menu-list', 'list-unstyled'));
          hierarchyRoot.querySelectorAll('li').forEach(li => li.classList.add('nav-menu-item', 'list-item'));
          hierarchyRoot.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-link', 'text-decoration-none', 'd-block', 'py-2', 'px-3'));

          while (hierarchyRoot.firstChild) {
            hierarchyWrapper.append(hierarchyRoot.firstChild);
          }
          recipeLink.append(hierarchyWrapper); // Or some other suitable parent
          transformNestedLists(hierarchyWrapper); // Pass the wrapper containing the transformed list
        }
      }
    } else if (cells.length === 3) {
      // Social Media Share Item
      socialMediaShareItems.push(row);
    }
  });

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

  const socialMediaTitleClose = document.createElement('div');
  socialMediaTitleClose.classList.add(
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
  socialMediaShareWrapper.append(socialMediaTitleClose);

  const socialMediaClose = document.createElement('div');
  socialMediaClose.classList.add('social-media-share__wrapper--close');
  // Add close icon if available in original HTML, otherwise leave empty
  socialMediaTitleClose.append(socialMediaClose);

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
  );
  socialMediaShareWrapper.append(socialIconsWrapper);

  const socialIconsSwiperWrapper = document.createElement('div');
  socialIconsSwiperWrapper.classList.add('swiper-wrapper');
  socialIconsWrapper.append(socialIconsSwiperWrapper);

  socialMediaShareItems.forEach((row) => {
    const [iconCell, linkCell, labelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add(
      'social-media-share__wrapper--icon-label',
      'swiper-slide',
      'd-flex',
      'align-items-center',
    );
    moveInstrumentation(row, swiperSlide);
    socialIconsSwiperWrapper.append(swiperSlide);

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
    socialLink.href = linkCell?.querySelector('a')?.href || '#';
    socialLink.target = '_blank';
    swiperSlide.append(socialLink);

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

    const iconLinkDiv = document.createElement('div');
    iconLinkDiv.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    iconDiv.append(iconLinkDiv);

    if (iconCell) {
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        iconLinkDiv.append(img);
      }
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
    socialLink.append(labelDiv);

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    socialLink.append(screenReaderOnly);

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.classList.add('social-media-share__wrapper--url');
    hiddenInput.value = labelCell?.textContent.trim().toLowerCase() || ''; // Assuming label is used for data-socialmedia-name
    swiperSlide.append(hiddenInput);
  });

  const socialPrevBtn = document.createElement('button');
  socialPrevBtn.classList.add(
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
  // Add prev icon if available
  socialIconsWrapper.append(socialPrevBtn);

  const socialNextBtn = document.createElement('button');
  socialNextBtn.classList.add(
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
  // Add next icon if available
  socialIconsWrapper.append(socialNextBtn);

  const socialInputButton = document.createElement('div');
  socialInputButton.classList.add(
    'social-media-share__wrapper--input-button',
    'd-flex',
    'align-items-center',
    'mt-8',
    'justify-content-md-center',
    'flex-column',
    'flex-md-row',
  );
  socialMediaShareWrapper.append(socialInputButton);

  const socialInput = document.createElement('input');
  socialInput.type = 'text';
  socialInput.classList.add(
    'social-media-share__wrapper--input',
    'bg-white',
    'font-16',
    'leading-22',
    'px-4',
    'py-3',
    'shadow-none',
  );
  socialInputButton.append(socialInput);

  const socialCopyButton = document.createElement('button');
  socialCopyButton.classList.add(
    'social-media-share__wrapper--button',
    'font-18',
    'leading-24',
    'py-4',
    'px-8',
    'fw-bold',
    'text-white',
  );
  socialCopyButton.textContent = 'Copy';
  socialInputButton.append(socialCopyButton);

  const prevBtn = document.createElement('button');
  prevBtn.classList.add(
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
  // Add prev icon if available
  swiperWrapperContainer.append(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.classList.add(
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
  // Add next icon if available
  swiperWrapperContainer.append(nextBtn);

  const paginationEl = document.createElement('div');
  paginationEl.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    // 'swiper-pagination-clickable', // Swiper adds these automatically
    // 'swiper-pagination-bullets',   // Swiper adds these automatically
    // 'swiper-pagination-horizontal',// Swiper adds these automatically
    'mx-auto',
    'w-fit',
  );
  swiperContainer.append(paginationEl);

  const viewAllContainer = document.createElement('div');
  viewAllContainer.classList.add(
    'd-flex',
    'justify-content-center',
    'align-items-center',
    'mt-8',
  );
  root.append(viewAllContainer);

  if (viewAllLinkRow && viewAllLabelRow) {
    const viewAllLink = document.createElement('a');
    moveInstrumentation(viewAllLinkRow, viewAllLink);
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
    viewAllLink.href = viewAllLinkRow.querySelector('a')?.href || '#';

    const viewAllLabel = document.createElement('span');
    moveInstrumentation(viewAllLabelRow, viewAllLabel);
    viewAllLabel.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    viewAllLabel.textContent = viewAllLabelRow.textContent.trim();
    viewAllLink.append(viewAllLabel);
    viewAllContainer.append(viewAllLink);
  }

  block.replaceChildren(root);

  // Initialize Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(popularRecipeContainer, {
    slidesPerView: 'auto',
    spaceBetween: 34, // Based on original HTML margin-right
    loop: swiperContainer.dataset.loop === 'true',
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 1.25, spaceBetween: 16 }, // Adjusted for smaller screens
      768: { slidesPerView: 2.25, spaceBetween: 24 },
      992: { slidesPerView: 3, spaceBetween: 34 },
    },
  });

  // eslint-disable-next-line no-undef
  new Swiper(socialIconsWrapper, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: false,
    navigation: {
      prevEl: socialPrevBtn,
      nextEl: socialNextBtn,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });
}
