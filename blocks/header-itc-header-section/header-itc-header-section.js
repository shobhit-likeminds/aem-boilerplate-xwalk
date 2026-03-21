import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'header-itc-header-section';

  // Destructure root model fields based on BlockJson
  const [
    logoImageRow,
    logoLink1Row,
    logoLink2Row,
    navItemsContainerRow, // This is the container for nav items
    countryFlagInRow,
    countryFlagUsaRow,
    countryOptionsContainerRow, // This is the container for country options
    searchIconRow,
    dropdownIconRow,
    ...itemRows // Remaining rows are actual navItem or countryOption items
  ] = [...block.children];

  // Filter item rows based on the number of children (cells) to distinguish item types
  const navItems = itemRows.filter((row) => row.children.length === 2); // navItem has 2 cells (label, link)
  const countryOptions = itemRows.filter((row) => row.children.length === 3); // countryOption has 3 cells (flag, countryName, url)

  const headerContainer = document.createElement('div');
  headerContainer.classList.add(`${blockName}-container`);

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

  // Navbar Toggler
  const toggler = document.createElement('button');
  toggler.classList.add(`${blockName}-navbar-toggler`, `${blockName}-collapsed`);
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add(`${blockName}-navbar-toggler-icon`);
  toggler.append(togglerIcon);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add(`${blockName}-d-xl-none`);

  // Logo Section
  const logoDiv = document.createElement('div');
  logoDiv.classList.add(`${blockName}-logo`, `${blockName}-image`);

  const logoImagePicture = logoImageRow.querySelector('picture');
  if (logoImagePicture) {
    const logoImg = logoImagePicture.querySelector('img');
    const logoLink1 = logoLink1Row.querySelector('div')?.textContent.trim();
    const logoLink2 = logoLink2Row.querySelector('div')?.textContent.trim();

    const logoLink1El = document.createElement('a');
    logoLink1El.classList.add(`${blockName}-checkLogoLink`);
    logoLink1El.target = '_blank';
    if (logoLink1) logoLink1El.href = logoLink1;
    moveInstrumentation(logoLink1Row.firstElementChild, logoLink1El);
    logoLink1El.append(logoImg.cloneNode(true)); // Clone the image for the first link
    const span1 = document.createElement('span');
    span1.classList.add(`${blockName}-cmp-link__screen-reader-only`);
    span1.textContent = 'opens in a new tab';
    logoLink1El.append(span1);

    const logoLink2El = document.createElement('a');
    logoLink2El.classList.add(`${blockName}-cmp-image__link`);
    logoLink2El.target = '_blank';
    if (logoLink2) logoLink2El.href = logoLink2;
    moveInstrumentation(logoLink2Row.firstElementChild, logoLink2El);
    const clonedImg2 = logoImg.cloneNode(true);
    clonedImg2.classList.add(`${blockName}-cmp-image__image`);
    clonedImg2.setAttribute('itemprop', 'contentUrl');
    logoLink2El.append(clonedImg2);
    const span2 = document.createElement('span');
    span2.classList.add(`${blockName}-cmp-link__screen-reader-only`);
    span2.textContent = 'opens in a new tab';
    logoLink2El.append(span2);

    logoDiv.append(logoLink1El, logoLink2El);
  }

  // Navbar Collapse
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    `${blockName}-collapse`,
    `${blockName}-navbar-collapse`,
    `${blockName}-justify-content-center`,
  );
  navbarCollapse.id = 'navbarSupportedContent';

  // Navigation Items
  const navItemDiv = document.createElement('div');
  navItemDiv.classList.add(`${blockName}-nav-item`, `${blockName}-navigation`);
  const navCmpNavigation = document.createElement('nav');
  navCmpNavigation.classList.add(`${blockName}-cmp-navigation`);
  navCmpNavigation.setAttribute('itemscope', '');
  navCmpNavigation.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  navCmpNavigation.setAttribute('role', 'navigation');
  const navUl = document.createElement('ul');
  navUl.classList.add(`${blockName}-cmp-navigation__group`);

  navItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add(`${blockName}-cmp-navigation__item`, `${blockName}-cmp-navigation__item--level-0`);
    const linkEl = document.createElement('a');
    linkEl.classList.add(`${blockName}-cmp-navigation__item-link`);

    const labelCell = row.children[0];
    const linkCell = row.children[1];

    if (labelCell) {
      moveInstrumentation(labelCell, linkEl);
      linkEl.textContent = labelCell.textContent.trim();
    }
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
      } else {
        linkEl.href = linkCell.textContent.trim();
      }
    }
    li.append(linkEl);
    navUl.append(li);
  });
  navCmpNavigation.append(navUl);
  navItemDiv.append(navCmpNavigation);

  // Header Section with Country Selector and Search
  const headerSectionDiv = document.createElement('div');
  headerSectionDiv.classList.add(
    `${blockName}-header-section`,
    `${blockName}-d-flex`,
    `${blockName}-align-items-center`,
    `${blockName}-justify-content-end`,
  );

  // Country Selector
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
  const countryFlagInPicture = countryFlagInRow.querySelector('picture');
  if (countryFlagInPicture) {
    const img = countryFlagInPicture.querySelector('img');
    countryFlagImg.src = img.src;
    countryFlagImg.alt = img.alt;
    moveInstrumentation(countryFlagInPicture, countryFlagImg);
  }

  const dropdownIconImg = document.createElement('img');
  dropdownIconImg.classList.add(`${blockName}-dropdown-icon`);
  const dropdownIconPicture = dropdownIconRow.querySelector('picture');
  if (dropdownIconPicture) {
    const img = dropdownIconPicture.querySelector('img');
    dropdownIconImg.src = img.src;
    dropdownIconImg.alt = img.alt;
    moveInstrumentation(dropdownIconPicture, dropdownIconImg);
  }

  countrySelectorTrigger.append(countryCodeSpan, countryFlagImg, dropdownIconImg);
  headerSectionDiv.append(countrySelectorTrigger);

  navbarCollapse.append(navItemDiv, headerSectionDiv);

  // ITC Header Icon List (Search)
  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add(`${blockName}-itc-header-icon-list`);

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

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchIconImg = document.createElement('img');
  const searchIconPicture = searchIconRow.querySelector('picture');
  if (searchIconPicture) {
    const img = searchIconPicture.querySelector('img');
    searchIconImg.loading = 'lazy';
    searchIconImg.src = img.src;
    searchIconImg.alt = img.alt;
    moveInstrumentation(searchIconPicture, searchIconImg);
  }
  searchButton.append(searchIconImg);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  // Assuming close button image is hardcoded or needs to be fetched from another source
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774105483904.svg+xml';
  closeButton.alt = 'Close icon';

  searchContainer.append(searchInput, searchButton);
  searchBox.append(searchContainer, closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add(`${blockName}-search-results`, `${blockName}-hidden`);

  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add(`${blockName}-resultList`);
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.id = 'suggestionsList';

  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add(`${blockName}-resultList`);
  pagesH4.textContent = 'Pages';
  const productsListUl = document.createElement('ul');
  productsListUl.id = 'productsList';
  productsListUl.classList.add(`${blockName}-products`);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';

  searchResults.append(
    popularSuggestionsH4,
    suggestionsListUl,
    pagesH4,
    productsListUl,
    viewAllButton,
  );
  searchBlock.append(searchBox, searchResults);

  const searchNavLink = document.createElement('a');
  searchNavLink.classList.add(`${blockName}-nav-link`);
  searchNavLink.id = 'searchIconTrigger'; // Add an ID to trigger search

  const searchIconImgNavLink = document.createElement('img');
  searchIconImgNavLink.loading = 'lazy';
  if (searchIconPicture) {
    const img = searchIconPicture.querySelector('img');
    searchIconImgNavLink.src = img.src;
    searchIconImgNavLink.alt = img.alt;
  }
  searchIconImgNavLink.id = 'searchIcon';

  const searchSpan = document.createElement('span');
  searchSpan.classList.add(`${blockName}-d-block`);
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchIconImgNavLink, searchSpan);

  itcHeaderIconList.append(searchBlock, searchNavLink);

  nav.append(toggler, dXlNoneDiv, logoDiv, navbarCollapse, itcHeaderIconList);
  headerContainer.append(nav);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add(`${blockName}-modal`, `${blockName}-fade`, `${blockName}-itc-country-selector`);
  countryModal.id = 'countryModal';
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add(`${blockName}-modal-dialog`, `${blockName}-modal-dialog-centered`);
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add(`${blockName}-modal-content`);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add(`${blockName}-modal-header`, `${blockName}-border-0`, `${blockName}-text-center`);
  const modalHeaderW100 = document.createElement('div');
  modalHeaderW100.classList.add(`${blockName}-w-100`);
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add(`${blockName}-modal-title`);
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  const experienceText = document.createElement('p');
  experienceText.classList.add(`${blockName}-experience-text`);
  experienceText.textContent = 'Experience';
  modalHeaderW100.append(modalTitle, experienceText);
  modalHeader.append(modalHeaderW100);

  const modalBody = document.createElement('div');
  modalBody.classList.add(`${blockName}-modal-body`);
  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add(
    `${blockName}-country-options`,
    `${blockName}-d-flex`,
    `${blockName}-justify-content-center`,
    `${blockName}-align-items-center`,
  );

  countryOptions.forEach((row, index) => {
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add(
      `${blockName}-country-option`,
      `${blockName}-mx-3`,
      `${blockName}-d-flex`,
      `${blockName}-flex-column`,
      `${blockName}-align-items-center`,
    );
    if (index === 0) {
      countryOptionDiv.classList.add(`${blockName}-selected`);
    }

    const flagCell = row.children[0];
    const countryNameCell = row.children[1];
    const urlCell = row.children[2];

    const flagImg = document.createElement('img');
    flagImg.classList.add(`${blockName}-country-flag`);
    const flagPicture = flagCell.querySelector('picture');
    if (flagPicture) {
      const img = flagPicture.querySelector('img');
      flagImg.src = img.src;
      flagImg.alt = img.alt;
      moveInstrumentation(flagPicture, flagImg);
    }
    flagImg.classList.add(index === 0 ? `${blockName}-india-flag` : `${blockName}-usa-flag`);

    const countryNameP = document.createElement('p');
    countryNameP.classList.add(`${blockName}-country-name`);
    if (countryNameCell) {
      moveInstrumentation(countryNameCell, countryNameP);
      countryNameP.textContent = countryNameCell.textContent.trim();
    }

    if (urlCell) {
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        countryOptionDiv.setAttribute('data-url', foundLink.href);
      } else {
        countryOptionDiv.setAttribute('data-url', urlCell.textContent.trim());
      }
    }
    countryOptionDiv.setAttribute('data-country', countryNameP.textContent.trim().toLowerCase());

    countryOptionDiv.append(flagImg, countryNameP);
    countryOptionsDiv.append(countryOptionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalHeader, modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);

  // Event Listeners
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
  });

  countrySelectorTrigger.addEventListener('click', () => {
    countryModal.classList.add('show');
    countryModal.style.display = 'block';
  });

  // Close modal when clicking outside or on the modal itself
  countryModal.addEventListener('click', (e) => {
    if (e.target === countryModal) {
      countryModal.classList.remove('show');
      countryModal.style.display = 'none';
    }
  });

  searchNavLink.addEventListener('click', () => {
    searchBlock.classList.toggle(`${blockName}-hidden`);
    searchContainer.classList.toggle(`${blockName}-hidden`);
    searchResults.classList.add(`${blockName}-hidden`); // Hide results when opening search
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add(`${blockName}-hidden`);
    searchContainer.classList.add(`${blockName}-hidden`);
    searchResults.classList.add(`${blockName}-hidden`);
  });

  searchButton.addEventListener('click', () => {
    searchResults.classList.remove(`${blockName}-hidden`);
    // Placeholder for actual search logic
    suggestionsListUl.innerHTML = '';
    productsListUl.innerHTML = '';
    const query = searchInput.value.trim();
    if (query) {
      // Simulate search results
      ['Suggestion 1', 'Suggestion 2'].forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        suggestionsListUl.append(li);
      });
      ['Product A', 'Product B'].forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        productsListUl.append(li);
      });
    }
  });

  [...countryOptionsDiv.children].forEach((option) => {
    option.addEventListener('click', () => {
      [...countryOptionsDiv.children].forEach((opt) => opt.classList.remove(`${blockName}-selected`));
      option.classList.add(`${blockName}-selected`);
      countryCodeSpan.textContent = option.dataset.country.toUpperCase();
      const selectedFlagImg = option.querySelector('img');
      countryFlagImg.src = selectedFlagImg.src;
      countryFlagImg.alt = selectedFlagImg.alt;
      // In a real scenario, you'd navigate or update content based on the selected country
      // window.location.href = option.dataset.url;
      countryModal.classList.remove('show');
      countryModal.style.display = 'none';
    });
  });

  block.textContent = '';
  block.append(headerContainer, countryModal);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
