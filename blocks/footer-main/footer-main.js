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
        const small = document.createElement('small');
        trigger.append(small);
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
      transformNestedLists(nested, true);
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[2];

  // Item rows (content detection for different types)
  const socialLinkItemRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child a') && row.querySelector('div:last-child ul'),
  );
  const footerMenuBlockRows = children.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim() && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child')?.textContent.trim() === 'Menu Links value',
  );
  const footerMenuLinkItemRows = children.filter(
    (row) => row.children.length === 3 && row.querySelector('div:first-child')?.textContent.trim() && row.querySelector('div:nth-child(2) a') && row.querySelector('div:last-child ul'),
  );
  const footerSubLinkItemRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child')?.textContent.trim() && row.querySelector('div:nth-child(2) a') && !row.querySelector('div:last-child ul'),
  );
  const secondaryLinkItemRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('div:first-child')?.textContent.trim() && row.querySelector('div:nth-child(2) a') && !row.querySelector('div:last-child ul'),
  );

  const container = document.createElement('div');
  container.classList.add('container');

  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const logoPicture = logoRow.querySelector('picture');
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
    moveInstrumentation(logoLinkRow, logoLink);
  }
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  logoWrapper.append(logoDiv);
  footerHeader.append(logoWrapper);

  const socialWrapCenter = document.createElement('div');
  socialWrapCenter.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialWrapUl = document.createElement('ul');
  socialWrapUl.classList.add('social-wrap');

  socialLinkItemRows.forEach((row) => {
    const [linkCell, hierarchyCell] = [...row.children]; // Destructuring for fixed schema
    const socialLinkAnchor = linkCell.querySelector('a');
    const hierarchyRoot = hierarchyCell.querySelector('ul');

    if (socialLinkAnchor && hierarchyRoot) {
      const li = document.createElement('li');
      // Attempt to derive social icon class from the link text or a data attribute if available
      // For now, using a generic placeholder as per original HTML structure
      const socialAnchor = document.createElement('a');
      socialAnchor.href = socialLinkAnchor.href;
      socialAnchor.target = '_blank';
      moveInstrumentation(linkCell, socialAnchor);

      // Create a div for the SVG, mimicking the original HTML structure
      const socialIconDiv = document.createElement('div');
      // Original HTML uses an <image> tag inside SVG, which is not ideal for EDS.
      // For now, using a generic SVG placeholder. In a real scenario, this would
      // be replaced with an actual SVG from a sprite or inline.
      socialIconDiv.innerHTML = '<svg width="30" height="30" viewBox="0 0 40 41"><rect width="30" height="30" fill="currentColor"/></svg>';
      socialAnchor.append(socialIconDiv);
      li.append(socialAnchor);
      socialWrapUl.append(li);
    }
  });

  socialWrapCenter.append(socialWrapUl);
  footerHeader.append(socialWrapCenter);
  container.append(footerHeader);

  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const col = document.createElement('div');
  col.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerMenuBlockRows.forEach((row) => {
    const [headingCell, headingLinkCell, menuLinksContainerCell] = [...row.children]; // Destructuring for fixed schema
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    const span = document.createElement('span');
    const headingAnchor = document.createElement('a');
    const foundHeadingLink = headingLinkCell.querySelector('a');
    if (foundHeadingLink) {
      headingAnchor.href = foundHeadingLink.href;
      moveInstrumentation(headingLinkCell, headingAnchor);
    }
    headingAnchor.textContent = headingCell.textContent.trim();
    span.append(headingAnchor);
    const small = document.createElement('small');
    span.append(small);
    headDiv.append(span);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');

    // Filter for menu links that belong to THIS footerMenuBlockRow
    const currentMenuLinks = footerMenuLinkItemRows.filter(
      (menuLinkRow) => menuLinkRow.previousElementSibling === row || menuLinkRow.previousElementSibling?.previousElementSibling === row, // Basic heuristic, may need refinement
    );

    currentMenuLinks.forEach((menuLinkRow) => {
      const [labelCell, linkCell, hierarchyCell] = [...menuLinkRow.children]; // Destructuring for fixed schema
      const li = document.createElement('li');
      const foundLink = linkCell.querySelector('a');
      const hierarchyRootContent = hierarchyCell.innerHTML; // Use innerHTML for richtext

      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
        moveInstrumentation(linkCell, rootEl);
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, rootEl);
      li.appendChild(rootEl);

      if (hierarchyRootContent.trim()) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyRootContent;
        const hierarchyRootUl = tempDiv.querySelector('ul');

        if (hierarchyRootUl) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('has-footer-sub-child'); // From ORIGINAL HTML
          moveInstrumentation(hierarchyCell, wrapper); // Move instrumentation from the richtext cell
          wrapper.appendChild(hierarchyRootUl);

          const smallTrigger = document.createElement('small');
          rootEl.append(smallTrigger);

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

    // Filter for sub links that belong to THIS footerMenuBlockRow
    const currentSubLinks = footerSubLinkItemRows.filter(
      (subLinkRow) => subLinkRow.previousElementSibling === row || subLinkRow.previousElementSibling?.previousElementSibling === row, // Basic heuristic, may need refinement
    );

    currentSubLinks.forEach((subLinkRow) => {
      const [labelCell, linkCell] = [...subLinkRow.children]; // Destructuring for fixed schema
      const li = document.createElement('li');
      const subLinkAnchor = document.createElement('a');
      const foundSubLink = linkCell.querySelector('a');
      if (foundSubLink) {
        subLinkAnchor.href = foundSubLink.href;
        moveInstrumentation(linkCell, subLinkAnchor);
      }
      subLinkAnchor.textContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, subLinkAnchor);
      li.append(subLinkAnchor);
      footerInnerList.append(li);
    });

    headDiv.append(footerInnerList);
    linkBlocks.append(headDiv);
    footerMenu.append(linkBlocks);
    moveInstrumentation(row, linkBlocks); // Move instrumentation from the footer-menu-block row
  });

  col.append(footerMenu);
  footerMenuBox.append(col);
  container.append(footerMenuBox);

  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  secondaryLinkItemRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    const secondaryAnchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      secondaryAnchor.href = foundLink.href;
      moveInstrumentation(linkCell, secondaryAnchor);
    }
    secondaryAnchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(labelCell, secondaryAnchor);
    li.append(secondaryAnchor);
    secondaryNavUl.append(li);
  });

  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  if (copyrightTextRow) {
    copyrightTextCol.textContent = copyrightTextRow.textContent.trim();
    moveInstrumentation(copyrightTextRow, copyrightTextCol);
  }
  copyrightWrap.append(copyrightTextCol);
  container.append(copyrightWrap);

  block.replaceChildren(container);
}
