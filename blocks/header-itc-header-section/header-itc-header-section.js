import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson
  const [
    logoImageRow,
    logoLinkRow,
    logoImageSecondaryRow,
    logoLinkSecondaryRow,
    navigationItemsContainerRow, // This is the container for navigation items
    countryFlagRow,
    countryCodeRow,
    dropdownIconRow,
    countryOptionsContainerRow, // This is the container for country options
    searchIconRow,
    closeIconRow,
    ...itemRows // Remaining rows are actual navigationItem and countryOption items
  ] = [...block.children];

  // Filter item rows based on their structure to distinguish between navigationItem and countryOption
  // navigationItem has 2 cells: [link, label]
  // countryOption has 2 cells: [flagImage, countryName], where flagImage is a picture
  const navigationItems = itemRows.filter((row) => row.children.length === 2 && !row.children[0].querySelector('picture'));
  const countryOptions = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture'));

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

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('header-d-xl-none');
  dXlNone.innerHTML = '&nbsp;';
  nav.append(dXlNone);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');

  const logoImage = logoImageRow.querySelector('picture');
  const logoLink = logoLinkRow.textContent.trim();
  const logoImageSecondary = logoImageSecondaryRow.querySelector('picture');
  const logoLinkSecondary = logoLinkSecondaryRow.textContent.trim();

  const logoLinkEl = document.createElement('a');
  logoLinkEl.classList.add('header-checkLogoLink');
  logoLinkEl.href = logoLink;
  logoLinkEl.target = '_blank';
  moveInstrumentation(logoLinkRow, logoLinkEl);
  if (logoImage) {
    moveInstrumentation(logoImageRow, logoImage);
    logoLinkEl.append(logoImage);
  }
  const spanScreenReader = document.createElement('span');
  spanScreenReader.classList.add('cmp-link__screen-reader-only');
  spanScreenReader.textContent = 'opens in a new tab';
  logoLinkEl.append(spanScreenReader);
  logoDiv.append(logoLinkEl);

  const logoSecondaryLinkEl = document.createElement('a');
  logoSecondaryLinkEl.classList.add('cmp-image__link');
  logoSecondaryLinkEl.href = logoLinkSecondary;
  logoSecondaryLinkEl.target = '_blank';
  moveInstrumentation(logoLinkSecondaryRow, logoSecondaryLinkEl);
  if (logoImageSecondary) {
    moveInstrumentation(logoImageSecondaryRow, logoImageSecondary);
    logoSecondaryLinkEl.append(logoImageSecondary);
  }
  const spanScreenReaderSecondary = document.createElement('span');
  spanScreenReaderSecondary.classList.add('cmp-link__screen-reader-only');
  spanScreenReaderSecondary.textContent = 'opens in a new tab';
  logoSecondaryLinkEl.append(spanScreenReaderSecondary);
  logoDiv.append(logoSecondaryLinkEl);

  nav.append(logoDiv);

  // Navbar Collapse
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';
  nav.append(navbarCollapse);

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');
  navbarCollapse.append(navItemNavigation);

  const navCmp = document.createElement('nav');
  navCmp.classList.add('cmp-navigation');
  navCmp.setAttribute('role', 'navigation');
  navItemNavigation.append(navCmp);

  const navUl = document.createElement('ul');
  navUl.classList.add('cmp-navigation__group');
  navCmp.append(navUl);

  navigationItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    const linkEl = document.createElement('a');
    linkEl.classList.add('cmp-navigation__item-link');
    // Read link from the first cell and label from the second cell
    const link = row.children[0].querySelector('a');
    linkEl.href = link ? link.href : '#';
    linkEl.textContent = row.children[1].textContent.trim();
    moveInstrumentation(row.children[0], linkEl);
    moveInstrumentation(row.children[1], linkEl);
    li.append(linkEl);
    navUl.append(li);
  });

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-header-section', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');
  navbarCollapse.append(headerSection);

  // Country Selector
  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('header-search-icon', 'header-country-selector-trigger', 'header-d-flex', 'header-align-items-center');
  headerSection.append(countrySelectorTrigger);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = countryCodeRow.textContent.trim();
  moveInstrumentation(countryCodeRow, countryCodeSpan);
  countrySelectorTrigger.append(countryCodeSpan);

  const countryFlagPic = countryFlagRow.querySelector('picture');
  if (countryFlagPic) {
    const countryFlagImg = countryFlagPic.querySelector('img');
    countryFlagImg.classList.add('header-header-country-flag');
    moveInstrumentation(countryFlagRow, countryFlagPic);
    countrySelectorTrigger.append(countryFlagPic);
  }

  const dropdownIconPic = dropdownIconRow.querySelector('picture');
  if (dropdownIconPic) {
    const dropdownIconImg = dropdownIconPic.querySelector('img');
    dropdownIconImg.classList.add('header-dropdown-icon');
    moveInstrumentation(dropdownIconRow, dropdownIconPic);
    countrySelectorTrigger.append(dropdownIconPic);
  }

  // Search and Close Icons
  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-icon-list');
  nav.append(itcHeaderIconList);

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('header-search-block', 'header-hidden');
  itcHeaderIconList.append(searchBlock);

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('header-search-box');
  searchBlock.append(searchBox);

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('header-search-container', 'header-hidden');
  searchBox.append(searchContainer);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = 'Search';
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchIconPic = searchIconRow.querySelector('picture');
  if (searchIconPic) {
    const searchIconImg = searchIconPic.querySelector('img');
    searchIconImg.loading = 'lazy';
    moveInstrumentation(searchIconRow, searchIconPic);
    searchButton.append(searchIconPic);
  }
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  const closeIconPic = closeIconRow.querySelector('picture');
  if (closeIconPic) {
    const closeIconImg = closeIconPic.querySelector('img');
    closeButton.src = closeIconImg.src;
    closeButton.alt = closeIconImg.alt;
    moveInstrumentation(closeIconRow, closeIconPic);
  }
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');
  searchBlock.append(searchResults);

  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('header-resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestions);

  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pagesList = document.createElement('h4');
  pagesList.classList.add('header-resultList');
  pagesList.textContent = 'Pages';
  searchResults.append(pagesList);

  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('header-products');
  searchResults.append(productsList);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('header-nav-link');
  searchIconLink.id = 'searchIconLink';
  const searchIconImgLink = document.createElement('img');
  searchIconImgLink.loading = 'lazy';
  searchIconImgLink.id = 'searchIcon';
  if (searchIconPic) {
    searchIconImgLink.src = searchIconPic.querySelector('img').src;
    searchIconImgLink.alt = searchIconPic.querySelector('img').alt;
  }
  searchIconLink.append(searchIconImgLink);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchSpan);
  itcHeaderIconList.append(searchIconLink);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector'); // Removed header-show, as it should be hidden initially
  countryModal.id = 'countryModal';
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'none'; // Initially hidden
  header.append(countryModal);

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
  countryOptionsDiv.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
  modalBody.append(countryOptionsDiv);

  countryOptions.forEach((row) => {
    const countryOptionDiv = document.createElement('div');
    moveInstrumentation(row, countryOptionDiv);
    countryOptionDiv.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
    const flagImagePic = row.children[0].querySelector('picture');
    if (flagImagePic) {
      const flagImageImg = flagImagePic.querySelector('img');
      flagImageImg.classList.add('header-country-flag');
      countryOptionDiv.append(flagImagePic);
    }
    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-country-name');
    countryNameP.textContent = row.children[1].textContent.trim();
    countryOptionDiv.append(countryNameP);
    countryOptionsDiv.append(countryOptionDiv);

    // Add event listener for each country option
    countryOptionDiv.addEventListener('click', () => {
      // Example: Update country code and flag, then close modal
      countryCodeSpan.textContent = countryNameP.textContent.trim().substring(0, 2).toUpperCase(); // Or get from data attribute
      if (flagImagePic) {
        // Assuming countryFlagPic is the main flag in the header
        countryFlagPic.replaceWith(flagImagePic.cloneNode(true));
        countryFlagPic.querySelector('img').classList.add('header-header-country-flag');
      }
      countryModal.style.display = 'none';
      countryModal.classList.remove('header-show');
    });
  });

  // Event Listeners
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-show');
    toggler.classList.toggle('header-collapsed');
    toggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('header-show'));
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.style.display = 'block';
    countryModal.classList.add('header-show');
  });

  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) { // Close when clicking outside the modal content
      countryModal.style.display = 'none';
      countryModal.classList.remove('header-show');
    }
  });

  searchIconLink.addEventListener('click', () => {
    searchBlock.classList.remove('header-hidden');
    searchContainer.classList.remove('header-hidden');
    searchResults.classList.add('header-hidden');
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
    searchContainer.classList.add('header-hidden');
    searchResults.classList.add('header-hidden');
  });

  searchButton.addEventListener('click', () => {
    // Implement search logic here
    searchResults.classList.remove('header-hidden');
  });

  block.textContent = '';
  block.append(header);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
