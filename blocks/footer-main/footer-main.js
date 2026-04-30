import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll(':scope > li').forEach((li) => {
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
      subWrap.classList.add(
        level === 0 ? 'has-footer-sub-child' : 'has-footer-inner-sub-child',
      );
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        // Add SVG icon for expand/collapse
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
        const spanWrapper = document.createElement('span');
        // Add data-once attribute if it exists in original HTML for this SVG
        if (li.closest('.head.what-we-do-footer-links') || li.closest('.head.careers-footer-links')) {
          spanWrapper.setAttribute('data-once', 'footerClickEvent');
          if (level > 0) { // For inner sub-child
            spanWrapper.setAttribute('data-once', 'footerClickEvent innerFooterClickEvent');
          }
        }
        spanWrapper.appendChild(svgIcon);
        trigger.after(spanWrapper);

        const toggleActive = (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        };
        trigger.addEventListener('click', toggleActive);
        spanWrapper.addEventListener('click', toggleActive);
      }
      transformNestedLists(nested, level + 1);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[2];

  // Item rows (filtered by cell count and content)
  const socialLinks = children.filter((row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child ul'));
  const footerMenuBlocks = children.filter((row) => row.children.length === 2 && !row.querySelector('div:first-child a') && row.querySelector('div:last-child a'));
  const footerMenuItems = children.filter((row) => row.children.length === 3 && !row.querySelector('div:first-child a') && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child ul'));
  const secondaryNavItems = children.filter((row) => row.children.length === 2 && !row.querySelector('div:first-child a') && row.querySelector('div:last-child a'));

  const container = document.createElement('div');
  container.classList.add('container');

  // Footer Header
  const footerHeaderRow = document.createElement('div');
  footerHeaderRow.classList.add('row', 'footer-header');
  container.append(footerHeaderRow);

  const logoWrap = document.createElement('div');
  logoWrap.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  footerHeaderRow.append(logoWrap);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  moveInstrumentation(logoRow, logoDiv);
  logoWrap.append(logoDiv);

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoDiv.append(logoLink);

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1');
  }

  // Social Links
  const socialWrapCenter = document.createElement('div');
  socialWrapCenter.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  footerHeaderRow.append(socialWrapCenter);

  if (socialLinks.length > 0) {
    const socialUl = document.createElement('ul');
    socialUl.classList.add('social-wrap');
    socialWrapCenter.append(socialUl);

    socialLinks.forEach((row) => {
      const [socialLinkCell, socialHierarchyCell] = [...row.children]; // Destructuring for fixed schema

      const li = document.createElement('li');
      moveInstrumentation(row, li);
      socialUl.append(li);

      const socialAnchor = document.createElement('a');
      const foundSocialLink = socialLinkCell.querySelector('a');
      if (foundSocialLink) {
        socialAnchor.href = foundSocialLink.href;
        socialAnchor.target = '_blank';
      }
      li.append(socialAnchor);

      // Add a placeholder SVG for the social icon
      const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgIcon.setAttribute('width', '30');
      svgIcon.setAttribute('height', '30');
      svgIcon.setAttribute('viewBox', '0 0 40 41');
      // Use the actual SVG from original HTML, not a placeholder GIF
      svgIcon.innerHTML = '<image xlink:href="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" x="0" y="0" width="30" height="30"></image>'; // Placeholder, as actual SVG is stripped in example

      socialAnchor.append(svgIcon);

      // Add classes based on link content for styling
      if (socialAnchor.href.includes('facebook')) li.classList.add('fb');
      else if (socialAnchor.href.includes('twitter')) li.classList.add('tw');
      else if (socialAnchor.href.includes('instagram')) li.classList.add('inst');
      else if (socialAnchor.href.includes('youtube')) li.classList.add('yt');
      else if (socialAnchor.href.includes('linkedin')) li.classList.add('in');
    });
  }

  // Footer Menu Blocks
  const footerMenuBoxRow = document.createElement('div');
  footerMenuBoxRow.classList.add('row', 'footer-menu-box');
  container.append(footerMenuBoxRow);

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  footerMenuBoxRow.append(footerMenuCol);

  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu');
  footerMenuCol.append(footerMenuDiv);

  let currentMenuBlockElement = null;
  children.forEach((row) => {
    // Check if it's a footer-menu-block row
    if (footerMenuBlocks.includes(row)) {
      const [blockTitleCell, blockTitleLinkCell] = [...row.children]; // Destructuring for fixed schema

      currentMenuBlockElement = document.createElement('div');
      currentMenuBlockElement.classList.add('link-blocks');
      // Add specific classes if present in original HTML for this block type
      if (blockTitleCell.textContent.trim().toLowerCase().includes('what we do')) {
        currentMenuBlockElement.classList.add('what-we-do-footer-links');
      } else if (blockTitleCell.textContent.trim().toLowerCase().includes('careers')) {
        currentMenuBlockElement.classList.add('careers-footer-links');
      }

      moveInstrumentation(row, currentMenuBlockElement);
      footerMenuDiv.append(currentMenuBlockElement);

      const headDiv = document.createElement('div');
      headDiv.classList.add('head');
      currentMenuBlockElement.append(headDiv);

      const span = document.createElement('span');
      headDiv.append(span);

      const blockTitleLink = document.createElement('a');
      const foundBlockTitleLink = blockTitleLinkCell.querySelector('a');
      if (foundBlockTitleLink) {
        blockTitleLink.href = foundBlockTitleLink.href;
      }
      blockTitleLink.textContent = blockTitleCell.textContent.trim();
      span.append(blockTitleLink);

      const small = document.createElement('small');
      small.setAttribute('data-once', 'footerMobileInner'); // From original HTML
      span.append(small);

      const ul = document.createElement('ul');
      ul.classList.add('footer-inner-list');
      headDiv.append(ul);
      // Do not store DOM element in dataset, pass directly or re-query
      currentMenuBlockElement.currentUl = ul; // Store reference directly
    } else if (
      footerMenuItems.includes(row) &&
      currentMenuBlockElement &&
      currentMenuBlockElement.currentUl
    ) {
      // Check if it's a footer-menu-item row and belongs to the current menu block
      const [labelCell, linkCell, hierarchyCell] = [...row.children]; // Destructuring for fixed schema

      const li = document.createElement('li');
      moveInstrumentation(row, li);
      currentMenuBlockElement.currentUl.append(li);

      // Create a temporary div to parse the richtext HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      const hierarchyRoot = tempDiv.querySelector('ul');

      let rootEl;
      const foundLink = linkCell.querySelector('a');

      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell.textContent.trim();
      li.append(rootEl);

      if (hierarchyRoot) {
        const spanWrapper = document.createElement('span');
        spanWrapper.setAttribute('data-once', 'footerClickEvent'); // From original HTML
        // Add SVG icon for expand/collapse
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
        spanWrapper.append(svgIcon);
        rootEl.after(spanWrapper);

        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        wrapper.setAttribute('data-once', 'hideFooterSubChild'); // From original HTML

        // Move instrumentation for the hierarchyCell to the wrapper
        moveInstrumentation(hierarchyCell, wrapper);

        // Append children from tempDiv to wrapper
        while (hierarchyRoot.firstChild) {
          wrapper.append(hierarchyRoot.firstChild);
        }
        li.append(wrapper);

        const toggleActive = (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        };
        rootEl.addEventListener('click', toggleActive);
        spanWrapper.addEventListener('click', toggleActive);
        transformNestedLists(wrapper.querySelector('ul')); // Call transform on the actual UL inside the wrapper
      }
    }
  });

  // Copyright and Secondary Nav
  const copyrightWrapRow = document.createElement('div');
  copyrightWrapRow.classList.add('row', 'align-items-lg-end', 'copyright-wrap');
  container.append(copyrightWrapRow);

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  copyrightWrapRow.append(secondaryNavCol);

  if (secondaryNavItems.length > 0) {
    const secondaryNavUl = document.createElement('ul');
    secondaryNavUl.classList.add('secondary-nav');
    secondaryNavCol.append(secondaryNavUl);

    secondaryNavItems.forEach((row) => {
      const [labelCell, linkCell] = [...row.children]; // Destructuring for fixed schema

      const li = document.createElement('li');
      moveInstrumentation(row, li);
      secondaryNavUl.append(li);

      const anchor = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
      anchor.textContent = labelCell.textContent.trim();
      li.append(anchor);
    });
  }

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightTextCol.innerHTML = copyrightTextRow.innerHTML;
  copyrightWrapRow.append(copyrightTextCol);

  block.replaceChildren(container);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
