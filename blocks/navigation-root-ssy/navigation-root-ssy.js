import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [mainMenuConfig, quickLinkConfig, ...itemRows] = [...block.children];

  // Create the main navigation container
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
  const closeImg = document.createElement('img');
  closeImg.alt = 'svg file';
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774510729937.svg+xml'; // Placeholder image
  closeButton.append(closeImg);

  const navHeaderTitle = document.createElement('span');
  navHeaderTitle.classList.add('navHeader-title-jo-', 'capitalize', 'font-normal', 'inline-flex', 'items-center', 'px-2xs', 'py-0', 'text-colorDefault');
  const titleSpan = document.createElement('span');
  // Corrected: Read text content from the first child element of mainMenuConfig
  titleSpan.textContent = mainMenuConfig.firstElementChild.textContent.trim();
  navHeaderTitle.append(titleSpan);

  header.append(closeButton, navHeaderTitle);

  // Footer
  const footer = document.createElement('div');
  footer.classList.add('navigation-footer-RBP');

  const switchers = document.createElement('div');
  switchers.classList.add('navigation-switchers-IAR', 'bg-gray-100', 'grid', 'grid-flow-col', 'justify-between', 'w-full', 'sm_hidden');
  footer.append(switchers);

  const authBar = document.createElement('div');
  authBar.classList.add('authBar-root-qo8', 'bg-white', 'gap-3', 'grid', 'grid-flow-col', 'h-[3rem]', 'items-stretch');

  const signInButton = document.createElement('button');
  const authBarContents = document.createElement('span');
  authBarContents.classList.add('authBar-contents-835', 'grid', 'grid-flow-col', 'items-center', 'justify-items-start', 'px-xs', 'py-0');

  const signInSpan = document.createElement('span');
  signInSpan.classList.add('authBar-signIn-q-9', 'linkButton-root-QwB', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'leading-tight', 'max-w-full', 'text-colorDefault', 'text-brand-dark', 'hover_text-colorDefault');
  signInSpan.textContent = 'Sign In';

  const separator = document.createTextNode('/');

  const accountChip = document.createElement('span');
  accountChip.classList.add('accountChip-root-biX', 'grid', 'grid-flow-col', 'items-center');
  const accountChipText = document.createElement('span');
  accountChipText.classList.add('accountChip-text-6Zl');
  const accountChipImg = document.createElement('img');
  accountChipImg.alt = 'svg file';
  accountChipImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774510726116.svg+xml'; // Placeholder image
  accountChip.append(accountChipText, accountChipImg);

  authBarContents.append(signInSpan, separator, accountChip);
  signInButton.append(authBarContents);
  authBar.append(signInButton);
  footer.append(authBar);

  // Body
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
  rowContained.style.display = 'flex';
  rowContained.style.justifyContent = 'flex-start';
  rowContained.style.flexDirection = 'column';

  const htmlRoot = document.createElement('div');
  htmlRoot.classList.add('html-root-Uwa');
  htmlRoot.setAttribute('role', 'presentation');

  const mainMenuUl = document.createElement('ul');
  mainMenuUl.classList.add('mainMenu');

  const menuQuickLinkUl = document.createElement('ul');
  menuQuickLinkUl.classList.add('menu-quick-link');

  const mainMenuRows = itemRows.filter((row) => row.children.length === 3);
  const quickLinkRows = itemRows.filter((row) => row.children.length === 2);

  mainMenuRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('isSubmenu');

    const [idCell, nameCell, linkCell] = [...row.children];
    const id = idCell.textContent.trim();
    const name = nameCell.textContent.trim();
    const link = linkCell.querySelector('a');

    const input = document.createElement('input');
    input.id = id;
    input.tabIndex = 0;
    input.name = id;
    input.type = 'checkbox';
    input.value = id;

    const label = document.createElement('label');
    label.htmlFor = id;

    const linkEl = document.createElement('a');
    if (link) {
      linkEl.href = link.href;
      linkEl.textContent = name;
    } else {
      linkEl.textContent = name;
    }
    linkEl.tabIndex = 0;
    label.append(linkEl);
    li.append(input, label);

    // Placeholder for subMenu - based on original HTML structure
    const subMenuUl = document.createElement('ul');
    subMenuUl.classList.add('subMenu');
    // Add a dummy li to simulate sub-menu content for now
    // In a real scenario, this would be populated dynamically or from additional block content
    const subMenuLi = document.createElement('li');
    subMenuLi.textContent = 'Submenu Item (Placeholder)';
    subMenuUl.append(subMenuLi);
    li.append(subMenuUl);

    mainMenuUl.append(li);
  });

  quickLinkRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const [linkCell, textCell] = [...row.children];
    const link = linkCell.querySelector('a');
    const text = textCell.textContent.trim();

    const linkEl = document.createElement('a');
    if (link) {
      linkEl.href = link.href;
      linkEl.textContent = text;
    } else {
      linkEl.textContent = text;
    }
    linkEl.tabIndex = 0;
    li.append(linkEl);
    menuQuickLinkUl.append(li);
  });

  htmlRoot.append(mainMenuUl, menuQuickLinkUl);
  rowContained.append(htmlRoot);
  richContent.append(rowContained);
  cmsBlockContent.append(richContent);
  cmsBlock.append(cmsBlockContent);
  categoryTree.append(cmsBlock);
  body.append(categoryTree);

  // Modal
  const modal = document.createElement('div');
  modal.classList.add('navigation-modal-Ed0', 'absolute', 'bg-white', 'bottom-0', 'left-0', 'opacity-0', 'overflow-auto', 'right-0', 'top-lg');

  aside.append(header, footer, body, modal);

  // Event Listeners for interactive behavior
  closeButton.addEventListener('click', () => {
    aside.classList.remove('opacity-100', 'navigation-root-SSY--open');
    aside.classList.add('opacity-0');
  });

  // Added: Event listener for signInButton to toggle a class on authBar
  signInButton.addEventListener('click', () => {
    authBar.classList.toggle('authBar-root-qo8--active'); // Example class to toggle
  });

  // Toggle for main menu items (simulated from original HTML's checkbox behavior)
  mainMenuUl.querySelectorAll('li.isSubmenu > input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const parentLi = checkbox.closest('li.isSubmenu');
      if (parentLi) {
        if (checkbox.checked) {
          parentLi.classList.add('active'); // Add a class to indicate open state
        } else {
          parentLi.classList.remove('active'); // Remove class for closed state
        }
      }
    });
  });

  // Image optimization for any images found
  aside.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Added: Event listener to close the navigation when clicking outside of it
  document.addEventListener('click', (event) => {
    if (!aside.contains(event.target) && aside.classList.contains('navigation-root-SSY--open')) {
      aside.classList.remove('opacity-100', 'navigation-root-SSY--open');
      aside.classList.add('opacity-0');
    }
  });

  // Added: Event listener to close the navigation on escape key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && aside.classList.contains('navigation-root-SSY--open')) {
      aside.classList.remove('opacity-100', 'navigation-root-SSY--open');
      aside.classList.add('opacity-0');
    }
  });

  // Example of how to open the navigation (e.g., from a hamburger menu button elsewhere)
  // For demonstration, let's assume there's a button with class 'open-nav-button'
  // document.querySelector('.open-nav-button')?.addEventListener('click', () => {
  //   aside.classList.remove('opacity-0');
  //   aside.classList.add('opacity-100', 'navigation-root-SSY--open');
  // });

  block.textContent = '';
  block.append(aside);
}
