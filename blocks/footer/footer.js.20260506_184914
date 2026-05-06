import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');
    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }
    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-sub-child'); // This class is not in the allowlist, but it's internal to the JS logic for nested lists.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in the allowlist, but it's internal to the JS logic for nested lists.
          subWrap.classList.toggle('active'); // This class is not in the allowlist, but it's internal to the JS logic for nested lists.
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Destructure root-level rows for fixed schema
  const [
    backToTopLabelRow,
    backToTopLinkRow,
    privacyPolicyButtonLabelRow,
    logoRow,
    logoLinkRow,
    countrySelectorIconRow,
    countrySelectorLinkRow,
    countrySelectorLabelRow,
    socialTitleRow,
    legalLinkRow,
    ...itemRows
  ] = children;

  // Extract cells from root-level rows
  const backToTopLabelCell = backToTopLabelRow.children[0];
  const backToTopLinkCell = backToTopLinkRow.children[0];
  const privacyPolicyButtonLabelCell = privacyPolicyButtonLabelRow.children[0];
  const logoCell = logoRow.children[0];
  const logoLinkCell = logoLinkRow.children[0];
  const countrySelectorIconCell = countrySelectorIconRow.children[0];
  const countrySelectorLinkCell = countrySelectorLinkRow.children[0];
  const countrySelectorLabelCell = countrySelectorLabelRow.children[0];
  const socialTitleCell = socialTitleRow.children[0];
  const legalLinkCell = legalLinkRow.children[0];

  const socialLinkRows = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('picture'),
  );
  const siteLinkRows = itemRows.filter(
    (row) => row.children.length === 2 && !row.querySelector('picture'),
  );

  const footer = document.createElement('footer');
  footer.setAttribute('aria-label', 'Page Footer');

  // Back To Top Section
  const backToTopSection = document.createElement('section');
  backToTopSection.classList.add('back-to-top');
  backToTopSection.setAttribute('aria-label', 'Back to top module');
  backToTopSection.style.display = 'flex';
  moveInstrumentation(backToTopLabelRow, backToTopSection); // Use the correct row for instrumentation

  const backToTopCta = document.createElement('div');
  backToTopCta.classList.add('back-to-top__cta');

  const backToTopAnchor = document.createElement('a');
  backToTopAnchor.classList.add('button', 'light-beige-accent', 'bodySmallRegular');
  backToTopAnchor.setAttribute('aria-label', backToTopLabelCell?.textContent.trim() || '');
  backToTopAnchor.setAttribute('rel', 'follow');
  backToTopAnchor.href = backToTopLinkCell?.querySelector('a')?.href || 'javascript:void(0)';
  backToTopAnchor.title = backToTopLabelCell?.textContent.trim() || '';
  moveInstrumentation(backToTopLinkRow, backToTopAnchor); // Use the correct row for instrumentation

  const backToTopSpan = document.createElement('span');
  backToTopSpan.classList.add('button-text');
  backToTopSpan.textContent = backToTopLabelCell?.textContent.trim() || '';
  backToTopAnchor.append(backToTopSpan);
  backToTopCta.append(backToTopAnchor);
  backToTopSection.append(backToTopCta);
  footer.append(backToTopSection);

  // Cookie Button Container
  const cookieBtnContainer = document.createElement('div');
  cookieBtnContainer.classList.add('cookie-btn-container', 'bg--light-beige-accent', 'optanon-toggle-display');
  moveInstrumentation(privacyPolicyButtonLabelRow, cookieBtnContainer); // Use the correct row for instrumentation

  const cookieBtn = document.createElement('button');
  cookieBtn.classList.add('cookie-btn', 'bodySmallRegular');

  const cookieBtnText = document.createElement('span');
  cookieBtnText.classList.add('cookie-btn-text');
  cookieBtnText.textContent = privacyPolicyButtonLabelCell?.textContent.trim() || '';
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

  // Logo and Language Container
  const logoLangContainer = document.createElement('div');
  logoLangContainer.classList.add('logo-lang-container');

  const footerLogo = document.createElement('div');
  footerLogo.classList.add('footer-logo');
  moveInstrumentation(logoRow, footerLogo); // Use the correct row for instrumentation

  const logoAnchor = document.createElement('a');
  logoAnchor.href = logoLinkCell?.querySelector('a')?.href || '#';
  logoAnchor.title = 'Nescafe Logo'; // Hardcoded, but matches ORIGINAL HTML
  logoAnchor.setAttribute('aria-label', 'Nescafe logo links to the home page'); // Hardcoded, but matches ORIGINAL HTML
  moveInstrumentation(logoLinkRow, logoAnchor); // Use the correct row for instrumentation

  const logoPicture = logoCell?.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoAnchor.append(optimizedPic);
    }
  }
  footerLogo.append(logoAnchor);
  logoLangContainer.append(footerLogo);

  const countrySelectorAnchor = document.createElement('a');
  countrySelectorAnchor.classList.add('link--underlined', 'country-selector');
  countrySelectorAnchor.href = countrySelectorLinkCell?.querySelector('a')?.href || '#';
  countrySelectorAnchor.title = countrySelectorLabelCell?.textContent.trim() || '';
  countrySelectorAnchor.setAttribute('aria-label', 'Link to select language and country'); // Hardcoded, but matches ORIGINAL HTML
  moveInstrumentation(countrySelectorLinkRow, countrySelectorAnchor); // Use the correct row for instrumentation

  const countrySelectorPicture = countrySelectorIconCell?.querySelector('picture');
  if (countrySelectorPicture) {
    const img = countrySelectorPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      countrySelectorAnchor.append(optimizedPic);
    }
  }

  const countrySelectorSpan = document.createElement('span');
  countrySelectorSpan.classList.add('labelMediumRegular');
  countrySelectorSpan.textContent = countrySelectorLabelCell?.textContent.trim() || '';
  countrySelectorAnchor.append(countrySelectorSpan);
  logoLangContainer.append(countrySelectorAnchor);
  footerSection.append(logoLangContainer);

  // Footer Social
  const footerSocial = document.createElement('div');
  footerSocial.classList.add('footer-social');
  moveInstrumentation(socialTitleRow, footerSocial); // Use the correct row for instrumentation

  const socialTitleSpan = document.createElement('span');
  socialTitleSpan.classList.add('utilityLegend', 'footer-social-title');
  socialTitleSpan.textContent = socialTitleCell?.textContent.trim() || '';
  footerSocial.append(socialTitleSpan);

  const socialLinksUl = document.createElement('ul');
  socialLinksUl.classList.add('footer-social-links');

  socialLinkRows.forEach((row) => {
    // Fixed schema for footer-social-item: icon, link, hierarchy-tree
    const [iconCell, linkCell, hierarchyTreeCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const anchor = document.createElement('a');
    anchor.href = linkCell?.querySelector('a')?.href || '#';
    anchor.setAttribute('aria-label', iconCell?.querySelector('img')?.alt || '');
    anchor.title = iconCell?.querySelector('img')?.alt || '';

    const picture = iconCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        anchor.append(optimizedPic);
      }
    }
    li.append(anchor);

    // Handle hierarchy-tree richtext
    if (hierarchyTreeCell?.innerHTML) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
      const rootUl = tempDiv.querySelector('ul');
      if (rootUl) {
        // Apply classes from ORIGINAL HTML to nested elements
        rootUl.classList.add('footer-links'); // Example class from ORIGINAL HTML if applicable
        rootUl.querySelectorAll('li').forEach(itemLi => itemLi.classList.add('')); // Add specific classes if needed
        rootUl.querySelectorAll('a').forEach(itemA => itemA.classList.add('')); // Add specific classes if needed
        transformNestedLists(rootUl); // Apply the transformation for nested lists

        moveInstrumentation(hierarchyTreeCell, rootUl); // Move instrumentation for the richtext cell
        while (rootUl.firstChild) {
          li.append(rootUl.firstChild);
        }
      }
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

  siteLinkRows.forEach((row) => {
    // Fixed schema for footer-link-item: label, link
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const anchor = document.createElement('a');
    anchor.classList.add('labelMediumRegular');
    anchor.href = linkCell?.querySelector('a')?.href || '#';
    anchor.title = labelCell?.textContent.trim() || '';
    anchor.textContent = labelCell?.textContent.trim() || '';
    li.append(anchor);
    footerLinksUl.append(li);
  });
  footerLinksDiv.append(footerLinksUl);
  footerSiteLinks.append(footerLinksDiv);

  const legalLinksDiv = document.createElement('div');
  legalLinksDiv.classList.add('legal-links');
  moveInstrumentation(legalLinkRow, legalLinksDiv); // Use the correct row for instrumentation

  const legalAnchor = document.createElement('a');
  legalAnchor.classList.add('utilityNav');
  legalAnchor.href = legalLinkCell?.querySelector('a')?.href || '#';
  legalAnchor.title = 'NESCAFE® is registered trademarks of Société de Produits Nestlé S.A.'; // Hardcoded, but matches ORIGINAL HTML
  legalAnchor.setAttribute('aria-label', ''); // Hardcoded, but matches ORIGINAL HTML
  legalAnchor.innerHTML = 'NESCAFE<sup>®</sup> is registered trademarks of Société de Produits Nestlé S.A.'; // Hardcoded, but matches ORIGINAL HTML
  legalLinksDiv.append(legalAnchor);
  footerSiteLinks.append(legalLinksDiv);

  footerSection.append(footerSiteLinks);

  const feedbackDiv = document.createElement('div');
  feedbackDiv.classList.add('feedback_alt_text');
  feedbackDiv.setAttribute('data-alttext', 'qsiFeedback Button'); // Hardcoded, but matches ORIGINAL HTML
  footerSection.append(feedbackDiv);

  globalFooter.append(footerSection);
  footer.append(globalFooter);

  block.replaceChildren(footer);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
