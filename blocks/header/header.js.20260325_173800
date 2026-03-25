import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, primaryCtaLinkRow, secondaryLinkRow] = [...block.children];

  const headerElement = document.createElement('header');

  // Heading
  const h1 = document.createElement('h1');
  moveInstrumentation(headingRow, h1);
  // Original HTML has plain text inside h1, not nested elements
  h1.textContent = headingRow.firstElementChild.textContent;
  headerElement.append(h1);

  // Description
  const p = document.createElement('p');
  moveInstrumentation(descriptionRow, p);
  // Move all child nodes from the description cell into the new p element
  while (descriptionRow.firstElementChild.firstChild) {
    p.append(descriptionRow.firstElementChild.firstChild);
  }
  headerElement.append(p);

  // CTA options
  const ctaOptionDiv = document.createElement('div');
  ctaOptionDiv.classList.add('cta-option');

  // Primary CTA Link
  const primaryCtaLink = primaryCtaLinkRow.querySelector('a');
  if (primaryCtaLink) {
    const btnDownload = document.createElement('a');
    btnDownload.classList.add('btn-download');
    btnDownload.href = primaryCtaLink.href;
    moveInstrumentation(primaryCtaLinkRow, btnDownload);
    // Original HTML has strong tag inside the anchor, not just text content
    const strong = document.createElement('strong');
    strong.textContent = primaryCtaLink.textContent;
    btnDownload.append(strong);
    ctaOptionDiv.append(btnDownload);
  }

  // Secondary Link
  const secondaryLink = secondaryLinkRow.querySelector('a');
  if (secondaryLink) {
    const small = document.createElement('small');
    const changelogLink = document.createElement('a');
    changelogLink.classList.add('changelog');
    changelogLink.href = secondaryLink.href;
    moveInstrumentation(secondaryLinkRow, changelogLink);
    changelogLink.textContent = secondaryLink.textContent;
    small.append(changelogLink);
    ctaOptionDiv.append(small);
  }

  headerElement.append(ctaOptionDiv);

  block.textContent = '';
  block.append(headerElement);
}
