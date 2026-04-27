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
      subWrap.classList.add('has-sub-child');
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
    }
  });
}

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    secondaryLogoRow,
    itcPortalIconRow,
    itcPortalLinkRow,
    copyrightTextRow,
    ...itemRows
  ] = [...block.children];

  const root = document.createElement('section');
  root.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  root.append(footerBrand);

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  footerBrand.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container', 'fmm-container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add(
    'footer-brand__primary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  primaryContainer.append(primaryContent);

  const brandLeft = document.createElement('section');
  brandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(brandLeft);

  // Primary Logo and Link
  const logoLink = document.createElement('a');
  logoLink.classList.add(
    'footer-brand__logo',
    'd-inline-block',
    'cta-analytics',
  );
  moveInstrumentation(logoLinkRow, logoLink);
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  logoLink.setAttribute('aria-label', 'logo');

  const primaryLogoPicture = logoRow.querySelector('picture');
  if (primaryLogoPicture) {
    const img = primaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  brandLeft.append(logoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
  brandLeft.append(secondaryLogoDiv);

  const brandRight = document.createElement('section');
  brandRight.classList.add('footer-brand__right');
  primaryContent.append(brandRight);

  const footerNav = document.createElement('nav');
  footerNav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNav.setAttribute('aria-label', 'footer navbar');
  brandRight.append(footerNav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNav.append(navRight);

  const navigationItems = itemRows.filter((row) => row.children.length === 3);
  const socialLinkItems = itemRows.filter((row) => row.children.length === 2);

  const menuLeftList = document.createElement('ul');
  menuLeftList.classList.add(
    'footer-list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'align-items-md-start',
    'flex-column',
  );
  const menuRightList = menuLeftList.cloneNode(false); // Clone without children

  navigationItems.forEach((row, i) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('footer-list__item');

    const foundLink = linkCell?.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
      rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    } else {
      rootEl = document.createElement('span');
      rootEl.classList.add('footer-list__item--link', 'd-inline-block');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl);
    li.appendChild(rootEl);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('nav-dropdown');
      // Add classes for the hierarchyRoot itself, as per original HTML structure for nested lists
      hierarchyRoot.classList.add('nav-menu-list', 'list-unstyled');
      wrapper.appendChild(hierarchyRoot);
      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('active');
        li.classList.toggle('active');
      });
      li.appendChild(wrapper);
      transformNestedLists(hierarchyRoot);
    }

    if (i < Math.ceil(navigationItems.length / 2)) {
      menuLeftList.append(li);
    } else {
      menuRightList.append(li);
    }
  });

  const footerListLeftDiv = document.createElement('div');
  footerListLeftDiv.classList.add('footerList');
  footerListLeftDiv.append(menuLeftList);
  navLeft.append(footerListLeftDiv);

  const footerListRightDiv = document.createElement('div');
  footerListRightDiv.classList.add('footerList');
  footerListRightDiv.append(menuRightList);
  navRight.append(footerListRightDiv);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  footerBrand.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container', 'fmm-container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add(
    'footer-brand__secondary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  secondaryContainer.append(secondaryContent);

  const secondaryLeft = document.createElement('section');
  secondaryLeft.classList.add('footer-brand__left');
  secondaryContent.append(secondaryLeft);

  const secondaryLeftList = document.createElement('ul');
  secondaryLeftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap',
  );
  secondaryLeft.append(secondaryLeftList);

  // ITC Portal Link
  const itcPortalItem = document.createElement('li');
  itcPortalItem.classList.add('footer-brand__left--item');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.classList.add('footer-brand__left--link', 'cta-analytics');
  moveInstrumentation(itcPortalLinkRow, itcPortalLink);
  itcPortalLink.href = itcPortalLinkRow.querySelector('a')?.href || '#';
  // Read the text content from the link row, assuming the link text is the label
  itcPortalLink.textContent = itcPortalLinkRow.querySelector('a')?.textContent.trim() || '';
  itcPortalLink.target = '_blank';
  itcPortalLink.append(
    Object.assign(document.createElement('span'), {
      className: 'cmp-link__screen-reader-only',
      textContent: 'opens in a new tab',
    }),
  );

  const itcPortalIconPicture = itcPortalIconRow.querySelector('picture');
  if (itcPortalIconPicture) {
    const img = itcPortalIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    // Do not append the icon to the link, as the original HTML only has text for ITC Portal Link
  }
  itcPortalItem.append(itcPortalLink);
  secondaryLeftList.append(itcPortalItem);

  // Copyright Text
  const copyrightItem = document.createElement('li');
  copyrightItem.classList.add('footer-brand__left--item');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  moveInstrumentation(copyrightTextRow, copyrightSpan);
  copyrightSpan.textContent = copyrightTextRow.textContent.trim();
  copyrightItem.append(copyrightSpan);
  secondaryLeftList.append(copyrightItem);

  const secondaryRight = document.createElement('section');
  secondaryRight.classList.add('footer-brand__right');
  secondaryContent.append(secondaryRight);

  const socialList = document.createElement('ul');
  socialList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  secondaryRight.append(socialList);

  socialLinkItems.forEach((row) => {
    const [iconCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add(
      'footer-brand__right--item',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );

    const socialLink = document.createElement('a');
    socialLink.classList.add('footer-brand__right--link', 'cta-analytics');
    moveInstrumentation(linkCell, socialLink);
    socialLink.href = linkCell.querySelector('a')?.href || '#';
    socialLink.target = '_blank';

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      socialLink.append(optimizedPic);
    }
    socialLink.append(
      Object.assign(document.createElement('span'), {
        className: 'cmp-link__screen-reader-only',
        textContent: 'opens in a new tab',
      }),
    );
    li.append(socialLink);
    socialList.append(li);
  });

  block.replaceChildren(root);
}
