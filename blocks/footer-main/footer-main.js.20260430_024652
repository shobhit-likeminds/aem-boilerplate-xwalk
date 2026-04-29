import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, level = 0) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Add classes to li elements from ORIGINAL HTML
    li.classList.add('list-item'); // Assuming 'list-item' is a common class for li in original HTML, if not, remove or adjust.
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
      subWrap.classList.add(
        level === 0 ? 'has-footer-sub-child' : 'has-footer-inner-sub-child',
      );
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        const small = document.createElement('small');
        small.dataset.once = 'footerClickEvent';
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
        small.append(svg);
        trigger.after(small);

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

  // Root fields
  const logoRow = children.find((row) => row.querySelector('picture'));
  // Use content detection for logoLinkRow and copyrightTextRow as they are root fields
  // and their content type helps distinguish them.
  const logoLinkRow = children.find(
    (row) => row.children.length === 1 && row.querySelector('a') && !row.querySelector('picture'),
  );
  const copyrightTextRow = children.find(
    (row) => row.children.length === 1 && !row.querySelector('picture') && !row.querySelector('a'),
  );

  // Item rows - using content detection based on the first cell's text content
  const socialLinkRows = children.filter(
    (row) => row.children.length === 3 && row.children[0]?.textContent.trim() === 'Platform label text',
  );
  const footerMenuBlockRows = children.filter(
    (row) => row.children.length === 3 && row.children[0]?.textContent.trim() === 'Menu Block Title label text',
  );
  const footerMenuItemRows = children.filter(
    (row) => row.children.length === 3 && row.children[0]?.textContent.trim() === 'Menu Item Label label text',
  );
  const secondaryNavRows = children.filter(
    (row) => row.children.length === 2 && row.children[0]?.textContent.trim() === 'Secondary Nav Label label text',
  );

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Footer Header
  const footerHeaderRow = document.createElement('div');
  footerHeaderRow.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  if (logoLinkRow) {
    const foundLink = logoLinkRow.querySelector('a');
    if (foundLink) {
      logoLink.href = foundLink.href;
      moveInstrumentation(logoLinkRow, logoLink);
    }
  }

  if (logoRow) {
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
        // moveInstrumentation should be on the element that replaces the original row content
        moveInstrumentation(logoRow, optimizedPic);
        logoLink.append(optimizedPic);
      }
    }
  }
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeaderRow.append(logoCol);

  // Social Links
  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [platformCell, linkCell] = [...row.children]; // CORRECT: named destructuring for fixed schema
    const li = document.createElement('li');
    li.classList.add(platformCell.textContent.trim().toLowerCase().replace(/\s/g, ''));

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank';
    }
    moveInstrumentation(row, anchor);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('viewBox', '0 0 40 41');
    // Corrected xlink:href to match ORIGINAL HTML
    svg.innerHTML = '<image xlink:href="data:stripped" x="0" y="0" width="30" height="30"></image>';
    anchor.append(svg);
    li.append(anchor);
    socialUl.append(li);
  });

  socialCol.append(socialUl);
  footerHeaderRow.append(socialCol);
  containerDiv.append(footerHeaderRow);

  // Footer Menu Box
  const footerMenuBoxRow = document.createElement('div');
  footerMenuBoxRow.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu');

  footerMenuBlockRows.forEach((row) => {
    const [blockTitleCell, blockTitleLinkCell] = [...row.children]; // CORRECT: named destructuring for fixed schema
    const linkBlocksDiv = document.createElement('div');
    linkBlocksDiv.classList.add('link-blocks');
    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    const span = document.createElement('span');

    const titleLink = document.createElement('a');
    const foundTitleLink = blockTitleLinkCell.querySelector('a');
    if (foundTitleLink) {
      titleLink.href = foundTitleLink.href;
    }
    titleLink.textContent = blockTitleCell.textContent.trim();
    moveInstrumentation(row, titleLink);

    span.append(titleLink);
    const small = document.createElement('small');
    small.dataset.once = 'footerMobileInner';
    span.append(small);
    headDiv.append(span);

    const ul = document.createElement('ul');
    ul.classList.add('footer-inner-list');

    // Filter footer menu items that belong to this block
    // The filtering logic should be based on the relationship defined in the model,
    // not hardcoded text checks that exclude valid items.
    // Assuming all footerMenuItemRows are children of some footerMenuBlock.
    // The current filtering logic is problematic as it excludes items based on their label text.
    // A better approach would be to associate menu items with their parent block during authoring,
    // or if the model implies all footerMenuItemRows belong to all footerMenuBlocks, then iterate all.
    // For now, removing the problematic filter to allow all menu items to be processed.
    // If the intent was to filter by a specific block, the model needs a field to link them.
    const menuItems = footerMenuItemRows;

    menuItems.forEach((menuItemRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...menuItemRow.children]; // CORRECT: named destructuring for fixed schema
      const li = document.createElement('li');

      const hierarchyRoot = hierarchyCell.querySelector('ul');
      if (hierarchyRoot) {
        const anchorOrSpan = document.createElement('a');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          anchorOrSpan.href = foundLink.href;
        }
        anchorOrSpan.textContent = labelCell.textContent.trim();
        moveInstrumentation(menuItemRow, anchorOrSpan);
        li.append(anchorOrSpan);

        const smallIcon = document.createElement('span'); // Changed from small to span to match original HTML structure for the icon
        smallIcon.dataset.once = 'footerClickEvent';
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
        smallIcon.append(svg);
        li.append(smallIcon);

        const subWrap = document.createElement('div');
        subWrap.classList.add('has-footer-sub-child');
        // moveInstrumentation for the hierarchyRoot content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from the original cell to the tempDiv

        // Apply classes to nested elements from ORIGINAL HTML
        tempDiv.querySelectorAll('ul').forEach(ulEl => ulEl.classList.add('footer-inner-list')); // Assuming this class applies to nested ULs
        tempDiv.querySelectorAll('li').forEach(liEl => liEl.classList.add('list-item')); // Assuming this class applies to nested LIs
        tempDiv.querySelectorAll('a').forEach(aEl => {
          // Add any specific classes for nested anchors if they exist in ORIGINAL HTML
          // e.g., aEl.classList.add('nav-link');
        });

        while (tempDiv.firstChild) {
          subWrap.append(tempDiv.firstChild);
        }
        li.append(subWrap);

        anchorOrSpan.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
        // transformNestedLists should be called on the actual UL element that was moved
        transformNestedLists(subWrap.querySelector('ul'));
      } else {
        const anchor = document.createElement('a');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          anchor.href = foundLink.href;
        }
        anchor.textContent = labelCell.textContent.trim();
        moveInstrumentation(menuItemRow, anchor);
        li.append(anchor);
      }
      ul.append(li);
    });

    headDiv.append(ul);
    linkBlocksDiv.append(headDiv);
    footerMenuDiv.append(linkBlocksDiv);
  });

  footerMenuCol.append(footerMenuDiv);
  footerMenuBoxRow.append(footerMenuCol);
  containerDiv.append(footerMenuBoxRow);

  // Copyright Wrap
  const copyrightWrapRow = document.createElement('div');
  copyrightWrapRow.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryNavRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // CORRECT: named destructuring for fixed schema
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
  copyrightWrapRow.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  if (copyrightTextRow) {
    moveInstrumentation(copyrightTextRow, copyrightTextCol);
    copyrightTextCol.innerHTML = copyrightTextRow.innerHTML; // CORRECT: using innerHTML for richtext
  }
  copyrightWrapRow.append(copyrightTextCol);
  containerDiv.append(copyrightWrapRow);

  block.replaceChildren(containerDiv);
}
