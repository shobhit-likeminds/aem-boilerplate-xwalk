import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  const headerNav = document.createElement('nav');
  headerNav.classList.add('navbar', 'navbar-expand-lg');
  headerNav.id = 'navbar-main';

  // Logo and Site Name
  const logoLinkFound = logoLinkRow.querySelector('a');
  const logoAnchor = document.createElement('a');
  logoAnchor.href = logoLinkFound ? logoLinkFound.href : '/';
  logoAnchor.title = 'Home';
  logoAnchor.rel = 'home';
  logoAnchor.classList.add('navbar-brand');
  moveInstrumentation(logoLinkRow, logoAnchor);

  const siteLogoDiv = document.createElement('div');
  siteLogoDiv.id = 'site-logo';
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    siteLogoDiv.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('img-fluid', 'd-inline-block', 'align-top');
  }
  logoAnchor.append(siteLogoDiv);

  const siteNameDiv = document.createElement('div');
  siteNameDiv.id = 'site-name';
  const coastalBendDiv = document.createElement('div');
  coastalBendDiv.id = 'coastal-bend';
  coastalBendDiv.textContent = 'Coastal Bend';
  const councilOfGovDiv = document.createElement('div');
  councilOfGovDiv.id = 'council-of-gov';
  councilOfGovDiv.textContent = 'Council of Governments';
  siteNameDiv.append(coastalBendDiv, councilOfGovDiv);
  logoAnchor.append(siteNameDiv);

  headerNav.append(logoAnchor);

  // Navbar Toggler
  const toggler = document.createElement('button');
  toggler.classList.add('navbar-toggler', 'navbar-toggler-right');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'CollapsingNavbar');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('navbar-toggler-icon');
  toggler.append(togglerSpan);
  headerNav.append(toggler);

  // Collapsing Navbar Content
  const collapsingNavbar = document.createElement('div');
  collapsingNavbar.classList.add('collapse', 'navbar-collapse', 'justify-content-end');
  collapsingNavbar.id = 'CollapsingNavbar';
  headerNav.append(collapsingNavbar);

  const navMenu = document.createElement('nav');
  navMenu.classList.add('block', 'block-menu', 'navigation', 'menu--main');
  navMenu.setAttribute('role', 'navigation');
  navMenu.setAttribute('aria-labelledby', 'block-cbcog-main-menu-menu');
  navMenu.id = 'block-cbcog-main-menu';

  const menuHeading = document.createElement('h2');
  menuHeading.classList.add('visually-hidden');
  menuHeading.id = 'block-cbcog-main-menu-menu';
  menuHeading.textContent = 'Main navigation';
  navMenu.append(menuHeading);

  const ul = document.createElement('ul');
  ul.classList.add('clearfix', 'nav', 'navbar-nav');
  ul.id = 'block-cbcog-main-menu';

  navItemRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection instead of index access for nav item cells
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const subLinksCell = cells.find(cell => cell.querySelector('ul')); // Check for sub-list directly

    const li = document.createElement('li');
    li.classList.add('nav-item');
    moveInstrumentation(row, li);

    if (subLinksCell) { // If a sub-list is present, it's a dropdown
      li.classList.add('menu-item--expanded', 'dropdown');
      const spanTrigger = document.createElement('span');
      spanTrigger.classList.add('nav-link', 'dropdown-toggle', 'nav-link-');
      spanTrigger.setAttribute('aria-expanded', 'false');
      spanTrigger.setAttribute('aria-haspopup', 'true');
      spanTrigger.textContent = labelCell?.textContent.trim() || '';
      li.append(spanTrigger);

      const dropdownMenu = document.createElement('ul');
      dropdownMenu.classList.add('dropdown-menu');
      moveInstrumentation(subLinksCell, dropdownMenu);

      [...subLinksCell.querySelector('ul').children].forEach((subLi) => {
        const dropdownItem = document.createElement('li');
        dropdownItem.classList.add('dropdown-item');
        moveInstrumentation(subLi, dropdownItem);

        const subLink = subLi.querySelector('a');
        if (subLink) {
          const newSubLink = document.createElement('a');
          newSubLink.href = subLink.href;
          newSubLink.textContent = subLink.textContent.trim();
          // Generate class name based on the original HTML pattern
          const pathSegment = subLink.href.split('/').pop();
          if (pathSegment) {
            newSubLink.classList.add(`nav-link--${pathSegment}`);
          }
          dropdownItem.append(newSubLink);
        } else {
          // If it's just text in the sub-list item, append it directly
          dropdownItem.innerHTML = subLi.innerHTML;
        }
        dropdownMenu.append(dropdownItem);
      });
      li.append(dropdownMenu);

      spanTrigger.addEventListener('click', () => {
        spanTrigger.classList.toggle('show');
        dropdownMenu.classList.toggle('show');
        spanTrigger.setAttribute('aria-expanded', spanTrigger.classList.contains('show'));
      });
    } else { // Regular nav item
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
        // Generate class name based on the original HTML pattern
        const pathSegment = foundLink.href.split('/').pop();
        if (pathSegment) {
          anchor.classList.add(`nav-link--${pathSegment}`);
        }
      }
      anchor.textContent = labelCell?.textContent.trim() || '';
      anchor.classList.add('nav-link', 'nav-link--'); // Add classes from original HTML
      li.append(anchor);
    }
    ul.append(li);
  });

  navMenu.append(ul);
  collapsingNavbar.append(navMenu);

  block.textContent = '';
  block.append(headerNav);

  // Implement toggler behavior
  toggler.addEventListener('click', () => {
    collapsingNavbar.classList.toggle('show');
    toggler.classList.toggle('collapsed');
    toggler.setAttribute('aria-expanded', toggler.classList.contains('collapsed') ? 'false' : 'true');
  });
}
