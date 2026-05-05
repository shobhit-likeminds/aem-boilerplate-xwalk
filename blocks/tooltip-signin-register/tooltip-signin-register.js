import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    loginLinkRow,
    loginLabelRow,
    registerLinkRow,
    registerLabelRow,
  ] = [...block.children];

  // Create the main container div
  const tooltipSigninRegister = document.createElement('div');
  tooltipSigninRegister.classList.add('tooltip-signin-register', 'bg--white-accent');
  tooltipSigninRegister.id = 'tooltip-signin-register';
  tooltipSigninRegister.setAttribute('role', 'dialog');
  moveInstrumentation(block, tooltipSigninRegister);

  // Create the SVG arrow
  const svgArrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgArrow.setAttribute('role', 'presentation');
  svgArrow.classList.add('tooltip-signin-register--arrow');
  svgArrow.setAttribute('width', '16');
  svgArrow.setAttribute('height', '12');
  svgArrow.setAttribute('viewBox', '0 0 16 12');
  svgArrow.setAttribute('fill', 'none');
  svgArrow.innerHTML = '<path d="M6.26351 1.03885C7.0313 -0.304777 8.9687 -0.304778 9.73649 1.03885L16 12L0 12L6.26351 1.03885Z" fill="#FAFAFA"></path>';
  tooltipSigninRegister.append(svgArrow);

  // Create the inner container
  const container = document.createElement('div');
  container.classList.add('tooltip-signin-register--container');

  // Create the title
  const title = document.createElement('div');
  title.classList.add('labelMediumBold', 'tooltip-signin-register--title');
  moveInstrumentation(titleRow, title);
  // FIX: titleRow is a richtext field, read innerHTML directly from the row, not its child cell.
  title.innerHTML = titleRow.innerHTML;
  container.append(title);

  // Create the close button
  const closeDiv = document.createElement('div');
  closeDiv.classList.add('tooltip-signin-register--close');
  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('icon', 'cross-icon-black', 'tooltip-signin-register--close-btn');
  closeButton.setAttribute('aria-label', 'Close tooltip');
  closeDiv.append(closeButton);
  container.append(closeDiv);

  // Create the CTAs container
  const ctasDiv = document.createElement('div');
  ctasDiv.classList.add('tooltip-signin-register--ctas');

  // Create Login Link
  const loginLink = document.createElement('a');
  loginLink.classList.add('button', 'red', 'tooltip-signin-register--signin');
  const foundLoginLink = loginLinkRow.querySelector('a');
  if (foundLoginLink) {
    loginLink.href = foundLoginLink.href;
  }
  loginLink.setAttribute('aria-label', '');
  loginLink.setAttribute('rel', 'follow');
  const loginSpan = document.createElement('span');
  loginSpan.classList.add('button-text');
  moveInstrumentation(loginLabelRow, loginSpan);
  // FIX: loginLabelRow is a text field, read textContent from its child cell.
  loginSpan.textContent = loginLabelRow.children[0]?.textContent.trim() || '';
  loginLink.append(loginSpan);
  moveInstrumentation(loginLinkRow, loginLink);
  ctasDiv.append(loginLink);

  // Create Register Link
  const registerLink = document.createElement('a');
  registerLink.classList.add('button', 'transparent-black', 'tooltip-signin-register--signup');
  const foundRegisterLink = registerLinkRow.querySelector('a');
  if (foundRegisterLink) {
    registerLink.href = foundRegisterLink.href;
  }
  registerLink.setAttribute('aria-label', '');
  registerLink.setAttribute('rel', 'follow');
  const registerSpan = document.createElement('span');
  registerSpan.classList.add('button-text');
  moveInstrumentation(registerLabelRow, registerSpan);
  // FIX: registerLabelRow is a text field, read textContent from its child cell.
  registerSpan.textContent = registerLabelRow.children[0]?.textContent.trim() || '';
  registerLink.append(registerSpan);
  moveInstrumentation(registerLinkRow, registerLink);
  ctasDiv.append(registerLink);

  container.append(ctasDiv);
  tooltipSigninRegister.append(container);

  block.replaceChildren(tooltipSigninRegister);

  // Add event listener for close button
  closeButton.addEventListener('click', () => {
    tooltipSigninRegister.classList.remove('active');
  });
}
