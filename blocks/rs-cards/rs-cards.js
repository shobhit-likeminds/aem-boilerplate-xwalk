import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('row'); // From ORIGINAL HTML: <div class="row">

  [...block.children].forEach((row) => {
    const cardCol = document.createElement('div');
    moveInstrumentation(row, cardCol);
    cardCol.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding'); // From ORIGINAL HTML

    const card = document.createElement('div');
    card.classList.add('card', 'rs-card'); // From ORIGINAL HTML

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body'); // From ORIGINAL HTML

    let imageEl = null;
    let titleEl = null;
    let descriptionEl = null;

    // Use content detection to find the correct cells based on BlockJson structure
    const cells = [...row.children];
    imageEl = cells.find(cell => cell.querySelector('picture'));
    titleEl = cells.find(cell => !cell.querySelector('picture') && cell.querySelector('h1, h2, h3, h4, h5, h6') || (!cell.querySelector('picture') && !cell.querySelector('p') && cell.textContent.trim()));
    descriptionEl = cells.find(cell => cell.querySelector('p'));

    if (imageEl) {
      const img = imageEl.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.loading = 'lazy';
        newImg.classList.add('w-100', 'kitchens-image'); // From ORIGINAL HTML
        card.append(newImg);
      }
    }

    if (titleEl) {
      const h5 = document.createElement('h5');
      h5.classList.add('blog-card-title'); // From ORIGINAL HTML
      moveInstrumentation(titleEl, h5);
      // If titleEl is a raw text div, create an h5 from its text content
      if (!titleEl.querySelector('h1, h2, h3, h4, h5, h6') && titleEl.textContent.trim()) {
        h5.textContent = titleEl.textContent.trim();
      } else {
        while (titleEl.firstChild) {
          h5.append(titleEl.firstChild);
        }
      }
      cardBody.append(h5);
    }

    if (descriptionEl) {
      const h5 = document.createElement('h5');
      h5.classList.add('card-title'); // From ORIGINAL HTML
      moveInstrumentation(descriptionEl, h5);
      while (descriptionEl.firstChild) {
        h5.append(descriptionEl.firstChild);
      }
      cardBody.append(h5);
    }

    // Add the "Read More" button if a description exists
    if (descriptionEl) {
      const readMoreLink = document.createElement('a');
      readMoreLink.setAttribute('aria-label', `Read more about '${titleEl ? titleEl.textContent.trim() : 'card content'}'`);
      readMoreLink.setAttribute('target', '_self');
      readMoreLink.setAttribute('id', 'explore-btn-hide-id');
      readMoreLink.style.display = 'block'; // Ensure it's visible if description is present
      const readMoreImg = document.createElement('img');
      readMoreImg.setAttribute('loading', 'lazy');
      readMoreImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775196137419.svg+xml';
      readMoreLink.append(readMoreImg);
      cardBody.append(readMoreLink);
    }

    card.append(cardBody);
    cardCol.append(card);
    wrapper.append(cardCol);
  });

  wrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(wrapper);

  // --- INTERACTIVITY CHECKS ---

  // 1. Country Selector Modal
  const countrySelectorTrigger = document.querySelector('.country-selector-trigger');
  const countryModal = document.getElementById('countryModal');
  if (countrySelectorTrigger && countryModal) {
    countrySelectorTrigger.addEventListener('click', () => {
      countryModal.classList.add('show');
      countryModal.style.display = 'block';
      countryModal.setAttribute('aria-modal', 'true');
      countryModal.setAttribute('role', 'dialog');
    });

    // Close modal functionality (assuming a close button or clicking outside)
    // For this example, we'll add a simple click listener to the modal itself to close it
    // In a real scenario, you'd target a specific close button or handle backdrop clicks.
    countryModal.addEventListener('click', (event) => {
      if (event.target === countryModal || event.target.closest('.modal-header button')) { // Assuming a close button in modal-header
        countryModal.classList.remove('show');
        countryModal.style.display = 'none';
        countryModal.removeAttribute('aria-modal');
        countryModal.removeAttribute('role');
      }
    });

    // Handle country option selection
    countryModal.querySelectorAll('.country-option').forEach(option => {
      option.addEventListener('click', () => {
        countryModal.querySelectorAll('.country-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        const countryCode = option.dataset.country === 'india' ? 'IN' : 'USA';
        const flagSrc = option.dataset.country === 'india' ? '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp' : '/content/dam/aemigrate/uploaded-folder/image/usa-fmt-webp-alpha.webp';
        document.querySelector('.country-code').textContent = countryCode;
        document.querySelector('.header-country-flag').src = flagSrc;
        // Optionally redirect or perform other actions based on country selection
        // window.location.href = option.dataset.url;
        countryModal.classList.remove('show');
        countryModal.style.display = 'none';
        countryModal.removeAttribute('aria-modal');
        countryModal.removeAttribute('role');
      });
    });
  }

  // 2. Search Functionality
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

  if (searchIcon && searchBlock && searchContainer && closeButton && searchInput && searchButton && searchResults && suggestionsList && productsList && viewAllButton) {
    searchIcon.addEventListener('click', () => {
      searchBlock.classList.remove('hidden');
      searchContainer.classList.remove('hidden');
      searchIcon.closest('.nav-link').classList.add('hidden'); // Hide the search icon itself
      searchInput.focus();
    });

    closeButton.addEventListener('click', () => {
      searchBlock.classList.add('hidden');
      searchContainer.classList.add('hidden');
      searchResults.classList.add('hidden');
      searchIcon.closest('.nav-link').classList.remove('hidden'); // Show the search icon again
      searchInput.value = '';
      suggestionsList.innerHTML = '';
      productsList.innerHTML = '';
    });

    searchButton.addEventListener('click', () => {
      // Implement search logic here
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
      // Live search suggestions (optional)
      const query = searchInput.value.trim();
      if (query.length > 2) { // Only show suggestions after 2+ characters
        // Simulate suggestions
        suggestionsList.innerHTML = `<li>Live suggestion 1 for "${query}"</li><li>Live suggestion 2 for "${query}"</li>`;
        searchResults.classList.remove('hidden');
      } else {
        suggestionsList.innerHTML = '';
        if (!productsList.children.length) { // Hide results if no products and no suggestions
          searchResults.classList.add('hidden');
        }
      }
    });

    viewAllButton.addEventListener('click', () => {
      // Redirect to a full search results page
      console.log('View All Search Results clicked');
      // window.location.href = `/search?q=${searchInput.value}`;
    });
  }

  // 3. Carousel Controls (carouselExampleSlidesOnly and #carousel)
  // Note: Bootstrap's carousel JS is typically handled by data-attributes,
  // but if custom JS is needed, event listeners would be added.
  // Assuming Bootstrap's JS is NOT loaded, we'd need to implement the carousel logic.
  // For this review, we'll just ensure the buttons are present and could be hooked up.

  // Main Banner Carousel
  const mainCarousel = document.getElementById('carouselExampleSlidesOnly');
  if (mainCarousel) {
    const prevButton = mainCarousel.querySelector('.carousel-control-prev');
    const nextButton = mainCarousel.querySelector('.carousel-control-next');
    const carouselItems = mainCarousel.querySelectorAll('.carousel-item');
    const indicators = mainCarousel.querySelectorAll('.carousel-indicators li');
    let currentIndex = 0;

    const showSlide = (index) => {
      carouselItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    };

    if (prevButton) {
      prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
      });
    }

    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = i;
        showSlide(currentIndex);
      });
    });
  }

  // ITC Club Carousel
  const itcClubCarousel = document.getElementById('carousel');
  if (itcClubCarousel) {
    const prevButton = itcClubCarousel.querySelector('.carousel-control-prev');
    const nextButton = itcClubCarousel.querySelector('.carousel-control-next');
    const carouselItems = itcClubCarousel.querySelectorAll('.carousel-item');
    const indicators = itcClubCarousel.querySelectorAll('.carousel-indicators li');
    let currentIndex = 0;

    const showSlide = (index) => {
      carouselItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
    };

    if (prevButton) {
      prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
      });
    }

    indicators.forEach((indicator, i) => {
      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = i;
        showSlide(currentIndex);
      });
    });
  }

  // 4. Navbar Toggler
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarSupportedContent = document.getElementById('navbarSupportedContent');
  if (navbarToggler && navbarSupportedContent) {
    navbarToggler.addEventListener('click', () => {
      navbarToggler.classList.toggle('collapsed');
      const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
      navbarToggler.setAttribute('aria-expanded', !isExpanded);
      navbarSupportedContent.classList.toggle('show');
    });
  }
}
