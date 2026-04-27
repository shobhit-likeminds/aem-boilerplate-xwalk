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
      subWrap.classList.add('header-comp__sub-menus'); // Use class from original HTML
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.classList.add('dropdown-toggle');
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('show-nav'); // Use class from original HTML
          subWrap.classList.toggle('show-nav'); // Use class from original HTML
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields: logoImage, logoLink
  const logoImageCell = children.find((row) => row.children[0]?.querySelector('picture') && row.children.length === 1);
  const logoLinkCell = children.find((row) => row.children[0]?.querySelector('a') && row.children.length === 1);

  // Item rows detection based on BlockJson structure
  const menuItems = children.filter((row) => row.children.length === 5); // menuIcon, menuLabel, menuLink, subMenuItems (container), hierarchy-tree
  const searchIcons = children.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture')); // searchIcon, searchLabel
  // subMenuItems and subSubMenuItems are not directly read from block.children, they are nested within richtext

  // Main header container
  const headerSection = document.createElement('section');
  headerSection.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerSection.append(containerDiv);

  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  containerDiv.append(nav);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(navWrapper);

  // Hamburger button
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
  navWrapper.append(hamburgerButton);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  navWrapper.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  // Find the actual logoLink row and its anchor
  const actualLogoLinkCell = logoLinkCell?.children[0];
  logoLink.href = actualLogoLinkCell?.querySelector('a')?.href || '#';
  if (actualLogoLinkCell) {
    moveInstrumentation(actualLogoLinkCell, logoLink);
  }

  // Find the actual logoImage row and its picture
  const actualLogoImageCell = logoImageCell?.children[0];
  const logoPicture = actualLogoImageCell?.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100' }]);
    optimizedLogoPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  }
  logoWrapper.append(logoLink);
  if (actualLogoImageCell) {
    moveInstrumentation(actualLogoImageCell, logoWrapper);
  }

  // Menu items
  const menuCollapse = document.createElement('div');
  menuCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  menuCollapse.id = 'navbarSupportedContent';
  navWrapper.append(menuCollapse);

  const menuList = document.createElement('ul');
  menuList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  menuCollapse.append(menuList);

  menuItems.forEach((row, i) => {
    const cells = [...row.children];
    const menuIconCell = cells.find((cell) => cell.querySelector('picture'));
    const menuLabelCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim());
    const menuLinkCell = cells.find((cell) => cell.querySelector('a') && cell.textContent.startsWith('/content/')); // aem-content type
    // subMenuItemsCell is a container, its content is not directly used here
    const hierarchyTreeCell = cells.find((cell) => cell.querySelector('ul')); // richtext type

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'flex-column', 'border-lg-0', 'position-relative');
    if (i % 2 === 0) {
      li.classList.add('left-division');
    } else {
      li.classList.add('right-division');
    }
    li.setAttribute('data-header-item-id', `leftHeaderItem${i}`);
    moveInstrumentation(row, li);

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

    const menuIconPicture = menuIconCell?.querySelector('picture');
    if (menuIconPicture) {
      const menuIconImg = menuIconPicture.querySelector('img');
      const optimizedMenuIconPic = createOptimizedPicture(menuIconImg.src, menuIconImg.alt, false, [{ width: '30' }]);
      optimizedMenuIconPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      moveInstrumentation(menuIconImg, optimizedMenuIconPic.querySelector('img'));
      menuLinkWrapper.append(optimizedMenuIconPic);
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');
    anchor.href = menuLinkCell?.querySelector('a')?.href || '#';
    if (menuLinkCell) {
      moveInstrumentation(menuLinkCell, anchor);
    }

    const spanLink = document.createElement('span');
    spanLink.classList.add('link-span');
    spanLink.textContent = menuLabelCell?.textContent.trim() || '';
    anchor.append(spanLink);
    menuLinkWrapper.append(anchor);
    if (menuLabelCell) {
      moveInstrumentation(menuLabelCell, spanLink);
    }

    const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
    if (hierarchyRoot) {
      li.classList.add('dropdown');
      menuLinkWrapper.classList.add('dropdown-toggle');
      menuLinkWrapper.setAttribute('aria-expanded', 'false');

      const toggleDropdownSpan = document.createElement('span');
      toggleDropdownSpan.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      // TODO: Replace hardcoded SVG URL with a model field if this icon is configurable
      toggleDropdownSpan.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1777022756577.svg+xml">';
      menuLinkWrapper.append(toggleDropdownSpan);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      subMenusDiv.id = `leftHeaderItem${i}`;
      subMenusDiv.setAttribute('data-id', `leftHeaderItem${i}`);

      const subMenuUl = document.createElement('ul');
      subMenuUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      const subMenuTriParent = document.createElement('div');
      subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
      subMenuUl.append(subMenuTriParent);

      const desktopBorderSection = document.createElement('div');
      desktopBorderSection.classList.add('borderr-section', 'd-none', 'd-lg-flex', 'd-xl-flex', 'align-items-end', 'position-absolute', 'no-prod');
      desktopBorderSection.id = 'borderSec';
      const borderBg = document.createElement('div');
      borderBg.classList.add('border-bg');
      desktopBorderSection.append(borderBg);
      subMenuUl.append(desktopBorderSection);

      // Process the hierarchy-tree richtext for sub-menus
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML; // Use innerHTML to preserve nested structure
      moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation from the richtext cell

      // Apply classes to nested elements and transform
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0'));
      tempDiv.querySelectorAll('li').forEach(li => li.classList.add('header-comp__wrapper--sub-menu-item'));
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('text-decoration-none', 'text-dark-gray-100'));
      tempDiv.querySelectorAll('span').forEach(span => span.classList.add('sub-link-span')); // Assuming span is for sub-link-span

      transformNestedLists(tempDiv.querySelector('ul')); // Apply transformation to the cloned hierarchy

      // Append the processed hierarchy to the subMenuTriParent
      [...tempDiv.querySelector('ul').children].forEach((childLi) => {
        const subLi = document.createElement('li');
        subLi.classList.add('header-comp__wrapper--sub-menu-item');
        // moveInstrumentation already called on tempDiv, no need to call on individual li
        // We need to ensure instrumentation is moved correctly for each item if they are editable
        // For now, assuming the whole richtext cell is one editable unit.

        const childLink = childLi.querySelector(':scope > a');
        const childSpan = childLi.querySelector(':scope > span');
        const childLabel = childLink?.textContent.trim() || childSpan?.textContent.trim() || '';
        const childHref = childLink?.href || '#';
        const hasNested = childLi.querySelector(':scope > .header-comp__sub-menus');

        if (hasNested) {
          subLi.classList.add('child-below');
        } else {
          subLi.classList.add('no-child');
        }

        const subMenuLinkWrapper = document.createElement('div');
        subMenuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
        if (hasNested) {
          subMenuLinkWrapper.classList.add('dropdown-toggle');
          subMenuLinkWrapper.setAttribute('aria-expanded', 'false');
        }

        const subMenuLinkDiv = document.createElement('div');
        subMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

        const subAnchor = document.createElement('a');
        subAnchor.classList.add('text-decoration-none', 'text-dark-gray-100');
        subAnchor.href = childHref;
        subAnchor.textContent = childLabel;
        subMenuLinkDiv.append(subAnchor);

        if (hasNested) {
          const arrowRightSpan = document.createElement('span');
          arrowRightSpan.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
          // TODO: Replace hardcoded SVG URL with a model field if this icon is configurable
          arrowRightSpan.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1777022756807.svg+xml">';
          subMenuLinkDiv.append(arrowRightSpan);

          const arrowMobileSpan = document.createElement('span');
          arrowMobileSpan.classList.add('arrow-icon', 'd-lg-none', 'end-0', 'd-lg-none');
          // TODO: Replace hardcoded SVG URL with a model field if this icon is configurable
          arrowMobileSpan.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1777022756929.svg+xml">';
          subMenuLinkWrapper.append(arrowMobileSpan);
        }

        subMenuLinkWrapper.append(subMenuLinkDiv);
        subLi.append(subMenuLinkWrapper);

        const nestedSubMenus = childLi.querySelector(':scope > .header-comp__sub-menus');
        if (nestedSubMenus) {
          nestedSubMenus.classList.add('d-lg-none', 'inner-childs');
          nestedSubMenus.id = `subNavItem${i}`; // This ID might not be unique if multiple top-level items have nested sub-menus
          nestedSubMenus.setAttribute('data-id', `subNavItem${i}`);
          subLi.append(nestedSubMenus);
        }
        subMenuTriParent.append(subLi);
      });

      subMenuUl.append(subMenuTriParent); // Ensure subMenuTriParent is appended to subMenuUl
      subMenusDiv.append(subMenuUl);
      li.append(subMenusDiv);

      menuLinkWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show-nav');
        subMenusDiv.classList.toggle('show-nav');
      });
    }

    li.append(menuLinkWrapper);
    menuList.append(li);
  });

  // Search and access
  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  containerDiv.append(searchAccessDiv);

  searchIcons.forEach((row) => {
    const cells = [...row.children];
    const searchIconCell = cells.find((cell) => cell.querySelector('picture'));
    const searchLabelCell = cells.find((cell) => !cell.querySelector('picture') && cell.textContent.trim());

    const searchWrapper = document.createElement('div');
    searchWrapper.classList.add('header-comp__wrapper--search');
    moveInstrumentation(row, searchWrapper);

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');

    const searchIconPicture = searchIconCell?.querySelector('picture');
    if (searchIconPicture) {
      const searchIconImg = searchIconPicture.querySelector('img');
      const optimizedSearchIconPic = createOptimizedPicture(searchIconImg.src, searchIconImg.alt, false, [{ width: '20' }]);
      moveInstrumentation(searchIconImg, optimizedSearchIconPic.querySelector('img'));
      searchIconDiv.append(optimizedSearchIconPic);
    }

    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    searchLabelSpan.textContent = searchLabelCell?.textContent.trim() || '';
    searchIconDiv.append(searchLabelSpan);
    if (searchLabelCell) {
      moveInstrumentation(searchLabelCell, searchLabelSpan);
    }

    searchWrapper.append(searchIconDiv);
    searchAccessDiv.append(searchWrapper);

    searchIconDiv.addEventListener('click', () => {
      document.body.classList.toggle('search-open');
      document.querySelector('.global-search').classList.toggle('d-none');
    });
  });

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerSection.append(outerBox);

  // Hamburger button toggle logic
  hamburgerButton.addEventListener('click', () => {
    menuCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  // Global search component (from original HTML, needs to be created)
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
  // TODO: Replace hardcoded SVG URL with a model field if this icon is configurable
  crossWrap.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1777022757316.svg+xml">';
  crossWrapDiv.append(crossWrap);
  globalSearchFlex.append(crossWrapDiv);

  const searchForm = document.createElement('div');
  searchForm.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.placeholder = 'Start typing...';
  // These data attributes should ideally come from model fields if configurable
  searchInput.setAttribute('data-path', '/content/svasti/in/en');
  searchInput.setAttribute('data-limit', '5');
  searchInput.setAttribute('data-error', '<p><b>Sorry, we cannot find what you are looking for :(</b></p><p>&nbsp;</p><p>Please try a new search term or browse through one of our product categories.</p>');
  searchForm.append(searchInput);
  globalSearchFlex.append(searchForm);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchWrap = document.createElement('div');
  searchWrap.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  // TODO: Replace hardcoded SVG URL with a model field if this icon is configurable
  searchWrap.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1777022757428.svg+xml">';
  searchWrapDiv.append(searchWrap);
  globalSearchFlex.append(searchWrapDiv);

  const globalSearchCloseOnClick = document.createElement('div');
  globalSearchCloseOnClick.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const globalSearchResponse = document.createElement('div');
  globalSearchResponse.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  const globalSearchResults = document.createElement('ul');
  globalSearchResults.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  globalSearchResponse.append(globalSearchResults);
  globalSearchCloseOnClick.append(globalSearchResponse);
  globalSearchSection.append(globalSearchCloseOnClick);

  crossWrap.addEventListener('click', () => {
    document.body.classList.remove('search-open');
    globalSearchSection.classList.add('d-none');
  });

  block.replaceChildren(headerSection, globalSearchSection);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
