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
      subWrap.classList.add('header-comp__sub-menus');
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.classList.add('dropdown-toggle');
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('show-nav');
          subWrap.classList.toggle('show');
        });
      }
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');
  moveInstrumentation(block, headerComp);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(containerDiv);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  containerDiv.append(nav);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(navWrapper);

  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerBtn.type = 'button';
  hamburgerBtn.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  hamburgerBtn.setAttribute('aria-label', 'Toggle navigation');
  navWrapper.append(hamburgerBtn);

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  hamburgerBtn.append(hamburgerIcon);

  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    hamburgerIcon.append(span);
  }

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  navWrapper.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  const logoHref = logoLinkRow.querySelector('a')?.href;
  if (logoHref) {
    logoLink.href = logoHref;
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoWrapper.append(logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
  }

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  navWrapper.append(navbarCollapse);

  hamburgerBtn.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerBtn.classList.toggle('collapsed');
  });

  const menuList = document.createElement('ul');
  menuList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(menuList);

  // Filter item rows based on content detection, not fixed indices
  const menuItems = itemRows.filter((row) => row.querySelector('div:nth-child(5) ul')); // Rows with hierarchy-tree
  const searchIcons = itemRows.filter((row) => !row.querySelector('div:nth-child(5) ul') && row.children.length === 2); // Rows without hierarchy-tree and 2 cells

  menuItems.forEach((row, i) => {
    const cells = [...row.children];
    const menuIconCell = cells.find((cell) => cell.querySelector('picture'));
    const menuLabelCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim());
    const menuLinkCell = cells.find((cell) => cell.querySelector('a'));
    const arrowIconCell = cells.find((cell) => cell.querySelector('picture') && cell !== menuIconCell);
    const hierarchyTreeCell = cells.find((cell) => cell.querySelector('ul'));

    const listItem = document.createElement('li');
    listItem.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0');
    if (hierarchyTreeCell && hierarchyTreeCell.querySelector('ul')) {
      listItem.classList.add('dropdown', 'show-nav', 'position-relative', 'left-division');
    }

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
    if (hierarchyTreeCell && hierarchyTreeCell.querySelector('ul')) {
      menuLinkWrapper.classList.add('dropdown-toggle');
    }
    listItem.append(menuLinkWrapper);

    if (menuIconCell) {
      const menuIconPicture = menuIconCell.querySelector('picture');
      if (menuIconPicture) {
        const img = menuIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        menuLinkWrapper.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      }
    }

    const link = document.createElement('a');
    link.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    const menuHref = menuLinkCell?.querySelector('a')?.href;
    if (menuHref) {
      link.href = menuHref;
    }
    moveInstrumentation(menuLinkCell, link);

    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = menuLabelCell?.textContent.trim() || '';
    link.append(linkSpan);
    menuLinkWrapper.append(link);

    if (hierarchyTreeCell) {
      const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
      if (hierarchyRoot) {
        const toggleDropdown = document.createElement('span');
        toggleDropdown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
        if (arrowIconCell) {
          const arrowIconPicture = arrowIconCell.querySelector('picture');
          if (arrowIconPicture) {
            const img = arrowIconPicture.querySelector('img');
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            toggleDropdown.append(optimizedPic);
          }
        }
        menuLinkWrapper.append(toggleDropdown);

        const subMenusDiv = document.createElement('div');
        subMenusDiv.classList.add('header-comp__sub-menus');
        subMenusDiv.id = `leftHeaderItem${i}`;
        subMenusDiv.setAttribute('data-id', `leftHeaderItem${i}`);

        // Create a temporary div to hold and process the innerHTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
        moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation from original cell to tempDiv

        // Apply classes from ORIGINAL HTML to nested elements
        tempDiv.querySelectorAll('ul').forEach((ul) => {
          ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
        });
        tempDiv.querySelectorAll('li').forEach((li) => {
          li.classList.add('header-comp__wrapper--sub-menu-item');
          if (li.querySelector('ul')) {
            li.classList.add('child-below');
          } else {
            li.classList.add('no-child');
          }
        });
        tempDiv.querySelectorAll('a').forEach((a) => {
          a.classList.add('text-decoration-none', 'text-dark-gray-100');
          const span = a.querySelector('span');
          if (span) {
            span.classList.add('sub-link-span');
          }
        });
        tempDiv.querySelectorAll('div.header-comp__sub-menu').forEach((div) => {
          div.classList.add('tri-parent');
        });
        tempDiv.querySelectorAll('div.header-comp__wrapper--menu-link').forEach((div) => {
          div.classList.add('mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
          if (div.querySelector('ul')) {
            div.classList.add('dropdown-toggle');
          }
        });
        tempDiv.querySelectorAll('div.header-comp__wrapper--sub-menu-link').forEach((div) => {
          div.classList.add('dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');
        });
        tempDiv.querySelectorAll('span.arrow-icon-right').forEach((span) => {
          span.classList.add('end-0', 'd-none', 'd-lg-inline');
        });
        tempDiv.querySelectorAll('span.arrow-icon').forEach((span) => {
          span.classList.add('d-lg-none', 'end-0', 'd-lg-none');
        });
        tempDiv.querySelectorAll('div.inner-childs').forEach((div) => {
          div.classList.add('d-lg-none');
        });
        tempDiv.querySelectorAll('div.borderr-section').forEach((div) => {
          div.classList.add('d-none', 'd-lg-flex', 'd-xl-flex', 'align-items-end', 'position-absolute', 'no-prod');
        });
        tempDiv.querySelectorAll('div.border-bg').forEach((div) => {
          div.classList.add('border-bg');
        });

        // Move all children from tempDiv to subMenusDiv
        while (tempDiv.firstChild) {
          subMenusDiv.append(tempDiv.firstChild);
        }

        listItem.append(subMenusDiv);

        transformNestedLists(subMenusDiv.querySelector('ul')); // Pass the actual root UL for transformation

        toggleDropdown.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          listItem.classList.toggle('show-nav');
          subMenusDiv.classList.toggle('show');
        });
      }
    }

    moveInstrumentation(row, listItem);
    menuList.append(listItem);
  });

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  containerDiv.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  searchIcons.forEach((row) => {
    const cells = [...row.children];
    const iconImageCell = cells.find((cell) => cell.querySelector('picture'));
    const iconLabelCell = cells.find((cell) => !cell.querySelector('picture') && cell.textContent.trim());

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');

    if (iconImageCell) {
      const iconPicture = iconImageCell.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        searchIconDiv.append(optimizedPic);
      }
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('d-none', 'd-lg-block');
    labelSpan.textContent = iconLabelCell?.textContent.trim() || '';
    searchIconDiv.append(labelSpan);

    moveInstrumentation(row, searchIconDiv);
    searchDiv.append(searchIconDiv);

    // Add event listener for search icon to toggle global search
    searchIconDiv.addEventListener('click', () => {
      const globalSearch = document.querySelector('.global-search');
      if (globalSearch) {
        globalSearch.classList.toggle('d-none');
      }
    });
  });

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(outerBox);

  block.replaceChildren(headerComp);

  // This block is redundant if createOptimizedPicture is used correctly initially.
  // It's usually for cases where images are added via innerHTML or not processed.
  // Keeping it for now as it was in the original, but ideally, it should not be needed.
  headerComp.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
