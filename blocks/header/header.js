import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const header = document.createElement('header');
  header.classList.add('header-closed-qbE', 'header-root-BAU', 'auto-cols-fr', 'bg-header', 'border-b', 'border-subtle', 'grid', 'h-auto', 'justify-center', 'top-0', 'sticky', 'w-full', 'z-header');

  const topBar = document.createElement('div');
  topBar.classList.add('header-topBar-fS-');
  header.append(topBar);

  const cmsBlockRoot = document.createElement('div');
  cmsBlockRoot.classList.add('cmsBlock-root-rsi');
  topBar.append(cmsBlockRoot);

  const cmsBlockContent = document.createElement('div');
  cmsBlockContent.classList.add('cmsBlock-content-BTy');
  cmsBlockRoot.append(cmsBlockContent);

  const richContent1 = document.createElement('div');
  richContent1.classList.add('richContent-root-Byp');
  cmsBlockContent.append(richContent1);

  const rowContained1 = document.createElement('div');
  rowContained1.classList.add('row-contained-PD6', 'row-root-rPq');
  richContent1.append(rowContained1);

  const flexCol1 = document.createElement('div');
  flexCol1.style.display = 'flex';
  flexCol1.style.justifyContent = 'flex-start';
  flexCol1.style.flexDirection = 'column';
  rowContained1.append(flexCol1);

  const columnGroup = document.createElement('div');
  columnGroup.classList.add('columnGroup-root-JjC');
  flexCol1.append(columnGroup);

  const columnLine = document.createElement('div');
  columnLine.classList.add('columnLine-root-khs');
  columnLine.style.display = 'flex';
  columnGroup.append(columnLine);

  const column = document.createElement('div');
  column.classList.add('column-root-INf', 'pagebuilder-column');
  column.style.alignSelf = 'stretch';
  column.style.display = 'flex';
  column.style.flexDirection = 'column';
  column.style.justifyContent = 'flex-start';
  column.style.width = '100%';
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

  const blogLi = document.createElement('li');
  const blogLink = document.createElement('a');
  blogLink.setAttribute('tabindex', '0');
  blogLink.setAttribute('title', 'blog');
  blogLink.href = '/blog';
  blogLink.textContent = 'BLOGS';
  blogLi.append(blogLink);
  ulLeft.append(blogLi);

  const corporateGiftingLi = document.createElement('li');
  const corporateGiftingLink = document.createElement('a');
  corporateGiftingLink.setAttribute('tabindex', '0');
  corporateGiftingLink.href = '/corporate-gifting';
  corporateGiftingLink.textContent = 'CORPORATE GIFTING';
  corporateGiftingLi.append(corporateGiftingLink);
  ulLeft.append(corporateGiftingLi);

  const trackOrderLi = document.createElement('li');
  const trackOrderLink = document.createElement('a');
  trackOrderLink.setAttribute('tabindex', '0');
  trackOrderLink.href = '/track-order';
  trackOrderLink.textContent = 'TRACK ORDER';
  trackOrderLi.append(trackOrderLink);
  ulLeft.append(trackOrderLi);

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
  marqueeContent.innerHTML = '<p style="font-size: 12px; line-height: 14px; padding-top: 2px;"><strong>Flat 10% off for first-time purchaser only on APP, use code- APP10 at the checkout</strong></p>';
  marquee.append(marqueeContent);

  const richContent2 = document.createElement('div');
  richContent2.classList.add('richContent-root-Byp');
  cmsBlockContent.append(richContent2);

  const htmlRoot1 = document.createElement('div');
  htmlRoot1.classList.add('html-root-Uwa');
  htmlRoot1.setAttribute('role', 'presentation');
  htmlRoot1.innerHTML = `
    <style>
    div[class*="category-bottomDescriptionInner"] {
        padding: 0 1rem;
    }
    .item-promoOffer-pXp {
        background: none;
        -webkit-background-clip: inherit;
        -webkit-text-fill-color: inherit;
        font-size: 13px;
    }

    .item-promoOffer-pXp li {
        list-style: none;
    }

    .item-promoOffer-pXp .promo-itemContent span {
        border-color: #000000;
        border-image: linear-gradient(var(--angle), #000000, #000000) 1;
        color: #000000;
    }
    .item-productItem-Pnf {
        grid-template-columns: minmax(0, 1fr);
    }
    .QuickviewFullDetail-cartActions-gMW button {
        color: #ffffff;
    }
    .QuickviewFullDetail-cartActions-gMW button {
        color: #ffffff;
    }
    .password-passwordButton-bcY {
        min-width: 100%;
    }
    @media (max-width: 767px) {
    .thumbnail-root-HnQ {
        border-radius: 10px;
        height: 225px;
        width: 160px;
    }

        .carousel-carouselContainer-Wkv {
            display: flex;
        }

    .QuickviewFullDetail-colorOptions-pMQ {
        width: 100%;
    }

    .QuickviewFullDetail-colorVariants-Js- {
        padding: 0;
    }

    .QuickviewFullDetail-colorSwatches-qEW {
        text-align: left !important;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .QuickviewFullDetail-colorTitle-wvg {
        text-align: left;
    }
    }
    @media (max-width: 767px) {
    .priceRange-saleBadge-Var {
        font-size: 11px;
    }
    .emptyCart-actions-Ug7 a.emptyCart-action-WLh {
        min-width: auto;
        padding-left: 10px;
        padding-right: 10px;
    }

    .emptyCart-actions-Ug7 {
        grid-gap: 10px;
    }

    .cartPage-body-SRz {
        grid-template-columns: minmax(0, 1fr);
        column-gap: 0;
        row-gap: 1rem;
    }
        .cartPage-recommendationRoot-Z99 {
            padding: 0 0;
        }
    .header_ticker_right {
        width: 100%;
    }
    }
    @media (max-width: 400px) {
    .priceRange-priceWrapper-tzD {
        font-size: 11px;
    }
    }
    li[class*="productSort-menuItem"]:last-child {
        display: none;
    }
    </style>
  `;
  cmsBlockContent.append(htmlRoot1);

  const richContent3 = document.createElement('div');
  richContent3.classList.add('richContent-root-Byp');
  cmsBlockContent.append(richContent3);

  const htmlRoot2 = document.createElement('div');
  htmlRoot2.classList.add('html-root-Uwa');
  htmlRoot2.setAttribute('role', 'presentation');
  htmlRoot2.innerHTML = `
    <style>
    .marquee {
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
    }

    .marquee-content {
      display: inline-block;
      padding-left: 100%;
      animation: scroll 30s linear infinite;
    }
    .marquee-content:hover {
      animation-play-state: paused;
    }
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-100%);
      }
    }
    </style>
  `;
  cmsBlockContent.append(htmlRoot2);

  const toolbar = document.createElement('div');
  toolbar.classList.add('header-toolbar--5w', 'border-0', 'gap-x-4', 'flex', 'h-14', 'items-center', 'max-w-site', 'w-full', 'lg_gap-x-8');
  header.append(toolbar);

  const primaryActions = document.createElement('div');
  primaryActions.classList.add('header-primaryActions-ku8', 'col-start-1', 'grid', 'grid-flow-col', 'justify-self-start', 'row-start-1', 'self-center', 'lg_hidden');
  toolbar.append(primaryActions);

  const navTrigger = document.createElement('button');
  navTrigger.classList.add('navTrigger-root-yIv', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'h-[3rem]', 'w-[3rem]', 'lg_hidden');
  navTrigger.setAttribute('aria-label', 'Toggle navigation panel');
  primaryActions.append(navTrigger);

  const iconSpan = document.createElement('span');
  iconSpan.classList.add('icon-root-cnm', 'items-center', 'inline-flex', 'justify-center');
  navTrigger.append(iconSpan);

  const navToggleImg = document.createElement('img');
  navToggleImg.alt = 'svg file';
  navToggleImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774855953506.svg+xml';
  iconSpan.append(navToggleImg);

  const logoContainer = document.createElement('a');
  logoContainer.classList.add('header-logoContainer-tkF', 'justify-self-center', 'lg_justify-self-start');
  logoContainer.href = '/';
  toolbar.append(logoContainer);

  const logoImg = document.createElement('img');
  logoImg.alt = 'svg file';
  logoImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774855953631.svg+xml';
  logoContainer.append(logoImg);

  const searchBar = document.createElement('div');
  searchBar.classList.add('searchBar-root-o3R', 'items-center', 'justify-items-center', 'justify-self-center', 'lg_max-w-[40rem]', 'px-xs', 'py-0', 'w-full', 'relative');
  toolbar.append(searchBar);

  const searchBarContainer = document.createElement('div');
  searchBarContainer.classList.add('searchBar-container-9Bc', 'inline-flex', 'items-center', 'justify-center', 'max-w-[40rem]', 'w-full');
  searchBar.append(searchBarContainer);

  const searchForm = document.createElement('form');
  searchForm.autocomplete = 'off';
  searchForm.classList.add('searchBar-form-osU', 'grid', 'items-center', 'justify-items-stretch', 'w-full');
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
  fieldIconsRoot.style.setProperty('--iconsBefore', '1');
  fieldIconsRoot.style.setProperty('--iconsAfter', '0');
  searchBarSearch.append(fieldIconsRoot);

  const fieldIconsInput = document.createElement('span');
  fieldIconsInput.classList.add('fieldIcons-input-Ced', 'items-center', 'flex');
  fieldIconsRoot.append(fieldIconsInput);

  const searchInput = document.createElement('input');
  searchInput.placeholder = "Search for Keywords: 'jacket', 'fleece' etc";
  searchInput.classList.add('textInput-input-Jz0', 'field-input-2Mu', 'appearance-none', 'bg-white', 'border-2', 'border-solid', 'border-input', 'flex-textInput', 'h-[2.5rem]', 'inline-flex', 'm-0', 'max-w-full', 'rounded-input', 'text-colorDefault', 'w-full', 'focus_outline-none', 'focus_shadow-inputFocus', 'disabled_text-subtle');
  searchInput.id = 'b64f831a-7645-4c34-96af-201150c3d1bd';
  searchInput.name = 'search_query';
  searchInput.value = '';
  fieldIconsInput.append(searchInput);

  const fieldIconsBefore = document.createElement('span');
  fieldIconsBefore.classList.add('fieldIcons-before-G3M', 'flex', 'items-center', 'justify-center', 'mx-0.5', 'my-0', 'pointer-events-none', 'w-[2.5rem]', 'z-foreground');
  const searchIcon = document.createElement('img');
  searchIcon.alt = 'svg file';
  searchIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774855953709.svg+xml';
  fieldIconsBefore.append(searchIcon);
  fieldIconsRoot.append(fieldIconsBefore);

  const fieldIconsAfter = document.createElement('span');
  fieldIconsAfter.classList.add('fieldIcons-after-xwp', 'flex', 'items-center', 'justify-center', 'mx-0.5', 'my-0', 'pointer-events-none', 'w-[2.5rem]', 'z-foreground');
  fieldIconsRoot.append(fieldIconsAfter);

  const messageRoot = document.createElement('p');
  messageRoot.classList.add('message-root-B-9', 'font-normal', 'leading-none', 'pb-0.5', 'px-0.5', 'text-colorDefault');
  searchBarSearch.append(messageRoot);

  const secondaryActions = document.createElement('div');
  secondaryActions.classList.add('header-secondaryActions-U01', 'grid', 'grid-flow-col', 'items-center', 'justify-items-end', 'justify-self-end', 'w-max', 'lg_gap-x-4');
  toolbar.append(secondaryActions);

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
  accountIcon.alt = 'svg file';
  accountIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774855953776.svg+xml';
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
  wishlistIcon.alt = 'svg file';
  wishlistIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774855953880.svg+xml';
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
  cartIcon.alt = 'svg file';
  cartIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774855953974.svg+xml';
  cartHeaderSpan.append(cartIcon);

  const miniCartButton = document.createElement('button');
  miniCartButton.classList.add('cartTrigger-link-mIb', 'cartTrigger-trigger-VfJ', 'clickable-root-sDL', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-none', 'pointer-events-auto', 'text-center', 'content-center', 'flex', 'h-[2rem]', 'justify-center', 'min-w-[2rem]', 'relative', 'z-foreground', 'flex', 'lg_hidden');
  miniCartButton.setAttribute('aria-label', 'Toggle mini cart. You have 0 items in your cart.');
  miniCartButton.id = 'miniCartLink';
  secondaryActions.append(miniCartButton);

  const miniCartSpan = document.createElement('span');
  miniCartSpan.classList.add('cartTrigger-cart_header_span-jAj');
  miniCartButton.append(miniCartSpan);

  const miniCartIcon = document.createElement('img');
  miniCartIcon.alt = 'svg file';
  miniCartIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1774855953974.svg+xml';
  miniCartSpan.append(miniCartIcon);

  const miniCartAside = document.createElement('aside');
  miniCartAside.id = 'miniCartTrigger';
  miniCartAside.classList.add('miniCart-root_closed-G6m', 'miniCart-root-DSC', 'fixed');
  secondaryActions.append(miniCartAside);

  const miniCartContents = document.createElement('div');
  miniCartContents.classList.add('miniCart-contents-maG', 'absolute', 'bg-white', 'grid', 'max-h-[100%]', 'overflow-hidden', 'right-0', 'rounded-0', 'top-0', 'w-[25rem]');
  miniCartAside.append(miniCartContents);

  const miniCartHeader = document.createElement('div');
  miniCartHeader.classList.add('miniCart-header-92Q', 'border-b-2', 'border-solid', 'border-light', 'font-bold', 'gap-y-xs', 'grid', 'grid-cols-autoLast', 'items-center', 'leading-tight', 'my-0', 'py-xs', 'px-2xs', 'text-md');
  miniCartHeader.innerHTML = '<span>My Bag</span><span class="miniCart-closeBtn-EAD">Close</span>';
  miniCartContents.append(miniCartHeader);

  const miniCartEmpty = document.createElement('div');
  miniCartEmpty.classList.add('miniCart-emptyCart-Smo', 'gap-md', 'grid', 'p-md');
  miniCartEmpty.innerHTML = '<div class="miniCart-emptyMessage-eLo font-bold m-auto">There are no items in your cart.<span hidden="" role="status" aria-hidden="false" aria-live="polite">There are no items in your cart.</span></div>';
  miniCartContents.append(miniCartEmpty);

  const customMenu = document.createElement('div');
  customMenu.classList.add('header-customemenu-QSk');
  header.append(customMenu);

  const cmsBlockRoot2 = document.createElement('div');
  cmsBlockRoot2.classList.add('cmsBlock-root-rsi');
  customMenu.append(cmsBlockRoot2);

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
  flexCol2.style.display = 'flex';
  flexCol2.style.justifyContent = 'flex-start';
  flexCol2.style.flexDirection = 'column';
  rowContained2.append(flexCol2);

  const megaMenuTextRoot = document.createElement('div');
  megaMenuTextRoot.classList.add('text-root-iY-', 'megaMenu');
  megaMenuTextRoot.setAttribute('role', 'presentation');
  flexCol2.append(megaMenuTextRoot);

  const mainMenuUl = document.createElement('ul');
  mainMenuUl.classList.add('mainMenu');
  megaMenuTextRoot.append(mainMenuUl);

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('isSubmenu');
    moveInstrumentation(row, li);

    // According to BlockJson, each item row has two cells: label (text) and link (aem-content)
    const labelCell = row.children[0];
    const linkCell = row.children[1];

    if (linkCell && linkCell.querySelector('a')) {
      const a = document.createElement('a');
      a.setAttribute('tabindex', '0');
      a.href = linkCell.querySelector('a').href;
      a.textContent = labelCell.textContent; // Use label cell's text content for the link text
      li.append(a);
    } else if (labelCell) {
      const span = document.createElement('span');
      span.textContent = labelCell.textContent;
      li.append(span);
    }

    mainMenuUl.append(li);
  });

  const richContent6 = document.createElement('div');
  richContent6.classList.add('richContent-root-Byp');
  cmsBlockContent2.append(richContent6);

  const htmlRoot3 = document.createElement('div');
  htmlRoot3.classList.add('html-root-Uwa');
  htmlRoot3.setAttribute('role', 'presentation');
  htmlRoot3.innerHTML = `
    <style>
    @media (min-width: 960px){
    .fiveCol {
        margin: 0 !important;
        padding: 0 !important;
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        grid-gap: 1rem;
    }}
    @media (max-width: 767px){
    .item-root-NyK .item-new_sale_strip--2C .item-wedgeNewColor--KU {
        font-size: 10px;
        padding: 4px 5px;
    }
    }
    </style>
  `;
  cmsBlockContent2.append(htmlRoot3);

  block.textContent = '';
  block.append(header);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Toggle functionality for mobile nav
  const navbarCollapse = mainMenuUl; // Assuming mainMenuUl is the collapsible menu
  navTrigger.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show'); // 'show' class for visible state
    navTrigger.classList.toggle('navTrigger-root_open-ABC'); // Toggle class for button state
  });

  // Mini cart toggle functionality
  const miniCartModal = miniCartAside;
  miniCartButton.addEventListener('click', () => {
    miniCartModal.classList.add('miniCart-root_open-ABC'); // Add class to show modal
    miniCartModal.classList.remove('miniCart-root_closed-G6m');
  });

  const miniCartCloseBtn = miniCartHeader.querySelector('.miniCart-closeBtn-EAD');
  if (miniCartCloseBtn) {
    miniCartCloseBtn.addEventListener('click', () => {
      miniCartModal.classList.remove('miniCart-root_open-ABC');
      miniCartModal.classList.add('miniCart-root_closed-G6m');
    });
  }

  miniCartModal.addEventListener('click', (e) => {
    if (e.target === miniCartModal) {
      miniCartModal.classList.remove('miniCart-root_open-ABC');
      miniCartModal.classList.add('miniCart-root_closed-G6m');
    }
  });

  // Account menu toggle functionality
  const accountMenuElement = accountMenu;
  accountTriggerLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link navigation
    accountMenuElement.classList.toggle('accountMenu-root_open-ABC'); // Assuming 'accountMenu-root_open-ABC' is the class to show the menu
    accountMenuElement.classList.toggle('opacity-0'); // Toggle opacity for visibility
    accountMenuElement.classList.toggle('invisible'); // Toggle visibility
    accountMenuElement.classList.toggle('h-0'); // Toggle height
    accountMenuElement.classList.toggle('left-[-100vw]'); // Toggle position
  });
}
