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
    'grid-container',
    'padding',
    'animate-enter',
    'in-view',
  );
  section.setAttribute('aria-label', 'Home Page Description Module');

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x', 'max-width-container');

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

  // Image
  const imageContainer = document.createElement('div');
  imageContainer.classList.add(
    'image-container',
    'animate-enter-fade-up-short',
    'animate-delay-3',
  );
  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
        { width: '750' },
      ]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageContainer.append(optimizedPic);
    }
  }
  moveInstrumentation(imageRow, imageContainer);
  cellWrapper.append(imageContainer);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add(
    'description1',
    'bodyMediumRegular',
    'animate-enter-fade-up-short',
    'animate-delay-5',
  );
  descriptionDiv.innerHTML = descriptionRow.children[0]?.innerHTML || '';
  moveInstrumentation(descriptionRow, descriptionDiv);
  cellWrapper.append(descriptionDiv);

  // CTA Container
  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('cta-container');

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
  const foundSignInLink = signInLinkRow.querySelector('a');
  if (foundSignInLink) {
    signInLink.href = foundSignInLink.href;
    signInLink.setAttribute('aria-label', 'Sign in');
    signInLink.setAttribute('rel', 'follow');
  }
  const signInSpan = document.createElement('span');
  signInSpan.classList.add('button-text');
  signInSpan.textContent = signInLabelRow.textContent.trim();
  signInLink.append(signInSpan);
  moveInstrumentation(signInLinkRow, signInLink);
  moveInstrumentation(signInLabelRow, signInSpan); // Move instrumentation from label row to the span
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
  const foundRegisterLink = registerLinkRow.querySelector('a');
  if (foundRegisterLink) {
    registerLink.href = foundRegisterLink.href;
    registerLink.setAttribute('aria-label', 'Register');
    registerLink.setAttribute('rel', 'follow');
  }
  const registerSpan = document.createElement('span');
  registerSpan.classList.add('button-text');
  registerSpan.textContent = registerLabelRow.textContent.trim();
  registerLink.append(registerSpan);
  moveInstrumentation(registerLinkRow, registerLink);
  moveInstrumentation(registerLabelRow, registerSpan); // Move instrumentation from label row to the span
  ctaContainer.append(registerLink);

  cellWrapper.append(ctaContainer);

  // Product card WTB (empty div as per original HTML)
  const productCardWtb = document.createElement('div');
  productCardWtb.classList.add('product-card__wtb');
  cellWrapper.append(productCardWtb);

  gridX.append(cellWrapper);
  section.append(gridX);

  block.replaceChildren(section);
}
