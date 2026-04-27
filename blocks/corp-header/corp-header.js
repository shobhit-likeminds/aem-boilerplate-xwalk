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
      subWrap.classList.add('inner-childs');
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

  const [logoRow, logoLinkRow, searchIconRow, ...itemRows] = children;

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(containerDiv);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  containerDiv.append(nav);

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(headerWrapper);

  // Hamburger toggler
  const toggler = document.createElement('button');
  toggler.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    togglerIcon.append(span);
  }
  toggler.append(togglerIcon);
  headerWrapper.append(toggler);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  moveInstrumentation(logoLinkRow, logoLink);
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100' }]);
    optimizedPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoWrapper.append(logoLink);
  headerWrapper.append(logoWrapper);

  // Navigation menus
  const navMenus = document.createElement('div');
  navMenus.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navMenus.id = 'navbarSupportedContent';
  headerWrapper.append(navMenus);

  const navUl = document.createElement('ul');
  navUl.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navMenus.append(navUl);

  const navigationItems = itemRows.filter((row) => row.children.length === 7);
  // const subNavigationItems = itemRows.filter((row) => row.children.length === 5); // This filter is not used

  navigationItems.forEach((row, i) => {
    // Destructuring for fixed schema navigation-item
    const [iconCell, labelCell, linkCell, arrowIconDesktopCell, arrowIconMobileCell, subNavigationCell, hierarchyTreeCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0', 'position-relative');
    if (i % 2 === 0) {
      li.classList.add('left-division');
    } else {
      li.classList.add('right-division');
    }
    li.dataset.headerItemId = `leftHeaderItem${i}`;

    const menuLinkDiv = document.createElement('div');
    menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
    moveInstrumentation(row, menuLinkDiv);

    const mobileIconPicture = iconCell.querySelector('picture');
    if (mobileIconPicture) {
      const mobileIconImg = mobileIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(mobileIconImg.src, mobileIconImg.alt, false, [{ width: '24' }]);
      optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkDiv.append(optimizedPic);
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    const spanLink = document.createElement('span');
    spanLink.classList.add('link-span');
    spanLink.textContent = labelCell.textContent.trim();
    anchor.append(spanLink);
    menuLinkDiv.append(anchor);

    const hierarchyRootTemp = document.createElement('div');
    moveInstrumentation(hierarchyTreeCell, hierarchyRootTemp);
    hierarchyRootTemp.innerHTML = hierarchyTreeCell.innerHTML;
    const hierarchyRoot = hierarchyRootTemp.querySelector('ul');

    if (hierarchyRoot) {
      li.classList.add('dropdown', 'flex-column', 'show-nav');
      menuLinkDiv.classList.add('dropdown-toggle');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const desktopArrowPicture = arrowIconDesktopCell.querySelector('picture');
      if (desktopArrowPicture) {
        const desktopArrowImg = desktopArrowPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(desktopArrowImg.src, desktopArrowImg.alt, false, [{ width: '16' }]);
        toggleDropDown.append(optimizedPic);
      } else {
        toggleDropDown.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" /></svg>';
      }
      menuLinkDiv.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.id = `leftHeaderItem${i}`;
      subMenusDiv.dataset.id = `leftHeaderItem${i}`;
      subMenusDiv.classList.add('header-comp__sub-menus');

      const xfpageDiv = document.createElement('div');
      xfpageDiv.classList.add('xfpage', 'page', 'basicpage');
      subMenusDiv.append(xfpageDiv);

      const aemGridDiv = document.createElement('div');
      aemGridDiv.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
      xfpageDiv.append(aemGridDiv);

      const headerSubMenuDiv = document.createElement('div');
      headerSubMenuDiv.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');
      aemGridDiv.append(headerSubMenuDiv);

      const subMenuUl = document.createElement('ul');
      subMenuUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      headerSubMenuDiv.append(subMenuUl);

      const subMenuTriParent = document.createElement('div');
      subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
      subMenuUl.append(subMenuTriParent);

      // Recursive transformation for hierarchyTree
      transformNestedLists(hierarchyRoot);
      // Move the transformed hierarchy into the sub-menu structure
      [...hierarchyRoot.children].forEach((childLi) => {
        const subMenuItem = document.createElement('li');
        subMenuItem.classList.add('header-comp__wrapper--sub-menu-item'); // Add base class
        const rootAnchorOrSpan = childLi.querySelector(':scope > a, :scope > span');
        if (rootAnchorOrSpan) {
          const subMenuLinkDiv = document.createElement('div');
          subMenuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');

          const subMenuWrapperLink = document.createElement('div');
          subMenuWrapperLink.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

          const linkSpanWrapper = document.createElement('a');
          linkSpanWrapper.classList.add('text-decoration-none', 'text-dark-gray-100');
          if (rootAnchorOrSpan.tagName === 'A') {
            linkSpanWrapper.href = rootAnchorOrSpan.href;
          }
          const subLinkSpan = document.createElement('span');
          subLinkSpan.classList.add('sub-link-span');
          subLinkSpan.textContent = rootAnchorOrSpan.textContent.trim();
          linkSpanWrapper.append(subLinkSpan);
          subMenuWrapperLink.append(linkSpanWrapper);

          const nestedSubChild = childLi.querySelector(':scope > .inner-childs');
          if (nestedSubChild) {
            subMenuItem.classList.add('child-below');
            subMenuLinkDiv.classList.add('dropdown-toggle');
            subMenuLinkDiv.setAttribute('aria-expanded', 'false');

            const arrowIconRight = document.createElement('span');
            arrowIconRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
            const desktopArrowImg = arrowIconDesktopCell.querySelector('img');
            if (desktopArrowImg) {
              const optimizedPic = createOptimizedPicture(desktopArrowImg.src, desktopArrowImg.alt, false, [{ width: '16' }]);
              arrowIconRight.append(optimizedPic);
            } else {
              arrowIconRight.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L19.44 12l-6.47-6.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>';
            }
            subMenuWrapperLink.append(arrowIconRight);

            const mobileArrowIcon = document.createElement('span');
            mobileArrowIcon.classList.add('arrow-icon', 'd-lg-none', 'end-0');
            const mobileArrowImg = arrowIconMobileCell.querySelector('img');
            if (mobileArrowImg) {
              const optimizedPic = createOptimizedPicture(mobileArrowImg.src, mobileArrowImg.alt, false, [{ width: '16' }]);
              mobileArrowIcon.append(optimizedPic);
            } else {
              mobileArrowIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" /></svg>';
            }
            subMenuLinkDiv.append(mobileArrowIcon);
          } else {
            subMenuItem.classList.add('no-child');
          }

          subMenuLinkDiv.append(subMenuWrapperLink);
          subMenuItem.append(subMenuLinkDiv);
          if (nestedSubChild) {
            const innerChildsDiv = document.createElement('div');
            innerChildsDiv.classList.add('d-lg-none', 'inner-childs');
            innerChildsDiv.id = `subNavItem${i}`; // Using parent index for now, needs unique ID logic
            innerChildsDiv.dataset.id = `subNavItem${i}`;
            innerChildsDiv.append(nestedSubChild.firstChild); // Move the ul directly
            subMenuItem.append(innerChildsDiv);
          }
        }
        subMenuTriParent.append(subMenuItem);
      });

      const borderSection = document.createElement('div');
      borderSection.classList.add('borderr-section', 'd-none', 'd-lg-flex', 'd-xl-flex', 'align-items-end', 'position-absolute', 'no-prod');
      const borderBg = document.createElement('div');
      borderBg.classList.add('border-bg');
      borderSection.append(borderBg);
      subMenuUl.append(borderSection);

      li.append(subMenusDiv);

      toggleDropDown.addEventListener('click', () => {
        li.classList.toggle('show-nav');
        menuLinkDiv.classList.toggle('show');
        subMenusDiv.classList.toggle('show');
      });
    }

    li.prepend(menuLinkDiv);
    navUl.append(li);
  });

  // Search access
  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  containerDiv.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  searchDiv.append(searchIconDiv);

  const searchPicture = searchIconRow.querySelector('picture');
  if (searchPicture) {
    const searchImg = searchPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(searchImg.src, searchImg.alt, false, [{ width: '24' }]);
    searchIconDiv.append(optimizedPic);
  } else {
    searchIconDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" /></svg>';
  }
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-none', 'd-lg-block');
  searchSpan.textContent = 'Search';
  searchIconDiv.append(searchSpan);

  const headerOuterBox = document.createElement('div');
  headerOuterBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(headerOuterBox);

  // Global search section (initially hidden)
  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none'); // Initially hidden
  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');
  globalSearchSection.append(globalSearchWrapper);

  const formContainer = document.createElement('div');
  formContainer.classList.add('d-flex', 'justify-content-center', 'h-100');
  globalSearchWrapper.append(formContainer);

  const crossWrap = document.createElement('div');
  crossWrap.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const crossImgWrapper = document.createElement('div');
  crossImgWrapper.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  crossImgWrapper.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" /></svg>';
  crossWrap.append(crossImgWrapper);
  formContainer.append(crossWrap);

  const searchFormDiv = document.createElement('div');
  searchFormDiv.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.placeholder = 'Start typing...';
  searchFormDiv.append(searchInput);
  formContainer.append(searchFormDiv);

  const searchWrap = document.createElement('div');
  searchWrap.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchImgWrapper = document.createElement('div');
  searchImgWrapper.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  searchImgWrapper.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" /></svg>';
  searchWrap.append(searchImgWrapper);
  formContainer.append(searchWrap);
  globalSearchSection.append(globalSearchWrapper);

  const responseContainer = document.createElement('div');
  responseContainer.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const responseDiv = document.createElement('div');
  responseDiv.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  const resultsUl = document.createElement('ul');
  resultsUl.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  responseDiv.append(resultsUl);
  responseContainer.append(responseDiv);
  globalSearchSection.append(responseContainer);

  // Event listeners for search
  searchIconDiv.addEventListener('click', () => {
    globalSearchSection.classList.remove('d-none');
  });

  crossImgWrapper.addEventListener('click', () => {
    globalSearchSection.classList.add('d-none');
  });

  responseContainer.addEventListener('click', (e) => {
    if (e.target === responseContainer) {
      globalSearchSection.classList.add('d-none');
    }
  });

  toggler.addEventListener('click', () => {
    navMenus.classList.toggle('collapse');
    navMenus.classList.toggle('show');
    toggler.classList.toggle('collapsed');
    toggler.setAttribute('aria-expanded', navMenus.classList.contains('show'));
  });

  block.replaceChildren(headerComp, globalSearchSection);
}
