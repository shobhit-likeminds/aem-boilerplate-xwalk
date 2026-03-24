import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // BlockJson indicates 7 root model fields.
  // The JS destructures 7 rows, which aligns with the BlockJson.
  const [
    logoImageRow,
    logoLinkRow,
    navigationItemsContainerRow, // This is a container, not actual items
    countryCodeRow,
    countryFlagRow,
    dropdownIconRow,
    countryOptionsContainerRow, // This is a container, not actual options
    ...itemRows // Remaining rows are actual navigation or country options
  ] = [...block.children];

  const header = document.createElement('header');
  header.classList.add('header-itc-header-section');

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const nav = document.createElement('nav');
  nav.classList.add(
    'header-navbar',
    'header-navbar-expand-xl',
    'header-navbar-light',
    'header-bg-light',
    'header-px-xl-5',
    'header-d-flex',
    'header-justify-content-between',
    'header-align-items-center',
  );
  container.append(nav);

  // Navbar Toggler
  const toggler = document.createElement('button');
  toggler.classList.add('header-navbar-toggler', 'header-collapsed');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('header-navbar-toggler-icon');
  toggler.append(togglerSpan);
  nav.append(toggler);

  const divDxlNone = document.createElement('div');
  divDxlNone.classList.add('header-d-xl-none');
  divDxlNone.innerHTML = '&nbsp;';
  nav.append(divDxlNone);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.target = '_blank';
    logoAnchor.classList.add('cmp-image__link');
    moveInstrumentation(logoLink, logoAnchor);

    const logoPicture = logoImageRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '131' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoAnchor.append(optimizedPic);
    }
    logoDiv.append(logoAnchor);
  } else {
    // If no link, just append the image directly
    const logoPicture = logoImageRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '131' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoDiv.append(optimizedPic);
    }
  }
  nav.append(logoDiv);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-collapse',
    'header-navbar-collapse',
    'header-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';
  nav.append(navbarCollapse);

  // Navigation Items
  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');
  const navElement = document.createElement('nav');
  navElement.classList.add('cmp-navigation');
  navElement.setAttribute('role', 'navigation');
  const navUl = document.createElement('ul');
  navUl.classList.add('cmp-navigation__group');

  // Filter itemRows for navigation items (link and label)
  // According to BlockJson, header-navigation-item has 2 fields: link (aem-content) and label (text)
  const navigationItems = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a'));
  navigationItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    moveInstrumentation(row, li);

    const linkCell = row.children[0];
    const labelCell = row.children[1];

    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      const link = document.createElement('a');
      link.classList.add('cmp-navigation__item-link');
      link.href = foundLink.href;
      link.textContent = labelCell.textContent.trim();
      li.append(link);
    }
    navUl.append(li);
  });
  navElement.append(navUl);
  navItemNavigation.append(navElement);
  navbarCollapse.append(navItemNavigation);

  const headerSectionDiv = document.createElement('div');
  headerSectionDiv.classList.add(
    'header-header-section',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-end',
  );
  navbarCollapse.append(headerSectionDiv);

  // Country Selector
  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add(
    'header-search-icon',
    'header-country-selector-trigger',
    'header-d-flex',
    'header-align-items-center',
  );

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  moveInstrumentation(countryCodeRow.firstElementChild, countryCodeSpan);
  countryCodeSpan.textContent = countryCodeRow.firstElementChild.textContent.trim();
  countrySelectorTrigger.append(countryCodeSpan);

  const countryFlagPicture = countryFlagRow.querySelector('picture');
  if (countryFlagPicture) {
    const img = countryFlagPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '19' }]);
    optimizedPic.querySelector('img').classList.add('header-header-country-flag');
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    countrySelectorTrigger.append(optimizedPic);
  }

  const dropdownIconPicture = dropdownIconRow.querySelector('picture');
  if (dropdownIconPicture) {
    const img = dropdownIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '19' }]);
    optimizedPic.querySelector('img').classList.add('header-dropdown-icon');
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    countrySelectorTrigger.append(optimizedPic);
  }
  headerSectionDiv.append(countrySelectorTrigger);

  // Search Icon (placeholder - behavior not implemented as per rules)
  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-icon-list');

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('header-search-block', 'header-hidden'); // Initially hidden

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('header-search-box');

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('header-search-container', 'header-hidden'); // Initially hidden

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = 'Search';
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchButtonImg = document.createElement('img');
  searchButtonImg.loading = 'lazy';
  searchButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchButtonImg.alt = 'Search icon';
  searchButton.append(searchButtonImg);
  searchContainer.append(searchButton);
  searchBox.append(searchContainer);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774353429510.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);
  searchBlock.append(searchBox);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden'); // Initially hidden

  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('header-resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestions);
  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pagesTitle = document.createElement('h4');
  pagesTitle.classList.add('header-resultList');
  pagesTitle.textContent = 'Pages';
  searchResults.append(pagesTitle);
  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('header-products');
  searchResults.append(productsList);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);
  searchBlock.append(searchResults);
  itcHeaderIconList.append(searchBlock);

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('header-nav-link');
  searchIconLink.id = 'searchIcon'; // Add ID for event listener
  const searchIconImg = document.createElement('img');
  searchIconImg.loading = 'lazy';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchIconImg.alt = 'Search icon';
  searchIconLink.append(searchIconImg);
  const searchIconSpan = document.createElement('span');
  searchIconSpan.classList.add('header-d-block');
  searchIconSpan.textContent = 'Search';
  searchIconLink.append(searchIconSpan);
  itcHeaderIconList.append(searchIconLink);

  const navItemLi = document.createElement('li');
  navItemLi.classList.add('header-nav-item');
  const navItemA = document.createElement('a');
  navItemA.classList.add('header-nav-link');
  navItemLi.append(navItemA);
  itcHeaderIconList.append(navItemLi);

  nav.append(itcHeaderIconList);

  // Modal (Country Selector)
  const countryModal = document.createElement('div');
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector');
  countryModal.id = 'countryModal';
  countryModal.setAttribute('tabindex', '-1');
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'none'; // Initially hidden

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  countryModal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content');
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header-modal-header', 'header-border-0', 'header-text-center');
  modalContent.append(modalHeader);

  const modalHeaderW100 = document.createElement('div');
  modalHeaderW100.classList.add('header-w-100');
  modalHeader.append(modalHeaderW100);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  modalHeaderW100.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text');
  experienceText.textContent = 'Experience';
  modalHeaderW100.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    'header-country-options',
    'header-d-flex',
    'header-justify-content-center',
    'header-align-items-center',
  );
  modalBody.append(countryOptionsDiv);

  // Filter itemRows for country options (flag image and country name)
  // According to BlockJson, header-country-option has 2 fields: flag-image (reference) and country-name (text)
  const countryOptions = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture'));
  countryOptions.forEach((row) => {
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add(
      'header-country-option',
      'header-mx-3',
      'header-d-flex',
      'header-flex-column',
      'header-align-items-center',
    );
    moveInstrumentation(row, countryOptionDiv);

    const flagImageCell = row.children[0];
    const countryNameCell = row.children[1];

    const flagPicture = flagImageCell.querySelector('picture');
    if (flagPicture) {
      const img = flagPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '19' }]);
      optimizedPic.querySelector('img').classList.add('header-country-flag');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      countryOptionDiv.append(optimizedPic);
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-country-name');
    countryNameP.textContent = countryNameCell.textContent.trim();
    countryOptionDiv.append(countryNameP);
    countryOptionsDiv.append(countryOptionDiv);
  });

  block.textContent = '';
  block.append(header);
  block.append(countryModal);

  // Event Listeners for interactive behavior
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.style.display = 'block';
    countryModal.classList.add('header-show');
  });

  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.style.display = 'none';
      countryModal.classList.remove('header-show');
    }
  });

  searchIconLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-hidden');
    searchContainer.classList.toggle('header-hidden');
    searchResults.classList.add('header-hidden'); // Ensure search results are hidden when opening search box
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
    searchContainer.classList.add('header-hidden');
    searchResults.classList.add('header-hidden');
    searchInput.value = ''; // Clear search input
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
