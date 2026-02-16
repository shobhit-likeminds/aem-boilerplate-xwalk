import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSectionWrapper = document.createElement('div');
  bannerSectionWrapper.classList.add('banner-section__wrapper', 'position-relative', 'banner');
  moveInstrumentation(block.firstElementChild, bannerSectionWrapper);

  const row = block.children[0];
  const cells = row.children;

  // Extract image and its alt text
  const imageCell = cells[0];
  const img = imageCell.querySelector('img');
  if (img) {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, true, [{ width: '2000' }]);
    optimizedPic.querySelector('img').classList.add('banner-section__image', 'w-100', 'h-100', 'object-fit-cover');
    optimizedPic.querySelector('img').setAttribute('loading', 'eager');
    optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedPic.querySelector('img').setAttribute('decoding', 'async');
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    bannerSectionWrapper.append(optimizedPic);
  }

  // Extract CTA details
  const ctaCell = cells[1];
  const ctaLinkElement = ctaCell.querySelector('a');
  const ctaTextElement = ctaCell.querySelector('span');

  if (ctaLinkElement && ctaTextElement) {
    const bannerSectionCtaWrapper = document.createElement('div');
    bannerSectionCtaWrapper.classList.add('banner-section__cta-wrapper', 'position-absolute', 'start-50', 'translate-middle-x', 'w-100');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('banner-cta');

    const textCenter = document.createElement('div');
    textCenter.classList.add('text-center');

    const newCtaLink = document.createElement('a');
    newCtaLink.id = ctaLinkElement.id || ''; // Transfer ID if present
    newCtaLink.classList.add('banner-cta__button', 'cmp-button', 'analytics_cta_click', 'text-center');
    newCtaLink.setAttribute('data-link-region', ctaLinkElement.dataset.linkRegion || 'CTA');
    newCtaLink.setAttribute('data-is-internal', ctaLinkElement.dataset.isInternal || 'true');
    newCtaLink.setAttribute('data-enable-gating', ctaLinkElement.dataset.enableGating || 'false');
    newCtaLink.href = ctaLinkElement.href;
    newCtaLink.target = ctaLinkElement.target;
    moveInstrumentation(ctaLinkElement, newCtaLink);

    const newCtaText = document.createElement('span');
    newCtaText.classList.add('banner-cta__button-text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center');
    newCtaText.textContent = ctaTextElement.textContent;
    moveInstrumentation(ctaTextElement, newCtaText);

    newCtaLink.append(newCtaText);
    textCenter.append(newCtaLink);

    // Handle popup div if it exists in the original HTML
    const popupDiv = ctaCell.querySelector('.banner-cta__popup');
    if (popupDiv) {
      const newPopupDiv = document.createElement('div');
      newPopupDiv.classList.add('banner-cta__popup', 'pop-up', 'd-none');
      moveInstrumentation(popupDiv, newPopupDiv);

      const popupMessage = popupDiv.querySelector('.popup-message');
      if (popupMessage) {
        const newPopupMessage = document.createElement('input');
        newPopupMessage.type = 'hidden';
        newPopupMessage.classList.add('popup-message');
        newPopupMessage.value = popupMessage.value;
        moveInstrumentation(popupMessage, newPopupMessage);
        newPopupDiv.append(newPopupMessage);
      }

      const proceedButtonLabel = popupDiv.querySelector('.proceed-button-label');
      if (proceedButtonLabel) {
        const newProceedButtonLabel = document.createElement('input');
        newProceedButtonLabel.type = 'hidden';
        newProceedButtonLabel.classList.add('proceed-button-label');
        newProceedButtonLabel.value = proceedButtonLabel.value;
        moveInstrumentation(proceedButtonLabel, newProceedButtonLabel);
        newPopupDiv.append(newProceedButtonLabel);
      }

      const cancelButtonLabel = popupDiv.querySelector('.cancel-button-label');
      if (cancelButtonLabel) {
        const newCancelButtonLabel = document.createElement('input');
        newCancelButtonLabel.type = 'hidden';
        newCancelButtonLabel.classList.add('cancel-button-label');
        newCancelButtonLabel.value = cancelButtonLabel.value;
        moveInstrumentation(cancelButtonLabel, newCancelButtonLabel);
        newPopupDiv.append(newCancelButtonLabel);
      }

      const backgroundColor = popupDiv.querySelector('.background-color');
      if (backgroundColor) {
        const newBackgroundColor = document.createElement('input');
        newBackgroundColor.type = 'hidden';
        newBackgroundColor.classList.add('background-color');
        newBackgroundColor.value = backgroundColor.value;
        moveInstrumentation(backgroundColor, newBackgroundColor);
        newPopupDiv.append(newBackgroundColor);
      }

      textCenter.append(newPopupDiv);
    }

    bannerCta.append(textCenter);
    bannerSectionCtaWrapper.append(bannerCta);
    bannerSectionWrapper.append(bannerSectionCtaWrapper);
  }

  block.textContent = '';
  block.classList.add('banner-section');
  block.append(bannerSectionWrapper);
}
