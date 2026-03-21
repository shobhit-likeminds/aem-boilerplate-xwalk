import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    logoAltTextRow,
    navigationRow,
    countryFlagIndiaRow,
    countryFlagUSARow,
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('header-itc-header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-itc-header-section-header-container');

  const navbar = document.createElement('nav');
  navbar.classList.add(
    'header-itc-header-section-header-navbar',
    'header-itc-header-section-header-navbar-expand-xl',
    'header-itc-header-section-header-navbar-light',
    'header-itc-header-section-header-bg-light',
    'header-itc-header-section-header-px-xl-5',
    'header-itc-header-section-header-d-flex',
    'header-itc-header-section-header-justify-content-between',
    'header-itc-header-section-header-align-items-center',
  );

  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('header-itc-header-section-header-navbar-toggler', 'header-itc-header-section-header-collapsed');
  navbarToggler.type = 'button';
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('header-itc-header-section-header-navbar-toggler-icon');
  navbarToggler.append(togglerSpan);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('header-itc-header-section-header-d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-itc-header-section-header-logo', 'header-itc-header-section-header-image');

  const logoLink = document.createElement('a');
  const logoHref = logoLinkRow.querySelector('div')?.textContent.trim();
  if (logoHref) {
    logoLink.href = logoHref;
  }
  logoLink.classList.add('header-itc-header-section-header-cmp-image__link');
  logoLink.target = '_blank';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const optimizedPic = createOptimizedPicture(logoImg.src, logoAltTextRow.querySelector('div')?.textContent.trim(), false, [{ width: '131' }]);
      moveInstrumentation(logoImg, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('header-itc-header-section-header-cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  logoLink.append(screenReaderSpan);

  logoDiv.append(logoLink);


  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-itc-header-section-header-collapse', 'header-itc-header-section-header-navbar-collapse', 'header-itc-header-section-header-justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-itc-header-section-header-nav-item', 'header-itc-header-section-header-navigation');

  const navEl = document.createElement('nav');
  navEl.id = 'navigation-6d5dcb0126';
  navEl.classList.add('header-itc-header-section-header-cmp-navigation');
  navEl.setAttribute('itemscope', '');
  navEl.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  navEl.setAttribute('role', 'navigation');
  moveInstrumentation(navigationRow, navEl);

  const navUl = document.createElement('ul');
  navUl.classList.add('header-itc-header-section-header-cmp-navigation__group');

  // Navigation items have two cells: shopLink and ourHeritageLink
  [...navigationRow.children].forEach((row) => {
    const [shopLinkCell, ourHeritageLinkCell] = [...row.children]; // Destructure cells for each navigation item
    const navItem = document.createElement('li');
    navItem.classList.add('header-itc-header-section-header-cmp-navigation__item', 'header-itc-header-section-header-cmp-navigation__item--level-0');
    moveInstrumentation(row, navItem); // Instrumentation on the row, not individual cells

    // Handle 'Shop Link'
    const shopLink = shopLinkCell.querySelector('a');
    if (shopLink) {
      const newLink = document.createElement('a');
      newLink.classList.add('header-itc-header-section-header-cmp-navigation__item-link');
      newLink.href = shopLink.href;
      newLink.textContent = shopLink.textContent;
      navItem.append(newLink);
    } else if (shopLinkCell.textContent.trim()) {
      const newLink = document.createElement('a');
      newLink.classList.add('header-itc-header-section-header-cmp-navigation__item-link');
      newLink.textContent = shopLinkCell.textContent.trim();
      navItem.append(newLink);
    }

    // Handle 'Our Heritage Link' (if present, typically for a second link in the same item)
    const ourHeritageLink = ourHeritageLinkCell?.querySelector('a');
    if (ourHeritageLink) {
      const newLink = document.createElement('a');
      newLink.classList.add('header-itc-header-section-header-cmp-navigation__item-link');
      newLink.href = ourHeritageLink.href;
      newLink.textContent = ourHeritageLink.textContent;
      navItem.append(newLink);
    } else if (ourHeritageLinkCell?.textContent.trim()) {
      const newLink = document.createElement('a');
      newLink.classList.add('header-itc-header-section-header-cmp-navigation__item-link');
      newLink.textContent = ourHeritageLinkCell.textContent.trim();
      navItem.append(newLink);
    }

    navUl.append(navItem);
  });
  navEl.append(navUl);
  navItemNavigation.append(navEl);

  const headerSectionDiv = document.createElement('div');
  headerSectionDiv.classList.add('header-itc-header-section-header-header-section', 'header-itc-header-section-header-d-flex', 'header-itc-header-section-header-align-items-center', 'header-itc-header-section-header-justify-content-end');

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('header-itc-header-section-header-search-icon', 'header-itc-header-section-header-country-selector-trigger', 'header-itc-header-section-header-d-flex', 'header-itc-header-section-header-align-items-center');

  const countryCode = document.createElement('span');
  countryCode.classList.add('header-itc-header-section-header-country-code');
  countryCode.textContent = 'IN';
  countrySelectorTrigger.append(countryCode);

  const indiaFlagPicture = countryFlagIndiaRow.querySelector('picture');
  if (indiaFlagPicture) {
    const indiaFlagImg = indiaFlagPicture.querySelector('img');
    if (indiaFlagImg) {
      const optimizedPic = createOptimizedPicture(indiaFlagImg.src, indiaFlagImg.alt, false, [{ width: 'auto' }]);
      optimizedPic.classList.add('header-itc-header-section-header-header-country-flag');
      moveInstrumentation(indiaFlagImg, optimizedPic.querySelector('img'));
      countrySelectorTrigger.append(optimizedPic);
    }
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png'; // Placeholder
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-itc-header-section-header-dropdown-icon');
  countrySelectorTrigger.append(dropdownIcon);
  headerSectionDiv.append(countrySelectorTrigger);
  navbarCollapse.append(navItemNavigation, headerSectionDiv);

  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-section-header-itc-header-icon-list');

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('header-itc-header-section-header-search-block', 'header-itc-header-section-header-hidden');

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('header-itc-header-section-header-search-box');

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('header-itc-header-section-header-search-container', 'header-itc-header-section-header-hidden');

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
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774004123299.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);
  searchBlock.append(searchBox);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-itc-header-section-header-search-results', 'header-itc-header-section-header-hidden');

  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('header-itc-header-section-header-resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestions);

  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pagesList = document.createElement('h4');
  pagesList.classList.add('header-itc-header-section-header-resultList');
  pagesList.textContent = 'Pages';
  searchResults.append(pagesList);

  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('header-itc-header-section-header-products');
  searchResults.append(productsList);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);
  searchBlock.append(searchResults);
  itcHeaderIconList.append(searchBlock);

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('header-itc-header-section-header-nav-link');
  const searchIconImg = document.createElement('img');
  searchIconImg.loading = 'lazy';
  searchIconImg.id = 'searchIcon';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchIconImg.alt = 'Search icon';
  searchIconLink.append(searchIconImg);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-itc-header-section-header-d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchSpan);
  itcHeaderIconList.append(searchIconLink);

  navbar.append(navbarToggler, dXlNoneDiv, logoDiv, navbarCollapse, itcHeaderIconList);
  headerContainer.append(navbar);
  block.append(headerContainer);

  const modal = document.createElement('div');
  modal.classList.add('header-itc-header-section-header-modal', 'header-itc-header-section-header-fade', 'header-itc-header-section-header-itc-country-selector');
  modal.id = 'countryModal';
  modal.tabIndex = -1;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'countryModalLabel');
  modal.setAttribute('aria-modal', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-itc-header-section-header-modal-dialog', 'header-itc-header-section-header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-itc-header-section-header-modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header-itc-header-section-header-modal-header', 'header-itc-header-section-header-border-0', 'header-itc-header-section-header-text-center');

  const w100Div = document.createElement('div');
  w100Div.classList.add('header-itc-header-section-header-w-100');

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-itc-header-section-header-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  w100Div.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('header-itc-header-section-header-experience-text');
  experienceText.textContent = 'Experience';
  w100Div.append(experienceText);
  modalHeader.append(w100Div);
  modalContent.append(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-itc-header-section-header-modal-body');

  const countryOptions = document.createElement('div');
  countryOptions.classList.add('header-itc-header-section-header-country-options', 'header-itc-header-section-header-d-flex', 'header-itc-header-section-header-justify-content-center', 'header-itc-header-section-header-align-items-center');

  const indiaOption = document.createElement('div');
  indiaOption.classList.add('header-itc-header-section-header-country-option', 'header-itc-header-section-header-selected', 'header-itc-header-section-header-mx-3', 'header-itc-header-section-header-d-flex', 'header-itc-header-section-header-flex-column', 'header-itc-header-section-header-align-items-center');
  indiaOption.setAttribute('data-country', 'india');
  indiaOption.setAttribute('data-url', '/india');

  const indiaFlagImg = document.createElement('img');
  const indiaFlagSrc = countryFlagIndiaRow.querySelector('picture > img')?.src;
  if (indiaFlagSrc) {
    const optimizedPic = createOptimizedPicture(indiaFlagSrc, 'India Flag', false, [{ width: 'auto' }]);
    optimizedPic.classList.add('header-itc-header-section-header-country-flag', 'header-itc-header-section-header-india-flag');
    moveInstrumentation(countryFlagIndiaRow.querySelector('img'), optimizedPic.querySelector('img'));
    indiaOption.append(optimizedPic);
  }

  const indiaName = document.createElement('p');
  indiaName.classList.add('header-itc-header-section-header-country-name');
  indiaName.textContent = 'India';
  indiaOption.append(indiaName);
  countryOptions.append(indiaOption);

  const usaOption = document.createElement('div');
  usaOption.classList.add('header-itc-header-section-header-country-option', 'header-itc-header-section-header-mx-3', 'header-itc-header-section-header-d-flex', 'header-itc-header-section-header-flex-column', 'header-itc-header-section-header-align-items-center');
  usaOption.setAttribute('data-country', 'usa');
  usaOption.setAttribute('data-url', '/usa');

  const usaFlagImg = document.createElement('img');
  const usaFlagSrc = countryFlagUSARow.querySelector('picture > img')?.src;
  if (usaFlagSrc) {
    const optimizedPic = createOptimizedPicture(usaFlagSrc, 'USA Flag', false, [{ width: 'auto' }]);
    optimizedPic.classList.add('header-itc-header-section-header-country-flag', 'header-itc-header-section-header-usa-flag');
    moveInstrumentation(countryFlagUSARow.querySelector('img'), optimizedPic.querySelector('img'));
    usaOption.append(optimizedPic);
  }

  const usaName = document.createElement('p');
  usaName.classList.add('header-itc-header-section-header-country-name');
  usaName.textContent = 'USA';
  usaOption.append(usaName);
  countryOptions.append(usaOption);

  modalBody.append(countryOptions);
  modalContent.append(modalBody);
  modalDialog.append(modalContent);
  modal.append(modalDialog);
  block.append(modal);

  // Event Listeners for interactivity
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-itc-header-section-header-show');
    navbarToggler.classList.toggle('header-itc-header-section-header-collapsed');
    navbarToggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('header-itc-header-section-header-show'));
  });

  countrySelectorTrigger.addEventListener('click', () => {
    modal.classList.add('header-itc-header-section-header-show');
    modal.style.display = 'block';
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('header-itc-header-section-header-show');
      modal.style.display = 'none';
    }
  });

  // Search functionality
  searchIconLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-itc-header-section-header-hidden');
    searchContainer.classList.add('header-itc-header-section-header-hidden');
    searchResults.classList.add('header-itc-header-section-header-hidden');
    searchInput.value = '';
  });

  searchButton.addEventListener('click', () => {
    // Implement search logic here
    console.log('Search initiated for:', searchInput.value);
    searchContainer.classList.remove('header-itc-header-section-header-hidden');
    searchResults.classList.remove('header-itc-header-section-header-hidden');
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-itc-header-section-header-hidden');
    searchContainer.classList.add('header-itc-header-section-header-hidden');
    searchResults.classList.add('header-itc-header-section-header-hidden');
    searchInput.value = '';
  });

  // Country selection logic
  indiaOption.addEventListener('click', () => {
    countryCode.textContent = 'IN';
    const indiaFlagOptimizedPic = indiaOption.querySelector('picture');
    if (indiaFlagOptimizedPic) {
      const currentFlag = countrySelectorTrigger.querySelector('.header-itc-header-section-header-header-country-flag');
      if (currentFlag) {
        currentFlag.replaceWith(indiaFlagOptimizedPic.cloneNode(true));
      }
    }
    modal.classList.remove('header-itc-header-section-header-show');
    modal.style.display = 'none';
  });

  usaOption.addEventListener('click', () => {
    countryCode.textContent = 'US';
    const usaFlagOptimizedPic = usaOption.querySelector('picture');
    if (usaFlagOptimizedPic) {
      const currentFlag = countrySelectorTrigger.querySelector('.header-itc-header-section-header-header-country-flag');
      if (currentFlag) {
        currentFlag.replaceWith(usaFlagOptimizedPic.cloneNode(true));
      }
    }
    modal.classList.remove('header-itc-header-section-header-show');
    modal.style.display = 'none';
  });
}
