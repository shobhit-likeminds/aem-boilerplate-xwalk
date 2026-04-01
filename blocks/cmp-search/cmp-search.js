import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('cmp-search');
  section.setAttribute('role', 'search');

  // Copy data attributes from the original block
  [...block.attributes].forEach((attr) => {
    if (attr.name.startsWith('data-')) {
      section.setAttribute(attr.name, attr.value);
    }
  });

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('cmp-search__info'); // Corrected class name
  infoDiv.setAttribute('aria-live', 'polite');
  infoDiv.setAttribute('role', 'status');
  section.append(infoDiv);

  const form = document.createElement('form');
  form.classList.add('cmp-search__form');
  form.setAttribute('data-cmp-hook-search', 'form');
  form.setAttribute('method', 'get');
  form.setAttribute('action', '/content/itc-foods-brands/aashirvaad/us/en.customsearchresults.json/_jcr_content/root/search');
  form.setAttribute('autocomplete', 'off');

  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('id', 'searchroot');
  hiddenInput.setAttribute('name', 'searchroot');
  hiddenInput.setAttribute('value', '/content/itc-foods-brands/aashirvaad/us/en');
  form.append(hiddenInput);

  const fieldDiv = document.createElement('div');
  fieldDiv.classList.add('cmp-search__field');

  const icon = document.createElement('i');
  icon.classList.add('cmp-search__icon');
  icon.setAttribute('data-cmp-hook-search', 'icon');
  fieldDiv.append(icon);

  const loadingIndicator = document.createElement('span');
  loadingIndicator.classList.add('cmp-search__loading-indicator');
  loadingIndicator.setAttribute('data-cmp-hook-search', 'loadingIndicator');
  fieldDiv.append(loadingIndicator);

  const input = document.createElement('input');
  input.classList.add('cmp-search__input');
  input.setAttribute('data-cmp-hook-search', 'input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'fulltext');
  input.setAttribute('placeholder', 'Search');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-haspopup', 'true');
  input.setAttribute('aria-invalid', 'false');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-owns', 'cmp-search-results-0');
  fieldDiv.append(input);

  const clearButton = document.createElement('button');
  clearButton.classList.add('cmp-search__clear');
  clearButton.setAttribute('data-cmp-hook-search', 'clear');
  clearButton.setAttribute('aria-label', 'Clear');

  const clearIcon = document.createElement('i');
  clearIcon.classList.add('cmp-search__clear-icon');
  clearButton.append(clearIcon);
  fieldDiv.append(clearButton);

  form.append(fieldDiv);
  section.append(form);

  const resultsDiv = document.createElement('div');
  resultsDiv.classList.add('cmp-search__results');
  resultsDiv.setAttribute('aria-label', 'Search results');
  resultsDiv.setAttribute('data-cmp-hook-search', 'results');
  resultsDiv.setAttribute('role', 'listbox');
  resultsDiv.setAttribute('aria-multiselectable', 'false');
  resultsDiv.setAttribute('id', 'cmp-search-results-0');
  section.append(resultsDiv);

  const itemTemplateScript = document.createElement('script');
  itemTemplateScript.setAttribute('data-cmp-hook-search', 'itemTemplate');
  itemTemplateScript.setAttribute('type', 'x-template');
  itemTemplateScript.innerHTML = `
    <a class="cmp-search__item" data-cmp-hook-search="item" role="option" aria-selected="false">
        <span class="cmp-search__item-title" data-cmp-hook-search="itemTitle"></span>
    </a>
  `;
  section.append(itemTemplateScript);

  // Move instrumentation from the block to the new section
  moveInstrumentation(block, section);

  // Clear the original block content and append the new structure
  block.textContent = '';
  block.append(section);
}
