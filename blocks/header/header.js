import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('header');
  headerSection.classList.add('header-itc-header-section');
  moveInstrumentation(block, headerSection);

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');
  headerSection.append(headerContainer);

  const navBar = document.createElement('nav');
  navBar.classList.add('header-navbar', 'header-navbar-expand-xl', 'header-navbar-light', 'header-bg-light', 'header-px-xl-5', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center');
  headerContainer.append(navBar);

  // Toggler Button
  const togglerButton = document.createElement('button');
  togglerButton.classList.add('header-navbar-toggler', 'header-collapsed');
  togglerButton.setAttribute('type', 'button');
  togglerButton.setAttribute('data-toggle', 'collapse');
  togglerButton.setAttribute('data-target', '#navbarSupportedContent');
  togglerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  togglerButton.setAttribute('aria-expanded', 'false');
  togglerButton.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('header-navbar-toggler-icon');
  togglerButton.append(togglerSpan);
  navBar.append(togglerButton);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('header-d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';
  navBar.append(dXlNoneDiv);

  // --- Content extraction from block.children --- //
  const rows = [...block.children];

  // Row 1: Logo Image, Logo Alt, Logo Link
  const logoRow = rows.shift(); // Assuming first row is logo data
  let logoImageSrc = '';
  let logoAltText = '';
  let logoLinkHref = '';
  if (logoRow) {
    const cells = [...logoRow.children];
    if (cells[0]) {
      logoImageSrc = cells[0].querySelector('img')?.src || '';
    }
    if (cells[1]) {
      logoAltText = cells[1].textContent.trim();
    }
    if (cells[2]) {
      logoLinkHref = cells[2].querySelector('a')?.href || '';
    }
  }

  // Logo Section
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  const logoLinkEl = document.createElement('a');
  logoLinkEl.classList.add('header-cmp-image__link');
  logoLinkEl.href = logoLinkHref;
  logoLinkEl.setAttribute('target', '_blank');

  if (logoImageSrc) {
    const optimizedLogoPic = createOptimizedPicture(logoImageSrc, logoAltText, false, [{ width: '131' }]);
    const imgEl = optimizedLogoPic.querySelector('img');
    if (imgEl) {
      imgEl.classList.add('header-cmp-image__image');
      imgEl.setAttribute('itemprop', 'contentUrl');
      imgEl.setAttribute('width', '131');
      imgEl.setAttribute('height', '71');
      imgEl.setAttribute('alt', logoAltText);
      imgEl.setAttribute('loading', 'lazy');
      moveInstrumentation(logoRow.querySelector('img') || logoRow.children[0], imgEl);
    }
    logoLinkEl.append(optimizedLogoPic);
  }
  const screenReaderOnlySpan = document.createElement('span');
  screenReaderOnlySpan.classList.add('header-cmp-link__screen-reader-only');
  screenReaderOnlySpan.textContent = 'opens in a new tab';
  logoLinkEl.append(screenReaderOnlySpan);
  logoDiv.append(logoLinkEl);
  navBar.append(logoDiv);

  // Navigation collapse div
  const navCollapseDiv = document.createElement('div');
  navCollapseDiv.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  navCollapseDiv.setAttribute('id', 'navbarSupportedContent');
  navBar.append(navCollapseDiv);

  const navItemDiv = document.createElement('div');
  navItemDiv.classList.add('header-nav-item', 'header-navigation');
  navCollapseDiv.append(navItemDiv);

  const navEl = document.createElement('nav');
  navEl.setAttribute('id', 'navigation-6d5dcb0126'); // Keep ID from source if it's static
  navEl.classList.add('header-cmp-navigation');
  navEl.setAttribute('itemscope', '');
  navEl.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  navEl.setAttribute('role', 'navigation');
  navItemDiv.append(navEl);

  const navUl = document.createElement('ul');
  navUl.classList.add('header-cmp-navigation__group');
  navEl.append(navUl);

  // Navigation Links (dynamic)
  // Assuming navLinks are in subsequent rows, each row is one link
  // The Block JSON defines 'navLinks' as a container, so it's likely one cell with multiple links, or multiple rows.
  // Given the HTML, it's a list. Let's assume each row after logo is a nav link until country code.
  let navLinksEndIndex = 0;
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const cells = [...row.children];
    const linkEl = cells[0]?.querySelector('a');
    if (linkEl) {
      const li = document.createElement('li');
      moveInstrumentation(row, li); // Transfer instrumentation from the row to the new li
      li.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
      const a = document.createElement('a');
      a.classList.add('header-cmp-navigation__item-link');
      a.href = linkEl.href;
      a.textContent = linkEl.textContent.trim();
      li.append(a);
      navUl.append(li);
      navLinksEndIndex = i;
    } else {
      // Stop if it's not a nav link (e.g., country code starts)
      break;
    }
  }
  rows.splice(0, navLinksEndIndex + 1); // Remove processed nav link rows

  const headerSectionRight = document.createElement('div');
  headerSectionRight.classList.add('header-header-section', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');
  navCollapseDiv.append(headerSectionRight);

  // Row for Country Code and Flag
  const countryCodeFlagRow = rows.shift();
  let countryCodeText = '';
  let countryFlagSrc = '';
  if (countryCodeFlagRow) {
    const cells = [...countryCodeFlagRow.children];
    if (cells[0]) {
      countryCodeText = cells[0].textContent.trim();
    }
    if (cells[1]) {
      countryFlagSrc = cells[1].querySelector('img')?.src || '';
    }
  }

  // Country Selector Trigger
  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('header-search-icon', 'header-country-selector-trigger', 'header-d-flex', 'header-align-items-center');
  countrySelectorTrigger.setAttribute('data-toggle', 'modal');
  countrySelectorTrigger.setAttribute('data-target', '#countryModal');
  countrySelectorTrigger.setAttribute('data-flag-in', '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp'); // Hardcoded from source
  countrySelectorTrigger.setAttribute('data-flag-usa', '/content/dam/aemigrate/uploaded-folder/image/usa-fmt-webp-alpha.webp'); // Hardcoded from source

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = countryCodeText;
  countrySelectorTrigger.append(countryCodeSpan);

  if (countryFlagSrc) {
    const countryFlagImg = document.createElement('img');
    countryFlagImg.classList.add('header-country-flag');
    countryFlagImg.src = countryFlagSrc;
    countryFlagImg.alt = 'flag';
    countrySelectorTrigger.append(countryFlagImg);
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/kitchens-of-india/placeholders/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-dropdown-icon');
  countrySelectorTrigger.append(dropdownIcon);
  headerSectionRight.append(countrySelectorTrigger);

  // Search and Cart Icons (Hardcoded from source HTML structure for now)
  const iconListDiv = document.createElement('div');
  iconListDiv.classList.add('header-itc-header-icon-list');

  const searchBlock = document.createElement('div');
  searchBlock.setAttribute('id', 'searchBlock');
  searchBlock.classList.add('header-search-block', 'header-hidden');
  searchBlock.innerHTML = `
    <div id="searchBox" class="header-search-box">    
        <div id="searchContainer" class="header-search-container header-hidden">
            <input type="text" id="searchInput" placeholder="Search">
            <button id="searchButton">
                <img loading="lazy" src="/content/dam/kitchens-of-india/placeholders/search-icon.png" alt="Search icon">
            </button>
        </div>
        <img id="closeButton" loading="lazy" src="/content/dam/kitchens-of-india/placeholders/vector-four.svg" alt="Close icon">
    </div>
    <div id="searchResults" class="header-search-results header-hidden">
        <h4 class="header-resultList">Popular Suggestions</h4>
        <ul id="suggestionsList"></ul>
        <h4 class="header-resultList">Pages</h4>
        <ul id="productsList" class="header-products"></ul>
        <button id="viewAllButton">VIEW ALL ITEMS</button>
    </div>
  `;
  iconListDiv.append(searchBlock);

  const searchLink = document.createElement('a');
  searchLink.classList.add('header-nav-link');
  searchLink.innerHTML = `
    <img loading="lazy" id="searchIcon" src="/content/dam/kitchens-of-india/placeholders/search-icon.png" alt="Search icon">
    <span class="header-d-block">Search</span>
  `;
  iconListDiv.append(searchLink);

  const cartLi = document.createElement('li');
  cartLi.classList.add('header-nav-item');
  cartLi.innerHTML = '<a class="header-nav-link"></a>';
  iconListDiv.append(cartLi);

  navBar.append(iconListDiv);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector', 'header-show');
  countryModal.setAttribute('id', 'countryModal');
  countryModal.setAttribute('tabindex', '-1');
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'block'; // Keep display block as in source HTML

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

  // Modal Title
  const modalTitleRow = rows.shift();
  if (modalTitleRow) {
    const h2ModalTitle = document.createElement('h2');
    h2ModalTitle.classList.add('header-modal-title');
    h2ModalTitle.innerHTML = modalTitleRow.children[0]?.innerHTML || '';
    modalHeaderW100.append(h2ModalTitle);
  }

  // Modal Experience Text
  const modalExperienceTextRow = rows.shift();
  if (modalExperienceTextRow) {
    const pExperienceText = document.createElement('p');
    pExperienceText.classList.add('header-experience-text');
    pExperienceText.textContent = modalExperienceTextRow.children[0]?.textContent.trim() || '';
    modalHeaderW100.append(pExperienceText);
  }

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
  modalBody.append(countryOptionsDiv);

  // Country Options (dynamic)
  rows.forEach((row) => {
    const cells = [...row.children];
    const flagSrc = cells[0]?.querySelector('img')?.src || '';
    const countryName = cells[1]?.textContent.trim() || '';
    const countryUrl = cells[2]?.querySelector('a')?.href || '';

    const countryOption = document.createElement('div');
    moveInstrumentation(row, countryOption); // Transfer instrumentation from the row to the new div
    countryOption.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
    countryOption.setAttribute('data-country', countryName.toLowerCase());
    countryOption.setAttribute('data-url', countryUrl);

    if (flagSrc) {
      const flagImg = document.createElement('img');
      flagImg.src = flagSrc;
      flagImg.alt = `${countryName} Flag`;
      flagImg.classList.add('header-country-flag', `header-${countryName.toLowerCase()}-flag`);
      countryOption.append(flagImg);
    }

    const pCountryName = document.createElement('p');
    pCountryName.classList.add('header-country-name');
    pCountryName.textContent = countryName;
    countryOption.append(pCountryName);

    countryOptionsDiv.append(countryOption);
  });

  headerSection.append(countryModal);

  block.textContent = '';
  block.append(headerSection);
}
