import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block itself is the footer element in the source HTML.
  // Add the classes and role from the source HTML to the block.
  block.classList.add('footer-site-footer');
  block.setAttribute('role', 'contentinfo');

  // Assuming there's only one row for the footer content
  const row = block.children[0];
  if (!row) {
    // No content provided, return early
    return;
  }

  // Extract content from cells based on the Block JSON definition order
  const copyrightTextCell = row.children[0];
  const copyrightLinkCell = row.children[1];
  const privacyPolicyLinkCell = row.children[2];

  // Create the main wrapper div
  const designCreditDiv = document.createElement('div');
  designCreditDiv.classList.add('footer-design-credit');
  moveInstrumentation(row, designCreditDiv);

  // Create the span for copyright text and links
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-copyright-text');

  // Append the copyright text
  if (copyrightTextCell) {
    // The copyrightText field is rich text, so it might contain HTML. Append its children.
    while (copyrightTextCell.firstChild) {
      copyrightSpan.append(copyrightTextCell.firstChild);
    }
  }

  // Append the copyright link
  if (copyrightLinkCell) {
    const sourceCopyrightLink = copyrightLinkCell.querySelector('a');
    if (sourceCopyrightLink) {
      const copyrightLink = document.createElement('a');
      copyrightLink.classList.add('footer-copyright-link');
      copyrightLink.href = sourceCopyrightLink.href;
      copyrightLink.textContent = sourceCopyrightLink.textContent;
      moveInstrumentation(sourceCopyrightLink, copyrightLink);
      copyrightSpan.append(copyrightLink);
    }
  }

  // Append separator and privacy policy link
  if (privacyPolicyLinkCell) {
    copyrightSpan.append(document.createTextNode(' | ')); // Add separator text
    const sourcePrivacyLink = privacyPolicyLinkCell.querySelector('a');
    if (sourcePrivacyLink) {
      const privacyLink = document.createElement('a');
      privacyLink.classList.add('footer-privacy-link');
      privacyLink.href = sourcePrivacyLink.href;
      privacyLink.textContent = sourcePrivacyLink.textContent;
      moveInstrumentation(sourcePrivacyLink, privacyLink);
      copyrightSpan.append(privacyLink);
    }
  }

  // Append the span to the design credit div
  designCreditDiv.append(copyrightSpan);

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(designCreditDiv);
}
