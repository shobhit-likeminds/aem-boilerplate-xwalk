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
      subWrap.classList.add('has-footer-inner-sub-child'); // Use original HTML class
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
        const span = document.createElement('span');
        span.append(svg);
        trigger.append(span);

        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root rows are fixed schema, use destructuring
  const [logoRow, logoLinkRow, copyrightRow, ...itemRows] = children;

  // Content detection for different item row types
  const socialLinkItems = itemRows.filter((row) => row.children.length === 3 && row.children[0].textContent.trim().toLowerCase().includes('social channel'));
  const footerMenuBlocks = itemRows.filter((row) => row.children.length === 3 && row.children[0].textContent.trim().toLowerCase().includes('block title'));
  const footerMenuLinks = itemRows.filter((row) => row.children.length === 3 && row.children[0].textContent.trim().toLowerCase().includes('menu link label'));
  const secondaryNavLinks = itemRows.filter((row) => row.children.length === 2 && row.children[0].textContent.trim().toLowerCase().includes('secondary nav label'));
  const footerSubLinks = itemRows.filter((row) => row.children.length === 2 && row.children[0].textContent.trim().toLowerCase().includes('sub link label'));


  const container = document.createElement('div');
  container.classList.add('container');

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

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoDiv);
  logoDiv.append(logoLink);
  logoWrapper.append(logoDiv);
  footerHeader.append(logoWrapper);

  const socialWrapCenter = document.createElement('div');
  socialWrapCenter.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-wrap');

  socialLinkItems.forEach((row) => {
    // Fixed schema for social-link-item: [socialType, link, hierarchy-tree]
    const [socialTypeCell, socialLinkCell] = [...row.children];

    const li = document.createElement('li');
    const socialType = socialTypeCell?.textContent.trim().toLowerCase();
    if (socialType) {
      // Original HTML uses 'fb', 'tw', 'inst', 'yt', 'in'
      if (socialType.includes('facebook')) li.classList.add('fb');
      else if (socialType.includes('twitter')) li.classList.add('tw');
      else if (socialType.includes('instagram')) li.classList.add('inst');
      else if (socialType.includes('youtube')) li.classList.add('yt');
      else if (socialType.includes('linkedin')) li.classList.add('in');
      else li.classList.add(socialType.substring(0, 2)); // Fallback for other types
    }

    const anchor = document.createElement('a');
    const foundLink = socialLinkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank';
    }
    moveInstrumentation(row, anchor);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('viewBox', '0 0 40 41');
    // The original SVG content is stripped, so we keep the placeholder
    svg.innerHTML = `<image xlink:href="data:stripped" x="0" y="0" width="30" height="30"></image>`;
    anchor.append(svg);
    li.append(anchor);
    socialUl.append(li);
  });

  socialWrapCenter.append(socialUl);
  footerHeader.append(socialWrapCenter);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerMenuBlocks.forEach((row) => {
    // Fixed schema for footer-menu-block: [blockTitle, blockTitleLink, footerMenuLinks (container)]
    const [blockTitleCell, blockTitleLinkCell] = [...row.children];

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');

    const head = document.createElement('div');
    head.classList.add('head');

    const span = document.createElement('span');
    const titleLink = document.createElement('a');
    const foundTitleLink = blockTitleLinkCell?.querySelector('a');
    if (foundTitleLink) {
      titleLink.href = foundTitleLink.href;
    }
    titleLink.textContent = blockTitleCell?.textContent.trim();
    moveInstrumentation(row, titleLink);
    span.append(titleLink);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    head.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    // The original HTML implies a nested structure where footerMenuLinks belong to a specific footerMenuBlock.
    // The current flat structure of block.children makes this association difficult without a unique identifier.
    // For now, we will iterate through all footerMenuLinks and append them.
    // In a real scenario, the model would be truly nested or have a matching key.
    footerMenuLinks.forEach((linkRow) => {
      // Fixed schema for footer-menu-link: [label, link, hierarchy-tree]
      const [labelCell, linkCell, hierarchyCell] = [...linkRow.children];

      const li = document.createElement('li');
      let rootEl;
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(linkRow, rootEl);
      li.appendChild(rootEl);

      const hierarchyRootDiv = document.createElement('div');
      hierarchyRootDiv.innerHTML = hierarchyCell?.innerHTML || ''; // Use innerHTML for richtext
      const hierarchyRootUl = hierarchyRootDiv.querySelector('ul');

      if (hierarchyRootUl) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child'); // Use original HTML class
        moveInstrumentation(hierarchyCell, wrapper); // Move instrumentation from the richtext cell
        wrapper.appendChild(hierarchyRootUl);

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
        const spanArrow = document.createElement('span');
        spanArrow.setAttribute('data-once', 'footerClickEvent');
        spanArrow.append(svg);
        rootEl.append(spanArrow);

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRootUl); // Apply transformation to the nested list
      }
      footerInnerList.append(li);
    });

    head.append(footerInnerList);
    linkBlocks.append(head);
    footerMenu.append(linkBlocks);
  });

  footerMenuCol.append(footerMenu);
  footerMenuBox.append(footerMenuCol);
  container.append(footerMenuBox);

  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavLinks.forEach((row) => {
    // Fixed schema for secondary-nav-link: [label, link]
    const [labelCell, linkCell] = [...row.children];

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

  // Handle footerSubLinks if they are meant to be rendered here or within the hierarchy
  // Based on the model, footer-sub-link is a separate item type, but the original HTML
  // shows them nested within the richtext of footer-menu-link.
  // The current JS does not explicitly handle footerSubLinks as separate top-level items.
  // If they were meant to be top-level, they would be appended to secondaryNavUl or a similar list.
  // Given the richtext handling, they are implicitly handled by transformNestedLists.

  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = copyrightRow.children[0]?.textContent.trim(); // Fixed: Use destructuring for root rows, then access cell
  moveInstrumentation(copyrightRow, copyrightTextCol);
  copyrightWrap.append(copyrightTextCol);

  container.append(copyrightWrap);

  block.replaceChildren(container);
}
