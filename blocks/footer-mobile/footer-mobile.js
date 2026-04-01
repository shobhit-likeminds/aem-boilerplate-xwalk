import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children based on the BlockJson model
  // copyright and privacy-policy are root fields, the rest are item rows
  const [copyrightRow, privacyPolicyRow, ...itemRows] = [...block.children];

  // Main container
  const container = document.createElement('div');
  container.classList.add('container');

  // Social Links section
  const linkSocial = document.createElement('div');
  linkSocial.classList.add('link-social');

  const titleSocial = document.createElement('div');
  titleSocial.classList.add('title-social');
  titleSocial.textContent = 'Follow Us'; // Hardcoded text from original HTML

  const socialParagraph = document.createElement('p');
  // Filter for 'footer-social' items: rows with two cells, where the second cell contains an 'a' tag
  // and the first cell's text content is NOT empty and does NOT contain a common footer link label.
  // The BlockJson indicates 'footer-social' has 'label' and 'url' fields.
  const socialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2
      && cells[1].querySelector('a')
      && cells[0].textContent.trim() !== ''
      && !cells[0].textContent.toLowerCase().includes('about us') // Heuristic to distinguish from footer-link
      && !cells[0].textContent.toLowerCase().includes('products'); // Heuristic to distinguish from footer-link
  });

  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const link = cells[1].querySelector('a');
    if (link) {
      const socialLink = document.createElement('a');
      socialLink.href = link.href;
      const icon = document.createElement('i');
      icon.classList.add('fa');
      // Determine icon class based on label or URL if possible, otherwise default
      const labelText = cells[0].textContent.toLowerCase();
      if (labelText.includes('twitter') || socialLink.href.includes('twitter')) {
        icon.classList.add('fa-twitter');
      } else if (labelText.includes('facebook') || socialLink.href.includes('facebook')) {
        icon.classList.add('fa-facebook');
      } else if (labelText.includes('linkedin') || socialLink.href.includes('linkedin')) {
        icon.classList.add('fa-linkedin');
      }
      icon.innerHTML = '&nbsp;';
      socialLink.append(icon);
      moveInstrumentation(row, socialLink);
      socialParagraph.append(socialLink);
    }
  });

  linkSocial.append(titleSocial, socialParagraph);

  // Footer Links section
  const linkFooter = document.createElement('div');
  linkFooter.classList.add('link-footer', 'clearfix');

  // Filter for 'footer-link' items: rows with two cells, where the second cell contains an 'a' tag
  // and the first cell's text content is NOT empty and does NOT correspond to social labels.
  // The BlockJson indicates 'footer-link' has 'label' and 'url' fields.
  const footerLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2
      && cells[1].querySelector('a')
      && cells[0].textContent.trim() !== ''
      && !cells[0].textContent.toLowerCase().includes('twitter') // Heuristic to distinguish from social-link
      && !cells[0].textContent.toLowerCase().includes('facebook') // Heuristic to distinguish from social-link
      && !cells[0].textContent.toLowerCase().includes('linkedin'); // Heuristic to distinguish from social-link
  });

  // Split footer links into two columns as per original HTML structure
  const half = Math.ceil(footerLinks.length / 2);
  const ul1 = document.createElement('ul');
  ul1.classList.add('text-footer');
  const ul2 = document.createElement('ul');
  ul2.classList.add('text-footer');

  footerLinks.forEach((row, index) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const link = cells[1].querySelector('a');
    const label = cells[0].textContent;
    if (link) {
      const footerLink = document.createElement('a');
      footerLink.href = link.href;
      footerLink.textContent = label;
      li.append(footerLink);
    }
    if (index < half) {
      ul1.append(li);
    } else {
      ul2.append(li);
    }
  });

  linkFooter.append(ul1, ul2);
  container.append(linkSocial, linkFooter);

  // Footer Bottom section
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('copyright');
  moveInstrumentation(copyrightRow, copyrightDiv);
  // Access the content of the copyright row's first cell
  const copyrightCell = [...copyrightRow.children][0];
  if (copyrightCell) {
    copyrightDiv.innerHTML = copyrightCell.innerHTML; // Use innerHTML to preserve potential span/year
  }

  const linkTerm = document.createElement('div');
  linkTerm.classList.add('link-term');
  moveInstrumentation(privacyPolicyRow, linkTerm);
  // Access the content of the privacy policy row's first cell
  const privacyPolicyCell = [...privacyPolicyRow.children][0];
  const privacyLink = privacyPolicyCell ? privacyPolicyCell.querySelector('a') : null;
  if (privacyLink) {
    const termLink = document.createElement('a');
    termLink.href = privacyLink.href;
    termLink.textContent = privacyLink.textContent;
    linkTerm.append(termLink);
  }

  block.textContent = '';
  block.classList.add('footer-mobile', 'visible-xs'); // Add main block classes
  block.append(container, footerBottom);
}
