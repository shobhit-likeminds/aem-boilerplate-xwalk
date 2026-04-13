import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Destructure rows directly, avoiding row.children[n]
  const [imageDesktopRow, imageMobileRow] = [...block.children];

  // Create the main modal container
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.id = 'homepopsup'; // Hardcoded ID from original HTML
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', 'homepopsupLabel');
  modal.setAttribute('aria-hidden', 'true');

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog', 'modal-xl', 'modal-dialog-centered');
  modal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalDialog.append(modalContent);

  // Close button
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.classList.add('close');
  // Original HTML uses data-dismiss="modal", which is a Bootstrap attribute.
  // For EDS, we need to implement this with an event listener.
  closeButton.setAttribute('aria-label', 'Close');
  const closeSpan = document.createElement('span');
  closeSpan.setAttribute('aria-hidden', 'true');
  closeSpan.textContent = '×';
  closeButton.append(closeSpan);
  modalContent.append(closeButton);

  // Modal body
  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body', 'p-0');
  modalContent.append(modalBody);

  // Desktop image
  // CHECK 0 & 1: Access firstElementChild directly
  const desktopImageCell = imageDesktopRow.firstElementChild;
  const desktopPicture = desktopImageCell.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const newDesktopImg = document.createElement('img');
    newDesktopImg.src = desktopImg.src;
    newDesktopImg.alt = desktopImg.alt;
    newDesktopImg.classList.add('img-fluid', 'd-none', 'd-lg-block');
    newDesktopImg.style.cursor = 'pointer'; // From original HTML
    // The original HTML had data-dismiss="modal" on the image.
    // This implies clicking the image should close the modal.
    // We'll add an event listener for this.
    moveInstrumentation(desktopImg, newDesktopImg);
    modalBody.append(newDesktopImg);
  }

  // Mobile image
  // CHECK 0 & 1: Access firstElementChild directly
  const mobileImageCell = imageMobileRow.firstElementChild;
  const mobilePicture = mobileImageCell.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    const newMobileImg = document.createElement('img');
    newMobileImg.src = mobileImg.src;
    newMobileImg.alt = mobileImg.alt;
    newMobileImg.classList.add('img-fluid', 'd-block', 'd-lg-none', 'w-100');
    newMobileImg.style.cursor = 'pointer'; // From original HTML
    // The original HTML had data-dismiss="modal" on the image.
    // This implies clicking the image should close the modal.
    // We'll add an event listener for this.
    moveInstrumentation(mobileImg, newMobileImg);
    modalBody.append(newMobileImg);
  }

  // CHECK 2: Event listeners for closing the modal
  // The original HTML uses Bootstrap's data-dismiss="modal" on the button and images.
  // We need to replicate this behavior with addEventListener.
  const closeModal = () => {
    modal.classList.remove('show'); // Simulate Bootstrap's modal hide
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open'); // Remove body overflow hidden
  };

  const openModal = () => {
    modal.classList.add('show'); // Simulate Bootstrap's modal show
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open'); // Add body overflow hidden
  };

  // Event listener for the close button
  closeButton.addEventListener('click', closeModal);

  // Event listener for clicking outside the modal content or on the images
  modal.addEventListener('click', (e) => {
    // If the click is directly on the modal backdrop or on an image within the modal body
    if (e.target === modal || e.target.closest('.modal-body img')) {
      closeModal();
    }
  });

  // To make the modal functional, we need a trigger to open it.
  // Assuming there's an external trigger, e.g., a button or a link.
  // For now, we'll just append the modal to the block and it will be hidden by default.
  // If the modal needs to open on page load or via another element, that logic would be external
  // or added here if the trigger is part of the block.
  // For example, if it should open on page load:
  // window.addEventListener('load', () => openModal());

  // Optimize images
  modal.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(modal);
}
