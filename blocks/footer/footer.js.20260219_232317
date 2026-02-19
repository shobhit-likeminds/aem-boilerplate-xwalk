import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerDesignCredit = document.createElement('div');
  footerDesignCredit.classList.add('footer-design-credit');

  const footerCopyrightText = document.createElement('span');
  footerCopyrightText.classList.add('footer-copyright-text');

  // Assuming the block has only one row for the footer content
  if (block.children.length > 0) {
    const row = block.children[0];
    moveInstrumentation(row, footerDesignCredit);
    const cells = [...row.children];

    let copyrightTextContent = '';
    let copyrightLinkHref = '';
    let copyrightLinkText = '';
    let privacyPolicyLinkHref = '';
    let privacyPolicyLinkText = '';

    // Extract content from cells based on their content type
    cells.forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        // Check if it's the copyright link or privacy policy link
        // This assumes specific text content or a unique identifier in the future
        // For now, we'll try to infer based on typical footer structure
        if (link.href.includes('practicetestautomation.com') && !link.href.includes('privacy-policy')) {
          copyrightLinkHref = link.href;
          copyrightLinkText = link.textContent.trim();
        } else if (link.href.includes('privacy-policy')) {
          privacyPolicyLinkHref = link.href;
          privacyPolicyLinkText = link.textContent.trim();
        }
      } else {
        // This cell likely contains the copyright text part
        copyrightTextContent = cell.textContent.trim();
      }
    });

    // Reconstruct the span content
    const copyrightYearText = copyrightTextContent.split('© Copyright')[1]?.split('All rights reserved')[0]?.trim() || '';
    footerCopyrightText.textContent = `© Copyright ${copyrightYearText} `;

    const copyrightLink = document.createElement('a');
    copyrightLink.classList.add('footer-copyright-link');
    copyrightLink.href = copyrightLinkHref;
    copyrightLink.textContent = copyrightLinkText;
    footerCopyrightText.append(copyrightLink);

    footerCopyrightText.append(document.createTextNode(' All rights reserved | '));

    const privacyPolicyLink = document.createElement('a');
    privacyPolicyLink.classList.add('footer-privacy-policy-link');
    privacyPolicyLink.href = privacyPolicyLinkHref;
    privacyPolicyLink.textContent = privacyPolicyLinkText;
    footerCopyrightText.append(privacyPolicyLink);
  }

  footerDesignCredit.append(footerCopyrightText);

  block.textContent = '';
  block.classList.add('footer-site-footer'); // Add the class from the source HTML
  block.setAttribute('role', 'contentinfo'); // Add the role from the source HTML
  block.append(footerDesignCredit);
}
