import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [modalTitleRow, headingRow, ...loanCardRows] = [...block.children];

  const modalTitle = modalTitleRow.firstElementChild.textContent.trim();
  const heading = headingRow.firstElementChild.textContent.trim();

  // Create the modal structure
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'fullscreen');
  modal.id = 'loanModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'loanModalLabel');
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

  const closeButton = document.createElement('a');
  closeButton.classList.add('mclose');
  closeButton.setAttribute('aria-label', 'Close');
  col3.append(closeButton);

  // The close button image is an SVG, so we need to create it and get its src from the original HTML
  // Since the block model doesn't have a close button image, we need to get it from the original HTML.
  // We cannot hardcode the path. For this specific case, we'll create a placeholder and rely on CSS
  // or a global script to set the background image if it's not provided in the block.
  // Given the instruction "Never hardcode DAM paths or site-specific asset URLs",
  // and the block model not having a field for this icon, we cannot include the image.
  // We will create the <img> element but leave its src empty, assuming it will be styled by CSS.
  const closeImg = document.createElement('img');
  closeImg.classList.add('img-fluid');
  closeImg.alt = ''; // Alt text is empty in original HTML
  closeButton.append(closeImg);

  closeButton.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
  });

  // Main content area
  const mainContentRow = document.createElement('div');
  mainContentRow.classList.add('row', 'justify-content-center');
  bbmodal.append(mainContentRow);

  const mainContentCol = document.createElement('div');
  mainContentCol.classList.add('col-12', 'col-lg-9', 'col-xl-8');
  mainContentRow.append(mainContentCol);

  const headingEl = document.createElement('h2');
  headingEl.classList.add('heading');
  headingEl.innerHTML = heading; // Use innerHTML to preserve strong tags if present
  mainContentCol.append(headingEl);

  const loanRowContainer = document.createElement('div');
  loanRowContainer.classList.add('row', 'loanrow');
  mainContentCol.append(loanRowContainer);

  loanCardRows.forEach((row) => {
    const [iconCell, titleCell, descriptionCell, loanLinkCell, loanLinkLabelCell] = [...row.children];

    const col = document.createElement('div');
    col.classList.add('col-12', 'col-lg-6');
    moveInstrumentation(row, col); // Move instrumentation from original row to new col

    const loanCard = document.createElement('div');
    loanCard.classList.add('loancard');
    col.append(loanCard);

    const cardInnerRow = document.createElement('div');
    cardInnerRow.classList.add('row', 'no-gutters', 'align-items-center');
    loanCard.append(cardInnerRow);

    // Icon
    const iconCol = document.createElement('div');
    iconCol.classList.add('col-auto');
    cardInnerRow.append(iconCol);

    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    moveInstrumentation(iconCell, iconDiv);
    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '402' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      iconDiv.append(optimizedPic);
    }
    iconCol.append(iconDiv);

    // Description
    const descCol = document.createElement('div');
    descCol.classList.add('col');
    cardInnerRow.append(descCol);

    const descDiv = document.createElement('div');
    descDiv.classList.add('desc');
    descCol.append(descDiv);

    const titleDivCard = document.createElement('div');
    titleDivCard.classList.add('title');
    moveInstrumentation(titleCell, titleDivCard);
    titleDivCard.textContent = titleCell.textContent.trim();
    descDiv.append(titleDivCard);

    const p = document.createElement('p');
    moveInstrumentation(descriptionCell, p);
    p.innerHTML = descriptionCell.innerHTML;
    descDiv.append(p);

    // Right Arrow
    const rightArrowCol = document.createElement('div');
    rightArrowCol.classList.add('col-auto');
    cardInnerRow.append(rightArrowCol);

    const rightArrowDiv = document.createElement('div');
    rightArrowDiv.classList.add('rightarrow');
    rightArrowCol.append(rightArrowDiv);

    // The right arrow image is an SVG in the original HTML.
    // Since the block model doesn't have a specific field for this,
    // we'll create the img element and rely on CSS or a global script
    // to set its source if it's not provided in the block.
    // As per the rule, we cannot hardcode the path.
    const rightArrowImg = document.createElement('img');
    rightArrowImg.alt = 'svg file'; // Alt text from original HTML
    rightArrowDiv.append(rightArrowImg);

    // Loan Link
    const loanLink = document.createElement('a');
    loanLink.classList.add('lclink');
    moveInstrumentation(loanLinkCell, loanLink);
    const foundLink = loanLinkCell.querySelector('a');
    if (foundLink) {
      loanLink.href = foundLink.href;
    }
    // Use the loanLinkLabel for the anchor text
    loanLink.textContent = loanLinkLabelCell ? loanLinkLabelCell.textContent.trim() : '';
    loanCard.append(loanLink);

    loanRowContainer.append(col);
  });

  // Optimize images
  modal.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(modal);
}
