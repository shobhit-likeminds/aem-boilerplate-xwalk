import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('footer-list__item', 'nav-menu-item', 'list-item'); // Add classes from original HTML
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
        span.classList.add('nav-menu-item-text'); // Add a class for non-link labels
        textNode.remove();
        li.prepend(span);
      }
    } else {
      anchor.classList.add('nav-menu-item-link', 'list-item-link'); // Add classes to existing anchors
    }

    if (nested) {
      nested.remove();
      nested.classList.add('nav-dropdown-menu', 'list-menu'); // Add classes to nested ul
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-sub-child', 'nav-dropdown'); // Use original HTML class if available
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

  // Distinguish root fields from item rows based on cell count
  const logoRow = children.find(row => row.children.length === 1 && row.querySelector('picture'));
  const logoLinkRow = children.find(row => row.children.length === 1 && row.querySelector('a') && children.indexOf(row) === children.indexOf(logoRow) + 1);
  const secondaryLogoRow = children.find(row => row.children.length === 1 && row.querySelector('picture') && children.indexOf(row) === children.indexOf(logoLinkRow) + 1);
  const copyrightRow = children.find(row => row.children.length === 1 && !row.querySelector('picture') && !row.querySelector('a') && row.textContent.trim().startsWith('©'));

  const itemRows = children.filter(row =>
    row !== logoRow &&
    row !== logoLinkRow &&
    row !== secondaryLogoRow &&
    row !== copyrightRow
  );

  const navGroups = itemRows.filter((row) => row.children.length === 3);
  const footerLinks = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('picture'));
  const socialLinks = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));

  const footerSection = document.createElement('section');
  footerSection.classList.add('container-hd', 'fmm-container', 'p-0');
  moveInstrumentation(block, footerSection); // Move instrumentation from block to the new root

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

  // Primary Logo and Link
  if (logoRow && logoLinkRow) {
    const logoLink = document.createElement('a');
    logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
    const foundLink = logoLinkRow.querySelector('a');
    if (foundLink) {
      logoLink.href = foundLink.href;
    }
    logoLink.setAttribute('aria-label', 'logo');

    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
    moveInstrumentation(logoRow, logoLink);
    moveInstrumentation(logoLinkRow, logoLink);
    footerBrandLeft.append(logoLink);
  }

  // Secondary Logo
  if (secondaryLogoRow) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const picture = secondaryLogoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      secondaryLogoDiv.append(optimizedPic);
    }
    moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);
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

  // Navigation Groups
  navGroups.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('ul'));
    const linkCell = cells.find(c => c.querySelector('a') && !c.querySelector('ul'));
    const hierarchyCell = cells.find(c => c.querySelector('ul'));

    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add(
      'footer-list',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'align-items-md-start',
      'flex-column',
    );

    const li = document.createElement('li');
    li.classList.add('footer-list__item');

    let rootEl;
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
      rootEl.classList.add(
        'cta-analytics',
        'analytics_cta_click',
        'footer-list__item--link',
        'd-inline-block',
      );
    } else {
      rootEl = document.createElement('span');
      rootEl.classList.add('footer-list__item--text'); // Add a class for non-link labels
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(labelCell, rootEl);
    if (linkCell) moveInstrumentation(linkCell, rootEl);
    li.appendChild(rootEl);

    if (hierarchyCell) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Use innerHTML to preserve structure
      moveInstrumentation(hierarchyCell, tempDiv);

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        hierarchyRoot.classList.add('nav-dropdown-menu', 'list-menu'); // Add classes to the root ul
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown'); // Use original HTML class if available
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
    ul.appendChild(li);
    footerListDiv.appendChild(ul);
    moveInstrumentation(row, footerListDiv);
    footerNavbarLeft.append(footerListDiv);
  });

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarRight);

  // Footer Links
  if (footerLinks.length > 0) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add(
      'footer-list',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'align-items-md-start',
      'flex-column',
    );
    footerLinks.forEach((row) => {
      const cells = [...row.children];
      const labelCell = cells.find(c => !c.querySelector('a'));
      const linkCell = cells.find(c => c.querySelector('a'));

      const li = document.createElement('li');
      li.classList.add('footer-list__item');
      const link = document.createElement('a');
      link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      link.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(row, li);
      li.append(link);
      ul.append(li);
    });
    footerListDiv.append(ul);
    footerNavbarRight.append(footerListDiv);
  }

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

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftSecondary);

  const leftList = document.createElement('ul');
  leftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap',
  );
  footerBrandLeftSecondary.append(leftList);

  // Copyright Notice
  if (copyrightRow) {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');
    const span = document.createElement('span');
    span.classList.add('footer-brand__left--text');
    span.textContent = copyrightRow.textContent.trim();
    moveInstrumentation(copyrightRow, li);
    li.append(span);
    leftList.append(li);
  }

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const rightList = document.createElement('ul');
  rightList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  footerBrandRightSecondary.append(rightList);

  // Social Links
  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank';
    }

    const picture = iconCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      link.append(optimizedPic);
    }
    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    link.append(srOnlySpan);
    moveInstrumentation(row, li);
    li.append(link);
    rightList.append(li);
  });

  block.replaceChildren(footerSection);
}
