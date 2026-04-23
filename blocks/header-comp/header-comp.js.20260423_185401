import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Apply classes from ORIGINAL HTML to <a>, <ul>, <li> elements
    if (anchor) {
      anchor.classList.add('text-decoration-none', 'text-dark-gray-100'); // Example classes from ORIGINAL HTML
      if (anchor.nextElementSibling && anchor.nextElementSibling.tagName === 'UL') {
        li.classList.add('child-below'); // Example class for parent with children
      }
    }
    li.classList.add('header-comp__wrapper--sub-menu-item'); // Example class from ORIGINAL HTML

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
      // Apply classes to nested UL
      nested.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0'); // Example classes from ORIGINAL HTML
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('header-comp__sub-menus'); // Use class from original HTML
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
  headerComp.append(containerDiv);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  containerDiv.append(nav);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(wrapperDiv);

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');
  wrapperDiv.append(hamburgerButton);

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  hamburgerButton.append(togglerIcon);

  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    togglerIcon.append(span);
  }

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  wrapperDiv.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  const logoHref = logoLinkRow?.querySelector('a')?.href;
  if (logoHref) {
    logoLink.href = logoHref;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '150' }]);
    optimizedLogoPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoRow, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  }
  logoWrapper.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  wrapperDiv.append(navbarCollapse);

  const menuList = document.createElement('ul');
  menuList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(menuList);

  const menuItems = itemRows.filter((row) => row.children.length === 7);
  const searchItems = itemRows.filter((row) => row.children.length === 2);

  menuItems.forEach((row, index) => {
    const [iconCell, labelCell, linkCell, arrowIconDesktopCell, arrowIconMobileCell, submenuItemsCell, hierarchyCell] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0', 'position-relative');
    if (index % 2 === 0) {
      listItem.classList.add('left-division');
    } else {
      listItem.classList.add('right-division');
    }
    moveInstrumentation(row, listItem);

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '30' }]);
      optimizedIconPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkWrapper.append(optimizedIconPic);
    }

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    const linkHref = linkCell?.querySelector('a')?.href;
    if (linkHref) {
      linkAnchor.href = linkHref;
    }
    linkAnchor.setAttribute('data-link-region', 'Header');

    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = labelCell?.textContent.trim() || '';
    linkAnchor.append(linkSpan);
    menuLinkWrapper.append(linkAnchor);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      listItem.classList.add('dropdown', 'show-nav');
      menuLinkWrapper.classList.add('dropdown-toggle');
      menuLinkWrapper.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowIconDesktop = arrowIconDesktopCell?.querySelector('picture')?.querySelector('img');
      if (arrowIconDesktop) {
        const optimizedArrowPic = createOptimizedPicture(arrowIconDesktop.src, arrowIconDesktop.alt, false, [{ width: '20' }]);
        toggleDropDown.append(optimizedArrowPic);
      }
      menuLinkWrapper.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      subMenusDiv.id = `leftHeaderItem${index}`;
      subMenusDiv.setAttribute('data-id', `leftHeaderItem${index}`);

      const subMenuWrapper = document.createElement('div');
      subMenuWrapper.classList.add('xfpage', 'page', 'basicpage');
      subMenusDiv.append(subMenuWrapper);

      const gridDiv = document.createElement('div');
      gridDiv.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
      subMenuWrapper.append(gridDiv);

      const headerSubMenuDiv = document.createElement('div');
      headerSubMenuDiv.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');
      gridDiv.append(headerSubMenuDiv);

      const subMenuGroup = document.createElement('ul');
      subMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      headerSubMenuDiv.append(subMenuGroup);

      const subMenuTriParent = document.createElement('div');
      subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
      subMenuGroup.append(subMenuTriParent);

      // Create a temporary div to hold the hierarchy HTML and apply classes
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv

      // Apply classes to all <a>, <ul>, <li> elements within the hierarchy
      tempDiv.querySelectorAll('a').forEach(a => {
        a.classList.add('text-decoration-none', 'text-dark-gray-100');
        if (a.nextElementSibling && a.nextElementSibling.tagName === 'UL') {
          a.closest('li').classList.add('child-below');
        }
      });
      tempDiv.querySelectorAll('ul').forEach(ul => {
        ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      });
      tempDiv.querySelectorAll('li').forEach(li => {
        li.classList.add('header-comp__wrapper--sub-menu-item');
      });

      // Transform and append nested list
      transformNestedLists(tempDiv.querySelector('ul')); // Pass the actual root UL from tempDiv
      while (tempDiv.firstChild) {
        subMenuTriParent.append(tempDiv.firstChild);
      }

      toggleDropDown.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        listItem.classList.toggle('show-nav');
        menuLinkWrapper.classList.toggle('collapsed');
        subMenusDiv.classList.toggle('show');
      });
    }

    listItem.append(menuLinkWrapper);
    if (hierarchyRoot) {
      listItem.append(listItem.querySelector('.header-comp__sub-menus'));
    }
    menuList.append(listItem);
  });

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  containerDiv.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  searchDiv.append(searchIconDiv);

  searchItems.forEach((row) => {
    const [iconCell, labelCell] = [...row.children];
    const searchIconPicture = iconCell?.querySelector('picture');
    if (searchIconPicture) {
      const searchImg = searchIconPicture.querySelector('img');
      const optimizedSearchPic = createOptimizedPicture(searchImg.src, searchImg.alt, false, [{ width: '20' }]);
      searchIconDiv.append(optimizedSearchPic);
    }
    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    searchLabelSpan.textContent = labelCell?.textContent.trim() || '';
    searchIconDiv.append(searchLabelSpan);
    moveInstrumentation(row, searchIconDiv);
  });

  const outerBoxDiv = document.createElement('div');
  outerBoxDiv.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(outerBoxDiv);

  // Global search component (if present in original HTML)
  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none');

  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');
  globalSearchSection.append(globalSearchWrapper);

  const searchInnerDiv = document.createElement('div');
  searchInnerDiv.classList.add('d-flex', 'justify-content-center', 'h-100');
  globalSearchWrapper.append(searchInnerDiv);

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  searchInnerDiv.append(crossWrapDiv);

  const crossIconWrap = document.createElement('div');
  crossIconWrap.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  crossWrapDiv.append(crossIconWrap);

  const crossImg = document.createElement('img');
  // TODO: Add a field to the BlockJson model for the cross icon image if it needs to be authorable.
  crossImg.alt = 'svg file';
  crossImg.src = '/icons/cross.svg'; // Placeholder, replace with actual path if available
  crossIconWrap.append(crossImg);

  const searchFormDiv = document.createElement('div');
  searchFormDiv.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  searchInnerDiv.append(searchFormDiv);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.placeholder = 'Start typing...';
  searchInput.setAttribute('data-path', '/content/svasti/in/en');
  searchInput.setAttribute('data-limit', '5');
  searchInput.setAttribute('data-error', '<p><b>Sorry, we cannot find what you are looking for :(</b></p>\n<p>&nbsp;</p>\n<p>Please try a new search term or browse through one of our product categories.</p>\n');
  searchFormDiv.append(searchInput);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  searchInnerDiv.append(searchWrapDiv);

  const searchIconWrap = document.createElement('div');
  searchIconWrap.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  searchWrapDiv.append(searchIconWrap);

  const searchImg = document.createElement('img');
  // TODO: Add a field to the BlockJson model for the search icon image if it needs to be authorable.
  searchImg.alt = 'svg file';
  searchImg.src = '/icons/search.svg'; // Placeholder, replace with actual path if available
  searchIconWrap.append(searchImg);

  const closeOnClickDiv = document.createElement('div');
  closeOnClickDiv.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  globalSearchSection.append(closeOnClickDiv);

  const searchResponseDiv = document.createElement('div');
  searchResponseDiv.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  closeOnClickDiv.append(searchResponseDiv);

  const resultsList = document.createElement('ul');
  resultsList.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  searchResponseDiv.append(resultsList);

  const globalDiv = document.createElement('div');
  globalDiv.classList.add('global');
  globalDiv.append(globalSearchSection);

  // Event listeners for hamburger menu
  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  // Event listener for search icon to toggle global search
  searchIconDiv.addEventListener('click', () => {
    globalSearchSection.classList.toggle('d-none');
    globalSearchSection.classList.toggle('d-block');
  });

  // Event listener for cross icon to close global search
  crossIconWrap.addEventListener('click', () => {
    globalSearchSection.classList.add('d-none');
    globalSearchSection.classList.remove('d-block');
  });

  block.replaceChildren(headerComp, globalDiv);

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
