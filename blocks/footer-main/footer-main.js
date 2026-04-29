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
      subWrap.classList.add('has-footer-inner-sub-child'); // Class from ORIGINAL HTML
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
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields based on BlockJson model
  // logo, logoLink, socialLinks (container), footerMenuBlocks (container), secondaryNav (container), copyrightText
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[children.length - 1]; // Last row is copyrightText

  // Determine the starting index for item rows
  // The first 2 rows are logo and logoLink. The last row is copyrightText.
  // All rows in between are item rows for socialLinks, footerMenuBlocks, secondaryNav.
  const itemRows = children.slice(2, children.length - 1);

  // Filter item rows based on their structure and content
  const socialLinkRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells[1].querySelector('ul'); // Social link has 2 cells, second is richtext hierarchy
  });

  const footerMenuBlockRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[2].textContent.trim() === 'Footer Menu Items value'; // Footer menu block has 3 cells, third is a container placeholder
  });

  const footerMenuItemRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[2].querySelector('ul'); // Footer menu item has 3 cells, third is richtext hierarchy
  });

  const secondaryNavItemRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && !cells[1].querySelector('ul'); // Secondary nav item has 2 cells, second is aem-content link
  });

  const container = document.createElement('div');
  container.classList.add('container'); // Class from ORIGINAL HTML

  // Footer Header
  const footerHeaderRow = document.createElement('div');
  footerHeaderRow.classList.add('row', 'footer-header'); // Classes from ORIGINAL HTML

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex'); // Classes from ORIGINAL HTML

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo'); // Class from ORIGINAL HTML

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoDiv);
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeaderRow.append(logoCol);

  const socialWrapCol = document.createElement('div');
  socialWrapCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center'); // Classes from ORIGINAL HTML

  const socialWrapUl = document.createElement('ul');
  socialWrapUl.classList.add('social-wrap'); // Class from ORIGINAL HTML

  socialLinkRows.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    const socialLink = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      socialLink.href = foundLink.href;
      socialLink.target = '_blank';
    }
    moveInstrumentation(linkCell, socialLink);

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      // Assuming the first li in the hierarchy root has the social icon class
      const firstLi = hierarchyRoot.querySelector('li');
      if (firstLi) {
        // Use innerHTML to preserve the SVG from the original HTML, not hardcode it
        // The original HTML has the class on the li, and the SVG is inside the <a>
        // The model has 'hierarchy-tree' richtext, so we should read its content
        // and extract the class from the first <li>'s text content.
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        const socialIconLi = tempDiv.querySelector('li');
        if (socialIconLi) {
          const iconClass = socialIconLi.textContent.trim().toLowerCase().split(' ')[0];
          li.classList.add(iconClass); // Add class from original HTML
          const iconSvg = socialIconLi.querySelector('svg');
          if (iconSvg) {
            socialLink.append(iconSvg); // Append the actual SVG from the richtext
          }
        }
      }
    }
    li.append(socialLink);
    moveInstrumentation(row, li);
    socialWrapUl.append(li);
  });

  socialWrapCol.append(socialWrapUl);
  footerHeaderRow.append(socialWrapCol);
  container.append(footerHeaderRow);

  // Footer Menu Box
  const footerMenuBoxRow = document.createElement('div');
  footerMenuBoxRow.classList.add('row', 'footer-menu-box'); // Classes from ORIGINAL HTML

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col'); // Class from ORIGINAL HTML

  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu'); // Class from ORIGINAL HTML

  footerMenuBlockRows.forEach((blockRow) => {
    const [blockTitleCell, blockTitleLinkCell, menuItemsContainerCell] = [...blockRow.children]; // Destructuring for fixed schema
    const linkBlocksDiv = document.createElement('div');
    linkBlocksDiv.classList.add('link-blocks'); // Class from ORIGINAL HTML

    const headDiv = document.createElement('div');
    headDiv.classList.add('head'); // Class from ORIGINAL HTML
    if (blockTitleCell.textContent.trim().toLowerCase() === 'what we do') {
      headDiv.classList.add('what-we-do-footer-links'); // Class from ORIGINAL HTML
    } else if (blockTitleCell.textContent.trim().toLowerCase() === 'careers') {
      headDiv.classList.add('careers-footer-links'); // Class from ORIGINAL HTML
    }

    const span = document.createElement('span');
    const blockTitleLink = document.createElement('a');
    const foundBlockTitleLink = blockTitleLinkCell.querySelector('a');
    if (foundBlockTitleLink) {
      blockTitleLink.href = foundBlockTitleLink.href;
    }
    blockTitleLink.textContent = blockTitleCell.textContent.trim();
    moveInstrumentation(blockTitleLinkCell, blockTitleLink);
    span.append(blockTitleLink);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner'); // Data attribute from ORIGINAL HTML
    span.append(small);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list'); // Class from ORIGINAL HTML

    // Filter menu items for this specific block
    // This logic is complex and prone to errors if block structure changes.
    // A better approach would be to have a direct relationship in the model,
    // but given the current flat structure, we need to infer.
    // The current logic tries to find items immediately after the blockRow,
    // which might not be robust if other row types are interleaved.
    // For now, we'll keep the existing filtering but simplify it slightly.
    const menuItemsForBlock = [];
    let currentIndex = itemRows.indexOf(blockRow) + 1;
    while (currentIndex < itemRows.length) {
      const currentRow = itemRows[currentIndex];
      // If we encounter another footerMenuBlockRow, or secondaryNavItemRow,
      // or socialLinkRow, then this block's items have ended.
      if (footerMenuBlockRows.includes(currentRow) || secondaryNavItemRows.includes(currentRow) || socialLinkRows.includes(currentRow)) {
        break;
      }
      if (footerMenuItemRows.includes(currentRow)) {
        menuItemsForBlock.push(currentRow);
      }
      currentIndex += 1;
    }

    menuItemsForBlock.forEach((menuItemRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...menuItemRow.children]; // Destructuring for fixed schema
      const li = document.createElement('li');
      const foundLink = linkCell.querySelector('a');
      let rootEl;

      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell.textContent.trim();
      moveInstrumentation(menuItemRow, rootEl);
      li.appendChild(rootEl);

      const hierarchyRoot = hierarchyCell.querySelector('ul');
      if (hierarchyRoot) {
        const triggerSpan = document.createElement('span');
        triggerSpan.setAttribute('data-once', 'footerClickEvent'); // Data attribute from ORIGINAL HTML
        // Use the SVG from the ORIGINAL HTML, not hardcoded.
        // The SVG is inside the <span> in the original HTML.
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        const originalTriggerSvg = tempDiv.querySelector('span[data-once="footerClickEvent"] svg');
        if (originalTriggerSvg) {
          triggerSpan.append(originalTriggerSvg);
        } else {
          // Fallback if SVG isn't found in hierarchyCell (e.g., if it's a top-level item without sub-items)
          triggerSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
        }
        li.appendChild(triggerSpan);

        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child'); // Class from ORIGINAL HTML
        wrapper.setAttribute('data-once', 'hideFooterSubChild'); // Data attribute from ORIGINAL HTML
        // Move instrumentation for the hierarchyCell content
        moveInstrumentation(hierarchyCell, wrapper);
        wrapper.appendChild(hierarchyRoot); // Append the actual <ul> from the richtext
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot); // Apply transformations to nested lists

        // Add event listeners for interactivity
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          wrapper.classList.toggle('active');
        });
        triggerSpan.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          wrapper.classList.toggle('active');
        });
      }
      footerInnerList.append(li);
    });

    headDiv.append(footerInnerList);
    linkBlocksDiv.append(headDiv);
    moveInstrumentation(blockRow, linkBlocksDiv);
    footerMenuDiv.append(linkBlocksDiv);
  });

  footerMenuCol.append(footerMenuDiv);
  footerMenuBoxRow.append(footerMenuCol);
  container.append(footerMenuBoxRow);

  // Copyright Wrap
  const copyrightWrapRow = document.createElement('div');
  copyrightWrapRow.classList.add('row', 'align-items-lg-end', 'copyright-wrap'); // Classes from ORIGINAL HTML

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6'); // Classes from ORIGINAL HTML

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav'); // Class from ORIGINAL HTML

  secondaryNavItemRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    const link = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, link);
    li.append(link);
    secondaryNavUl.append(li);
  });

  secondaryNavCol.append(secondaryNavUl);
  copyrightWrapRow.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text'); // Classes from ORIGINAL HTML
  copyrightTextCol.innerHTML = copyrightTextRow.innerHTML; // Use innerHTML for richtext
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightWrapRow.append(copyrightTextCol);

  container.append(copyrightWrapRow);

  block.replaceChildren(container);
}
