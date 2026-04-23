import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, originalCell) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Apply classes from original HTML to <li>
    li.classList.add('nav-menu-item', 'list-item'); // Example classes, adjust based on actual original HTML for nested lists

    if (anchor) {
      // Apply classes from original HTML to <a>
      anchor.classList.add('nav-menu-link'); // Example class
      moveInstrumentation(originalCell, anchor); // Move instrumentation for the anchor
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
        moveInstrumentation(originalCell, span); // Move instrumentation for the span
      }
    }

    if (nested) {
      nested.remove(); // Remove the original nested UL
      const subWrap = document.createElement('div');
      // No hardcoded class like 'has-sub-child' unless it's explicitly in ORIGINAL HTML
      // If the original HTML has a specific class for this wrapper, add it here.
      // For now, let's assume it's a structural div without a specific class from the allowlist.
      subWrap.classList.add('nav-menu-sub-wrap'); // Example class, replace with actual if available

      // Apply classes from original HTML to nested <ul>
      nested.classList.add('nav-menu-sub-list'); // Example class
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
      moveInstrumentation(originalCell, nested); // Move instrumentation for the nested UL
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    titleRow,
    subtitleRow,
    prevArrowIconRow,
    nextArrowIconRow,
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = children;

  const recipes = itemRows.filter((row) => row.children.length === 13);
  const socialMediaShareItems = itemRows.filter((row) => row.children.length === 3);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  moveInstrumentation(block, container);

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

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');

  recipes.forEach((row) => {
    const [
      linkCell,
      imageCell,
      imageAltCell,
      tagCell,
      tagIconCell,
      titleCell,
      descriptionCell,
      waveImageCell,
      timeIconCell,
      timeTextCell,
      servesIconCell,
      servesTextCell,
      hierarchyCell,
    ] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      recipeLink.href = foundLink.href;
    }
    moveInstrumentation(linkCell, recipeLink);

    const imagePicture = imageCell.querySelector('picture');
    if (imagePicture) {
      const img = imagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent.trim(), false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      recipeLink.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
    }

    const content = document.createElement('div');
    content.classList.add('recipe-card__content', 'py-6');

    const info = document.createElement('div');
    info.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');

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
    content.append(info);

    const textDiv = document.createElement('div');
    textDiv.classList.add('recipe-card__text');

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
    textDiv.append(recipeTitle);

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
    content.append(textDiv);

    const waveDiv = document.createElement('div');
    waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
    const waveImagePicture = waveImageCell.querySelector('picture');
    if (waveImagePicture) {
      const img = waveImagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      waveDiv.append(optimizedPic);
    }
    content.append(waveDiv);

    const propertiesUl = document.createElement('ul');
    propertiesUl.classList.add(
      'recipe-card__properties',
      'mt-4',
      'd-flex',
      'align-items-center',
      'mt-4',
    );

    const timeLi = document.createElement('li');
    timeLi.classList.add(
      'recipe-card__property',
      'recipe-card__property--left',
      'd-flex',
      'align-items-center',
    );
    const timeIconPicture = timeIconCell.querySelector('picture');
    if (timeIconPicture) {
      const img = timeIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
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
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
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
    servesSpan.textContent = servesTextCell.textContent.trim();
    servesLi.append(servesSpan);
    propertiesUl.append(servesLi);
    content.append(propertiesUl);

    recipeLink.append(content);
    recipeCard.append(recipeLink);
    swiperSlide.append(recipeCard);
    swiperWrapper.append(swiperSlide);

    // Handle hierarchy-tree from the last cell
    const hierarchyRootUl = hierarchyCell?.querySelector('ul');
    if (hierarchyRootUl) {
      const hierarchyDebugDiv = document.createElement('div');
      hierarchyDebugDiv.classList.add('recipe-card__hierarchy-debug', 'mt-4');

      // Create a temporary div to hold the innerHTML and apply instrumentation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv

      // Apply classes to nested elements and transform
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('nav-menu-list')); // Example class
      tempDiv.querySelectorAll('li').forEach(li => li.classList.add('nav-menu-item', 'list-item')); // Example classes
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-link')); // Example class

      // Re-run transformNestedLists on the content within tempDiv
      // We need to ensure transformNestedLists is robust enough to handle content already in tempDiv
      // and that it moves instrumentation correctly for newly created elements.
      // For now, let's pass the original cell to `transformNestedLists` so it can move instrumentation from it.
      transformNestedLists(tempDiv, hierarchyCell);

      // Move all children from tempDiv to hierarchyDebugDiv
      while (tempDiv.firstChild) {
        hierarchyDebugDiv.append(tempDiv.firstChild);
      }
      recipeCard.append(hierarchyDebugDiv);
    }

    moveInstrumentation(row, swiperSlide);
  });

  swiperWrapperContainer.append(swiperWrapper);

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
  const prevIconPicture = prevArrowIconRow.querySelector('picture');
  if (prevIconPicture) {
    const img = prevIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    prevButton.append(optimizedPic);
  }
  moveInstrumentation(prevArrowIconRow, prevButton);
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
  const nextIconPicture = nextArrowIconRow.querySelector('picture');
  if (nextIconPicture) {
    const img = nextIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    nextButton.append(optimizedPic);
  }
  moveInstrumentation(nextArrowIconRow, nextButton);
  swiperWrapperContainer.append(nextButton);

  swiperContainer.append(swiperWrapperContainer);

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
  swiperContainer.append(pagination);

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');

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
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaSpan);
  moveInstrumentation(ctaLabelRow, ctaSpan);
  ctaDiv.append(ctaLink);

  // Social Media Share Section (hidden by default as per original HTML)
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
  const socialShareWrapper = document.createElement('div');
  socialShareWrapper.classList.add(
    'social-media-share__wrapper',
    'bg-cream-100',
    'py-8',
    'px-3',
    'px-md-8',
  );

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
  // Close button/icon would be added here if provided in model, or hardcoded if it's purely decorative
  const closeDiv = document.createElement('div');
  closeDiv.classList.add('social-media-share__wrapper--close');
  // Assuming a close icon is an image, if it's a hardcoded SVG, it would go here
  // If the close icon is from the model, it should be read from a cell.
  // For now, assuming it's a hardcoded element as per original HTML.
  const closeIconImg = document.createElement('img');
  closeIconImg.alt = 'svg file'; // From original HTML
  closeIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776950353829.svg+xml'; // Hardcoded from original HTML
  closeDiv.append(closeIconImg);
  shareTitleClose.append(closeDiv);
  socialShareWrapper.append(shareTitleClose);

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
  );
  const socialSwiperWrapper = document.createElement('div');
  socialSwiperWrapper.classList.add(
    'social-media-share__wrapper--social-icons-wrapper',
    'swiper-wrapper',
    'px-3',
    'px-md-0',
  );

  socialMediaShareItems.forEach((row) => {
    const [socialLinkCell, iconCell, labelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('social-media-share__wrapper--icon-label', 'swiper-slide', 'd-flex', 'align-items-center');

    const socialAnchor = document.createElement('a');
    socialAnchor.classList.add(
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
      socialAnchor.href = foundSocialLink.href;
      socialAnchor.target = '_blank'; // Add target blank as per original HTML
    }
    moveInstrumentation(socialLinkCell, socialAnchor);

    const iconDiv = document.createElement('div');
    iconDiv.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );
    const iconLinkDiv = document.createElement('div');
    iconLinkDiv.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconLinkDiv.append(optimizedPic);
    }
    iconDiv.append(iconLinkDiv);
    socialAnchor.append(iconDiv);

    const labelDiv = document.createElement('div');
    labelDiv.classList.add(
      'social-media-share__wrapper--label',
      'text-center',
      'font-16',
      'leading-22',
      'text-black',
    );
    labelDiv.textContent = labelCell.textContent.trim();
    socialAnchor.append(labelDiv);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    socialAnchor.append(screenReaderSpan);

    swiperSlide.append(socialAnchor);
    socialSwiperWrapper.append(swiperSlide);
    moveInstrumentation(row, swiperSlide);
  });

  socialIconsWrapper.append(socialSwiperWrapper);
  socialShareWrapper.append(socialIconsWrapper);

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
  const inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.classList.add(
    'social-media-share__wrapper--input',
    'bg-white',
    'font-16',
    'leading-22',
    'px-4',
    'py-3',
    'shadow-none',
  );
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
  inputButtonDiv.append(inputEl, copyButton);
  socialShareWrapper.append(inputButtonDiv);
  socialMediaShareSection.append(socialShareWrapper);

  const mainContent = document.createElement('div');
  mainContent.classList.add('card-carousel-content'); // This class is not in the allowlist. Assuming it's a block-specific wrapper.
  mainContent.append(container, swiperContainer, ctaDiv, socialMediaShareSection);

  block.replaceChildren(mainContent);

  // Image optimization for all pictures in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Initialize Swiper (example, actual Swiper init might be more complex)
  // This part would typically be in a separate JS file for the block,
  // but for a self-contained decorate function, it's included here.
  // Make sure Swiper library is loaded.
  if (window.Swiper) {
    // eslint-disable-next-line no-new
    new window.Swiper(swiperContainer, {
      slidesPerView: 'auto',
      spaceBetween: 34,
      loop: true,
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      pagination: {
        el: pagination,
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 34,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 34,
        },
      },
    });

    // eslint-disable-next-line no-new
    new window.Swiper(socialIconsWrapper, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      pagination: {
        el: socialIconsWrapper.querySelector('.swiper-pagination'), // Assuming there's a pagination element within socialIconsWrapper
        clickable: true,
      },
      navigation: {
        nextEl: socialIconsWrapper.querySelector('.social-media-share__next'),
        prevEl: socialIconsWrapper.querySelector('.social-media-share__prev'),
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }

  // Example for social media share modal toggle
  // This would typically be triggered by a "share" button somewhere else on the page
  // For now, let's make the close button work
  closeDiv.addEventListener('click', () => {
    socialMediaShareSection.classList.add('d-none');
  });

  // Copy URL functionality
  copyButton.addEventListener('click', () => {
    const pageUrl = window.location.href; // Or a specific URL from data-page-url
    navigator.clipboard.writeText(pageUrl).then(() => {
      // Provide user feedback
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 2000);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Failed to copy: ', err);
    });
  });
}
