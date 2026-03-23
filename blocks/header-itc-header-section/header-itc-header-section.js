import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson
  const [
    logoImageRow,
    logoLinkRow,
    navigationItemsContainerRow, // This is the container row for navigation items
    countryFlagImageRow,
    countryOptionsContainerRow, // This is the container row for country options
    searchIconImageRow,
    ...itemRows // Remaining rows are actual item sub-components
  ] = [...block.children];

  // Filter item rows based on their content structure
  // header-navigation-item has 2 cells (label, url)
  const navigationItems = itemRows.filter((row) => row.children.length === 2);
  // header-country-option has 3 cells (flag-image, country-name, country-url)
  // Also check for a picture element in the first cell to be more robust
  const countryOptions = itemRows.filter((row) => row.children.length === 3 && row.children[0].querySelector('picture'));

  const container = document.createElement('div');
  container.classList.add('container');

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

  const toggler = document.createElement('button');
  toggler.classList.add('header-navbar-toggler', 'header-collapsed');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('header-navbar-toggler-icon');
  toggler.append(togglerIcon);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('header-d-xl-none');
  dXlNone.innerHTML = '&nbsp;';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  const logoLinkWrapper = document.createElement('a');
  // The logoLinkRow contains a div, which contains the text content for the link
  const logoLink = logoLinkRow.querySelector('div').textContent.trim();
  if (logoLink) {
    logoLinkWrapper.href = logoLink;
  }
  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    moveInstrumentation(logoImageRow.firstElementChild, logoLinkWrapper);
    logoLinkWrapper.append(logoPicture);
  }
  logoDiv.append(logoLinkWrapper);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-collapse',
    'header-navbar-collapse',
    'header-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');
  const cmpNavigation = document.createElement('nav');
  cmpNavigation.classList.add('cmp-navigation');
  cmpNavigation.setAttribute('role', 'navigation');
  const ul = document.createElement('ul');
  ul.classList.add('cmp-navigation__group');

  navigationItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    const link = document.createElement('a');
    link.classList.add('cmp-navigation__item-link');
    const labelCell = row.children[0];
    const urlCell = row.children[1];
    if (urlCell.textContent.trim()) { // Trim whitespace
      link.href = urlCell.textContent.trim();
    }
    while (labelCell.firstChild) link.append(labelCell.firstChild);
    li.append(link);
    ul.append(li);
  });
  cmpNavigation.append(ul);
  navItemNavigation.append(cmpNavigation);
  navbarCollapse.append(navItemNavigation);

  const headerSection = document.createElement('div');
  headerSection.classList.add(
    'header-header-section',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-end',
  );

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add(
    'header-search-icon',
    'header-country-selector-trigger',
    'header-d-flex',
    'header-align-items-center',
  );

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = 'IN'; // Default to IN as per original HTML

  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-header-country-flag');
  const countryFlagPicture = countryFlagImageRow.querySelector('picture');
  if (countryFlagPicture) {
    const img = countryFlagPicture.querySelector('img');
    if (img) {
      countryFlagImg.src = img.src;
      countryFlagImg.alt = img.alt;
      moveInstrumentation(countryFlagImageRow.firstElementChild, countryFlagImg);
    }
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-dropdown-icon');

  countrySelectorTrigger.append(countryCodeSpan, countryFlagImg, dropdownIcon);
  headerSection.append(countrySelectorTrigger);
  navbarCollapse.append(headerSection);

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
  const searchIconPicture = searchIconImageRow.querySelector('picture');
  if (searchIconPicture) {
    const img = searchIconPicture.querySelector('img');
    if (img) {
      searchButtonImg.src = img.src;
      searchButtonImg.alt = img.alt;
      searchButtonImg.loading = 'lazy';
      moveInstrumentation(searchIconImageRow.firstElementChild, searchButtonImg);
    }
  }
  searchButton.append(searchButtonImg);
  searchContainer.append(searchInput, searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774297501717.svg+xml';
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
  searchIconLink.id = 'searchIconLink';
  const searchIcon = document.createElement('img');
  searchIcon.loading = 'lazy';
  searchIcon.id = 'searchIcon';
  if (searchIconPicture) {
    const img = searchIconPicture.querySelector('img');
    if (img) {
      searchIcon.src = img.src;
      searchIcon.alt = img.alt;
    }
  }
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchIcon, searchSpan);

  itcHeaderIconList.append(searchBlock, searchIconLink);

  nav.append(toggler, dXlNone, logoDiv, navbarCollapse, itcHeaderIconList);
  container.append(nav);

  const countryModal = document.createElement('div');
  countryModal.classList.add(
    'header-modal',
    'header-fade',
    'header-itc-country-selector',
  );
  countryModal.id = 'countryModal';
  countryModal.tabIndex = -1;
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');

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
  const headerW100 = document.createElement('div');
  headerW100.classList.add('header-w-100');
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text');
  experienceText.textContent = 'Experience';
  headerW100.append(modalTitle, experienceText);
  modalHeader.append(headerW100);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    'header-country-options',
    'header-d-flex',
    'header-justify-content-center',
    'header-align-items-center',
  );

  countryOptions.forEach((row) => {
    const optionDiv = document.createElement('div');
    moveInstrumentation(row, optionDiv);
    optionDiv.classList.add(
      'header-country-option',
      'header-mx-3',
      'header-d-flex',
      'header-flex-column',
      'header-align-items-center',
    );

    const flagImageCell = row.children[0];
    const countryNameCell = row.children[1];
    const countryUrlCell = row.children[2];

    const flagImg = document.createElement('img');
    flagImg.classList.add('header-country-flag');
    const flagPicture = flagImageCell.querySelector('picture');
    if (flagPicture) {
      const img = flagPicture.querySelector('img');
      if (img) {
        flagImg.src = img.src;
        flagImg.alt = img.alt;
        moveInstrumentation(flagImageCell, flagImg);
      }
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-country-name');
    countryNameP.textContent = countryNameCell.textContent.trim();

    const countryLink = document.createElement('a');
    countryLink.href = countryUrlCell.textContent.trim();
    countryLink.append(flagImg, countryNameP);
    optionDiv.append(countryLink);
    countryOptionsDiv.append(optionDiv);

    // Add event listener for country option links
    countryLink.addEventListener('click', (e) => {
      // Prevent default navigation if you want to handle it via JS,
      // otherwise, let the browser navigate.
      // e.preventDefault();
      // console.log(`Navigating to: ${countryLink.href}`);
      // You might want to close the modal here
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
      countryModal.setAttribute('aria-hidden', 'true');
      // window.location.href = countryLink.href; // Or let the default link behavior handle it
    });
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);

  block.textContent = '';
  block.append(container, countryModal);

  // Event Listeners for interactivity
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-show');
    toggler.classList.toggle('header-collapsed');
    toggler.setAttribute(
      'aria-expanded',
      navbarCollapse.classList.contains('header-show'),
    );
  });

  searchIconLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-hidden');
    searchContainer.classList.toggle('header-hidden');
    searchResults.classList.add('header-hidden'); // Hide results when opening search
    searchInput.value = ''; // Clear search input
    searchInput.focus();
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
    searchContainer.classList.add('header-hidden');
    searchResults.classList.add('header-hidden');
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('header-show');
    countryModal.style.display = 'block';
    countryModal.setAttribute('aria-hidden', 'false');
  });

  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) { // Only close if clicked on the modal backdrop
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
      countryModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(
      img.src,
      img.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
