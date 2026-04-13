import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const swiperArea = document.createElement('div');
  swiperArea.classList.add('swiper-area');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-section', 'swiper-initialized', 'swiper-horizontal', 'swiper-autoheight', 'swiper-backface-hidden');
  swiperArea.append(swiper);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiper.append(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiper.append(swiperPagination);

  const slides = [...block.children];
  slides.forEach((row, index) => {
    const cells = [...row.children];

    // Use content detection instead of direct index access for robustness
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const imageLinkCell = cells.find(cell => cell.textContent.includes('imageLink') && cell.querySelector('a'));
    const imageLinkLabelCell = cells.find(cell => cell.textContent.includes('imagelinklabel') && !cell.querySelector('a'));
    const formTitleCell = cells.find(cell => cell.textContent.includes('Form Title'));
    const mobileNumberLabelCell = cells.find(cell => cell.textContent.includes('Mobile Number Label'));
    const dateOfBirthLabelCell = cells.find(cell => cell.textContent.includes('Date Of Birth Label'));
    const policyNumberLabelCell = cells.find(cell => cell.textContent.includes('Policy Number Label'));
    const whatsappOptInCell = cells.find(cell => cell.textContent.includes('true') || cell.querySelector('img[alt="Whatsapp Icon"]'));
    const ctaLinkCell = cells.find(cell => cell.textContent.includes('ctaLink') && cell.querySelector('a'));
    const ctaLinkLabelCell = cells.find(cell => cell.textContent.includes('ctalinklabel') && !cell.querySelector('a'));
    const contactUsTextCell = cells.find(cell => cell.textContent.includes('Contact Us Text'));
    const contactUsLinkCell = cells.find(cell => cell.textContent.includes('contactUsLink') && cell.querySelector('a'));
    const contactUsLinkLabelCell = cells.find(cell => cell.textContent.includes('contactuslinklabel') && !cell.querySelector('a'));

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'swiper-slide-area');
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-active');
    } else if (index === slides.length - 1) {
      swiperSlide.classList.add('swiper-slide-next');
    } else {
      swiperSlide.classList.add('swiper-slide-prev');
    }
    moveInstrumentation(row, swiperSlide);

    const sliderBannerTemplate = document.createElement('div');
    sliderBannerTemplate.classList.add('slider-banner-with-form-template');
    swiperSlide.append(sliderBannerTemplate);

    const bannerWithFormContainer = document.createElement('div');
    bannerWithFormContainer.classList.add('banner-with-form-container');
    sliderBannerTemplate.append(bannerWithFormContainer);

    const bannerImgDiv = document.createElement('div');
    bannerImgDiv.classList.add('banner-img');
    bannerWithFormContainer.append(bannerImgDiv);

    const imageLink = imageLinkCell?.querySelector('a');
    const imageLinkLabel = imageLinkLabelCell?.textContent.trim();
    const imagePicture = imageCell?.querySelector('picture');

    if (imageLink && imagePicture) {
      const anchor = document.createElement('a');
      anchor.href = imageLink.href;
      anchor.setAttribute('aria-label', imageLinkLabel);
      moveInstrumentation(imageLinkCell, anchor);
      anchor.append(imagePicture);
      bannerImgDiv.append(anchor);
    } else if (imagePicture) {
      bannerImgDiv.append(imagePicture);
    }

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container', 'my-0', 'mx-auto');
    bannerWithFormContainer.append(containerDiv);

    const bannerFormBox = document.createElement('div');
    bannerFormBox.classList.add('banner-form-box');
    containerDiv.append(bannerFormBox);

    const formGrid = document.createElement('div');
    formGrid.classList.add('form-grid');
    bannerFormBox.append(formGrid);

    const formColumn = document.createElement('div');
    formColumn.classList.add('form-column');
    formGrid.append(formColumn);

    const formWrapper = document.createElement('div');
    formColumn.append(formWrapper);

    const form = document.createElement('form');
    form.classList.add('lead-form-template');
    formWrapper.append(form);

    const leadCalcForm = document.createElement('div');
    leadCalcForm.classList.add('lead-calc-form');
    form.append(leadCalcForm);

    const formTitle = document.createElement('h2');
    formTitle.classList.add('lead-form-title', 'renewal');
    formTitle.textContent = formTitleCell?.textContent.trim();
    leadCalcForm.append(formTitle);

    // Mobile Number Input
    const mobileNumberWrapper = document.createElement('div');
    mobileNumberWrapper.classList.add('custom-input_custom-input-wrapper__nlA0k');
    leadCalcForm.append(mobileNumberWrapper);

    const mobileInput = document.createElement('input');
    mobileInput.classList.add('custom-input');
    mobileInput.id = 'mobileNo';
    mobileInput.type = 'tel';
    mobileInput.required = true;
    mobileInput.maxLength = 10;
    mobileInput.name = 'mobileNo';
    mobileInput.value = '';
    mobileNumberWrapper.append(mobileInput);

    const mobileLabel = document.createElement('label');
    mobileLabel.classList.add('custom-input-label');
    mobileLabel.htmlFor = 'mobileNo';
    mobileLabel.textContent = mobileNumberLabelCell?.textContent.trim();
    mobileNumberWrapper.append(mobileLabel);

    const mobileIcon = document.createElement('i');
    mobileIcon.classList.add('custom-input-icon', 'icon-phone-m');
    mobileNumberWrapper.append(mobileIcon);

    // Date Of Birth Input
    const dobCol = document.createElement('div');
    dobCol.classList.add('col-span-12', 'md:col-span-6');
    leadCalcForm.append(dobCol);

    const dobWrapper = document.createElement('div');
    dobWrapper.classList.add('custom-input-date-picker_custom-input-date-picker-wrapper__XAYAk');
    dobCol.append(dobWrapper);

    const muiFormControl = document.createElement('div');
    muiFormControl.classList.add('MuiFormControl-root', 'MuiFormControl-fullWidth', 'MuiPickersTextField-root', 'datepicker', 'mui-9h73hm');
    dobWrapper.append(muiFormControl);

    const dobLabel = document.createElement('label');
    dobLabel.classList.add('MuiFormLabel-root', 'MuiInputLabel-root', 'MuiInputLabel-formControl', 'MuiInputLabel-animated', 'MuiInputLabel-outlined', 'MuiFormLabel-colorPrimary', 'MuiInputLabel-root', 'MuiInputLabel-formControl', 'MuiInputLabel-animated', 'MuiInputLabel-outlined', 'mui-160rfsr');
    dobLabel.setAttribute('data-shrink', 'false');
    dobLabel.htmlFor = '_R_4cpi2pm_';
    dobLabel.id = '_R_4cpi2pm_-label';
    dobLabel.textContent = dateOfBirthLabelCell?.textContent.trim();
    muiFormControl.append(dobLabel);

    const muiPickersInputBase = document.createElement('div');
    muiPickersInputBase.classList.add('MuiPickersInputBase-root', 'MuiPickersOutlinedInput-root', 'MuiPickersInputBase-fullWidth', 'MuiPickersInputBase-colorPrimary', 'MuiPickersInputBase-adornedEnd', 'mui-18qp6qv');
    muiPickersInputBase.setAttribute('aria-invalid', 'false');
    muiPickersInputBase.setAttribute('role', 'group');
    muiPickersInputBase.setAttribute('aria-labelledby', '_R_4cpi2pm_-label');
    muiFormControl.append(muiPickersInputBase);

    const muiPickersSectionList = document.createElement('div');
    muiPickersSectionList.classList.add('MuiPickersSectionList-root', 'MuiPickersInputBase-sectionsContainer', 'mui-161q5nr');
    muiPickersSectionList.setAttribute('contenteditable', 'false');
    muiPickersSectionList.setAttribute('tabindex', '0');
    muiPickersInputBase.append(muiPickersSectionList);

    const createSection = (sectionIndex, label, value) => {
      const span = document.createElement('span');
      span.classList.add('MuiPickersSectionList-section', 'mui-7p02jm');
      span.setAttribute('data-sectionindex', sectionIndex);

      const beforeSpan = document.createElement('span');
      beforeSpan.classList.add('MuiPickersInputBase-sectionBefore', 'mui-1wrzzxc');
      span.append(beforeSpan);

      const contentSpan = document.createElement('span');
      contentSpan.classList.add('MuiPickersSectionList-sectionContent', 'MuiPickersInputBase-sectionContent', 'mui-1ry0dx6');
      contentSpan.setAttribute('aria-readonly', 'false');
      contentSpan.setAttribute('aria-valuemin', sectionIndex === 0 ? '1' : sectionIndex === 1 ? '1' : '0');
      contentSpan.setAttribute('aria-valuemax', sectionIndex === 0 ? '31' : sectionIndex === 1 ? '12' : '9999');
      contentSpan.setAttribute('aria-valuetext', 'Empty');
      contentSpan.setAttribute('aria-label', label);
      contentSpan.setAttribute('aria-disabled', 'false');
      contentSpan.setAttribute('tabindex', sectionIndex === 0 ? '0' : '-1');
      contentSpan.setAttribute('contenteditable', 'true');
      contentSpan.setAttribute('role', 'spinbutton');
      contentSpan.setAttribute('spellcheck', 'false');
      contentSpan.setAttribute('autocapitalize', 'none');
      contentSpan.setAttribute('autocorrect', 'off');
      contentSpan.setAttribute('inputmode', 'numeric');
      contentSpan.textContent = value;
      span.append(contentSpan);

      const afterSpan = document.createElement('span');
      afterSpan.classList.add('MuiPickersInputBase-sectionAfter', 'mui-1wrzzxc');
      if (sectionIndex < 2) afterSpan.textContent = '/';
      span.append(afterSpan);
      return span;
    };

    muiPickersSectionList.append(createSection(0, 'Day', 'DD'));
    muiPickersSectionList.append(createSection(1, 'Month', 'MM'));
    muiPickersSectionList.append(createSection(2, 'Year', 'YYYY'));

    const muiInputAdornment = document.createElement('div');
    muiInputAdornment.classList.add('MuiInputAdornment-root', 'MuiInputAdornment-positionEnd', 'MuiInputAdornment-outlined', 'MuiInputAdornment-sizeMedium', 'mui-yxqbup');
    muiPickersInputBase.append(muiInputAdornment);

    const datePickerButton = document.createElement('button');
    datePickerButton.classList.add('MuiButtonBase-root', 'MuiIconButton-root', 'MuiIconButton-edgeEnd', 'MuiIconButton-sizeMedium', 'mui-15ni0jc');
    datePickerButton.setAttribute('tabindex', '0');
    datePickerButton.type = 'button';
    datePickerButton.setAttribute('aria-label', 'Choose date');
    muiInputAdornment.append(datePickerButton);

    const calendarIcon = document.createElement('img');
    calendarIcon.alt = 'svg file';
    // Find the calendar icon from the original HTML structure
    const calendarIconSrc = [...row.children].find(cell => cell.querySelector('img[alt="svg file"]'))?.querySelector('img')?.src;
    if (calendarIconSrc) {
      calendarIcon.src = calendarIconSrc;
    }
    datePickerButton.append(calendarIcon);

    const fieldset = document.createElement('fieldset');
    fieldset.classList.add('MuiPickersOutlinedInput-notchedOutline', 'mui-1l1mqzp');
    fieldset.setAttribute('aria-hidden', 'true');
    muiPickersInputBase.append(fieldset);

    const legend = document.createElement('legend');
    legend.classList.add('mui-1pbc52w');
    fieldset.append(legend);

    const legendSpan = document.createElement('span');
    legendSpan.classList.add('mui-w48gsk');
    legendSpan.textContent = dateOfBirthLabelCell?.textContent.trim();
    legend.append(legendSpan);

    const hiddenInput = document.createElement('input');
    hiddenInput.classList.add('MuiPickersInputBase-input', 'MuiPickersOutlinedInput-input', 'mui-1ftw2zb');
    hiddenInput.id = '_R_4cpi2pm_';
    hiddenInput.setAttribute('aria-hidden', 'true');
    hiddenInput.setAttribute('tabindex', '-1');
    hiddenInput.value = '';
    muiFormControl.append(hiddenInput);

    // WhatsApp Opt-In
    const acceptTerms = document.createElement('div');
    acceptTerms.classList.add('accept-terms', 'renewal');
    leadCalcForm.append(acceptTerms);

    const customCheckboxWrapper = document.createElement('div');
    customCheckboxWrapper.classList.add('custom-checkbox_custom-checkbox-wrapper__61aWx');
    acceptTerms.append(customCheckboxWrapper);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('custom-checkbox', 'checked');
    checkbox.checked = whatsappOptInCell?.textContent.trim() === 'true';
    customCheckboxWrapper.append(checkbox);

    const checkboxSpan = document.createElement('span');
    customCheckboxWrapper.append(checkboxSpan);

    const checkboxTextDiv = document.createElement('div');
    checkboxTextDiv.textContent = 'Get your life insurance policy updates through WhatsApp';
    checkboxSpan.append(checkboxTextDiv);

    const whatsappIconSpan = document.createElement('span');
    whatsappIconSpan.classList.add('whatsapp-icon');
    checkboxTextDiv.append(whatsappIconSpan);

    const whatsappIcon = document.createElement('img');
    whatsappIcon.alt = 'Whatsapp Icon';
    whatsappIcon.title = 'Icon';
    whatsappIcon.loading = 'lazy';
    whatsappIcon.width = '15';
    whatsappIcon.height = '15';
    whatsappIcon.decoding = 'async';
    whatsappIcon.setAttribute('data-nimg', '1');
    whatsappIcon.style.color = 'transparent';
    const whatsappIconSrc = whatsappOptInCell?.querySelector('img[alt="Whatsapp Icon"]')?.src;
    if (whatsappIconSrc) {
      whatsappIcon.src = whatsappIconSrc;
    }
    whatsappIconSpan.append(whatsappIcon);

    // CTA Button and Contact Us Link
    const leadFormSubmitWrap = document.createElement('div');
    leadFormSubmitWrap.classList.add('lead-form-submit-wrap', 'renewal');
    leadCalcForm.append(leadFormSubmitWrap);

    const contactUsP = document.createElement('p');
    contactUsP.classList.add('contact-us-text');
    contactUsP.textContent = contactUsTextCell?.textContent.trim();
    leadFormSubmitWrap.append(contactUsP);

    const contactUsLink = contactUsLinkCell?.querySelector('a');
    if (contactUsLink) {
      const contactUsAnchor = document.createElement('a');
      contactUsAnchor.href = contactUsLink.href;
      contactUsAnchor.textContent = contactUsLinkLabelCell?.textContent.trim();
      moveInstrumentation(contactUsLinkCell, contactUsAnchor);
      contactUsP.append(contactUsAnchor);
    }

    const ctaButton = document.createElement('button');
    ctaButton.classList.add('lead-form-submit', 'buttonDisableClass');
    ctaButton.disabled = true;
    leadFormSubmitWrap.append(ctaButton);

    const ctaButtonTextSpan = document.createElement('span');
    ctaButtonTextSpan.classList.add('button-text');
    ctaButtonTextSpan.textContent = ctaLinkLabelCell?.textContent.trim();
    const arrowBold = document.createElement('b');
    arrowBold.textContent = ' →';
    ctaButtonTextSpan.append(arrowBold);
    ctaButton.append(ctaButtonTextSpan);

    // Policy Number input for renewal form
    let policyInput;
    let policyNumberWrapper;
    if (policyNumberLabelCell?.textContent.trim()) {
      policyNumberWrapper = document.createElement('div');
      policyNumberWrapper.classList.add('custom-input_custom-input-wrapper__nlA0k');
      leadCalcForm.insertBefore(policyNumberWrapper, dobCol); // Insert before DOB for renewal form

      policyInput = document.createElement('input');
      policyInput.classList.add('custom-input');
      policyInput.id = 'policyNumber';
      policyInput.type = 'text';
      policyInput.required = true;
      policyInput.maxLength = 11;
      policyInput.name = 'policyNumber';
      policyInput.value = '';
      policyNumberWrapper.append(policyInput);

      const policyLabel = document.createElement('label');
      policyLabel.classList.add('custom-input-label');
      policyLabel.htmlFor = 'policyNumber';
      policyLabel.textContent = policyNumberLabelCell?.textContent.trim();
      policyNumberWrapper.append(policyLabel);

      // Remove mobile number and DOB for policy form
      mobileNumberWrapper.remove();
      dobCol.remove();
    }

    // Interactivity: Form validation for CTA button
    const updateCtaButtonState = () => {
      let isFormValid = true;
      if (policyInput) {
        isFormValid = policyInput.value.length === 11 && checkbox.checked;
      } else {
        const dayInput = muiPickersSectionList.querySelector('[data-sectionindex="0"] .MuiPickersSectionList-sectionContent');
        const monthInput = muiPickersSectionList.querySelector('[data-sectionindex="1"] .MuiPickersSectionList-sectionContent');
        const yearInput = muiPickersSectionList.querySelector('[data-sectionindex="2"] .MuiPickersSectionList-sectionContent');

        const isMobileValid = mobileInput.value.length === 10;
        const isDobValid = dayInput?.textContent !== 'DD' && monthInput?.textContent !== 'MM' && yearInput?.textContent !== 'YYYY';
        isFormValid = isMobileValid && isDobValid && checkbox.checked;
      }

      if (isFormValid) {
        ctaButton.disabled = false;
        ctaButton.classList.remove('buttonDisableClass');
      } else {
        ctaButton.disabled = true;
        ctaButton.classList.add('buttonDisableClass');
      }
    };

    // Add event listeners for form inputs
    if (policyInput) {
      policyInput.addEventListener('input', updateCtaButtonState);
    } else {
      mobileInput.addEventListener('input', updateCtaButtonState);
      muiPickersSectionList.querySelectorAll('.MuiPickersSectionList-sectionContent').forEach(input => {
        input.addEventListener('input', updateCtaButtonState);
        input.addEventListener('blur', updateCtaButtonState); // Also check on blur for date parts
      });
    }
    checkbox.addEventListener('change', updateCtaButtonState);

    // Initial state
    updateCtaButtonState();

    swiperWrapper.append(swiperSlide);

    const paginationBullet = document.createElement('span');
    paginationBullet.classList.add('swiper-pagination-bullet');
    if (index === 0) {
      paginationBullet.classList.add('swiper-pagination-bullet-active');
    }
    swiperPagination.append(paginationBullet);
  });

  swiperArea.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(swiperArea);

  // Swiper initialization logic (simplified, as EDS doesn't load Swiper JS)
  let currentIndex = 0;
  const slidesElements = swiperWrapper.querySelectorAll('.swiper-slide');
  const bullets = swiperPagination.querySelectorAll('.swiper-pagination-bullet');

  const updateSwiper = () => {
    slidesElements.forEach((slide, i) => {
      slide.classList.remove('swiper-slide-active', 'swiper-slide-prev', 'swiper-slide-next');
      if (i === currentIndex) {
        slide.classList.add('swiper-slide-active');
      } else if (i === (currentIndex - 1 + slidesElements.length) % slidesElements.length) {
        slide.classList.add('swiper-slide-prev');
      } else if (i === (currentIndex + 1) % slidesElements.length) {
        slide.classList.add('swiper-slide-next');
      }
      slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    bullets.forEach((bullet, i) => {
      bullet.classList.toggle('swiper-pagination-bullet-active', i === currentIndex);
    });
  };

  bullets.forEach((bullet, i) => {
    bullet.addEventListener('click', () => {
      currentIndex = i;
      updateSwiper();
    });
  });

  // Basic touch/drag for desktop (simplified)
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  swiperWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    swiperWrapper.style.cursor = 'grabbing';
  });

  swiperWrapper.addEventListener('mouseup', () => {
    isDragging = false;
    swiperWrapper.style.cursor = 'grab';
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50 && currentIndex < slidesElements.length - 1) {
      currentIndex++;
    } else if (movedBy > 50 && currentIndex > 0) {
      currentIndex--;
    }
    updateSwiper();
    prevTranslate = 0;
    currentTranslate = 0;
  });

  swiperWrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentTranslate = e.clientX - startX;
    swiperWrapper.style.transform = `translateX(${currentTranslate}px)`;
  });

  swiperWrapper.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      swiperWrapper.style.cursor = 'grab';
      updateSwiper();
      prevTranslate = 0;
      currentTranslate = 0;
    }
  });

  updateSwiper(); // Initial render
}
