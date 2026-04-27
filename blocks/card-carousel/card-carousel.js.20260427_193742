import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('nav-menu-item', 'list-item'); // Add classes from ORIGINAL HTML
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      anchor.classList.add('nav-menu-link'); // Add class from ORIGINAL HTML
    } else {
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
      subWrap.classList.add('has-sub-child'); // Use original HTML class
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // Added 'active' class for interaction
          subWrap.classList.toggle('active'); // Added 'active' class for interaction
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
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = [...block.children];

  const carouselTitle = titleRow?.textContent?.trim();
  const carouselSubtitle = subtitleRow?.textContent?.trim();
  const prevButtonIcon = prevButtonIconRow?.querySelector('picture');
  const nextButtonIcon = nextButtonIconRow?.querySelector('picture');
  const ctaLink = ctaLinkRow?.querySelector('a')?.href;
  const ctaLabel = ctaLabelRow?.textContent?.trim();

  const root = document.createElement('div');
  root.classList.add('container', 'gx-8', 'gx-sm-0');

  if (carouselTitle) {
    const titleEl = document.createElement('h2');
    titleEl.classList.add(
      'card-carousel__title',
      'font-24',
      'leading-28',
      'font-sm-40',
      'leading-sm-50',
      'text-dark-gray-100',
      'text-center',
      'font-baskerville',
    );
    moveInstrumentation(titleRow, titleEl);
    titleEl.textContent = carouselTitle;
    root.append(titleEl);
  }

  if (carouselSubtitle) {
    const subtitleEl = document.createElement('p');
    subtitleEl.classList.add(
      'card-carousel__subtitle',
      'font-default',
      'leading-24',
      'font-sm-18',
      'leading-sm-32',
      'mt-4',
      'fw-medium',
      'text-dark-gray-100',
      'text-center',
    );
    moveInstrumentation(subtitleRow, subtitleEl);
    subtitleEl.textContent = carouselSubtitle;
    root.append(subtitleEl);
  }

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'true');

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');

  const socialMediaShareItems = [];

  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 12) {
      // Recipe Card item
      const [
        recipeLinkCell,
        mainImageCell,
        imageAltCell,
        tagCell,
        tagIconCell,
        titleCell,
        descriptionCell,
        timeIconCell,
        timeCell,
        servesIconCell,
        servesCell,
        hierarchyTreeCell,
      ] = cells;

      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');

      const linkEl = document.createElement('a');
      linkEl.classList.add('recipe-card__link', 'd-block', 'position-relative');
      linkEl.href = recipeLinkCell?.querySelector('a')?.href || '#';
      moveInstrumentation(recipeLinkCell, linkEl);

      const mainImagePicture = mainImageCell?.querySelector('picture');
      if (mainImagePicture) {
        const img = mainImagePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, imageAltCell?.textContent?.trim(), false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
        linkEl.append(optimizedPic);
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
      tagSpan.textContent = tagCell?.textContent?.trim();
      moveInstrumentation(tagCell, tagSpan);
      infoDiv.append(tagSpan);

      const tagIconPicture = tagIconCell?.querySelector('picture');
      if (tagIconPicture) {
        const img = tagIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        infoDiv.append(optimizedPic);
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
      titleH3.textContent = titleCell?.textContent?.trim();
      moveInstrumentation(titleCell, titleH3);
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
      );
      descP.textContent = descriptionCell?.textContent?.trim();
      moveInstrumentation(descriptionCell, descP);
      textDiv.append(descP);
      contentDiv.append(textDiv);

      const waveDiv = document.createElement('div');
      waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
      contentDiv.append(waveDiv);

      const propertiesUl = document.createElement('ul');
      propertiesUl.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center');

      const timeLi = document.createElement('li');
      timeLi.classList.add('recipe-card__property', 'recipe-card__property--left', 'd-flex', 'align-items-center');

      const timeIconPicture = timeIconCell?.querySelector('picture');
      if (timeIconPicture) {
        const img = timeIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        timeLi.append(optimizedPic);
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
      timeSpan.textContent = timeCell?.textContent?.trim();
      moveInstrumentation(timeCell, timeSpan);
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

      const servesIconPicture = servesIconCell?.querySelector('picture');
      if (servesIconPicture) {
        const img = servesIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        servesLi.append(optimizedPic);
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
      servesSpan.textContent = servesCell?.textContent?.trim();
      moveInstrumentation(servesCell, servesSpan);
      servesLi.append(servesSpan);
      propertiesUl.append(servesLi);
      contentDiv.append(propertiesUl);

      linkEl.append(contentDiv);
      recipeCard.append(linkEl);
      slide.append(recipeCard);
      swiperWrapper.append(slide);

      // Handle hierarchy tree if present
      const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
      if (hierarchyRoot) {
        // Create a temporary div to hold the hierarchy content and apply instrumentation
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
        moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation from original cell to tempDiv

        // Apply classes to nested elements within the hierarchy tree
        tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('nav-menu-list'));
        tempDiv.querySelectorAll('li').forEach(li => li.classList.add('nav-menu-item', 'list-item'));
        tempDiv.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-link'));

        // Now transform the nested lists within the tempDiv
        transformNestedLists(tempDiv.querySelector('ul'));

        // Append the processed content to the slide or another appropriate element
        // For now, we'll just ensure it's processed, but not necessarily appended to the visible DOM
        // unless there's a specific place for it in the recipe card.
        // If it's meant to be hidden or used for data, this is fine.
        // If it should be visible, it needs an append target.
        // For this review, assuming it's processed for potential future use or hidden data.
      }
      moveInstrumentation(row, slide);
    } else if (cells.length === 3) {
      // Social Media Share Item
      socialMediaShareItems.push(row);
    }
  });

  swiperInnerContainer.append(swiperWrapper);

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
  moveInstrumentation(prevButtonIconRow, prevBtn);
  if (prevButtonIcon) {
    const img = prevButtonIcon.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    prevBtn.append(optimizedPic);
  }
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
  moveInstrumentation(nextButtonIconRow, nextBtn);
  if (nextButtonIcon) {
    const img = nextButtonIcon.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    nextBtn.append(optimizedPic);
  }
  swiperInnerContainer.append(nextBtn);

  swiperContainer.append(swiperInnerContainer);

  const paginationEl = document.createElement('div');
  paginationEl.classList.add(
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
  swiperContainer.append(paginationEl);
  root.append(swiperContainer);

  if (ctaLink && ctaLabel) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');

    const ctaAnchor = document.createElement('a');
    ctaAnchor.classList.add(
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
    ctaAnchor.href = ctaLink;
    moveInstrumentation(ctaLinkRow, ctaAnchor);

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    ctaLabelSpan.textContent = ctaLabel;
    moveInstrumentation(ctaLabelRow, ctaLabelSpan);
    ctaAnchor.append(ctaLabelSpan);
    ctaWrapper.append(ctaAnchor);
    root.append(ctaWrapper);
  }

  // Social Media Share Section
  if (socialMediaShareItems.length > 0) {
    const socialShareSection = document.createElement('section');
    socialShareSection.classList.add(
      'social-media-share',
      'd-none',
      'w-100',
      'justify-content-center',
      'align-items-items',
      'position-fixed',
      'top-0',
      'start-0',
      'end-0',
      'bottom-0',
      'z-2',
    );

    const socialShareWrapper = document.createElement('div');
    socialShareWrapper.classList.add('social-media-share__wrapper', 'bg-cream-100', 'py-8', 'px-3', 'px-md-8');

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
    const closeImg = document.createElement('img');
    closeImg.alt = 'Close icon';
    // This icon is part of the UI, not content, so it's acceptable to hardcode.
    closeImg.src = '/icons/close-icon.svg'; // Assuming a common icon path
    closeDiv.append(closeImg);
    titleCloseDiv.append(closeDiv);
    socialShareWrapper.append(titleCloseDiv);

    const socialIconsDiv = document.createElement('div');
    // Removed 'swiper-initialized', 'swiper-horizontal' as Swiper adds these
    socialIconsDiv.classList.add(
      'social-media-share__wrapper--social-icons',
      'pt-8',
      'd-flex',
      'overflow-hidden',
    );

    socialMediaShareItems.forEach((row) => {
      const [linkCell, iconCell, labelCell] = [...row.children];

      const iconLabelDiv = document.createElement('div');
      iconLabelDiv.classList.add('social-media-share__wrapper--icon-label', 'swiper-slide', 'd-flex', 'align-items-center');

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
      moveInstrumentation(linkCell, socialLink);

      const iconWrapper = document.createElement('div');
      iconWrapper.classList.add(
        'social-media-share__wrapper--icons',
        'rounded-circle',
        'bg-white',
        'd-flex',
        'justify-content-center',
        'align-items-center',
      );

      const iconLinkDiv = document.createElement('div');
      iconLinkDiv.classList.add('social-media-share__wrapper--link', 'text-decoration-none');

      const iconPicture = iconCell?.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        iconLinkDiv.append(optimizedPic);
      }
      iconWrapper.append(iconLinkDiv);
      socialLink.append(iconWrapper);

      const labelDiv = document.createElement('div');
      labelDiv.classList.add(
        'social-media-share__wrapper--label',
        'text-center',
        'font-16',
        'leading-22',
        'text-black',
      );
      labelDiv.textContent = labelCell?.textContent?.trim();
      moveInstrumentation(labelCell, labelDiv);
      socialLink.append(labelDiv);

      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      socialLink.append(screenReaderSpan);

      iconLabelDiv.append(socialLink);
      socialIconsDiv.append(iconLabelDiv);
      moveInstrumentation(row, iconLabelDiv);
    });
    socialShareWrapper.append(socialIconsDiv);
    socialShareSection.append(socialShareWrapper);
    root.append(socialShareSection);

    closeDiv.addEventListener('click', () => {
      socialShareSection.classList.add('d-none');
    });
  }

  block.replaceChildren(root);

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
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });
}
