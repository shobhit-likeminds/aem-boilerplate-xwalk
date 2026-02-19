import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('contact-content');

  // Rule 4: Dynamic iteration, but here we know the structure from JSON fields.
  // The block children directly correspond to the fields in the JSON.
  // Given the block.children are the *rows* from the original block table,
  // and the JSON defines a flat list of fields, we can access them by index.

  // Row 0: Image
  const imageRow = block.children[0];
  if (imageRow) {
    const imageCell = imageRow.children[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('contact-image-wrapper');
        moveInstrumentation(imageRow, imageWrapper); // Move instrumentation from the row to the new wrapper

        const figure = document.createElement('figure');
        figure.classList.add('contact-image-figure');

        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '240' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        if (optimizedImg) {
          moveInstrumentation(img, optimizedImg);
          optimizedImg.classList.add('contact-image');
          optimizedImg.setAttribute('width', '240');
          optimizedImg.setAttribute('height', '239');
        }
        figure.append(optimizedPic);
        imageWrapper.append(figure);
        mainWrapper.append(imageWrapper);
      }
    }
  }

  // Row 1: Description
  const descriptionRow = block.children[1];
  if (descriptionRow) {
    const descriptionCell = descriptionRow.children[0];
    if (descriptionCell) {
      const p = document.createElement('p');
      p.classList.add('contact-description');
      moveInstrumentation(descriptionRow, p); // Move instrumentation from the row to the new paragraph
      p.innerHTML = descriptionCell.innerHTML;
      mainWrapper.append(p);
    }
  }

  // Row 2: Form Fields (This row contains the entire form structure in the source HTML)
  const formFieldsRow = block.children[2];
  if (formFieldsRow) {
    const formFieldsCell = formFieldsRow.children[0];
    if (formFieldsCell) {
      const formContainer = document.createElement('div');
      formContainer.classList.add('contact-form-container', 'wpforms-container', 'wpforms-container-full', 'wpforms-block');
      formContainer.id = 'wpforms-161';
      moveInstrumentation(formFieldsRow, formContainer); // Move instrumentation from the row to the form container

      const form = document.createElement('form');
      form.id = 'wpforms-form-161';
      form.classList.add('contact-form', 'wpforms-validate', 'wpforms-form');
      form.setAttribute('data-formid', '161');
      form.setAttribute('method', 'post');
      form.setAttribute('enctype', 'multipart/form-data');
      form.setAttribute('action', '/contact/');
      form.setAttribute('data-token', '22c5fe81dceb6130027e2f28ee9f7a5d'); // Example token, should be dynamic if possible
      form.setAttribute('data-token-time', '1771521582'); // Example time, should be dynamic if possible
      form.setAttribute('novalidate', 'novalidate');

      const noScript = document.createElement('noscript');
      noScript.classList.add('contact-form-noscript');
      noScript.textContent = 'Please enable JavaScript in your browser to complete this form.';
      form.append(noScript);

      const fieldContainer = document.createElement('div');
      fieldContainer.classList.add('contact-form-field-container');

      // Name Field (Cell 0 of formFieldsCell)
      const nameFieldCell = formFieldsCell.children[0];
      if (nameFieldCell) {
        const nameDiv = document.createElement('div');
        nameDiv.id = 'wpforms-161-field_0-container';
        nameDiv.classList.add('contact-form-field', 'contact-form-field-name');
        nameDiv.setAttribute('data-field-id', '0');
        moveInstrumentation(nameFieldCell, nameDiv); // Move instrumentation from cell to new div

        const nameLabel = document.createElement('label');
        nameLabel.classList.add('contact-form-field-label');
        nameLabel.innerHTML = 'Name <span class="contact-form-required-label">*</span>';
        nameDiv.append(nameLabel);

        const nameRowDiv = document.createElement('div');
        nameRowDiv.classList.add('contact-form-field-row', 'contact-form-field-medium');

        // First Name (Cell 0 of nameFieldCell)
        const firstNameCell = nameFieldCell.children[0];
        if (firstNameCell) {
          const firstNameBlock = document.createElement('div');
          firstNameBlock.classList.add('contact-form-field-row-block', 'contact-form-first', 'contact-form-one-half');
          moveInstrumentation(firstNameCell, firstNameBlock); // Move instrumentation from cell to new div

          const firstNameInput = document.createElement('input');
          firstNameInput.type = 'text';
          firstNameInput.id = 'wpforms-161-field_0';
          firstNameInput.classList.add('contact-form-field-name-first', 'contact-form-field-required');
          firstNameInput.name = 'wpforms[fields][0][first]';
          firstNameInput.required = true;
          firstNameBlock.append(firstNameInput);

          const firstNameSubLabel = document.createElement('label');
          firstNameSubLabel.htmlFor = 'wpforms-161-field_0';
          firstNameSubLabel.classList.add('contact-form-field-sublabel', 'contact-form-after');
          firstNameSubLabel.textContent = 'First';
          firstNameBlock.append(firstNameSubLabel);
          nameRowDiv.append(firstNameBlock);
        }

        // Last Name (Cell 1 of nameFieldCell)
        const lastNameCell = nameFieldCell.children[1];
        if (lastNameCell) {
          const lastNameBlock = document.createElement('div');
          lastNameBlock.classList.add('contact-form-field-row-block', 'contact-form-one-half');
          moveInstrumentation(lastNameCell, lastNameBlock); // Move instrumentation from cell to new div

          const lastNameInput = document.createElement('input');
          lastNameInput.type = 'text';
          lastNameInput.id = 'wpforms-161-field_0-last';
          lastNameInput.classList.add('contact-form-field-name-last', 'contact-form-field-required');
          lastNameInput.name = 'wpforms[fields][0][last]';
          lastNameInput.required = true;
          lastNameBlock.append(lastNameInput);

          const lastNameSubLabel = document.createElement('label');
          lastNameSubLabel.htmlFor = 'wpforms-161-field_0-last';
          lastNameSubLabel.classList.add('contact-form-field-sublabel', 'contact-form-after');
          lastNameSubLabel.textContent = 'Last';
          lastNameBlock.append(lastNameSubLabel);
          nameRowDiv.append(lastNameBlock);
        }
        nameDiv.append(nameRowDiv);
        fieldContainer.append(nameDiv);
      }

      // Email Field (Cell 1 of formFieldsCell)
      const emailFieldCell = formFieldsCell.children[1];
      if (emailFieldCell) {
        const emailDiv = document.createElement('div');
        emailDiv.id = 'wpforms-161-field_1-container';
        emailDiv.classList.add('contact-form-field', 'contact-form-field-email');
        emailDiv.setAttribute('data-field-id', '1');
        moveInstrumentation(emailFieldCell, emailDiv); // Move instrumentation from cell to new div

        const emailLabel = document.createElement('label');
        emailLabel.classList.add('contact-form-field-label');
        emailLabel.htmlFor = 'wpforms-161-field_1';
        emailLabel.innerHTML = 'Email <span class="contact-form-required-label">*</span>';
        emailDiv.append(emailLabel);

        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.id = 'wpforms-161-field_1';
        emailInput.classList.add('contact-form-field-medium', 'contact-form-field-required');
        emailInput.name = 'wpforms[fields][1]';
        emailInput.spellcheck = false;
        emailInput.required = true;
        emailDiv.append(emailInput);
        fieldContainer.append(emailDiv);
      }

      // Message Field (Cell 2 of formFieldsCell)
      const messageFieldCell = formFieldsCell.children[2];
      if (messageFieldCell) {
        const messageDiv = document.createElement('div');
        messageDiv.id = 'wpforms-161-field_2-container';
        messageDiv.classList.add('contact-form-field', 'contact-form-field-textarea');
        messageDiv.setAttribute('data-field-id', '2');
        moveInstrumentation(messageFieldCell, messageDiv); // Move instrumentation from cell to new div

        const messageLabel = document.createElement('label');
        messageLabel.classList.add('contact-form-field-label');
        messageLabel.htmlFor = 'wpforms-161-field_2';
        messageLabel.innerHTML = 'Comment or Message <span class="contact-form-required-label">*</span>';
        messageDiv.append(messageLabel);

        const messageTextarea = document.createElement('textarea');
        messageTextarea.id = 'wpforms-161-field_2';
        messageTextarea.classList.add('contact-form-field-medium', 'contact-form-field-required');
        messageTextarea.name = 'wpforms[fields][2]';
        messageTextarea.required = true;
        messageDiv.append(messageTextarea);
        fieldContainer.append(messageDiv);
      }
      form.append(fieldContainer);

      // Row 3: Hidden Message (Honeypot)
      const hiddenMessageRow = block.children[3];
      if (hiddenMessageRow) {
        const hiddenMessageCell = hiddenMessageRow.children[0];
        if (hiddenMessageCell) {
          const hpDiv = document.createElement('div');
          hpDiv.classList.add('contact-form-field', 'contact-form-field-hp');
          moveInstrumentation(hiddenMessageRow, hpDiv); // Move instrumentation from row to new div

          const hpLabel = document.createElement('label');
          hpLabel.htmlFor = 'wpforms-161-field-hp';
          hpLabel.classList.add('contact-form-field-label');
          hpLabel.textContent = 'Message';
          hpDiv.append(hpLabel);

          const hpInput = document.createElement('input');
          hpInput.type = 'text';
          hpInput.name = 'wpforms[hp]';
          hpInput.id = 'wpforms-161-field-hp';
          hpInput.classList.add('contact-form-field-medium');
          hpDiv.append(hpInput);
          form.append(hpDiv);
        }
      }

      // Row 4: reCAPTCHA Response
      const recaptchaResponseRow = block.children[4];
      if (recaptchaResponseRow) {
        const recaptchaResponseCell = recaptchaResponseRow.children[0];
        if (recaptchaResponseCell) {
          const recaptchaContainer = document.createElement('div');
          recaptchaContainer.classList.add('contact-form-recaptcha-container', 'contact-form-is-recaptcha', 'contact-form-is-recaptcha-type-v2');
          moveInstrumentation(recaptchaResponseRow, recaptchaContainer); // Move instrumentation from row to new div

          const gRecaptchaDiv = document.createElement('div');
          gRecaptchaDiv.classList.add('g-recaptcha');
          gRecaptchaDiv.setAttribute('data-sitekey', '6LcZIMMcAAAAAAC-6Ee4dXQRHziIJEWxvZYNPGyk'); // Hardcoded, ideally dynamic
          gRecaptchaDiv.setAttribute('data-recaptcha-id', '0');

          // The iframe and textarea inside g-recaptcha are dynamically loaded by Google, so we only create the placeholder div.
          // For the purpose of EDS, we will replicate the basic structure if it's explicitly in the source HTML,
          // but typically, this is handled by the reCAPTCHA script.
          // Since the HTML shows the iframe and textarea, we'll recreate them as static placeholders.
          const iframeWrapper = document.createElement('div');
          iframeWrapper.style.cssText = 'width: 304px; height: 78px;';
          const innerDiv = document.createElement('div');
          const iframe = document.createElement('iframe');
          iframe.title = 'reCAPTCHA';
          iframe.width = '304';
          iframe.height = '78';
          iframe.role = 'presentation';
          iframe.name = 'a-uzoqtyvpbfbk'; // Example name
          iframe.frameBorder = '0';
          iframe.scrolling = 'no';
          iframe.sandbox = 'allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation';
          iframe.src = 'https://www.google.com/recaptcha/api2/anchor?ar=1&k=6LcZIMMcAAAAAAC-6Ee4dXQRHziIJEWxvZYNPGyk&co=aHR0cHM6Ly9wcmFjdGljZXRlc3RhdXRvbWF0aW9uLmNvbTo0NDM.&hl=en&v=vUgXt_KV952_-5BB2jjloYzl&size=normal&anchor-ms=20000&execute-ms=30000&cb=sxbf9ibsuqsv'; // Example src
          innerDiv.append(iframe);
          iframeWrapper.append(innerDiv);
          gRecaptchaDiv.append(iframeWrapper);

          const recaptchaTextarea = document.createElement('textarea');
          recaptchaTextarea.id = 'g-recaptcha-response';
          recaptchaTextarea.name = 'g-recaptcha-response';
          recaptchaTextarea.classList.add('g-recaptcha-response');
          recaptchaTextarea.style.cssText = 'width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;';
          gRecaptchaDiv.append(recaptchaTextarea);

          const hiddenIframe = document.createElement('iframe');
          hiddenIframe.style.display = 'none';
          gRecaptchaDiv.append(hiddenIframe);

          recaptchaContainer.append(gRecaptchaDiv);
          form.append(recaptchaContainer);
        }
      }

      // Row 5: reCAPTCHA Hidden Input
      const recaptchaHiddenRow = block.children[5];
      if (recaptchaHiddenRow) {
        const recaptchaHiddenCell = recaptchaHiddenRow.children[0];
        if (recaptchaHiddenCell) {
          const recaptchaHiddenInput = document.createElement('input');
          recaptchaHiddenInput.type = 'text';
          recaptchaHiddenInput.name = 'g-recaptcha-hidden';
          recaptchaHiddenInput.classList.add('contact-form-recaptcha-hidden');
          recaptchaHiddenInput.style.cssText = 'position:absolute!important;clip:rect(0,0,0,0)!important;height:1px!important;width:1px!important;border:0!important;overflow:hidden!important;padding:0!important;margin:0!important;';
          recaptchaHiddenInput.setAttribute('data-rule-recaptcha', '1');
          moveInstrumentation(recaptchaHiddenRow, recaptchaHiddenInput); // Move instrumentation from row to new input
          form.append(recaptchaHiddenInput);
        }
      }

      // Submit Container
      const submitContainer = document.createElement('div');
      submitContainer.classList.add('contact-form-submit-container');

      // Hidden inputs (hardcoded values from source HTML)
      const hiddenId = document.createElement('input');
      hiddenId.type = 'hidden';
      hiddenId.name = 'wpforms[id]';
      hiddenId.value = '161';
      submitContainer.append(hiddenId);

      const hiddenPageTitle = document.createElement('input');
      hiddenPageTitle.type = 'hidden';
      hiddenPageTitle.name = 'page_title';
      hiddenPageTitle.value = 'Contact';
      submitContainer.append(hiddenPageTitle);

      const hiddenPageUrl = document.createElement('input');
      hiddenPageUrl.type = 'hidden';
      hiddenPageUrl.name = 'page_url';
      hiddenPageUrl.value = 'https://practicetestautomation.com/contact/';
      submitContainer.append(hiddenPageUrl);

      const hiddenUrlReferer = document.createElement('input');
      hiddenUrlReferer.type = 'hidden';
      hiddenUrlReferer.name = 'url_referer';
      hiddenUrlReferer.value = '';
      submitContainer.append(hiddenUrlReferer);

      const hiddenPageId = document.createElement('input');
      hiddenPageId.type = 'hidden';
      hiddenPageId.name = 'page_id';
      hiddenPageId.value = '15';
      submitContainer.append(hiddenPageId);

      const hiddenPostId = document.createElement('input');
      hiddenPostId.type = 'hidden';
      hiddenPostId.name = 'wpforms[post_id]';
      hiddenPostId.value = '15';
      submitContainer.append(hiddenPostId);

      const submitButton = document.createElement('button');
      submitButton.type = 'submit';
      submitButton.name = 'wpforms[submit]';
      submitButton.id = 'wpforms-submit-161';
      submitButton.classList.add('contact-form-submit');
      submitButton.setAttribute('data-alt-text', 'Sending...');
      submitButton.setAttribute('data-submit-text', 'Submit');
      submitButton.setAttribute('aria-live', 'assertive');
      submitButton.value = 'wpforms-submit';
      submitButton.textContent = 'Submit';
      submitContainer.append(submitButton);

      form.append(submitContainer);
      formContainer.append(form);
      mainWrapper.append(formContainer);
    }
  }

  // Row 6: Closing Text
  const closingTextRow = block.children[6];
  if (closingTextRow) {
    const closingTextCell = closingTextRow.children[0];
    if (closingTextCell) {
      const p = document.createElement('p');
      p.classList.add('contact-closing-text');
      moveInstrumentation(closingTextRow, p); // Move instrumentation from the row to the new paragraph
      p.innerHTML = closingTextCell.innerHTML;
      mainWrapper.append(p);
    }
  }

  block.textContent = '';
  block.append(mainWrapper);
}