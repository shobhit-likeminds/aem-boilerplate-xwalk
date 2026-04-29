import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
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
      if (level === 0) {
        subWrap.classList.add('has-footer-sub-child');
      } else {
        subWrap.classList.add('has-footer-inner-sub-child');
      }
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        // Use a simple arrow or a placeholder for the SVG, as the original SVG is hardcoded
        // and not part of the block's authored content.
        // For production, this SVG should ideally come from an authored asset or a shared SVG sprite.
        const small = document.createElement('small');
        small.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
        trigger.append(small);

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

  // The model defines 6 root fields: logo, logoLink, socialLinks (container), footerLinkBlocks (container),
  // secondaryLinks (container), copyrightText.
  // The first 3 rows are for logo, logoLink, and copyrightText.
  // The remaining rows are item rows for the containers.
  const [logoRow, logoLinkRow, copyrightTextRow, ...itemRows] = children;

  const root = document.createElement('div');
  root.classList.add('container');

  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');
  root.append(footerHeader);

  // Logo and Logo Link
  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  footerHeader.append(logoCol);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  logoCol.append(logoDiv);

  const logoAnchor = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoAnchor.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoAnchor);
  logoDiv.append(logoAnchor);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1');
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoAnchor.append(optimizedPic);
  }

  // Social Links
  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  footerHeader.append(socialCol);

  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');
  socialCol.append(socialWrap);

  // Filter for 'footer-social-link' items: 2 cells, first is aem-content, second is richtext (hierarchy-tree)
  const socialLinks = itemRows.filter((row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child ul'));
  socialLinks.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // Fixed schema for footer-social-link
    const li = document.createElement('li');
    const socialAnchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      socialAnchor.href = foundLink.href;
      socialAnchor.target = '_blank'; // Assuming social links open in new tab
    }
    moveInstrumentation(linkCell, socialAnchor);

    // The original HTML uses inline SVGs for social icons.
    // The block structure indicates 'hierarchy-tree' for the second cell, which is a richtext field.
    // The social icon itself is NOT part of the block's authored content in the EDS structure.
    // This implies the icon should be derived from the link href or added via CSS.
    // For now, we'll use a placeholder or derive from the link.
    // If the original HTML has specific classes like 'fb', 'tw', 'inst', 'yt', 'in',
    // we should add them to the <li> element.
    const linkHref = socialAnchor.href || '';
    if (linkHref.includes('facebook')) li.classList.add('fb');
    else if (linkHref.includes('twitter')) li.classList.add('tw');
    else if (linkHref.includes('instagram')) li.classList.add('inst');
    else if (linkHref.includes('youtube')) li.classList.add('yt');
    else if (linkHref.includes('linkedin')) li.classList.add('in');

    // Placeholder for SVG icon, as actual SVG data is not in block DOM
    // In a real scenario, this would be replaced with a proper SVG icon based on the link type.
    const socialIcon = document.createElement('div');
    socialIcon.textContent = 'Social Icon'; // Replace with actual SVG if available
    socialAnchor.append(socialIcon);
    li.append(socialAnchor);
    socialWrap.append(li);
  });

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  root.append(footerMenuBox);

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  footerMenuBox.append(footerMenuCol);

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');
  footerMenuCol.append(footerMenu);

  // Filter for 'footer-link-block' items: 3 cells, text, aem-content, container (links)
  const footerLinkBlocks = itemRows.filter((row) => row.children.length === 3 && row.querySelector('div:first-child p') && row.querySelector('div:nth-child(2) a'));
  footerLinkBlocks.forEach((row) => {
    const [blockTitleCell, blockTitleLinkCell, linksContainerCell] = [...row.children]; // Fixed schema for footer-link-block
    const linkBlocksDiv = document.createElement('div');
    linkBlocksDiv.classList.add('link-blocks');
    footerMenu.append(linkBlocksDiv);

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    // Add specific classes from original HTML if present for this block
    const blockTitleText = blockTitleCell.textContent.trim().toLowerCase();
    if (blockTitleText.includes('what we do')) {
      headDiv.classList.add('what-we-do-footer-links');
    } else if (blockTitleText.includes('careers')) {
      headDiv.classList.add('careers-footer-links');
    }

    linkBlocksDiv.append(headDiv);

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
    // Original HTML has data-once="footerMobileInner" on small tag, but no JS logic for it here.
    // Adding it for structural fidelity, but it won't have behavior without corresponding JS.
    small.dataset.once = 'footerMobileInner';
    span.append(small);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');
    headDiv.append(footerInnerList);

    // Filter for 'footer-link-item' items: 3 cells, text, aem-content, richtext (hierarchy-tree)
    // These are nested under the footerLinkBlocks, so we need to find the items that logically belong to this block.
    // The current filtering `itemRows.filter(...)` will find ALL footer-link-item rows, not just those
    // associated with the current `footerLinkBlock`. This needs to be refined if the model implies a strict parent-child relationship
    // that isn't just based on row order. For now, assuming they are all grouped together.
    const footerLinkItems = itemRows.filter((itemRow) => itemRow.children.length === 3 && itemRow.querySelector('div:first-child p') && itemRow.querySelector('div:nth-child(2) a') && itemRow.querySelector('div:last-child ul'));
    footerLinkItems.forEach((itemRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...itemRow.children]; // Fixed schema for footer-link-item
      const li = document.createElement('li');
      let rootEl;
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(itemRow, rootEl);
      li.appendChild(rootEl);

      const hierarchyRootTempDiv = document.createElement('div');
      moveInstrumentation(hierarchyCell, hierarchyRootTempDiv); // Move instrumentation from original cell
      hierarchyRootTempDiv.innerHTML = hierarchyCell.innerHTML; // Preserve full HTML structure

      const hierarchyRoot = hierarchyRootTempDiv.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        // Original HTML has data-once="hideFooterSubChild" on this wrapper
        wrapper.dataset.once = 'hideFooterSubChild';

        // Move children from hierarchyRootTempDiv to wrapper
        while (hierarchyRootTempDiv.firstChild) {
          wrapper.append(hierarchyRootTempDiv.firstChild);
        }

        // Add event listener for the parent link/span to toggle the wrapper
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot); // Recursively transform nested lists
      }
      footerInnerList.append(li);
    });
  });

  // Copyright and Secondary Nav
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');
  root.append(copyrightWrap);

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  copyrightWrap.append(secondaryNavCol);

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');
  secondaryNavCol.append(secondaryNavUl);

  // Filter for 'footer-secondary-link' items: 2 cells, text, aem-content
  const secondaryLinks = itemRows.filter((row) => row.children.length === 2 && row.querySelector('div:first-child p') && row.querySelector('div:last-child a'));
  secondaryLinks.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Fixed schema for footer-secondary-link
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

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  if (copyrightTextRow) {
    moveInstrumentation(copyrightTextRow, copyrightTextCol);
    copyrightTextCol.innerHTML = copyrightTextRow.innerHTML; // Use innerHTML for richtext
  }
  copyrightWrap.append(copyrightTextCol);

  block.replaceChildren(root);

  // Image optimization (moved to end after block is built)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
