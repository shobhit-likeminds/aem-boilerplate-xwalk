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
      subWrap.classList.add(level === 0 ? 'has-footer-sub-child' : 'has-footer-inner-sub-child');
      subWrap.append(nested);
      li.append(subWrap);

      if (triggerEl) {
        // SVG icon from ORIGINAL HTML
        const arrowSvg = `
          <svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
                <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
              </g>
            </g>
          </svg>
        `;
        const small = document.createElement('span'); // Changed from <small> to <span> to match ORIGINAL HTML's <span> for arrow
        small.innerHTML = arrowSvg;
        if (level === 1) {
          small.classList.add('innerFooterClickEvent'); // This class is from ORIGINAL HTML's data-once attribute, but applied as a class for JS interaction
        }
        triggerEl.parentNode.insertBefore(small, triggerEl.nextSibling);

        triggerEl.addEventListener('click', (e) => {
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

  // Root fields - using named destructuring as per BlockJson model
  const [logoImageRow, logoLinkRow, copyrightTextRow, ...itemRows] = children;

  const socialLinkRows = itemRows.filter((row) => row.children.length === 3 && row.querySelector('div:nth-child(2) a'));
  const linkBlockRows = itemRows.filter((row) => row.children.length === 3 && !row.querySelector('div:nth-child(3) ul'));
  const linkItemRows = itemRows.filter((row) => row.children.length === 4 && row.querySelector('div:nth-child(2) a'));
  const secondaryNavItemRows = itemRows.filter((row) => row.children.length === 2 && row.querySelector('div:nth-child(2) a'));

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
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const picture = logoImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoImageRow, logoLink);

  logoDiv.append(logoLink);
  logoWrapper.append(logoDiv);
  footerHeader.append(logoWrapper);

  // Social Links
  const socialWrapCenter = document.createElement('div');
  socialWrapCenter.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialWrapUl = document.createElement('ul');
  socialWrapUl.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    // Fixed schema: platform, link, hierarchy-tree
    const [platformCell, linkCell, hierarchyCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add(platformCell.textContent.trim().toLowerCase().replace(/\s/g, ''));

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank';
    }
    moveInstrumentation(linkCell, anchor);

    // Placeholder for SVG icon, as per Rule 16 & 25.4
    // The original HTML uses <image xlink:href="data:image/png;base64,..."> inside <svg>
    // For EDS, we should replace this with a proper SVG or a placeholder.
    // For now, using a span with text content.
    const svgIcon = document.createElement('span');
    svgIcon.textContent = platformCell.textContent.trim(); // Use platform name as placeholder text
    anchor.append(svgIcon);

    li.append(anchor);
    socialWrapUl.append(li);
    moveInstrumentation(row, li);
  });

  socialWrapCenter.append(socialWrapUl);
  footerHeader.append(socialWrapCenter);
  container.append(footerHeader);

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');

  const colDiv = document.createElement('div');
  colDiv.classList.add('col');

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  linkBlockRows.forEach((row) => {
    // Fixed schema: blockTitle, blockTitleLink, links (container)
    const [blockTitleCell, blockTitleLinkCell] = [...row.children];

    const linkBlocksDiv = document.createElement('div');
    linkBlocksDiv.classList.add('link-blocks');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const blockTitleAnchor = document.createElement('a');
    const foundBlockTitleLink = blockTitleLinkCell.querySelector('a');
    if (foundBlockTitleLink) {
      blockTitleAnchor.href = foundBlockTitleLink.href;
    }
    blockTitleAnchor.textContent = blockTitleCell.textContent.trim();
    moveInstrumentation(blockTitleLinkCell, blockTitleAnchor);
    span.append(blockTitleAnchor);

    const small = document.createElement('small');
    small.dataset.once = 'footerMobileInner'; // Add data-once attribute from ORIGINAL HTML
    span.append(small);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    // Filter linkItemRows based on hierarchy-tree content
    const relatedLinkItems = linkItemRows.filter((itemRow) => {
      // Fixed schema: label, link, hierarchy-tree, subLinks (container)
      const [,, itemLinkHierarchyCell] = [...itemRow.children];
      return itemLinkHierarchyCell && itemLinkHierarchyCell.innerHTML.includes(blockTitleCell.textContent.trim());
    });

    relatedLinkItems.forEach((linkItemRow) => {
      // Fixed schema: label, link, hierarchy-tree, subLinks (container)
      const [labelCell, linkCell, hierarchyCell] = [...linkItemRow.children];

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
      moveInstrumentation(linkItemRow, rootEl);
      li.appendChild(rootEl);

      const hierarchyRootTempDiv = document.createElement('div');
      moveInstrumentation(hierarchyCell, hierarchyRootTempDiv); // Move instrumentation from original cell
      hierarchyRootTempDiv.innerHTML = hierarchyCell.innerHTML; // Read richtext content

      const hierarchyRootUl = hierarchyRootTempDiv.querySelector('ul');
      if (hierarchyRootUl) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        wrapper.dataset.once = 'hideFooterSubChild'; // Add data-once attribute from ORIGINAL HTML

        // Move children from tempDiv to wrapper
        while (hierarchyRootTempDiv.firstChild) {
          wrapper.append(hierarchyRootTempDiv.firstChild);
        }

        // SVG icon from ORIGINAL HTML
        const arrowSvg = `
          <svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
            <g id="SVGRepo_iconCarrier">
              <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
                <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
              </g>
            </g>
          </svg>
        `;
        const smallArrow = document.createElement('span'); // Changed from <small> to <span> to match ORIGINAL HTML's <span> for arrow
        smallArrow.innerHTML = arrowSvg;
        smallArrow.dataset.once = 'footerClickEvent'; // Add data-once attribute from ORIGINAL HTML
        rootEl.parentNode.insertBefore(smallArrow, rootEl.nextSibling);

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        smallArrow.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRootUl);
      }
      footerInnerList.append(li);
    });

    linkBlocksDiv.append(headDiv);
    linkBlocksDiv.append(footerInnerList);
    footerMenu.append(linkBlocksDiv);
    moveInstrumentation(row, linkBlocksDiv);
  });

  colDiv.append(footerMenu);
  footerMenuBox.append(colDiv);
  container.append(footerMenuBox);

  // Copyright Wrap
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavItemRows.forEach((row) => {
    // Fixed schema: label, link
    const [labelCell, linkCell] = [...row.children];

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
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
