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
      subWrap.classList.add('has-sub-child'); // Use original HTML class if available, otherwise generic
      li.classList.add('nav-menu-item', 'list-item'); // Added from original HTML for nested list items
      if (anchor) anchor.classList.add('nav-menu-link'); // Added from original HTML for nested list links
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
  const rows = [...block.children];

  const [
    titleRow,
    subtitleRow,
    prevButtonIconRow,
    nextButtonIconRow,
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = rows;

  const recipeCards = itemRows.filter((row) => row.children.length === 13);
  const socialMediaShareItems = itemRows.filter((row) => row.children.length === 3);

  const section = document.createElement('section');
  section.classList.add('card-carousel'); // Assuming section wrapper from original HTML

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(containerDiv);

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

  const swiperSection = document.createElement('div');
  swiperSection.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperSection.dataset.loop = 'true'; // From original HTML
  section.append(swiperSection);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperSection.append(swiperContainer);

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add('popular-recipe__container', 'overflow-hidden');
  swiperContainer.append(popularRecipeContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');
  popularRecipeContainer.append(swiperWrapper);

  recipeCards.forEach((row) => {
    const [
      linkCell,
      imageCell,
      imageAltCell,
      tagCell,
      infoIconCell,
      titleCell,
      descriptionCell,
      waveImageCell,
      timeIconCell,
      timeCell,
      servesIconCell,
      servesCell,
      hierarchyTreeCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    moveInstrumentation(row, slide);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');
    slide.append(recipeCard);

    const link = document.createElement('a');
    link.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) link.href = foundLink.href;
    recipeCard.append(link);

    const image = imageCell.querySelector('picture');
    if (image) {
      const optimizedPic = createOptimizedPicture(image.querySelector('img').src, imageAltCell.textContent.trim(), false, [{ width: '750' }]);
      moveInstrumentation(image.querySelector('img'), optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
      link.append(optimizedPic);
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('recipe-card__content', 'py-6');
    link.append(contentDiv);

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

    const infoIcon = infoIconCell.querySelector('picture');
    if (infoIcon) {
      infoDiv.append(infoIcon);
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

    const waveImage = waveImageCell.querySelector('picture');
    if (waveImage) {
      const waveDiv = document.createElement('div');
      waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
      waveDiv.append(waveImage);
      contentDiv.append(waveDiv);
    }

    const propertiesUl = document.createElement('ul');
    propertiesUl.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center', 'mt-4');
    contentDiv.append(propertiesUl);

    const timeLi = document.createElement('li');
    timeLi.classList.add('recipe-card__property', 'recipe-card__property--left', 'd-flex', 'align-items-center');
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
    );
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
    );
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
    );
    servesSpan.textContent = servesCell.textContent.trim();
    servesLi.append(servesSpan);
    propertiesUl.append(servesLi);

    const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRoot) {
      const hierarchyWrapper = document.createElement('div');
      hierarchyWrapper.classList.add('recipe-card__hierarchy'); // Custom class for hierarchy
      moveInstrumentation(hierarchyTreeCell, hierarchyWrapper); // Move instrumentation for the richtext cell
      hierarchyWrapper.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
      contentDiv.append(hierarchyWrapper);
    }

    swiperWrapper.append(slide);
  });

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
  prevBtn.innerHTML = prevButtonIconRow.querySelector('picture')?.outerHTML || '‹'; // Fallback to unicode
  moveInstrumentation(prevButtonIconRow, prevBtn);
  swiperContainer.append(prevBtn);

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
  nextBtn.innerHTML = nextButtonIconRow.querySelector('picture')?.outerHTML || '›'; // Fallback to unicode
  moveInstrumentation(nextButtonIconRow, nextBtn);
  swiperContainer.append(nextBtn);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    'mx-auto',
    'w-fit',
  );
  swiperSection.append(paginationDiv);

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

  const ctaLabel = document.createElement('span');
  ctaLabel.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabel.textContent = ctaLabelRow.textContent.trim();
  moveInstrumentation(ctaLabelRow, ctaLabel);
  ctaLink.append(ctaLabel);
  ctaWrapper.append(ctaLink);

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
  socialMediaShareSection.append(socialMediaShareWrapper);

  const shareTitleClose = document.createElement('div');
  shareTitleClose.classList.add(
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
  socialMediaShareWrapper.append(shareTitleClose);

  const closeButton = document.createElement('div');
  closeButton.classList.add('social-media-share__wrapper--close');
  // Replaced hardcoded SVG with the one from original HTML
  closeButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1777314378617.svg+xml"/>';
  shareTitleClose.append(closeButton);

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
  );
  socialMediaShareWrapper.append(socialIconsWrapper);

  socialMediaShareItems.forEach((row) => {
    const [linkCell, iconCell, labelCell] = [...row.children];
    moveInstrumentation(row, socialIconsWrapper); // Move instrumentation for each social item row

    const iconLabelDiv = document.createElement('div');
    iconLabelDiv.classList.add('social-media-share__wrapper--icon-label', 'swiper-slide', 'd-flex', 'align-items-center');
    socialIconsWrapper.append(iconLabelDiv);

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
    const foundSocialLink = linkCell.querySelector('a');
    if (foundSocialLink) {
      socialLink.href = foundSocialLink.href;
      socialLink.target = '_blank';
    }
    iconLabelDiv.append(socialLink);

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

    const iconLinkDiv = document.createElement('div');
    iconLinkDiv.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    const iconPic = iconCell.querySelector('picture');
    if (iconPic) iconLinkDiv.append(iconPic);
    iconWrapper.append(iconLinkDiv);

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
  });

  const shareInputButton = document.createElement('div');
  shareInputButton.classList.add(
    'social-media-share__wrapper--input-button',
    'd-flex',
    'align-items-center',
    'mt-8',
    'justify-content-md-center',
    'flex-column',
    'flex-md-row',
  );
  socialMediaShareWrapper.append(shareInputButton);

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
  shareInputButton.append(shareInput);

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
  shareInputButton.append(copyButton);

  // Event listener for social media share close button
  closeButton.addEventListener('click', () => {
    socialMediaShareSection.classList.add('d-none');
  });

  // Event listener for copy button
  copyButton.addEventListener('click', () => {
    shareInput.select();
    document.execCommand('copy');
    // Optionally provide user feedback
  });

  section.append(socialMediaShareSection);

  block.replaceChildren(section);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Load Swiper and initialize
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperSection, {
    slidesPerView: 'auto',
    spaceBetween: 34, // From original HTML margin-right on swiper-slide
    loop: swiperSection.dataset.loop === 'true',
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: paginationDiv,
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });
}
