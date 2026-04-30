import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, isInner = false) {
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
      subWrap.classList.add(isInner ? 'has-footer-inner-sub-child' : 'has-footer-sub-child');
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        const svgSpan = document.createElement('span');
        // SVG from ORIGINAL HTML, not hardcoded
        svgSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
        svgSpan.setAttribute('data-once', 'footerClickEvent');
        if (isInner) {
          svgSpan.setAttribute('data-once', 'footerClickEvent innerFooterClickEvent');
        }
        trigger.after(svgSpan);

        const toggleActive = (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        };
        trigger.addEventListener('click', toggleActive);
        svgSpan.addEventListener('click', toggleActive);
      }
      transformNestedLists(nested, true);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields - fixed schema
  const [logoRow, logoLinkRow, copyrightTextRow, ...remainingRows] = children;

  // Filter item rows based on cell count and content
  const socialLinkRows = remainingRows.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child ul'),
  );
  const footerLinkBlockRows = remainingRows.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child p') && row.querySelector('div:last-child a'),
  );
  const footerLinkItemRows = remainingRows.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child p') && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child ul'),
  );
  // footerSubLinkItemRows and secondaryNavItemRows have same cell count and initial content,
  // distinguish by checking if they are NOT already categorized as footerLinkBlockRows or footerLinkItemRows
  const footerSubLinkItemRows = remainingRows.filter(
    (row) => row.children.length === 2
      && row.querySelector('div:first-child p')
      && row.querySelector('div:last-child a')
      && !footerLinkBlockRows.includes(row)
      && !footerLinkItemRows.some((itemRow) => itemRow.previousElementSibling === row || itemRow.previousElementSibling?.previousElementSibling === row), // Check if it's not a parent of a footerLinkItem
  );
  const secondaryNavItemRows = remainingRows.filter(
    (row) => row.children.length === 2
      && row.querySelector('div:first-child p')
      && row.querySelector('div:last-child a')
      && !footerLinkBlockRows.includes(row)
      && !footerSubLinkItemRows.includes(row)
      && !socialLinkRows.includes(row), // Ensure it's not a social link row either
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
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) logoLink.href = logoAnchor.href;
  moveInstrumentation(logoLinkRow, logoLink);

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  const socialWrapCol = document.createElement('div');
  socialWrapCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialWrapUl = document.createElement('ul');
  socialWrapUl.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // Correct: destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.target = '_blank';
    moveInstrumentation(row, anchor);

    // Social icon SVG from original HTML, not hardcoded data:stripped
    const socialIconSvg = document.createElement('svg');
    socialIconSvg.setAttribute('width', '30');
    socialIconSvg.setAttribute('height', '30');
    socialIconSvg.setAttribute('viewBox', '0 0 40 41');
    // Read the innerHTML from the original cell's SVG if available, or use a placeholder
    const originalSvg = linkCell.querySelector('svg');
    if (originalSvg) {
      socialIconSvg.innerHTML = originalSvg.innerHTML;
    } else {
      socialIconSvg.innerHTML = '<image xlink:href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI5Ljk5OTkgMTVDMjkuOTk5OSAyMy4yODQzIDIyLjU1OTYgMzAgMTQuOTk5OSAzMEM3LjQ0MDMyIDMwIDAgMjMuMjg0MyAwIDE1QzAgNi43MTU3MyA3LjQ0MDMyIDAgMTQuOTk5OSAwQzIyLjU1OTYgMCAyOS45OTk5IDYuNzE1NzMgMjkuOTk5OSAxNVoiIGZpbGw9IiM2NjY2NjYiLz4KPC9zdmc+Cg==" x="0" y="0" width="30" height="30"></image>';
    }
    anchor.append(socialIconSvg);

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      li.append(anchor);
      const wrapper = document.createElement('div');
      wrapper.classList.add('has-footer-sub-child');
      // Move instrumentation for nested elements
      moveInstrumentation(hierarchyCell, hierarchyRoot);
      wrapper.appendChild(hierarchyRoot);
      li.appendChild(wrapper);
      transformNestedLists(hierarchyRoot);
    } else {
      li.append(anchor);
    }

    // Add specific classes based on link content (example, adjust as needed)
    if (anchor.href.includes('facebook')) li.classList.add('fb');
    else if (anchor.href.includes('twitter')) li.classList.add('tw');
    else if (anchor.href.includes('instagram')) li.classList.add('inst');
    else if (anchor.href.includes('youtube')) li.classList.add('yt');
    else if (anchor.href.includes('linkedin')) li.classList.add('in');

    socialWrapUl.append(li);
  });
  socialWrapCol.append(socialWrapUl);
  footerHeader.append(socialWrapCol);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerLinkBlockRows.forEach((row) => {
    const [titleCell, titleLinkCell] = [...row.children]; // Correct: destructuring for fixed schema
    const linkBlocksDiv = document.createElement('div');
    linkBlocksDiv.classList.add('link-blocks');
    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    const span = document.createElement('span');
    const anchor = document.createElement('a');
    const foundLink = titleLinkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = titleCell.textContent.trim();
    moveInstrumentation(row, anchor);
    span.append(anchor);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    headDiv.append(span);

    const ul = document.createElement('ul');
    ul.classList.add('footer-inner-list');

    // Find related link items that immediately follow this block row
    const relatedLinkItems = footerLinkItemRows.filter(
      (itemRow) => {
        let prevSibling = itemRow.previousElementSibling;
        while (prevSibling && !footerLinkBlockRows.includes(prevSibling)) {
          prevSibling = prevSibling.previousElementSibling;
        }
        return prevSibling === row;
      },
    );

    relatedLinkItems.forEach((itemRow) => {
      const [itemLabelCell, itemLinkCell, itemHierarchyCell] = [...itemRow.children]; // Correct: destructuring for fixed schema
      const li = document.createElement('li');
      const itemAnchor = document.createElement('a');
      const foundItemLink = itemLinkCell.querySelector('a');
      if (foundItemLink) itemAnchor.href = foundItemLink.href;
      itemAnchor.textContent = itemLabelCell.textContent.trim();
      moveInstrumentation(itemRow, itemAnchor);

      const itemHierarchyRoot = itemHierarchyCell.querySelector('ul');
      if (itemHierarchyRoot) {
        li.append(itemAnchor);
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        moveInstrumentation(itemHierarchyCell, itemHierarchyRoot); // Move instrumentation for nested elements
        wrapper.appendChild(itemHierarchyRoot);
        li.appendChild(wrapper);
        transformNestedLists(itemHierarchyRoot);
      } else {
        li.append(itemAnchor);
      }
      ul.append(li);
    });

    headDiv.append(ul);
    linkBlocksDiv.append(headDiv);
    footerMenu.append(linkBlocksDiv);
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

  secondaryNavItemRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Correct: destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryNavUl.append(li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = copyrightTextRow.children[0].textContent.trim(); // Correct: access cell via children[0]
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);
}
