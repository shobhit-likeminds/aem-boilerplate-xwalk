import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson
  // BlockJson has 4 root fields: logoImage, logoLink, navigationLinks (container), countryOptions (container)
  // The first 4 children of the block correspond to these root fields.
  // The remaining children are item rows for navigationLink and countryOption.
  const [logoImageRow, logoLinkRow, navigationLinksContainerRow, countryOptionsContainerRow, ...itemRows] = [...block.children];

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');

  const nav = document.createElement('nav');
  nav.classList.add('header-navbar', 'header-navbar-expand-xl', 'header-navbar-light', 'header-bg-light', 'header-px-xl-5', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center');

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
  nav.append(toggler);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('header-d-xl-none');
  nav.append(dXlNone);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  const logoLink = document.createElement('a');
  // The logoLinkRow itself contains the <a> tag for the logo link
  const logoLinkFound = logoLinkRow.querySelector('a');
  if (logoLinkFound) {
    logoLink.href = logoLinkFound.href;
    logoLink.target = '_blank';
  }
  logoLink.classList.add('header-cmp-image__link');
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '131' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  nav.append(logoDiv);

  // Navbar Collapse
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';

  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-show');
    toggler.classList.toggle('header-collapsed');
    toggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('header-show'));
  });

  // Navigation Links
  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');
  const navElement = document.createElement('nav');
  navElement.classList.add('header-cmp-navigation');
  navElement.setAttribute('role', 'navigation');
  const navUl = document.createElement('ul');
  navUl.classList.add('header-cmp-navigation__group');

  // Filter itemRows for navigationLink (2 cells: label, url)
  const navigationLinks = itemRows.filter((row) => row.children.length === 2 && row.children[1].querySelector('a'));
  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
    moveInstrumentation(row, li);

    const link = document.createElement('a');
    link.classList.add('header-cmp-navigation__item-link');
    const labelCell = row.children[0]; // label
    const urlCell = row.children[1]; // url
    const urlLink = urlCell.querySelector('a');
    if (urlLink) {
      link.href = urlLink.href;
    }
    link.textContent = labelCell.textContent.trim();
    li.append(link);
    navUl.append(li);
  });
  navElement.append(navUl);
  navItemNavigation.append(navElement);
  navbarCollapse.append(navItemNavigation);

  // Search and Country Selector
  const headerSectionRight = document.createElement('div');
  headerSectionRight.classList.add('header-header-section', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('header-search-icon', 'header-country-selector-trigger', 'header-d-flex', 'header-align-items-center');

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = 'IN'; // Default
  countrySelectorTrigger.append(countryCodeSpan);

  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-header-country-flag');
  countryFlagImg.alt = 'flag';
  countryFlagImg.src = '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp'; // Default
  countrySelectorTrigger.append(countryFlagImg);

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-dropdown-icon');
  countrySelectorTrigger.append(dropdownIcon);

  headerSectionRight.append(countrySelectorTrigger);
  navbarCollapse.append(headerSectionRight);

  nav.append(navbarCollapse);

  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-icon-list');

  // Search Block
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
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1773989022179.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);
  searchBlock.append(searchBox);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');
  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('header-resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestions);
  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);
  const pages = document.createElement('h4');
  pages.classList.add('header-resultList');
  pages.textContent = 'Pages';
  searchResults.append(pages);
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
  searchIconLink.classList.add('header-nav-link'); // Added missing class from original HTML
  searchIconLink.id = 'searchIconLink';
  const searchIconImg = document.createElement('img');
  searchIconImg.loading = 'lazy';
  searchIconImg.id = 'searchIcon';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchIconImg.alt = 'Search icon';
  searchIconLink.append(searchIconImg);
  const searchLabelSpan = document.createElement('span');
  searchLabelSpan.classList.add('header-d-block');
  searchLabelSpan.textContent = 'Search';
  searchIconLink.append(searchLabelSpan);
  itcHeaderIconList.append(searchIconLink);

  const navItemPlaceholder = document.createElement('li');
  navItemPlaceholder.classList.add('header-nav-item');
  const navLinkPlaceholder = document.createElement('a');
  navLinkPlaceholder.classList.add('header-nav-link');
  navItemPlaceholder.append(navLinkPlaceholder);
  itcHeaderIconList.append(navItemPlaceholder);

  nav.append(itcHeaderIconList);
  headerContainer.append(nav);
  block.append(headerContainer);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector');
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
  modalHeader.classList.add('header-modal-header', 'header-border-0', 'header-text-center');
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
  modalContent.append(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');

  // Filter itemRows for countryOption (3 cells: flagImage, countryName, countryUrl)
  const countryOptions = itemRows.filter((row) => row.children.length === 3 && row.children[0].querySelector('picture') && row.children[2].querySelector('a'));
  countryOptions.forEach((row, index) => {
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
    moveInstrumentation(row, countryOptionDiv);

    const flagImageCell = row.children[0]; // flagImage
    const countryNameCell = row.children[1]; // countryName
    const countryUrlCell = row.children[2]; // countryUrl

    const flagPicture = flagImageCell.querySelector('picture');
    if (flagPicture) {
      const img = flagPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
      optimizedPic.querySelector('img').classList.add('header-country-flag');
      if (index === 0) { // Assuming first country is India based on original HTML
        optimizedPic.querySelector('img').classList.add('header-india-flag');
        countryOptionDiv.classList.add('header-selected');
      } else if (index === 1) { // Assuming second country is USA based on original HTML
        optimizedPic.querySelector('img').classList.add('header-usa-flag');
      }
      countryOptionDiv.append(optimizedPic);
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-country-name');
    countryNameP.textContent = countryNameCell.textContent.trim();
    countryOptionDiv.append(countryNameP);

    const countryUrlLink = countryUrlCell.querySelector('a');
    if (countryUrlLink) {
      countryOptionDiv.dataset.country = countryNameP.textContent.toLowerCase();
      countryOptionDiv.dataset.url = countryUrlLink.href;
    }
    countryOptionsDiv.append(countryOptionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);
  block.append(countryModal);

  // Event Listeners for interactivity
  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('header-show');
    countryModal.style.display = 'block';
  });

  // Close modal when clicking outside modal content or on specific close areas
  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) { // Clicked directly on the modal backdrop
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && countryModal.classList.contains('header-show')) {
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
    }
  });

  const allCountryOptions = countryModal.querySelectorAll('.header-country-option');
  allCountryOptions.forEach((option) => {
    option.addEventListener('click', () => {
      allCountryOptions.forEach((opt) => opt.classList.remove('header-selected'));
      option.classList.add('header-selected');
      const countryUrl = option.dataset.url;
      if (countryUrl) {
        window.location.href = countryUrl;
      }
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
    });
  });

  searchIconLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-hidden');
    searchContainer.classList.toggle('header-hidden');
    searchResults.classList.add('header-hidden'); // Hide results when opening search
    if (!searchBlock.classList.contains('header-hidden')) {
      searchInput.focus();
    }
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
    searchContainer.classList.add('header-hidden');
    searchResults.classList.add('header-hidden');
    searchInput.value = '';
  });

  searchButton.addEventListener('click', () => {
    // Implement search logic here
    const query = searchInput.value;
    if (query) {
      // Simulate search results
      suggestionsList.innerHTML = '';
      productsList.innerHTML = '';
      const suggestion1 = document.createElement('li');
      suggestion1.textContent = `Suggestion for "${query}" 1`;
      suggestionsList.append(suggestion1);
      const product1 = document.createElement('li');
      product1.textContent = `Product for "${query}" 1`;
      productsList.append(product1);
      searchResults.classList.remove('header-hidden');
    } else {
      searchResults.classList.add('header-hidden');
    }
  });

  searchInput.addEventListener('input', () => {
    // Implement live search suggestions if needed
    if (searchInput.value.length > 2) {
      searchResults.classList.remove('header-hidden');
    } else {
      searchResults.classList.add('header-hidden');
    }
  });

  viewAllButton.addEventListener('click', () => {
    // Implement logic for "VIEW ALL ITEMS" button
    // e.g., navigate to a search results page or expand results
    console.log('View All Items clicked!');
    // Example: navigate to a search results page with the current query
    const query = searchInput.value;
    if (query) {
      window.location.href = `/search-results?q=${encodeURIComponent(query)}`;
    } else {
      window.location.href = '/search-results'; // Navigate to a generic search page
    }
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Clear original block content
  block.textContent = '';
  block.append(headerContainer);
  block.append(countryModal);
}
