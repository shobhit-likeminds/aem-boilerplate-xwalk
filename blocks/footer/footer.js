import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    backToTopLabelRow,
    backToTopLinkRow,
    privacyPolicyButtonLabelRow,
    logoRow,
    logoLinkRow,
    countrySelectorIconRow,
    countrySelectorLabelRow,
    countrySelectorLinkRow,
    footerSocialTitleRow,
    legalTextRow,
    legalLinkRow,
    ...itemRows
  ] = children;

  const footerSocialItemRows = [];
  const footerLinkItemRows = [];

  itemRows.forEach((row) => {
    // footer-social-item has 3 cells (icon, link, hierarchy-tree)
    if (row.children.length === 3) {
      footerSocialItemRows.push(row);
    }
    // footer-link-item has 2 cells (label, link)
    else if (row.children.length === 2) {
      footerLinkItemRows.push(row);
    }
  });

  const footer = document.createElement('footer');
  footer.setAttribute('aria-label', 'Page Footer');

  // Back To Top Section
  const backToTopSection = document.createElement('section');
  backToTopSection.classList.add('back-to-top');
  backToTopSection.setAttribute('aria-label', 'Back to top module');
  backToTopSection.style.display = 'flex';

  const backToTopCta = document.createElement('div');
  backToTopCta.classList.add('back-to-top__cta');

  const backToTopAnchor = document.createElement('a');
  const backToTopLink = backToTopLinkRow?.querySelector('a');
  if (backToTopLink) {
    backToTopAnchor.href = backToTopLink.href;
    backToTopAnchor.title = backToTopLabelRow?.textContent.trim() || '';
    backToTopAnchor.setAttribute('aria-label', backToTopLabelRow?.textContent.trim() || '');
    backToTopAnchor.setAttribute('rel', 'follow');
  } else {
    backToTopAnchor.href = 'javascript:void(0)';
    backToTopAnchor.title = backToTopLabelRow?.textContent.trim() || '';
    backToTopAnchor.setAttribute('aria-label', backToTopLabelRow?.textContent.trim() || '');
  }
  backToTopAnchor.classList.add('button', 'light-beige-accent', 'bodySmallRegular');

  const backToTopSpan = document.createElement('span');
  backToTopSpan.classList.add('button-text');
  backToTopSpan.textContent = backToTopLabelRow?.textContent.trim() || '';
  backToTopAnchor.append(backToTopSpan);
  moveInstrumentation(backToTopLinkRow, backToTopAnchor);
  moveInstrumentation(backToTopLabelRow, backToTopSpan);

  backToTopCta.append(backToTopAnchor);
  backToTopSection.append(backToTopCta);
  footer.append(backToTopSection);

  // Cookie Button Container
  const cookieBtnContainer = document.createElement('div');
  cookieBtnContainer.classList.add('cookie-btn-container', 'bg--light-beige-accent', 'optanon-toggle-display');

  const cookieBtn = document.createElement('button');
  cookieBtn.classList.add('cookie-btn', 'bodySmallRegular');

  const cookieBtnText = document.createElement('span');
  cookieBtnText.classList.add('cookie-btn-text');
  cookieBtnText.textContent = privacyPolicyButtonLabelRow?.textContent.trim() || '';
  moveInstrumentation(privacyPolicyButtonLabelRow, cookieBtnText);

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

  const logoLangContainer = document.createElement('div');
  logoLangContainer.classList.add('logo-lang-container');

  // Footer Logo
  const footerLogoDiv = document.createElement('div');
  footerLogoDiv.classList.add('footer-logo');

  const logoAnchor = document.createElement('a');
  const logoHref = logoLinkRow?.querySelector('a')?.href;
  if (logoHref) {
    logoAnchor.href = logoHref;
    logoAnchor.title = 'Nescafe Logo';
    logoAnchor.setAttribute('aria-label', 'Nescafe logo links to the home page');
  }

  const logoPicture = logoRow?.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoAnchor.append(optimizedPic);
  }
  moveInstrumentation(logoLinkRow, logoAnchor);
  moveInstrumentation(logoRow, footerLogoDiv);
  footerLogoDiv.append(logoAnchor);
  logoLangContainer.append(footerLogoDiv);

  // Country Selector
  const countrySelectorAnchor = document.createElement('a');
  const countrySelectorHref = countrySelectorLinkRow?.querySelector('a')?.href;
  if (countrySelectorHref) {
    countrySelectorAnchor.href = countrySelectorHref;
    countrySelectorAnchor.title = countrySelectorLabelRow?.textContent.trim() || '';
    countrySelectorAnchor.setAttribute('aria-label', 'Link to select language and country');
  }
  countrySelectorAnchor.classList.add('link--underlined', 'country-selector');

  const countrySelectorPicture = countrySelectorIconRow?.querySelector('picture');
  if (countrySelectorPicture) {
    const img = countrySelectorPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    countrySelectorAnchor.append(optimizedPic);
  }

  const countrySelectorSpan = document.createElement('span');
  countrySelectorSpan.classList.add('labelMediumRegular');
  countrySelectorSpan.textContent = countrySelectorLabelRow?.textContent.trim() || '';
  countrySelectorAnchor.append(countrySelectorSpan);
  moveInstrumentation(countrySelectorLinkRow, countrySelectorAnchor);
  moveInstrumentation(countrySelectorIconRow, countrySelectorAnchor);
  moveInstrumentation(countrySelectorLabelRow, countrySelectorSpan);
  logoLangContainer.append(countrySelectorAnchor);

  footerSection.append(logoLangContainer);

  // Footer Social
  const footerSocial = document.createElement('div');
  footerSocial.classList.add('footer-social');

  const footerSocialTitleSpan = document.createElement('span');
  footerSocialTitleSpan.classList.add('utilityLegend', 'footer-social-title');
  footerSocialTitleSpan.textContent = footerSocialTitleRow?.textContent.trim() || '';
  moveInstrumentation(footerSocialTitleRow, footerSocialTitleSpan);
  footerSocial.append(footerSocialTitleSpan);

  const footerSocialLinksUl = document.createElement('ul');
  footerSocialLinksUl.classList.add('footer-social-links');

  footerSocialItemRows.forEach((row) => {
    // footer-social-item has 3 cells: [icon, link, hierarchy-tree]
    // The hierarchy-tree cell is not used for social links, only icon and link.
    const [iconCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    const socialAnchor = document.createElement('a');
    const socialLink = linkCell?.querySelector('a');
    if (socialLink) {
      socialAnchor.href = socialLink.href;
      socialAnchor.title = socialLink.textContent.trim(); // Use the URL as title for lack of label
      socialAnchor.setAttribute('aria-label', socialLink.textContent.trim());
    }

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      socialAnchor.append(optimizedPic);
    }
    moveInstrumentation(row, li);
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
    // footer-link-item has 2 cells: [label, link]
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    const siteLinkAnchor = document.createElement('a');
    siteLinkAnchor.classList.add('labelMediumRegular');

    const siteLinkHref = linkCell?.querySelector('a')?.href;
    if (siteLinkHref) {
      siteLinkAnchor.href = siteLinkHref;
      siteLinkAnchor.title = labelCell?.textContent.trim() || '';
      siteLinkAnchor.textContent = labelCell?.textContent.trim() || '';
    }
    moveInstrumentation(row, li);
    li.append(siteLinkAnchor);
    footerLinksUl.append(li);
  });
  footerLinksDiv.append(footerLinksUl);
  footerSiteLinks.append(footerLinksDiv);

  // Legal Links
  const legalLinksDiv = document.createElement('div');
  legalLinksDiv.classList.add('legal-links');

  const legalAnchor = document.createElement('a');
  legalAnchor.classList.add('utilityNav');
  const legalHref = legalLinkRow?.querySelector('a')?.href;
  if (legalHref) {
    legalAnchor.href = legalHref;
    legalAnchor.title = legalTextRow?.textContent.trim() || '';
    legalAnchor.textContent = legalTextRow?.textContent.trim() || '';
  }
  moveInstrumentation(legalLinkRow, legalAnchor);
  moveInstrumentation(legalTextRow, legalAnchor);
  legalLinksDiv.append(legalAnchor);
  footerSiteLinks.append(legalLinksDiv);

  footerSection.append(footerSiteLinks);

  // Feedback button placeholder
  const feedbackDiv = document.createElement('div');
  feedbackDiv.classList.add('feedback_alt_text');
  feedbackDiv.setAttribute('data-alttext', 'qsiFeedback Button');
  footerSection.append(feedbackDiv);

  globalFooter.append(footerSection);
  footer.append(globalFooter);

  block.replaceChildren(footer);

  // Optimize all pictures in the footer
  footer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
