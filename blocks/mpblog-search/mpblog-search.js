import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [searchInputRow] = [...block.children];

  const form = document.createElement('form');
  form.setAttribute('autocomplete', 'off');
  form.classList.add('search-searchForm-CQs');

  const div1 = document.createElement('div');
  const searchFieldDiv = document.createElement('div');
  searchFieldDiv.classList.add('search-searchField-WuY');

  const iconSpan = document.createElement('span');
  iconSpan.classList.add('icon-root-cnm', 'items-center', 'inline-flex', 'justify-center');

  // The original HTML has an <img> tag inside the span.
  // The searchInputRow's cell contains the image or text.
  const searchInputCell = searchInputRow.querySelector('div');
  const originalImg = searchInputCell.querySelector('img');

  if (originalImg) {
    const img = document.createElement('img');
    img.setAttribute('alt', originalImg.getAttribute('alt'));
    img.setAttribute('src', originalImg.getAttribute('src'));
    iconSpan.append(img);
  }

  const input = document.createElement('input');
  input.setAttribute('id', 'blog-search-input-field');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Search blogs here...');

  // Get the value from the searchInputRow cell for the input field.
  // If the cell contains an image, its textContent might be empty or just whitespace.
  // We should only set the value if it's actual text content.
  const inputValue = searchInputCell.textContent.trim();
  if (inputValue && inputValue !== 'Search Input value') { // Check if it's not the placeholder text
    input.value = inputValue;
  }

  searchFieldDiv.append(iconSpan, input);
  div1.append(searchFieldDiv);

  const autocompleteDiv = document.createElement('div');
  autocompleteDiv.classList.add('search-autocomplete--VT');

  form.append(div1, autocompleteDiv);

  moveInstrumentation(searchInputRow, form);
  block.textContent = '';
  block.append(form);

  // Add event listener for input field (interactivity)
  input.addEventListener('input', (event) => {
    // Implement search functionality here.
    // For example, you might fetch search results based on event.target.value
    // and populate the autocompleteDiv.
    console.log('Search input changed:', event.target.value);
    // Example: if you had an autocomplete dropdown, you'd show/hide it here
    // if (event.target.value.length > 2) {
    //   autocompleteDiv.classList.add('is-active');
    //   // Populate autocompleteDiv with results
    // } else {
    //   autocompleteDiv.classList.remove('is-active');
    // }
  });

  // Optimize any images that might have been moved
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
