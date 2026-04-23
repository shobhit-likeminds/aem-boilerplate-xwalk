import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Add classes from ORIGINAL HTML to li elements
    li.classList.add('nav-menu-item', 'list-item');

    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      // Add classes from ORIGINAL HTML to anchor elements
      anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      anchor.setAttribute('data-link-region', 'Footer');
    } else {
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
      // Add classes from ORIGINAL HTML to ul elements
      nested.classList.add('footer-list'); // Assuming this class applies to nested ULs as well, based on parent ULs

      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('nav-dropdown'); // This class is from the generated JS, not original HTML. Keeping as is.
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

  const [
    primaryLogoRow,
    primaryLogoLinkRow,
    secondaryLogoRow,
    copyrightTextRow,
    ...itemRows
  ] = children;

  const footerSection = document.createElement('section');
  footerSection.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  footerSection.append(footerBrand);

  // Footer Brand Primary
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrand.append(footerBrandPrimary);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container', 'fmm-container');
  footerBrandPrimary.append(primaryContainer);

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

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  const primaryLogoPicture = primaryLogoRow.querySelector('picture');
  if (primaryLogoPicture) {
    const primaryLogoLink = document.createElement('a');
    primaryLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
    primaryLogoLink.setAttribute('aria-label', 'logo');
    const foundPrimaryLink = primaryLogoLinkRow.querySelector('a');
    if (foundPrimaryLink) {
      primaryLogoLink.href = foundPrimaryLink.href;
    }
    moveInstrumentation(primaryLogoLinkRow, primaryLogoLink);
    const primaryImg = primaryLogoPicture.querySelector('img');
    const optimizedPrimaryPic = createOptimizedPicture(
      primaryImg.src,
      primaryImg.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(primaryLogoRow, optimizedPrimaryPic.querySelector('img'));
    optimizedPrimaryPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    primaryLogoLink.append(optimizedPrimaryPic);
    footerBrandLeft.append(primaryLogoLink);
  }

  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const secondaryImg = secondaryLogoPicture.querySelector('img');
    const optimizedSecondaryPic = createOptimizedPicture(
      secondaryImg.src,
      secondaryImg.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(secondaryLogoRow, optimizedSecondaryPic.querySelector('img'));
    optimizedSecondaryPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    secondaryLogoDiv.append(optimizedSecondaryPic);
    footerBrandLeft.append(secondaryLogoDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarRight);

  const navigationMenuRows = itemRows.filter((row) => row.children.length === 3);
  const secondaryLinkRows = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('picture'));
  const socialLinkRows = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));

  // Navigation Menu
  const navMenuLists = [];
  navigationMenuRows.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const footerListItem = document.createElement('li');
    footerListItem.classList.add('footer-list__item');

    const foundLink = linkCell?.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
      rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      rootEl.setAttribute('data-link-region', 'Footer');
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl);
    footerListItem.appendChild(rootEl);

    // Handle hierarchy-tree richtext field
    const hierarchyContentDiv = document.createElement('div');
    moveInstrumentation(hierarchyCell, hierarchyContentDiv); // Move instrumentation from hierarchyCell
    hierarchyContentDiv.innerHTML = hierarchyCell?.innerHTML || ''; // Use innerHTML to preserve structure

    const hierarchyRoot = hierarchyContentDiv.querySelector('ul');
    if (hierarchyRoot) {
      hierarchyRoot.classList.add('footer-list'); // Add class to the root ul from the hierarchy
      const wrapper = document.createElement('div');
      wrapper.classList.add('nav-dropdown');
      wrapper.appendChild(hierarchyRoot);
      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('active');
        footerListItem.classList.toggle('active');
      });
      footerListItem.appendChild(wrapper);
      transformNestedLists(hierarchyRoot);
    }
    navMenuLists.push(footerListItem);
  });

  // Group navigation menu items into two footerList divs
  const navMenuLeftList = document.createElement('ul');
  navMenuLeftList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  const navMenuRightList = document.createElement('ul');
  navMenuRightList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

  const half = Math.ceil(navMenuLists.length / 2);
  navMenuLists.forEach((item, index) => {
    if (index < half) {
      navMenuLeftList.append(item);
    } else {
      navMenuRightList.append(item);
    }
  });

  if (navMenuLeftList.children.length > 0) {
    const footerListLeftDiv = document.createElement('div');
    footerListLeftDiv.classList.add('footerList');
    footerListLeftDiv.append(navMenuLeftList);
    footerNavbarLeft.append(footerListLeftDiv);
  }

  if (navMenuRightList.children.length > 0) {
    const footerListRightDiv = document.createElement('div');
    footerListRightDiv.classList.add('footerList');
    footerListRightDiv.append(navMenuRightList);
    footerNavbarLeft.append(footerListRightDiv);
  }

  // Secondary Links
  const secondaryLinkUl = document.createElement('ul');
  secondaryLinkUl.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  secondaryLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const listItem = document.createElement('li');
    listItem.classList.add('footer-list__item');

    const link = document.createElement('a');
    link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    link.setAttribute('data-link-region', 'Footer');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, link);
    listItem.append(link);
    secondaryLinkUl.append(listItem);
  });

  if (secondaryLinkUl.children.length > 0) {
    const secondaryListDiv = document.createElement('div');
    secondaryListDiv.classList.add('footerList');
    secondaryListDiv.append(secondaryLinkUl);
    footerNavbarRight.append(secondaryListDiv);
  }

  // Footer Brand Secondary
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  footerBrand.append(footerBrandSecondary);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container', 'fmm-container');
  secondaryBrandSecondary.append(secondaryContainer);

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

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftSecondary);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  footerBrandLeftSecondary.append(footerBrandLeftList);

  // Copyright Text
  if (copyrightTextRow) {
    const copyrightListItem = document.createElement('li');
    copyrightListItem.classList.add('footer-brand__left--item');
    const copyrightTextSpan = document.createElement('span');
    copyrightTextSpan.classList.add('footer-brand__left--text');
    copyrightTextSpan.textContent = copyrightTextRow.textContent.trim();
    moveInstrumentation(copyrightTextRow, copyrightTextSpan);
    copyrightListItem.append(copyrightTextSpan);
    footerBrandLeftList.append(copyrightListItem);
  }

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const socialLinkUl = document.createElement('ul');
  socialLinkUl.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center');
  footerBrandRightSecondary.append(socialLinkUl);

  // Social Links
  socialLinkRows.forEach((row) => {
    const [iconCell, linkCell] = [...row.children];
    const listItem = document.createElement('li');
    listItem.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    link.setAttribute('data-link-region', 'Footer');
    link.setAttribute('target', '_blank');

    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }

    const picture = iconCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
      link.append(optimizedPic);
    }
    moveInstrumentation(row, link);
    listItem.append(link);
    socialLinkUl.append(listItem);
  });

  block.replaceChildren(footerSection);
}
