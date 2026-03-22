import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    navigationContainerRow, // This row is a container, its content is in itemRows
    searchIconRow,
    countryCodeRow,
    countryFlagRow,
    countryOptionsContainerRow, // This row is a container, its content is in itemRows
    ...itemRows
  ] = [...block.children];

  // Create header container
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-itc-header-section-container');

  // Create navbar
  const nav = document.createElement('nav');
  nav.classList.add(
    'header-itc-header-section-navbar',
    'header-itc-header-section-navbar-expand-xl',
    'header-itc-header-section-navbar-light',
    'header-itc-header-section-bg-light',
    'header-itc-header-section-px-xl-5',
    'header-itc-header-section-d-flex',
    'header-itc-header-section-justify-content-between',
    'header-itc-header-section-align-items-center',
  );

  // Navbar Toggler
  const toggler = document.createElement('button');
  toggler.classList.add('header-itc-header-section-navbar-toggler', 'header-itc-header-section-collapsed');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('header-itc-header-section-navbar-toggler-icon');
  toggler.append(togglerSpan);
  nav.append(toggler);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('header-itc-header-section-d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';
  nav.append(dXlNoneDiv);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-itc-header-section-logo', 'header-itc-header-section-image');
  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('div').querySelector('a'); // Access content within the div
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
    logoLink.target = '_blank';
  } else {
    logoLink.href = logoLinkRow.querySelector('div').textContent.trim(); // Access content within the div
    logoLink.target = '_blank';
  }

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '131' }]);
    moveInstrumentation(logoPicture, optimizedPic);
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  nav.append(logoDiv);

  // Navbar collapse content
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-itc-header-section-collapse',
    'header-itc-header-section-navbar-collapse',
    'header-itc-header-section-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';

  // Navigation
  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('header-itc-header-section-nav-item', 'header-itc-header-section-navigation');
  const navigationNav = document.createElement('nav');
  navigationNav.classList.add('cmp-navigation');
  navigationNav.setAttribute('role', 'navigation');
  const navigationUl = document.createElement('ul');
  navigationUl.classList.add('cmp-navigation__group');

  // Filter for navigation items (2 cells: link, label)
  const navigationItems = itemRows.filter((row) => row.children.length === 2);
  navigationItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    const link = document.createElement('a');
    link.classList.add('cmp-navigation__item-link');
    const linkCell = row.children[0].querySelector('div'); // Access content within the div
    const labelCell = row.children[1].querySelector('div'); // Access content within the div
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.textContent = labelCell.textContent.trim();
      moveInstrumentation(linkCell, link);
    } else {
      link.href = linkCell.textContent.trim();
      link.textContent = labelCell.textContent.trim();
    }
    li.append(link);
    navigationUl.append(li);
    moveInstrumentation(row, li);
  });
  navigationNav.append(navigationUl);
  navigationDiv.append(navigationNav);
  navbarCollapse.append(navigationDiv);

  // Header section right side
  const headerSectionRight = document.createElement('div');
  headerSectionRight.classList.add(
    'header-itc-header-section-header-section',
    'header-itc-header-section-d-flex',
    'header-itc-header-section-align-items-center',
    'header-itc-header-section-justify-content-end',
  );

  // Country selector trigger
  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add(
    'header-itc-header-section-search-icon',
    'header-itc-header-section-country-selector-trigger',
    'header-itc-header-section-d-flex',
    'header-itc-header-section-align-items-center',
  );

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-itc-header-section-country-code');
  countryCodeSpan.textContent = countryCodeRow.querySelector('div').textContent.trim(); // Access content within the div
  countrySelectorTrigger.append(countryCodeSpan);

  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-itc-header-section-header-country-flag');
  const flagPicture = countryFlagRow.querySelector('picture');
  if (flagPicture) {
    const img = flagPicture.querySelector('img');
    countryFlagImg.src = img.src;
    countryFlagImg.alt = img.alt;
    moveInstrumentation(flagPicture, countryFlagImg);
  }
  countrySelectorTrigger.append(countryFlagImg);

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-itc-header-section-dropdown-icon');
  countrySelectorTrigger.append(dropdownIcon);
  headerSectionRight.append(countrySelectorTrigger);
  navbarCollapse.append(headerSectionRight);

  // Search and country selector
  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-section-itc-header-icon-list');

  // Search block
  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('header-itc-header-section-search-block', 'header-itc-header-section-hidden');

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('header-itc-header-section-search-box');

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('header-itc-header-section-search-container', 'header-itc-header-section-hidden');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = 'Search';
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchButtonImg = document.createElement('img');
  const searchIconPicture = searchIconRow.querySelector('picture');
  if (searchIconPicture) {
    const img = searchIconPicture.querySelector('img');
    searchButtonImg.src = img.src;
    searchButtonImg.alt = img.alt;
    moveInstrumentation(searchIconPicture, searchButtonImg);
  }
  searchButton.append(searchButtonImg);
  searchContainer.append(searchButton);
  searchBox.append(searchContainer);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774209134013.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);
  searchBlock.append(searchBox);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-itc-header-section-search-results', 'header-itc-header-section-hidden');

  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add('header-itc-header-section-resultList');
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestionsH4);

  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.id = 'suggestionsList';
  searchResults.append(suggestionsListUl);

  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add('header-itc-header-section-resultList');
  pagesH4.textContent = 'Pages';
  searchResults.append(pagesH4);

  const productsListUl = document.createElement('ul');
  productsListUl.id = 'productsList';
  productsListUl.classList.add('header-itc-header-section-products');
  searchResults.append(productsListUl);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);
  searchBlock.append(searchResults);
  itcHeaderIconList.append(searchBlock);

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('header-itc-header-section-nav-link');
  searchIconLink.id = 'searchIconLink'; // Add an ID for easy targeting

  const searchIconImg = document.createElement('img');
  searchIconImg.id = 'searchIcon';
  if (searchIconPicture) {
    const img = searchIconPicture.querySelector('img');
    searchIconImg.src = img.src;
    searchIconImg.alt = img.alt;
    moveInstrumentation(searchIconPicture, searchIconImg);
  } else {
    searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
    searchIconImg.alt = 'Search icon';
  }
  searchIconLink.append(searchIconImg);

  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-itc-header-section-d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchSpan);
  itcHeaderIconList.append(searchIconLink);

  const navItemLi = document.createElement('li');
  navItemLi.classList.add('header-itc-header-section-nav-item');
  const navItemLink = document.createElement('a');
  navItemLink.classList.add('header-itc-header-section-nav-link');
  navItemLi.append(navItemLink);
  itcHeaderIconList.append(navItemLi);

  nav.append(navbarCollapse);
  nav.append(itcHeaderIconList);
  headerContainer.append(nav);
  block.append(headerContainer);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add('header-itc-header-section-modal', 'header-itc-header-section-fade', 'header-itc-header-section-itc-country-selector');
  countryModal.id = 'countryModal';
  countryModal.setAttribute('tabindex', '-1');
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-itc-header-section-modal-dialog', 'header-itc-header-section-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-itc-header-section-modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add(
    'header-itc-header-section-modal-header',
    'header-itc-header-section-border-0',
    'header-itc-header-section-text-center',
  );
  const headerW100 = document.createElement('div');
  headerW100.classList.add('header-itc-header-section-w-100');
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-itc-header-section-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  const experienceText = document.createElement('p');
  experienceText.classList.add('header-itc-header-section-experience-text');
  experienceText.textContent = 'Experience';
  headerW100.append(modalTitle, experienceText);
  modalHeader.append(headerW100);
  modalContent.append(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-itc-header-section-modal-body');

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    'header-itc-header-section-country-options',
    'header-itc-header-section-d-flex',
    'header-itc-header-section-justify-content-center',
    'header-itc-header-section-align-items-center',
  );

  // Filter for country option items (4 cells: flag, countryName, countryCode, countryUrl)
  const countryOptionItems = itemRows.filter((row) => row.children.length === 4);
  countryOptionItems.forEach((row) => {
    const countryOption = document.createElement('div');
    countryOption.classList.add(
      'header-itc-header-section-country-option',
      'header-itc-header-section-mx-3',
      'header-itc-header-section-d-flex',
      'header-itc-header-section-flex-column',
      'header-itc-header-section-align-items-center',
    );

    const flagCell = row.children[0].querySelector('div'); // Access content within the div
    const countryNameCell = row.children[1].querySelector('div'); // Access content within the div
    const countryCodeCell = row.children[2].querySelector('div'); // Access content within the div
    const countryUrlCell = row.children[3].querySelector('div'); // Access content within the div

    const flagPictureEl = flagCell.querySelector('picture');
    if (flagPictureEl) {
      const img = flagPictureEl.querySelector('img');
      const countryFlag = document.createElement('img');
      countryFlag.src = img.src;
      countryFlag.alt = img.alt;
      countryFlag.classList.add('header-itc-header-section-country-flag');
      countryFlag.classList.add(`header-itc-header-section-${countryCodeCell.textContent.trim().toLowerCase()}-flag`);
      countryOption.append(countryFlag);
      moveInstrumentation(flagCell, countryFlag);
    }

    const countryName = document.createElement('p');
    countryName.classList.add('header-itc-header-section-country-name');
    countryName.textContent = countryNameCell.textContent.trim();
    countryOption.append(countryName);

    countryOption.setAttribute('data-country', countryCodeCell.textContent.trim().toLowerCase());
    const countryLink = countryUrlCell.querySelector('a');
    if (countryLink) {
      countryOption.setAttribute('data-url', countryLink.href);
    } else {
      countryOption.setAttribute('data-url', countryUrlCell.textContent.trim());
    }

    countryOptionsDiv.append(countryOption);
    moveInstrumentation(row, countryOption);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);
  block.append(countryModal);

  // Event Listeners for interactive behavior
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-itc-header-section-show');
    toggler.classList.toggle('header-itc-header-section-collapsed');
    toggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('header-itc-header-section-show'));
  });

  const modalTrigger = countrySelectorTrigger;
  modalTrigger.addEventListener('click', () => {
    countryModal.classList.add('header-itc-header-section-show');
    countryModal.style.display = 'block';
  });

  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.classList.remove('header-itc-header-section-show');
      countryModal.style.display = 'none';
    }
  });

  // Add click listener for individual country options
  countryOptionsDiv.querySelectorAll('.header-itc-header-section-country-option').forEach((option) => {
    option.addEventListener('click', () => {
      const url = option.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  });

  // Search functionality
  const searchIconTrigger = document.getElementById('searchIconLink');
  const searchCloseButton = document.getElementById('closeButton');
  const searchContainerDiv = document.getElementById('searchContainer');
  const searchResultsDiv = document.getElementById('searchResults');

  searchIconTrigger.addEventListener('click', () => {
    searchBlock.classList.remove('header-itc-header-section-hidden');
    searchContainerDiv.classList.remove('header-itc-header-section-hidden');
    searchResultsDiv.classList.remove('header-itc-header-section-hidden');
  });

  searchCloseButton.addEventListener('click', () => {
    searchBlock.classList.add('header-itc-header-section-hidden');
    searchContainerDiv.classList.add('header-itc-header-section-hidden');
    searchResultsDiv.classList.add('header-itc-header-section-hidden');
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
