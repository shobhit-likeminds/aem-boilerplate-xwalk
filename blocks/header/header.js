import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // BlockJson has 3 root fields: logo-heading, logo-subtext, nav-items (container)
  // The nav-items container itself is just a placeholder div, the actual items follow it.
  // So we expect 3 root rows for the main block fields, then the rest are nav-item rows.
  const [logoHeadingRow, logoSubtextRow, navItemsPlaceholderRow, ...navItemRows] = [...block.children];

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.id = 'logo';

  const h1 = document.createElement('h1');
  // The logo-heading field is expected to contain a link.
  const logoHeadingLink = logoHeadingRow.querySelector('a') || document.createElement('a');
  // Move instrumentation from the div wrapping the content to the link
  moveInstrumentation(logoHeadingRow.firstElementChild, logoHeadingLink);
  // Move all children from the original div into the new link
  while (logoHeadingRow.firstElementChild.firstChild) {
    logoHeadingLink.append(logoHeadingRow.firstElementChild.firstChild);
  }
  h1.append(logoHeadingLink);
  logoDiv.append(h1);

  const p = document.createElement('p');
  // The logo-subtext field is expected to be plain text.
  moveInstrumentation(logoSubtextRow.firstElementChild, p);
  while (logoSubtextRow.firstElementChild.firstChild) {
    p.append(logoSubtextRow.firstElementChild.firstChild);
  }
  logoDiv.append(p);

  // Nav
  const nav = document.createElement('nav');
  nav.id = 'nav';

  const ul = document.createElement('ul');

  navItemRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.style.whiteSpace = 'nowrap'; // Apply inline style from original HTML

    // According to BlockJson, nav-item has fields: [text, link]
    // So we expect two cells per row: the first for text, the second for the link.
    const [textCell, linkCell] = row.children;

    if (textCell && linkCell) {
      const originalLink = linkCell.querySelector('a');
      const newLink = document.createElement('a');
      if (originalLink) {
        newLink.href = originalLink.href;
      }
      // Move instrumentation from the text cell's wrapper div to the new link
      moveInstrumentation(textCell, newLink);
      // Move all children from the text cell into the new link
      while (textCell.firstChild) {
        newLink.append(textCell.firstChild);
      }
      li.append(newLink);
    } else if (textCell) {
      // Fallback if only text cell is present, wrap in a span or append directly
      // For navigation, it's safer to wrap in an anchor even if href is empty initially
      const newLink = document.createElement('a');
      moveInstrumentation(textCell, newLink);
      while (textCell.firstChild) {
        newLink.append(textCell.firstChild);
      }
      li.append(newLink);
    }
    // Check if the original HTML had a 'current' class for the home link
    if (li.querySelector('a[href="index.html"]')) {
      li.classList.add('current');
    }

    ul.append(li);
  });

  nav.append(ul);

  block.textContent = '';
  block.classList.add('wrapper'); // Add 'wrapper' class from the original section
  block.append(logoDiv, nav);

  // Handle dropdown functionality (assuming 'opener' and 'dropotron' classes indicate dropdowns)
  block.querySelectorAll('li.opener').forEach((openerLi) => {
    const dropdownToggle = openerLi.querySelector('a');
    const dropdownMenu = openerLi.querySelector('ul.dropotron');

    if (dropdownToggle && dropdownMenu) {
      openerLi.style.userSelect = 'none';
      openerLi.style.cursor = 'pointer';
      dropdownMenu.style.userSelect = 'none';
      dropdownMenu.style.display = 'none'; // Initially hidden
      dropdownMenu.style.position = 'absolute';
      // Use z-index values from original HTML
      if (dropdownMenu.classList.contains('level-0')) {
        dropdownMenu.style.zIndex = '1000';
      } else if (dropdownMenu.classList.contains('level-1')) {
        dropdownMenu.style.zIndex = '1001';
      }

      // Ensure all links within dropdowns have display: block for proper click area
      dropdownMenu.querySelectorAll('li > a').forEach(link => {
        link.style.display = 'block';
      });

      dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent propagation to parent li
        dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!openerLi.contains(e.target)) {
          dropdownMenu.style.display = 'none';
        }
      });
    }
  });

  // Optimize images if any were present (though not in this specific block structure)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
