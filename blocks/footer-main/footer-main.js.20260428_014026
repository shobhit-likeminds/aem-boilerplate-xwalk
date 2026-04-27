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
      subWrap.classList.add('has-footer-sub-child');
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
      // Apply classes from ORIGINAL HTML to nested elements
      nested.querySelectorAll('a').forEach((a) => a.classList.add('')); // Add specific classes if any from original HTML
      nested.querySelectorAll('ul').forEach((ul) => ul.classList.add('')); // Add specific classes if any from original HTML
      nested.querySelectorAll('li').forEach((liElement) => liElement.classList.add('')); // Add specific classes if any from original HTML
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root-level fields and item rows are distinguished by content detection
  const logoRow = children.find(
    (row) => row.children.length === 1 && row.querySelector('picture'),
  );
  const logoLinkRow = children.find(
    (row) => row.children.length === 1 && row.querySelector('a'),
  );
  const copyrightTextRow = children.find(
    (row) => row.children.length === 1 && row.textContent.includes('Copyright'),
  );

  // Item rows for containers
  const socialLinkRows = children.filter(
    (row) => row.children.length === 3 && row.querySelector('picture') && row.querySelector('a'),
  );
  const footerLinkBlockRows = children.filter(
    (row) => row.children.length === 3 && !row.querySelector('picture') && !row.querySelector('a'),
  );
  // footerLinkItemRows have 4 cells, but they are nested under footerLinkBlockRows
  // We need to filter them based on their position relative to footerLinkBlockRows
  const allFooterLinkItemRows = children.filter(
    (row) => row.children.length === 4,
  );
  const secondaryNavRows = children.filter(
    (row) => row.children.length === 2 && !row.querySelector('picture'),
  );

  const container = document.createElement('div');
  container.classList.add('container');

  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoAnchor = document.createElement('a');
  const foundLogoLink = logoLinkRow?.querySelector('a');
  if (foundLogoLink) {
    logoAnchor.href = foundLogoLink.href;
    moveInstrumentation(logoLinkRow, logoAnchor);
  }

  if (logoRow) {
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
      logoAnchor.append(optimizedPic);
    }
  }
  logoDiv.append(logoAnchor);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');

  socialLinkRows.forEach((row) => {
    const [iconCell, linkCell, hierarchyCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    const socialAnchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      socialAnchor.href = foundLink.href;
      socialAnchor.target = '_blank'; // Assuming social links open in new tab
      moveInstrumentation(linkCell, socialAnchor);
    }

    const picture = iconCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]); // Adjust width as needed
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      socialAnchor.append(optimizedPic);
    }
    li.append(socialAnchor);

    // Handle hierarchy-tree for social links if present
    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('has-footer-sub-child');
      moveInstrumentation(hierarchyCell, wrapper); // Move instrumentation for the cell
      wrapper.innerHTML = hierarchyCell.innerHTML; // Preserve full HTML structure
      const ulInWrapper = wrapper.querySelector('ul');
      if (ulInWrapper) {
        ulInWrapper.querySelectorAll('a').forEach((a) => a.classList.add('')); // Add specific classes if any from original HTML
        ulInWrapper.querySelectorAll('ul').forEach((ul) => ul.classList.add('')); // Add specific classes if any from original HTML
        ulInWrapper.querySelectorAll('li').forEach((liElement) => liElement.classList.add('')); // Add specific classes if any from original HTML
        transformNestedLists(ulInWrapper);
      }
      li.appendChild(wrapper);
    }
    socialWrap.append(li);
  });
  socialCol.append(socialWrap);
  footerHeader.append(socialCol);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');

  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  // To correctly associate footerLinkItemRows with their parent footerLinkBlockRows,
  // we need to process them in order or use a more robust association.
  // For now, let's assume they appear sequentially or use a map.
  const linkBlockMap = new Map();
  let currentBlockIndex = -1;

  children.forEach((row, index) => {
    if (footerLinkBlockRows.includes(row)) {
      currentBlockIndex = index;
      linkBlockMap.set(currentBlockIndex, { blockRow: row, items: [] });
    } else if (currentBlockIndex !== -1 && allFooterLinkItemRows.includes(row)) {
      linkBlockMap.get(currentBlockIndex).items.push(row);
    }
  });

  linkBlockMap.forEach(({ blockRow, items }) => {
    const [blockLabelCell, blockLinkCell] = [...blockRow.children]; // Destructuring for fixed schema
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    moveInstrumentation(blockRow, linkBlocks); // Move instrumentation for the block row

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const blockHeadingLink = document.createElement('a');
    const foundBlockLink = blockLinkCell?.querySelector('a');
    if (foundBlockLink) {
      blockHeadingLink.href = foundBlockLink.href;
      moveInstrumentation(blockLinkCell, blockHeadingLink);
    }
    blockHeadingLink.textContent = blockLabelCell?.textContent.trim() || '';
    span.append(blockHeadingLink);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    items.forEach((itemRow) => {
      const [labelCell, linkCell, iconCell, hierarchyCell] = [...itemRow.children]; // Destructuring for fixed schema
      const li = document.createElement('li');

      const foundLink = linkCell?.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(itemRow, rootEl); // Move instrumentation for the item row
      li.appendChild(rootEl);

      // Handle hierarchy-tree for footer link items
      const hierarchyRootContainer = document.createElement('div');
      moveInstrumentation(hierarchyCell, hierarchyRootContainer); // Move instrumentation for the cell
      hierarchyRootContainer.innerHTML = hierarchyCell.innerHTML; // Preserve full HTML structure
      const hierarchyRootUl = hierarchyRootContainer.querySelector('ul');

      if (hierarchyRootUl) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        wrapper.appendChild(hierarchyRootUl); // Append the actual <ul> element
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        // Apply classes from ORIGINAL HTML to nested elements
        hierarchyRootUl.querySelectorAll('a').forEach((a) => a.classList.add('')); // Add specific classes if any from original HTML
        hierarchyRootUl.querySelectorAll('ul').forEach((ul) => ul.classList.add('')); // Add specific classes if any from original HTML
        hierarchyRootUl.querySelectorAll('li').forEach((liElement) => liElement.classList.add('')); // Add specific classes if any from original HTML
        transformNestedLists(hierarchyRootUl);
      }
      footerInnerList.append(li);
    });

    linkBlocks.append(headDiv, footerInnerList);
    footerMenu.append(linkBlocks);
  });

  footerMenuCol.append(footerMenu);
  footerMenuBox.append(footerMenuCol);
  container.append(footerMenuBox);

  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNav = document.createElement('ul');
  secondaryNav.classList.add('secondary-nav');

  secondaryNavRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      moveInstrumentation(linkCell, anchor);
    }
    anchor.textContent = labelCell?.textContent.trim() || '';
    li.append(anchor);
    secondaryNav.append(li);
  });
  secondaryNavCol.append(secondaryNav);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  if (copyrightTextRow) {
    moveInstrumentation(copyrightTextRow, copyrightTextCol);
    copyrightTextCol.innerHTML = copyrightTextRow.innerHTML;
  }
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
