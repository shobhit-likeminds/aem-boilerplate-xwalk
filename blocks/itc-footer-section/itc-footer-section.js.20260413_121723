import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    itcLogoRow,
    itcLogoLinkRow,
    itcLogoLinkLabelRow,
    fssaiLogoRow,
    grievanceTitleRow,
    grievanceNameRow,
    grievanceContactRow,
    grievanceTimeRow,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  block.textContent = '';

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const row = document.createElement('div');
  row.classList.add('row');
  container.append(row);

  // Left section (logos, grievance)
  const leftCol = document.createElement('div');
  leftCol.classList.add('col-lg-6', 'col-sm-12', 'd-flex', 'd-lg-block', 'justify-content-center');
  row.append(leftCol);

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');
  leftCol.append(footerLogos);

  // ITC Logo
  const footerItcLogo = document.createElement('div');
  footerItcLogo.classList.add('footer-itc-logo');
  footerLogos.append(footerItcLogo);

  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('logo', 'image');
  moveInstrumentation(itcLogoRow, itcLogoDiv);

  const itcLogoLink = document.createElement('a');
  itcLogoLink.classList.add('cmp-image__link');
  // Use content detection for itcLogoLinkRow
  const itcLogoLinkHref = itcLogoLinkRow.querySelector('a');
  if (itcLogoLinkHref) {
    itcLogoLink.href = itcLogoLinkHref.href;
  }
  itcLogoDiv.append(itcLogoLink);

  const itcLogoPicture = itcLogoRow.querySelector('picture');
  if (itcLogoPicture) {
    itcLogoLink.append(itcLogoPicture);
  }
  footerItcLogo.append(itcLogoDiv);

  // FSSAI Logo
  const footerFssaiLogo = document.createElement('div');
  footerFssaiLogo.classList.add('footer-fssai-logo');
  footerLogos.append(footerFssaiLogo);

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('fssailogo', 'logo', 'image');
  moveInstrumentation(fssaiLogoRow, fssaiLogoDiv);

  const fssaiLogoPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiLogoPicture) {
    fssaiLogoDiv.append(fssaiLogoPicture);
  }
  footerFssaiLogo.append(fssaiLogoDiv);

  const grievanceContainer = document.createElement('div');
  grievanceContainer.classList.add('contact-details');
  leftCol.append(grievanceContainer);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('contact-details__title', 'mb-md-3', 'mb-0');
  moveInstrumentation(grievanceTitleRow, grievanceTitle);
  while (grievanceTitleRow.firstChild) grievanceTitle.append(grievanceTitleRow.firstChild);
  grievanceContainer.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceNameRow, grievanceName);
  while (grievanceNameRow.firstChild) grievanceName.append(grievanceNameRow.firstChild);
  grievanceContainer.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceContactRow, grievanceContact);
  while (grievanceContactRow.firstChild) grievanceContact.append(grievanceContactRow.firstChild);
  grievanceContainer.append(grievanceContact);

  const grievanceTime = document.createElement('p');
  grievanceTime.classList.add('contact-details__description', 'mb-0');
  moveInstrumentation(grievanceTimeRow, grievanceTime);
  while (grievanceTimeRow.firstChild) grievanceTime.append(grievanceTimeRow.firstChild);
  grievanceContainer.append(grievanceTime);

  // Center section (footer links)
  const centerCol = document.createElement('div');
  centerCol.classList.add('col-lg-6', 'col-sm-12', 'itc-footer-link-left');
  row.append(centerCol);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container', 'd-flex');
  centerCol.append(footerListsContainer);

  const footerLinks1 = document.createElement('div');
  footerLinks1.classList.add('list-4', 'list'); // Corrected class name from original HTML
  const ul1 = document.createElement('ul');
  footerLinks1.append(ul1);
  footerListsContainer.append(footerLinks1);

  const footerLinks2 = document.createElement('div');
  footerLinks2.classList.add('list-3', 'list'); // Corrected class name from original HTML
  const ul2 = document.createElement('ul');
  ul2.classList.add('cmp-list');
  footerLinks2.append(ul2);
  footerListsContainer.append(footerLinks2);

  const footerLinks = itemRows.filter((rowItem) => rowItem.children.length === 2);
  const socialLinks = itemRows.filter((rowItem) => rowItem.children.length === 3);

  footerLinks.forEach((rowItem, index) => {
    const li = document.createElement('li');
    moveInstrumentation(rowItem, li);
    li.id = `footerLinks-${index + 1}`;

    const linkCell = [...rowItem.children].find((cell) => cell.querySelector('a'));
    const linkLabelCell = [...rowItem.children].find((cell) => !cell.querySelector('a'));

    const link = document.createElement('a');
    link.target = '_blank';
    link.setAttribute('data-cmp-clickable', '');

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      moveInstrumentation(linkCell, link);
      while (linkCell.firstChild) link.append(linkCell.firstChild);
    }
    if (linkLabelCell) {
      const span = document.createElement('span');
      span.classList.add('cmp-link__screen-reader-only');
      moveInstrumentation(linkLabelCell, span);
      while (linkLabelCell.firstChild) span.append(linkLabelCell.firstChild);
      link.append(span);
    }

    li.append(link);
    if (index % 2 === 0) {
      ul1.append(li);
    } else {
      ul2.append(li);
    }
  });

  // Right section (social links, copyright)
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-lg-6', 'col-sm-12', 'align-items-md-end', 'd-flex', 'flex-column', 'itc-footer-link-right');
  row.append(rightCol);

  const socialLinksContainer = document.createElement('div');
  rightCol.append(socialLinksContainer);

  socialLinks.forEach((rowItem) => {
    const ul = document.createElement('ul');
    ul.classList.add('list-unstyled');
    socialLinksContainer.append(ul);

    const li = document.createElement('li');
    moveInstrumentation(rowItem, li);
    ul.append(li);

    const iconLinkCell = [...rowItem.children].find((cell) => cell.querySelector('a'));
    const iconImageCell = [...rowItem.children].find((cell) => cell.querySelector('picture'));

    const link = document.createElement('a');
    link.id = 'socialIcons';
    link.target = '_blank';
    link.setAttribute('data-cmp-clickable', '');

    if (iconLinkCell) {
      const foundLink = iconLinkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      moveInstrumentation(iconLinkCell, link);
      while (iconLinkCell.firstChild) link.append(iconLinkCell.firstChild);
    }

    if (iconImageCell) {
      const picture = iconImageCell.querySelector('picture');
      if (picture) {
        link.prepend(picture);
      }
    }

    const span = document.createElement('span');
    span.classList.add('cmp-link__screen-reader-only');
    span.textContent = 'opens in a new tab';
    link.append(span);

    li.append(link);
  });

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  while (copyrightRow.firstChild) copyrightSpan.append(copyrightRow.firstChild);
  rightCol.append(copyrightSpan);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
