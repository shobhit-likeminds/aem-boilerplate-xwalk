import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.setAttribute('role', 'contentinfo');

  const container = document.createElement('div');
  container.classList.add('container');

  // Logo and Back to Top
  const logoBtpDiv = document.createElement('div');
  logoBtpDiv.classList.add('footer__logo-btp');

  // Destructure the main block fields based on the BlockJson model
  const [
    logoRow, // block.children[0]
    logoLinkRow, // block.children[1]
    logoLinkLabelRow, // block.children[2]
    backToTopIconRow, // block.children[3]
    backToTopLinkRow, // block.children[4]
    backToTopLinkLabelRow, // block.children[5]
    facebookIconRow, // block.children[6]
    facebookLinkRow, // block.children[7]
    facebookLinkLabelRow, // block.children[8]
    twitterIconRow, // block.children[9]
    twitterLinkRow, // block.children[10]
    twitterLinkLabelRow, // block.children[11]
    youtubeIconRow, // block.children[12]
    youtubeLinkRow, // block.children[13]
    youtubeLinkLabelRow, // block.children[14]
    linkedinIconRow, // block.children[15]
    linkedinLinkRow, // block.children[16]
    linkedinLinkLabelRow, // block.children[17]
    instagramIconRow, // block.children[18]
    instagramLinkRow, // block.children[19]
    instagramLinkLabelRow, // block.children[20]
    copyrightRow, // block.children[21]
    termsLinkRow, // block.children[22]
    termsLinkLabelRow, // block.children[23]
    privacyLinkRow, // block.children[24]
    privacyLinkLabelRow, // block.children[25]
    accessibilityLinkRow, // block.children[26]
    accessibilityLinkLabelRow, // block.children[27]
    moreSitesLinksRow, // block.children[28]
    ...itemRows // Remaining rows are footer-section items
  ] = children;

  const logoLink = document.createElement('a');
  logoLink.classList.add('footer__logo');
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
    logoLink.setAttribute('aria-label', logoLinkLabelRow.textContent.trim());
  }
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoPicture, optimizedLogo.querySelector('img'));
    logoLink.append(optimizedLogo);
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoBtpDiv.append(logoLink);

  const backToTopButton = document.createElement('button');
  backToTopButton.classList.add('back-to-top__button');
  backToTopButton.setAttribute('data-function', 'back-to-top');
  backToTopButton.setAttribute('aria-label', backToTopLinkLabelRow.textContent.trim());
  backToTopButton.textContent = backToTopLinkLabelRow.textContent.trim();

  const backToTopSpan = document.createElement('span');
  const backToTopPicture = backToTopIconRow.querySelector('picture');
  if (backToTopPicture) {
    const backToTopImg = backToTopPicture.querySelector('img');
    const optimizedBackToTop = createOptimizedPicture(backToTopImg.src, backToTopImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(backToTopPicture, optimizedBackToTop.querySelector('img'));
    backToTopSpan.append(optimizedBackToTop);
  }
  backToTopButton.append(backToTopSpan);
  moveInstrumentation(backToTopLinkRow, backToTopButton);
  logoBtpDiv.append(backToTopButton);

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  container.append(logoBtpDiv);

  // Footer Sections
  const footerLinksDiv = document.createElement('div');
  footerLinksDiv.classList.add('footer__links');

  const footerLinksRow = document.createElement('div');
  footerLinksRow.classList.add('footer__links-row');

  itemRows.forEach((row) => {
    const [sectionTitleCell, sectionLinksCell] = [...row.children];
    const sectionDiv = document.createElement('div');

    const sectionTitle = document.createElement('h6');
    sectionTitle.classList.add('footer__column-title');
    sectionTitle.textContent = sectionTitleCell.textContent.trim();
    moveInstrumentation(sectionTitleCell, sectionTitle);
    sectionDiv.append(sectionTitle);

    const sectionLinksUl = sectionLinksCell.querySelector('ul');
    if (sectionLinksUl) {
      sectionLinksUl.classList.add('footer__links-list');
      [...sectionLinksUl.children].forEach((li) => {
        li.classList.add('footer__link');
      });
      moveInstrumentation(sectionLinksCell, sectionLinksUl);
      sectionDiv.append(sectionLinksUl);
    }
    footerLinksRow.append(sectionDiv);
  });
  footerLinksDiv.append(footerLinksRow);
  container.append(footerLinksDiv);

  // Social Links
  const socialLinksDiv = document.createElement('div');
  socialLinksDiv.classList.add('footer__social-links');

  const socialMedia = [
    { icon: facebookIconRow, link: facebookLinkRow, label: facebookLinkLabelRow, class: 'social-link--facebook' },
    { icon: twitterIconRow, link: twitterLinkRow, label: twitterLinkLabelRow, class: 'social-link--twitter' },
    { icon: youtubeIconRow, link: youtubeLinkRow, label: youtubeLinkLabelRow, class: 'social-link--youtube' },
    { icon: linkedinIconRow, link: linkedinLinkRow, label: linkedinLinkLabelRow, class: 'social-link--linkedin' },
    { icon: instagramIconRow, link: instagramLinkRow, label: instagramLinkLabelRow, class: 'social-link--instagram' },
  ];

  socialMedia.forEach(({ icon, link, label, class: socialClass }) => {
    const socialLink = document.createElement('a');
    socialLink.classList.add('social-link', socialClass);
    const socialAnchor = link.querySelector('a');
    if (socialAnchor) {
      socialLink.href = socialAnchor.href;
      socialLink.setAttribute('target', '_blank'); // Assuming social links open in new tab
      socialLink.setAttribute('aria-label', label.textContent.trim());
    }
    const socialPicture = icon.querySelector('picture');
    if (socialPicture) {
      const socialImg = socialPicture.querySelector('img');
      const optimizedSocial = createOptimizedPicture(socialImg.src, socialImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(socialPicture, optimizedSocial.querySelector('img'));
      socialLink.append(optimizedSocial);
    }
    moveInstrumentation(link, socialLink);
    socialLinksDiv.append(socialLink);
  });
  container.append(socialLinksDiv);

  // Auxiliaries (Copyright, Terms, Privacy, Accessibility)
  const auxilliariesDiv = document.createElement('div');
  auxilliariesDiv.classList.add('footer__auxilliaries');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer__copyright');
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  moveInstrumentation(copyrightRow, copyrightSpan);
  auxilliariesDiv.append(copyrightSpan);

  const legalLinks = [
    { linkRow: termsLinkRow, labelRow: termsLinkLabelRow, ariaLabel: 'Terms of Use' },
    { linkRow: privacyLinkRow, labelRow: privacyLinkLabelRow, ariaLabel: 'Privacy Policy' },
    { linkRow: accessibilityLinkRow, labelRow: accessibilityLinkLabelRow, ariaLabel: 'Accessibility Statement' },
  ];

  legalLinks.forEach(({ linkRow, labelRow, ariaLabel }) => {
    const legalAnchor = document.createElement('a');
    const originalLink = linkRow.querySelector('a');
    if (originalLink) {
      legalAnchor.href = originalLink.href;
      legalAnchor.setAttribute('aria-label', ariaLabel);
      legalAnchor.textContent = labelRow.textContent.trim();
    }
    moveInstrumentation(linkRow, legalAnchor);
    auxilliariesDiv.append(legalAnchor);
  });
  container.append(auxilliariesDiv);

  // More Sites Links
  const moreSitesDiv = document.createElement('div');
  moreSitesDiv.classList.add('footer__more-sites');
  const moreSitesUl = moreSitesLinksRow.querySelector('ul');
  if (moreSitesUl) {
    moreSitesUl.classList.add('more-sites__list');
    moveInstrumentation(moreSitesLinksRow, moreSitesUl);
    moreSitesDiv.append(moreSitesUl);
  }
  container.append(moreSitesDiv);

  footer.append(container);
  block.textContent = '';
  block.append(footer);

  // The original JS had a generic image optimization loop here.
  // Since createOptimizedPicture is used for each individual image,
  // this generic loop is redundant and potentially problematic if it
  // re-optimizes already optimized pictures or interferes with instrumentation.
  // Removed for cleaner and more precise image handling.
}
