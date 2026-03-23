import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson
  const [
    logoImageRow,
    logoLinkRow,
    navigationLinksContainerRow, // This is a container, not individual links
    countryFlagInRow,
    countryFlagUsaRow,
    countryOptionsContainerRow, // This is a container, not individual options
    searchIconRow,
    ...itemRows // Remaining rows are item sub-components
  ] = [...block.children];

  // Filter item rows into their respective sub-component types
  // navigationLink has 2 cells, the first containing an <a> tag
  const navigationLinks = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('a'),
  );
  // countryOption has 2 cells, the first containing a <picture> tag
  const countryOptions = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('picture'),
  );

  const header = document.createElement('header');
  header.classList.add('header-itc-header-section');

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

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
  container.append(nav);

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

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('header-d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';
  nav.append(dXlNoneDiv);

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.classList.add('header-logo', 'header-image');
  nav.append(headerLogoDiv);

  const logoLinkEl = document.createElement('a');
  const logoLinkHref = logoLinkRow.querySelector('div')?.textContent.trim();
  if (logoLinkHref) {
    logoLinkEl.href = logoLinkHref;
    logoLinkEl.target = '_blank';
  }
  logoLinkEl.classList.add('cmp-image__link');
  moveInstrumentation(logoLinkRow, logoLinkEl);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const optimizedPic = createOptimizedPicture(
        logoImg.src,
        logoImg.alt,
        false,
        [{ width: '131' }],
      );
      moveInstrumentation(logoImg, optimizedPic.querySelector('img'));
      logoLinkEl.append(optimizedPic);
    }
  }
  headerLogoDiv.append(logoLinkEl);
  moveInstrumentation(logoImageRow, logoLinkEl);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-collapse',
    'header-navbar-collapse',
    'header-justify-content-center',
  );
  navbarCollapse.id = 'navbarSupportedContent';
  nav.append(navbarCollapse);

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');
  navbarCollapse.append(navItemNavigation);

  const navigationCmp = document.createElement('nav');
  navigationCmp.classList.add('cmp-navigation');
  navigationCmp.setAttribute('role', 'navigation');
  navItemNavigation.append(navigationCmp);

  const navigationUl = document.createElement('ul');
  navigationUl.classList.add('cmp-navigation__group');
  navigationCmp.append(navigationUl);

  navigationLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    moveInstrumentation(row, li);

    // navigationLink model has fields: link (aem-content), text (text)
    const linkCell = row.children[0]; // This cell contains the <a> tag or just text for the link
    const textCell = row.children[1]; // This cell contains the display text

    const linkEl = document.createElement('a');
    linkEl.classList.add('cmp-navigation__item-link');
    const linkHref = linkCell.querySelector('a')
      ? linkCell.querySelector('a').href
      : linkCell.textContent.trim(); // Fallback to text content if no <a>
    if (linkHref) {
      linkEl.href = linkHref;
    }
    moveInstrumentation(linkCell, linkEl);
    linkEl.textContent = textCell.textContent.trim();
    li.append(linkEl);
    navigationUl.append(li);
  });

  const headerSectionRight = document.createElement('div');
  headerSectionRight.classList.add(
    'header-header-section',
    'header-d-flex',
    'header-align-items-center',
    'header-justify-content-end',
  );
  navbarCollapse.append(headerSectionRight);

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add(
    'header-search-icon',
    'header-country-selector-trigger',
    'header-d-flex',
    'header-align-items-center',
  );
  headerSectionRight.append(countrySelectorTrigger);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = 'IN'; // Default to IN as per original HTML
  countrySelectorTrigger.append(countryCodeSpan);

  const countryFlagImg = countryFlagInRow.querySelector('img');
  if (countryFlagImg) {
    const flagImg = document.createElement('img');
    flagImg.classList.add('header-header-country-flag');
    flagImg.src = countryFlagImg.src;
    flagImg.alt = countryFlagImg.alt;
    countrySelectorTrigger.append(flagImg);
    moveInstrumentation(countryFlagInRow, flagImg);
  }

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.classList.add('header-dropdown-icon');
  countrySelectorTrigger.append(dropdownIcon);

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
  searchContainer.append(searchButton);

  const searchIconImg = searchIconRow.querySelector('img');
  if (searchIconImg) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = searchIconImg.src;
    img.alt = searchIconImg.alt;
    searchButton.append(img);
    moveInstrumentation(searchIconRow, img);
  }

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.src = '/content/dam/aemigrate/uploaded-folder/image/1774262332655.svg+xml';
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

  const searchNavLink = document.createElement('a');
  searchNavLink.classList.add('header-nav-link');
  itcHeaderIconList.append(searchNavLink);

  if (searchIconImg) {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.id = 'searchIcon';
    img.src = searchIconImg.src;
    img.alt = searchIconImg.alt;
    searchNavLink.append(img);
  }

  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchSpan);

  const navItemLi = document.createElement('li');
  navItemLi.classList.add('header-nav-item');
  itcHeaderIconList.append(navItemLi);

  const navLinkA = document.createElement('a');
  navLinkA.classList.add('header-nav-link');
  navItemLi.append(navLinkA);

  const modal = document.createElement('div');
  modal.classList.add(
    'header-modal',
    'header-fade',
    'header-itc-country-selector',
  ); // Removed 'header-show' as it should be hidden initially
  modal.id = 'countryModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'countryModalLabel');
  modal.setAttribute('aria-modal', 'true');
  modal.style.display = 'none'; // Initially hidden
  header.append(modal);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  modal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content');
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add(
    'header-modal-header',
    'header-border-0',
    'header-text-center',
  );
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

  countryOptions.forEach((row, index) => {
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.classList.add(
      'header-country-option',
      'header-mx-3',
      'header-d-flex',
      'header-flex-column',
      'header-align-items-center',
    );
    if (index === 0) {
      countryOptionDiv.classList.add('header-selected');
    }
    moveInstrumentation(row, countryOptionDiv);

    // countryOption model has fields: flag (reference), countryName (text)
    const flagCell = row.children[0];
    const countryNameCell = row.children[1];

    const flagPicture = flagCell.querySelector('picture');
    if (flagPicture) {
      const flagImg = flagPicture.querySelector('img');
      if (flagImg) {
        const optimizedPic = createOptimizedPicture(
          flagImg.src,
          flagImg.alt,
          false,
          [{ width: '750' }],
        );
        optimizedPic.classList.add(
          'header-country-flag',
          index === 0 ? 'header-india-flag' : 'header-usa-flag',
        );
        countryOptionDiv.append(optimizedPic);
        moveInstrumentation(flagImg, optimizedPic.querySelector('img'));
      }
    }

    const countryNameP = document.createElement('p');
    countryNameP.classList.add('header-country-name');
    countryNameP.textContent = countryNameCell.textContent.trim();
    countryOptionDiv.append(countryNameP);

    countryOptionsDiv.append(countryOptionDiv);

    // Add click listener for country options in the modal
    countryOptionDiv.addEventListener('click', () => {
      // Remove 'header-selected' from all options
      countryOptionsDiv.querySelectorAll('.header-country-option').forEach((option) => {
        option.classList.remove('header-selected');
      });
      // Add 'header-selected' to the clicked option
      countryOptionDiv.classList.add('header-selected');

      // Update the main header's country flag and code
      const newCountryCode = countryNameP.textContent.trim().substring(0, 2).toUpperCase();
      countryCodeSpan.textContent = newCountryCode;
      const newFlagSrc = flagPicture.querySelector('img').src;
      countryFlagImg.src = newFlagSrc;

      // Close the modal
      modal.style.display = 'none';
      modal.classList.remove('header-show');
    });
  });

  // Add a close button for the modal
  const modalCloseButton = document.createElement('button');
  modalCloseButton.classList.add('close');
  modalCloseButton.type = 'button';
  modalCloseButton.setAttribute('data-dismiss', 'modal');
  modalCloseButton.setAttribute('aria-label', 'Close');
  const modalCloseSpan = document.createElement('span');
  modalCloseSpan.setAttribute('aria-hidden', 'true');
  modalCloseSpan.innerHTML = '&times;';
  modalCloseButton.append(modalCloseSpan);
  modalHeader.append(modalCloseButton); // Append to modalHeader as per common modal patterns

  // Event Listeners
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
  });

  searchNavLink.addEventListener('click', () => {
    searchBlock.classList.toggle('header-hidden');
    searchContainer.classList.toggle('header-hidden');
    searchResults.classList.add('header-hidden'); // Ensure search results are hidden when opening search
  });

  closeButton.addEventListener('click', () => {
    searchBlock.classList.add('header-hidden');
    searchContainer.classList.add('header-hidden');
    searchResults.classList.add('header-hidden');
  });

  searchButton.addEventListener('click', () => {
    searchResults.classList.remove('header-hidden');
  });

  countrySelectorTrigger.addEventListener('click', () => {
    modal.style.display = 'block';
    modal.classList.add('header-show');
  });

  // Close modal when clicking outside or on the close button
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modal.classList.remove('header-show');
    }
  });

  modalCloseButton.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.classList.remove('header-show');
  });

  block.textContent = '';
  block.append(header);

  // Image optimization for all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
