import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('visible-xs');

  const [copyrightRow, privacyPolicyLinkRow, ...itemRows] = [...block.children];

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const socialLinksDiv = document.createElement('div');
  socialLinksDiv.classList.add('link-social');

  const socialTitleDiv = document.createElement('div');
  socialTitleDiv.classList.add('title-social');
  socialTitleDiv.textContent = 'Follow Us';
  socialLinksDiv.append(socialTitleDiv);

  const socialParagraph = document.createElement('p');
  // Filter for social links: 1 cell containing an anchor
  const footerSocialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 1 && cells[0].querySelector('a');
  });

  footerSocialLinks.forEach((row) => {
    const linkCell = [...row.children][0]; // Safe as filtered for 1 child
    const link = linkCell.querySelector('a');
    if (link) {
      const socialLink = document.createElement('a');
      moveInstrumentation(row, socialLink);
      socialLink.href = link.href;
      const icon = document.createElement('i');
      icon.classList.add('fa');
      if (link.href.includes('twitter')) {
        icon.classList.add('fa-twitter');
      } else if (link.href.includes('facebook')) {
        icon.classList.add('fa-facebook');
      } else if (link.href.includes('linkedin')) {
        icon.classList.add('fa-linkedin');
      }
      icon.innerHTML = '&nbsp;';
      socialLink.append(icon);
      socialParagraph.append(socialLink);
    }
  });
  socialLinksDiv.append(socialParagraph);
  containerDiv.append(socialLinksDiv);

  const footerLinksDiv = document.createElement('div');
  footerLinksDiv.classList.add('link-footer', 'clearfix');

  // Filter for footer links: 2 cells
  const footerLinks = itemRows.filter((row) => [...row.children].length === 2);
  const half = Math.ceil(footerLinks.length / 2);
  const firstHalfLinks = footerLinks.slice(0, half);
  const secondHalfLinks = footerLinks.slice(half);

  const createLinkList = (links) => {
    const ul = document.createElement('ul');
    ul.classList.add('text-footer');
    links.forEach((row) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      const cells = [...row.children];
      const labelCell = cells[0]; // Safe as filtered for 2 children
      const urlCell = cells[1]; // Safe as filtered for 2 children
      if (labelCell && urlCell) {
        const link = urlCell.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          moveInstrumentation(labelCell, newLink);
          while (labelCell.firstChild) newLink.append(labelCell.firstChild);
          li.append(newLink);
        }
      }
      ul.append(li);
    });
    return ul;
  };

  footerLinksDiv.append(createLinkList(firstHalfLinks));
  footerLinksDiv.append(createLinkList(secondHalfLinks));
  containerDiv.append(footerLinksDiv);

  block.textContent = '';
  block.append(containerDiv);

  const footerBottomDiv = document.createElement('div');
  footerBottomDiv.classList.add('footer-bottom');

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('copyright');
  moveInstrumentation(copyrightRow, copyrightDiv);
  // Original HTML has "Copyright © JSW Steel <span id="cyear">2023</span> All rights reserved"
  // The JS was trying to prepend/append to a <p> that might not exist or be the direct child.
  // Better to reconstruct based on the original HTML structure.
  const copyrightText = copyrightRow.textContent.trim();
  const p = document.createElement('p');
  p.textContent = copyrightText; // Start with the text from the block
  copyrightDiv.append(p);

  const yearSpan = document.createElement('span');
  yearSpan.id = 'cyear';
  yearSpan.textContent = new Date().getFullYear().toString();

  // Reconstruct the copyright string as per original HTML
  p.textContent = 'Copyright © JSW Steel ';
  p.append(yearSpan);
  p.append(' All rights reserved');

  footerBottomDiv.append(copyrightDiv);

  const privacyLinkDiv = document.createElement('div');
  privacyLinkDiv.classList.add('link-term');
  moveInstrumentation(privacyPolicyLinkRow, privacyLinkDiv);
  while (privacyPolicyLinkRow.firstChild) privacyLinkDiv.append(privacyPolicyLinkRow.firstChild);
  footerBottomDiv.append(privacyLinkDiv);

  block.append(footerBottomDiv);
}
