import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [trendingTitleRow, ...suggestionItemRows] = children; // Fixed: Used destructuring

  const section = document.createElement('section');
  section.classList.add('search-autocomplete');
  section.id = 'search-autocomplete';
  section.setAttribute('aria-label', 'Search Autocomplete Module');

  const overlay = document.createElement('div');
  overlay.classList.add('search-autocomplete--overlay');
  section.append(overlay);

  const closeButton = document.createElement('button');
  closeButton.classList.add('search-autocomplete--close');
  closeButton.setAttribute('aria-label', 'Close Search Overlay');
  closeButton.innerHTML = `
    <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L5.93934 7L0.469669 12.4697C0.176777 12.7626 0.176777 13.2374 0.469669 13.5303C0.762563 13.8232 1.23744 13.8232 1.53033 13.5303L7 8.06066L12.4697 13.5303C12.7626 13.8232 13.2374 13.8232 13.5303 13.5303C13.8232 13.2374 13.8232 12.7626 13.5303 12.4697L8.06066 7L13.5303 1.53033C13.8232 1.23744 13.8232 0.762563 13.5303 0.46967C13.2374 0.176777 12.7626 0.176777 12.4697 0.46967L7 5.93934L1.53033 0.46967Z" fill="black"></path>
    </svg>
  `;
  section.append(closeButton);

  const searchBlock = document.createElement('div');
  searchBlock.classList.add('search-autocomplete--block');
  section.append(searchBlock);

  const container = document.createElement('div');
  container.classList.add('search-autocomplete--container');
  searchBlock.append(container);

  const formPlaceholder = document.createElement('div');
  formPlaceholder.classList.add('search-autocomplete--form-placeholder');
  // The original HTML has a complex form structure here.
  // For EDS, we only recreate the placeholder div as the form logic is external.
  container.append(formPlaceholder);

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

  const trendingTitleSpan = document.createElement('span');
  trendingTitleSpan.classList.add('search-suggestion--title', 'utilityTagHighCaps', 'suggestion-item');
  if (trendingTitleRow) {
    const [titleCell] = [...trendingTitleRow.children]; // Fixed: Used destructuring for the cell
    moveInstrumentation(trendingTitleRow, trendingTitleSpan);
    trendingTitleSpan.textContent = titleCell?.textContent.trim();
  }
  searchSuggestionCell.append(trendingTitleSpan);

  const suggestionList = document.createElement('ul');
  suggestionList.classList.add('search-suggestion--list');
  searchSuggestionCell.append(suggestionList);

  suggestionItemRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('search-suggestion--list-item', 'suggestion-item');
    suggestionList.append(listItem);

    const suggestionBlock = document.createElement('div');
    suggestionBlock.classList.add('search-suggestion--block');
    listItem.append(suggestionBlock);

    const link = document.createElement('a');
    link.classList.add('search-suggestion--link');
    moveInstrumentation(row, link);

    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('search-suggestion--label', 'bodyMediumRegular');
    labelSpan.textContent = labelCell?.textContent.trim();
    link.append(labelSpan);
    suggestionBlock.append(link);
  });

  block.replaceChildren(section);
}
