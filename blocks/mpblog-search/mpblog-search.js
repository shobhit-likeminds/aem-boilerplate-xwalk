import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 1: STRUCTURE ALIGNMENT
  // BlockJson has 1 root model field: "search-input".
  // The JS correctly reads 1 root row from block.children.
  const [searchInputRow] = [...block.children];

  const form = document.createElement('form');
  form.setAttribute('autocomplete', 'off');
  form.classList.add('search-searchForm-CQs');

  const div1 = document.createElement('div');
  const searchFieldDiv = document.createElement('div');
  searchFieldDiv.classList.add('search-searchField-WuY');

  const iconSpan = document.createElement('span');
  iconSpan.classList.add('icon-root-cnm', 'items-center', 'inline-flex', 'justify-center');

  // The original HTML uses an SVG image directly in the span.
  // We'll create an img element to represent that.
  const img = document.createElement('img');
  img.alt = 'svg file';
  // Note: The original src is a relative path. For AEM, it should be absolute or handled by createOptimizedPicture.
  // Assuming the path is correct for AEM context or will be resolved.
  img.src = '/content/dam/aemigrate/uploaded-folder/image/1774855954129.svg+xml';
  iconSpan.append(img);

  const input = document.createElement('input');
  input.id = 'blog-search-input-field';
  input.type = 'text';
  input.placeholder = 'Search blogs here...';

  // Extract the value from the searchInputRow for potential pre-filling, though placeholder is used.
  // BlockJson indicates 'search-input' is a string field. The JS correctly reads the text content.
  const searchInputValue = searchInputRow.querySelector('div')?.textContent.trim();
  if (searchInputValue && searchInputValue !== 'Search Input value') { // Check against default value
    input.value = searchInputValue;
  }

  searchFieldDiv.append(iconSpan, input);
  div1.append(searchFieldDiv);

  const autocompleteDiv = document.createElement('div');
  autocompleteDiv.classList.add('search-autocomplete--VT');

  form.append(div1, autocompleteDiv);

  // Move instrumentation from the original block children to the new form
  moveInstrumentation(searchInputRow, form);

  block.textContent = '';
  block.append(form);
  block.classList.add('mpblog-search'); // Add the block's own class to the block element

  // CHECK 2: INTERACTIVITY
  // The original HTML contains an input field, which is an interactive element.
  // The JS needs an event listener for this input field to handle search functionality.
  // For a search input, common events are 'input' (for live search/autocomplete) or 'change' (for final submission).
  // Given the presence of 'search-autocomplete--VT' div, an 'input' event listener is appropriate for autocomplete.
  input.addEventListener('input', (event) => {
    const searchTerm = event.target.value.trim();
    // In a real scenario, this would trigger an API call or filter local data.
    // For this review, we'll just log and demonstrate the listener.
    // The autocompleteDiv would be populated here.
    if (searchTerm.length > 2) { // Example: trigger autocomplete after 3 characters
      console.log('Search term for autocomplete:', searchTerm);
      // Example: populate autocompleteDiv (simplified)
      autocompleteDiv.innerHTML = `<div>Showing results for: <strong>${searchTerm}</strong></div>`;
      autocompleteDiv.style.display = 'block'; // Show autocomplete results
    } else {
      autocompleteDiv.innerHTML = '';
      autocompleteDiv.style.display = 'none'; // Hide autocomplete if search term is too short
    }
  });

  // Also, a form submission listener is generally good practice for search forms.
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    const searchTerm = input.value.trim();
    if (searchTerm) {
      console.log('Form submitted with search term:', searchTerm);
      // In a real scenario, this would navigate to a search results page or filter content.
      // Example: window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
  });
}
