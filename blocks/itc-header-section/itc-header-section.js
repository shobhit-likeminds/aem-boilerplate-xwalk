import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    flagImageInRow,
    flagImageUsaRow,
    ...itemRows
  ] = [...block.children];

  // Use content detection for navigation items (2 cells: link, label)
  const navigationItems = itemRows.filter((row) => row.children.length === 2);
  // Use content detection for country options (4 cells: flag, name, code, url)
  const countryOptions = itemRows.filter((row) => row.children.length === 4);

  block.textContent = '';

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
  // Original HTML uses data-target and data-toggle, but we'll use classList.toggle for vanilla JS
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  navbarToggler.append(togglerIcon);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image');

  const logoLink = logoLinkRow.querySelector('a');
  const logoLinkHref = logoLink ? logoLink.href : '#';

  const logoAnchor = document.createElement('a');
  logoAnchor.classList.add('cmp-image__link');
  logoAnchor.href = logoLinkHref;
  logoAnchor.target = '_blank';

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(
      logoImg.src,
      logoImg.alt,
      false,
      [{ width: '131' }],
    );
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoAnchor.append(optimizedLogoPic);
  } else {
    // Fallback if no picture element is found
    const img = document.createElement('img');
    img.classList.add('cmp-image__image', 'itc-logo-image');
    logoAnchor.append(img);
  }

  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  logoAnchor.append(screenReaderSpan);
  logoDiv.append(logoAnchor);

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
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');

    // Content detection for navigation-item cells
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a')); // Assuming label is plain text

    const foundLink = linkCell ? linkCell.querySelector('a') : null;
    const link = document.createElement('a');
    link.classList.add('cmp-navigation__item-link');
    if (foundLink) link.href = foundLink.href;
    if (labelCell) {
      while (labelCell.firstChild) link.append(labelCell.firstChild);
    }
    li.append(link);
    cmpNavigationGroup.append(li);
  });

  cmpNavigation.append(cmpNavigationGroup);
  navItemNavigation.append(cmpNavigation);
  navbarCollapse.append(navItemNavigation);

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-section', 'd-flex', 'align-items-center', 'justify-content-end');

  const searchIconCountrySelectorTrigger = document.createElement('div');
  searchIconCountrySelectorTrigger.classList.add(
    'search-icon',
    'country-selector-trigger',
    'd-flex',
    'align-items-center',
  );

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('country-code');
  countryCodeSpan.textContent = 'IN'; // Default to IN as per original HTML

  const flagImgIn = flagImageInRow.querySelector('img');
  const headerCountryFlag = document.createElement('img');
  headerCountryFlag.classList.add('header-country-flag');
  if (flagImgIn) {
    headerCountryFlag.src = flagImgIn.src;
    headerCountryFlag.alt = flagImgIn.alt;
  } else {
    headerCountryFlag.alt = 'flag';
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('dropdown-icon');

  searchIconCountrySelectorTrigger.append(countryCodeSpan, headerCountryFlag, dropdownIcon);
  headerSection.append(searchIconCountrySelectorTrigger);
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
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1775477576567.svg+xml';
  closeButton.alt = 'Close icon';

  searchBox.append(searchContainer, closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('search-results', 'hidden');

  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add('resultList');
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.id = 'suggestionsList';

  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add('resultList');
  pagesH4.textContent = 'Pages';
  const productsListUl = document.createElement('ul');
  productsListUl.id = 'productsList';
  productsListUl.classList.add('products');

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

  const searchNavLink = document.createElement('a');
  searchNavLink.classList.add('nav-link');
  const searchIconImg = document.createElement('img');
  searchIconImg.loading = 'lazy';
  searchIconImg.id = 'searchIcon';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchIconImg.alt = 'Search icon';
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-block');
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchIconImg, searchSpan);

  const navItemLi = document.createElement('li');
  navItemLi.classList.add('nav-item');
  const emptyNavLink = document.createElement('a');
  emptyNavLink.classList.add('nav-link');
  navItemLi.append(emptyNavLink);

  itcHeaderIconList.append(searchBlock, searchNavLink, navItemLi);

  nav.append(
    navbarToggler,
    dXlNoneDiv,
    logoDiv,
    navbarCollapse,
    itcHeaderIconList,
  );
  container.append(nav);
  block.append(container);

  // Modal Structure
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

  const modalHeaderW100 = document.createElement('div');
  modalHeaderW100.classList.add('w-100');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';

  const experienceText = document.createElement('p');
  experienceText.classList.add('experience-text');
  experienceText.textContent = 'Experience';

  modalHeaderW100.append(modalTitle, experienceText);
  modalHeader.append(modalHeaderW100);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    'country-options',
    'd-flex',
    'justify-content-center',
    'align-items-center',
  );

  countryOptions.forEach((row) => {
    // Content detection for country-option cells
    const cells = [...row.children];
    const flagCell = cells.find(cell => cell.querySelector('picture'));
    const urlCell = cells.find(cell => cell.querySelector('a'));
    const nameCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0); // Assuming name is plain text
    const codeCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell !== nameCell); // Assuming code is also plain text and distinct from name

    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add(
      'country-option',
      'mx-3',
      'd-flex',
      'flex-column',
      'align-items-center',
    );
    if (codeCell) countryOptionDiv.setAttribute('data-country', codeCell.textContent.toLowerCase());
    const foundUrl = urlCell ? urlCell.querySelector('a') : null;
    if (foundUrl) countryOptionDiv.setAttribute('data-url', foundUrl.href);

    const countryFlagPicture = flagCell ? flagCell.querySelector('picture') : null;
    const countryFlagImg = document.createElement('img');
    countryFlagImg.classList.add('country-flag');
    countryFlagImg.alt = `${nameCell ? nameCell.textContent : ''} Flag`;
    if (countryFlagPicture) {
      const originalImg = countryFlagPicture.querySelector('img');
      countryFlagImg.src = originalImg.src;
      countryFlagImg.alt = originalImg.alt;
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('country-name');
    if (nameCell) countryNameP.textContent = nameCell.textContent;

    countryOptionDiv.append(countryFlagImg, countryNameP);
    countryOptionsDiv.append(countryOptionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);
  block.append(countryModal);

  // Event Listeners for interactivity
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed');
    const isExpanded = navbarToggler.classList.contains('collapsed') ? 'false' : 'true';
    navbarToggler.setAttribute('aria-expanded', isExpanded);
  });

  searchIconCountrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('show');
    countryModal.style.display = 'block';
    countryModal.setAttribute('aria-modal', 'true');
    countryModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open'); // Add class to body to prevent scrolling
  });

  countryModal.addEventListener('click', (e) => {
    // Close modal if backdrop is clicked or if a close button/header area is clicked
    if (e.target === countryModal || e.target.closest('.modal-header')) {
      countryModal.classList.remove('show');
      countryModal.style.display = 'none';
      countryModal.setAttribute('aria-modal', 'false');
      countryModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }
  });

  // Handle country option clicks
  countryOptionsDiv.querySelectorAll('.country-option').forEach((option) => {
    option.addEventListener('click', () => {
      const url = option.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  });

  // Search functionality event listeners
  const searchIcon = document.getElementById('searchIcon');
  const searchContainerElement = document.getElementById('searchContainer');
  const searchInputEl = document.getElementById('searchInput');
  const searchButtonEl = document.getElementById('searchButton');
  const closeButtonEl = document.getElementById('closeButton');
  const searchResultsEl = document.getElementById('searchResults');
  const searchBlockEl = document.getElementById('searchBlock');

  searchIcon.addEventListener('click', () => {
    searchBlockEl.classList.toggle('hidden');
    searchContainerElement.classList.toggle('hidden');
    if (!searchContainerElement.classList.contains('hidden')) {
      searchInputEl.focus();
    }
  });

  closeButtonEl.addEventListener('click', () => {
    searchBlockEl.classList.add('hidden');
    searchContainerElement.classList.add('hidden');
    searchResultsEl.classList.add('hidden');
    searchInputEl.value = ''; // Clear search input
  });

  searchInputEl.addEventListener('input', () => {
    // Implement search logic here. For now, just toggle search results visibility.
    if (searchInputEl.value.trim().length > 0) {
      searchResultsEl.classList.remove('hidden');
    } else {
      searchResultsEl.classList.add('hidden');
    }
  });

  searchButtonEl.addEventListener('click', () => {
    // Trigger search action
    console.log('Searching for:', searchInputEl.value);
    // In a real scenario, this would trigger an API call or filter results
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
