import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use content detection instead of direct index access for robustness
  const cells = [...block.children].map((row) => [...row.children]);

  const placeholderCell = cells.find((row) => row[0]?.textContent.trim())?.[0];
  const iconCell = cells.find((row) => row[0]?.querySelector('picture'))?.[0];
  const inputIconCell = cells.find((row) => row[0]?.querySelector('picture') && row !== iconCell?.parentElement.children)?.[0]; // Differentiate from main icon

  const search = document.createElement('search');
  search.classList.add('e-search');
  search.setAttribute('role', 'search');

  const form = document.createElement('form');
  form.classList.add('e-search-form');
  form.setAttribute('action', '#'); // Action can be dynamic if needed, for now use #
  form.setAttribute('method', 'get');

  // Label and icon
  const label = document.createElement('label');
  label.classList.add('e-search-label');
  label.setAttribute('for', 'search-input'); // Use a generic ID
  if (iconCell) {
    moveInstrumentation(iconCell.parentElement, label); // Move instrumentation from the row containing the icon
  }

  const screenOnlySpan = document.createElement('span');
  screenOnlySpan.classList.add('elementor-screen-only');
  screenOnlySpan.textContent = 'Search';
  label.append(screenOnlySpan);

  if (iconCell) {
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        label.append(optimizedPic);
      }
    }
  }

  // Input wrapper
  const inputWrapper = document.createElement('div');
  inputWrapper.classList.add('e-search-input-wrapper');

  const input = document.createElement('input');
  input.classList.add('e-search-input');
  input.setAttribute('id', 'search-input'); // Use a generic ID
  input.setAttribute('type', 'search');
  input.setAttribute('name', 's');
  input.setAttribute('value', '');
  input.setAttribute('autocomplete', 'on');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', 'results-search-input');
  input.setAttribute('aria-haspopup', 'listbox');

  if (placeholderCell) {
    input.setAttribute('placeholder', placeholderCell.textContent.trim());
    moveInstrumentation(placeholderCell.parentElement, input); // Move instrumentation from the row containing the placeholder
  }

  inputWrapper.append(input);

  // Input Icon
  if (inputIconCell) {
    const inputIconPicture = inputIconCell.querySelector('picture');
    if (inputIconPicture) {
      const img = inputIconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        inputWrapper.append(optimizedPic);
      }
    }
  }

  const output = document.createElement('output');
  output.classList.add('e-search-results-container', 'hide-loader');
  output.setAttribute('id', 'results-search-input');
  output.setAttribute('aria-live', 'polite');
  output.setAttribute('aria-atomic', 'true');
  output.setAttribute('aria-label', 'Results for search');
  output.setAttribute('tabindex', '0');

  const resultsDiv = document.createElement('div');
  resultsDiv.classList.add('e-search-results');
  output.append(resultsDiv);
  inputWrapper.append(output);

  // Submit button
  const submitButton = document.createElement('button');
  submitButton.classList.add('e-search-submit', 'elementor-screen-only');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('aria-label', 'Search');

  form.append(label, inputWrapper, submitButton);
  search.append(form);

  block.textContent = '';
  block.append(search);

  // --- Interactivity ---
  // Handle focus/blur for input to show/hide results container
  input.addEventListener('focus', () => {
    output.classList.remove('hide-loader'); // Assuming 'hide-loader' hides the results
    input.setAttribute('aria-expanded', 'true');
  });

  input.addEventListener('blur', (event) => {
    // Delay hiding to allow click on results
    setTimeout(() => {
      if (!output.contains(document.activeElement)) {
        output.classList.add('hide-loader');
        input.setAttribute('aria-expanded', 'false');
      }
    }, 100);
  });

  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    const searchTerm = input.value.trim();
    if (searchTerm) {
      // In a real scenario, you would fetch search results here
      // For now, simulate some results
      resultsDiv.innerHTML = `<p>Searching for: <strong>${searchTerm}</strong></p>`;
      output.classList.remove('hide-loader');
      input.setAttribute('aria-expanded', 'true');
      // Example: redirect to a search results page
      // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    } else {
      resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
      output.classList.remove('hide-loader');
      input.setAttribute('aria-expanded', 'true');
    }
  });
}
