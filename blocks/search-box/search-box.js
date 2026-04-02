import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0 & 1: Structure Alignment - Destructure block.children directly as per BlockJson model
  const [closeIconRow, searchPlaceholderRow, buttonLabelRow] = [...block.children];

  // Close Icon
  const closeLink = document.createElement('a');
  closeLink.href = 'JavaScript:Void(0);';
  closeLink.classList.add('search-close'); // Class from ORIGINAL HTML
  moveInstrumentation(closeIconRow, closeLink);
  const picture = closeIconRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      closeLink.append(optimizedPic);
    }
  }

  // Check 2: Interactivity - Add event listener for the close icon
  closeLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Assuming the close icon should hide the search box or trigger some UI change
    // For this example, we'll toggle a class on the parent block
    block.classList.toggle('search-box-closed');
    // Or, if it's part of a larger overlay, dispatch a custom event
    // block.dispatchEvent(new CustomEvent('search-box-close', { bubbles: true }));
  });

  // Search Box Main
  const searchBoxMain = document.createElement('div');
  searchBoxMain.classList.add('search-box-main'); // Class from ORIGINAL HTML

  // Search Input
  const searchInput = document.createElement('input');
  searchInput.name = 'ctl00$search$txtsearch';
  searchInput.type = 'text';
  searchInput.id = 'ctl00_search_txtsearch';
  const searchPlaceholderCell = searchPlaceholderRow.querySelector('div'); // Accessing the div within the row
  if (searchPlaceholderCell) {
    searchInput.placeholder = searchPlaceholderCell.textContent.trim();
  }
  moveInstrumentation(searchPlaceholderRow, searchInput);

  // Hidden Input (from original HTML, for JS functionality if needed)
  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'ctl00$search$ValidatorCalloutExtender9_ClientState';
  hiddenInput.id = 'ctl00_search_ValidatorCalloutExtender9_ClientState';

  // Search Button
  const searchButton = document.createElement('input');
  searchButton.type = 'submit';
  searchButton.name = 'ctl00$search$btnsearch';
  searchButton.id = 'ctl00_search_btnsearch';
  searchButton.classList.add('search-btn'); // Class from ORIGINAL HTML
  const buttonLabelCell = buttonLabelRow.querySelector('div'); // Accessing the div within the row
  if (buttonLabelCell) {
    searchButton.value = buttonLabelCell.textContent.trim();
  }
  moveInstrumentation(buttonLabelRow, searchButton);

  // Check 2: Interactivity - Add event listener for the search button (if it's not a form submit)
  // If this is part of a form, the submit type handles it. If it needs custom JS, add listener.
  // For now, assuming it's a standard form submit. If custom behavior is needed, uncomment and implement:
  // searchButton.addEventListener('click', (e) => {
  //   e.preventDefault(); // Prevent default form submission if handling via JS
  //   console.log('Search button clicked with value:', searchInput.value);
  //   // Implement custom search logic here
  // });


  searchBoxMain.append(searchInput, hiddenInput, searchButton);

  block.textContent = '';
  block.append(closeLink, searchBoxMain);
}
