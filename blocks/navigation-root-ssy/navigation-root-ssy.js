import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [menuItemsContainer, quickLinksContainer, ...itemRows] = [...block.children];

  const aside = document.createElement('aside');
  aside.classList.add('navigation-root-SSY', 'bg-white', 'bottom-0', 'grid', 'left-0', 'max-w-modal', 'opacity-0', 'overflow-hidden', 'fixed', 'top-0', 'w-full', 'z-menu');
  moveInstrumentation(block, aside);

  // Header
  const header = document.createElement('header');
  header.classList.add('navigation-header-f9t', 'bg-subtle', 'content-center', 'grid', 'grid-flow-col', 'h-[3.5rem]', 'relative', 'shadow-thin', 'z-foreground');

  const closeButton = document.createElement('button');
  closeButton.classList.add('trigger-root-00w', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center');
  closeButton.type = 'button';
  closeButton.setAttribute('aria-hidden', 'false');
  closeButton.setAttribute('aria-label', 'Close');

  const closeIcon = document.createElement('img');
  closeIcon.alt = 'svg file';
  closeIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774517933353.svg+xml';
  closeButton.append(closeIcon);

  const navTitleSpan = document.createElement('span');
  navTitleSpan.classList.add('navHeader-title-jo-', 'capitalize', 'font-normal', 'inline-flex', 'items-center', 'px-2xs', 'py-0', 'text-colorDefault');
  const mainMenuSpan = document.createElement('span');
  mainMenuSpan.textContent = 'Main Menu';
  navTitleSpan.append(mainMenuSpan);

  header.append(closeButton, navTitleSpan);
  aside.append(header);

  // Footer
  const footer = document.createElement('div');
  footer.classList.add('navigation-footer-RBP');

  const switchersDiv = document.createElement('div');
  switchersDiv.classList.add('navigation-switchers-IAR', 'bg-gray-100', 'grid', 'grid-flow-col', 'justify-between', 'w-full', 'sm_hidden');
  footer.append(switchersDiv);

  const authBarDiv = document.createElement('div');
  authBarDiv.classList.add('authBar-root-qo8', 'bg-white', 'gap-3', 'grid', 'grid-flow-col', 'h-[3rem]', 'items-stretch');

  const signInButton = document.createElement('button');
  const authBarContents = document.createElement('span');
  authBarContents.classList.add('authBar-contents-835', 'grid', 'grid-flow-col', 'items-center', 'justify-items-start', 'px-xs', 'py-0');

  const signInSpan = document.createElement('span');
  signInSpan.classList.add('authBar-signIn-q-9', 'linkButton-root-QwB', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'leading-tight', 'max-w-full', 'text-colorDefault', 'text-brand-dark', 'hover_text-colorDefault');
  signInSpan.textContent = 'Sign In';
  authBarContents.append(signInSpan);

  const slashSpan = document.createElement('span');
  slashSpan.textContent = '/';
  authBarContents.append(slashSpan);

  const accountChip = document.createElement('span');
  accountChip.classList.add('accountChip-root-biX', 'grid', 'grid-flow-col', 'items-center');
  const accountChipText = document.createElement('span');
  accountChipText.classList.add('accountChip-text-6Zl');
  const accountChipImg = document.createElement('img');
  accountChipImg.alt = 'svg file';
  accountChipImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774517932267.svg+xml';
  accountChip.append(accountChipText, accountChipImg);
  authBarContents.append(accountChip);
  signInButton.append(authBarContents);
  authBarDiv.append(signInButton);
  footer.append(authBarDiv);
  aside.append(footer);

  // Body
  const body = document.createElement('div');
  body.classList.add('navigation-body-3Ek', 'min-h-0', 'opacity-100', 'overflow-auto');

  const categoryTree = document.createElement('div');
  categoryTree.classList.add('categoryTree-root-AOw');

  const cmsBlock = document.createElement('div');
  cmsBlock.classList.add('cmsBlock-root-rsi');
  const cmsBlockContent = document.createElement('div');
  cmsBlockContent.classList.add('cmsBlock-content-BTy');
  const richContent1 = document.createElement('div');
  richContent1.classList.add('richContent-root-Byp');

  const rowContained = document.createElement('div');
  rowContained.classList.add('row-contained-PD6', 'row-root-rPq', 'header_quick_menu');
  const flexDiv = document.createElement('div');
  flexDiv.style.display = 'flex';
  flexDiv.style.justifyContent = 'flex-start';
  flexDiv.style.flexDirection = 'column';

  const htmlDiv1 = document.createElement('div');
  htmlDiv1.classList.add('html-root-Uwa');
  htmlDiv1.setAttribute('role', 'presentation');

  const mainMenuUl = document.createElement('ul');
  mainMenuUl.classList.add('mainMenu');

  // Process menu items from block.children[0]
  const menuItems = [...menuItemsContainer.children];
  menuItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('isSubmenu');
    moveInstrumentation(row, li);

    const labelCell = row.children[0];
    const urlCell = row.children[1];

    if (labelCell && urlCell) {
      const input = document.createElement('input');
      const labelText = labelCell.textContent.trim().toLowerCase().replace(/\s/g, '-');
      input.id = labelText;
      input.name = labelText;
      input.type = 'checkbox';
      input.value = labelText;
      input.setAttribute('tabindex', '0');

      const labelEl = document.createElement('label');
      labelEl.setAttribute('for', labelText);

      const link = document.createElement('a');
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.textContent = foundLink.textContent;
      }
      link.setAttribute('tabindex', '0');

      labelEl.append(link);
      li.append(input, labelEl);

      // Check for nested sub-menus in the original HTML structure
      const subMenuUl = row.querySelector('ul.subMenu');
      if (subMenuUl) {
        li.append(subMenuUl);
      }

      // Add event listener for submenu toggling
      labelEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          // If the link itself is clicked, let it navigate
          return;
        }
        input.checked = !input.checked;
      });
    }
    mainMenuUl.append(li);
  });
  htmlDiv1.append(mainMenuUl);

  const quickLinkUl = document.createElement('ul');
  quickLinkUl.classList.add('menu-quick-link');

  // Process quick links from block.children[1]
  const quickLinks = [...quickLinksContainer.children];
  quickLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const labelCell = row.children[0];
    const urlCell = row.children[1];

    if (labelCell && urlCell) {
      const link = document.createElement('a');
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.textContent = foundLink.textContent;
      }
      link.setAttribute('tabindex', '0');
      li.append(link);
    }
    quickLinkUl.append(li);
  });
  htmlDiv1.append(quickLinkUl);

  flexDiv.append(htmlDiv1);
  rowContained.append(flexDiv);
  richContent1.append(rowContained);
  cmsBlockContent.append(richContent1);

  const richContent2 = document.createElement('div');
  richContent2.classList.add('richContent-root-Byp');
  const htmlDiv2 = document.createElement('div');
  htmlDiv2.classList.add('html-root-Uwa');
  htmlDiv2.setAttribute('role', 'presentation');
  const styleEl = document.createElement('style');
  styleEl.textContent = `.header_quick_menu ul { list-style: none; }`;
  htmlDiv2.append(styleEl);
  richContent2.append(htmlDiv2);

  cmsBlockContent.append(richContent2);
  cmsBlock.append(cmsBlockContent);
  categoryTree.append(cmsBlock);
  body.append(categoryTree);
  aside.append(body);

  const navigationModal = document.createElement('div');
  navigationModal.classList.add('navigation-modal-Ed0', 'absolute', 'bg-white', 'bottom-0', 'left-0', 'opacity-0', 'overflow-auto', 'right-0', 'top-lg');
  aside.append(navigationModal);

  closeButton.addEventListener('click', () => {
    aside.classList.remove('opacity-100');
    aside.classList.add('opacity-0');
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
