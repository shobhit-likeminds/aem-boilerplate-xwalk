import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Apply classes from ORIGINAL HTML to li
    li.classList.add('cmp-new-footer__nav-item'); // Assuming this is the correct class for nested list items

    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
    const anchor = li.querySelector(':scope > a');
    if (anchor) {
      // Apply classes from ORIGINAL HTML to anchor
      anchor.classList.add('cmp-new-footer__nav-link');
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        // Apply classes from ORIGINAL HTML to span if needed, or a custom one if it's a label-only item
        span.classList.add('cmp-new-footer__nav-text'); // Custom class for non-linked labels
        textNode.remove();
        li.prepend(span);
      }
    }
    if (nested) {
      // Apply classes from ORIGINAL HTML to nested ul
      nested.classList.add('cmp-new-footer__nav-group'); // Assuming this is the correct class for nested ul
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('cmp-new-footer__nav-dropdown'); // Using the class from ORIGINAL HTML for dropdowns
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // Use 'active' class for toggling
          subWrap.classList.toggle('active');
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    backgroundImageDesktopRow,
    logoRow,
    logoLinkRow,
    ...itemRows
  ] = children;

  const root = document.createElement('div');
  root.classList.add('cmp-new-footer');

  // Top Content Section
  const topContent = document.createElement('div');
  topContent.classList.add('cmp-new-footer__top-content');
  moveInstrumentation(backgroundImageDesktopRow, topContent);

  const backgroundImagePicture = backgroundImageDesktopRow.querySelector('picture');
  if (backgroundImagePicture) {
    const img = backgroundImagePicture.querySelector('img');
    if (img && img.src) {
      topContent.style.backgroundImage = `url(${img.src})`;
    }
  }

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('cmp-image', 'cmp-new-footer__logo');
  moveInstrumentation(logoRow, logoDiv);

  const logoLink = document.createElement('a');
  logoLink.classList.add('cmp-image__link');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  topContent.append(logoDiv);

  // Navigation Links
  const navigationLinks = itemRows.filter((row) => row.children.length === 3);
  const footerTitles = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('[class*="icon-"]')); // Filter out social links by checking for icon classes
  const socialLinks = itemRows.filter((row) => row.children.length === 2 && row.querySelector('[class*="icon-"]')); // Identify social links by checking for icon classes

  const navSection = document.createElement('div');
  navSection.classList.add('cmp-new-footer__nav', `cmp-new-footer__nav__count-${navigationLinks.length}`);

  const navGroup = document.createElement('ul');
  navGroup.classList.add('cmp-new-footer__nav-group');

  navigationLinks.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('cmp-new-footer__nav-item');

    const foundLink = linkCell?.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
      rootEl.classList.add('cmp-new-footer__nav-link');
    } else {
      rootEl = document.createElement('span');
      rootEl.classList.add('cmp-new-footer__nav-text'); // Custom class for non-linked labels, as per review
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl);
    li.appendChild(rootEl);

    // Handle hierarchy-tree richtext field
    if (hierarchyCell) {
      const tempDiv = document.createElement('div');
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Use innerHTML to preserve nested structure

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        // Apply classes from ORIGINAL HTML to the root ul of the hierarchy
        hierarchyRoot.classList.add('cmp-new-footer__nav-group');

        // Apply classes to all nested <a>, <li>, <ul> elements
        hierarchyRoot.querySelectorAll('a').forEach(a => a.classList.add('cmp-new-footer__nav-link'));
        hierarchyRoot.querySelectorAll('li').forEach(liItem => liItem.classList.add('cmp-new-footer__nav-item'));
        hierarchyRoot.querySelectorAll('ul').forEach(ulItem => ulItem.classList.add('cmp-new-footer__nav-group'));

        const wrapper = document.createElement('div');
        wrapper.classList.add('cmp-new-footer__nav-dropdown'); // Use class from ORIGINAL HTML
        
        // Move all children from tempDiv (which contains the hierarchyRoot) to the wrapper
        while (tempDiv.firstChild) {
          wrapper.append(tempDiv.firstChild);
        }
        
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot); // Further transform nested lists
      }
    }
    navGroup.appendChild(li);
  });
  navSection.append(navGroup);
  topContent.append(navSection);
  root.append(topContent);

  // Bottom Content Section
  const bottomContent = document.createElement('div');
  bottomContent.classList.add('cmp-new-footer__bottom-content');

  const bottomContainer = document.createElement('div');
  bottomContainer.classList.add('cmp-new-footer__container');

  // Footer Titles
  const itcTitles = document.createElement('div');
  itcTitles.classList.add('cmp-new-footer__ITC-Titles');

  footerTitles.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const link = document.createElement('a');
    link.classList.add('desc-1'); // Class from ORIGINAL HTML
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, link);
    itcTitles.append(link);
  });
  bottomContainer.append(itcTitles);

  // Social Media Links
  const socialMedia = document.createElement('div');
  socialMedia.classList.add('cmp-new-footer__social-media');

  socialLinks.forEach((row) => {
    const [iconClassCell, linkCell] = [...row.children];
    const link = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    const iconClass = iconClassCell?.textContent.trim();
    if (iconClass) {
      link.classList.add(iconClass); // Use the icon class from the cell
    }
    moveInstrumentation(row, link);
    socialMedia.append(link);
  });
  bottomContainer.append(socialMedia);

  bottomContent.append(bottomContainer);
  root.append(bottomContent);

  block.replaceChildren(root);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
