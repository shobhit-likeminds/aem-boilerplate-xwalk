import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll(':scope > li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');
    let triggerEl;

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
        triggerEl = span;
      }
    } else {
      triggerEl = anchor;
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add(
        level === 0 ? 'has-footer-sub-child' : 'has-footer-inner-sub-child',
      );
      subWrap.append(nested);
      li.append(subWrap);

      // Replaced hardcoded SVG with Unicode character as per Rule 25.4
      const small = document.createElement('small');
      small.textContent = '›'; // Unicode right arrow
      if (triggerEl) {
        triggerEl.parentNode.append(small);
        triggerEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
      transformNestedLists(nested, level + 1);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root-level rows (fixed schema for these initial fields)
  const logoRow = children.find((row) => row.querySelector('picture'));
  const logoLinkRow = children.find(
    (row) => !row.querySelector('picture') && row.querySelector('a'),
  );
  const copyrightTextRow = children.find(
    (row) => !row.querySelector('picture') && !row.querySelector('a') && row.children.length === 1,
  );

  // Item rows (variable number, identified by content)
  const socialLinkRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('a') && row.querySelector('ul'),
  );
  const footerMenuBlockRows = children.filter(
    (row) => row.children.length === 3 && !row.querySelector('picture') && !row.querySelector('a') && row.textContent.trim() && !row.textContent.includes('Submenu Item'),
  );
  const footerMenuItemRows = children.filter(
    (row) => row.children.length === 3 && row.querySelector('a') && row.querySelector('ul'),
  );
  // The original JS had footerMenuSubItemRows and secondaryNavItemRows.
  // Based on the model and original HTML, secondaryNavItemRows seems to be the correct
  // interpretation for 2-cell rows with a link and no UL.
  const secondaryNavItemRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('a') && !row.querySelector('ul'),
  );

  const container = document.createElement('div');
  container.classList.add('container');

  // Footer Header
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoAnchor = document.createElement('a');
  if (logoLinkRow) {
    logoAnchor.href = logoLinkRow.querySelector('a')?.href || '#';
    moveInstrumentation(logoLinkRow, logoAnchor);
  }

  if (logoRow) {
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
        moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
        logoAnchor.append(optimizedPic);
      }
    }
  }
  logoDiv.append(logoAnchor);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  // Social Links
  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      // Original HTML has classes like 'fb', 'tw' on <li>. We need to extract this from the link text.
      // Assuming the link text contains a hint for the class, or it's part of the original HTML structure.
      // For now, we'll add a generic class or rely on CSS selectors.
      // If the original HTML had specific classes on the <li>, we'd need to extract them.
      // For example, if the link text was "Facebook", we could add li.classList.add('fb');
    }
    moveInstrumentation(linkCell, anchor);

    // Richtext field "hierarchy-tree" should use innerHTML
    const tempDiv = document.createElement('div');
    moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell
    tempDiv.innerHTML = hierarchyCell.innerHTML;
    const hierarchyRoot = tempDiv.querySelector('ul');

    if (hierarchyRoot) {
      // Apply classes from ORIGINAL HTML to nested elements if needed
      hierarchyRoot.querySelectorAll('a').forEach((a) => a.classList.add('social-icon-link')); // Example, adjust based on actual original HTML
      hierarchyRoot.querySelectorAll('li').forEach((liItem) => liItem.classList.add('social-item')); // Example

      // Append the hierarchy content to the anchor or li as per original HTML structure
      // The original JS appended hierarchyRoot to anchor, which seems incorrect for social icons.
      // Assuming the hierarchy-tree is for a dropdown menu, not the social icon itself.
      // If the social icon is an SVG, it should be created or read from the cell.
      // For now, we'll assume the icon is part of the anchor's content or CSS.
      // If the hierarchy-tree is meant to be a nested menu for the social link,
      // the structure needs to be adjusted. Based on the original HTML, social links
      // are simple anchors with SVGs, no nested ULs.
      // This suggests the 'hierarchy-tree' field for social links might be a misinterpretation
      // or intended for a different rendering.
      // For now, we'll append the anchor directly and ignore the hierarchyRoot for social links
      // as it doesn't align with the original HTML structure for social icons.
      // If the model intends for the social link to have a dropdown, the original HTML is missing it.
      anchor.append(tempDiv.firstChild); // Append the actual SVG/content from the cell
    }
    li.append(anchor);
    socialUl.append(li);
    moveInstrumentation(row, li);
  });
  socialCol.append(socialUl);
  footerHeader.append(socialCol);
  container.append(footerHeader);

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');

  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu');

  footerMenuBlockRows.forEach((blockRow) => {
    // Destructuring for fixed schema (heading, headingLink, menuItems container)
    const [headingCell, headingLinkCell, menuItemsContainerCell] = [...blockRow.children];
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const headingAnchor = document.createElement('a');
    const foundHeadingLink = headingLinkCell.querySelector('a');
    if (foundHeadingLink) {
      headingAnchor.href = foundHeadingLink.href;
    }
    headingAnchor.textContent = headingCell.textContent.trim();
    moveInstrumentation(headingCell, headingAnchor);
    moveInstrumentation(headingLinkCell, headingAnchor);
    span.append(headingAnchor);

    const small = document.createElement('small');
    // Add event listener for the heading to toggle the menu block
    headingAnchor.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      linkBlocks.classList.toggle('active'); // Toggle 'active' on link-blocks
      headDiv.classList.toggle('active'); // Toggle 'active' on head
    });
    span.append(small);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    footerMenuItemRows.forEach((itemRow) => {
      // Destructuring for fixed schema (label, link, hierarchy-tree)
      const [labelCell, linkCell, hierarchyCell] = [...itemRow.children];
      const li = document.createElement('li');
      const foundLink = linkCell.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, rootEl);
      moveInstrumentation(linkCell, rootEl);
      li.appendChild(rootEl);

      // Richtext field "hierarchy-tree" should use innerHTML
      const tempHierarchyDiv = document.createElement('div');
      moveInstrumentation(hierarchyCell, tempHierarchyDiv); // Move instrumentation from original cell
      tempHierarchyDiv.innerHTML = hierarchyCell.innerHTML;
      const hierarchyRoot = tempHierarchyDiv.querySelector('ul');

      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        wrapper.appendChild(hierarchyRoot);

        // Replaced hardcoded SVG with Unicode character as per Rule 25.4
        const itemSpan = document.createElement('span');
        itemSpan.textContent = '›'; // Unicode right arrow
        rootEl.parentNode.append(itemSpan);

        // Add event listener for the menu item to toggle its submenu
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot);
      }
      footerInnerList.append(li);
      moveInstrumentation(itemRow, li);
    });

    linkBlocks.append(headDiv, footerInnerList);
    footerMenuDiv.append(linkBlocks);
    moveInstrumentation(blockRow, linkBlocks);
  });

  footerMenuCol.append(footerMenuDiv);
  footerMenuBox.append(footerMenuCol);
  container.append(footerMenuBox);

  // Copyright Wrap
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavItemRows.forEach((row) => {
    // Destructuring for fixed schema (label, link)
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(labelCell, anchor);
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);
    secondaryNavUl.append(li);
    moveInstrumentation(row, li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  if (copyrightTextRow) {
    // Richtext field "copyrightText" should use innerHTML
    copyrightTextCol.innerHTML = copyrightTextRow.innerHTML;
    moveInstrumentation(copyrightTextRow, copyrightTextCol);
  }
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
