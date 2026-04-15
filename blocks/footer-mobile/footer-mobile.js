import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleSocialRow,
    socialLinksRow,
    copyrightRow,
    privacyPolicyLinkRow,
    privacyPolicyLinkLabelRow,
    ...itemRows
  ] = [...block.children];

  block.classList.add('visible-xs');

  const container = document.createElement('div');
  container.classList.add('container');

  // Link Social section
  const linkSocial = document.createElement('div');
  linkSocial.classList.add('link-social');

  const titleSocial = document.createElement('div');
  titleSocial.classList.add('title-social');
  moveInstrumentation(titleSocialRow, titleSocial);
  titleSocial.textContent = titleSocialRow.firstElementChild.textContent.trim();
  linkSocial.append(titleSocial);

  const socialLinksP = document.createElement('p');
  moveInstrumentation(socialLinksRow, socialLinksP);
  socialLinksP.innerHTML = socialLinksRow.firstElementChild.innerHTML;

  // Transform social links to include icons
  socialLinksP.querySelectorAll('a').forEach((a) => {
    const href = a.href;
    const i = document.createElement('i');
    if (href.includes('twitter.com')) {
      i.classList.add('fa', 'fa-twitter');
    } else if (href.includes('facebook.com')) {
      i.classList.add('fa', 'fa-facebook');
    } else if (href.includes('linkedin.com')) {
      i.classList.add('fa', 'fa-linkedin');
    }
    a.textContent = ''; // Clear existing text
    a.append(i);
  });

  linkSocial.append(socialLinksP);
  container.append(linkSocial);

  // Footer Sections
  const linkFooter = document.createElement('div');
  linkFooter.classList.add('link-footer', 'clearfix');

  itemRows.forEach((row) => {
    // Footer Section items have only one cell: "sectionLinks" (type=richtext)
    const sectionLinksCell = [...row.children].find((cell) => cell.innerHTML.trim().length > 0);
    if (sectionLinksCell) {
      const ul = document.createElement('ul');
      ul.classList.add('text-footer');
      moveInstrumentation(row, ul);
      ul.innerHTML = sectionLinksCell.innerHTML;
      linkFooter.append(ul);
    }
  });

  container.append(linkFooter);
  block.append(container);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  const copyright = document.createElement('div');
  copyright.classList.add('copyright');
  moveInstrumentation(copyrightRow, copyright);
  copyright.innerHTML = copyrightRow.firstElementChild.textContent.trim();
  // Add current year span if not present in authored content
  if (!copyright.querySelector('#cyear')) {
    const yearSpan = document.createElement('span');
    yearSpan.id = 'cyear';
    yearSpan.textContent = new Date().getFullYear().toString();
    copyright.append(' ', yearSpan);
  }
  copyright.append(' All rights reserved');
  footerBottom.append(copyright);

  const linkTerm = document.createElement('div');
  linkTerm.classList.add('link-term');

  const privacyLink = document.createElement('a');
  const foundPrivacyLinkAnchor = privacyPolicyLinkRow.querySelector('a'); // privacyPolicyLink is type=aem-content
  if (foundPrivacyLinkAnchor) {
    privacyLink.href = foundPrivacyLinkAnchor.href;
  }
  moveInstrumentation(privacyPolicyLinkRow, privacyLink);
  privacyLink.textContent = privacyPolicyLinkLabelRow.firstElementChild.textContent.trim(); // privacyPolicyLinkLabel is type=text
  linkTerm.append(privacyLink);
  footerBottom.append(linkTerm);

  block.append(footerBottom);
}
