import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure the first four rows for header fields, and the rest for nav items.
  const [logoRow, logoLinkRow, logoLinkLabelRow, siteNameRow, ...navItemRows] = [...block.children];

  const navbar = document.createElement('nav');
  navbar.classList.add('navbar', 'navbar-expand-lg');
  navbar.id = 'navbar-main';

  // Logo and Logo Link
  const logoLink = document.createElement('a');
  logoLink.classList.add('navbar-brand');
  moveInstrumentation(logoLinkRow, logoLink);
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '/'; // Fallback to home if no link provided
  }

  const siteLogoDiv = document.createElement('div');
  siteLogoDiv.id = 'site-logo';
  moveInstrumentation(logoRow, siteLogoDiv);
  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      siteLogoDiv.append(optimizedPic);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('img-fluid', 'd-inline-block', 'align-top');
    }
  }
  logoLink.append(siteLogoDiv);

  // Site Name
  const siteNameDiv = document.createElement('div');
  siteNameDiv.id = 'site-name';
  moveInstrumentation(siteNameRow, siteNameDiv);

  const siteNameBrandLink = document.createElement('a');
  siteNameBrandLink.href = logoLink.href;
  siteNameBrandLink.title = 'Home';
  siteNameBrandLink.rel = 'home';
  siteNameBrandLink.classList.add('navbar-brand');

  const coastalBendDiv = document.createElement('div');
  coastalBendDiv.id = 'coastal-bend';
  coastalBendDiv.textContent = siteNameRow.textContent.trim();
  siteNameBrandLink.append(coastalBendDiv);

  const councilOfGovDiv = document.createElement('div');
  councilOfGovDiv.id = 'council-of-gov';
  // "Council of Governments" is a fixed string in the original HTML, not a model field.
  councilOfGovDiv.textContent = 'Council of Governments';
  siteNameBrandLink.append(councilOfGovDiv);

  siteNameDiv.append(siteNameBrandLink);

  navbar.append(logoLink, siteNameDiv);

  // Navbar Toggler
  const toggler = document.createElement('button');
  toggler.classList.add('navbar-toggler', 'navbar-toggler-right');
  toggler.type = 'button';
  // Original HTML uses data-target, but we'll use aria-controls for accessibility and direct JS control
  toggler.setAttribute('aria-controls', 'CollapsingNavbar');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  toggler.append(togglerIcon);
  navbar.append(toggler);

  // Collapsing Navbar
  const collapsingNavbar = document.createElement('div');
  collapsingNavbar.classList.add('collapse', 'navbar-collapse', 'justify-content-end');
  collapsingNavbar.id = 'CollapsingNavbar';

  const navRole = document.createElement('nav');
  navRole.role = 'navigation';
  navRole.setAttribute('aria-labelledby', 'block-cbcog-main-menu-menu');
  navRole.id = 'block-cbcog-main-menu';
  navRole.classList.add('block', 'block-menu', 'navigation', 'menu--main');

  const h2 = document.createElement('h2');
  h2.classList.add('visually-hidden');
  h2.id = 'block-cbcog-main-menu-menu';
  h2.textContent = 'Main navigation';
  navRole.append(h2);

  const ul = document.createElement('ul');
  ul.id = 'block-cbcog-main-menu';
  ul.classList.add('clearfix', 'nav', 'navbar-nav');

  navItemRows.forEach((row) => {
    // Use content detection instead of index access for nav item cells
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul') && !cell.querySelector('p'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const subLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p')); // Can contain <ul> or <p> for sublinks

    const li = document.createElement('li');
    li.classList.add('nav-item');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('menu-item--expanded', 'dropdown');
      const span = document.createElement('span');
      span.classList.add('nav-link', 'dropdown-toggle', 'nav-link-'); // 'nav-link-' is from original HTML
      span.setAttribute('aria-expanded', 'false');
      span.setAttribute('aria-haspopup', 'true');
      span.textContent = labelCell?.textContent.trim() || '';
      li.append(span);

      const dropdownMenu = document.createElement('ul');
      dropdownMenu.classList.add('dropdown-menu');
      moveInstrumentation(subLinksCell, dropdownMenu);
      // Move all children from subLinksCell to dropdownMenu
      while (subLinksCell.firstChild) {
        dropdownMenu.append(subLinksCell.firstChild);
      }

      // Transform nested <ul> into dropdown-item structure
      [...dropdownMenu.children].forEach((subLi) => {
        subLi.classList.add('dropdown-item');
        // Check if the subLi contains a nested ul, if so, it's a menu-item--collapsed
        if (subLi.querySelector('ul')) {
          subLi.classList.add('menu-item--collapsed');
        }
      });

      li.append(dropdownMenu);

      // Event listener for dropdown toggle
      span.addEventListener('click', () => {
        span.classList.toggle('show');
        dropdownMenu.classList.toggle('show');
        span.setAttribute('aria-expanded', span.classList.contains('show'));
      });
    } else {
      const a = document.createElement('a');
      // The original HTML has specific nav-link-- classes, but the model doesn't provide them.
      // We'll use the generic 'nav-link' and 'nav-link--' as seen in the original HTML.
      a.classList.add('nav-link', 'nav-link--');
      moveInstrumentation(linkCell, a);
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        a.href = foundLink.href;
      }
      // Use labelCell for text content if linkLabelCell is not present or empty
      a.textContent = (labelCell?.textContent || '').trim();
      li.append(a);
    }
    ul.append(li);
  });

  navRole.append(ul);
  collapsingNavbar.append(navRole);
  navbar.append(collapsingNavbar);

  // Event listener for navbar toggler
  toggler.addEventListener('click', () => {
    collapsingNavbar.classList.toggle('show');
    toggler.classList.toggle('collapsed'); // Add/remove 'collapsed' class for styling if needed
    toggler.setAttribute('aria-expanded', toggler.classList.contains('show') ? 'true' : 'false');
  });

  block.textContent = '';
  block.append(navbar);
}
