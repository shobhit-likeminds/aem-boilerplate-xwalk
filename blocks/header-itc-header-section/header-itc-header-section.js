import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'header-itc-header-section';

  // Destructure root model fields based on BlockJson
  const [
    logoImageRow,
    logoLinkRow,
    navigationLinksContainerRow, // This row is a container, its content is not directly used for rendering itself
    searchIconRow,
    countryOptionsContainerRow, // This row is a container, its content is not directly used for rendering itself
    ...itemRows // Remaining rows are item sub-components
  ] = [...block.children];

  // Create header container
  const headerContainer = document.createElement('div');
  headerContainer.classList.add(`${blockName}-container`);

  // Create navbar
  const nav = document.createElement('nav');
  nav.classList.add(
    `${blockName}-navbar`,
    `${blockName}-navbar-expand-xl`,
    `${blockName}-navbar-light`,
    `${blockName}-bg-light`,
    `${blockName}-px-xl-5`,
    `${blockName}-d-flex`,
    `${blockName}-justify-content-between`,
    `${blockName}-align-items-center`,
  );

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add(`${blockName}-logo`, `${blockName}-image`);
  const logoLink = document.createElement('a');
  const logoLinkContent = logoLinkRow.querySelector('div');
  if (logoLinkContent) {
    const link = logoLinkContent.textContent.trim();
    if (link) {
      logoLink.href = link;
      logoLink.target = '_blank';
    }
  }
  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '131' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoImageRow, logoDiv);
  moveInstrumentation(logoLinkRow, logoDiv);
  logoDiv.append(logoLink);

  // Navbar Toggler
  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add(`${blockName}-navbar-toggler`, `${blockName}-collapsed`);
  navbarToggler.type = 'button';
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add(`${blockName}-navbar-toggler-icon`);
  navbarToggler.append(togglerIcon);

  // Navbar Collapse Div
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    `${blockName}-collapse`,
    `${blockName}-navbar-collapse`,
    `${blockName}-justify-content-center`,
  );
  navbarCollapse.id = 'navbarSupportedContent';

  // Navigation Links
  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add(`${blockName}-nav-item`, `${blockName}-navigation`);
  const navigationNav = document.createElement('nav');
  navigationNav.classList.add('cmp-navigation'); // This class is from AEM Core Components, not block-specific
  navigationNav.setAttribute('role', 'navigation');
  const navigationUl = document.createElement('ul');
  navigationUl.classList.add('cmp-navigation__group'); // This class is from AEM Core Components, not block-specific

  // Filter for navigationLink items: 2 cells, first cell is a link (not a picture)
  const navigationLinks = itemRows.filter((row) => row.children.length === 2 && !row.children[0].querySelector('picture'));
  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0'); // These classes are from AEM Core Components
    const link = document.createElement('a');
    link.classList.add('cmp-navigation__item-link'); // This class is from AEM Core Components
    const linkCell = row.children[0];
    const labelCell = row.children[1];
    link.href = linkCell.textContent.trim();
    link.textContent = labelCell.textContent.trim();
    li.append(link);
    navigationUl.append(li);
  });
  navigationNav.append(navigationUl);
  navigationDiv.append(navigationNav);

  // Header Section for Search and Country Selector
  const headerSectionDiv = document.createElement('div');
  headerSectionDiv.classList.add(
    `${blockName}-header-section`,
    `${blockName}-d-flex`,
    `${blockName}-align-items-center`,
    `${blockName}-justify-content-end`,
  );

  // Search Icon
  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add(`${blockName}-nav-link`);
  const searchImg = searchIconRow.querySelector('img');
  if (searchImg) {
    const clonedSearchImg = searchImg.cloneNode(true);
    clonedSearchImg.id = 'searchIcon';
    searchIconLink.append(clonedSearchImg);
  }
  const searchSpan = document.createElement('span');
  searchSpan.classList.add(`${blockName}-d-block`);
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchSpan);
  moveInstrumentation(searchIconRow, searchIconLink);

  // Search Block (hidden by default)
  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add(`${blockName}-search-block`, `${blockName}-hidden`);

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add(`${blockName}-search-box`);

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add(`${blockName}-search-container`, `${blockName}-hidden`);

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
  searchBox.append(searchContainer);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774117217767.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);
  searchBlock.append(searchBox);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add(`${blockName}-search-results`, `${blockName}-hidden`);
  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add(`${blockName}-resultList`);
  popularSuggestions.textContent = 'Popular Suggestions';
  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  const pagesTitle = document.createElement('h4');
  pagesTitle.classList.add(`${blockName}-resultList`);
  pagesTitle.textContent = 'Pages';
  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add(`${blockName}-products`);
  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(popularSuggestions, suggestionsList, pagesTitle, productsList, viewAllButton);
  searchBlock.append(searchResults);

  // Country Selector Trigger
  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add(
    `${blockName}-search-icon`,
    `${blockName}-country-selector-trigger`,
    `${blockName}-d-flex`,
    `${blockName}-align-items-center`,
  );

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add(`${blockName}-country-code`);
  countryCodeSpan.textContent = 'IN'; // Default

  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add(`${blockName}-header-country-flag`);
  countryFlagImg.src = '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp'; // Default
  countryFlagImg.alt = 'flag';

  const dropdownIconImg = document.createElement('img');
  dropdownIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIconImg.alt = 'dropdown-icon';
  dropdownIconImg.classList.add(`${blockName}-dropdown-icon`);

  countrySelectorTrigger.append(countryCodeSpan, countryFlagImg, dropdownIconImg);

  headerSectionDiv.append(countrySelectorTrigger);

  // ITC Header Icon List
  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add(`${blockName}-itc-header-icon-list`);
  itcHeaderIconList.append(searchBlock, searchIconLink);

  // Append elements to navbar collapse
  navbarCollapse.append(navigationDiv, headerSectionDiv);

  // Append elements to nav
  nav.append(navbarToggler, logoDiv, navbarCollapse, itcHeaderIconList);

  // Append nav to header container
  headerContainer.append(nav);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add(
    `${blockName}-modal`,
    `${blockName}-fade`,
    `${blockName}-itc-country-selector`,
  );
  countryModal.id = 'countryModal';
  countryModal.setAttribute('tabindex', '-1');
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add(`${blockName}-modal-dialog`, `${blockName}-modal-dialog-centered`);
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add(`${blockName}-modal-content`);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add(
    `${blockName}-modal-header`,
    `${blockName}-border-0`,
    `${blockName}-text-center`,
  );
  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add(`${blockName}-w-100`);
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add(`${blockName}-modal-title`);
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  const experienceText = document.createElement('p');
  experienceText.classList.add(`${blockName}-experience-text`);
  experienceText.textContent = 'Experience';
  headerWrapper.append(modalTitle, experienceText);
  modalHeader.append(headerWrapper);

  const modalBody = document.createElement('div');
  modalBody.classList.add(`${blockName}-modal-body`);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    `${blockName}-country-options`,
    `${blockName}-d-flex`,
    `${blockName}-justify-content-center`,
    `${blockName}-align-items-center`,
  );

  // Filter for countryOption items: 2 cells, first cell contains a picture
  const countryOptions = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture'));
  countryOptions.forEach((row, index) => {
    const optionDiv = document.createElement('div');
    moveInstrumentation(row, optionDiv);
    optionDiv.classList.add(
      `${blockName}-country-option`,
      `${blockName}-mx-3`,
      `${blockName}-d-flex`,
      `${blockName}-flex-column`,
      `${blockName}-align-items-center`,
    );
    if (index === 0) {
      optionDiv.classList.add(`${blockName}-selected`);
    }

    const flagImageCell = row.children[0];
    const countryNameCell = row.children[1];

    const flagPicture = flagImageCell.querySelector('picture');
    if (flagPicture) {
      const img = flagPicture.querySelector('img');
      const clonedImg = img.cloneNode(true);
      clonedImg.classList.add(`${blockName}-country-flag`);
      clonedImg.alt = `${countryNameCell.textContent.trim()} Flag`;
      optionDiv.append(clonedImg);
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add(`${blockName}-country-name`);
    countryNameP.textContent = countryNameCell.textContent.trim();
    optionDiv.append(countryNameP);
    countryOptionsDiv.append(optionDiv);

    // Add event listener for country option selection
    optionDiv.addEventListener('click', () => {
      countryOptionsDiv.querySelectorAll(`.${blockName}-country-option`).forEach((opt) => {
        opt.classList.remove(`${blockName}-selected`);
      });
      optionDiv.classList.add(`${blockName}-selected`);
      // Update country code and flag in the header based on selection
      countryCodeSpan.textContent = countryNameP.textContent.trim().substring(0, 2).toUpperCase();
      const selectedFlagImg = optionDiv.querySelector(`.${blockName}-country-flag`);
      if (selectedFlagImg) {
        countryFlagImg.src = selectedFlagImg.src;
        countryFlagImg.alt = selectedFlagImg.alt;
      }
      // Close modal after selection (optional, but common UX)
      countryModal.classList.remove(`${blockName}-show`);
      countryModal.style.display = 'none';
    });
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);

  // Event Listeners
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show'); // 'show' is a Bootstrap class, ensure it's handled correctly or replaced
    navbarToggler.classList.toggle('collapsed'); // 'collapsed' is a Bootstrap class, ensure it's handled correctly or replaced
    navbarToggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
  });

  searchIconLink.addEventListener('click', () => {
    searchBlock.classList.toggle(`${blockName}-hidden`);
    searchContainer.classList.toggle(`${blockName}-hidden`);
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add(`${blockName}-hidden`);
    searchContainer.classList.add(`${blockName}-hidden`);
    searchResults.classList.add(`${blockName}-hidden`);
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add(`${blockName}-show`);
    countryModal.style.display = 'block';
  });

  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) { // Only close if clicking on the modal backdrop
      countryModal.classList.remove(`${blockName}-show`);
      countryModal.style.display = 'none';
    }
  });

  // Clear block and append new structure
  block.textContent = '';
  block.append(headerContainer, countryModal);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    // Exclude the logo image from this general optimization if it was already optimized with a specific width
    if (!img.closest(`.${blockName}-logo`)) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  });
}
