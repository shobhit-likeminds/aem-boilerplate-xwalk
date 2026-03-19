import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    mainLogoRow,
    secondaryLogoRow,
    searchIconRow,
    modalTitleRow,
    modalExperienceTextRow,
    ...itemRows
  ] = [...block.children];

  // Create header container
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');

  // Create navbar
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

  // Navbar Toggler
  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('header-navbar-toggler', 'header-collapsed');
  navbarToggler.type = 'button';
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('header-navbar-toggler-icon');
  navbarToggler.append(togglerIcon);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-collapse',
    'header-navbar-collapse',
    'header-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';

  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-show');
    navbarToggler.classList.toggle('header-collapsed');
    navbarToggler.setAttribute(
      'aria-expanded',
      navbarCollapse.classList.contains('header-show'),
    );
  });

  // Main Logo
  const mainLogoDiv = document.createElement('div');
  mainLogoDiv.classList.add('header-logo', 'header-image');
  const mainLogoLink = document.createElement('a');
  mainLogoLink.classList.add('header-cmp-image__link');
  mainLogoLink.href = '/'; // Default to home if no link in content
  mainLogoLink.target = '_blank'; // Assuming default target from original HTML
  const mainLogoPicture = mainLogoRow.querySelector('picture');
  if (mainLogoPicture) {
    const mainLogoImg = mainLogoPicture.querySelector('img');
    const optimizedMainLogo = createOptimizedPicture(
      mainLogoImg.src,
      mainLogoImg.alt,
      false,
      [{ width: '131' }],
    );
    moveInstrumentation(mainLogoImg, optimizedMainLogo.querySelector('img'));
    mainLogoLink.append(optimizedMainLogo);
  }
  const mainLogoLinkContent = mainLogoRow.querySelector('a');
  if (mainLogoLinkContent) {
    mainLogoLink.href = mainLogoLinkContent.href;
    mainLogoLink.target = mainLogoLinkContent.target;
  }
  mainLogoDiv.append(mainLogoLink);
  moveInstrumentation(mainLogoRow, mainLogoDiv);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('header-d-xl-none');
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    const optimizedSecondaryLogo = createOptimizedPicture(
      secondaryLogoImg.src,
      secondaryLogoImg.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(
      secondaryLogoImg,
      optimizedSecondaryLogo.querySelector('img'),
    );
    secondaryLogoDiv.append(optimizedSecondaryLogo);
  }
  moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);

  // Navigation
  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('header-nav-item', 'header-navigation');
  const nav = document.createElement('nav');
  nav.id = 'navigation-6d5dcb0126';
  nav.classList.add('header-cmp-navigation');
  nav.setAttribute('role', 'navigation');
  const navUl = document.createElement('ul');
  navUl.classList.add('header-cmp-navigation__group');

  const navigationLinks = itemRows.filter(
    (row) => row.children.length === 2 && !row.children[0].querySelector('picture'),
  );
  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add(
      'header-cmp-navigation__item',
      'header-cmp-navigation__item--level-0',
    );
    const link = document.createElement('a');
    link.classList.add('header-cmp-navigation__item-link');
    const labelCell = row.children[0];
    const urlCell = row.children[1];
    moveInstrumentation(labelCell, link);
    link.textContent = labelCell.textContent.trim();
    const foundLink = urlCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    li.append(link);
    navUl.append(li);
    moveInstrumentation(row, li);
  });
  nav.append(navUl);
  navigationDiv.append(nav);

  // Header section right
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
  countryCodeSpan.textContent = 'IN'; // Default country code

  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-header-country-flag');
  countryFlagImg.alt = 'flag';
  countryFlagImg.src =
    '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp'; // Default flag

  const dropdownIcon = document.createElement('img');
  dropdownIcon.classList.add('header-dropdown-icon');
  dropdownIcon.src =
    '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';

  countrySelectorTrigger.append(countryCodeSpan, countryFlagImg, dropdownIcon);
  headerSectionRight.append(countrySelectorTrigger);

  // Search Block and Icon
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
  const searchIconPicture = searchIconRow.querySelector('picture');
  if (searchIconPicture) {
    const searchIconImg = searchIconPicture.querySelector('img');
    const optimizedSearchIcon = createOptimizedPicture(
      searchIconImg.src,
      searchIconImg.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(searchIconImg, optimizedSearchIcon.querySelector('img'));
    searchButtonImg.src = optimizedSearchIcon.querySelector('img').src;
    searchButtonImg.alt = optimizedSearchIcon.querySelector('img').alt;
  }
  searchButton.append(searchButtonImg);
  searchContainer.append(searchInput, searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src =
    '/content/dam/aemigrate/uploaded-folder/image/1773920516367.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(searchContainer, closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');
  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('header-resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  const pages = document.createElement('h4');
  pages.classList.add('header-resultList');
  pages.textContent = 'Pages';
  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('header-products');
  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(
    popularSuggestions,
    suggestionsList,
    pages,
    productsList,
    viewAllButton,
  );
  searchBlock.append(searchBox, searchResults);

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('header-nav-link');
  searchIconLink.id = 'searchIconLink'; // Add an ID to easily target it for event listener
  const searchIconImage = document.createElement('img');
  searchIconImage.loading = 'lazy';
  searchIconImage.id = 'searchIcon';
  if (searchIconPicture) {
    const searchIconImg = searchIconPicture.querySelector('img');
    const optimizedSearchIcon = createOptimizedPicture(
      searchIconImg.src,
      searchIconImg.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(searchIconImg, optimizedSearchIcon.querySelector('img'));
    searchIconImage.src = optimizedSearchIcon.querySelector('img').src;
    searchIconImage.alt = optimizedSearchIcon.querySelector('img').alt;
  }
  const searchIconSpan = document.createElement('span');
  searchIconSpan.classList.add('header-d-block');
  searchIconSpan.textContent = 'Search';
  searchIconLink.append(searchIconImage, searchIconSpan);
  moveInstrumentation(searchIconRow, searchIconLink);

  itcHeaderIconList.append(searchBlock, searchIconLink);

  // Append elements to navbarCollapse
  navbarCollapse.append(navigationDiv, headerSectionRight, itcHeaderIconList);

  // Append elements to navbar
  navbar.append(
    navbarToggler,
    secondaryLogoDiv,
    mainLogoDiv,
    navbarCollapse,
  );

  headerContainer.append(navbar);

  // Modal
  const modal = document.createElement('div');
  modal.classList.add(
    'header-modal',
    'header-fade',
    'header-itc-country-selector',
  );
  modal.id = 'countryModal';
  modal.tabIndex = -1;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'countryModalLabel');
  modal.setAttribute('aria-modal', 'true');
  modal.style.display = 'none'; // Initially hidden

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
  const modalHeaderWrapper = document.createElement('div');
  modalHeaderWrapper.classList.add('header-w-100');
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  moveInstrumentation(modalTitleRow.firstElementChild, modalTitle);
  modalTitle.innerHTML = modalTitleRow.firstElementChild.innerHTML;
  const modalExperienceText = document.createElement('p');
  modalExperienceText.classList.add('header-experience-text');
  moveInstrumentation(modalExperienceTextRow.firstElementChild, modalExperienceText);
  modalExperienceText.innerHTML = modalExperienceTextRow.firstElementChild.innerHTML;
  modalHeaderWrapper.append(modalTitle, modalExperienceText);
  modalHeader.append(modalHeaderWrapper);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    'header-country-options',
    'header-d-flex',
    'header-justify-content-center',
    'header-align-items-center',
  );

  const countryOptions = itemRows.filter(
    (row) => row.children.length === 3 && row.children[0].querySelector('picture'),
  );
  countryOptions.forEach((row, index) => {
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add(
      'header-country-option',
      'header-mx-3',
      'header-d-flex',
      'header-flex-column',
      'header-align-items-center',
    );
    if (index === 0) {
      countryOptionDiv.classList.add('header-selected'); // First one is selected by default
    }

    const flagImageCell = row.children[0];
    const countryNameCell = row.children[1];
    const countryUrlCell = row.children[2];

    const flagImg = document.createElement('img');
    flagImg.classList.add('header-country-flag');
    const flagPicture = flagImageCell.querySelector('picture');
    if (flagPicture) {
      const originalImg = flagPicture.querySelector('img');
      const optimizedFlag = createOptimizedPicture(
        originalImg.src,
        originalImg.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(originalImg, optimizedFlag.querySelector('img'));
      flagImg.src = optimizedFlag.querySelector('img').src;
      flagImg.alt = optimizedFlag.querySelector('img').alt;
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-country-name');
    moveInstrumentation(countryNameCell, countryNameP);
    countryNameP.textContent = countryNameCell.textContent.trim();

    const countryLink = countryUrlCell.querySelector('a');
    if (countryLink) {
      countryOptionDiv.setAttribute('data-country', countryNameP.textContent.toLowerCase());
      countryOptionDiv.setAttribute('data-url', countryLink.href);
    }

    countryOptionDiv.append(flagImg, countryNameP);
    countryOptionsDiv.append(countryOptionDiv);
    moveInstrumentation(row, countryOptionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  modal.append(modalDialog);

  // Event Listeners for interactive elements
  countrySelectorTrigger.addEventListener('click', () => {
    modal.classList.add('header-show');
    modal.style.display = 'block';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('header-show');
      modal.style.display = 'none';
    }
  });

  // Search icon toggle
  searchIconLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-hidden');
    searchContainer.classList.add('header-hidden'); // Hide search input when opening/closing search block
    searchResults.classList.add('header-hidden'); // Hide results too
  });

  // Search input toggle
  searchButton.addEventListener('click', () => {
    searchContainer.classList.toggle('header-hidden');
    searchResults.classList.add('header-hidden'); // Hide results when toggling input
  });

  // Close search
  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
    searchContainer.classList.add('header-hidden');
    searchResults.classList.add('header-hidden');
  });

  // Country option selection
  countryOptionsDiv.addEventListener('click', (e) => {
    const targetOption = e.target.closest('.header-country-option');
    if (targetOption) {
      // Remove 'selected' from all options
      countryOptionsDiv
        .querySelectorAll('.header-country-option')
        .forEach((option) => option.classList.remove('header-selected'));

      // Add 'selected' to the clicked option
      targetOption.classList.add('header-selected');

      // Update country code and flag in trigger
      countryCodeSpan.textContent = targetOption
        .getAttribute('data-country')
        .toUpperCase();
      countryFlagImg.src = targetOption.querySelector('img').src;

      // Redirect to the selected country URL
      const countryUrl = targetOption.getAttribute('data-url');
      if (countryUrl) {
        window.location.href = countryUrl;
      }

      // Close the modal
      modal.classList.remove('header-show');
      modal.style.display = 'none';
    }
  });

  block.textContent = '';
  block.append(headerContainer, modal);
}
