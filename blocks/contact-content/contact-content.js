import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const contactWrapper = document.createElement('div');
  contactWrapper.classList.add('contact-content-wrapper');

  [...block.children].forEach((row, index) => {
    const rowWrapper = document.createElement('div');
    moveInstrumentation(row, rowWrapper);

    if (index === 0) {
      // This is the image row
      const imageCell = row.children[0];
      if (imageCell) {
        const picture = imageCell.querySelector('picture');
        const img = picture?.querySelector('img');
        if (img) {
          const imageDiv = document.createElement('div');
          imageDiv.classList.add('contact-content-image');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '240' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageDiv.append(optimizedPic);
          rowWrapper.append(imageDiv);
        }
      }
    } else if (index === 1) {
      // This is the intro text row
      const introTextCell = row.children[0];
      if (introTextCell) {
        const p = introTextCell.querySelector('p');
        if (p) {
          const introTextDiv = document.createElement('div');
          introTextDiv.classList.add('contact-content-intro-text');
          introTextDiv.append(p);
          rowWrapper.append(introTextDiv);
        }
      }
    } else if (index === 2) {
      // This is the form row
      const formCell = row.children[0];
      if (formCell) {
        const form = formCell.querySelector('form');
        if (form) {
          const formDiv = document.createElement('div');
          formDiv.classList.add('contact-content-form');
          // Copy all classes from the original form container
          const originalFormContainer = formCell.querySelector('.contactcontent-wpforms-container');
          if (originalFormContainer) {
            originalFormContainer.classList.forEach((cls) => {
              if (cls.startsWith('contactcontent-')) {
                formDiv.classList.add(cls.replace('contactcontent-', ''));
              }
            });
          }

          // Recreate form structure with desired classes
          const newForm = document.createElement('form');
          newForm.id = form.id;
          newForm.classList.add('contact-form');
          newForm.method = form.method;
          newForm.enctype = form.enctype;
          newForm.action = form.action;
          newForm.setAttribute('data-formid', form.getAttribute('data-formid'));
          newForm.setAttribute('data-token', form.getAttribute('data-token'));
          newForm.setAttribute('data-token-time', form.getAttribute('data-token-time'));
          if (form.hasAttribute('novalidate')) {
            newForm.setAttribute('novalidate', 'novalidate');
          }

          // No script tag

          const fieldContainer = document.createElement('div');
          fieldContainer.classList.add('form-field-container');

          // Name field
          const nameFieldContainer = form.querySelector('#wpforms-161-field_0-container');
          if (nameFieldContainer) {
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('form-field', 'form-field-name');
            const label = nameFieldContainer.querySelector('.contactcontent-wpforms-field-label');
            if (label) {
              const newLabel = document.createElement('label');
              newLabel.classList.add('form-label');
              newLabel.textContent = label.textContent.replace('*', '').trim();
              if (label.querySelector('.contactcontent-wpforms-required-label')) {
                const span = document.createElement('span');
                span.classList.add('required-label');
                span.textContent = ' *';
                newLabel.append(span);
              }
              nameDiv.append(newLabel);
            }
            const nameRow = document.createElement('div');
            nameRow.classList.add('form-field-row');

            const firstNameBlock = nameFieldContainer.querySelector('.contactcontent-wpforms-first');
            if (firstNameBlock) {
              const firstNameDiv = document.createElement('div');
              firstNameDiv.classList.add('form-field-block', 'form-first-name');
              const firstNameInput = firstNameBlock.querySelector('input');
              if (firstNameInput) {
                const newInput = document.createElement('input');
                newInput.type = firstNameInput.type;
                newInput.id = firstNameInput.id;
                newInput.classList.add('form-input', 'first-name-input');
                newInput.name = firstNameInput.name;
                if (firstNameInput.hasAttribute('required')) newInput.setAttribute('required', '');
                firstNameDiv.append(newInput);
                const subLabel = firstNameBlock.querySelector('.contactcontent-wpforms-field-sublabel');
                if (subLabel) {
                  const newSubLabel = document.createElement('label');
                  newSubLabel.htmlFor = firstNameInput.id;
                  newSubLabel.classList.add('form-sublabel');
                  newSubLabel.textContent = subLabel.textContent.trim();
                  firstNameDiv.append(newSubLabel);
                }
              }
              nameRow.append(firstNameDiv);
            }

            const lastNameBlock = nameFieldContainer.querySelector('.contactcontent-wpforms-one-half:not(.contactcontent-wpforms-first)');
            if (lastNameBlock) {
              const lastNameDiv = document.createElement('div');
              lastNameDiv.classList.add('form-field-block', 'form-last-name');
              const lastNameInput = lastNameBlock.querySelector('input');
              if (lastNameInput) {
                const newInput = document.createElement('input');
                newInput.type = lastNameInput.type;
                newInput.id = lastNameInput.id;
                newInput.classList.add('form-input', 'last-name-input');
                newInput.name = lastNameInput.name;
                if (lastNameInput.hasAttribute('required')) newInput.setAttribute('required', '');
                lastNameDiv.append(newInput);
                const subLabel = lastNameBlock.querySelector('.contactcontent-wpforms-field-sublabel');
                if (subLabel) {
                  const newSubLabel = document.createElement('label');
                  newSubLabel.htmlFor = lastNameInput.id;
                  newSubLabel.classList.add('form-sublabel');
                  newSubLabel.textContent = subLabel.textContent.trim();
                  lastNameDiv.append(newSubLabel);
                }
              }
              nameRow.append(lastNameDiv);
            }
            nameDiv.append(nameRow);
            fieldContainer.append(nameDiv);
          }

          // Email field
          const emailFieldContainer = form.querySelector('#wpforms-161-field_1-container');
          if (emailFieldContainer) {
            const emailDiv = document.createElement('div');
            emailDiv.classList.add('form-field', 'form-field-email');
            const label = emailFieldContainer.querySelector('.contactcontent-wpforms-field-label');
            if (label) {
              const newLabel = document.createElement('label');
              newLabel.classList.add('form-label');
              newLabel.htmlFor = label.htmlFor;
              newLabel.textContent = label.textContent.replace('*', '').trim();
              if (label.querySelector('.contactcontent-wpforms-required-label')) {
                const span = document.createElement('span');
                span.classList.add('required-label');
                span.textContent = ' *';
                newLabel.append(span);
              }
              emailDiv.append(newLabel);
            }
            const input = emailFieldContainer.querySelector('input');
            if (input) {
              const newInput = document.createElement('input');
              newInput.type = input.type;
              newInput.id = input.id;
              newInput.classList.add('form-input', 'email-input');
              newInput.name = input.name;
              if (input.hasAttribute('spellcheck')) newInput.setAttribute('spellcheck', input.getAttribute('spellcheck'));
              if (input.hasAttribute('required')) newInput.setAttribute('required', '');
              emailDiv.append(newInput);
            }
            fieldContainer.append(emailDiv);
          }

          // Comment or Message field
          const messageFieldContainer = form.querySelector('#wpforms-161-field_2-container');
          if (messageFieldContainer) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('form-field', 'form-field-message');
            const label = messageFieldContainer.querySelector('.contactcontent-wpforms-field-label');
            if (label) {
              const newLabel = document.createElement('label');
              newLabel.classList.add('form-label');
              newLabel.htmlFor = label.htmlFor;
              newLabel.textContent = label.textContent.replace('*', '').trim();
              if (label.querySelector('.contactcontent-wpforms-required-label')) {
                const span = document.createElement('span');
                span.classList.add('required-label');
                span.textContent = ' *';
                newLabel.append(span);
              }
              messageDiv.append(newLabel);
            }
            const textarea = messageFieldContainer.querySelector('textarea');
            if (textarea) {
              const newTextarea = document.createElement('textarea');
              newTextarea.id = textarea.id;
              newTextarea.classList.add('form-textarea', 'message-textarea');
              newTextarea.name = textarea.name;
              if (textarea.hasAttribute('required')) newTextarea.setAttribute('required', '');
              messageDiv.append(newTextarea);
            }
            fieldContainer.append(messageDiv);
          }

          newForm.append(fieldContainer);

          // Phone field (honeypot)
          const phoneField = form.querySelector('.contactcontent-wpforms-field-hp');
          if (phoneField) {
            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('form-field', 'form-field-honeypot');
            const label = phoneField.querySelector('.contactcontent-wpforms-field-label');
            if (label) {
              const newLabel = document.createElement('label');
              newLabel.classList.add('form-label');
              newLabel.htmlFor = label.htmlFor;
              newLabel.textContent = label.textContent.trim();
              phoneDiv.append(newLabel);
            }
            const input = phoneField.querySelector('input');
            if (input) {
              const newInput = document.createElement('input');
              newInput.type = input.type;
              newInput.name = input.name;
              newInput.id = input.id;
              newInput.classList.add('form-input', 'honeypot-input');
              phoneDiv.append(newInput);
            }
            newForm.append(phoneDiv);
          }

          // Recaptcha (simplified, assuming client-side rendering will handle the actual widget)
          const recaptchaContainer = form.querySelector('.contactcontent-wpforms-recaptcha-container');
          if (recaptchaContainer) {
            const recaptchaDiv = document.createElement('div');
            recaptchaDiv.classList.add('form-recaptcha-container');
            // We only need the data-sitekey for the client-side script to render reCAPTCHA
            const gRecaptchaDiv = recaptchaContainer.querySelector('.contactcontent-g-recaptcha');
            if (gRecaptchaDiv) {
              const newGRecaptchaDiv = document.createElement('div');
              newGRecaptchaDiv.classList.add('g-recaptcha');
              newGRecaptchaDiv.setAttribute('data-sitekey', gRecaptchaDiv.getAttribute('data-sitekey'));
              recaptchaDiv.append(newGRecaptchaDiv);
            }
            const hiddenInput = recaptchaContainer.querySelector('input[name="g-recaptcha-hidden"]');
            if (hiddenInput) {
              const newHiddenInput = document.createElement('input');
              newHiddenInput.type = hiddenInput.type;
              newHiddenInput.name = hiddenInput.name;
              newHiddenInput.classList.add('g-recaptcha-hidden');
              // Copy inline styles for hidden input visibility
              newHiddenInput.style.cssText = hiddenInput.style.cssText;
              if (hiddenInput.hasAttribute('data-rule-recaptcha')) newHiddenInput.setAttribute('data-rule-recaptcha', hiddenInput.getAttribute('data-rule-recaptcha'));
              recaptchaDiv.append(newHiddenInput);
            }
            newForm.append(recaptchaDiv);
          }

          // Submit button and hidden fields
          const submitContainer = form.querySelector('.contactcontent-wpforms-submit-container');
          if (submitContainer) {
            const newSubmitContainer = document.createElement('div');
            newSubmitContainer.classList.add('form-submit-container');
            const submitButton = submitContainer.querySelector('button[type="submit"]');
            if (submitButton) {
              const newButton = document.createElement('button');
              newButton.type = submitButton.type;
              newButton.name = submitButton.name;
              newButton.id = submitButton.id;
              newButton.classList.add('form-submit-button');
              newButton.textContent = submitButton.textContent.trim();
              newButton.setAttribute('data-alt-text', submitButton.getAttribute('data-alt-text'));
              newButton.setAttribute('data-submit-text', submitButton.getAttribute('data-submit-text'));
              newButton.setAttribute('aria-live', submitButton.getAttribute('aria-live'));
              newButton.value = submitButton.value;
              newSubmitContainer.append(newButton);
            }
            // Copy hidden inputs
            submitContainer.querySelectorAll('input[type="hidden"]').forEach((hiddenInput) => {
              const newHiddenInput = document.createElement('input');
              newHiddenInput.type = hiddenInput.type;
              newHiddenInput.name = hiddenInput.name;
              newHiddenInput.value = hiddenInput.value;
              newSubmitContainer.append(newHiddenInput);
            });
            newForm.append(newSubmitContainer);
          }

          formDiv.append(newForm);
          rowWrapper.append(formDiv);
        }
      }
    } else if (index === 3) {
      // This is the outro text row
      const outroTextCell = row.children[0];
      if (outroTextCell) {
        const pTags = outroTextCell.querySelectorAll('p');
        if (pTags.length > 0) {
          const outroTextDiv = document.createElement('div');
          outroTextDiv.classList.add('contact-content-outro-text');
          pTags.forEach((p) => outroTextDiv.append(p));
          rowWrapper.append(outroTextDiv);
        }
      }
    }
    contactWrapper.append(rowWrapper);
  });

  block.textContent = '';
  block.append(contactWrapper);
}
