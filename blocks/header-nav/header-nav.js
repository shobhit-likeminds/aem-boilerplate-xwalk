import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const [logoImageRow, logoLinkRow, logoLabelRow, ...navigationRows] = children;

  const header = document.createElement('header');
  const nav = document.createElement('nav');
  const container = document.createElement('div');
  container.classList.add('container', 'd-flex', 'align-items-center', 'justify-content-between');

  // Logo Section
  const logoWrapper = document.createElement('div');
  const logoAnchor = document.createElement('a');
  logoAnchor.classList.add('logo', 'd-flex', 'align-items-center', 'gap-2');

  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    logoAnchor.href = logoLink.href;
    moveInstrumentation(logoLinkRow, logoAnchor); // Move instrumentation from logoLinkRow to logoAnchor
  } else {
    logoAnchor.href = '/'; // Fallback
  }

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoImageRow, optimizedPic.querySelector('img')); // Move instrumentation from logoImageRow to the img inside optimizedPic
    logoAnchor.append(optimizedPic);
  }

  const logoLabel = document.createElement('h4');
  logoLabel.textContent = logoLabelRow.textContent.trim();
  moveInstrumentation(logoLabelRow, logoLabel); // Move instrumentation from logoLabelRow to logoLabel
  logoAnchor.append(logoLabel);
  logoWrapper.append(logoAnchor);
  container.append(logoWrapper);

  // Navigation List
  const navList = document.createElement('div');
  navList.classList.add('nav-list');

  navigationRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Correct: Array destructuring for fixed schema
    const navItem = document.createElement('a');
    navItem.classList.add('navitems');

    const link = linkCell.querySelector('a');
    if (link) {
      navItem.href = link.href;
    } else {
      navItem.href = '#'; // Fallback
    }
    navItem.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, navItem); // Move instrumentation from the navigation item row to navItem
    navList.append(navItem);
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

  // Simple toggle behavior for demonstration (EDS does not load Bootstrap JS)
  toggler.addEventListener('click', () => {
    navList.classList.toggle('show'); // Use a class to show/hide the nav-list
  });
  container.append(toggler);

  nav.append(container);
  header.append(nav);

  block.replaceChildren(header);
}
