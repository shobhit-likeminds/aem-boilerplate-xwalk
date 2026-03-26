import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    modalTitleRow,
    experienceTextRow,
    countryOptionsContainerRow,
    ...countryOptionRows
  ] = [...block.children];

  // Create the modal structure
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'itc-country-selector', 'show'); // Corrected class name
  modal.id = 'countryModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'countryModalLabel');
  modal.setAttribute('aria-modal', 'true');
  modal.style.display = 'block'; // Ensure it's visible initially

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  modal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalDialog.append(modalContent);

  // Modal Header
  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header', 'border-0', 'text-center');
  modalContent.append(modalHeader);

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('w-100');
  modalHeader.append(headerWrapper);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('modal-title');
  moveInstrumentation(modalTitleRow.firstElementChild, modalTitle);
  modalTitle.innerHTML = modalTitleRow.firstElementChild.innerHTML;
  headerWrapper.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('experience-text');
  moveInstrumentation(experienceTextRow.firstElementChild, experienceText);
  experienceText.innerHTML = experienceTextRow.firstElementChild.innerHTML;
  headerWrapper.append(experienceText);

  // Modal Body
  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalContent.append(modalBody);

  const countryOptions = document.createElement('div');
  countryOptions.classList.add('country-options', 'd-flex', 'justify-content-center', 'align-items-center');
  moveInstrumentation(countryOptionsContainerRow, countryOptions);
  modalBody.append(countryOptions);

  // Country Options
  countryOptionRows.forEach((row) => {
    const [countryFlagCell, countryNameCell, countryCodeCell, countryUrlCell] = [...row.children];

    const countryOption = document.createElement('div');
    countryOption.classList.add('country-option', 'mx-3', 'd-flex', 'flex-column', 'align-items-center');
    moveInstrumentation(row, countryOption);

    const countryCode = countryCodeCell.textContent.trim();
    countryOption.setAttribute('data-country', countryCode);

    const countryUrlLink = countryUrlCell.querySelector('a');
    if (countryUrlLink) {
      countryOption.setAttribute('data-url', countryUrlLink.href);
    }

    const countryFlagPicture = countryFlagCell.querySelector('picture');
    if (countryFlagPicture) {
      const countryFlagImg = countryFlagPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(countryFlagImg.src, countryFlagImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(countryFlagImg, optimizedPic.querySelector('img'));
      
      const imgEl = optimizedPic.querySelector('img');
      imgEl.classList.add('country-flag');
      // Add specific flag class if available, e.g., 'india-flag'
      if (countryCode) {
        imgEl.classList.add(`${countryCode.toLowerCase()}-flag`);
      }
      countryOption.append(optimizedPic);
    }

    const countryName = document.createElement('p');
    countryName.classList.add('country-name');
    moveInstrumentation(countryNameCell, countryName);
    countryName.textContent = countryNameCell.textContent.trim();
    countryOption.append(countryName);

    // Add click event listener for country option
    countryOption.addEventListener('click', () => {
      const url = countryOption.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });

    countryOptions.append(countryOption);
  });

  block.textContent = '';
  block.append(modal);
}
