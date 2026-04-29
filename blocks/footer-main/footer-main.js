import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, isInner = false) {
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
      subWrap.classList.add(isInner ? 'has-footer-inner-sub-child' : 'has-footer-sub-child');
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
      transformNestedLists(nested, true);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const logoRow = children.find((row) => row.querySelector('picture'));
  const logoLinkRow = children.find((row) => !row.querySelector('picture') && row.querySelector('a'));
  const copyrightTextRow = children.find((row) => !row.querySelector('picture') && !row.querySelector('a') && row.children.length === 1);

  const itemRows = children.filter(
    (row) => row !== logoRow && row !== logoLinkRow && row !== copyrightTextRow,
  );

  // Use content detection for initial row type discrimination, then destructuring for fixed schemas
  const socialLinkRows = itemRows.filter((row) => row.children.length === 2 && row.querySelector('a') && row.querySelector('ul'));
  const menuGroupRows = itemRows.filter((row) => row.children.length === 3 && row.children[0].textContent.trim() && row.children[1].querySelector('a') && row.children[2].textContent.trim().includes('Footer Menu Items'));
  const menuItemRows = itemRows.filter((row) => row.children.length === 3 && row.children[0].textContent.trim() && row.children[1].querySelector('a') && row.children[2].querySelector('ul'));
  const secondaryNavItemRows = itemRows.filter((row) => row.children.length === 2 && row.children[0].textContent.trim() && row.children[1].querySelector('a') && !row.querySelector('ul'));

  const container = document.createElement('div');
  container.classList.add('container');

  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoAnchor = document.createElement('a');
  const originalLogoLink = logoLinkRow?.querySelector('a');
  if (originalLogoLink) {
    logoAnchor.href = originalLogoLink.href;
    moveInstrumentation(logoLinkRow, logoAnchor);
  }

  const picture = logoRow?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoAnchor.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('hiddenlogo1');
    }
    moveInstrumentation(logoRow, logoDiv);
  }
  logoDiv.append(logoAnchor);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // FIXED: Destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const originalLink = linkCell?.querySelector('a');
    if (originalLink) {
      anchor.href = originalLink.href;
      anchor.target = '_blank';
    }
    moveInstrumentation(row, li);
    li.append(anchor);

    // Placeholder for SVG icons - using a generic SVG from original HTML as placeholder
    const svgIcon = document.createElement('svg');
    svgIcon.setAttribute('width', '30');
    svgIcon.setAttribute('height', '30');
    svgIcon.setAttribute('viewBox', '0 0 40 41');
    // Using a generic base64 image from original HTML as placeholder for social icons
    svgIcon.innerHTML = '<image xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAAZRJREFUWEftltFNwzAQhn2NHxMpj5HsSOkG3YCyQTcoTABMUJgANiArdILCBIxApNh5pQNEMXEFUqmcxNa1UZDsV1/uvvvPdzkgEz8wcT7iAbEVOruCcRzHYRiuAWChlMoMgO9CiEdb8LMBarAoijZKqfu+4ACQl2V5OypgkiRZEAS7NrhJsT8sowO6wGnS0QHTNM2VUmvrko1ZYq0epfTTFm50BRljNwDw2gO4b5tmf3K/lVL2NtKxPaqLOecvhJC7DsAnl3HSlSQKkDGWA4Dx/QkhUL5/gVFOPKAeSy4deGo7OQWzLIvruv7CJHXRQc0YWwDABwawrZpTdzuVmHO+JITsMIBKqQcppR5PVscJ0G/wDwZtmmZVVdV20PDHwAmQc673uI2t8w67ayHEm60PV8C+P4dVTErpvCiKwsrYdczoEs9ms6sj58uOrfmwVpkgXJbVw3Jhm4nJbnJzcPKD2gMa3pF/g5gm9F2MVc8r6BUcUuA//OqeCSErUyJSyvlQgjb3qEFtEwBr4wG9glgFsN9/A/ubqSotIjiQAAAAAElFTkSuQmCC" x="0" y="0" width="30" height="30"></image>';
    anchor.append(svgIcon);

    const socialClassMap = {
      0: 'fb',
      1: 'tw',
      2: 'inst',
      3: 'in',
    };
    li.classList.add(socialClassMap[socialWrap.children.length] || 'social-icon');
    socialWrap.append(li);
  });

  socialCol.append(socialWrap);
  footerHeader.append(socialCol);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');

  const menuCol = document.createElement('div');
  menuCol.classList.add('col');

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  // Create a copy of menuItemRows to safely splice
  const remainingMenuItemRows = [...menuItemRows];

  menuGroupRows.forEach((row) => {
    const [groupTitleCell, groupTitleLinkCell, menuItemsContainerCell] = [...row.children]; // FIXED: Destructuring for fixed schema
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const groupTitleLink = document.createElement('a');
    const originalGroupLink = groupTitleLinkCell?.querySelector('a');
    if (originalGroupLink) {
      groupTitleLink.href = originalGroupLink.href;
    }
    groupTitleLink.textContent = groupTitleCell?.textContent.trim() || '';
    moveInstrumentation(row, groupTitleLink);
    span.append(groupTitleLink);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    // Filter menu items belonging to this group - assuming they follow sequentially in the block structure
    // This logic needs to be more robust if menu items are not strictly sequential per group.
    // For now, assuming an even distribution or that the model ensures correct grouping.
    const currentGroupMenuItems = remainingMenuItemRows.splice(0, remainingMenuItemRows.length / menuGroupRows.length);

    currentGroupMenuItems.forEach((menuItemRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...menuItemRow.children]; // FIXED: Destructuring for fixed schema
      const li = document.createElement('li');
      const foundLink = linkCell?.querySelector('a');
      let rootEl;

      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(menuItemRow, rootEl);
      li.appendChild(rootEl);

      const hierarchyRoot = hierarchyCell?.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        // FIXED: Use innerHTML to preserve nested structure and move instrumentation
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv

        // Apply classes to nested elements as per original HTML
        tempDiv.querySelectorAll('a').forEach(a => a.classList.add('')); // Add classes if any from original HTML
        tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('')); // Add classes if any from original HTML
        tempDiv.querySelectorAll('li').forEach(liElem => liElem.classList.add('')); // Add classes if any from original HTML

        while (tempDiv.firstChild) {
          wrapper.append(tempDiv.firstChild);
        }

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(wrapper.querySelector('ul')); // Pass the actual UL element
      }
      footerInnerList.append(li);
    });

    headDiv.append(footerInnerList);
    linkBlocks.append(headDiv);
    footerMenu.append(linkBlocks);
  });

  menuCol.append(footerMenu);
  footerMenuBox.append(menuCol);
  container.append(footerMenuBox);

  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNav = document.createElement('ul');
  secondaryNav.classList.add('secondary-nav');

  secondaryNavItemRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // FIXED: Destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const originalLink = linkCell?.querySelector('a');
    if (originalLink) {
      anchor.href = originalLink.href;
    }
    anchor.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryNav.append(li);
  });
  secondaryNavCol.append(secondaryNav);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  if (copyrightTextRow) {
    moveInstrumentation(copyrightTextRow, copyrightTextCol);
    copyrightTextCol.innerHTML = copyrightTextRow.innerHTML;
  }
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);
}
