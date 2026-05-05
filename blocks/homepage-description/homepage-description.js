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
  section.classList.add(
    // 'home-page-description', // Removed: outer block div already has this class
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
  if (imageRow) {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add(
      'image-container',
      'animate-enter-fade-up-short',
      'animate-delay-3',
    );
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageContainer.append(optimizedPic);
    }
    moveInstrumentation(imageRow, imageContainer);
    cellWrapper.append(imageContainer);
  }

  // Description
  if (descriptionRow) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add(
      'description1',
      'bodyMediumRegular',
      'animate-enter-fade-up-short',
      'animate-delay-5',
    );
    // Fix: description is richtext, so read innerHTML directly from the row's first child (the cell)
    // The cell itself contains the <p> tag, so assigning row.children[0].innerHTML to a div is correct.
    // Assigning it to a <p> would create <p><p>...</p></p>
    descriptionDiv.innerHTML = descriptionRow.children[0]?.innerHTML || '';
    moveInstrumentation(descriptionRow, descriptionDiv);
    cellWrapper.append(descriptionDiv);
  }

  // CTA Container
  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('cta-container');

  // Sign In Link
  if (signInLinkRow && signInLabelRow) {
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
      signInLink.setAttribute('aria-label', signInLabelRow.textContent.trim());
      signInLink.setAttribute('rel', 'follow');
    }
    const signInSpan = document.createElement('span');
    signInSpan.classList.add('button-text');
    signInSpan.textContent = signInLabelRow.textContent.trim();
    signInLink.append(signInSpan);
    moveInstrumentation(signInLinkRow, signInLink);
    moveInstrumentation(signInLabelRow, signInSpan); // Move instrumentation for label row as well
    ctaContainer.append(signInLink);
  }

  // Separator
  if (ctaSeparatorRow) {
    const separatorSpan = document.createElement('span');
    separatorSpan.classList.add(
      'labelSmallBold',
      'separator',
      'animate-enter-fade-up-short',
      'animate-delay-9',
    );
    separatorSpan.textContent = ctaSeparatorRow.textContent.trim();
    moveInstrumentation(ctaSeparatorRow, separatorSpan);
    ctaContainer.append(separatorSpan);
  }

  // Register Link
  if (registerLinkRow && registerLabelRow) {
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
      registerLink.setAttribute('aria-label', registerLabelRow.textContent.trim());
      registerLink.setAttribute('rel', 'follow');
    }
    const registerSpan = document.createElement('span');
    registerSpan.classList.add('button-text');
    registerSpan.textContent = registerLabelRow.textContent.trim();
    registerLink.append(registerSpan);
    moveInstrumentation(registerLinkRow, registerLink);
    moveInstrumentation(registerLabelRow, registerSpan); // Move instrumentation for label row as well
    ctaContainer.append(registerLink);
  }

  cellWrapper.append(ctaContainer);

  // Append product-card__wtb div as seen in original HTML (empty)
  const productCardWtb = document.createElement('div');
  productCardWtb.classList.add('product-card__wtb');
  cellWrapper.append(productCardWtb);

  block.replaceChildren(section);
}
