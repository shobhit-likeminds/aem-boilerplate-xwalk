import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Add classes to li
    li.classList.add('footer-list__item');

    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      // Add classes to anchor
      anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      anchor.setAttribute('data-link-region', 'Footer');
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        // Add classes to span if it replaces an anchor
        span.classList.add('footer-list__item--link', 'd-inline-block');
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      // Add classes to nested ul
      nested.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('nav-dropdown'); // Use nav-dropdown for the wrapper
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
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields
  const primaryLogoRow = children.find((row) => row.children.length === 1 && row.querySelector('picture'));
  const primaryLogoLinkRow = children.find((row) => row.children.length === 1 && row.querySelector('a'));
  const secondaryLogoRow = children.find((row) => row.children.length === 1 && row.querySelector('picture') && row !== primaryLogoRow);
  const copyrightTextRow = children.find((row) => row.children.length === 1 && !row.querySelector('picture') && !row.querySelector('a'));

  // Item rows - using content detection to distinguish
  const navigationItemRows = children.filter((row) => row.children.length === 3 && row.querySelector('ul'));
  const socialLinkRows = children.filter((row) => row.children.length === 3 && row.querySelector('picture') && !row.querySelector('ul'));
  const secondaryLinkRows = children.filter((row) => row.children.length === 2);


  const footerSection = document.createElement('section');
  footerSection.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  footerSection.append(footerBrand);

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  footerBrand.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container', 'fmm-container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  primaryContainer.append(primaryContent);

  const brandLeft = document.createElement('section');
  brandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(brandLeft);

  // Primary Logo
  const primaryLogoLink = document.createElement('a');
  primaryLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  primaryLogoLink.setAttribute('aria-label', 'logo');
  if (primaryLogoLinkRow) {
    const primaryLink = primaryLogoLinkRow.querySelector('a');
    if (primaryLink) {
      primaryLogoLink.href = primaryLink.href;
    }
    moveInstrumentation(primaryLogoLinkRow, primaryLogoLink);
  }

  if (primaryLogoRow) {
    const primaryPicture = primaryLogoRow.querySelector('picture');
    if (primaryPicture) {
      const img = primaryPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(primaryLogoRow, optimizedPic.querySelector('img'));
      primaryLogoLink.append(optimizedPic);
    }
  }
  brandLeft.append(primaryLogoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  if (secondaryLogoRow) {
    const secondaryPicture = secondaryLogoRow.querySelector('picture');
    if (secondaryPicture) {
      const img = secondaryPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(secondaryLogoRow, optimizedPic.querySelector('img'));
      secondaryLogoDiv.append(optimizedPic);
    }
  }
  brandLeft.append(secondaryLogoDiv);

  const brandRight = document.createElement('section');
  brandRight.classList.add('footer-brand__right');
  primaryContent.append(brandRight);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  brandRight.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navRight);

  // Navigation Items
  const navLists = [];
  navigationItemRows.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('ul'));
    const linkCell = cells.find(c => c.querySelector('a'));
    const hierarchyCell = cells.find(c => c.querySelector('ul'));

    const footerList = document.createElement('ul');
    footerList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    const li = document.createElement('li');
    li.classList.add('footer-list__item');

    let rootEl;
    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
      rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      rootEl.setAttribute('data-link-region', 'Footer');
      rootEl.textContent = labelCell ? labelCell.textContent.trim() : '';
    } else {
      rootEl = document.createElement('span');
      rootEl.classList.add('footer-list__item--link', 'd-inline-block'); // Add classes for consistency
      rootEl.textContent = labelCell ? labelCell.textContent.trim() : '';
    }
    moveInstrumentation(row, rootEl);
    li.appendChild(rootEl);

    if (hierarchyCell) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      const hierarchyRoot = tempDiv.querySelector('ul');

      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown');
        moveInstrumentation(hierarchyCell, hierarchyRoot); // Move instrumentation from original cell to the new root
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
    }
    footerList.appendChild(li);

    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    footerListDiv.append(footerList);
    navLists.push(footerListDiv);
  });

  navLists.forEach((list, i) => {
    if (i < Math.ceil(navLists.length / 2)) {
      navLeft.append(list);
    } else {
      navRight.append(list);
    }
  });

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  footerBrand.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container', 'fmm-container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  secondaryContainer.append(secondaryContent);

  const secondaryLeft = document.createElement('section');
  secondaryLeft.classList.add('footer-brand__left');
  secondaryContent.append(secondaryLeft);

  const secondaryLeftList = document.createElement('ul');
  secondaryLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  secondaryLeft.append(secondaryLeftList);

  // Secondary Links
  secondaryLinkRows.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');

    const link = document.createElement('a');
    link.classList.add('footer-brand__left--link', 'cta-analytics');
    link.setAttribute('data-link-region', 'Footer');

    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      link.href = foundLink.href;
      if (foundLink.target === '_blank') {
        link.target = '_blank';
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        link.append(screenReaderSpan);
      }
    }
    link.textContent = labelCell ? labelCell.textContent.trim() : '';
    moveInstrumentation(row, link);
    li.append(link);
    secondaryLeftList.append(li);
  });

  // Copyright Text
  if (copyrightTextRow) {
    const copyrightLi = document.createElement('li');
    copyrightLi.classList.add('footer-brand__left--item');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text');
    copyrightSpan.textContent = copyrightTextRow.textContent.trim();
    moveInstrumentation(copyrightTextRow, copyrightSpan);
    copyrightLi.append(copyrightSpan);
    secondaryLeftList.append(copyrightLi);
  }


  const secondaryRight = document.createElement('section');
  secondaryRight.classList.add('footer-brand__right');
  secondaryContent.append(secondaryRight);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center');
  secondaryRight.append(socialList);

  // Social Links
  socialLinkRows.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a'));
    const labelCell = cells.find(c => !c.querySelector('picture') && !c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    link.setAttribute('data-link-region', 'Footer');

    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      link.href = foundLink.href;
      if (foundLink.target === '_blank') {
        link.target = '_blank';
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        link.append(screenReaderSpan);
      }
    }

    if (iconCell && iconCell.querySelector('picture')) {
      const picture = iconCell.querySelector('picture');
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, labelCell ? labelCell.textContent.trim() : img.alt, false, [{ width: '40' }]);
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      link.append(optimizedPic);
    }
    moveInstrumentation(row, link);
    li.append(link);
    socialList.append(li);
  });

  block.replaceChildren(footerSection);
}
