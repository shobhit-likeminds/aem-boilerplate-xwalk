import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    headingRow,
    descriptionRow,
    contactFormNameRow,
    contactFormEmailRow,
    contactFormMessageRow,
    contactInfoContainerRow, // This row is empty, just a placeholder for the container
    copyrightRow,
    ...contactInfoItemRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.id = 'footer';
  section.classList.add('wrapper');

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  moveInstrumentation(titleRow, titleDiv);
  titleDiv.append(titleRow.firstElementChild.textContent);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const header = document.createElement('header');
  header.classList.add('style1');

  const h2 = document.createElement('h2');
  moveInstrumentation(headingRow, h2);
  h2.append(headingRow.firstElementChild.textContent);

  const p = document.createElement('p');
  moveInstrumentation(descriptionRow, p);
  // Corrected: Handle richtext content for description
  p.innerHTML = descriptionRow.firstElementChild.innerHTML;

  header.append(h2, p);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Contact Form Section
  const col6Form = document.createElement('div');
  col6Form.classList.add('col-6', 'col-12-medium');

  const formSection = document.createElement('section');
  const form = document.createElement('form');
  form.method = 'post';
  form.action = '#';

  const gtrDiv = document.createElement('div');
  gtrDiv.classList.add('row', 'gtr-50');

  const col6Name = document.createElement('div');
  col6Name.classList.add('col-6', 'col-12-small');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.id = 'contact-name';
  nameInput.placeholder = contactFormNameRow.firstElementChild.textContent;
  moveInstrumentation(contactFormNameRow, nameInput);
  col6Name.append(nameInput);

  const col6Email = document.createElement('div');
  col6Email.classList.add('col-6', 'col-12-small');
  const emailInput = document.createElement('input');
  emailInput.type = 'text';
  emailInput.name = 'email';
  emailInput.id = 'contact-email';
  emailInput.placeholder = contactFormEmailRow.firstElementChild.textContent;
  moveInstrumentation(contactFormEmailRow, emailInput);
  col6Email.append(emailInput);

  const col12Message = document.createElement('div');
  col12Message.classList.add('col-12');
  const messageTextarea = document.createElement('textarea');
  messageTextarea.name = 'message';
  messageTextarea.id = 'contact-message';
  messageTextarea.rows = '4';
  messageTextarea.placeholder = contactFormMessageRow.firstElementChild.textContent;
  moveInstrumentation(contactFormMessageRow, messageTextarea);
  col12Message.append(messageTextarea);

  const col12Actions = document.createElement('div');
  col12Actions.classList.add('col-12');
  const actionsUl = document.createElement('ul');
  actionsUl.classList.add('actions');

  const submitLi = document.createElement('li');
  const submitInput = document.createElement('input');
  submitInput.type = 'submit';
  submitInput.classList.add('style1');
  submitInput.value = 'Send';
  submitLi.append(submitInput);

  const resetLi = document.createElement('li');
  const resetInput = document.createElement('input');
  resetInput.type = 'reset';
  resetInput.classList.add('style2');
  resetInput.value = 'Reset';
  resetLi.append(resetInput);

  actionsUl.append(submitLi, resetLi);
  col12Actions.append(actionsUl);

  gtrDiv.append(col6Name, col6Email, col12Message, col12Actions);
  form.append(gtrDiv);
  formSection.append(form);
  col6Form.append(formSection);
  rowDiv.append(col6Form);

  // Contact Info Section
  const col6Contact = document.createElement('div');
  col6Contact.classList.add('col-6', 'col-12-medium');

  const contactSection = document.createElement('section');
  contactSection.classList.add('feature-list', 'small');

  const contactRowDiv = document.createElement('div');
  contactRowDiv.classList.add('row');

  contactInfoItemRows.forEach((row) => {
    const [headingCell, contentCell] = [...row.children];

    const col6Small = document.createElement('div');
    col6Small.classList.add('col-6', 'col-12-small');

    const itemSection = document.createElement('section');
    const h3 = document.createElement('h3');
    h3.classList.add('icon', 'solid');
    
    // Corrected: Determine icon based on heading content, not index
    const headingText = headingCell.textContent.toLowerCase();
    if (headingText.includes('address') || headingText.includes('home')) h3.classList.add('fa-home');
    else if (headingText.includes('social') || headingText.includes('comment')) h3.classList.add('fa-comment');
    else if (headingText.includes('email') || headingText.includes('envelope')) h3.classList.add('fa-envelope');
    else if (headingText.includes('phone')) h3.classList.add('fa-phone');
    else h3.classList.add('fa-info'); // Fallback icon

    moveInstrumentation(headingCell, h3);
    h3.append(headingCell.textContent);

    const contentP = document.createElement('p');
    moveInstrumentation(contentCell, contentP);
    // Corrected: Handle richtext content for contact info items
    contentP.innerHTML = contentCell.innerHTML;

    itemSection.append(h3, contentP);
    col6Small.append(itemSection);
    contactRowDiv.append(col6Small);
  });

  contactSection.append(contactRowDiv);
  col6Contact.append(contactSection);
  rowDiv.append(col6Contact);

  // Copyright Section
  const copyrightDiv = document.createElement('div');
  copyrightDiv.id = 'copyright';
  moveInstrumentation(copyrightRow, copyrightDiv);
  // Corrected: Handle richtext content for copyright
  copyrightDiv.innerHTML = copyrightRow.firstElementChild.innerHTML;

  containerDiv.append(header, rowDiv, copyrightDiv);
  section.append(titleDiv, containerDiv);

  block.textContent = '';
  block.append(section);
}
