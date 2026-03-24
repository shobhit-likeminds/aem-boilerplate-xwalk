import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    socialLinksContainer,
    navigationLinksContainer,
    languagesContainer,
    policyLinksContainer,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('footer-wrapper');

  // Navigation section
  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('navigation', 'footer-nav-css-from-wrapper');
  block.append(navigationDiv);

  const navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('navigation-wrapper');
  navigationDiv.append(navigationWrapper);

  // Logo
  const navigationLogo = document.createElement('div');
  navigationLogo.classList.add('navigation-logo');
  navigationWrapper.append(navigationLogo);

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.setAttribute('target', '_self');
  logoLink.setAttribute('aria-label', 'Qiddiya - Go to homepage');
  navigationLogo.append(logoLink);

  const logoSpan = document.createElement('span');
  logoSpan.classList.add('qd-icon', 'qd-icon--logo', 'qd-logo-footer');
  for (let i = 1; i <= 25; i += 1) {
    const pathSpan = document.createElement('span');
    pathSpan.classList.add(`path${i}`);
    logoSpan.append(pathSpan);
  }
  logoLink.append(logoSpan);

  const navigationContent = document.createElement('div');
  navigationContent.classList.add('navigation-content');
  navigationWrapper.append(navigationContent);

  // Social Links
  const socialLinksDiv = document.createElement('div');
  socialLinksDiv.classList.add('socialLinks', 'social-links', 'footer-social-css-from-wrapper');
  navigationContent.append(socialLinksDiv);

  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('social-links-list');
  socialLinksDiv.append(socialLinksList);

  // Filter social link items from the initial container
  const socialLinkItems = [...socialLinksContainer.children].filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child').textContent.trim() !== ''
  );

  socialLinkItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('social-links-item');

    const linkCell = row.children[0];
    const labelCell = row.children[1];

    const foundLink = linkCell.querySelector('a');
    const linkEl = document.createElement('a');
    linkEl.classList.add('social-links-icon', 'qd-icon');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('aria-label', labelCell.textContent.trim());
    }

    const iconClass = labelCell.textContent.trim().toLowerCase();
    if (iconClass === 'x') {
      linkEl.classList.add('qd-icon--x');
    } else if (iconClass === 'instagram') {
      linkEl.classList.add('qd-icon--instagram');
    } else if (iconClass === 'youtube') {
      linkEl.classList.add('qd-icon--youtube');
    } else if (iconClass === 'tiktok') {
      linkEl.classList.add('qd-icon--tiktok');
    } else if (iconClass === 'linkedin') {
      linkEl.classList.add('qd-icon--linkedin');
    }
    li.append(linkEl);
    socialLinksList.append(li);
  });

  // Navigation Links
  const navigationLinksList = document.createElement('ul');
  navigationLinksList.classList.add('navigation-links');
  navigationContent.append(navigationLinksList);

  // Filter navigation link items from the initial container
  const navLinkItems = [...navigationLinksContainer.children].filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child').textContent.trim() !== ''
  );

  navLinkItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const linkCell = row.children[0];
    const labelCell = row.children[1];

    const foundLink = linkCell.querySelector('a');
    const linkEl = document.createElement('a');
    linkEl.classList.add('navigation-link-item');
    linkEl.setAttribute('tabindex', '0');
    linkEl.setAttribute('target', '_self');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.title = labelCell.textContent.trim();
      linkEl.textContent = labelCell.textContent.trim();
    }
    li.append(linkEl);
    navigationLinksList.append(li);
  });

  // Divider
  const divider = document.createElement('div');
  divider.classList.add('footer-divider');
  block.append(divider);

  // Bottom section
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');
  block.append(footerBottom);

  // Language Selector
  const languageSelectorDiv = document.createElement('div');
  languageSelectorDiv.classList.add('language-selector', 'footer-lang-css-from-wrapper');
  footerBottom.append(languageSelectorDiv);

  const languageSelectorList = document.createElement('ul');
  languageSelectorList.classList.add('language-selector-list');
  languageSelectorDiv.append(languageSelectorList);

  // Filter language items from the initial container
  const languageItems = [...languagesContainer.children].filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child').textContent.trim() !== ''
  );

  languageItems.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    if (index === 0) {
      li.classList.add('active');
    }

    const linkCell = row.children[0];
    const labelCell = row.children[1];

    const foundLink = linkCell.querySelector('a');
    const linkEl = document.createElement('a');
    linkEl.classList.add('language-selector-link');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.setAttribute('aria-label', labelCell.textContent.trim());
      linkEl.setAttribute('data-lang', labelCell.textContent.trim().toLowerCase().substring(0, 2));
      linkEl.textContent = labelCell.textContent.trim();
    }
    li.append(linkEl);
    languageSelectorList.append(li);
  });

  // Policy Links
  const policyLinksDiv = document.createElement('div');
  policyLinksDiv.classList.add('policy-links', 'footer-policy-css-from-wrapper');
  footerBottom.append(policyLinksDiv);

  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.classList.add('policy-links-wrapper');
  policyLinksDiv.append(policyLinksWrapper);

  const policyLinksContent = document.createElement('div');
  policyLinksContent.classList.add('policy-links-content');
  policyLinksWrapper.append(policyLinksContent);

  // Filter policy link items from the initial container
  const policyLinkItems = [...policyLinksContainer.children].filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child').textContent.trim() !== ''
  );

  policyLinkItems.forEach((row) => {
    const linkCell = row.children[0];
    const labelCell = row.children[1];

    const foundLink = linkCell.querySelector('a');
    const linkEl = document.createElement('a');
    linkEl.classList.add('policy-links-item');
    linkEl.setAttribute('tabindex', '0');
    linkEl.setAttribute('target', '_self');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.title = labelCell.textContent.trim();
      linkEl.textContent = labelCell.textContent.trim();
    }
    moveInstrumentation(row, linkEl);
    policyLinksContent.append(linkEl);
  });

  // Copyright
  const copyrightP = document.createElement('p');
  copyrightP.classList.add('policy-links-copyright');
  moveInstrumentation(copyrightRow, copyrightP);
  copyrightP.textContent = copyrightRow.querySelector('div:last-child').textContent.trim();
  policyLinksWrapper.append(copyrightP);
}
