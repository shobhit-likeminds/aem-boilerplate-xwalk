import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'fullscreen');
  modal.id = 'microloanModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'loanModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  moveInstrumentation(block, modal);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'modal-lg');
  modal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalDialog.append(modalContent);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalContent.append(modalBody);

  const bbmodal = document.createElement('div');
  bbmodal.classList.add('bbmodal');
  modalBody.append(bbmodal);

  const mheader = document.createElement('div');
  mheader.classList.add('mheader');
  bbmodal.append(mheader);

  const headerRow = document.createElement('div');
  headerRow.classList.add('row', 'justify-content-between', 'align-items-center');
  mheader.append(headerRow);

  const col9 = document.createElement('div');
  col9.classList.add('col-9');
  headerRow.append(col9);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  titleDiv.textContent = 'Micro Loans';
  col9.append(titleDiv);

  const col3 = document.createElement('div');
  col3.classList.add('col-3', 'text-right');
  headerRow.append(col3);

  const closeLink = document.createElement('a');
  closeLink.classList.add('mclose');
  closeLink.setAttribute('aria-label', 'Close');
  col3.append(closeLink);

  const closeImg = document.createElement('img');
  closeImg.classList.add('img-fluid');
  // The original HTML hardcodes the path, so we will use it directly.
  // If the model were to include an image field, we would use it here.
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/close.png';
  closeImg.alt = ''; // Alt text is empty in original HTML
  closeLink.append(closeImg);

  // Add event listener for close functionality
  closeLink.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    // For Bootstrap modals, you might also need to remove the 'modal-open' class from body
    // and potentially remove the backdrop if it's not handled automatically.
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  });

  const contentRow = document.createElement('div');
  contentRow.classList.add('row', 'justify-content-center');
  bbmodal.append(contentRow);

  const contentCol = document.createElement('div');
  contentCol.classList.add('col-12', 'col-lg-9', 'col-xl-8');
  contentRow.append(contentCol);

  const heading = document.createElement('h2');
  heading.classList.add('heading');
  heading.innerHTML = 'Choose from our <strong> Micro Loans</strong>';
  contentCol.append(heading);

  const loanRow = document.createElement('div');
  loanRow.classList.add('row', 'loanrow');
  contentCol.append(loanRow);

  block.textContent = '';
  block.append(modal);
}
