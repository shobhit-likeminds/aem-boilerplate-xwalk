import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const backToTopLabelCell = children[0].querySelector('div');
  const backToTopLinkCell = children[1].querySelector('div');
  const privacyPolicyButtonLabelCell = children[2].querySelector('div');
  const logoCell = children[3].querySelector('div');
  const logoLinkCell = children[4].querySelector('div');
  const countrySelectorIconCell = children[5].querySelector('div');
  const countrySelectorLabelCell = children[6].querySelector('div');
  const countrySelectorLinkCell = children[7].querySelector('div');
  const footerSocialTitleCell = children[8].querySelector('div');

  const footerLegalLinkCell = children[9].querySelector('div');

  const itemRows = children.slice(10);

  const socialLinkRows = itemRows.filter((row) => row.children.length === 3 && row.querySelector('picture'));
  const footerLinkRows = itemRows.filter((row) => row.children.length === 2);

  block.textContent = ''; // Clear the block content as we're rebuilding from scratch

  const footerEl = document.createElement('footer');
  footerEl.setAttribute('aria-label', 'Page Footer');

  // Back to Top Section
  const backToTopSection = document.createElement('section');
  backToTopSection.classList.add('back-to-top');
  backToTopSection.setAttribute('aria-label', 'Back to top module');
  backToTopSection.style.display = 'flex';

  const backToTopCta = document.createElement('div');
  backToTopCta.classList.add('back-to-top__cta');

  const backToTopAnchor = document.createElement('a');
  backToTopAnchor.classList.add('button', 'light-beige-accent', 'bodySmallRegular');
  backToTopAnchor.setAttribute('aria-label', backToTopLabelCell?.textContent.trim() || '');
  backToTopAnchor.setAttribute('rel', 'follow');
  backToTopAnchor.href = backToTopLinkCell?.querySelector('a')?.href || 'javascript:void(0)';
  backToTopAnchor.title = backToTopLabelCell?.textContent.trim() || '';
  moveInstrumentation(children[0], backToTopAnchor); // Move instrumentation from backToTopLabelCell
  moveInstrumentation(children[1], backToTopAnchor); // Move instrumentation from backToTopLinkCell

  const backToTopSpan = document.createElement('span');
  backToTopSpan.classList.add('button-text');
  backToTopSpan.textContent = backToTopLabelCell?.textContent.trim() || '';
  backToTopAnchor.append(backToTopSpan);
  backToTopCta.append(backToTopAnchor);
  backToTopSection.append(backToTopCta);
  footerEl.append(backToTopSection);

  // Cookie Button Container
  const cookieBtnContainer = document.createElement('div');
  cookieBtnContainer.classList.add('cookie-btn-container', 'bg--light-beige-accent', 'optanon-toggle-display');

  const cookieBtn = document.createElement('button');
  cookieBtn.classList.add('cookie-btn', 'bodySmallRegular');
  moveInstrumentation(children[2], cookieBtn); // Move instrumentation from privacyPolicyButtonLabelCell

  const cookieBtnSpan = document.createElement('span');
  cookieBtnSpan.classList.add('cookie-btn-text');
  cookieBtnSpan.textContent = privacyPolicyButtonLabelCell?.textContent.trim() || '';
  cookieBtn.append(cookieBtnSpan);
  cookieBtnContainer.append(cookieBtn);
  footerEl.append(cookieBtnContainer);

  // Global Footer
  const globalFooter = document.createElement('div');
  globalFooter.id = 'global-footer';
  globalFooter.classList.add('global-footer', 'grid-container');

  const footerSection = document.createElement('section');
  footerSection.classList.add('footer-section', 'grid-container');
  footerSection.setAttribute('aria-label', 'Global Footer Module');

  // Logo and Language Container
  const logoLangContainer = document.createElement('div');
  logoLangContainer.classList.add('logo-lang-container');

  const footerLogo = document.createElement('div');
  footerLogo.classList.add('footer-logo');
  const logoAnchor = document.createElement('a');
  logoAnchor.title = logoCell?.querySelector('picture')?.querySelector('img')?.alt || '';
  logoAnchor.setAttribute('aria-label', `${logoAnchor.title} logo links to the home page`);
  logoAnchor.href = logoLinkCell?.querySelector('a')?.href || '#';
  moveInstrumentation(children[3], logoAnchor); // Move instrumentation from logoCell
  moveInstrumentation(children[4], logoAnchor); // Move instrumentation from logoLinkCell

  const logoPicture = logoCell?.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoAnchor.append(optimizedPic);
  }
  footerLogo.append(logoAnchor);
  logoLangContainer.append(footerLogo);

  const countrySelectorAnchor = document.createElement('a');
  countrySelectorAnchor.classList.add('link--underlined', 'country-selector');
  countrySelectorAnchor.title = countrySelectorLabelCell?.textContent.trim() || '';
  countrySelectorAnchor.setAttribute('aria-label', 'Link to select language and country');
  countrySelectorAnchor.href = countrySelectorLinkCell?.querySelector('a')?.href || '#';
  moveInstrumentation(children[5], countrySelectorAnchor); // Move instrumentation from countrySelectorIconCell
  moveInstrumentation(children[6], countrySelectorAnchor); // Move instrumentation from countrySelectorLabelCell
  moveInstrumentation(children[7], countrySelectorAnchor); // Move instrumentation from countrySelectorLinkCell

  const countryIconPicture = countrySelectorIconCell?.querySelector('picture');
  if (countryIconPicture) {
    const img = countryIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    countrySelectorAnchor.append(optimizedPic);
  }

  const countryLabelSpan = document.createElement('span');
  countryLabelSpan.classList.add('labelMediumRegular');
  countryLabelSpan.textContent = countrySelectorLabelCell?.textContent.trim() || '';
  countrySelectorAnchor.append(countryLabelSpan);
  logoLangContainer.append(countrySelectorAnchor);
  footerSection.append(logoLangContainer);

  // Footer Social
  const footerSocial = document.createElement('div');
  footerSocial.classList.add('footer-social');
  moveInstrumentation(children[8], footerSocial); // Move instrumentation from footerSocialTitleCell

  const socialTitleSpan = document.createElement('span');
  socialTitleSpan.classList.add('utilityLegend', 'footer-social-title');
  socialTitleSpan.textContent = footerSocialTitleCell?.textContent.trim() || '';
  footerSocial.append(socialTitleSpan);

  const socialLinksUl = document.createElement('ul');
  socialLinksUl.classList.add('footer-social-links');

  socialLinkRows.forEach((row) => {
    const [iconCell, linkCell, hierarchyTreeCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const socialAnchor = document.createElement('a');
    socialAnchor.href = linkCell?.querySelector('a')?.href || '#';
    socialAnchor.title = iconCell?.querySelector('picture')?.querySelector('img')?.alt || '';
    socialAnchor.setAttribute('aria-label', socialAnchor.title);

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      socialAnchor.append(optimizedPic);
    }
    li.append(socialAnchor);

    const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
    if (hierarchyRoot) {
      const hierarchyWrapper = document.createElement('div');
      hierarchyWrapper.classList.add('has-sub-child'); // Using a generic class as per rule 20
      hierarchyWrapper.append(hierarchyRoot);
      li.append(hierarchyWrapper);

      // Transform nested lists
      hierarchyRoot.querySelectorAll('li').forEach((nestedLi) => {
        const nestedUl = nestedLi.querySelector(':scope > ul');
        const nestedAnchor = nestedLi.querySelector(':scope > a');

        if (!nestedAnchor) {
          const textNode = [...nestedLi.childNodes].find(
            (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
          );
          if (textNode) {
            const span = document.createElement('span');
            span.textContent = textNode.textContent.trim();
            textNode.remove();
            nestedLi.prepend(span);
          }
        }

        if (nestedUl) {
          nestedUl.remove();
          const subWrap = document.createElement('div');
          subWrap.classList.add('has-sub-child');
          subWrap.append(nestedUl);
          nestedLi.append(subWrap);
          const trigger = nestedLi.querySelector(':scope > a, :scope > span');
          if (trigger) {
            trigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              nestedLi.classList.toggle('active');
              subWrap.classList.toggle('active');
            });
          }
        }
      });
    }

    socialLinksUl.append(li);
  });
  footerSocial.append(socialLinksUl);
  footerSection.append(footerSocial);

  // Footer Site Links
  const footerSiteLinks = document.createElement('div');
  footerSiteLinks.classList.add('footer-site-links');

  const footerLinksDiv = document.createElement('div');
  footerLinksDiv.classList.add('footer-links');
  const footerLinksUl = document.createElement('ul');

  footerLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('labelMediumRegular');
    linkAnchor.href = linkCell?.querySelector('a')?.href || '#';
    linkAnchor.title = labelCell?.textContent.trim() || '';
    linkAnchor.textContent = labelCell?.textContent.trim() || '';
    li.append(linkAnchor);
    footerLinksUl.append(li);
  });
  footerLinksDiv.append(footerLinksUl);
  footerSiteLinks.append(footerLinksDiv);

  // Legal Links
  const legalLinksDiv = document.createElement('div');
  legalLinksDiv.classList.add('legal-links');

  const legalLinkAnchor = document.createElement('a');
  legalLinkAnchor.classList.add('utilityNav');
  legalLinkAnchor.href = footerLegalLinkCell?.querySelector('a')?.href || '#';
  legalLinkAnchor.title = 'NESCAFE® is registered trademarks of Société de Produits Nestlé S.A.';
  legalLinkAnchor.setAttribute('aria-label', '');
  legalLinkAnchor.innerHTML = 'NESCAFE<sup>®</sup> is registered trademarks of Société de Produits Nestlé S.A.';
  moveInstrumentation(children[9], legalLinkAnchor); // Move instrumentation from footerLegalLinkCell
  legalLinksDiv.append(legalLinkAnchor);
  footerSiteLinks.append(legalLinksDiv);

  footerSection.append(footerSiteLinks);

  // Feedback button placeholder
  const feedbackDiv = document.createElement('div');
  feedbackDiv.classList.add('feedback_alt_text');
  feedbackDiv.setAttribute('data-alttext', 'qsiFeedback Button');
  footerSection.append(feedbackDiv);

  globalFooter.append(footerSection);
  footerEl.append(globalFooter);

  block.replaceChildren(footerEl);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
