import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [modalTitleRow, closeIconRow, welcomeTextRow, ...chatOptionRows] = [...block.children];

  // Create the main modal structure
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade', 'fullscreen');
  modal.id = 'chatModal';
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'chatModalLabel');
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
  moveInstrumentation(modalTitleRow.firstElementChild, titleDiv);
  titleDiv.textContent = modalTitleRow.firstElementChild.textContent.trim();
  titleCol.append(titleDiv);

  const closeCol = document.createElement('div');
  closeCol.classList.add('col-3', 'text-right');
  headerRow.append(closeCol);

  const closeLink = document.createElement('a');
  closeLink.classList.add('mclose');
  closeLink.setAttribute('aria-label', 'Close');
  closeLink.addEventListener('click', () => modal.classList.remove('show')); // Rule 9
  closeCol.append(closeLink);

  const closeIconPicture = closeIconRow.querySelector('picture');
  if (closeIconPicture) {
    const img = closeIconPicture.querySelector('img');
    const closeIconImg = document.createElement('img');
    closeIconImg.src = img.src;
    closeIconImg.alt = img.alt;
    closeIconImg.classList.add('img-fluid', 'gg');
    moveInstrumentation(img, closeIconImg);
    closeLink.append(closeIconImg);
    // Optimize the close icon image
    const optimizedPic = createOptimizedPicture(closeIconImg.src, closeIconImg.alt, false, [{ width: 'auto' }]);
    closeIconPicture.replaceWith(optimizedPic);
  }

  const chatOne = document.createElement('div');
  chatOne.id = 'chatone';
  chatOne.classList.add('chatpops');
  modalBody.append(chatOne);

  const nameDiv = document.createElement('div');
  nameDiv.classList.add('name');
  nameDiv.innerHTML = 'Sure <span class="showName"></span>,';
  chatOne.append(nameDiv);

  const welcomeDiv = document.createElement('div');
  welcomeDiv.classList.add('welcome', 'text-blue');
  welcomeDiv.id = 'chat_model_first_heading';
  moveInstrumentation(welcomeTextRow.firstElementChild, welcomeDiv);
  welcomeDiv.textContent = welcomeTextRow.firstElementChild.textContent.trim();
  chatOne.append(welcomeDiv);

  const chatCardsWrap = document.createElement('div');
  chatCardsWrap.classList.add('chatcardswrap');
  chatOne.append(chatCardsWrap);

  const cardsRowContainer = document.createElement('div');
  cardsRowContainer.classList.add('row', 'no-gutters', 'justify-content-center');
  chatCardsWrap.append(cardsRowContainer);

  const cardsCol = document.createElement('div');
  cardsCol.classList.add('col-xl-8');
  cardsRowContainer.append(cardsCol);

  const chatOptionsRow = document.createElement('div');
  chatOptionsRow.classList.add('row', 'no-gutters');
  chatOptionsRow.id = 'ways_that_helps';
  cardsCol.append(chatOptionsRow);

  chatOptionRows.forEach((row) => {
    const cells = [...row.children];
    const optionTitleCell = cells[0];
    const optionSubtitleCell = cells[1];

    const cardGridCol = document.createElement('div');
    cardGridCol.classList.add('col-xl-6', 'cardgrids');
    chatOptionsRow.append(cardGridCol);

    const cardBlock = document.createElement('div');
    cardBlock.classList.add('cardblock', 'd-flex', 'align-items-center', 'justify-content-center');
    moveInstrumentation(row, cardBlock);
    cardGridCol.append(cardBlock);

    const optionTitleDiv = document.createElement('div');
    optionTitleDiv.classList.add('title');
    optionTitleDiv.textContent = optionTitleCell.textContent.trim();
    cardBlock.append(optionTitleDiv);

    if (optionSubtitleCell) {
      const optionSubtitleSpan = document.createElement('span');
      optionSubtitleSpan.classList.add('d-block');
      optionSubtitleSpan.textContent = optionSubtitleCell.textContent.trim();
      optionTitleDiv.append(optionSubtitleSpan);
    }
  });

  const errorMessageP = document.createElement('p');
  errorMessageP.id = 'select_error_message';
  chatOne.append(errorMessageP);

  const continueDiv = document.createElement('div');
  continueDiv.classList.add('continue');
  chatOne.append(continueDiv);

  const continueBtn = document.createElement('a');
  continueBtn.id = 'btn_chatone';
  continueBtn.classList.add('btn', 'btn-primary');
  continueBtn.textContent = 'Continue';
  // Add event listener for the continue button
  continueBtn.addEventListener('click', () => {
    // Placeholder for continue button logic
    console.log('Continue button clicked!');
    // Example: Hide chatOne and show chattwo
    // chatOne.style.display = 'none';
    // document.getElementById('chattwo').style.display = 'block';
  });
  continueDiv.append(continueBtn);

  // Clear the original block content and append the new structure
  block.textContent = '';
  block.append(modal);
}
