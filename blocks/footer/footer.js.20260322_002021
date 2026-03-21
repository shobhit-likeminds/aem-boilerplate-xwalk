import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-itc-footer-section');

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');
  footerSection.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');
  footerContainer.append(footerRow);

  // Logo Section
  const logoCol = document.createElement('div');
  logoCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-d-flex', 'footer-d-lg-block', 'footer-justify-content-center');
  footerRow.append(logoCol);

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-footer-logos');
  logoCol.append(footerLogos);

  // ITC Logo
  const itcLogoWrapper = document.createElement('div');
  itcLogoWrapper.classList.add('footer-footer-itc-logo');
  footerLogos.append(itcLogoWrapper);

  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('footer-itc-logo', 'footer-logo', 'footer-image');
  itcLogoWrapper.append(itcLogoDiv);

  const itcLogoLinkWrapper = document.createElement('a');
  itcLogoLinkWrapper.classList.add('footer-cmp-image__link');
  itcLogoDiv.append(itcLogoLinkWrapper);

  // Read itcLogo (children[0]) and itcLogoLink (children[2])
  const itcLogoRow = children[0]; // itcLogo
  const itcLogoPicture = itcLogoRow.querySelector('picture');
  if (itcLogoPicture) {
    moveInstrumentation(itcLogoRow, itcLogoLinkWrapper);
    itcLogoLinkWrapper.append(itcLogoPicture);
  }

  const itcLogoLinkRow = children[2]; // itcLogoLink
  const itcLogoLink = itcLogoLinkRow.querySelector('div')?.textContent.trim();
  if (itcLogoLink) {
    itcLogoLinkWrapper.href = itcLogoLink;
  }

  // FSSAI Logo
  const fssaiLogoWrapper = document.createElement('div');
  fssaiLogoWrapper.classList.add('footer-footer-fssai-logo');
  footerLogos.append(fssaiLogoWrapper);

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('footer-fssailogo', 'footer-logo', 'footer-image');
  fssaiLogoWrapper.append(fssaiLogoDiv);

  const fssaiLogoRow = children[1]; // fssaiLogo
  const fssaiLogoPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiLogoPicture) {
    moveInstrumentation(fssaiLogoRow, fssaiLogoDiv);
    fssaiLogoDiv.append(fssaiLogoPicture);
  }

  // Footer Links and List Items
  const linksAndListsCol = document.createElement('div');
  linksAndListsCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-itc-footer-link-left');
  footerRow.append(linksAndListsCol);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');
  linksAndListsCol.append(footerListsContainer);

  const footerLinksRow = children[3]; // footerLinks container
  // Filter for footerLink items: each has 2 cells (link, text)
  const footerLinks = [...footerLinksRow.children].filter((row) => row.children.length === 2);
  if (footerLinks.length > 0) {
    const list1 = document.createElement('div');
    list1.classList.add('footer-list-4', 'footer-list');
    footerListsContainer.append(list1);
    const ul1 = document.createElement('ul');
    list1.append(ul1);

    footerLinks.forEach((row) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      const linkEl = document.createElement('a');
      const linkHref = row.children[0].textContent.trim(); // link
      const linkText = row.children[1].textContent.trim(); // text
      linkEl.href = linkHref;
      linkEl.textContent = linkText;
      linkEl.target = '_blank';
      li.append(linkEl);
      ul1.append(li);
    });
  }

  const footerListItemsRow = children[4]; // footerListItems container
  // Filter for footerListItem items: each has 2 cells (listLink, listText)
  const footerListItems = [...footerListItemsRow.children].filter((row) => row.children.length === 2);
  if (footerListItems.length > 0) {
    const list2 = document.createElement('div');
    list2.classList.add('footer-list-3', 'footer-list');
    footerListsContainer.append(list2);
    const ul2 = document.createElement('ul');
    ul2.classList.add('footer-cmp-list');
    list2.append(ul2);

    footerListItems.forEach((row) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('footer-cmp-list__item');
      const linkEl = document.createElement('a');
      linkEl.classList.add('footer-cmp-list__item-link');
      const linkHref = row.children[0].textContent.trim(); // listLink
      const linkText = row.children[1].textContent.trim(); // listText
      linkEl.href = linkHref;
      const span = document.createElement('span');
      span.classList.add('footer-cmp-list__item-title');
      span.textContent = linkText;
      linkEl.append(span);
      li.append(linkEl);
      ul2.append(li);
    });
  }

  // Grievance Officer Details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-contact-details');
  linksAndListsCol.append(contactDetails);

  const grievanceOfficerTitleRow = children[5]; // grievanceOfficerTitle
  const grievanceOfficerTitle = grievanceOfficerTitleRow.querySelector('p')?.textContent.trim();
  if (grievanceOfficerTitle) {
    const h5 = document.createElement('h5');
    h5.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
    h5.textContent = grievanceOfficerTitle;
    moveInstrumentation(grievanceOfficerTitleRow, h5);
    contactDetails.append(h5);
  }

  const grievanceOfficerNameRow = children[6]; // grievanceOfficerName
  const grievanceOfficerName = grievanceOfficerNameRow.querySelector('p')?.textContent.trim();
  if (grievanceOfficerName) {
    const pName = document.createElement('p');
    pName.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
    pName.textContent = grievanceOfficerName;
    moveInstrumentation(grievanceOfficerNameRow, pName);
    contactDetails.append(pName);
  }

  const grievanceOfficerContactRow = children[7]; // grievanceOfficerContact
  const grievanceOfficerContact = grievanceOfficerContactRow.querySelector('p')?.textContent.trim();
  if (grievanceOfficerContact) {
    const pContact = document.createElement('p');
    pContact.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
    pContact.textContent = grievanceOfficerContact;
    moveInstrumentation(grievanceOfficerContactRow, pContact);
    contactDetails.append(pContact);
  }

  const grievanceOfficerTimingRow = children[8]; // grievanceOfficerTiming
  const grievanceOfficerTiming = grievanceOfficerTimingRow.querySelector('p')?.textContent.trim();
  if (grievanceOfficerTiming) {
    const pTiming = document.createElement('p');
    pTiming.classList.add('footer-contact-details__description', 'footer-mb-0');
    pTiming.textContent = grievanceOfficerTiming;
    moveInstrumentation(grievanceOfficerTimingRow, pTiming);
    contactDetails.append(pTiming);
  }

  // Social Icons and Copyright
  const socialAndCopyrightCol = document.createElement('div');
  socialAndCopyrightCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-align-items-md-end', 'footer-d-flex', 'footer-flex-column', 'footer-itc-footer-link-right');
  footerRow.append(socialAndCopyrightCol);

  const socialIconsWrapper = document.createElement('div');
  socialAndCopyrightCol.append(socialIconsWrapper);

  const socialIconsRow = children[9]; // socialIcons container
  // Filter for socialIcon items: each has 2 cells (socialLink, icon)
  const socialIcons = [...socialIconsRow.children].filter((row) => row.children.length === 2);
  if (socialIcons.length > 0) {
    const ul = document.createElement('ul'); // Create one ul for all social icons
    ul.classList.add('footer-list-unstyled');
    socialIconsWrapper.append(ul);

    socialIcons.forEach((row) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      const linkEl = document.createElement('a');
      linkEl.id = 'socialIcons'; // Note: IDs should be unique if multiple links exist
      linkEl.target = '_blank';
      const socialLink = row.children[0].textContent.trim(); // socialLink
      if (socialLink) {
        linkEl.href = socialLink;
      }
      const iconPicture = row.children[1].querySelector('picture'); // icon
      if (iconPicture) {
        linkEl.append(iconPicture);
      }
      li.append(linkEl);
      ul.append(li);
    });
  }

  const copyrightTextRow = children[10]; // copyrightText
  const copyrightText = copyrightTextRow.querySelector('p')?.textContent.trim();
  if (copyrightText) {
    const span = document.createElement('span');
    span.classList.add('footer-footer-link');
    span.textContent = copyrightText;
    moveInstrumentation(copyrightTextRow, span);
    socialAndCopyrightCol.append(span);
  }

  // Optimize images
  footerSection.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(footerSection);
}
