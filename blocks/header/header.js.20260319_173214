import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logosContainer,
    navigationLinksContainer,
    countryOptionsContainer,
    searchPlaceholderCell,
    ...itemRows
  ] = [...block.children];

  const headerSection = document.createElement('header');
  headerSection.classList.add('header-section');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  headerSection.append(containerDiv);

  const headerNavbar = document.createElement('nav');
  headerNavbar.classList.add(
    'header-navbar',
    'navbar',
    'navbar-expand-xl',
    'navbar-light',
    'bg-light',
    'px-xl-5',
    'd-flex',
    'justify-content-between',
    'align-items-center',
  );
  containerDiv.append(headerNavbar);

  // Navbar Toggler
  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('navbar-toggler', 'collapsed');
  navbarToggler.type = 'button';
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  navbarToggler.append(togglerIcon);
  headerNavbar.append(navbarToggler);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';
  headerNavbar.append(dXlNoneDiv);

  // Logos
  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.classList.add('header-logo-div', 'image');
  headerNavbar.append(headerLogoDiv);

  const logoItems = itemRows.filter((row) => row.dataset.blockItemType === 'logo');
  logoItems.forEach((row) => {
    const [imageCell, altTextCell, urlCell] = [...row.children];
    const link = urlCell.querySelector('a');
    if (link) {
      const logoLink = document.createElement('a');
      moveInstrumentation(urlCell, logoLink);
      logoLink.href = link.href;
      logoLink.target = '_blank';
      logoLink.classList.add('cmp-image__link');

      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        logoLink.append(optimizedPic);
      }
      const screenReaderText = document.createElement('span');
      screenReaderText.classList.add('cmp-link__screen-reader-only');
      screenReaderText.textContent = 'opens in a new tab';
      logoLink.append(screenReaderText);
      headerLogoDiv.append(logoLink);
    }
  });

  // Navbar Supported Content
  const navbarSupportedContent = document.createElement('div');
  navbarSupportedContent.classList.add(
    'header-navbarSupportedContent',
    'collapse',
    'navbar-collapse',
    'justify-content-center',
  );
  navbarSupportedContent.id = 'navbarSupportedContent';
  headerNavbar.append(navbarSupportedContent);

  // Navigation Links
  const headerNavItemNav = document.createElement('div');
  headerNavItemNav.classList.add('header-nav-item', 'nav-item', 'navigation');
  navbarSupportedContent.append(headerNavItemNav);

  const navigation = document.createElement('nav');
  navigation.id = 'navigation-6d5dcb0126';
  navigation.classList.add('header-cmp-navigation');
  navigation.setAttribute('itemscope', '');
  navigation.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  navigation.setAttribute('role', 'navigation');
  headerNavItemNav.append(navigation);

  const navUl = document.createElement('ul');
  navUl.classList.add('header-cmp-navigation__group');
  navigation.append(navUl);

  const navigationLinkItems = itemRows.filter(
    (row) => row.dataset.blockItemType === 'navigation-link',
  );
  navigationLinkItems.forEach((row) => {
    const [labelCell, urlCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
    const link = urlCell.querySelector('a');
    if (link) {
      const navLink = document.createElement('a');
      moveInstrumentation(urlCell, navLink);
      navLink.classList.add('header-cmp-navigation__item-link');
      navLink.href = link.href;
      navLink.textContent = labelCell.textContent;
      li.append(navLink);
    }
    navUl.append(li);
  });

  // Section Wrapper (Search and Country Selector)
  const headerSectionWrapper = document.createElement('div');
  headerSectionWrapper.classList.add(
    'header-section-wrapper',
    'd-flex',
    'align-items-center',
    'justify-content-end',
  );
  navbarSupportedContent.append(headerSectionWrapper);

  // Country Selector Trigger
  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add(
    'header-search-icon',
    'country-selector-trigger',
    'd-flex',
    'align-items-center',
  );
  headerSectionWrapper.append(countrySelectorTrigger);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = 'IN'; // Default
  countrySelectorTrigger.append(countryCodeSpan);

  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-country-flag');
  countryFlagImg.alt = 'flag';
  // Default flag, will be updated by modal logic
  countryFlagImg.src = '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp';
  countrySelectorTrigger.append(countryFlagImg);

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-dropdown-icon');
  countrySelectorTrigger.append(dropdownIcon);

  // Header Icon List (Search)
  const headerIconList = document.createElement('div');
  headerIconList.classList.add('header-icon-list');
  headerNavbar.append(headerIconList);

  // Search Block
  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('header-search-block', 'hidden');
  headerIconList.append(searchBlock);

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('header-search-box');
  searchBlock.append(searchBox);

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('header-search-container', 'hidden');
  searchBox.append(searchContainer);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = searchPlaceholderCell.textContent.trim();
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchButtonImg = document.createElement('img');
  searchButtonImg.loading = 'lazy';
  searchButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchButtonImg.alt = 'Search icon';
  searchButton.append(searchButtonImg);
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1773896361516.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'hidden');
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

  // Search Icon Trigger
  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('header-nav-link', 'nav-link');
  searchIconLink.id = 'searchIconTrigger'; // Custom ID for event listener
  const searchIconImg = document.createElement('img');
  searchIconImg.loading = 'lazy';
  searchIconImg.id = 'searchIcon';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchIconImg.alt = 'Search icon';
  searchIconLink.append(searchIconImg);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchSpan);
  headerIconList.append(searchIconLink);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.id = 'countryModal';
  countryModal.classList.add('header-modal', 'modal', 'fade', 'itc-country-selector');
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  headerSection.append(countryModal);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'modal-dialog', 'modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  countryModal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content', 'modal-content');
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add(
    'header-modal-header',
    'modal-header',
    'border-0',
    'text-center',
  );
  modalContent.append(modalHeader);

  const modalHeaderW100 = document.createElement('div');
  modalHeaderW100.classList.add('w-100');
  modalHeader.append(modalHeaderW100);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title', 'modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  modalHeaderW100.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text', 'experience-text');
  experienceText.textContent = 'Experience';
  modalHeaderW100.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body', 'modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    'header-country-options',
    'country-options',
    'd-flex',
    'justify-content-center',
    'align-items-center',
  );
  modalBody.append(countryOptionsDiv);

  const countryOptionItems = itemRows.filter((row) => row.dataset.blockItemType === 'country-option');
  countryOptionItems.forEach((row) => {
    const [flagCell, labelCell, urlCell] = [...row.children];
    const countryOption = document.createElement('div');
    moveInstrumentation(row, countryOption);
    countryOption.classList.add(
      'header-country-option',
      'country-option',
      'mx-3',
      'd-flex',
      'flex-column',
      'align-items-center',
    );

    const flagLink = urlCell.querySelector('a');
    if (flagLink) {
      countryOption.setAttribute('data-country', labelCell.textContent.toLowerCase());
      countryOption.setAttribute('data-url', flagLink.href);

      const picture = flagCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('header-country-flag', `${labelCell.textContent.toLowerCase()}-flag`);
        countryOption.append(optimizedPic);
      }

      const countryName = document.createElement('p');
      countryName.classList.add('header-country-name', 'country-name');
      countryName.textContent = labelCell.textContent;
      countryOption.append(countryName);
    }
    countryOptionsDiv.append(countryOption);
  });

  // Event Listeners for interactivity
  navbarToggler.addEventListener('click', () => {
    navbarSupportedContent.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed');
    navbarToggler.setAttribute('aria-expanded', navbarToggler.classList.contains('show'));
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('show');
    countryModal.style.display = 'block';
  });

  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.classList.remove('show');
      countryModal.style.display = 'none';
    }
  });

  const closeModalBtn = document.createElement('button');
  closeModalBtn.classList.add('close');
  closeModalBtn.setAttribute('aria-label', 'Close');
  const closeSpan = document.createElement('span');
  closeSpan.setAttribute('aria-hidden', 'true');
  closeSpan.innerHTML = '&times;';
  closeModalBtn.append(closeSpan);
  modalHeader.append(closeModalBtn);

  closeModalBtn.addEventListener('click', () => {
    countryModal.classList.remove('show');
    countryModal.style.display = 'none';
  });

  searchIconLink.addEventListener('click', (e) => {
    e.preventDefault();
    searchBlock.classList.toggle('hidden');
    // Hide search results when opening/closing search bar
    searchResults.classList.add('hidden');
    searchContainer.classList.add('hidden');
    searchInput.value = '';
  });

  searchButton.addEventListener('click', () => {
    // Implement search logic here
    console.log('Search initiated for:', searchInput.value);
    searchResults.classList.remove('hidden');
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('hidden');
    searchResults.classList.add('hidden');
    searchContainer.classList.add('hidden');
    searchInput.value = '';
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      searchContainer.classList.remove('hidden');
      searchResults.classList.remove('hidden');
      // In a real scenario, fetch and display suggestions/results here
    } else {
      searchContainer.classList.add('hidden');
      searchResults.classList.add('hidden');
    }
  });

  // Optimize images
  headerSection.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(headerSection);
}
