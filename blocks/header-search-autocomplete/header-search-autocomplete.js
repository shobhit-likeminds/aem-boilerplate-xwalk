import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const [
    closeLabelRow,
    inputPlaceholderRow,
    clearLabelRow,
    submitLabelRow,
    trendingTitleRow,
    ...suggestionRows
  ] = children;

  const section = document.createElement('section');
  // section.classList.add('search-autocomplete'); // Removed: Outer block div already has this class
  section.id = 'search-autocomplete';
  section.setAttribute('aria-label', 'Search Autocomplete Module');

  const overlay = document.createElement('div');
  overlay.classList.add('search-autocomplete--overlay');
  section.append(overlay);

  const closeButton = document.createElement('button');
  closeButton.classList.add('search-autocomplete--close');
  closeButton.setAttribute('aria-label', closeLabelRow.textContent.trim());
  closeButton.innerHTML = `
    <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L5.93934 7L0.469669 12.4697C0.176777 12.7626 0.176777 13.2374 0.469669 13.5303C0.762563 13.8232 1.23744 13.8232 1.53033 13.5303L7 8.06066L12.4697 13.5303C12.7626 13.8232 13.2374 13.8232 13.5303 13.5303C13.8232 13.2374 13.8232 12.7626 13.5303 12.4697L8.06066 7L13.5303 1.53033C13.8232 1.23744 13.8232 0.762563 13.5303 0.46967C13.2374 0.176777 12.7626 0.176777 12.4697 0.46967L7 5.93934L1.53033 0.46967Z" fill="black"></path>
    </svg>
  `;
  moveInstrumentation(closeLabelRow, closeButton);
  section.append(closeButton);

  const searchBlock = document.createElement('div');
  searchBlock.classList.add('search-autocomplete--block');
  section.append(searchBlock);

  const container = document.createElement('div');
  container.classList.add('search-autocomplete--container');
  searchBlock.append(container);

  const formPlaceholder = document.createElement('div');
  formPlaceholder.classList.add('search-autocomplete--form-placeholder');
  container.append(formPlaceholder);

  const viewsElementContainer = document.createElement('div');
  viewsElementContainer.classList.add('views-element-container');
  formPlaceholder.append(viewsElementContainer);

  const viewDomIdDiv = document.createElement('div');
  viewDomIdDiv.classList.add('js-view-dom-id-0c60432939e2d8146b70a9d63fd940f96ddd8e328f1e14c30dba2b49a8b3973e');
  viewsElementContainer.append(viewDomIdDiv);

  const form = document.createElement('form');
  form.classList.add('views-exposed-form');
  form.setAttribute('data-drupal-selector', 'views-exposed-form-solr-search-block-1');
  form.action = '/in/search-results'; // Corrected to relative path
  form.method = 'get';
  form.id = 'views-exposed-form-solr-search-block-1';
  form.setAttribute('accept-charset', 'UTF-8');
  viewDomIdDiv.append(form);

  const formItem = document.createElement('div');
  formItem.classList.add('js-form-item', 'form-item', 'js-form-type-search-api-autocomplete', 'form-item-search-term', 'js-form-item-search-term', 'form-no-label');
  form.append(formItem);

  const input = document.createElement('input');
  input.classList.add('form-autocomplete', 'form-text', 'ui-autocomplete-input');
  input.setAttribute('data-drupal-selector', 'edit-search-term');
  input.setAttribute('data-search-api-autocomplete-search', 'solr_search');
  input.setAttribute('data-autocomplete-path', '/in/search_api_autocomplete/solr_search?display=block_1&&filter=search_term');
  input.type = 'text';
  input.id = 'edit-search-term';
  input.name = 'search_term';
  input.value = '';
  input.size = '30';
  input.maxLength = '128';
  input.setAttribute('data-once', 'autocomplete search-api-autocomplete');
  input.autocomplete = 'off';
  input.placeholder = inputPlaceholderRow.textContent.trim();
  moveInstrumentation(inputPlaceholderRow, input);
  formItem.append(input);

  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.classList.add('refresh-search-input-icon');
  clearButton.setAttribute('aria-label', clearLabelRow.textContent.trim());
  moveInstrumentation(clearLabelRow, clearButton);
  formItem.append(clearButton);

  const formActions = document.createElement('div');
  formActions.classList.add('form-actions', 'js-form-wrapper', 'form-wrapper');
  formActions.setAttribute('data-drupal-selector', 'edit-actions');
  formActions.id = 'edit-actions';
  form.append(formActions);

  const submitInput = document.createElement('input');
  submitInput.disabled = true;
  submitInput.setAttribute('data-drupal-selector', 'edit-submit-solr-search');
  submitInput.type = 'submit';
  submitInput.id = 'edit-submit-solr-search';
  submitInput.value = submitLabelRow.textContent.trim();
  submitInput.classList.add('button', 'js-form-submit', 'form-submit', 'is-disabled');
  moveInstrumentation(submitLabelRow, submitInput);
  formActions.append(submitInput);

  const trendPlaceholder = document.createElement('div');
  trendPlaceholder.classList.add('search-autocomplete--trend-placeholder');
  container.append(trendPlaceholder);

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

  const cellDiv = document.createElement('div');
  cellDiv.classList.add('cell', 'small-12', 'large-offset-1', 'large-10', 'search-suggestion--cell');
  gridXContainer.append(cellDiv);

  const trendingTitleSpan = document.createElement('span');
  trendingTitleSpan.classList.add('search-suggestion--title', 'utilityTagHighCaps', 'suggestion-item');
  trendingTitleSpan.textContent = trendingTitleRow.textContent.trim();
  moveInstrumentation(trendingTitleRow, trendingTitleSpan);
  cellDiv.append(trendingTitleSpan);

  const suggestionList = document.createElement('ul');
  suggestionList.classList.add('search-suggestion--list');
  cellDiv.append(suggestionList);

  suggestionRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('search-suggestion--list-item', 'suggestion-item');
    suggestionList.append(listItem);

    const suggestionBlock = document.createElement('div');
    suggestionBlock.classList.add('search-suggestion--block');
    listItem.append(suggestionBlock);

    const link = document.createElement('a');
    link.classList.add('search-suggestion--link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('search-suggestion--label', 'bodyMediumRegular');
    labelSpan.textContent = labelCell.textContent.trim();
    link.append(labelSpan);

    moveInstrumentation(row, link);
    suggestionBlock.append(link);
  });

  block.replaceChildren(section);

  // Event listeners for basic functionality
  closeButton.addEventListener('click', () => {
    section.classList.remove('active');
    document.body.classList.remove('search-overlay-active');
  });

  overlay.addEventListener('click', () => {
    section.classList.remove('active');
    document.body.classList.remove('search-overlay-active');
  });

  clearButton.addEventListener('click', () => {
    input.value = '';
    submitInput.disabled = true;
  });

  input.addEventListener('input', () => {
    submitInput.disabled = input.value.trim() === '';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim() !== '') {
      form.submit();
    }
  });

  // Swiper.js initialization (if needed, based on original HTML)
  // The original HTML does not show Swiper classes, but if it were to,
  // the following would be added:
  // await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  // await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // if (swiperEl) { // Assuming swiperEl is the main swiper container
  //   // eslint-disable-next-line no-undef
  //   new Swiper(swiperEl, {
  //     slidesPerView: 'auto',
  //     loop: false, // Or true, based on data-loop attribute
  //     navigation: {
  //       prevEl: prevBtn, // Replace with actual DOM element for prev button
  //       nextEl: nextBtn, // Replace with actual DOM element for next button
  //     },
  //     pagination: {
  //       el: paginationEl, // Replace with actual DOM element for pagination
  //       clickable: true,
  //     },
  //   });
  // }
}
