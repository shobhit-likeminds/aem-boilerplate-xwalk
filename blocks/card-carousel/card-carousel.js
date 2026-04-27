import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Add classes from ORIGINAL HTML to <li> and <a> elements
    li.classList.add('nav-menu-item', 'list-item'); // Assuming these classes from ORIGINAL HTML for nested lists
    if (anchor) {
      anchor.classList.add('nav-menu-link', 'link'); // Assuming these classes from ORIGINAL HTML
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
      subWrap.classList.add('has-sub-child'); // Class from ORIGINAL HTML
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

  const [
    titleRow,
    subtitleRow,
    ctaLinkRow,
    ctaLabelRow,
    carouselPrevIconRow,
    carouselNextIconRow,
    ...itemRows
  ] = children;

  const recipeCards = itemRows.filter((row) => row.children.length === 13);
  const socialShareItems = itemRows.filter((row) => row.children.length === 5); // This filter is correct for content detection

  const section = document.createElement('section');
  section.classList.add('card-carousel');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

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

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.dataset.loop = 'true'; // From ORIGINAL HTML

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperContainer.append(swiperWrapperContainer);

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add('popular-recipe__container', 'overflow-hidden');
  popularRecipeContainer.dataset.swiperInitAsync = 'true';
  swiperWrapperContainer.append(popularRecipeContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');
  popularRecipeContainer.append(swiperWrapper);

  recipeCards.forEach((row) => {
    const [
      recipeLinkCell,
      recipeImageCell,
      recipeImageAltCell,
      tagCell,
      tagIconCell,
      titleCell,
      descriptionCell,
      waveImageCell,
      timeIconCell,
      timeCell,
      servesIconCell,
      servesCell,
      hierarchyTreeCell,
    ] = [...row.children]; // CORRECT: named destructuring for fixed schema

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

    const recipeImage = recipeImageCell.querySelector('picture');
    if (recipeImage) {
      const img = recipeImage.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, recipeImageAltCell.textContent.trim(), false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      recipeLink.append(optimizedPic);
      optimizedPic.classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
    }

    const content = document.createElement('div');
    content.classList.add('recipe-card__content', 'py-6');
    recipeLink.append(content);

    const info = document.createElement('div');
    info.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');
    content.append(info);

    const tag = document.createElement('span');
    tag.classList.add(
      'recipe-card__tag',
      'text-uppercase',
      'text-red-100',
      'font-14',
      'font-xl-default',
      'leading-24',
      'fw-semibold',
    );
    tag.textContent = tagCell.textContent.trim();
    info.append(tag);

    const tagIcon = tagIconCell.querySelector('picture');
    if (tagIcon) {
      const img = tagIcon.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      info.append(optimizedPic);
    }

    const text = document.createElement('div');
    text.classList.add('recipe-card__text');
    content.append(text);

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
    recipeTitle.textContent = titleCell.textContent.trim();
    text.append(recipeTitle);

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
    text.append(description);

    const waveImage = waveImageCell.querySelector('picture');
    if (waveImage) {
      const img = waveImage.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
      content.append(optimizedPic);
    }

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

    const timeIcon = timeIconCell.querySelector('picture');
    if (timeIcon) {
      const img = timeIcon.querySelector('img');
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

    const servesIcon = servesIconCell.querySelector('picture');
    if (servesIcon) {
      const img = servesIcon.querySelector('img');
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

    // Richtext field handling
    const hierarchyWrapper = document.createElement('div');
    hierarchyWrapper.classList.add('recipe-card__hierarchy'); // Use a suitable class from ORIGINAL HTML if available
    moveInstrumentation(hierarchyTreeCell, hierarchyWrapper); // Move instrumentation for the richtext cell

    // Use innerHTML to preserve nested structure
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = hierarchyTreeCell.innerHTML;

    const hierarchyRoot = tempDiv.querySelector('ul');
    if (hierarchyRoot) {
      // Apply classes to nested elements as per ORIGINAL HTML
      hierarchyRoot.classList.add('nav-menu'); // Example class
      hierarchyRoot.querySelectorAll('li').forEach(li => li.classList.add('nav-menu-item', 'list-item'));
      hierarchyRoot.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-link', 'link'));

      transformNestedLists(hierarchyRoot);
      hierarchyWrapper.append(hierarchyRoot);
      content.append(hierarchyWrapper);
    }

    swiperWrapper.append(swiperSlide);
  });

  section.append(swiperContainer);

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
  const prevIcon = carouselPrevIconRow.querySelector('picture');
  if (prevIcon) {
    const img = prevIcon.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    prevBtn.append(optimizedPic);
  }
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
  const nextIcon = carouselNextIconRow.querySelector('picture');
  if (nextIcon) {
    const img = nextIcon.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    nextBtn.append(optimizedPic);
  }
  swiperWrapperContainer.append(nextBtn);

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

  block.replaceChildren(section);

  // Swiper Initialization
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
    slidesPerView: 'auto',
    spaceBetween: 34, // From ORIGINAL HTML margin-right on swiper-slide
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
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });
}
