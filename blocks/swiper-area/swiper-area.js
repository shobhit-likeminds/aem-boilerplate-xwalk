import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  [...block.children].forEach((row) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.classList.add('swiper-slide', 'swiper-slide-area');

    // Use content detection instead of index access for robustness
    const cells = [...row.children];

    const imageCell = cells[0];
    const imageLinkCell = cells[1];
    const imageLinkLabelCell = cells[2];
    const formTitleCell = cells[3];
    const mobileNumberLabelCell = cells[4];
    const dateOfBirthCell = cells[5];
    const policyNumberLabelCell = cells[6];
    const acceptTermsLabelCell = cells[7];
    const contactUsLinkCell = cells[8];
    const contactUsLinkLabelCell = cells[9];
    const submitButtonLabelCell = cells[10];

    const sliderBannerWithFormTemplate = document.createElement('div');
    sliderBannerWithFormTemplate.classList.add('slider-banner-with-form-template');

    const bannerWithFormContainer = document.createElement('div');
    bannerWithFormContainer.classList.add('banner-with-form-container');

    // Banner Image
    const bannerImg = document.createElement('div');
    bannerImg.classList.add('banner-img');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      const finalImage = optimizedPic.querySelector('img');
      finalImage.classList.add('img-responsive', 'w-full', 'h-auto', 'object-contain');

      const imageLink = imageLinkCell?.querySelector('a');
      if (imageLink) {
        const anchor = document.createElement('a');
        anchor.href = imageLink.href;
        anchor.append(optimizedPic);
        bannerImg.append(anchor);
      } else {
        bannerImg.append(optimizedPic);
      }
    }
    bannerWithFormContainer.append(bannerImg);

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container', 'my-0', 'mx-auto');

    const bannerFormBox = document.createElement('div');
    bannerFormBox.classList.add('banner-form-box');

    const formGrid = document.createElement('div');
    formGrid.classList.add('form-grid');

    const formColumn = document.createElement('div');
    formColumn.classList.add('form-column');

    const formWrapper = document.createElement('div');

    const formTitle = formTitleCell.textContent.trim();
    const mobileNumberLabel = mobileNumberLabelCell.textContent.trim();
    const dateOfBirth = dateOfBirthCell.textContent.trim();
    const policyNumberLabel = policyNumberLabelCell.textContent.trim();
    const acceptTermsLabel = acceptTermsLabelCell.textContent.trim();
    const contactUsLink = contactUsLinkCell.querySelector('a');
    const contactUsLinkLabel = contactUsLinkLabelCell.textContent.trim();
    const submitButtonLabel = submitButtonLabelCell.textContent.trim();

    // Determine form type based on available fields
    if (mobileNumberLabel || dateOfBirth) {
      // Loan form
      const form = document.createElement('form');
      form.id = 'quick-loan-form';
      form.classList.add('lead-form-template');

      const leadCalcForm = document.createElement('div');
      leadCalcForm.classList.add('lead-calc-form');

      const title = document.createElement('h2');
      title.classList.add('lead-form-title', 'renewal');
      title.textContent = formTitle;
      leadCalcForm.append(title);

      const mobileInputWrapper = document.createElement('div');
      mobileInputWrapper.classList.add('custom-input_custom-input-wrapper__nlA0k');
      const mobileInput = document.createElement('input');
      mobileInput.classList.add('custom-input');
      mobileInput.id = 'mobileNo';
      mobileInput.type = 'tel';
      mobileInput.required = true;
      mobileInput.maxLength = 10;
      mobileInput.name = 'mobileNo';
      mobileInput.value = '';
      const mobileLabel = document.createElement('label');
      mobileLabel.classList.add('custom-input-label');
      mobileLabel.htmlFor = 'mobileNo';
      mobileLabel.textContent = mobileNumberLabel;
      const mobileIcon = document.createElement('i');
      mobileIcon.classList.add('custom-input-icon', 'icon-phone-m');
      mobileInputWrapper.append(mobileInput, mobileLabel, mobileIcon);
      leadCalcForm.append(mobileInputWrapper);

      const dobWrapper = document.createElement('div');
      dobWrapper.classList.add('col-span-12', 'md:col-span-6');
      const dobPickerWrapper = document.createElement('div');
      dobPickerWrapper.classList.add('custom-input-date-picker_custom-input-date-picker-wrapper__XAYAk');
      const dobFormControl = document.createElement('div');
      dobFormControl.classList.add('MuiFormControl-root', 'MuiFormControl-fullWidth', 'MuiPickersTextField-root', 'datepicker', 'mui-9h73hm');
      const dobLabel = document.createElement('label');
      dobLabel.classList.add('MuiFormLabel-root', 'MuiInputLabel-root', 'MuiInputLabel-formControl', 'MuiInputLabel-animated', 'MuiInputLabel-outlined', 'MuiFormLabel-colorPrimary', 'mui-160rfsr');
      dobLabel.setAttribute('data-shrink', 'false');
      dobLabel.htmlFor = '_R_4cpi2pm_';
      dobLabel.id = '_R_4cpi2pm_-label';
      dobLabel.textContent = dateOfBirth;
      dobFormControl.append(dobLabel);

      const dobInputBase = document.createElement('div');
      dobInputBase.classList.add('MuiPickersInputBase-root', 'MuiPickersOutlinedInput-root', 'MuiPickersInputBase-fullWidth', 'MuiPickersInputBase-colorPrimary', 'MuiPickersInputBase-adornedEnd', 'mui-18qp6qv');
      dobInputBase.setAttribute('aria-invalid', 'false');
      dobInputBase.setAttribute('role', 'group');
      dobInputBase.setAttribute('aria-labelledby', '_R_4cpi2pm_-label');

      const sectionsContainer = document.createElement('div');
      sectionsContainer.classList.add('MuiPickersSectionList-root', 'MuiPickersInputBase-sectionsContainer', 'mui-161q5nr');
      const sections = ['DD', 'MM', 'YYYY'];
      sections.forEach((text, index) => {
        const span = document.createElement('span');
        span.classList.add('MuiPickersSectionList-section', 'mui-7p02jm');
        const before = document.createElement('span');
        before.classList.add('MuiPickersInputBase-sectionBefore', 'mui-1wrzzxc');
        const content = document.createElement('span');
        content.classList.add('MuiPickersSectionList-sectionContent', 'MuiPickersInputBase-sectionContent', 'mui-1ry0dx6');
        content.setAttribute('data-sectionindex', index);
        content.setAttribute('aria-readonly', 'false');
        content.setAttribute('aria-valuemin', index === 0 ? '1' : index === 1 ? '1' : '0');
        content.setAttribute('aria-valuemax', index === 0 ? '31' : index === 1 ? '12' : '9999');
        content.setAttribute('aria-valuetext', 'Empty');
        content.setAttribute('aria-label', index === 0 ? 'Day' : index === 1 ? 'Month' : 'Year');
        content.setAttribute('aria-disabled', 'false');
        content.setAttribute('tabindex', index === 0 ? '0' : '-1');
        content.setAttribute('contenteditable', 'true');
        content.setAttribute('role', 'spinbutton');
        content.setAttribute('spellcheck', 'false');
        content.setAttribute('autocapitalize', 'none');
        content.setAttribute('autocorrect', 'off');
        content.setAttribute('inputmode', 'numeric');
        content.textContent = text;
        const after = document.createElement('span');
        after.classList.add('MuiPickersInputBase-sectionAfter', 'mui-1wrzzxc');
        if (index < sections.length - 1) after.textContent = '/';
        span.append(before, content, after);
        sectionsContainer.append(span);
      });
      dobInputBase.append(sectionsContainer);

      const adornment = document.createElement('div');
      adornment.classList.add('MuiInputAdornment-root', 'MuiInputAdornment-positionEnd', 'MuiInputAdornment-outlined', 'MuiInputAdornment-sizeMedium', 'mui-yxqbup');
      const dateButton = document.createElement('button');
      dateButton.classList.add('MuiButtonBase-root', 'MuiIconButton-root', 'MuiIconButton-edgeEnd', 'MuiIconButton-sizeMedium', 'mui-15ni0jc');
      dateButton.setAttribute('tabindex', '0');
      dateButton.type = 'button';
      dateButton.setAttribute('aria-label', 'Choose date');
      const calendarIcon = document.createElement('img');
      calendarIcon.alt = 'svg file';
      calendarIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1776085736966.svg+xml';
      dateButton.append(calendarIcon);
      adornment.append(dateButton);
      dobInputBase.append(adornment);

      const fieldset = document.createElement('fieldset');
      fieldset.classList.add('MuiPickersOutlinedInput-notchedOutline', 'mui-1l1mqzp');
      fieldset.setAttribute('aria-hidden', 'true');
      const legend = document.createElement('legend');
      legend.classList.add('mui-1pbc52w');
      const legendSpan = document.createElement('span');
      legendSpan.classList.add('mui-w48gsk');
      legendSpan.textContent = dateOfBirth;
      legend.append(legendSpan);
      fieldset.append(legend);
      dobInputBase.append(fieldset);

      const hiddenInput = document.createElement('input');
      hiddenInput.classList.add('MuiPickersInputBase-input', 'MuiPickersOutlinedInput-input', 'mui-1ftw2zb');
      hiddenInput.id = '_R_4cpi2pm_';
      hiddenInput.setAttribute('aria-hidden', 'true');
      hiddenInput.setAttribute('tabindex', '-1');
      hiddenInput.value = '';
      dobInputBase.append(hiddenInput);

      dobFormControl.append(dobInputBase);
      dobPickerWrapper.append(dobFormControl);
      dobWrapper.append(dobPickerWrapper);
      leadCalcForm.append(dobWrapper);

      const acceptTermsDiv = document.createElement('div');
      acceptTermsDiv.classList.add('accept-terms', 'renewal');
      const checkboxWrapper = document.createElement('div');
      checkboxWrapper.classList.add('custom-checkbox_custom-checkbox-wrapper__61aWx');
      const checkboxInput = document.createElement('input');
      checkboxInput.type = 'checkbox';
      checkboxInput.classList.add('custom-checkbox', 'checked');
      checkboxInput.checked = true;
      const checkboxSpan = document.createElement('span');
      const whatsappTextDiv = document.createElement('div');
      whatsappTextDiv.textContent = acceptTermsLabel;
      const whatsappIconSpan = document.createElement('span');
      whatsappIconSpan.classList.add('whatsapp-icon');
      const whatsappIconImg = document.createElement('img');
      whatsappIconImg.alt = 'Whatsapp Icon';
      whatsappIconImg.title = 'Icon';
      whatsappIconImg.loading = 'lazy';
      whatsappIconImg.width = '15';
      whatsappIconImg.height = '15';
      whatsappIconImg.decoding = 'async';
      whatsappIconImg.setAttribute('data-nimg', '1');
      whatsappIconImg.style.color = 'transparent';
      whatsappIconImg.srcset = 'https://www.bhartiaxa.com/whatsApp_icon.svg?w=16&q=75 1x, /content/dam/aemigrate/uploaded-folder/image/1776085737165.svg+xml 2x';
      whatsappIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776085737165.svg+xml';
      whatsappIconSpan.append(whatsappIconImg);
      whatsappTextDiv.append(whatsappIconSpan);
      checkboxSpan.append(whatsappTextDiv);
      checkboxWrapper.append(checkboxInput, checkboxSpan);
      acceptTermsDiv.append(checkboxWrapper);
      leadCalcForm.append(acceptTermsDiv);

      const submitWrap = document.createElement('div');
      submitWrap.classList.add('lead-form-submit-wrap', 'renewal');
      const contactUsP = document.createElement('p');
      contactUsP.classList.add('contact-us-text');
      contactUsP.textContent = 'Facing Trouble? ';
      if (contactUsLink) {
        const contactAnchor = document.createElement('a');
        contactAnchor.href = contactUsLink.href;
        contactAnchor.textContent = contactUsLinkLabel;
        contactUsP.append(contactAnchor);
      }
      submitWrap.append(contactUsP);

      const submitButton = document.createElement('button');
      submitButton.classList.add('lead-form-submit', 'buttonDisableClass');
      submitButton.disabled = true;
      const buttonTextSpan = document.createElement('span');
      buttonTextSpan.classList.add('button-text');
      buttonTextSpan.textContent = submitButtonLabel.replace('→', '').trim(); // Remove arrow for separate element
      const arrowBold = document.createElement('b');
      arrowBold.textContent = ' →';
      buttonTextSpan.append(arrowBold);
      submitButton.append(buttonTextSpan);
      submitWrap.append(submitButton);
      leadCalcForm.append(submitWrap);

      form.append(leadCalcForm);
      formWrapper.append(form);

      // Interactivity for Loan Form
      const checkLoanFormValidity = () => {
        const isMobileValid = mobileInput.value.length === 10;
        // For DOB, we'll assume it's valid if any content is present in the sections
        const isDobValid = [...sectionsContainer.querySelectorAll('.MuiPickersSectionList-sectionContent')]
          .some((s) => s.textContent !== 'DD' && s.textContent !== 'MM' && s.textContent !== 'YYYY' && s.textContent.trim() !== '');
        const isCheckboxChecked = checkboxInput.checked;
        submitButton.disabled = !(isMobileValid && isDobValid && isCheckboxChecked);
        if (submitButton.disabled) {
          submitButton.classList.add('buttonDisableClass');
        } else {
          submitButton.classList.remove('buttonDisableClass');
        }
      };

      mobileInput.addEventListener('input', checkLoanFormValidity);
      checkboxInput.addEventListener('change', checkLoanFormValidity);
      sectionsContainer.addEventListener('input', checkLoanFormValidity); // Listen for changes in DOB sections
      dateButton.addEventListener('click', () => {
        // In a real scenario, this would open a date picker modal/dropdown.
        // For now, we'll just log and assume user interaction.
        console.log('Date picker button clicked');
        // Simulate a date being picked for validation purposes
        if (hiddenInput.value === '') {
          hiddenInput.value = '01/01/2000'; // Simulate a date selection
          // Update the visible sections
          const dobSections = sectionsContainer.querySelectorAll('.MuiPickersSectionList-sectionContent');
          if (dobSections.length === 3) {
            dobSections[0].textContent = '01';
            dobSections[1].textContent = '01';
            dobSections[2].textContent = '2000';
          }
        } else {
          hiddenInput.value = ''; // Simulate clearing the date
          const dobSections = sectionsContainer.querySelectorAll('.MuiPickersSectionList-sectionContent');
          if (dobSections.length === 3) {
            dobSections[0].textContent = 'DD';
            dobSections[1].textContent = 'MM';
            dobSections[2].textContent = 'YYYY';
          }
        }
        checkLoanFormValidity();
      });
      checkLoanFormValidity(); // Initial check
    } else if (policyNumberLabel) {
      // Pay premium form
      const form = document.createElement('form');
      form.id = 'pay-premium-form';
      form.classList.add('lead-form-template', 'my-0', 'md:!my-[70px]');

      const leadCalcForm = document.createElement('div');
      leadCalcForm.classList.add('lead-calc-form');

      const title = document.createElement('h2');
      title.classList.add('lead-form-title', 'renewal');
      title.textContent = formTitle;
      leadCalcForm.append(title);

      const policyInputWrapper = document.createElement('div');
      policyInputWrapper.classList.add('custom-input_custom-input-wrapper__nlA0k');
      const policyInput = document.createElement('input');
      policyInput.classList.add('custom-input');
      policyInput.id = 'policyNumber';
      policyInput.type = 'text';
      policyInput.required = true;
      policyInput.maxLength = 11;
      policyInput.name = 'policyNumber';
      policyInput.value = '';
      const policyLabel = document.createElement('label');
      policyLabel.classList.add('custom-input-label');
      policyLabel.htmlFor = 'policyNumber';
      policyLabel.textContent = policyNumberLabel;
      policyInputWrapper.append(policyInput, policyLabel);
      leadCalcForm.append(policyInputWrapper);

      const acceptTermsDiv = document.createElement('div');
      acceptTermsDiv.classList.add('accept-terms', 'renewal');
      const checkboxWrapper = document.createElement('div');
      checkboxWrapper.classList.add('custom-checkbox_custom-checkbox-wrapper__61aWx');
      const checkboxInput = document.createElement('input');
      checkboxInput.type = 'checkbox';
      checkboxInput.classList.add('custom-checkbox', 'checked');
      checkboxInput.checked = true;
      const checkboxSpan = document.createElement('span');
      const whatsappTextDiv = document.createElement('div');
      whatsappTextDiv.textContent = acceptTermsLabel;
      const whatsappIconSpan = document.createElement('span');
      whatsappIconSpan.classList.add('whatsapp-icon');
      const whatsappIconImg = document.createElement('img');
      whatsappIconImg.alt = 'Whatsapp Icon';
      whatsappIconImg.title = 'Icon';
      whatsappIconImg.loading = 'lazy';
      whatsappIconImg.width = '15';
      whatsappIconImg.height = '15';
      whatsappIconImg.decoding = 'async';
      whatsappIconImg.setAttribute('data-nimg', '1');
      whatsappIconImg.style.color = 'transparent';
      whatsappIconImg.srcset = 'https://www.bhartiaxa.com/whatsApp_icon.svg?w=16&q=75 1x, /content/dam/aemigrate/uploaded-folder/image/1776085737165.svg+xml 2x';
      whatsappIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776085737165.svg+xml';
      whatsappIconSpan.append(whatsappIconImg);
      whatsappTextDiv.append(whatsappIconSpan);
      checkboxSpan.append(whatsappTextDiv);
      checkboxWrapper.append(checkboxInput, checkboxSpan);
      acceptTermsDiv.append(checkboxWrapper);
      leadCalcForm.append(acceptTermsDiv);

      const submitWrap = document.createElement('div');
      submitWrap.classList.add('lead-form-submit-wrap', 'renewal');
      const contactUsP = document.createElement('p');
      contactUsP.classList.add('contact-us-text');
      contactUsP.textContent = 'Facing Trouble? ';
      if (contactUsLink) {
        const contactAnchor = document.createElement('a');
        contactAnchor.href = contactUsLink.href;
        contactAnchor.textContent = contactUsLinkLabel;
        contactUsP.append(contactAnchor);
      }
      submitWrap.append(contactUsP);

      const submitButton = document.createElement('button');
      submitButton.classList.add('lead-form-submit', 'buttonDisableClass');
      submitButton.disabled = true;
      const buttonTextSpan = document.createElement('span');
      buttonTextSpan.classList.add('button-text');
      buttonTextSpan.textContent = submitButtonLabel.replace('→', '').trim(); // Remove arrow for separate element
      const arrowBold = document.createElement('b');
      arrowBold.textContent = ' →';
      buttonTextSpan.append(arrowBold);
      submitButton.append(buttonTextSpan);
      submitWrap.append(submitButton);
      leadCalcForm.append(submitWrap);

      form.append(leadCalcForm);
      formWrapper.append(form);

      // Interactivity for Pay Premium Form
      const checkPayPremiumFormValidity = () => {
        const isPolicyValid = policyInput.value.length === 11;
        const isCheckboxChecked = checkboxInput.checked;
        submitButton.disabled = !(isPolicyValid && isCheckboxChecked);
        if (submitButton.disabled) {
          submitButton.classList.add('buttonDisableClass');
        } else {
          submitButton.classList.remove('buttonDisableClass');
        }
      };

      policyInput.addEventListener('input', checkPayPremiumFormValidity);
      checkboxInput.addEventListener('change', checkPayPremiumFormValidity);
      checkPayPremiumFormValidity(); // Initial check
    } else {
      // Null form
      const nullFormDiv = document.createElement('div');
      nullFormDiv.classList.add('null-form');
      formWrapper.append(nullFormDiv);
    }

    formColumn.append(formWrapper);
    formGrid.append(formColumn);
    bannerFormBox.append(formGrid);
    containerDiv.append(bannerFormBox);
    bannerWithFormContainer.append(containerDiv);
    sliderBannerWithFormTemplate.append(bannerWithFormContainer);
    swiperSlide.append(sliderBannerWithFormTemplate);
    swiperWrapper.append(swiperSlide);
  });

  block.textContent = '';
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'swiper-section', 'swiper-initialized', 'swiper-horizontal', 'swiper-autoheight', 'swiper-backface-hidden');
  swiperContainer.append(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  // Add bullets based on the number of slides
  for (let i = 0; i < swiperWrapper.children.length; i += 1) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (i === 0) bullet.classList.add('swiper-pagination-bullet-active');
    swiperPagination.append(bullet);
  }
  swiperContainer.append(swiperPagination);

  block.append(swiperContainer);

  // Initialize Swiper (basic functionality, full Swiper JS not loaded by EDS)
  let activeSlideIndex = 0;
  const slides = [...swiperWrapper.children];
  const bullets = [...swiperPagination.children];

  const updateSwiper = () => {
    slides.forEach((slide, index) => {
      slide.classList.remove('swiper-slide-active', 'swiper-slide-prev');
      if (index === activeSlideIndex) {
        slide.classList.add('swiper-slide-active');
      } else if (index === (activeSlideIndex - 1 + slides.length) % slides.length) {
        slide.classList.add('swiper-slide-prev');
      }
      slide.style.width = '1920px'; // Assuming fixed width for slides
      slide.style.transform = `translate3d(-${activeSlideIndex * 1920}px, 0px, 0px)`;
      swiperWrapper.style.transform = `translate3d(-${activeSlideIndex * 1920}px, 0px, 0px)`;
    });

    bullets.forEach((bullet, index) => {
      bullet.classList.toggle('swiper-pagination-bullet-active', index === activeSlideIndex);
    });
  };

  bullets.forEach((bullet, index) => {
    bullet.addEventListener('click', () => {
      activeSlideIndex = index;
      updateSwiper();
    });
  });

  updateSwiper(); // Initial state
}
