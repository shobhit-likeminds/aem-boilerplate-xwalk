import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // BlockJson defines two root fields: "search-input" and "icon-image"
  // These correspond to block.children[0] and block.children[1] respectively.
  const [searchInputRow, iconImageRow] = [...block.children];

  const form = document.createElement('form');
  form.setAttribute('autocomplete', 'off');
  form.classList.add('search-searchForm-CQs');
  moveInstrumentation(block, form);

  const formDiv = document.createElement('div');
  form.append(formDiv);

  const searchFieldDiv = document.createElement('div');
  searchFieldDiv.classList.add('search-searchField-WuY');
  formDiv.append(searchFieldDiv);

  // Icon Image (from iconImageRow)
  const iconSpan = document.createElement('span');
  iconSpan.classList.add('icon-root-cnm', 'items-center', 'inline-flex', 'justify-center');
  moveInstrumentation(iconImageRow, iconSpan);

  // The picture is inside the first cell of the iconImageRow
  const picture = iconImageRow.children[0]?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconSpan.append(optimizedPic);
    }
  }
  searchFieldDiv.append(iconSpan);

  // Search Input (from searchInputRow)
  const input = document.createElement('input');
  input.setAttribute('id', 'blog-search-input-field');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Search blogs here...');
  // The search input value is in the first cell of the searchInputRow, but we don't need its value for the placeholder.
  // We only need the row for instrumentation.
  moveInstrumentation(searchInputRow, input);
  searchFieldDiv.append(input);

  const autocompleteDiv = document.createElement('div');
  autocompleteDiv.classList.add('search-autocomplete--VT');
  form.append(autocompleteDiv);

  block.textContent = '';
  block.append(form);

  // INTERACTIVITY: Add event listener for the search input field
  // When the input is focused or has text, the autocomplete div should be visible.
  // When it loses focus and is empty, it should be hidden.
  input.addEventListener('focus', () => {
    autocompleteDiv.classList.add('is-active'); // Assuming 'is-active' or similar class makes it visible
  });

  input.addEventListener('blur', () => {
    // Delay hiding to allow click on autocomplete suggestions if any
    setTimeout(() => {
      if (!input.value.trim()) {
        autocompleteDiv.classList.remove('is-active');
      }
    }, 100);
  });

  input.addEventListener('input', () => {
    if (input.value.trim()) {
      autocompleteDiv.classList.add('is-active');
      // In a real scenario, this would trigger an AJAX call to fetch autocomplete suggestions
      // and populate autocompleteDiv.
    } else {
      autocompleteDiv.classList.remove('is-active');
    }
  });
}
