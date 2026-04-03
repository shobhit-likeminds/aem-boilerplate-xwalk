import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  const logoImageCell = logoImageRow.firstElementChild;
  const logoLinkCell = logoLinkRow.firstElementChild;

  // Use content detection instead of index access for item rows
  const navigationItems = itemRows.filter(
    (row) => {
      const cells = [...row.children];
      return cells.length === 2 && cells[0].textContent && cells[1].querySelector('a');
    },
  );
  const countryOptions = itemRows.filter(
    (row) => {
      const cells = [...row.children];
      return cells.length === 2 && cells[0].querySelector('picture') && cells[1].textContent;
    },
  );

  block.textContent = '';

  const header = document.createElement('header');
  header.classList.add('itc-header-section');

  const container = document.createElement('div');
  container.classList.add('container');

  const nav = document.createElement('nav');
  nav.classList.add(
    'navbar',
    'navbar-expand-xl',
    'navbar-light',
    'bg-light',
    'px-xl-5',
    'd-flex',
    'justify-content-between',
    'align-items-center',
  );

  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('navbar-toggler', 'collapsed');
  navbarToggler.type = 'button';
  // Removed data-toggle and data-target as these are Bootstrap JS attributes not used in EDS
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('navbar-toggler-icon');
  navbarToggler.append(togglerSpan);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image');

  const logoLink = document.createElement('a');
  logoLink.classList.add('cmp-image__link');
  const foundLogoLink = logoLinkCell.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
    logoLink.target = '_blank';
  }
  moveInstrumentation(logoLinkCell, logoLink);

  const logoPicture = logoImageCell.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const optimizedPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '131' }]);
      moveInstrumentation(logoImg, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  logoLink.append(screenReaderSpan);
  logoDiv.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('collapse', 'navbar-collapse', 'justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('nav-item', 'navigation');

  const cmpNavigation = document.createElement('nav');
  cmpNavigation.classList.add('cmp-navigation');
  cmpNavigation.setAttribute('role', 'navigation');

  const cmpNavigationGroup = document.createElement('ul');
  cmpNavigationGroup.classList.add('cmp-navigation__group');

  navigationItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells[0]; // Safe to use index here as filter ensures structure
    const linkCell = cells[1]; // Safe to use index here as filter ensures structure

    const li = document.createElement('li');
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    moveInstrumentation(row, li);

    const link = document.createElement('a');
    link.classList.add('cmp-navigation__item-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = labelCell.textContent;
    li.append(link);
    cmpNavigationGroup.append(li);
  });

  cmpNavigation.append(cmpNavigationGroup);
  navItemNavigation.append(cmpNavigation);
  navbarCollapse.append(navItemNavigation);

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-section', 'd-flex', 'align-items-center', 'justify-content-end');

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('search-icon', 'country-selector-trigger', 'd-flex', 'align-items-center');
  // Removed data-toggle and data-target as these are Bootstrap JS attributes not used in EDS
  // Removed data-flag-in and data-flag-usa as these should be derived from content, not hardcoded attributes

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('country-code');
  countryCodeSpan.textContent = 'IN'; // Default value, will be updated on selection
  countrySelectorTrigger.append(countryCodeSpan);

  const currentFlagImg = document.createElement('img');
  currentFlagImg.classList.add('header-country-flag');
  currentFlagImg.alt = 'flag';
  // Default to first country option if available
  if (countryOptions.length > 0) {
    const flagImage = countryOptions[0].children[0].querySelector('picture img'); // Safe to use index here as filter ensures structure
    if (flagImage) {
      currentFlagImg.src = flagImage.src;
    }
  }
  countrySelectorTrigger.append(currentFlagImg);

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('dropdown-icon');
  countrySelectorTrigger.append(dropdownIcon);
  headerSection.append(countrySelectorTrigger);
  navbarCollapse.append(headerSection);

  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('itc-header-icon-list');

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('search-block', 'hidden');

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('search-box');

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('search-container', 'hidden');

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
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1775196136037.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);
  searchBlock.append(searchBox);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('search-results', 'hidden');

  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestions);

  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pagesTitle = document.createElement('h4');
  pagesTitle.classList.add('resultList');
  pagesTitle.textContent = 'Pages';
  searchResults.append(pagesTitle);

  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('products');
  searchResults.append(productsList);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);
  searchBlock.append(searchResults);
  itcHeaderIconList.append(searchBlock);

  const searchLink = document.createElement('a');
  searchLink.classList.add('nav-link');
  const searchIconImg = document.createElement('img');
  searchIconImg.loading = 'lazy';
  searchIconImg.id = 'searchIcon';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchIconImg.alt = 'Search icon';
  searchLink.append(searchIconImg);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-block');
  searchSpan.textContent = 'Search';
  searchLink.append(searchSpan);
  itcHeaderIconList.append(searchLink);

  nav.append(navbarToggler, dXlNoneDiv, logoDiv, navbarCollapse, itcHeaderIconList);
  container.append(nav);
  header.append(container);

  const countryModal = document.createElement('div');
  countryModal.classList.add('modal', 'fade', 'itc-country-selector');
  countryModal.id = 'countryModal';
  countryModal.setAttribute('tabindex', '-1');
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header', 'border-0', 'text-center');

  const modalHeaderWrapper = document.createElement('div');
  modalHeaderWrapper.classList.add('w-100');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  modalHeaderWrapper.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('experience-text');
  experienceText.textContent = 'Experience';
  modalHeaderWrapper.append(experienceText);
  modalHeader.append(modalHeaderWrapper);
  modalContent.append(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('country-options', 'd-flex', 'justify-content-center', 'align-items-center');

  countryOptions.forEach((row, index) => {
    const cells = [...row.children];
    const flagImageCell = cells[0]; // Safe to use index here as filter ensures structure
    const countryNameCell = cells[1]; // Safe to use index here as filter ensures structure

    const countryOption = document.createElement('div');
    countryOption.classList.add('country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');
    if (index === 0) {
      countryOption.classList.add('selected');
    }
    countryOption.setAttribute('data-country', countryNameCell.textContent.toLowerCase());
    countryOption.setAttribute('data-url', `/${countryNameCell.textContent.toLowerCase()}`);
    moveInstrumentation(row, countryOption);

    const flagImg = flagImageCell.querySelector('picture img');
    if (flagImg) {
      const countryFlag = document.createElement('img');
      countryFlag.src = flagImg.src;
      countryFlag.alt = `${countryNameCell.textContent} Flag`;
      countryFlag.classList.add('country-flag', `${countryNameCell.textContent.toLowerCase()}-flag`);
      countryOption.append(countryFlag);
    }

    const countryName = document.createElement('p');
    countryName.classList.add('country-name');
    countryName.textContent = countryNameCell.textContent;
    countryOption.append(countryName);

    countryOptionsDiv.append(countryOption);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);

  block.append(header, countryModal);

  // Event Listeners for interactive behavior
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed');
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('show');
    countryModal.style.display = 'block';
  });

  // Close modal when clicking outside
  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.classList.remove('show');
      countryModal.style.display = 'none';
    }
  });

  // Close modal when an option is selected
  countryOptionsDiv.querySelectorAll('.country-option').forEach((option) => {
    option.addEventListener('click', () => {
      countryModal.classList.remove('show');
      countryModal.style.display = 'none';
      countryOptionsDiv.querySelectorAll('.country-option').forEach((opt) => opt.classList.remove('selected'));
      option.classList.add('selected');
      countryCodeSpan.textContent = option.getAttribute('data-country').toUpperCase().substring(0, 2);
      const selectedFlag = option.querySelector('.country-flag');
      if (selectedFlag) {
        currentFlagImg.src = selectedFlag.src;
      }
      // Simulate navigation or update content based on selected country
      // window.location.href = option.getAttribute('data-url');
    });
  });

  searchLink.addEventListener('click', () => {
    searchBlock.classList.toggle('hidden');
    searchContainer.classList.toggle('hidden');
    searchResults.classList.add('hidden'); // Hide results when opening search
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('hidden');
    searchContainer.classList.add('hidden');
    searchResults.classList.add('hidden');
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      searchResults.classList.remove('hidden');
    } else {
      searchResults.classList.add('hidden');
    }
    // Implement actual search logic here to populate suggestionsList and productsList
    suggestionsList.innerHTML = '';
    productsList.innerHTML = '';
    if (searchInput.value === 'test') { // Example dummy search
      const li1 = document.createElement('li');
      li1.textContent = 'Test Suggestion 1';
      suggestionsList.append(li1);
      const li2 = document.createElement('li');
      li2.textContent = 'Test Product 1';
      productsList.append(li2);
    }
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
