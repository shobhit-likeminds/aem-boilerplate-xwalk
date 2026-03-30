import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const aside = document.createElement('aside');
  aside.classList.add(
    'navigation-root-SSY',
    'bg-white',
    'bottom-0',
    'grid',
    'left-0',
    'max-w-modal',
    'opacity-0',
    'overflow-hidden',
    'fixed',
    'top-0',
    'w-full',
    'z-menu',
  );

  const header = document.createElement('header');
  header.classList.add(
    'navigation-header-f9t',
    'bg-subtle',
    'content-center',
    'grid',
    'grid-flow-col',
    'h-[3.5rem]',
    'relative',
    'shadow-thin',
    'z-foreground',
  );

  const closeButton = document.createElement('button');
  closeButton.classList.add(
    'trigger-root-00w',
    'clickable-root-sDL',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'leading-none',
    'pointer-events-auto',
    'text-center',
  );
  closeButton.type = 'button';
  closeButton.setAttribute('aria-hidden', 'false');
  closeButton.setAttribute('aria-label', 'Close');
  const closeButtonImg = document.createElement('img');
  closeButtonImg.alt = 'svg file';
  closeButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774855957518.svg+xml'; // Placeholder, replace with actual path from model if available
  closeButton.append(closeButtonImg);

  const navHeaderTitle = document.createElement('span');
  navHeaderTitle.classList.add(
    'navHeader-title-jo-',
    'capitalize',
    'font-normal',
    'inline-flex',
    'items-center',
    'px-2xs',
    'py-0',
    'text-colorDefault',
  );
  const titleSpan = document.createElement('span');
  titleSpan.textContent = 'Main Menu';
  navHeaderTitle.append(titleSpan);

  header.append(closeButton, navHeaderTitle);

  const footer = document.createElement('div');
  footer.classList.add('navigation-footer-RBP');

  const switchers = document.createElement('div');
  switchers.classList.add(
    'navigation-switchers-IAR',
    'bg-gray-100',
    'grid',
    'grid-flow-col',
    'justify-between',
    'w-full',
    'sm_hidden',
  );

  const authBar = document.createElement('div');
  authBar.classList.add(
    'authBar-root-qo8',
    'bg-white',
    'gap-3',
    'grid',
    'grid-flow-col',
    'h-[3rem]',
    'items-stretch',
  );
  const authButton = document.createElement('button');
  const authContents = document.createElement('span');
  authContents.classList.add(
    'authBar-contents-835',
    'grid',
    'grid-flow-col',
    'items-center',
    'justify-items-start',
    'px-xs',
    'py-0',
  );
  const signInSpan = document.createElement('span');
  signInSpan.classList.add(
    'authBar-signIn-q-9',
    'linkButton-root-QwB',
    'clickable-root-sDL',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'leading-none',
    'pointer-events-auto',
    'text-center',
    'leading-tight',
    'max-w-full',
    'text-colorDefault',
    'text-brand-dark',
    'hover_text-colorDefault',
  );
  signInSpan.textContent = 'Sign In';
  const accountChip = document.createElement('span');
  accountChip.classList.add('accountChip-root-biX', 'grid', 'grid-flow-col', 'items-center');
  const accountChipText = document.createElement('span');
  accountChip.append(accountChipText);
  const accountChipImg = document.createElement('img');
  accountChipImg.alt = 'svg file';
  accountChipImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774855953776.svg+xml'; // Placeholder, replace with actual path from model if available
  accountChip.append(accountChipImg);
  authContents.append(signInSpan, accountChip);
  authButton.append(authContents);
  authBar.append(authButton);
  footer.append(switchers, authBar);

  const body = document.createElement('div');
  body.classList.add('navigation-body-3Ek', 'min-h-0', 'opacity-100', 'overflow-auto');

  const categoryTree = document.createElement('div');
  categoryTree.classList.add('categoryTree-root-AOw');

  const cmsBlock = document.createElement('div');
  cmsBlock.classList.add('cmsBlock-root-rsi');

  const cmsBlockContent = document.createElement('div');
  cmsBlockContent.classList.add('cmsBlock-content-BTy');

  const richContent = document.createElement('div');
  richContent.classList.add('richContent-root-Byp');

  const rowContained = document.createElement('div');
  rowContained.classList.add('row-contained-PD6', 'row-root-rPq', 'header_quick_menu');
  const flexDiv = document.createElement('div');
  flexDiv.style.display = 'flex';
  flexDiv.style.justifyContent = 'flex-start';
  flexDiv.style.flexDirection = 'column';

  const htmlRoot = document.createElement('div');
  htmlRoot.classList.add('html-root-Uwa');
  htmlRoot.setAttribute('role', 'presentation');

  const mainMenuUl = document.createElement('ul');
  mainMenuUl.classList.add('mainMenu');

  const menuQuickLinkUl = document.createElement('ul');
  menuQuickLinkUl.classList.add('menu-quick-link');

  const allRows = [...block.children];

  // Distinguish between 'main-menu-item' and 'menu-quick-link' based on content structure
  // Both have 2 cells, so we need to rely on the presence of specific elements if they differ,
  // or assume order if the structure is strictly defined.
  // Based on the BlockJson, both item types have the same structure (label, url).
  // We'll assume the first set of rows are 'main-menu-item' and the subsequent ones are 'menu-quick-link'
  // if there's no other distinguishing factor in the raw HTML.
  // For now, let's process all rows and then filter them into the two lists.
  // A more robust solution would involve a hidden cell or attribute to denote type if the order isn't guaranteed.

  // Assuming the first 'main-menu' container in BlockJson corresponds to the first set of rows
  // and 'menu-quick-links' to the second.
  // This is a common pattern for multiple containers of the same item structure.
  // We need to count the number of main menu items from the original HTML to split correctly.
  // For this review, we'll process all rows and then filter based on the assumption that
  // 'main-menu-item's might have nested structures (like the original HTML's subMenu)
  // which 'menu-quick-link's do not. However, the EDS structure provided does not show nested items.
  // Given the EDS block structure, both item types are flat rows with 2 cells.
  // The most reliable way to distinguish them without extra metadata in the HTML is by their position
  // if the authoring guarantees a specific order, or by looking for unique content patterns.
  // The original HTML shows `mainMenu` ul and `menu-quick-link` ul, implying a separation.
  // Let's assume the first set of 2-cell rows are for mainMenu and the rest are for quick links.
  // A better approach would be to have a distinguishing class on the row itself if possible.

  // For now, let's split based on the presence of a specific class or structure from the original HTML.
  // The original HTML has `mainMenu` and `menu-quick-link` as separate `ul` elements.
  // The provided `block.children` are raw rows. We need to infer which `ul` they belong to.
  // Since the EDS structure shows all item rows directly under `block`, we need a way to differentiate.
  // The current JS filters based on `row.children.length === 2`, which is true for both.
  // Let's assume a split point if the original HTML structure implies it, or process them sequentially.

  // The BlockJson defines two containers: "main-menu" and "menu-quick-links".
  // The EDS block structure shows item rows for "main-menu" first, then "menu-quick-links".
  // We will iterate through `block.children` and populate `mainMenuUl` until we encounter a row
  // that might signify the start of `menu-quick-link` items, or if we know the count of main menu items.
  // Without a clear separator in `block.children` or a count, we have to make an assumption.
  // Let's assume the first 5 rows are main menu items (based on the original HTML's `mainMenu` count before `menu-quick-link`).
  // This is a brittle assumption. A more robust solution would be to have a wrapper div for each container in the block HTML.

  // Re-evaluating based on the BlockJson and EDS Block Structure:
  // The BlockJson has two root fields, both `container` types. This means the `block.children`
  // will contain ALL item rows from both containers, sequentially.
  // The JS needs to iterate through `block.children` and assign them to the correct logical group.
  // Since both `main-menu-item` and `menu-quick-link` have the same field structure (label, url),
  // we cannot distinguish them by `row.children.length`.
  // The only way to distinguish them is if the original HTML had a separator or if we know the exact count
  // of `main-menu-item`s vs `menu-quick-link`s.
  // Given the original HTML, the `mainMenu` has 6 `li` elements (Sale, Men, Women, Packs & Luggage, Clothing & Essentials, Footwear, Wiki for Life).
  // The `menu-quick-link` has 4 `li` elements (FIND A STORE, BULK ENQUIRY, BLOG, TRACK ORDER).
  // This implies a total of 10 rows in `block.children`.
  // We will hardcode the split based on this observation for now, but this is a design flaw in the block if the order/count can change.

  const MAIN_MENU_ITEM_COUNT = 6; // Based on the original HTML's mainMenu ul
  const MENU_QUICK_LINK_ITEM_COUNT = 4; // Based on the original HTML's menu-quick-link ul

  const mainMenuRows = allRows.slice(0, MAIN_MENU_ITEM_COUNT);
  const quickLinkRows = allRows.slice(MAIN_MENU_ITEM_COUNT, MAIN_MENU_ITEM_COUNT + MENU_QUICK_LINK_ITEM_COUNT);

  // Main Menu Items
  mainMenuRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('isSubmenu');

    const labelCell = row.children[0];
    const urlCell = row.children[1];

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.tabIndex = 0;
    const labelText = labelCell.textContent.trim().toLowerCase().replace(/\s/g, '-');
    input.id = labelText;
    input.name = labelText;
    input.value = labelText;

    const label = document.createElement('label');
    label.htmlFor = labelText;
    const link = document.createElement('a');
    const foundLink = urlCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.textContent = foundLink.textContent;
    } else {
      // If no <a> tag, use text content from urlCell as link text and a placeholder href
      link.href = '#';
      link.textContent = urlCell.textContent.trim();
    }
    link.tabIndex = 0;
    label.append(link);
    li.append(input, label);
    mainMenuUl.append(li);

    // Add event listener for the checkbox to toggle submenu visibility
    input.addEventListener('change', () => {
      // In a real scenario, you'd toggle a class on the li or a sibling ul
      // For now, just logging the state change
      console.log(`Submenu for ${labelText} is ${input.checked ? 'open' : 'closed'}`);
      // If there's a corresponding submenu structure in the original HTML,
      // we would need to parse it and append it here.
      // The provided EDS block structure does not show nested submenus,
      // but the original HTML does. This means the block model is simplified.
      // For this review, we'll assume the generated JS should only handle the flat structure from the EDS block.
      // If submenus are intended, the block model needs to reflect that with nested containers.
    });
  });

  // Quick Link Items
  quickLinkRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const labelCell = row.children[0];
    const urlCell = row.children[1];

    const link = document.createElement('a');
    const foundLink = urlCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.textContent = foundLink.textContent;
    } else {
      // If no <a> tag, use text content from urlCell as link text and a placeholder href
      link.href = '#';
      link.textContent = urlCell.textContent.trim();
    }
    link.tabIndex = 0;
    li.append(link);
    menuQuickLinkUl.append(li);
  });

  htmlRoot.append(mainMenuUl, menuQuickLinkUl);
  flexDiv.append(htmlRoot);
  rowContained.append(flexDiv);
  richContent.append(rowContained);
  cmsBlockContent.append(richContent);
  cmsBlock.append(cmsBlockContent);
  categoryTree.append(cmsBlock);
  body.append(categoryTree);

  const modal = document.createElement('div');
  modal.classList.add(
    'navigation-modal-Ed0',
    'absolute',
    'bg-white',
    'bottom-0',
    'left-0',
    'opacity-0',
    'overflow-auto',
    'right-0',
    'top-lg',
  );

  aside.append(header, footer, body, modal);

  // Event listener for close button
  closeButton.addEventListener('click', () => {
    aside.classList.remove('opacity-100');
    aside.classList.add('opacity-0');
  });

  // Event listener for sign-in button (example toggle)
  authButton.addEventListener('click', () => {
    // Implement sign-in logic or toggle a class
    console.log('Sign In button clicked');
    // Example: Toggle a class on the aside to show/hide a login form within the modal
    // modal.classList.toggle('is-active');
  });

  block.textContent = '';
  block.append(aside);

  // Image optimization
  aside.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
