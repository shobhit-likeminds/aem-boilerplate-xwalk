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
  const [logoRow, logoLinkRow, ...itemRows] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');
  moveInstrumentation(block, headerComp);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');

  const headerNav = document.createElement('nav');
  headerNav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    togglerIcon.append(span);
  }
  hamburgerButton.append(togglerIcon);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
    logoLink.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
  }
  moveInstrumentation(logoRow, logoLink);
  logoWrapper.append(logoLink);

  const menusWrapper = document.createElement('div');
  menusWrapper.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  menusWrapper.id = 'navbarSupportedContent';

  const menuGroups = document.createElement('ul');
  menuGroups.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');

  // Filter item rows based on their structure to match models
  const navigationItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 4 && cells[0].querySelector('picture') && cells[1].textContent.trim() && cells[2].querySelector('a') && cells[3].querySelector('ul');
  });
  const searchActions = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells[0].querySelector('picture') && cells[1].textContent.trim();
  });
  // Note: sub-menu-item is handled within hierarchy-tree, not as a separate top-level item row

  navigationItems.forEach((row, i) => {
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => cell.textContent.trim() && !cell.querySelector('a') && !cell.querySelector('picture') && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const hierarchyCell = cells.find(cell => cell.querySelector('ul'));

    const menuItem = document.createElement('li');
    menuItem.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'dropdown', 'border-lg-0', 'position-relative');
    menuItem.setAttribute('data-header-item-id', `leftHeaderItem${i}`);
    moveInstrumentation(row, menuItem);

    const menuLinkDiv = document.createElement('div');
    menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
    menuLinkDiv.setAttribute('aria-current', 'page');

    if (iconCell) {
      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkDiv.append(optimizedPic);
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
      moveInstrumentation(linkCell, anchor);
    }

    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    if (labelCell) {
      linkSpan.textContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, linkSpan);
    }
    anchor.append(linkSpan);
    menuLinkDiv.append(anchor);

    if (hierarchyCell) {
      const hierarchyTempDiv = document.createElement('div');
      hierarchyTempDiv.innerHTML = hierarchyCell.innerHTML; // Use innerHTML for richtext
      moveInstrumentation(hierarchyCell, hierarchyTempDiv);

      const hierarchyRoot = hierarchyTempDiv.querySelector('ul');
      if (hierarchyRoot) {
        menuLinkDiv.classList.add('dropdown-toggle');
        menuLinkDiv.setAttribute('aria-expanded', 'false');

        const toggleDropDown = document.createElement('span');
        toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
        const arrowIcon = document.createElement('img');
        arrowIcon.alt = 'svg file';
        // Placeholder for arrow icon src, assuming it's a fixed asset
        arrowIcon.src = '/icons/arrow-icon.svg'; // Replace with actual path if available
        toggleDropDown.append(arrowIcon);
        menuLinkDiv.append(toggleDropDown);

        const subMenusDiv = document.createElement('div');
        subMenusDiv.id = `leftHeaderItem${i}`;
        subMenusDiv.classList.add('header-comp__sub-menus');

        // Apply classes to nested elements from ORIGINAL HTML
        hierarchyRoot.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
        hierarchyRoot.querySelectorAll('li').forEach(li => li.classList.add('header-comp__wrapper--sub-menu-item'));
        hierarchyRoot.querySelectorAll('a').forEach(a => a.classList.add('text-decoration-none', 'text-dark-gray-100'));
        hierarchyRoot.querySelectorAll('span').forEach(span => {
          if (span.classList.contains('sub-link-span')) {
            span.classList.add('sub-link-span');
          } else if (span.classList.contains('cmp-link__screen-reader-only')) {
            span.classList.add('cmp-link__screen-reader-only');
          }
        });

        subMenusDiv.append(hierarchyRoot);
        transformNestedLists(hierarchyRoot);

        toggleDropDown.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          menuItem.classList.toggle('show-nav');
          menuLinkDiv.classList.toggle('collapsed');
          menuLinkDiv.setAttribute('aria-expanded', menuItem.classList.contains('show-nav'));
        });
        menuItem.append(subMenusDiv);
      }
    }

    menuItem.append(menuLinkDiv);
    menuGroups.append(menuItem);
  });

  menusWrapper.append(menuGroups);

  headerWrapper.append(hamburgerButton, logoWrapper, menusWrapper);
  headerNav.append(headerWrapper);

  const searchAccess = document.createElement('div');
  searchAccess.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');

  if (searchActions.length > 0) {
    const searchActionRow = searchActions[0];
    const cells = [...searchActionRow.children];
    const searchIconCell = cells.find(cell => cell.querySelector('picture'));
    const searchLabelCell = cells.find(cell => cell.textContent.trim() && !cell.querySelector('picture'));

    if (searchIconCell) {
      const searchIconPicture = searchIconCell.querySelector('picture');
      if (searchIconPicture) {
        const img = searchIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        searchIconDiv.append(optimizedPic);
      }
    }
    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    if (searchLabelCell) {
      searchLabelSpan.textContent = searchLabelCell.textContent.trim();
      moveInstrumentation(searchLabelCell, searchLabelSpan);
    }
    searchIconDiv.append(searchLabelSpan);
    moveInstrumentation(searchActionRow, searchIconDiv);
  }

  searchDiv.append(searchIconDiv);
  searchAccess.append(searchDiv);

  containerDiv.append(headerNav, searchAccess);

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');

  headerComp.append(containerDiv, outerBox);

  const globalSearch = document.createElement('section');
  globalSearch.classList.add('global-search', 'position-fixed', 'w-100', 'd-none'); // Initially hidden

  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');

  const searchFlexContainer = document.createElement('div');
  searchFlexContainer.classList.add('d-flex', 'justify-content-center', 'h-100');

  const crossWrap = document.createElement('div');
  crossWrap.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const crossWrapInner = document.createElement('div');
  crossWrapInner.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const crossImg = document.createElement('img');
  crossImg.alt = 'svg file';
  crossImg.src = '/icons/cross-icon.svg'; // Placeholder for cross icon src
  crossWrapInner.append(crossImg);
  crossWrap.append(crossWrapInner);

  const searchForm = document.createElement('div');
  searchForm.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.placeholder = 'Start typing...';
  searchForm.append(searchInput);

  const searchButtonWrap = document.createElement('div');
  searchButtonWrap.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchButtonInner = document.createElement('div');
  searchButtonInner.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const searchButtonImg = document.createElement('img');
  searchButtonImg.alt = 'svg file';
  searchButtonImg.src = '/icons/search-icon.svg'; // Placeholder for search icon src
  searchButtonInner.append(searchButtonImg);
  searchButtonWrap.append(searchButtonInner);

  searchFlexContainer.append(crossWrap, searchForm, searchButtonWrap);
  globalSearchWrapper.append(searchFlexContainer);

  const searchResponseContainer = document.createElement('div');
  searchResponseContainer.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const searchResponse = document.createElement('div');
  searchResponse.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  const searchResults = document.createElement('ul');
  searchResults.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  searchResponse.append(searchResults);
  searchResponseContainer.append(searchResponse);

  globalSearch.append(globalSearchWrapper, searchResponseContainer);

  // Event Listeners for interactive behavior
  hamburgerButton.addEventListener('click', () => {
    menusWrapper.classList.toggle('collapse');
    menusWrapper.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
    hamburgerButton.setAttribute('aria-expanded', menusWrapper.classList.contains('show'));
  });

  searchIconDiv.addEventListener('click', () => {
    globalSearch.classList.toggle('d-none');
  });

  crossWrapInner.addEventListener('click', () => {
    globalSearch.classList.add('d-none');
  });

  globalSearch.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-on-click')) {
      globalSearch.classList.add('d-none');
    }
  });

  block.replaceChildren(headerComp, globalSearch);
}
