import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-section');

  const container = document.createElement('div');
  container.classList.add('container');
  footerSection.append(container);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');
  container.append(footerRow);

  // Left Column
  const footerColumnLeft = document.createElement('div');
  footerColumnLeft.classList.add('footer-column-left');
  footerRow.append(footerColumnLeft);

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');
  footerColumnLeft.append(footerLogos);

  // ITC Logo
  const itcLogoRow = rows[0];
  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('footer-itc-logo');
  moveInstrumentation(itcLogoRow, itcLogoDiv);
  const itcLogoImageDiv = document.createElement('div');
  itcLogoImageDiv.classList.add('logo-image');
  const itcLogoLink = document.createElement('a');
  itcLogoLink.classList.add('cmp-image__link');
  const itcLogoPicture = itcLogoRow.querySelector('picture');
  if (itcLogoPicture) {
    itcLogoLink.append(itcLogoPicture);
  }
  itcLogoImageDiv.append(itcLogoLink);
  itcLogoDiv.append(itcLogoImageDiv);
  footerLogos.append(itcLogoDiv);

  // FSSAI Logo
  const fssaiLogoRow = rows[1];
  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('footer-fssai-logo');
  moveInstrumentation(fssaiLogoRow, fssaiLogoDiv);
  const fssaiLogoImageDiv = document.createElement('div');
  fssaiLogoImageDiv.classList.add('fssai-logo-image');
  const fssaiLogoPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiLogoPicture) {
    fssaiLogoImageDiv.append(fssaiLogoPicture);
  }
  fssaiLogoDiv.append(fssaiLogoImageDiv);
  footerLogos.append(fssaiLogoDiv);

  // ITC Logo Link (used for the itcLogoLink href)
  const itcLogoLinkRow = rows[2];
  const itcLogoLinkA = itcLogoLinkRow.querySelector('a');
  if (itcLogoLinkA) {
    itcLogoLink.href = itcLogoLinkA.href;
  }
  itcLogoLinkRow.remove(); // Remove the original row as its content is consumed

  // Center Column
  const footerColumnCenter = document.createElement('div');
  footerColumnCenter.classList.add('footer-column-center', 'footer-page-links-wrapper');
  footerRow.append(footerColumnCenter);

  const footerLinksContainer = rows[3];
  const footerLinkItems = rows.slice(10, rows.findIndex((row) => row.querySelector('picture') && row.children.length === 2));

  const listOne = document.createElement('div');
  listOne.classList.add('list-one', 'list');
  const ulOne = document.createElement('ul');
  ulOne.classList.add('cmp-list');
  listOne.append(ulOne);
  footerColumnCenter.append(listOne);

  const listTwo = document.createElement('div');
  listTwo.classList.add('list-two', 'list');
  const ulTwo = document.createElement('ul');
  ulTwo.classList.add('cmp-list');
  listTwo.append(ulTwo);
  footerColumnCenter.append(listTwo);

  footerLinkItems.forEach((row, index) => {
    const li = document.createElement('li');
    li.classList.add('cmp-list__item');
    moveInstrumentation(row, li);

    const linkCell = row.querySelector('a');
    const labelCell = row.querySelector('div:not(:has(a))'); // Get the div that does not contain a link

    const link = document.createElement('a');
    link.classList.add('cmp-list__item-link');
    if (linkCell) {
      link.href = linkCell.href;
    }
    if (labelCell) {
      const span = document.createElement('span');
      span.classList.add('cmp-list__item-title');
      span.textContent = labelCell.textContent;
      link.append(span);
    }
    li.append(link);

    if (index % 2 === 0) {
      ulOne.append(li);
    } else {
      ulTwo.append(li);
    }
  });
  footerLinksContainer.remove(); // Remove the original container row

  // Right Column
  const footerColumnRight = document.createElement('div');
  footerColumnRight.classList.add('footer-column-right', 'footer-link-left');
  footerRow.append(footerColumnRight);

  // Grievance Officer Details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');
  footerColumnRight.append(contactDetails);

  const grievanceOfficerTitleRow = rows[5];
  const grievanceOfficerTitle = document.createElement('h5');
  grievanceOfficerTitle.classList.add('contact-details__title', 'mb-md-3', 'mb-0');
  moveInstrumentation(grievanceOfficerTitleRow, grievanceOfficerTitle);
  grievanceOfficerTitle.textContent = grievanceOfficerTitleRow.textContent.trim();
  contactDetails.append(grievanceOfficerTitle);

  const grievanceOfficerNameRow = rows[6];
  const grievanceOfficerName = document.createElement('p');
  grievanceOfficerName.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceOfficerNameRow, grievanceOfficerName);
  grievanceOfficerName.textContent = `Name: ${grievanceOfficerNameRow.textContent.trim()}`;
  contactDetails.append(grievanceOfficerName);

  const grievanceOfficerContactRow = rows[7];
  const grievanceOfficerContact = document.createElement('p');
  grievanceOfficerContact.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceOfficerContactRow, grievanceOfficerContact);
  grievanceOfficerContact.textContent = `Contact Info: ${grievanceOfficerContactRow.textContent.trim()}`;
  contactDetails.append(grievanceOfficerContact);

  const grievanceOfficerHoursRow = rows[8];
  const grievanceOfficerHours = document.createElement('p');
  grievanceOfficerHours.classList.add('contact-details__description', 'mb-0');
  moveInstrumentation(grievanceOfficerHoursRow, grievanceOfficerHours);
  grievanceOfficerHours.textContent = `(${grievanceOfficerHoursRow.textContent.trim()})`;
  contactDetails.append(grievanceOfficerHours);

  // Right Align Column for Social Icons and Copyright
  const footerColumnRightAlign = document.createElement('div');
  footerColumnRightAlign.classList.add('footer-column-right-align', 'footer-link-right');
  footerRow.append(footerColumnRightAlign);

  const socialIconsWrapper = document.createElement('div');
  footerColumnRightAlign.append(socialIconsWrapper);

  const socialIconsContainer = rows[4];
  const socialIconItems = rows.slice(rows.findIndex((row) => row.querySelector('picture') && row.children.length === 2));

  socialIconItems.forEach((row) => {
    const ul = document.createElement('ul');
    ul.classList.add('list-unstyled');
    moveInstrumentation(row, ul);

    const li = document.createElement('li');
    const link = document.createElement('a');
    link.id = 'socialIcons';
    link.target = '_blank';
    link.setAttribute('data-cmp-clickable', '');

    const iconCell = row.querySelector('picture');
    const urlCell = row.querySelector('a');

    if (urlCell) {
      link.href = urlCell.href;
    }
    if (iconCell) {
      link.append(iconCell);
    }

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    link.append(screenReaderSpan);

    li.append(link);
    ul.append(li);
    socialIconsWrapper.append(ul);
  });
  socialIconsContainer.remove(); // Remove the original container row

  // Copyright
  const copyrightRow = rows[9];
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  footerColumnRightAlign.append(copyrightSpan);

  // Optimize images
  footerSection.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(footerSection);
}
