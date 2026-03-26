import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const header = document.createElement('header');
  header.classList.add('header-closed-qbE', 'header-root-BAU', 'auto-cols-fr', 'bg-header', 'border-b', 'border-subtle', 'grid', 'h-auto', 'justify-center', 'top-0', 'sticky', 'w-full', 'z-header');

  const headerTopBar = document.createElement('div');
  headerTopBar.classList.add('header-topBar-fS-');
  header.append(headerTopBar);

  const cmsBlockTop = document.createElement('div');
  cmsBlockTop.classList.add('cmsBlock-root-rsi');
  headerTopBar.append(cmsBlockTop);

  const cmsBlockContentTop = document.createElement('div');
  cmsBlockContentTop.classList.add('cmsBlock-content-BTy');
  cmsBlockTop.append(cmsBlockContentTop);

  const richContentTop = document.createElement('div');
  richContentTop.classList.add('richContent-root-Byp');
  cmsBlockContentTop.append(richContentTop);

  const rowContainedTop = document.createElement('div');
  rowContainedTop.classList.add('row-contained-PD6', 'row-root-rPq');
  richContentTop.append(rowContainedTop);

  const flexContainerTop = document.createElement('div');
  flexContainerTop.style.display = 'flex';
  flexContainerTop.style.justifyContent = 'flex-start';
  flexContainerTop.style.flexDirection = 'column';
  rowContainedTop.append(flexContainerTop);

  const columnGroupTop = document.createElement('div');
  columnGroupTop.classList.add('columnGroup-root-JjC');
  flexContainerTop.append(columnGroupTop);

  const columnLineTop = document.createElement('div');
  columnLineTop.classList.add('columnLine-root-khs');
  columnLineTop.style.display = 'flex';
  columnGroupTop.append(columnLineTop);

  const columnTop = document.createElement('div');
  columnTop.classList.add('column-root-INf', 'pagebuilder-column');
  columnTop.style.alignSelf = 'stretch';
  columnTop.style.display = 'flex';
  columnTop.style.flexDirection = 'column';
  columnTop.style.justifyContent = 'flex-start';
  columnTop.style.width = '100%';
  columnLineTop.append(columnTop);

  const textRootTop = document.createElement('div');
  textRootTop.classList.add('text-root-iY-');
  textRootTop.setAttribute('role', 'presentation');
  columnTop.append(textRootTop);

  const headerTicker = document.createElement('div');
  headerTicker.classList.add('header_ticker');
  textRootTop.append(headerTicker);

  const tickerContainer = document.createElement('div');
  tickerContainer.classList.add('ticker_container');
  headerTicker.append(tickerContainer);

  const headerTickerLeft = document.createElement('div');
  headerTickerLeft.classList.add('header_ticker_left');
  tickerContainer.append(headerTickerLeft);

  const ulTickerLeft = document.createElement('ul');
  headerTickerLeft.append(ulTickerLeft);

  const liBlog = document.createElement('li');
  const aBlog = document.createElement('a');
  aBlog.setAttribute('tabindex', '0');
  aBlog.setAttribute('title', 'blog');
  aBlog.href = '/blog';
  aBlog.textContent = 'BLOGS';
  liBlog.append(aBlog);
  ulTickerLeft.append(liBlog);

  const liCorporate = document.createElement('li');
  const aCorporate = document.createElement('a');
  aCorporate.setAttribute('tabindex', '0');
  aCorporate.href = '/corporate-gifting';
  aCorporate.textContent = 'CORPORATE GIFTING';
  liCorporate.append(aCorporate);
  ulTickerLeft.append(liCorporate);

  const liTrack = document.createElement('li');
  const aTrack = document.createElement('a');
  aTrack.setAttribute('tabindex', '0');
  aTrack.href = '/track-order';
  aTrack.textContent = 'TRACK ORDER';
  liTrack.append(aTrack);
  ulTickerLeft.append(liTrack);

  const headerTickerRight = document.createElement('div');
  headerTickerRight.classList.add('header_ticker_right');
  headerTickerRight.style.maxWidth = '700px';
  headerTickerRight.style.margin = '0 auto';
  tickerContainer.append(headerTickerRight);

  const marquee = document.createElement('div');
  marquee.classList.add('marquee');
  headerTickerRight.append(marquee);

  const marqueeContent = document.createElement('div');
  marqueeContent.classList.add('marquee-content');
  marquee.append(marqueeContent);

  const pMarquee = document.createElement('p');
  pMarquee.style.fontSize = '12px';
  pMarquee.style.lineHeight = '14px';
  pMarquee.style.paddingTop = '2px';
  pMarquee.innerHTML = '<strong>Flat 10% off for first-time purchaser only on APP, use code- APP10 at the checkout</strong>';
  marqueeContent.append(pMarquee);

  const headerToolbar = document.createElement('div');
  headerToolbar.classList.add('header-toolbar--5w', 'border-0', 'gap-x-4', 'flex', 'h-14', 'items-center', 'max-w-site', 'w-full', 'lg_gap-x-8');
  header.append(headerToolbar);

  const primaryActions = document.createElement('div');
  primaryActions.classList.add('header-primaryActions-ku8', 'col-start-1', 'grid', 'grid-flow-col', 'justify-self-start', 'row-start-1', 'self-center', 'lg_hidden');
  headerToolbar.append(primaryActions);

  const navTrigger = document.createElement('button');
  navTrigger.classList.add('navTrigger-root-yIv', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'h-[3rem]', 'w-[3rem]', 'lg_hidden');
  navTrigger.setAttribute('aria-label', 'Toggle navigation panel');
  primaryActions.append(navTrigger);

  const iconRoot = document.createElement('span');
  iconRoot.classList.add('icon-root-cnm', 'items-center', 'inline-flex', 'justify-center');
  navTrigger.append(iconRoot);

  const navTriggerImg = document.createElement('img');
  navTriggerImg.setAttribute('alt', 'svg file');
  navTriggerImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774517932051.svg+xml';
  iconRoot.append(navTriggerImg);

  const logoContainer = document.createElement('a');
  logoContainer.classList.add('header-logoContainer-tkF', 'justify-self-center', 'lg_justify-self-start');
  logoContainer.href = '/';
  headerToolbar.append(logoContainer);

  const logoImg = document.createElement('img');
  logoImg.setAttribute('alt', 'svg file');
  logoImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774517932126.svg+xml';
  logoContainer.append(logoImg);

  const searchBar = document.createElement('div');
  searchBar.classList.add('searchBar-root-o3R', 'items-center', 'justify-items-center', 'justify-self-center', 'lg_max-w-[40rem]', 'px-xs', 'py-0', 'w-full', 'relative');
  headerToolbar.append(searchBar);

  const searchBarContainer = document.createElement('div');
  searchBarContainer.classList.add('searchBar-container-9Bc', 'inline-flex', 'items-center', 'justify-center', 'max-w-[40rem]', 'w-full');
  searchBar.append(searchBarContainer);

  const searchBarForm = document.createElement('form');
  searchBarForm.classList.add('searchBar-form-osU', 'grid', 'items-center', 'justify-items-stretch', 'w-full');
  searchBarForm.setAttribute('autocomplete', 'off');
  searchBarContainer.append(searchBarForm);

  const searchBarAutocomplete = document.createElement('div');
  searchBarAutocomplete.classList.add('searchBar-autocomplete-eUC', 'grid', 'z-menu', 'absolute', 'w-full', 'top-0', 'left-0');
  searchBarForm.append(searchBarAutocomplete);

  const autocompleteRoot = document.createElement('div');
  autocompleteRoot.classList.add('autocomplete-root_hidden-J0b', 'autocomplete-root-bKa', 'bg-white', 'border-input', 'border-solid', 'border-t-0', 'grid', 'left-0', 'p-xs', 'right-0', 'rounded-b-md', 'rounded-t-none', 'text-sm', 'top-9', 'z-menu', 'invisible', 'opacity-0');
  searchBarAutocomplete.append(autocompleteRoot);

  const autocompleteMessage = document.createElement('div');
  autocompleteMessage.classList.add('autocomplete-message-VlL', 'px-3', 'py-0', 'text-center', 'text-subtle', 'max-w-site', 'w-full');
  autocompleteMessage.textContent = 'Search for a product';
  autocompleteRoot.append(autocompleteMessage);

  const autocompleteSuggestions = document.createElement('div');
  autocompleteSuggestions.classList.add('autocomplete-suggestions-zsO', 'gap-2xs', 'grid');
  autocompleteRoot.append(autocompleteSuggestions);

  const searchBarSearch = document.createElement('div');
  searchBarSearch.classList.add('searchBar-search-mB6', 'grid', 'relative');
  searchBarForm.append(searchBarSearch);

  const fieldIcons = document.createElement('span');
  fieldIcons.classList.add('fieldIcons-root-ecG', 'grid-flow-col', 'h-[2.5rem]', 'inline-grid', 'w-full');
  fieldIcons.style.setProperty('--iconsBefore', '1');
  fieldIcons.style.setProperty('--iconsAfter', '0');
  searchBarSearch.append(fieldIcons);

  const fieldIconsInput = document.createElement('span');
  fieldIconsInput.classList.add('fieldIcons-input-Ced', 'items-center', 'flex');
  fieldIcons.append(fieldIconsInput);

  const searchInput = document.createElement('input');
  searchInput.classList.add('textInput-input-Jz0', 'field-input-2Mu', 'appearance-none', 'bg-white', 'border-2', 'border-solid', 'border-input', 'flex-textInput', 'h-[2.5rem]', 'inline-flex', 'm-0', 'max-w-full', 'rounded-input', 'text-colorDefault', 'w-full', 'focus_outline-none', 'focus_shadow-inputFocus', 'disabled_text-subtle');
  searchInput.setAttribute('placeholder', "Search for Keywords: 'jacket', 'fleece' etc");
  searchInput.setAttribute('id', 'ba9d8c1d-2cc2-40a0-9142-d91c38d8b9b1');
  searchInput.setAttribute('name', 'search_query');
  searchInput.setAttribute('value', '');
  fieldIconsInput.append(searchInput);

  const fieldIconsBefore = document.createElement('span');
  fieldIconsBefore.classList.add('fieldIcons-before-G3M', 'flex', 'items-center', 'justify-center', 'mx-0.5', 'my-0', 'pointer-events-none', 'w-[2.5rem]', 'z-foreground');
  fieldIcons.append(fieldIconsBefore);

  const searchIcon = document.createElement('img');
  searchIcon.setAttribute('alt', 'svg file');
  searchIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774517932256.svg+xml';
  fieldIconsBefore.append(searchIcon);

  const fieldIconsAfter = document.createElement('span');
  fieldIconsAfter.classList.add('fieldIcons-after-xwp', 'flex', 'items-center', 'justify-center', 'mx-0.5', 'my-0', 'pointer-events-none', 'w-[2.5rem]', 'z-foreground');
  fieldIcons.append(fieldIconsAfter);

  const messageRoot = document.createElement('p');
  messageRoot.classList.add('message-root-B-9', 'font-normal', 'leading-none', 'pb-0.5', 'px-0.5', 'text-colorDefault');
  searchBarSearch.append(messageRoot);

  const secondaryActions = document.createElement('div');
  secondaryActions.classList.add('header-secondaryActions-U01', 'grid', 'grid-flow-col', 'items-center', 'justify-items-end', 'justify-self-end', 'w-max', 'lg_gap-x-4');
  headerToolbar.append(secondaryActions);

  const accountTrigger = document.createElement('div');
  accountTrigger.classList.add('accountTrigger-root-7Dr', 'hidden', 'items-center', 'h-lg', 'sm_grid');
  secondaryActions.append(accountTrigger);

  const accountTriggerLink = document.createElement('a');
  accountTriggerLink.classList.add('accountTrigger-trigger-YDx', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'h-[2rem]', 'min-w-[2rem]', 'z-foreground');
  accountTriggerLink.setAttribute('aria-label', 'Toggle My Account Menu');
  accountTriggerLink.href = '/sign-in';
  accountTrigger.append(accountTriggerLink);

  const accountChip = document.createElement('span');
  accountChip.classList.add('accountChip-root-biX', 'grid', 'grid-flow-col', 'items-center');
  accountTriggerLink.append(accountChip);

  const accountChipText = document.createElement('span');
  accountChipText.classList.add('accountChip-text-6Zl');
  accountChip.append(accountChipText);

  const accountIcon = document.createElement('img');
  accountIcon.setAttribute('alt', 'svg file');
  accountIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774517932267.svg+xml';
  accountChip.append(accountIcon);

  const accountMenu = document.createElement('aside');
  accountMenu.classList.add('accountMenu-root-D2y', 'absolute', 'h-0', 'left-[-100vw]', 'max-w-[100vw]', 'opacity-0', 'overflow-visible', 'top-full', 'z-menu');
  secondaryActions.append(accountMenu);

  const accountMenuContents = document.createElement('div');
  accountMenuContents.classList.add('accountMenu-contents-Du2', 'absolute', 'bg-white', 'grid', 'right-0', 'rounded-sm', 'shadow-menu', 'top-0', 'w-[27.5rem]');
  accountMenu.append(accountMenuContents);

  const wishlistLink = document.createElement('a');
  wishlistLink.classList.add('header-headerWishlist-y3r');
  wishlistLink.setAttribute('aria-label', 'wishlist');
  wishlistLink.setAttribute('title', 'Wishlist');
  wishlistLink.href = '/wishlist';
  secondaryActions.append(wishlistLink);

  const wishlistIcon = document.createElement('img');
  wishlistIcon.setAttribute('alt', 'svg file');
  wishlistIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774517932275.svg+xml';
  wishlistLink.append(wishlistIcon);

  const wishlistText = document.createElement('span');
  wishlistText.classList.add('header-noDisplay-tBq');
  wishlistText.textContent = 'Wishlist';
  wishlistLink.append(wishlistText);

  const cartTriggerContainer = document.createElement('div');
  cartTriggerContainer.classList.add('cartTrigger-triggerContainer-FZE', 'hidden', 'items-center', 'h-lg', 'lg_grid');
  secondaryActions.append(cartTriggerContainer);

  const cartTriggerLink = document.createElement('a');
  cartTriggerLink.classList.add('cartTrigger-trigger-VfJ', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'content-center', 'flex', 'h-[2rem]', 'justify-center', 'min-w-[2rem]', 'relative', 'z-foreground');
  cartTriggerLink.setAttribute('aria-label', 'Toggle mini cart. You have 0 items in your cart.');
  cartTriggerLink.href = '';
  cartTriggerContainer.append(cartTriggerLink);

  const cartHeaderSpan = document.createElement('span');
  cartHeaderSpan.classList.add('cartTrigger-cart_header_span-jAj');
  cartTriggerLink.append(cartHeaderSpan);

  const cartIcon = document.createElement('img');
  cartIcon.setAttribute('alt', 'svg file');
  cartIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774517932285.svg+xml';
  cartHeaderSpan.append(cartIcon);

  const miniCartButton = document.createElement('button');
  miniCartButton.classList.add('cartTrigger-link-mIb', 'cartTrigger-trigger-VfJ', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'content-center', 'flex', 'h-[2rem]', 'justify-center', 'min-w-[2rem]', 'relative', 'z-foreground', 'flex', 'lg_hidden');
  miniCartButton.setAttribute('aria-label', 'Toggle mini cart. You have 0 items in your cart.');
  miniCartButton.setAttribute('id', 'miniCartLink');
  secondaryActions.append(miniCartButton);

  const miniCartButtonSpan = document.createElement('span');
  miniCartButtonSpan.classList.add('cartTrigger-cart_header_span-jAj');
  miniCartButton.append(miniCartButtonSpan);

  const miniCartButtonIcon = document.createElement('img');
  miniCartButtonIcon.setAttribute('alt', 'svg file');
  miniCartButtonIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774517932285.svg+xml';
  miniCartButtonSpan.append(miniCartButtonIcon);

  const miniCartAside = document.createElement('aside');
  miniCartAside.classList.add('miniCart-root_closed-G6m', 'miniCart-root-DSC', 'fixed');
  miniCartAside.setAttribute('id', 'miniCartTrigger');
  secondaryActions.append(miniCartAside);

  const miniCartContents = document.createElement('div');
  miniCartContents.classList.add('miniCart-contents-maG', 'absolute', 'bg-white', 'grid', 'max-h-[100%]', 'overflow-hidden', 'right-0', 'rounded-0', 'top-0', 'w-[25rem]');
  miniCartAside.append(miniCartContents);

  const miniCartHeader = document.createElement('div');
  miniCartHeader.classList.add('miniCart-header-92Q', 'border-b-2', 'border-solid', 'border-light', 'font-bold', 'gap-y-xs', 'grid', 'grid-cols-autoLast', 'items-center', 'leading-tight', 'my-0', 'py-xs', 'px-2xs', 'text-md');
  miniCartContents.append(miniCartHeader);

  const myBagSpan = document.createElement('span');
  myBagSpan.textContent = 'My Bag';
  miniCartHeader.append(myBagSpan);

  const closeBtnSpan = document.createElement('span');
  closeBtnSpan.classList.add('miniCart-closeBtn-EAD');
  closeBtnSpan.textContent = 'Close';
  miniCartHeader.append(closeBtnSpan);

  const miniCartEmpty = document.createElement('div');
  miniCartEmpty.classList.add('miniCart-emptyCart-Smo', 'gap-md', 'grid', 'p-md');
  miniCartContents.append(miniCartEmpty);

  const emptyMessage = document.createElement('div');
  emptyMessage.classList.add('miniCart-emptyMessage-eLo', 'font-bold', 'm-auto');
  emptyMessage.textContent = 'There are no items in your cart.';
  miniCartEmpty.append(emptyMessage);

  const hiddenSpan = document.createElement('span');
  hiddenSpan.setAttribute('hidden', '');
  hiddenSpan.setAttribute('role', 'status');
  hiddenSpan.setAttribute('aria-hidden', 'false');
  hiddenSpan.setAttribute('aria-live', 'polite');
  hiddenSpan.textContent = 'There are no items in your cart.';
  emptyMessage.append(hiddenSpan);

  const customMenu = document.createElement('div');
  customMenu.classList.add('header-customemenu-QSk');
  header.append(customMenu);

  const cmsBlockMenu = document.createElement('div');
  cmsBlockMenu.classList.add('cmsBlock-root-rsi');
  customMenu.append(cmsBlockMenu);

  const cmsBlockMenuContent = document.createElement('div');
  cmsBlockMenuContent.classList.add('cmsBlock-content-BTy');
  cmsBlockMenu.append(cmsBlockMenuContent);

  const richContentMenu = document.createElement('div');
  richContentMenu.classList.add('richContent-root-Byp');
  cmsBlockMenuContent.append(richContentMenu);

  const richContentMenu2 = document.createElement('div');
  richContentMenu2.classList.add('richContent-root-Byp');
  cmsBlockMenuContent.append(richContentMenu2);

  const rowContainedMenu = document.createElement('div');
  rowContainedMenu.classList.add('row-contained-PD6', 'row-root-rPq');
  richContentMenu2.append(rowContainedMenu);

  const flexContainerMenu = document.createElement('div');
  flexContainerMenu.style.display = 'flex';
  flexContainerMenu.style.justifyContent = 'flex-start';
  flexContainerMenu.style.flexDirection = 'column';
  rowContainedMenu.append(flexContainerMenu);

  const textRootMegaMenu = document.createElement('div');
  textRootMegaMenu.classList.add('text-root-iY-', 'megaMenu');
  textRootMegaMenu.setAttribute('role', 'presentation');
  flexContainerMenu.append(textRootMegaMenu);

  const mainMenu = document.createElement('ul');
  mainMenu.classList.add('mainMenu');
  textRootMegaMenu.append(mainMenu);

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('isSubmenu');
    moveInstrumentation(row, li);

    // Each row corresponds to a 'header-menu-item' model with 4 fields
    const [labelCell, linkCell, childrenCell, imageCell] = row.children;

    const link = linkCell.querySelector('a');
    const a = document.createElement('a');
    if (link) {
      a.href = link.href;
      a.textContent = labelCell.textContent;
      if (a.textContent.toLowerCase() === 'sale') {
        a.style.color = '#e35205';
      } else if (a.textContent.toLowerCase() === 'wiki for life') {
        a.classList.add('teens-image');
        a.setAttribute('aria-label', 'wiki for life');
        const img = imageCell.querySelector('picture > img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '181' }]);
          const optimizedImg = optimizedPic.querySelector('img');
          optimizedImg.style.maxHeight = '30px';
          optimizedImg.style.width = '181px';
          optimizedImg.style.height = '30px';
          optimizedImg.setAttribute('width', '181px');
          optimizedImg.setAttribute('height', '30px');
          optimizedImg.setAttribute('loading', 'eager');
          moveInstrumentation(img, optimizedImg);
          a.append(optimizedPic);
        }
      }
    } else {
      a.textContent = labelCell.textContent;
    }
    a.setAttribute('tabindex', '0');
    li.append(a);

    const subMenu = document.createElement('ul');
    subMenu.classList.add('subMenu');
    li.append(subMenu);

    // Check if childrenCell contains actual content (links/structure)
    if (childrenCell.children.length > 0) {
      // The childrenCell contains nested structure for submenu items
      // We need to replicate the structure from the original HTML for these sub-items.
      // The original HTML shows a 'oneColumn wideItems' > 'fiveCol' > 'li' > 'ul' structure.
      // The number of columns ('fiveCol', 'fourCol', 'twoCol') depends on the content.
      // For simplicity, we'll assume a generic structure and populate it with links from childrenCell.

      const subMenuLi = document.createElement('li');
      // Determine column class based on children count or specific content if needed
      // For now, default to 'oneColumn wideItems' as seen in the original HTML for most cases.
      subMenuLi.classList.add('oneColumn', 'wideItems');
      subMenuLi.style.listStyleType = 'none';
      subMenu.append(subMenuLi);

      const innerColUl = document.createElement('ul');
      // This part is tricky as the original HTML uses 'fiveCol', 'fourCol', 'twoCol'
      // based on the number of top-level categories within the submenu.
      // We'll use 'fiveCol' as a default, but a more robust solution would
      // analyze childrenCell's direct children to determine the column count.
      innerColUl.classList.add('fiveCol'); // Defaulting to fiveCol
      subMenuLi.append(innerColUl);

      // Iterate through the direct children of childrenCell to create sub-menu items
      // Each direct child of childrenCell is expected to be a div containing a list of links or a picture.
      [...childrenCell.children].forEach((childDiv) => {
        const colLi = document.createElement('li');
        colLi.style.listStyleType = 'none';
        innerColUl.append(colLi);

        if (childDiv.querySelector('ul')) {
          // If it's a list of links (e.g., Clothing, Rainwear, etc.)
          const nestedUl = childDiv.querySelector('ul').cloneNode(true);
          colLi.append(nestedUl);
        } else if (childDiv.querySelector('picture')) {
          // If it's an image within the submenu
          const menuImageSpan = document.createElement('span');
          menuImageSpan.classList.add('menuImage');
          colLi.append(menuImageSpan);

          const imgLink = document.createElement('a');
          imgLink.setAttribute('tabindex', '0');
          imgLink.href = childDiv.querySelector('a') ? childDiv.querySelector('a').href : '#';

          const img = childDiv.querySelector('picture > img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '239' }]);
            const optimizedImg = optimizedPic.querySelector('img');
            optimizedImg.setAttribute('title', img.alt);
            moveInstrumentation(img, optimizedImg);
            imgLink.append(optimizedPic);
          }
          menuImageSpan.append(imgLink);
        }
      });
    }

    mainMenu.append(li);
  });

  // Image optimization for all images in the header
  header.querySelectorAll('picture > img').forEach((img) => {
    // Only optimize if it's not the wiki logo which has specific dimensions
    if (!img.closest('.teens-image')) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  });

  block.textContent = '';
  block.append(header);

  // Add event listeners for interactive elements
  const navbarCollapse = document.querySelector('.header-customemenu-QSk'); // Assuming this is the collapsible menu
  if (navbarCollapse) {
    navTrigger.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show'); // Use 'show' class for visible/collapsed state
      navTrigger.classList.toggle('collapsed'); // Use 'collapsed' class for button state
    });
  }

  const miniCartModal = document.getElementById('miniCartTrigger');
  const miniCartCloseBtn = miniCartModal.querySelector('.miniCart-closeBtn-EAD');

  miniCartButton.addEventListener('click', () => {
    miniCartModal.classList.remove('miniCart-root_closed-G6m');
  });

  miniCartCloseBtn.addEventListener('click', () => {
    miniCartModal.classList.add('miniCart-root_closed-G6m');
  });

  miniCartModal.addEventListener('click', (e) => {
    if (e.target === miniCartModal) {
      miniCartModal.classList.add('miniCart-root_closed-G6m');
    }
  });

  const accountMenuTrigger = document.querySelector('.accountTrigger-trigger-YDx');
  const accountMenuElement = document.querySelector('.accountMenu-root-D2y');

  if (accountMenuTrigger && accountMenuElement) {
    accountMenuTrigger.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      accountMenuElement.classList.toggle('accountMenu-root_closed-D2y'); // Assuming a similar class for toggling visibility
      accountMenuElement.classList.toggle('opacity-0'); // Toggle opacity for visibility
      accountMenuElement.classList.toggle('invisible'); // Toggle visibility
      accountMenuElement.classList.toggle('h-0'); // Toggle height
      accountMenuElement.classList.toggle('left-[-100vw]'); // Toggle position
    });

    // Close account menu if clicked outside
    document.addEventListener('click', (e) => {
      if (!accountMenuElement.contains(e.target) && !accountMenuTrigger.contains(e.target)) {
        accountMenuElement.classList.add('accountMenu-root_closed-D2y', 'opacity-0', 'invisible', 'h-0', 'left-[-100vw]');
      }
    });
  }
}
