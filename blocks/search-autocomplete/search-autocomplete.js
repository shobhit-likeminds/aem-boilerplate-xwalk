import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    closeLabelRow,
    formActionRow,
    inputPlaceholderRow,
    applyLabelRow,
    trendingTitleRow,
    ...trendingSuggestionRows
  ] = [...block.children];

  const closeLabel = closeLabelRow?.textContent.trim();
  const formAction = formActionRow?.querySelector('a')?.href;
  const inputPlaceholder = inputPlaceholderRow?.textContent.trim();
  const applyLabel = applyLabelRow?.textContent.trim();
  const trendingTitle = trendingTitleRow?.textContent.trim();

  const root = document.createElement('section');
  // root.classList.add('search-autocomplete'); // Removed: outer block div already has this class
  root.id = 'search-autocomplete';
  root.setAttribute('aria-label', 'Search Autocomplete Module');

  const overlay = document.createElement('div');
  overlay.classList.add('search-autocomplete--overlay');
  root.append(overlay);

  const closeButton = document.createElement('button');
  closeButton.classList.add('search-autocomplete--close');
  closeButton.setAttribute('aria-label', closeLabel || 'Close Search Overlay');
  closeButton.innerHTML = `
    <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L5.93934 7L0.469669 12.4697C0.176777 12.7626 0.176777 13.2374 0.469669 13.5303C0.762563 13.8232 1.23744 13.8232 1.53033 13.5303L7 8.06066L12.4697 13.5303C12.7626 13.8232 13.2374 13.8232 13.5303 13.5303C13.8232 13.2374 13.8232 12.7626 13.5303 12.4697L8.06066 7L13.5303 1.53033C13.8232 1.23744 13.8232 0.762563 13.5303 0.46967C13.2374 0.176777 12.7626 0.176777 12.4697 0.46967L7 5.93934L1.53033 0.46967Z" fill="black"></path>
    </svg>
  `;
  moveInstrumentation(closeLabelRow, closeButton);
  closeButton.addEventListener('click', () => {
    root.classList.remove('active');
    document.body.classList.remove('search-autocomplete-open');
  });
  root.append(closeButton);

  const blockContent = document.createElement('div');
  blockContent.classList.add('search-autocomplete--block');

  const container = document.createElement('div');
  container.classList.add('search-autocomplete--container');
  blockContent.append(container);

  const formPlaceholder = document.createElement('div');
  formPlaceholder.classList.add('search-autocomplete--form-placeholder');

  const formContainer = document.createElement('div');
  formContainer.classList.add('views-element-container');
  formPlaceholder.append(formContainer);

  const formWrapper = document.createElement('div');
  formWrapper.classList.add('js-view-dom-id-0c60432939e2d8146b70a9d63fd940f96ddd8e328f1e14c30dba2b49a8b3973e');
  formContainer.append(formWrapper);

  const form = document.createElement('form');
  form.classList.add('views-exposed-form');
  form.setAttribute('data-drupal-selector', 'views-exposed-form-solr-search-block-1');
  form.action = formAction || '#';
  form.method = 'get';
  form.id = 'views-exposed-form-solr-search-block-1';
  form.setAttribute('accept-charset', 'UTF-8');
  moveInstrumentation(formActionRow, form);
  container.append(formPlaceholder);

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
  input.placeholder = inputPlaceholder || '';
  moveInstrumentation(inputPlaceholderRow, input);
  formItem.append(input);

  const refreshButton = document.createElement('button');
  refreshButton.type = 'button';
  refreshButton.classList.add('refresh-search-input-icon');
  refreshButton.setAttribute('aria-label', 'Clear Search');
  formItem.append(refreshButton);

  const formActions = document.createElement('div');
  formActions.classList.add('form-actions', 'js-form-wrapper', 'form-wrapper');
  formActions.id = 'edit-actions';
  form.append(formActions);

  const submitButton = document.createElement('input');
  submitButton.disabled = true;
  submitButton.setAttribute('data-drupal-selector', 'edit-submit-solr-search');
  submitButton.type = 'submit';
  submitButton.id = 'edit-submit-solr-search';
  submitButton.value = applyLabel || 'Apply';
  submitButton.classList.add('button', 'js-form-submit', 'form-submit', 'is-disabled');
  moveInstrumentation(applyLabelRow, submitButton);
  formActions.append(submitButton);

  const trendPlaceholder = document.createElement('div');
  trendPlaceholder.classList.add('search-autocomplete--trend-placeholder');
  blockContent.append(trendPlaceholder);

  const searchSuggestionSection = document.createElement('section');
  searchSuggestionSection.classList.add('grid-container', 'search-suggestion');
  searchSuggestionSection.setAttribute('aria-label', 'Search Suggestion Module');
  trendPlaceholder.append(searchSuggestionSection);

  const paddingXWrapper = document.createElement('div');
  paddingXWrapper.classList.add('padding-x', 'search-suggestion--wrapper');
  searchSuggestionSection.append(paddingXWrapper);

  const gridXContainer = document.createElement('div');
  gridXContainer.classList.add('grid-x', 'max-width-container');
  paddingXWrapper.append(gridXContainer);

  const suggestionCell = document.createElement('div');
  suggestionCell.classList.add('cell', 'small-12', 'large-offset-1', 'large-10', 'search-suggestion--cell');
  gridXContainer.append(suggestionCell);

  if (trendingTitle) {
    const titleSpan = document.createElement('span');
    titleSpan.classList.add('search-suggestion--title', 'utilityTagHighCaps', 'suggestion-item');
    titleSpan.textContent = trendingTitle;
    moveInstrumentation(trendingTitleRow, titleSpan);
    suggestionCell.append(titleSpan);
  }

  if (trendingSuggestionRows.length > 0) {
    const trendingList = document.createElement('ul');
    trendingList.classList.add('search-suggestion--list');
    suggestionCell.append(trendingList);

    trendingSuggestionRows.forEach((row) => {
      // Fixed: Use array destructuring for fixed-schema item rows
      const [labelCell, linkCell] = [...row.children];

      const listItem = document.createElement('li');
      listItem.classList.add('search-suggestion--list-item', 'suggestion-item');
      trendingList.append(listItem);

      const suggestionBlock = document.createElement('div');
      suggestionBlock.classList.add('search-suggestion--block');
      listItem.append(suggestionBlock);

      const link = document.createElement('a');
      link.classList.add('search-suggestion--link');
      link.href = linkCell?.querySelector('a')?.href || '#';

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('search-suggestion--label', 'bodyMediumRegular');
      labelSpan.textContent = labelCell?.textContent.trim() || '';

      link.append(labelSpan);
      moveInstrumentation(row, link);
      suggestionBlock.append(link);
    });
  }

  root.append(blockContent);
  block.replaceChildren(root);

  // Add event listener to open the search autocomplete
  document.addEventListener('click', (e) => {
    if (e.target.closest('.search-icon')) { // Assuming a search icon triggers this
      root.classList.add('active');
      document.body.classList.add('search-autocomplete-open');
    }
  });

  // Close on overlay click
  overlay.addEventListener('click', () => {
    root.classList.remove('active');
    document.body.classList.remove('search-autocomplete-open');
  });
}
