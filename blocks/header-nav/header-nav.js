import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];

  const header = document.createElement('header');
  const nav = document.createElement('nav');
  const container = document.createElement('div');
  container.classList.add('container', 'd-flex', 'align-items-center', 'justify-content-between');

  // Logo Section
  const logoWrapper = document.createElement('div');
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo', 'd-flex', 'align-items-center', 'gap-2');
  logoLink.href = '#'; // Default href

  // The first three rows are for logoImage, logoText, logoLink based on BlockJson model
  const [logoImageRow, logoTextRow, logoLinkRow, ...navigationItemRows] = allRows;

  if (logoImageRow) {
    const picture = logoImageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img')); // Move instrumentation from original img to new img
        logoLink.append(optimizedPic);
      }
    }
  }

  if (logoTextRow) {
    const h4 = document.createElement('h4');
    h4.textContent = logoTextRow.textContent.trim();
    logoLink.append(h4);
  }

  if (logoLinkRow) {
    const anchor = logoLinkRow.querySelector('a');
    if (anchor) {
      logoLink.href = anchor.href;
    }
  }

  // Move instrumentation from the original logo rows to the new logoLink element
  // We need to move instrumentation from each original row that contributed to the logoLink
  if (logoImageRow) moveInstrumentation(logoImageRow, logoLink);
  if (logoTextRow) moveInstrumentation(logoTextRow, logoLink);
  if (logoLinkRow) moveInstrumentation(logoLinkRow, logoLink);

  logoWrapper.append(logoLink);
  container.append(logoWrapper);

  // Navigation Menu
  const navList = document.createElement('div');
  navList.classList.add('nav-list');

  navigationItemRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Fixed schema for navigation-item
    const navItemLink = document.createElement('a');
    navItemLink.classList.add('navitems');
    navItemLink.textContent = labelCell?.textContent.trim() || '';

    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      navItemLink.href = foundLink.href;
    }

    moveInstrumentation(row, navItemLink); // Move instrumentation from original row to new navItemLink
    navList.append(navItemLink);
  });
  container.append(navList);

  // Navbar Toggler
  const toggler = document.createElement('button');
  toggler.classList.add('navbar-toggler');
  toggler.type = 'button';
  toggler.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
    </svg>
  `;

  toggler.addEventListener('click', () => {
    navList.classList.toggle('show'); // Assuming 'show' class controls visibility
    toggler.classList.toggle('collapsed'); // Assuming 'collapsed' class changes icon/state
  });
  container.append(toggler);

  nav.append(container);
  header.append(nav);

  // Replace block content with the new structure
  block.replaceChildren(header);
}
