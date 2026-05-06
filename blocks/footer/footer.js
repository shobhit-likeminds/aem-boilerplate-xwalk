import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const backToTopLabelCell = children[0];
  const backToTopLinkCell = children[1];
  const cookieButtonLabelCell = children[2];
  const logoCell = children[3];
  const logoLinkCell = children[4];
  const countrySelectorIconCell = children[5];
  const countrySelectorLinkCell = children[6];
  const countrySelectorLabelCell = children[7];
  const footerSocialTitleCell = children[8];
  const copyrightTextCell = children[9];
  const copyrightLinkCell = children[10];

  const itemRows = children.slice(11);

  const footerSocialItemRows = itemRows.filter((row) => row.children.length === 3);
  const footerLinkItemRows = itemRows.filter((row) => row.children.length === 2);

  const footer = document.createElement('footer');
  footer.setAttribute('aria-label', 'Page Footer');
  moveInstrumentation(block, footer);

  // Back to top section
  const backToTopSection = document.createElement('section');
  backToTopSection.classList.add('back-to-top');
  backToTopSection.setAttribute('aria-label', 'Back to top module');
  backToTopSection.style.display = 'flex';

  const backToTopCta = document.createElement('div');
  backToTopCta.classList.add('back-to-top__cta');

  const backToTopAnchor = document.createElement('a');
  backToTopAnchor.classList.add('button', 'light-beige-accent', 'bodySmallRegular');
  backToTopAnchor.setAttribute('aria-label', backToTopLabelCell.textContent.trim());
  backToTopAnchor.setAttribute('rel', 'follow');
  backToTopAnchor.title = backToTopLabelCell.textContent.trim();
  backToTopAnchor.href = backToTopLinkCell.querySelector('a')?.href || 'javascript:void(0)';
  moveInstrumentation(backToTopLabelCell, backToTopAnchor);
  moveInstrumentation(backToTopLinkCell, backToTopAnchor);

  const backToTopSpan = document.createElement('span');
  backToTopSpan.classList.add('button-text');
  backToTopSpan.textContent = backToTopLabelCell.textContent.trim();
  backToTopAnchor.append(backToTopSpan);
  backToTopCta.append(backToTopAnchor);
  backToTopSection.append(backToTopCta);
  footer.append(backToTopSection);

  // Cookie Button
  const cookieBtnContainer = document.createElement('div');
  cookieBtnContainer.classList.add('cookie-btn-container', 'bg--light-beige-accent', 'optanon-toggle-display');
  moveInstrumentation(cookieButtonLabelCell, cookieBtnContainer);

  const cookieBtn = document.createElement('button');
  cookieBtn.classList.add('cookie-btn', 'bodySmallRegular');

  const cookieBtnText = document.createElement('span');
  cookieBtnText.classList.add('cookie-btn-text');
  cookieBtnText.textContent = cookieButtonLabelCell.textContent.trim();
  cookieBtn.append(cookieBtnText);
  cookieBtnContainer.append(cookieBtn);
  footer.append(cookieBtnContainer);

  // Global Footer
  const globalFooter = document.createElement('div');
  globalFooter.id = 'global-footer';
  globalFooter.classList.add('global-footer', 'grid-container');

  const footerSection = document.createElement('section');
  footerSection.classList.add('footer-section', 'grid-container');
  footerSection.setAttribute('aria-label', 'Global Footer Module');
  globalFooter.append(footerSection);

  // Logo and Country Selector
  const logoLangContainer = document.createElement('div');
  logoLangContainer.classList.add('logo-lang-container');

  const footerLogo = document.createElement('div');
  footerLogo.classList.add('footer-logo');

  const logoAnchor = document.createElement('a');
  logoAnchor.title = logoCell.querySelector('img')?.alt || '';
  logoAnchor.setAttribute('aria-label', `${logoCell.querySelector('img')?.alt || ''} links to the home page`);
  logoAnchor.href = logoLinkCell.querySelector('a')?.href || '#';
  moveInstrumentation(logoCell, logoAnchor);
  moveInstrumentation(logoLinkCell, logoAnchor);

  const logoPicture = logoCell.querySelector('picture');
  if (logoPicture) {
    const optimizedLogoPic = createOptimizedPicture(logoPicture.querySelector('img').src, logoPicture.querySelector('img').alt, false, [{ width: '750' }]);
    optimizedLogoPic.querySelector('img').classList.add('ls-is-cached', 'lazyloaded');
    logoAnchor.append(optimizedLogoPic);
  }
  footerLogo.append(logoAnchor);
  logoLangContainer.append(footerLogo);

  const countrySelectorAnchor = document.createElement('a');
  countrySelectorAnchor.classList.add('link--underlined', 'country-selector');
  countrySelectorAnchor.title = countrySelectorLabelCell.textContent.trim();
  countrySelectorAnchor.setAttribute('aria-label', 'Link to select language and country');
  countrySelectorAnchor.href = countrySelectorLinkCell.querySelector('a')?.href || '#';
  moveInstrumentation(countrySelectorIconCell, countrySelectorAnchor);
  moveInstrumentation(countrySelectorLinkCell, countrySelectorAnchor);
  moveInstrumentation(countrySelectorLabelCell, countrySelectorAnchor);

  const countrySelectorPicture = countrySelectorIconCell.querySelector('picture');
  if (countrySelectorPicture) {
    const optimizedCountryPic = createOptimizedPicture(countrySelectorPicture.querySelector('img').src, countrySelectorPicture.querySelector('img').alt, false, [{ width: '750' }]);
    optimizedCountryPic.querySelector('img').classList.add('lazyloaded');
    countrySelectorAnchor.append(optimizedCountryPic);
  }

  const countrySelectorSpan = document.createElement('span');
  countrySelectorSpan.classList.add('labelMediumRegular');
  countrySelectorSpan.textContent = countrySelectorLabelCell.textContent.trim();
  countrySelectorAnchor.append(countrySelectorSpan);
  logoLangContainer.append(countrySelectorAnchor);
  footerSection.append(logoLangContainer);

  // Footer Social
  const footerSocial = document.createElement('div');
  footerSocial.classList.add('footer-social');
  moveInstrumentation(footerSocialTitleCell, footerSocial);

  const footerSocialTitle = document.createElement('span');
  footerSocialTitle.classList.add('utilityLegend', 'footer-social-title');
  footerSocialTitle.textContent = footerSocialTitleCell.textContent.trim();
  footerSocial.append(footerSocialTitle);

  const footerSocialLinksUl = document.createElement('ul');
  footerSocialLinksUl.classList.add('footer-social-links');

  footerSocialItemRows.forEach((row) => {
    const [iconCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    const socialAnchor = document.createElement('a');
    socialAnchor.href = linkCell.querySelector('a')?.href || '#';
    socialAnchor.setAttribute('aria-label', iconCell.querySelector('img')?.alt || '');
    socialAnchor.title = iconCell.querySelector('img')?.alt || '';
    moveInstrumentation(row, socialAnchor);

    const socialPicture = iconCell.querySelector('picture');
    if (socialPicture) {
      const optimizedSocialPic = createOptimizedPicture(socialPicture.querySelector('img').src, socialPicture.querySelector('img').alt, false, [{ width: '750' }]);
      optimizedSocialPic.querySelector('img').classList.add('ls-is-cached', 'lazyloaded');
      socialAnchor.append(optimizedSocialPic);
    }
    li.append(socialAnchor);
    footerSocialLinksUl.append(li);
  });
  footerSocial.append(footerSocialLinksUl);
  footerSection.append(footerSocial);

  // Footer Site Links
  const footerSiteLinks = document.createElement('div');
  footerSiteLinks.classList.add('footer-site-links');

  const footerLinksDiv = document.createElement('div');
  footerLinksDiv.classList.add('footer-links');
  const footerLinksUl = document.createElement('ul');

  footerLinkItemRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('labelMediumRegular');
    linkAnchor.href = linkCell.querySelector('a')?.href || '#';
    linkAnchor.title = labelCell.textContent.trim();
    linkAnchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, linkAnchor);
    li.append(linkAnchor);
    footerLinksUl.append(li);
  });
  footerLinksDiv.append(footerLinksUl);
  footerSiteLinks.append(footerLinksDiv);

  // Legal Links
  const legalLinksDiv = document.createElement('div');
  legalLinksDiv.classList.add('legal-links');

  const copyrightAnchor = document.createElement('a');
  copyrightAnchor.classList.add('utilityNav');
  copyrightAnchor.href = copyrightLinkCell.querySelector('a')?.href || '#';
  copyrightAnchor.title = copyrightTextCell.textContent.trim();
  copyrightAnchor.setAttribute('aria-label', '');
  copyrightAnchor.innerHTML = copyrightTextCell.innerHTML; // Use innerHTML to preserve <sup>
  moveInstrumentation(copyrightTextCell, copyrightAnchor);
  moveInstrumentation(copyrightLinkCell, copyrightAnchor);
  legalLinksDiv.append(copyrightAnchor);
  footerSiteLinks.append(legalLinksDiv);
  footerSection.append(footerSiteLinks);

  // Feedback button placeholder
  const feedbackDiv = document.createElement('div');
  feedbackDiv.classList.add('feedback_alt_text');
  feedbackDiv.setAttribute('data-alttext', 'qsiFeedback Button');
  footerSection.append(feedbackDiv);

  footer.append(globalFooter);

  block.replaceChildren(footer);

  footer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
