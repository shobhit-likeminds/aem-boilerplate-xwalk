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
      subWrap.classList.add('has-footer-inner-sub-child');
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

  // Fixed root fields
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightRow = children[children.length - 1]; // Copyright is always the last fixed field

  // All rows between logoLink and copyright are item rows
  const itemRows = children.slice(2, children.length - 1);

  const socialLinkRows = [];
  const footerSectionRows = [];
  const secondaryLinkRows = [];

  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2) {
      // Differentiate between socialLinkRows and secondaryLinkRows
      // Social links have a richtext hierarchy-tree cell which contains a <ul>
      if (cells[1].querySelector('ul')) { // Check for hierarchy-tree in the second cell
        socialLinkRows.push(row);
      } else {
        secondaryLinkRows.push(row);
      }
    } else if (cells.length === 3) {
      footerSectionRows.push(row);
    }
  });

  const footerMain = document.createElement('footer');
  footerMain.classList.add('footer-main');

  const container = document.createElement('div');
  container.classList.add('container');
  footerMain.append(container);

  // Footer Header
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');
  container.append(footerHeader);

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  footerHeader.append(logoCol);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  logoCol.append(logoDiv);

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
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoDiv);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  footerHeader.append(socialCol);

  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');
  socialCol.append(socialWrap);

  socialLinkRows.forEach((row) => {
    const [socialLinkCell, hierarchyCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    // Original HTML has classes like 'fb', 'tw' on the li for social icons.
    // We need to extract this from the socialLinkCell's aem-content.
    // Assuming the socialLinkCell's <a> textContent might contain a hint,
    // or we might need to derive it from the href or a specific class in the original HTML.
    // For now, we'll assume the original HTML's <li> classes are not directly from AEM content.
    // If the original HTML has specific classes like 'fb', 'tw' on the li,
    // we need a way to map them. For now, we'll skip adding these specific classes
    // as they are not present in the AEM block structure.

    const socialAnchor = document.createElement('a');
    const foundSocialLink = socialLinkCell.querySelector('a');
    if (foundSocialLink) {
      socialAnchor.href = foundSocialLink.href;
      socialAnchor.target = '_blank'; // Assuming social links open in new tab
    }
    moveInstrumentation(socialLinkCell, socialAnchor);

    const tempDiv = document.createElement('div');
    moveInstrumentation(hierarchyCell, tempDiv);
    tempDiv.innerHTML = hierarchyCell.innerHTML; // Read richtext content

    const hierarchyRoot = tempDiv.querySelector('ul');
    if (hierarchyRoot) {
      // The original HTML has an SVG inside the social link <a>.
      // The AEM block model has 'hierarchy-tree' as richtext.
      // We need to decide if the social icon comes from the hierarchy-tree or is hardcoded.
      // Based on original HTML, the SVG is directly inside the <a>.
      // The hierarchy-tree is a nested menu.
      // For now, we'll assume the social icon is NOT from the hierarchy-tree.
      // The socialAnchor.textContent = socialLinkCell.textContent.trim(); below is a fallback.
      // If the social icon needs to be dynamically generated, it would require more logic
      // (e.g., mapping href to an SVG).

      // Apply classes to nested elements from ORIGINAL HTML
      hierarchyRoot.classList.add('social-sub-menu'); // Example class, adjust if needed
      hierarchyRoot.querySelectorAll('li').forEach(item => item.classList.add('social-sub-menu-item'));
      hierarchyRoot.querySelectorAll('a').forEach(item => item.classList.add('social-sub-menu-link'));

      const wrapper = document.createElement('div');
      wrapper.classList.add('has-footer-sub-child');
      wrapper.appendChild(hierarchyRoot);
      socialAnchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('active');
        li.classList.toggle('active');
      });
      li.appendChild(wrapper);
      transformNestedLists(hierarchyRoot);
    }
    // If no specific icon is extracted from hierarchy, use text content as fallback
    // This part might need adjustment if social icons are expected from AEM content.
    // For now, we'll assume the social icon is part of the original HTML structure
    // and not directly from the AEM content.
    socialAnchor.textContent = socialLinkCell.textContent.trim(); // Fallback if no hierarchy for icon
    li.append(socialAnchor);
    moveInstrumentation(row, li);
    socialWrap.append(li);
  });

  // Footer Menu
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  container.append(footerMenuBox);

  const menuCol = document.createElement('div');
  menuCol.classList.add('col');
  footerMenuBox.append(menuCol);

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');
  menuCol.append(footerMenu);

  footerSectionRows.forEach((row) => {
    const [titleCell, linkCell, sectionLinksCell] = [...row.children]; // Destructuring for fixed schema
    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    footerMenu.append(linkBlocks);

    const head = document.createElement('div');
    head.classList.add('head');
    linkBlocks.append(head);

    const span = document.createElement('span');
    head.append(span);

    const titleLink = document.createElement('a');
    const directHref = linkCell.querySelector('a')?.href;
    if (directHref) {
      titleLink.href = directHref;
    } else {
      titleLink.href = 'javascript:void(0)';
    }
    titleLink.textContent = titleCell.textContent.trim();
    span.append(titleLink);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);

    const tempSectionLinksDiv = document.createElement('div');
    moveInstrumentation(sectionLinksCell, tempSectionLinksDiv);
    tempSectionLinksDiv.innerHTML = sectionLinksCell.innerHTML; // Read richtext content

    const sectionLinksUl = tempSectionLinksDiv.querySelector('ul');
    if (sectionLinksUl) {
      sectionLinksUl.classList.add('footer-inner-list');
      head.append(sectionLinksUl);
      transformNestedLists(sectionLinksUl);
      titleLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sectionLinksUl.classList.toggle('active');
        head.classList.toggle('active');
      });
    }
    moveInstrumentation(row, linkBlocks);
  });

  // Copyright and Secondary Nav
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');
  container.append(copyrightWrap);

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  copyrightWrap.append(secondaryNavCol);

  const secondaryNav = document.createElement('ul');
  secondaryNav.classList.add('secondary-nav');
  secondaryNavCol.append(secondaryNav);

  secondaryLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Destructuring for fixed schema
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, li);
    li.append(anchor);
    secondaryNav.append(li);
  });

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightCol.textContent = copyrightRow.textContent.trim();
  moveInstrumentation(copyrightRow, copyrightCol);
  copyrightWrap.append(copyrightCol);

  block.replaceChildren(footerMain);
}
