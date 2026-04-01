import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('visible-xs');

  // The first two rows are copyright and privacyPolicy, the rest are item rows.
  // Using slice to safely get the first two and the rest.
  const allRows = [...block.children];
  const copyrightRow = allRows[0];
  const privacyPolicyRow = allRows[1];
  const itemRows = allRows.slice(2);

  // Distinguish social links (1 cell with a link) from footer links (2 cells, one text, one link)
  const socialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 1 && cells[0].querySelector('a');
  });
  const footerLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a'));
  });

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Social Links Section
  if (socialLinks.length > 0) {
    const linkSocialDiv = document.createElement('div');
    linkSocialDiv.classList.add('link-social');

    const titleSocialDiv = document.createElement('div');
    titleSocialDiv.classList.add('title-social');
    titleSocialDiv.textContent = 'Follow Us'; // Hardcoded as per original HTML

    const socialParagraph = document.createElement('p');

    socialLinks.forEach((row) => {
      const socialCell = row.querySelector('div'); // Should be the only div in the row
      if (socialCell) {
        const link = socialCell.querySelector('a');
        if (link) {
          const socialLink = document.createElement('a');
          socialLink.href = link.href;
          moveInstrumentation(socialCell, socialLink);

          const icon = document.createElement('i');
          icon.classList.add('fa');
          // Determine icon based on link href
          if (link.href.includes('twitter')) {
            icon.classList.add('fa-twitter');
          } else if (link.href.includes('facebook')) {
            icon.classList.add('fa-facebook');
          } else if (link.href.includes('linkedin')) {
            icon.classList.add('fa-linkedin');
          }
          icon.innerHTML = '&nbsp;'; // Add non-breaking space as in original HTML
          socialLink.append(icon);
          socialParagraph.append(socialLink);
        }
      }
      row.remove(); // Remove original row after processing
    });

    linkSocialDiv.append(titleSocialDiv, socialParagraph);
    containerDiv.append(linkSocialDiv);
  }

  // Footer Links Section
  if (footerLinks.length > 0) {
    const linkFooterDiv = document.createElement('div');
    linkFooterDiv.classList.add('link-footer', 'clearfix');

    const ul1 = document.createElement('ul');
    ul1.classList.add('text-footer');
    const ul2 = document.createElement('ul');
    ul2.classList.add('text-footer');

    footerLinks.forEach((row, index) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);

      const cells = [...row.children];
      const textCell = cells.find(cell => !cell.querySelector('a'));
      const urlCell = cells.find(cell => cell.querySelector('a'));

      if (textCell && urlCell) {
        const link = urlCell.querySelector('a');
        const footerLink = document.createElement('a');
        footerLink.href = link.href;
        footerLink.textContent = textCell.textContent;
        li.append(footerLink);
      }
      if (index < footerLinks.length / 2) {
        ul1.append(li);
      } else {
        ul2.append(li);
      }
      row.remove(); // Remove original row after processing
    });

    linkFooterDiv.append(ul1, ul2);
    containerDiv.append(linkFooterDiv);
  }

  block.append(containerDiv);

  // Footer Bottom Section
  const footerBottomDiv = document.createElement('div');
  footerBottomDiv.classList.add('footer-bottom');

  // Copyright
  if (copyrightRow) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('copyright');
    moveInstrumentation(copyrightRow, copyrightDiv);
    const copyrightText = copyrightRow.querySelector('div')?.textContent || '';
    copyrightDiv.textContent = copyrightText.replace('Copyright value', `Copyright © JSW Steel ${new Date().getFullYear()} All rights reserved`);
    copyrightRow.remove();
    footerBottomDiv.append(copyrightDiv);
  }


  // Privacy Policy
  if (privacyPolicyRow) {
    const linkTermDiv = document.createElement('div');
    linkTermDiv.classList.add('link-term');
    moveInstrumentation(privacyPolicyRow, linkTermDiv);
    const privacyLink = privacyPolicyRow.querySelector('a');
    if (privacyLink) {
      const newPrivacyLink = document.createElement('a');
      newPrivacyLink.href = privacyLink.href;
      newPrivacyLink.textContent = privacyLink.textContent;
      linkTermDiv.append(newPrivacyLink);
    }
    privacyPolicyRow.remove();
    footerBottomDiv.append(linkTermDiv);
  }

  block.append(footerBottomDiv);
}
