import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    placeholderRow,
    searchNameRow,
    searchTitleRow,
    actionRow,
    locptValueRow,
    dsValueRow,
    tabValueRow,
    buttonLabelRow,
  ] = [...block.children];

  const form = document.createElement('form');
  moveInstrumentation(block, form);
  form.setAttribute('role', 'search');
  form.setAttribute('method', 'get');
  form.classList.add('custom_search', 'mobile_search_detail', 'search-form', 'js-header-location');
  form.setAttribute('action', actionRow.firstElementChild.textContent.trim());

  const searchInput = document.createElement('input');
  moveInstrumentation(placeholderRow, searchInput);
  searchInput.setAttribute('id', 'autocomplete-input');
  searchInput.setAttribute('type', 'search');
  searchInput.classList.add('form-control', 'search__input', 'js-search-auto--small', 'js-header-geolocation__input');
  searchInput.setAttribute('placeholder', placeholderRow.firstElementChild.textContent.trim());
  searchInput.setAttribute('value', '');
  searchInput.setAttribute('name', searchNameRow.firstElementChild.textContent.trim());
  searchInput.setAttribute('title', searchTitleRow.firstElementChild.textContent.trim());
  form.append(searchInput);

  const locptInput = document.createElement('input');
  moveInstrumentation(locptValueRow, locptInput);
  locptInput.setAttribute('type', 'hidden');
  locptInput.setAttribute('id', 'locpt-global');
  locptInput.setAttribute('name', 'locpt');
  locptInput.setAttribute('value', locptValueRow.firstElementChild.textContent.trim());
  locptInput.classList.add('js-header-locpt');
  form.append(locptInput);

  const dsInput = document.createElement('input');
  moveInstrumentation(dsValueRow, dsInput);
  dsInput.setAttribute('type', 'hidden');
  dsInput.setAttribute('id', 'ds');
  dsInput.setAttribute('name', 'ds');
  dsInput.setAttribute('value', dsValueRow.firstElementChild.textContent.trim());
  form.append(dsInput);

  const tabInput = document.createElement('input');
  moveInstrumentation(tabValueRow, tabInput);
  tabInput.setAttribute('type', 'hidden');
  tabInput.setAttribute('id', 'tab');
  tabInput.setAttribute('name', 'tab');
  tabInput.setAttribute('value', tabValueRow.firstElementChild.textContent.trim());
  tabInput.classList.add('js-header-tab');
  form.append(tabInput);

  const button = document.createElement('button');
  moveInstrumentation(buttonLabelRow, button);
  button.classList.add('btn');
  button.setAttribute('type', 'submit');
  button.setAttribute('value', buttonLabelRow.firstElementChild.textContent.trim());

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-magnifying-glass');
  button.append(icon);
  form.append(button);

  block.textContent = '';
  block.append(form);
}
