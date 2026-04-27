import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Add classes from ORIGINAL HTML to li
    li.classList.add('nav-menu-item', 'list-item');

    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      // Add classes from ORIGINAL HTML to anchor
      anchor.classList.add('nav-menu-link');
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
        // Add classes from ORIGINAL HTML to span if it acts as a link
        span.classList.add('nav-menu-link');
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-footer-sub-child'); // Class from ORIGINAL HTML
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
      // Add classes from ORIGINAL HTML to nested ul
      nested.classList.add('footer-inner-list');
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    copyrightTextRow,
    ...itemRows
  ] = children.filter((row) => row.children.length > 0);

  // Filter based on BlockJson schema (cell count and content type)
  const socialLinkItems = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('picture') && row.querySelector('a') && row.querySelector('ul'),
  );
  const footerMenuBlocks = itemRows.filter(
    (row) => row.children.length === 3 && !row.querySelector('picture') && row.querySelector('a') && !row.querySelector('ul'),
  );
  const footerMenuItems = itemRows.filter(
    (row) => row.children.length === 4 && row.querySelector('picture') && row.querySelector('a'),
  );
  const footerMenuSubItems = itemRows.filter(
    (row) => row.children.length === 2 && !row.querySelector('picture') && row.querySelector('a'),
  );
  const secondaryNavItems = itemRows.filter(
    (row) => row.children.length === 2 && !row.querySelector('picture') && row.querySelector('a') && !row.querySelector('ul'),
  );

  const container = document.createElement('div');
  container.classList.add('container');

  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  const logoLinkAnchor = logoLinkRow.querySelector('a');
  if (logoLinkAnchor) {
    logoLink.href = logoLinkAnchor.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoDiv);
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');

  socialLinkItems.forEach((row) => {
    // FIXED: Use array destructuring for fixed schema
    const [iconCell, linkCell, hierarchyTreeCell] = [...row.children];
    const li = document.createElement('li');
    const socialLink = document.createElement('a');
    const socialLinkAnchor = linkCell.querySelector('a');
    if (socialLinkAnchor) {
      socialLink.href = socialLinkAnchor.href;
      socialLink.target = '_blank';
    }
    moveInstrumentation(linkCell, socialLink);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '30' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        socialLink.append(optimizedPic);
      }
    }
    moveInstrumentation(iconCell, li);
    li.append(socialLink);

    // FIXED: Handle hierarchy-tree richtext field
    const hierarchyTempDiv = document.createElement('div');
    moveInstrumentation(hierarchyTreeCell, hierarchyTempDiv);
    hierarchyTempDiv.innerHTML = hierarchyTreeCell.innerHTML;
    const rootUl = hierarchyTempDiv.querySelector('ul');
    if (rootUl) {
      rootUl.classList.add('footer-inner-list'); // Add class from ORIGINAL HTML
      transformNestedLists(rootUl);
      li.append(rootUl); // Append the transformed list to the social link item
    }

    socialWrap.append(li);
  });
  socialCol.append(socialWrap);
  footerHeader.append(socialCol);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerMenuBlocks.forEach((row) => {
    // FIXED: Use array destructuring for fixed schema. Removed menuItemsCell as it's a container.
    const [blockTitleCell, blockTitleLinkCell] = [...row.children];
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const blockTitleLink = document.createElement('a');
    const blockTitleLinkAnchor = blockTitleLinkCell.querySelector('a');
    if (blockTitleLinkAnchor) {
      blockTitleLink.href = blockTitleLinkAnchor.href;
    }
    // FIXED: blockTitleLink text content should come from blockTitleCell
    blockTitleLink.textContent = blockTitleCell.textContent.trim();
    moveInstrumentation(blockTitleLinkCell, blockTitleLink);
    moveInstrumentation(blockTitleCell, span);
    span.append(blockTitleLink);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    const relevantMenuItems = footerMenuItems.filter((itemRow) => {
      // FIXED: Use the actual link href for filtering, not textContent
      const parentBlockLink = blockTitleLink.href;
      const itemLink = itemRow.querySelector('a')?.href;
      return itemLink && itemLink.startsWith(parentBlockLink);
    });

    relevantMenuItems.forEach((menuItemRow) => {
      // FIXED: Use array destructuring for fixed schema
      const [labelCell, linkCell, iconCell, subMenuItemsContainerCell] = [...menuItemRow.children];
      const li = document.createElement('li');
      const link = document.createElement('a');
      const linkAnchor = linkCell.querySelector('a');
      if (linkAnchor) {
        link.href = linkAnchor.href;
      }
      link.textContent = labelCell.textContent.trim();
      moveInstrumentation(linkCell, link);
      moveInstrumentation(labelCell, li);
      li.append(link);

      const subMenuItems = footerMenuSubItems.filter((subItemRow) => {
        const parentLink = link.href;
        const subItemLink = subItemRow.querySelector('a')?.href;
        return subItemLink && subItemLink.startsWith(parentLink);
      });

      if (subMenuItems.length > 0) {
        const subMenuSpan = document.createElement('span');
        subMenuSpan.setAttribute('data-once', 'footerClickEvent');
        // Add a simple arrow icon for the dropdown (inline SVG as per Rule 25.4)
        subMenuSpan.innerHTML = '<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 6L0.669873 0.75L9.33013 0.75L5 6Z" fill="currentColor"/></svg>';
        li.append(subMenuSpan);

        const subChildDiv = document.createElement('div');
        subChildDiv.classList.add('has-footer-sub-child');

        const subUl = document.createElement('ul');
        subMenuItems.forEach((subItemRow) => {
          // FIXED: Use array destructuring for fixed schema
          const [subLabelCell, subLinkCell] = [...subItemRow.children];
          const subLi = document.createElement('li');
          const subLink = document.createElement('a');
          const subLinkAnchor = subLinkCell.querySelector('a');
          if (subLinkAnchor) {
            subLink.href = subLinkAnchor.href;
          }
          subLink.textContent = subLabelCell.textContent.trim();
          moveInstrumentation(subLinkCell, subLink);
          moveInstrumentation(subLabelCell, subLi);
          subLi.append(subLink);
          subUl.append(subLi);
        });
        subChildDiv.append(subUl);
        li.append(subChildDiv);

        subMenuSpan.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          subChildDiv.classList.toggle('active');
          li.classList.toggle('active');
        });
      }
      footerInnerList.append(li);
    });

    headDiv.append(footerInnerList);
    linkBlocks.append(headDiv);
    footerMenu.append(linkBlocks);
    moveInstrumentation(row, linkBlocks);
  });

  footerMenuCol.append(footerMenu);
  footerMenuBox.append(footerMenuCol);
  container.append(footerMenuBox);

  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNav = document.createElement('ul');
  secondaryNav.classList.add('secondary-nav');

  secondaryNavItems.forEach((row) => {
    // FIXED: Use array destructuring for fixed schema
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    const link = document.createElement('a');
    const linkAnchor = linkCell.querySelector('a');
    if (linkAnchor) {
      link.href = linkAnchor.href;
    }
    link.textContent = labelCell.textContent.trim();
    moveInstrumentation(linkCell, link);
    moveInstrumentation(labelCell, li);
    li.append(link);
    secondaryNav.append(li);
  });
  secondaryNavCol.append(secondaryNav);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  if (copyrightTextRow) {
    copyrightTextCol.innerHTML = copyrightTextRow.innerHTML;
    moveInstrumentation(copyrightTextRow, copyrightTextCol);
  }
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
