import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    searchIconRow,
    placeholderRow,
    searchTermNameRow,
    clearButtonLinkRow, // Renamed to reflect it's a link
    clearButtonLabelRow,
    closeButtonLinkRow, // Renamed to reflect it's a link
    closeButtonLabelRow,
    closeIconRow,
  ] = [...block.children];

  const form = document.createElement('form');
  form.action = '/search-results'; // Assuming a default search results page
  form.method = 'post';

  const mainSearchBarDiv = document.createElement('div');
  mainSearchBarDiv.id = 'MainSiteSearchBar';
  mainSearchBarDiv.classList.add('mainSearchBar-mssd', 'd-none-thar', 'w-100-thar');
  moveInstrumentation(block, mainSearchBarDiv);

  const innerDiv = document.createElement('div');
  innerDiv.classList.add(
    'p-md-30-mssd',
    'p-sm-15-mssd',
    'bb-search-mssd',
    'd-flex-thar',
    'align-items-center-thar',
    'justify-content-between-thar',
  );

  const searchInputWrapper = document.createElement('div');
  searchInputWrapper.classList.add('w-100-thar', 'd-flex-thar', 'align-items-center-thar');

  // Search Icon
  const searchIconPicture = searchIconRow.querySelector('div').querySelector('picture');
  if (searchIconPicture) {
    const searchIconImg = searchIconPicture.querySelector('img');
    const optimizedSearchIcon = createOptimizedPicture(searchIconImg.src, searchIconImg.alt, false, [{ width: '32' }]);
    moveInstrumentation(searchIconPicture, optimizedSearchIcon.querySelector('img'));
    searchInputWrapper.append(optimizedSearchIcon);
  }

  // Search Input
  const searchInput = document.createElement('input');
  searchInput.tabIndex = 0;
  searchInput.id = 'MainSiteSearchInput';
  searchInput.classList.add('w-100-thar', 'search-inp-op', 'search-query-mssd-md', 'search-query-mssd-sm');
  searchInput.type = 'search';
  searchInput.placeholder = placeholderRow.querySelector('div').textContent.trim();
  searchInput.name = searchTermNameRow.querySelector('div').textContent.trim();
  searchInput.setAttribute('aria-label', searchInput.placeholder);
  searchInput.autocomplete = 'off';
  searchInputWrapper.append(searchInput);

  innerDiv.append(searchInputWrapper);

  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.classList.add('d-flex-thar', 'align-items-center-thar', 'mr-lg-50-mssd');

  // Clear Button
  const clearButton = document.createElement('button');
  clearButton.id = 'MainSiteSearchClear';
  clearButton.type = 'reset';
  clearButton.classList.add('search-clear-md', 'search-clear-sm', 'd-none-thar');
  const clearButtonLabel = clearButtonLabelRow.querySelector('div').textContent.trim();
  clearButton.setAttribute('aria-label', clearButtonLabel);
  clearButton.tabIndex = 0;
  clearButton.textContent = clearButtonLabel;
  buttonsWrapper.append(clearButton);

  const closeButtonContainer = document.createElement('div');
  closeButtonContainer.classList.add('d-flex-thar');

  const divider = document.createElement('div');
  divider.classList.add('search-clear-divider-md', 'search-clear-divider-sm');
  closeButtonContainer.append(divider);

  const closeButtonInnerWrapper = document.createElement('div');
  closeButtonInnerWrapper.classList.add('d-flex-thar', 'align-items-center-thar');

  // Close Button
  const closeButton = document.createElement('button');
  closeButton.tabIndex = 0;
  closeButton.id = 'MainSiteSearchClose';
  closeButton.type = 'button';
  closeButton.classList.add('d-flex-thar', 'search-close-mssd', 'my-auto-thar');
  const closeButtonLabel = closeButtonLabelRow.querySelector('div').textContent.trim();
  closeButton.setAttribute('aria-label', closeButtonLabel);

  const closeButtonLabelSpan = document.createElement('span');
  closeButtonLabelSpan.classList.add('d-block-op', 'd-none-sm-op', 'mr-md-10-mssd', 'my-auto-thar');
  closeButtonLabelSpan.textContent = closeButtonLabel;
  closeButton.append(closeButtonLabelSpan);

  // Close Icon
  const closeIconPicture = closeIconRow.querySelector('div').querySelector('picture');
  if (closeIconPicture) {
    const closeIconImg = closeIconPicture.querySelector('img');
    const optimizedCloseIcon = createOptimizedPicture(closeIconImg.src, closeIconImg.alt, false, [{ width: '32' }]);
    moveInstrumentation(closeIconPicture, optimizedCloseIcon.querySelector('img'));
    closeButton.append(optimizedCloseIcon);
  }

  closeButtonInnerWrapper.append(closeButton);
  closeButtonContainer.append(closeButtonInnerWrapper);
  buttonsWrapper.append(closeButtonContainer);
  innerDiv.append(buttonsWrapper);
  mainSearchBarDiv.append(innerDiv);
  form.append(mainSearchBarDiv);

  block.textContent = '';
  block.append(form);

  // Event Listeners for interactivity
  const toggleSearchBar = () => {
    mainSearchBarDiv.classList.toggle('d-none-thar');
  };

  // The original HTML implies an external trigger for the search bar,
  // but the block itself only contains the search bar.
  // The close button is the only direct interactive element within the block
  // that controls the visibility of the search bar.
  closeButton.addEventListener('click', toggleSearchBar);

  // Show/hide clear button based on input
  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      clearButton.classList.remove('d-none-thar');
    } else {
      clearButton.classList.add('d-none-thar');
    }
  });

  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.classList.add('d-none-thar');
    // Optionally focus the input after clearing
    searchInput.focus();
  });

  // Optimize images
  // This block already handles image optimization for searchIcon and closeIcon specifically.
  // The generic block.querySelectorAll('picture > img') might be redundant or cause issues
  // if not carefully managed with the specific optimizations above.
  // Given the specific handling, this generic loop is removed to prevent double processing
  // or unexpected behavior.
}
