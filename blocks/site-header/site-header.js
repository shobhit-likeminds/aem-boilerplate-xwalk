import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Apply classes from ORIGINAL HTML to <li>
    li.classList.add('header-comp__wrapper--sub-menu-item');

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
    } else {
      // Apply classes from ORIGINAL HTML to <a> inside <li>
      anchor.classList.add('text-decoration-none', 'text-dark-gray-100');
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('header-comp__sub-menus'); // Use class from original HTML
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        li.classList.add('dropdown'); // Add dropdown class for parent li
        trigger.classList.add('dropdown-toggle'); // Add dropdown-toggle class for trigger
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('show-nav'); // Use show-nav for active state
          subWrap.classList.toggle('show-nav'); // Use show-nav for active state
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

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(container);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  container.append(nav);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(navWrapper);

  // Hamburger button
  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');
  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  hamburgerIcon.innerHTML = `
    <span class="d-block bg-white"></span>
    <span class="d-block bg-white"></span>
    <span class="d-block bg-white"></span>
  `;
  hamburgerButton.append(hamburgerIcon);
  navWrapper.append(hamburgerButton);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoImg = logoImageRow.querySelector('picture');
  if (logoImg) {
    const optimizedPic = createOptimizedPicture(logoImg.querySelector('img').src, logoImg.querySelector('img').alt, false, [{ width: '750' }]);
    moveInstrumentation(logoImg, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
    optimizedPic.classList.add('header-comp__wrapper--image', 'h-100');
  }
  moveInstrumentation(logoImageRow, logoWrapper);
  logoWrapper.append(logoLink);
  navWrapper.append(logoWrapper);

  // Navigation menus
  const navMenus = document.createElement('div');
  navMenus.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navMenus.id = 'navbarSupportedContent';
  navWrapper.append(navMenus);

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navMenus.append(navList);

  const searchIconsContainer = document.createElement('div');
  searchIconsContainer.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  container.append(searchIconsContainer);

  const searchIconWrapper = document.createElement('div');
  searchIconWrapper.classList.add('header-comp__wrapper--search');
  searchIconsContainer.append(searchIconWrapper);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  searchIconWrapper.append(searchIconDiv);

  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none');
  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');
  globalSearchSection.append(globalSearchWrapper);

  const searchFormDiv = document.createElement('div');
  searchFormDiv.classList.add('d-flex', 'justify-content-center', 'h-100');
  globalSearchWrapper.append(searchFormDiv);

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const crossWrapInner = document.createElement('div');
  crossWrapInner.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  crossWrapDiv.append(crossWrapInner);
  searchFormDiv.append(crossWrapDiv);

  const searchForm = document.createElement('div');
  searchForm.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.placeholder = 'Start typing...';
  searchForm.append(searchInput);
  searchFormDiv.append(searchForm);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchWrapInner = document.createElement('div');
  searchWrapInner.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  searchWrapDiv.append(searchWrapInner);
  searchFormDiv.append(searchWrapDiv);

  const searchResponseDiv = document.createElement('div');
  searchResponseDiv.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const searchResponseInner = document.createElement('div');
  searchResponseInner.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  const searchResultsUl = document.createElement('ul');
  searchResultsUl.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  searchResponseInner.append(searchResultsUl);
  searchResponseDiv.append(searchResponseInner);
  headerComp.append(globalSearchSection);
  headerComp.append(searchResponseDiv);

  const headerOuterBox = document.createElement('div');
  headerOuterBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(headerOuterBox);

  const navigationItems = itemRows.filter((row) => row.children.length === 7);
  const searchIcons = itemRows.filter((row) => row.children.length === 2);

  navigationItems.forEach((row) => {
    const [menuIconCell, labelCell, linkCell, arrowIconDesktopCell, arrowIconMobileCell, subNavigationItemsCell, hierarchyTreeCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0', 'position-relative');
    moveInstrumentation(row, li);

    const menuLinkDiv = document.createElement('div');
    menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

    const menuIcon = menuIconCell.querySelector('picture');
    if (menuIcon) {
      const optimizedPic = createOptimizedPicture(menuIcon.querySelector('img').src, menuIcon.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(menuIcon, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkDiv.append(optimizedPic);
    }

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    linkAnchor.setAttribute('data-link-region', 'Header');
    linkAnchor.href = linkCell.querySelector('a')?.href || '#';
    moveInstrumentation(linkCell, linkAnchor);

    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = labelCell.textContent.trim();
    linkAnchor.append(linkSpan);
    menuLinkDiv.append(linkAnchor);

    const hierarchyRootUl = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRootUl) {
      li.classList.add('dropdown', 'left-division');
      menuLinkDiv.classList.add('dropdown-toggle');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowIconDesktop = arrowIconDesktopCell.querySelector('picture');
      if (arrowIconDesktop) {
        const optimizedPic = createOptimizedPicture(arrowIconDesktop.querySelector('img').src, arrowIconDesktop.querySelector('img').alt, false, [{ width: '750' }]);
        moveInstrumentation(arrowIconDesktop, optimizedPic.querySelector('img'));
        toggleDropDown.append(optimizedPic);
      }
      menuLinkDiv.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');

      // Create a temporary div to parse the richtext HTML and apply classes
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
      moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation from the original cell

      // Apply classes to the root ul and its children
      const rootUl = tempDiv.querySelector('ul');
      if (rootUl) {
        rootUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
        rootUl.querySelectorAll('li').forEach(itemLi => {
          itemLi.classList.add('header-comp__wrapper--sub-menu-item');
          const itemAnchor = itemLi.querySelector('a');
          if (itemAnchor) {
            itemAnchor.classList.add('text-decoration-none', 'text-dark-gray-100');
            const span = document.createElement('span');
            span.classList.add('sub-link-span');
            span.textContent = itemAnchor.textContent.trim();
            itemAnchor.replaceChildren(span);
          }
        });
        transformNestedLists(rootUl); // Apply recursive transformation and classes
        subMenusDiv.append(rootUl);
      }
      li.append(subMenusDiv);

      toggleDropDown.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show-nav');
        subMenusDiv.classList.toggle('show-nav');
      });
    }

    li.append(menuLinkDiv);
    navList.append(li);
  });

  searchIcons.forEach((row) => {
    const [iconCell, labelCell] = [...row.children];
    const searchIconImg = iconCell.querySelector('picture');
    if (searchIconImg) {
      const optimizedPic = createOptimizedPicture(searchIconImg.querySelector('img').src, searchIconImg.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(searchIconImg, optimizedPic.querySelector('img'));
      searchIconDiv.append(optimizedPic);
    }
    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    searchLabelSpan.textContent = labelCell.textContent.trim();
    searchIconDiv.append(searchLabelSpan);
    moveInstrumentation(row, searchIconDiv);
  });

  // Event listeners for interactive elements
  hamburgerButton.addEventListener('click', () => {
    navMenus.classList.toggle('collapse');
    navMenus.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  searchIconDiv.addEventListener('click', () => {
    globalSearchSection.classList.toggle('d-none');
  });

  crossWrapInner.addEventListener('click', () => {
    globalSearchSection.classList.add('d-none');
  });

  searchWrapInner.addEventListener('click', () => {
    // Implement search functionality here if needed
  });

  block.replaceChildren(headerComp);
}
