import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Add classes from original HTML to li
    li.classList.add('list-item'); // Assuming 'list-item' is a common class for <li> in menus

    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      anchor.classList.add('nav-menu-item'); // Assuming 'nav-menu-item' for <a> in menus
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
      nested.remove(); // Remove the original ul to re-wrap it
      nested.classList.add('footer-inner-list'); // Add class to the nested ul

      const subWrap = document.createElement('div');
      subWrap.classList.add('has-footer-sub-child');
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
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[2];

  // Item rows - using content detection for different row types at the root level
  const socialLinkRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child ul'),
  );
  const menuBlockRows = children.filter(
    (row) => row.children.length === 3 && !row.querySelector('div:first-child a') && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child'),
  );
  const menuItemRows = children.filter(
    (row) => row.children.length === 3 && !row.querySelector('div:first-child a') && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child ul'),
  );
  const secondaryNavLinkRows = children.filter(
    (row) => row.children.length === 2 && !row.querySelector('div:first-child a') && row.querySelector('div:last-child a'),
  );

  const footer = document.createElement('div');
  footer.classList.add('container');

  // Footer Header
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const logoAnchor = logoLinkRow.querySelector('a'); // logoLink is aem-content
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
  }
  const picture = logoRow.querySelector('picture'); // logo is reference
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  const socialWrapCol = document.createElement('div');
  socialWrapCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialWrapUl = document.createElement('ul');
  socialWrapUl.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // FIXED: Destructuring for fixed schema

    if (linkCell && hierarchyCell) {
      const li = document.createElement('li');
      const anchor = document.createElement('a');
      const foundLink = linkCell.querySelector('a'); // link is aem-content
      if (foundLink) {
        anchor.href = foundLink.href;
        anchor.target = '_blank';
      }

      const tempDiv = document.createElement('div'); // Use a temp div to parse richtext
      moveInstrumentation(hierarchyCell, tempDiv);
      tempDiv.innerHTML = hierarchyCell.innerHTML; // hierarchy-tree is richtext

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        // Assuming the first <li> in the hierarchy contains the social icon info
        const firstLi = hierarchyRoot.querySelector('li');
        if (firstLi) {
          const socialIconText = firstLi.textContent.trim().toLowerCase();
          if (socialIconText.includes('facebook')) li.classList.add('fb');
          else if (socialIconText.includes('twitter')) li.classList.add('tw');
          else if (socialIconText.includes('instagram')) li.classList.add('inst');
          else if (socialIconText.includes('youtube')) li.classList.add('yt');
          else if (socialIconText.includes('linkedin')) li.classList.add('in');
        }
        // Simplified SVG for social icons as actual SVGs are stripped
        // Using a generic SVG that can be styled via CSS `fill: currentColor`
        anchor.innerHTML = '<svg width="30" height="30" viewBox="0 0 40 41"><rect width="30" height="30" fill="currentColor"/></svg>';
      }
      moveInstrumentation(row, li);
      li.append(anchor);
      socialWrapUl.append(li);
    }
  });

  socialWrapCol.append(socialWrapUl);
  footerHeader.append(socialWrapCol);
  footer.append(footerHeader);

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu');

  menuBlockRows.forEach((row) => {
    const [blockLabelCell, blockLinkCell, menuItemsContainerCell] = [...row.children]; // FIXED: Destructuring for fixed schema

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    const span = document.createElement('span');
    const blockLink = document.createElement('a');
    const foundBlockLink = blockLinkCell.querySelector('a'); // blockLink is aem-content
    if (foundBlockLink) {
      blockLink.href = foundBlockLink.href;
    }
    blockLink.textContent = blockLabelCell.textContent.trim(); // blockLabel is text
    span.append(blockLink);
    span.append(document.createElement('small')); // Placeholder for data-once="footerMobileInner"
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    // Filter menu items that logically belong to this menu block.
    // This assumes a sequential structure or some other linking mechanism.
    // For now, we'll append all menu items as the model doesn't specify a direct link.
    // This is a known limitation based on the provided model and filter logic.
    menuItemRows.forEach((itemRow) => {
      const [itemLabelCell, itemLinkCell, hierarchyTreeCell] = [...itemRow.children]; // FIXED: Destructuring for fixed schema

      const li = document.createElement('li');
      const itemLink = document.createElement('a');
      const foundItemLink = itemLinkCell.querySelector('a'); // itemLink is aem-content
      if (foundItemLink) {
        itemLink.href = foundItemLink.href;
      }
      itemLink.textContent = itemLabelCell.textContent.trim(); // itemLabel is text
      moveInstrumentation(itemRow, li); // Move instrumentation to the <li>
      li.append(itemLink);

      const tempDiv = document.createElement('div'); // Use a temp div to parse richtext
      moveInstrumentation(hierarchyTreeCell, tempDiv);
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML; // hierarchy-tree is richtext

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        const spanArrow = document.createElement('span');
        // SVG from ORIGINAL HTML
        spanArrow.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
        li.append(spanArrow);

        const hasFooterSubChild = document.createElement('div');
        hasFooterSubChild.classList.add('has-footer-sub-child');
        // Move all children from the parsed hierarchyRoot to the new div
        while (hierarchyRoot.firstChild) {
          hasFooterSubChild.append(hierarchyRoot.firstChild);
        }
        li.append(hasFooterSubChild);
        // Apply classes to nested elements from ORIGINAL HTML
        hasFooterSubChild.querySelectorAll('ul').forEach(ul => ul.classList.add('footer-inner-list'));
        hasFooterSubChild.querySelectorAll('li').forEach(liElem => liElem.classList.add('list-item'));
        hasFooterSubChild.querySelectorAll('a').forEach(aElem => aElem.classList.add('nav-menu-item'));

        // Re-run transformNestedLists on the moved hierarchy
        transformNestedLists(hasFooterSubChild);

        itemLink.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          hasFooterSubChild.classList.toggle('active');
        });
      }
      footerInnerList.append(li);
    });

    headDiv.append(footerInnerList);
    linkBlocks.append(headDiv);
    moveInstrumentation(row, linkBlocks);
    footerMenuDiv.append(linkBlocks);
  });

  footerMenuCol.append(footerMenuDiv);
  footerMenuBox.append(footerMenuCol);
  footer.append(footerMenuBox);

  // Copyright Wrap
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // FIXED: Destructuring for fixed schema
    const li = document.createElement('li');
    const link = document.createElement('a');
    const foundLink = linkCell.querySelector('a'); // link is aem-content
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = labelCell.textContent.trim(); // label is text
    moveInstrumentation(row, li);
    li.append(link);
    secondaryNavUl.append(li);
  });

  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightTextCol.innerHTML = copyrightTextRow.innerHTML; // copyrightText is richtext
  copyrightWrap.append(copyrightTextCol);

  footer.append(copyrightWrap);

  block.replaceChildren(footer);
}
