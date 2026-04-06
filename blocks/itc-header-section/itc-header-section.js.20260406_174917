import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    headerCountryFlagRow,
    ...itemRows
  ] = [...block.children];

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

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';
  nav.append(dXlNoneDiv);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image');
  nav.append(logoDiv);

  const logoLink = logoLinkRow.querySelector('a');
  const logoImagePicture = logoImageRow.querySelector('picture');

  if (logoLink && logoImagePicture) {
    const logoAnchor = document.createElement('a');
    moveInstrumentation(logoLinkRow, logoAnchor);
    logoAnchor.classList.add('cmp-image__link');
    logoAnchor.href = logoLink.href;

    const logoImg = logoImagePicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '131' }]);
    moveInstrumentation(logoImagePicture, optimizedLogoPic.querySelector('img'));
    logoAnchor.append(optimizedLogoPic);
    logoDiv.append(logoAnchor);
  }

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

  const navGroup = document.createElement('ul');
  navGroup.classList.add('cmp-navigation__group');
  cmpNavigation.append(navGroup);

  // Navigation Items
  const navigationItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a'));
  });

  navigationItems.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const textCell = cells.find(cell => !cell.querySelector('a'));

    if (linkCell && textCell) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');

      const linkEl = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.textContent = textCell.textContent;
      } else {
        linkEl.textContent = linkCell.textContent; // Fallback if link not found in cell 0
      }
      linkEl.classList.add('cmp-navigation__item-link');
      li.append(linkEl);
      navGroup.append(li);
    }
  });

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-section', 'd-flex', 'align-items-center', 'justify-content-end');
  navbarCollapse.append(headerSection);

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('search-icon', 'country-selector-trigger', 'd-flex', 'align-items-center');
  headerSection.append(countrySelectorTrigger);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('country-code');
  countryCodeSpan.textContent = 'IN'; // Default, will be updated by modal logic
  countrySelectorTrigger.append(countryCodeSpan);

  const headerCountryFlagImg = headerCountryFlagRow.querySelector('img');
  const flagImg = document.createElement('img'); // Declare flagImg here for broader scope
  if (headerCountryFlagImg) {
    moveInstrumentation(headerCountryFlagRow, flagImg);
    flagImg.classList.add('header-country-flag');
    flagImg.src = headerCountryFlagImg.src;
    flagImg.alt = headerCountryFlagImg.alt;
    countrySelectorTrigger.append(flagImg);
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.classList.add('dropdown-icon');
  dropdownIcon.src = '/icons/dropdown-icon.png'; // Placeholder, actual path needs to be resolved
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
  searchButtonImg.src = '/icons/search-icon.png'; // Placeholder
  searchButtonImg.alt = 'Search icon';
  searchButton.append(searchButtonImg);
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/icons/close-icon.svg'; // Placeholder
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('search-results', 'hidden');
  searchBlock.append(searchResults);

  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestions);

  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pagesListTitle = document.createElement('h4');
  pagesListTitle.classList.add('resultList');
  pagesListTitle.textContent = 'Pages';
  searchResults.append(pagesListTitle);

  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('products');
  searchResults.append(productsList);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);

  const searchLink = document.createElement('a');
  searchLink.classList.add('nav-link');
  searchLink.id = 'searchIconTrigger'; // Custom ID for event listener
  const searchLinkImg = document.createElement('img');
  searchLinkImg.loading = 'lazy';
  searchLinkImg.id = 'searchIcon';
  searchLinkImg.src = '/icons/search-icon.png'; // Placeholder
  searchLinkImg.alt = 'Search icon';
  searchLink.append(searchLinkImg);
  const searchLinkSpan = document.createElement('span');
  searchLinkSpan.classList.add('d-block');
  searchLinkSpan.textContent = 'Search';
  searchLink.append(searchLinkSpan);
  itcHeaderIconList.append(searchLink);

  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'itc-country-selector');
  modal.id = 'countryModal';
  modal.tabIndex = '-1';
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

  const modalHeaderInner = document.createElement('div');
  modalHeaderInner.classList.add('w-100');
  modalHeader.append(modalHeaderInner);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  modalHeaderInner.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('experience-text');
  experienceText.textContent = 'Experience';
  modalHeaderInner.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('country-options', 'd-flex', 'justify-content-center', 'align-items-center');
  modalBody.append(countryOptionsDiv);

  // Country Options
  const countryOptions = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('picture'));
  });

  countryOptions.forEach((row) => {
    const cells = [...row.children];
    const flagCell = cells.find(cell => cell.querySelector('picture'));
    const nameCell = cells.find(cell => !cell.querySelector('picture'));

    if (flagCell && nameCell) {
      const optionDiv = document.createElement('div');
      moveInstrumentation(row, optionDiv);
      optionDiv.classList.add('country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');
      optionDiv.setAttribute('data-country', nameCell.textContent.toLowerCase());
      optionDiv.setAttribute('data-url', `/${nameCell.textContent.toLowerCase()}`);

      const countryFlagImg = document.createElement('img');
      const originalFlagImg = flagCell.querySelector('img');
      if (originalFlagImg) {
        countryFlagImg.src = originalFlagImg.src;
        countryFlagImg.alt = `${nameCell.textContent} Flag`;
      }
      countryFlagImg.classList.add('country-flag', `${nameCell.textContent.toLowerCase()}-flag`);
      optionDiv.append(countryFlagImg);

      const countryName = document.createElement('p');
      countryName.classList.add('country-name');
      countryName.textContent = nameCell.textContent;
      optionDiv.append(countryName);

      countryOptionsDiv.append(optionDiv);
    }
  });

  // Event Listeners
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed');
    navbarToggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
  });

  countrySelectorTrigger.addEventListener('click', () => {
    modal.classList.add('show');
    modal.style.display = 'block';
  });

  // Close modal when clicking outside content or on specific elements
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('.modal-header') || e.target.closest('.modal-footer') || e.target.closest('.modal-close-button')) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  });

  document.querySelectorAll('.country-option').forEach((option) => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.country-option').forEach((opt) => opt.classList.remove('selected'));
      option.classList.add('selected');
      countryCodeSpan.textContent = option.dataset.country.toUpperCase().substring(0, 2); // Update country code
      const selectedFlagImg = option.querySelector('.country-flag');
      if (selectedFlagImg && flagImg) { // Ensure flagImg is defined
        flagImg.src = selectedFlagImg.src; // Update header flag
      }
      modal.classList.remove('show');
      modal.style.display = 'none';
      // Optionally navigate: window.location.href = option.dataset.url;
    });
  });

  searchLink.addEventListener('click', () => {
    searchBlock.classList.toggle('hidden');
    searchContainer.classList.toggle('hidden');
    searchResults.classList.add('hidden'); // Hide results when opening/closing search
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('hidden');
    searchContainer.classList.add('hidden');
    searchResults.classList.add('hidden');
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
