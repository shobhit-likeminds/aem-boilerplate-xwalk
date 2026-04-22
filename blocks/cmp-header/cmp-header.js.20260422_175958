import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Apply classes from original HTML to li elements
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-1'); // Assuming nested items are level-1 or higher

    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
    const anchor = li.querySelector(':scope > a');
    if (anchor) {
      // Apply classes from original HTML to anchor elements
      anchor.classList.add('cmp-navigation__item-link');
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        span.classList.add('cmp-navigation__item-link'); // Apply link class for consistency
        textNode.remove();
        li.prepend(span);
      }
    }
    if (nested) {
      // Apply classes from original HTML to ul elements
      nested.classList.add('cmp-navigation__group', 'cmp-header__mobile-list');

      nested.remove(); // Remove to re-append in a wrapper
      const subWrap = document.createElement('div');
      subWrap.classList.add('cmp-header__mobile-list'); // Using a class from the original HTML for nested lists
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // Use 'active' for state
          subWrap.classList.toggle('active'); // Use 'active' for state
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [logoRow, logoLinkRow, ...itemRows] = children;

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('cmp-header');
  moveInstrumentation(block, headerWrapper);

  const hamburgerInput = document.createElement('input');
  hamburgerInput.classList.add('cmp-header__hamburger');
  hamburgerInput.type = 'checkbox';
  headerWrapper.append(hamburgerInput);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image', 'cmp-header__logo');
  moveInstrumentation(logoRow, logoDiv);

  const logoLink = document.createElement('a');
  logoLink.classList.add('cmp-image__link');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  headerWrapper.append(logoDiv);

  // Navigation Links
  const navLinksDiv = document.createElement('div');
  navLinksDiv.classList.add('cmp-header__nav-links');

  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('navigation');

  const nav = document.createElement('nav');
  nav.classList.add('cmp-navigation');
  nav.setAttribute('role', 'navigation');

  const navGroup = document.createElement('ul');
  navGroup.classList.add('cmp-navigation__group', 'cmp-header__nav-group');

  const mobileListDiv = document.createElement('div');
  mobileListDiv.classList.add('cmp-header__mobile-list');

  const policyUl = document.createElement('ul');
  policyUl.classList.add('cmp-header__policy');

  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.classList.add('cmp-header__social-media');

  // Nav Icons container - created here to be appended to later
  const navIconsDiv = document.createElement('div');
  navIconsDiv.classList.add('cmp-header__nav-icons');
  headerWrapper.append(navIconsDiv);

  itemRows.forEach((row) => {
    const cells = [...row.children];

    // Navigation Item (3 cells: label, link, hierarchy-tree)
    if (cells.length === 3 && cells[2].querySelector('ul')) {
      const [labelCell, linkCell, hierarchyCell] = cells;
      const li = document.createElement('li');
      li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0', 'cmp-header__nav-products');
      moveInstrumentation(row, li);

      const foundLink = linkCell?.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
        rootEl.classList.add('cmp-navigation__item-link');
      } else {
        rootEl = document.createElement('span'); // Use span for non-linked labels
        rootEl.classList.add('cmp-navigation__item-link'); // Apply link class for consistency
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      li.appendChild(rootEl);

      // Handle hierarchy-tree richtext
      const tempDiv = document.createElement('div');
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from the original cell
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Read innerHTML to preserve structure

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        // Apply classes to the root ul of the hierarchy
        hierarchyRoot.classList.add('cmp-navigation__group', 'cmp-header__mobile-list');

        // Apply classes to all nested <a>, <li>, <ul> elements
        hierarchyRoot.querySelectorAll('a').forEach(a => a.classList.add('cmp-navigation__item-link'));
        hierarchyRoot.querySelectorAll('li').forEach(liItem => liItem.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-1')); // Assuming level-1 for direct children
        hierarchyRoot.querySelectorAll('ul').forEach(ulItem => ulItem.classList.add('cmp-navigation__group', 'cmp-header__mobile-list'));

        const wrapper = document.createElement('div');
        wrapper.classList.add('cmp-header__mobile-list'); // Use a class from original HTML
        while (hierarchyRoot.firstChild) { // Move children from hierarchyRoot to wrapper
          wrapper.append(hierarchyRoot.firstChild);
        }
        wrapper.append(hierarchyRoot); // Append the now empty hierarchyRoot (with classes)

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active'); // Use 'active' for state
          li.classList.toggle('active'); // Use 'active' for state
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot); // Apply transformation to the hierarchyRoot
      } else {
        li.classList.add('cmp-header__no-items');
      }
      navGroup.append(li);
    }
    // Policy Link Item (2 cells: label, link)
    else if (cells.length === 2 && !cells[0].querySelector('picture')) {
      const [labelCell, linkCell] = cells;
      const li = document.createElement('li');
      li.classList.add('cmp-header__policy-list');
      moveInstrumentation(row, li);

      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = labelCell?.textContent.trim() || '';
      li.append(anchor);
      policyUl.append(li);
    }
    // Social Link Item (3 cells: iconClass, link, socialType)
    else if (cells.length === 3 && !cells[0].querySelector('picture') && cells[2].textContent.trim()) {
      const [iconClassCell, linkCell, socialTypeCell] = cells;
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.classList.add(iconClassCell?.textContent.trim() || '');
      anchor.setAttribute('data-social', socialTypeCell?.textContent.trim() || '');
      moveInstrumentation(row, anchor);
      socialMediaDiv.append(anchor);
    }
    // Nav Icon Item (3 cells: icon, link, label)
    else if (cells.length === 3 && cells[0].querySelector('picture') || cells[0].textContent.trim().startsWith('icon-')) { // Check for picture or icon class
      const [iconCell, linkCell, labelCell] = cells;
      const iconWrapper = document.createElement('div');
      // Default classes, specific ones added below based on icon type

      const anchor = document.createElement('a');
      anchor.classList.add('cmp-header__icon-img');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      moveInstrumentation(row, anchor);

      const iconDiv = document.createElement('div');
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]); // Assuming small icon size
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        iconDiv.append(optimizedPic);
      } else {
        // If it's an SVG icon, it might be directly in the cell as text or a class
        const iconClass = iconCell.textContent.trim();
        if (iconClass) {
          iconDiv.classList.add(iconClass);
        }
      }

      const labelText = labelCell?.textContent.trim();
      if (labelText) {
        const textDiv = document.createElement('div');
        textDiv.classList.add('cmp-header__icon-text');
        textDiv.textContent = labelText;
        anchor.append(iconDiv, textDiv);
      } else {
        anchor.append(iconDiv);
      }

      // Determine specific classes for the iconWrapper based on iconDiv content
      if (iconDiv.classList.contains('icon-accessibility')) {
        iconWrapper.classList.add('cmp-header__accessbility', 'cmp-header__hide-icon');
      } else if (iconDiv.classList.contains('icon-search')) {
        iconWrapper.classList.add('cmp-header__search');
      } else if (iconDiv.classList.contains('icon-profile')) {
        iconWrapper.classList.add('cmp-header__login', 'cmp-header__hide-icon');
      } else {
        iconWrapper.classList.add('cmp-header__hide-icon'); // Hide by default if unknown
      }

      iconWrapper.append(anchor);
      navIconsDiv.append(iconWrapper); // Append to the navIconsDiv created earlier
    }
  });

  nav.append(navGroup);
  mobileListDiv.append(policyUl, socialMediaDiv);
  nav.append(mobileListDiv);
  navigationDiv.append(nav);
  navLinksDiv.append(navigationDiv);
  headerWrapper.append(navLinksDiv);

  block.replaceChildren(headerWrapper);
}
