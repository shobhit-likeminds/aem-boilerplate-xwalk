import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...itemRows] = [...block.children];

  const header = document.createElement('header');
  header.classList.add('bg-surface-navbar', 'border-b', 'border-b-stroke-muted', 'z-desktop-nav', 'relative');
  header.setAttribute('data-nav-header', '');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'py-3');
  header.append(containerDiv);

  const nav = document.createElement('nav');
  nav.setAttribute('data-desktop-menu-wrapper', '');
  nav.setAttribute('aria-label', 'Main menu');
  nav.classList.add('lg:grid-full', 'flex', 'justify-between', 'gap-2', 'lg:gap-grid-gutter');
  containerDiv.append(nav);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('col-start-1', '[.nav-shrunk_&]:max-h-[30px]', 'max-h-[60px]', 'flex', 'items-center', 'justify-start');
  nav.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('inline-flex', 'items-center', 'shrink-0', '[[data-mobile-menu]_&]:outline-none', 'not-[[data-mobile-menu]_&]:theme-focus-outline', 'dark-mode:bg-denali', 'dark-mode:py-0.5', 'dark-mode:px-0.5', 'forced-colors:px-0.5', 'forced-colors:py-0.5', 'forced-colors:bg-[CanvasText]!');
  logoLink.setAttribute('data-brand-logo-link', '');

  const srOnlySpan = document.createElement('span');
  srOnlySpan.classList.add('sr-only');
  srOnlySpan.textContent = logoLinkLabelRow.textContent.trim();
  logoLink.append(srOnlySpan);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '60' }]);
    moveInstrumentation(logoPicture, optimizedPic);
    logoLink.append(optimizedPic);
  }

  const logoHref = logoLinkRow.querySelector('a');
  if (logoHref) {
    logoLink.href = logoHref.href;
  } else {
    logoLink.href = '/'; // Default to home if no link provided
  }
  logoWrapper.append(logoLink);

  const menuWrapper = document.createElement('div');
  menuWrapper.classList.add('lg:col-start-2', 'lg:col-span-14', 'flex', 'justify-start', 'items-center');
  nav.append(menuWrapper);

  const menuInner = document.createElement('div');
  menuInner.classList.add('flex', 'justify-between', 'items-center', 'gap-4', 'xl:gap-grid-gutter', 'w-full');
  menuWrapper.append(menuInner);

  // Desktop Menu
  const desktopMenu = document.createElement('div');
  desktopMenu.classList.add('hidden', 'lg:flex', 'justify-center', 'items-center');
  desktopMenu.setAttribute('data-desktop-menu', '');
  menuInner.append(desktopMenu);

  const primaryNavUl = document.createElement('ul');
  primaryNavUl.classList.add('flex', 'flex-row', 'justify-center', 'items-center', 'lg:gap-6', 'xl:gap-8');
  primaryNavUl.setAttribute('data-primary-nav', '');
  desktopMenu.append(primaryNavUl);

  // Filter item rows based on cell count for 'nav-section' (5 cells) and 'nav-primary-action' (2 cells)
  const navSections = itemRows.filter((row) => [...row.children].length === 5);
  const primaryActions = itemRows.filter((row) => [...row.children].length === 2);

  navSections.forEach((row, index) => {
    const cells = [...row.children];
    const sectionLabelCell = cells[0];
    const linksContainerCell = cells[1];
    const highlightCardsContainerCell = cells[2];
    const footerLinkCell = cells[3];
    const footerLinkLabelCell = cells[4];

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('group', 'list-none', 'leading-[1.1]');
    li.setAttribute('data-has-subnav', '');
    primaryNavUl.append(li);

    const sectionButton = document.createElement('button');
    sectionButton.classList.add('lg:text-16', 'xl:text-18', 'link', 'group/nav-link', 'text-foreground', 'text-start', 'lg:text-15', 'xl:text-16', 'no-underline', 'font-semibold', 'inline-flex', 'flex-row', 'items-start', 'justify-start', 'gap-2', 'forced-colors:text-[ButtonText]', 'hocus:underline', 'hocus:text-brand-1', 'hocus:underline-offset-8', 'group-[.active]:underline', 'group-[.active]:text-brand-1', 'group-[.active]:decoration-[3px]', 'group-[.active]:underline-offset-8', 'motion-safe:not-focus-visible:transition-underline');
    sectionButton.setAttribute('aria-expanded', 'false');
    sectionButton.setAttribute('data-open-subnav', '');
    const subnavId = `subnav-${index}`;
    sectionButton.setAttribute('aria-controls', subnavId);
    sectionButton.textContent = sectionLabelCell.textContent.trim();
    li.append(sectionButton);

    const arrowDiv = document.createElement('div');
    arrowDiv.classList.add('group-[.active]:-rotate-180', 'motion-safe:transition-transform', 'will-change-transform', 'flex', 'h-[1lh]', 'items-center');
    const arrowImg = document.createElement('img');
    arrowImg.alt = 'svg file';
    arrowImg.src = '/icons/arrow-down.svg'; // Placeholder for SVG, actual path will be resolved by AEM
    arrowDiv.append(arrowImg);
    sectionButton.append(arrowDiv);

    const subnavDiv = document.createElement('div');
    subnavDiv.classList.add('transition-display', 'max-lg:overflow-auto', 'max-lg:w-full', 'max-lg:h-[calc(100dvh-var(--navbar-height))]', 'duration-200', 'hidden', 'allow-discrete', 'opacity-0', 'starting:group-[.active]:opacity-0', 'group-[.active]:opacity-100', 'group-[.active]:block', 'absolute', 'bg-surface-navbar', 'inset-x-0', 'top-full', 'py-12', 'lg:py-2xl', 'shadow-md', 'border-t', 'border-t-stroke-muted');
    subnavDiv.setAttribute('data-subnav', '');
    subnavDiv.setAttribute('data-testid', `primary-action-nav-${index + 1}-mega`);
    subnavDiv.id = subnavId;
    li.append(subnavDiv);

    const subnavContainer = document.createElement('div');
    subnavContainer.classList.add('container', 'grid-full');
    subnavDiv.append(subnavContainer);

    const subnavGridCentered = document.createElement('div');
    subnavGridCentered.classList.add('grid-centered-12', 'w-full');
    subnavContainer.append(subnavGridCentered);

    const subnavGrid = document.createElement('div');
    subnavGrid.classList.add('grid', 'grid-cols-1', 'lg:grid-cols-12', 'gap-13', 'lg:gap-grid-gutter');
    subnavGrid.setAttribute('data-animated', '');
    subnavGridCentered.append(subnavGrid);

    const mobileSectionTitle = document.createElement('div');
    mobileSectionTitle.classList.add('w-full', 'text-h6', 'lg:hidden', 'animated-fade-in-up');
    mobileSectionTitle.textContent = sectionLabelCell.textContent.trim();
    subnavGrid.append(mobileSectionTitle);

    // Links container
    const linksWrapper = document.createElement('div');
    linksWrapper.classList.add('animated-fade-in-up', 'lg:col-span-4');
    subnavGrid.append(linksWrapper);

    const linksContent = document.createElement('div');
    linksContent.classList.add('not-last:mb-md', 'md:mb-0', 'flex', 'flex-col');
    linksWrapper.append(linksContent);

    const linksTitle = linksContainerCell.querySelector('p');
    if (linksTitle) {
      const p = document.createElement('p');
      p.classList.add('mb-xs', 'text-15', 'xl:text-p2', 'font-stretch-normal', 'font-bold', 'text-foreground-strong');
      p.textContent = linksTitle.textContent.trim();
      linksContent.append(p);
    }

    const linksUl = document.createElement('ul');
    linksUl.classList.add('flex', 'flex-col', 'gap-xs');
    linksContent.append(linksUl);

    // Content detection for nav-link items within the links container
    [...linksContainerCell.children].forEach((linkItemRow) => {
      const linkItemCells = [...linkItemRow.children];
      // A nav-link item has 2 cells: link and linkLabel
      if (linkItemCells.length === 2 && linkItemCells[0].querySelector('a') && linkItemCells[1].textContent.trim()) {
        const linkCell = linkItemCells[0];
        const linkLabelCell = linkItemCells[1];
        const linkLi = document.createElement('li');
        const linkAnchor = document.createElement('a');
        linkAnchor.classList.add('link', 'text-foreground', 'text-p2', 'xl:text-p1', 'transition-display', 'hocus:underline', 'hocus:text-foreground', 'motion-safe:not-focus-visible:transition-underline');
        linkAnchor.setAttribute('data-desktop-nav-link', '');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) linkAnchor.href = foundLink.href;
        linkAnchor.textContent = linkLabelCell.textContent.trim();
        moveInstrumentation(linkItemRow, linkLi);
        linkLi.append(linkAnchor);
        linksUl.append(linkLi);
      }
    });

    // Highlight Cards container
    const highlightCardsWrapper = document.createElement('div');
    highlightCardsWrapper.classList.add('animated-fade-in-up', 'lg:row-span-3', 'lg:col-span-5');
    subnavGrid.append(highlightCardsWrapper);

    // Content detection for nav-highlight-card items within the highlight cards container
    [...highlightCardsContainerCell.children].forEach((cardItemRow) => {
      const cardItemCells = [...cardItemRow.children];
      // A nav-highlight-card item has 4 cells: image, description, ctaLink, ctaLinkLabel
      if (cardItemCells.length === 4 && cardItemCells[0].querySelector('picture') && cardItemCells[2].querySelector('a')) {
        const imageCell = cardItemCells[0];
        const descriptionCell = cardItemCells[1];
        const ctaLinkCell = cardItemCells[2];
        const ctaLinkLabelCell = cardItemCells[3];

        const cardLink = document.createElement('a');
        cardLink.classList.add('group/highlight', 'max-w-[435px]', 'block', 'text-foreground', 'rounded-sm', 'overflow-hidden', 'theme-focus-outline', 'py-7.5', 'lg:py-0', 'max-lg:border-y-stroke-muted', 'max-lg:border-y');
        cardLink.setAttribute('data-testid', 'highlight-card');
        const foundCtaLink = ctaLinkCell.querySelector('a');
        if (foundCtaLink) cardLink.href = foundCtaLink.href;
        moveInstrumentation(cardItemRow, cardLink);
        highlightCardsWrapper.append(cardLink);

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('relative', 'w-full', 'rounded-sm', 'overflow-hidden');
        cardLink.append(imageDiv);

        const imagePicture = imageCell.querySelector('picture');
        if (imagePicture) {
          const img = imagePicture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '435' }]);
          optimizedPic.querySelector('img').classList.add('w-full', 'bg-gray-100', 'object-cover', 'aspect-16/9', 'group-hover/highlight:scale-105', 'duration-400', 'transition-transform');
          optimizedPic.querySelector('img').setAttribute('height', '250');
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          moveInstrumentation(imagePicture, optimizedPic);
          imageDiv.append(optimizedPic);
        }

        const descriptionP = document.createElement('p');
        descriptionP.classList.add('mt-md', 'text-15', 'xl:text-p2');
        descriptionP.innerHTML = descriptionCell.innerHTML; // Use innerHTML for richtext
        cardLink.append(descriptionP);

        const ctaSpan = document.createElement('span');
        ctaSpan.classList.add('button', 'button--dark-outline', 'mt-sm', 'mb-0.5', 'max-[501px]:w-full');
        ctaSpan.textContent = ctaLinkLabelCell.textContent.trim();
        cardLink.append(ctaSpan);
      }
    });

    // Footer link
    const footerLinkWrapper = document.createElement('div');
    footerLinkWrapper.classList.add('max-lg:order-2', 'lg:col-start-1', 'lg:col-span-4', 'lg:row-start-2', 'lg:row-span-3', 'lg:flex', 'lg:items-start');
    footerLinkWrapper.setAttribute('data-animated', '');
    subnavGrid.append(footerLinkWrapper);

    const footerLinkInner = document.createElement('div');
    footerLinkInner.classList.add('animated-fade-in-up');
    footerLinkWrapper.append(footerLinkInner);

    const footerLinkAnchor = document.createElement('a');
    footerLinkAnchor.classList.add('button', 'button--dark-outline', 'max-[501px]:w-full');
    const foundFooterLink = footerLinkCell.querySelector('a');
    if (foundFooterLink) footerLinkAnchor.href = foundFooterLink.href;
    footerLinkAnchor.textContent = footerLinkLabelCell.textContent.trim();
    footerLinkInner.append(footerLinkAnchor);

    // Toggle logic for desktop subnav
    sectionButton.addEventListener('click', () => {
      const isExpanded = sectionButton.getAttribute('aria-expanded') === 'true';
      sectionButton.setAttribute('aria-expanded', !isExpanded);
      li.classList.toggle('active', !isExpanded);
    });
  });

  // Search and Primary Actions
  const searchAndActionsDiv = document.createElement('div');
  searchAndActionsDiv.classList.add('flex', 'items-center');
  menuInner.append(searchAndActionsDiv);

  // Search button (desktop)
  const searchDiv = document.createElement('div');
  searchDiv.classList.add('hidden', 'lg:flex', 'ml-4', 'lg:ml-0', 'justify-center', 'items-center');
  searchAndActionsDiv.append(searchDiv);

  const searchButton = document.createElement('button');
  searchButton.classList.add('group', 'inline-flex', 'gap-2', 'p-3', 'xl:p-3.5', 'border-1', 'rounded-full', 'items-center', 'cursor-pointer', 'transition-colors', 'border-navbar-search-button-foreground', 'text-navbar-search-button-foreground', 'bg-navbar-search-button-surface', 'hocus:text-navbar-search-button-foreground-accent', 'hocus:bg-navbar-search-button-surface-accent', 'hocus:border-navbar-search-button-surface-accent', 'aria-expanded:bg-navbar-search-button-surface-active', 'aria-expanded:hocus:bg-navbar-search-button-surface-active', 'aria-expanded:hocus:text-navbar-search-button-foreground-active', 'aria-expanded:text-navbar-search-button-foreground-active', 'theme-focus-outline');
  searchButton.setAttribute('aria-label', 'Search');
  searchButton.setAttribute('data-toggle-search', '');
  searchDiv.append(searchButton);

  const searchIcon = document.createElement('img');
  searchIcon.alt = 'svg file';
  searchIcon.src = '/icons/search.svg'; // Placeholder
  searchButton.append(searchIcon);

  // Primary Actions (desktop)
  const desktopPrimaryActionsDiv = document.createElement('div');
  desktopPrimaryActionsDiv.classList.add('lg:ml-2', 'xl:ml-5');
  desktopPrimaryActionsDiv.setAttribute('data-desktop-menu', '');
  desktopPrimaryActionsDiv.setAttribute('data-keep-open-mobile', '');
  searchAndActionsDiv.append(desktopPrimaryActionsDiv);

  const primaryActionsUl = document.createElement('ul');
  primaryActionsUl.classList.add('flex', 'flex-row', 'gap-1.5', 'xl:gap-4', 'items-center');
  primaryActionsUl.setAttribute('data-primary-nav', '');
  desktopPrimaryActionsDiv.append(primaryActionsUl);

  primaryActions.forEach((row) => {
    const cells = [...row.children];
    const actionLinkCell = cells[0];
    const actionLinkLabelCell = cells[1];

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('group', 'list-none', 'leading-[1.1]');
    li.setAttribute('data-has-subnav', '');
    primaryActionsUl.append(li);

    const foundActionLink = actionLinkCell.querySelector('a');
    const actionLinkHref = foundActionLink ? foundActionLink.href : '#';
    const actionLinkLabel = actionLinkLabelCell.textContent.trim();

    if (actionLinkLabel.toLowerCase() === 'donate') { // Special case for split button
      const splitDropdownDiv = document.createElement('div');
      splitDropdownDiv.classList.add('button--zion', 'button', 'split-dropdown', 'leading-none', 'flex', 'items-stretch', 'text-14', 'p-0');
      li.append(splitDropdownDiv);

      const donateLink = document.createElement('a');
      donateLink.classList.add('inline-flex', 'rounded-s-full', 'text-14', 'xl:text-18', 'p-[15px]', 'xl:ps-5', 'xl:py-4', 'pe-[13px]!', 'xl:pe-4!', 'border-r', 'border-denali', 'theme-focus-outline', 'forced-colors:border');
      donateLink.href = actionLinkHref;
      donateLink.textContent = actionLinkLabel;
      donateLink.setAttribute('data-testid', 'primary-action-nav-2');
      splitDropdownDiv.append(donateLink);

      const dropdownButton = document.createElement('button');
      dropdownButton.classList.add('pl-[15px]', 'pe-5', 'xl:pl-5', 'xl:pe-6', 'max-[374px]:pe-2.5', 'max-[374px]:ps-2', 'rounded-e-full', 'cursor-pointer', 'theme-focus-outline', 'forced-colors:border');
      dropdownButton.setAttribute('data-open-subnav', '');
      dropdownButton.setAttribute('aria-expanded', 'false');
      dropdownButton.setAttribute('aria-label', `Open dropdown for ${actionLinkLabel} link`);
      dropdownButton.setAttribute('aria-controls', `subnav-donate`);
      splitDropdownDiv.append(dropdownButton);

      const dropdownIcon = document.createElement('img');
      dropdownIcon.alt = 'svg file';
      dropdownIcon.src = '/icons/arrow-down.svg'; // Placeholder
      dropdownButton.append(dropdownIcon);

      // Add actual dropdown content if needed, similar to nav-sections
      const donateSubnavDiv = document.createElement('div');
      donateSubnavDiv.classList.add('transition-display', 'max-lg:overflow-auto', 'max-lg:w-full', 'max-lg:h-[calc(100dvh-var(--navbar-height))]', 'duration-200', 'hidden', 'allow-discrete', 'opacity-0', 'starting:group-[.active]:opacity-0', 'group-[.active]:opacity-100', 'group-[.active]:block', 'absolute', 'bg-surface-navbar', 'inset-x-0', 'top-full', 'py-12', 'lg:py-2xl', 'shadow-md', 'border-t', 'border-t-stroke-muted');
      donateSubnavDiv.setAttribute('data-subnav', '');
      donateSubnavDiv.setAttribute('data-testid', 'primary-action-nav-2-mega');
      donateSubnavDiv.id = 'subnav-donate';
      li.append(donateSubnavDiv);

      const donateSubnavContainer = document.createElement('div');
      donateSubnavContainer.classList.add('container', 'grid-full');
      donateSubnavDiv.append(donateSubnavContainer);

      const donateSubnavGridCentered = document.createElement('div');
      donateSubnavGridCentered.classList.add('grid-centered-12', 'w-full');
      donateSubnavContainer.append(donateSubnavGridCentered);

      const donateSubnavGrid = document.createElement('div');
      donateSubnavGrid.classList.add('grid', 'grid-cols-1', 'lg:grid-cols-12', 'gap-13', 'lg:gap-grid-gutter');
      donateSubnavGrid.setAttribute('data-animated', '');
      donateSubnavGridCentered.append(donateSubnavGrid);

      const mobileDonateTitle = document.createElement('div');
      mobileDonateTitle.classList.add('w-full', 'text-h6', 'lg:hidden', 'animated-fade-in-up');
      mobileDonateTitle.textContent = actionLinkLabel;
      donateSubnavGrid.append(mobileDonateTitle);

      // Example content for "Donate" dropdown (needs to come from model if applicable)
      // For now, adding placeholder structure based on original HTML
      const popularWaysDiv = document.createElement('div');
      popularWaysDiv.classList.add('animated-fade-in-up', 'lg:col-span-4');
      donateSubnavGrid.append(popularWaysDiv);
      const popularWaysInner = document.createElement('div');
      popularWaysInner.classList.add('not-last:mb-md', 'md:mb-0', 'flex', 'flex-col');
      popularWaysDiv.append(popularWaysInner);
      const popularWaysP = document.createElement('p');
      popularWaysP.classList.add('mb-xs', 'text-15', 'xl:text-p2', 'font-stretch-normal', 'font-bold', 'text-foreground-strong');
      popularWaysP.textContent = 'Popular ways to give';
      popularWaysInner.append(popularWaysP);
      const popularWaysUl = document.createElement('ul');
      popularWaysUl.classList.add('flex', 'flex-col', 'gap-xs');
      popularWaysInner.append(popularWaysUl);
      // Add actual links here if they are part of the model for this item
      // For example:
      // const li1 = document.createElement('li');
      // const a1 = document.createElement('a'); a1.href = '#'; a1.textContent = 'Make a donation';
      // a1.classList.add('link', 'text-foreground', 'text-p2', 'xl:text-p1', 'transition-display', 'hocus:underline', 'hocus:text-foreground', 'motion-safe:not-focus-visible:transition-underline');
      // li1.append(a1); popularWaysUl.append(li1);

      dropdownButton.addEventListener('click', () => {
        const isExpanded = dropdownButton.getAttribute('aria-expanded') === 'true';
        dropdownButton.setAttribute('aria-expanded', !isExpanded);
        li.classList.toggle('active', !isExpanded);
      });

    } else {
      const actionAnchor = document.createElement('a');
      actionAnchor.classList.add('button', 'text-14', 'xl:text-18', 'p-[15px]', 'xl:px-8', 'xl:py-4', 'forced-colors:border', 'button--sedona');
      actionAnchor.href = actionLinkHref;
      actionAnchor.textContent = actionLinkLabel;
      actionAnchor.setAttribute('data-testid', `primary-action-nav-${primaryActionsUl.children.length + 1}`);
      li.append(actionAnchor);
    }
  });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.createElement('button');
  mobileMenuToggle.classList.add('lg:hidden', 'no-underline', 'flex', 'flex-row', 'items-center', 'gap-2', 'group/toggle', 'ml-4', 'max-[375px]:ml-2', 'lg:ml-5', 'h-3.5', 'theme-focus-outline');
  mobileMenuToggle.setAttribute('data-mobile-menu-toggle', '');
  mobileMenuToggle.setAttribute('data-mobile-menu-open-text', 'Open Navigation');
  mobileMenuToggle.setAttribute('data-mobile-menu-close-text', 'Close Navigation');
  mobileMenuToggle.setAttribute('aria-haspopup', 'true');
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
  mobileMenuToggle.setAttribute('data-open-only', '');
  searchAndActionsDiv.append(mobileMenuToggle);

  const toggleSpan = document.createElement('span');
  toggleSpan.classList.add('relative', 'w-6', 'h-3.5', 'flex', 'flex-col', 'justify-between');
  mobileMenuToggle.append(toggleSpan);

  const createBar = (positionClass, expandedClass) => {
    const bar = document.createElement('span');
    bar.classList.add('absolute', 'left-0', 'w-full', 'h-[2px]', 'rounded-lg', 'bg-foreground', 'transition-all', 'duration-300', 'ease-in-out', 'group-hover/toggle:bg-foreground-accent', positionClass, expandedClass);
    return bar;
  };

  toggleSpan.append(createBar('top-0', 'group-aria-expanded/toggle:top-1/2 group-aria-expanded/toggle:left-1/2 group-aria-expanded/toggle:w-0'));
  toggleSpan.append(createBar('top-1/2', 'group-aria-expanded/toggle:rotate-45'));
  toggleSpan.append(createBar('top-1/2', 'group-aria-expanded/toggle:-rotate-45'));
  toggleSpan.append(createBar('top-full', 'group-aria-expanded/toggle:top-1/2 group-aria-expanded/toggle:left-1/2 group-aria-expanded/toggle:w-0'));

  const srOnlyToggleText = document.createElement('span');
  srOnlyToggleText.classList.add('sr-only');
  srOnlyToggleText.setAttribute('data-mobile-menu-toggle-text', '');
  srOnlyToggleText.textContent = 'Open Navigation';
  mobileMenuToggle.append(srOnlyToggleText);

  // Desktop Search Dropdown
  const desktopSearchDropdown = document.createElement('div');
  desktopSearchDropdown.classList.add('transition-display', 'hidden', 'allow-discrete', 'opacity-0', 'starting:[&.active]:opacity-0', '[&.active]:opacity-100', '[&.active]:block', 'absolute', 'bg-surface-navbar', 'inset-x-0', 'py-3xl', 'top-full', 'shadow-md');
  desktopSearchDropdown.setAttribute('data-search-dropdown', '');
  containerDiv.append(desktopSearchDropdown);

  const searchForm = document.createElement('form');
  searchForm.action = '/search/';
  searchForm.method = 'get';
  searchForm.role = 'search';
  searchForm.classList.add('container');
  desktopSearchDropdown.append(searchForm);

  const searchGrid = document.createElement('div');
  searchGrid.classList.add('grid-full');
  searchForm.append(searchGrid);

  const searchInputWrapper = document.createElement('div');
  searchInputWrapper.classList.add('relative', 'grid-centered-12', 'w-full', 'flex', 'items-center', 'gap-4', 'border-b', 'border-stroke-default', 'text-h6');
  searchGrid.append(searchInputWrapper);

  const searchInput = document.createElement('input');
  searchInput.id = 'search-bar';
  searchInput.setAttribute('data-search-input', '');
  searchInput.name = 'query';
  searchInput.type = 'text';
  searchInput.placeholder = 'Search…';
  searchInput.classList.add('peer', 'w-full', 'bg-transparent', 'pt-2', 'lg:pb-5', 'placeholder-transparent', 'focus:outline-none', 'transition-colors');
  searchInputWrapper.append(searchInput);

  const searchLabel = document.createElement('label');
  searchLabel.htmlFor = 'search-bar';
  searchLabel.classList.add('absolute', 'left-0', 'top-2', 'origin-left', 'transform', 'transition-transform', 'duration-200', 'text-h6', 'text-input-label', 'pointer-events-none', 'peer-placeholder-shown:translate-y-0', 'peer-placeholder-shown:scale-100', 'peer-focus:-translate-y-full', 'peer-focus:scale-75', 'peer-focus:font-semibold', 'peer-not-placeholder-shown:-translate-y-full', 'peer-not-placeholder-shown:font-semibold', 'peer-not-placeholder-shown:scale-75');
  searchLabel.textContent = 'Search';
  searchInputWrapper.append(searchLabel);

  const submitButton = document.createElement('button');
  submitButton.classList.add('button', 'bg-transparent', 'text-foreground', 'p-0', 'theme-focus-outline', 'motion-safe:hocus:translate-x-0.5', 'transition-transform');
  submitButton.type = 'submit';
  searchInputWrapper.append(submitButton);

  const submitIcon = document.createElement('img');
  submitIcon.alt = 'svg file';
  submitIcon.src = '/icons/search.svg'; // Placeholder
  submitButton.append(submitIcon);

  const submitSrOnly = document.createElement('span');
  submitSrOnly.classList.add('sr-only');
  submitSrOnly.textContent = 'Search';
  submitButton.append(submitSrOnly);

  // Mobile Dialog
  const mobileDialog = document.createElement('dialog');
  mobileDialog.setAttribute('data-mobile-menu', '');
  mobileDialog.classList.add('fixed', 'transform', 'overflow-y-auto', 'flex-col', 'w-full', 'h-full', 'inset-0', 'bg-surface-navbar', 'backdrop:bg-transparent', 'max-w-full', 'max-h-[100vh]', 'allow-discrete', 'opacity-0', 'starting:[&[open]]:opacity-0', '[&[open]]:opacity-100', 'transition-display', 'duration-200', 'z-mobile-nav-panel'); // Corrected class name
  header.append(mobileDialog);

  const mobileNavbar = document.createElement('div');
  mobileNavbar.classList.add('mobile-dialog-navbar', 'container', 'relative', 'z-[99]', 'bg-surface-navbar', 'py-3', 'lg:py-4', 'border-b', 'border-b-stroke-muted');
  mobileDialog.append(mobileNavbar);

  const mobileNavbarInner = document.createElement('div');
  mobileNavbarInner.classList.add('flex', 'justify-between', 'items-center');
  mobileNavbar.append(mobileNavbarInner);

  const mobileLogoLink = logoLink.cloneNode(true); // Clone desktop logo link
  mobileNavbarInner.append(mobileLogoLink);

  const mobileCloseButton = mobileMenuToggle.cloneNode(true);
  mobileCloseButton.setAttribute('data-close-only', '');
  mobileCloseButton.querySelector('[data-mobile-menu-toggle-text]').textContent = 'Close Navigation';
  mobileNavbarInner.append(mobileCloseButton);

  const mobileMenuContent = document.createElement('div');
  mobileMenuContent.classList.add('w-full', 'bg-surface-navbar');
  mobileDialog.append(mobileMenuContent);

  const mobileParentLinksUl = document.createElement('ul');
  mobileParentLinksUl.classList.add('container', 'w-full', 'mt-5');
  mobileParentLinksUl.setAttribute('data-mobile-menu-parent-links', '');
  mobileParentLinksUl.setAttribute('data-animated', '');
  mobileMenuContent.append(mobileParentLinksUl);

  navSections.forEach((row, index) => {
    const cells = [...row.children];
    const sectionLabelCell = cells[0];
    const linksContainerCell = cells[1];
    const highlightCardsContainerCell = cells[2];
    const footerLinkCell = cells[3];
    const footerLinkLabelCell = cells[4];

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('w-full', 'animated-fade-in-up');
    li.setAttribute('data-has-nav', '');
    mobileParentLinksUl.append(li);

    const sectionButton = document.createElement('button');
    sectionButton.classList.add('text-h6', 'py-6', 'theme-focus-outline', 'font-normal', 'w-full', 'no-underline!', 'inline-flex', 'flex-row', 'justify-between', 'items-center', 'active:underline');
    sectionButton.setAttribute('data-open-subnav', '');
    sectionButton.setAttribute('aria-haspopup', 'true');
    sectionButton.setAttribute('aria-expanded', 'false');
    sectionButton.textContent = sectionLabelCell.textContent.trim();
    li.append(sectionButton);

    const arrowImg = document.createElement('img');
    arrowImg.alt = 'svg file';
    arrowImg.src = '/icons/arrow-right.svg'; // Placeholder for SVG
    sectionButton.append(arrowImg);

    const mobileSubnavDiv = document.createElement('div');
    mobileSubnavDiv.classList.add('fixed', 'shadow-md', 'top-navbar-height', 'hidden', 'inset-0', 'overflow-y-auto', 'bg-surface-navbar', 'w-full', 'h-full', 'z-30', 'motion-safe:translate-x-full', 'motion-safe:starting:data-open:translate-x-full', 'data-open:translate-x-0', 'data-open:flex', 'allow-discrete', 'duration-300');
    mobileSubnavDiv.setAttribute('data-subnav', '');
    li.append(mobileSubnavDiv);

    const mobileSubnavFlex = document.createElement('div');
    mobileSubnavFlex.classList.add('flex', 'flex-col', 'h-full', 'w-full');
    mobileSubnavDiv.append(mobileSubnavFlex);

    const mobileSubnavRelative = document.createElement('div');
    mobileSubnavRelative.classList.add('relative');
    mobileSubnavFlex.append(mobileSubnavRelative);

    const mobileSubnavContainer = document.createElement('div');
    mobileSubnavContainer.classList.add('container', 'mb-20', 'pb-20');
    mobileSubnavRelative.append(mobileSubnavContainer);

    const mobileSubnavBackButtonWrapper = document.createElement('div');
    mobileSubnavBackButtonWrapper.classList.add('w-full');
    mobileSubnavContainer.append(mobileSubnavBackButtonWrapper);

    const mobileSubnavBackButton = document.createElement('button');
    mobileSubnavBackButton.classList.add('w-full', 'text-h6', 'py-6', 'mb-4', 'mt-5', 'link', 'no-underline', 'focus-visible:-outline-offset-[2px]', 'inline-flex', 'flex-row', 'justify-start', 'items-center', 'gap-2', 'active:underline');
    mobileSubnavBackButton.setAttribute('data-subnav-back', '');
    mobileSubnavBackButtonWrapper.append(mobileSubnavBackButton);

    const backArrowImg = document.createElement('img');
    backArrowImg.alt = 'svg file';
    backArrowImg.src = '/icons/arrow-left.svg'; // Placeholder
    mobileSubnavBackButton.append(backArrowImg);

    const backSrOnly = document.createElement('span');
    backSrOnly.classList.add('sr-only');
    backSrOnly.textContent = 'Back to';
    mobileSubnavBackButton.append(backSrOnly);
    mobileSubnavBackButton.append(document.createTextNode(sectionLabelCell.textContent.trim()));

    const mobileSubnavUl = document.createElement('ul');
    mobileSubnavUl.classList.add('w-full', 'flex', 'flex-col', 'justify-start');
    mobileSubnavUl.setAttribute('data-animated', '');
    mobileSubnavContainer.append(mobileSubnavUl);

    // Populate mobile subnav with links and highlight cards
    const mobileLinksLi = document.createElement('li');
    mobileLinksLi.classList.add('w-full', 'mb-10', 'last:mb-0', 'list-none', 'animated-fade-in-up');
    mobileSubnavUl.append(mobileLinksLi);

    const mobileLinksUl = document.createElement('ul');
    mobileLinksUl.classList.add('w-full', 'h-full', 'flex', 'flex-col', 'justify-start');
    mobileLinksLi.append(mobileLinksUl);

    const mobileLinksTitle = linksContainerCell.querySelector('p');
    if (mobileLinksTitle) {
      const h2 = document.createElement('h2');
      h2.classList.add('w-full', 'font-bold', 'font-stretch-normal', 'text-p1', 'mb-3', 'text-foreground-strong', 'inline-flex');
      h2.textContent = mobileLinksTitle.textContent.trim();
      mobileLinksUl.append(h2);
    }

    // Content detection for nav-link items within the links container for mobile
    [...linksContainerCell.children].forEach((linkItemRow) => {
      const linkItemCells = [...linkItemRow.children];
      if (linkItemCells.length === 2 && linkItemCells[0].querySelector('a') && linkItemCells[1].textContent.trim()) {
        const linkCell = linkItemCells[0];
        const linkLabelCell = linkItemCells[1];
        const linkLi = document.createElement('li');
        linkLi.classList.add('w-full');
        const linkAnchor = document.createElement('a');
        linkAnchor.classList.add('w-full', 'flex-1', 'text-p1', 'py-3', 'link', 'focus-visible:-outline-offset-[2px]', 'inline-flex', 'active:underline');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) linkAnchor.href = foundLink.href;
        linkAnchor.textContent = linkLabelCell.textContent.trim();
        moveInstrumentation(linkItemRow, linkLi);
        linkLi.append(linkAnchor);
        mobileLinksUl.append(linkLi);
      }
    });

    // Content detection for nav-highlight-card items within the highlight cards container for mobile
    [...highlightCardsContainerCell.children].forEach((cardItemRow) => {
      const cardItemCells = [...cardItemRow.children];
      if (cardItemCells.length === 4 && cardItemCells[0].querySelector('picture') && cardItemCells[2].querySelector('a')) {
        const imageCell = cardItemCells[0];
        const descriptionCell = cardItemCells[1];
        const ctaLinkCell = cardItemCells[2];
        const ctaLinkLabelCell = cardItemCells[3];

        const cardLi = document.createElement('li');
        cardLi.classList.add('animated-fade-in-up', 'w-full', 'mb-10', 'last:mb-0', 'last:[&>*]:pb-0');
        mobileSubnavUl.append(cardLi);

        const cardLink = document.createElement('a');
        cardLink.classList.add('group/highlight', 'max-w-[435px]', 'block', 'text-foreground', 'rounded-sm', 'overflow-hidden', 'theme-focus-outline', 'py-7.5', 'lg:py-0', 'max-lg:border-y-stroke-muted', 'max-lg:border-y');
        cardLink.setAttribute('data-testid', 'highlight-card');
        const foundCtaLink = ctaLinkCell.querySelector('a');
        if (foundCtaLink) cardLink.href = foundCtaLink.href;
        moveInstrumentation(cardItemRow, cardLink);
        cardLi.append(cardLink);

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('relative', 'w-full', 'rounded-sm', 'overflow-hidden');
        cardLink.append(imageDiv);

        const imagePicture = imageCell.querySelector('picture');
        if (imagePicture) {
          const img = imagePicture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '435' }]);
          optimizedPic.querySelector('img').classList.add('w-full', 'bg-gray-100', 'object-cover', 'aspect-16/9', 'group-hover/highlight:scale-105', 'duration-400', 'transition-transform');
          optimizedPic.querySelector('img').setAttribute('height', '250');
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          moveInstrumentation(imagePicture, optimizedPic);
          imageDiv.append(optimizedPic);
        }

        const descriptionP = document.createElement('p');
        descriptionP.classList.add('mt-md', 'text-15', 'xl:text-p2');
        descriptionP.innerHTML = descriptionCell.innerHTML;
        cardLink.append(descriptionP);

        const ctaSpan = document.createElement('span');
        ctaSpan.classList.add('button', 'button--dark-outline', 'mt-sm', 'mb-0.5', 'max-[501px]:w-full');
        ctaSpan.textContent = ctaLinkLabelCell.textContent.trim();
        cardLink.append(ctaSpan);
      }
    });

    const mobileFooterLi = document.createElement('li');
    mobileFooterLi.classList.add('w-full', 'mb-10', 'last:mb-0');
    mobileSubnavUl.append(mobileFooterLi);

    const mobileFooterLink = document.createElement('a');
    mobileFooterLink.classList.add('button', 'button--dark-outline', 'max-sm:w-full');
    mobileFooterLink.setAttribute('data-testid', 'footer-action-button');
    const foundFooterLink = footerLinkCell.querySelector('a');
    if (foundFooterLink) mobileFooterLink.href = foundFooterLink.href;
    mobileFooterLink.textContent = footerLinkLabelCell.textContent.trim();
    mobileFooterLi.append(mobileFooterLink);

    // Mobile subnav toggle logic
    sectionButton.addEventListener('click', () => {
      mobileSubnavDiv.classList.add('data-open');
      mobileDialog.classList.add('hidden'); // Hide main mobile menu
    });

    mobileSubnavBackButton.addEventListener('click', () => {
      mobileSubnavDiv.classList.remove('data-open');
      mobileDialog.classList.remove('hidden'); // Show main mobile menu
    });
  });

  // Mobile Primary Actions
  const mobileActionsDiv = document.createElement('div');
  mobileActionsDiv.classList.add('container', 'my-2');
  mobileMenuContent.append(mobileActionsDiv);

  const mobileActionsUl = document.createElement('ul');
  mobileActionsUl.classList.add('gap-2.5', 'flex', 'justify-center', 'items-center');
  mobileActionsUl.setAttribute('data-animated', '');
  mobileActionsDiv.append(mobileActionsUl);

  primaryActions.forEach((row, index) => {
    const cells = [...row.children];
    const actionLinkCell = cells[0];
    const actionLinkLabelCell = cells[1];

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('animated-fade-in-up', 'w-full');
    mobileActionsUl.append(li);

    const actionAnchor = document.createElement('a');
    actionAnchor.classList.add('mobile-primary-action', 'button', 'w-full', 'text-14', 'p-[15px]', 'xl:px-8', 'xl:py-4', 'forced-colors:border');
    const foundActionLink = actionLinkCell.querySelector('a');
    if (foundActionLink) actionAnchor.href = foundActionLink.href;
    actionAnchor.textContent = actionLinkLabelCell.textContent.trim();
    actionAnchor.setAttribute('data-testid', `mobile-primary-action-nav-${index + 1}`);

    if (actionLinkLabelCell.textContent.trim().toLowerCase() === 'gifts') {
      actionAnchor.classList.add('button--sedona');
    } else if (actionLinkLabelCell.textContent.trim().toLowerCase() === 'donate') {
      actionAnchor.classList.add('button--zion');
    }
    li.append(actionAnchor);
  });

  // Mobile Search Form
  const mobileSearchForm = document.createElement('form');
  mobileSearchForm.action = '/search/';
  mobileSearchForm.method = 'get';
  mobileSearchForm.role = 'search';
  mobileSearchForm.classList.add('w-full', 'py-sm', 'container');
  mobileSearchForm.setAttribute('data-animated', '');
  mobileMenuContent.append(mobileSearchForm);

  const mobileSearchInputWrapper = document.createElement('div');
  mobileSearchInputWrapper.classList.add('flex', 'items-center', 'bg-surface-mobile-search-bar', 'rounded-full', 'relative', 'animated-fade-in-up');
  mobileSearchForm.append(mobileSearchInputWrapper);

  const mobileSearchInput = document.createElement('input');
  mobileSearchInput.id = 'mobile-search-bar';
  mobileSearchInput.name = 'query';
  mobileSearchInput.type = 'text';
  mobileSearchInput.placeholder = 'Search';
  mobileSearchInput.classList.add('w-full', 'bg-transparent', 'text-p1', 'p-4', 'py-3.5', 'pl-4.5', 'pr-14', 'leading-none', 'placeholder:text-foreground-strong', 'focus:outline-none');
  mobileSearchInputWrapper.append(mobileSearchInput);

  const mobileSearchButton = document.createElement('button');
  mobileSearchButton.classList.add('absolute', 'right-6', 'bg-transparent', 'text-foreground', 'p-0', 'rounded-sm');
  mobileSearchButton.type = 'submit';
  mobileSearchInputWrapper.append(mobileSearchButton);

  const mobileSearchIcon = document.createElement('img');
  mobileSearchIcon.alt = 'svg file';
  mobileSearchIcon.src = '/icons/search.svg'; // Placeholder
  mobileSearchButton.append(mobileSearchIcon);

  const mobileSearchSrOnly = document.createElement('span');
  mobileSearchSrOnly.classList.add('sr-only');
  mobileSearchSrOnly.textContent = 'Search';
  mobileSearchButton.append(mobileSearchSrOnly);

  // Event Listeners for mobile menu
  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = mobileDialog.hasAttribute('open');
    if (isOpen) {
      mobileDialog.close();
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.querySelector('[data-mobile-menu-toggle-text]').textContent = 'Open Navigation';
    } else {
      mobileDialog.showModal();
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      mobileMenuToggle.querySelector('[data-mobile-menu-toggle-text]').textContent = 'Close Navigation';
    }
  });

  mobileCloseButton.addEventListener('click', () => {
    mobileDialog.close();
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.querySelector('[data-mobile-menu-toggle-text]').textContent = 'Open Navigation';
  });

  // Event listener for desktop search toggle
  searchButton.addEventListener('click', () => {
    const isExpanded = searchButton.getAttribute('aria-expanded') === 'true';
    searchButton.setAttribute('aria-expanded', !isExpanded);
    desktopSearchDropdown.classList.toggle('active');
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(header);
}
