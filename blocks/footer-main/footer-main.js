import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  // Ensure classes from ORIGINAL HTML are applied to nested UL/LI/A elements
  rootUl.classList.add('footer-inner-list'); // Add class to the root UL if not present
  rootUl.querySelectorAll(':scope > li').forEach((li) => {
    li.classList.add('list-item'); // Add a generic list-item class if needed, or specific from original HTML
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');
    let trigger;

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
        trigger = span;
      }
    } else {
      trigger = anchor;
      anchor.classList.add('nav-menu-item'); // Add class to anchor if it's a menu item
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add(
        level === 0 ? 'has-footer-sub-child' : 'has-footer-inner-sub-child',
      );
      subWrap.append(nested);
      li.append(subWrap);

      if (trigger) {
        const small = document.createElement('small');
        small.setAttribute('data-once', 'footerClickEvent');
        if (level > 0) {
          small.setAttribute('data-once', 'footerClickEvent innerFooterClickEvent');
        }
        small.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776678565987.svg+xml">'; // Placeholder SVG
        trigger.after(small);

        trigger.addEventListener('click', (e) => {
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

  const footerMain = document.createElement('div');
  footerMain.classList.add('container');

  // Fixed fields
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[2];
  const itemRows = children.slice(3);

  // Footer Header
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '#';
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
  moveInstrumentation(logoRow, logoLink);
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  // Social Links
  const socialLinksCol = document.createElement('div');
  socialLinksCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');

  // Filter for social-link-item: 3 cells, has a picture in the first cell, and a richtext in the third
  const socialLinkItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('picture') && cells[2].querySelector('ul');
  });

  socialLinkItems.forEach((row) => {
    const cells = [...row.children]; // Use content detection, not index access directly on row.children
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    // const hierarchyCell = cells.find(cell => cell.querySelector('ul')); // Not used here, but good to have

    const li = document.createElement('li');
    const iconLink = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      iconLink.href = foundLink.href;
      iconLink.target = '_blank';
    } else {
      iconLink.href = '#';
    }
    moveInstrumentation(linkCell, iconLink);

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        // Assuming social icons are SVG and should be inlined
        // This is a placeholder for actual SVG content. In a real scenario,
        // you would fetch or have a mapping for SVG content based on the src.
        // For now, we'll use a generic SVG.
        const svgContent = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.44-2.43-.9-2.43-.9-.33-.84-.8-1.06-.8-1.06-.65-.45.05-.44.05-.44.72.05 1.1.74 1.1.74.64 1.1 1.68.78 2.09.6.06-.47.25-.78.46-.96-1.6-.18-3.29-.8-3.29-3.56 0-.78.28-1.42.74-1.92-.08-.18-.32-.91.07-1.89 0 0 .6-.19 1.97.73.57-.16 1.16-.24 1.76-.27.6.03 1.19.11 1.76.27 1.37-.92 1.97-.73 1.97-.73.39.98.15 1.71.07 1.89.46.5.74 1.14.74 1.92 0 2.77-1.7 3.37-3.3.35.25.46.95.46 1.92 0 .69-.01 1.25-.01 1.49 0 .21.15.45.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/></svg>';
        iconLink.innerHTML = svgContent;
        // Add specific class based on alt text or other identifier if needed
        if (img.alt.toLowerCase().includes('facebook')) li.classList.add('fb');
        if (img.alt.toLowerCase().includes('twitter')) li.classList.add('tw');
        if (img.alt.toLowerCase().includes('instagram')) li.classList.add('inst');
        if (img.alt.toLowerCase().includes('youtube')) li.classList.add('yt');
        if (img.alt.toLowerCase().includes('linkedin')) li.classList.add('in');
      }
    }
    moveInstrumentation(iconCell, li);
    li.append(iconLink);
    socialWrap.append(li);
  });
  socialLinksCol.append(socialWrap);
  footerHeader.append(socialLinksCol);
  footerMain.append(footerHeader);

  // Footer Menu Blocks
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  // Filter for footer-menu-block: 3 cells, first cell has text, second has a link, third is a container placeholder
  const footerMenuBlockItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].textContent.trim() && cells[1].querySelector('a') && !cells[2].querySelector('picture');
  });

  footerMenuBlockItems.forEach((row) => {
    const cells = [...row.children]; // Use content detection
    const blockLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
    const blockLinkCell = cells.find(cell => cell.querySelector('a'));
    // const menuItemsContainerCell = cells.find(cell => cell.textContent.trim() === 'Menu Items value'); // Placeholder cell

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const head = document.createElement('div');
    head.classList.add('head');

    const span = document.createElement('span');
    const blockLink = document.createElement('a');
    const foundBlockLink = blockLinkCell?.querySelector('a');
    if (foundBlockLink) {
      blockLink.href = foundBlockLink.href;
    } else {
      blockLink.href = '#';
    }
    blockLink.textContent = blockLabelCell?.textContent.trim() || '';
    moveInstrumentation(blockLinkCell, blockLink);
    moveInstrumentation(blockLabelCell, blockLink);
    span.append(blockLink);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    head.append(span);

    // Menu Items (nested under footer-menu-block)
    const menuItemsUl = document.createElement('ul');
    menuItemsUl.classList.add('footer-inner-list');

    // Filter for footer-menu-item rows that belong to this block
    // A footer-menu-item has 4 cells, and the 4th cell contains a richtext (ul)
    const menuItems = itemRows.filter((itemRow) => {
      const cells = [...itemRow.children];
      return cells.length === 4 && cells[3].querySelector('ul');
    });

    menuItems.forEach((menuItemRow) => {
      const cells = [...menuItemRow.children]; // Use content detection
      const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && !cell.querySelector('ul'));
      const linkCell = cells.find(cell => cell.querySelector('a'));
      // const iconCell = cells.find(cell => cell.querySelector('picture')); // Not used in rendering, but present in model
      const hierarchyCell = cells.find(cell => cell.querySelector('ul'));

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
        // Ensure moveInstrumentation is called before moving nested content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML; // Read innerHTML for richtext
        moveInstrumentation(hierarchyCell, tempDiv); // Instrument the original cell to the temp div

        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');

        // Apply classes to nested elements from ORIGINAL HTML
        tempDiv.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-item'));
        tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('footer-inner-list'));
        tempDiv.querySelectorAll('li').forEach(liElement => liElement.classList.add('list-item'));

        // Move children from tempDiv to wrapper
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
        transformNestedLists(wrapper.querySelector('ul')); // Pass the actual UL inside the wrapper
      }
      menuItemsUl.append(li);
    });

    head.append(menuItemsUl);
    linkBlocks.append(head);
    footerMenu.append(linkBlocks);
  });

  footerMenuCol.append(footerMenu);
  footerMenuBox.append(footerMenuCol);
  footerMain.append(footerMenuBox);

  // Copyright and Secondary Nav
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  // Secondary Nav
  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  // Filter for secondary-nav-item: 2 cells, no picture
  const secondaryNavItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && !cells[0].querySelector('picture') && !cells[1].querySelector('picture');
  });

  secondaryNavItems.forEach((row) => {
    const cells = [...row.children]; // Use content detection
    const labelCell = cells.find(cell => !cell.querySelector('a'));
    const linkCell = cells.find(cell => cell.querySelector('a'));

    const li = document.createElement('li');
    const link = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    } else {
      link.href = '#';
    }
    link.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(linkCell, link);
    moveInstrumentation(labelCell, link);
    li.append(link);
    secondaryNavUl.append(li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  // Copyright Text
  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = copyrightTextRow.textContent.trim();
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrap.append(copyrightTextCol);
  footerMain.append(copyrightWrap);

  block.innerHTML = '';
  block.append(footerMain);
}
