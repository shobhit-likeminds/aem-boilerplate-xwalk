import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    itcLogoRow,
    fssaiLogoRow,
    itcLogoLinkRow,
    footerLinksContainerRow, // This is the container for footer-link items
    socialLinksContainerRow, // This is the container for social-link items
    grievanceTitleRow,
    grievanceNameRow,
    grievanceContactRow,
    grievanceTimingsRow,
    copyrightRow,
    ...itemRows // All remaining rows are actual item rows (footer-link or social-link)
  ] = [...block.children];

  // Main footer container
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');

  // Left column for logos
  const logoColumn = document.createElement('div');
  logoColumn.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-d-flex', 'footer-d-lg-block', 'footer-justify-content-center');

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-footer-logos');

  const footerItcLogoDiv = document.createElement('div');
  footerItcLogoDiv.classList.add('footer-footer-itc-logo');
  const itcLogoWrapper = document.createElement('div');
  itcLogoWrapper.classList.add('footer-logo', 'footer-image');
  const itcLogoLink = document.createElement('a');
  itcLogoLink.classList.add('footer-cmp-image__link');
  const itcLogo = itcLogoRow.querySelector('picture');
  if (itcLogo) {
    moveInstrumentation(itcLogoRow.firstElementChild, itcLogoLink);
    itcLogoLink.append(itcLogo);
  }
  // The itcLogoLinkRow contains the actual href for the ITC logo
  const itcLinkElement = itcLogoLinkRow.querySelector('div')?.textContent.trim();
  if (itcLinkElement) {
    itcLogoLink.href = itcLinkElement;
  } else {
    itcLogoLink.href = '#';
  }
  itcLogoWrapper.append(itcLogoLink);
  footerItcLogoDiv.append(itcLogoWrapper);
  footerLogos.append(footerItcLogoDiv);

  const footerFssaiLogoDiv = document.createElement('div');
  footerFssaiLogoDiv.classList.add('footer-footer-fssai-logo');
  const fssaiLogoWrapper = document.createElement('div');
  fssaiLogoWrapper.classList.add('footer-fssailogo', 'footer-logo', 'footer-image');
  const fssaiLogo = fssaiLogoRow.querySelector('picture');
  if (fssaiLogo) {
    moveInstrumentation(fssaiLogoRow.firstElementChild, fssaiLogoWrapper);
    fssaiLogoWrapper.append(fssaiLogo);
  }
  footerFssaiLogoDiv.append(fssaiLogoWrapper);
  footerLogos.append(footerFssaiLogoDiv);

  logoColumn.append(footerLogos);
  footerRow.append(logoColumn);

  // Right column for links and grievance
  const rightColumn = document.createElement('div');
  rightColumn.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-itc-footer-link-left');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');

  const footerLinksList = document.createElement('div');
  footerLinksList.classList.add('footer-list-4', 'footer-list');
  const footerLinksUl = document.createElement('ul');

  const socialLinksListDiv = document.createElement('div');
  socialLinksListDiv.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-align-items-md-end', 'footer-d-flex', 'footer-flex-column', 'footer-itc-footer-link-right');
  const socialLinksUl = document.createElement('ul');
  socialLinksUl.classList.add('footer-list-unstyled');

  itemRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    if (cells.length === 2) {
      const linkCell = cells[0];
      const contentCell = cells[1];

      // Check for Social Link: link in first cell, picture in second cell
      if (linkCell.querySelector('div')?.textContent.trim() && contentCell.querySelector('picture')) {
        const socialLink = document.createElement('a');
        const foundLink = linkCell.querySelector('div')?.textContent.trim();
        socialLink.href = foundLink || '#';
        socialLink.target = '_blank';
        socialLink.id = 'socialIcons';
        socialLink.setAttribute('data-cmp-clickable', '');

        const socialIcon = contentCell.querySelector('picture');
        if (socialIcon) {
          moveInstrumentation(contentCell.firstElementChild, socialLink);
          socialLink.append(socialIcon);
        }
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('footer-cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        socialLink.append(screenReaderSpan);
        li.append(socialLink);
        socialLinksUl.append(li);
      }
      // Check for Footer Link: link in first cell, text in second cell (no picture)
      else if (linkCell.querySelector('div')?.textContent.trim() && !contentCell.querySelector('picture')) {
        const footerLink = document.createElement('a');
        const foundLink = linkCell.querySelector('div')?.textContent.trim();
        footerLink.href = foundLink || '#';
        footerLink.target = '_blank';
        footerLink.setAttribute('data-cmp-clickable', '');
        moveInstrumentation(linkCell.firstElementChild, footerLink);
        footerLink.textContent = contentCell.textContent.trim();
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('footer-cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        footerLink.append(screenReaderSpan);
        li.append(footerLink);
        footerLinksUl.append(li);
      }
    }
  });

  footerLinksList.append(footerLinksUl);
  footerListsContainer.append(footerLinksList);
  rightColumn.append(footerListsContainer);

  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-contact-details');

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
  moveInstrumentation(grievanceTitleRow.firstElementChild, grievanceTitle);
  grievanceTitle.textContent = grievanceTitleRow.textContent.trim();
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceNameRow.firstElementChild, grievanceName);
  grievanceName.textContent = grievanceNameRow.textContent.trim();
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceContactRow.firstElementChild, grievanceContact);
  grievanceContact.textContent = grievanceContactRow.textContent.trim();
  contactDetails.append(grievanceContact);

  const grievanceTimings = document.createElement('p');
  grievanceTimings.classList.add('footer-contact-details__description', 'footer-mb-0');
  moveInstrumentation(grievanceTimingsRow.firstElementChild, grievanceTimings);
  grievanceTimings.textContent = grievanceTimingsRow.textContent.trim();
  contactDetails.append(grievanceTimings);

  rightColumn.append(contactDetails);
  footerRow.append(rightColumn);

  // Social links and copyright
  socialLinksListDiv.append(socialLinksUl);
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-footer-link');
  moveInstrumentation(copyrightRow.firstElementChild, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  socialLinksListDiv.append(copyrightSpan);
  footerRow.append(socialLinksListDiv);


  footerContainer.append(footerRow);

  block.textContent = '';
  block.classList.add('footer-itc-footer-section');
  block.append(footerContainer);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
