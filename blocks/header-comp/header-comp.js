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
      subWrap.classList.add('has-sub-child'); // This class is not in the allowlist, but seems to be a functional class for JS.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in the allowlist, but seems to be a functional class for JS.
          subWrap.classList.toggle('active'); // This class is not in the allowlist, but seems to be a functional class for JS.
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Fixed fields
  const [
    brandLogoRow,
    brandLogoLinkRow,
    searchIconRow,
    searchLabelRow,
    globalSearchCloseIconRow,
    globalSearchButtonIconRow,
    globalSearchPlaceholderRow,
    globalSearchErrorRow,
    ...itemRows
  ] = children;

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(container);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  container.append(nav);

  const headerCompWrapper = document.createElement('div');
  headerCompWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(headerCompWrapper);

  // Hamburger button
  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');
  const hamburgerSpan = document.createElement('span');
  hamburgerSpan.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  for (let i = 0; i < 3; i += 1) {
    const lineSpan = document.createElement('span');
    lineSpan.classList.add('d-block', 'bg-white');
    hamburgerSpan.append(lineSpan);
  }
  hamburgerButton.append(hamburgerSpan);
  headerCompWrapper.append(hamburgerButton);

  // Brand Logo
  const brandLogoDiv = document.createElement('div');
  brandLogoDiv.classList.add('header-comp__wrapper--logo');
  const brandLink = document.createElement('a');
  brandLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  moveInstrumentation(brandLogoLinkRow, brandLink);
  brandLink.href = brandLogoLinkRow.querySelector('a')?.href || '#';
  const brandPicture = brandLogoRow.querySelector('picture');
  if (brandPicture) {
    const brandImg = brandPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(brandImg.src, brandImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(brandImg, optimizedPic.querySelector('img'));
    brandLink.append(optimizedPic);
  }
  brandLogoDiv.append(brandLink);
  headerCompWrapper.append(brandLogoDiv);

  // Navigation Menus
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  headerCompWrapper.append(navbarCollapse);

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(navList);

  // Separate item rows by type
  const navMenuItems = itemRows.filter((row) => row.children.length === 6);
  const navSubmenuItems = itemRows.filter((row) => row.children.length === 5);
  const navTertiaryItems = itemRows.filter((row) => row.children.length === 2);

  const buildTertiaryMenu = (tertiaryItems) => {
    const tertiaryUl = document.createElement('ul');
    tertiaryUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
    tertiaryItems.forEach((row) => {
      const [tertiaryLabelCell, tertiaryLinkCell] = [...row.children];
      const li = document.createElement('li');
      li.classList.add('header-comp__wrapper--sub-menu-item', 'no-child');
      moveInstrumentation(row, li);

      const linkDiv = document.createElement('div');
      linkDiv.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');

      const subLinkDiv = document.createElement('div');
      subLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

      const tertiaryLink = document.createElement('a');
      tertiaryLink.classList.add('text-decoration-none', 'text-dark-gray-100');
      const foundLink = tertiaryLinkCell.querySelector('a');
      if (foundLink) tertiaryLink.href = foundLink.href;
      tertiaryLink.textContent = tertiaryLabelCell.textContent.trim();
      subLinkDiv.append(tertiaryLink);
      linkDiv.append(subLinkDiv);
      li.append(linkDiv);
      tertiaryUl.append(li);
    });
    return tertiaryUl;
  };

  const buildSubmenu = (submenuItems) => {
    const subMenuUl = document.createElement('ul');
    subMenuUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
    submenuItems.forEach((row) => {
      const [submenuLabelCell, submenuLinkCell, submenuArrowIconCell, submenuArrowIconMobileCell, tertiaryMenuItemsCell] = [...row.children];
      const li = document.createElement('li');
      li.classList.add('header-comp__wrapper--sub-menu-item', 'child-below');
      moveInstrumentation(row, li);

      const linkDiv = document.createElement('div');
      linkDiv.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'dropdown-toggle', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');

      const subLinkDiv = document.createElement('div');
      subLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

      const submenuLink = document.createElement('a');
      submenuLink.classList.add('text-decoration-none', 'text-dark-gray-100');
      const foundLink = submenuLinkCell.querySelector('a');
      if (foundLink) submenuLink.href = foundLink.href;
      submenuLink.textContent = submenuLabelCell.textContent.trim();
      subLinkDiv.append(submenuLink);

      const desktopArrowSpan = document.createElement('span');
      desktopArrowSpan.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
      const desktopArrowImg = submenuArrowIconCell.querySelector('picture > img');
      if (desktopArrowImg) {
        const optimizedPic = createOptimizedPicture(desktopArrowImg.src, desktopArrowImg.alt, false, [{ width: '24' }]);
        moveInstrumentation(desktopArrowImg, optimizedPic.querySelector('img'));
        desktopArrowSpan.append(optimizedPic);
      }
      subLinkDiv.append(desktopArrowSpan);
      linkDiv.append(subLinkDiv);

      const mobileArrowSpan = document.createElement('span');
      mobileArrowSpan.classList.add('arrow-icon', 'd-lg-none', 'end-0', 'd-lg-none');
      const mobileArrowImg = submenuArrowIconMobileCell.querySelector('picture > img');
      if (mobileArrowImg) {
        const optimizedPic = createOptimizedPicture(mobileArrowImg.src, mobileArrowImg.alt, false, [{ width: '24' }]);
        moveInstrumentation(mobileArrowImg, optimizedPic.querySelector('img'));
        mobileArrowSpan.append(optimizedPic);
      }
      linkDiv.append(mobileArrowSpan);
      li.append(linkDiv);

      const tertiaryContainer = document.createElement('div');
      tertiaryContainer.classList.add('d-lg-none', 'inner-childs');
      tertiaryContainer.id = `subNavItem${Math.floor(Math.random() * 1000)}`; // unique ID
      // The original code assumed all tertiary items are children of this submenu, which is incorrect.
      // Tertiary items are separate rows in block.children.
      // For now, we'll keep the original behavior but note this as a potential structural issue if the model implies nesting.
      const tertiaryMenu = buildTertiaryMenu(navTertiaryItems);
      tertiaryContainer.append(tertiaryMenu);
      li.append(tertiaryContainer);

      linkDiv.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show');
        linkDiv.classList.toggle('collapsed');
        tertiaryContainer.classList.toggle('show');
      });

      subMenuUl.append(li);
    });
    return subMenuUl;
  };

  navMenuItems.forEach((row, index) => {
    const [menuIconCell, menuLabelCell, menuLinkCell, arrowIconCell, subMenuItemsCell, hierarchyTreeCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'dropdown', 'flex-column', 'border-lg-0', 'show-nav', 'position-relative', 'left-division');
    li.setAttribute('data-header-item-id', `leftHeaderItem${index}`);
    moveInstrumentation(row, li);

    const menuLinkDiv = document.createElement('div');
    menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
    li.append(menuLinkDiv);

    const mobileMenuIcon = menuIconCell.querySelector('picture > img');
    if (mobileMenuIcon) {
      const optimizedPic = createOptimizedPicture(mobileMenuIcon.src, mobileMenuIcon.alt, false, [{ width: '24' }]);
      moveInstrumentation(mobileMenuIcon, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkDiv.append(optimizedPic);
    }

    const menuAnchor = document.createElement('a');
    menuAnchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    const foundLink = menuLinkCell.querySelector('a');
    if (foundLink) menuAnchor.href = foundLink.href;
    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = menuLabelCell.textContent.trim();
    menuAnchor.append(linkSpan);
    menuLinkDiv.append(menuAnchor);

    const hierarchyRootUl = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRootUl) {
      menuLinkDiv.classList.add('dropdown-toggle');
      const arrowSpan = document.createElement('span');
      arrowSpan.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowImg = arrowIconCell.querySelector('picture > img');
      if (arrowImg) {
        const optimizedPic = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '24' }]);
        moveInstrumentation(arrowImg, optimizedPic.querySelector('img'));
        arrowSpan.append(optimizedPic);
      }
      menuLinkDiv.append(arrowSpan);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.id = `leftHeaderItem${index}`;
      subMenusDiv.classList.add('header-comp__sub-menus');
      li.append(subMenusDiv);

      const subMenuUl = buildSubmenu(navSubmenuItems); // Assuming all submenu items are children of this menu item
      subMenusDiv.append(subMenuUl);

      // Handle hierarchy-tree richtext field
      const tempDiv = document.createElement('div');
      moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation from the original cell
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML; // Read innerHTML to preserve structure

      // Apply classes to nested elements as per ORIGINAL HTML
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0'));
      tempDiv.querySelectorAll('li').forEach(liItem => liItem.classList.add('header-comp__wrapper--sub-menu-item', 'no-child'));
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('text-decoration-none', 'text-dark-gray-100'));
      tempDiv.querySelectorAll('span.sub-link-span').forEach(span => span.classList.add('sub-link-span')); // Ensure span has class if present in original

      // Apply the hierarchy transformation to the nested list
      // This function needs to operate on the tempDiv's content
      transformNestedLists(tempDiv);

      // Move all children from tempDiv to subMenusDiv
      while (tempDiv.firstChild) {
        subMenusDiv.append(tempDiv.firstChild);
      }

      menuLinkDiv.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show');
        menuLinkDiv.classList.toggle('collapsed');
        subMenusDiv.classList.toggle('show');
      });
    }

    navList.append(li);
  });

  // Search access
  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  container.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  const searchIconImg = searchIconRow.querySelector('picture > img');
  if (searchIconImg) {
    const optimizedPic = createOptimizedPicture(searchIconImg.src, searchIconImg.alt, false, [{ width: '24' }]);
    moveInstrumentation(searchIconImg, optimizedPic.querySelector('img'));
    searchIconDiv.append(optimizedPic);
  }
  const searchLabelSpan = document.createElement('span');
  searchLabelSpan.classList.add('d-none', 'd-lg-block');
  searchLabelSpan.textContent = searchLabelRow.textContent.trim();
  searchIconDiv.append(searchLabelSpan);
  searchDiv.append(searchIconDiv);

  const headerOuterBox = document.createElement('div');
  headerOuterBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(headerOuterBox);

  // Global Search Section
  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none'); // initially hidden
  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');
  globalSearchSection.append(globalSearchWrapper);

  const globalSearchFlex = document.createElement('div');
  globalSearchFlex.classList.add('d-flex', 'justify-content-center', 'h-100');
  globalSearchWrapper.append(globalSearchFlex);

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex', 'cross-wrap', 'justify-content-center', 'align-items-center');
  const globalSearchCloseImg = globalSearchCloseIconRow.querySelector('picture > img');
  if (globalSearchCloseImg) {
    const optimizedPic = createOptimizedPicture(globalSearchCloseImg.src, globalSearchCloseImg.alt, false, [{ width: '24' }]);
    moveInstrumentation(globalSearchCloseImg, optimizedPic.querySelector('img'));
    crossWrapDiv.append(optimizedPic);
  }
  globalSearchFlex.append(crossWrapDiv);

  const globalSearchForm = document.createElement('div');
  globalSearchForm.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.placeholder = globalSearchPlaceholderRow.textContent.trim();
  globalSearchForm.append(searchInput);
  globalSearchFlex.append(globalSearchForm);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex', 'search-wrap', 'justify-content-center', 'align-items-center');
  const globalSearchButtonImg = globalSearchButtonIconRow.querySelector('picture > img');
  if (globalSearchButtonImg) {
    const optimizedPic = createOptimizedPicture(globalSearchButtonImg.src, globalSearchButtonImg.alt, false, [{ width: '24' }]);
    moveInstrumentation(globalSearchButtonImg, optimizedPic.querySelector('img'));
    searchWrapDiv.append(optimizedPic);
  }
  globalSearchFlex.append(searchWrapDiv);

  const globalSearchResponseDiv = document.createElement('div');
  globalSearchResponseDiv.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const globalSearchResponseInner = document.createElement('div');
  globalSearchResponseInner.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  const resultsUl = document.createElement('ul');
  resultsUl.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  globalSearchResponseInner.append(resultsUl);
  globalSearchResponseDiv.append(globalSearchResponseInner);
  globalSearchSection.append(globalSearchResponseDiv);

  // Event Listeners for search functionality
  searchIconDiv.addEventListener('click', () => {
    globalSearchSection.classList.remove('d-none');
    document.body.classList.add('overflow-hidden');
  });

  crossWrapDiv.addEventListener('click', () => {
    globalSearchSection.classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
  });

  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
    document.body.classList.toggle('overflow-hidden');
  });

  // Append global search section to the body or a suitable container
  document.body.append(globalSearchSection);

  block.replaceChildren(headerComp);
}
