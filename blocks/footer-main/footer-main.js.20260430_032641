import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, hasInnerSubChildClass) {
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
      subWrap.classList.add(hasInnerSubChildClass);
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
      transformNestedLists(nested, hasInnerSubChildClass);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields based on BlockJson model
  const [logoImageRow, logoLinkRow, copyrightTextRow, ...itemRows] = children;

  const socialLinkRows = itemRows.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child ul'),
  );
  const menuBlockRows = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child p') && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child p'),
  );
  const menuItemRows = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child p') && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child ul'),
  );
  const secondaryNavRows = itemRows.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child p') && row.querySelector('div:last-child a'),
  );

  const root = document.createElement('div');
  root.classList.add('container');

  // Footer Header Section
  const footerHeaderRow = document.createElement('div');
  footerHeaderRow.classList.add('row', 'footer-header');

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoAnchor = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoAnchor.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoAnchor);

  const picture = logoImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoAnchor.append(optimizedPic);
    }
  }
  moveInstrumentation(logoImageRow, logoAnchor);

  logoDiv.append(logoAnchor);
  logoWrapper.append(logoDiv);
  footerHeaderRow.append(logoWrapper);

  const socialWrapCenter = document.createElement('div');
  socialWrapCenter.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [socialLinkCell, hierarchyTreeCell] = [...row.children]; // Fixed schema for social links

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = socialLinkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank'; // Assuming social links open in new tab
    }
    moveInstrumentation(socialLinkCell, anchor);

    // Read the hierarchy-tree richtext content for the SVG icon
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
    const svgImage = tempDiv.querySelector('image');
    if (svgImage) {
      anchor.innerHTML = `<svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink">${svgImage.outerHTML}</svg>`;
    } else {
      // Fallback if no SVG found in richtext, or if it's just text
      anchor.textContent = socialLinkCell?.textContent.trim() || '';
    }
    moveInstrumentation(hierarchyTreeCell, anchor); // Move instrumentation from richtext cell to anchor

    // Apply social icon classes from ORIGINAL HTML based on link content or a specific class
    // This part assumes the original HTML has classes like 'fb', 'tw', etc. on the <li>
    // For now, we'll try to infer from the link or add a generic class.
    // A more robust solution might involve a dedicated field for icon class.
    const linkText = foundLink?.href || '';
    if (linkText.includes('facebook')) li.classList.add('fb');
    else if (linkText.includes('twitter')) li.classList.add('tw');
    else if (linkText.includes('instagram')) li.classList.add('inst');
    else if (linkText.includes('youtube')) li.classList.add('yt');
    else if (linkText.includes('linkedin')) li.classList.add('in');
    // Add a generic class if no specific social media is detected
    if (!li.classList.length) li.classList.add('social-item');

    li.append(anchor);
    moveInstrumentation(row, li);
    socialUl.append(li);
  });
  socialWrapCenter.append(socialUl);
  footerHeaderRow.append(socialWrapCenter);
  root.append(footerHeaderRow);

  // Footer Menu Box Section
  const footerMenuBoxRow = document.createElement('div');
  footerMenuBoxRow.classList.add('row', 'footer-menu-box');

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');

  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu');

  menuBlockRows.forEach((row) => {
    const [blockTitleCell, blockTitleLinkCell, menuItemsContainerCell] = [...row.children]; // Fixed schema for menu blocks

    const linkBlocksDiv = document.createElement('div');
    linkBlocksDiv.classList.add('link-blocks');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const titleAnchor = document.createElement('a');
    const foundTitleLink = blockTitleLinkCell.querySelector('a');
    if (foundTitleLink) {
      titleAnchor.href = foundTitleLink.href;
    }
    titleAnchor.textContent = blockTitleCell?.textContent.trim() || '';
    moveInstrumentation(blockTitleCell, titleAnchor);
    moveInstrumentation(blockTitleLinkCell, titleAnchor);
    span.append(titleAnchor);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    // Filter menu item rows that logically belong to this menu block
    // This is a heuristic, assuming menu items directly follow their menu block in the block.children
    // A more robust solution would be to use a data attribute or a specific structure.
    const currentMenuBlockItems = menuItemRows.filter(
      (itemRow) => itemRows.indexOf(itemRow) > itemRows.indexOf(row)
        && itemRows.indexOf(itemRow) < itemRows.findIndex((r, i) => i > itemRows.indexOf(row) && (menuBlockRows.includes(r) || secondaryNavRows.includes(r) || socialLinkRows.includes(r))),
    );

    currentMenuBlockItems.forEach((itemRow) => {
      const [labelCell, linkCell, hierarchyTreeCell] = [...itemRow.children]; // Fixed schema for menu items

      const li = document.createElement('li');
      const foundLink = linkCell.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(labelCell, rootEl);
      moveInstrumentation(linkCell, rootEl);
      li.appendChild(rootEl);

      const hierarchyRootTempDiv = document.createElement('div');
      hierarchyRootTempDiv.innerHTML = hierarchyTreeCell.innerHTML;
      const hierarchyRoot = hierarchyRootTempDiv.querySelector('ul');

      if (hierarchyRoot) {
        // Apply classes from ORIGINAL HTML to nested elements
        hierarchyRoot.querySelectorAll('a').forEach(a => {
          // No specific classes in original HTML for nested anchors, but good to keep in mind
        });
        hierarchyRoot.querySelectorAll('ul').forEach(ul => ul.classList.add('has-footer-inner-sub-child'));
        hierarchyRoot.querySelectorAll('li').forEach(liItem => {
          // No specific classes in original HTML for nested li, but good to keep in mind
        });

        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        moveInstrumentation(hierarchyTreeCell, wrapper); // Move instrumentation from richtext cell to wrapper
        while (hierarchyRootTempDiv.firstChild) {
          wrapper.append(hierarchyRootTempDiv.firstChild);
        }

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot, 'has-footer-inner-sub-child');
      }
      footerInnerList.append(li);
      moveInstrumentation(itemRow, li);
    });

    headDiv.append(footerInnerList);
    linkBlocksDiv.append(headDiv);
    footerMenuDiv.append(linkBlocksDiv);
    moveInstrumentation(row, linkBlocksDiv);
  });

  footerMenuCol.append(footerMenuDiv);
  footerMenuBoxRow.append(footerMenuCol);
  root.append(footerMenuBoxRow);

  // Copyright Section
  const copyrightWrapRow = document.createElement('div');
  copyrightWrapRow.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Fixed schema for secondary nav items

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(labelCell, anchor);
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);
    secondaryNavUl.append(li);
    moveInstrumentation(row, li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrapRow.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = copyrightTextRow?.textContent.trim() || '';
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrapRow.append(copyrightTextCol);

  root.append(copyrightWrapRow);
  block.replaceChildren(root); // Use replaceChildren to atomically update the block content

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
