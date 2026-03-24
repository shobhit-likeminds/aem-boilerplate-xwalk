import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageRow, titleRow, descriptionRow, ctaRow] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.classList.add('text-and-media-wrapper');

  // Add the text-and-media-scarp image from the original HTML
  const scarpImage = document.createElement('img');
  scarpImage.classList.add('text-and-media-scarp', 'fade-in');
  scarpImage.setAttribute('data-fade-in', '');
  // The src and alt for this image are hardcoded in the original HTML, not from block content
  scarpImage.src = '/content/dam/aemigrate/uploaded-folder/image/frame21472233754-homepage-scarp-en.png';
  scarpImage.alt = '<h2><span style="font-weight: normal;">Combining play with a</span>&nbsp;<span class="semi-bold"><b>Prosperous Future</b></span></h2>';
  scarpImage.loading = 'lazy';
  scarpImage.setAttribute('aria-label', '<h2><span style="font-weight: normal;">Combining play with a</span>&nbsp;<span class="semi-bold"><b>Prosperous Future</b></span></h2>');
  scarpImage.setAttribute('is-animated', 'true');
  scarpImage.setAttribute('data-is-reverse', 'true');
  wrapper.append(scarpImage);


  const textAndMedia = document.createElement('div');
  textAndMedia.classList.add('text-and-media');
  textAndMedia.setAttribute('data-cmp-is', 'text-and-media');
  textAndMedia.setAttribute('aria-labelledby', 'text-and-media-title');
  textAndMedia.style.overflow = 'hidden';
  textAndMedia.setAttribute('is-animated', 'true');
  textAndMedia.setAttribute('data-is-reverse', 'true');

  // Image Container
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('text-and-media--image-container', 'animate-image-container-up-fade', 'in-viewport', 'slide-up');
  imageContainer.setAttribute('data-slide-type', 'slide-up');
  imageContainer.setAttribute('data-slide-no-wrap', '');

  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    // The original HTML uses a source element with webp, and the img src is the fallback.
    // createOptimizedPicture handles this, but ensure the width is correct.
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    optimizedPic.classList.add('text-and-media--image-container__picture');
    optimizedPic.querySelector('img').classList.add('text-and-media--image-container__image', 'layout-portrait', 'animate-image-zoom-out', 'in-viewport');
    optimizedPic.querySelector('img').setAttribute('role', 'img');
    imageContainer.append(optimizedPic);
  }
  moveInstrumentation(imageRow, imageContainer);

  // Content
  const content = document.createElement('div');
  content.classList.add('text-and-media--content', 'in-viewport');

  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');
  const slideUp = document.createElement('div');
  slideUp.setAttribute('data-slide-type', 'slide-up');
  slideUp.classList.add('slide-up');

  // Title
  const titleDiv = document.createElement('div');
  titleDiv.id = 'text-and-media-title';
  titleDiv.classList.add('text-and-media--content__title');
  titleDiv.setAttribute('tabindex', '0');
  moveInstrumentation(titleRow, titleDiv);
  // The content is inside a div within the row, so we need to append the child of the first cell.
  if (titleRow.firstElementChild) {
    while (titleRow.firstElementChild.firstChild) titleDiv.append(titleRow.firstElementChild.firstChild);
  }
  slideUp.append(titleDiv);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('text-and-media--content__description');
  descriptionDiv.setAttribute('tabindex', '0');
  moveInstrumentation(descriptionRow, descriptionDiv);
  // The content is inside a div within the row, so we need to append the child of the first cell.
  if (descriptionRow.firstElementChild) {
    while (descriptionRow.firstElementChild.firstChild) descriptionDiv.append(descriptionRow.firstElementChild.firstChild);
  }
  slideUp.append(descriptionDiv);

  // CTA
  const ctaLink = ctaRow.querySelector('a');
  if (ctaLink) {
    const newCtaLink = document.createElement('a');
    newCtaLink.href = ctaLink.href;
    newCtaLink.classList.add('cta', 'cta__primary', 'text-and-media--content__cta');
    newCtaLink.target = '_self';
    newCtaLink.setAttribute('aria-label', ctaLink.textContent);

    const ctaIcon = document.createElement('span');
    // Corrected class name from 'qd-icon--cheveron-right' to 'qd-icon--chevron-right' based on common EDS patterns and original HTML
    ctaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--chevron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    newCtaLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('cta__label'); // Corrected class name from 'cta__label' to 'cta__label' (was already correct, just re-verified)
    ctaLabel.textContent = ctaLink.textContent;
    newCtaLink.append(ctaLabel);

    moveInstrumentation(ctaRow, newCtaLink);
    slideUp.append(newCtaLink);
  }

  slideWrap.append(slideUp);
  content.append(slideWrap);

  const overflowFix = document.createElement('div');
  overflowFix.classList.add('text-and-media-overflow-fix');

  textAndMedia.append(imageContainer, content, overflowFix);
  wrapper.append(textAndMedia);

  block.textContent = '';
  block.append(wrapper);
}
