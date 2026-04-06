import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  const header = document.createElement('header');
  header.classList.add('itc-header-section');

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const nav = document.createElement('nav');
  nav.classList.add('navbar', 'navbar-expand-xl', 'navbar-light', 'bg-light', 'px-xl-5', 'd-flex', 'justify-content-between', 'align-items-center');
  container.append(nav);

  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('navbar-toggler', 'collapsed');
  navbarToggler.type = 'button';
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  navbarToggler.append(togglerIcon);
  nav.append(navbarToggler);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('d-xl-none');
  dXlNone.innerHTML = '&nbsp;';
  nav.append(dXlNone);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image');
  nav.append(logoDiv);

  const logoLink = document.createElement('a');
  logoLink.classList.add('cmp-image__link');
  const logoHref = logoLinkRow.querySelector('a') ? logoLinkRow.querySelector('a').href : '#';
  logoLink.href = logoHref;
  logoLink.target = '_blank';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '131' }]);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  }
  logoDiv.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('collapse', 'navbar-collapse', 'justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';
  nav.append(navbarCollapse);

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('nav-item', 'navigation');
  navbarCollapse.append(navItemNavigation);

  const cmpNavigation = document.createElement('nav');
  cmpNavigation.classList.add('cmp-navigation');
  cmpNavigation.setAttribute('role', 'navigation');
  navItemNavigation.append(cmpNavigation);

  const cmpNavigationGroup = document.createElement('ul');
  cmpNavigationGroup.classList.add('cmp-navigation__group');
  cmpNavigation.append(cmpNavigationGroup);

  const navigationItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a')); // Navigation items have a link
  });
  navigationItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    moveInstrumentation(row, li);

    const link = document.createElement('a');
    link.classList.add('cmp-navigation__item-link');
    const linkEl = row.querySelector('a');
    if (linkEl) {
      link.href = linkEl.href;
      link.textContent = linkEl.textContent;
    } else {
      // Fallback if no <a> tag, though model implies it should exist
      link.textContent = row.textContent.trim();
    }
    li.append(link);
    cmpNavigationGroup.append(li);
  });

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-section', 'd-flex', 'align-items-center', 'justify-content-end');
  navbarCollapse.append(headerSection);

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('search-icon', 'country-selector-trigger', 'd-flex', 'align-items-center');
  headerSection.append(countrySelectorTrigger);

  const countryCode = document.createElement('span');
  countryCode.classList.add('country-code');
  countryCode.textContent = 'IN'; // Default
  countrySelectorTrigger.append(countryCode);

  const countryFlag = document.createElement('img');
  countryFlag.classList.add('header-country-flag');
  countryFlag.src = '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp'; // Default
  countryFlag.alt = 'flag';
  countrySelectorTrigger.append(countryFlag);

  const dropdownIcon = document.createElement('img');
  dropdownIcon.classList.add('dropdown-icon');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  countrySelectorTrigger.append(dropdownIcon);

  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('itc-header-icon-list');
  nav.append(itcHeaderIconList);

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('search-block', 'hidden');
  itcHeaderIconList.append(searchBlock);

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('search-box');
  searchBlock.append(searchBox);

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('search-container', 'hidden');
  searchBox.append(searchContainer);

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

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1775484439305.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('search-results', 'hidden');
  searchBlock.append(searchResults);

  const popularSuggestionsTitle = document.createElement('h4');
  popularSuggestionsTitle.classList.add('resultList');
  popularSuggestionsTitle.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestionsTitle);

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

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('nav-link');
  itcHeaderIconList.append(searchIconLink);

  const searchIconImg = document.createElement('img');
  searchIconImg.loading = 'lazy';
  searchIconImg.id = 'searchIcon';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchIconImg.alt = 'Search icon';
  searchIconLink.append(searchIconImg);

  const searchIconSpan = document.createElement('span');
  searchIconSpan.classList.add('d-block');
  searchIconSpan.textContent = 'Search';
  searchIconLink.append(searchIconSpan);

  // Country Modal
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'itc-country-selector');
  modal.id = 'countryModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'countryModalLabel');
  modal.setAttribute('aria-modal', 'true');
  header.append(modal);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  modal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header', 'border-0', 'text-center');
  modalContent.append(modalHeader);

  const modalHeaderWrapper = document.createElement('div');
  modalHeaderWrapper.classList.add('w-100');
  modalHeader.append(modalHeaderWrapper);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  modalHeaderWrapper.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('experience-text');
  experienceText.textContent = 'Experience';
  modalHeaderWrapper.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('country-options', 'd-flex', 'justify-content-center', 'align-items-center');
  modalBody.append(countryOptionsDiv);

  const countryOptions = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('picture')) && cells.some(cell => cell.querySelector('a')); // Country options have picture, name, and URL
  });
  countryOptions.forEach((row) => {
    const countryOption = document.createElement('div');
    countryOption.classList.add('country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');
    moveInstrumentation(row, countryOption);

    const flagImageCell = row.querySelector('picture');
    const countryNameCell = [...row.children].find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
    const countryUrlCell = row.querySelector('a');

    if (flagImageCell) {
      const flagImg = flagImageCell.querySelector('img');
      const optimizedFlagPic = createOptimizedPicture(flagImg.src, flagImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(flagImg, optimizedFlagPic.querySelector('img'));
      countryOption.append(optimizedFlagPic);
      optimizedFlagPic.classList.add('country-flag');
      if (flagImg.alt.toLowerCase().includes('india')) {
        optimizedFlagPic.classList.add('india-flag');
        countryOption.classList.add('selected');
      } else if (flagImg.alt.toLowerCase().includes('usa')) {
        optimizedFlagPic.classList.add('usa-flag');
      }
    }

    if (countryNameCell) {
      const countryName = document.createElement('p');
      countryName.classList.add('country-name');
      countryName.textContent = countryNameCell.textContent.trim();
      countryOption.append(countryName);
      countryOption.setAttribute('data-country', countryName.textContent.toLowerCase());
    }

    if (countryUrlCell) {
      countryOption.setAttribute('data-url', countryUrlCell.href);
    }
    countryOptionsDiv.append(countryOption);

    countryOption.addEventListener('click', () => {
      const selectedCountryUrl = countryOption.getAttribute('data-url');
      if (selectedCountryUrl) {
        window.location.href = selectedCountryUrl;
      }
    });
  });

  // Event Listeners for interactive behavior
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed');
  });

  countrySelectorTrigger.addEventListener('click', () => {
    modal.classList.add('show');
    modal.style.display = 'block';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  });

  searchIconLink.addEventListener('click', (e) => {
    e.preventDefault();
    searchBlock.classList.toggle('hidden');
    searchContainer.classList.toggle('hidden');
    searchResults.classList.add('hidden'); // Hide results when toggling search box
    if (!searchBlock.classList.contains('hidden')) {
      searchInput.focus();
    }
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('hidden');
    searchContainer.classList.add('hidden');
    searchResults.classList.add('hidden');
    searchInput.value = ''; // Clear search input
  });

  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      searchResults.classList.remove('hidden');
      // In a real scenario, this would trigger a search API call
      // For now, just show/hide the results section
    } else {
      searchResults.classList.add('hidden');
    }
  });

  searchButton.addEventListener('click', () => {
    // Implement actual search logic here
    console.log('Searching for:', searchInput.value);
    // For now, just ensure results are visible if input has value
    if (searchInput.value.length > 0) {
      searchResults.classList.remove('hidden');
    }
  });

  block.textContent = '';
  block.append(header);
}
