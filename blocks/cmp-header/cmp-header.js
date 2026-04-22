import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.classList.add('cmp-navigation__group', 'cmp-navigation__group--level-1'); // Add classes from original HTML if applicable
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-1'); // Add classes from original HTML if applicable
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      anchor.classList.add('cmp-navigation__item-link'); // Add classes from original HTML if applicable
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        span.classList.add('cmp-navigation__item-link'); // Add classes from original HTML if applicable
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('nav-dropdown'); // Class from ORIGINAL HTML
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

  const header = document.createElement('div');
  header.classList.add('cmp-header');

  const hamburgerInput = document.createElement('input');
  hamburgerInput.classList.add('cmp-header__hamburger');
  hamburgerInput.type = 'checkbox';
  header.append(hamburgerInput);

  // Logo Image and Link
  // Use destructuring for the first two rows as per BlockJson
  const [logoImageRow, logoLinkRow, ...itemRows] = children;

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image', 'cmp-header__logo');
  moveInstrumentation(logoImageRow, logoDiv);

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
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      // moveInstrumentation should be on the new img element, not the original img
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  logoDiv.append(logoLink);
  header.append(logoDiv);

  const navLinksDiv = document.createElement('div');
  navLinksDiv.classList.add('cmp-header__nav-links');

  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('navigation');

  const nav = document.createElement('nav');
  nav.classList.add('cmp-navigation');
  nav.setAttribute('role', 'navigation');

  const mainNavUl = document.createElement('ul');
  mainNavUl.classList.add('cmp-navigation__group', 'cmp-header__nav-group');

  const mobileListDiv = document.createElement('div');
  mobileListDiv.classList.add('cmp-header__mobile-list');

  const policyUl = document.createElement('ul');
  policyUl.classList.add('cmp-header__policy');

  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.classList.add('cmp-header__social-media');

  // Process item rows (all rows after logoImage and logoLink)
  itemRows.forEach((row) => {
    const cells = [...row.children];

    // Navigation Menu Items (3 cells: label, link, hierarchy-tree)
    // Check for 3 cells and the presence of a <ul> in the third cell for hierarchy-tree
    if (cells.length === 3 && cells[2].querySelector('ul')) {
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
        rootEl = document.createElement('span'); // Use span if no link, as per transformNestedLists
        rootEl.classList.add('cmp-navigation__item-link'); // Apply link class for consistent styling
      }
      rootEl.textContent = labelCell.textContent.trim();
      moveInstrumentation(row, rootEl);
      li.appendChild(rootEl);

      const hierarchyRoot = hierarchyCell.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown'); // Class from ORIGINAL HTML
        // Move instrumentation from the original cell to the new wrapper
        moveInstrumentation(hierarchyCell, wrapper);
        // Use innerHTML to preserve the nested structure
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        const ulToTransform = tempDiv.querySelector('ul');
        if (ulToTransform) {
          transformNestedLists(ulToTransform);
          while (ulToTransform.firstChild) {
            wrapper.append(ulToTransform.firstChild);
          }
        }
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
      }
      mainNavUl.append(li);
    }
    // Policy Link Items (2 cells: label, link)
    // Check for 2 cells, and ensure no picture in either cell to distinguish from icon links
    else if (cells.length === 2 && !cells[0].querySelector('picture') && !cells[1].querySelector('picture')) {
      const [labelCell, linkCell] = cells;
      const li = document.createElement('li');
      li.classList.add('cmp-header__policy-list');

      const anchor = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
      anchor.textContent = labelCell.textContent.trim();
      moveInstrumentation(row, anchor);
      li.append(anchor);
      policyUl.append(li);
    }
    // Social Link Items (2 cells: platform, link)
    // Check for 2 cells, no picture, and content that indicates a social platform
    else if (cells.length === 2 && !cells[0].querySelector('picture') && !cells[1].querySelector('picture') && cells[0].textContent.trim()) {
      const [platformCell, linkCell] = cells;
      const anchor = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
      const platform = platformCell.textContent.trim().toLowerCase();
      anchor.setAttribute('data-social', platform);
      // Corrected class names from ORIGINAL HTML
      if (platform === 'instagram') anchor.classList.add('icon-instagram');
      else if (platform === 'facebook') anchor.classList.add('icon-facebok'); // Typo in original HTML: facebok
      else if (platform === 'twitter') anchor.classList.add('icon-twitter');
      else if (platform === 'youtube') anchor.classList.add('icon-youtube');
      else anchor.classList.add(`icon-${platform}`); // Fallback for other platforms
      moveInstrumentation(row, anchor);
      socialMediaDiv.append(anchor);
    }
    // Icon Link Items (3 cells: icon, link, label)
    // Check for 3 cells and the presence of a picture in the first cell
    else if (cells.length === 3 && cells[0].querySelector('picture')) {
      const [iconCell, linkCell, labelCell] = cells;
      const iconLinkDiv = document.createElement('div');
      iconLinkDiv.classList.add('cmp-header__accessbility', 'cmp-header__hide-icon'); // Classes from ORIGINAL HTML

      const anchor = document.createElement('a');
      anchor.classList.add('cmp-header__icon-img');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }

      const pictureElement = iconCell.querySelector('picture');
      if (pictureElement) {
        const img = pictureElement.querySelector('img');
        if (img) {
          const iconDiv = document.createElement('div');
          // Use alt text for icon class, as per ORIGINAL HTML pattern (e.g., icon-accessibility)
          iconDiv.classList.add(`icon-${img.alt.toLowerCase().replace(/\s/g, '-')}`);
          anchor.append(iconDiv);
        }
      }

      const labelText = labelCell.textContent.trim();
      if (labelText) {
        const textDiv = document.createElement('div');
        textDiv.classList.add('cmp-header__icon-text');
        textDiv.textContent = labelText;
        anchor.append(textDiv);
      }
      moveInstrumentation(row, anchor);
      iconLinkDiv.append(anchor);

      // Append to the nav icons container
      let navIconsDiv = header.querySelector('.cmp-header__nav-icons');
      if (!navIconsDiv) {
        navIconsDiv = document.createElement('div');
        navIconsDiv.classList.add('cmp-header__nav-icons');
        header.append(navIconsDiv);
      }
      navIconsDiv.append(iconLinkDiv);
    }
  });

  nav.append(mainNavUl);
  mobileListDiv.append(policyUl);
  mobileListDiv.append(socialMediaDiv);
  nav.append(mobileListDiv);
  navigationDiv.append(nav);
  navLinksDiv.append(navigationDiv);
  header.append(navLinksDiv);

  block.replaceChildren(header);
}
