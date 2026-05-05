import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    descriptionRow,
    signInLinkRow,
    signInLabelRow,
    registerLinkRow,
    registerLabelRow,
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add(
    'home-page-description',
    'grid-container',
    'padding',
    'animate-enter',
    'in-view',
  );
  section.setAttribute('aria-label', 'Home Page Description Module');

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x', 'max-width-container');
  section.append(gridX);

  const cellWrapper = document.createElement('div');
  cellWrapper.classList.add(
    'cell',
    'large-offset-1',
    'large-10',
    'xlarge-offset-2',
    'xlarge-8',
    'text-center',
    'wrapper',
  );
  gridX.append(cellWrapper);

  // Image
  const imageContainer = document.createElement('div');
  imageContainer.classList.add(
    'image-container',
    'animate-enter-fade-up-short',
    'animate-delay-3',
  );
  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(
          img.src,
          img.alt,
          false,
          [{ width: '750' }],
        );
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageContainer.append(optimizedPic);
      }
    }
    moveInstrumentation(imageRow, imageContainer);
  }
  cellWrapper.append(imageContainer);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add(
    'description1',
    'bodyMediumRegular',
    'animate-enter-fade-up-short',
    'animate-delay-5',
  );
  if (descriptionRow) {
    descriptionDiv.innerHTML = descriptionRow.children[0]?.innerHTML || '';
    moveInstrumentation(descriptionRow, descriptionDiv);
  }
  cellWrapper.append(descriptionDiv);

  // CTA Container
  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('cta-container');
  cellWrapper.append(ctaContainer);

  // Sign In Link
  const signInLink = document.createElement('a');
  signInLink.classList.add(
    'link',
    'small',
    'black',
    'sign-in',
    'animate-enter-fade-up-short',
    'animate-delay-9',
  );
  if (signInLinkRow) {
    const foundSignInLink = signInLinkRow.querySelector('a');
    if (foundSignInLink) {
      signInLink.href = foundSignInLink.href;
    }
    moveInstrumentation(signInLinkRow, signInLink);
  }
  if (signInLabelRow) {
    const span = document.createElement('span');
    span.classList.add('button-text');
    span.textContent = signInLabelRow.textContent.trim();
    signInLink.append(span);
    moveInstrumentation(signInLabelRow, span);
  }
  signInLink.setAttribute('aria-label', 'Sign in');
  signInLink.setAttribute('rel', 'follow');
  ctaContainer.append(signInLink);

  // Separator
  const separator = document.createElement('span');
  separator.classList.add(
    'labelSmallBold',
    'separator',
    'animate-enter-fade-up-short',
    'animate-delay-9',
  );
  separator.textContent = ' / ';
  ctaContainer.append(separator);

  // Register Link
  const registerLink = document.createElement('a');
  registerLink.classList.add(
    'link',
    'small',
    'black',
    'register',
    'animate-enter-fade-up-short',
    'animate-delay-9',
  );
  if (registerLinkRow) {
    const foundRegisterLink = registerLinkRow.querySelector('a');
    if (foundRegisterLink) {
      registerLink.href = foundRegisterLink.href;
    }
    moveInstrumentation(registerLinkRow, registerLink);
  }
  if (registerLabelRow) {
    const span = document.createElement('span');
    span.classList.add('button-text');
    span.textContent = registerLabelRow.textContent.trim();
    registerLink.append(span);
    moveInstrumentation(registerLabelRow, span);
  }
  registerLink.setAttribute('aria-label', 'Register');
  registerLink.setAttribute('rel', 'follow');
  ctaContainer.append(registerLink);

  const productCardWtb = document.createElement('div');
  productCardWtb.classList.add('product-card__wtb');
  cellWrapper.append(productCardWtb);

  block.replaceChildren(section);
}
