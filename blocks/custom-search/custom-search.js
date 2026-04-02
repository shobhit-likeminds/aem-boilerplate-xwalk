import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const form = document.createElement('form');
  form.setAttribute('role', 'search');
  form.setAttribute('method', 'get');
  form.classList.add('custom_search', 'mobile_search_detail', 'search-form', 'js-header-location');
  form.setAttribute('action', 'https://www.nhsinform.scot/search');

  const rows = [...block.children];

  // Search Query Input
  const searchInput = document.createElement('input');
  searchInput.setAttribute('id', 'autocomplete-input');
  searchInput.setAttribute('type', 'search');
  searchInput.classList.add('form-control', 'search__input', 'js-search-auto--small', 'js-header-geolocation__input');
  searchInput.setAttribute('placeholder', 'Search NHS inform/Services');
  searchInput.setAttribute('name', 'q');
  searchInput.setAttribute('title', 'Search for:');

  // Find the row corresponding to 'search-query'
  const searchQueryRow = rows.find(row => row.firstElementChild?.textContent.trim() === 'Search Query value');
  if (searchQueryRow) {
    const searchQueryValue = searchQueryRow.firstElementChild?.textContent.trim();
    if (searchQueryValue) {
      searchInput.setAttribute('value', searchQueryValue);
    }
    moveInstrumentation(searchQueryRow, searchInput);
  }
  form.append(searchInput);

  // Locpt Hidden Input
  const locptInput = document.createElement('input');
  locptInput.setAttribute('type', 'hidden');
  locptInput.setAttribute('id', 'locpt-global');
  locptInput.setAttribute('name', 'locpt');
  locptInput.classList.add('js-header-locpt');

  // Find the row corresponding to 'locpt'
  const locptRow = rows.find(row => row.firstElementChild?.textContent.trim() === 'Locpt value');
  if (locptRow) {
    const locptValue = locptRow.firstElementChild?.textContent.trim();
    if (locptValue) {
      locptInput.setAttribute('value', locptValue);
    }
    moveInstrumentation(locptRow, locptInput);
  }
  form.append(locptInput);

  // Ds Hidden Input
  const dsInput = document.createElement('input');
  dsInput.setAttribute('type', 'hidden');
  dsInput.setAttribute('id', 'ds');
  dsInput.setAttribute('name', 'ds');

  // Find the row corresponding to 'ds'
  const dsRow = rows.find(row => row.firstElementChild?.textContent.trim() === 'Ds value');
  if (dsRow) {
    const dsValue = dsRow.firstElementChild?.textContent.trim();
    if (dsValue) {
      dsInput.setAttribute('value', dsValue);
    }
    moveInstrumentation(dsRow, dsInput);
  }
  form.append(dsInput);

  // Tab Hidden Input
  const tabInput = document.createElement('input');
  tabInput.setAttribute('type', 'hidden');
  tabInput.setAttribute('id', 'tab');
  tabInput.setAttribute('name', 'tab');
  tabInput.classList.add('js-header-tab');

  // Find the row corresponding to 'tab'
  const tabRow = rows.find(row => row.firstElementChild?.textContent.trim() === 'Tab value');
  if (tabRow) {
    const tabValue = tabRow.firstElementChild?.textContent.trim();
    if (tabValue) {
      tabInput.setAttribute('value', tabValue);
    }
    moveInstrumentation(tabRow, tabInput);
  }
  form.append(tabInput);

  // Submit Button
  const submitButton = document.createElement('button');
  submitButton.classList.add('btn');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('value', 'Search');

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-magnifying-glass');
  submitButton.append(icon);
  form.append(submitButton);

  block.textContent = '';
  block.append(form);
}
