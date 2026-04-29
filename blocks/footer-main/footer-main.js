import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Handle label-only nodes
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
      if (level === 0) {
        subWrap.classList.add('has-footer-sub-child');
      } else {
        subWrap.classList.add('has-footer-inner-sub-child');
      }
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        const spanIcon = document.createElement('span');
        // SVG from ORIGINAL HTML
        spanIcon.innerHTML = `<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>`;
        trigger.appendChild(spanIcon);

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

  // Root fields: logo, logoLink, copyrightText, socialLinks (container), menuBlocks (container), secondaryNav (container)
  // The first three are single rows, the rest are item rows.
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[2];
  const itemRows = children.slice(3); // All subsequent rows are item rows

  const root = document.createElement('div');
  root.classList.add('container');

  // Footer Header Section
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');
  root.append(footerHeader);

  // Logo Column
  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  footerHeader.append(logoCol);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  logoCol.append(logoDiv);

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
    moveInstrumentation(logoLinkRow, logoLink);
  }

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    optimizedImg.classList.add('hiddenlogo1');
    optimizedImg.width = 200;
    optimizedImg.height = 30;
    optimizedImg.style.width = 'auto';
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);

  // Social Links Column
  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  footerHeader.append(socialCol);

  const socialList = document.createElement('ul');
  socialList.classList.add('social-wrap');
  socialCol.append(socialList);

  // Filter for footer-social-item: 2 cells, cell[0] has 'a', cell[1] has 'ul' (hierarchy-tree)
  const socialLinkRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells[0].querySelector('a') && cells[1].querySelector('ul');
  });

  socialLinkRows.forEach((row) => {
    const [socialLinkCell, hierarchyCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    // Determine social icon class from original HTML (e.g., fb, tw, inst, yt, in)
    // This logic needs to be more robust, but for now, we'll use a placeholder.
    // In a real scenario, we'd extract this from the original HTML or a mapping.
    const socialAnchor = document.createElement('a');
    const foundSocialLink = socialLinkCell.querySelector('a');
    if (foundSocialLink) {
      socialAnchor.href = foundSocialLink.href;
      socialAnchor.target = '_blank';
      // Inline SVG from ORIGINAL HTML
      socialAnchor.innerHTML = `<svg width="30" height="30" viewBox="0 0 40 41" xmlns:xlink="http://www.w3.org/1999/xlink">
                                  <image xlink:href="data:stripped" x="0" y="0" width="30" height="30"></image>
                                </svg>`;
      moveInstrumentation(socialLinkCell, socialAnchor);
    }
    li.append(socialAnchor);
    socialList.append(li);
  });

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  root.append(footerMenuBox);

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  footerMenuBox.append(footerMenuCol);

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');
  footerMenuCol.append(footerMenu);

  // Filter for footer-link-block: 3 cells, cell[0] is text, cell[1] has 'a', cell[2] is text "Menu Links value"
  const menuBlockRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].textContent.trim() && cells[1].querySelector('a') && cells[2].textContent.trim() === 'Menu Links value';
  });

  // Filter for footer-link-item: 3 cells, cell[0] is text, cell[1] has 'a', cell[2] has 'ul' (hierarchy-tree)
  const linkItemRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].textContent.trim() && cells[1].querySelector('a') && cells[2].querySelector('ul');
  });

  // Distribute linkItemRows among menuBlockRows
  const linkItemsPerBlock = linkItemRows.length / menuBlockRows.length;
  let linkItemIndex = 0;

  menuBlockRows.forEach((row) => {
    const [blockTitleCell, blockTitleLinkCell] = [...row.children]; // Destructuring for fixed schema
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    footerMenu.append(linkBlocks);

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    linkBlocks.append(headDiv);

    const span = document.createElement('span');
    const blockTitleAnchor = document.createElement('a');
    const foundBlockTitleLink = blockTitleLinkCell.querySelector('a');
    if (foundBlockTitleLink) {
      blockTitleAnchor.href = foundBlockTitleLink.href;
      blockTitleAnchor.textContent = blockTitleCell.textContent.trim(); // Read text from blockTitleCell
      moveInstrumentation(blockTitleLinkCell, blockTitleAnchor);
      moveInstrumentation(blockTitleCell, blockTitleAnchor); // Move instrumentation from blockTitleCell too
    } else {
      // If no link, just use a span for the title
      blockTitleAnchor.textContent = blockTitleCell.textContent.trim();
      moveInstrumentation(blockTitleCell, blockTitleAnchor);
    }
    span.append(blockTitleAnchor);

    const small = document.createElement('small');
    // small.dataset.once = 'footerMobileInner'; // Add data attribute from ORIGINAL HTML
    span.append(small);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');
    headDiv.append(footerInnerList);

    // Filter link items that belong to this block
    const associatedLinkItems = linkItemRows.slice(linkItemIndex, linkItemIndex + linkItemsPerBlock);
    linkItemIndex += linkItemsPerBlock;

    associatedLinkItems.forEach((linkItemRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...linkItemRow.children]; // Destructuring for fixed schema
      const li = document.createElement('li');
      const foundLink = linkCell?.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
        rootEl.textContent = labelCell?.textContent.trim() || '';
        moveInstrumentation(linkCell, rootEl); // Move instrumentation from link cell
      } else {
        rootEl = document.createElement('span');
        rootEl.textContent = labelCell?.textContent.trim() || '';
      }
      moveInstrumentation(labelCell, rootEl); // Move instrumentation from label cell
      li.appendChild(rootEl);

      const hierarchyRoot = hierarchyCell?.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        // Create a temporary div to hold the innerHTML and apply classes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from hierarchyCell

        // Apply classes to nested elements from ORIGINAL HTML
        tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('footer-inner-list')); // Example class, adjust as needed
        tempDiv.querySelectorAll('li').forEach(liItem => liItem.classList.add('list-item')); // Example class, adjust as needed
        tempDiv.querySelectorAll('a').forEach(a => a.classList.add('link')); // Example class, adjust as needed

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
      footerInnerList.appendChild(li);
    });
  });

  // Copyright Section
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');
  root.append(copyrightWrap);

  // Secondary Nav Column
  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  copyrightWrap.append(secondaryNavCol);

  const secondaryNavList = document.createElement('ul');
  secondaryNavList.classList.add('secondary-nav');
  secondaryNavCol.append(secondaryNavList);

  // Filter for footer-secondary-nav-item: 2 cells, cell[0] is text, cell[1] has 'a'
  const secondaryNavItemRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells[0].textContent.trim() && cells[1].querySelector('a');
  });

  secondaryNavItemRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      moveInstrumentation(linkCell, anchor);
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(labelCell, anchor);
    li.append(anchor);
    secondaryNavList.append(li);
  });

  // Copyright Text Column
  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.innerHTML = copyrightTextRow.innerHTML; // Use innerHTML for richtext
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrap.append(copyrightTextCol);

  block.replaceChildren(root);
}
