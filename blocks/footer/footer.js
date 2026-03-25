import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    introHeadingRow,
    introTextRow,
    contactContainerRow,
    contactInfoContainerRow,
    copyrightContainerRow,
    ...itemRows
  ] = [...block.children];

  block.innerHTML = '';
  block.classList.add('wrapper');

  // Title
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  moveInstrumentation(titleRow, titleDiv);
  titleDiv.append(titleRow.firstElementChild.textContent);
  block.append(titleDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  block.append(containerDiv);

  // Intro Heading and Text
  const header = document.createElement('header');
  header.classList.add('style1');
  containerDiv.append(header);

  const introHeading = document.createElement('h2');
  moveInstrumentation(introHeadingRow, introHeading);
  introHeading.append(introHeadingRow.firstElementChild.textContent);
  header.append(introHeading);

  const introText = document.createElement('p');
  moveInstrumentation(introTextRow, introText);
  while (introTextRow.firstElementChild.firstChild) {
    introText.append(introTextRow.firstElementChild.firstChild);
  }
  header.append(introText);

  const mainRow = document.createElement('div');
  mainRow.classList.add('row');
  containerDiv.append(mainRow);

  // Contact Form Section
  const contactFormCol = document.createElement('div');
  contactFormCol.classList.add('col-6', 'col-12-medium');
  mainRow.append(contactFormCol);

  const contactSection = document.createElement('section');
  moveInstrumentation(contactContainerRow, contactSection);
  contactFormCol.append(contactSection);

  const form = document.createElement('form');
  form.method = 'post';
  form.action = '#';
  contactSection.append(form);

  const formRow = document.createElement('div');
  formRow.classList.add('row', 'gtr-50');
  form.append(formRow);

  // Filter itemRows for 'contact' items (3 cells: Name, Email, Message)
  const contactItems = itemRows.filter((row) => row.children.length === 3);
  if (contactItems.length > 0) {
    // Assuming the first contact item provides the structure for the form fields
    const firstContactItem = contactItems[0];
    const cells = [...firstContactItem.children];

    // Name field
    const nameCell = cells[0];
    if (nameCell) {
      const nameCol = document.createElement('div');
      nameCol.classList.add('col-6', 'col-12-small');
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.name = 'name';
      nameInput.id = 'contact-name';
      nameInput.placeholder = 'Name';
      nameCol.append(nameInput);
      formRow.append(nameCol);
    }

    // Email field
    const emailCell = cells[1];
    if (emailCell) {
      const emailCol = document.createElement('div');
      emailCol.classList.add('col-6', 'col-12-small');
      const emailInput = document.createElement('input');
      emailInput.type = 'text';
      emailInput.name = 'email';
      emailInput.id = 'contact-email';
      emailInput.placeholder = 'Email';
      emailCol.append(emailInput);
      formRow.append(emailCol);
    }

    // Message field
    const messageCell = cells[2];
    if (messageCell) {
      const messageCol = document.createElement('div');
      messageCol.classList.add('col-12');
      const messageTextarea = document.createElement('textarea');
      messageTextarea.name = 'message';
      messageTextarea.id = 'contact-message';
      messageTextarea.placeholder = 'Message';
      messageTextarea.rows = '4';
      messageCol.append(messageTextarea);
      formRow.append(messageCol);
    }
  }

  const actionsCol = document.createElement('div');
  actionsCol.classList.add('col-12');
  const actionsUl = document.createElement('ul');
  actionsUl.classList.add('actions');
  const submitLi = document.createElement('li');
  const submitInput = document.createElement('input');
  submitInput.type = 'submit';
  submitInput.classList.add('style1');
  submitInput.value = 'Send';
  submitLi.append(submitInput);
  actionsUl.append(submitLi);

  const resetLi = document.createElement('li');
  const resetInput = document.createElement('input');
  resetInput.type = 'reset';
  resetInput.classList.add('style2');
  resetInput.value = 'Reset';
  resetLi.append(resetInput);
  actionsUl.append(resetLi);
  actionsCol.append(actionsUl);
  formRow.append(actionsCol);

  // Contact Info Section
  const contactInfoCol = document.createElement('div');
  contactInfoCol.classList.add('col-6', 'col-12-medium');
  mainRow.append(contactInfoCol);

  const contactInfoSection = document.createElement('section');
  contactInfoSection.classList.add('feature-list', 'small');
  moveInstrumentation(contactInfoContainerRow, contactInfoSection);
  contactInfoCol.append(contactInfoSection);

  const contactInfoRow = document.createElement('div');
  contactInfoRow.classList.add('row');
  contactInfoSection.append(contactInfoRow);

  // Filter itemRows for 'contact-info' items (8 cells)
  const contactInfoItems = itemRows.filter((row) => row.children.length === 8);
  contactInfoItems.forEach((itemRow) => {
    const cells = [...itemRow.children];

    // Mailing Address
    const mailingAddressHeadingCell = cells[0];
    const mailingAddressCell = cells[1];
    if (mailingAddressHeadingCell && mailingAddressCell) {
      const col = document.createElement('div');
      col.classList.add('col-6', 'col-12-small');
      const section = document.createElement('section');
      const h3 = document.createElement('h3');
      h3.classList.add('icon', 'solid', 'fa-home');
      h3.textContent = mailingAddressHeadingCell.textContent.trim();
      const p = document.createElement('p');
      moveInstrumentation(mailingAddressCell, p);
      while (mailingAddressCell.firstElementChild) { // Use firstElementChild to get the <p>
        p.append(mailingAddressCell.firstElementChild.firstChild);
      }
      section.append(h3, p);
      col.append(section);
      contactInfoRow.append(col);
    }

    // Social Links
    const socialHeadingCell = cells[2];
    const socialLinksCell = cells[3];
    if (socialHeadingCell && socialLinksCell) {
      const col = document.createElement('div');
      col.classList.add('col-6', 'col-12-small');
      const section = document.createElement('section');
      const h3 = document.createElement('h3');
      h3.classList.add('icon', 'solid', 'fa-comment');
      h3.textContent = socialHeadingCell.textContent.trim();
      const p = document.createElement('p');
      moveInstrumentation(socialLinksCell, p);
      while (socialLinksCell.firstElementChild) { // Use firstElementChild to get the <p>
        p.append(socialLinksCell.firstElementChild.firstChild);
      }
      section.append(h3, p);
      col.append(section);
      contactInfoRow.append(col);
    }

    // Email
    const emailHeadingCell = cells[4];
    const emailAddressCell = cells[5];
    if (emailHeadingCell && emailAddressCell) {
      const col = document.createElement('div');
      col.classList.add('col-6', 'col-12-small');
      const section = document.createElement('section');
      const h3 = document.createElement('h3');
      h3.classList.add('icon', 'solid', 'fa-envelope');
      h3.textContent = emailHeadingCell.textContent.trim();
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = `mailto:${emailAddressCell.textContent.trim()}`;
      a.textContent = emailAddressCell.textContent.trim();
      p.append(a);
      section.append(h3, p);
      col.append(section);
      contactInfoRow.append(col);
    }

    // Phone
    const phoneHeadingCell = cells[6];
    const phoneNumberCell = cells[7];
    if (phoneHeadingCell && phoneNumberCell) {
      const col = document.createElement('div');
      col.classList.add('col-6', 'col-12-small');
      const section = document.createElement('section');
      const h3 = document.createElement('h3');
      h3.classList.add('icon', 'solid', 'fa-phone');
      h3.textContent = phoneHeadingCell.textContent.trim();
      const p = document.createElement('p');
      p.textContent = phoneNumberCell.textContent.trim();
      section.append(h3, p);
      col.append(section);
      contactInfoRow.append(col);
    }
  });

  // Copyright Section
  const copyrightDiv = document.createElement('div');
  copyrightDiv.id = 'copyright';
  moveInstrumentation(copyrightContainerRow, copyrightDiv);
  containerDiv.append(copyrightDiv);

  const copyrightUl = document.createElement('ul');
  copyrightDiv.append(copyrightUl);

  // Filter itemRows for 'copyright' items (1 cell)
  const copyrightItems = itemRows.filter((row) => row.children.length === 1);
  copyrightItems.forEach((itemRow) => {
    const copyrightTextCell = [...itemRow.children][0];
    if (copyrightTextCell) {
      const li = document.createElement('li');
      moveInstrumentation(copyrightTextCell, li);
      while (copyrightTextCell.firstElementChild) { // Use firstElementChild to get the <p>
        li.append(copyrightTextCell.firstElementChild.firstChild);
      }
      copyrightUl.append(li);
    }
  });

  // Example of additional hardcoded copyright links from original HTML
  const designLi = document.createElement('li');
  designLi.innerHTML = 'Design: <a href="https://html5up.net">HTML5 UP</a>';
  copyrightUl.append(designLi);

  const demoImagesLi = document.createElement('li');
  demoImagesLi.innerHTML = 'Demo Images: <a href="http://ineedchemicalx.deviantart.com/">Felicia Simion</a>';
  copyrightUl.append(demoImagesLi);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
