import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure the first three rows based on BlockJson model
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');

  const bhartiaxaMenu = document.createElement('div');
  bhartiaxaMenu.classList.add('bhartiaxa-menu');

  // Logo
  const bhartiLogo = document.createElement('div');
  bhartiLogo.classList.add('bharti-logo');
  const bhartiAxaLogo = document.createElement('div');
  bhartiAxaLogo.classList.add('bhartiAxa-logo');

  const logoLink = document.createElement('a');
  // Use content detection for logoLink and logoLinkLabel
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    // Fallback to logoLinkLabel if logoLink is empty
    const foundLogoLinkLabel = logoLinkLabelRow.querySelector('a');
    if (foundLogoLinkLabel) {
      logoLink.href = foundLogoLinkLabel.href;
    } else {
      logoLink.href = logoLinkLabelRow.textContent.trim();
    }
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '132' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      bhartiAxaLogo.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, bhartiAxaLogo);
  logoLink.append(bhartiAxaLogo);
  bhartiLogo.append(logoLink);
  bhartiaxaMenu.append(bhartiLogo);

  // Navigation
  const bhartiNav = document.createElement('div');
  bhartiNav.classList.add('hidden', 'lg:block', 'bharti-nav');
  const primaryNav = document.createElement('ul');
  primaryNav.classList.add('bharti-nav-ul');
  primaryNav.id = 'primaryNav';

  navItemRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection to find cells based on their content type
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const subLinksCell = cells.find(cell => cell.querySelector('ul'));
    const linkLabelCell = cells.find(cell => cell !== labelCell && cell !== linkCell && cell !== subLinksCell); // Assuming linkLabel is the remaining text cell

    const subList = subLinksCell?.querySelector('ul');
    const li = document.createElement('li');
    li.classList.add('menu-links');
    moveInstrumentation(row, li);

    if (subList) {
      // Dropdown / accordion item (e.g., Login or More menu)
      li.classList.add('menu-popover-container');

      const trigger = document.createElement('div');
      trigger.classList.add('renwal_login-btn', 'flex', 'flex-col', 'items-center', 'cursor-pointer');
      moveInstrumentation(labelCell, trigger);

      const triggerSpan = document.createElement('span');
      triggerSpan.classList.add('icon-user-login', 'user-login-icon'); // Corrected class name
      triggerSpan.style.lineHeight = '1';
      trigger.append(triggerSpan);

      const triggerTextSpan = document.createElement('span');
      triggerTextSpan.classList.add('text-[10px]', 'font-montBold', 'mt-0.5');
      triggerTextSpan.textContent = labelCell.textContent.trim();
      trigger.append(triggerTextSpan);

      const menuPopover = document.createElement('div');
      menuPopover.classList.add('menu-popover');
      const popoverList = document.createElement('ul');
      popoverList.classList.add('popover-list');
      moveInstrumentation(subLinksCell, popoverList);
      while (subList.firstChild) {
        const popoverItem = document.createElement('li');
        popoverItem.classList.add('popover-item');
        moveInstrumentation(subList.firstChild, popoverItem);
        // Original HTML uses 'menu-box-listitem link-hover' for sub-links
        const originalLink = subList.firstChild.querySelector('a');
        if (originalLink) {
          originalLink.classList.add('menu-box-listitem', 'link-hover');
        }
        popoverItem.append(subList.firstChild);
        popoverList.append(popoverItem);
      }
      menuPopover.append(popoverList);

      // Add click listener for desktop dropdown toggle
      trigger.addEventListener('click', () => {
        menuPopover.classList.toggle('show'); // Use 'show' or similar class for visibility
      });

      li.append(trigger, menuPopover);
    } else {
      // Simple flat link
      const anchor = document.createElement('a');
      anchor.classList.add('menu-link-item');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
      moveInstrumentation(row, anchor);
      li.append(anchor);
    }
    primaryNav.append(li);
  });

  bhartiNav.append(primaryNav);
  bhartiaxaMenu.append(bhartiNav);

  // Mobile Menu Icons
  const mobileMenuIcons = document.createElement('div');
  mobileMenuIcons.classList.add('block', 'lg:hidden', 'mobile-menu-icons');

  // Pay Premium button
  const payPremiumLink = document.createElement('a');
  payPremiumLink.classList.add('menu-link-item', 'login-btn', 'button-tertiary', 'active-renewal-btn');
  payPremiumLink.href = 'https://www.bhartiaxa.com/pay-premium-online';
  payPremiumLink.target = '_blank';
  payPremiumLink.textContent = 'Pay Premium';
  mobileMenuIcons.append(payPremiumLink);

  // Whatsapp icon
  const whatsappLink = document.createElement('a');
  whatsappLink.classList.add('whatsapp-a');
  whatsappLink.href = 'https://wa.me/+9102248815768';
  whatsappLink.target = '_blank';
  const whatsappImg = document.createElement('img');
  whatsappImg.alt = 'Whatsapp Icon';
  whatsappImg.title = 'Icon';
  whatsappImg.loading = 'lazy';
  whatsappImg.width = '25';
  whatsappImg.height = '25';
  whatsappImg.decoding = 'async';
  whatsappImg.setAttribute('data-nimg', '1');
  whatsappImg.style.color = 'transparent';
  // Get src from original HTML if available, otherwise use a default or leave empty
  whatsappImg.src = block.querySelector('.mobile-menu-icons .whatsapp-a img')?.src || '';
  whatsappLink.append(whatsappImg);
  mobileMenuIcons.append(whatsappLink);

  // Login icon
  const loginIconLink = document.createElement('a');
  loginIconLink.classList.add('login-i');
  loginIconLink.href = '#';
  const loginIconDiv = document.createElement('div');
  loginIconDiv.classList.add('flex', 'flex-col', 'items-center', 'cursor-pointer', '!flex');
  const loginIconSpan = document.createElement('span');
  loginIconSpan.classList.add('icon-user-login', 'mobile-menu', 'block', '!text-[16px]');
  const loginTextSpan = document.createElement('span');
  loginTextSpan.classList.add('text-[10px]', 'font-montBold', 'text-black');
  loginTextSpan.textContent = 'Login';
  loginIconDiv.append(loginIconSpan, loginTextSpan);
  loginIconLink.append(loginIconDiv);
  mobileMenuIcons.append(loginIconLink);

  // Hamburger menu
  const hamburgerLink = document.createElement('a');
  hamburgerLink.href = '#';
  const hamburgerSpan = document.createElement('span');
  hamburgerSpan.classList.add('icon-menu', 'mobile-menu');
  hamburgerLink.append(hamburgerSpan);
  mobileMenuIcons.append(hamburgerLink);

  bhartiaxaMenu.append(mobileMenuIcons);
  headerContainer.append(bhartiaxaMenu);

  // Navbar box (desktop only, for styling/layout)
  const navbarBox = document.createElement('div');
  navbarBox.classList.add('hidden', 'lg:block', 'navbar-box');
  const innerDiv = document.createElement('div');
  for (let i = 0; i < 11; i += 1) { // Based on the number of divs in original HTML
    innerDiv.append(document.createElement('div'));
  }
  navbarBox.append(innerDiv);
  headerContainer.append(navbarBox);

  // Mobile menu (accordion structure)
  const mobileNav = document.createElement('div');
  mobileNav.id = 'mobMenu';
  mobileNav.classList.add('mobile-nav', 'myMobileMenu', 'block', 'lg:hidden', 'invisible', 'opacity-0');

  const contentBox1 = document.createElement('div');
  contentBox1.classList.add('contentBox1');
  contentBox1.id = 'opBackground';
  mobileNav.append(contentBox1);

  const contentBox2 = document.createElement('div');
  contentBox2.classList.add('contentBox2');
  mobileNav.append(contentBox2);

  // Populate mobile menu with accordion items
  navItemRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection to find cells based on their content type
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const subLinksCell = cells.find(cell => cell.querySelector('ul'));
    const linkLabelCell = cells.find(cell => cell !== labelCell && cell !== linkCell && cell !== subLinksCell);

    const subList = subLinksCell?.querySelector('ul');

    const accordionSection = document.createElement('div');
    accordionSection.classList.add('accordion-section');

    const accordion = document.createElement('div');
    accordion.classList.add('accordion');
    moveInstrumentation(labelCell, accordion);

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.classList.add('mobile-nav-accord-title');
    anchor.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
    accordion.append(anchor);

    const iconSpan = document.createElement('span');
    iconSpan.classList.add('icon-chevron-down', 'accordion-icon-custom');
    accordion.append(iconSpan);

    const accordionContent = document.createElement('div');
    accordionContent.classList.add('accordion-content');
    accordionContent.style.maxHeight = '0px';

    if (subList) {
      moveInstrumentation(subLinksCell, accordionContent);
      [...subList.children].forEach((subListItem) => {
        const subLinkAnchor = document.createElement('a');
        subLinkAnchor.classList.add('mobile-nav-accord-listitem');
        const subLink = subListItem.querySelector('a');
        if (subLink) {
          subLinkAnchor.href = subLink.href;
          subLinkAnchor.textContent = subLink.textContent.trim();
        } else {
          subLinkAnchor.textContent = subListItem.textContent.trim();
        }
        moveInstrumentation(subListItem, subLinkAnchor);
        accordionContent.append(subLinkAnchor);
      });
    }
    // Add click listener for accordion toggle
    accordion.addEventListener('click', () => {
      accordion.classList.toggle('active');
      iconSpan.classList.toggle('rotate');
      if (accordionContent.style.maxHeight === '0px') {
        accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
      } else {
        accordionContent.style.maxHeight = '0px';
      }
    });

    accordionSection.append(accordion, accordionContent);
    contentBox2.append(accordionSection);
  });

  headerContainer.append(mobileNav);

  block.textContent = '';
  block.classList.add('bhartiaxa-header', 'def-header');
  block.append(headerContainer);

  // Image optimization for all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Mobile menu toggle functionality
  const mobileMenuToggle = block.querySelector('.mobile-menu-icons .icon-menu.mobile-menu');
  if (mobileMenuToggle) {
    mobileMenuToggle.closest('a').addEventListener('click', (e) => {
      e.preventDefault();
      mobileNav.classList.toggle('invisible');
      mobileNav.classList.toggle('opacity-0');
      mobileNav.classList.toggle('show'); // Use 'show' class for visibility
    });

    contentBox1.addEventListener('click', () => {
      mobileNav.classList.add('invisible', 'opacity-0');
      mobileNav.classList.remove('show');
    });
  }

  // Login popover toggle functionality (for desktop)
  // The original code was looking for a specific class combination that might not exist for the desktop login
  // Re-targeting based on the structure created in the decorate function
  const desktopLoginTrigger = block.querySelector('.bharti-nav .menu-popover-container .renwal_login-btn');
  const desktopLoginPopover = block.querySelector('.bharti-nav .menu-popover-container .menu-popover');
  if (desktopLoginTrigger && desktopLoginPopover) {
    desktopLoginTrigger.addEventListener('click', () => {
      desktopLoginPopover.classList.toggle('show');
    });
  }
}
