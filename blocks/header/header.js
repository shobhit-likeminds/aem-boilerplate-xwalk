import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('div');
  headerSection.classList.add('header-itc-header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');
  headerSection.append(headerContainer);

  const navbar = document.createElement('nav');
  navbar.classList.add('header-navbar', 'header-navbar-expand-xl', 'header-navbar-light', 'header-bg-light', 'header-px-xl-5', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center');
  headerContainer.append(navbar);

  // Row 1: Toggler, Logo, Nav, Search/Country
  const [logoRow, navLinksRow, countrySelectorRow, searchRow] = block.children;

  // Toggler
  const toggler = document.createElement('button');
  toggler.classList.add('header-navbar-toggler', 'header-collapsed');
  toggler.type = 'button';
  toggler.setAttribute('data-toggle', 'collapse');
  toggler.setAttribute('data-target', '#navbarSupportedContent');
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('header-navbar-toggler-icon');
  toggler.append(togglerSpan);
  navbar.append(toggler);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('header-d-xl-none');
  dXlNone.innerHTML = '&nbsp;';
  navbar.append(dXlNone);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  moveInstrumentation(logoRow, logoDiv);

  const logoCell = [...logoRow.children].find((cell) => cell.querySelector('picture') || cell.querySelector('a'));
  if (logoCell) {
    const logoLink1 = logoCell.querySelector('a:first-of-type');
    const logoLink2 = logoCell.querySelector('a:last-of-type');

    if (logoLink1) {
      const inputHidden = document.createElement('input');
      inputHidden.type = 'hidden';
      inputHidden.value = logoLink1.href;
      inputHidden.id = 'logoLinkId';
      logoDiv.append(inputHidden);

      const checkLogoLink = document.createElement('a');
      checkLogoLink.classList.add('header-checkLogoLink');
      checkLogoLink.target = '_blank';
      moveInstrumentation(logoLink1, checkLogoLink);
      while (logoLink1.firstChild) checkLogoLink.append(logoLink1.firstChild);
      logoDiv.append(checkLogoLink);
    }

    if (logoLink2) {
      const cmpImageLink = document.createElement('a');
      cmpImageLink.classList.add('header-cmp-image__link');
      cmpImageLink.href = logoLink2.href;
      cmpImageLink.target = '_blank';
      moveInstrumentation(logoLink2, cmpImageLink);
      while (logoLink2.firstChild) cmpImageLink.append(logoLink2.firstChild);
      logoDiv.append(cmpImageLink);
    }
  }
  navbar.append(logoDiv);

  // Navbar collapse
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';
  navbar.append(navbarCollapse);

  // Navigation Links
  const navItem = document.createElement('div');
  navItem.classList.add('header-nav-item', 'header-navigation');
  moveInstrumentation(navLinksRow, navItem);
  navbarCollapse.append(navItem);

  const nav = document.createElement('nav');
  nav.id = 'navigation-6d5dcb0126';
  nav.classList.add('header-cmp-navigation');
  nav.setAttribute('itemscope', '');
  nav.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  nav.setAttribute('role', 'navigation');
  navItem.append(nav);

  const ul = document.createElement('ul');
  ul.classList.add('header-cmp-navigation__group');
  nav.append(ul);

  [...navLinksRow.children].forEach((cell) => {
    const link = cell.querySelector('a');
    if (link) {
      const li = document.createElement('li');
      li.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
      moveInstrumentation(cell, li);

      const linkEl = document.createElement('a');
      linkEl.classList.add('header-cmp-navigation__item-link');
      linkEl.href = link.href;
      linkEl.textContent = link.textContent;
      li.append(linkEl);
      ul.append(li);
    }
  });

  // Country Selector and Search
  const headerSectionRight = document.createElement('div');
  headerSectionRight.classList.add('header-header-section', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');
  navbarCollapse.append(headerSectionRight);

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('header-search-icon', 'header-country-selector-trigger', 'header-d-flex', 'header-align-items-center');
  countrySelectorTrigger.setAttribute('data-toggle', 'modal');
  countrySelectorTrigger.setAttribute('data-target', '#countryModal');
  headerSectionRight.append(countrySelectorTrigger);

  const countrySelectorCells = [...countrySelectorRow.children];
  const countryCodeCell = countrySelectorCells.find((cell) => !cell.querySelector('picture'));
  const countryFlagCell = countrySelectorCells.find((cell) => cell.querySelector('picture:first-of-type'));
  const dropdownIconCell = countrySelectorCells.find((cell) => cell.querySelector('picture:last-of-type'));

  if (countryCodeCell) {
    const countryCodeSpan = document.createElement('span');
    countryCodeSpan.classList.add('header-country-code');
    countryCodeSpan.textContent = countryCodeCell.textContent.trim();
    countrySelectorTrigger.append(countryCodeSpan);
  }

  if (countryFlagCell) {
    const countryFlagImg = countryFlagCell.querySelector('img');
    if (countryFlagImg) {
      const countryFlag = document.createElement('img');
      countryFlag.classList.add('header-country-flag');
      countryFlag.src = countryFlagImg.src;
      countryFlag.alt = countryFlagImg.alt;
      countrySelectorTrigger.append(countryFlag);
      countrySelectorTrigger.setAttribute('data-flag-in', countryFlagImg.src);
    }
  }

  if (dropdownIconCell) {
    const dropdownIconImg = dropdownIconCell.querySelector('img');
    if (dropdownIconImg) {
      const dropdownIcon = document.createElement('img');
      dropdownIcon.src = dropdownIconImg.src;
      dropdownIcon.alt = dropdownIconImg.alt;
      dropdownIcon.classList.add('header-dropdown-icon');
      countrySelectorTrigger.append(dropdownIcon);
    }
  }

  // Search Block and Icon
  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-icon-list');
  navbar.append(itcHeaderIconList);

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('header-search-block', 'header-hidden');
  itcHeaderIconList.append(searchBlock);

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('header-search-box');
  searchBlock.append(searchBox);

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('header-search-container', 'header-hidden');
  searchBox.append(searchContainer);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = 'Search';
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchButtonImg = searchRow.querySelector('button#searchButton img');
  if (searchButtonImg) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = searchButtonImg.src;
    img.alt = searchButtonImg.alt;
    searchButton.append(img);
  }
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  const closeButtonImg = searchRow.querySelector('img#closeButton');
  if (closeButtonImg) {
    closeButton.src = closeButtonImg.src;
    closeButton.alt = closeButtonImg.alt;
  }
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');
  searchBlock.append(searchResults);

  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add('header-resultList');
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestionsH4);

  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.id = 'suggestionsList';
  searchResults.append(suggestionsListUl);

  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add('header-resultList');
  pagesH4.textContent = 'Pages';
  searchResults.append(pagesH4);

  const productsListUl = document.createElement('ul');
  productsListUl.id = 'productsList';
  productsListUl.classList.add('header-products');
  searchResults.append(productsListUl);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('header-nav-link');
  const searchIconImg = searchRow.querySelector('img#searchIcon');
  if (searchIconImg) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.id = 'searchIcon';
    img.src = searchIconImg.src;
    img.alt = searchIconImg.alt;
    searchIconLink.append(img);
  }
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchSpan);
  itcHeaderIconList.append(searchIconLink);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector', 'header-show');
  countryModal.id = 'countryModal';
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'block';
  headerSection.append(countryModal);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  countryModal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content');
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header-modal-header', 'header-border-0', 'header-text-center');
  modalContent.append(modalHeader);

  const modalHeaderW100 = document.createElement('div');
  modalHeaderW100.classList.add('header-w-100');
  modalHeader.append(modalHeaderW100);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  modalHeaderW100.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text');
  experienceText.textContent = 'Experience';
  modalHeaderW100.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
  modalBody.append(countryOptionsDiv);

  // Country Options
  [...block.children].slice(4).forEach((row) => { // Assuming country options start from the 5th row
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
    moveInstrumentation(row, countryOptionDiv);

    const flagImageCell = row.querySelector('picture');
    const countryNameCell = row.querySelector('p');
    const countryUrlLink = row.querySelector('a');

    if (flagImageCell) {
      const img = flagImageCell.querySelector('img');
      if (img) {
        const countryFlag = document.createElement('img');
        countryFlag.src = img.src;
        countryFlag.alt = img.alt;
        countryFlag.classList.add('header-country-flag');
        countryOptionDiv.append(countryFlag);
      }
    }

    if (countryNameCell) {
      const countryNameP = document.createElement('p');
      countryNameP.classList.add('header-country-name');
      countryNameP.textContent = countryNameCell.textContent.trim();
      countryOptionDiv.append(countryNameP);
    }

    if (countryUrlLink) {
      countryOptionDiv.setAttribute('data-country', countryUrlLink.textContent.trim().toLowerCase());
      countryOptionDiv.setAttribute('data-url', countryUrlLink.href);
      if (countryUrlLink.textContent.trim().toLowerCase() === 'india') {
        countryOptionDiv.classList.add('header-selected');
      }
    }

    countryOptionsDiv.append(countryOptionDiv);
  });

  block.textContent = '';
  block.append(headerSection);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
