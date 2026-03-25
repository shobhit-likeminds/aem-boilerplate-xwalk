import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    navigationLinksContainerRow, // This row is a container, not an item itself
    countryFlagImageRow,
    countryCodeRow,
    dropdownIconImageRow,
    countryOptionsContainerRow, // This row is a container, not an item itself
    ...itemRows
  ] = [...block.children];

  const headerSection = document.createElement('header');
  headerSection.classList.add('header-itc-header-section');

  const container = document.createElement('div');
  container.classList.add('container');

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

  // Navbar Toggler
  const toggler = document.createElement('button');
  toggler.classList.add('header-navbar-toggler', 'header-collapsed');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('header-navbar-toggler-icon');
  toggler.append(togglerIcon);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('header-d-xl-none');
  dXlNone.innerHTML = '&nbsp;';

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  const logoImageWrapper = document.createElement('div');
  logoImageWrapper.classList.add('cmp-image', 'header-header-logo-div');

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
    logoLink.target = '_blank';
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoLink.classList.add('cmp-image__link');

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '131' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }

  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  logoLink.append(screenReaderSpan);

  logoImageWrapper.append(logoLink);
  logoDiv.append(logoImageWrapper);

  // Navbar Collapse
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-collapse',
    'header-navbar-collapse',
    'header-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';

  // Navigation Links
  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');
  const navigation = document.createElement('nav');
  navigation.classList.add('cmp-navigation');
  navigation.setAttribute('role', 'navigation');
  const navigationUl = document.createElement('ul');
  navigationUl.classList.add('cmp-navigation__group');

  // Filter for navigation-link items (they have 1 child cell with an <a> tag)
  const navigationLinks = itemRows.filter((row) => row.children.length === 1 && row.querySelector('a'));
  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.classList.add('cmp-navigation__item-link');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      li.append(newLink);
    }
    navigationUl.append(li);
  });

  navigation.append(navigationUl);
  navItemNavigation.append(navigation);

  // Header Section (Country Selector and Search)
  const headerSectionRight = document.createElement('div');
  headerSectionRight.classList.add(
    'header-header-section',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-end',
  );

  // Country Selector Trigger
  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add(
    'header-search-icon',
    'header-country-selector-trigger',
    'header-d-flex',
    'header-align-items-center',
  );

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  moveInstrumentation(countryCodeRow, countryCodeSpan);
  countryCodeSpan.textContent = countryCodeRow.textContent.trim();

  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-header-country-flag');
  const foundCountryFlagPic = countryFlagImageRow.querySelector('picture');
  if (foundCountryFlagPic) {
    const img = foundCountryFlagPic.querySelector('img');
    countryFlagImg.src = img.src;
    countryFlagImg.alt = img.alt;
    moveInstrumentation(img, countryFlagImg);
  }

  const dropdownIconImg = document.createElement('img');
  dropdownIconImg.classList.add('header-dropdown-icon');
  const foundDropdownIconPic = dropdownIconImageRow.querySelector('picture');
  if (foundDropdownIconPic) {
    const img = foundDropdownIconPic.querySelector('img');
    dropdownIconImg.src = img.src;
    dropdownIconImg.alt = img.alt;
    moveInstrumentation(img, dropdownIconImg);
  }

  countrySelectorTrigger.append(countryCodeSpan, countryFlagImg, dropdownIconImg);
  headerSectionRight.append(countrySelectorTrigger);

  navbarCollapse.append(navItemNavigation, headerSectionRight);

  // ITC Header Icon List (Search)
  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-icon-list');

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('header-search-block', 'header-hidden');

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('header-search-box');

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('header-search-container', 'header-hidden');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = 'Search';
  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchButtonImg = document.createElement('img');
  searchButtonImg.loading = 'lazy';
  searchButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchButtonImg.alt = 'Search icon';
  searchButton.append(searchButtonImg);
  searchContainer.append(searchInput, searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774373019495.svg+xml';
  closeButton.alt = 'Close icon';

  searchBox.append(searchContainer, closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');
  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add('header-resultList');
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.id = 'suggestionsList';
  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add('header-resultList');
  pagesH4.textContent = 'Pages';
  const productsListUl = document.createElement('ul');
  productsListUl.id = 'productsList';
  productsListUl.classList.add('header-products');
  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(
    popularSuggestionsH4,
    suggestionsListUl,
    pagesH4,
    productsListUl,
    viewAllButton,
  );

  searchBlock.append(searchBox, searchResults);

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('header-nav-link');
  const searchIconImg = document.createElement('img');
  searchIconImg.loading = 'lazy';
  searchIconImg.id = 'searchIcon';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchIconImg.alt = 'Search icon';
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchIconImg, searchSpan);

  itcHeaderIconList.append(searchBlock, searchIconLink);

  nav.append(toggler, dXlNone, logoDiv, navbarCollapse, itcHeaderIconList);
  container.append(nav);
  headerSection.append(container);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add(
    'header-modal',
    'header-fade',
    'header-itc-country-selector',
    'header-show',
  );
  countryModal.id = 'countryModal';
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'none'; // Initially hidden

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add(
    'header-modal-header',
    'header-border-0',
    'header-text-center',
  );
  const headerW100 = document.createElement('div');
  headerW100.classList.add('header-w-100');
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text');
  experienceText.textContent = 'Experience';
  headerW100.append(modalTitle, experienceText);
  modalHeader.append(headerW100);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    'header-country-options',
    'header-d-flex',
    'header-justify-content-center',
    'header-align-items-center',
  );

  // Filter for country-option items (they have 2 child cells)
  const countryOptions = itemRows.filter((row) => row.children.length === 2);
  countryOptions.forEach((row) => {
    const optionDiv = document.createElement('div');
    moveInstrumentation(row, optionDiv);
    optionDiv.classList.add(
      'header-country-option',
      'header-mx-3',
      'header-d-flex',
      'header-flex-column',
      'header-align-items-center',
    );

    const flagImageCell = row.children[0];
    const countryNameCell = row.children[1];

    const flagImg = document.createElement('img');
    flagImg.classList.add('header-country-flag');
    const foundFlagPic = flagImageCell.querySelector('picture');
    if (foundFlagPic) {
      const img = foundFlagPic.querySelector('img');
      flagImg.src = img.src;
      flagImg.alt = img.alt;
      moveInstrumentation(img, flagImg);
    }
    // Ensure class name is derived from the actual country name content
    const countryName = countryNameCell.textContent.trim().toLowerCase().replace(/\s/g, '-');
    flagImg.classList.add(`header-${countryName}-flag`);
    optionDiv.dataset.country = countryName; // Add data attribute for easier selection

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-country-name');
    countryNameP.textContent = countryNameCell.textContent.trim();

    optionDiv.append(flagImg, countryNameP);
    countryOptionsDiv.append(optionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);

  // Event Listeners
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
    toggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.style.display = 'block';
    countryModal.classList.add('header-show');
  });

  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) { // Close modal when clicking outside
      countryModal.style.display = 'none';
      countryModal.classList.remove('header-show');
    }
  });

  // Add event listener for country options inside the modal
  countryOptionsDiv.querySelectorAll('.header-country-option').forEach((option) => {
    option.addEventListener('click', () => {
      // Example: Update country code and flag, then close modal
      const selectedCountryCode = option.querySelector('.header-country-name').textContent.trim();
      const selectedFlagSrc = option.querySelector('.header-country-flag').src;

      countryCodeSpan.textContent = selectedCountryCode;
      countryFlagImg.src = selectedFlagSrc;

      countryModal.style.display = 'none';
      countryModal.classList.remove('header-show');

      // You might want to redirect or update content based on the selected country
      console.log(`Country selected: ${selectedCountryCode}`);
    });
  });


  // Search functionality
  searchIconLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-hidden');
    searchContainer.classList.add('header-hidden'); // Hide search input when opening/closing search block
    searchResults.classList.add('header-hidden'); // Hide search results when opening/closing search block
    searchInput.value = ''; // Clear search input
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
  });

  searchButton.addEventListener('click', () => {
    // Implement search logic here
    console.log('Search initiated for:', searchInput.value);
    // For demonstration, show search results
    searchResults.classList.remove('header-hidden');
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      searchContainer.classList.remove('header-hidden');
    } else {
      searchContainer.classList.add('header-hidden');
      searchResults.classList.add('header-hidden');
    }
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    // Only optimize if not already handled by createOptimizedPicture (e.g., logo)
    if (!img.closest('.cmp-image__link')) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  });

  block.textContent = '';
  block.append(headerSection, countryModal);
}
