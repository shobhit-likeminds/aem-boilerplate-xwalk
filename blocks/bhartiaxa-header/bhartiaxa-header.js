import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  block.textContent = '';
  block.classList.add('def-header');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');

  const bhartiaxaMenu = document.createElement('div');
  bhartiaxaMenu.classList.add('bhartiaxa-menu');

  // Logo
  const bhartiLogo = document.createElement('div');
  bhartiLogo.classList.add('bharti-logo');
  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  const bhartiAxaLogo = document.createElement('div');
  bhartiAxaLogo.classList.add('bhartiAxa-logo');
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    bhartiAxaLogo.append(logoPicture);
  }
  logoLink.append(bhartiAxaLogo);
  bhartiLogo.append(logoLink);
  moveInstrumentation(logoRow, bhartiAxaLogo);
  moveInstrumentation(logoLinkRow, logoLink);

  bhartiaxaMenu.append(bhartiLogo);

  // Navigation
  const bhartiNav = document.createElement('div');
  bhartiNav.classList.add('hidden', 'lg:block', 'bharti-nav');
  const primaryNavUl = document.createElement('ul');
  primaryNavUl.classList.add('bharti-nav-ul');
  primaryNavUl.id = 'primaryNav';

  navItemRows.forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const subLinksCell = cells.find(cell => cell.querySelector('ul'));
    // The linkLabelCell is often redundant if linkCell exists, or can be derived from labelCell if no link.
    // For simplicity, we'll use labelCell.textContent for text if linkLabelCell is not explicitly needed.

    const subList = subLinksCell?.querySelector('ul');
    const li = document.createElement('li');
    li.classList.add('menu-links');
    li.id = `menu${index + 1}`;

    if (subList) {
      li.classList.add('menu-popover-container');

      const triggerDiv = document.createElement('div');
      triggerDiv.classList.add('renwal_login-btn', 'flex', 'flex-col', 'items-center', 'cursor-pointer');
      const iconSpan = document.createElement('span');
      iconSpan.classList.add('icon-user-login', 'user-login-icon');
      iconSpan.style.lineHeight = '1';
      const textSpan = document.createElement('span');
      textSpan.classList.add('text-[10px]', 'font-montBold', 'mt-0.5');
      textSpan.textContent = labelCell?.textContent.trim() || '';
      triggerDiv.append(iconSpan, textSpan);

      const menuPopover = document.createElement('div');
      menuPopover.classList.add('menu-popover');
      const popoverList = document.createElement('ul');
      popoverList.classList.add('popover-list');
      // Move subLinks content into the popover list
      [...subLinksCell.children].forEach((child) => {
        if (child.tagName === 'UL') {
          [...child.children].forEach((item) => {
            const popoverItem = document.createElement('li');
            popoverItem.classList.add('popover-item');
            const link = item.querySelector('a');
            if (link) {
              link.classList.add('menu-box-listitem', 'link-hover');
              popoverItem.append(link);
            } else {
              popoverItem.append(item);
            }
            popoverList.append(popoverItem);
            moveInstrumentation(item, popoverItem);
          });
        }
      });
      menuPopover.append(popoverList);

      triggerDiv.addEventListener('click', () => {
        menuPopover.classList.toggle('show'); // Use 'show' class for visibility
      });

      li.append(triggerDiv, menuPopover);
      moveInstrumentation(row, li);
    } else {
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      // Use labelCell for text content if no specific linkLabelCell is found or needed
      anchor.textContent = labelCell?.textContent.trim() || '';
      anchor.classList.add('menu-link-item');
      li.append(anchor);
      moveInstrumentation(row, li);
    }
    primaryNavUl.append(li);
  });

  bhartiNav.append(primaryNavUl);
  bhartiaxaMenu.append(bhartiNav);

  // Mobile Menu Icons
  const mobileMenuIcons = document.createElement('div');
  mobileMenuIcons.classList.add('block', 'lg:hidden', 'mobile-menu-icons');

  // Pay Premium button
  const payPremiumLink = document.createElement('a');
  payPremiumLink.href = '/pay-premium-online';
  payPremiumLink.classList.add('menu-link-item', 'login-btn', 'button-tertiary', 'active-renewal-btn');
  payPremiumLink.target = '_blank';
  payPremiumLink.textContent = 'Pay Premium';
  mobileMenuIcons.append(payPremiumLink);

  // WhatsApp icon
  const whatsappA = document.createElement('a');
  whatsappA.href = 'https://wa.me/+9102248815768';
  whatsappA.target = '_blank';
  whatsappA.classList.add('whatsapp-a');
  const whatsappImg = document.createElement('img');
  whatsappImg.alt = 'Whatsapp Icon';
  whatsappImg.title = 'Icon';
  whatsappImg.loading = 'lazy';
  whatsappImg.width = '25';
  whatsappImg.height = '25';
  whatsappImg.decoding = 'async';
  whatsappImg.dataset.nimg = '1';
  whatsappImg.style.color = 'transparent';
  // Use a placeholder src for now, as the actual src from original HTML is a hardcoded DAM path
  // and there's no model field for this specific icon.
  // If a model field for this existed, we would read its value.
  whatsappImg.src = '/icons/whatsapp-icon.svg'; // Placeholder, replace if a model field is added
  whatsappA.append(whatsappImg);
  mobileMenuIcons.append(whatsappA);

  // Login icon
  const loginI = document.createElement('a');
  loginI.href = '#';
  loginI.classList.add('login-i');
  const loginDiv = document.createElement('div');
  loginDiv.classList.add('flex', 'flex-col', 'items-center', 'cursor-pointer', '!flex');
  const loginIconSpan = document.createElement('span');
  loginIconSpan.classList.add('icon-user-login', 'mobile-menu', 'block', '!text-[16px]');
  const loginTextSpan = document.createElement('span');
  loginTextSpan.classList.add('text-[10px]', 'font-montBold', 'text-black');
  loginTextSpan.textContent = 'Login';
  loginDiv.append(loginIconSpan, loginTextSpan);
  loginI.append(loginDiv);
  mobileMenuIcons.append(loginI);

  // Hamburger menu icon
  const hamburgerA = document.createElement('a');
  hamburgerA.href = '#';
  const hamburgerSpan = document.createElement('span');
  hamburgerSpan.classList.add('icon-menu', 'mobile-menu');
  hamburgerA.append(hamburgerSpan);
  mobileMenuIcons.append(hamburgerA);

  bhartiaxaMenu.append(mobileMenuIcons);
  headerContainer.append(bhartiaxaMenu);
  block.append(headerContainer);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Mobile menu functionality (accordion)
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

  // The accordion-section is created inside the loop for each item, not once here.
  // const accordionSection = document.createElement('div');
  // accordionSection.classList.add('accordion-section');
  // contentBox2.append(accordionSection);

  // Example for a simple mobile accordion item
  navItemRows.forEach((row) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const subLinksCell = cells.find(cell => cell.querySelector('ul'));

    const subList = subLinksCell?.querySelector('ul');

    const section = document.createElement('div');
    section.classList.add('accordion-section');

    const accordionDiv = document.createElement('div');
    accordionDiv.classList.add('accordion');

    const accordionTitleLink = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) accordionTitleLink.href = foundLink.href;
    // Corrected class name to match original HTML
    accordionTitleLink.classList.add('mobile-nav-accord-title');
    accordionTitleLink.textContent = labelCell?.textContent.trim() || '';
    accordionDiv.append(accordionTitleLink);

    const accordionIcon = document.createElement('span');
    accordionIcon.classList.add('icon-chevron-down', 'accordion-icon-custom');
    accordionDiv.append(accordionIcon);

    const accordionContent = document.createElement('div');
    accordionContent.classList.add('accordion-content');
    accordionContent.style.maxHeight = '0px';

    if (subList) {
      [...subList.children].forEach((item) => {
        const mobileLink = document.createElement('a');
        const originalLink = item.querySelector('a');
        if (originalLink) {
          mobileLink.href = originalLink.href;
          mobileLink.target = originalLink.target;
          mobileLink.textContent = originalLink.textContent.trim();
        } else {
          mobileLink.textContent = item.textContent.trim();
        }
        mobileLink.classList.add('mobile-nav-accord-listitem');
        accordionContent.append(mobileLink);
      });
    }

    accordionDiv.addEventListener('click', () => {
      const isActive = accordionDiv.classList.toggle('active');
      accordionIcon.classList.toggle('rotate', isActive);
      accordionContent.style.maxHeight = isActive ? `${accordionContent.scrollHeight}px` : '0px';
    });

    section.append(accordionDiv, accordionContent);
    contentBox2.append(section);
  });

  block.append(mobileNav);

  // Mobile menu toggle for hamburger icon
  hamburgerA.addEventListener('click', (e) => {
    e.preventDefault();
    mobileNav.classList.toggle('invisible');
    mobileNav.classList.toggle('opacity-0');
    mobileNav.classList.toggle('show'); // Add a show class for better control
  });

  // Close mobile menu when clicking outside
  contentBox1.addEventListener('click', () => {
    mobileNav.classList.add('invisible', 'opacity-0');
    mobileNav.classList.remove('show');
    contentBox2.querySelectorAll('.accordion.active').forEach((acc) => acc.classList.remove('active'));
    contentBox2.querySelectorAll('.accordion-icon-custom.rotate').forEach((icon) => icon.classList.remove('rotate'));
    contentBox2.querySelectorAll('.accordion-content').forEach((content) => {
      content.style.maxHeight = '0px';
    });
  });
}
