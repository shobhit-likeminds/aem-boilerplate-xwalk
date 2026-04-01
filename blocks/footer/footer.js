import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];

  // Separate logo and FSSAI logo rows using content detection
  const logoRow = allRows.find(row => row.querySelector('.logo.image.cmp-footer__logo') || (row.children.length === 1 && row.querySelector('picture') && row.querySelector('a')));
  const fssaiLogoRow = allRows.find(row => row !== logoRow && (row.querySelector('.logofssai.logo.image.cmp-footer__fssai_logo') || (row.children.length === 1 && row.querySelector('picture') && !row.querySelector('a'))));

  // Filter out the logo and FSSAI logo rows from itemRows
  const itemRows = allRows.filter(row => row !== logoRow && row !== fssaiLogoRow);

  const footerDiv = document.createElement('div');
  footerDiv.classList.add('cmp-footer');

  const topContent = document.createElement('div');
  topContent.classList.add('cmp-footer__top-content');

  const navLogo = document.createElement('div');
  navLogo.classList.add('cmp-footer__nav-logo');

  // Logo
  if (logoRow) {
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('logo', 'image', 'cmp-footer__logo');
    const logoPicture = logoRow.querySelector('picture');
    if (logoPicture) {
      const logoLink = document.createElement('a');
      logoLink.classList.add('cmp-image__link');
      const existingLink = logoRow.querySelector('a');
      if (existingLink) {
        logoLink.href = existingLink.href;
      } else {
        logoLink.href = '/'; // Default link if not provided
      }

      const img = logoPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        logoLink.append(optimizedPic);
      }
      logoDiv.append(logoLink);
    }
    moveInstrumentation(logoRow, logoDiv);
    navLogo.append(logoDiv);
  }


  // FSSAI Logo
  if (fssaiLogoRow) {
    const fssaiLogoDiv = document.createElement('div');
    fssaiLogoDiv.classList.add('logofssai', 'logo', 'image', 'cmp-footer__fssai_logo');
    const fssaiPicture = fssaiLogoRow.querySelector('picture');
    if (fssaiPicture) {
      const img = fssaiPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        fssaiLogoDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(fssaiLogoRow, fssaiLogoDiv);
    navLogo.append(fssaiLogoDiv);
  }

  topContent.append(navLogo);

  // Subscribe Now (static markup as per original HTML, not from EDS model)
  const subscribeDiv = document.createElement('div');
  subscribeDiv.classList.add('cmp-footer__nav-subscribe');
  subscribeDiv.setAttribute('data-register-api-url', '/content/itc-foods-brands/servicespath/itcemail.register.json');
  subscribeDiv.setAttribute('data-popup-success-message', 'Registered Successfully!!');
  subscribeDiv.setAttribute('data-popup-failure-message', 'Registered Failed, Please try after some time.');

  const subscribeText = document.createElement('div');
  subscribeText.classList.add('cmp-footer__nav-text');
  const subscribeImg = document.createElement('img');
  subscribeImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775067352468.svg+xml'; // From original HTML
  subscribeImg.alt = 'aashirvaad-logo';
  subscribeImg.loading = 'lazy';
  subscribeImg.fetchpriority = 'low';
  subscribeText.append(subscribeImg);
  const subscribeH3 = document.createElement('h3');
  subscribeH3.textContent = 'in Your Inbox';
  subscribeText.append(subscribeH3);
  subscribeDiv.append(subscribeText);

  const inputContainer = document.createElement('div');
  inputContainer.classList.add('container', 'responsivegrid', 'cmp-input');
  const emailDiv = document.createElement('div');
  emailDiv.classList.add('text', 'aem-GridColumn', 'aem-GridColumn--default--12', 'cmp-input__email');
  const formTextDiv = document.createElement('div');
  formTextDiv.classList.add('cmp-form-text');
  formTextDiv.setAttribute('data-cmp-required-message', 'This field is required');
  formTextDiv.setAttribute('data-cmp-valid-email', 'Please enter valid email id');
  const emailLabel = document.createElement('label');
  emailLabel.htmlFor = 'form-text-2014401237';
  formTextDiv.append(emailLabel);
  const emailInput = document.createElement('input');
  emailInput.classList.add('cmp-form-text__text');
  emailInput.type = 'email';
  emailInput.placeholder = 'Enter your Email ID';
  emailInput.name = 'email';
  formTextDiv.append(emailInput);
  emailDiv.append(formTextDiv);
  inputContainer.append(emailDiv);
  subscribeDiv.append(inputContainer);

  const errorMessage = document.createElement('div');
  errorMessage.classList.add('cmp-footer__error-message');
  subscribeDiv.append(errorMessage);

  const consentDiv = document.createElement('div');
  consentDiv.classList.add('cmp-footer__consent');
  const consentCheckbox = document.createElement('input');
  consentCheckbox.type = 'checkbox';
  consentCheckbox.id = 'i_agree';
  consentCheckbox.name = 'i_agree';
  consentCheckbox.value = 'i_agree';
  consentCheckbox.classList.add('cmp-footer__consent--checkbox');
  consentDiv.append(consentCheckbox);
  const consentLinkDiv = document.createElement('div');
  consentLinkDiv.classList.add('cmp-footer__consent--link');
  const consentP = document.createElement('p');
  consentP.innerHTML = 'By clicking “Register Now”, you agree to the&nbsp;<a href="/conditions-policy/privacy-policy.html" target="_self" rel="noopener noreferrer">Privacy Policy</a>&nbsp;and to receive marketing emails from the Aashirvaad community';
  consentLinkDiv.append(consentP);
  consentDiv.append(consentLinkDiv);
  subscribeDiv.append(consentDiv);

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'cmp-button--primary', 'cmp-button--primary-anchor-dark');
  const registerButton = document.createElement('button');
  registerButton.type = 'button';
  registerButton.id = 'button-fb2118d4d9';
  registerButton.classList.add('cmp-button');
  registerButton.setAttribute('data-request', 'true');
  registerButton.disabled = true;
  const buttonSpan = document.createElement('span');
  buttonSpan.classList.add('cmp-button__text');
  buttonSpan.textContent = 'Register Now';
  registerButton.append(buttonSpan);
  buttonDiv.append(registerButton);
  subscribeDiv.append(buttonDiv);

  topContent.append(subscribeDiv);

  // Event Listeners for subscription form
  const validateForm = () => {
    const emailValid = emailInput.value.includes('@') && emailInput.value.includes('.');
    const consentChecked = consentCheckbox.checked;
    registerButton.disabled = !(emailValid && consentChecked);
    if (!emailValid && emailInput.value.length > 0) {
      errorMessage.textContent = formTextDiv.getAttribute('data-cmp-valid-email');
    } else if (emailInput.value.length === 0 && consentChecked) {
      errorMessage.textContent = formTextDiv.getAttribute('data-cmp-required-message');
    } else {
      errorMessage.textContent = '';
    }
  };

  emailInput.addEventListener('input', validateForm);
  consentCheckbox.addEventListener('change', validateForm);

  registerButton.addEventListener('click', async () => {
    if (!registerButton.disabled) {
      const apiUrl = subscribeDiv.getAttribute('data-register-api-url');
      const successMessage = subscribeDiv.getAttribute('data-popup-success-message');
      const failureMessage = subscribeDiv.getAttribute('data-popup-failure-message');

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailInput.value, i_agree: consentCheckbox.checked }),
        });

        if (response.ok) {
          alert(successMessage);
          emailInput.value = '';
          consentCheckbox.checked = false;
          validateForm(); // Reset button state
        } else {
          alert(failureMessage);
        }
      } catch (error) {
        console.error('Subscription failed:', error);
        alert(failureMessage);
      }
    }
  });


  // Navigation Links, Titles, Social Media
  const navigationLinks = [];
  const titleLinks = [];
  const socialLinks = [];

  itemRows.forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      // Heuristic to distinguish link types based on content or common patterns
      const linkText = link.textContent.toLowerCase();
      if (linkText.includes('instagram') || linkText.includes('facebook') || linkText.includes('twitter') || linkText.includes('youtube')) {
        socialLinks.push(row);
      } else if (link.parentElement.classList.contains('desc-1') || link.href.includes('itcportal.com')) { // Check for desc-1 class or specific href pattern
        titleLinks.push(row);
      } else {
        navigationLinks.push(row);
      }
    }
  });

  // Navigation Links
  const navDiv = document.createElement('div');
  navDiv.classList.add('cmp-footer__nav');

  const leftNavItems = document.createElement('div');
  leftNavItems.classList.add('cmp-footer__nav-items', 'cmp-navigation__group--left');
  const leftNavigation = document.createElement('div');
  leftNavigation.classList.add('navigation');
  const leftNav = document.createElement('nav');
  leftNav.classList.add('cmp-navigation');
  leftNav.setAttribute('role', 'navigation');
  const leftUl = document.createElement('ul');
  leftUl.classList.add('cmp-navigation__group');

  // Assuming first half of navigation links go to left, second half to right
  const halfPoint = Math.ceil(navigationLinks.length / 2);
  navigationLinks.slice(0, halfPoint).forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    const linkEl = document.createElement('a');
    linkEl.classList.add('cmp-navigation__item-link');
    const foundLink = row.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.textContent = foundLink.textContent;
    }
    moveInstrumentation(row, li);
    li.append(linkEl);
    leftUl.append(li);
  });
  leftNav.append(leftUl);
  leftNavigation.append(leftNav);
  leftNavItems.append(leftNavigation);
  navDiv.append(leftNavItems);


  const rightNavItems = document.createElement('div');
  rightNavItems.classList.add('cmp-footer__nav-items', 'cmp-navigation__group--right');
  const rightNavigation = document.createElement('div');
  rightNavigation.classList.add('navigation');
  const rightNav = document.createElement('nav');
  rightNav.classList.add('cmp-navigation');
  rightNav.setAttribute('role', 'navigation');
  const rightUl = document.createElement('ul');
  rightUl.classList.add('cmp-navigation__group');

  navigationLinks.slice(halfPoint).forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0');
    const linkEl = document.createElement('a');
    linkEl.classList.add('cmp-navigation__item-link');
    const foundLink = row.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.textContent = foundLink.textContent;
    }
    moveInstrumentation(row, li);
    li.append(linkEl);
    rightUl.append(li);
  });
  rightNav.append(rightUl);
  rightNavigation.append(rightNav);
  rightNavItems.append(rightNavigation);
  navDiv.append(rightNavItems);

  topContent.append(navDiv);
  footerDiv.append(topContent);

  // Bottom Content
  const bottomContent = document.createElement('div');
  bottomContent.classList.add('cmp-footer__bottom-content');

  const bottomContainer = document.createElement('div');
  bottomContainer.classList.add('cmp-footer__container');

  // Titles
  const itcTitles = document.createElement('div');
  itcTitles.classList.add('cmp-footer__ITC-Titles');

  titleLinks.forEach((row) => {
    const linkEl = document.createElement('a');
    linkEl.classList.add('desc-1');
    const foundLink = row.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.textContent = foundLink.textContent;
      if (foundLink.target) linkEl.target = foundLink.target;
    }
    moveInstrumentation(row, linkEl);
    itcTitles.append(linkEl);
  });
  bottomContainer.append(itcTitles);

  // Social Media
  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.classList.add('cmp-footer__social-media');

  socialLinks.forEach((row) => {
    const linkEl = document.createElement('a');
    const foundLink = row.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      const textContent = foundLink.textContent.toLowerCase();
      if (textContent.includes('instagram')) {
        linkEl.classList.add('icon-instagram');
        linkEl.setAttribute('data-social', 'instagram');
      } else if (textContent.includes('facebook')) {
        linkEl.classList.add('icon-facebook'); // Corrected class name
        linkEl.setAttribute('data-social', 'facebook');
      } else if (textContent.includes('twitter')) {
        linkEl.classList.add('icon-twitter');
        linkEl.setAttribute('data-social', 'twitter');
      } else if (textContent.includes('youtube')) {
        linkEl.classList.add('icon-youtube');
        linkEl.setAttribute('data-social', 'youtube');
      }
    }
    moveInstrumentation(row, linkEl);
    socialMediaDiv.append(linkEl);
  });
  bottomContainer.append(socialMediaDiv);

  bottomContent.append(bottomContainer);
  footerDiv.append(bottomContent);

  // Optimization for all images
  footerDiv.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.classList.add('cmp-container'); // Add container class from original HTML
  block.append(footerDiv);
}
