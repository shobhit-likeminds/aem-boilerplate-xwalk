import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    searchIconImageRow,
    navigationLinksContainer, // This row is a container, its children are the actual items
    countryOptionsContainer, // This row is a container, its children are the actual items
    ...itemRows
  ] = [...block.children];

  // Create header container
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('container');

  // Create navbar
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

  // Create navbar toggler button
  const toggler = document.createElement('button');
  toggler.classList.add('navbar-toggler', 'collapsed');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  toggler.append(togglerIcon);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image');

  const logoLink = logoLinkRow.querySelector('a');
  const logoPicture = logoImageRow.querySelector('picture');
  if (logoLink && logoPicture) {
    const logoAnchor = document.createElement('a');
    logoAnchor.classList.add('cmp-image__link');
    logoAnchor.href = logoLink.href;
    logoAnchor.target = '_blank';
    moveInstrumentation(logoLinkRow, logoAnchor);

    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const optimizedLogoPic = createOptimizedPicture(
        logoImg.src,
        logoImg.alt,
        false,
        [{ width: '131' }],
      );
      moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
      logoAnchor.append(optimizedLogoPic);
    }
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    logoAnchor.append(screenReaderSpan);
    logoDiv.append(logoAnchor);
  }

  // Navbar collapse div
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('collapse', 'navbar-collapse', 'justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';

  // Navigation links
  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('nav-item', 'navigation');
  const navCmpNavigation = document.createElement('nav');
  navCmpNavigation.classList.add('cmp-navigation');
  navCmpNavigation.setAttribute('role', 'navigation');
  const navUl = document.createElement('ul');
  navUl.classList.add('cmp-navigation__group');

  // Filter itemRows for navigation-link items (2 cells: link, text)
  const navigationLinks = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].textContent);
  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    const linkEl = row.children[0].querySelector('a'); // Link cell
    const textEl = row.children[1]; // Text cell
    if (linkEl && textEl) {
      const anchor = document.createElement('a');
      anchor.classList.add('cmp-navigation__item-link');
      anchor.href = linkEl.href;
      anchor.textContent = textEl.textContent;
      li.append(anchor);
    }
    navUl.append(li);
  });
  navCmpNavigation.append(navUl);
  navItemNavigation.append(navCmpNavigation);

  // Header section for search and country selector
  const headerSection = document.createElement('div');
  headerSection.classList.add('header-section', 'd-flex', 'align-items-center', 'justify-content-end');

  // Search icon and country selector trigger
  const searchCountryTrigger = document.createElement('div');
  searchCountryTrigger.classList.add('search-icon', 'country-selector-trigger', 'd-flex', 'align-items-center');

  // Country code (placeholder, actual value would come from selection)
  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('country-code');
  countryCodeSpan.textContent = 'IN'; // Default

  // Country flag (placeholder, actual value would come from selection)
  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-country-flag');
  countryFlagImg.src = '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp'; // Default
  countryFlagImg.alt = 'flag';

  // Dropdown icon
  const dropdownIcon = document.createElement('img');
  dropdownIcon.classList.add('dropdown-icon');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';

  searchCountryTrigger.append(countryCodeSpan, countryFlagImg, dropdownIcon);

  headerSection.append(searchCountryTrigger);

  navbarCollapse.append(navItemNavigation, headerSection);

  // ITC Header Icon List (Search)
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
  const searchIconImg = searchIconImageRow.querySelector('img');
  if (searchIconImg) {
    const searchBtnImg = document.createElement('img');
    searchBtnImg.loading = 'lazy';
    searchBtnImg.src = searchIconImg.src;
    searchBtnImg.alt = searchIconImg.alt;
    searchButton.append(searchBtnImg);
  }
  searchContainer.append(searchInput, searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774427381203.svg+xml';
  closeButton.alt = 'Close icon';

  searchBox.append(searchContainer, closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('search-results', 'hidden');
  searchResults.innerHTML = `
    <h4 class="resultList">Popular Suggestions</h4>
    <ul id="suggestionsList"></ul>
    <h4 class="resultList">Pages</h4>
    <ul id="productsList" class="products"></ul>
    <button id="viewAllButton">VIEW ALL ITEMS</button>
  `;
  searchBlock.append(searchBox, searchResults);

  const searchNavLink = document.createElement('a');
  searchNavLink.classList.add('nav-link');
  searchNavLink.id = 'searchIconTrigger'; // Custom ID for event listener
  const searchNavLinkImg = document.createElement('img');
  searchNavLinkImg.loading = 'lazy';
  searchNavLinkImg.id = 'searchIcon';
  if (searchIconImageRow.querySelector('img')) {
    searchNavLinkImg.src = searchIconImageRow.querySelector('img').src;
    searchNavLinkImg.alt = searchIconImageRow.querySelector('img').alt;
  }
  const searchNavLinkSpan = document.createElement('span');
  searchNavLinkSpan.classList.add('d-block');
  searchNavLinkSpan.textContent = 'Search';
  searchNavLink.append(searchNavLinkImg, searchNavLinkSpan);

  itcHeaderIconList.append(searchBlock, searchNavLink);

  nav.append(toggler, dXlNoneDiv, logoDiv, navbarCollapse, itcHeaderIconList);
  headerContainer.append(nav);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add('modal', 'fade', 'itc-country-selector');
  countryModal.id = 'countryModal';
  countryModal.setAttribute('tabindex', '-1');
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  // countryModal.style.display = 'block'; // Initially hidden, shown by JS

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header', 'border-0', 'text-center');
  const w100Div = document.createElement('div');
  w100Div.classList.add('w-100');
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  const experienceText = document.createElement('p');
  experienceText.classList.add('experience-text');
  experienceText.textContent = 'Experience';
  w100Div.append(modalTitle, experienceText);
  modalHeader.append(w100Div);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('country-options', 'd-flex', 'justify-content-center', 'align-items-center');

  // Filter itemRows for country-option items (3 cells: flag-image, country-name, country-url)
  const countryOptions = itemRows.filter((row) => row.children.length === 3 && row.children[0].querySelector('picture') && row.children[1].textContent && row.children[2].querySelector('a'));
  countryOptions.forEach((row, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');
    if (index === 0) optionDiv.classList.add('selected'); // Assuming first is default selected

    const flagImageCell = row.children[0];
    const countryNameCell = row.children[1];
    const countryUrlCell = row.children[2];

    if (flagImageCell && countryNameCell && countryUrlCell) {
      const flagImage = flagImageCell.querySelector('picture');
      const countryName = countryNameCell.textContent;
      const countryUrl = countryUrlCell.querySelector('a') ? countryUrlCell.querySelector('a').href : countryUrlCell.textContent;

      if (flagImage) {
        const img = flagImage.querySelector('img');
        if (img) {
          const flagImg = document.createElement('img');
          flagImg.src = img.src;
          flagImg.alt = `${countryName} Flag`;
          flagImg.classList.add('country-flag');
          if (countryName.toLowerCase().includes('india')) {
            flagImg.classList.add('india-flag');
            optionDiv.setAttribute('data-country', 'india');
          } else if (countryName.toLowerCase().includes('usa')) {
            flagImg.classList.add('usa-flag');
            optionDiv.setAttribute('data-country', 'usa');
          }
          optionDiv.append(flagImg);
        }
      }
      const pName = document.createElement('p');
      pName.classList.add('country-name');
      pName.textContent = countryName;
      optionDiv.append(pName);
      optionDiv.setAttribute('data-url', countryUrl);
    }
    countryOptionsDiv.append(optionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);

  block.textContent = '';
  block.append(headerContainer, countryModal);

  // Event Listeners for interactive behavior
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
  });

  // Search icon click to toggle search block
  const searchIconTrigger = block.querySelector('#searchIconTrigger');
  if (searchIconTrigger) {
    searchIconTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      searchBlock.classList.toggle('hidden');
      searchContainer.classList.toggle('hidden');
      searchResults.classList.add('hidden'); // Hide results when opening/closing search bar
      if (!searchBlock.classList.contains('hidden')) {
        searchInput.focus();
      }
    });
  }

  // Search button inside the search input field
  const searchBtn = block.querySelector('#searchButton');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      // Implement search functionality here
      // For now, just show search results (example)
      searchResults.classList.remove('hidden');
    });
  }

  // Close search button
  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('hidden');
    searchContainer.classList.add('hidden');
    searchResults.classList.add('hidden');
    searchInput.value = '';
  });

  // Country selector trigger to open modal
  searchCountryTrigger.addEventListener('click', () => {
    countryModal.classList.add('show');
    countryModal.style.display = 'block';
  });

  // Close modal when clicking outside or on backdrop
  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.classList.remove('show');
      countryModal.style.display = 'none';
    }
  });

  // Country option selection
  countryOptionsDiv.querySelectorAll('.country-option').forEach((option) => {
    option.addEventListener('click', () => {
      countryOptionsDiv.querySelectorAll('.country-option').forEach((opt) => opt.classList.remove('selected'));
      option.classList.add('selected');
      const newUrl = option.getAttribute('data-url');
      if (newUrl) {
        window.location.href = newUrl;
      }
      countryModal.classList.remove('show');
      countryModal.style.display = 'none';
    });
  });

  // View All Button in Search Results
  const viewAllButton = block.querySelector('#viewAllButton');
  if (viewAllButton) {
    viewAllButton.addEventListener('click', () => {
      // Implement view all functionality, e.g., navigate to a search results page
      console.log('View All Items clicked');
    });
  }

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
