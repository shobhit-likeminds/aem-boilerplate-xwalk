import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, logoLinkLabelRow, ...itemRows] = [...block.children];

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
  // Removed data-toggle and data-target as per EDS guidelines
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  navbarToggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
  nav.append(navbarToggler);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';
  nav.append(dXlNoneDiv);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image');
  nav.append(logoDiv);

  const cmpImageDiv = document.createElement('div');
  cmpImageDiv.classList.add('cmp-image', 'header-logo-div');
  cmpImageDiv.setAttribute('data-cmp-hook-image', 'imageV3');
  cmpImageDiv.setAttribute('itemscope', '');
  cmpImageDiv.setAttribute('itemtype', 'http://schema.org/ImageObject');
  moveInstrumentation(logoImageRow.firstElementChild, cmpImageDiv);
  logoDiv.append(cmpImageDiv);

  const logoLinkInput = document.createElement('input');
  logoLinkInput.type = 'hidden';
  const logoLinkA = logoLinkRow.querySelector('a');
  if (logoLinkA) {
    logoLinkInput.value = logoLinkA.href;
  }
  cmpImageDiv.append(logoLinkInput);

  const checkLogoLink = document.createElement('a');
  checkLogoLink.classList.add('checkLogoLink');
  checkLogoLink.target = '_blank';
  cmpImageDiv.append(checkLogoLink);

  const logoImg = logoImageRow.querySelector('img');
  if (logoImg) {
    const itcLogoImage = document.createElement('img');
    itcLogoImage.classList.add('cmp-image__image', 'itc-logo-image');
    itcLogoImage.loading = 'lazy';
    itcLogoImage.setAttribute('itemprop', 'contentUrl');
    itcLogoImage.src = logoImg.src;
    itcLogoImage.srcset = logoImg.src;
    itcLogoImage.alt = logoImg.alt;
    checkLogoLink.append(itcLogoImage);
  }

  const screenReaderOnlySpan = document.createElement('span');
  screenReaderOnlySpan.classList.add('cmp-link__screen-reader-only');
  screenReaderOnlySpan.textContent = 'opens in a new tab';
  checkLogoLink.append(screenReaderOnlySpan);

  const cmpImageLink = document.createElement('a');
  cmpImageLink.classList.add('cmp-image__link');
  const logoLinkLabelA = logoLinkLabelRow.querySelector('a');
  if (logoLinkLabelA) {
    cmpImageLink.href = logoLinkLabelA.href;
  }
  cmpImageLink.target = '_blank';
  cmpImageDiv.append(cmpImageLink);

  if (logoImg) {
    const cmpImageImage = document.createElement('img');
    cmpImageImage.classList.add('cmp-image__image');
    cmpImageImage.loading = 'lazy';
    cmpImageImage.setAttribute('itemprop', 'contentUrl');
    cmpImageImage.src = logoImg.src;
    cmpImageImage.alt = logoImg.alt;
    cmpImageLink.append(cmpImageImage);
  }
  const cmpLinkScreenReaderOnly = document.createElement('span');
  cmpLinkScreenReaderOnly.classList.add('cmp-link__screen-reader-only');
  cmpLinkScreenReaderOnly.textContent = 'opens in a new tab';
  cmpImageLink.append(cmpLinkScreenReaderOnly);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('collapse', 'navbar-collapse', 'justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';
  nav.append(navbarCollapse);

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('nav-item', 'navigation');
  navbarCollapse.append(navItemNavigation);

  const cmpNavigation = document.createElement('nav');
  cmpNavigation.classList.add('cmp-navigation');
  cmpNavigation.setAttribute('itemscope', '');
  cmpNavigation.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  cmpNavigation.setAttribute('role', 'navigation');
  navItemNavigation.append(cmpNavigation);

  const cmpNavigationGroup = document.createElement('ul');
  cmpNavigationGroup.classList.add('cmp-navigation__group');
  cmpNavigation.append(cmpNavigationGroup);

  const navigationItems = itemRows.filter((row) => row.children.length === 2);
  navigationItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    moveInstrumentation(row, li);

    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[1];
    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[1];

    const link = linkCell.querySelector('a');
    const label = labelCell.querySelector('a');

    if (link && label) {
      const linkEl = document.createElement('a');
      linkEl.classList.add('cmp-navigation__item-link');
      linkEl.href = link.href;
      linkEl.textContent = label.textContent;
      li.append(linkEl);
    }
    cmpNavigationGroup.append(li);
  });

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-section', 'd-flex', 'align-items-center', 'justify-content-end');
  navbarCollapse.append(headerSection);

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('search-icon', 'country-selector-trigger', 'd-flex', 'align-items-center');
  // Removed data-toggle and data-target as per EDS guidelines
  headerSection.append(countrySelectorTrigger);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('country-code');
  countryCodeSpan.textContent = 'IN'; // Default to IN, will be updated by modal
  countrySelectorTrigger.append(countryCodeSpan);

  const countryOptions = itemRows.filter((row) => row.children.length === 4);
  const firstCountryOption = countryOptions[0];
  if (firstCountryOption) {
    const flagImage = firstCountryOption.querySelector('picture img'); // Use querySelector for robustness
    if (flagImage) {
      const headerCountryFlag = document.createElement('img');
      headerCountryFlag.classList.add('header-country-flag');
      headerCountryFlag.src = flagImage.src;
      headerCountryFlag.alt = 'flag';
      countrySelectorTrigger.append(headerCountryFlag);
    }
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('dropdown-icon');
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
  searchButton.innerHTML = '<img loading="lazy" src="/content/dam/aemigrate/uploaded-folder/image/search-icon.png" alt="Search icon">';
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1775662646986.svg+xml';
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

  const pagesList = document.createElement('h4');
  pagesList.classList.add('resultList');
  pagesList.textContent = 'Pages';
  searchResults.append(pagesList);

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

  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchSpan);

  const navItemLi = document.createElement('li');
  navItemLi.classList.add('nav-item');
  const navLinkA = document.createElement('a');
  navLinkA.classList.add('nav-link');
  navItemLi.append(navLinkA);
  itcHeaderIconList.append(navItemLi);

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

  const w100Div = document.createElement('div');
  w100Div.classList.add('w-100');
  modalHeader.append(w100Div);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  w100Div.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('experience-text');
  experienceText.textContent = 'Experience';
  w100Div.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('country-options', 'd-flex', 'justify-content-center', 'align-items-center');
  modalBody.append(countryOptionsDiv);

  countryOptions.forEach((row, index) => {
    const cells = [...row.children];
    const flagImageCell = cells.find(cell => cell.querySelector('picture img'));
    const countryNameCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
    const countryUrlCell = cells.find(cell => cell.querySelector('a'));
    // countryUrlLabelCell is not used in the generated HTML, so no need to find it if not used.

    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add('country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');
    if (index === 0) {
      countryOptionDiv.classList.add('selected');
    }
    moveInstrumentation(row, countryOptionDiv);

    const flagImg = flagImageCell ? flagImageCell.querySelector('img') : null;
    const countryName = countryNameCell ? countryNameCell.textContent.trim() : '';
    const countryUrl = countryUrlCell ? countryUrlCell.querySelector('a') : null;

    if (flagImg) {
      const countryFlag = document.createElement('img');
      countryFlag.classList.add('country-flag');
      countryFlag.src = flagImg.src;
      countryFlag.alt = `${countryName} Flag`;
      countryFlag.classList.add(countryName.toLowerCase().replace(/\s/g, '-').concat('-flag'));
      countryOptionDiv.append(countryFlag);
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('country-name');
    countryNameP.textContent = countryName;
    countryOptionDiv.append(countryNameP);

    if (countryUrl) {
      countryOptionDiv.setAttribute('data-country', countryName.toLowerCase());
      countryOptionDiv.setAttribute('data-url', countryUrl.href);
    }

    countryOptionsDiv.append(countryOptionDiv);
  });

  // Event Listeners for interactive behavior
  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed');
    navbarToggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
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

  modalContent.addEventListener('click', (e) => {
    const targetOption = e.target.closest('.country-option');
    if (targetOption) {
      countryOptionsDiv.querySelectorAll('.country-option').forEach(option => option.classList.remove('selected'));
      targetOption.classList.add('selected');
      const selectedCountryCode = targetOption.getAttribute('data-country').substring(0, 2).toUpperCase();
      countryCodeSpan.textContent = selectedCountryCode;
      const selectedFlagImg = targetOption.querySelector('.country-flag');
      if (selectedFlagImg) {
        countrySelectorTrigger.querySelector('.header-country-flag').src = selectedFlagImg.src;
      }
      // Optionally redirect to the selected country URL
      // window.location.href = targetOption.getAttribute('data-url');
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  });

  // Search functionality event listeners
  const searchIcon = document.getElementById('searchIcon');
  const closeSearchButton = document.getElementById('closeButton');
  const searchContainerDiv = document.getElementById('searchContainer');
  const searchBlockDiv = document.getElementById('searchBlock');
  const searchResultsDiv = document.getElementById('searchResults');
  const searchInputEl = document.getElementById('searchInput');

  searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    searchBlockDiv.classList.remove('hidden');
    searchContainerDiv.classList.remove('hidden');
    searchInputEl.focus();
  });

  closeSearchButton.addEventListener('click', () => {
    searchBlockDiv.classList.add('hidden');
    searchContainerDiv.classList.add('hidden');
    searchResultsDiv.classList.add('hidden');
    searchInputEl.value = ''; // Clear search input
  });

  searchInputEl.addEventListener('input', () => {
    if (searchInputEl.value.length > 0) {
      searchResultsDiv.classList.remove('hidden');
      // In a real scenario, you'd fetch search results here
      // For now, just showing the results container
    } else {
      searchResultsDiv.classList.add('hidden');
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
