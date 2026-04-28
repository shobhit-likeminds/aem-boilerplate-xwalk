import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const SVG_ARROW_ICON = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Add classes from ORIGINAL HTML
    li.classList.add('list-item');
    const anchor = li.querySelector(':scope > a');
    if (anchor) {
      anchor.classList.add('nav-menu-item');
    }

    const nested = li.querySelector(':scope > ul');

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
      subWrap.classList.add(level === 0 ? 'has-footer-sub-child' : 'has-footer-inner-sub-child');
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        const svgSpan = document.createElement('span');
        svgSpan.innerHTML = SVG_ARROW_ICON;
        trigger.append(svgSpan);

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

  // Root fields are fixed, use destructuring
  const [logoRow, logoLinkRow, copyrightTextRow, ...itemRows] = children;

  // Content detection for item rows based on BlockJson model and cell content
  // social-link-item: 3 cells, 3rd cell is richtext (ul)
  const socialLinkItems = itemRows.filter((row) => row.children.length === 3 && row.children[2].querySelector('ul'));
  // footer-link-block: 3 cells, 3rd cell is text (container placeholder)
  const footerLinkBlocks = itemRows.filter((row) => row.children.length === 3 && !row.children[2].querySelector('ul'));
  // footer-link-item: 4 cells, 3rd cell is richtext (ul)
  const footerLinkItems = itemRows.filter((row) => row.children.length === 4 && row.children[2].querySelector('ul'));
  // secondary-nav-item: 2 cells, text content for label is 'Secondary Nav Label label text'
  const secondaryNavItems = itemRows.filter((row) => row.children.length === 2 && row.children[0]?.textContent.trim() === 'Secondary Nav Label label text');
  // footer-link-sub-item: 2 cells, text content for label is 'Sub Link Label text'
  // NOTE: The generated JS had a filter for 'Sub Link Label text' but this item type is not used in the current structure.
  // Keeping the filter for completeness, but it will likely be empty.
  const footerLinkSubItems = itemRows.filter((row) => row.children.length === 2 && row.children[0]?.textContent.trim() === 'Sub Link Label label text');


  const container = document.createElement('div');
  container.classList.add('container');

  // Footer Header Section
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  const logoLinkCell = [...logoLinkRow.children][0]; // logoLinkRow has 1 cell
  const logoLinkFound = logoLinkCell.querySelector('a');
  if (logoLinkFound) {
    logoLink.href = logoLinkFound.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPictureCell = [...logoRow.children][0]; // logoRow has 1 cell
  const picture = logoPictureCell.querySelector('picture');
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
  footerHeader.append(logoWrapper);

  const socialWrapCenter = document.createElement('div');
  socialWrapCenter.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialWrapList = document.createElement('ul');
  socialWrapList.classList.add('social-wrap');

  socialLinkItems.forEach((row) => {
    // social-link-item: [platform, link, hierarchy-tree]
    const [platformCell, socialLinkCell] = [...row.children];
    const li = document.createElement('li');
    const platformName = platformCell.textContent.trim();
    li.classList.add(platformName.toLowerCase().replace(/\s/g, ''));

    const socialAnchor = document.createElement('a');
    const foundSocialLink = socialLinkCell.querySelector('a');
    if (foundSocialLink) {
      socialAnchor.href = foundSocialLink.href;
      socialAnchor.target = '_blank';
    }
    moveInstrumentation(socialLinkCell, socialAnchor);

    // Use a generic SVG icon for all social links, or dynamically load specific ones
    // For now, using a placeholder icon as the original HTML uses base64 images which are not ideal.
    socialAnchor.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 8L8 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 8L16 16" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    li.append(socialAnchor);
    socialWrapList.append(li);
    moveInstrumentation(row, li);
  });
  socialWrapCenter.append(socialWrapList);
  footerHeader.append(socialWrapCenter);
  container.append(footerHeader);

  // Footer Menu Box Section
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const col = document.createElement('div');
  col.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerLinkBlocks.forEach((row) => {
    // footer-link-block: [blockTitle, blockTitleLink, footerLinks (container)]
    const [blockTitleCell, blockTitleLinkCell] = [...row.children];
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const head = document.createElement('div');
    head.classList.add('head');
    const span = document.createElement('span');

    const titleLink = document.createElement('a');
    const foundTitleLink = blockTitleLinkCell.querySelector('a');
    if (foundTitleLink) {
      titleLink.href = foundTitleLink.href;
    }
    titleLink.textContent = blockTitleCell.textContent.trim();
    moveInstrumentation(blockTitleLinkCell, titleLink);
    moveInstrumentation(blockTitleCell, titleLink);
    span.append(titleLink);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    head.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    const relevantFooterLinkItems = footerLinkItems.filter((itemRow) => {
      // footer-link-item: [label, link, hierarchy-tree, footerSubLinks (container)]
      const [labelCell] = [...itemRow.children]; // Only need labelCell for filtering
      return labelCell.textContent.trim() === blockTitleCell.textContent.trim();
    });

    relevantFooterLinkItems.forEach((itemRow) => {
      // footer-link-item: [label, link, hierarchy-tree, footerSubLinks (container)]
      const [labelCell, linkCell, hierarchyCell] = [...itemRow.children];
      const li = document.createElement('li');
      const foundLink = linkCell.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span'); // Fallback for label-only
      }
      rootEl.textContent = labelCell.textContent.trim();
      moveInstrumentation(itemRow, rootEl); // Move instrumentation from the whole row to the root element
      li.appendChild(rootEl);

      const hierarchyRootContent = hierarchyCell.innerHTML;
      if (hierarchyRootContent.trim()) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyRootContent;
        const hierarchyRootUl = tempDiv.querySelector('ul');

        if (hierarchyRootUl) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('has-footer-sub-child');
          moveInstrumentation(hierarchyCell, wrapper); // Move instrumentation from hierarchyCell to wrapper
          wrapper.appendChild(hierarchyRootUl);
          rootEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            wrapper.classList.toggle('active');
            li.classList.toggle('active');
          });
          li.appendChild(wrapper);
          transformNestedLists(hierarchyRootUl);
        }
      }
      footerInnerList.append(li);
    });

    head.append(footerInnerList);
    linkBlocks.append(head);
    footerMenu.append(linkBlocks);
    moveInstrumentation(row, linkBlocks);
  });

  col.append(footerMenu);
  footerMenuBox.append(col);
  container.append(footerMenuBox);

  // Copyright Wrap Section
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavItems.forEach((row) => {
    // secondary-nav-item: [label, link]
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
  copyrightTextCol.textContent = copyrightTextRow.children[0].textContent.trim(); // copyrightTextRow has 1 cell
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
