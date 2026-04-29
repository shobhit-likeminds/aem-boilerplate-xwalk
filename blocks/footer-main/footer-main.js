import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Add classes from ORIGINAL HTML to li
    li.classList.add('nav-menu-item', 'list-item');

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
      subWrap.classList.add(level === 0 ? 'has-footer-sub-child' : 'has-footer-inner-sub-child');
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        // Create SVG for the arrow icon
        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
        svgIcon.setAttribute('fill', '#000000');
        svgIcon.setAttribute('stroke', '#000000');
        svgIcon.setAttribute('stroke-width', '4.851456000000001');
        svgIcon.innerHTML = `
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
              <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
            </g>
          </g>
        `;
        const smallEl = document.createElement('small');
        smallEl.append(svgIcon);
        trigger.after(smallEl);

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
  const [logoRow, logoLinkRow, copyrightTextRow, ...itemRows] = [...block.children];

  // Filter item rows based on their structure and content
  const socialLinkItems = itemRows.filter((row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim() !== 'Menu Items value' && row.querySelector('div:last-child')?.textContent.trim() !== 'Sub Menu Items value');
  const footerMenuBlocks = itemRows.filter((row) => row.children.length === 3 && row.querySelector('div:last-child')?.textContent.trim() === 'Menu Items value');
  const footerMenuItems = itemRows.filter((row) => row.children.length === 4 && row.querySelector('div:last-child')?.textContent.trim() === 'Sub Menu Items value');
  const secondaryNavItems = itemRows.filter((row) => row.children.length === 2);

  const container = document.createElement('div');
  container.classList.add('container');

  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const originalLogoLink = logoLinkRow.querySelector('a');
  if (originalLogoLink) {
    logoLink.href = originalLogoLink.href;
  }
  const picture = logoRow.querySelector('picture');
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

  socialLinkItems.forEach((row) => {
    const [platformCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    const platform = platformCell.textContent.trim().toLowerCase();
    // Use platform name directly for class if it matches original HTML, otherwise substring
    if (['fb', 'tw', 'inst', 'yt', 'in'].includes(platform)) {
      li.classList.add(platform);
    } else {
      li.classList.add(platform.substring(0, 2));
    }

    const anchor = document.createElement('a');
    const originalLink = linkCell.querySelector('a');
    if (originalLink) {
      anchor.href = originalLink.href;
      anchor.target = '_blank';
    }

    // Placeholder SVG for social icons - Use inline SVG or a proper icon solution, not base64 image
    // For now, keeping the base64 as it was in the original, but flagging for review
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('width', '30');
    svgIcon.setAttribute('height', '30');
    svgIcon.setAttribute('viewBox', '0 0 40 41');
    // This base64 image is a placeholder. In a real scenario, this should be replaced
    // with a proper SVG icon from a sprite or an inline SVG.
    svgIcon.innerHTML = `<image xlink:href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cuc2tldGNoLmNvbS8yMDA2L3NrZXRjaCI+PHBhdGggZD0iTTEyIDBDNS4zNzMgMCAwIDUuMzczIDAgMTJDMCAxOC42MjcgNS4zNzMgMjQgMTIgMjRDMTguNjI3IDI0IDI0IDE4LjYyNyAyNCAxMkMyNCA1LjM3MyAxOC42MjcgMCAxMiAwWk0xNi41IDguMjVIMTQuMjVDMTMuNjA1IDguMjUgMTMuMjUgOC41OTUgMTMuMjUgOS4yNVYxMkwxNi41IDEyVjE0LjI1SDEzLjI1VjE4Ljc1SDEwLjVWMTQuMjVINy41VjEySDEwLjVWOUMxMC41IDYuOTYgMTEuMjA1IDYgMTIuNDUgNkgxNi41VjguMjVaIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+" x="0" y="0" width="30" height="30"></image>`;
    anchor.append(svgIcon);
    moveInstrumentation(row, anchor);
    li.append(anchor);
    socialWrapUl.append(li);
  });
  socialWrapCol.append(socialWrapUl);
  footerHeader.append(socialWrapCol);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu');

  footerMenuBlocks.forEach((row) => {
    const [blockTitleCell, blockTitleLinkCell, menuItemsContainerCell] = [...row.children];
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    const span = document.createElement('span');

    const blockTitleAnchor = document.createElement('a');
    const originalBlockTitleLink = blockTitleLinkCell.querySelector('a');
    if (originalBlockTitleLink) {
      blockTitleAnchor.href = originalBlockTitleLink.href;
    }
    blockTitleAnchor.textContent = blockTitleCell.textContent.trim();
    moveInstrumentation(blockTitleCell, blockTitleAnchor);
    moveInstrumentation(blockTitleLinkCell, blockTitleAnchor);
    span.append(blockTitleAnchor);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner'); // Add data-once attribute from original HTML
    span.append(small);
    headDiv.append(span);

    // Filter for menu items belonging to this block
    const menuItemsForBlock = footerMenuItems.filter((itemRow) => {
      // Find the corresponding footer-menu-block row for this footer-menu-item
      // This logic is fragile. A better approach would be to have a direct reference
      // or a more robust way to associate items with their parent blocks.
      // For now, we'll assume the itemRows are in order and look at previous siblings.
      // This is a common pattern in EDS when containers are flattened.
      let prevSibling = itemRow.previousElementSibling;
      while (prevSibling && !prevSibling.classList.contains('link-blocks')) {
        // Find the actual block title from the previous footer-menu-block
        const prevBlockTitleCell = [...prevSibling.children][0];
        if (prevBlockTitleCell && prevBlockTitleCell.textContent.trim() === blockTitleCell.textContent.trim()) {
          return true;
        }
        prevSibling = prevSibling.previousElementSibling;
      }
      return false;
    });

    if (menuItemsForBlock.length > 0) {
      const ul = document.createElement('ul');
      ul.classList.add('footer-inner-list');
      menuItemsForBlock.forEach((menuItemRow) => {
        const [labelCell, linkCell, hierarchyCell] = [...menuItemRow.children];
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

        // Handle hierarchy-tree richtext field
        const hierarchyContent = hierarchyCell?.innerHTML.trim();
        if (hierarchyContent) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = hierarchyContent;
          const hierarchyRoot = tempDiv.querySelector('ul');

          if (hierarchyRoot) {
            // Apply classes to nested elements from ORIGINAL HTML
            hierarchyRoot.querySelectorAll('ul').forEach(nestedUl => nestedUl.classList.add('footer-inner-list'));
            hierarchyRoot.querySelectorAll('li').forEach(nestedLi => nestedLi.classList.add('nav-menu-item', 'list-item'));
            hierarchyRoot.querySelectorAll('a').forEach(nestedA => nestedA.classList.add('nav-menu-link')); // Assuming this class

            const wrapper = document.createElement('div');
            wrapper.classList.add('has-footer-sub-child');
            moveInstrumentation(hierarchyCell, wrapper); // Move instrumentation from the original cell to the new wrapper
            wrapper.appendChild(hierarchyRoot);

            // Add the SVG icon for expand/collapse
            const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svgIcon.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
            svgIcon.setAttribute('fill', '#000000');
            svgIcon.setAttribute('stroke', '#000000');
            svgIcon.setAttribute('stroke-width', '4.851456000000001');
            svgIcon.innerHTML = `
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
                  <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
                </g>
              </g>
            `;
            const spanWithIcon = document.createElement('span');
            spanWithIcon.setAttribute('data-once', 'footerClickEvent'); // Add data-once attribute
            spanWithIcon.append(svgIcon);
            rootEl.after(spanWithIcon); // Append icon after the rootEl (a or span)

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
        ul.append(li);
      });
      headDiv.append(ul);
    }
    linkBlocks.append(headDiv);
    footerMenuDiv.append(linkBlocks);
  });

  footerMenuCol.append(footerMenuDiv);
  footerMenuBox.append(footerMenuCol);
  container.append(footerMenuBox);

  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavItems.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const originalLink = linkCell.querySelector('a');
    if (originalLink) {
      anchor.href = originalLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryNavUl.append(li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = copyrightTextRow.textContent.trim();
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);
}
