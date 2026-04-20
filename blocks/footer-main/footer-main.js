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
      nested.remove(); // Remove the original ul to re-wrap it
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-footer-sub-child'); // Use original HTML class
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

      // Recursively transform inner lists
      transformNestedLists(nested);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields are fixed: logo, logo-link, copyright-text
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[2];

  const logoPicture = logoRow.querySelector('picture');
  const logoLink = logoLinkRow.querySelector('a');
  const copyrightText = copyrightTextRow.textContent.trim();

  // Item rows are identified by content detection
  const itemRows = children.slice(3); // All rows after the fixed root fields

  const socialLinkItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('picture') && cells[1].querySelector('a') && cells[2].querySelector('ul');
  });

  const footerMenuBlocks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && !cells[0].querySelector('picture') && !cells[0].querySelector('a') && cells[1].querySelector('a') && !cells[2].querySelector('ul');
  });

  const footerMenuItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && !cells[0].querySelector('picture') && !cells[0].querySelector('a') && cells[1].querySelector('a') && cells[2].querySelector('ul');
  });

  const secondaryNavItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && !cells[0].querySelector('picture') && !cells[0].querySelector('a') && cells[1].querySelector('a');
  });

  const container = document.createElement('div');
  container.classList.add('container');

  // Footer Header Section
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoAnchor = document.createElement('a');
  if (logoLink) {
    logoAnchor.href = logoLink.href;
  }
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoAnchor.append(optimizedPic);
  }
  logoDiv.append(logoAnchor);
  moveInstrumentation(logoRow, logoDiv);
  moveInstrumentation(logoLinkRow, logoAnchor);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  // Social Links Section
  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');

  socialLinkItems.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells[0];
    const linkCell = cells[1];
    // const hierarchyCell = cells[2]; // Not used for social links directly, but present in model

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank'; // Assuming social links open in new tab
    }
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      // Inline SVG if it's a data URI or direct SVG
      if (img.src.startsWith('data:image/svg+xml') || img.src.endsWith('.svg')) {
        fetch(img.src)
          .then((response) => response.text())
          .then((svgText) => {
            const svgContainer = document.createElement('span'); // Use span to hold SVG
            svgContainer.innerHTML = svgText;
            anchor.append(svgContainer);
          })
          .catch(() => {
            // Fallback to img if SVG fetch fails
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            anchor.append(optimizedPic);
          });
      } else {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        anchor.append(optimizedPic);
      }
    }
    moveInstrumentation(row, li);
    li.append(anchor);
    socialWrap.append(li);
  });

  socialCol.append(socialWrap);
  footerHeader.append(socialCol);
  container.append(footerHeader);

  // Footer Menu Section
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerMenuBlocks.forEach((row) => {
    const cells = [...row.children];
    const titleCell = cells[0];
    const titleLinkCell = cells[1];
    // const menuItemsContainerCell = cells[2]; // This is a container field, its items are separate block.children rows

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const titleAnchor = document.createElement('a');
    const foundTitleLink = titleLinkCell.querySelector('a');
    if (foundTitleLink) {
      titleAnchor.href = foundTitleLink.href;
    }
    titleAnchor.textContent = titleCell.textContent.trim();
    span.append(titleAnchor);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    headDiv.append(span);

    const menuItemsUl = document.createElement('ul');
    menuItemsUl.classList.add('footer-inner-list');

    // Filter footerMenuItems that belong to this footerMenuBlock
    // This logic assumes footerMenuItems appear immediately after their parent footerMenuBlock in the DOM
    // A more robust solution might involve a data attribute or explicit mapping if order is not guaranteed.
    // For now, we'll iterate through all footerMenuItems and assume they are distinct.
    // The current model structure suggests footer-menu-item rows are distinct block.children, not nested within footer-menu-block's third cell.
    // The original JS had `[...menuItemsCell.children].filter((item) => item.children.length === 3);` which is incorrect for a container field.
    // We need to iterate over the `footerMenuItems` array directly.

    footerMenuItems.forEach((menuItemRow) => {
      const itemCells = [...menuItemRow.children];
      const labelCell = itemCells[0];
      const linkCell = itemCells[1];
      const hierarchyCell = itemCells[2];

      const li = document.createElement('li');
      const foundLink = linkCell.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell.textContent.trim() || '';
      moveInstrumentation(menuItemRow, rootEl);
      li.appendChild(rootEl);

      const hierarchyRoot = hierarchyCell.querySelector('ul');
      if (hierarchyRoot) {
        // Create a temporary div to hold and process the innerHTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv

        // Apply classes from ORIGINAL HTML to nested elements
        tempDiv.querySelectorAll('a').forEach(a => {
          // No specific classes for <a> in original HTML, but good to keep in mind
        });
        tempDiv.querySelectorAll('ul').forEach(ul => {
          // No specific classes for <ul> in original HTML, but good to keep in mind
        });
        tempDiv.querySelectorAll('li').forEach(liElem => {
          // No specific classes for <li> in original HTML, but good to keep in mind
        });

        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child'); // Use original HTML class

        // Move all children from tempDiv to wrapper
        while (tempDiv.firstChild) {
          wrapper.append(tempDiv.firstChild);
        }

        // Add event listener for the parent menu item to toggle the nested list
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(wrapper.querySelector('ul')); // Apply transformations to the nested UL
      }
      menuItemsUl.append(li);
    });

    headDiv.append(menuItemsUl);
    linkBlocks.append(headDiv);
    moveInstrumentation(row, linkBlocks);
    footerMenu.append(linkBlocks);
  });

  footerMenuCol.append(footerMenu);
  footerMenuBox.append(footerMenuCol);
  container.append(footerMenuBox);

  // Copyright Section
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells[0];
    const linkCell = cells[1];
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, li);
    li.append(anchor);
    secondaryNavUl.append(li);
  });

  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = copyrightText;
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrap.append(copyrightTextCol);

  container.append(copyrightWrap);
  block.innerHTML = '';
  block.append(container);
}
