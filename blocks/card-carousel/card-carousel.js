import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.classList.add('recipe-card__hierarchy-list'); // Add class to the root UL
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('recipe-card__hierarchy-item'); // Add class to LI
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      anchor.classList.add('recipe-card__hierarchy-link'); // Add class to A
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.classList.add('recipe-card__hierarchy-text'); // Add class to SPAN
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

export default async function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    prevButtonIconRow,
    nextButtonIconRow,
    viewAllLinkRow,
    viewAllLabelRow,
    ...itemRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  moveInstrumentation(titleRow, container);

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
  subtitle.textContent = subtitleRow.textContent.trim();
  container.append(subtitle);
  section.append(container);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const popularRecipeSection = document.createElement('section');
  popularRecipeSection.classList.add('popular-recipe', 'slide-in-anim');

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add('popular-recipe__container', 'overflow-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');

  const socialMediaShareItems = [];
  const recipeCards = [];

  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 13) {
      // Recipe Card item
      recipeCards.push(row);
    } else if (cells.length === 3) {
      // Social Media Share Item
      socialMediaShareItems.push(row);
    }
  });

  recipeCards.forEach((row) => {
    const [
      recipeLinkCell,
      mainImageCell,
      mainImageAltCell,
      tagCell,
      infoIconCell,
      titleCell,
      descriptionCell,
      waveImageCell,
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

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundRecipeLink = recipeLinkCell.querySelector('a');
    if (foundRecipeLink) {
      recipeLink.href = foundRecipeLink.href;
    }

    const mainImagePicture = mainImageCell.querySelector('picture');
    if (mainImagePicture) {
      const img = mainImagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(
        img.src,
        mainImageAltCell.textContent.trim(),
        false,
        [{ width: '750' }],
      );
      optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
      recipeLink.append(optimizedPic);
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('recipe-card__content', 'py-6');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');

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
      infoDiv.append(img);
    }
    contentDiv.append(infoDiv);

    const textDiv = document.createElement('div');
    textDiv.classList.add('recipe-card__text');

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
    descriptionP.textContent = descriptionCell.textContent.trim();
    textDiv.append(descriptionP);
    contentDiv.append(textDiv);

    const waveDiv = document.createElement('div');
    waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
    const waveImagePicture = waveImageCell.querySelector('picture');
    if (waveImagePicture) {
      const img = waveImagePicture.querySelector('img');
      waveDiv.append(img);
    }
    contentDiv.append(waveDiv);

    const propertiesUl = document.createElement('ul');
    propertiesUl.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center');

    const timeLi = document.createElement('li');
    timeLi.classList.add('recipe-card__property', 'recipe-card__property--left', 'd-flex', 'align-items-center');
    const timeIconPicture = timeIconCell.querySelector('picture');
    if (timeIconPicture) {
      const img = timeIconPicture.querySelector('img');
      timeLi.append(img);
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
    timeLi.append(timeSpan);
    propertiesUl.append(timeLi);

    const servesLi = document.createElement('li');
    servesLi.classList.add(
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
      servesLi.append(img);
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
    servesLi.append(servesSpan);
    propertiesUl.append(servesLi);
    contentDiv.append(propertiesUl);

    recipeLink.append(contentDiv);
    recipeCard.append(recipeLink);
    swiperSlide.append(recipeCard);
    swiperWrapper.append(swiperSlide);

    const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
    if (hierarchyRoot) {
      const hierarchyDiv = document.createElement('div');
      hierarchyDiv.classList.add('recipe-card__hierarchy');
      moveInstrumentation(hierarchyTreeCell, hierarchyDiv);
      hierarchyDiv.innerHTML = hierarchyTreeCell.innerHTML; // Use innerHTML to preserve structure
      transformNestedLists(hierarchyDiv.querySelector('ul'));
      recipeCard.append(hierarchyDiv); // Append hierarchy to recipeCard
    }
  });

  popularRecipeContainer.append(swiperWrapper);
  popularRecipeSection.append(popularRecipeContainer);
  swiperInnerContainer.append(popularRecipeSection);

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
  const prevIconPicture = prevButtonIconRow.querySelector('picture');
  if (prevIconPicture) {
    const img = prevIconPicture.querySelector('img');
    prevBtn.append(img);
  }
  moveInstrumentation(prevButtonIconRow, prevBtn);
  swiperInnerContainer.append(prevBtn);

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
  const nextIconPicture = nextButtonIconRow.querySelector('picture');
  if (nextIconPicture) {
    const img = nextIconPicture.querySelector('img');
    nextBtn.append(img);
  }
  moveInstrumentation(nextButtonIconRow, nextBtn);
  swiperInnerContainer.append(nextBtn);

  swiperContainer.append(swiperInnerContainer);

  const paginationEl = document.createElement('div');
  paginationEl.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    'mx-auto',
    'w-fit',
  );
  swiperContainer.append(paginationEl);
  section.append(swiperContainer);

  const viewAllWrapper = document.createElement('div');
  viewAllWrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');
  moveInstrumentation(viewAllLinkRow, viewAllWrapper);
  moveInstrumentation(viewAllLabelRow, viewAllWrapper);

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
  const foundViewAllLink = viewAllLinkRow.querySelector('a');
  if (foundViewAllLink) {
    viewAllLink.href = foundViewAllLink.href;
  }

  const viewAllLabelSpan = document.createElement('span');
  viewAllLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  viewAllLabelSpan.textContent = viewAllLabelRow.textContent.trim();
  viewAllLink.append(viewAllLabelSpan);
  viewAllWrapper.append(viewAllLink);
  section.append(viewAllWrapper);

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

  const socialMediaShareWrapper = document.createElement('div');
  socialMediaShareWrapper.classList.add('social-media-share__wrapper', 'bg-cream-100', 'py-8', 'px-3', 'px-md-8');

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

  const closeDiv = document.createElement('div');
  closeDiv.classList.add('social-media-share__wrapper--close');
  // Assuming the close icon comes from the model if needed, otherwise it's a fixed asset.
  // For now, it's not in the model, so we'll leave it as a placeholder or load a default.
  // If it were in the model, it would be another row similar to prevButtonIcon.
  const closeIcon = document.createElement('img');
  closeIcon.alt = 'Close button';
  // This image is hardcoded in the original HTML, but not in the EDS model.
  // If it needs to be authorable, a new field should be added to the model.
  // For now, we'll omit the src to avoid hardcoding.
  closeDiv.append(closeIcon);
  titleCloseDiv.append(closeDiv);
  socialMediaShareWrapper.append(titleCloseDiv);

  const socialIconsDiv = document.createElement('div');
  socialIconsDiv.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
    'swiper', // Add swiper class for social share carousel
  );

  const socialIconsSwiperWrapper = document.createElement('div');
  socialIconsSwiperWrapper.classList.add('swiper-wrapper');
  socialIconsDiv.append(socialIconsSwiperWrapper);

  socialMediaShareItems.forEach((row) => {
    const [socialLinkCell, iconCell, labelCell] = [...row.children];
    // moveInstrumentation(row, socialIconsDiv); // Move instrumentation to the container for these items

    const iconLabelDiv = document.createElement('div');
    iconLabelDiv.classList.add('social-media-share__wrapper--icon-label', 'swiper-slide', 'd-flex', 'align-items-center');
    moveInstrumentation(row, iconLabelDiv); // Move instrumentation to the individual slide

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
    if (foundSocialLink) {
      socialLink.href = foundSocialLink.href;
      socialLink.target = '_blank';
    }

    const iconsWrapper = document.createElement('div');
    iconsWrapper.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );

    const linkInnerDiv = document.createElement('div');
    linkInnerDiv.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      linkInnerDiv.append(img);
    }
    iconsWrapper.append(linkInnerDiv);
    socialLink.append(iconsWrapper);

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
    hiddenInput.value = labelCell.textContent.trim().toLowerCase().replace(/\s/g, ''); // Derive from label
    iconLabelDiv.append(socialLink, hiddenInput);
    socialIconsSwiperWrapper.append(iconLabelDiv); // Append to the new swiper wrapper
  });

  socialMediaShareWrapper.append(socialIconsDiv);

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
  inputField.value = window.location.href; // Default to current URL for sharing
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
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(inputField.value);
  });
  inputButtonDiv.append(copyButton);
  socialMediaShareWrapper.append(inputButtonDiv);
  socialMediaShareSection.append(socialMediaShareWrapper);

  block.replaceChildren(section, socialMediaShareSection);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Initialize Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
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
      576: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 34,
      },
      992: {
        slidesPerView: 3, // Assuming 3 for larger screens based on original
        spaceBetween: 34,
      },
    },
  });

  // Social media share carousel (if it exists and has slides)
  const socialShareSwiper = socialIconsSwiperWrapper.querySelectorAll('.swiper-slide').length > 0
    ? new Swiper(socialIconsDiv, { // Initialize Swiper on socialIconsDiv (which has 'swiper' class)
      slidesPerView: 'auto',
      spaceBetween: 16, // Adjust as needed
      loop: false,
      breakpoints: {
        576: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
      },
    })
    : null;

  // Toggle social share modal
  const shareTriggers = block.querySelectorAll('.recipe-card__info img'); // Assuming the info icon triggers share
  shareTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      socialMediaShareSection.classList.toggle('d-none');
      if (!socialMediaShareSection.classList.contains('d-none') && socialShareSwiper) {
        socialShareSwiper.update(); // Update swiper to ensure correct layout on open
      }
    });
  });

  closeDiv.addEventListener('click', () => {
    socialMediaShareSection.classList.add('d-none');
  });

  socialMediaShareSection.addEventListener('click', (e) => {
    if (e.target === socialMediaShareSection) {
      socialMediaShareSection.classList.add('d-none');
    }
  });
}
