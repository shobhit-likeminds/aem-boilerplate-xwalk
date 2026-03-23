import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    navigationLinksContainerRow, // This is a container, not individual links
    countrySelectorFlagINRow,
    countrySelectorFlagUSARow,
    countryOptionsContainerRow, // This is a container, not individual options
    searchIconRow,
    ...itemRows
  ] = [...block.children];

  // Filter itemRows based on the number of children to distinguish between navigationLink and countryOption
  const navigationLinks = itemRows.filter((row) => row.children.length === 2);
  const countryOptions = itemRows.filter((row) => row.children.length === 3);

  const header = document.createElement('header');
  header.classList.add('header-itc-header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');

  const navbar = document.createElement('nav');
  navbar.classList.add(
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
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('header-itc-header-section-navbar-toggler-icon');
  navbarToggler.append(togglerIcon);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('header-itc-header-section-d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-itc-header-section-logo', 'header-itc-header-section-image');
  const logoLink = document.createElement('a');
  // logoLinkRow contains the link URL as its first child's text content
  const logoLinkUrl = logoLinkRow.firstElementChild.textContent.trim();
  logoLink.href = logoLinkUrl;
  logoLink.classList.add('header-itc-header-section-cmp-image__link');
  logoLink.target = '_blank';
  // logoImageRow contains the picture element as its first child
  const logoPicture = logoImageRow.firstElementChild.querySelector('picture');
  if (logoPicture) {
    logoLink.append(logoPicture);
  }
  moveInstrumentation(logoLinkRow.firstElementChild, logoLink); // Instrument the link text
  moveInstrumentation(logoImageRow.firstElementChild, logoLink); // Instrument the image container
  logoDiv.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-itc-header-section-collapse',
    'header-itc-header-section-navbar-collapse',
    'header-itc-header-section-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-itc-header-section-nav-item', 'header-itc-header-section-navigation');
  const navEl = document.createElement('nav');
  navEl.id = 'navigation-6d5dcb0126'; // Keep original ID if it's from AEM
  navEl.classList.add('header-itc-header-section-cmp-navigation');
  navEl.setAttribute('role', 'navigation');
  const ul = document.createElement('ul');
  ul.classList.add('header-itc-header-section-cmp-navigation__group');

  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add(
      'header-itc-header-section-cmp-navigation__item',
      'header-itc-header-section-cmp-navigation__item--level-0',
    );
    const link = document.createElement('a');
    link.classList.add('header-itc-header-section-cmp-navigation__item-link');
    const linkUrl = row.children[0].textContent.trim();
    const label = row.children[1].textContent.trim();
    link.href = linkUrl;
    link.textContent = label;
    li.append(link);
    ul.append(li);
  });

  navEl.append(ul);
  navItemNavigation.append(navEl);

  const headerSection = document.createElement('div');
  headerSection.classList.add(
    'header-itc-header-section-header-section',
    'header-itc-header-section-d-flex',
    'header-itc-header-section-align-items-center',
    'header-itc-header-section-justify-content-end',
  );

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add(
    'header-itc-header-section-search-icon',
    'header-itc-header-section-country-selector-trigger',
    'header-itc-header-section-d-flex',
    'header-itc-header-section-align-items-center',
  );

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-itc-header-section-country-code');
  countryCodeSpan.textContent = 'IN'; // Default to IN

  const countryFlagIN = countrySelectorFlagINRow.querySelector('img');
  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-itc-header-section-header-country-flag');
  countryFlagImg.src = countryFlagIN.src;
  countryFlagImg.alt = countryFlagIN.alt;

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-itc-header-section-dropdown-icon');

  countrySelectorTrigger.append(countryCodeSpan, countryFlagImg, dropdownIcon);
  headerSection.append(countrySelectorTrigger);

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
  const searchIconImg = searchIconRow.firstElementChild.querySelector('img'); // Correctly get img from searchIconRow
  const searchButtonImg = document.createElement('img');
  searchButtonImg.loading = 'lazy';
  searchButtonImg.src = searchIconImg.src;
  searchButtonImg.alt = searchIconImg.alt;
  searchButton.append(searchButtonImg);

  searchContainer.append(searchInput, searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774242539326.svg+xml';
  closeButton.alt = 'Close icon';

  searchBox.append(searchContainer, closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-itc-header-section-search-results', 'header-itc-header-section-hidden');

  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('header-itc-header-section-resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';

  const pagesResultList = document.createElement('h4');
  pagesResultList.classList.add('header-itc-header-section-resultList');
  pagesResultList.textContent = 'Pages';
  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('header-itc-header-section-products');

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';

  searchResults.append(
    popularSuggestions,
    suggestionsList,
    pagesResultList,
    productsList,
    viewAllButton,
  );

  searchBlock.append(searchBox, searchResults);

  const searchNavLink = document.createElement('a');
  searchNavLink.classList.add('header-itc-header-section-nav-link');
  searchNavLink.id = 'searchIconTrigger'; // Custom ID for event listener
  const searchIconNavLinkImg = searchIconRow.firstElementChild.querySelector('img'); // Correctly get img from searchIconRow
  const searchIconImgEl = document.createElement('img');
  searchIconImgEl.loading = 'lazy';
  searchIconImgEl.id = 'searchIcon';
  searchIconImgEl.src = searchIconNavLinkImg.src;
  searchIconImgEl.alt = searchIconNavLinkImg.alt;
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-itc-header-section-d-block');
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchIconImgEl, searchSpan);

  itcHeaderIconList.append(searchBlock, searchNavLink);

  navbarCollapse.append(navItemNavigation, headerSection);
  navbar.append(navbarToggler, dXlNoneDiv, logoDiv, navbarCollapse, itcHeaderIconList);
  headerContainer.append(navbar);
  header.append(headerContainer);

  const countryModal = document.createElement('div');
  countryModal.classList.add('header-itc-header-section-modal', 'header-itc-header-section-fade', 'header-itc-header-section-itc-country-selector');
  countryModal.id = 'countryModal';
  countryModal.tabIndex = -1;
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'none'; // Initially hidden

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-itc-header-section-modal-dialog', 'header-itc-header-section-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-itc-header-section-modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header-itc-header-section-modal-header', 'header-itc-header-section-border-0', 'header-itc-header-section-text-center');
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
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add(
      'header-itc-header-section-country-option',
      'header-itc-header-section-mx-3',
      'header-itc-header-section-d-flex',
      'header-itc-header-section-flex-column',
      'header-itc-header-section-align-items-center',
    );

    const flagImage = row.children[0].querySelector('picture > img');
    const countryFlag = document.createElement('img');
    countryFlag.src = flagImage.src;
    countryFlag.alt = flagImage.alt;
    countryFlag.classList.add('header-itc-header-section-country-flag');
    if (flagImage.alt.toLowerCase().includes('india')) {
      countryOptionDiv.classList.add('header-itc-header-section-selected'); // Default selected
      countryFlag.classList.add('header-itc-header-section-india-flag');
      countryOptionDiv.setAttribute('data-country', 'india');
    } else if (flagImage.alt.toLowerCase().includes('usa')) {
      countryFlag.classList.add('header-itc-header-section-usa-flag');
      countryOptionDiv.setAttribute('data-country', 'usa');
    }

    const countryName = document.createElement('p');
    countryName.classList.add('header-itc-header-section-country-name');
    countryName.textContent = row.children[1].textContent.trim();

    const countryUrl = row.children[2].textContent.trim();
    countryOptionDiv.setAttribute('data-url', countryUrl);

    countryOptionDiv.append(countryFlag, countryName);
    countryOptionsDiv.append(countryOptionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);

  header.append(countryModal);

  block.textContent = '';
  block.append(header);

  // Event Listeners
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-itc-header-section-show');
    navbarToggler.classList.toggle('header-itc-header-section-collapsed');
    navbarToggler.setAttribute(
      'aria-expanded',
      navbarCollapse.classList.contains('header-itc-header-section-show'),
    );
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('header-itc-header-section-show');
    countryModal.style.display = 'block';
  });

  // Event listener for clicking outside the modal to close it
  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.classList.remove('header-itc-header-section-show');
      countryModal.style.display = 'none';
    }
  });

  document.querySelectorAll('.header-itc-header-section-country-option').forEach((option) => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.header-itc-header-section-country-option').forEach((opt) => {
        opt.classList.remove('header-itc-header-section-selected');
      });
      option.classList.add('header-itc-header-section-selected');
      const selectedCountryCode = option
        .getAttribute('data-country')
        .toUpperCase();
      countryCodeSpan.textContent = selectedCountryCode;

      const selectedFlagSrc = option.querySelector('.header-itc-header-section-country-flag').src;
      countryFlagImg.src = selectedFlagSrc;

      // Optionally navigate to the country URL
      // window.location.href = option.getAttribute('data-url');
      countryModal.classList.remove('header-itc-header-section-show');
      countryModal.style.display = 'none';
    });
  });

  const searchIconTrigger = document.getElementById('searchIconTrigger');
  if (searchIconTrigger) {
    searchIconTrigger.addEventListener('click', () => {
      searchBlock.classList.toggle('header-itc-header-section-hidden');
      searchContainer.classList.toggle('header-itc-header-section-hidden');
      searchResults.classList.add('header-itc-header-section-hidden'); // Hide results when opening search
      searchInput.value = ''; // Clear search input
    });
  }

  const searchButtonEl = document.getElementById('searchButton');
  if (searchButtonEl) {
    searchButtonEl.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        // Simulate search results
        suggestionsList.innerHTML = `<li>Suggestion for "${query}"</li>`;
        productsList.innerHTML = `<li>Product for "${query}"</li>`;
        searchResults.classList.remove('header-itc-header-section-hidden');
      } else {
        searchResults.classList.add('header-itc-header-section-hidden');
      }
    });
  }

  const closeButtonEl = document.getElementById('closeButton');
  if (closeButtonEl) {
    closeButtonEl.addEventListener('click', () => {
      searchBlock.classList.add('header-itc-header-section-hidden');
      searchContainer.classList.add('header-itc-header-section-hidden');
      searchResults.classList.add('header-itc-header-section-hidden');
      searchInput.value = '';
    });
  }

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
