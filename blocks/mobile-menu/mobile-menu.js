import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const closeButton = document.createElement('a');
  closeButton.href = 'javascript:void(0);';
  closeButton.classList.add('cros-icon');
  const closeIcon = document.createElement('span');
  closeIcon.classList.add('lnr', 'lnr-cross');
  closeButton.append(closeIcon);

  const navList = document.createElement('ul');
  navList.classList.add('navbar-nav');

  [...block.children].forEach((row) => {
    const navItem = document.createElement('li');
    moveInstrumentation(row, navItem);
    navItem.classList.add('nav-item');

    const cells = [...row.children];
    let labelCell;
    let linkCell;
    let submenuItemsCell;

    // Content detection for cells based on BlockJson structure
    // menu-item: label (text), link (aem-content), submenuItems (container)
    labelCell = cells.find(cell => !cell.querySelector('a') && cell.textContent.trim() !== 'Submenu Items value');
    linkCell = cells.find(cell => cell.querySelector('a'));
    submenuItemsCell = cells.find(cell => cell.textContent.trim() === 'Submenu Items value');


    if (labelCell && linkCell) {
      const link = linkCell.querySelector('a');
      const navLink = document.createElement('a');
      if (link) {
        navLink.href = link.href;
        navLink.textContent = labelCell.textContent.trim();
        moveInstrumentation(linkCell, navLink);
      } else {
        navLink.textContent = labelCell.textContent.trim();
      }

      // Check if submenuItemsCell exists and has actual sub-items (children)
      // The EDS structure shows 'Submenu Items value' as a placeholder,
      // but the actual sub-items would be nested within it if present.
      // The original HTML implies that if a submenu exists, the cell will contain
      // a structure, not just the text 'Submenu Items value'.
      // We need to check if the cell contains actual sub-rows, not just the placeholder text.
      const hasSubmenuItems = submenuItemsCell && [...submenuItemsCell.children].some(child => child.tagName === 'DIV' && child.children.length > 0);

      if (hasSubmenuItems) {
        navLink.classList.add('dropdown-toggle', 'nav-item'); // Original HTML uses 'nav-item' here
        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu');
        const subUl = document.createElement('ul');

        // Iterate through the actual sub-rows within the submenuItemsCell
        [...submenuItemsCell.children].forEach((subRow) => {
          const subLi = document.createElement('li');
          moveInstrumentation(subRow, subLi);

          const subCells = [...subRow.children];
          let subLabelCell;
          let subLinkCell;

          // submenu-item: label (text), link (aem-content)
          subLabelCell = subCells.find(subCell => !subCell.querySelector('a'));
          subLinkCell = subCells.find(subCell => subCell.querySelector('a'));

          if (subLabelCell && subLinkCell) {
            const subLink = subLinkCell.querySelector('a');
            const dropdownItem = document.createElement('a');
            dropdownItem.classList.add('dropdown-item');
            if (subLink) {
              dropdownItem.href = subLink.href;
              dropdownItem.textContent = subLabelCell.textContent.trim();
              moveInstrumentation(subLinkCell, dropdownItem);
            } else {
              dropdownItem.textContent = subLabelCell.textContent.trim();
            }
            subLi.append(dropdownItem);
          }
          subUl.append(subLi);
        });
        dropdownMenu.append(subUl);
        navItem.append(navLink, dropdownMenu);

        navLink.addEventListener('click', (e) => {
          e.preventDefault();
          dropdownMenu.classList.toggle('show'); // 'show' class is implied for dropdown visibility
        });
      } else {
        navLink.classList.add('nav-link'); // Corrected: For non-dropdown items, it should be 'nav-link'
        navItem.append(navLink);
      }
    }
    navList.append(navItem);
  });

  block.textContent = '';
  block.append(closeButton, navList);

  // Add event listener for the close button
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    // Assuming the mobile menu itself needs to be hidden/shown
    // The original HTML implies the 'mobile-menu' div is the top-level container
    block.classList.remove('show'); // Or whatever class controls its visibility
  });
}
