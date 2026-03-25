import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root rows based on BlockJson model fields
  const [logoRow, menusRow, addressesRow, contactsRow, copyrightsRow, socialsRow, ...itemRows] = [...block.children];

  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-wrapper');

  const footerArea = document.createElement('div');
  footerArea.classList.add('footer-area', 'container');

  const footerTopArea = document.createElement('div');
  footerTopArea.classList.add('footer_top_area');

  // Logo
  const footerLogo = document.createElement('div');
  footerLogo.classList.add('footer_logo', 'col-sm-4');
  const logoRegion = document.createElement('div');
  logoRegion.classList.add('region', 'region-footer-logo');
  const logoSection = document.createElement('section');
  logoSection.classList.add('block', 'block-block-content', 'clearfix');
  const logoField = document.createElement('div');
  logoField.classList.add('field', 'field--name-body', 'field--type-text-with-summary', 'field--label-hidden', 'field--item');

  // The logoRow contains a single cell with a picture
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const p = document.createElement('p');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      p.append(optimizedPic);
      logoField.append(p);
    }
  }
  moveInstrumentation(logoRow, logoSection);
  logoSection.append(logoField);
  logoRegion.append(logoSection);
  footerLogo.append(logoRegion);
  footerTopArea.append(footerLogo);

  const footerRight = document.createElement('div');
  footerRight.classList.add('footer_right', 'col-sm-8');

  // Menus
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer_menu');
  const menuRegion = document.createElement('div');
  menuRegion.classList.add('region', 'region-footer-menu');
  const nav = document.createElement('nav');
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-labelledby', 'block-footermenu-menu');
  nav.id = 'block-footermenu';

  // Filter itemRows for 'footer-menu' type: rows with an 'a' tag in their first cell
  const footerMenus = itemRows.filter((row) => row.children[0]?.querySelector('a'));
  const menuUl = document.createElement('ul');
  menuUl.classList.add('menu', 'menu--footer-menu', 'nav');
  footerMenus.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const link = row.children[0]?.querySelector('a'); // Get link from the first cell
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.classList.add('text-muted');
      li.append(newLink);
    }
    menuUl.append(li);
  });
  if (footerMenus.length > 0) {
    nav.append(menuUl);
  }
  moveInstrumentation(menusRow, menuRegion);
  menuRegion.append(nav);
  footerMenu.append(menuRegion);
  footerRight.append(footerMenu);

  // Addresses and Contacts
  const footerAddressContact = document.createElement('div');
  footerAddressContact.classList.add('footer_address');

  // Addresses
  const addressCol = document.createElement('div');
  addressCol.classList.add('address', 'col-sm-6');
  const addressRegion = document.createElement('div');
  addressRegion.classList.add('region', 'region-footer-address');
  const addressSection = document.createElement('section');
  addressSection.classList.add('block', 'block-block-content', 'block-block-content2b73c85e-4400-46bf-b782-bae45728155d', 'clearfix');
  const addressField = document.createElement('div');
  addressField.classList.add('field', 'field--name-body', 'field--type-text-with-summary', 'field--label-hidden', 'field--item');

  // Filter itemRows for 'footer-address' type: rows with a 'p' tag in their first cell
  const footerAddresses = itemRows.filter((row) => row.children[0]?.querySelector('p'));
  footerAddresses.forEach((row) => {
    const p = document.createElement('p');
    moveInstrumentation(row, p);
    // Move content from the first cell of the address row
    const cellContent = row.children[0];
    if (cellContent) {
      while (cellContent.firstChild) p.append(cellContent.firstChild);
    }
    addressField.append(p);
  });
  moveInstrumentation(addressesRow, addressSection);
  addressSection.append(addressField);
  addressRegion.append(addressSection);
  addressCol.append(addressRegion);
  footerAddressContact.append(addressCol);

  // Contacts
  const contactCol = document.createElement('div');
  contactCol.classList.add('contact', 'col-sm-6');
  const contactRegion = document.createElement('div');
  contactRegion.classList.add('region', 'region-footer-contact');
  const contactSection = document.createElement('section');
  contactSection.classList.add('block', 'block-block-content', 'block-block-contenta87bcd52-23cd-45b8-8f60-b79893239221', 'clearfix');
  const contactField = document.createElement('div');
  contactField.classList.add('field', 'field--name-body', 'field--type-text-with-summary', 'field--label-hidden', 'field--item');

  // Filter itemRows for 'footer-contact' type: rows with plain text content in their first cell, not a link or paragraph
  const footerContacts = itemRows.filter((row) => {
    const cell = row.children[0];
    return cell && !cell.querySelector('a') && !cell.querySelector('p') && cell.textContent.trim().length > 0;
  });
  const contactUl = document.createElement('ul');
  contactUl.classList.add('contact-info');
  footerContacts.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    if (index === 0) li.classList.add('first');
    else if (index === footerContacts.length - 1) li.classList.add('last');
    else li.classList.add('second'); // Assuming max 3 contacts for first/second/last
    const contactText = row.children[0]?.textContent.trim();
    if (contactText) {
      const contactLink = document.createElement('a');
      // Determine href based on content (e.g., mailto for email, tel for phone)
      if (contactText.includes('@')) {
        contactLink.href = `mailto:${contactText}`;
      } else if (/\d{3}[-\s]?\d{3}[-\s]?\d{4}/.test(contactText)) { // Simple phone number regex
        contactLink.href = `tel:${contactText.replace(/[-\s]/g, '')}`;
      } else {
        contactLink.href = '#'; // Default placeholder
      }
      contactLink.textContent = contactText;
      li.append(contactLink);
    }
    contactUl.append(li);
  });
  if (footerContacts.length > 0) {
    contactField.append(contactUl);
  }
  moveInstrumentation(contactsRow, contactSection);
  contactSection.append(contactField);
  contactRegion.append(contactSection);
  contactCol.append(contactRegion);
  footerAddressContact.append(contactCol);

  footerRight.append(footerAddressContact);
  footerTopArea.append(footerRight);
  footerArea.append(footerTopArea);

  // Bottom Area
  const footerBottomArea = document.createElement('div');
  footerBottomArea.classList.add('footer_bottom_area');

  // Copyrights
  const footerCopyright = document.createElement('div');
  footerCopyright.classList.add('footer_copyright', 'col-sm-7');
  const copyrightRegion = document.createElement('div');
  copyrightRegion.classList.add('region', 'region-copyright');
  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('block', 'block-block-content', 'block-block-content747a2788-4be2-4e9b-8e10-f60259866f99', 'clearfix');
  const copyrightField = document.createElement('div');
  copyrightField.classList.add('field', 'field--name-body', 'field--type-text-with-summary', 'field--label-hidden', 'field--item');

  // Filter itemRows for 'footer-copyright' type: rows with a 'p' tag in their first cell
  const footerCopyrights = itemRows.filter((row) => row.children[0]?.querySelector('p') && row.children[0].textContent.includes('Copyright'));
  footerCopyrights.forEach((row) => {
    const p = document.createElement('p');
    moveInstrumentation(row, p);
    // Move content from the first cell of the copyright row
    const cellContent = row.children[0];
    if (cellContent) {
      while (cellContent.firstChild) p.append(cellContent.firstChild);
    }
    copyrightField.append(p);
  });
  moveInstrumentation(copyrightsRow, copyrightSection);
  copyrightSection.append(copyrightField);
  copyrightRegion.append(copyrightSection);
  footerCopyright.append(copyrightRegion);
  footerBottomArea.append(footerCopyright);

  // Social Links
  const footerSocialArea = document.createElement('div');
  footerSocialArea.classList.add('footer_social_area', 'col-sm-4');
  const socialRegion = document.createElement('div');
  socialRegion.classList.add('region', 'region-footer-social-area');
  const socialSection = document.createElement('section');
  socialSection.classList.add('block', 'block-block-content', 'block-block-content9212ad0d-954c-4084-94cd-5831ab30d667', 'clearfix');
  const socialField = document.createElement('div');
  socialField.classList.add('field', 'field--name-body', 'field--type-text-with-summary', 'field--label-hidden', 'field--item');

  // Filter itemRows for 'footer-social' type: rows with an 'a' tag in their first cell, where the href is a social link
  const footerSocials = itemRows.filter((row) => row.children[0]?.querySelector('a') && row.children[0].querySelector('a').href.includes('social-link'));
  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-link');
  footerSocials.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const link = row.children[0]?.querySelector('a'); // Get link from the first cell
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      const socialText = link.textContent.toLowerCase();
      if (socialText.includes('facebook')) {
        li.classList.add('facebook');
        newLink.textContent = 'facebook';
      } else if (socialText.includes('instagram')) {
        li.classList.add('instagram');
        newLink.textContent = 'instagram';
      } else if (socialText.includes('twitter')) {
        li.classList.add('twitter');
        newLink.textContent = 'twitter';
      } else if (socialText.includes('youtube')) {
        li.classList.add('youtube-play');
        newLink.textContent = 'youtube';
      }
      li.append(newLink);
    }
    socialUl.append(li);
  });
  if (footerSocials.length > 0) {
    socialField.append(socialUl);
  }
  moveInstrumentation(socialsRow, socialSection);
  socialSection.append(socialField);
  socialRegion.append(socialSection);
  footerSocialArea.append(socialRegion);
  footerBottomArea.append(footerSocialArea);

  footerArea.append(footerBottomArea);
  footerWrapper.append(footerArea);

  block.textContent = '';
  block.append(footerWrapper);

  // Image optimization (this part was already correct)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
