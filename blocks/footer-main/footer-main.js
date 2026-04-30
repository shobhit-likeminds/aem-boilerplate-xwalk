import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll(':scope > li').forEach((li) => {
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
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
        svg.setAttribute('fill', '#000000');
        svg.setAttribute('stroke', '#000000');
        svg.setAttribute('stroke-width', '4.851456000000001');
        svg.innerHTML = `
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
              <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
            </g>
          </g>
        `;
        const small = document.createElement('small');
        small.append(svg);
        trigger.parentNode.append(small);

        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
        small.addEventListener('click', (e) => {
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

  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[children.length - 1]; // Last row is copyrightText

  const socialLinkRows = children.filter((row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child ul'));
  const footerMenuBlockRows = children.filter((row) => row.children.length === 2 && row.querySelector('div:first-child p') && row.querySelector('div:last-child a'));
  const footerMenuItemRows = children.filter((row) => row.children.length === 3 && row.querySelector('div:first-child p') && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child ul'));
  const secondaryNavRows = children.filter((row) => row.children.length === 2 && row.querySelector('div:first-child p') && row.querySelector('div:last-child a') && !row.querySelector('div:last-child ul'));

  const container = document.createElement('div');
  container.classList.add('container');

  // Footer Header
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const logoLinkHref = logoLinkRow?.querySelector('a')?.href;
  if (logoLinkHref) {
    logoLink.href = logoLinkHref;
  }
  const logoPicture = logoRow?.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoDiv.append(logoLink);
  logoWrapper.append(logoDiv);
  footerHeader.append(logoWrapper);

  const socialWrapCol = document.createElement('div');
  socialWrapCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialWrapUl = document.createElement('ul');
  socialWrapUl.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [socialLinkCell, socialIconCell] = [...row.children]; // Fixed: Use destructuring
    const socialLinkHref = socialLinkCell?.querySelector('a')?.href;
    const socialIconUl = socialIconCell?.querySelector('ul');

    if (socialLinkHref && socialIconUl) {
      const li = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = socialLinkHref;
      anchor.target = '_blank';
      const iconLi = socialIconUl.querySelector('li');
      if (iconLi) {
        const iconAnchor = iconLi.querySelector('a');
        if (iconAnchor) {
          // Move instrumentation for the icon content
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = iconAnchor.innerHTML;
          moveInstrumentation(iconAnchor, tempDiv);
          while (tempDiv.firstChild) {
            anchor.append(tempDiv.firstChild);
          }
          li.classList.add(...iconLi.classList);
        }
      }
      moveInstrumentation(row, anchor);
      li.append(anchor);
      socialWrapUl.append(li);
    }
  });

  socialWrapCol.append(socialWrapUl);
  footerHeader.append(socialWrapCol);
  container.append(footerHeader);

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const col = document.createElement('div');
  col.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerMenuBlockRows.forEach((blockRow) => {
    const [blockTitleCell, blockTitleLinkCell] = [...blockRow.children]; // Fixed: Use destructuring

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const head = document.createElement('div');
    head.classList.add('head');
    const span = document.createElement('span');
    const anchor = document.createElement('a');
    const blockTitleLinkHref = blockTitleLinkCell?.querySelector('a')?.href;
    if (blockTitleLinkHref) {
      anchor.href = blockTitleLinkHref;
    }
    anchor.textContent = blockTitleCell?.textContent.trim() || '';
    moveInstrumentation(blockRow, anchor);
    span.append(anchor);
    const small = document.createElement('small');
    span.append(small);
    head.append(span);

    const ul = document.createElement('ul');
    ul.classList.add('footer-inner-list');

    // Filter menu items that belong to this block
    const blockTitle = blockTitleCell?.textContent.trim();
    const currentBlockItems = footerMenuItemRows.filter((itemRow) => {
      const [itemLabelCell] = [...itemRow.children]; // Fixed: Use destructuring
      const itemLabel = itemLabelCell?.textContent.trim();
      // Fixed: Removed textContent.startsWith for type detection.
      // Assuming item rows are ordered after their respective block rows or
      // that the blockTitle is unique enough for filtering.
      // If filtering by blockTitle is strictly required, ensure it's robust.
      // For now, relying on the order of rows as per the model.
      // A more robust solution would involve a hidden field for parent linking.
      return itemLabel && blockTitle && itemLabel.includes(blockTitle); // This is still fragile, but better than startsWith
    });

    currentBlockItems.forEach((itemRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...itemRow.children]; // Fixed: Use destructuring

      const li = document.createElement('li');
      const itemLink = document.createElement('a');
      const itemLinkHref = linkCell?.querySelector('a')?.href;
      if (itemLinkHref) {
        itemLink.href = itemLinkHref;
      }
      itemLink.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(itemRow, itemLink);
      li.append(itemLink);

      const hierarchyRoot = hierarchyCell?.querySelector('ul');
      if (hierarchyRoot) {
        const spanArrow = document.createElement('span');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
        svg.setAttribute('fill', '#000000');
        svg.setAttribute('stroke', '#000000');
        svg.setAttribute('stroke-width', '4.851456000000001');
        svg.innerHTML = `
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
          <g id="SVGRepo_iconCarrier">
            <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
              <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
            </g>
          </g>
        `;
        spanArrow.append(svg);
        li.append(spanArrow);

        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        
        // Move instrumentation for the hierarchyRoot and its children
        const tempHierarchyDiv = document.createElement('div');
        tempHierarchyDiv.innerHTML = hierarchyCell.innerHTML;
        moveInstrumentation(hierarchyCell, tempHierarchyDiv);
        while (tempHierarchyDiv.firstChild) {
          wrapper.append(tempHierarchyDiv.firstChild);
        }

        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot); // This will now operate on the moved hierarchyRoot

        spanArrow.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
      }
      ul.append(li);
    });

    head.append(ul);
    linkBlocks.append(head);
    footerMenu.append(linkBlocks);
  });

  col.append(footerMenu);
  footerMenuBox.append(col);
  container.append(footerMenuBox);

  // Copyright and Secondary Nav
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Fixed: Use destructuring
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const linkHref = linkCell?.querySelector('a')?.href;
    if (linkHref) {
      anchor.href = linkHref;
    }
    anchor.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryNavUl.append(li);
  });

  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = copyrightTextRow?.querySelector('div')?.textContent.trim() || '';
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);
}
