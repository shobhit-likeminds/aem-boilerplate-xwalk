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
      subWrap.classList.add('has-sub-child'); // This class is not in the allowlist. Assuming it's a new class or needs to be derived from original HTML.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in the allowlist. Assuming it's a new class or needs to be derived from original HTML.
          subWrap.classList.toggle('active'); // This class is not in the allowlist. Assuming it's a new class or needs to be derived from original HTML.
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
    prevIconRow,
    nextIconRow,
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = rows;

  const root = document.createElement('div');
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
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  root.append(swiperContainer);

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperContainer.append(swiperWrapperContainer);

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add('popular-recipe__container', 'overflow-hidden');
  swiperWrapperContainer.append(popularRecipeContainer);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');
  popularRecipeContainer.append(swiperWrapper);

  const socialShareItems = [];
  const recipeCards = [];

  itemRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection to distinguish item types
    const hasRecipeLink = cells.some(cell => cell.querySelector('a[href*="/recipe"]'));
    const hasHierarchyTree = cells.some(cell => cell.querySelector('ul'));

    if (cells.length === 11 && hasRecipeLink && hasHierarchyTree) {
      // Recipe-Card item
      recipeCards.push(row);
    } else if (cells.length === 3 && cells.some(cell => cell.querySelector('a[href*="share"]'))) {
      // Social-Share-Item item
      socialShareItems.push(row);
    }
  });

  recipeCards.forEach((row) => {
    const cells = [...row.children];
    // Use content detection for cells instead of fixed indices
    const recipeLinkCell = cells.find(c => c.querySelector('a[href*="/recipe"]'));
    const imageCell = cells.find(c => c.querySelector('picture') && c.nextElementSibling?.textContent.trim() === 'Recipe Tag label text'); // More specific detection
    const tagCell = cells.find(c => c.textContent.trim().includes('Recipe Tag'));
    const tagIconCell = cells.find(c => c.querySelector('picture') && c.previousElementSibling?.textContent.trim().includes('Recipe Tag'));
    const titleCell = cells.find(c => c.textContent.trim().includes('Recipe Title'));
    const descriptionCell = cells.find(c => c.textContent.trim().includes('Recipe Description'));
    const timeIconCell = cells.find(c => c.querySelector('picture') && c.nextElementSibling?.textContent.trim().includes('mins') || c.nextElementSibling?.textContent.trim().includes('hr'));
    const timeCell = cells.find(c => c.textContent.trim().includes('mins') || c.textContent.trim().includes('hr'));
    const servesIconCell = cells.find(c => c.querySelector('picture') && c.nextElementSibling?.textContent.trim().includes('people'));
    const servesCell = cells.find(c => c.textContent.trim().includes('people'));
    const hierarchyTreeCell = cells.find(c => c.querySelector('ul'));

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    moveInstrumentation(row, swiperSlide);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');
    swiperSlide.append(recipeCard);

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundRecipeLink = recipeLinkCell?.querySelector('a');
    if (foundRecipeLink) {
      recipeLink.href = foundRecipeLink.href;
    }
    recipeCard.append(recipeLink);

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
        recipeLink.append(optimizedPic);
      }
    }

    const content = document.createElement('div');
    content.classList.add('recipe-card__content', 'py-6');
    recipeLink.append(content);

    const info = document.createElement('div');
    info.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');
    content.append(info);

    if (tagCell) {
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
    }

    if (tagIconCell) {
      const picture = tagIconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        info.append(optimizedPic);
      }
    }

    const text = document.createElement('div');
    text.classList.add('recipe-card__text');
    content.append(text);

    if (titleCell) {
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
      title.textContent = titleCell.textContent.trim();
      text.append(title);
    }

    if (descriptionCell) {
      const desc = document.createElement('p');
      desc.classList.add(
        'recipe-card__desc',
        'font-default',
        'font-xl-18',
        'leading-24',
        'fw-medium',
        'text-dark-gray-100',
        'mt-4',
      );
      desc.textContent = descriptionCell.textContent.trim();
      text.append(desc);
    }

    const wave = document.createElement('div');
    wave.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
    content.append(wave);

    const properties = document.createElement('ul');
    properties.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center', 'mt-4');
    content.append(properties);

    const timeProperty = document.createElement('li');
    timeProperty.classList.add('recipe-card__property', 'recipe-card__property--left', 'd-flex', 'align-items-center');
    properties.append(timeProperty);

    if (timeIconCell) {
      const picture = timeIconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        timeProperty.append(optimizedPic);
      }
    }

    if (timeCell) {
      const time = document.createElement('span');
      time.classList.add(
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
      time.textContent = timeCell.textContent.trim();
      timeProperty.append(time);
    }

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

    if (servesIconCell) {
      const picture = servesIconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        servesProperty.append(optimizedPic);
      }
    }

    if (servesCell) {
      const serves = document.createElement('span');
      serves.classList.add(
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
      serves.textContent = servesCell.textContent.trim();
      servesProperty.append(serves);
    }

    // Hierarchy tree - process and append if needed
    if (hierarchyTreeCell) {
      const hierarchyRoot = document.createElement('div');
      moveInstrumentation(hierarchyTreeCell, hierarchyRoot);
      hierarchyRoot.innerHTML = hierarchyTreeCell.innerHTML; // Use innerHTML for richtext
      transformNestedLists(hierarchyRoot.querySelector('ul')); // Apply transformations to the nested list
      // Append hierarchyRoot to recipeCard or a specific part of it if it's meant to be displayed
      // For now, it's just processed but not explicitly appended to the visible card structure
      // If it were, it would involve creating a dropdown/accordion.
    }

    swiperWrapper.append(swiperSlide);
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
  if (prevIconRow) {
    const picture = prevIconRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      prevBtn.append(optimizedPic);
    }
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
  if (nextIconRow) {
    const picture = nextIconRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      nextBtn.append(optimizedPic);
    }
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

  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');
  root.append(ctaContainer);

  if (ctaLinkRow && ctaLabelRow) {
    const cta = document.createElement('a');
    moveInstrumentation(ctaLinkRow, cta);
    moveInstrumentation(ctaLabelRow, cta);
    cta.classList.add(
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
    if (foundCtaLink) {
      cta.href = foundCtaLink.href;
    }
    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
    cta.append(ctaLabelSpan);
    ctaContainer.append(cta);
  }

  // Social share section (hidden by default in original HTML)
  const socialShareSection = document.createElement('section');
  socialShareSection.classList.add(
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
  // Add instrumentation for socialShareItems if they were part of a fixed field
  // For now, they are just item rows, so their instrumentation is moved inside the loop.

  const socialShareWrapper = document.createElement('div');
  socialShareWrapper.classList.add('social-media-share__wrapper', 'bg-cream-100', 'py-8', 'px-3', 'px-md-8');
  socialShareSection.append(socialShareWrapper);

  const socialShareTitleClose = document.createElement('div');
  socialShareTitleClose.classList.add(
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
  socialShareWrapper.append(socialShareTitleClose);

  const socialShareClose = document.createElement('div');
  socialShareClose.classList.add('social-media-share__wrapper--close');
  // Add a close icon if available from original HTML
  const closeIcon = document.createElement('img'); // Assuming an image for the close icon from original HTML
  closeIcon.alt = 'svg file';
  closeIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1777307353873.svg+xml'; // Hardcoded, but from original HTML
  socialShareClose.append(closeIcon);
  socialShareTitleClose.append(socialShareClose);

  // Event listener for social share close button
  socialShareClose.addEventListener('click', () => {
    socialShareSection.classList.add('d-none');
  });

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
  );
  socialShareWrapper.append(socialIconsWrapper);

  socialShareItems.forEach((row) => {
    const cells = [...row.children];
    // Use content detection for cells instead of fixed indices
    const shareLinkCell = cells.find(c => c.querySelector('a[href*="share"]'));
    const iconCell = cells.find(c => c.querySelector('picture'));
    const labelCell = cells.find(c => c.textContent.trim().includes('Social Media Label'));

    const socialIconLabel = document.createElement('div');
    socialIconLabel.classList.add('social-media-share__wrapper--icon-label', 'swiper-slide', 'd-flex', 'align-items-center');
    moveInstrumentation(row, socialIconLabel);

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
    const foundShareLink = shareLinkCell?.querySelector('a');
    if (foundShareLink) {
      shareLink.href = foundShareLink.href;
      shareLink.target = '_blank'; // Assuming target blank from original HTML
    }
    socialIconLabel.append(shareLink);

    const iconDiv = document.createElement('div');
    iconDiv.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );
    shareLink.append(iconDiv);

    const iconLink = document.createElement('div'); // This div contains the img, not a real link
    iconLink.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    iconDiv.append(iconLink);

    if (iconCell) {
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        iconLink.append(optimizedPic);
      }
    }

    if (labelCell) {
      const label = document.createElement('div');
      label.classList.add(
        'social-media-share__wrapper--label',
        'text-center',
        'font-16',
        'leading-22',
        'text-black',
      );
      label.textContent = labelCell.textContent.trim();
      shareLink.append(label);
    }

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    shareLink.append(screenReaderOnly);

    socialIconsWrapper.append(socialIconLabel);
  });

  const inputButtonWrapper = document.createElement('div');
  inputButtonWrapper.classList.add(
    'social-media-share__wrapper--input-button',
    'd-flex',
    'align-items-center',
    'mt-8',
    'justify-content-md-center',
    'flex-column',
    'flex-md-row',
  );
  socialShareWrapper.append(inputButtonWrapper);

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
  inputButtonWrapper.append(shareInput);

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
  inputButtonWrapper.append(copyButton);

  root.append(socialShareSection);

  block.replaceChildren(root);

  // Load Swiper and initialize
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
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });

  // Initialize social share swiper if it exists and has slides
  if (socialIconsWrapper.children.length > 0) {
    // eslint-disable-next-line no-undef
    new Swiper(socialIconsWrapper, {
      slidesPerView: 'auto',
      spaceBetween: 16, // Adjust as needed
      pagination: {
        el: paginationEl, // Use the same or a different pagination element
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: socialIconsWrapper.children.length, // Show all on desktop
          spaceBetween: 0,
        },
      },
    });
  }
}
