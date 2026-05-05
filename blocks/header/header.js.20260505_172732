import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const headerEl = document.createElement('header');
  const navEl = document.createElement('nav');
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'd-flex', 'align-items-center', 'justify-content-between');

  // Logo section
  const logoWrapperDiv = document.createElement('div');
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo', 'd-flex', 'align-items-center', 'gap-2');
  logoLink.href = '/'; // Default to home

  const [logoRow, logoLinkRow, logoLabelRow, ...navigationItemRows] = children;

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }

  const logoLinkHref = logoLinkRow.querySelector('a')?.href;
  if (logoLinkHref) {
    logoLink.href = logoLinkHref;
  }

  const logoLabel = logoLabelRow.textContent.trim();
  if (logoLabel) {
    const h4 = document.createElement('h4');
    h4.textContent = logoLabel;
    logoLink.append(h4);
  }

  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
  moveInstrumentation(logoLabelRow, logoLink);

  logoWrapperDiv.append(logoLink);
  containerDiv.append(logoWrapperDiv);

  // Navigation List
  const navListDiv = document.createElement('div');
  navListDiv.classList.add('nav-list');

  navigationItemRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const navItemLink = document.createElement('a');
    navItemLink.classList.add('navitems');

    const linkHref = linkCell.querySelector('a')?.href;
    if (linkHref) {
      navItemLink.href = linkHref;
    }

    const labelText = labelCell.textContent.trim();
    if (labelText) {
      navItemLink.textContent = labelText;
    }

    moveInstrumentation(row, navItemLink);
    navListDiv.append(navItemLink);
  });
  containerDiv.append(navListDiv);

  // Navbar Toggler
  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('navbar-toggler');
  navbarToggler.type = 'button';
  navbarToggler.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
    </svg>
  `;

  navbarToggler.addEventListener('click', () => {
    // Implement toggle behavior for the nav-list, assuming it needs to be shown/hidden
    // This is a basic example; actual behavior depends on CSS/design.
    navListDiv.classList.toggle('show');
    navbarToggler.classList.toggle('collapsed'); // Add/remove a class for styling the toggler itself
  });
  containerDiv.append(navbarToggler);

  navEl.append(containerDiv);
  headerEl.append(navEl);

  block.replaceChildren(headerEl);
}
