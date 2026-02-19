import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('header');
  headerSection.classList.add('header-section');
  moveInstrumentation(block, headerSection);

  const container = document.createElement('div');
  container.classList.add('container');
  headerSection.append(container);

  const nav = document.createElement('nav');
  nav.classList.add('header-navbar', 'navbar', 'navbar-expand-xl', 'navbar-light', 'bg-light', 'px-xl-5', 'd-flex', 'justify-content-between', 'align-items-center');
  container.append(nav);

  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('navbar-toggler', 'collapsed');
  navbarToggler.setAttribute('type', 'button');
  navbarToggler.setAttribute('data-toggle', 'collapse');
  navbarToggler.setAttribute('data-target', '#navbarSupportedContent');
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  navbarToggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
  nav.append(navbarToggler);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('d-xl-none');
  dXlNone.innerHTML = '&nbsp;';
  nav.append(dXlNone);

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.classList.add('header-logo-div', 'image');
  nav.append(headerLogoDiv);

  const collapseDiv = document.createElement('div');
  collapseDiv.classList.add('collapse', 'navbar-collapse', 'justify-content-center');
  collapseDiv.setAttribute('id', 'navbarSupportedContent');
  nav.append(collapseDiv);

  const headerSectionWrapper = document.createElement('div');
  headerSectionWrapper.classList.add('header-section-wrapper', 'd-flex', 'align-items-center', 'justify-content-end');
  collapseDiv.append(headerSectionWrapper);

  const headerItcHeaderIconList = document.createElement('div');
  headerItcHeaderIconList.classList.add('header-itc-header-icon-list');
  nav.append(headerItcHeaderIconList);

  const countryModal = document.createElement('div');
  countryModal.classList.add('modal', 'fade', 'header-country-selector', 'show');
  countryModal.setAttribute('id', 'countryModal');
  countryModal.setAttribute('tabindex', '-1');
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'block';
  headerSection.append(countryModal);

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

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalContent.append(modalBody);

  const headerCountryOptions = document.createElement('div');
  headerCountryOptions.classList.add('header-country-options', 'd-flex', 'justify-content-center', 'align-items-center');
  modalBody.append(headerCountryOptions);

  let logo1Img = null;
  let logo2Img = null;
  const navigationLinks = [];
  let countryFlagImg = null;
  let countryCodeText = '';
  const countryOptions = [];

  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) { // Assuming the first row contains header data
      [...row.children].forEach((cell, cellIndex) => {
        if (cellIndex === 0) { // Logo 1
          const img = cell.querySelector('img');
          const link = cell.querySelector('a');
          if (img) {
            logo1Img = { img, link };
          }
        } else if (cellIndex === 1) { // Logo 2
          const img = cell.querySelector('img');
          const link = cell.querySelector('a');
          if (img) {
            logo2Img = { img, link };
          }
        } else if (cellIndex === 2) { // Navigation Links
          const navItems = cell.querySelectorAll('li.cmp-navigation__item');
          navItems.forEach((item) => {
            const link = item.querySelector('a.cmp-navigation__item-link');
            if (link) {
              navigationLinks.push({
                label: link.textContent,
                href: link.href,
              });
            }
          });
        } else if (cellIndex === 3) { // Current Country Flag and Code
          const img = cell.querySelector('img.header-country-flag');
          const code = cell.querySelector('span.country-code');
          if (img) {
            countryFlagImg = img;
          }
          if (code) {
            countryCodeText = code.textContent;
          }
        } else if (cellIndex === 4) { // Country Options
          const options = cell.querySelectorAll('div.header-country-option');
          options.forEach((option) => {
            const img = option.querySelector('img.header-country-flag');
            const name = option.querySelector('p.header-country-name');
            const url = option.dataset.url;
            if (img && name && url) {
              countryOptions.push({
                flag: img,
                name: name.textContent,
                url,
              });
            }
          });
        }
      });
    }
  });

  // Populate Logo 1
  if (logo1Img) {
    const logoLinkId = document.createElement('input');
    logoLinkId.setAttribute('type', 'hidden');
    logoLinkId.setAttribute('value', logo1Img.link ? logo1Img.link.href : '');
    logoLinkId.setAttribute('id', 'logoLinkId');
    headerLogoDiv.append(logoLinkId);

    const headerCheckLogoLink = document.createElement('a');
    headerCheckLogoLink.classList.add('header-check-logo-link');
    if (logo1Img.link && logo1Img.link.target) {
      headerCheckLogoLink.setAttribute('target', logo1Img.link.target);
    }
    if (logo1Img.link && logo1Img.link.href) {
      headerCheckLogoLink.href = logo1Img.link.href;
    }

    const optimizedPic = createOptimizedPicture(logo1Img.img.src, logo1Img.img.alt);
    moveInstrumentation(logo1Img.img, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('cmp-image__image', 'header-itc-logo-image');
    optimizedPic.querySelector('img').setAttribute('itemprop', 'contentUrl');
    headerCheckLogoLink.append(optimizedPic);

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    headerCheckLogoLink.append(screenReaderOnly);
    headerLogoDiv.append(headerCheckLogoLink);
  }

  // Populate Logo 2
  if (logo2Img) {
    const cmpImageLink = document.createElement('a');
    cmpImageLink.classList.add('cmp-image__link');
    if (logo2Img.link && logo2Img.link.href) {
      cmpImageLink.href = logo2Img.link.href;
    }
    if (logo2Img.link && logo2Img.link.target) {
      cmpImageLink.setAttribute('target', logo2Img.link.target);
    }

    const optimizedPic = createOptimizedPicture(logo2Img.img.src, logo2Img.img.alt, logo2Img.img.width, logo2Img.img.height);
    moveInstrumentation(logo2Img.img, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('cmp-image__image');
    optimizedPic.querySelector('img').setAttribute('itemprop', 'contentUrl');
    cmpImageLink.append(optimizedPic);

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    cmpImageLink.append(screenReaderOnly);
    headerLogoDiv.append(cmpImageLink);
  }

  // Populate Navigation Links
  if (navigationLinks.length > 0) {
    const navItemDiv = document.createElement('div');
    navItemDiv.classList.add('nav-item', 'navigation');
    collapseDiv.append(navItemDiv);

    const navElement = document.createElement('nav');
    navElement.setAttribute('id', 'navigation-6d5dcb0126'); // Static ID from HTML
    navElement.classList.add('cmp-navigation');
    navElement.setAttribute('itemscope', '');
    navElement.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
    navElement.setAttribute('role', 'navigation');
    navItemDiv.append(navElement);

    const ul = document.createElement('ul');
    ul.classList.add('cmp-navigation__group');
    navElement.append(ul);

    navigationLinks.forEach((linkData) => {
      const li = document.createElement('li');
      li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
      ul.append(li);

      const link = document.createElement('a');
      link.classList.add('cmp-navigation__item-link');
      link.href = linkData.href;
      link.textContent = linkData.label;
      li.append(link);
    });
  }

  // Populate Current Country Flag and Code
  if (countryFlagImg || countryCodeText) {
    const searchIconCountrySelectorTrigger = document.createElement('div');
    searchIconCountrySelectorTrigger.classList.add('search-icon', 'country-selector-trigger', 'd-flex', 'align-items-center');
    searchIconCountrySelectorTrigger.setAttribute('data-toggle', 'modal');
    searchIconCountrySelectorTrigger.setAttribute('data-target', '#countryModal');
    searchIconCountrySelectorTrigger.setAttribute('data-flag-in', '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp'); // Static values from HTML
    searchIconCountrySelectorTrigger.setAttribute('data-flag-usa', '/content/dam/aemigrate/uploaded-folder/image/usa-fmt-webp-alpha.webp'); // Static values from HTML
    headerSectionWrapper.append(searchIconCountrySelectorTrigger);

    const countryCodeSpan = document.createElement('span');
    countryCodeSpan.classList.add('country-code');
    countryCodeSpan.textContent = countryCodeText;
    searchIconCountrySelectorTrigger.append(countryCodeSpan);

    if (countryFlagImg) {
      const optimizedPic = createOptimizedPicture(countryFlagImg.src, countryFlagImg.alt);
      moveInstrumentation(countryFlagImg, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('header-country-flag');
      searchIconCountrySelectorTrigger.append(optimizedPic);
    }

    const dropdownIcon = document.createElement('img');
    dropdownIcon.setAttribute('src', '/content/dam/kitchens-of-india/placeholders/dropdown-icon.png'); // Static value from HTML
    dropdownIcon.setAttribute('alt', 'dropdown-icon');
    dropdownIcon.classList.add('dropdown-icon');
    searchIconCountrySelectorTrigger.append(dropdownIcon);
  }

  // Populate Country Options
  if (countryOptions.length > 0) {
    countryOptions.forEach((optionData, index) => {
      const headerCountryOption = document.createElement('div');
      headerCountryOption.classList.add('header-country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');
      headerCountryOption.setAttribute('data-country', optionData.name.toLowerCase());
      headerCountryOption.setAttribute('data-url', optionData.url);
      if (index === 0) { // Assuming the first option is 'selected' based on HTML
        headerCountryOption.classList.add('selected');
      }
      headerCountryOptions.append(headerCountryOption);

      const optimizedPic = createOptimizedPicture(optionData.flag.src, `${optionData.name} Flag`);
      moveInstrumentation(optionData.flag, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('header-country-flag', `header-${optionData.name.toLowerCase()}-flag`);
      headerCountryOption.append(optimizedPic);

      const countryName = document.createElement('p');
      countryName.classList.add('header-country-name');
      countryName.textContent = optionData.name;
      headerCountryOption.append(countryName);
    });
  }

  // Add static search block and search icon
  const searchBlock = document.createElement('div');
  searchBlock.setAttribute('id', 'searchBlock');
  searchBlock.classList.add('header-search-block', 'hidden');
  searchBlock.innerHTML = `
    <div id="searchBox" class="header-search-box">
        <div id="searchContainer" class="header-search-container hidden">
            <input type="text" id="searchInput" placeholder="Search">
            <button id="searchButton">
                <img loading="lazy" src="/content/dam/kitchens-of-india/placeholders/search-icon.png" alt="Search icon">
            </button>
        </div>
        <img id="closeButton" loading="lazy" src="/content/dam/kitchens-of-india/placeholders/vector-four.svg" alt="Close icon">
    </div>
    <div id="searchResults" class="header-search-results hidden">
        <h4 class="header-result-list">Popular Suggestions</h4>
        <ul id="suggestionsList"></ul>
        <h4 class="header-result-list">Pages</h4>
        <ul id="productsList" class="header-products"></ul>
        <button id="viewAllButton">VIEW ALL ITEMS</button>
    </div>
  `;
  headerItcHeaderIconList.append(searchBlock);

  const searchLink = document.createElement('a');
  searchLink.classList.add('nav-link');
  searchLink.innerHTML = `
    <img loading="lazy" id="searchIcon" src="/content/dam/kitchens-of-india/placeholders/search-icon.png" alt="Search icon">
    <span class="d-block">Search</span>
  `;
  headerItcHeaderIconList.append(searchLink);

  const navItemLi = document.createElement('li');
  navItemLi.classList.add('nav-item');
  navItemLi.innerHTML = '<a class="nav-link"></a>';
  headerItcHeaderIconList.append(navItemLi);

  w100.innerHTML = `
    <h2 class="header-modal-title">SELECT YOUR <br>KITCHENS OF INDIA</h2>
    <p class="header-experience-text">Experience</p>
  `;

  block.textContent = '';
  block.append(headerSection);
}
