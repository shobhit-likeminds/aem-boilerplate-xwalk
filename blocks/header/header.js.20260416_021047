import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0: CRITICAL - No row.children[n] in root destructuring.
  // The model defines 3 fixed fields (logo, logoLink, logoLinkLabel) followed by a container of navItems.
  // So, the first three rows are fixed fields, and the rest are navItemRows.
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(container);

  const headerNav = document.createElement('nav');
  headerNav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  container.append(headerNav);

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  headerNav.append(headerWrapper);

  // Hamburger button
  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  // Check 2: Interactivity - data-bs-toggle and data-bs-target from ORIGINAL HTML indicate a toggle.
  // The JS already has an addEventListener for hamburgerButton, which is good.
  hamburgerButton.setAttribute('data-bs-toggle', 'collapse'); // Added from ORIGINAL HTML
  hamburgerButton.setAttribute('data-bs-target', '#navbarSupportedContent'); // Added from ORIGINAL HTML
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
  headerWrapper.append(hamburgerButton);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');

  // Check 1: Structure Alignment - logoLinkRow is type=aem-content, so querySelector('a').href is correct.
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '#';
  }

  // Check 1: Structure Alignment - logoRow is type=reference, so querySelector('img') is correct.
  const logoImg = logoRow.querySelector('img');
  if (logoImg) {
    const optimizedPic = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '150' }]);
    optimizedPic.classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoImg.closest('picture'), optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoWrapper.append(logoLink);
  headerWrapper.append(logoWrapper);

  // Navigation menus
  const navMenus = document.createElement('div');
  navMenus.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navMenus.id = 'navbarSupportedContent';
  headerWrapper.append(navMenus);

  const navGroups = document.createElement('ul');
  navGroups.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navMenus.append(navGroups);

  navItemRows.forEach((row, index) => {
    // Check 0: CRITICAL - Replaced row.children[n] with destructuring for fixed-field item model.
    // Check 1: Structure Alignment - nav-item model has 5 fields: label (text), icon (reference), link (aem-content), linkLabel (text), subLinks (richtext).
    const [labelCell, iconCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];

    const navItem = document.createElement('li');
    navItem.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0');
    moveInstrumentation(row, navItem);

    const menuLinkDiv = document.createElement('div');
    menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

    // Check 1: Structure Alignment - iconCell is type=reference, so querySelector('img') is correct.
    const iconImg = iconCell.querySelector('img');
    if (iconImg) {
      const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]);
      optimizedIcon.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      moveInstrumentation(iconImg.closest('picture'), optimizedIcon.querySelector('img'));
      menuLinkDiv.append(optimizedIcon);
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');
    // Check 1: Structure Alignment - linkCell is type=aem-content, so querySelector('a').href is correct.
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    } else {
      anchor.href = '#';
    }

    const spanLink = document.createElement('span');
    spanLink.classList.add('link-span');
    // Check 1: Structure Alignment - linkLabelCell and labelCell are type=text, so .textContent.trim() is correct.
    spanLink.textContent = linkLabelCell.textContent.trim() || labelCell.textContent.trim();
    anchor.append(spanLink);
    menuLinkDiv.append(anchor);

    // Check 1: Structure Alignment - subLinksCell is type=richtext, so querySelector('ul') is correct for nested lists.
    const subList = subLinksCell.querySelector('ul');
    if (subList) {
      navItem.classList.add('dropdown', 'flex-column', 'border-lg-0', 'show-nav', 'position-relative', 'left-division');
      menuLinkDiv.classList.add('dropdown-toggle');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const toggleIcon = document.createElement('img');
      toggleIcon.alt = 'svg file';
      toggleIcon.src = '/icons/arrow-down.svg'; // Placeholder, replace with actual icon path if available in model
      toggleDropDown.append(toggleIcon);
      menuLinkDiv.append(toggleDropDown);

      const subMenus = document.createElement('div');
      subMenus.classList.add('header-comp__sub-menus');
      subMenus.id = `leftHeaderItem${index}`;
      subMenus.setAttribute('data-id', `leftHeaderItem${index}`);

      const subMenuUl = document.createElement('ul');
      subMenuUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');

      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('header-comp__sub-menu', 'tri-parent');
      subMenuUl.append(subMenuContainer);

      // Move subList content into the new structure
      [...subList.children].forEach((subLi) => {
        const subMenuItem = document.createElement('li');
        subMenuItem.classList.add('header-comp__wrapper--sub-menu-item');
        moveInstrumentation(subLi, subMenuItem);

        const subLinkDiv = document.createElement('div');
        subLinkDiv.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');

        const subLinkWrapper = document.createElement('div');
        subLinkWrapper.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

        const subAnchor = subLi.querySelector('a') || document.createElement('a');
        subAnchor.classList.add('text-decoration-none', 'text-dark-gray-100');
        const subLinkSpan = document.createElement('span');
        subLinkSpan.classList.add('sub-link-span');
        subLinkSpan.textContent = subAnchor.textContent.trim();
        subAnchor.textContent = '';
        subAnchor.append(subLinkSpan);

        subLinkWrapper.append(subAnchor);
        subLinkDiv.append(subLinkWrapper);
        subMenuItem.append(subLinkDiv);

        const nestedUl = subLi.querySelector('ul');
        if (nestedUl) {
          subMenuItem.classList.add('child-below');
          subLinkDiv.classList.add('dropdown-toggle');
          subLinkDiv.setAttribute('aria-expanded', 'false');

          const arrowRight = document.createElement('span');
          arrowRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
          const arrowRightImg = document.createElement('img');
          arrowRightImg.alt = 'svg file';
          arrowRightImg.src = '/icons/arrow-right.svg'; // Placeholder
          arrowRight.append(arrowRightImg);
          subLinkWrapper.append(arrowRight);

          const arrowDownMobile = document.createElement('span');
          arrowDownMobile.classList.add('arrow-icon', 'd-lg-none', 'end-0'); // Corrected class name from ORIGINAL HTML
          const arrowDownMobileImg = document.createElement('img');
          arrowDownMobileImg.alt = 'svg file';
          arrowDownMobileImg.src = '/icons/arrow-down.svg'; // Placeholder
          arrowDownMobile.append(arrowDownMobileImg);
          subLinkDiv.append(arrowDownMobile);

          const innerChilds = document.createElement('div');
          innerChilds.classList.add('d-lg-none', 'inner-childs');
          innerChilds.id = `subNavItem${index}`; // This id might need to be dynamic for nested items
          innerChilds.setAttribute('data-id', `subNavItem${index}`);

          const innerXfPage = document.createElement('div');
          innerXfPage.classList.add('xfpage', 'page', 'basicpage');
          const innerGrid = document.createElement('div');
          innerGrid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
          const innerHeaderSubMenu = document.createElement('div');
          innerHeaderSubMenu.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');
          innerGrid.append(innerHeaderSubMenu);
          innerXfPage.append(innerGrid);

          const innerSubMenuUl = document.createElement('ul');
          innerSubMenuUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
          const innerSubMenuContainer = document.createElement('div');
          innerSubMenuContainer.classList.add('header-comp__sub-menu', 'tri-parent');
          innerSubMenuUl.append(innerSubMenuContainer);

          // Move nestedUl content into innerSubMenuContainer
          while (nestedUl.firstChild) {
            innerSubMenuContainer.append(nestedUl.firstChild);
          }

          innerHeaderSubMenu.append(innerSubMenuUl);
          innerChilds.append(innerXfPage);
          subMenuItem.append(innerChilds);

          // Check 2: Interactivity - Added event listener for nested dropdown
          subLinkDiv.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent parent dropdown from toggling
            innerChilds.classList.toggle('d-lg-none'); // Toggle visibility for mobile
            subLinkDiv.classList.toggle('collapsed');
            subLinkDiv.setAttribute('aria-expanded', subLinkDiv.classList.contains('collapsed') ? 'false' : 'true');
          });
        } else {
          subMenuItem.classList.add('no-child');
        }
        subMenuContainer.append(subMenuItem);
      });

      subMenus.append(subMenuUl);
      navItem.append(subMenus);

      // Check 2: Interactivity - Added event listener for main dropdown
      menuLinkDiv.addEventListener('click', (e) => {
        e.preventDefault();
        navItem.classList.toggle('show-nav');
        menuLinkDiv.classList.toggle('collapsed');
        menuLinkDiv.setAttribute('aria-expanded', navItem.classList.contains('show-nav') ? 'true' : 'false');
      });
    } else {
      navItem.classList.add('p-lg-0', 'border-bottom-lg-0');
    }

    navItem.append(menuLinkDiv);
    navGroups.append(navItem);
  });

  // Search and access
  const searchAccess = document.createElement('div');
  searchAccess.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  container.append(searchAccess);

  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('header-comp__wrapper--search');
  searchAccess.append(searchWrapper);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  const searchIconImg = document.createElement('img');
  searchIconImg.alt = 'svg file';
  searchIconImg.src = '/icons/search.svg'; // Placeholder
  searchIconDiv.append(searchIconImg);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-none', 'd-lg-block');
  searchSpan.textContent = 'Search';
  searchIconDiv.append(searchSpan);
  searchWrapper.append(searchIconDiv);

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(outerBox);

  // Global search section (initially hidden)
  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none'); // Initially hidden
  globalSearchSection.innerHTML = `
    <div class="w-100 z-4 global-search__wrapper pb-md-5 pb-lg-6 pt-lg-0 pt-md-0 pt-2 pb-2">
      <div class="d-flex justify-content-center h-100">
        <div class="d-lg-block align-items-center d-flex">
          <div class="cross-wrap d-flex justify-content-center align-items-center">
            <img alt="svg file" src="/icons/cross.svg"/>
          </div>
        </div>
        <div class="global-search__wrapper--form d-flex align-items-center justify-content-center">
          <input type="text" class="global-search__wrapper--form-input pb-1 pb-md-1 pb-lg-3 px-lg-4" placeholder="Start typing..." data-path="/content/svasti/in/en" data-limit="5" data-error="<p><b>Sorry, we cannot find what you are looking for :(</b></p><p>&nbsp;</p><p>Please try a new search term or browse through one of our product categories.</p>">
        </div>
        <div class="d-lg-block align-items-center d-flex">
          <div class="search-wrap d-flex justify-content-center align-items-center">
            <img alt="svg file" src="/icons/search-icon.svg"/>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center w-100 close-on-click">
      <div class="global-search__response d-flex justify-content-start z-4 bg-transparent">
        <ul class="global-search__response--results m-0 w-100 d-none pt-5 pb-5 px-9"></ul>
      </div>
    </div>
  `;
  block.append(globalSearchSection);

  // Check 2: Interactivity - Add event listeners for search toggle
  searchIconDiv.addEventListener('click', () => {
    globalSearchSection.classList.remove('d-none');
  });

  globalSearchSection.querySelector('.cross-wrap').addEventListener('click', () => {
    globalSearchSection.classList.add('d-none');
  });

  // Check 2: Interactivity - Add event listener for hamburger menu toggle
  hamburgerButton.addEventListener('click', () => {
    navMenus.classList.toggle('collapse');
    navMenus.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
    hamburgerButton.setAttribute('aria-expanded', navMenus.classList.contains('show') ? 'true' : 'false');
  });

  block.textContent = '';
  block.append(headerComp);
}
