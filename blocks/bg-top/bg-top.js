import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...menuLinkRows] = [...block.children];

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  const colDiv = document.createElement('div');
  colDiv.classList.add('col-md-12');

  const topMenuDiv = document.createElement('div');
  topMenuDiv.classList.add('top_menu');

  // Process logo
  const logoCell = logoRow.firstElementChild;
  const logoLink = logoCell.querySelector('a') || document.createElement('a');
  moveInstrumentation(logoRow, logoLink);
  logoLink.classList.add('mobile-logo', 'mr-auto');
  logoLink.href = logoLink.href || '/index.aspx'; // Default href if not present

  const logoPicture = logoCell.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const newLogoImg = document.createElement('img');
      newLogoImg.src = logoImg.src;
      newLogoImg.alt = logoImg.alt;
      newLogoImg.classList.add('img-fluid');
      moveInstrumentation(logoImg, newLogoImg);
      logoLink.append(newLogoImg);
    }
  } else {
    // If no picture, just append the content of the cell
    while (logoCell.firstChild) logoLink.append(logoCell.firstChild);
  }
  topMenuDiv.append(logoLink);

  // Process menu links
  const ul = document.createElement('ul');
  menuLinkRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Each menu-link row has two cells: link and icon.
    // The original HTML shows two <a> tags within one <li> for the menu icons.
    // We need to handle this by creating two links if both cells are present.
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const iconCell = cells.find(cell => cell.querySelector('picture'));

    if (linkCell) {
      const link = linkCell.querySelector('a');
      const newLink = document.createElement('a');
      newLink.href = link.href;
      moveInstrumentation(link, newLink);

      // Check for specific menu icon types based on the original HTML structure
      const picture = iconCell?.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const newImg = document.createElement('img');
          newImg.src = img.src;
          newImg.alt = img.alt;
          newImg.classList.add('img-fluid');
          moveInstrumentation(img, newImg);
          newLink.append(newImg);

          if (img.alt.toLowerCase().includes('menu')) {
            // This assumes the first menu icon link is 'desktop-mobile_nav'
            newLink.classList.add('mobile_nav_icon', 'desktop-mobile_nav');
          } else if (img.alt.toLowerCase().includes('search')) {
            // If there were search icons, they would get these classes
            // newLink.classList.add('open-search', 'desktop-search');
          }
        }
      } else {
        // If no picture, just append the link content
        while (link.firstChild) newLink.append(link.firstChild);
      }
      li.append(newLink);
    }

    // Handle the second menu icon link if it exists in a separate cell or implied
    // Based on the original HTML, the second menu icon is a separate <a> tag within the same <li>
    // The current block structure implies one link and one icon per row.
    // If the original HTML has two <a> tags in one <li>, and the block structure
    // provides them as separate rows, we need to adjust.
    // The current JS processes each 'menuLinkRow' as a separate <li>.
    // The original HTML shows ONE <li> with TWO <a> tags for menu icons.
    // This means the block structure should ideally provide two 'menu-link' items
    // that both contribute to the *same* <li>, or the JS needs to aggregate.
    // Given the current block structure, each menuLinkRow creates a new <li>.
    // Let's assume the block structure is meant to create one <li> per row,
    // and if there are two menu icons, they come from two separate rows, each creating its own <li>.
    // However, the ORIGINAL HTML has:
    // <li>
    //   <a class="desktop-mobile_nav">...</a>
    //   <a class="mobile_nav">...</a>
    // </li>
    // This means the block structure should ideally represent this as ONE item row
    // with multiple links/icons, or the JS needs to combine.
    // The current JS creates a new <li> for each menuLinkRow.
    // Let's re-interpret the menuLinkRows to match the original HTML's single <li>.

    // Re-evaluating the menuLinkRows based on original HTML:
    // The original HTML has one <li> for the two menu icons.
    // The block structure implies each 'menu-link' item is a row.
    // If there are two 'menu-link' rows, the current JS will create two <li> elements.
    // To match the original HTML, we need to consolidate.
    // Let's assume `menuLinkRows` contains all the data for the *single* `<ul>`'s `<li>`s.
    // If there's only one `<li>` in the original HTML for menu toggles,
    // then the `menuLinkRows` should be processed to create that single `<li>`.

    // Let's simplify and create a single <li> for all menu icon links,
    // assuming the block provides them as separate rows.
    // This is a common pattern where multiple block rows contribute to one UI element.

    // Instead of `menuLinkRows.forEach((row) => { const li = document.createElement('li'); ... ul.append(li); });`
    // We should create ONE <li> for the menu icons, and process all menuLinkRows into it.

    // Let's re-structure this part to match the original HTML's single <li> for menu icons.
    // Assuming menuLinkRows contains all the menu icon definitions.
    // We will create one <li> and append all relevant <a> tags to it.
  });

  // Clear existing ul content and rebuild based on original HTML structure
  ul.innerHTML = ''; // Clear any previously appended <li>s

  if (menuLinkRows.length > 0) {
    const menuIconsLi = document.createElement('li');
    menuLinkRows.forEach((row) => {
      const cells = [...row.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const iconCell = cells.find(cell => cell.querySelector('picture'));

      if (linkCell && iconCell) {
        const link = linkCell.querySelector('a');
        const picture = iconCell.querySelector('picture');

        const newLink = document.createElement('a');
        newLink.href = link.href;
        moveInstrumentation(link, newLink);

        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const newImg = document.createElement('img');
            newImg.src = img.src;
            newImg.alt = img.alt;
            newImg.classList.add('img-fluid');
            moveInstrumentation(img, newImg);
            newLink.append(newImg);

            if (img.alt.toLowerCase().includes('menu')) {
              // Assign classes based on the order or content
              // Assuming the first 'menu' alt is for desktop-mobile_nav, second for mobile_nav
              if (!menuIconsLi.querySelector('.desktop-mobile_nav')) {
                newLink.classList.add('mobile_nav_icon', 'desktop-mobile_nav');
              } else {
                newLink.classList.add('mobile_nav_icon', 'mobile_nav');
              }
            }
          }
        }
        menuIconsLi.append(newLink);
      } else if (iconCell) { // Case where there's only an icon, create a dummy link
        const picture = iconCell.querySelector('picture');
        const newLink = document.createElement('a');
        newLink.href = 'javascript:void(0);'; // Default href for interactive elements
        moveInstrumentation(iconCell, newLink);

        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const newImg = document.createElement('img');
            newImg.src = img.src;
            newImg.alt = img.alt;
            newImg.classList.add('img-fluid');
            moveInstrumentation(img, newImg);
            newLink.append(newImg);

            if (img.alt.toLowerCase().includes('menu')) {
              if (!menuIconsLi.querySelector('.desktop-mobile_nav')) {
                newLink.classList.add('mobile_nav_icon', 'desktop-mobile_nav');
              } else {
                newLink.classList.add('mobile_nav_icon', 'mobile_nav');
              }
            }
          }
        }
        menuIconsLi.append(newLink);
      }
    });
    ul.append(menuIconsLi);
  }

  topMenuDiv.append(ul);

  colDiv.append(topMenuDiv);
  rowDiv.append(colDiv);
  containerDiv.append(rowDiv);

  block.textContent = '';
  block.append(containerDiv);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Add event listeners for interactivity
  const desktopMobileNav = block.querySelector('.desktop-mobile_nav');
  const mobileNav = block.querySelector('.mobile_nav');

  if (desktopMobileNav) {
    desktopMobileNav.addEventListener('click', (e) => {
      e.preventDefault();
      // Assuming there's a mobile menu element elsewhere that needs toggling
      // For now, let's just toggle a class on the body or a parent element
      document.body.classList.toggle('mobile-menu-open');
      // Or toggle a specific menu element if it exists
      // const mobileMenu = document.querySelector('.mobile-menu-overlay');
      // if (mobileMenu) mobileMenu.classList.toggle('active');
    });
  }

  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      e.preventDefault();
      // This might be for a different mobile menu state or a close button
      document.body.classList.toggle('mobile-menu-open');
    });
  }
}
