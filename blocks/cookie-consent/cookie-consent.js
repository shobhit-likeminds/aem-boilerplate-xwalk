import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    iconImageRow,
    regionLabelRow,
    dialogTitleRow,
    dialogTextRow,
    acceptLabelRow,
    rejectLabelRow,
    settingsLabelRow,
    closeIconRow,
  ] = [...block.children];

  const regionLabel = regionLabelRow.querySelector('div').textContent.trim();
  const dialogTitle = dialogTitleRow.querySelector('div').textContent.trim();
  const acceptLabel = acceptLabelRow.querySelector('div').textContent.trim();
  const rejectLabel = rejectLabelRow.querySelector('div').textContent.trim();
  const settingsLabel = settingsLabelRow.querySelector('div').textContent.trim();

  block.textContent = '';
  block.id = 'ccc';
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', regionLabel);
  block.setAttribute('aria-live', 'polite');
  block.style.zIndex = '2147483647';

  // Icon Button
  const iconButton = document.createElement('button');
  iconButton.id = 'ccc-icon';
  iconButton.classList.add('ccc-icon--left', 'ccc-icon--dark');
  iconButton.setAttribute('aria-expanded', 'false');
  iconButton.setAttribute('aria-label', 'Set cookie preferences.');
  iconButton.setAttribute('accesskey', 'c');
  moveInstrumentation(iconImageRow, iconButton);
  const iconPicture = iconImageRow.querySelector('picture');
  if (iconPicture) {
    iconButton.append(iconPicture);
  }
  block.append(iconButton);

  const overlay = document.createElement('div');
  overlay.id = 'ccc-overlay';
  block.append(overlay);

  // Notify Dialog
  const notifyDialog = document.createElement('div');
  notifyDialog.id = 'ccc-notify';
  notifyDialog.classList.add('ccc-notify__notify', 'ccc-content--dark');
  notifyDialog.setAttribute('role', 'dialog');
  notifyDialog.setAttribute('aria-labelledby', 'ccc-notify-title');

  const notifyText = document.createElement('div');
  notifyText.classList.add('ccc-notify-text');
  const h1 = document.createElement('h1');
  h1.id = 'ccc-notify-title';
  h1.textContent = dialogTitle;
  notifyText.append(h1);

  const dialogTextContent = dialogTextRow.querySelector('div');
  if (dialogTextContent) {
    moveInstrumentation(dialogTextRow, notifyText);
    while (dialogTextContent.firstChild) {
      notifyText.append(dialogTextContent.firstChild);
    }
  }
  notifyDialog.append(notifyText);

  const notifyButtons = document.createElement('div');
  notifyButtons.classList.add('ccc-notify-buttons');

  // Accept Button
  const acceptButton = document.createElement('button');
  acceptButton.id = 'ccc-notify-accept';
  acceptButton.classList.add('ccc-notify-button', 'ccc-link', 'ccc-tabbable', 'ccc-accept-button');
  moveInstrumentation(acceptLabelRow, acceptButton);
  const acceptSpan = document.createElement('span');
  acceptSpan.textContent = acceptLabel;
  acceptButton.append(acceptSpan);
  notifyButtons.append(acceptButton);

  // Reject Button
  const rejectButton = document.createElement('button');
  rejectButton.id = 'ccc-notify-reject';
  rejectButton.classList.add('ccc-notify-button', 'ccc-link', 'ccc-tabbable', 'ccc-reject-button');
  moveInstrumentation(rejectLabelRow, rejectButton);
  const rejectSpan = document.createElement('span');
  rejectSpan.textContent = rejectLabel;
  rejectButton.append(rejectSpan);
  notifyButtons.append(rejectButton);

  // Settings Button
  const settingsButton = document.createElement('button');
  settingsButton.classList.add('ccc-notify-button', 'ccc-link', 'ccc-tabbable');
  moveInstrumentation(settingsLabelRow, settingsButton);
  const settingsSpan = document.createElement('span');
  settingsSpan.textContent = settingsLabel;
  settingsButton.append(settingsSpan);
  notifyButtons.append(settingsButton);

  // Close Button
  const dismissButton = document.createElement('button');
  dismissButton.id = 'ccc-notify-dismiss';
  dismissButton.classList.add('ccc-link', 'ccc-tabbable');
  dismissButton.setAttribute('tabindex', '0');
  dismissButton.setAttribute('aria-label', 'Close');
  moveInstrumentation(closeIconRow, dismissButton);
  const closePicture = closeIconRow.querySelector('picture');
  if (closePicture) {
    dismissButton.append(closePicture);
  }
  notifyButtons.append(dismissButton);

  notifyDialog.append(notifyButtons);
  block.append(notifyDialog);

  // Event Listeners
  iconButton.addEventListener('click', () => {
    notifyDialog.classList.toggle('show');
    overlay.classList.toggle('show');
    iconButton.setAttribute('aria-expanded', notifyDialog.classList.contains('show'));
  });

  dismissButton.addEventListener('click', () => {
    notifyDialog.classList.remove('show');
    overlay.classList.remove('show');
    iconButton.setAttribute('aria-expanded', 'false');
  });

  overlay.addEventListener('click', () => {
    notifyDialog.classList.remove('show');
    overlay.classList.remove('show');
    iconButton.setAttribute('aria-expanded', 'false');
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
