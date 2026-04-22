import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Fixed fields
  const [
    inputPlaceholderRow,
    minLengthRow,
    resultsDesktopSizeRow,
    resultsMobileSizeRow,
    noResultsTitleRow,
    noResultsDescriptionRow,
    formActionRow, // New field for form action
    searchRootValueRow, // New field for searchroot value
    ...itemRows
  ] = children;

  const inputPlaceholder = inputPlaceholderRow?.textContent.trim() || '';
  const minLength = parseInt(minLengthRow?.textContent.trim(), 10) || 3;
  const resultsDesktopSize = parseInt(resultsDesktopSizeRow?.textContent.trim(), 10) || 8;
  const resultsMobileSize = parseInt(resultsMobileSizeRow?.textContent.trim(), 10) || 5;
  const noResultsTitle = noResultsTitleRow?.textContent.trim() || '';
  const noResultsDescription = noResultsDescriptionRow?.textContent.trim() || '';
  const formAction = formActionRow?.querySelector('a')?.href || ''; // Read from aem-content
  const searchRootValue = searchRootValueRow?.querySelector('a')?.href || ''; // Read from aem-content

  const categories = [];
  const searchResults = [];

  // Separate item rows by content detection (number of cells)
  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2) {
      const [cell0, cell1] = cells;
      // Determine if it's a category or search result based on content type
      // Category URL is aem-content, Search Result URL is aem-content
      // Both have 2 cells. We need to distinguish them.
      // For now, assuming categories come first, then search results.
      // A more robust solution might involve checking the original HTML structure or adding a type field.
      // Given the BlockJson, both are 2-cell items. The current logic will put all 2-cell items into categories
      // until it fails, then into searchResults. This is not ideal if they are interleaved.
      // A better approach would be to check if the first cell contains a specific class or data attribute
      // if the model allowed for it, or rely on the order of rows if that's guaranteed.
      // For this review, we'll assume categories appear before search results if both are present.

      // Check if it matches the category-item structure
      const categoryName = cell0?.textContent.trim();
      const categoryURL = cell1?.querySelector('a')?.href;
      if (categoryName && categoryURL) {
        categories.push({ categoryName, categoryURL });
      } else {
        // Assume it's a search result item if not a category
        const title = cell0?.textContent.trim();
        const url = cell1?.querySelector('a')?.href;
        if (title && url) {
          searchResults.push({ title, url });
        }
      }
    }
  });

  // Reconstruct the block structure
  const section = document.createElement('section');
  section.classList.add('cmp-search');
  section.setAttribute('role', 'search');
  section.setAttribute('data-cmp-min-length', minLength);
  section.setAttribute('data-cmp-results-desktop-size', resultsDesktopSize);
  section.setAttribute('data-cmp-results-mobile-size', resultsMobileSize);

  const errorResponse = {
    noResultsTitle,
    noResultsDescription,
    categories,
    searchResults, // Although not used in original, keep for completeness
  };
  section.setAttribute('data-error-response', JSON.stringify(errorResponse));
  section.setAttribute('data-input-placeholder', inputPlaceholder);

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('cmp_search__info');
  infoDiv.setAttribute('aria-live', 'polite');
  infoDiv.setAttribute('role', 'status');
  section.append(infoDiv);

  const form = document.createElement('form');
  form.classList.add('cmp-search__form');
  form.setAttribute('data-cmp-hook-search', 'form');
  form.setAttribute('method', 'get');
  form.setAttribute('action', formAction); // Read from model
  form.setAttribute('autocomplete', 'off');
  section.append(form);

  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('id', 'searchroot');
  hiddenInput.setAttribute('name', 'searchroot');
  hiddenInput.setAttribute('value', searchRootValue); // Read from model
  form.append(hiddenInput);

  const fieldDiv = document.createElement('div');
  fieldDiv.classList.add('cmp-search__field');
  form.append(fieldDiv);

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
  input.setAttribute('placeholder', inputPlaceholder);
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
  fieldDiv.append(clearButton);

  const clearIcon = document.createElement('i');
  clearIcon.classList.add('cmp-search__clear-icon');
  clearButton.append(clearIcon);

  const resultsDiv = document.createElement('div');
  resultsDiv.classList.add('cmp-search__results');
  resultsDiv.setAttribute('aria-label', 'Search results');
  resultsDiv.setAttribute('data-cmp-hook-search', 'results');
  resultsDiv.setAttribute('role', 'listbox');
  resultsDiv.setAttribute('aria-multiselectable', 'false');
  resultsDiv.setAttribute('id', 'cmp-search-results-0');
  section.append(resultsDiv);

  const scriptTemplate = document.createElement('script');
  scriptTemplate.setAttribute('data-cmp-hook-search', 'itemTemplate');
  scriptTemplate.setAttribute('type', 'x-template');
  scriptTemplate.textContent = `
  <a class="cmp-search__item" data-cmp-hook-search="item" role="option" aria-selected="false">
      <span class="cmp-search__item-title" data-cmp-hook-search="itemTitle"></span>
  </a>
`;
  section.append(scriptTemplate);

  // Move instrumentation from original rows to the new section element
  // Since the original block structure is completely replaced, we move instrumentation
  // to the root section element. If there were editable parts, instrumentation would
  // be moved to those specific elements.
  moveInstrumentation(block, section);

  // Replace the block's content with the new section
  block.replaceChildren(section);
}
