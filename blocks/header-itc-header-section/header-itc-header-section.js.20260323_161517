import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson
  const [
    logoImageRow,
    logoLinkRow,
    navigationLinksContainerRow, // This is a container, not individual links
    countryFlagRow,
    countryCodeRow,
    countryOptionsContainerRow, // This is a container, not individual options
    searchIconRow,
    ...itemRows // Remaining rows are item sub-components
  ] = [...block.children];

  // Filter item sub-components based on their structure (number of cells)
  // navigationLink has 2 cells: label, url
  const navigationLinks = itemRows.filter((row) => row.children.length === 2);
  // countryOption has 4 cells: flag, countryName, countryValue, countryUrl
  const countryOptions = itemRows.filter((row) => row.children.length === 4);

  const header = document.createElement('header');
  header.classList.add('header-itc-header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-itc-header-section-container');

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

  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('header-itc-header-section-navbar-toggler', 'header-itc-header-section-collapsed');
  navbarToggler.type = 'button';
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('header-itc-header-section-navbar-toggler-icon');
  navbarToggler.append(togglerIcon);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('header-itc-header-section-d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-itc-header-section-logo', 'header-itc-header-section-image');

  const logoImagePicture = logoImageRow.querySelector('picture');
  const logoImage = logoImagePicture ? logoImagePicture.querySelector('img') : null;
  const logoLink = logoLinkRow.querySelector('div')?.textContent.trim();

  if (logoImage) {
    const logoLinkAnchor = document.createElement('a');
    logoLinkAnchor.classList.add('header-itc-header-section-cmp-image__link');
    if (logoLink) {
      logoLinkAnchor.href = logoLink;
      logoLinkAnchor.target = '_blank';
    }
    const optimizedPic = createOptimizedPicture(
      logoImage.src,
      logoImage.alt,
      false,
      [{ width: '131' }],
    );
    moveInstrumentation(logoImage, optimizedPic.querySelector('img'));
    logoLinkAnchor.append(optimizedPic);
    logoDiv.append(logoLinkAnchor);
  }

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-itc-header-section-collapse',
    'header-itc-header-section-navbar-collapse',
    'header-itc-header-section-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-itc-header-section-nav-item', 'header-itc-header-section-navigation');

  const navigationCmp = document.createElement('nav');
  navigationCmp.classList.add('header-itc-header-section-cmp-navigation');
  navigationCmp.setAttribute('role', 'navigation');
  navigationCmp.setAttribute('itemscope', '');
  navigationCmp.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');

  const navigationUl = document.createElement('ul');
  navigationUl.classList.add('header-itc-header-section-cmp-navigation__group');

  navigationLinks.forEach((row) => {
    const labelCell = row.children[0];
    const urlCell = row.children[1];

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('header-itc-header-section-cmp-navigation__item', 'header-itc-header-section-cmp-navigation__item--level-0');

    const link = document.createElement('a');
    link.classList.add('header-itc-header-section-cmp-navigation__item-link');
    if (urlCell.querySelector('a')) {
      link.href = urlCell.querySelector('a').href;
      link.textContent = labelCell.textContent.trim();
    } else {
      link.href = '#';
      link.textContent = labelCell.textContent.trim();
    }
    li.append(link);
    navigationUl.append(li);
  });

  navigationCmp.append(navigationUl);
  navItemNavigation.append(navigationCmp);

  const headerSectionDiv = document.createElement('div');
  headerSectionDiv.classList.add(
    'header-itc-header-section-header-section',
    'header-itc-header-section-d-flex',
    'header-itc-header-section-align-items-center',
    'header-itc-header-section-justify-content-end',
  );

  const searchIconCountrySelectorTrigger = document.createElement('div');
  searchIconCountrySelectorTrigger.classList.add(
    'header-itc-header-section-search-icon',
    'header-itc-header-section-country-selector-trigger',
    'header-itc-header-section-d-flex',
    'header-itc-header-section-align-items-center',
  );

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-itc-header-section-country-code');
  countryCodeSpan.textContent = countryCodeRow.querySelector('div')?.textContent.trim();

  const countryFlagPicture = countryFlagRow.querySelector('picture');
  const countryFlagImg = countryFlagPicture ? countryFlagPicture.querySelector('img') : null;
  if (countryFlagImg) {
    const flagImg = document.createElement('img');
    flagImg.classList.add('header-itc-header-section-header-country-flag');
    flagImg.src = countryFlagImg.src;
    flagImg.alt = countryFlagImg.alt;
    searchIconCountrySelectorTrigger.append(flagImg);
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-itc-header-section-dropdown-icon');

  searchIconCountrySelectorTrigger.append(countryCodeSpan, dropdownIcon);
  headerSectionDiv.append(searchIconCountrySelectorTrigger);
  navbarCollapse.append(navItemNavigation, headerSectionDiv);

  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-section-itc-header-icon-list');

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

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchIconImg = document.createElement('img');
  const searchIconPicture = searchIconRow.querySelector('picture');
  const searchIconSrc = searchIconPicture ? searchIconPicture.querySelector('img')?.src : '';
  const searchIconAlt = searchIconPicture ? searchIconPicture.querySelector('img')?.alt : '';
  searchIconImg.loading = 'lazy';
  searchIconImg.src = searchIconSrc;
  searchIconImg.alt = searchIconAlt;
  searchButton.append(searchIconImg);

  searchContainer.append(searchInput, searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774257115822.svg+xml';
  closeButton.alt = 'Close icon';

  searchBox.append(searchContainer, closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-itc-header-section-search-results', 'header-itc-header-section-hidden');

  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add('header-itc-header-section-resultList');
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.id = 'suggestionsList';

  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add('header-itc-header-section-resultList');
  pagesH4.textContent = 'Pages';
  const productsListUl = document.createElement('ul');
  productsListUl.id = 'productsList';
  productsListUl.classList.add('header-itc-header-section-products');

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
  searchNavLink.classList.add('header-itc-header-section-nav-link');
  searchNavLink.id = 'searchTrigger';

  const searchIconLinkImg = document.createElement('img');
  searchIconLinkImg.loading = 'lazy';
  searchIconLinkImg.id = 'searchIcon';
  searchIconLinkImg.src = searchIconSrc;
  searchIconLinkImg.alt = searchIconAlt;

  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-itc-header-section-d-block');
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchIconLinkImg, searchSpan);

  itcHeaderIconList.append(searchBlock, searchNavLink);

  nav.append(navbarToggler, dXlNoneDiv, logoDiv, navbarCollapse, itcHeaderIconList);
  headerContainer.append(nav);
  header.append(headerContainer);

  const countryModal = document.createElement('div');
  countryModal.classList.add(
    'header-itc-header-section-modal',
    'header-itc-header-section-fade',
    'header-itc-header-section-itc-country-selector',
    'header-itc-header-section-show',
  );
  countryModal.id = 'countryModal';
  countryModal.setAttribute('tabindex', '-1');
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'none';

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

  const modalHeaderW100 = document.createElement('div');
  modalHeaderW100.classList.add('header-itc-header-section-w-100');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-itc-header-section-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';

  const experienceText = document.createElement('p');
  experienceText.classList.add('header-itc-header-section-experience-text');
  experienceText.textContent = 'Experience';

  modalHeaderW100.append(modalTitle, experienceText);
  modalHeader.append(modalHeaderW100);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-itc-header-section-modal-body');

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    'header-itc-header-section-country-options',
    'header-itc-header-section-d-flex',
    'header-itc-header-section-justify-content-center',
    'header-itc-header-section-align-items-center',
  );

  countryOptions.forEach((row) => {
    const flagCell = row.children[0];
    const countryNameCell = row.children[1];
    const countryValueCell = row.children[2];
    const countryUrlCell = row.children[3];

    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add(
      'header-itc-header-section-country-option',
      'header-itc-header-section-mx-3',
      'header-itc-header-section-d-flex',
      'header-itc-header-section-flex-column',
      'header-itc-header-section-align-items-center',
    );
    countryOptionDiv.setAttribute('data-country', countryValueCell.textContent.trim().toLowerCase());
    if (countryUrlCell.querySelector('a')) {
      countryOptionDiv.setAttribute('data-url', countryUrlCell.querySelector('a').href);
    } else {
      countryOptionDiv.setAttribute('data-url', '#');
    }

    if (flagCell) {
      const countryFlag = flagCell.querySelector('img');
      const flagImg = document.createElement('img');
      flagImg.src = countryFlag.src;
      flagImg.alt = countryFlag.alt;
      flagImg.classList.add('header-itc-header-section-country-flag');
      if (countryValueCell.textContent.trim().toLowerCase() === 'india') {
        flagImg.classList.add('header-itc-header-section-india-flag');
      } else if (countryValueCell.textContent.trim().toLowerCase() === 'usa') {
        flagImg.classList.add('header-itc-header-section-usa-flag');
      }
      countryOptionDiv.append(flagImg);
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-itc-header-section-country-name');
    countryNameP.textContent = countryNameCell.textContent.trim();
    countryOptionDiv.append(countryNameP);
    countryOptionsDiv.append(countryOptionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);

  header.append(countryModal);

  block.textContent = '';
  block.append(header);

  // Event Listeners for interactive behavior
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-itc-header-section-show');
    navbarToggler.classList.toggle('header-itc-header-section-collapsed');
    navbarToggler.setAttribute(
      'aria-expanded',
      navbarCollapse.classList.contains('header-itc-header-section-show'),
    );
  });

  searchIconCountrySelectorTrigger.addEventListener('click', () => {
    countryModal.style.display = 'block';
    countryModal.classList.add('header-itc-header-section-show');
  });

  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.style.display = 'none';
      countryModal.classList.remove('header-itc-header-section-show');
    }
  });

  countryOptionsDiv.querySelectorAll('.header-itc-header-section-country-option').forEach((option) => {
    option.addEventListener('click', () => {
      countryOptionsDiv
        .querySelectorAll('.header-itc-header-section-country-option')
        .forEach((opt) => opt.classList.remove('header-itc-header-section-selected'));
      option.classList.add('header-itc-header-section-selected');
      const selectedCountryUrl = option.getAttribute('data-url');
      if (selectedCountryUrl && selectedCountryUrl !== '#') {
        window.location.href = selectedCountryUrl;
      }
      countryModal.style.display = 'none';
      countryModal.classList.remove('header-itc-header-section-show');
    });
  });

  const searchTrigger = block.querySelector('#searchTrigger');
  const searchBlockEl = block.querySelector('#searchBlock');
  const closeButtonEl = block.querySelector('#closeButton');
  const searchInputEl = block.querySelector('#searchInput');
  const searchContainerEl = block.querySelector('#searchContainer');
  const searchResultsEl = block.querySelector('#searchResults');

  searchTrigger.addEventListener('click', () => {
    searchBlockEl.classList.remove('header-itc-header-section-hidden');
    searchContainerEl.classList.remove('header-itc-header-section-hidden');
    searchResultsEl.classList.add('header-itc-header-section-hidden'); // Initially hide results
  });

  closeButtonEl.addEventListener('click', () => {
    searchBlockEl.classList.add('header-itc-header-section-hidden');
    searchInputEl.value = '';
    searchResultsEl.classList.add('header-itc-header-section-hidden');
  });

  searchInputEl.addEventListener('input', () => {
    if (searchInputEl.value.length > 0) {
      searchResultsEl.classList.remove('header-itc-header-section-hidden');
    } else {
      searchResultsEl.classList.add('header-itc-header-section-hidden');
    }
  });

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
