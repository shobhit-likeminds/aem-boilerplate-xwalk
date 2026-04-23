import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
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
      subWrap.classList.add('header-comp__sub-menus'); // Use original HTML class
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'dropdown-toggle', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
        const arrowIcon = document.createElement('span');
        arrowIcon.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
        // This SVG should come from a model field if it's not a static asset.
        // For now, keeping it hardcoded as it's a generic arrow, but ideally it would be a reference field.
        arrowIcon.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776936348138.svg+xml"/>';
        trigger.append(arrowIcon);

        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('show-nav');
          trigger.classList.toggle('collapsed');
          subWrap.classList.toggle('show');
        });
      }
    }
    // Apply classes to nested elements from the original HTML
    li.querySelectorAll('ul').forEach(ul => ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0'));
    li.querySelectorAll('li').forEach(nestedLi => nestedLi.classList.add('header-comp__wrapper--sub-menu-item'));
    li.querySelectorAll('a').forEach(nestedA => nestedA.classList.add('text-decoration-none', 'text-dark-gray-100'));
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [logoRow, logoLinkRow, ...itemRows] = children;

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');
  moveInstrumentation(block, headerComp);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(containerDiv);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  containerDiv.append(nav);

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(headerWrapper);

  // Hamburger button
  const toggler = document.createElement('button');
  toggler.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  toggler.innerHTML = `
    <span class="navbar-toggler-icon d-flex flex-column justify-content-center align-items-center">
      <span class="d-block bg-white"></span>
      <span class="d-block bg-white"></span>
      <span class="d-block bg-white"></span>
    </span>
  `;
  headerWrapper.append(toggler);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  headerWrapper.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  moveInstrumentation(logoLinkRow, logoLink);
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    logoLink.append(optimizedLogo);
    optimizedLogo.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
  }
  logoWrapper.append(logoLink);

  // Navigation Menus
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  headerWrapper.append(navbarCollapse);

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(navList);

  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
  });

  // Collect search icon items separately to append later
  const searchIconItems = [];

  itemRows.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0');
    moveInstrumentation(row, li);

    if (cells.length === 7) { // header-nav-item
      const [iconCell, labelCell, linkCell, dropdownArrowIconDesktopCell, dropdownArrowIconMobileCell, subMenuItemsCell, hierarchyCell] = cells;

      const foundLink = linkCell?.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
        rootEl.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
        const span = document.createElement('span');
        span.classList.add('link-span');
        span.textContent = labelCell?.textContent.trim() || '';
        rootEl.append(span);
      } else {
        rootEl = document.createElement('span');
        rootEl.textContent = labelCell?.textContent.trim() || '';
      }

      const menuLinkDiv = document.createElement('div');
      menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

      const mobileIcon = iconCell.querySelector('picture');
      if (mobileIcon) {
        const img = mobileIcon.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkDiv.append(optimizedPic);
      }
      menuLinkDiv.append(rootEl);

      const hierarchyRootUl = hierarchyCell?.querySelector('ul');
      if (hierarchyRootUl) {
        li.classList.add('dropdown', 'flex-column', 'border-lg-0', 'position-relative', 'left-division'); // Add dropdown classes
        const arrowIcon = document.createElement('span');
        arrowIcon.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
        const arrowImg = dropdownArrowIconDesktopCell.querySelector('picture')?.querySelector('img');
        if (arrowImg) {
          const optimizedArrow = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(arrowImg, optimizedArrow.querySelector('img'));
          arrowIcon.append(optimizedArrow);
        }
        menuLinkDiv.append(arrowIcon);
        menuLinkDiv.classList.add('dropdown-toggle');
        menuLinkDiv.setAttribute('aria-expanded', 'false');

        const subMenusDiv = document.createElement('div');
        subMenusDiv.classList.add('header-comp__sub-menus');
        subMenusDiv.id = `headerItem${navList.children.length}`; // Unique ID for each dropdown

        // Create a temporary div to hold the hierarchy-tree content and apply classes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv

        // Apply classes to nested elements within the hierarchy-tree
        tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0'));
        tempDiv.querySelectorAll('li').forEach(nestedLi => nestedLi.classList.add('header-comp__wrapper--sub-menu-item'));
        tempDiv.querySelectorAll('a').forEach(nestedA => nestedA.classList.add('text-decoration-none', 'text-dark-gray-100'));

        // Move children from tempDiv to subMenusDiv
        while (tempDiv.firstChild) {
          subMenusDiv.append(tempDiv.firstChild);
        }

        transformNestedLists(subMenusDiv); // Transform nested lists recursively

        menuLinkDiv.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('show-nav');
          menuLinkDiv.classList.toggle('collapsed');
          subMenusDiv.classList.toggle('show');
        });
        li.append(menuLinkDiv, subMenusDiv);
      } else {
        li.append(menuLinkDiv);
      }
    } else if (cells.length === 5) { // header-nav-submenu-item
      const [labelCell, linkCell, submenuArrowIconDesktopCell, submenuArrowIconMobileCell, subSubMenuItemsCell] = cells;
      const foundLink = linkCell?.querySelector('a');

      const menuLinkDiv = document.createElement('div');
      menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
      
      const subMenuLinkDiv = document.createElement('div');
      subMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

      const anchor = document.createElement('a');
      anchor.classList.add('text-decoration-none', 'text-dark-gray-100');
      if (foundLink) anchor.href = foundLink.href;
      const span = document.createElement('span');
      span.classList.add('sub-link-span');
      span.textContent = labelCell?.textContent.trim() || '';
      anchor.append(span);
      subMenuLinkDiv.append(anchor);

      const subSubmenuRoot = subSubMenuItemsCell.querySelector('ul'); // Assuming subSubMenuItems are nested as a UL
      if (subSubmenuRoot) {
        li.classList.add('child-below');
        menuLinkDiv.classList.add('dropdown-toggle');
        menuLinkDiv.setAttribute('aria-expanded', 'false');

        const arrowIconRight = document.createElement('span');
        arrowIconRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
        const desktopArrowImg = submenuArrowIconDesktopCell.querySelector('picture')?.querySelector('img');
        if (desktopArrowImg) {
          const optimizedArrow = createOptimizedPicture(desktopArrowImg.src, desktopArrowImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(desktopArrowImg, optimizedArrow.querySelector('img'));
          arrowIconRight.append(optimizedArrow);
        }
        subMenuLinkDiv.append(arrowIconRight);

        const arrowIconMobile = document.createElement('span');
        arrowIconMobile.classList.add('arrow-icon', 'd-lg-none', 'end-0', 'd-lg-none');
        const mobileArrowImg = submenuArrowIconMobileCell.querySelector('picture')?.querySelector('img');
        if (mobileArrowImg) {
          const optimizedArrow = createOptimizedPicture(mobileArrowImg.src, mobileArrowImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(mobileArrowImg, optimizedArrow.querySelector('img'));
          arrowIconMobile.append(optimizedArrow);
        }
        menuLinkDiv.append(arrowIconMobile);

        const innerChildsDiv = document.createElement('div');
        innerChildsDiv.classList.add('d-lg-none', 'inner-childs');
        innerChildsDiv.id = `subNavItem${navList.children.length}`; // Unique ID
        innerChildsDiv.append(subSubmenuRoot);
        transformNestedLists(subSubmenuRoot); // Transform nested lists recursively

        menuLinkDiv.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('show-nav');
          menuLinkDiv.classList.toggle('collapsed');
          innerChildsDiv.classList.toggle('show');
        });
        menuLinkDiv.prepend(subMenuLinkDiv);
        li.append(menuLinkDiv, innerChildsDiv);
      } else {
        menuLinkDiv.prepend(subMenuLinkDiv);
        li.append(menuLinkDiv);
      }
    } else if (cells.length === 2 && cells[0].textContent.trim() && cells[1].querySelector('a')) { // header-nav-subsubmenu-item
      const [labelCell, linkCell] = cells;
      li.classList.add('header-comp__wrapper--sub-menu-item', 'no-child');

      const menuLinkDiv = document.createElement('div');
      menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');

      const subMenuLinkDiv = document.createElement('div');
      subMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

      const anchor = document.createElement('a');
      anchor.classList.add('text-decoration-none', 'text-dark-gray-100');
      anchor.href = linkCell.querySelector('a')?.href || '#';
      const span = document.createElement('span');
      span.classList.add('sub-link-span');
      span.textContent = labelCell?.textContent.trim() || '';
      anchor.append(span);
      subMenuLinkDiv.append(anchor);
      menuLinkDiv.append(subMenuLinkDiv);
      li.append(menuLinkDiv);
    } else if (cells.length === 3 && cells[0].querySelector('picture') && cells[1].textContent.trim() && cells[2].querySelector('a')) { // header-nav-simple-item
      const [iconCell, labelCell, linkCell] = cells;
      const foundLink = linkCell?.querySelector('a');

      const menuLinkDiv = document.createElement('div');
      menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

      const mobileIcon = iconCell.querySelector('picture');
      if (mobileIcon) {
        const img = mobileIcon.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkDiv.append(optimizedPic);
      }

      const anchor = document.createElement('a');
      anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
      if (foundLink) anchor.href = foundLink.href;
      const span = document.createElement('span');
      span.classList.add('link-span');
      span.textContent = labelCell?.textContent.trim() || '';
      anchor.append(span);
      menuLinkDiv.append(anchor);
      li.append(menuLinkDiv);
    } else if (cells.length === 2 && cells[0].querySelector('picture') && cells[1].textContent.trim()) { // header-search-icon
      // This is a search icon, not a nav item, so it should go into the search-access div
      // We will append it later to the search access div, not the navList
      searchIconItems.push({ row, cells });
      return;
    }
    navList.append(li);
  });

  // Search Access Div
  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  containerDiv.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  // Append the collected search icon items to the searchDiv
  searchIconItems.forEach(({ row, cells }) => {
    const [iconCell, labelCell] = cells;
    const searchIconWrapper = document.createElement('div');
    searchIconWrapper.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
    moveInstrumentation(row, searchIconWrapper); // Move instrumentation from original row to new wrapper

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').alt = 'svg file';
      searchIconWrapper.append(optimizedPic);
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('d-none', 'd-lg-block');
    labelSpan.textContent = labelCell?.textContent.trim() || '';
    searchIconWrapper.append(labelSpan);

    searchIconWrapper.addEventListener('click', () => {
      const globalSearch = document.querySelector('.global-search');
      if (globalSearch) {
        globalSearch.classList.toggle('d-none');
      }
    });
    searchDiv.append(searchIconWrapper);
  });


  const headerOuterBox = document.createElement('div');
  headerOuterBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(headerOuterBox);

  block.replaceChildren(headerComp);

  // Image optimization for all images in the block
  headerComp.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
