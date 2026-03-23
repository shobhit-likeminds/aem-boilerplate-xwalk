import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('rs-cards-container'); // Corrected prefix

  const row = document.createElement('div');
  row.classList.add('rs-cards-row'); // Corrected prefix
  cardsContainer.append(row);

  [...block.children].forEach((cardRow) => {
    const cardWrapper = document.createElement('div');
    moveInstrumentation(cardRow, cardWrapper);
    // Corrected prefixes for utility classes, assuming they are not block-specific
    cardWrapper.classList.add('container-col-xl-4', 'container-col-lg-6', 'container-pb-md-0', 'container-pb-4', 'container-row-gap-4', 'rs-cards-koi-rscard-padding');

    const card = document.createElement('div');
    card.classList.add('rs-cards-card', 'rs-cards-rs-card'); // Corrected prefixes
    cardWrapper.append(card);

    const cardBody = document.createElement('div');
    cardBody.classList.add('rs-cards-card-body'); // Corrected prefix

    // BlockJson model for 'rs-card' has 'image', 'title', 'description'
    // The JS should read exactly 3 cells per cardRow.
    const cells = [...cardRow.children];

    // Cell 0: Image
    const imageCell = cells[0];
    if (imageCell && imageCell.querySelector('picture')) {
      const picture = imageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        card.append(optimizedPic);
        optimizedPic.classList.add('container-w-100', 'rs-cards-kitchens-image'); // Corrected prefix
      }
    }

    // Cell 1: Title
    const titleCell = cells[1];
    if (titleCell) {
      const h5 = document.createElement('h5');
      h5.classList.add('rs-cards-card-title'); // Corrected prefix
      moveInstrumentation(titleCell, h5);
      while (titleCell.firstChild) h5.append(titleCell.firstChild);
      cardBody.append(h5);
    }

    // Cell 2: Description
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const p = document.createElement('p'); // Description is typically a paragraph
      p.classList.add('rs-cards-card-description'); // Added specific class for description
      moveInstrumentation(descriptionCell, p);
      while (descriptionCell.firstChild) p.append(descriptionCell.firstChild);
      cardBody.append(p);
    }

    // The original JS had an 'a' tag check, but the BlockJson does not define a link field.
    // Based on the HTML, the 'explore-btn-hide-id' link seems to be part of the card body,
    // but it's not explicitly in the BlockJson model for 'rs-card'.
    // If it's meant to be a separate field, it should be added to the BlockJson.
    // For now, assuming it's a child of the description or title, or an implicit part of the card.
    // If it's a separate field, it would be a 4th cell.
    // Given the HTML structure, it appears as a sibling to h5, but the BlockJson only has 3 fields.
    // Let's remove the 'a' tag handling as it's not in the BlockJson model.
    // If it was intended, the BlockJson would need a 'link' field.

    card.append(cardBody);
    row.append(cardWrapper);
  });

  block.textContent = '';
  block.append(cardsContainer);

  // --- INTERACTIVITY CHECKS ---

  // 1. Mobile Navigation Toggler
  const navbarToggler = document.querySelector('.container-navbar-toggler');
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('container-collapse'); // Assuming 'container-collapse' hides it
      navbarCollapse.classList.toggle('container-show'); // Assuming 'container-show' displays it
      navbarToggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('container-show'));
      navbarToggler.classList.toggle('container-collapsed'); // Toggle 'collapsed' class on button
    });
  }

  // 2. Country Selector Modal
  const countrySelectorTrigger = document.querySelector('.container-country-selector-trigger');
  const countryModal = document.getElementById('countryModal');
  if (countrySelectorTrigger && countryModal) {
    countrySelectorTrigger.addEventListener('click', () => {
      countryModal.classList.add('container-show');
      countryModal.style.display = 'block';
      countryModal.setAttribute('aria-modal', 'true');
      countryModal.removeAttribute('aria-hidden');
    });

    // Add event listener to close modal if clicking outside or on a close button
    const closeModal = () => {
      countryModal.classList.remove('container-show');
      countryModal.style.display = 'none';
      countryModal.setAttribute('aria-modal', 'false');
      countryModal.setAttribute('aria-hidden', 'true');
    };

    // Assuming there's a close button within the modal or clicking outside closes it
    // For simplicity, let's add a click listener to the modal itself to close it if clicked outside content
    countryModal.addEventListener('click', (event) => {
      if (event.target === countryModal) {
        closeModal();
      }
    });

    // If there's an explicit close button (e.g., an 'x' icon), add listener for that too
    const modalCloseButton = countryModal.querySelector('.container-modal-header button.close'); // Common pattern
    if (modalCloseButton) {
      modalCloseButton.addEventListener('click', closeModal);
    }

    // Handle country option selection
    countryModal.querySelectorAll('.container-country-option').forEach(option => {
      option.addEventListener('click', () => {
        // Remove 'selected' from all, add to clicked
        countryModal.querySelectorAll('.container-country-option').forEach(opt => opt.classList.remove('container-selected'));
        option.classList.add('container-selected');
        // Optionally, navigate or update UI based on selection
        const url = option.dataset.url;
        if (url) {
          // window.location.href = url; // Uncomment if navigation is desired
        }
        closeModal();
      });
    });
  }

  // 3. Search Functionality
  const searchIcon = document.getElementById('searchIcon');
  const searchBlock = document.getElementById('searchBlock');
  const closeButton = document.getElementById('closeButton');
  const searchContainer = document.getElementById('searchContainer');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');

  if (searchIcon && searchBlock && closeButton && searchContainer && searchInput && searchButton && searchResults) {
    searchIcon.addEventListener('click', () => {
      searchBlock.classList.remove('container-hidden');
      searchContainer.classList.remove('container-hidden');
      searchInput.focus();
    });

    closeButton.addEventListener('click', () => {
      searchBlock.classList.add('container-hidden');
      searchContainer.classList.add('container-hidden');
      searchResults.classList.add('container-hidden');
      searchInput.value = ''; // Clear search input
    });

    searchButton.addEventListener('click', () => {
      // Implement search logic here
      const query = searchInput.value;
      if (query) {
        console.log('Searching for:', query);
        // Display search results (example: toggle visibility)
        searchResults.classList.remove('container-hidden');
        // Populate searchResults with actual data based on 'query'
      } else {
        searchResults.classList.add('container-hidden');
      }
    });

    searchInput.addEventListener('input', () => {
      // Optional: Live search suggestions
      const query = searchInput.value;
      if (query.length > 2) { // Only show suggestions after 2 characters
        searchResults.classList.remove('container-hidden');
        // Populate suggestionsList and productsList
      } else {
        searchResults.classList.add('container-hidden');
      }
    });
  }
}
