import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const aside = document.createElement('aside');
  aside.classList.add('navigation-root-SSY', 'bg-white', 'bottom-0', 'grid', 'left-0', 'max-w-modal', 'opacity-0', 'overflow-hidden', 'fixed', 'top-0', 'w-full', 'z-menu');

  const header = document.createElement('header');
  header.classList.add('navigation-header-f9t', 'bg-subtle', 'content-center', 'grid', 'grid-flow-col', 'h-[3.5rem]', 'relative', 'shadow-thin', 'z-foreground');

  const closeButton = document.createElement('button');
  closeButton.classList.add('trigger-root-00w', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-hidden', 'false');
  closeButton.setAttribute('aria-label', 'Close');

  const closeImg = document.createElement('img');
  closeImg.alt = 'svg file';
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774863124163.svg+xml'; // This is a static SVG, not dynamic content from block.
  closeButton.append(closeImg);

  const navTitleSpan = document.createElement('span');
  navTitleSpan.classList.add('navHeader-title-jo-', 'capitalize', 'font-normal', 'inline-flex', 'items-center', 'px-2xs', 'py-0', 'text-colorDefault');
  const titleSpanText = document.createElement('span');
  titleSpanText.textContent = 'Main Menu';
  navTitleSpan.append(titleSpanText);

  header.append(closeButton, navTitleSpan);

  const footer = document.createElement('div');
  footer.classList.add('navigation-footer-RBP');

  const switchers = document.createElement('div');
  switchers.classList.add('navigation-switchers-IAR', 'bg-gray-100', 'grid', 'grid-flow-col', 'justify-between', 'w-full', 'sm_hidden');
  footer.append(switchers);

  const authBar = document.createElement('div');
  authBar.classList.add('authBar-root-qo8', 'bg-white', 'gap-3', 'grid', 'grid-flow-col', 'h-[3rem]', 'items-stretch');

  const signInButton = document.createElement('button');
  const signInContents = document.createElement('span');
  signInContents.classList.add('authBar-contents-835', 'grid', 'grid-flow-col', 'items-center', 'justify-items-start', 'px-xs', 'py-0');

  const signInText = document.createElement('span');
  signInText.classList.add('authBar-signIn-q-9', 'linkButton-root-QwB', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'leading-tight', 'max-w-full', 'text-colorDefault', 'text-brand-dark', 'hover_text-colorDefault');
  signInText.textContent = 'Sign In';

  const accountChip = document.createElement('span');
  accountChip.classList.add('accountChip-root-biX', 'grid', 'grid-flow-col', 'items-center');
  const accountChipText = document.createElement('span');
  accountChipText.classList.add('accountChip-text-6Zl');
  const accountChipImg = document.createElement('img');
  accountChipImg.alt = 'svg file';
  accountChipImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774863123650.svg+xml'; // This is a static SVG, not dynamic content from block.
  accountChip.append(accountChipText, accountChipImg);

  signInContents.append(signInText, document.createTextNode('/'), accountChip);
  signInButton.append(signInContents);
  authBar.append(signInButton);
  footer.append(authBar);

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
  const flexContainer = document.createElement('div');
  flexContainer.style.display = 'flex';
  flexContainer.style.justifyContent = 'flex-start';
  flexContainer.style.flexDirection = 'column';

  const htmlRoot = document.createElement('div');
  htmlRoot.classList.add('html-root-Uwa');
  htmlRoot.setAttribute('role', 'presentation');

  const mainMenuUl = document.createElement('ul');
  mainMenuUl.classList.add('mainMenu');

  const menuQuickLinkUl = document.createElement('ul');
  menuQuickLinkUl.classList.add('menu-quick-link');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length > 0) {
      const cell = cells[0]; // Each row has only one cell based on the structure
      const link = cell.querySelector('a');
      if (link) { // This is a menu-quick-link item
        const li = document.createElement('li');
        moveInstrumentation(row, li);
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        // Copy any other attributes if needed, like tabindex, target, rel
        if (link.hasAttribute('tabindex')) newLink.setAttribute('tabindex', link.getAttribute('tabindex'));
        if (link.hasAttribute('target')) newLink.setAttribute('target', link.getAttribute('target'));
        if (link.hasAttribute('rel')) newLink.setAttribute('rel', link.getAttribute('rel'));
        li.append(newLink);
        menuQuickLinkUl.append(li);
      } else { // This is a mainmenu item (richtext content)
        const li = document.createElement('li');
        moveInstrumentation(row, li);
        // Append all content from the cell directly to the li
        while (cell.firstChild) {
          li.append(cell.firstChild);
        }
        mainMenuUl.append(li);
      }
    }
  });

  htmlRoot.append(mainMenuUl, menuQuickLinkUl);
  flexContainer.append(htmlRoot);
  rowContained.append(flexContainer);
  richContent.append(rowContained);

  const styleRichContent = document.createElement('div');
  styleRichContent.classList.add('richContent-root-Byp');
  const styleHtmlRoot = document.createElement('div');
  styleHtmlRoot.classList.add('html-root-Uwa');
  styleHtmlRoot.setAttribute('role', 'presentation');
  const styleEl = document.createElement('style');
  styleEl.textContent = `.header_quick_menu ul { list-style: none; }`;
  styleHtmlRoot.append(styleEl);
  styleRichContent.append(styleHtmlRoot);

  cmsBlockContent.append(richContent, styleRichContent);
  cmsBlock.append(cmsBlockContent);
  categoryTree.append(cmsBlock);
  body.append(categoryTree);

  const navigationModal = document.createElement('div');
  navigationModal.classList.add('navigation-modal-Ed0', 'absolute', 'bg-white', 'bottom-0', 'left-0', 'opacity-0', 'overflow-auto', 'right-0', 'top-lg');

  aside.append(header, footer, body, navigationModal);

  // Image optimization for any images within the aside
  aside.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(aside);

  // Add event listener for close button
  closeButton.addEventListener('click', () => {
    aside.classList.remove('opacity-100');
    aside.classList.add('opacity-0');
  });

  // Add event listeners for submenu toggles (inputs with type="checkbox")
  aside.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const parentLi = event.target.closest('li.isSubmenu');
      if (parentLi) {
        const subMenu = parentLi.querySelector('ul.subMenu');
        if (subMenu) {
          if (event.target.checked) {
            subMenu.style.display = 'block'; // Or toggle a class that sets display: block
          } else {
            subMenu.style.display = 'none'; // Or toggle a class that sets display: none
          }
        }
      }
    });
  });

  // Example for opening the menu (assuming an external trigger exists)
  // document.querySelector('.some-open-button').addEventListener('click', () => {
  //   aside.classList.remove('opacity-0');
  //   aside.classList.add('opacity-100');
  // });
}
