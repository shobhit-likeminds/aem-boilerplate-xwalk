import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0: Replaced direct .children[n] access with array destructuring for root rows
  const [
    searchPlaceholderRow,
    formActionRow,
    submitLabelRow,
    closeAriaLabelRow,
    clearAriaLabelRow,
    trendingTitleRow,
    ...trendingSuggestionRows
  ] = [...block.children];

  // CHECK 0.7 A: Corrected querySelector('div') on richtext cells (though these are text, not richtext)
  // CHECK 1: Reading root model fields
  const searchPlaceholder = searchPlaceholderRow?.textContent.trim() || '';
  // CHECK 1: Corrected cell reading for formAction to use querySelector('a').href
  const formAction = formActionRow?.querySelector('a')?.href || '#';
  const submitLabel = submitLabelRow?.textContent.trim() || '';
  const closeAriaLabel = closeAriaLabelRow?.textContent.trim() || 'Close Search Overlay';
  const clearAriaLabel = clearAriaLabelRow?.textContent.trim() || 'Clear Search';
  const trendingTitle = trendingTitleRow?.textContent.trim() || '';

  const searchAutocomplete = document.createElement('section');
  searchAutocomplete.id = 'search-autocomplete';
  // CHECK 0.5: Removed redundant block name class 'search-autocomplete' from inner wrapper
  // The outer block div already carries this class from AEM.
  searchAutocomplete.setAttribute('aria-label', 'Search Autocomplete Module');

  const overlay = document.createElement('div');
  overlay.classList.add('search-autocomplete--overlay');
  searchAutocomplete.append(overlay);

  const closeButton = document.createElement('button');
  closeButton.classList.add('search-autocomplete--close');
  closeButton.setAttribute('aria-label', closeAriaLabel);
  closeButton.innerHTML = `
    <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L5.93934 7L0.469669 12.4697C0.176777 12.7626 0.176777 13.2374 0.469669 13.5303C0.762563 13.8232 1.23744 13.8232 1.53033 13.5303L7 8.06066L12.4697 13.5303C12.7626 13.8232 13.2374 13.8232 13.5303 13.5303C13.8232 13.2374 13.8232 12.7626 13.5303 12.4697L8.06066 7L13.5303 1.53033C13.8232 1.23744 13.8232 0.762563 13.5303 0.46967C13.2374 0.176777 12.7626 0.176777 12.4697 0.46967L7 5.93934L1.53033 0.46967Z" fill="black"></path>
    </svg>
  `;
  searchAutocomplete.append(closeButton);

  const searchBlock = document.createElement('div');
  searchBlock.classList.add('search-autocomplete--block');
  searchAutocomplete.append(searchBlock);

  const container = document.createElement('div');
  container.classList.add('search-autocomplete--container');
  searchBlock.append(container);

  const formPlaceholder = document.createElement('div');
  formPlaceholder.classList.add('search-autocomplete--form-placeholder');
  container.append(formPlaceholder);

  const viewsElementContainer = document.createElement('div');
  viewsElementContainer.classList.add('views-element-container');
  formPlaceholder.append(viewsElementContainer);

  const formWrapperDiv = document.createElement('div');
  formWrapperDiv.classList.add('js-view-dom-id-6aa6399d39e6152a2998617932e0777098c777cd2aec477817d9256431c911c4');
  viewsElementContainer.append(formWrapperDiv);

  const form = document.createElement('form');
  form.classList.add('views-exposed-form');
  form.setAttribute('data-drupal-selector', 'views-exposed-form-solr-search-block-1');
  form.action = formAction;
  form.method = 'get';
  form.id = 'views-exposed-form-solr-search-block-1';
  form.setAttribute('accept-charset', 'UTF-8');
  formWrapperDiv.append(form);

  const formItem = document.createElement('div');
  formItem.classList.add('js-form-item', 'form-item', 'js-form-type-search-api-autocomplete', 'form-item-search-term', 'js-form-item-search-term', 'form-no-label');
  form.append(formItem);

  const input = document.createElement('input');
  input.classList.add('form-autocomplete', 'form-text', 'ui-autocomplete-input');
  input.setAttribute('data-drupal-selector', 'edit-search-term');
  input.setAttribute('data-search-api-autocomplete-search', 'solr_search');
  input.type = 'text';
  input.id = 'edit-search-term';
  input.name = 'search_term';
  input.value = '';
  input.size = '30';
  input.maxLength = '128';
  input.setAttribute('data-once', 'autocomplete search-api-autocomplete');
  input.autocomplete = 'off';
  input.placeholder = searchPlaceholder;
  formItem.append(input);

  const clearSearchButton = document.createElement('button');
  clearSearchButton.type = 'button';
  clearSearchButton.classList.add('refresh-search-input-icon');
  clearSearchButton.setAttribute('aria-label', clearAriaLabel);
  formItem.append(clearSearchButton);

  const formActions = document.createElement('div');
  formActions.classList.add('form-actions', 'js-form-wrapper', 'form-wrapper');
  formActions.setAttribute('data-drupal-selector', 'edit-actions');
  formActions.id = 'edit-actions';
  form.append(formActions);

  const submitButton = document.createElement('input');
  submitButton.disabled = true;
  submitButton.setAttribute('data-drupal-selector', 'edit-submit-solr-search');
  submitButton.type = 'submit';
  submitButton.id = 'edit-submit-solr-search';
  submitButton.value = submitLabel;
  submitButton.classList.add('button', 'js-form-submit', 'form-submit', 'is-disabled');
  formActions.append(submitButton);

  const trendPlaceholder = document.createElement('div');
  trendPlaceholder.classList.add('search-autocomplete--trend-placeholder');
  container.append(trendPlaceholder);

  const searchSuggestion = document.createElement('section');
  searchSuggestion.classList.add('grid-container', 'search-suggestion');
  searchSuggestion.setAttribute('aria-label', 'Search Suggestion Module');
  trendPlaceholder.append(searchSuggestion);

  const searchSuggestionWrapper = document.createElement('div');
  searchSuggestionWrapper.classList.add('padding-x', 'search-suggestion--wrapper');
  searchSuggestion.append(searchSuggestionWrapper);

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x', 'max-width-container');
  searchSuggestionWrapper.append(gridX);

  const searchSuggestionCell = document.createElement('div');
  searchSuggestionCell.classList.add('cell', 'small-12', 'large-offset-1', 'large-10', 'search-suggestion--cell');
  gridX.append(searchSuggestionCell);

  if (trendingTitle) {
    const trendingTitleSpan = document.createElement('span');
    trendingTitleSpan.classList.add('search-suggestion--title', 'utilityTagHighCaps', 'suggestion-item');
    trendingTitleSpan.textContent = trendingTitle;
    searchSuggestionCell.append(trendingTitleSpan);
  }

  if (trendingSuggestionRows.length > 0) {
    const suggestionList = document.createElement('ul');
    suggestionList.classList.add('search-suggestion--list');
    searchSuggestionCell.append(suggestionList);

    trendingSuggestionRows.forEach((row) => {
      // CHECK 0: Replaced direct .children[n] access with array destructuring for item rows
      // CHECK 2.6 A: Using index destructuring for fixed-schema item rows
      const [labelCell, linkCell] = [...row.children];

      const listItem = document.createElement('li');
      listItem.classList.add('search-suggestion--list-item', 'suggestion-item');
      suggestionList.append(listItem);

      const suggestionBlock = document.createElement('div');
      suggestionBlock.classList.add('search-suggestion--block');
      listItem.append(suggestionBlock);

      const link = document.createElement('a');
      link.classList.add('search-suggestion--link');
      // CHECK 1: Corrected cell reading for link to use querySelector('a').href
      link.href = linkCell?.querySelector('a')?.href || '#';
      suggestionBlock.append(link);

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('search-suggestion--label', 'bodyMediumRegular');
      labelSpan.textContent = labelCell?.textContent.trim() || '';
      link.append(labelSpan);

      moveInstrumentation(row, listItem);
    });
  }

  // Event listeners for interactivity
  closeButton.addEventListener('click', () => {
    searchAutocomplete.classList.remove('active');
    document.body.classList.remove('search-active');
  });

  overlay.addEventListener('click', () => {
    searchAutocomplete.classList.remove('active');
    document.body.classList.remove('search-active');
  });

  clearSearchButton.addEventListener('click', () => {
    input.value = '';
    submitButton.disabled = true;
  });

  input.addEventListener('input', () => {
    submitButton.disabled = input.value.trim() === '';
  });

  block.replaceChildren(searchAutocomplete);
}
