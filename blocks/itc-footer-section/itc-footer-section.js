import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    itcLogoRow,
    fssaiLogoRow,
    grievanceOfficerNameRow,
    grievanceOfficerContactRow,
    grievanceOfficerHoursRow,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  const footerLinks = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('picture'));
  const socialLinks = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row');

  const leftCol = document.createElement('div');
  leftCol.classList.add('col-lg-6', 'col-sm-12', 'd-flex', 'd-lg-block', 'justify-content-center');

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');

  const footerItcLogo = document.createElement('div');
  footerItcLogo.classList.add('footer-itc-logo');
  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('logo', 'image');
  const itcPicture = itcLogoRow.querySelector('picture');
  const itcOriginalLink = itcLogoRow.querySelector('a'); // Get the original link
  if (itcPicture) {
    const itcLink = document.createElement('a');
    itcLink.classList.add('cmp-image__link');
    itcLink.href = itcOriginalLink ? itcOriginalLink.href : '/'; // Use original link or default
    moveInstrumentation(itcLogoRow.firstElementChild, itcLink);
    itcLink.append(itcPicture);
    itcLogoDiv.append(itcLink);
  }
  footerItcLogo.append(itcLogoDiv);
  footerLogos.append(footerItcLogo);

  const footerFssaiLogo = document.createElement('div');
  footerFssaiLogo.classList.add('footer-fssai-logo');
  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('fssailogo', 'logo', 'image');
  const fssaiPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiPicture) {
    moveInstrumentation(fssaiLogoRow.firstElementChild, fssaiLogoDiv);
    fssaiLogoDiv.append(fssaiPicture);
  }
  footerFssaiLogo.append(fssaiLogoDiv);
  footerLogos.append(footerFssaiLogo);

  leftCol.append(footerLogos);
  row.append(leftCol);

  const middleCol = document.createElement('div');
  middleCol.classList.add('col-lg-6', 'col-sm-12', 'itc-footer-link-left');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container', 'd-flex');

  const list4 = document.createElement('div');
  list4.classList.add('list-4', 'list');
  const ul4 = document.createElement('ul');
  footerLinks.forEach((linkRow) => {
    const li = document.createElement('li');
    moveInstrumentation(linkRow, li);
    const link = linkRow.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.setAttribute('data-cmp-clickable', '');
      while (link.firstChild) newLink.append(link.firstChild);
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      newLink.append(screenReaderSpan);
      li.append(newLink);
    } else {
      // Handle case where cell content is just text for label
      const labelCell = linkRow.firstElementChild;
      const newLink = document.createElement('a');
      newLink.target = '_blank';
      newLink.setAttribute('data-cmp-clickable', '');
      newLink.textContent = labelCell.textContent; // Use text content as label
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      newLink.append(screenReaderSpan);
      li.append(newLink);
    }
    ul4.append(li);
  });
  list4.append(ul4);
  footerListsContainer.append(list4);

  middleCol.append(footerListsContainer);

  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('contact-details__title', 'mb-md-3', 'mb-0');
  grievanceTitle.textContent = 'Grievance Officer:';
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceOfficerNameRow.firstElementChild, grievanceName);
  grievanceName.textContent = `Name: ${grievanceOfficerNameRow.firstElementChild.textContent}`;
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceOfficerContactRow.firstElementChild, grievanceContact);
  grievanceContact.textContent = `Contact Info: ${grievanceOfficerContactRow.firstElementChild.textContent}`;
  contactDetails.append(grievanceContact);

  const grievanceHours = document.createElement('p');
  grievanceHours.classList.add('contact-details__description', 'mb-0');
  moveInstrumentation(grievanceOfficerHoursRow.firstElementChild, grievanceHours);
  grievanceHours.textContent = `(${grievanceOfficerHoursRow.firstElementChild.textContent})`;
  contactDetails.append(grievanceHours);

  middleCol.append(contactDetails);
  row.append(middleCol);

  const rightCol = document.createElement('div');
  rightCol.classList.add('col-lg-6', 'col-sm-12', 'align-items-md-end', 'd-flex', 'flex-column', 'itc-footer-link-right');

  const socialLinksWrapper = document.createElement('div');
  socialLinks.forEach((socialRow) => {
    const ul = document.createElement('ul');
    ul.classList.add('list-unstyled');
    const li = document.createElement('li');
    moveInstrumentation(socialRow, li);
    const link = socialRow.querySelector('a');
    const picture = socialRow.querySelector('picture');
    if (link && picture) {
      const newLink = document.createElement('a');
      newLink.id = 'socialIcons';
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.setAttribute('data-cmp-clickable', '');
      const img = picture.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.loading = 'lazy';
        newImg.src = img.src;
        newImg.alt = img.alt;
        newLink.append(newImg);
      }
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      newLink.append(screenReaderSpan);
      li.append(newLink);
    }
    ul.append(li);
    socialLinksWrapper.append(ul);
  });
  rightCol.append(socialLinksWrapper);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  moveInstrumentation(copyrightRow.firstElementChild, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.firstElementChild.textContent;
  rightCol.append(copyrightSpan);

  row.append(rightCol);
  container.append(row);
  block.textContent = '';
  block.append(container);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
