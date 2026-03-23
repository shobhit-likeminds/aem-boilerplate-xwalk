import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson
  const [
    logoRow,
    logoLinkRow,
    navigationContainerRow, // This row is a container, its content is not directly used here
    countryFlagInRow,
    countryFlagUsaRow,
    countryOptionsContainerRow, // This row is a container, its content is not directly used here
    searchIconRow,
    ...itemRows // Remaining rows are item sub-components
  ] = [...block.children];

  const header = document.createElement('header');
  header.classList.add('header-itc-header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');
  header.append(headerContainer);

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
  headerContainer.append(nav);

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

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('header-d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';
  nav.append(dXlNoneDiv);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  const logoContent = logoRow.querySelector('picture');
  const logoLink = logoLinkRow.querySelector('div').textContent.trim();

  if (logoContent) {
    const logoAnchor = document.createElement('a');
    logoAnchor.classList.add('header-cmp-image__link');
    logoAnchor.href = logoLink;
    logoAnchor.target = '_blank';
    moveInstrumentation(logoRow.firstElementChild, logoAnchor);
    logoAnchor.append(logoContent);
    logoDiv.append(logoAnchor);
  }
  nav.append(logoDiv);

  // Navbar Collapse
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-collapse',
    'header-navbar-collapse',
    'header-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';
  nav.append(navbarCollapse);

  // Toggle behavior for navbar
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-show'); // Use header-show for consistency
    toggler.classList.toggle('header-collapsed');
    toggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('header-show'));
  });

  // Navigation
  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('header-nav-item', 'header-navigation');
  const navigationNav = document.createElement('nav');
  navigationNav.classList.add('header-cmp-navigation');
  navigationNav.setAttribute('role', 'navigation');
  const navigationUl = document.createElement('ul');
  navigationUl.classList.add('header-cmp-navigation__group');
  navigationNav.append(navigationUl);
  navigationDiv.append(navigationNav);
  navbarCollapse.append(navigationDiv);

  // Filter for navigation-item sub-components (2 cells: link, text)
  const navigationItems = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a'));
  navigationItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
    moveInstrumentation(row, li);

    const linkCell = row.children[0];
    const textCell = row.children[1];

    const link = linkCell.querySelector('a') || document.createElement('a');
    link.classList.add('header-cmp-navigation__item-link');
    if (!link.href) {
      link.href = linkCell.textContent.trim();
    }
    link.textContent = textCell.textContent.trim();
    li.append(link);
    navigationUl.append(li);
  });

  // Header Section (Search and Country Selector)
  const headerSectionDiv = document.createElement('div');
  headerSectionDiv.classList.add(
    'header-header-section',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-end',
  );
  navbarCollapse.append(headerSectionDiv);

  // Country Selector Trigger
  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add(
    'header-search-icon',
    'header-country-selector-trigger',
    'header-d-flex',
    'header-align-items-center',
  );
  headerSectionDiv.append(countrySelectorTrigger);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = 'IN'; // Default to IN
  countrySelectorTrigger.append(countryCodeSpan);

  // Use countryFlagInRow for the default flag
  const countryFlagImgIn = countryFlagInRow.querySelector('picture > img');
  if (countryFlagImgIn) {
    const flagImg = document.createElement('img');
    flagImg.classList.add('header-header-country-flag');
    flagImg.src = countryFlagImgIn.src;
    flagImg.alt = countryFlagImgIn.alt;
    countrySelectorTrigger.append(flagImg);
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-dropdown-icon');
  countrySelectorTrigger.append(dropdownIcon);

  // Search Icon
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
  const searchButtonImg = searchIconRow.querySelector('picture > img');
  if (searchButtonImg) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = searchButtonImg.src;
    img.alt = searchButtonImg.alt;
    searchButton.append(img);
  }
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774254813153.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');
  searchBlock.append(searchResults);

  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add('header-resultList');
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestionsH4);

  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add('header-resultList');
  pagesH4.textContent = 'Pages';
  searchResults.append(pagesH4);

  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('header-products');
  searchResults.append(productsList);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);

  const searchLink = document.createElement('a');
  searchLink.classList.add('header-nav-link');
  searchLink.id = 'searchLink'; // Add an ID to easily target it for click event

  const searchIconImg = searchIconRow.querySelector('picture > img');
  if (searchIconImg) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.id = 'searchIcon';
    img.src = searchIconImg.src;
    img.alt = searchIconImg.alt;
    searchLink.append(img);
  }
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchLink.append(searchSpan);
  itcHeaderIconList.append(searchLink);

  // Search functionality
  searchLink.addEventListener('click', (e) => {
    e.preventDefault();
    searchBlock.classList.toggle('header-hidden');
    searchContainer.classList.toggle('header-hidden');
    searchResults.classList.add('header-hidden'); // Hide results when opening search
    searchInput.value = ''; // Clear input
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
    searchContainer.classList.add('header-hidden');
    searchResults.classList.add('header-hidden');
    searchInput.value = '';
  });

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector');
  countryModal.id = 'countryModal';
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
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
  countryOptionsDiv.classList.add(
    'header-country-options',
    'header-d-flex',
    'header-justify-content-center',
    'header-align-items-center',
  );
  modalBody.append(countryOptionsDiv);

  // Filter for country-option sub-components (2 cells: flag, name)
  const countryOptions = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture'));
  countryOptions.forEach((row, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add(
      'header-country-option',
      'header-mx-3',
      'header-d-flex',
      'header-flex-column',
      'header-align-items-center',
    );
    if (index === 0) {
      optionDiv.classList.add('header-selected');
    }
    moveInstrumentation(row, optionDiv);

    const flagCell = row.children[0];
    const nameCell = row.children[1];

    const flagImg = flagCell.querySelector('picture > img');
    if (flagImg) {
      const img = document.createElement('img');
      img.src = flagImg.src;
      img.alt = flagImg.alt;
      img.classList.add('header-country-flag');
      const countryName = nameCell.textContent.trim().toLowerCase();
      if (countryName === 'india') {
        img.classList.add('header-india-flag');
        optionDiv.setAttribute('data-country', 'india');
        optionDiv.setAttribute('data-url', '/india');
      } else if (countryName === 'usa') {
        img.classList.add('header-usa-flag');
        optionDiv.setAttribute('data-country', 'usa');
        optionDiv.setAttribute('data-url', '/usa');
      }
      optionDiv.append(img);
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-country-name');
    countryNameP.textContent = nameCell.textContent.trim();
    optionDiv.append(countryNameP);
    countryOptionsDiv.append(optionDiv);

    // Add event listener for country option selection
    optionDiv.addEventListener('click', () => {
      // Remove 'header-selected' from all options
      countryOptionsDiv.querySelectorAll('.header-country-option').forEach((opt) => {
        opt.classList.remove('header-selected');
      });
      // Add 'header-selected' to the clicked option
      optionDiv.classList.add('header-selected');

      // Update country code and flag in the header
      const selectedCountryCode = optionDiv.getAttribute('data-country').toUpperCase();
      const selectedFlagSrc = optionDiv.querySelector('.header-country-flag').src;
      const selectedFlagAlt = optionDiv.querySelector('.header-country-flag').alt;

      countryCodeSpan.textContent = selectedCountryCode;
      const currentFlagImg = countrySelectorTrigger.querySelector('.header-header-country-flag');
      if (currentFlagImg) {
        currentFlagImg.src = selectedFlagSrc;
        currentFlagImg.alt = selectedFlagAlt;
      }

      // Close the modal
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
    });
  });

  // Country modal toggle behavior
  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('header-show');
    countryModal.style.display = 'block';
  });

  // Close modal when clicking outside or on header
  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal || e.target.closest('.header-modal-header')) {
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
    }
  });

  // Optimize images
  header.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(header);
}
