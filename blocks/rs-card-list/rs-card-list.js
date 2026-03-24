import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardListContainer = document.createElement('div');
  cardListContainer.classList.add('rs-cards');

  const row = document.createElement('div');
  row.classList.add('row');

  // Skip the first row which is the container label "Cards value"
  const itemRows = [...block.children].slice(1);

  itemRows.forEach((itemRow) => {
    const [imageCell, titleCell, descriptionCell] = [...itemRow.children];

    const col = document.createElement('div');
    col.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding');
    moveInstrumentation(itemRow, col);

    const card = document.createElement('div');
    card.classList.add('card', 'rs-card');

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        card.append(optimizedPic);
        // Apply classes from original HTML. The original HTML shows 'kitchens-image' for the displayed image.
        optimizedPic.classList.add('w-100', 'kitchens-image');
      }
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Title
    const titleElement = document.createElement('h5');
    // Use blog-card-title for the title as per original HTML
    titleElement.classList.add('blog-card-title');
    while (titleCell.firstChild) titleElement.append(titleCell.firstChild);
    cardBody.append(titleElement);

    // Description
    const descriptionElement = document.createElement('h5'); // Original HTML uses h5 for description
    // Use card-title for the description as per original HTML
    descriptionElement.classList.add('card-title');
    while (descriptionCell.firstChild) descriptionElement.append(descriptionCell.firstChild);
    cardBody.append(descriptionElement);

    card.append(cardBody);
    col.append(card);
    row.append(col);
  });

  cardListContainer.append(row);
  block.textContent = '';
  block.append(cardListContainer);

  // --- Interactivity Checks and Fixes ---

  // 1. Navbar Toggler
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
      navbarToggler.classList.toggle('collapsed');
      navbarToggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
    });
  }

  // 2. Country Selector Modal
  const countrySelectorTrigger = document.querySelector('.country-selector-trigger');
  const countryModal = document.getElementById('countryModal');
  if (countrySelectorTrigger && countryModal) {
    countrySelectorTrigger.addEventListener('click', () => {
      countryModal.classList.add('show');
      countryModal.style.display = 'block';
      countryModal.setAttribute('aria-modal', 'true');
      countryModal.setAttribute('role', 'dialog');
    });

    // Close modal if clicked outside or on a country option
    countryModal.addEventListener('click', (event) => {
      if (event.target === countryModal || event.target.closest('.country-option')) {
        countryModal.classList.remove('show');
        countryModal.style.display = 'none';
        countryModal.setAttribute('aria-modal', 'false');
        countryModal.removeAttribute('role');
      }
    });

    // Handle country selection
    countryModal.querySelectorAll('.country-option').forEach((option) => {
      option.addEventListener('click', () => {
        // Remove 'selected' from all options
        countryModal.querySelectorAll('.country-option').forEach((opt) => opt.classList.remove('selected'));
        // Add 'selected' to the clicked option
        option.classList.add('selected');

        const countryCodeSpan = document.querySelector('.country-code');
        const headerCountryFlag = document.querySelector('.header-country-flag');
        const selectedCountry = option.dataset.country;
        const flagIn = countrySelectorTrigger.dataset.flagIn;
        const flagUsa = countrySelectorTrigger.dataset.flagUsa;

        if (countryCodeSpan) {
          countryCodeSpan.textContent = selectedCountry.toUpperCase();
        }
        if (headerCountryFlag) {
          headerCountryFlag.src = selectedCountry === 'india' ? flagIn : flagUsa;
        }
        // Optionally redirect or update content based on country selection
        // window.location.href = option.dataset.url;
      });
    });
  }

  // 3. Search Functionality
  const searchIcon = document.getElementById('searchIcon');
  const searchBlock = document.getElementById('searchBlock');
  const searchContainer = document.getElementById('searchContainer');
  const closeButton = document.getElementById('closeButton');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');
  const suggestionsList = document.getElementById('suggestionsList');
  const productsList = document.getElementById('productsList');
  const viewAllButton = document.getElementById('viewAllButton');

  if (searchIcon && searchBlock && searchContainer && closeButton && searchInput && searchButton && searchResults) {
    searchIcon.addEventListener('click', (event) => {
      event.preventDefault();
      searchBlock.classList.toggle('hidden');
      searchContainer.classList.toggle('hidden');
      searchResults.classList.add('hidden'); // Hide results when opening search box
      if (!searchBlock.classList.contains('hidden')) {
        searchInput.focus();
      }
    });

    closeButton.addEventListener('click', () => {
      searchBlock.classList.add('hidden');
      searchContainer.classList.add('hidden');
      searchResults.classList.add('hidden');
      searchInput.value = '';
      suggestionsList.innerHTML = '';
      productsList.innerHTML = '';
    });

    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        // Simulate search results
        suggestionsList.innerHTML = `<li>Suggestion for "${query}"</li>`;
        productsList.innerHTML = `<li>Product related to "${query}"</li>`;
        searchResults.classList.remove('hidden');
      } else {
        searchResults.classList.add('hidden');
      }
    });

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      if (query.length > 2) { // Show suggestions after 2 characters
        // Simulate live suggestions
        suggestionsList.innerHTML = `<li>Live suggestion 1 for "${query}"</li><li>Live suggestion 2 for "${query}"</li>`;
        productsList.innerHTML = ''; // Clear products for live suggestions
        searchResults.classList.remove('hidden');
      } else {
        suggestionsList.innerHTML = '';
        productsList.innerHTML = '';
        searchResults.classList.add('hidden');
      }
    });

    if (viewAllButton) {
      viewAllButton.addEventListener('click', () => {
        // Implement navigation to a full search results page
        console.log('View All Items clicked');
        // Example: window.location.href = `/search?q=${searchInput.value}`;
      });
    }
  }

  // 4. Carousels (main banner carousel and club carousel)
  // Re-initialize Bootstrap-like carousel behavior if it's not handled by a separate script
  // This assumes a simple toggle for 'active' class based on prev/next clicks or indicator clicks.
  // For a full Bootstrap carousel, a more robust implementation or a library would be needed.

  function setupCarousel(carouselId) {
    const carouselElement = document.getElementById(carouselId);
    if (!carouselElement) return;

    const carouselItems = carouselElement.querySelectorAll('.carousel-item');
    const carouselIndicators = carouselElement.querySelectorAll('.carousel-indicators li');
    const prevButton = carouselElement.querySelector('.carousel-control-prev');
    const nextButton = carouselElement.querySelector('.carousel-control-next');
    let currentIndex = [...carouselItems].findIndex(item => item.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0; // Default to first item if none active

    const updateCarousel = (newIndex) => {
      carouselItems[currentIndex].classList.remove('active');
      carouselIndicators[currentIndex].classList.remove('active');
      carouselItems[newIndex].classList.add('active');
      carouselIndicators[newIndex].classList.add('active');
      currentIndex = newIndex;
    };

    if (prevButton) {
      prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        const newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel(newIndex);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        const newIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel(newIndex);
      });
    }

    carouselIndicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        updateCarousel(index);
      });
    });
  }

  setupCarousel('carouselExampleSlidesOnly'); // Main banner carousel
  setupCarousel('carousel'); // ITC Club carousel
}
