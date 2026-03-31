import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [copyrightRow, privacyPolicyLinkRow, ...itemRows] = [...block.children];

  const socialLinks = [];
  const footerLinks = [];

  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2) {
      const firstCellText = cells[0].textContent.trim();
      const secondCellLink = cells[1].querySelector('a');

      // Check if it's a social link (based on icon class pattern, e.g., 'fa-twitter')
      // This is a heuristic, assuming social links have specific icon class names.
      // A more robust solution might involve a data attribute or a specific class on the row.
      if (firstCellText.startsWith('fa-') && secondCellLink) {
        socialLinks.push(row);
      } else if (secondCellLink) { // If it has a label and a link, assume it's a footer link
        footerLinks.push(row);
      }
    }
  });

  const container = document.createElement('div');
  container.classList.add('container');

  // Social Links
  if (socialLinks.length > 0) {
    const linkSocial = document.createElement('div');
    linkSocial.classList.add('link-social');

    const titleSocial = document.createElement('div');
    titleSocial.classList.add('title-social');
    titleSocial.textContent = 'Follow Us';
    linkSocial.append(titleSocial);

    const socialParagraph = document.createElement('p');
    socialLinks.forEach((row) => {
      const cells = [...row.children];
      const iconClassCell = cells[0];
      const urlCell = cells[1];

      const a = document.createElement('a');
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        a.href = foundLink.href;
      }
      moveInstrumentation(urlCell, a);

      const i = document.createElement('i');
      i.classList.add('fa');
      if (iconClassCell) {
        i.classList.add(iconClassCell.textContent.trim());
      }
      i.innerHTML = '&nbsp;';
      a.append(i);
      socialParagraph.append(a);
    });
    linkSocial.append(socialParagraph);
    container.append(linkSocial);
  }

  // Footer Links
  if (footerLinks.length > 0) {
    const linkFooter = document.createElement('div');
    linkFooter.classList.add('link-footer', 'clearfix');

    // Split footer links into two columns if needed
    const midPoint = Math.ceil(footerLinks.length / 2);
    const ul1 = document.createElement('ul');
    ul1.classList.add('text-footer');
    const ul2 = document.createElement('ul');
    ul2.classList.add('text-footer');

    footerLinks.forEach((row, index) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);

      const cells = [...row.children];
      const labelCell = cells[0];
      const urlCell = cells[1];

      const a = document.createElement('a');
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        a.href = foundLink.href;
      }
      if (labelCell) {
        a.textContent = labelCell.textContent.trim();
      }
      li.append(a);

      if (index < midPoint) {
        ul1.append(li);
      } else {
        ul2.append(li);
      }
    });

    linkFooter.append(ul1);
    if (ul2.children.length > 0) {
      linkFooter.append(ul2);
    }
    container.append(linkFooter);
  }

  block.textContent = '';
  block.classList.add('visible-xs');
  block.append(container);

  // Footer Bottom (Copyright and Privacy Policy)
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('copyright');
  moveInstrumentation(copyrightRow, copyrightDiv);
  const copyrightText = copyrightRow.querySelector('div').textContent.trim();
  const currentYear = new Date().getFullYear();
  copyrightDiv.innerHTML = `${copyrightText.replace('2023', `<span id="cyear">${currentYear}</span>`)}`;
  footerBottom.append(copyrightDiv);

  const privacyLinkDiv = document.createElement('div');
  privacyLinkDiv.classList.add('link-term');
  moveInstrumentation(privacyPolicyLinkRow, privacyLinkDiv);
  const privacyLink = privacyPolicyLinkRow.querySelector('a');
  if (privacyLink) {
    const newPrivacyLink = document.createElement('a');
    newPrivacyLink.href = privacyLink.href;
    newPrivacyLink.textContent = privacyLink.textContent.trim();
    privacyLinkDiv.append(newPrivacyLink);
  }
  footerBottom.append(privacyLinkDiv);

  block.append(footerBottom);
}
