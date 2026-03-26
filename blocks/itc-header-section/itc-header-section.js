import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    navigationItemsContainerRow, // Renamed to avoid conflict with generated element
    countryFlagInRow,
    countryFlagUsaRow,
    countryOptionsContainerRow, // Renamed to avoid conflict with generated element
    ...itemRows
  ] = [...block.children];

  // BlockJson has 6 root fields. The JS correctly destructures 6 rows + itemRows.
  // The filter conditions for item sub-components are correct based on cell count.
  const navigationItems = itemRows.filter((row) => row.children.length === 2);
  const countryOptions = itemRows.filter((row) => row.children.length === 4);

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
  // Original HTML uses data-toggle and data-target, but EDS uses classList.toggle
  // and direct ID references for aria attributes.
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  navbarToggler.append(togglerIcon);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('d-xl-none');
  dXlNone.innerHTML = '&nbsp;';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image');

  const logoLink = document.createElement('a');
  moveInstrumentation(logoLinkRow, logoLink);
  // The original HTML has `checkLogoLink` on an `a` tag inside a `div` that also contains an image.
  // The `logoLinkRow` in EDS structure is just the `a` tag.
  // We need to extract the href from the `a` tag in `logoLinkRow`.
  const logoLinkFound = logoLinkRow.querySelector('a');
  if (logoLinkFound) {
    logoLink.href = logoLinkFound.href;
    // Copy any text content or children from the original link if needed, but typically a logo link is just an image.
  }
  logoLink.classList.add('checkLogoLink'); // Added class from original HTML

  const logoImg = document.createElement('img');
  moveInstrumentation(logoImageRow, logoImg);
  logoImg.classList.add('cmp-image__image', 'itc-logo-image');
  // The logoImageRow contains a picture element with an img inside.
  const logoImgFound = logoImageRow.querySelector('img');
  if (logoImgFound) {
    logoImg.src = logoImgFound.src;
    logoImg.alt = logoImgFound.alt;
    logoImg.loading = 'lazy';
  }
  logoLink.append(logoImg);
  logoDiv.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('collapse', 'navbar-collapse', 'justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('nav-item', 'navigation');

  const cmpNavigation = document.createElement('nav');
  cmpNavigation.classList.add('cmp-navigation');
  cmpNavigation.setAttribute('role', 'navigation');

  const ul = document.createElement('ul');
  ul.classList.add('cmp-navigation__group');

  navigationItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');

    const linkEl = document.createElement('a');
    linkEl.classList.add('cmp-navigation__item-link');
    const labelCell = row.children[0];
    const linkCell = row.children[1];

    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
    }
    // Append content from labelCell to linkEl
    while (labelCell.firstChild) {
      linkEl.append(labelCell.firstChild);
    }
    li.append(linkEl);
    ul.append(li);
  });

  cmpNavigation.append(ul);
  navItemNavigation.append(cmpNavigation);
  navbarCollapse.append(navItemNavigation);

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-section', 'd-flex', 'align-items-center', 'justify-content-end');

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('search-icon', 'country-selector-trigger', 'd-flex', 'align-items-center');

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('country-code');
  countryCodeSpan.textContent = 'IN'; // Default, will be updated by selection

  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-country-flag');
  moveInstrumentation(countryFlagInRow, countryFlagImg);
  const countryFlagInFound = countryFlagInRow.querySelector('img');
  if (countryFlagInFound) {
    countryFlagImg.src = countryFlagInFound.src;
    countryFlagImg.alt = countryFlagInFound.alt;
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.classList.add('dropdown-icon');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png'; // Placeholder, replace if dynamic
  dropdownIcon.alt = 'dropdown-icon';

  countrySelectorTrigger.append(countryCodeSpan, countryFlagImg, dropdownIcon);
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
  searchContainer.classList.add('search-container', 'hidden'); // Initially hidden

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
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774521237986.svg+xml';
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

  itcHeaderIconList.append(searchBlock, searchNavLink);

  nav.append(
    navbarToggler,
    dXlNone,
    logoDiv,
    navbarCollapse,
    itcHeaderIconList,
  );

  container.append(nav);
  header.append(container);

  // Country Modal
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'itc-country-selector');
  modal.id = 'countryModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'countryModalLabel');
  modal.setAttribute('aria-modal', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header', 'border-0', 'text-center');

  const headerW100 = document.createElement('div');
  headerW100.classList.add('w-100');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';

  const experienceText = document.createElement('p');
  experienceText.classList.add('experience-text');
  experienceText.textContent = 'Experience';

  headerW100.append(modalTitle, experienceText);
  modalHeader.append(headerW100);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('country-options', 'd-flex', 'justify-content-center', 'align-items-center');

  countryOptions.forEach((row) => {
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add('country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');

    const flagCell = row.children[0];
    const nameCell = row.children[1];
    const codeCell = row.children[2];
    const urlCell = row.children[3];

    const flagImg = document.createElement('img');
    moveInstrumentation(flagCell, flagImg);
    flagImg.classList.add('country-flag');
    const flagImgFound = flagCell.querySelector('img');
    if (flagImgFound) {
      flagImg.src = flagImgFound.src;
      flagImg.alt = flagImgFound.alt;
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('country-name');
    while (nameCell.firstChild) {
      countryNameP.append(nameCell.firstChild);
    }

    const countryUrl = urlCell.querySelector('a');
    if (countryUrl) {
      countryOptionDiv.setAttribute('data-url', countryUrl.href);
    }
    const countryCode = codeCell.textContent.trim().toLowerCase();
    countryOptionDiv.setAttribute('data-country', countryCode);
    flagImg.classList.add(`${countryCode}-flag`);

    countryOptionDiv.append(flagImg, countryNameP);
    countryOptionsDiv.append(countryOptionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  modal.append(modalDialog);

  block.textContent = '';
  block.append(header, modal);

  // Event Listeners
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed');
    // Ensure search block is hidden when nav is toggled
    searchBlock.classList.add('hidden');
    searchContainer.classList.add('hidden'); // Hide search input when nav toggles
  });

  const searchIcon = block.querySelector('#searchIcon');
  const searchBlockEl = block.querySelector('#searchBlock');
  const closeButtonEl = block.querySelector('#closeButton');
  const searchContainerEl = block.querySelector('#searchContainer'); // Get the search container element

  searchIcon.addEventListener('click', () => {
    searchBlockEl.classList.toggle('hidden');
    // Toggle the search input container visibility as well
    searchContainerEl.classList.toggle('hidden');
    // Hide navbar collapse if open
    navbarCollapse.classList.remove('show');
    navbarToggler.classList.add('collapsed');
  });

  closeButtonEl.addEventListener('click', () => {
    searchBlockEl.classList.add('hidden');
    searchContainerEl.classList.add('hidden'); // Hide search input when close button is clicked
  });

  countrySelectorTrigger.addEventListener('click', () => {
    modal.classList.add('show');
    modal.style.display = 'block';
    // Hide navbar collapse and search block if open
    navbarCollapse.classList.remove('show');
    navbarToggler.classList.add('collapsed');
    searchBlock.classList.add('hidden');
    searchContainer.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  });

  // Handle country selection within the modal
  countryOptionsDiv.querySelectorAll('.country-option').forEach((option) => {
    option.addEventListener('click', () => {
      countryOptionsDiv.querySelectorAll('.country-option').forEach((opt) => opt.classList.remove('selected'));
      option.classList.add('selected');
      const selectedCountryCode = option.getAttribute('data-country');
      const selectedCountryUrl = option.getAttribute('data-url');

      // Update header country flag and code
      countryCodeSpan.textContent = selectedCountryCode.toUpperCase();
      const newFlagSrc = option.querySelector('.country-flag').src;
      countryFlagImg.src = newFlagSrc;

      // Optionally navigate to the new URL
      if (selectedCountryUrl) {
        // window.location.href = selectedCountryUrl;
      }

      modal.classList.remove('show');
      modal.style.display = 'none';
    });
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
