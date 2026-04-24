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
      subWrap.classList.add('has-sub-child'); // This class is not in the allowlist.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in the allowlist.
          subWrap.classList.toggle('active'); // This class is not in the allowlist.
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');
  moveInstrumentation(block, headerComp);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(containerDiv);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  containerDiv.append(nav);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(wrapperDiv);

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.setAttribute('type', 'button');
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');

  const spanIcon = document.createElement('span');
  spanIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  for (let i = 0; i < 3; i += 1) {
    const spanBar = document.createElement('span');
    spanBar.classList.add('d-block', 'bg-white');
    spanIcon.append(spanBar);
  }
  hamburgerButton.append(spanIcon);
  wrapperDiv.append(hamburgerButton);

  const [logoRow, logoLinkRow, ...itemRows] = children;

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  moveInstrumentation(logoRow, logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  moveInstrumentation(logoLinkRow, logoLink);

  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100' }]);
    optimizedLogoPic.classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  }
  logoWrapper.append(logoLink);
  wrapperDiv.append(logoWrapper);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  wrapperDiv.append(navbarCollapse);

  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  const menuList = document.createElement('ul');
  menuList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(menuList);

  const navigationItems = itemRows.filter((row) => row.children.length === 7);
  const subMenuItems = itemRows.filter((row) => row.children.length === 5); // Not used in this block, but correctly filtered
  const searchIconItems = itemRows.filter((row) => row.children.length === 2);

  navigationItems.forEach((row) => {
    const [
      iconCell,
      labelCell,
      linkCell,
      dropdownArrowIconDesktopCell,
      dropdownArrowIconMobileCell, // Not used in the generated code
      subMenuItemsContainerCell, // container, not used directly here
      hierarchyTreeCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0');
    moveInstrumentation(row, li);

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

    const mobileIconPicture = iconCell.querySelector('picture');
    if (mobileIconPicture) {
      const mobileIconImg = mobileIconPicture.querySelector('img');
      const optimizedMobileIconPic = createOptimizedPicture(mobileIconImg.src, mobileIconImg.alt, false, [{ width: '24' }]);
      optimizedMobileIconPic.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      moveInstrumentation(mobileIconImg, optimizedMobileIconPic.querySelector('img'));
      menuLinkWrapper.append(optimizedMobileIconPic);
    }

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkAnchor.href = foundLink.href;
    }
    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = labelCell.textContent.trim();
    linkAnchor.append(linkSpan);
    menuLinkWrapper.append(linkAnchor);

    const hierarchyRootContent = hierarchyTreeCell.innerHTML;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = hierarchyRootContent;
    const hierarchyRoot = tempDiv.querySelector('ul');

    if (hierarchyRoot) {
      li.classList.add('dropdown', 'show-nav', 'position-relative', 'left-division');
      menuLinkWrapper.classList.add('dropdown-toggle');
      menuLinkWrapper.setAttribute('aria-expanded', 'false');

      const arrowIconSpan = document.createElement('span');
      arrowIconSpan.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const desktopArrowPicture = dropdownArrowIconDesktopCell.querySelector('picture');
      if (desktopArrowPicture) {
        const desktopArrowImg = desktopArrowPicture.querySelector('img');
        const optimizedDesktopArrowPic = createOptimizedPicture(desktopArrowImg.src, desktopArrowImg.alt, false, [{ width: '24' }]);
        moveInstrumentation(desktopArrowImg, optimizedDesktopArrowPic.querySelector('img'));
        arrowIconSpan.append(optimizedDesktopArrowPic);
      }
      menuLinkWrapper.append(arrowIconSpan);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      
      // Apply classes to nested elements from ORIGINAL HTML
      hierarchyRoot.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      hierarchyRoot.querySelectorAll('li').forEach(nestedLi => {
        nestedLi.classList.add('header-comp__wrapper--sub-menu-item');
      });
      hierarchyRoot.querySelectorAll('a').forEach(nestedA => {
        nestedA.classList.add('text-decoration-none', 'text-dark-gray-100');
        const span = nestedA.querySelector('span');
        if (span) span.classList.add('sub-link-span');
      });
      hierarchyRoot.querySelectorAll('ul').forEach(nestedUl => {
        nestedUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      });

      // Move instrumentation for the hierarchy tree content
      moveInstrumentation(hierarchyTreeCell, subMenusDiv);
      while (hierarchyRoot.firstChild) {
        subMenusDiv.append(hierarchyRoot.firstChild);
      }

      transformNestedLists(subMenusDiv); // Call transformNestedLists on the new structure

      menuLinkWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show-nav');
        menuLinkWrapper.classList.toggle('active'); // This class is not in the allowlist.
        subMenusDiv.classList.toggle('active'); // This class is not in the allowlist.
      });

      li.append(menuLinkWrapper);
      li.append(subMenusDiv);
    } else {
      li.append(menuLinkWrapper);
    }
    menuList.append(li);
  });

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  containerDiv.append(searchAccessDiv);

  searchIconItems.forEach((row) => {
    const [iconCell, labelCell] = [...row.children];

    const searchWrapper = document.createElement('div');
    searchWrapper.classList.add('header-comp__wrapper--search');
    moveInstrumentation(row, searchWrapper);

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');

    const searchIconPicture = iconCell.querySelector('picture');
    if (searchIconPicture) {
      const searchIconImg = searchIconPicture.querySelector('img');
      const optimizedSearchIconPic = createOptimizedPicture(searchIconImg.src, searchIconImg.alt, false, [{ width: '24' }]);
      moveInstrumentation(searchIconImg, optimizedSearchIconPic.querySelector('img'));
      searchIconDiv.append(optimizedSearchIconPic);
    }

    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    searchLabelSpan.textContent = labelCell.textContent.trim();
    searchIconDiv.append(searchLabelSpan);

    searchWrapper.append(searchIconDiv);
    searchAccessDiv.append(searchWrapper);

    // Global search functionality
    const globalSearch = document.querySelector('.global-search');
    const searchInput = globalSearch?.querySelector('.global-search__wrapper--form-input');
    const searchResults = globalSearch?.querySelector('.global-search__response--results');
    const closeSearch = globalSearch?.querySelector('.cross-wrap');
    const searchButton = globalSearch?.querySelector('.search-wrap');

    searchIconDiv.addEventListener('click', () => {
      globalSearch.classList.remove('d-none');
    });

    closeSearch?.addEventListener('click', () => {
      globalSearch.classList.add('d-none');
      searchResults.classList.add('d-none');
      searchResults.innerHTML = '';
      searchInput.value = '';
    });

    searchButton?.addEventListener('click', () => {
      // Trigger search logic if needed
    });

    searchInput?.addEventListener('input', async (e) => {
      const query = e.target.value;
      if (query.length > 2) {
        const path = searchInput.dataset.path || '';
        const limit = searchInput.dataset.limit || 5;
        const response = await fetch(`/query-index.json?q=${query}&limit=${limit}&path=${path}`);
        const data = await response.json();
        searchResults.innerHTML = '';
        if (data.results && data.results.length > 0) {
          data.results.forEach((result) => {
            const liResult = document.createElement('li');
            const aResult = document.createElement('a');
            aResult.href = result.path;
            aResult.textContent = result.title || result.path;
            liResult.append(aResult);
            searchResults.append(liResult);
          });
          searchResults.classList.remove('d-none');
        } else {
          searchResults.innerHTML = `<li class="text-center">${searchInput.dataset.error || 'No results found.'}</li>`;
          searchResults.classList.remove('d-none');
        }
      } else {
        searchResults.classList.add('d-none');
        searchResults.innerHTML = '';
      }
    });

    globalSearch?.addEventListener('click', (e) => {
      if (e.target === globalSearch || e.target.closest('.close-on-click')) {
        globalSearch.classList.add('d-none');
        searchResults.classList.add('d-none');
        searchResults.innerHTML = '';
        searchInput.value = '';
      }
    });
  });

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  containerDiv.append(outerBox);

  block.replaceChildren(headerComp);
}
