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
    ctaSeparatorRow,
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('home-page-description', 'grid-container', 'padding', 'animate-enter', 'in-view');
  section.setAttribute('aria-label', 'Home Page Description Module');

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x', 'max-width-container');
  section.append(gridX);

  const cellWrapper = document.createElement('div');
  cellWrapper.classList.add('cell', 'large-offset-1', 'large-10', 'xlarge-offset-2', 'xlarge-8', 'text-center', 'wrapper');
  gridX.append(cellWrapper);

  // Main Image
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container', 'animate-enter-fade-up-short', 'animate-delay-3');
  const imageCell = imageRow.children[0]; // Access the cell within the row
  const picture = imageCell?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    imageContainer.append(optimizedPic);
  }
  moveInstrumentation(imageRow, imageContainer);
  cellWrapper.append(imageContainer);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('description1', 'bodyMediumRegular', 'animate-enter-fade-up-short', 'animate-delay-5');
  // FIX: descriptionRow is a row, its innerHTML includes the cell wrapper.
  // We need to get the innerHTML of the actual content cell.
  // Since it's a richtext field, we want the full HTML content.
  const descriptionCell = descriptionRow.children[0];
  descriptionDiv.innerHTML = descriptionCell?.innerHTML || '';
  moveInstrumentation(descriptionRow, descriptionDiv);
  cellWrapper.append(descriptionDiv);

  // CTA Container
  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('cta-container');
  cellWrapper.append(ctaContainer);

  // Sign In Link
  const signInLink = document.createElement('a');
  signInLink.classList.add('link', 'small', 'black', 'sign-in', 'animate-enter-fade-up-short', 'animate-delay-9');
  const signInLinkCell = signInLinkRow.children[0]; // Access the cell
  const foundSignInLink = signInLinkCell?.querySelector('a');
  if (foundSignInLink) {
    signInLink.href = foundSignInLink.href;
  }
  signInLink.setAttribute('aria-label', 'Sign in');
  signInLink.setAttribute('rel', 'follow');
  const signInSpan = document.createElement('span');
  signInSpan.classList.add('button-text');
  const signInLabelCell = signInLabelRow.children[0]; // Access the cell
  signInSpan.textContent = signInLabelCell?.textContent.trim() || '';
  signInLink.append(signInSpan);
  moveInstrumentation(signInLinkRow, signInLink); // Instrumentation for the link row
  moveInstrumentation(signInLabelRow, signInSpan); // Instrumentation for the label row
  ctaContainer.append(signInLink);

  // Separator
  const separatorSpan = document.createElement('span');
  separatorSpan.classList.add('labelSmallBold', 'separator', 'animate-enter-fade-up-short', 'animate-delay-9');
  const ctaSeparatorCell = ctaSeparatorRow.children[0]; // Access the cell
  separatorSpan.textContent = ctaSeparatorCell?.textContent.trim() || '';
  moveInstrumentation(ctaSeparatorRow, separatorSpan);
  ctaContainer.append(separatorSpan);

  // Register Link
  const registerLink = document.createElement('a');
  registerLink.classList.add('link', 'small', 'black', 'register', 'animate-enter-fade-up-short', 'animate-delay-9');
  const registerLinkCell = registerLinkRow.children[0]; // Access the cell
  const foundRegisterLink = registerLinkCell?.querySelector('a');
  if (foundRegisterLink) {
    registerLink.href = foundRegisterLink.href;
  }
  registerLink.setAttribute('aria-label', 'Register');
  registerLink.setAttribute('rel', 'follow');
  const registerSpan = document.createElement('span');
  registerSpan.classList.add('button-text');
  const registerLabelCell = registerLabelRow.children[0]; // Access the cell
  registerSpan.textContent = registerLabelCell?.textContent.trim() || '';
  registerLink.append(registerSpan);
  moveInstrumentation(registerLinkRow, registerLink); // Instrumentation for the link row
  moveInstrumentation(registerLabelRow, registerSpan); // Instrumentation for the label row
  ctaContainer.append(registerLink);

  // Product Card WTB (empty div based on original HTML)
  const productCardWtb = document.createElement('div');
  productCardWtb.classList.add('product-card__wtb');
  cellWrapper.append(productCardWtb);

  block.replaceChildren(section);
}
