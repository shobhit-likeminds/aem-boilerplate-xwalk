import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [modalTitleRow, headingRow, ...loanCardRows] = [...block.children];

  const modalTitle = modalTitleRow.firstElementChild.textContent.trim();
  const heading = headingRow.firstElementChild.textContent.trim();

  // Create modal structure
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'fullscreen');
  modal.id = 'SmallBusinessesModel';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'SmallBusinessesModel');
  modal.setAttribute('aria-hidden', 'true');

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

  // Modal Header
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
  titleDiv.textContent = modalTitle;
  col9.append(titleDiv);

  const col3 = document.createElement('div');
  col3.classList.add('col-3', 'text-right');
  headerRow.append(col3);

  const closeBtn = document.createElement('a');
  closeBtn.classList.add('mclose');
  closeBtn.setAttribute('aria-label', 'Close');
  // The original HTML uses data-dismiss="modal" which is Bootstrap specific.
  // We need to implement the closing logic manually.
  closeBtn.setAttribute('data-dismiss', 'modal'); // Keep for consistency if Bootstrap JS is present elsewhere

  col3.append(closeBtn);

  const closeImg = document.createElement('img');
  closeImg.classList.add('img-fluid');
  // Original HTML has a hardcoded path for the close icon.
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/close.png';
  closeImg.alt = 'Close'; // Add alt text for accessibility
  closeBtn.append(closeImg);

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  });

  // Main content row
  const mainContentRow = document.createElement('div');
  mainContentRow.classList.add('row', 'justify-content-center');
  bbmodal.append(mainContentRow);

  const mainCol = document.createElement('div');
  mainCol.classList.add('col-12', 'col-lg-9', 'col-xl-8');
  mainContentRow.append(mainCol);

  const headingEl = document.createElement('h2');
  headingEl.classList.add('heading');
  headingEl.innerHTML = heading; // Use innerHTML to preserve strong tags if present
  mainCol.append(headingEl);

  const loanRowContainer = document.createElement('div');
  loanRowContainer.classList.add('row', 'loanrow');
  mainCol.append(loanRowContainer);

  // Loan Cards
  loanCardRows.forEach((row) => {
    // CRITICAL FIX: Replaced row.children[n] with destructuring based on BlockJson model
    const [iconCell, titleCell, descriptionCell, linkCell, linkLabelCell] = [...row.children];

    const colLg6 = document.createElement('div');
    colLg6.classList.add('col-12', 'col-lg-6');
    loanRowContainer.append(colLg6);

    const loanCard = document.createElement('div');
    loanCard.classList.add('loancard');
    colLg6.append(loanCard);

    const cardContentRow = document.createElement('div');
    cardContentRow.classList.add('row', 'no-gutters', 'align-items-center');
    loanCard.append(cardContentRow);

    // Icon
    const iconCol = document.createElement('div');
    iconCol.classList.add('col-auto');
    cardContentRow.append(iconCol);

    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    moveInstrumentation(iconCell, iconDiv);
    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      // Use createOptimizedPicture for the icon image
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconDiv.append(optimizedPic);
    }
    iconCol.append(iconDiv);

    // Description
    const descCol = document.createElement('div');
    descCol.classList.add('col');
    cardContentRow.append(descCol);

    const descDiv = document.createElement('div');
    descDiv.classList.add('desc');
    descCol.append(descDiv);

    const loanTitleDiv = document.createElement('div');
    loanTitleDiv.classList.add('title');
    loanTitleDiv.textContent = titleCell.textContent.trim();
    moveInstrumentation(titleCell, loanTitleDiv);
    descDiv.append(loanTitleDiv);

    const pDesc = document.createElement('p');
    pDesc.textContent = descriptionCell.textContent.trim();
    moveInstrumentation(descriptionCell, pDesc);
    descDiv.append(pDesc);

    // Right Arrow
    const rightArrowCol = document.createElement('div');
    rightArrowCol.classList.add('col-auto');
    cardContentRow.append(rightArrowCol);

    const rightArrowDiv = document.createElement('div');
    rightArrowDiv.classList.add('rightarrow');
    rightArrowCol.append(rightArrowDiv);

    // The original HTML has a hardcoded SVG for the arrow.
    const arrowImg = document.createElement('img');
    arrowImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776064348056.svg+xml';
    arrowImg.alt = 'svg file'; // Add alt text for accessibility
    rightArrowDiv.append(arrowImg);

    // Loan Link
    const foundLink = linkCell.querySelector('a');
    const lclink = document.createElement('a');
    lclink.classList.add('lclink');
    if (foundLink) {
      lclink.href = foundLink.href;
    }
    // Set textContent from linkLabelCell
    lclink.textContent = linkLabelCell.textContent.trim();
    moveInstrumentation(linkCell, lclink);
    moveInstrumentation(linkLabelCell, lclink);
    loanCard.append(lclink);
  });

  // Replace the block content with the new modal structure
  block.textContent = '';
  block.append(modal);

  // Move instrumentation from the original block rows to the new modal structure
  // The first two rows (modalTitle, heading) are already processed.
  // The item rows (loanCardRows) are processed individually.
  // We need to move instrumentation from the block itself to the modal.
  moveInstrumentation(block, modal);
}
