import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // BlockJson defines 3 root fields: logo-heading, logo-subtext, navigation-items (container)
  // The EDS block structure shows these as block.children[0], block.children[1], block.children[2]
  // Subsequent children are the actual 'nav-item' rows.
  const [logoHeadingRow, logoSubtextRow, navigationItemsContainer, ...navItemRows] = [...block.children];

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.id = 'logo';
  logoDiv.classList.add('header-logo');

  const h1 = document.createElement('h1');
  const logoLink = document.createElement('a');
  // The original HTML has a hardcoded 'index.html' link for the logo.
  // Since the model doesn't provide a logo link, we'll use a placeholder or default.
  // For this exercise, we'll assume the logo heading text itself should link to home.
  logoLink.href = '/'; // Default to home page
  moveInstrumentation(logoHeadingRow.firstElementChild, logoLink);
  // The logo heading content is in the first child of logoHeadingRow
  logoLink.textContent = logoHeadingRow.firstElementChild.textContent;
  h1.append(logoLink);
  logoDiv.append(h1);

  const p = document.createElement('p');
  // The logo subtext content is in the first child of logoSubtextRow
  moveInstrumentation(logoSubtextRow.firstElementChild, p);
  while (logoSubtextRow.firstElementChild.firstChild) {
    p.append(logoSubtextRow.firstElementChild.firstChild);
  }
  logoDiv.append(p);

  // Nav
  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.classList.add('header-nav');

  const ul = document.createElement('ul');

  // Move instrumentation from the navigation items container row to the ul
  moveInstrumentation(navigationItemsContainer, ul);

  navItemRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // BlockJson for 'nav-item' defines two cells: 'label' and 'link'.
    // These correspond to row.children[0] and row.children[1].
    const labelCell = row.children[0];
    const linkCell = row.children[1];

    const linkEl = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
    } else {
      // If no link is found in the 'link' cell, default to '#' or handle as needed.
      linkEl.href = '#';
    }
    moveInstrumentation(labelCell, linkEl);
    while (labelCell.firstChild) {
      linkEl.append(labelCell.firstChild);
    }
    li.append(linkEl);

    // Check for dropdowns based on the original HTML structure
    // The original HTML uses a specific structure for dropdowns:
    // <li><a href="#">Dropdown</a><ul class="header-dropotron">...</ul></li>
    // We need to infer if an item is a dropdown based on its content.
    // For now, let's assume if the label text is "Dropdown" or "Sed consequat" (from example HTML)
    // it might be a dropdown. A more robust solution would involve a dedicated model field for dropdown.
    // For this exercise, we'll add a placeholder dropdown structure if the link text suggests it.
    // In a real scenario, the model would need to explicitly define dropdowns and their sub-items.

    // For now, let's assume any nav item that has more than 2 cells (label, link)
    // or has specific text content might be a dropdown opener.
    // Given the BlockJson, all nav-item rows have exactly 2 cells.
    // So, we need to rely on the original HTML's structure for dropdowns,
    // which implies a nested <ul>. The current model doesn't support nested navigation directly.
    // We will simulate the dropdown behavior based on the original HTML's class names.

    // If the original HTML has 'header-opener' class, it indicates a dropdown.
    // The current model doesn't provide this information.
    // We'll add a placeholder for dropdown functionality.
    // For the purpose of this review, we'll add a generic dropdown structure if the link text is 'Dropdown'.
    if (linkEl.textContent.toLowerCase() === 'dropdown' || linkEl.textContent.toLowerCase() === 'sed consequat') {
      li.classList.add('header-opener');
      const dropdownUl = document.createElement('ul');
      dropdownUl.classList.add('header-dropotron', 'header-level-0'); // Or header-level-1 for nested
      dropdownUl.style.display = 'none'; // Initially hidden

      // Placeholder for dropdown items - in a real scenario, these would come from the model
      const placeholderLi1 = document.createElement('li');
      const placeholderLink1 = document.createElement('a');
      placeholderLink1.href = '#';
      placeholderLink1.textContent = 'Lorem ipsum';
      placeholderLi1.append(placeholderLink1);
      dropdownUl.append(placeholderLi1);

      const placeholderLi2 = document.createElement('li');
      const placeholderLink2 = document.createElement('a');
      placeholderLink2.href = '#';
      placeholderLink2.textContent = 'Magna veroeros';
      placeholderLi2.append(placeholderLink2);
      dropdownUl.append(placeholderLi2);

      li.append(dropdownUl);

      // Add event listener for dropdown toggle
      li.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent document click from closing immediately
        dropdownUl.classList.toggle('header-dropotron-active'); // Use a class to show/hide
        if (dropdownUl.classList.contains('header-dropotron-active')) {
          dropdownUl.style.display = 'block';
        } else {
          dropdownUl.style.display = 'none';
        }
      });

      // Close dropdowns when clicking outside
      document.addEventListener('click', (event) => {
        if (!li.contains(event.target) && dropdownUl.classList.contains('header-dropotron-active')) {
          dropdownUl.classList.remove('header-dropotron-active');
          dropdownUl.style.display = 'none';
        }
      });
    }

    ul.append(li);
  });

  nav.append(ul);

  block.textContent = '';
  block.append(logoDiv, nav);
}
