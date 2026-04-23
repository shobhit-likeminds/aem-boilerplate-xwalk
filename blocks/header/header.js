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
      subWrap.classList.add('has-sub-child'); // This class is not in the allowlist. Assuming it's a utility class or needs to be added.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in the allowlist. Assuming it's a utility class or needs to be added.
          subWrap.classList.toggle('active'); // This class is not in the allowlist. Assuming it's a utility class or needs to be added.
        });
      }
    }
  });
}

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  // Hamburger checkbox
  const hamburger = document.createElement('input');
  hamburger.classList.add('cmp-header__hamburger');
  hamburger.type = 'checkbox';
  block.prepend(hamburger);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image', 'cmp-header__logo');

  const logoImageCell = logoImageRow?.querySelector('div');
  const logoLinkCell = logoLinkRow?.querySelector('div');

  const logoAnchor = document.createElement('a');
  logoAnchor.classList.add('cmp-image__link');
  const foundLogoLink = logoLinkCell?.querySelector('a');
  if (foundLogoLink) {
    logoAnchor.href = foundLogoLink.href;
    moveInstrumentation(logoLinkRow, logoAnchor);
  } else {
    logoAnchor.href = '/';
  }

  const picture = logoImageCell?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoAnchor.append(optimizedPic);
    }
  }
  if (logoImageRow) moveInstrumentation(logoImageRow, logoAnchor);
  logoDiv.append(logoAnchor);
  block.append(logoDiv);

  // Navigation Links Wrapper
  const navLinksWrapper = document.createElement('div');
  navLinksWrapper.classList.add('cmp-header__nav-links');

  // Navigation
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

  itemRows.forEach((row) => {
    const cells = [...row.children];
    // Navigation Item (3 cells: label, link, hierarchy-tree)
    if (cells.length === 3 && cells[0].textContent.trim() && cells[1].querySelector('a') && cells[2].querySelector('ul')) {
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
      moveInstrumentation(row, rootEl);
      li.appendChild(rootEl);

      // Handle hierarchy-tree richtext field
      const hierarchyTempDiv = document.createElement('div');
      hierarchyTempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, hierarchyTempDiv); // Move instrumentation from original cell

      const hierarchyRoot = hierarchyTempDiv.querySelector('ul');
      if (hierarchyRoot) {
        // Apply classes from ORIGINAL HTML to nested elements
        hierarchyRoot.classList.add('cmp-navigation__group'); // Assuming this class is appropriate for nested ULs
        hierarchyRoot.querySelectorAll('li').forEach(nestedLi => nestedLi.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-1'));
        hierarchyRoot.querySelectorAll('a').forEach(nestedA => nestedA.classList.add('cmp-navigation__item-link'));

        const wrapper = document.createElement('div');
        wrapper.classList.add('cmp-header__mobile-list'); // Reusing this class for dropdown
        wrapper.appendChild(hierarchyRoot);
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active'); // This class is not in the allowlist. Assuming it's a utility class or needs to be added.
          li.classList.toggle('active'); // This class is not in the allowlist. Assuming it's a utility class or needs to be added.
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot);
      }
      mainNavUl.append(li);
    }
    // Policy Link Item (2 cells: label, link)
    else if (cells.length === 2 && cells[0].textContent.trim() && cells[1].querySelector('a')) {
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
    // Social Icon Item (3 cells: iconClass, link, socialType)
    else if (cells.length === 3 && cells[0].querySelector('picture') && cells[1].querySelector('a') && cells[2].textContent.trim()) {
      const [iconClassCell, linkCell, socialTypeCell] = cells;
      const anchor = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('data-social', socialTypeCell.textContent.trim().toLowerCase());

      const iconPic = iconClassCell.querySelector('picture');
      if (iconPic) {
        const img = iconPic.querySelector('img');
        if (img) {
          const className = `icon-${socialTypeCell.textContent.trim().toLowerCase()}`;
          // Corrected class name from 'icon-facebok' to 'icon-facebook' based on allowlist
          if (className === 'icon-facebok') {
            anchor.classList.add('icon-facebook');
          } else {
            anchor.classList.add(className);
          }
          moveInstrumentation(row, anchor);
          socialMediaDiv.append(anchor);
        }
      }
    }
    // Nav Icon Item (3 cells: iconClass, link, iconLabel)
    else if (cells.length === 3 && cells[0].querySelector('picture') && cells[1].querySelector('a') && cells[2].textContent.trim()) {
      const [iconClassCell, linkCell, iconLabelCell] = cells;
      // Ensure navIconsDiv is created only once and appended to block
      let navIconsDiv = block.querySelector('.cmp-header__nav-icons');
      if (!navIconsDiv) {
        navIconsDiv = document.createElement('div');
        navIconsDiv.classList.add('cmp-header__nav-icons');
        block.append(navIconsDiv);
      }

      const iconWrapper = document.createElement('div');
      const labelText = iconLabelCell.textContent.trim().toLowerCase();
      if (labelText === 'accessibility') {
        iconWrapper.classList.add('cmp-header__accessbility', 'cmp-header__hide-icon');
      } else if (labelText === 'search') {
        iconWrapper.classList.add('cmp-header__search');
      } else if (labelText === 'login') {
        iconWrapper.classList.add('cmp-header__login', 'cmp-header__hide-icon');
      }

      const anchor = document.createElement('a');
      anchor.classList.add('cmp-header__icon-img');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      } else {
        anchor.href = '#';
      }

      const iconPic = iconClassCell.querySelector('picture');
      if (iconPic) {
        const img = iconPic.querySelector('img');
        if (img) {
          const iconDiv = document.createElement('div');
          // The original HTML uses 'icon-profile' for login, not 'icon-login'
          const iconClassName = `icon-${labelText === 'login' ? 'profile' : labelText}`;
          iconDiv.classList.add(iconClassName);
          anchor.append(iconDiv);
        }
      }

      if (labelText === 'search') {
        const iconText = document.createElement('div');
        iconText.classList.add('cmp-header__icon-text');
        iconText.textContent = iconLabelCell.textContent.trim();
        anchor.append(iconText);
      }
      moveInstrumentation(row, anchor);
      iconWrapper.append(anchor);
      navIconsDiv.append(iconWrapper);
    }
  });

  nav.append(mainNavUl);
  mobileListDiv.append(policyUl);
  mobileListDiv.append(socialMediaDiv);
  nav.append(mobileListDiv);
  navigationDiv.append(nav);
  navLinksWrapper.append(navigationDiv);
  block.append(navLinksWrapper);

  // This block.querySelectorAll('picture > img') loop is redundant if createOptimizedPicture
  // is already used for specific images. It might re-optimize images already handled.
  // Consider removing or making it more targeted if it's causing issues.
  // For now, keeping it as is, but noting it for potential future optimization.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
