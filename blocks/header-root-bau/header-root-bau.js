import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const header = document.createElement('header');
  header.classList.add('header-closed-qbE', 'header-root-BAU', 'auto-cols-fr', 'bg-header', 'border-b', 'border-subtle', 'grid', 'h-auto', 'justify-center', 'top-0', 'sticky', 'w-full', 'z-header');

  const headerTopBar = document.createElement('div');
  headerTopBar.classList.add('header-topBar-fS-');
  header.append(headerTopBar);

  const cmsBlockRoot = document.createElement('div');
  cmsBlockRoot.classList.add('cmsBlock-root-rsi');
  headerTopBar.append(cmsBlockRoot);

  const cmsBlockContent = document.createElement('div');
  cmsBlockContent.classList.add('cmsBlock-content-BTy');
  cmsBlockRoot.append(cmsBlockContent);

  // Replicating the ticker and marquee structure
  const richContent1 = document.createElement('div');
  richContent1.classList.add('richContent-root-Byp');
  cmsBlockContent.append(richContent1);

  const rowContained1 = document.createElement('div');
  rowContained1.classList.add('row-contained-PD6', 'row-root-rPq');
  richContent1.append(rowContained1);

  const flexCol1 = document.createElement('div');
  flexCol1.classList.add('flex-col-start');
  rowContained1.append(flexCol1);

  const columnGroup = document.createElement('div');
  columnGroup.classList.add('columnGroup-root-JjC');
  flexCol1.append(columnGroup);

  const columnLine = document.createElement('div');
  columnLine.classList.add('columnLine-root-khs');
  columnGroup.append(columnLine);

  const column = document.createElement('div');
  column.classList.add('column-root-INf', 'pagebuilder-column');
  columnLine.append(column);

  const textRoot = document.createElement('div');
  textRoot.classList.add('text-root-iY-');
  textRoot.setAttribute('role', 'presentation');
  column.append(textRoot);

  const headerTicker = document.createElement('div');
  headerTicker.classList.add('header_ticker');
  textRoot.append(headerTicker);

  const tickerContainer = document.createElement('div');
  tickerContainer.classList.add('ticker_container');
  headerTicker.append(tickerContainer);

  const headerTickerLeft = document.createElement('div');
  headerTickerLeft.classList.add('header_ticker_left');
  tickerContainer.append(headerTickerLeft);

  const ulLeft = document.createElement('ul');
  headerTickerLeft.append(ulLeft);

  const liBlog = document.createElement('li');
  const aBlog = document.createElement('a');
  aBlog.setAttribute('tabindex', '0');
  aBlog.setAttribute('title', 'blog');
  aBlog.href = '/blog';
  aBlog.textContent = 'BLOGS';
  liBlog.append(aBlog);
  ulLeft.append(liBlog);

  const liCorporate = document.createElement('li');
  const aCorporate = document.createElement('a');
  aCorporate.setAttribute('tabindex', '0');
  aCorporate.href = '/corporate-gifting';
  aCorporate.textContent = 'CORPORATE GIFTING';
  liCorporate.append(aCorporate);
  ulLeft.append(liCorporate);

  const liTrack = document.createElement('li');
  const aTrack = document.createElement('a');
  aTrack.setAttribute('tabindex', '0');
  aTrack.href = '/track-order';
  aTrack.textContent = 'TRACK ORDER';
  liTrack.append(aTrack);
  ulLeft.append(liTrack);

  const headerTickerRight = document.createElement('div');
  headerTickerRight.classList.add('header_ticker_right');
  tickerContainer.append(headerTickerRight);

  const marquee = document.createElement('div');
  marquee.classList.add('marquee');
  headerTickerRight.append(marquee);

  const marqueeContent = document.createElement('div');
  marqueeContent.classList.add('marquee-content');
  marquee.append(marqueeContent);

  const pMarquee = document.createElement('p');
  pMarquee.textContent = 'Flat 10% off for first-time purchaser only on APP, use code- APP10 at the checkout';
  marqueeContent.append(pMarquee);

  const richContent2 = document.createElement('div');
  richContent2.classList.add('richContent-root-Byp');
  cmsBlockContent.append(richContent2);

  const htmlRootStyle1 = document.createElement('div');
  htmlRootStyle1.classList.add('html-root-Uwa');
  htmlRootStyle1.setAttribute('role', 'presentation');
  richContent2.append(htmlRootStyle1);

  const richContent3 = document.createElement('div');
  richContent3.classList.add('richContent-root-Byp');
  cmsBlockContent.append(richContent3);

  const htmlRootStyle2 = document.createElement('div');
  htmlRootStyle2.classList.add('html-root-Uwa');
  htmlRootStyle2.setAttribute('role', 'presentation');
  richContent3.append(htmlRootStyle2);

  const headerToolbar = document.createElement('div');
  headerToolbar.classList.add('header-toolbar--5w', 'border-0', 'gap-x-4', 'flex', 'h-14', 'items-center', 'max-w-site', 'w-full', 'lg_gap-x-8');
  header.append(headerToolbar);

  const headerPrimaryActions = document.createElement('div');
  headerPrimaryActions.classList.add('header-primaryActions-ku8', 'col-start-1', 'grid', 'grid-flow-col', 'justify-self-start', 'row-start-1', 'self-center', 'lg_hidden');
  headerToolbar.append(headerPrimaryActions);

  const navTrigger = document.createElement('button');
  navTrigger.classList.add('navTrigger-root-yIv', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'h-[3rem]', 'w-[3rem]', 'lg_hidden');
  navTrigger.setAttribute('aria-label', 'Toggle navigation panel');
  headerPrimaryActions.append(navTrigger);

  const iconRoot = document.createElement('span');
  iconRoot.classList.add('icon-root-cnm', 'items-center', 'inline-flex', 'justify-center');
  navTrigger.append(iconRoot);

  const navImg = document.createElement('img');
  navImg.alt = 'svg file';
  navImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774863123226.svg+xml';
  iconRoot.append(navImg);

  const headerLogoContainer = document.createElement('a');
  headerLogoContainer.classList.add('header-logoContainer-tkF', 'justify-self-center', 'lg_justify-self-start');
  headerLogoContainer.href = '/';
  headerToolbar.append(headerLogoContainer);

  const logoImg = document.createElement('img');
  logoImg.alt = 'svg file';
  logoImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774863123496.svg+xml';
  headerLogoContainer.append(logoImg);

  const searchBarRoot = document.createElement('div');
  searchBarRoot.classList.add('searchBar-root-o3R', 'items-center', 'justify-items-center', 'justify-self-center', 'lg_max-w-[40rem]', 'px-xs', 'py-0', 'w-full', 'relative');
  headerToolbar.append(searchBarRoot);

  const searchBarContainer = document.createElement('div');
  searchBarContainer.classList.add('searchBar-container-9Bc', 'inline-flex', 'items-center', 'justify-center', 'max-w-[40rem]', 'w-full');
  searchBarRoot.append(searchBarContainer);

  const searchForm = document.createElement('form');
  searchForm.classList.add('searchBar-form-osU', 'grid', 'items-center', 'justify-items-stretch', 'w-full');
  searchForm.autocomplete = 'off';
  searchBarContainer.append(searchForm);

  const searchAutocomplete = document.createElement('div');
  searchAutocomplete.classList.add('searchBar-autocomplete-eUC', 'grid', 'z-menu', 'absolute', 'w-full', 'top-0', 'absolute', 'left-0');
  searchForm.append(searchAutocomplete);

  const autocompleteRoot = document.createElement('div');
  autocompleteRoot.classList.add('autocomplete-root_hidden-J0b', 'autocomplete-root-bKa', 'bg-white', 'border-input', 'border-solid', 'border-t-0', 'grid', 'left-0', 'p-xs', 'right-0', 'rounded-b-md', 'rounded-t-none', 'text-sm', 'top-9', 'z-menu', 'invisible', 'opacity-0');
  searchAutocomplete.append(autocompleteRoot);

  const autocompleteMessage = document.createElement('div');
  autocompleteMessage.classList.add('autocomplete-message-VlL', 'px-3', 'py-0', 'text-center', 'text-subtle', 'max-w-site', 'w-full');
  autocompleteMessage.textContent = 'Search for a product';
  autocompleteRoot.append(autocompleteMessage);

  const autocompleteSuggestions = document.createElement('div');
  autocompleteSuggestions.classList.add('autocomplete-suggestions-zsO', 'gap-2xs', 'grid');
  autocompleteRoot.append(autocompleteSuggestions);

  const searchBarSearch = document.createElement('div');
  searchBarSearch.classList.add('searchBar-search-mB6', 'grid', 'relative');
  searchForm.append(searchBarSearch);

  const fieldIconsRoot = document.createElement('span');
  fieldIconsRoot.classList.add('fieldIcons-root-ecG', 'grid-flow-col', 'h-[2.5rem]', 'inline-grid', 'w-full');
  searchBarSearch.append(fieldIconsRoot);

  const fieldIconsInput = document.createElement('span');
  fieldIconsInput.classList.add('fieldIcons-input-Ced', 'items-center', 'flex');
  fieldIconsRoot.append(fieldIconsInput);

  const searchInput = document.createElement('input');
  searchInput.classList.add('textInput-input-Jz0', 'field-input-2Mu', 'appearance-none', 'bg-white', 'border-2', 'border-solid', 'border-input', 'flex-textInput', 'h-[2.5rem]', 'inline-flex', 'm-0', 'max-w-full', 'rounded-input', 'text-colorDefault', 'w-full', 'focus_outline-none', 'focus_shadow-inputFocus', 'disabled_text-subtle');
  searchInput.placeholder = "Search for Keywords: 'jacket', 'fleece' etc";
  searchInput.id = 'e9ee1f3f-b058-4035-98e1-4000e35cd003';
  searchInput.name = 'search_query';
  searchInput.value = '';
  fieldIconsInput.append(searchInput);

  const fieldIconsBefore = document.createElement('span');
  fieldIconsBefore.classList.add('fieldIcons-before-G3M', 'flex', 'items-center', 'justify-center', 'mx-0.5', 'my-0', 'pointer-events-none', 'w-[2.5rem]', 'z-foreground');
  fieldIconsRoot.append(fieldIconsBefore);

  const searchIconImg = document.createElement('img');
  searchIconImg.alt = 'svg file';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774863123610.svg+xml';
  fieldIconsBefore.append(searchIconImg);

  const fieldIconsAfter = document.createElement('span');
  fieldIconsAfter.classList.add('fieldIcons-after-xwp', 'flex', 'items-center', 'justify-center', 'mx-0.5', 'my-0', 'pointer-events-none', 'w-[2.5rem]', 'z-foreground');
  fieldIconsRoot.append(fieldIconsAfter);

  const messageRoot = document.createElement('p');
  messageRoot.classList.add('message-root-B-9', 'font-normal', 'leading-none', 'pb-0.5', 'px-0.5', 'text-colorDefault');
  searchBarSearch.append(messageRoot);

  const headerSecondaryActions = document.createElement('div');
  headerSecondaryActions.classList.add('header-secondaryActions-U01', 'grid', 'grid-flow-col', 'items-center', 'justify-items-end', 'justify-self-end', 'w-max', 'lg_gap-x-4');
  headerToolbar.append(headerSecondaryActions);

  const accountTriggerRoot = document.createElement('div');
  accountTriggerRoot.classList.add('accountTrigger-root-7Dr', 'hidden', 'items-center', 'h-lg', 'sm_grid');
  headerSecondaryActions.append(accountTriggerRoot);

  const accountTriggerLink = document.createElement('a');
  accountTriggerLink.classList.add('accountTrigger-trigger-YDx', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'h-[2rem]', 'min-w-[2rem]', 'z-foreground');
  accountTriggerLink.setAttribute('aria-label', 'Toggle My Account Menu');
  accountTriggerLink.href = '/sign-in';
  accountTriggerRoot.append(accountTriggerLink);

  const accountChip = document.createElement('span');
  accountChip.classList.add('accountChip-root-biX', 'grid', 'grid-flow-col', 'items-center');
  accountTriggerLink.append(accountChip);

  const accountChipText = document.createElement('span');
  accountChipText.classList.add('accountChip-text-6Zl');
  accountChip.append(accountChipText);

  const accountIconImg = document.createElement('img');
  accountIconImg.alt = 'svg file';
  accountIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774863123650.svg+xml';
  accountChip.append(accountIconImg);

  const accountMenu = document.createElement('aside');
  accountMenu.classList.add('accountMenu-root-D2y', 'absolute', 'h-0', 'left-[-100vw]', 'max-w-[100vw]', 'opacity-0', 'overflow-visible', 'top-full', 'z-menu');
  headerSecondaryActions.append(accountMenu);

  const accountMenuContents = document.createElement('div');
  accountMenuContents.classList.add('accountMenu-contents-Du2', 'absolute', 'bg-white', 'grid', 'right-0', 'rounded-sm', 'shadow-menu', 'top-0', 'w-[27.5rem]');
  accountMenu.append(accountMenuContents);

  const headerWishlist = document.createElement('a');
  headerWishlist.classList.add('header-headerWishlist-y3r');
  headerWishlist.setAttribute('aria-label', 'wishlist');
  headerWishlist.setAttribute('title', 'Wishlist');
  headerWishlist.href = '/wishlist';
  headerSecondaryActions.append(headerWishlist);

  const wishlistImg = document.createElement('img');
  wishlistImg.alt = 'svg file';
  wishlistImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774863123700.svg+xml';
  headerWishlist.append(wishlistImg);

  const noDisplayText = document.createElement('span');
  noDisplayText.classList.add('header-noDisplay-tBq');
  noDisplayText.textContent = 'Wishlist';
  headerWishlist.append(noDisplayText);

  const cartTriggerContainer = document.createElement('div');
  cartTriggerContainer.classList.add('cartTrigger-triggerContainer-FZE', 'hidden', 'items-center', 'h-lg', 'lg_grid');
  headerSecondaryActions.append(cartTriggerContainer);

  const cartTriggerLink = document.createElement('a');
  cartTriggerLink.classList.add('cartTrigger-trigger-VfJ', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'content-center', 'flex', 'h-[2rem]', 'justify-center', 'min-w-[2rem]', 'relative', 'z-foreground');
  cartTriggerLink.setAttribute('aria-label', 'Toggle mini cart. You have 0 items in your cart.');
  cartTriggerLink.href = '';
  cartTriggerContainer.append(cartTriggerLink);

  const cartHeaderSpan = document.createElement('span');
  cartHeaderSpan.classList.add('cartTrigger-cart_header_span-jAj');
  cartTriggerLink.append(cartHeaderSpan);

  const cartImg = document.createElement('img');
  cartImg.alt = 'svg file';
  cartImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774863123827.svg+xml';
  cartHeaderSpan.append(cartImg);

  const miniCartButton = document.createElement('button');
  miniCartButton.classList.add('cartTrigger-link-mIb', 'cartTrigger-trigger-VfJ', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'content-center', 'flex', 'h-[2rem]', 'justify-center', 'min-w-[2rem]', 'relative', 'z-foreground', 'flex', 'lg_hidden');
  miniCartButton.id = 'miniCartLink';
  miniCartButton.setAttribute('aria-label', 'Toggle mini cart. You have 0 items in your cart.');
  headerSecondaryActions.append(miniCartButton);

  const miniCartSpan = document.createElement('span');
  miniCartSpan.classList.add('cartTrigger-cart_header_span-jAj');
  miniCartButton.append(miniCartSpan);

  const miniCartImg = document.createElement('img');
  miniCartImg.alt = 'svg file';
  miniCartImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774863123827.svg+xml';
  miniCartSpan.append(miniCartImg);

  const miniCartAside = document.createElement('aside');
  miniCartAside.id = 'miniCartTrigger';
  miniCartAside.classList.add('miniCart-root_closed-G6m', 'miniCart-root-DSC', 'fixed');
  headerSecondaryActions.append(miniCartAside);

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

  const emptyCart = document.createElement('div');
  emptyCart.classList.add('miniCart-emptyCart-Smo', 'gap-md', 'grid', 'p-md');
  miniCartContents.append(emptyCart);

  const emptyMessage = document.createElement('div');
  emptyMessage.classList.add('miniCart-emptyMessage-eLo', 'font-bold', 'm-auto');
  emptyMessage.textContent = 'There are no items in your cart.';
  emptyCart.append(emptyMessage);

  const hiddenSpan = document.createElement('span');
  hiddenSpan.hidden = true;
  hiddenSpan.setAttribute('role', 'status');
  hiddenSpan.setAttribute('aria-hidden', 'false');
  hiddenSpan.setAttribute('aria-live', 'polite');
  hiddenSpan.textContent = 'There are no items in your cart.';
  emptyMessage.append(hiddenSpan);

  const headerCustomMenu = document.createElement('div');
  headerCustomMenu.classList.add('header-customemenu-QSk');
  header.append(headerCustomMenu);

  const cmsBlockRoot2 = document.createElement('div');
  cmsBlockRoot2.classList.add('cmsBlock-root-rsi');
  headerCustomMenu.append(cmsBlockRoot2);

  const cmsBlockContent2 = document.createElement('div');
  cmsBlockContent2.classList.add('cmsBlock-content-BTy');
  cmsBlockRoot2.append(cmsBlockContent2);

  const richContent4 = document.createElement('div');
  richContent4.classList.add('richContent-root-Byp');
  cmsBlockContent2.append(richContent4);

  const richContent5 = document.createElement('div');
  richContent5.classList.add('richContent-root-Byp');
  cmsBlockContent2.append(richContent5);

  const rowContained2 = document.createElement('div');
  rowContained2.classList.add('row-contained-PD6', 'row-root-rPq');
  richContent5.append(rowContained2);

  const flexCol2 = document.createElement('div');
  flexCol2.classList.add('flex-col-start');
  rowContained2.append(flexCol2);

  const textRootMegaMenu = document.createElement('div');
  textRootMegaMenu.classList.add('text-root-iY-', 'megaMenu');
  textRootMegaMenu.setAttribute('role', 'presentation');
  flexCol2.append(textRootMegaMenu);

  const mainMenu = document.createElement('ul');
  mainMenu.classList.add('mainMenu');
  textRootMegaMenu.append(mainMenu);

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('isSubmenu');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a') && cell.textContent.trim() !== '');
    const submenuCell = cells.find(cell => cell.children.length > 0 && !cell.querySelector('a') && cell.textContent.trim() === ''); // Assuming submenu cell contains complex HTML and no direct link/label

    const a = document.createElement('a');
    a.setAttribute('tabindex', '0');

    if (linkCell) {
      const linkEl = linkCell.querySelector('a');
      if (linkEl) {
        a.href = linkEl.href;
        a.textContent = labelCell ? labelCell.textContent : linkEl.textContent; // Use label cell for text content if available
        // Check for 'Sale' link to apply specific style
        if (linkEl.href.includes('/sale')) {
          a.classList.add('sale-link-style');
        }
      }
    } else if (labelCell) {
      a.textContent = labelCell.textContent;
    }

    // Check if it's the 'wiki for life' link with an image
    if (a.href.includes('/wikiforlife')) {
      a.classList.add('teens-image');
      a.setAttribute('aria-label', 'wiki for life');
      const img = document.createElement('img');
      img.classList.add('wiki-logo-img');
      img.src = '/content/dam/aemigrate/uploaded-folder/image/wiki-logo.jpeg';
      img.alt = 'Wiki';
      img.width = '181';
      img.height = '30';
      img.loading = 'eager';
      a.append(img);
    }
    li.append(a);

    // Submenu handling (simplified, as actual submenu content is complex HTML)
    if (submenuCell && submenuCell.innerHTML.trim() !== '') {
      const subMenu = document.createElement('ul');
      subMenu.classList.add('subMenu');
      const subMenuContent = document.createElement('li');
      subMenuContent.classList.add('oneColumn', 'wideItems');
      subMenuContent.innerHTML = submenuCell.innerHTML; // Copy raw HTML for complex submenus
      subMenu.append(subMenuContent);
      li.append(subMenu);
    }

    mainMenu.append(li);
  });

  const richContent6 = document.createElement('div');
  richContent6.classList.add('richContent-root-Byp');
  cmsBlockContent2.append(richContent6);

  const htmlRootStyle3 = document.createElement('div');
  htmlRootStyle3.classList.add('html-root-Uwa');
  htmlRootStyle3.setAttribute('role', 'presentation');
  richContent6.append(htmlRootStyle3);

  // Image optimization for any images that might be in the submenu content
  header.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(header);

  // Event listeners for interactive elements (simplified examples)
  const navbarCollapse = header.querySelector('.header-customemenu-QSk');
  const navToggler = header.querySelector('.navTrigger-root-yIv');
  if (navToggler && navbarCollapse) {
    navToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
      navToggler.classList.toggle('collapsed');
      header.classList.toggle('header-closed-qbE');
    });
  }

  const miniCartModal = header.querySelector('#miniCartTrigger');
  const miniCartOpenBtn = header.querySelector('#miniCartLink');
  const miniCartCloseBtn = header.querySelector('.miniCart-closeBtn-EAD');

  if (miniCartOpenBtn && miniCartModal) {
    miniCartOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      miniCartModal.classList.remove('miniCart-root_closed-G6m');
      miniCartModal.classList.add('miniCart-root-DSC');
    });
  }

  if (miniCartCloseBtn && miniCartModal) {
    miniCartCloseBtn.addEventListener('click', () => {
      miniCartModal.classList.add('miniCart-root_closed-G6m');
      miniCartModal.classList.remove('miniCart-root-DSC');
    });
  }
}
