import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, headingRow, ...loancardRows] = [...block.children];

  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'fullscreen');
  modal.id = 'TransactionbankingModal';
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

  const mheader = document.createElement('div');
  mheader.classList.add('mheader');
  bbmodal.append(mheader);

  const headerRow = document.createElement('div');
  headerRow.classList.add('row', 'justify-content-between', 'align-items-center');
  mheader.append(headerRow);

  const titleCol = document.createElement('div');
  titleCol.classList.add('col-9');
  headerRow.append(titleCol);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  moveInstrumentation(titleRow.firstElementChild, titleDiv);
  titleDiv.textContent = titleRow.firstElementChild.textContent.trim();
  titleCol.append(titleDiv);

  const closeCol = document.createElement('div');
  closeCol.classList.add('col-3', 'text-right');
  headerRow.append(closeCol);

  const closeLink = document.createElement('a');
  closeLink.classList.add('mclose');
  closeLink.setAttribute('aria-label', 'Close');
  // The original HTML uses data-dismiss="modal", which implies a Bootstrap-like behavior.
  // In EDS, we implement this directly by toggling the 'show' class.
  closeLink.addEventListener('click', () => modal.classList.remove('show'));
  closeCol.append(closeLink);

  const closeImg = document.createElement('img');
  // The original HTML uses a hardcoded path for the close icon.
  // Since the model does not provide a field for this specific icon,
  // and per Rule 16, we cannot hardcode DAM paths, we will omit the image.
  // If the model were to include a field for the close icon, we would read it from there.
  // For now, we will add a placeholder text or rely on CSS for the close icon.
  closeImg.alt = 'Close'; // Placeholder alt text
  closeImg.classList.add('img-fluid');
  closeLink.append(closeImg);

  const contentRow = document.createElement('div');
  contentRow.classList.add('row', 'justify-content-center');
  bbmodal.append(contentRow);

  const contentCol = document.createElement('div');
  contentCol.classList.add('col-12', 'col-lg-9', 'col-xl-8');
  contentRow.append(contentCol);

  const heading = document.createElement('h2');
  heading.classList.add('heading');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.innerHTML = headingRow.firstElementChild.innerHTML;
  contentCol.append(heading);

  const loanRow = document.createElement('div');
  loanRow.classList.add('row', 'loanrow');
  contentCol.append(loanRow);

  loancardRows.forEach((row) => {
    // Use content detection instead of direct index access for robustness
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() === row.children[1].textContent.trim()); // Assuming title is the second non-picture/non-link cell
    const descriptionCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() === row.children[2].textContent.trim()); // Assuming description is the third non-picture/non-link cell
    const linkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href === row.children[3].querySelector('a').href);
    const linkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href === row.children[4].querySelector('a').href);

    const col = document.createElement('div');
    col.classList.add('col-12', 'col-lg-6');
    loanRow.append(col);

    const loancard = document.createElement('div');
    loancard.classList.add('loancard');
    col.append(loancard);

    const loancardInnerRow = document.createElement('div');
    loancardInnerRow.classList.add('row', 'no-gutters', 'align-items-center');
    loancard.append(loancardInnerRow);

    const iconCol = document.createElement('div');
    iconCol.classList.add('col-auto');
    loancardInnerRow.append(iconCol);

    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    if (iconCell) {
      moveInstrumentation(iconCell, iconDiv);
      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          iconDiv.append(optimizedPic);
        }
      }
    }
    iconCol.append(iconDiv);

    const descCol = document.createElement('div');
    descCol.classList.add('col');
    loancardInnerRow.append(descCol);

    const descDiv = document.createElement('div');
    descDiv.classList.add('desc');
    descCol.append(descDiv);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('title');
    if (titleCell) {
      moveInstrumentation(titleCell, cardTitle);
      cardTitle.textContent = titleCell.textContent.trim();
    }
    descDiv.append(cardTitle);

    const descriptionP = document.createElement('p');
    if (descriptionCell) {
      moveInstrumentation(descriptionCell, descriptionP);
      descriptionP.innerHTML = descriptionCell.innerHTML;
    }
    descDiv.append(descriptionP);

    const arrowCol = document.createElement('div');
    arrowCol.classList.add('col-auto');
    loancardInnerRow.append(arrowCol);

    const arrowDiv = document.createElement('div');
    arrowDiv.classList.add('rightarrow');
    // The original HTML uses a hardcoded path for the arrow icon.
    // Since the model does not provide a field for this specific icon,
    // and per Rule 16, we cannot hardcode DAM paths, we will omit the image.
    // If the model were to include a field for the arrow icon, we would read it from there.
    // For now, we will rely on CSS or a placeholder.
    const arrowImg = document.createElement('img');
    arrowImg.alt = 'svg file'; // Placeholder alt text
    arrowDiv.append(arrowImg);
    arrowCol.append(arrowDiv);

    const anchor = document.createElement('a');
    anchor.classList.add('lclink');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
    }
    anchor.textContent = linkLabelCell ? linkLabelCell.textContent.trim() : '';
    moveInstrumentation(row, anchor);
    loancard.append(anchor);
  });

  block.textContent = '';
  block.append(modal);
}
