import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const form = document.createElement('form');
  form.setAttribute('autocomplete', 'off');
  form.classList.add('search-searchForm-CQs');

  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  div2.classList.add('search-searchField-WuY');

  const span = document.createElement('span');
  span.classList.add('icon-root-cnm', 'items-center', 'inline-flex', 'justify-center');

  const img = document.createElement('img');
  img.setAttribute('alt', 'svg file');
  img.setAttribute('src', '/content/dam/aemigrate/uploaded-folder/image/1774863123837.svg+xml');
  span.append(img);

  const input = document.createElement('input');
  input.setAttribute('id', 'blog-search-input-field');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Search blogs here...');

  // CHECK 0 & 1: Replaced row.children[0] with content detection
  // BlockJson indicates one field 'search-input' which maps to the first (and only) row.
  // The value is inside the div within that row.
  const [searchInputRow] = [...block.children];
  if (searchInputRow) {
    const searchInputCell = searchInputRow.querySelector('div'); // This targets the inner div containing the text
    if (searchInputCell) {
      const inputValue = searchInputCell.textContent.trim();
      // Only set value if it's not the default placeholder text from the authoring UI
      if (inputValue && inputValue !== 'Search Input value') {
        input.setAttribute('value', inputValue);
      }
    }
    moveInstrumentation(searchInputRow, input);
  }

  div2.append(span, input);
  div1.append(div2);

  const autocompleteDiv = document.createElement('div');
  autocompleteDiv.classList.add('search-autocomplete--VT');

  form.append(div1, autocompleteDiv);

  block.textContent = '';
  block.append(form);

  // CHECK 2: Interactivity - Add event listener for the search input
  // The original HTML has an input field, which implies user interaction (typing, submitting).
  // This listener can be expanded to handle search logic, autocomplete, etc.
  input.addEventListener('input', (event) => {
    // Example: Log the current input value
    // In a real scenario, this would trigger search suggestions or filter results
    console.log('Search input changed:', event.target.value);
    // You might want to add/remove classes to autocompleteDiv based on input
    if (event.target.value.length > 0) {
      autocompleteDiv.classList.add('is-active'); // Example class for showing autocomplete
      // Populate autocompleteDiv with suggestions here
    } else {
      autocompleteDiv.classList.remove('is-active');
      autocompleteDiv.innerHTML = ''; // Clear suggestions
    }
  });

  // Optional: Add a submit listener to the form if there's a search button or implicit submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted with value:', input.value);
    // Implement search logic here, e.g., redirect to a search results page
  });
}
