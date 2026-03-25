import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    headingRow,
    introRow,
    contactNameRow,
    contactEmailRow,
    contactMessageRow,
    contactItemsContainerRow, // Renamed to clearly indicate it's the container for items
    copyrightRow,
    ...itemRows // These are the actual footer-contact-item rows
  ] = [...block.children];

  // Wrapper section
  const section = document.createElement('section');
  section.id = 'footer';
  section.classList.add('footer-wrapper');

  // Title
  const footerTitle = document.createElement('div');
  footerTitle.classList.add('footer-title');
  moveInstrumentation(titleRow, footerTitle);
  footerTitle.append(titleRow.firstElementChild.textContent);
  section.append(footerTitle);

  // Main footer container
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  // Header section
  const header = document.createElement('header');
  header.classList.add('footer-style1');
  moveInstrumentation(headingRow, header);
  const h2 = document.createElement('h2');
  h2.append(headingRow.firstElementChild.textContent);
  header.append(h2);
  moveInstrumentation(introRow, header);
  const pIntro = document.createElement('p');
  while (introRow.firstElementChild.firstChild) {
    pIntro.append(introRow.firstElementChild.firstChild);
  }
  header.append(pIntro);
  footerContainer.append(header);

  // Main content row for form and contact items
  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');

  // Contact Form column
  const formCol = document.createElement('div');
  formCol.classList.add('footer-col-6', 'footer-col-12-medium');
  const formSection = document.createElement('section');
  const form = document.createElement('form');
  form.method = 'post';
  form.action = '#';
  const formInnerRow = document.createElement('div');
  formInnerRow.classList.add('footer-row', 'footer-gtr-50');

  // Name input
  const nameCol = document.createElement('div');
  nameCol.classList.add('footer-col-6', 'footer-col-12-small');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.id = 'contact-name';
  nameInput.placeholder = 'Name';
  moveInstrumentation(contactNameRow, nameInput);
  nameInput.value = contactNameRow.firstElementChild.textContent;
  nameCol.append(nameInput);
  formInnerRow.append(nameCol);

  // Email input
  const emailCol = document.createElement('div');
  emailCol.classList.add('footer-col-6', 'footer-col-12-small');
  const emailInput = document.createElement('input');
  emailInput.type = 'text';
  emailInput.name = 'email';
  emailInput.id = 'contact-email';
  emailInput.placeholder = 'Email';
  moveInstrumentation(contactEmailRow, emailInput);
  emailInput.value = contactEmailRow.firstElementChild.textContent;
  emailCol.append(emailInput);
  formInnerRow.append(emailCol);

  // Message textarea
  const messageCol = document.createElement('div');
  messageCol.classList.add('footer-col-12');
  const messageTextarea = document.createElement('textarea');
  messageTextarea.name = 'message';
  messageTextarea.id = 'contact-message';
  messageTextarea.placeholder = 'Message';
  messageTextarea.rows = '4';
  moveInstrumentation(contactMessageRow, messageTextarea);
  while (contactMessageRow.firstElementChild.firstChild) {
    messageTextarea.append(contactMessageRow.firstElementChild.firstChild);
  }
  messageCol.append(messageTextarea);
  formInnerRow.append(messageCol);

  // Form actions
  const actionsCol = document.createElement('div');
  actionsCol.classList.add('footer-col-12');
  const actionsUl = document.createElement('ul');
  actionsUl.classList.add('footer-actions');
  const submitLi = document.createElement('li');
  const submitInput = document.createElement('input');
  submitInput.type = 'submit';
  submitInput.classList.add('footer-style1');
  submitInput.value = 'Send';
  submitLi.append(submitInput);
  actionsUl.append(submitLi);
  const resetLi = document.createElement('li');
  const resetInput = document.createElement('input');
  resetInput.type = 'reset';
  resetInput.classList.add('footer-style2');
  resetInput.value = 'Reset';
  resetLi.append(resetInput);
  actionsUl.append(resetLi);
  actionsCol.append(actionsUl);
  formInnerRow.append(actionsCol);

  form.append(formInnerRow);
  formSection.append(form);
  formCol.append(formSection);
  footerRow.append(formCol);

  // Contact Items column
  const contactItemsCol = document.createElement('div');
  contactItemsCol.classList.add('footer-col-6', 'footer-col-12-medium');
  const contactSection = document.createElement('section');
  contactSection.classList.add('footer-feature-list', 'footer-small');
  const contactInnerRow = document.createElement('div');
  contactInnerRow.classList.add('footer-row');

  // Move instrumentation from the contact-items container row
  // This row itself doesn't contain data, but acts as a placeholder for the item list
  moveInstrumentation(contactItemsContainerRow, contactSection);

  itemRows.forEach((row) => {
    // Each item row has two cells: label and value
    const [labelCell, valueCell] = row.children;

    const itemSection = document.createElement('section');
    const itemCol = document.createElement('div');
    itemCol.classList.add('footer-col-6', 'footer-col-12-small');
    moveInstrumentation(row, itemCol);

    const h3 = document.createElement('h3');
    h3.classList.add('footer-icon', 'footer-solid');

    const labelText = labelCell.textContent.trim();
    h3.append(labelText);

    // Add specific icon classes based on label text
    if (labelText.toLowerCase().includes('mailing')) {
      h3.classList.add('footer-fa-home');
    } else if (labelText.toLowerCase().includes('social')) {
      h3.classList.add('footer-fa-comment');
    } else if (labelText.toLowerCase().includes('email')) {
      h3.classList.add('footer-fa-envelope');
    } else if (labelText.toLowerCase().includes('phone')) {
      h3.classList.add('footer-fa-phone');
    }

    itemSection.append(h3);

    const pValue = document.createElement('p');
    while (valueCell.firstChild) {
      pValue.append(valueCell.firstChild);
    }
    itemSection.append(pValue);
    itemCol.append(itemSection);
    contactInnerRow.append(itemCol);
  });

  contactSection.append(contactInnerRow);
  contactItemsCol.append(contactSection);
  footerRow.append(contactItemsCol);
  footerContainer.append(footerRow);

  // Copyright
  const copyrightDiv = document.createElement('div');
  copyrightDiv.id = 'footer-copyright';
  moveInstrumentation(copyrightRow, copyrightDiv);
  const copyrightUl = document.createElement('ul');
  // The copyrightRow's firstElementChild contains the rich text content, which might be multiple nodes
  while (copyrightRow.firstElementChild.firstChild) {
    copyrightUl.append(copyrightRow.firstElementChild.firstChild);
  }
  copyrightDiv.append(copyrightUl);
  footerContainer.append(copyrightDiv);

  section.append(footerContainer);

  block.textContent = '';
  block.append(section);
}
