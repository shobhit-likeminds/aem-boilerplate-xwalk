import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    itcLogoImageRow,
    itcLogoLinkRow,
    itcLogoLinkLabelRow, // This row contains the link label, not a direct link
    fssaiLogoImageRow,
    grievanceOfficerTitleRow,
    grievanceOfficerNameRow,
    grievanceOfficerContactRow,
    grievanceOfficerHoursRow,
    copyrightTextRow,
    ...itemRows
  ] = children;

  const footerLinks = itemRows.filter((row) => row.children.length === 2);
  const socialLinks = itemRows.filter((row) => row.children.length === 3);

  block.textContent = '';

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const row = document.createElement('div');
  row.classList.add('row');
  container.append(row);

  // Left column for logos
  const colLeft = document.createElement('div');
  colLeft.classList.add('col-lg-6', 'col-sm-12', 'd-flex', 'd-lg-block', 'justify-content-center');
  row.append(colLeft);

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');
  colLeft.append(footerLogos);

  // ITC Logo
  const footerItcLogo = document.createElement('div');
  footerItcLogo.classList.add('footer-itc-logo');
  footerLogos.append(footerItcLogo);

  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('logo', 'image');
  footerItcLogo.append(itcLogoDiv);

  const itcLogoLink = document.createElement('a');
  itcLogoLink.classList.add('cmp-image__link');
  const itcLogoFoundLink = itcLogoLinkRow.querySelector('a');
  if (itcLogoFoundLink) {
    itcLogoLink.href = itcLogoFoundLink.href;
  }
  itcLogoLink.target = '_self';
  moveInstrumentation(itcLogoLinkRow, itcLogoLink);

  const itcLogoPicture = itcLogoImageRow.querySelector('picture');
  if (itcLogoPicture) {
    const img = itcLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '93' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    itcLogoLink.append(optimizedPic);
  }
  itcLogoDiv.append(itcLogoLink);

  // Fssai Logo
  const footerFssaiLogo = document.createElement('div');
  footerFssaiLogo.classList.add('footer-fssai-logo');
  footerLogos.append(footerFssaiLogo);

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('fssailogo', 'logo', 'image');
  footerFssaiLogo.append(fssaiLogoDiv);

  const fssaiLogoPicture = fssaiLogoImageRow.querySelector('picture');
  if (fssaiLogoPicture) {
    const img = fssaiLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '192' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    fssaiLogoDiv.append(optimizedPic);
  }

  // Footer links and contact details column
  const colCenter = document.createElement('div');
  colCenter.classList.add('col-lg-6', 'col-sm-12', 'itc-footer-link-left');
  row.append(colCenter);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container', 'd-flex');
  colCenter.append(footerListsContainer);

  // Footer Links
  const list4 = document.createElement('div');
  list4.classList.add('list-4', 'list');
  footerListsContainer.append(list4);

  const ulFooterLinks = document.createElement('ul');
  list4.append(ulFooterLinks);

  footerLinks.forEach((rowItem) => {
    const cells = [...rowItem.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a')); // Assuming label cell doesn't contain a direct link

    const li = document.createElement('li');
    moveInstrumentation(rowItem, li);

    const link = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank';
    }
    link.textContent = labelCell ? labelCell.textContent.trim() : ''; // Use labelCell if found
    li.append(link);
    ulFooterLinks.append(li);
  });

  // Contact Details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');
  colCenter.append(contactDetails);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('contact-details__title', 'mb-md-3', 'mb-0');
  grievanceTitle.textContent = grievanceOfficerTitleRow.textContent.trim();
  moveInstrumentation(grievanceOfficerTitleRow, grievanceTitle);
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  grievanceName.textContent = grievanceOfficerNameRow.textContent.trim();
  moveInstrumentation(grievanceOfficerNameRow, grievanceName);
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  grievanceContact.textContent = grievanceOfficerContactRow.textContent.trim();
  moveInstrumentation(grievanceOfficerContactRow, grievanceContact);
  contactDetails.append(grievanceContact);

  const grievanceHours = document.createElement('p');
  grievanceHours.classList.add('contact-details__description', 'mb-0');
  grievanceHours.textContent = grievanceOfficerHoursRow.textContent.trim();
  moveInstrumentation(grievanceOfficerHoursRow, grievanceHours);
  contactDetails.append(grievanceHours);

  // Social links and copyright column
  const colRight = document.createElement('div');
  colRight.classList.add('col-lg-6', 'col-sm-12', 'align-items-md-end', 'd-flex', 'flex-column', 'itc-footer-link-right');
  row.append(colRight);

  const socialLinksWrapper = document.createElement('div');
  colRight.append(socialLinksWrapper);

  const ulSocial = document.createElement('ul'); // Create ul once outside the loop
  ulSocial.classList.add('list-unstyled');
  socialLinksWrapper.append(ulSocial);

  socialLinks.forEach((rowItem) => {
    const cells = [...rowItem.children];
    const socialLinkCell = cells.find(cell => cell.querySelector('a'));
    const socialLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture')); // Assuming label cell doesn't have a link or picture
    const iconImageCell = cells.find(cell => cell.querySelector('picture'));

    const liSocial = document.createElement('li');
    moveInstrumentation(rowItem, liSocial);
    ulSocial.append(liSocial);

    const socialLink = document.createElement('a');
    socialLink.id = 'socialIcons';
    const foundSocialLink = socialLinkCell.querySelector('a');
    if (foundSocialLink) {
      socialLink.href = foundSocialLink.href;
      socialLink.target = '_blank';
    }
    moveInstrumentation(socialLinkCell, socialLink);

    const picture = iconImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]); // Assuming a small size for social icons
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      socialLink.append(optimizedPic);
    }
    liSocial.append(socialLink);
  });

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  copyrightSpan.textContent = copyrightTextRow.textContent.trim();
  moveInstrumentation(copyrightTextRow, copyrightSpan);
  colRight.append(copyrightSpan);

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
