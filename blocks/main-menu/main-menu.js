import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  block.classList.add('cl-effect-5');

  // The BlockJson indicates a single 'menu-items' container field,
  // which means each direct child of 'block' is a 'menu-item' row.
  // Each 'menu-item' row has 3 cells: 'label', 'link', 'submenu-items'.
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('position-static', 'dropdown');

    // Use content detection instead of index access for robustness
    const cells = [...row.children];
    const labelCell = cells[0]; // Assuming label is always the first cell
    const linkCell = cells[1];   // Assuming link is always the second cell
    const submenuCell = cells[2]; // Assuming submenu is always the third cell

    const foundLink = linkCell.querySelector('a');
    const anchor = document.createElement('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.innerHTML = `<abbr><span data-hover="${labelCell.textContent.trim()}">${labelCell.textContent.trim()}</span></abbr>`;
    moveInstrumentation(labelCell, anchor.querySelector('span'));
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);

    // Check if the submenuCell contains actual content (e.g., more than just whitespace)
    // The original HTML shows complex submenu structures, which implies the 'submenu-items'
    // cell in the EDS structure would contain the raw HTML for the submenu.
    // If the submenu-items cell is empty, it means no submenu.
    if (submenuCell && submenuCell.textContent.trim()) {
      const megamenu = document.createElement('div');
      megamenu.classList.add('megamenu');

      // The submenuCell contains the raw HTML for the megamenu structure.
      // We should append its content directly, rather than recreating it with hardcoded values.
      // This assumes the author provides the full submenu HTML in the 'submenu-items' cell.
      // If the submenu is also structured via EDS, this part would need to recursively
      // decorate the submenu content based on its own model.
      // For now, we'll assume the submenuCell contains the pre-rendered HTML.
      megamenu.innerHTML = submenuCell.innerHTML;

      // Move instrumentation from the submenuCell to the megamenu div
      moveInstrumentation(submenuCell, megamenu);

      li.append(megamenu);

      // Add event listener for dropdown behavior
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active'); // Use 'active' or 'show' for dropdown open state
        megamenu.classList.toggle('active');
      });

      // Find the menu-closed button within the dynamically added megamenu content
      const menuClosed = megamenu.querySelector('.menu-closed');
      if (menuClosed) {
        menuClosed.addEventListener('click', () => {
          li.classList.remove('active');
          megamenu.classList.remove('active');
        });
      }
    }

    ul.append(li);
  });

  // Append mobile menu toggler (desktop-mobile_nav is a bit confusing, but keeping original class names)
  const mobileNavIconLi = document.createElement('li');
  mobileNavIconLi.classList.add('no_sticky');
  const mobileNavIconAnchor = document.createElement('a');
  mobileNavIconAnchor.href = 'javascript:void(0);';
  mobileNavIconAnchor.classList.add('mobile_nav_icon', 'desktop-mobile_nav');
  const mobileMenuImg = document.createElement('img');
  mobileMenuImg.src = 'https://www.parleproducts.com/content/dam/aemigrate/uploaded-folder/image/mobile-menu.webp';
  mobileMenuImg.classList.add('img-fluid');
  mobileMenuImg.alt = 'Menu';
  const optimizedMobileMenuPic = createOptimizedPicture(mobileMenuImg.src, mobileMenuImg.alt, false, [{ width: '750' }]);
  moveInstrumentation(mobileMenuImg, optimizedMobileMenuPic.querySelector('img'));
  mobileNavIconAnchor.append(optimizedMobileMenuPic);
  mobileNavIconLi.append(mobileNavIconAnchor);
  ul.append(mobileNavIconLi);

  const stickyMobileNavIconLi = document.createElement('li');
  stickyMobileNavIconLi.classList.add('sticky');
  const stickyMobileNavIconAnchor = document.createElement('a');
  stickyMobileNavIconAnchor.href = 'javascript:void(0);';
  stickyMobileNavIconAnchor.classList.add('mobile_nav_icon', 'desktop-mobile_nav');
  const stickyMobileMenuImg = document.createElement('img');
  stickyMobileMenuImg.src = 'https://www.parleproducts.com/content/dam/aemigrate/uploaded-folder/image/menu-black.webp';
  stickyMobileMenuImg.classList.add('img-fluid');
  stickyMobileMenuImg.alt = 'Menu';
  const optimizedStickyMobileMenuPic = createOptimizedPicture(stickyMobileMenuImg.src, stickyMobileMenuImg.alt, false, [{ width: '750' }]);
  moveInstrumentation(stickyMobileMenuImg, optimizedStickyMobileMenuPic.querySelector('img'));
  stickyMobileNavIconAnchor.append(optimizedStickyMobileMenuPic);
  stickyMobileNavIconLi.append(stickyMobileNavIconAnchor);
  ul.append(stickyMobileNavIconLi);

  // Add event listeners for mobile menu toggles
  const allMobileNavIcons = ul.querySelectorAll('.mobile_nav_icon');
  allMobileNavIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      e.preventDefault();
      // Assuming there's a global mobile menu container or a class on the body/html
      // that controls the mobile menu visibility.
      // For this example, let's assume it toggles a class on the 'main-menu' block itself
      // or a parent element. If there's a specific mobile menu overlay, it should be targeted.
      block.classList.toggle('mobile-menu-active'); // Invented class for demonstration
      document.body.classList.toggle('no-scroll'); // Prevent body scroll when mobile menu is open
    });
  });

  block.textContent = '';
  block.append(ul);
}
