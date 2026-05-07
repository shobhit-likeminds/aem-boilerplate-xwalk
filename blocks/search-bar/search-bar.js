import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [placeholderCell, ariaLabelCell] = [...block.children];

  const searchContainer = document.createElement('div');
  searchContainer.classList.add('elementor-widget-container');
  // moveInstrumentation(block, searchContainer); // Removed: instrumentation should stay on the block div until replaceChildren

  const searchElement = document.createElement('search');
  searchElement.classList.add('e-search');
  searchElement.setAttribute('role', 'search');
  searchContainer.append(searchElement);

  const searchForm = document.createElement('form');
  searchForm.classList.add('e-search-form');
  searchForm.setAttribute('action', 'https://natarajofficial.com'); // Placeholder action
  searchForm.setAttribute('method', 'get');
  searchElement.append(searchForm);

  const searchLabel = document.createElement('label');
  searchLabel.classList.add('e-search-label');
  searchLabel.setAttribute('for', 'search-53a8628'); // Unique ID for the input from original HTML
  searchForm.append(searchLabel);

  const screenOnlySpan = document.createElement('span');
  screenOnlySpan.classList.add('elementor-screen-only');
  screenOnlySpan.textContent = 'Search';
  searchLabel.append(screenOnlySpan);

  const searchIcon = document.createElement('svg');
  searchIcon.classList.add('e-font-icon-svg', 'e-fas-search');
  searchIcon.setAttribute('aria-hidden', 'true');
  searchIcon.setAttribute('viewBox', '0 0 512 512');
  searchIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  searchIcon.innerHTML = '<path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>';
  searchLabel.append(searchIcon);

  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('e-search-input-wrapper');
  searchForm.append(inputWrapper);

  const searchInput = document.createElement('input');
  searchInput.setAttribute('id', 'search-53a8628'); // ID from original HTML
  searchInput.classList.add('e-search-input');
  searchInput.setAttribute('type', 'search');
  searchInput.setAttribute('name', 's');
  searchInput.setAttribute('value', '');
  searchInput.setAttribute('autocomplete', 'on');
  searchInput.setAttribute('role', 'combobox');
  searchInput.setAttribute('aria-autocomplete', 'list');
  searchInput.setAttribute('aria-expanded', 'false');
  searchInput.setAttribute('aria-controls', 'results-53a8628'); // ID from original HTML
  searchInput.setAttribute('aria-haspopup', 'listbox');
  if (placeholderCell) {
    searchInput.setAttribute('placeholder', placeholderCell.textContent.trim());
    moveInstrumentation(placeholderCell, searchInput);
  }
  inputWrapper.append(searchInput);

  const clearIcon = document.createElement('svg');
  clearIcon.classList.add('e-font-icon-svg', 'e-fas-times', 'hidden');
  clearIcon.setAttribute('aria-hidden', 'true');
  clearIcon.setAttribute('viewBox', '0 0 352 512');
  clearIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clearIcon.innerHTML = '<path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>';
  inputWrapper.append(clearIcon);

  const outputContainer = document.createElement('output');
  outputContainer.setAttribute('id', 'results-53a8628'); // ID from original HTML
  outputContainer.classList.add('e-search-results-container', 'hide-loader');
  outputContainer.setAttribute('aria-live', 'polite');
  outputContainer.setAttribute('aria-atomic', 'true');
  outputContainer.setAttribute('aria-label', 'Results for search');
  outputContainer.setAttribute('tabindex', '0');
  inputWrapper.append(outputContainer);

  const searchResults = document.createElement('div');
  searchResults.classList.add('e-search-results');
  outputContainer.append(searchResults);

  const submitButton = document.createElement('button');
  submitButton.classList.add('e-search-submit', 'elementor-screen-only');
  submitButton.setAttribute('type', 'submit');
  if (ariaLabelCell) {
    submitButton.setAttribute('aria-label', ariaLabelCell.textContent.trim());
    moveInstrumentation(ariaLabelCell, submitButton);
  } else {
    submitButton.setAttribute('aria-label', 'Search');
  }
  searchForm.append(submitButton);

  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'e_search_props');
  hiddenInput.setAttribute('value', '53a8628-132'); // Placeholder value
  searchForm.append(hiddenInput);

  // Move instrumentation from block to the new root before replacing children
  moveInstrumentation(block, searchContainer);
  block.replaceChildren(searchContainer);

  // Add event listeners for basic search functionality
  searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
      clearIcon.classList.remove('hidden');
      outputContainer.classList.remove('hide-loader');
    } else {
      clearIcon.classList.add('hidden');
      outputContainer.classList.add('hide-loader');
      searchResults.innerHTML = ''; // Clear results
    }
  });

  clearIcon.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input')); // Trigger input event to hide clear icon and results
    searchInput.focus();
  });

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real scenario, you'd fetch search results here
    const query = searchInput.value.trim();
    if (query) {
      searchResults.innerHTML = `<p>Searching for: <strong>${query}</strong>...</p>`;
      // Simulate API call
      setTimeout(() => {
        searchResults.innerHTML = `<p>No results found for "<strong>${query}</strong>".</p>`;
      }, 1000);
    } else {
      searchResults.innerHTML = '<p>Please enter a search term.</p>';
    }
  });
}
