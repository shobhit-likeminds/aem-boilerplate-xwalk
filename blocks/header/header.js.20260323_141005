import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    mainLogoRow,
    mainLogoLinkRow,
    secondaryLogoRow,
    secondaryLogoLinkRow,
    navigationLinksContainer, // This is a container, its content is parsed from itemRows
    countryFlagRow,
    countryCodeRow,
    dropdownIconRow,
    searchIconRow,
    countryOptionsContainer, // This is a container, its content is parsed from itemRows
    ...itemRows // All subsequent rows are item rows
  ] = [...block.children];

  block.classList.add('header-itc-header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');
  block.append(headerContainer);

  const nav = document.createElement('nav');
  nav.classList.add('header-navbar', 'header-navbar-expand-xl', 'header-navbar-light', 'header-bg-light', 'header-px-xl-5', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center');
  headerContainer.append(nav);

  // Navbar Toggler
  const toggler = document.createElement('button');
  toggler.classList.add('header-navbar-toggler', 'header-collapsed');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('header-navbar-toggler-icon');
  toggler.append(togglerIcon);
  nav.append(toggler);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('header-d-xl-none');
  dXlNone.innerHTML = '&nbsp;';
  nav.append(dXlNone);

  // Main Logo and Secondary Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  nav.append(logoDiv);

  const mainLogoLinkWrapper = document.createElement('a');
  mainLogoLinkWrapper.classList.add('header-checkLogoLink');
  moveInstrumentation(mainLogoLinkRow, mainLogoLinkWrapper);
  const mainLogoLink = mainLogoLinkRow.querySelector('div').textContent.trim();
  if (mainLogoLink) {
    mainLogoLinkWrapper.href = mainLogoLink;
    mainLogoLinkWrapper.target = '_blank';
  }

  const mainLogoPicture = mainLogoRow.querySelector('picture');
  if (mainLogoPicture) {
    const mainLogoImg = mainLogoPicture.querySelector('img');
    if (mainLogoImg) {
      const optimizedMainLogoPic = createOptimizedPicture(mainLogoImg.src, mainLogoImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(mainLogoImg, optimizedMainLogoPic.querySelector('img'));
      mainLogoLinkWrapper.append(optimizedMainLogoPic);
    }
  }
  logoDiv.append(mainLogoLinkWrapper);

  const secondaryLogoLinkWrapper = document.createElement('a');
  secondaryLogoLinkWrapper.classList.add('header-cmp-image__link');
  moveInstrumentation(secondaryLogoLinkRow, secondaryLogoLinkWrapper);
  const secondaryLogoLink = secondaryLogoLinkRow.querySelector('div').textContent.trim();
  if (secondaryLogoLink) {
    secondaryLogoLinkWrapper.href = secondaryLogoLink;
    secondaryLogoLinkWrapper.target = '_blank';
  }

  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    if (secondaryLogoImg) {
      const optimizedSecondaryLogoPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(secondaryLogoImg, optimizedSecondaryLogoPic.querySelector('img'));
      optimizedSecondaryLogoPic.querySelector('img').classList.add('header-cmp-image__image');
      secondaryLogoLinkWrapper.append(optimizedSecondaryLogoPic);
    }
  }
  logoDiv.append(secondaryLogoLinkWrapper);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';
  nav.append(navbarCollapse);

  // Navigation Links
  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');
  moveInstrumentation(navigationLinksContainer, navItemNavigation);
  navbarCollapse.append(navItemNavigation);

  const navigation = document.createElement('nav');
  navigation.id = 'navigation-6d5dcb0126';
  navigation.classList.add('header-cmp-navigation');
  navigation.setAttribute('role', 'navigation');
  navItemNavigation.append(navigation);

  const ulNav = document.createElement('ul');
  ulNav.classList.add('header-cmp-navigation__group');
  navigation.append(ulNav);

  // Filter itemRows for navigationLink (2 cells)
  const navigationLinks = itemRows.filter((row) => row.children.length === 2);
  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
    moveInstrumentation(row, li);

    const linkCell = row.children[0]; // Link is in the first cell
    const textCell = row.children[1]; // Text is in the second cell

    const link = linkCell.querySelector('div').textContent.trim();
    const text = textCell.querySelector('div').textContent.trim();

    const a = document.createElement('a');
    a.classList.add('header-cmp-navigation__item-link');
    a.href = link;
    a.textContent = text;
    li.append(a);
    ulNav.append(li);
  });

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-header-section', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');
  navbarCollapse.append(headerSection);

  // Country Selector
  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('header-search-icon', 'header-country-selector-trigger', 'header-d-flex', 'header-align-items-center');
  headerSection.append(countrySelectorTrigger);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  moveInstrumentation(countryCodeRow, countryCodeSpan);
  countryCodeSpan.textContent = countryCodeRow.querySelector('div').textContent.trim();
  countrySelectorTrigger.append(countryCodeSpan);

  const countryFlagPicture = countryFlagRow.querySelector('picture');
  if (countryFlagPicture) {
    const countryFlagImg = countryFlagPicture.querySelector('img');
    if (countryFlagImg) {
      const optimizedCountryFlagPic = createOptimizedPicture(countryFlagImg.src, countryFlagImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(countryFlagImg, optimizedCountryFlagPic.querySelector('img'));
      optimizedCountryFlagPic.querySelector('img').classList.add('header-header-country-flag');
      countrySelectorTrigger.append(optimizedCountryFlagPic);
    }
  }

  const dropdownIconPicture = dropdownIconRow.querySelector('picture');
  if (dropdownIconPicture) {
    const dropdownIconImg = dropdownIconPicture.querySelector('img');
    if (dropdownIconImg) {
      const optimizedDropdownIconPic = createOptimizedPicture(dropdownIconImg.src, dropdownIconImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(dropdownIconImg, optimizedDropdownIconPic.querySelector('img'));
      optimizedDropdownIconPic.querySelector('img').classList.add('header-dropdown-icon');
      countrySelectorTrigger.append(optimizedDropdownIconPic);
    }
  }

  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-icon-list');
  nav.append(itcHeaderIconList);

  // Search Block
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
  searchContainer.append(searchButton);

  const searchIconPicture = searchIconRow.querySelector('picture');
  if (searchIconPicture) {
    const searchIconImg = searchIconPicture.querySelector('img');
    if (searchIconImg) {
      const optimizedSearchIconPic = createOptimizedPicture(searchIconImg.src, searchIconImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(searchIconImg, optimizedSearchIconPic.querySelector('img'));
      searchButton.append(optimizedSearchIconPic);
    }
  }

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1773997902660.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');
  searchBlock.append(searchResults);

  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('header-resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestions);

  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pages = document.createElement('h4');
  pages.classList.add('header-resultList');
  pages.textContent = 'Pages';
  searchResults.append(pages);

  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('header-products');
  searchResults.append(productsList);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);

  const searchNavLink = document.createElement('a');
  searchNavLink.classList.add('header-nav-link');
  itcHeaderIconList.append(searchNavLink);

  const searchIconImgNavLink = document.createElement('img');
  searchIconImgNavLink.loading = 'lazy';
  searchIconImgNavLink.id = 'searchIcon';
  searchIconImgNavLink.src = searchIconRow.querySelector('picture img').src;
  searchIconImgNavLink.alt = 'Search icon';
  searchNavLink.append(searchIconImgNavLink);

  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchSpan);

  const liNavItem = document.createElement('li');
  liNavItem.classList.add('header-nav-item');
  itcHeaderIconList.append(liNavItem);
  const aNavItem = document.createElement('a');
  aNavItem.classList.add('header-nav-link');
  liNavItem.append(aNavItem);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector');
  countryModal.id = 'countryModal';
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  block.append(countryModal);

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

  const w100 = document.createElement('div');
  w100.classList.add('header-w-100');
  modalHeader.append(w100);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  w100.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text');
  experienceText.textContent = 'Experience';
  w100.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
  moveInstrumentation(countryOptionsContainer, countryOptionsDiv);
  modalBody.append(countryOptionsDiv);

  // Filter itemRows for countryOption (4 cells)
  const countryOptions = itemRows.filter((row) => row.children.length === 4);
  countryOptions.forEach((row) => {
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
    moveInstrumentation(row, countryOptionDiv);

    const flagCell = row.children[0]; // Flag is in the first cell
    const countryNameCell = row.children[1]; // Country Name is in the second cell
    const countryDataCell = row.children[2]; // Country Data Attribute is in the third cell
    const urlCell = row.children[3]; // Country URL is in the fourth cell

    const flagPicture = flagCell.querySelector('picture');
    if (flagPicture) {
      const flagImg = flagPicture.querySelector('img');
      if (flagImg) {
        const optimizedFlagPic = createOptimizedPicture(flagImg.src, flagImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(flagImg, optimizedFlagPic.querySelector('img'));
        optimizedFlagPic.querySelector('img').classList.add('header-country-flag');
        countryOptionDiv.append(optimizedFlagPic);
      }
    }

    const countryName = countryNameCell.querySelector('div').textContent.trim();
    const pCountryName = document.createElement('p');
    pCountryName.classList.add('header-country-name');
    pCountryName.textContent = countryName;
    countryOptionDiv.append(pCountryName);

    const countryData = countryDataCell.querySelector('div').textContent.trim();
    countryOptionDiv.setAttribute('data-country', countryData);

    const countryUrl = urlCell.querySelector('a') ? urlCell.querySelector('a').href : '';
    countryOptionDiv.setAttribute('data-url', countryUrl);

    countryOptionsDiv.append(countryOptionDiv);

    // Event listener for country option selection
    countryOptionDiv.addEventListener('click', () => {
      window.location.href = countryUrl;
    });
  });

  // Event Listeners for interactive elements
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-collapse');
    navbarCollapse.classList.toggle('header-show');
    toggler.classList.toggle('header-collapsed');
    toggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('header-show'));
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('header-show');
    countryModal.style.display = 'block';
  });

  // Event listener for clicking outside the modal to close it
  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
    }
  });

  searchNavLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-hidden');
    searchContainer.classList.add('header-hidden'); // Hide search input on initial open
    searchResults.classList.add('header-hidden'); // Hide search results on initial open
  });

  searchButton.addEventListener('click', () => {
    searchContainer.classList.toggle('header-hidden');
    searchResults.classList.toggle('header-hidden');
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
  });

  // Optimization for all images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
