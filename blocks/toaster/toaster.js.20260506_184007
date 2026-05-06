import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [timerCell, signinMessageCell, signoutMessageCell] = [...block.children];

  // Fix: Read text content directly from the cell, not querySelector('div')
  // Text cells render content directly inside the cell <div>, no inner <div> wrapper.
  const timer = timerCell.textContent.trim() || '2000';
  const signinMessage = signinMessageCell.textContent.trim() || 'You are logged in';
  const signoutMessage = signoutMessageCell.textContent.trim() || 'You are signed out';

  const toaster = document.createElement('section');
  // Fix: Removed 'toaster-signin' from here. The block's outer div already has 'toaster'.
  // The 'toaster-signin' class is a state class, added dynamically by showToaster().
  toaster.classList.add('toaster');
  toaster.setAttribute('data-timer', timer);
  toaster.setAttribute('aria-label', 'Toaster Signin Module');
  // Add data-signin-msg and data-signout-msg from original HTML
  toaster.setAttribute('data-signin-msg', signinMessage);
  toaster.setAttribute('data-signout-msg', signoutMessage);


  const toasterOverlay = document.createElement('div');
  toasterOverlay.classList.add('toaster--overlay', 'js-close-toaster');
  toaster.append(toasterOverlay);

  const toasterContainer = document.createElement('div');
  toasterContainer.classList.add('toaster--container');

  const toasterArrow = document.createElement('svg');
  toasterArrow.classList.add('toaster--arrow');
  toasterArrow.setAttribute('role', 'presentation');
  toasterArrow.setAttribute('width', '16');
  toasterArrow.setAttribute('height', '12');
  toasterArrow.setAttribute('viewBox', '0 0 16 12');
  toasterArrow.setAttribute('fill', 'none');
  toasterArrow.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  toasterArrow.innerHTML = '<path d="M6.26351 1.03885C7.0313 -0.304777 8.9687 -0.304778 9.73649 1.03885L16 12L0 12L6.26351 1.03885Z" fill="white"></path>';
  toasterContainer.append(toasterArrow);

  const toasterContainerInner = document.createElement('div');
  toasterContainerInner.classList.add('toaster--container-inner');

  const toasterMessageWrapper = document.createElement('div');
  toasterMessageWrapper.classList.add('toaster--message-wrapper');

  const toasterUser = document.createElement('div');
  toasterUser.classList.add('toaster--user');
  const toasterUserIcon = document.createElement('svg');
  toasterUserIcon.classList.add('toaster--user--icon');
  toasterUserIcon.setAttribute('width', '18');
  toasterUserIcon.setAttribute('height', '18');
  toasterUserIcon.setAttribute('viewBox', '0 0 18 18');
  toasterUserIcon.setAttribute('fill', 'none');
  toasterUserIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  toasterUserIcon.innerHTML = `
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1917 11.1114C11.1532 11.1405 11.1605 11.2014 11.205 11.2201C11.8441 11.4879 12.4247 11.8804 12.9139 12.3753C13.403 12.8701 13.791 13.4576 14.0557 14.1041C14.1939 14.4417 14.2971 14.7919 14.3642 15.1492C14.4661 15.692 14.009 16.1434 13.4567 16.1434H13.0714C13.0307 16.3379 12.9391 16.5287 12.7986 16.7102C12.6025 16.9637 12.3151 17.1941 11.9527 17.3881C11.5903 17.5821 11.1601 17.736 10.6866 17.841C10.2131 17.946 9.70563 18 9.19314 18C8.68065 18 8.17318 17.946 7.6997 17.841C7.22622 17.736 6.796 17.5821 6.43361 17.3881C6.07123 17.1941 5.78377 16.9637 5.58765 16.7102C5.44722 16.5287 5.35559 16.3379 5.31487 16.1434H4.92181C4.36952 16.1434 3.91241 15.692 4.0143 15.1492C4.08136 14.7919 4.18455 14.4417 4.32277 14.1041C4.58748 13.4576 4.97547 12.8701 5.4646 12.3753C5.95373 11.8804 6.5344 11.4879 7.17348 11.2201C7.21833 11.2013 7.2257 11.1399 7.18689 11.1106C6.36802 10.4923 5.83782 9.5044 5.83782 8.39118C5.83782 6.51828 7.33856 5 9.18982 5C11.0411 5 12.5418 6.51828 12.5418 8.39118C12.5418 9.50488 12.0112 10.4932 11.1917 11.1114Z" fill="#222222"></path>
    <path d="M17.25 9C17.25 4.44365 13.5563 0.75 9 0.75L8.96717 0.750065C8.967 0.750065 8.96683 0.750067 8.96666 0.750067C4.42569 0.767996 0.75 4.45476 0.75 9C0.75 13.5563 4.44365 17.25 9 17.25C13.5563 17.25 17.25 13.5563 17.25 9Z" stroke="#222222" stroke-width="1.5"></path>
  `;
  toasterUser.append(toasterUserIcon);
  toasterMessageWrapper.append(toasterUser);

  const toasterUserMessage = document.createElement('div');
  toasterUserMessage.classList.add('toaster--user-message', 'bodySmallRegular');
  toasterUserMessage.textContent = signoutMessage; // Default to signout message
  toasterMessageWrapper.append(toasterUserMessage);
  toasterContainerInner.append(toasterMessageWrapper);

  const toasterClose = document.createElement('div');
  toasterClose.classList.add('toaster--close');
  const toasterCloseBtn = document.createElement('button');
  toasterCloseBtn.setAttribute('type', 'button');
  toasterCloseBtn.classList.add('icon', 'cross-icon-black', 'toaster--close-btn', 'js-close-toaster');
  toasterCloseBtn.setAttribute('aria-label', 'Close tooltip');
  toasterClose.append(toasterCloseBtn);
  toasterContainerInner.append(toasterClose);

  toasterContainer.append(toasterContainerInner);
  toaster.append(toasterContainer);

  // Add event listeners for toaster functionality
  const closeToaster = () => {
    toaster.classList.remove('toaster-signin', 'toaster-signout');
    toaster.removeAttribute('data-is-loggedin');
  };

  toasterOverlay.addEventListener('click', closeToaster);
  toasterCloseBtn.addEventListener('click', closeToaster);

  // Function to show toaster
  const showToaster = (isLoggedIn) => {
    toaster.classList.remove('toaster-signin', 'toaster-signout'); // Clear previous state
    if (isLoggedIn) {
      toaster.classList.add('toaster-signin');
      toaster.setAttribute('data-is-loggedin', 'true');
      toasterUserMessage.textContent = signinMessage;
    } else {
      toaster.classList.add('toaster-signout');
      toaster.setAttribute('data-is-loggedin', 'false');
      toasterUserMessage.textContent = signoutMessage;
    }
    setTimeout(closeToaster, parseInt(timer, 10));
  };

  // Example usage (can be triggered by other parts of the application)
  // For demonstration, we'll simulate login/logout
  let loggedInState = false;
  toaster.addEventListener('toggle-login-state', () => {
    loggedInState = !loggedInState;
    showToaster(loggedInState);
  });

  // Move instrumentation from original rows to the new toaster element
  moveInstrumentation(timerCell, toaster);
  moveInstrumentation(signinMessageCell, toaster);
  moveInstrumentation(signoutMessageCell, toaster);

  block.replaceChildren(toaster);
}
