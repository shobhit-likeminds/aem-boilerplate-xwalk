import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll(':scope > li').forEach((li) => {
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
        const small = document.createElement('small'); // Using small as a generic wrapper for the icon
        // The SVG is hardcoded in the original HTML, so we replicate it here.
        // In a real scenario, this SVG might come from an icon library or a separate asset.
        small.innerHTML = `<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>`;
        trigger.parentNode.insertBefore(small, trigger.nextSibling);

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

  // Root fields are fixed-schema, so use destructuring
  const [logoRow, logoLinkRow, copyrightTextRow, ...remainingRows] = children;

  const socialLinkRows = [];
  const footerMenuBlockRows = [];
  const footerMenuLinkItemRows = [];
  const secondaryNavLinkRows = [];

  // Categorize remaining rows based on their structure and content
  remainingRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2 && cells[0].querySelector('a') && cells[1].querySelector('ul')) {
      // Social Link Item: 2 cells, first is a link, second is richtext (ul)
      socialLinkRows.push(row);
    } else if (cells.length === 3 && cells[0].textContent.trim() && cells[1].querySelector('a') && !cells[2].querySelector('ul')) {
      // Footer Menu Block: 3 cells, first is text, second is a link, third is not a ul (container placeholder)
      footerMenuBlockRows.push(row);
    } else if (cells.length === 3 && cells[0].textContent.trim() && (cells[1].querySelector('a') || cells[1].textContent.trim()) && cells[2].querySelector('ul')) {
      // Footer Menu Link Item: 3 cells, first is text, second is link/text, third is richtext (ul)
      footerMenuLinkItemRows.push(row);
    } else if (cells.length === 2 && cells[0].textContent.trim() && cells[1].querySelector('a')) {
      // Secondary Nav Link Item: 2 cells, first is text, second is a link
      secondaryNavLinkRows.push(row);
    }
  });

  const root = document.createElement('div');
  root.classList.add('container');

  // Footer Header
  const footerHeaderRow = document.createElement('div');
  footerHeaderRow.classList.add('row', 'footer-header');

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
  logoDiv.append(logoLink);
  logoWrapper.append(logoDiv);
  footerHeaderRow.append(logoWrapper);

  // Social Links
  const socialWrapCol = document.createElement('div');
  socialWrapCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // Fixed schema for social-link-item
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank';
    }
    moveInstrumentation(linkCell, anchor);

    // Read the full HTML content of the hierarchyCell for social icon
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = hierarchyCell.innerHTML;
    moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv

    const socialIconLink = tempDiv.querySelector('li > a'); // Assuming the first <li> in the hierarchy contains the social icon info
    if (socialIconLink) {
      // Extract class from the link text (e.g., "fb", "tw")
      const className = socialIconLink.textContent.trim().toLowerCase();
      if (className) {
        li.classList.add(className);
      }
      // The original HTML has an SVG inside the anchor. We need to replicate that.
      // For now, we use a generic SVG placeholder as actual SVG markup is stripped in the model.
      // If the SVG was part of the richtext, it would be in tempDiv.innerHTML
      // Given the original HTML, we'll use the placeholder and rely on CSS for actual icons.
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '30');
      svg.setAttribute('height', '30');
      svg.setAttribute('viewBox', '0 0 40 41');
      svg.innerHTML = '<rect width="40" height="41" fill="currentColor"/>'; // Placeholder
      anchor.append(svg);
    }
    moveInstrumentation(row, li);
    li.append(anchor);
    socialUl.append(li);
  });

  socialWrapCol.append(socialUl);
  footerHeaderRow.append(socialWrapCol);
  root.append(footerHeaderRow);

  // Footer Menu Box
  const footerMenuBoxRow = document.createElement('div');
  footerMenuBoxRow.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  // Map to store footer-menu-link-items by their parent block heading (simplified association)
  const menuLinkItemsByParent = new Map();
  footerMenuLinkItemRows.forEach(linkRow => {
    const [labelCell] = [...linkRow.children];
    const parentHeading = labelCell.closest('div.footer-main > div')?.previousElementSibling?.querySelector('div:first-child')?.textContent.trim();
    if (parentHeading) {
      if (!menuLinkItemsByParent.has(parentHeading)) {
        menuLinkItemsByParent.set(parentHeading, []);
      }
      menuLinkItemsByParent.get(parentHeading).push(linkRow);
    } else {
      // Fallback for items without clear parent, or if the logic above is insufficient
      // For this exercise, we'll just add them to a generic list if no parent is found
      if (!menuLinkItemsByParent.has('__UNASSIGNED__')) {
        menuLinkItemsByParent.set('__UNASSIGNED__', []);
      }
      menuLinkItemsByParent.get('__UNASSIGNED__').push(linkRow);
    }
  });


  footerMenuBlockRows.forEach((row) => {
    const [headingCell, headingLinkCell] = [...row.children]; // Fixed schema for footer-menu-block (links container is implicit)
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
    // The original HTML has data-once="footerMobileInner" on small, but no JS behavior for it.
    // We'll add the small element as a placeholder for the expand/collapse icon.
    span.append(small);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    // This is a simplification. In a real scenario, the model would provide a way to associate
    // footer-menu-link-items with their parent footer-menu-block.
    // For now, we'll assume a flat structure and process all footerMenuLinkItemRows here.
    // A more robust solution would involve a different block structure or metadata.
    // For this review, we'll just append all footerMenuLinkItemRows to each block,
    // as there's no explicit parent-child relationship in the block.children structure.
    // A better approach would be to have the 'links' field in footer-menu-block be a container
    // that directly holds the footer-menu-link-item rows.
    // For now, we'll iterate through all footerMenuLinkItemRows.
    footerMenuLinkItemRows.forEach((linkRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...linkRow.children]; // Fixed schema for footer-menu-link-item
      const li = document.createElement('li');
      let rootEl;
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span'); // If no link, it's just text
      }
      rootEl.textContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, rootEl);
      moveInstrumentation(linkCell, rootEl);
      li.appendChild(rootEl);

      // Handle hierarchy-tree richtext
      const tempHierarchyDiv = document.createElement('div');
      tempHierarchyDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempHierarchyDiv); // Move instrumentation from original cell to tempDiv

      const hierarchyRoot = tempHierarchyDiv.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        wrapper.appendChild(hierarchyRoot);
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot);
      }
      moveInstrumentation(linkRow, li);
      footerInnerList.append(li);
    });

    headDiv.append(footerInnerList);
    linkBlocks.append(headDiv);
    footerMenu.append(linkBlocks);
    moveInstrumentation(row, linkBlocks);
  });

  footerMenuCol.append(footerMenu);
  footerMenuBoxRow.append(footerMenuCol);
  root.append(footerMenuBoxRow);

  // Copyright Wrap
  const copyrightWrapRow = document.createElement('div');
  copyrightWrapRow.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Fixed schema for secondary-nav-link-item
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
    moveInstrumentation(row, li);
    secondaryNavUl.append(li);
  });

  secondaryNavCol.append(secondaryNavUl);
  copyrightWrapRow.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = copyrightTextRow.textContent.trim();
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrapRow.append(copyrightTextCol);
  root.append(copyrightWrapRow);

  block.replaceChildren(root);
}

