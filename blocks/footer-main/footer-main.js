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
      nested.remove();
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

      // Recursively transform inner nested lists
      transformNestedLists(nested);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[2];

  const itemRows = children.slice(3);

  // Filter item rows based on their structure and content, matching BlockJson models
  const socialLinkItems = itemRows.filter((row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim() && row.querySelector('div:nth-child(2) a') && row.querySelector('div:nth-child(3) ul'));
  const footerLinkBlocks = itemRows.filter((row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim() && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child')?.textContent.trim() === 'Links value');
  const footerLinkSubitems = itemRows.filter((row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim() && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child ul'));
  const secondaryNavItems = itemRows.filter((row) => row.children.length === 2 && row.querySelector('div:first-child')?.textContent.trim() && row.querySelector('div:nth-child(2) a'));

  const container = document.createElement('div');
  container.classList.add('container');

  // Footer Header
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
    moveInstrumentation(logoLinkRow, logoLink);
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');

  socialLinkItems.forEach((row) => {
    const [platformCell, linkCell, hierarchyCell] = [...row.children]; // FIXED: Destructuring for fixed schema
    const li = document.createElement('li');
    const socialAnchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      socialAnchor.href = foundLink.href;
      socialAnchor.target = '_blank';
      moveInstrumentation(row, socialAnchor);
    }

    // SVG icon from ORIGINAL HTML
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('viewBox', '0 0 40 41');
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    // The original HTML has data:stripped, which implies the actual SVG data is not in the HTML.
    // For EDS, we should either embed the full SVG or use a CSS background-image.
    // For now, keeping data:stripped as a placeholder, but this would need to be replaced
    // with actual SVG content or a proper image path if available.
    image.setAttribute('xlink:href', 'data:stripped');
    image.setAttribute('x', '0');
    image.setAttribute('y', '0');
    image.setAttribute('width', '30');
    image.setAttribute('height', '30');
    svg.append(image);
    socialAnchor.append(svg);

    const platformName = platformCell?.textContent.trim().toLowerCase();
    if (platformName) {
      li.classList.add(platformName.replace(/\s/g, ''));
    }
    li.append(socialAnchor);
    socialWrap.append(li);
  });

  socialCol.append(socialWrap);
  footerHeader.append(socialCol);
  container.append(footerHeader);

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  const footerLinkBlockMap = new Map();
  footerLinkBlocks.forEach((row) => {
    const [blockLabelCell, blockLinkCell, linksCell] = [...row.children]; // FIXED: Destructuring for fixed schema

    const blockLabel = blockLabelCell?.textContent.trim();
    const blockLinkHref = blockLinkCell?.querySelector('a')?.href;

    const linkBlocksDiv = document.createElement('div');
    linkBlocksDiv.classList.add('link-blocks');
    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    const span = document.createElement('span');
    const anchor = document.createElement('a');
    if (blockLinkHref) {
      anchor.href = blockLinkHref;
    }
    anchor.textContent = blockLabel;
    moveInstrumentation(row, anchor);
    span.append(anchor);
    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    headDiv.append(span);
    linkBlocksDiv.append(headDiv);

    const ul = document.createElement('ul');
    ul.classList.add('footer-inner-list');
    headDiv.append(ul);
    footerLinkBlockMap.set(blockLabel, ul);
    footerMenu.append(linkBlocksDiv);
  });

  footerLinkSubitems.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children]; // FIXED: Destructuring for fixed schema

    const label = labelCell?.textContent.trim();
    const linkHref = linkCell?.querySelector('a')?.href;

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    if (linkHref) {
      anchor.href = linkHref;
    }
    anchor.textContent = label;
    moveInstrumentation(row, anchor);
    li.append(anchor);

    const hierarchyRootTempDiv = document.createElement('div');
    moveInstrumentation(hierarchyCell, hierarchyRootTempDiv); // Move instrumentation for the richtext cell
    hierarchyRootTempDiv.innerHTML = hierarchyCell?.innerHTML; // FIXED: Use innerHTML for richtext

    const hierarchyRootUl = hierarchyRootTempDiv.querySelector('ul');
    if (hierarchyRootUl) {
      const span = document.createElement('span');
      span.setAttribute('data-once', 'footerClickEvent');
      // FIXED: Inline SVG from original HTML
      span.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
      li.append(span);

      const subWrap = document.createElement('div');
      subWrap.classList.add('has-footer-sub-child');
      subWrap.setAttribute('data-once', 'hideFooterSubChild');
      subWrap.append(hierarchyRootUl); // Append the actual UL, not the temp div
      li.append(subWrap);
      transformNestedLists(hierarchyRootUl); // Transform the nested UL

      span.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        subWrap.classList.toggle('active');
      });
    }

    // Find the correct parent ul for this subitem
    // This logic needs to be robust. Assuming `footerLinkSubitems` are children of `footerLinkBlocks`.
    // The current map only stores the first block's UL. This needs to be improved if subitems
    // can belong to specific blocks. For now, appending to the first available UL.
    let parentUl = null;
    if (footerLinkBlockMap.size > 0) {
      parentUl = footerLinkBlockMap.values().next().value;
    }
    if (parentUl) {
      parentUl.append(li);
    }
  });

  footerMenuCol.append(footerMenu);
  footerMenuBox.append(footerMenuCol);
  container.append(footerMenuBox);

  // Copyright Wrap
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavItems.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // FIXED: Destructuring for fixed schema

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell?.textContent.trim();
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryNavUl.append(li);
  });

  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightTextCol.innerHTML = copyrightTextRow.innerHTML; // FIXED: Use innerHTML for richtext
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);
}
