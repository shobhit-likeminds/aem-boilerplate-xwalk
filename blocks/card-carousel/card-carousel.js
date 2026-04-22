import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    viewAllLinkRow,
    viewAllLabelRow,
    ...itemRows
  ] = [...block.children];

  const root = document.createElement('section');
  root.classList.add('card-carousel');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');

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
  containerDiv.append(title);

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
  containerDiv.append(subtitle);

  root.append(containerDiv);

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

  const socialMediaShareIcons = [];

  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 12) {
      // Recipe Card item
      const [
        recipeLinkCell,
        recipeImageCell,
        tagCell,
        tagIconCell,
        titleCell,
        descriptionCell,
        waveDecorationCell,
        timeIconCell,
        timeTextCell,
        servesIconCell,
        servesTextCell,
        hierarchyTreeCell,
      ] = cells;

      const swiperSlide = document.createElement('div');
      swiperSlide.classList.add('swiper-slide');
      moveInstrumentation(row, swiperSlide);

      const recipeCard = document.createElement('div');
      recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');

      const link = document.createElement('a');
      link.classList.add('recipe-card__link', 'd-block', 'position-relative');
      const foundRecipeLink = recipeLinkCell.querySelector('a');
      if (foundRecipeLink) {
        link.href = foundRecipeLink.href;
      }

      const recipeImagePicture = recipeImageCell.querySelector('picture');
      if (recipeImagePicture) {
        const img = recipeImagePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        link.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
      }

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('recipe-card__content', 'py-6');

      const infoDiv = document.createElement('div');
      infoDiv.classList.add(
        'recipe-card__info',
        'd-flex',
        'align-items-center',
        'justify-content-between',
      );

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

      const tagIconPicture = tagIconCell.querySelector('picture');
      if (tagIconPicture) {
        infoDiv.append(tagIconPicture);
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
      const wavePicture = waveDecorationCell.querySelector('picture');
      if (wavePicture) {
        waveDiv.append(wavePicture);
      }
      contentDiv.append(waveDiv);

      const propertiesUl = document.createElement('ul');
      propertiesUl.classList.add(
        'recipe-card__properties',
        'mt-4',
        'd-flex',
        'align-items-center',
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
        timeLi.append(timeIconPicture);
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
        servesLi.append(servesIconPicture);
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

      // Handle hierarchy-tree richtext field
      const hierarchyTreeDiv = document.createElement('div');
      moveInstrumentation(hierarchyTreeCell, hierarchyTreeDiv);
      hierarchyTreeDiv.innerHTML = hierarchyTreeCell.innerHTML; // Preserve HTML structure

      // Apply classes to nested elements if needed, based on ORIGINAL HTML
      hierarchyTreeDiv.querySelectorAll('ul').forEach((ul) => {
        ul.classList.add('nav-menu', 'list-unstyled'); // Example classes, adjust as per ORIGINAL HTML
      });
      hierarchyTreeDiv.querySelectorAll('li').forEach((li) => {
        li.classList.add('nav-menu-item', 'list-item'); // Example classes, adjust as per ORIGINAL HTML
      });
      hierarchyTreeDiv.querySelectorAll('a').forEach((a) => {
        a.classList.add('nav-menu-link', 'text-decoration-none'); // Example classes, adjust as per ORIGINAL HTML
      });
      contentDiv.append(hierarchyTreeDiv); // Append the processed richtext content

      link.append(contentDiv);
      recipeCard.append(link);
      swiperSlide.append(recipeCard);
      swiperWrapper.append(swiperSlide);
    } else if (cells.length === 3) {
      // Social Media Share Icon item
      socialMediaShareIcons.push(row);
    }
  });

  popularRecipeContainer.append(swiperWrapper);
  popularRecipeSection.append(popularRecipeContainer);

  const shareDiv = document.createElement('div');
  shareDiv.classList.add('popular-recipe__share');

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

  const shareWrapper = document.createElement('div');
  shareWrapper.classList.add(
    'social-media-share__wrapper',
    'bg-cream-100',
    'py-8',
    'px-3',
    'px-md-8',
  );

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
  closeImg.setAttribute('alt', 'Close'); // More descriptive alt text
  // NOTE: Hardcoded SVG path for close icon as it's a UI element, not content.
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776846380479.svg+xml';
  closeDiv.append(closeImg);
  titleCloseDiv.append(closeDiv);
  shareWrapper.append(titleCloseDiv);

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(
    'social-media-share__wrapper--social-icons',
    'pt-8',
    'd-flex',
    'overflow-hidden',
    'swiper-initialized',
    'swiper-horizontal',
  );

  const socialIconsSwiperWrapper = document.createElement('div');
  socialIconsSwiperWrapper.classList.add(
    'social-media-share__wrapper--social-icons-wrapper',
    'swiper-wrapper',
    'px-3',
    'px-md-0',
  );
  socialIconsSwiperWrapper.setAttribute('data-page-url', '#');

  socialMediaShareIcons.forEach((row) => {
    const [shareUrlCell, iconCell, labelCell] = [...row.children];

    const iconLabelDiv = document.createElement('div');
    iconLabelDiv.classList.add(
      'social-media-share__wrapper--icon-label',
      'swiper-slide',
      'd-flex',
      'align-items-center',
    );
    moveInstrumentation(row, iconLabelDiv);

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
    const foundShareUrl = shareUrlCell.querySelector('a');
    if (foundShareUrl) {
      shareLink.href = foundShareUrl.href;
      shareLink.setAttribute('target', '_blank');
    }

    const iconsDiv = document.createElement('div');
    iconsDiv.classList.add(
      'social-media-share__wrapper--icons',
      'rounded-circle',
      'bg-white',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );

    const iconLink = document.createElement('div');
    iconLink.classList.add('social-media-share__wrapper--link', 'text-decoration-none');
    // iconLink.setAttribute('target', '_blank'); // This is a div, not a link. Removed target attribute.
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      iconLink.append(iconPicture);
    }
    iconsDiv.append(iconLink);
    shareLink.append(iconsDiv);

    const labelDiv = document.createElement('div');
    labelDiv.classList.add(
      'social-media-share__wrapper--label',
      'text-center',
      'font-16',
      'leading-22',
      'text-black',
    );
    labelDiv.textContent = labelCell.textContent.trim();
    shareLink.append(labelDiv);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    shareLink.append(screenReaderSpan);

    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.classList.add('social-media-share__wrapper--url');
    hiddenInput.value = labelDiv.textContent.trim().toLowerCase();
    shareLink.append(hiddenInput);

    iconLabelDiv.append(shareLink);
    socialIconsSwiperWrapper.append(iconLabelDiv);

    // Add event listener for social share links
    shareLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(shareLink.href, '_blank', 'noopener,noreferrer');
    });
  });

  socialIconsWrapper.append(socialIconsSwiperWrapper);

  const prevButton = document.createElement('button');
  prevButton.classList.add(
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
  const prevImg = document.createElement('img');
  prevImg.setAttribute('alt', 'Previous'); // More descriptive alt text
  // NOTE: Hardcoded SVG path for navigation icon as it's a UI element, not content.
  prevImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776846380681.svg+xml';
  prevButton.append(prevImg);
  socialIconsWrapper.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add(
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
  const nextImg = document.createElement('img');
  nextImg.setAttribute('alt', 'Next'); // More descriptive alt text
  // NOTE: Hardcoded SVG path for navigation icon as it's a UI element, not content.
  nextImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776846380681.svg+xml';
  nextButton.append(nextImg);
  socialIconsWrapper.append(nextButton);

  shareWrapper.append(socialIconsWrapper);

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
  inputField.setAttribute('type', 'text');
  inputField.classList.add(
    'social-media-share__wrapper--input',
    'bg-white',
    'font-16',
    'leading-22',
    'px-4',
    'py-3',
    'shadow-none',
  );
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
  inputButtonDiv.append(copyButton);
  shareWrapper.append(inputButtonDiv);
  socialMediaShare.append(shareWrapper);
  shareDiv.append(socialMediaShare);
  popularRecipeSection.append(shareDiv);
  swiperWrapperOuter.append(popularRecipeSection);
  swiperContainer.append(swiperWrapperOuter);

  const swiperPrevButton = document.createElement('button');
  swiperPrevButton.classList.add(
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
  const swiperPrevImg = document.createElement('img');
  swiperPrevImg.setAttribute('alt', 'Previous slide'); // More descriptive alt text
  // NOTE: Hardcoded SVG path for navigation icon as it's a UI element, not content.
  swiperPrevImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776846380306.svg+xml';
  swiperPrevButton.append(swiperPrevImg);
  swiperWrapperOuter.append(swiperPrevButton);

  const swiperNextButton = document.createElement('button');
  swiperNextButton.classList.add(
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
  const swiperNextImg = document.createElement('img');
  swiperNextImg.setAttribute('alt', 'Next slide'); // More descriptive alt text
  // NOTE: Hardcoded SVG path for navigation icon as it's a UI element, not content.
  swiperNextImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776846380306.svg+xml';
  swiperNextButton.append(swiperNextImg);
  swiperWrapperOuter.append(swiperNextButton);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add(
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
  swiperContainer.append(swiperPagination);

  root.append(swiperContainer);

  const viewAllDiv = document.createElement('div');
  viewAllDiv.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');

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
  viewAllDiv.append(viewAllLink);
  root.append(viewAllDiv);

  block.replaceChildren(root);

  // Image optimization
  root.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Add event listeners for interactivity
  // Toggle social media share modal
  const toggleSocialShare = () => {
    socialMediaShare.classList.toggle('d-none');
    socialMediaShare.classList.toggle('d-flex');
  };

  // Assuming there's a button to open the share modal, e.g., a "Share" button on each recipe card
  // For now, let's assume a generic share button or a placeholder
  // If the share button is part of the recipe card, it needs to be added inside the recipe card loop.
  // For demonstration, let's add a dummy button to trigger the modal
  const dummyShareButton = document.createElement('button');
  dummyShareButton.textContent = 'Open Share Modal (Dev)';
  dummyShareButton.style.position = 'fixed';
  dummyShareButton.style.bottom = '20px';
  dummyShareButton.style.right = '20px';
  dummyShareButton.style.zIndex = '1000';
  // block.append(dummyShareButton); // Uncomment for testing

  // dummyShareButton.addEventListener('click', toggleSocialShare); // Uncomment for testing
  closeDiv.addEventListener('click', toggleSocialShare); // Close button for the modal

  // Copy URL to clipboard
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(inputField.value);
      // Optionally provide user feedback
      copyButton.textContent = 'Copied!';
      setTimeout(() => {
        copyButton.textContent = 'Copy';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  });

  // Populate input field with current page URL when modal opens
  socialMediaShare.addEventListener('transitionend', () => {
    if (socialMediaShare.classList.contains('d-flex')) {
      inputField.value = window.location.href;
    }
  });

  // Example of how a share button on a recipe card might open the modal
  // This would need to be integrated into the recipe card creation loop
  root.querySelectorAll('.recipe-card__link').forEach((recipeCardLink) => {
    // Assuming there's a share icon/button within the recipe card that triggers the modal
    // For now, let's just make the whole link open the share modal for demonstration
    // In a real scenario, you'd have a specific share button element
    // recipeCardLink.addEventListener('click', (e) => {
    //   e.preventDefault(); // Prevent navigating to recipe link
    //   inputField.value = recipeCardLink.href; // Set the URL to share
    //   toggleSocialShare();
    // });
  });
}
