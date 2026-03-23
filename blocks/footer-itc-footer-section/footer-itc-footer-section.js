import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    fssaiLogoRow,
    footerLinksHeader,
    footerSocialLinksHeader,
    grievanceOfficerNameRow,
    grievanceOfficerContactRow,
    grievanceOfficerTimingRow,
    copyrightRow,
    footerSecondaryLinksHeader,
    ...itemRows
  ] = [...block.children];

  // Filter item rows based on content structure
  const footerLinks = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('picture'));
  const footerSocialLinks = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));
  const footerSecondaryLinks = itemRows.filter((row) => row.children.length === 1);

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');

  // Left section (logos)
  const leftCol = document.createElement('div');
  leftCol.classList.add(
    'footer-col-lg-6',
    'footer-col-sm-12',
    'footer-d-flex',
    'footer-d-lg-block',
    'footer-justify-content-center',
  );

  const footerLogosDiv = document.createElement('div');
  footerLogosDiv.classList.add('footer-footer-logos');

  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('footer-footer-itc-logo');
  const itcLogoWrapper = document.createElement('div');
  itcLogoWrapper.classList.add('footer-logo', 'footer-image');
  moveInstrumentation(logoRow.firstElementChild, itcLogoWrapper);
  const itcPicture = logoRow.querySelector('picture');
  if (itcPicture) {
    const itcLink = document.createElement('a');
    itcLink.classList.add('footer-cmp-image__link');
    // Extract href from the original link if present, otherwise default
    const originalItcLink = logoRow.querySelector('a');
    itcLink.href = originalItcLink ? originalItcLink.href : '/';
    moveInstrumentation(itcPicture, itcLink);
    itcLink.append(itcPicture);
    itcLogoWrapper.append(itcLink);
  }
  itcLogoDiv.append(itcLogoWrapper);
  footerLogosDiv.append(itcLogoDiv);

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('footer-footer-fssai-logo');
  const fssaiLogoWrapper = document.createElement('div');
  fssaiLogoWrapper.classList.add('footer-fssailogo', 'footer-logo', 'footer-image');
  moveInstrumentation(fssaiLogoRow.firstElementChild, fssaiLogoWrapper);
  const fssaiPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiPicture) {
    moveInstrumentation(fssaiPicture, fssaiLogoWrapper);
    fssaiLogoWrapper.append(fssaiPicture);
  }
  fssaiLogoDiv.append(fssaiLogoWrapper);
  footerLogosDiv.append(fssaiLogoDiv);

  leftCol.append(footerLogosDiv);
  footerRow.append(leftCol);

  // Middle section (footer links)
  const middleCol = document.createElement('div');
  middleCol.classList.add(
    'footer-col-lg-6',
    'footer-col-sm-12',
    'footer-itc-footer-link-left',
  );

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');

  const footerListDiv = document.createElement('div');
  footerListDiv.classList.add('footer-list-4', 'footer-list');
  const footerLinksUl = document.createElement('ul');
  moveInstrumentation(footerLinksHeader, footerLinksUl);

  footerLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const linkCell = row.children[0]; // First cell is URL
    const labelCell = row.children[1]; // Second cell is Label

    const linkEl = document.createElement('a');
    if (linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      moveInstrumentation(foundLink, linkEl);
      linkEl.append(foundLink.textContent);
    } else {
      linkEl.href = '#'; // Fallback if no link found
      linkEl.textContent = linkCell.textContent.trim();
    }
    // Use labelCell content if it exists and link text is empty
    if (labelCell && linkEl.textContent.trim() === '') {
      linkEl.textContent = labelCell.textContent.trim();
    } else if (labelCell && linkEl.textContent.trim() !== '' && labelCell.textContent.trim() !== '') {
      // If both link text and label exist, prefer label as display text
      linkEl.textContent = labelCell.textContent.trim();
    }

    li.append(linkEl);
    footerLinksUl.append(li);
  });
  footerListDiv.append(footerLinksUl);
  footerListsContainer.append(footerListDiv);
  middleCol.append(footerListsContainer);

  // Grievance Officer details
  const contactDetailsDiv = document.createElement('div');
  contactDetailsDiv.classList.add('footer-contact-details');

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
  moveInstrumentation(grievanceOfficerNameRow.firstElementChild, grievanceTitle);
  grievanceTitle.textContent = 'Grievance Officer:';
  contactDetailsDiv.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceOfficerNameRow.firstElementChild, grievanceName);
  grievanceName.textContent = `Name: ${grievanceOfficerNameRow.firstElementChild.textContent.trim()}`;
  contactDetailsDiv.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceOfficerContactRow.firstElementChild, grievanceContact);
  grievanceContact.textContent = `Contact Info: ${grievanceOfficerContactRow.firstElementChild.textContent.trim()}`;
  contactDetailsDiv.append(grievanceContact);

  const grievanceTiming = document.createElement('p');
  grievanceTiming.classList.add('footer-contact-details__description', 'footer-mb-0');
  moveInstrumentation(grievanceOfficerTimingRow.firstElementChild, grievanceTiming);
  grievanceTiming.textContent = `(${grievanceOfficerTimingRow.firstElementChild.textContent.trim()})`;
  contactDetailsDiv.append(grievanceTiming);

  middleCol.append(contactDetailsDiv);
  footerRow.append(middleCol);

  // Right section (social links and copyright)
  const rightCol = document.createElement('div');
  rightCol.classList.add(
    'footer-col-lg-6',
    'footer-col-sm-12',
    'footer-align-items-md-end',
    'footer-d-flex',
    'footer-flex-column',
    'footer-itc-footer-link-right',
  );

  const socialLinksWrapper = document.createElement('div');
  moveInstrumentation(footerSocialLinksHeader, socialLinksWrapper);

  const socialLinksUl = document.createElement('ul');
  socialLinksUl.classList.add('footer-list-unstyled');

  footerSocialLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const urlCell = row.children[0]; // First cell is URL
    const iconCell = row.children[1]; // Second cell is Icon

    const socialLink = document.createElement('a');
    socialLink.id = 'socialIcons'; // This ID might not be unique if multiple social links exist
    socialLink.target = '_blank';
    socialLink.setAttribute('data-cmp-clickable', '');

    if (urlCell.querySelector('a')) {
      const foundLink = urlCell.querySelector('a');
      socialLink.href = foundLink.href;
      moveInstrumentation(foundLink, socialLink);
    } else {
      socialLink.href = urlCell.textContent.trim();
    }

    const picture = iconCell.querySelector('picture');
    if (picture) {
      moveInstrumentation(picture, socialLink);
      socialLink.append(picture);
    }

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('footer-cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    socialLink.append(screenReaderOnly);

    li.append(socialLink);
    socialLinksUl.append(li);
  });
  socialLinksWrapper.append(socialLinksUl); // Append the UL once after all LIs are added
  rightCol.append(socialLinksWrapper);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-footer-link');
  moveInstrumentation(copyrightRow.firstElementChild, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.firstElementChild.textContent.trim();
  rightCol.append(copyrightSpan);
  footerRow.append(rightCol);

  footerContainer.append(footerRow);

  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section', 'footer-itc-footer-secondary');

  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-secondary-container');
  moveInstrumentation(footerSecondaryLinksHeader, secondaryUl);

  footerSecondaryLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('footer-itc-footer-secondary-lists');
    moveInstrumentation(row, li);

    const linkCell = row.children[0]; // Only one cell for secondary links
    const linkEl = document.createElement('a');
    linkEl.classList.add('footer-footer-links');
    linkEl.target = '_blank';

    if (linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      linkEl.href = foundLink.href;
      moveInstrumentation(foundLink, linkEl);
      linkEl.append(foundLink.textContent);
    } else {
      linkEl.href = '#'; // Fallback if no link found
      linkEl.textContent = linkCell.textContent.trim();
    }

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('footer-cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    linkEl.append(screenReaderOnly);

    li.append(linkEl);
    secondaryUl.append(li);
  });
  secondaryFooter.append(secondaryUl);

  block.textContent = '';
  block.append(footerContainer, secondaryFooter);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
