import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure the block children based on the EDS structure
  const [logoRow, logoLinkRow, homeIconRow, rightIcon1Row, rightIcon2Row, ...navItemRows] = [...block.children];

  const nav = document.createElement('nav');
  nav.classList.add('navbar', 'navbar-expand-lg');

  const container = document.createElement('div');
  container.classList.add('container');

  // Logo and Logo Link
  const navbarBrand = document.createElement('a');
  navbarBrand.classList.add('navbar-brand');
  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    navbarBrand.href = logoLink.href;
  }
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    navbarBrand.append(optimizedPic);
  } else {
    moveInstrumentation(logoRow.firstElementChild, navbarBrand);
    while (logoRow.firstElementChild.firstChild) navbarBrand.append(logoRow.firstElementChild.firstChild);
  }
  container.append(navbarBrand);

  // Mobile Search Form
  const mobileSearchForm = document.createElement('form');
  mobileSearchForm.classList.add('mobile_search', 'd-md-block', 'd-lg-none');
  const mobileSearchButton = document.createElement('button');
  mobileSearchButton.classList.add('btn');
  mobileSearchButton.type = 'button';
  const searchIcon = document.createElement('i');
  searchIcon.classList.add('fa-solid', 'fa-magnifying-glass');
  mobileSearchButton.append(searchIcon);
  mobileSearchForm.append(mobileSearchButton);
  container.append(mobileSearchForm);

  // Navbar Toggler
  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('navbar-toggler');
  navbarToggler.type = 'button';
  // data-bs-toggle="collapse" data-bs-target="#navbarScroll" are not needed in EDS
  navbarToggler.setAttribute('aria-controls', 'navbarScroll');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  navbarToggler.append(togglerIcon);
  container.append(navbarToggler);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('collapse', 'navbar-collapse');
  navbarCollapse.id = 'navbarScroll';

  const primaryMenu = document.createElement('ul');
  primaryMenu.id = 'primary-menu';
  primaryMenu.classList.add('main_nav', 'navbar-nav', 'me-auto', 'my-2', 'my-lg-0', 'navbar-nav-scroll');

  // Home Icon
  const homeNavItem = document.createElement('li');
  homeNavItem.classList.add('nav-item', 'home_nav', 'no_border', 'menu-item', 'menu-item-type-custom', 'menu-item-object-custom', 'current-menu-item', 'current_page_item', 'active', 'nav-item-25543');
  const homeNavLink = document.createElement('a');
  homeNavLink.classList.add('nav-link');
  homeNavLink.href = '/'; // Assuming home link is always '/'
  const homeSpan = document.createElement('span');
  homeSpan.classList.add('menu-image-title-hide', 'menu-image-title');
  homeSpan.textContent = 'Home';
  homeNavLink.append(homeSpan);
  const homePicture = homeIconRow.querySelector('picture');
  if (homePicture) {
    const img = homePicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
    optimizedPic.querySelector('img').classList.add('menu-image', 'menu-image-title-hide');
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    homeNavLink.append(optimizedPic);
  }
  homeNavItem.append(homeNavLink);
  primaryMenu.append(homeNavItem);

  // Navigation Items
  navItemRows.forEach((row, index) => {
    const navItem = document.createElement('li');
    moveInstrumentation(row, navItem);
    // Using a dynamic ID based on example, but generally prefer stable IDs if possible
    navItem.classList.add('nav-item', 'menu-item', 'menu-item-type-post_type', 'menu-item-object-page', `nav-item-${1189 + index}`);
    const cells = [...row.children];

    // Use content detection instead of index access for cells
    const linkCell = cells.find(cell => cell.querySelector('a'));
    // The 'text' cell is implicitly the one without a link if there are only two cells
    // const textCell = cells.find(cell => !cell.querySelector('a')); // Not explicitly used in current JS, but good practice

    const linkEl = document.createElement('a');
    linkEl.classList.add('nav-link');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        // Move content from the cell to the link element
        moveInstrumentation(linkCell, linkEl);
        while (linkCell.firstChild) linkEl.append(linkCell.firstChild);
      }
    }

    navItem.append(linkEl);
    primaryMenu.append(navItem);
  });

  navbarCollapse.append(primaryMenu);

  // Main Search (desktop)
  const mainSearchDiv = document.createElement('div');
  mainSearchDiv.classList.add('main_search');
  const searchForm = document.createElement('form');
  searchForm.role = 'search';
  searchForm.method = 'get';
  searchForm.classList.add('d-flex', 'custom_search', 'd-none', 'd-lg-block', 'search-form', 'js-header-location');
  searchForm.action = 'https://www.nhsinform.scot/search';

  const searchInput = document.createElement('input');
  searchInput.id = 'autocomplete-input';
  searchInput.type = 'search';
  searchInput.classList.add('form-control', 'search__input', 'js-search-auto--small', 'js-header-geolocation__input');
  searchInput.placeholder = 'Search NHS inform/Services';
  searchInput.value = '';
  searchInput.name = 'q';
  searchInput.title = 'Search for:';
  searchInput.autocomplete = 'off';

  const hiddenInputLocpt = document.createElement('input');
  hiddenInputLocpt.type = 'hidden';
  hiddenInputLocpt.id = 'locpt-global';
  hiddenInputLocpt.name = 'locpt';
  hiddenInputLocpt.value = '';
  hiddenInputLocpt.classList.add('js-header-locpt');

  const hiddenInputDs = document.createElement('input');
  hiddenInputDs.type = 'hidden';
  hiddenInputDs.id = 'ds';
  hiddenInputDs.name = 'ds';
  hiddenInputDs.value = '';

  const hiddenInputTab = document.createElement('input');
  hiddenInputTab.type = 'hidden';
  hiddenInputTab.id = 'tab';
  hiddenInputTab.name = 'tab';
  hiddenInputTab.value = 'inform';
  hiddenInputTab.classList.add('js-header-tab');

  const searchSubmitButton = document.createElement('button');
  searchSubmitButton.classList.add('btn');
  searchSubmitButton.type = 'submit';
  searchSubmitButton.value = 'Search';
  const searchSubmitIcon = document.createElement('i');
  searchSubmitIcon.classList.add('fa-solid', 'fa-magnifying-glass');
  searchSubmitButton.append(searchSubmitIcon);

  searchForm.append(searchInput, hiddenInputLocpt, hiddenInputDs, hiddenInputTab, searchSubmitButton);
  mainSearchDiv.append(searchForm);

  const autoSearchDiv = document.createElement('div');
  autoSearchDiv.classList.add('auto_search');
  autoSearchDiv.style.position = 'relative';
  autoSearchDiv.style.marginLeft = '100px';
  const autocompleteSuggestionsDiv = document.createElement('div');
  autocompleteSuggestionsDiv.classList.add('autocomplete-suggestions');
  autoSearchDiv.append(autocompleteSuggestionsDiv);
  mainSearchDiv.append(autoSearchDiv);

  navbarCollapse.append(mainSearchDiv);

  // Right Nav
  const navRight = document.createElement('ul');
  navRight.classList.add('nav_right', 'navbar-nav', 'navbar-nav-scroll');

  // Right Icon 1 (Listen with ReachDeck Toolbar)
  const rightNavItem1 = document.createElement('li');
  rightNavItem1.classList.add('nav-item');
  const rightNavLink1 = document.createElement('a');
  rightNavLink1.classList.add('nav-link', 'touch_pad');
  rightNavLink1.title = 'Listen with the ReachDeck Toolbar';
  rightNavLink1.href = 'javascript:void(0)';
  const rightPic1 = rightIcon1Row.querySelector('picture');
  if (rightPic1) {
    const img = rightPic1.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    rightNavLink1.append(optimizedPic);
  }
  rightNavItem1.append(rightNavLink1);
  navRight.append(rightNavItem1);

  // Right Icon 2 (User Info)
  const rightNavItem2 = document.createElement('li');
  rightNavItem2.classList.add('nav-item', 'user_info');
  const rightNavLink2 = document.createElement('a');
  rightNavLink2.classList.add('nav-link');
  rightNavLink2.href = 'https://www.nhsinform.scot/info-for-me';
  const rightSpan2 = document.createElement('span');
  rightSpan2.textContent = '0';
  rightNavLink2.append(rightSpan2);
  const rightPic2 = rightIcon2Row.querySelector('picture');
  if (rightPic2) {
    const img = rightPic2.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    rightNavLink2.prepend(optimizedPic); // Prepend to keep span '0' after
  }
  rightNavItem2.append(rightNavLink2);
  navRight.append(rightNavItem2);

  navbarCollapse.append(navRight);
  container.append(navbarCollapse);
  nav.append(container);

  block.textContent = '';
  block.append(nav);

  // Event listener for navbar toggler
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed'); // Add/remove 'collapsed' class for styling
    const expanded = navbarToggler.getAttribute('aria-expanded') === 'true';
    navbarToggler.setAttribute('aria-expanded', !expanded);
  });

  // The original JS had a redundant image optimization loop at the end.
  // Images are optimized when they are created (e.g., logo, home icon, right icons).
  // This general loop is not needed and can potentially re-process images.
  // Keeping it commented out as a reminder to avoid such patterns.
  /*
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  */
}
