import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('section');
  mainContainer.id = 'main-container';
  mainContainer.classList.add('main-content-container');
  mainContainer.setAttribute('role', 'main');

  const mainContentLoopContainer = document.createElement('div');
  mainContentLoopContainer.classList.add('main-content-loop-container');

  const mainContentPostEntry = document.createElement('div');
  mainContentPostEntry.classList.add('main-content-post-entry');

  const article = document.createElement('article');

  const mainContentPostHeader = document.createElement('div');
  mainContentPostHeader.classList.add('main-content-post-header');
  article.append(mainContentPostHeader);

  const mainContentPostContent = document.createElement('div');
  mainContentPostContent.classList.add('main-content-post-content');
  article.append(mainContentPostContent);

  // Process block children (rows from the CMS) based on the Block JSON fields
  const rows = [...block.children];

  // Row 0: Avatar Image
  if (rows[0]) {
    const avatarCell = rows[0].children[0];
    if (avatarCell) {
      const img = avatarCell.querySelector('img');
      if (img) {
        const wpBlockImage = document.createElement('div');
        wpBlockImage.classList.add('main-content-wp-block-image');

        const figure = document.createElement('figure');
        figure.classList.add('main-content-aligncenter', 'main-content-is-resized');

        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '240' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img')); // Transfer instrumentation from original img to optimized one
        figure.append(optimizedPic);
        wpBlockImage.append(figure);
        mainContentPostContent.append(wpBlockImage);
      }
    }
  }

  // Row 1: Headline
  if (rows[1]) {
    const headlineCell = rows[1].children[0];
    if (headlineCell) {
      const h1 = document.createElement('h1');
      h1.classList.add('main-content-post-title');
      h1.textContent = headlineCell.textContent.trim();
      mainContentPostHeader.append(h1);
    }
  }

  // Row 2: Intro Text
  if (rows[2]) {
    const introCell = rows[2].children[0];
    if (introCell) {
      // Assuming intro text is typically a paragraph or rich text
      const p = document.createElement('p');
      p.innerHTML = introCell.innerHTML.trim(); // Use innerHTML to preserve rich text formatting
      mainContentPostContent.append(p);
    }
  }

  // Create the form structure based on the source HTML
  const wpformsContainer = document.createElement('div');
  wpformsContainer.id = 'wpforms-161';
  wpformsContainer.classList.add('main-content-wpforms-container', 'main-content-wpforms-container-full', 'main-content-wpforms-block');

  const form = document.createElement('form');
  form.id = 'wpforms-form-161';
  form.classList.add('main-content-wpforms-validate', 'main-content-wpforms-form');
  form.setAttribute('data-formid', '161');
  form.method = 'post';
  form.enctype = 'multipart/form-data';
  form.action = '/contact/';
  form.setAttribute('data-token', '22c5fe81dceb6130027e2f28ee9f7a5d'); // Placeholder token
  form.setAttribute('data-token-time', '1771521582'); // Placeholder time
  form.noValidate = true;

  const noScript = document.createElement('noscript');
  noScript.classList.add('main-content-wpforms-error-noscript');
  noScript.textContent = 'Please enable JavaScript in your browser to complete this form.';
  form.append(noScript);

  const fieldContainer = document.createElement('div');
  fieldContainer.classList.add('main-content-wpforms-field-container');

  // Name field (First Name, Last Name)
  const nameFieldContainer = document.createElement('div');
  nameFieldContainer.id = 'wpforms-161-field_0-container';
  nameFieldContainer.classList.add('main-content-wpforms-field', 'main-content-wpforms-field-name');
  nameFieldContainer.setAttribute('data-field-id', '0');

  const nameLabel = document.createElement('label');
  nameLabel.classList.add('main-content-wpforms-field-label');
  nameLabel.innerHTML = 'Name <span class="main-content-wpforms-required-label">*</span>';
  nameFieldContainer.append(nameLabel);

  const nameRow = document.createElement('div');
  nameRow.classList.add('main-content-wpforms-field-row', 'main-content-wpforms-field-medium');

  const firstNameBlock = document.createElement('div');
  firstNameBlock.classList.add('main-content-wpforms-field-row-block', 'main-content-wpforms-first', 'main-content-wpforms-one-half');
  const firstNameInput = document.createElement('input');
  firstNameInput.type = 'text';
  firstNameInput.id = 'wpforms-161-field_0';
  firstNameInput.classList.add('main-content-wpforms-field-name-first', 'main-content-wpforms-field-required');
  firstNameInput.name = 'wpforms[fields][0][first]';
  firstNameInput.required = true;
  // Pre-populate if available from block content (Row 3)
  if (rows[3] && rows[3].children[0]) {
    firstNameInput.value = rows[3].children[0].textContent.trim();
  }
  const firstNameSublabel = document.createElement('label');
  firstNameSublabel.htmlFor = 'wpforms-161-field_0';
  firstNameSublabel.classList.add('main-content-wpforms-field-sublabel', 'main-content-after');
  firstNameSublabel.textContent = 'First';
  firstNameBlock.append(firstNameInput, firstNameSublabel);

  const lastNameBlock = document.createElement('div');
  lastNameBlock.classList.add('main-content-wpforms-field-row-block', 'main-content-wpforms-one-half');
  const lastNameInput = document.createElement('input');
  lastNameInput.type = 'text';
  lastNameInput.id = 'wpforms-161-field_0-last';
  lastNameInput.classList.add('main-content-wpforms-field-name-last', 'main-content-wpforms-field-required');
  lastNameInput.name = 'wpforms[fields][0][last]';
  lastNameInput.required = true;
  // Pre-populate if available from block content (Row 4)
  if (rows[4] && rows[4].children[0]) {
    lastNameInput.value = rows[4].children[0].textContent.trim();
  }
  const lastNameSublabel = document.createElement('label');
  lastNameSublabel.htmlFor = 'wpforms-161-field_0-last';
  lastNameSublabel.classList.add('main-content-wpforms-field-sublabel', 'main-content-after');
  lastNameSublabel.textContent = 'Last';
  lastNameBlock.append(lastNameInput, lastNameSublabel);

  nameRow.append(firstNameBlock, lastNameBlock);
  nameFieldContainer.append(nameRow);
  fieldContainer.append(nameFieldContainer);

  // Email field
  const emailFieldContainer = document.createElement('div');
  emailFieldContainer.id = 'wpforms-161-field_1-container';
  emailFieldContainer.classList.add('main-content-wpforms-field', 'main-content-wpforms-field-email');
  emailFieldContainer.setAttribute('data-field-id', '1');

  const emailLabel = document.createElement('label');
  emailLabel.classList.add('main-content-wpforms-field-label');
  emailLabel.htmlFor = 'wpforms-161-field_1';
  emailLabel.innerHTML = 'Email <span class="main-content-wpforms-required-label">*</span>';
  emailFieldContainer.append(emailLabel);

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'wpforms-161-field_1';
  emailInput.classList.add('main-content-wpforms-field-medium', 'main-content-wpforms-field-required');
  emailInput.name = 'wpforms[fields][1]';
  emailInput.spellcheck = false;
  emailInput.required = true;
  // Pre-populate if available from block content (Row 5)
  if (rows[5] && rows[5].children[0]) {
    emailInput.value = rows[5].children[0].textContent.trim();
  }
  emailFieldContainer.append(emailInput);
  fieldContainer.append(emailFieldContainer);

  // Comment or Message field
  const messageFieldContainer = document.createElement('div');
  messageFieldContainer.id = 'wpforms-161-field_2-container';
  messageFieldContainer.classList.add('main-content-wpforms-field', 'main-content-wpforms-field-textarea');
  messageFieldContainer.setAttribute('data-field-id', '2');

  const messageLabel = document.createElement('label');
  messageLabel.classList.add('main-content-wpforms-field-label');
  messageLabel.htmlFor = 'wpforms-161-field_2';
  messageLabel.innerHTML = 'Comment or Message <span class="main-content-wpforms-required-label">*</span>';
  messageFieldContainer.append(messageLabel);

  const messageTextarea = document.createElement('textarea');
  messageTextarea.id = 'wpforms-161-field_2';
  messageTextarea.classList.add('main-content-wpforms-field-medium', 'main-content-wpforms-field-required');
  messageTextarea.name = 'wpforms[fields][2]';
  messageTextarea.required = true;
  // Pre-populate if available from block content (Row 6)
  if (rows[6] && rows[6].children[0]) {
    messageTextarea.textContent = rows[6].children[0].textContent.trim();
  }
  messageFieldContainer.append(messageTextarea);
  fieldContainer.append(messageFieldContainer);

  form.append(fieldContainer);

  // HoneyPot field (hidden)
  const hpField = document.createElement('div');
  hpField.classList.add('main-content-wpforms-field', 'main-content-wpforms-field-hp');
  const hpLabel = document.createElement('label');
  hpLabel.htmlFor = 'wpforms-161-field-hp';
  hpLabel.classList.add('main-content-wpforms-field-label');
  hpLabel.textContent = 'Message';
  const hpInput = document.createElement('input');
  hpInput.type = 'text';
  hpInput.name = 'wpforms[hp]';
  hpInput.id = 'wpforms-161-field-hp';
  hpInput.classList.add('main-content-wpforms-field-medium');
  hpField.append(hpLabel, hpInput);
  form.append(hpField);

  // reCAPTCHA container (simplified, as actual reCAPTCHA rendering is dynamic JS)
  const recaptchaContainer = document.createElement('div');
  recaptchaContainer.classList.add('main-content-wpforms-recaptcha-container', 'main-content-wpforms-is-recaptcha', 'main-content-wpforms-is-recaptcha-type-v2');
  const gRecaptchaDiv = document.createElement('div');
  gRecaptchaDiv.classList.add('main-content-g-recaptcha');
  gRecaptchaDiv.setAttribute('data-sitekey', '6LcZIMMcAAAAAAC-6Ee4dXQRHziIJEWxvZYNPGyk');
  gRecaptchaDiv.setAttribute('data-recaptcha-id', '0');
  // For EDS, we typically don't render the iframe directly, but rather the div that will be populated by the reCAPTCHA script.
  // The actual reCAPTCHA rendering would happen client-side.
  recaptchaContainer.append(gRecaptchaDiv);
  const recaptchaResponseTextarea = document.createElement('textarea');
  recaptchaResponseTextarea.id = 'g-recaptcha-response';
  recaptchaResponseTextarea.name = 'g-recaptcha-response';
  recaptchaResponseTextarea.classList.add('main-content-g-recaptcha-response');
  recaptchaResponseTextarea.style.cssText = 'width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;';
  recaptchaContainer.append(recaptchaResponseTextarea);
  const recaptchaHiddenInput = document.createElement('input');
  recaptchaHiddenInput.type = 'text';
  recaptchaHiddenInput.name = 'g-recaptcha-hidden';
  recaptchaHiddenInput.classList.add('main-content-wpforms-recaptcha-hidden');
  recaptchaHiddenInput.style.cssText = 'position:absolute!important;clip:rect(0,0,0,0)!important;height:1px!important;width:1px!important;border:0!important;overflow:hidden!important;padding:0!important;margin:0!important;';
  recaptchaHiddenInput.setAttribute('data-rule-recaptcha', '1');
  recaptchaContainer.append(recaptchaHiddenInput);
  form.append(recaptchaContainer);

  // Submit button
  const submitContainer = document.createElement('div');
  submitContainer.classList.add('main-content-wpforms-submit-container');
  const hiddenId = document.createElement('input');
  hiddenId.type = 'hidden';
  hiddenId.name = 'wpforms[id]';
  hiddenId.value = '161';
  const hiddenPageTitle = document.createElement('input');
  hiddenPageTitle.type = 'hidden';
  hiddenPageTitle.name = 'page_title';
  hiddenPageTitle.value = 'Contact';
  const hiddenPageUrl = document.createElement('input');
  hiddenPageUrl.type = 'hidden';
  hiddenPageUrl.name = 'page_url';
  hiddenPageUrl.value = 'https://practicetestautomation.com/contact/';
  const hiddenUrlReferer = document.createElement('input');
  hiddenUrlReferer.type = 'hidden';
  hiddenUrlReferer.name = 'url_referer';
  hiddenUrlReferer.value = '';
  const hiddenPageId = document.createElement('input');
  hiddenPageId.type = 'hidden';
  hiddenPageId.name = 'page_id';
  hiddenPageId.value = '15';
  const hiddenPostId = document.createElement('input');
  hiddenPostId.type = 'hidden';
  hiddenPostId.name = 'wpforms[post_id]';
  hiddenPostId.value = '15';
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.name = 'wpforms[submit]';
  submitButton.id = 'wpforms-submit-161';
  submitButton.classList.add('main-content-wpforms-submit');
  submitButton.setAttribute('data-alt-text', 'Sending...');
  submitButton.setAttribute('data-submit-text', 'Submit');
  submitButton.setAttribute('aria-live', 'assertive');
  submitButton.value = 'wpforms-submit';
  submitButton.textContent = 'Submit';
  submitContainer.append(hiddenId, hiddenPageTitle, hiddenPageUrl, hiddenUrlReferer, hiddenPageId, hiddenPostId, submitButton);
  form.append(submitContainer);

  wpformsContainer.append(form);
  mainContentPostContent.append(wpformsContainer);

  // Row 7: Footer Text
  if (rows[7]) {
    const footerCell = rows[7].children[0];
    if (footerCell) {
      const p = document.createElement('p');
      p.innerHTML = footerCell.innerHTML.trim(); // Use innerHTML to preserve rich text formatting
      mainContentPostContent.append(p);
    }
  }

  mainContentPostEntry.append(article);
  mainContentLoopContainer.append(mainContentPostEntry);
  mainContainer.append(mainContentLoopContainer);

  block.textContent = ''; // Clear the original block content
  block.append(mainContainer);
}