import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
    const anchor = li.querySelector(':scope > a');
    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
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
      subWrap.classList.add('inner-childs'); // use ORIGINAL HTML class
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

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    hamburgerIcon.append(span);
  }
  hamburgerButton.append(hamburgerIcon);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');

  const logoImg = logoImageRow.querySelector('picture');
  if (logoImg) {
    const optimizedLogoPic = createOptimizedPicture(logoImg.querySelector('img').src, logoImg.querySelector('img').alt, false, [{ width: 'auto' }]);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
    logoLink.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
  }

  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoWrapper.append(logoLink);

  const navMenus = document.createElement('div');
  navMenus.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navMenus.id = 'navbarSupportedContent';

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');

  // Distinguish navigation-item (6 cells) from header-search (4 cells)
  const navigationItems = itemRows.filter((row) => [...row.children].length === 6);
  const searchItems = itemRows.filter((row) => [...row.children].length === 4);

  navigationItems.forEach((row, i) => {
    const cells = [...row.children];
    const iconImageCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== '' && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const arrowIconCell = cells.find(cell => cell.querySelector('picture') && cell !== iconImageCell);
    // submenuGroupsCell is a container, its content is not directly used here
    const hierarchyTreeCell = cells.find(cell => cell.querySelector('ul'));

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0', 'position-relative');
    if (i % 2 === 0) {
      li.classList.add('left-division');
    } else {
      li.classList.add('right-division');
    }

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

    if (iconImageCell) {
      const iconImage = iconImageCell.querySelector('picture');
      if (iconImage) {
        const optimizedIconPic = createOptimizedPicture(iconImage.querySelector('img').src, iconImage.querySelector('img').alt, false, [{ width: 'auto' }]);
        moveInstrumentation(iconImage, optimizedIconPic.querySelector('img'));
        optimizedIconPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkWrapper.append(optimizedIconPic);
      }
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
    }
    const spanLink = document.createElement('span');
    spanLink.classList.add('link-span');
    if (labelCell) {
      spanLink.textContent = labelCell.textContent.trim();
    }
    anchor.append(spanLink);
    menuLinkWrapper.append(anchor);

    if (hierarchyTreeCell) {
      const hierarchyRoot = document.createElement('div');
      moveInstrumentation(hierarchyTreeCell, hierarchyRoot); // Move instrumentation from original cell
      hierarchyRoot.innerHTML = hierarchyTreeCell.innerHTML; // Preserve full HTML structure

      // Apply classes to nested elements from ORIGINAL HTML
      hierarchyRoot.querySelectorAll('ul').forEach(ul => ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0'));
      hierarchyRoot.querySelectorAll('li').forEach(liItem => {
        liItem.classList.add('header-comp__wrapper--sub-menu-item');
        // Add specific classes for nested dropdowns if they have children
        if (liItem.querySelector(':scope > ul')) {
          liItem.classList.add('child-below');
        } else {
          liItem.classList.add('no-child');
        }
      });
      hierarchyRoot.querySelectorAll('a').forEach(a => {
        a.classList.add('text-decoration-none', 'text-dark-gray-100');
        // Add span for link text as per original HTML
        const span = document.createElement('span');
        span.classList.add('sub-link-span');
        span.textContent = a.textContent.trim();
        a.textContent = ''; // Clear original text
        a.prepend(span);
      });

      li.classList.add('dropdown', 'show-nav');
      menuLinkWrapper.classList.add('dropdown-toggle');
      menuLinkWrapper.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      if (arrowIconCell) {
        const arrowIcon = arrowIconCell.querySelector('picture');
        if (arrowIcon) {
          const optimizedArrowPic = createOptimizedPicture(arrowIcon.querySelector('img').src, arrowIcon.querySelector('img').alt, false, [{ width: 'auto' }]);
          moveInstrumentation(arrowIcon, optimizedArrowPic.querySelector('img'));
          toggleDropDown.append(optimizedArrowPic);
        }
      }
      menuLinkWrapper.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      subMenusDiv.id = `leftHeaderItem${i}`;
      subMenusDiv.setAttribute('data-id', `leftHeaderItem${i}`);

      const xfpageDiv = document.createElement('div');
      xfpageDiv.classList.add('xfpage', 'page', 'basicpage');
      const aemGridDiv = document.createElement('div');
      aemGridDiv.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
      const headerSubMenuDiv = document.createElement('div');
      headerSubMenuDiv.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');

      const subMenuGroup = document.createElement('ul');
      subMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');

      const headerCompSubMenu = document.createElement('div');
      headerCompSubMenu.classList.add('header-comp__sub-menu', 'tri-parent');
      // Append children from hierarchyRoot to headerCompSubMenu
      while (hierarchyRoot.firstChild) {
        headerCompSubMenu.append(hierarchyRoot.firstChild);
      }
      subMenuGroup.append(headerCompSubMenu);

      const borderSection = document.createElement('div');
      borderSection.classList.add('borderr-section', 'd-none', 'd-lg-flex', 'd-xl-flex', 'align-items-end', 'position-absolute', 'no-prod');
      borderSection.id = 'borderSec';
      const borderBg = document.createElement('div');
      borderBg.classList.add('border-bg');
      borderSection.append(borderBg);
      subMenuGroup.append(borderSection);

      headerSubMenuDiv.append(subMenuGroup);
      aemGridDiv.append(headerSubMenuDiv);
      xfpageDiv.append(aemGridDiv);
      subMenusDiv.append(xfpageDiv);

      li.append(menuLinkWrapper, subMenusDiv);
      transformNestedLists(headerCompSubMenu); // Apply transformation to the hierarchy

      // Toggle functionality for dropdown
      menuLinkWrapper.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        li.classList.toggle('show-nav');
        subMenusDiv.classList.toggle('show');
        menuLinkWrapper.classList.toggle('collapsed');
        menuLinkWrapper.setAttribute('aria-expanded', li.classList.contains('show-nav'));
      });
    } else {
      li.append(menuLinkWrapper);
    }
    moveInstrumentation(row, li);
    navList.append(li);
  });

  navMenus.append(navList);

  navWrapper.append(hamburgerButton, logoWrapper, navMenus);
  nav.append(navWrapper);

  const searchAccess = document.createElement('div');
  searchAccess.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');

  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('header-comp__wrapper--search');

  const searchIconWrapper = document.createElement('div');
  searchIconWrapper.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');

  const searchItem = searchItems[0]; // Assuming only one search item for now
  if (searchItem) {
    const cells = [...searchItem.children];
    const searchIconCell = cells.find(cell => cell.querySelector('picture'));
    const searchLabelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== '' && cell !== searchIconCell);
    const closeIconCell = cells.find(cell => cell.querySelector('picture') && cell !== searchIconCell);
    const searchPlaceholderCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== '' && cell !== searchLabelCell);

    if (searchIconCell) {
      const searchIcon = searchIconCell.querySelector('picture');
      if (searchIcon) {
        const optimizedSearchPic = createOptimizedPicture(searchIcon.querySelector('img').src, searchIcon.querySelector('img').alt, false, [{ width: 'auto' }]);
        moveInstrumentation(searchIcon, optimizedSearchPic.querySelector('img'));
        searchIconWrapper.append(optimizedSearchPic);
      }
    }

    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    if (searchLabelCell) {
      searchLabelSpan.textContent = searchLabelCell.textContent.trim();
    }
    searchIconWrapper.append(searchLabelSpan);
    searchWrapper.append(searchIconWrapper);
    searchAccess.append(searchWrapper);
    moveInstrumentation(searchItem, searchAccess);

    // Global search section
    const globalSearch = document.createElement('section');
    globalSearch.classList.add('global-search', 'position-fixed', 'w-100', 'd-none');

    const globalSearchWrapper = document.createElement('div');
    globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');

    const searchContentDiv = document.createElement('div');
    searchContentDiv.classList.add('d-flex', 'justify-content-center', 'h-100');

    const crossWrapDiv = document.createElement('div');
    crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex', 'cross-wrap', 'justify-content-center', 'align-items-center');
    if (closeIconCell) {
      const closeIcon = closeIconCell.querySelector('picture');
      if (closeIcon) {
        const optimizedClosePic = createOptimizedPicture(closeIcon.querySelector('img').src, closeIcon.querySelector('img').alt, false, [{ width: 'auto' }]);
        moveInstrumentation(closeIcon, optimizedClosePic.querySelector('img'));
        crossWrapDiv.append(optimizedClosePic);
      }
    }
    searchContentDiv.append(crossWrapDiv);

    const formDiv = document.createElement('div');
    formDiv.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
    if (searchPlaceholderCell) {
      searchInput.placeholder = searchPlaceholderCell.textContent.trim();
    }
    formDiv.append(searchInput);
    searchContentDiv.append(formDiv);

    const searchBtnWrap = document.createElement('div');
    searchBtnWrap.classList.add('d-lg-block', 'align-items-center', 'd-flex');
    const searchBtnDiv = document.createElement('div');
    searchBtnDiv.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
    // Reusing search icon for search button
    if (searchIconCell) {
      const searchBtnIcon = searchIconCell.querySelector('picture');
      if (searchBtnIcon) {
        const optimizedSearchBtnPic = createOptimizedPicture(searchBtnIcon.querySelector('img').src, searchBtnIcon.querySelector('img').alt, false, [{ width: 'auto' }]);
        moveInstrumentation(searchBtnIcon, optimizedSearchBtnPic.querySelector('img'));
        searchBtnDiv.append(optimizedSearchBtnPic);
      }
    }
    searchBtnWrap.append(searchBtnDiv);
    searchContentDiv.append(searchBtnWrap);

    globalSearchWrapper.append(searchContentDiv);
    globalSearch.append(globalSearchWrapper);

    const responseDiv = document.createElement('div');
    responseDiv.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
    const responseWrapper = document.createElement('div');
    responseWrapper.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
    const resultsList = document.createElement('ul');
    resultsList.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
    responseWrapper.append(resultsList);
    responseDiv.append(responseWrapper);
    globalSearch.append(responseDiv);

    block.append(globalSearch);

    // Event listeners for search functionality
    searchIconWrapper.addEventListener('click', () => {
      globalSearch.classList.remove('d-none');
    });

    crossWrapDiv.addEventListener('click', () => {
      globalSearch.classList.add('d-none');
    });

    globalSearch.addEventListener('click', (e) => {
      if (e.target === globalSearch || e.target.closest('.close-on-click')) {
        globalSearch.classList.add('d-none');
      }
    });
  }

  containerDiv.append(nav, searchAccess);
  headerComp.append(containerDiv);

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(outerBox);

  // Hamburger button toggle functionality
  hamburgerButton.addEventListener('click', () => {
    navMenus.classList.toggle('collapse');
    navMenus.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
    hamburgerButton.setAttribute('aria-expanded', navMenus.classList.contains('show'));
  });

  block.replaceChildren(headerComp);
}
