import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    ctaLinkRow,
    ctaLinkLabelRow,
    ctaIconRow,
    imageRow,
  ] = [...block.children];

  // Main container
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('w-100-thar', 'position-relative-thar');

  // Text overlay container
  const textOverlay = document.createElement('div');
  textOverlay.classList.add(
    'position-absolute-thar',
    'w-100-thar',
    'd-flex-thar',
    'justify-content-center-thar',
    'bt-lg-60',
    'b-md-30',
    'b-sm-30',
    'px-20-textov',
  );

  const textContentWrapper = document.createElement('div');
  textContentWrapper.classList.add(
    'd-flex-thar',
    'flex-column-thar',
    'w-50-textov-md',
    'w-100-textov-sm',
    'tc-textov-md',
    'tl-textov-sm',
  );

  // Title
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('mb-10-textov');
  const titleP = document.createElement('p');
  titleP.classList.add('textov-sec1', 'my-auto-thar');
  moveInstrumentation(titleRow.firstElementChild, titleP);
  titleP.textContent = titleRow.firstElementChild.textContent.trim();
  titleDiv.append(titleP);
  textContentWrapper.append(titleDiv);

  // Subtitle
  const subtitleDiv = document.createElement('div');
  subtitleDiv.classList.add('mb-10-textov');
  const subtitleP = document.createElement('p');
  subtitleP.classList.add('textov-sec2-md', 'textov-sec2-sm');
  moveInstrumentation(subtitleRow.firstElementChild, subtitleP);
  subtitleP.textContent = subtitleRow.firstElementChild.textContent.trim();
  subtitleDiv.append(subtitleP);
  textContentWrapper.append(subtitleDiv);

  // CTA Link
  const ctaDiv = document.createElement('div');
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('textov-sec3', 'my-auto-thar');

  const originalCtaLink = ctaLinkRow.querySelector('a');
  if (originalCtaLink) {
    ctaLink.href = originalCtaLink.href;
    moveInstrumentation(originalCtaLink, ctaLink); // Instrument the original <a> tag
  }

  const ctaLinkLabel = ctaLinkLabelRow.firstElementChild.textContent.trim();
  ctaLink.textContent = ctaLinkLabel;
  moveInstrumentation(ctaLinkLabelRow.firstElementChild, ctaLink);

  const ctaIconPicture = ctaIconRow.querySelector('picture');
  if (ctaIconPicture) {
    const img = ctaIconPicture.querySelector('img');
    if (img) {
      const optimizedIcon = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
      moveInstrumentation(img, optimizedIcon.querySelector('img'));
      ctaLink.append(optimizedIcon);
    }
  }
  moveInstrumentation(ctaIconRow.firstElementChild, ctaLink); // Instrument the original cell content

  ctaDiv.append(ctaLink);
  textContentWrapper.append(ctaDiv);

  textOverlay.append(textContentWrapper);
  mainWrapper.append(textOverlay);

  // Image container
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('textov-img-wr', 'w-10i-textov-md', 'w-100-textov-sm');

  const imagePicture = imageRow.querySelector('picture');
  if (imagePicture) {
    const img = imagePicture.querySelector('img');
    if (img) {
      const optimizedImage = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
      optimizedImage.querySelector('img').classList.add('imagewithtextover-large');
      moveInstrumentation(img, optimizedImage.querySelector('img'));
      imageWrapper.append(optimizedImage);
    }
  }
  moveInstrumentation(imageRow.firstElementChild, imageWrapper);

  mainWrapper.append(imageWrapper);

  block.textContent = '';
  block.append(mainWrapper);
}
