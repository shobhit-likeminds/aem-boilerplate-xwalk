import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Reordered to match the BlockJson model: title, subtitle, images (item rows), ctaLink, ctaLabel
  const [
    titleRow,
    subtitleRow,
    ctaLinkRow, // This is block.children[2]
    ctaLabelRow, // This is block.children[3]
    ...imageItemRows // These are block.children[4] onwards
  ] = children;

  block.innerHTML = '';
  block.classList.add('cmp-social');

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('cmp-social__title-container');
  block.append(titleContainer);

  // Section Title
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title', 'cmp-social__title');
  moveInstrumentation(titleRow, titleDiv);

  const cmpTitle = document.createElement('div');
  cmpTitle.classList.add('cmp-title', 'title-star-icon');
  titleDiv.append(cmpTitle);

  const h2 = document.createElement('h2');
  h2.classList.add('cmp-title__text');
  h2.textContent = titleRow.textContent.trim();
  cmpTitle.append(h2);
  titleContainer.append(titleDiv);

  // Section Subtitle
  const subtitleDiv = document.createElement('div');
  subtitleDiv.classList.add('text', 'cmp-social__sub-title', 'body-3');
  moveInstrumentation(subtitleRow, subtitleDiv);

  const cmpText = document.createElement('div');
  cmpText.classList.add('cmp-text');
  subtitleDiv.append(cmpText);

  const p = document.createElement('p');
  p.textContent = subtitleRow.textContent.trim();
  cmpText.append(p);
  titleContainer.append(subtitleDiv);

  // Social Images
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('cmp-social__card-container', 'cmp-social__card-container--anchor');
  block.append(cardContainer);

  // Distribute images into 4 columns
  const numColumns = 4;
  const columns = Array.from({ length: numColumns }, () => {
    const col = document.createElement('div');
    col.classList.add('cmp-social__card-column');
    cardContainer.append(col);
    return col;
  });

  imageItemRows.forEach((row, index) => {
    // Correctly destructuring cells for social-image-item
    const [imageCell, linkCell] = [...row.children];

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        // moveInstrumentation for the image should be on the picture element itself or its wrapper
        // The current implementation moves it to the img inside the optimized picture, which is acceptable.
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        anchor.append(optimizedPic);
      }
    }
    moveInstrumentation(row, anchor); // Move instrumentation for the whole row to the anchor
    columns[index % numColumns].append(anchor);
  });

  // CTA Button
  const socialButtonDiv = document.createElement('div');
  socialButtonDiv.classList.add('socialButton', 'button', 'cmp-button--primary-anchor');
  // moveInstrumentation for ctaLinkRow was missing, added here
  moveInstrumentation(ctaLinkRow, socialButtonDiv);
  block.append(socialButtonDiv);

  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add('cmp-button');
  ctaAnchor.setAttribute('data-request', 'true');
  ctaAnchor.setAttribute('target', '_blank'); // Assuming from original HTML

  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaAnchor.href = foundCtaLink.href;
  }

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('cmp-button__text');
  ctaSpan.textContent = ctaLabelRow.textContent.trim();
  ctaAnchor.append(ctaSpan);

  socialButtonDiv.append(ctaAnchor);
  moveInstrumentation(ctaLabelRow, ctaSpan); // Move instrumentation for label to the span

  // Gradient
  const gradientDiv = document.createElement('div');
  gradientDiv.classList.add('cmp-social__gradient');
  block.append(gradientDiv);
}
