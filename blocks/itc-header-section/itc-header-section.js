import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Destructure the known fixed rows
  const [
    logoImageRow,
    logoLinkRow,
    logoLinkLabelRow,
    secondaryLogoImageRow,
    secondaryLogoLinkRow,
    secondaryLogoLinkLabelRow,
    ...itemRows
  ] = children;

  // Filter item rows based on their structure (number of cells)
  const navigationLinks = itemRows.filter((row) => row.children.length === 2);
  const countryOptions = itemRows.filter((row) => row.children.length === 4);

  const header = document.createElement('header');
  header.classList.add('itc-header-section');
  moveInstrumentation(block, header);

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const nav = document.createElement('nav');
  nav.classList.add('navbar', 'navbar-expand-xl', 'navbar-light', 'bg-light', 'px-xl-5', 'd-flex', 'justify-content-between', 'align-items-center');
  container.append(nav);

  const toggler = document.createElement('button');
  toggler.classList.add('navbar-toggler', 'collapsed');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  toggler.append(togglerIcon);
  nav.append(toggler);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('d-xl-none');
  dXlNone.innerHTML = '&nbsp;';
  nav.append(dXlNone);

  // Logo Section
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image');

  const logoLink = document.createElement('a');
  logoLink.classList.add('cmp-image__link');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
    logoLink.target = '_blank';
  }
  const logoImage = logoImageRow.querySelector('picture');
  if (logoImage) {
    moveInstrumentation(logoImageRow.firstElementChild, logoImage);
    logoLink.append(logoImage);
  }
  const logoLinkSrOnly = document.createElement('span');
  logoLinkSrOnly.classList.add('cmp-link__screen-reader-only');
  logoLinkSrOnly.textContent = 'opens in a new tab';
  logoLink.append(logoLinkSrOnly);

  logoDiv.append(logoLink);
  nav.append(logoDiv);

  // Navbar Collapse
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('collapse', 'navbar-collapse', 'justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';
  nav.append(navbarCollapse);

  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
  });

  // Navigation Links
  if (navigationLinks.length > 0) {
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

    navigationLinks.forEach((row) => {
      const cells = [...row.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const labelCell = cells.find(cell => !cell.querySelector('a'));

      const li = document.createElement('li');
      li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
      moveInstrumentation(row, li);

      const link = document.createElement('a');
      link.classList.add('cmp-navigation__item-link');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      link.textContent = labelCell ? labelCell.textContent.trim() : '';
      li.append(link);
      cmpNavigationGroup.append(li);
    });
  }

  // Header Section (Search and Country Selector)
  const headerSection = document.createElement('div');
  headerSection.classList.add('header-section', 'd-flex', 'align-items-center', 'justify-content-end');
  navbarCollapse.append(headerSection);

  const searchCountryTrigger = document.createElement('div');
  searchCountryTrigger.classList.add('search-icon', 'country-selector-trigger', 'd-flex', 'align-items-center');
  headerSection.append(searchCountryTrigger);

  const countryCode = document.createElement('span');
  countryCode.classList.add('country-code');
  countryCode.textContent = 'IN'; // Default, will be updated by modal selection
  searchCountryTrigger.append(countryCode);

  const headerCountryFlag = document.createElement('img');
  headerCountryFlag.classList.add('header-country-flag');
  // Find the first country option to get a default flag
  const defaultFlagImageCell = countryOptions[0]?.children.find(cell => cell.querySelector('picture > img'));
  const defaultFlagImage = defaultFlagImageCell?.querySelector('picture > img');
  if (defaultFlagImage) {
    headerCountryFlag.src = defaultFlagImage.src;
    headerCountryFlag.alt = defaultFlagImage.alt;
  }
  searchCountryTrigger.append(headerCountryFlag);

  const dropdownIcon = document.createElement('img');
  dropdownIcon.classList.add('dropdown-icon');
  // Assuming dropdown icon is not in model, or from a fixed asset if needed.
  // For now, no image src from model, so it won't be added.
  // If the original HTML has a specific image for this, it would be hardcoded here.
  // Given the rule "NEVER hardcode DAM paths", we cannot add it unless it comes from the model.
  // For now, we omit the src as it's not in the model.
  // dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  searchCountryTrigger.append(dropdownIcon);

  // ITC Header Icon List (Search)
  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('itc-header-icon-list');
  nav.append(itcHeaderIconList);

  const searchBlock = document.createElement('div');
  searchBlock.classList.add('search-block', 'hidden');
  searchBlock.id = 'searchBlock';
  itcHeaderIconList.append(searchBlock);

  const searchBox = document.createElement('div');
  searchBox.classList.add('search-box');
  searchBox.id = 'searchBox';
  searchBlock.append(searchBox);

  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-container', 'hidden');
  searchContainer.id = 'searchContainer';
  searchBox.append(searchContainer);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = 'Search';
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchButtonImg = document.createElement('img');
  // Search icon is not in the model, so we cannot set its src from the model.
  // Omitting src as per Rule 16.
  // searchButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchButtonImg.alt = 'Search icon';
  searchButton.append(searchButtonImg);
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  // Close icon is not in the model, so we cannot set its src from the model.
  // Omitting src as per Rule 16.
  // closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1776062540800.svg+xml';
  closeButton.alt = 'Close icon';
  closeButton.loading = 'lazy';
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.classList.add('search-results', 'hidden');
  searchResults.id = 'searchResults';
  searchBlock.append(searchResults);

  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestions);
  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pages = document.createElement('h4');
  pages.classList.add('resultList');
  pages.textContent = 'Pages';
  searchResults.append(pages);
  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('products'); // Add 'products' class from original HTML
  searchResults.append(productsList);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('nav-link');
  const searchIconImg = document.createElement('img');
  searchIconImg.id = 'searchIcon';
  // Search icon is not in the model, so we cannot set its src from the model.
  // Omitting src as per Rule 16.
  // searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchIconImg.alt = 'Search icon';
  searchIconImg.loading = 'lazy';
  searchIconLink.append(searchIconImg);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchSpan);
  itcHeaderIconList.append(searchIconLink);

  // Event Listeners for Search functionality
  searchIconLink.addEventListener('click', () => {
    searchBlock.classList.toggle('hidden');
    searchContainer.classList.toggle('hidden');
    searchResults.classList.add('hidden'); // Ensure search results are hidden when opening search
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('hidden');
    searchContainer.classList.add('hidden');
    searchResults.classList.add('hidden');
  });

  // Example for search input (add actual search logic here)
  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      searchResults.classList.remove('hidden');
      // Populate suggestionsList and productsList based on searchInput.value
      // This is where actual search API calls or filtering would happen
      suggestionsList.innerHTML = `<li>Suggestion for "${searchInput.value}"</li>`;
      productsList.innerHTML = `<li>Product for "${searchInput.value}"</li>`;
    } else {
      searchResults.classList.add('hidden');
    }
  });

  viewAllButton.addEventListener('click', () => {
    // Implement logic to navigate to a full search results page or expand results
    console.log('View all items clicked');
  });


  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add('modal', 'fade', 'itc-country-selector');
  countryModal.id = 'countryModal';
  countryModal.setAttribute('tabindex', '-1');
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'none'; // Initially hidden
  header.append(countryModal);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  countryModal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header', 'border-0', 'text-center');
  modalContent.append(modalHeader);

  const w100 = document.createElement('div');
  w100.classList.add('w-100');
  modalHeader.append(w100);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  w100.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('experience-text');
  experienceText.textContent = 'Experience';
  w100.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('country-options', 'd-flex', 'justify-content-center', 'align-items-center');
  modalBody.append(countryOptionsDiv);

  countryOptions.forEach((row, index) => {
    const cells = [...row.children];
    const flagImageCell = cells.find(cell => cell.querySelector('picture'));
    const countryNameCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
    const countryUrlCell = cells.find(cell => cell.querySelector('a'));
    // countryUrlLabelCell is not used in the current rendering logic

    const countryOption = document.createElement('div');
    countryOption.classList.add('country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');
    moveInstrumentation(row, countryOption);

    const countryName = countryNameCell ? countryNameCell.textContent.trim() : '';
    countryOption.setAttribute('data-country', countryName.toLowerCase());
    const foundCountryUrl = countryUrlCell?.querySelector('a');
    if (foundCountryUrl) {
      countryOption.setAttribute('data-url', foundCountryUrl.href);
    }

    const flagImage = flagImageCell?.querySelector('picture');
    if (flagImage) {
      const img = flagImage.querySelector('img');
      const countryFlag = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(flagImage, countryFlag.querySelector('img'));
      countryFlag.classList.add('country-flag');
      countryFlag.querySelector('img').classList.add(`${countryName.toLowerCase()}-flag`);
      countryOption.append(countryFlag);
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('country-name');
    countryNameP.textContent = countryName;
    countryOption.append(countryNameP);

    countryOptionsDiv.append(countryOption);

    if (index === 0) { // Set first option as selected by default
      countryOption.classList.add('selected');
    }

    countryOption.addEventListener('click', () => {
      countryOptionsDiv.querySelectorAll('.country-option').forEach(opt => opt.classList.remove('selected'));
      countryOption.classList.add('selected');
      // Update header country code and flag
      countryCode.textContent = countryName.substring(0, 2).toUpperCase();
      const selectedFlagImg = countryOption.querySelector('.country-flag img');
      if (selectedFlagImg) {
        headerCountryFlag.src = selectedFlagImg.src;
        headerCountryFlag.alt = selectedFlagImg.alt;
      }
      countryModal.style.display = 'none'; // Close modal
      countryModal.classList.remove('show');
    });
  });

  // Modal toggle event listener
  searchCountryTrigger.addEventListener('click', () => {
    countryModal.style.display = 'block';
    countryModal.classList.add('show');
  });

  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) { // Clicked outside modal content
      countryModal.style.display = 'none';
      countryModal.classList.remove('show');
    }
  });

  // Image optimization
  header.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(header);
}
