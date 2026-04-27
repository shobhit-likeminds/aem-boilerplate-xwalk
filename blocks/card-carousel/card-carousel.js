import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Add classes to li and a elements from the original HTML if they exist
    li.classList.add('nav-menu-item', 'list-item'); // Assuming these are common list item classes from original HTML
    if (anchor) {
      anchor.classList.add('nav-menu-link', 'link-item'); // Assuming these are common link classes from original HTML
    }

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
      subWrap.classList.add('has-sub-child'); // From ORIGINAL HTML
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
  const children = [...block.children];

  // Fixed fields
  const [
    titleRow,
    subtitleRow,
    prevNavIconRow,
    nextNavIconRow,
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = children;

  const root = document.createElement('section');
  root.classList.add('card-carousel'); // From ORIGINAL HTML

  // Title and Subtitle
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0'); // From ORIGINAL HTML
  root.append(containerDiv);

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
    ); // From ORIGINAL HTML
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
    ); // From ORIGINAL HTML
    moveInstrumentation(subtitleRow, subtitle);
    subtitle.textContent = subtitleRow.textContent.trim();
    containerDiv.append(subtitle);
  }

  // Swiper container
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0'); // From ORIGINAL HTML
  swiperContainer.setAttribute('data-loop', 'true'); // From ORIGINAL HTML
  root.append(swiperContainer);

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10'); // From ORIGINAL HTML
  swiperContainer.append(swiperInnerContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper'); // From ORIGINAL HTML
  swiperInnerContainer.append(swiperWrapper);

  const socialMediaShareWrapper = document.createElement('div');
  socialMediaShareWrapper.classList.add('popular-recipe__share'); // From ORIGINAL HTML
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
  socialMediaShareWrapper.append(socialMediaShareSection);

  const socialMediaShareInnerWrapper = document.createElement('div');
  socialMediaShareInnerWrapper.classList.add(
    'social-media-share__wrapper',
    'bg-cream-100',
    'py-8',
    'px-3',
    'px-md-8',
  ); // From ORIGINAL HTML
  socialMediaShareSection.append(socialMediaShareInnerWrapper);

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
  ); // From ORIGINAL HTML
  socialMediaShareInnerWrapper.append(socialMediaTitleClose);

  const socialMediaCloseBtn = document.createElement('div');
  socialMediaCloseBtn.classList.add('social-media-share__wrapper--close'); // From ORIGINAL HTML
  const closeIcon = document.createElement('img');
  closeIcon.alt = 'svg file';
  // If the original HTML had a specific src for the close icon, it would be handled here.
  // For now, assuming it's a generic icon or handled by CSS.
  socialMediaCloseBtn.append(closeIcon);
  socialMediaTitleClose.append(socialMediaCloseBtn);

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
  ); // From ORIGINAL HTML
  socialMediaShareInnerWrapper.append(socialIconsWrapper);

  const socialMediaInputButton = document.createElement('div');
  socialMediaInputButton.classList.add(
    'social-media-share__wrapper--input-button',
    'd-flex',
    'align-items-center',
    'mt-8',
    'justify-content-md-center',
    'flex-column',
    'flex-md-row',
  ); // From ORIGINAL HTML
  socialMediaShareInnerWrapper.append(socialMediaInputButton);

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
  ); // From ORIGINAL HTML
  socialMediaInputButton.append(shareInput);

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
  socialMediaInputButton.append(copyButton);

  let prevBtn;
  if (prevNavIconRow) {
    prevBtn = document.createElement('button');
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
    ); // From ORIGINAL HTML
    moveInstrumentation(prevNavIconRow, prevBtn);
    const prevIcon = prevNavIconRow.querySelector('picture');
    if (prevIcon) prevBtn.append(prevIcon);
    swiperInnerContainer.append(prevBtn);
  }

  let nextBtn;
  if (nextNavIconRow) {
    nextBtn = document.createElement('button');
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
    ); // From ORIGINAL HTML
    moveInstrumentation(nextNavIconRow, nextBtn);
    const nextIcon = nextNavIconRow.querySelector('picture');
    if (nextIcon) nextBtn.append(nextIcon);
    swiperInnerContainer.append(nextBtn);
  }

  const paginationEl = document.createElement('div');
  paginationEl.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    'mx-auto',
    'w-fit',
  ); // From ORIGINAL HTML
  swiperContainer.append(paginationEl);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8'); // From ORIGINAL HTML
  root.append(ctaWrapper);

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
    ); // From ORIGINAL HTML
    const foundLink = ctaLinkRow.querySelector('a');
    if (foundLink) ctaLink.href = foundLink.href;
    moveInstrumentation(ctaLinkRow, ctaLink);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26'); // From ORIGINAL HTML
    ctaLabel.textContent = ctaLabelRow.textContent.trim();
    moveInstrumentation(ctaLabelRow, ctaLabel);
    ctaLink.append(ctaLabel);
    ctaWrapper.append(ctaLink);
  }

  // Item rows
  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 12) {
      // Recipe Card
      const [
        recipeLinkCell,
        imageCell,
        imageAltCell,
        tagCell,
        infoIconCell,
        titleCell,
        descriptionCell,
        timeIconCell,
        timeCell,
        servesIconCell,
        servesCell,
        hierarchyTreeCell,
      ] = cells;

      const slide = document.createElement('div');
      slide.classList.add('swiper-slide'); // From ORIGINAL HTML
      moveInstrumentation(row, slide);

      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100'); // From ORIGINAL HTML
      slide.append(recipeCard);

      const recipeLink = document.createElement('a');
      recipeLink.classList.add('recipe-card__link', 'd-block', 'position-relative'); // From ORIGINAL HTML
      const foundRecipeLink = recipeLinkCell.querySelector('a');
      if (foundRecipeLink) recipeLink.href = foundRecipeLink.href;
      recipeCard.append(recipeLink);

      const image = imageCell.querySelector('picture');
      if (image) {
        const img = image.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent.trim(), false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100'); // From ORIGINAL HTML
        image.replaceWith(optimizedPic);
        recipeLink.append(optimizedPic);
      }

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('recipe-card__content', 'py-6'); // From ORIGINAL HTML
      recipeLink.append(contentDiv);

      const infoDiv = document.createElement('div');
      infoDiv.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between'); // From ORIGINAL HTML
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
      ); // From ORIGINAL HTML
      tagSpan.textContent = tagCell.textContent.trim();
      infoDiv.append(tagSpan);

      const infoIcon = infoIconCell.querySelector('picture');
      if (infoIcon) infoDiv.append(infoIcon);

      const textDiv = document.createElement('div');
      textDiv.classList.add('recipe-card__text'); // From ORIGINAL HTML
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
      ); // From ORIGINAL HTML
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
      ); // From ORIGINAL HTML
      descP.textContent = descriptionCell.textContent.trim();
      textDiv.append(descP);

      const waveDiv = document.createElement('div');
      waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100'); // From ORIGINAL HTML
      contentDiv.append(waveDiv);

      const propertiesUl = document.createElement('ul');
      propertiesUl.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center'); // From ORIGINAL HTML
      contentDiv.append(propertiesUl);

      const timeLi = document.createElement('li');
      timeLi.classList.add('recipe-card__property', 'recipe-card__property--left', 'd-flex', 'align-items-center'); // From ORIGINAL HTML
      const timeIcon = timeIconCell.querySelector('picture');
      if (timeIcon) timeLi.append(timeIcon);
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
      ); // From ORIGINAL HTML
      timeSpan.textContent = timeCell.textContent.trim();
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
      ); // From ORIGINAL HTML
      const servesIcon = servesIconCell.querySelector('picture');
      if (servesIcon) servesLi.append(servesIcon);
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
      ); // From ORIGINAL HTML
      servesSpan.textContent = servesCell.textContent.trim();
      servesLi.append(servesSpan);
      propertiesUl.append(servesLi);

      const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
      if (hierarchyRoot) {
        // Create a temporary div to hold the hierarchy content and apply instrumentation
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
        moveInstrumentation(hierarchyTreeCell, tempDiv);

        // Apply classes to nested elements from ORIGINAL HTML
        tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('nav-menu-list', 'list-group'));
        tempDiv.querySelectorAll('li').forEach(li => li.classList.add('nav-menu-item', 'list-item'));
        tempDiv.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-link', 'link-item'));

        transformNestedLists(tempDiv.querySelector('ul')); // Process the nested structure

        // Append the transformed hierarchy to the recipe card, if it were to be displayed
        // For this block, it's not directly rendered in the card, but this shows the pattern.
        // If it were to be displayed, you'd integrate it into the recipeCard structure.
        // For now, we just ensure it's processed correctly.
        // recipeCard.append(tempDiv); // Example of where it might go
      }

      swiperWrapper.append(slide);
    } else if (cells.length === 3) {
      // Social Media Share Item
      const [iconCell, linkCell, labelCell] = cells;

      const socialSlide = document.createElement('div');
      socialSlide.classList.add('social-media-share__wrapper--icon-label', 'swiper-slide', 'd-flex', 'align-items-center'); // From ORIGINAL HTML
      moveInstrumentation(row, socialSlide);

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
      ); // From ORIGINAL HTML
      const foundSocialLink = linkCell.querySelector('a');
      if (foundSocialLink) socialLink.href = foundSocialLink.href;
      socialLink.target = '_blank'; // From ORIGINAL HTML
      socialSlide.append(socialLink);

      const iconWrapper = document.createElement('div');
      iconWrapper.classList.add(
        'social-media-share__wrapper--icons',
        'rounded-circle',
        'bg-white',
        'd-flex',
        'justify-content-center',
        'align-items-center',
      ); // From ORIGINAL HTML
      socialLink.append(iconWrapper);

      const iconLink = document.createElement('div'); // This div acts as a wrapper for the icon image
      iconLink.classList.add('social-media-share__wrapper--link', 'text-decoration-none'); // From ORIGINAL HTML
      iconLink.target = '_blank'; // From ORIGINAL HTML
      iconWrapper.append(iconLink);

      const socialIcon = iconCell.querySelector('picture');
      if (socialIcon) iconLink.append(socialIcon);

      const labelDiv = document.createElement('div');
      labelDiv.classList.add('social-media-share__wrapper--label', 'text-center', 'font-16', 'leading-22', 'text-black'); // From ORIGINAL HTML
      labelDiv.textContent = labelCell.textContent.trim();
      socialLink.append(labelDiv);

      const screenReaderOnly = document.createElement('span');
      screenReaderOnly.classList.add('cmp-link__screen-reader-only'); // From ORIGINAL HTML
      screenReaderOnly.textContent = 'opens in a new tab';
      socialLink.append(screenReaderOnly);

      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.classList.add('social-media-share__wrapper--url'); // From ORIGINAL HTML
      hiddenInput.value = labelCell.textContent.trim().toLowerCase().replace(/\s/g, ''); // Example: "Facebook" -> "facebook"
      socialSlide.append(hiddenInput);

      socialIconsWrapper.append(socialSlide);
    }
  });

  // Image optimization
  root.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.replaceChildren(root);

  // Initialize Swiper
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
    slidesPerView: 1, // Default for mobile
    spaceBetween: 16,
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
        slidesPerView: 4,
        spaceBetween: 34,
      },
    },
  });

  // Social media share close button event listener
  socialMediaCloseBtn.addEventListener('click', () => {
    socialMediaShareSection.classList.add('d-none');
  });

  copyButton.addEventListener('click', () => {
    shareInput.select();
    document.execCommand('copy');
  });
}
