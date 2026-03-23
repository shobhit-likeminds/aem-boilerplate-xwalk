import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rowWrapper = document.createElement('div');
  rowWrapper.classList.add('row');

  [...block.children].forEach((row) => {
    const cardCol = document.createElement('div');
    moveInstrumentation(row, cardCol);
    cardCol.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding');

    const card = document.createElement('div');
    card.classList.add('card', 'rs-card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let imageEl;
    let titleEl;
    let descriptionEl;

    // The BlockJson defines fields in order: image, title, description
    // So we should read cells in that specific order.
    const cells = [...row.children];
    if (cells[0]) { // Image
      imageEl = cells[0].querySelector('picture');
    }
    if (cells[1]) { // Title
      titleEl = cells[1];
    }
    if (cells[2]) { // Description
      descriptionEl = cells[2];
    }

    if (imageEl) {
      const img = imageEl.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.loading = 'lazy';
        newImg.classList.add('w-100', 'kitchens-image'); // Class from original HTML
        newImg.alt = img.alt || '';
        newImg.src = img.src;
        card.append(newImg);
      }
    }

    if (titleEl) {
      const h5Title = document.createElement('h5');
      h5Title.classList.add('blog-card-title'); // Class from original HTML
      moveInstrumentation(titleEl, h5Title);
      while (titleEl.firstChild) h5Title.append(titleEl.firstChild);
      cardBody.append(h5Title);
    }

    if (descriptionEl) {
      const pDescription = document.createElement('p'); // Changed to 'p' for description
      pDescription.classList.add('card-title'); // Class from original HTML
      moveInstrumentation(descriptionEl, pDescription);
      while (descriptionEl.firstChild) pDescription.append(descriptionEl.firstChild);
      cardBody.append(pDescription);
    }

    card.append(cardBody);
    cardCol.append(card);
    rowWrapper.append(cardCol);
  });

  rowWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(rowWrapper);

  // --- INTERACTIVITY CHECKS ---

  // 1. Navbar Toggler
  const navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarToggler) {
    navbarToggler.addEventListener('click', () => {
      const targetId = navbarToggler.dataset.target;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.classList.toggle('collapse');
        targetElement.classList.toggle('show');
        navbarToggler.classList.toggle('collapsed');
        navbarToggler.setAttribute('aria-expanded', targetElement.classList.contains('show'));
      }
    });
  }

  // 2. Country Selector Trigger (Modal)
  const countrySelectorTrigger = document.querySelector('.country-selector-trigger');
  const countryModal = document.getElementById('countryModal');
  if (countrySelectorTrigger && countryModal) {
    countrySelectorTrigger.addEventListener('click', () => {
      countryModal.classList.add('show');
      countryModal.style.display = 'block';
      countryModal.setAttribute('aria-modal', 'true');
      countryModal.setAttribute('role', 'dialog');
    });

    // Add event listener to close modal if it's not already handled by Bootstrap JS (EDS doesn't use it)
    const closeModalButtons = countryModal.querySelectorAll('[data-dismiss="modal"], .close');
    closeModalButtons.forEach((button) => {
      button.addEventListener('click', () => {
        countryModal.classList.remove('show');
        countryModal.style.display = 'none';
        countryModal.removeAttribute('aria-modal');
        countryModal.removeAttribute('role');
      });
    });

    // Close modal when clicking outside
    countryModal.addEventListener('click', (event) => {
      if (event.target === countryModal) {
        countryModal.classList.remove('show');
        countryModal.style.display = 'none';
        countryModal.removeAttribute('aria-modal');
        countryModal.removeAttribute('role');
      }
    });
  }

  // 3. Search Icon
  const searchIcon = document.getElementById('searchIcon');
  const searchBlock = document.getElementById('searchBlock');
  const searchContainer = document.getElementById('searchContainer');
  const searchResults = document.getElementById('searchResults');
  const closeButton = document.getElementById('closeButton');

  if (searchIcon && searchBlock && searchContainer && searchResults && closeButton) {
    searchIcon.addEventListener('click', () => {
      searchBlock.classList.remove('hidden');
      searchContainer.classList.remove('hidden');
      searchResults.classList.remove('hidden');
    });

    closeButton.addEventListener('click', () => {
      searchBlock.classList.add('hidden');
      searchContainer.classList.add('hidden');
      searchResults.classList.add('hidden');
    });
  }

  // 4. Carousel controls (assuming Bootstrap carousel is not used, and manual control is needed)
  // The HTML uses data-ride="carousel" and data-slide attributes, which imply Bootstrap JS.
  // Since EDS doesn't use Bootstrap JS, these need to be handled manually if the carousel is to be interactive.
  // For this review, we'll assume the carousel is driven by CSS or a separate script if not Bootstrap.
  // If manual JS control were needed, it would look something like this:
  // const carouselElements = document.querySelectorAll('.carousel.slide');
  // carouselElements.forEach((carousel) => {
  //   const prevButton = carousel.querySelector('.carousel-control-prev');
  //   const nextButton = carousel.querySelector('.carousel-control-next');
  //   if (prevButton) {
  //     prevButton.addEventListener('click', (e) => {
  //       e.preventDefault();
  //       // Implement logic to go to previous slide
  //     });
  //   }
  //   if (nextButton) {
  //     nextButton.addEventListener('click', (e) => {
  //       e.preventDefault();
  //       // Implement logic to go to next slide
  //     });
  //   }
  // });
}
