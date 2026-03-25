import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson: logo-heading, logo-subtitle, nav-items (container)
  // The nav-items container itself is block.children[2], and its children are the actual nav-item rows.
  const [logoHeadingRow, logoSubtitleRow, navItemsContainer, ...navItemRows] = [...block.children];

  // Create the main section wrapper
  const section = document.createElement('section');
  section.id = 'header';
  section.classList.add('wrapper'); // Class from ORIGINAL HTML

  // Create Logo div
  const logoDiv = document.createElement('div');
  logoDiv.id = 'logo';
  section.append(logoDiv);

  // Logo Heading
  const h1 = document.createElement('h1');
  moveInstrumentation(logoHeadingRow, h1);
  const logoLink = document.createElement('a');
  // Assuming the logo link should go to index.html based on original HTML
  // If the model had a dedicated logo link field, we would use that.
  logoLink.href = '/'; // Default to homepage
  // The logoHeadingRow contains a div, which contains the text. We need to get the text content.
  logoLink.textContent = logoHeadingRow.firstElementChild?.textContent || '';
  h1.append(logoLink);
  logoDiv.append(h1);

  // Logo Subtitle
  const p = document.createElement('p');
  moveInstrumentation(logoSubtitleRow, p);
  // The logoSubtitleRow contains a div, which contains the text. We need to get the text content.
  p.textContent = logoSubtitleRow.firstElementChild?.textContent || '';
  logoDiv.append(p);

  // Create Nav
  const nav = document.createElement('nav');
  nav.id = 'nav';
  section.append(nav);

  const ul = document.createElement('ul');
  nav.append(ul);

  // Move instrumentation from the navItemsContainer row to the ul for the nav items
  // The navItemsContainer itself is just a placeholder for the "Navigation Items" field.
  // Its content is not directly used, but its instrumentation might be relevant for the ul.
  moveInstrumentation(navItemsContainer, ul);
  navItemsContainer.remove(); // Remove the now empty container row

  navItemRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.style.whiteSpace = 'nowrap'; // Apply inline style from original HTML

    // For 'nav-item' sub-component, BlockJson defines two fields: 'label' and 'link'.
    // These correspond to row.children[0] and row.children[1] respectively.
    const [labelCell, linkCell] = [...row.children];

    const linkElement = linkCell.querySelector('a'); // Check if the link cell actually contains an <a> tag
    if (linkElement) {
      const newLink = document.createElement('a');
      newLink.href = linkElement.href;
      moveInstrumentation(linkCell, newLink);
      newLink.textContent = labelCell.textContent; // Use label cell content for link text
      li.append(newLink);

      // Check for dropdown interactivity based on ORIGINAL HTML
      if (linkElement.closest('li')?.classList.contains('opener')) {
        li.classList.add('opener'); // Add 'opener' class
        li.style.userSelect = 'none';
        li.style.cursor = 'pointer';

        // Find the nested ul for the dropdown
        const dropdownUl = linkElement.closest('li').querySelector('ul.dropotron');
        if (dropdownUl) {
          const newDropdownUl = document.createElement('ul');
          newDropdownUl.classList.add('dropotron');
          // Copy level classes if they exist in the original HTML
          if (dropdownUl.classList.contains('level-0')) newDropdownUl.classList.add('level-0');
          if (dropdownUl.classList.contains('level-1')) newDropdownUl.classList.add('level-1');
          newDropdownUl.style.userSelect = 'none';
          newDropdownUl.style.display = 'none'; // Initially hidden
          newDropdownUl.style.position = 'absolute';
          newDropdownUl.style.zIndex = dropdownUl.style.zIndex; // Copy z-index

          // Populate dropdown items (this part would need more sophisticated parsing if the model supported nested items)
          // For now, we'll just add a placeholder or assume simple links.
          // Since the BlockJson doesn't define nested nav items, we'll just create a dummy structure
          // to demonstrate the event listener. In a real scenario, the model would need to support this.
          // For this review, we'll assume the `navItemRows` only contain top-level items.
          // If the model were to support nested dropdowns, the `navItemRows` would need to be parsed recursively.
          // Given the current BlockJson, we cannot generate nested dropdowns from the block.children.
          // The original HTML's dropdown structure is not reflected in the BlockJson.
          // Therefore, we can only add the 'opener' class and the event listener for the top-level 'opener'.

          li.append(newDropdownUl); // Append the (currently empty) dropdown UL

          // Add event listener for dropdown toggle
          li.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent document click from closing immediately
            const targetUl = li.querySelector('ul.dropotron');
            if (targetUl) {
              targetUl.style.display = targetUl.style.display === 'block' ? 'none' : 'block';
            }
          });
        }
      }
    } else {
      // Fallback if no link in cell, just append label content
      moveInstrumentation(labelCell, li);
      li.textContent = labelCell.textContent;
    }
    ul.append(li);
  });

  // Add event listener to close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('#nav .dropotron').forEach((dropdown) => {
      dropdown.style.display = 'none';
    });
  });

  block.textContent = '';
  block.append(section);
}
