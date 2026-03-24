import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    secondaryLogoImageRow,
    secondaryLogoLinkRow,
    navigationLinksContainerRow, // This row is a container, its content is in itemRows
    countryFlagImageRow,
    countryCodeRow,
    countryDropdownIconRow,
    searchIconImageRow,
    countryOptionsContainerRow, // This row is a container, its content is in itemRows
    countryModalTitleRow,
    countryModalExperienceTextRow,
    ...itemRows
  ] = [...block.children];

  // Filter itemRows based on their structure to distinguish navigation links and country options
  // Navigation links have an 'a' tag in their first child (link) and text in the second child
  const navigationLinks = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a'));
  // Country options have a 'picture' tag in their first child (flag-image) and text in the second child
  const countryOptions = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture'));

  const header = document.createElement('header');
  header.classList.add('header-itc-header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');

  const navbar = document.createElement('nav');
  navbar.classList.add(
    'header-navbar',
    'header-navbar-expand-xl',
    'header-navbar-light',
    'header-bg-light',
    'header-px-xl-5',
    'header-d-flex',
    'header-justify-content-between',
    'header-align-items-center',
  );

  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('header-navbar-toggler', 'header-collapsed');
  navbarToggler.type = 'button';
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('header-navbar-toggler-icon');
  navbarToggler.append(togglerIcon);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('header-d-xl-none');
  dXlNone.innerHTML = '&nbsp;';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');

  const logoLink = document.createElement('a');
  const originalLogoLink = logoLinkRow.querySelector('a');
  if (originalLogoLink) {
    logoLink.href = originalLogoLink.href;
    logoLink.target = '_blank';
    logoLink.classList.add('header-checkLogoLink');
  }
  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '131' }]);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  }
  logoDiv.append(logoLink);

  const secondaryLogoLink = document.createElement('a');
  const originalSecondaryLogoLink = secondaryLogoLinkRow.querySelector('a');
  if (originalSecondaryLogoLink) {
    secondaryLogoLink.href = originalSecondaryLogoLink.href;
    secondaryLogoLink.target = '_blank';
    secondaryLogoLink.classList.add('cmp-image__link');
  }
  const secondaryLogoPicture = secondaryLogoImageRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    const optimizedSecondaryLogoPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt, false, [{ width: '131' }]);
    moveInstrumentation(secondaryLogoImg, optimizedSecondaryLogoPic.querySelector('img'));
    secondaryLogoLink.append(optimizedSecondaryLogoPic);
  }
  logoDiv.append(secondaryLogoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');

  const nav = document.createElement('nav');
  nav.classList.add('cmp-navigation');
  nav.setAttribute('role', 'navigation');

  const navGroup = document.createElement('ul');
  navGroup.classList.add('cmp-navigation__group');

  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    const link = document.createElement('a');
    link.classList.add('cmp-navigation__item-link');
    const originalLink = row.children[0].querySelector('a'); // Link is in the first cell
    if (originalLink) {
      link.href = originalLink.href;
      link.textContent = row.children[1].textContent.trim(); // Text field is at index 1
    }
    li.append(link);
    navGroup.append(li);
  });

  nav.append(navGroup);
  navItemNavigation.append(nav);
  navbarCollapse.append(navItemNavigation);

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-header-section', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');

  const searchIconCountrySelectorTrigger = document.createElement('div');
  searchIconCountrySelectorTrigger.classList.add(
    'header-search-icon',
    'header-country-selector-trigger',
    'header-d-flex',
    'header-align-items-center',
  );

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = countryCodeRow.children[0].textContent.trim();
  searchIconCountrySelectorTrigger.append(countryCodeSpan);

  const countryFlagImg = document.createElement('img');
  const originalCountryFlagImg = countryFlagImageRow.querySelector('img');
  if (originalCountryFlagImg) {
    countryFlagImg.src = originalCountryFlagImg.src;
    countryFlagImg.alt = originalCountryFlagImg.alt;
  }
  countryFlagImg.classList.add('header-header-country-flag');
  searchIconCountrySelectorTrigger.append(countryFlagImg);

  const dropdownIconImg = document.createElement('img');
  const originalDropdownIconImg = countryDropdownIconRow.querySelector('img');
  if (originalDropdownIconImg) {
    dropdownIconImg.src = originalDropdownIconImg.src;
    dropdownIconImg.alt = originalDropdownIconImg.alt;
  }
  dropdownIconImg.classList.add('header-dropdown-icon');
  searchIconCountrySelectorTrigger.append(dropdownIconImg);
  headerSection.append(searchIconCountrySelectorTrigger);
  navbarCollapse.append(headerSection);

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
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchButtonImg = document.createElement('img');
  const originalSearchIconImg = searchIconImageRow.querySelector('img');
  if (originalSearchIconImg) {
    searchButtonImg.src = originalSearchIconImg.src;
    searchButtonImg.alt = originalSearchIconImg.alt;
  }
  searchButtonImg.loading = 'lazy';
  searchButton.append(searchButtonImg);
  searchContainer.append(searchButton);
  searchBox.append(searchContainer);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774342206220.svg+xml';
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
  searchBlock.append(searchResults);
  itcHeaderIconList.append(searchBlock);

  const searchLink = document.createElement('a');
  searchLink.classList.add('header-nav-link');
  const searchIcon = document.createElement('img');
  searchIcon.loading = 'lazy';
  searchIcon.id = 'searchIcon';
  if (originalSearchIconImg) {
    searchIcon.src = originalSearchIconImg.src;
    searchIcon.alt = originalSearchIconImg.alt;
  }
  searchLink.append(searchIcon);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchLink.append(searchSpan);
  itcHeaderIconList.append(searchLink);

  const navItem = document.createElement('li');
  navItem.classList.add('header-nav-item');
  const navLink = document.createElement('a');
  navLink.classList.add('header-nav-link');
  navItem.append(navLink);
  itcHeaderIconList.append(navItem);

  navbar.append(navbarToggler, dXlNone, logoDiv, navbarCollapse, itcHeaderIconList);
  headerContainer.append(navbar);
  header.append(headerContainer);

  const countryModal = document.createElement('div');
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector');
  countryModal.id = 'countryModal';
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header-modal-header', 'header-border-0', 'header-text-center');

  const w100 = document.createElement('div');
  w100.classList.add('header-w-100');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  modalTitle.innerHTML = countryModalTitleRow.children[0].textContent.trim();
  w100.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text');
  experienceText.textContent = countryModalExperienceTextRow.children[0].textContent.trim();
  w100.append(experienceText);
  modalHeader.append(w100);
  modalContent.append(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');

  countryOptions.forEach((row) => {
    const optionDiv = document.createElement('div');
    moveInstrumentation(row, optionDiv);
    optionDiv.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');

    const flagPicture = row.children[0].querySelector('picture'); // Flag image is in the first cell
    if (flagPicture) {
      const flagImg = flagPicture.querySelector('img');
      const optimizedFlagPic = createOptimizedPicture(flagImg.src, flagImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(flagImg, optimizedFlagPic.querySelector('img'));
      const newFlagImg = optimizedFlagPic.querySelector('img');
      newFlagImg.classList.add('header-country-flag');
      optionDiv.append(newFlagImg);
    }

    const countryName = document.createElement('p');
    countryName.classList.add('header-country-name');
    countryName.textContent = row.children[1].textContent.trim(); // Country name is at index 1
    optionDiv.append(countryName);
    countryOptionsDiv.append(optionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);
  header.append(countryModal);

  // Event listeners for interactive behavior
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-show');
    navbarToggler.classList.toggle('header-collapsed');
    navbarToggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('header-show'));
  });

  // Event listener for opening the country modal
  searchIconCountrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('header-show');
    countryModal.style.display = 'block';
  });

  // Event listener for closing the country modal when clicking outside
  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
    }
  });

  // Event listener for search icon to toggle search block visibility
  searchLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-hidden');
    searchContainer.classList.toggle('header-hidden');
    searchResults.classList.add('header-hidden'); // Ensure search results are hidden initially
  });

  // Event listener for close button in search block
  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
    searchContainer.classList.add('header-hidden');
    searchResults.classList.add('header-hidden');
    searchInput.value = ''; // Clear search input
  });

  // Event listener for country options in the modal
  countryOptionsDiv.querySelectorAll('.header-country-option').forEach((option) => {
    option.addEventListener('click', () => {
      // Example: Update country code and flag based on selection
      const selectedCountryCode = option.querySelector('.header-country-name').textContent.trim();
      const selectedFlagSrc = option.querySelector('.header-country-flag').src;

      countryCodeSpan.textContent = selectedCountryCode;
      countryFlagImg.src = selectedFlagSrc;

      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
      // Add further logic here to handle country selection (e.g., redirect, update content)
    });
  });

  block.textContent = '';
  block.append(header);

  // This part seems to be a generic image optimization, ensure it's intended for all images in the block
  // and not just specific ones already handled. If it's for all, it should be at the end.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
