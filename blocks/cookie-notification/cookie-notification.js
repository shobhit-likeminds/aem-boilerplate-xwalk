import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    iconImageRow,
    ariaLabelRow,
    headingRow,
    descriptionRow,
    acceptButtonTextRow,
    rejectButtonTextRow,
    settingsButtonTextRow,
    closeIconImageRow,
  ] = [...block.children];

  // Root container
  const ccc = document.createElement('div');
  ccc.id = 'ccc';
  ccc.setAttribute('role', 'region');
  // FIX: Replaced row.children[0] with content detection
  const ariaLabelCell = [...ariaLabelRow.children].find(cell => cell.textContent.trim());
  ccc.setAttribute('aria-label', ariaLabelCell ? ariaLabelCell.textContent.trim() : '');
  ccc.setAttribute('aria-live', 'polite');
  ccc.style.zIndex = '2147483647';
  moveInstrumentation(block, ccc);

  // Icon Button
  const iconButton = document.createElement('button');
  iconButton.id = 'ccc-icon';
  // FIX: Corrected class names to match ORIGINAL HTML
  iconButton.classList.add('ccc-icon--left', 'ccc-icon--dark');
  iconButton.setAttribute('aria-expanded', 'false');
  iconButton.setAttribute('aria-label', 'Set cookie preferences.');
  iconButton.setAttribute('accesskey', 'c');
  const iconPicture = iconImageRow.querySelector('picture');
  if (iconPicture) {
    const img = iconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    iconButton.append(optimizedPic);
  }
  moveInstrumentation(iconImageRow, iconButton);
  ccc.append(iconButton);

  // Overlay
  const overlay = document.createElement('div');
  overlay.id = 'ccc-overlay';
  ccc.append(overlay);

  // Notify dialog
  const notifyDialog = document.createElement('div');
  notifyDialog.id = 'ccc-notify';
  // FIX: Corrected class names to match ORIGINAL HTML
  notifyDialog.classList.add('ccc-notify__notify', 'ccc-content--dark');
  notifyDialog.setAttribute('role', 'dialog');
  notifyDialog.setAttribute('aria-labelledby', 'ccc-notify-title');

  // Notify text section
  const notifyText = document.createElement('div');
  // FIX: Corrected class names to match ORIGINAL HTML
  notifyText.classList.add('ccc-notify-text');

  const heading = document.createElement('h1');
  heading.id = 'ccc-notify-title';
  moveInstrumentation(headingRow, heading);
  while (headingRow.firstChild) heading.append(headingRow.firstChild);
  notifyText.append(heading);

  const description = document.createElement('div');
  moveInstrumentation(descriptionRow, description);
  while (descriptionRow.firstChild) description.append(descriptionRow.firstChild);
  notifyText.append(description);
  notifyDialog.append(notifyText);

  // Notify buttons section
  const notifyButtons = document.createElement('div');
  // FIX: Corrected class names to match ORIGINAL HTML
  notifyButtons.classList.add('ccc-notify-buttons');

  // Accept Button
  const acceptButton = document.createElement('button');
  acceptButton.id = 'ccc-notify-accept';
  // FIX: Corrected class names to match ORIGINAL HTML
  acceptButton.classList.add('ccc-notify-button', 'ccc-link', 'ccc-tabbable', 'ccc-accept-button');
  const acceptSpan = document.createElement('span');
  moveInstrumentation(acceptButtonTextRow, acceptSpan);
  while (acceptButtonTextRow.firstChild) acceptSpan.append(acceptButtonTextRow.firstChild);
  acceptButton.append(acceptSpan);
  notifyButtons.append(acceptButton);

  // Reject Button
  const rejectButton = document.createElement('button');
  rejectButton.id = 'ccc-notify-reject';
  // FIX: Corrected class names to match ORIGINAL HTML
  rejectButton.classList.add('ccc-notify-button', 'ccc-link', 'ccc-tabbable', 'ccc-reject-button');
  const rejectSpan = document.createElement('span');
  moveInstrumentation(rejectButtonTextRow, rejectSpan);
  while (rejectButtonTextRow.firstChild) rejectSpan.append(rejectButtonTextRow.firstChild);
  rejectButton.append(rejectSpan);
  notifyButtons.append(rejectButton);

  // Settings Button
  const settingsButton = document.createElement('button');
  // FIX: Corrected class names to match ORIGINAL HTML
  settingsButton.classList.add('ccc-notify-button', 'ccc-link', 'ccc-tabbable');
  const settingsSpan = document.createElement('span');
  moveInstrumentation(settingsButtonTextRow, settingsSpan);
  while (settingsButtonTextRow.firstChild) settingsSpan.append(settingsButtonTextRow.firstChild);
  settingsButton.append(settingsSpan);
  notifyButtons.append(settingsButton);

  // Dismiss Button
  const dismissButton = document.createElement('button');
  dismissButton.id = 'ccc-notify-dismiss';
  // FIX: Corrected class names to match ORIGINAL HTML
  dismissButton.classList.add('ccc-link', 'ccc-tabbable');
  dismissButton.setAttribute('tabindex', '0');
  dismissButton.setAttribute('aria-label', 'Close');
  const closeIconPicture = closeIconImageRow.querySelector('picture');
  if (closeIconPicture) {
    const img = closeIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dismissButton.append(optimizedPic);
  }
  moveInstrumentation(closeIconImageRow, dismissButton);
  notifyButtons.append(dismissButton);

  notifyDialog.append(notifyButtons);
  ccc.append(notifyDialog);

  // Event Listeners
  iconButton.addEventListener('click', () => {
    notifyDialog.classList.add('show');
    ccc.classList.add('active');
  });

  dismissButton.addEventListener('click', () => {
    notifyDialog.classList.remove('show');
    ccc.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    notifyDialog.classList.remove('show');
    ccc.classList.remove('active');
  });

  // FIX: Added event listener for settings button (interactive element from original HTML)
  settingsButton.addEventListener('click', () => {
    // Placeholder for actual settings dialog logic
    console.log('Settings button clicked - implement settings dialog display here.');
    // Example: if there was a settings dialog, you'd show it here
    // settingsDialog.classList.add('show');
    // notifyDialog.classList.remove('show'); // Hide notify dialog
  });

  block.textContent = '';
  block.append(ccc);
}
