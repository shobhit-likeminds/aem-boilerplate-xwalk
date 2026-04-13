import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    // Based on BlockJson and EDS structure, cells are always in this order:
    // [image, imageLink, imageLinkLabel, formHtml]
    const imageCell = cells[0];
    const imageLinkCell = cells[1];
    const imageLinkLabelCell = cells[2];
    const formHtmlCell = cells[3];

    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.classList.add('swiper-slide', 'swiper-slide-area');

    const sliderBannerWithFormTemplate = document.createElement('div');
    sliderBannerWithFormTemplate.classList.add('slider-banner-with-form-template');

    const bannerWithFormContainer = document.createElement('div');
    bannerWithFormContainer.classList.add('banner-with-form-container');

    const bannerImg = document.createElement('div');
    bannerImg.classList.add('banner-img');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));

        const foundLink = imageLinkCell.querySelector('a');
        if (foundLink) {
          const anchor = document.createElement('a');
          anchor.href = foundLink.href;
          // Use imageLinkLabelCell content for the anchor text
          anchor.textContent = imageLinkLabelCell?.textContent.trim() || '';
          anchor.appendChild(optimizedPic);
          bannerImg.appendChild(anchor);
        } else {
          bannerImg.appendChild(optimizedPic);
        }
      }
    }

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container', 'my-0', 'mx-auto');

    const bannerFormBox = document.createElement('div');
    bannerFormBox.classList.add('banner-form-box');

    const formGrid = document.createElement('div');
    formGrid.classList.add('form-grid');

    const formColumn = document.createElement('div');
    formColumn.classList.add('form-column');

    const formWrapper = document.createElement('div');
    if (formHtmlCell) {
      moveInstrumentation(formHtmlCell, formWrapper);
      while (formHtmlCell.firstChild) {
        formWrapper.append(formHtmlCell.firstChild);
      }
    }

    formColumn.appendChild(formWrapper);
    formGrid.appendChild(formColumn);
    bannerFormBox.appendChild(formGrid);
    containerDiv.appendChild(bannerFormBox);

    bannerWithFormContainer.appendChild(bannerImg);
    bannerWithFormContainer.appendChild(containerDiv);
    sliderBannerWithFormTemplate.appendChild(bannerWithFormContainer);
    swiperSlide.appendChild(sliderBannerWithFormTemplate);
    swiperWrapper.appendChild(swiperSlide);
  });

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'swiper-section', 'swiper-initialized', 'swiper-horizontal', 'swiper-autoheight', 'swiper-backface-hidden');
  swiperContainer.appendChild(swiperWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  block.textContent = '';
  block.classList.add('swiper-area');
  block.append(swiperContainer, swiperPagination);

  // Initialize Swiper (minimal implementation as EDS doesn't load Swiper JS)
  const slides = [...swiperWrapper.children];
  let currentIndex = 0;

  const updateSwiper = () => {
    slides.forEach((slide, i) => {
      slide.classList.remove('swiper-slide-prev', 'swiper-slide-active', 'swiper-slide-next');
      if (i === currentIndex) {
        slide.classList.add('swiper-slide-active');
      } else if (i === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add('swiper-slide-prev');
      } else if (i === (currentIndex + 1) % slides.length) {
        slide.classList.add('swiper-slide-next');
      }
    });

    // This transform logic is a simplified representation.
    // A real Swiper would handle this with more complex CSS transforms and transitions.
    // For a basic visual update, we can set the transform directly.
    swiperWrapper.style.transform = `translate3d(-${currentIndex * 100}%, 0px, 0px)`;
    // Also update height if autoheight is enabled and slides have different heights
    const activeSlide = slides[currentIndex];
    if (activeSlide) {
      swiperWrapper.style.height = `${activeSlide.offsetHeight}px`;
    }


    swiperPagination.innerHTML = '';
    slides.forEach((_, i) => {
      const bullet = document.createElement('span');
      bullet.classList.add('swiper-pagination-bullet');
      if (i === currentIndex) {
        bullet.classList.add('swiper-pagination-bullet-active');
      }
      bullet.addEventListener('click', () => {
        currentIndex = i;
        updateSwiper();
      });
      swiperPagination.appendChild(bullet);
    });
  };

  updateSwiper(); // Initial render

  // Add event listeners for forms and checkboxes within each slide
  slides.forEach((slide) => {
    const form = slide.querySelector('form.lead-form-template');
    if (form) {
      const submitButton = form.querySelector('button.lead-form-submit');
      const mobileNoInput = form.querySelector('input#mobileNo');
      const policyNumberInput = form.querySelector('input#policyNumber');
      const whatsappCheckbox = form.querySelector('input[type="checkbox"].custom-checkbox');

      const validateForm = () => {
        let isValid = true;
        if (mobileNoInput) {
          isValid = isValid && mobileNoInput.value.length === 10;
        }
        if (policyNumberInput) {
          isValid = isValid && policyNumberInput.value.length === 11;
        }
        // Add other validation rules as needed
        if (submitButton) {
          if (isValid) {
            submitButton.classList.remove('buttonDisableClass');
            submitButton.removeAttribute('disabled');
          } else {
            submitButton.classList.add('buttonDisableClass');
            submitButton.setAttribute('disabled', 'true');
          }
        }
      };

      if (mobileNoInput) {
        mobileNoInput.addEventListener('input', validateForm);
      }
      if (policyNumberInput) {
        policyNumberInput.addEventListener('input', validateForm);
      }
      if (whatsappCheckbox) {
        whatsappCheckbox.addEventListener('change', () => {
          if (whatsappCheckbox.checked) {
            whatsappCheckbox.classList.add('checked');
          } else {
            whatsappCheckbox.classList.remove('checked');
          }
        });
      }

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', form.id);
        // You would typically send data to a backend or perform client-side actions
      });

      // Initial validation state
      validateForm();
    }

    // Add event listener for the date picker button if it exists
    const datePickerButton = slide.querySelector('.MuiInputAdornment-root .MuiButtonBase-root');
    if (datePickerButton) {
      datePickerButton.addEventListener('click', () => {
        // In a real scenario, this would trigger a date picker UI.
        // For EDS, this might involve toggling a custom date picker component's visibility.
        console.log('Date picker button clicked!');
        // Example: toggle a class to show/hide a custom date picker overlay
        // const datePickerWrapper = datePickerButton.closest('.custom-input-date-picker_custom-input-date-picker-wrapper__XAYAk');
        // datePickerWrapper.classList.toggle('date-picker-open');
      });
    }
  });
}
