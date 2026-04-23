import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
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
      // No direct class for this in ORIGINAL HTML, using a generic one
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
  const children = [...block.children];

  // Destructure root fields based on BlockJson model order
  const [
    mainLogoRow,
    mainLogoLinkRow,
    secondaryLogoRow,
    itcPortalLinkRow,
    itcPortalLabelRow,
    copyrightRow,
    ...itemRows
  ] = children;

  // Use content detection for item rows based on BlockJson structure
  const footerNavItems = itemRows.filter((row) => row.children.length === 3 && row.querySelector('ul'));
  const footerSocialLinks = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));
  // Handle simple flat links which are also footer-nav-item but without hierarchy-tree
  const footerFlatNavItems = itemRows.filter((row) => row.children.length === 3 && !row.querySelector('ul'));


  const footerSection = document.createElement('section');
  footerSection.classList.add('container-hd', 'fmm-container', 'p-0');
  moveInstrumentation(block, footerSection); // Move instrumentation from block to the new root

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  footerSection.append(footerBrand);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrand.append(footerBrandPrimary);

  const containerPrimary = document.createElement('div');
  containerPrimary.classList.add('container', 'fmm-container');
  footerBrandPrimary.append(containerPrimary);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add(
    'footer-brand__primary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  containerPrimary.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Main Logo and Link
  const mainLogoLink = document.createElement('a');
  mainLogoLink.classList.add(
    'footer-brand__logo',
    'd-inline-block',
    'cta-analytics',
  );
  const mainLogoAnchor = mainLogoLinkRow.querySelector('a');
  if (mainLogoAnchor) {
    mainLogoLink.href = mainLogoAnchor.href;
  }
  mainLogoLink.setAttribute('aria-label', 'logo');

  const mainLogoPicture = mainLogoRow.querySelector('picture');
  if (mainLogoPicture) {
    const mainLogoImg = mainLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(
      mainLogoImg.src,
      mainLogoImg.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(mainLogoRow, optimizedPic.querySelector('img'));
    mainLogoLink.append(optimizedPic);
  }
  footerBrandLeft.append(mainLogoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(
      secondaryLogoImg.src,
      secondaryLogoImg.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(secondaryLogoRow, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
  footerBrandLeft.append(secondaryLogoDiv);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarRight);

  // Footer Navigation Items (with hierarchy)
  const navListWrappers = [];
  footerNavItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('ul'));
    const linkCell = cells.find(c => c.querySelector('a') && !c.querySelector('ul'));
    const hierarchyCell = cells.find(c => c.querySelector('ul'));

    const hierarchyRoot = hierarchyCell?.querySelector('ul');

    const footerListWrapper = document.createElement('div');
    footerListWrapper.classList.add('footerList');
    const footerList = document.createElement('ul');
    footerList.classList.add(
      'footer-list',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'align-items-md-start',
      'flex-column',
    );
    footerListWrapper.append(footerList);

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
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Move instrumentation for the whole row to the root element
    li.appendChild(rootEl);

    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      // No direct class for nav-dropdown in ORIGINAL HTML, using a generic one
      wrapper.classList.add('nav-dropdown');
      // Move children from hierarchyCell to wrapper, preserving instrumentation
      moveInstrumentation(hierarchyCell, wrapper);
      while (hierarchyRoot.firstChild) {
        wrapper.append(hierarchyRoot.firstChild);
      }
      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('active');
        li.classList.toggle('active');
      });
      li.appendChild(wrapper);
      transformNestedLists(wrapper); // Pass the wrapper containing the UL
    }
    footerList.append(li);
    navListWrappers.push(footerListWrapper);
  });

  // Footer Navigation Items (flat links)
  footerFlatNavItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('ul'));
    const linkCell = cells.find(c => c.querySelector('a') && !c.querySelector('ul'));

    const footerListWrapper = document.createElement('div');
    footerListWrapper.classList.add('footerList');
    const footerList = document.createElement('ul');
    footerList.classList.add(
      'footer-list',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'align-items-md-start',
      'flex-column',
    );
    footerListWrapper.append(footerList);

    const li = document.createElement('li');
    li.classList.add('footer-list__item');
    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell?.textContent.trim() || '';
    anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    moveInstrumentation(row, anchor);
    li.appendChild(anchor);
    footerList.appendChild(li);
    navListWrappers.push(footerListWrapper);
  });


  // Distribute navigation items into left and right navbar sections
  const half = Math.ceil(navListWrappers.length / 2);
  navListWrappers.slice(0, half).forEach((wrapper) => footerBrandNavbarLeft.append(wrapper));
  navListWrappers.slice(half).forEach((wrapper) => footerBrandNavbarRight.append(wrapper));

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  footerBrand.append(footerBrandSecondary);

  const containerSecondary = document.createElement('div');
  containerSecondary.classList.add('container', 'fmm-container');
  footerBrandSecondary.append(containerSecondary);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add(
    'footer-brand__secondary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  containerSecondary.append(secondaryContent);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftSecondary);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap',
  );
  footerBrandLeftSecondary.append(footerBrandLeftList);

  // ITC Portal Link
  const itcLi = document.createElement('li');
  itcLi.classList.add('footer-brand__left--item');
  const itcLink = document.createElement('a');
  itcLink.classList.add('footer-brand__left--link', 'cta-analytics');
  const itcPortalAnchor = itcPortalLinkRow.querySelector('a');
  if (itcPortalAnchor) {
    itcLink.href = itcPortalAnchor.href;
  }
  itcLink.textContent = itcPortalLabelRow.textContent.trim();
  moveInstrumentation(itcPortalLinkRow, itcLink); // Instrumentation for link
  moveInstrumentation(itcPortalLabelRow, itcLink); // Instrumentation for label
  itcLi.append(itcLink);
  footerBrandLeftList.append(itcLi);

  // Copyright Text
  const copyrightLi = document.createElement('li');
  copyrightLi.classList.add('footer-brand__left--item');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightLi.append(copyrightSpan);
  footerBrandLeftList.append(copyrightLi);

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const footerBrandRightList = document.createElement('ul');
  footerBrandRightList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  footerBrandRightSecondary.append(footerBrandRightList);

  // Footer Social Links
  footerSocialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add(
      'footer-brand__right--item',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );

    const socialLink = document.createElement('a');
    socialLink.classList.add('footer-brand__right--link', 'cta-analytics');
    const socialAnchor = linkCell?.querySelector('a');
    if (socialAnchor) {
      socialLink.href = socialAnchor.href;
      socialLink.setAttribute('target', '_blank');
    }

    const socialIconPicture = iconCell?.querySelector('picture');
    if (socialIconPicture) {
      const socialIconImg = socialIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(
        socialIconImg.src,
        socialIconImg.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      socialLink.append(optimizedPic);
    }
    moveInstrumentation(row, socialLink);
    li.append(socialLink);
    footerBrandRightList.append(li);
  });

  block.replaceChildren(footerSection);
}

