import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLink1Row,
    logoLink2Row,
    navigationLinksContainerRow, // This row is just a placeholder for the container, its content is not used directly
    searchIconImageRow,
    countryFlagImageRow,
    countryOptionsContainerRow, // This row is just a placeholder for the container, its content is not used directly
    ...itemRows
  ] = [...block.children];

  // The BlockJson indicates 7 root fields. The remaining rows are item rows.
  // The JS correctly destructures 7 root rows and then collects the rest into itemRows.

  // Content detection for item sub-components:
  // navigation-link has 1 child (the link)
  // country-option has 2 children (flag image and country name)
  const navigationLinks = itemRows.filter((row) => row.children.length === 1);
  const countryOptions = itemRows.filter((row) => row.children.length === 2);

  const header = document.createElement('header');
  header.classList.add('header-itc-header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');
  header.append(headerContainer);

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
  headerContainer.append(nav);

  // Navbar Toggler
  const toggler = document.createElement('button');
  toggler.classList.add('header-navbar-toggler', 'header-collapsed');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('header-navbar-toggler-icon');
  toggler.append(togglerSpan);
  nav.append(toggler);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('header-d-xl-none');
  dXlNone.innerHTML = '&nbsp;';
  nav.append(dXlNone);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  const logoImageWrapper = document.createElement('div');
  logoImageWrapper.classList.add('header-cmp-image', 'header-header-logo-div');
  logoDiv.append(logoImageWrapper);

  const logoLink1 = logoLink1Row.querySelector('a');
  const logoLink2 = logoLink2Row.querySelector('a');

  const logoLink1El = document.createElement('a');
  if (logoLink1) {
    logoLink1El.href = logoLink1.href;
    logoLink1El.target = '_blank';
    logoLink1El.classList.add('header-checkLogoLink');
    moveInstrumentation(logoLink1Row.firstElementChild, logoLink1El);
  }
  // The original HTML shows two distinct images for the two logo links.
  // The generated JS was reusing logoImage1 for logoLink2. Corrected to use the actual image from logoImageRow.
  const logoImage1 = logoImageRow.querySelector('picture');
  if (logoImage1) {
    const img1 = logoImage1.querySelector('img');
    // Assuming the first image in logoImageRow is for logoLink1
    const optimizedPic1 = createOptimizedPicture(img1.src, img1.alt, false, [{ width: '131' }]);
    moveInstrumentation(img1, optimizedPic1.querySelector('img'));
    logoLink1El.append(optimizedPic1);
  }
  const screenReaderSpan1 = document.createElement('span');
  screenReaderSpan1.classList.add('header-cmp-link__screen-reader-only');
  screenReaderSpan1.textContent = 'opens in a new tab';
  logoLink1El.append(screenReaderSpan1);
  logoImageWrapper.append(logoLink1El);

  const logoLink2El = document.createElement('a');
  if (logoLink2) {
    logoLink2El.href = logoLink2.href;
    logoLink2El.target = '_blank';
    logoLink2El.classList.add('header-cmp-image__link');
    moveInstrumentation(logoLink2Row.firstElementChild, logoLink2El);
  }
  // Corrected: Use the image from logoImageRow, assuming it's the only image and serves both links,
  // or if there were two images in logoImageRow, we'd pick the second.
  // Given the block structure, there's only one 'logo-image' field, so we reuse it.
  if (logoImage1) {
    const img2 = logoImage1.querySelector('img'); // Still using the same image from logoImageRow
    const optimizedPic2 = createOptimizedPicture(img2.src, img2.alt, false, [{ width: '131' }]);
    moveInstrumentation(img2, optimizedPic2.querySelector('img'));
    logoLink2El.append(optimizedPic2);
  }
  const screenReaderSpan2 = document.createElement('span');
  screenReaderSpan2.classList.add('header-cmp-link__screen-reader-only');
  screenReaderSpan2.textContent = 'opens in a new tab';
  logoLink2El.append(screenReaderSpan2);
  logoImageWrapper.append(logoLink2El);

  nav.append(logoDiv);

  // Navbar Collapse
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-collapse',
    'header-navbar-collapse',
    'header-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';
  nav.append(navbarCollapse);

  // Navigation Links
  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');
  navbarCollapse.append(navItemNavigation);

  const navigation = document.createElement('nav');
  navigation.id = 'navigation-6d5dcb0126';
  navigation.classList.add('header-cmp-navigation');
  navigation.setAttribute('role', 'navigation');
  navItemNavigation.append(navigation);

  const navigationGroup = document.createElement('ul');
  navigationGroup.classList.add('header-cmp-navigation__group');
  navigation.append(navigationGroup);

  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
    moveInstrumentation(row, li);
    // BlockJson for navigation-link has one field: 'link' (aem-content)
    const link = row.children[0].querySelector('a'); // Correctly reads the first (and only) cell
    if (link) {
      const linkEl = document.createElement('a');
      linkEl.classList.add('header-cmp-navigation__item-link');
      linkEl.href = link.href;
      linkEl.textContent = link.textContent;
      li.append(linkEl);
    }
    navigationGroup.append(li);
  });

  // Header Section (Search and Country Selector)
  const headerSection = document.createElement('div');
  headerSection.classList.add(
    'header-header-section',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-end',
  );
  navbarCollapse.append(headerSection);

  const searchCountryTrigger = document.createElement('div');
  searchCountryTrigger.classList.add(
    'header-search-icon',
    'header-country-selector-trigger',
    'header-d-flex',
    'header-align-items-center',
  );
  headerSection.append(searchCountryTrigger);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = 'IN'; // Default
  searchCountryTrigger.append(countryCodeSpan);

  const countryFlagImg = countryFlagImageRow.querySelector('picture > img');
  if (countryFlagImg) {
    const flagImgEl = document.createElement('img');
    flagImgEl.classList.add('header-header-country-flag');
    flagImgEl.src = countryFlagImg.src;
    flagImgEl.alt = countryFlagImg.alt;
    moveInstrumentation(countryFlagImageRow.firstElementChild, flagImgEl);
    searchCountryTrigger.append(flagImgEl);
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-dropdown-icon');
  searchCountryTrigger.append(dropdownIcon);

  // ITC Header Icon List (Search)
  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-icon-list');
  nav.append(itcHeaderIconList);

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
  const searchIconImg = searchIconImageRow.querySelector('picture > img');
  if (searchIconImg) {
    const imgEl = document.createElement('img');
    imgEl.loading = 'lazy';
    imgEl.src = searchIconImg.src;
    imgEl.alt = searchIconImg.alt;
    moveInstrumentation(searchIconImageRow.firstElementChild, imgEl);
    searchButton.append(imgEl);
  }
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774326218695.svg+xml';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');
  searchBlock.append(searchResults);

  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add('header-resultList');
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestionsH4);

  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add('header-resultList');
  pagesH4.textContent = 'Pages';
  searchResults.append(pagesH4);

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
  const searchIcon = document.createElement('img');
  searchIcon.loading = 'lazy';
  searchIcon.id = 'searchIcon';
  // Corrected: Ensure searchIcon.src is correctly pulled from searchIconImageRow
  searchIcon.src = searchIconImageRow.querySelector('picture > img').src;
  searchIcon.alt = searchIconImageRow.querySelector('picture > img').alt;
  searchNavLink.append(searchIcon);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchSpan);
  itcHeaderIconList.append(searchNavLink);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.id = 'countryModal';
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector');
  countryModal.tabIndex = -1;
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  header.append(countryModal);

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
  countryOptionsDiv.classList.add(
    'header-country-options',
    'header-d-flex',
    'header-justify-content-center',
    'header-align-items-center',
  );
  modalBody.append(countryOptionsDiv);

  countryOptions.forEach((row) => {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add(
      'header-country-option',
      'header-mx-3',
      'header-d-flex',
      'header-flex-column',
      'header-align-items-center',
    );
    moveInstrumentation(row, optionDiv);

    // BlockJson for country-option has two fields: 'flag-image' (reference) and 'country-name' (text)
    const flagImageCell = row.children[0];
    const countryNameCell = row.children[1];

    const flagImg = flagImageCell.querySelector('picture > img');
    if (flagImg) {
      const flagEl = document.createElement('img');
      flagEl.src = flagImg.src;
      flagEl.alt = flagImg.alt;
      flagEl.classList.add('header-country-flag');
      // Add a class based on country name for specific styling if needed, e.g., 'header-india-flag'
      const countryName = countryNameCell.textContent.toLowerCase();
      flagEl.classList.add(`header-${countryName}-flag`);
      moveInstrumentation(flagImageCell, flagEl);
      optionDiv.append(flagEl);
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-country-name');
    countryNameP.textContent = countryNameCell.textContent;
    moveInstrumentation(countryNameCell, countryNameP);
    optionDiv.append(countryNameP);

    // Add event listener for country option selection
    optionDiv.addEventListener('click', () => {
      // Update the displayed country code and flag
      countryCodeSpan.textContent = countryNameCell.textContent.substring(0, 2).toUpperCase();
      if (countryFlagImg) { // Update the main header flag
        countryFlagImg.src = flagImg.src;
        countryFlagImg.alt = flagImg.alt;
      }
      // Close the modal
      countryModal.classList.remove('header-show');
      countryModal.style.display = 'none';
      // Optionally, add 'header-selected' class to the clicked option and remove from others
      countryOptionsDiv.querySelectorAll('.header-country-option').forEach((opt) => {
        opt.classList.remove('header-selected');
      });
      optionDiv.classList.add('header-selected');
    });

    countryOptionsDiv.append(optionDiv);
  });

  // Event Listeners for interactive behavior
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('header-show');
    toggler.classList.toggle('header-collapsed');
    toggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('header-show'));
  });

  // The original HTML uses data-toggle="modal" and data-target="#countryModal"
  // The JS correctly implements this with addEventListener and classList.add/remove
  searchCountryTrigger.addEventListener('click', () => {
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

  // The original HTML has a search icon that toggles the search block
  searchNavLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-hidden');
    // Also toggle the search container visibility
    searchContainer.classList.toggle('header-hidden');
    searchResults.classList.add('header-hidden'); // Hide results when opening/closing search
  });

  // Close button for the search block
  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
    searchContainer.classList.add('header-hidden'); // Ensure search input is also hidden
    searchResults.classList.add('header-hidden'); // Ensure results are hidden
  });

  searchButton.addEventListener('click', () => {
    // Implement search functionality here
    console.log('Search button clicked for:', searchInput.value);
    // For demonstration, show search results (replace with actual search logic)
    searchResults.classList.remove('header-hidden');
  });

  block.textContent = '';
  block.append(header);
}
