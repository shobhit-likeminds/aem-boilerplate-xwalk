import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageDesktopRow,
    backgroundImageMobileRow,
    titleRow,
    descriptionRow,
    ctaLinkRow,
  ] = [...block.children];

  block.textContent = '';

  const backgroundImageDesktopPicture = backgroundImageDesktopRow.querySelector('picture');
  const backgroundImageMobilePicture = backgroundImageMobileRow.querySelector('picture');

  // Set background image based on desktop/mobile
  if (backgroundImageDesktopPicture) {
    const img = backgroundImageDesktopPicture.querySelector('img');
    if (img) {
      block.style.backgroundImage = `url(${img.src})`;
      // Optimize desktop image
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1013' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      backgroundImageDesktopPicture.replaceWith(optimizedPic);
    }
  }

  // Add classes to the main block
  block.classList.add('cmp-teaser', 'cmp-teaser--first-half-center-aligned');

  // Create content container
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('cmp-teaser__content');

  // Title
  if (titleRow) {
    const title = document.createElement('h2');
    title.classList.add('cmp-teaser__title');
    moveInstrumentation(titleRow, title);
    while (titleRow.firstChild) title.append(titleRow.firstChild);
    contentDiv.append(title);
  }

  // Description
  if (descriptionRow) {
    const description = document.createElement('div');
    description.classList.add('cmp-teaser__description');
    moveInstrumentation(descriptionRow, description);
    while (descriptionRow.firstChild) description.append(description.firstChild);
    contentDiv.append(description);
  }

  // CTA Link
  if (ctaLinkRow) {
    const actionContainer = document.createElement('div');
    actionContainer.classList.add('cmp-teaser__action-container');

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button', 'cmp-button--primary-anchor');

    const foundLink = ctaLinkRow.querySelector('a');
    if (foundLink) {
      const ctaLink = document.createElement('a');
      ctaLink.classList.add('cmp-button');
      ctaLink.href = foundLink.href;
      ctaLink.target = '_blank'; // Assuming target blank from original HTML
      moveInstrumentation(ctaLinkRow, ctaLink);

      const span = document.createElement('span');
      span.classList.add('cmp-button__text');
      span.textContent = foundLink.textContent;
      ctaLink.append(span);
      buttonWrapper.append(ctaLink);
    }
    actionContainer.append(buttonWrapper);
    contentDiv.append(actionContainer);
  }

  block.append(contentDiv);

  // Handle mobile background image (if present)
  if (backgroundImageMobilePicture) {
    const imgMobile = backgroundImageMobilePicture.querySelector('img');
    if (imgMobile) {
      // Create a style element or add inline style for responsive background
      const mobileStyle = document.createElement('style');
      mobileStyle.textContent = `
        @media (max-width: 767px) { /* Adjust breakpoint as needed */
          .teaser.cmp-teaser {
            background-image: url(${imgMobile.src}) !important;
          }
        }
      `;
      block.append(mobileStyle);

      // Optimize mobile image
      const optimizedPic = createOptimizedPicture(imgMobile.src, imgMobile.alt, false, [{ width: '750' }]);
      moveInstrumentation(imgMobile, optimizedPic.querySelector('img'));
      backgroundImageMobilePicture.replaceWith(optimizedPic);
    }
  }
}
