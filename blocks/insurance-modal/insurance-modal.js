import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, headingRow, ...insuranceOptionRows] = [...block.children];

  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'fullscreen');
  modal.id = 'InsuranceModel';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'InsuranceModel');
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
  moveInstrumentation(titleRow, titleDiv);
  titleDiv.textContent = titleRow.firstElementChild.textContent.trim();
  col9.append(titleDiv);

  const col3 = document.createElement('div');
  col3.classList.add('col-3', 'text-right');
  headerRow.append(col3);

  const closeLink = document.createElement('a');
  closeLink.classList.add('mclose');
  closeLink.href = 'javascript:;';
  closeLink.setAttribute('aria-label', 'Close');
  // Replaced data-dismiss="modal" with explicit event listener for EDS compatibility
  closeLink.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  });
  col3.append(closeLink);

  const closeImg = document.createElement('img');
  closeImg.classList.add('img-fluid');
  // Using the image path from the original HTML
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/close.png';
  closeImg.alt = ''; // Original HTML has empty alt
  closeLink.append(closeImg);

  // Modal Body Content
  const contentRow = document.createElement('div');
  contentRow.classList.add('row', 'justify-content-center');
  bbmodal.append(contentRow);

  const contentCol = document.createElement('div');
  contentCol.classList.add('col-12', 'col-lg-9', 'col-xl-8');
  contentRow.append(contentCol);

  const heading = document.createElement('h2');
  heading.classList.add('heading');
  moveInstrumentation(headingRow, heading);
  while (headingRow.firstChild) heading.append(headingRow.firstChild);
  contentCol.append(heading);

  const loanRow = document.createElement('div');
  loanRow.classList.add('row', 'loanrow');
  contentCol.append(loanRow);

  insuranceOptionRows.forEach((row) => {
    const [titleCell, descriptionCell, iconCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col-12', 'col-lg-6');
    loanRow.append(col);

    const loanCard = document.createElement('div');
    loanCard.classList.add('loancard');
    moveInstrumentation(row, loanCard);
    col.append(loanCard);

    const cardRow = document.createElement('div');
    cardRow.classList.add('row', 'no-gutters', 'align-items-center');
    loanCard.append(cardRow);

    const iconCol = document.createElement('div');
    iconCol.classList.add('col-auto');
    cardRow.append(iconCol);

    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    moveInstrumentation(iconCell, iconDiv);
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconDiv.append(optimizedPic);
    }
    iconCol.append(iconDiv);

    const descCol = document.createElement('div');
    descCol.classList.add('col');
    cardRow.append(descCol);

    const descDiv = document.createElement('div');
    descDiv.classList.add('desc');
    descCol.append(descDiv);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('title');
    moveInstrumentation(titleCell, cardTitle);
    cardTitle.textContent = titleCell.textContent.trim();
    descDiv.append(cardTitle);

    const descriptionP = document.createElement('p');
    moveInstrumentation(descriptionCell, descriptionP);
    while (descriptionCell.firstChild) descriptionP.append(descriptionCell.firstChild);
    descDiv.append(descriptionP);

    const rightArrowCol = document.createElement('div');
    rightArrowCol.classList.add('col-auto');
    cardRow.append(rightArrowCol);

    const rightArrowDiv = document.createElement('div');
    rightArrowDiv.classList.add('rightarrow');
    rightArrowCol.append(rightArrowDiv);

    const rightArrowImg = document.createElement('img');
    // Using the image path from the original HTML
    rightArrowImg.alt = 'svg file'; // Original HTML alt
    rightArrowImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776064348056.svg+xml';
    rightArrowDiv.append(rightArrowImg);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('lclink');
    const originalCtaLink = ctaLinkCell.querySelector('a');
    if (originalCtaLink) {
      ctaLink.href = originalCtaLink.href;
    }
    // The original HTML has a non-breaking space for the link content, but the model provides a label.
    // Use the label text content for accessibility.
    ctaLink.textContent = ctaLinkLabelCell.textContent.trim() || '';
    moveInstrumentation(ctaLinkCell, ctaLink);
    loanCard.append(ctaLink);
  });

  block.textContent = '';
  block.append(modal);
}
