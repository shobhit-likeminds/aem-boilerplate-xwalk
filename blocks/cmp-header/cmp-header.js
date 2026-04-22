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
      subWrap.classList.add('cmp-header__mobile-list'); // Using a class from the original HTML that implies a nested list
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

  const [logoImageRow, logoLinkRow, ...itemRows] = children;

  const header = document.createElement('header');
  header.classList.add('cmp-header');
  moveInstrumentation(block, header);

  const hamburgerInput = document.createElement('input');
  hamburgerInput.classList.add('cmp-header__hamburger');
  hamburgerInput.type = 'checkbox';
  header.append(hamburgerInput);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image', 'cmp-header__logo');

  const logoLink = document.createElement('a');
  logoLink.classList.add('cmp-image__link');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const picture = logoImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoImageRow, logoDiv);
  logoDiv.append(logoLink);
  header.append(logoDiv);

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

  const policyNav = document.createElement('ul');
  policyNav.classList.add('cmp-header__policy');

  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.classList.add('cmp-header__social-media');

  const navIconsDiv = document.createElement('div');
  navIconsDiv.classList.add('cmp-header__nav-icons');

  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 3 && cells[0].textContent.trim() && cells[1].querySelector('a') && cells[2].querySelector('ul')) {
      // Navigation Item
      const [labelCell, linkCell, hierarchyCell] = cells;
      const li = document.createElement('li');
      li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0', 'cmp-header__nav-products');

      const foundLink = linkCell.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
        rootEl.classList.add('cmp-navigation__item-link');
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, rootEl); // Move instrumentation from label cell
      moveInstrumentation(linkCell, rootEl); // Move instrumentation from link cell
      li.appendChild(rootEl);

      // Handle hierarchy-tree richtext field
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Use innerHTML to preserve nested structure

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        // Apply classes from ORIGINAL HTML to nested elements
        hierarchyRoot.classList.add('cmp-navigation__group'); // Example class, adjust as needed
        hierarchyRoot.querySelectorAll('li').forEach(nestedLi => {
          nestedLi.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-1'); // Example classes
        });
        hierarchyRoot.querySelectorAll('a').forEach(nestedA => {
          nestedA.classList.add('cmp-navigation__item-link'); // Example class
        });

        const wrapper = document.createElement('div');
        wrapper.classList.add('cmp-header__mobile-list'); // Use an existing class for nested lists
        
        // Move instrumentation from the hierarchy cell to the wrapper
        moveInstrumentation(hierarchyCell, wrapper);
        
        // Move all children from tempDiv to wrapper
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
        transformNestedLists(hierarchyRoot); // Apply transformation to the moved hierarchy
      }
      moveInstrumentation(row, li); // Move instrumentation from the row to the new li
      navGroup.appendChild(li);
    } else if (cells.length === 2 && cells[0].textContent.trim() && cells[1].querySelector('a')) {
      // Policy Link Item or Social Link Item
      const [labelOrTypeCell, linkCell] = cells;
      const foundLink = linkCell.querySelector('a');
      const linkText = labelOrTypeCell.textContent.trim();

      if (linkText.includes('Social Media Type')) { // Heuristic to distinguish social links
        const socialLink = document.createElement('a');
        // Corrected class name: icon-facebok -> icon-facebook
        socialLink.classList.add(`icon-${linkText.toLowerCase().replace('social media type', '').trim().replace(/\s/g, '-')}`); 
        if (foundLink) {
          socialLink.href = foundLink.href;
        }
        moveInstrumentation(row, socialLink);
        socialMediaDiv.append(socialLink);
      } else {
        const li = document.createElement('li');
        li.classList.add('cmp-header__policy-list');
        const policyLink = document.createElement('a');
        if (foundLink) {
          policyLink.href = foundLink.href;
        }
        policyLink.textContent = linkText;
        moveInstrumentation(row, li);
        li.append(policyLink);
        policyNav.append(li);
      }
    } else if (cells.length === 3 && cells[0].textContent.trim() && cells[1].querySelector('a') && cells[2].textContent.trim()) {
      // Header Icon Item
      const [iconTypeCell, iconLinkCell, iconLabelCell] = cells;
      const iconType = iconTypeCell.textContent.trim().toLowerCase().replace(/\s/g, '-');
      const iconLabel = iconLabelCell.textContent.trim();
      const foundIconLink = iconLinkCell.querySelector('a');

      const iconWrapper = document.createElement('div');
      iconWrapper.classList.add(`cmp-header__${iconType}`);
      if (iconType === 'accessibility' || iconType === 'login') {
        iconWrapper.classList.add('cmp-header__hide-icon');
      }

      const iconAnchor = document.createElement('a');
      iconAnchor.classList.add('cmp-header__icon-img');
      if (foundIconLink) {
        iconAnchor.href = foundIconLink.href;
      }

      const iconDiv = document.createElement('div');
      iconDiv.classList.add(`icon-${iconType}`);
      iconAnchor.append(iconDiv);

      if (iconLabel) {
        const iconTextDiv = document.createElement('div');
        iconTextDiv.classList.add('cmp-header__icon-text');
        iconTextDiv.textContent = iconLabel;
        iconAnchor.append(iconTextDiv);
      }
      moveInstrumentation(row, iconWrapper);
      iconWrapper.append(iconAnchor);
      navIconsDiv.append(iconWrapper);
    }
  });

  nav.append(navGroup);
  mobileListDiv.append(policyNav);
  mobileListDiv.append(socialMediaDiv);
  nav.append(mobileListDiv);
  navigationDiv.append(nav);
  navLinksDiv.append(navigationDiv);
  header.append(navLinksDiv);
  header.append(navIconsDiv);

  block.replaceChildren(header);
}
