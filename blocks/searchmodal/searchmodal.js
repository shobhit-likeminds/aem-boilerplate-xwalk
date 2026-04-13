import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'searchmodal');
  modal.id = 'searchPopModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'searchPopModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  moveInstrumentation(block, modal);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalDialog.append(modalContent);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalContent.append(modalBody);

  const searchPops = document.createElement('div');
  searchPops.classList.add('searchpops');
  modalBody.append(searchPops);

  const searchHeader = document.createElement('div');
  searchHeader.classList.add('search-header');
  searchPops.append(searchHeader);

  const inpBlock = document.createElement('div');
  inpBlock.classList.add('inp-block');
  searchHeader.append(inpBlock);

  const searchForm = document.createElement('form');
  searchForm.classList.add('search-form');
  searchForm.id = 'search-form_popup';
  searchForm.setAttribute('data-drupal-selector', 'search-form');
  searchForm.setAttribute('action', 'https://bandhan.bank.in//search/results');
  searchForm.setAttribute('method', 'get');
  searchForm.setAttribute('name', 'search-form1');
  searchForm.setAttribute('accept-charset', 'UTF-8');
  inpBlock.append(searchForm);

  const searchClose = document.createElement('a');
  searchClose.classList.add('searchclose');
  // The original HTML uses data-dismiss="modal" for closing, which implies Bootstrap JS.
  // In EDS, we handle this manually.
  searchClose.addEventListener('click', () => modal.classList.remove('show'));
  searchForm.append(searchClose);

  const closeImg = document.createElement('img');
  closeImg.alt = 'svg file';
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776064347894.svg+xml';
  searchClose.append(closeImg);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('form-control', 'search-input');
  searchInput.id = 'search_product_click';
  searchInput.name = 'keys';
  searchInput.value = '';
  searchInput.placeholder = 'Can we help you find something?';
  searchForm.append(searchInput);

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');
  searchForm.append(actionsDiv);

  const span = document.createElement('span');
  span.classList.add('d-inline-block', 'align-middle');
  actionsDiv.append(span);

  const searchButton = document.createElement('button');
  searchButton.type = 'button'; // Changed from 'submit' to 'button' as per original HTML
  searchButton.id = 'search_form_button_popup';
  // Add event listener to submit the form when the search button is clicked
  searchButton.addEventListener('click', () => {
    searchForm.submit();
  });
  span.append(searchButton);

  const searchButtonImg = document.createElement('img');
  searchButtonImg.alt = 'svg file';
  searchButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776064347947.svg+xml';
  searchButton.append(searchButtonImg);

  const searchSuggestions = document.createElement('div');
  searchSuggestions.classList.add('search-suggestions');
  searchSuggestions.id = 'suggesstion-box';
  searchPops.append(searchSuggestions);

  block.textContent = '';
  block.append(modal);

  // Add event listener to open the modal (assuming a trigger exists elsewhere)
  // For demonstration, let's assume a button with id 'openSearchModal' exists
  // const openSearchModalBtn = document.getElementById('openSearchModal');
  // if (openSearchModalBtn) {
  //   openSearchModalBtn.addEventListener('click', () => modal.classList.add('show'));
  // }

  // Close modal when clicking outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
}
