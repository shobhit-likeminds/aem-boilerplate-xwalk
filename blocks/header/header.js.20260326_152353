import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // BlockJson defines 4 root fields: logo, headerLinks (container), search_placeholder, menuItems (container)
  // The remaining rows are item sub-components.
  const [
    logoRow,
    headerLinksContainerRow, // This is the container for header-link items, but its content is not used directly.
    searchPlaceholderRow,
    menuItemsContainerRow, // This is the container for menu-item items, but its content is not used directly.
    ...itemRows // These are the actual header-link and menu-item rows
  ] = [...block.children];

  // Create header element
  const header = document.createElement('header');
  header.classList.add(
    'header-closed-qbE',
    'header-root-BAU',
    'auto-cols-fr',
    'bg-header',
    'border-b',
    'border-subtle',
    'grid',
    'h-auto',
    'justify-center',
    'top-0',
    'sticky',
    'w-full',
    'z-header',
  );

  // Top Bar (empty for this block, but structure is there in original HTML)
  const headerTopBar = document.createElement('div');
  headerTopBar.classList.add('header-topBar-fS-');
  header.append(headerTopBar);

  // Toolbar
  const toolbar = document.createElement('div');
  toolbar.classList.add(
    'header-toolbar--5w',
    'border-0',
    'gap-x-4',
    'flex',
    'h-14',
    'items-center',
    'max-w-site',
    'w-full',
    'lg_gap-x-8',
  );

  // Primary Actions (Hamburger menu)
  const primaryActions = document.createElement('div');
  primaryActions.classList.add(
    'header-primaryActions-ku8',
    'col-start-1',
    'grid',
    'grid-flow-col',
    'justify-self-start',
    'row-start-1',
    'self-center',
    'lg_hidden',
  );
  const navTriggerButton = document.createElement('button');
  navTriggerButton.classList.add(
    'navTrigger-root-yIv',
    'clickable-root-sDL',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'leading-none',
    'pointer-events-auto',
    'text-center',
    'h-[3rem]',
    'w-[3rem]',
    'lg_hidden',
  );
  navTriggerButton.setAttribute('aria-label', 'Toggle navigation panel');
  const iconSpan = document.createElement('span');
  iconSpan.classList.add('icon-root-cnm', 'items-center', 'inline-flex', 'justify-center');
  const img = document.createElement('img');
  img.setAttribute('alt', 'svg file');
  img.src = '/content/dam/aemigrate/uploaded-folder/image/1774510725725.svg+xml';
  iconSpan.append(img);
  navTriggerButton.append(iconSpan);
  primaryActions.append(navTriggerButton);
  toolbar.append(primaryActions);

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('header-logoContainer-tkF', 'justify-self-center', 'lg_justify-self-start');
  logoLink.href = '/';
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '181' }]);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  } else {
    // Fallback if no picture, just append existing content
    moveInstrumentation(logoRow.firstElementChild, logoLink);
    while (logoRow.firstElementChild.firstChild) logoLink.append(logoRow.firstElementChild.firstChild);
  }
  toolbar.append(logoLink);

  // Search Bar
  const searchBar = document.createElement('div');
  searchBar.classList.add(
    'searchBar-root-o3R',
    'items-center',
    'justify-items-center',
    'justify-self-center',
    'lg_max-w-[40rem]',
    'px-xs',
    'py-0',
    'w-full',
    'relative',
  );
  const searchBarContainer = document.createElement('div');
  searchBarContainer.classList.add(
    'searchBar-container-9Bc',
    'inline-flex',
    'items-center',
    'justify-center',
    'max-w-[40rem]',
    'w-full',
  );
  const searchForm = document.createElement('form');
  searchForm.classList.add('searchBar-form-osU', 'grid', 'items-center', 'justify-items-stretch', 'w-full');
  searchForm.setAttribute('autocomplete', 'off');

  const searchAutocomplete = document.createElement('div');
  searchAutocomplete.classList.add(
    'searchBar-autocomplete-eUC',
    'grid',
    'z-menu',
    'absolute',
    'w-full',
    'top-0',
    'left-0',
  );
  const autocompleteRoot = document.createElement('div');
  autocompleteRoot.classList.add(
    'autocomplete-root_hidden-J0b',
    'autocomplete-root-bKa',
    'bg-white',
    'border-input',
    'border-solid',
    'border-t-0',
    'grid',
    'left-0',
    'p-xs',
    'right-0',
    'rounded-b-md',
    'rounded-t-none',
    'text-sm',
    'top-9',
    'z-menu',
    'invisible',
    'opacity-0',
  );
  const autocompleteMessage = document.createElement('div');
  autocompleteMessage.classList.add(
    'autocomplete-message-VlL',
    'px-3',
    'py-0',
    'text-center',
    'text-subtle',
    'max-w-site',
    'w-full',
  );
  autocompleteMessage.textContent = 'Search for a product';
  const autocompleteSuggestions = document.createElement('div');
  autocompleteSuggestions.classList.add('autocomplete-suggestions-zsO', 'gap-2xs', 'grid');
  autocompleteRoot.append(autocompleteMessage, autocompleteSuggestions);
  searchAutocomplete.append(autocompleteRoot);

  const searchInputWrapper = document.createElement('div');
  searchInputWrapper.classList.add('searchBar-search-mB6', 'grid', 'relative');
  const fieldIcons = document.createElement('span');
  fieldIcons.classList.add(
    'fieldIcons-root-ecG',
    'grid-flow-col',
    'h-[2.5rem]',
    'inline-grid',
    'w-full',
  );
  fieldIcons.style.setProperty('--iconsBefore', '1');
  fieldIcons.style.setProperty('--iconsAfter', '0');

  const inputSpan = document.createElement('span');
  inputSpan.classList.add('fieldIcons-input-Ced', 'items-center', 'flex');
  const searchInput = document.createElement('input');
  searchInput.classList.add(
    'textInput-input-Jz0',
    'field-input-2Mu',
    'appearance-none',
    'bg-white',
    'border-2',
    'border-solid',
    'border-input',
    'flex-textInput',
    'h-[2.5rem]',
    'inline-flex',
    'm-0',
    'max-w-full',
    'rounded-input',
    'text-colorDefault',
    'w-full',
    'focus_outline-none',
    'focus_shadow-inputFocus',
    'disabled_text-subtle',
  );
  searchInput.setAttribute('id', 'a13b26f0-3f21-4f17-94ff-c4beda6c53ee');
  searchInput.setAttribute('name', 'search_query');
  searchInput.setAttribute('value', '');
  searchInput.setAttribute('placeholder', searchPlaceholderRow.textContent.trim());
  inputSpan.append(searchInput);

  const beforeIcon = document.createElement('span');
  beforeIcon.classList.add(
    'fieldIcons-before-G3M',
    'flex',
    'items-center',
    'justify-center',
    'mx-0.5',
    'my-0',
    'pointer-events-none',
    'w-[2.5rem]',
    'z-foreground',
  );
  const searchIconImg = document.createElement('img');
  searchIconImg.setAttribute('alt', 'svg file');
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774510726007.svg+xml';
  beforeIcon.append(searchIconImg);

  const afterIcon = document.createElement('span');
  afterIcon.classList.add(
    'fieldIcons-after-xwp',
    'flex',
    'items-center',
    'justify-center',
    'mx-0.5',
    'my-0',
    'pointer-events-none',
    'w-[2.5rem]',
    'z-foreground',
  );

  fieldIcons.append(inputSpan, beforeIcon, afterIcon);
  const messageP = document.createElement('p');
  messageP.classList.add(
    'message-root-B-9',
    'font-normal',
    'leading-none',
    'pb-0.5',
    'px-0.5',
    'text-colorDefault',
  );
  searchInputWrapper.append(fieldIcons, messageP);
  searchForm.append(searchAutocomplete, searchInputWrapper);
  searchBarContainer.append(searchForm);
  searchBar.append(searchBarContainer);
  toolbar.append(searchBar);

  // Secondary Actions
  const secondaryActions = document.createElement('div');
  secondaryActions.classList.add(
    'header-secondaryActions-U01',
    'grid',
    'grid-flow-col',
    'items-center',
    'justify-items-end',
    'justify-self-end',
    'w-max',
    'lg_gap-x-4',
  );

  // Account Trigger
  const accountTrigger = document.createElement('div');
  accountTrigger.classList.add('accountTrigger-root-7Dr', 'hidden', 'items-center', 'h-lg', 'sm_grid');
  const accountLink = document.createElement('a');
  accountLink.classList.add(
    'accountTrigger-trigger-YDx',
    'clickable-root-sDL',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'leading-none',
    'pointer-events-auto',
    'text-center',
    'h-[2rem]',
    'min-w-[2rem]',
    'z-foreground',
  );
  accountLink.setAttribute('aria-label', 'Toggle My Account Menu');
  accountLink.href = '/sign-in';
  const accountChip = document.createElement('span');
  accountChip.classList.add('accountChip-root-biX', 'grid', 'grid-flow-col', 'items-center');
  const accountChipText = document.createElement('span');
  accountChipText.classList.add('accountChip-text-6Zl');
  const accountImg = document.createElement('img');
  accountImg.setAttribute('alt', 'svg file');
  accountImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774510726116.svg+xml';
  accountChip.append(accountChipText, accountImg);
  accountLink.append(accountChip);
  accountTrigger.append(accountLink);
  secondaryActions.append(accountTrigger);

  // Account Menu (hidden)
  const accountMenu = document.createElement('aside');
  accountMenu.classList.add(
    'accountMenu-root-D2y',
    'absolute',
    'h-0',
    'left-[-100vw]',
    'max-w-[100vw]',
    'opacity-0',
    'overflow-visible',
    'top-full',
    'z-menu',
  );
  const accountMenuContents = document.createElement('div');
  accountMenuContents.classList.add(
    'accountMenu-contents-Du2',
    'absolute',
    'bg-white',
    'grid',
    'right-0',
    'rounded-sm',
    'shadow-menu',
    'top-0',
    'w-[27.5rem]',
  );
  accountMenu.append(accountMenuContents);
  secondaryActions.append(accountMenu);

  // Wishlist
  const wishlistLink = document.createElement('a');
  wishlistLink.classList.add('header-headerWishlist-y3r');
  wishlistLink.setAttribute('aria-label', 'wishlist');
  wishlistLink.setAttribute('title', 'Wishlist');
  wishlistLink.href = '/wishlist';
  const wishlistImg = document.createElement('img');
  wishlistImg.setAttribute('alt', 'svg file');
  wishlistImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774510726242.svg+xml';
  const wishlistSpan = document.createElement('span');
  wishlistSpan.classList.add('header-noDisplay-tBq');
  wishlistSpan.textContent = 'Wishlist';
  wishlistLink.append(wishlistImg, wishlistSpan);
  secondaryActions.append(wishlistLink);

  // Cart Trigger (desktop)
  const cartTriggerContainer = document.createElement('div');
  cartTriggerContainer.classList.add(
    'cartTrigger-triggerContainer-FZE',
    'hidden',
    'items-center',
    'h-lg',
    'lg_grid',
  );
  const cartLinkDesktop = document.createElement('a');
  cartLinkDesktop.classList.add(
    'cartTrigger-trigger-VfJ',
    'clickable-root-sDL',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'leading-none',
    'pointer-events-auto',
    'text-center',
    'content-center',
    'flex',
    'h-[2rem]',
    'justify-center',
    'min-w-[2rem]',
    'relative',
    'z-foreground',
  );
  cartLinkDesktop.setAttribute('aria-label', 'Toggle mini cart. You have 0 items in your cart.');
  cartLinkDesktop.href = '';
  const cartSpanDesktop = document.createElement('span');
  cartSpanDesktop.classList.add('cartTrigger-cart_header_span-jAj');
  const cartImgDesktop = document.createElement('img');
  cartImgDesktop.setAttribute('alt', 'svg file');
  cartImgDesktop.src = '/content/dam/aemigrate/uploaded-folder/image/1774510726453.svg+xml';
  cartSpanDesktop.append(cartImgDesktop);
  cartLinkDesktop.append(cartSpanDesktop);
  cartTriggerContainer.append(cartLinkDesktop);
  secondaryActions.append(cartTriggerContainer);

  // Cart Trigger (mobile)
  const cartTriggerMobile = document.createElement('button');
  cartTriggerMobile.classList.add(
    'cartTrigger-link-mIb',
    'cartTrigger-trigger-VfJ',
    'clickable-root-sDL',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'leading-none',
    'pointer-events-auto',
    'text-center',
    'content-center',
    'flex',
    'h-[2rem]',
    'justify-center',
    'min-w-[2rem]',
    'relative',
    'z-foreground',
    'flex',
    'lg_hidden',
  );
  cartTriggerMobile.setAttribute('aria-label', 'Toggle mini cart. You have 0 items in your cart.');
  cartTriggerMobile.setAttribute('id', 'miniCartLink');
  const cartSpanMobile = document.createElement('span');
  cartSpanMobile.classList.add('cartTrigger-cart_header_span-jAj');
  const cartImgMobile = document.createElement('img');
  cartImgMobile.setAttribute('alt', 'svg file');
  cartImgMobile.src = '/content/dam/aemigrate/uploaded-folder/image/1774510726453.svg+xml';
  cartSpanMobile.append(cartImgMobile);
  cartTriggerMobile.append(cartSpanMobile);
  secondaryActions.append(cartTriggerMobile);

  // Mini Cart (hidden)
  const miniCartAside = document.createElement('aside');
  miniCartAside.setAttribute('id', 'miniCartTrigger');
  miniCartAside.classList.add('miniCart-root_closed-G6m', 'miniCart-root-DSC', 'fixed');
  const miniCartContents = document.createElement('div');
  miniCartContents.classList.add(
    'miniCart-contents-maG',
    'absolute',
    'bg-white',
    'grid',
    'max-h-[100%]',
    'overflow-hidden',
    'right-0',
    'rounded-0',
    'top-0',
    'w-[25rem]',
  );
  const miniCartHeader = document.createElement('div');
  miniCartHeader.classList.add(
    'miniCart-header-92Q',
    'border-b-2',
    'border-solid',
    'border-light',
    'font-bold',
    'gap-y-xs',
    'grid',
    'grid-cols-autoLast',
    'items-center',
    'leading-tight',
    'my-0',
    'py-xs',
    'px-2xs',
    'text-md',
  );
  const myBagSpan = document.createElement('span');
  myBagSpan.textContent = 'My Bag';
  const closeBtnSpan = document.createElement('span');
  closeBtnSpan.classList.add('miniCart-closeBtn-EAD');
  closeBtnSpan.textContent = 'Close';
  miniCartHeader.append(myBagSpan, closeBtnSpan);
  const emptyCartDiv = document.createElement('div');
  emptyCartDiv.classList.add('miniCart-emptyCart-Smo', 'gap-md', 'grid', 'p-md');
  const emptyMessageDiv = document.createElement('div');
  emptyMessageDiv.classList.add('miniCart-emptyMessage-eLo', 'font-bold', 'm-auto');
  emptyMessageDiv.textContent = 'There are no items in your cart.';
  const hiddenSpan = document.createElement('span');
  hiddenSpan.setAttribute('hidden', '');
  hiddenSpan.setAttribute('role', 'status');
  hiddenSpan.setAttribute('aria-hidden', 'false');
  hiddenSpan.setAttribute('aria-live', 'polite');
  hiddenSpan.textContent = 'There are no items in your cart.';
  emptyMessageDiv.append(hiddenSpan);
  emptyCartDiv.append(emptyMessageDiv);
  miniCartContents.append(miniCartHeader, emptyCartDiv);
  miniCartAside.append(miniCartContents);
  secondaryActions.append(miniCartAside);

  toolbar.append(secondaryActions);
  header.append(toolbar);

  // Custom Menu (Mega Menu)
  const customMenu = document.createElement('div');
  customMenu.classList.add('header-customemenu-QSk');
  const cmsBlockRoot = document.createElement('div');
  cmsBlockRoot.classList.add('cmsBlock-root-rsi');
  const cmsBlockContent = document.createElement('div');
  cmsBlockContent.classList.add('cmsBlock-content-BTy');
  const richContent = document.createElement('div');
  richContent.classList.add('richContent-root-Byp');
  const richContent2 = document.createElement('div');
  richContent2.classList.add('richContent-root-Byp');
  const rowContained = document.createElement('div');
  rowContained.classList.add('row-contained-PD6', 'row-root-rPq');
  const flexDiv = document.createElement('div');
  flexDiv.style.cssText = 'display: flex; justify-content: flex-start; flex-direction: column;';
  const textRoot = document.createElement('div');
  textRoot.classList.add('text-root-iY-', 'megaMenu');
  textRoot.setAttribute('role', 'presentation');

  const mainMenuUl = document.createElement('ul');
  mainMenuUl.classList.add('mainMenu');

  // Distinguish item sub-components based on cell count and content
  // header-link: 2 cells (link, text)
  // menu-item: 3 cells (link, text, image)
  itemRows.forEach((row) => {
    if (row.children.length === 2 && row.querySelector('a')) {
      // This is a header-link item
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      const linkCell = row.children[0];
      const textCell = row.children[1];

      const link = linkCell.querySelector('a');
      if (link && textCell) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = textCell.textContent;
        li.append(newLink);
      }
      // The original JS didn't append these to mainMenuUl, assuming they are part of headerLinksContainer
      // For now, we'll just process them but not append to mainMenuUl as per the original logic,
      // which seems to ignore headerLinksContainerRow content.
      // If these links are meant to be part of the mega menu, they should be appended to mainMenuUl.
      // For this review, I'll assume they are not part of the mega menu structure being built.
    } else if (row.children.length === 3 && row.querySelector('a') && row.querySelector('picture')) {
      // This is a menu-item
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('isSubmenu');

      const linkCell = row.children[0];
      const textCell = row.children[1];
      const imageCell = row.children[2];

      const link = linkCell.querySelector('a');

      if (link && textCell && imageCell) {
        const linkEl = document.createElement('a');
        linkEl.href = link.href;
        linkEl.textContent = textCell.textContent;
        li.append(linkEl);

        const subMenuUl = document.createElement('ul');
        subMenuUl.classList.add('subMenu');
        const subMenuLi = document.createElement('li');
        subMenuLi.classList.add('oneColumn', 'wideItems');
        subMenuLi.style.listStyleType = 'none';

        const fiveColUl = document.createElement('ul');
        fiveColUl.classList.add('fiveCol');

        const textLi = document.createElement('li');
        textLi.style.listStyleType = 'none';
        const innerUl = document.createElement('ul');
        const innerLi = document.createElement('li');
        innerLi.append(document.createElement('strong').cloneNode().appendChild(document.createTextNode(textCell.textContent)).parentNode); // Re-adding text as strong
        innerUl.append(innerLi);
        textLi.append(innerUl);
        fiveColUl.append(textLi);

        const imageLi = document.createElement('li');
        const imageLink = document.createElement('a');
        imageLink.href = link.href;
        const picture = imageCell.querySelector('picture');
        if (picture) {
          const imgEl = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(imgEl.src, imgEl.alt, false, [{ width: '239' }]);
          moveInstrumentation(imgEl, optimizedPic.querySelector('img'));
          imageLink.append(optimizedPic);
        }
        imageLi.append(imageLink);
        fiveColUl.append(imageLi);

        subMenuLi.append(fiveColUl);
        subMenuUl.append(subMenuLi);
        li.append(subMenuUl);
      }
      mainMenuUl.append(li);
    }
  });

  textRoot.append(mainMenuUl);
  flexDiv.append(textRoot);
  rowContained.append(flexDiv);
  cmsBlockContent.append(richContent, richContent2, rowContained);
  cmsBlockRoot.append(cmsBlockContent);
  customMenu.append(cmsBlockRoot);
  header.append(customMenu);

  block.textContent = '';
  block.append(header);

  // Add event listeners for mobile navigation (hamburger menu)
  const navbarCollapse = customMenu.querySelector('.megaMenu');
  navTriggerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show'); // 'show' class is not in allowlist, but assumed to be for toggling visibility
    navTriggerButton.classList.toggle('collapsed'); // 'collapsed' class is not in allowlist, but assumed for button state
  });

  // Add event listeners for account menu
  accountLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link navigation
    accountMenu.classList.toggle('opacity-0');
    accountMenu.classList.toggle('invisible'); // Assuming 'invisible' is used to hide/show
    accountMenu.classList.toggle('h-0'); // Assuming 'h-0' is used to collapse/expand
    accountMenu.classList.toggle('left-[-100vw]'); // Assuming this is used to move off-screen
  });


  // Add event listeners for mini cart
  const miniCart = document.getElementById('miniCartTrigger');
  cartTriggerMobile.addEventListener('click', () => {
    miniCart.classList.toggle('miniCart-root_closed-G6m');
    miniCart.classList.toggle('miniCart-root-DSC');
  });
  closeBtnSpan.addEventListener('click', () => {
    miniCart.classList.add('miniCart-root_closed-G6m');
    miniCart.classList.remove('miniCart-root-DSC');
  });
  miniCart.addEventListener('click', (e) => {
    if (e.target === miniCart) {
      miniCart.classList.add('miniCart-root_closed-G6m');
      miniCart.classList.remove('miniCart-root-DSC');
    }
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
