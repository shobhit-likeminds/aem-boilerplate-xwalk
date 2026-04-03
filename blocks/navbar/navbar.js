import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, ...navItemRows] = [...block.children];

  const header = document.createElement('header');
  const nav = document.createElement('nav');
  nav.classList.add('navbar', 'navbar-expand-lg');

  const container = document.createElement('div');
  container.classList.add('container');

  // Logo and Logo Link
  const brandLink = document.createElement('a');
  brandLink.classList.add('navbar-brand');
  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    brandLink.href = logoLink.href;
    moveInstrumentation(logoLinkRow, brandLink);
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      brandLink.append(optimizedPic);
    }
  }

  container.append(brandLink);

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
  navbarToggler.setAttribute('aria-controls', 'navbarScroll');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('navbar-toggler-icon');
  navbarToggler.append(togglerSpan);
  container.append(navbarToggler);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('collapse', 'navbar-collapse');
  navbarCollapse.id = 'navbarScroll';

  // Toggle functionality for navbarToggler
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed'); // Add/remove 'collapsed' class for visual state if needed
    const expanded = navbarCollapse.classList.contains('show');
    navbarToggler.setAttribute('aria-expanded', expanded);
  });

  // Navigation Items
  const primaryMenu = document.createElement('ul');
  primaryMenu.id = 'primary-menu';
  primaryMenu.classList.add('main_nav', 'navbar-nav', 'me-auto', 'my-2', 'my-lg-0', 'navbar-nav-scroll');

  navItemRows.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('nav-item');

    const cells = [...row.children];
    let linkEl;
    let labelText;
    let iconPicture;

    // Content detection for cells based on BlockJson structure
    // cell[0]: link (aem-content)
    // cell[1]: label (text)
    // cell[2]: icon (reference)
    cells.forEach((cell) => {
      if (cell.querySelector('a')) {
        linkEl = cell.querySelector('a');
      } else if (cell.querySelector('picture')) {
        iconPicture = cell.querySelector('picture');
      } else if (cell.textContent.trim()) { // Assuming the label is plain text if no link or picture
        labelText = cell.textContent.trim();
      }
    });

    if (linkEl) {
      const navLink = document.createElement('a');
      navLink.classList.add('nav-link');
      navLink.href = linkEl.href;
      moveInstrumentation(linkEl, navLink);

      const span = document.createElement('span');
      span.classList.add('menu-image-title-hide', 'menu-image-title');
      span.textContent = labelText || linkEl.textContent.trim();
      navLink.append(span);

      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
          optimizedPic.classList.add('menu-image', 'menu-image-title-hide');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          navLink.append(optimizedPic);
        }
      }
      li.append(navLink);
    } else if (labelText) {
      const span = document.createElement('span');
      span.classList.add('nav-link'); // Apply nav-link style even if not a real link
      span.textContent = labelText;
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
          optimizedPic.classList.add('menu-image', 'menu-image-title-hide');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          span.prepend(optimizedPic);
        }
      }
      li.append(span);
    }

    // Add specific classes for the first nav item (Home) if it matches the pattern
    if (index === 0 && li.querySelector('a')?.href.endsWith('/')) {
      li.classList.add('home_nav', 'no_border', 'menu-item', 'menu-item-type-custom', 'menu-item-object-custom', 'current-menu-item', 'current_page_item', 'active', 'nav-item-25543');
    } else {
      // Use a consistent pattern for other nav-item IDs, matching original HTML if possible
      // The original HTML uses specific IDs like nav-item-1189, nav-item-1247 etc.
      // For generated items, we can use a base ID + index, or omit specific IDs if not critical for styling/scripting.
      // For this review, we'll keep the example ID pattern as it was, but note it's an example.
      li.classList.add('menu-item', 'menu-item-type-post_type', 'menu-item-object-page', `nav-item-${1189 + index}`); // Example ID, adjust as per actual site needs
    }

    primaryMenu.append(li);
  });
  navbarCollapse.append(primaryMenu);

  // Main Search (Desktop)
  const mainSearchDiv = document.createElement('div');
  mainSearchDiv.classList.add('main_search');
  const searchForm = document.createElement('form');
  searchForm.classList.add('d-flex', 'custom_search', 'd-none', 'd-lg-block', 'search-form', 'js-header-location');
  searchForm.role = 'search';
  searchForm.method = 'get';
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
  searchForm.append(searchInput);

  const locptInput = document.createElement('input');
  locptInput.type = 'hidden';
  locptInput.id = 'locpt-global';
  locptInput.name = 'locpt';
  locptInput.value = '';
  locptInput.classList.add('js-header-locpt');
  searchForm.append(locptInput);

  const dsInput = document.createElement('input');
  dsInput.type = 'hidden';
  dsInput.id = 'ds';
  dsInput.name = 'ds';
  dsInput.value = '';
  searchForm.append(dsInput);

  const tabInput = document.createElement('input');
  tabInput.type = 'hidden';
  tabInput.id = 'tab';
  tabInput.name = 'tab';
  tabInput.value = 'inform';
  tabInput.classList.add('js-header-tab');
  searchForm.append(tabInput);

  const searchSubmitButton = document.createElement('button');
  searchSubmitButton.classList.add('btn');
  searchSubmitButton.type = 'submit';
  searchSubmitButton.value = 'Search';
  const submitIcon = document.createElement('i');
  submitIcon.classList.add('fa-solid', 'fa-magnifying-glass');
  searchSubmitButton.append(submitIcon);
  searchForm.append(searchSubmitButton);

  mainSearchDiv.append(searchForm);

  const autoSearchDiv = document.createElement('div');
  autoSearchDiv.classList.add('auto_search');
  autoSearchDiv.style.position = 'relative';
  autoSearchDiv.style.marginLeft = '100px'; // This style is from the original HTML's inline style
  const autocompleteSuggestions = document.createElement('div');
  autocompleteSuggestions.classList.add('autocomplete-suggestions');
  autoSearchDiv.append(autocompleteSuggestions);
  mainSearchDiv.append(autoSearchDiv);
  navbarCollapse.append(mainSearchDiv);

  // Nav Right
  const navRight = document.createElement('ul');
  navRight.classList.add('nav_right', 'navbar-nav', 'navbar-nav-scroll');

  const listenLi = document.createElement('li');
  listenLi.classList.add('nav-item');
  const listenLink = document.createElement('a');
  listenLink.classList.add('nav-link', 'touch_pad');
  listenLink.title = 'Listen with the ReachDeck Toolbar';
  listenLink.href = 'javascript:void(0)';
  const listenImg = document.createElement('img');
  listenImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775212784286.svg+xml'; // This is a fixed SVG path from original HTML
  listenLink.append(listenImg);
  listenLi.append(listenLink);
  navRight.append(listenLi);

  const userInfoLi = document.createElement('li');
  userInfoLi.classList.add('nav-item', 'user_info');
  const userInfoLink = document.createElement('a');
  userInfoLink.classList.add('nav-link');
  userInfoLink.href = 'https://www.nhsinform.scot/info-for-me';
  const userInfoSpan = document.createElement('span');
  userInfoSpan.textContent = '0';
  userInfoLink.append(userInfoSpan);
  userInfoLi.append(userInfoLink);
  navRight.append(userInfoLi);

  navbarCollapse.append(navRight);
  container.append(navbarCollapse);
  nav.append(container);
  header.append(nav);

  // Image optimization for all images in the block
  header.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(header);
}
