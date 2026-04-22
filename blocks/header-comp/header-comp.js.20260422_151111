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
      subWrap.classList.add('inner-childs'); // Use class from ORIGINAL HTML
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

  const header = document.createElement('section');
  header.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  header.append(container);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  container.append(nav);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(navWrapper);

  // Hamburger toggler
  const toggler = document.createElement('button');
  toggler.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  ['d-block', 'd-block', 'd-block'].forEach((cls) => {
    const span = document.createElement('span');
    span.classList.add(cls, 'bg-white');
    togglerIcon.append(span);
  });
  toggler.append(togglerIcon);
  navWrapper.append(toggler);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  navWrapper.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
    moveInstrumentation(logoImageRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
    logoLink.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
  }
  logoWrapper.append(logoLink);

  // Menu Wrapper
  const menuCollapse = document.createElement('div');
  menuCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  menuCollapse.id = 'navbarSupportedContent';
  navWrapper.append(menuCollapse);

  const menuList = document.createElement('ul');
  menuList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  menuCollapse.append(menuList);

  // Search and access icons
  const searchAccess = document.createElement('div');
  searchAccess.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  container.append(searchAccess);

  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('header-comp__wrapper--search');
  searchAccess.append(searchWrapper);

  const searchIconContainer = document.createElement('div');
  searchIconContainer.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  searchWrapper.append(searchIconContainer);

  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none');
  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');
  globalSearchSection.append(globalSearchWrapper);

  const globalSearchFlex = document.createElement('div');
  globalSearchFlex.classList.add('d-flex', 'justify-content-center', 'h-100');
  globalSearchWrapper.append(globalSearchFlex);

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const crossWrap = document.createElement('div');
  crossWrap.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  crossWrapDiv.append(crossWrap);
  globalSearchFlex.append(crossWrapDiv);

  const searchForm = document.createElement('div');
  searchForm.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.placeholder = 'Start typing...';
  searchForm.append(searchInput);
  globalSearchFlex.append(searchForm);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchWrap = document.createElement('div');
  searchWrap.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  searchWrapDiv.append(searchWrap);
  globalSearchFlex.append(searchWrapDiv);

  const globalSearchResponse = document.createElement('div');
  globalSearchResponse.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const globalSearchResponseInner = document.createElement('div');
  globalSearchResponseInner.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  globalSearchResponse.append(globalSearchResponseInner);
  const searchResults = document.createElement('ul');
  searchResults.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  globalSearchResponseInner.append(searchResults);

  // Separate item rows by type
  const menuItems = itemRows.filter((row) => row.children.length === 7);
  // subMenuItems have 5 cells, and the first cell is text, second is a link, third and fourth are pictures, fifth is a container
  const subMenuItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 5
      && cells[0].textContent.trim() // subMenuLabel
      && cells[1].querySelector('a') // subMenuLink
      && cells[2].querySelector('picture') // arrowIconDesktop
      && cells[3].querySelector('picture') // arrowIconMobile
      && cells[4].textContent.trim(); // subSubMenu container text
  });
  // subSubMenuItems have 2 cells, first is text, second is a link
  const subSubMenuItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2
      && cells[0].textContent.trim() // subSubMenuLabel
      && cells[1].querySelector('a'); // subSubMenuLink
  });
  const searchIconItems = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture'));

  // Process Search Icons
  searchIconItems.forEach((row) => {
    const [searchIconCell, searchLabelCell] = [...row.children];
    const searchIconPicture = searchIconCell.querySelector('picture');
    if (searchIconPicture) {
      const img = searchIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]); // Assuming a small icon size
      moveInstrumentation(searchIconCell, optimizedPic.querySelector('img'));
      searchIconContainer.append(optimizedPic);
    }
    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    searchLabelSpan.textContent = searchLabelCell.textContent.trim();
    searchIconContainer.append(searchLabelSpan);
    moveInstrumentation(row, searchIconContainer); // Move instrumentation from search icon row to its container
  });

  // Toggle search functionality
  searchIconContainer.addEventListener('click', () => {
    globalSearchSection.classList.toggle('d-none');
  });
  crossWrap.addEventListener('click', () => {
    globalSearchSection.classList.add('d-none');
  });

  // Process Main Menu Items
  menuItems.forEach((row) => {
    const [
      menuIconCell,
      menuLabelCell,
      menuLinkCell,
      arrowIconDesktopCell,
      arrowIconMobileCell,
      _subMenuContainerCell, // This is a container field, its items are separate rows
      hierarchyTreeCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'dropdown', 'flex-column', 'border-lg-0', 'position-relative'); // Add show-nav and division classes later if needed
    moveInstrumentation(row, li);

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100'); // Add dropdown-toggle later if it has submenus

    const menuIconPicture = menuIconCell.querySelector('picture');
    if (menuIconPicture) {
      const img = menuIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
      menuLinkWrapper.append(optimizedPic);
      menuLinkWrapper.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');
    const foundMenuLink = menuLinkCell.querySelector('a');
    if (foundMenuLink) {
      anchor.href = foundMenuLink.href;
    }
    const spanLink = document.createElement('span');
    spanLink.classList.add('link-span');
    spanLink.textContent = menuLabelCell.textContent.trim();
    anchor.append(spanLink);
    menuLinkWrapper.append(anchor);

    const hierarchyRootTemp = document.createElement('div');
    hierarchyRootTemp.innerHTML = hierarchyTreeCell.innerHTML;
    const hierarchyRoot = hierarchyRootTemp.querySelector('ul');

    if (hierarchyRoot) {
      li.classList.add('dropdown', 'show-nav', 'left-division'); // Add dropdown specific classes
      menuLinkWrapper.classList.add('dropdown-toggle');
      menuLinkWrapper.setAttribute('aria-expanded', 'false');

      const toggleDropdown = document.createElement('span');
      toggleDropdown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowIconDesktop = arrowIconDesktopCell.querySelector('picture');
      if (arrowIconDesktop) {
        const img = arrowIconDesktop.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '16' }]);
        toggleDropdown.append(optimizedPic);
        toggleDropdown.querySelector('img').alt = img.alt;
      }
      menuLinkWrapper.append(toggleDropdown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      const subMenuGroup = document.createElement('ul');
      subMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      const subMenuTriParent = document.createElement('div');
      subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
      subMenuGroup.append(subMenuTriParent);

      // Move instrumentation from the original hierarchy-tree cell to the new structure
      moveInstrumentation(hierarchyTreeCell, subMenusDiv);

      // Process hierarchy-tree for sub-menus
      [...hierarchyRoot.querySelectorAll(':scope > li')].forEach((rootLi) => {
        const subLi = document.createElement('li');
        subLi.classList.add('header-comp__wrapper--sub-menu-item');
        const rootAnchor = rootLi.querySelector(':scope > a');
        const rootSpan = rootLi.querySelector(':scope > span'); // For label-only nodes

        const subMenuLinkWrapper = document.createElement('div');
        subMenuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');

        const subMenuAnchorWrapper = document.createElement('div');
        subMenuAnchorWrapper.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

        const subLink = document.createElement('a');
        subLink.classList.add('text-decoration-none', 'text-dark-gray-100');
        if (rootAnchor) {
          subLink.href = rootAnchor.href;
          subLink.textContent = rootAnchor.textContent.trim();
        } else if (rootSpan) {
          subLink.textContent = rootSpan.textContent.trim();
        } else {
          subLink.textContent = [...rootLi.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())?.textContent.trim() || '';
        }
        subMenuAnchorWrapper.append(subLink);

        const nestedUl = rootLi.querySelector(':scope > ul');
        if (nestedUl) {
          subLi.classList.add('child-below');
          subMenuLinkWrapper.classList.add('dropdown-toggle');
          subMenuLinkWrapper.setAttribute('aria-expanded', 'false');

          const arrowIconRight = document.createElement('span');
          arrowIconRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
          const desktopArrow = arrowIconDesktopCell.querySelector('picture');
          if (desktopArrow) {
            const img = desktopArrow.querySelector('img');
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '16' }]);
            arrowIconRight.append(optimizedPic);
            arrowIconRight.querySelector('img').alt = img.alt;
          }
          subMenuAnchorWrapper.append(arrowIconRight);

          const mobileArrow = document.createElement('span');
          mobileArrow.classList.add('arrow-icon', 'd-lg-none', 'end-0', 'd-lg-none');
          const mobileArrowPic = arrowIconMobileCell.querySelector('picture');
          if (mobileArrowPic) {
            const img = mobileArrowPic.querySelector('img');
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '16' }]);
            mobileArrow.append(optimizedPic);
            mobileArrow.querySelector('img').alt = img.alt;
          }
          subMenuLinkWrapper.append(mobileArrow);

          const innerChildsDiv = document.createElement('div');
          innerChildsDiv.classList.add('d-lg-none', 'inner-childs');
          const innerChildsUl = document.createElement('ul');
          innerChildsUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
          const innerChildsTriParent = document.createElement('div');
          innerChildsTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
          innerChildsUl.append(innerChildsTriParent);

          [...nestedUl.querySelectorAll('li')].forEach((subNestedLi) => {
            const subSubLi = document.createElement('li');
            subSubLi.classList.add('header-comp__wrapper--sub-menu-item', 'no-child');
            const subNestedLinkWrapper = document.createElement('div');
            subNestedLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
            const subNestedAnchorWrapper = document.createElement('div');
            subNestedAnchorWrapper.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

            const subNestedLink = document.createElement('a');
            subNestedLink.classList.add('text-decoration-none', 'text-dark-gray-100');
            const foundSubNestedLink = subNestedLi.querySelector('a');
            if (foundSubNestedLink) {
              subNestedLink.href = foundSubNestedLink.href;
              subNestedLink.textContent = foundSubNestedLink.textContent.trim();
            } else {
              subNestedLink.textContent = subNestedLi.textContent.trim();
            }
            subNestedAnchorWrapper.append(subNestedLink);
            subNestedLinkWrapper.append(subNestedAnchorWrapper);
            subSubLi.append(subNestedLinkWrapper);
            innerChildsTriParent.append(subSubLi);
          });

          innerChildsDiv.append(innerChildsUl);
          subLi.append(innerChildsDiv);

          mobileArrow.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            subLi.classList.toggle('active');
            innerChildsDiv.classList.toggle('active');
          });
        } else {
          subLi.classList.add('no-child');
        }

        subMenuLinkWrapper.append(subMenuAnchorWrapper);
        subLi.append(subMenuLinkWrapper);
        subMenuTriParent.append(subLi);
      });

      subMenusDiv.append(subMenuGroup);
      li.append(subMenusDiv);

      toggleDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        subMenusDiv.classList.toggle('active');
      });
    } else {
      li.classList.add('right-division'); // For menu items without submenus
    }

    li.prepend(menuLinkWrapper);
    menuList.append(li);
  });

  // Append global search section to the body or a suitable container
  const globalDiv = document.createElement('div');
  globalDiv.classList.add('global');
  globalDiv.append(globalSearchSection);

  const headerOuterBox = document.createElement('div');
  headerOuterBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  container.append(headerOuterBox);

  // Toggle mobile menu
  toggler.addEventListener('click', () => {
    menuCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
    headerOuterBox.classList.toggle('d-lg-none'); // Hide/show overlay
  });

  block.replaceChildren(header, globalDiv);
}
