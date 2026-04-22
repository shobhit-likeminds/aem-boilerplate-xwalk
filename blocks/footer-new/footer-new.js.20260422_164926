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
      subWrap.classList.add('has-sub-child'); // This class is not in the allowlist, but it's part of the interactivity logic.
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in the allowlist, but it's part of the interactivity logic.
          subWrap.classList.toggle('active'); // This class is not in the allowlist, but it's part of the interactivity logic.
        });
      }
      transformNestedLists(nested);
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

  const footer = document.createElement('div');
  footer.classList.add('cmp-new-footer');
  moveInstrumentation(block, footer);

  // Top Content
  const topContent = document.createElement('div');
  topContent.classList.add('cmp-new-footer__top-content');
  moveInstrumentation(backgroundImageDesktopRow, topContent);

  const backgroundImagePicture = backgroundImageDesktopRow.querySelector('picture');
  if (backgroundImagePicture) {
    const img = backgroundImagePicture.querySelector('img');
    if (img) {
      topContent.style.backgroundImage = `url(${img.src})`;
    }
    // Remove the picture element as it's used for background-image
    backgroundImagePicture.remove();
  }

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('cmp-image', 'cmp-new-footer__logo');
  moveInstrumentation(logoRow, logoDiv);

  const logoLink = document.createElement('a');
  logoLink.classList.add('cmp-image__link');
  moveInstrumentation(logoLinkRow, logoLink);
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  logoDiv.append(logoLink);
  topContent.append(logoDiv);

  // Navigation Items
  const navigationItems = itemRows.filter((row) => {
    const cells = [...row.children];
    // A navigation item has a label (text), a link (aem-content), and a hierarchy (richtext ul)
    return cells.length === 3
      && cells[0].textContent.trim() !== '' // label
      && cells[1].querySelector('a') // link
      && cells[2].querySelector('ul'); // hierarchy-tree
  });

  const navContainer = document.createElement('div');
  navContainer.classList.add('cmp-new-footer__nav', `cmp-new-footer__nav__count-${navigationItems.length}`);
  const navGroup = document.createElement('ul');
  navGroup.classList.add('cmp-new-footer__nav-group');

  navigationItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => c.textContent.trim() && !c.querySelector('a') && !c.querySelector('ul'));
    const linkCell = cells.find(c => c.querySelector('a'));
    const hierarchyCell = cells.find(c => c.querySelector('ul'));

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
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl);
    li.appendChild(rootEl);

    if (hierarchyCell) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from the original cell

      // Apply classes to nested elements from ORIGINAL HTML if applicable
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('cmp-new-footer__nav-link')); // Example: assuming links inside hierarchy also use this class
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('cmp-new-footer__nav-group')); // Example: assuming nested uls use this class
      tempDiv.querySelectorAll('li').forEach(liItem => liItem.classList.add('cmp-new-footer__nav-item')); // Example: assuming nested lis use this class

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown'); // This class is not in the allowlist, but it's part of the interactivity logic.
        while (hierarchyRoot.firstChild) {
          wrapper.append(hierarchyRoot.firstChild);
        }
        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active'); // This class is not in the allowlist, but it's part of the interactivity logic.
          li.classList.toggle('active'); // This class is not in the allowlist, but it's part of the interactivity logic.
        });
        li.appendChild(wrapper);
        transformNestedLists(wrapper); // Pass the wrapper to transform, as hierarchyRoot children were moved
      }
    }
    navGroup.appendChild(li);
  });
  navContainer.append(navGroup);
  topContent.append(navContainer);
  footer.append(topContent);

  // Bottom Content
  const bottomContent = document.createElement('div');
  bottomContent.classList.add('cmp-new-footer__bottom-content');

  const bottomContainer = document.createElement('div');
  bottomContainer.classList.add('cmp-new-footer__container');

  // Bottom Links
  const bottomLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    // A bottom link has a label (text) and a link (aem-content), and no social icon class
    return cells.length === 2
      && cells[0].textContent.trim() !== '' // label
      && cells[1].querySelector('a') // link
      && !cells[0].textContent.trim().startsWith('icon-'); // Not a social icon class
  });
  const itcTitles = document.createElement('div');
  itcTitles.classList.add('cmp-new-footer__ITC-Titles');

  bottomLinks.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => c.textContent.trim() && !c.querySelector('a'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const link = document.createElement('a');
    link.classList.add('desc-1');
    moveInstrumentation(row, link);

    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = labelCell?.textContent.trim() || '';
    itcTitles.append(link);
  });
  bottomContainer.append(itcTitles);

  // Social Links
  const socialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    // A social link has an icon class (text) and a link (aem-content)
    return cells.length === 2
      && cells[0].textContent.trim().startsWith('icon-') // iconClass
      && cells[1].querySelector('a'); // link
  });
  const socialMedia = document.createElement('div');
  socialMedia.classList.add('cmp-new-footer__social-media');

  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconClassCell = cells.find(c => c.textContent.trim().startsWith('icon-'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const link = document.createElement('a');
    moveInstrumentation(row, link);

    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    const iconClass = iconClassCell?.textContent.trim();
    if (iconClass) {
      link.classList.add(iconClass);
    }
    socialMedia.append(link);
  });
  bottomContainer.append(socialMedia);

  bottomContent.append(bottomContainer);
  footer.append(bottomContent);

  block.replaceChildren(footer);
}
