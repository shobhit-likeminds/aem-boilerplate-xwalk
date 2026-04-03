import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    itcLogoRow,
    fssaiLogoRow,
    grievanceOfficerTitleRow,
    grievanceOfficerNameRow,
    grievanceOfficerContactRow,
    grievanceOfficerHoursRow,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  // Main footer container
  const container = document.createElement('div');
  container.classList.add('container');
  const row = document.createElement('div');
  row.classList.add('row');
  container.append(row);

  // Left column for logos and contact details
  const colLeft = document.createElement('div');
  colLeft.classList.add('col-lg-6', 'col-sm-12', 'd-flex', 'd-lg-block', 'justify-content-center');

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');

  // ITC Logo
  if (itcLogoRow) {
    const footerItcLogo = document.createElement('div');
    footerItcLogo.classList.add('footer-itc-logo');
    const logoImageDiv = document.createElement('div');
    logoImageDiv.classList.add('logo', 'image');
    const picture = itcLogoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const link = document.createElement('a');
      link.classList.add('cmp-image__link');
      link.href = '/'; // Default link, update if a specific link is needed from model
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '93' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      link.append(optimizedPic);
      logoImageDiv.append(link);
    } else {
      moveInstrumentation(itcLogoRow, logoImageDiv);
      while (itcLogoRow.firstChild) logoImageDiv.append(itcLogoRow.firstChild);
    }
    footerItcLogo.append(logoImageDiv);
    footerLogos.append(footerItcLogo);
  }

  // FSSAI Logo
  if (fssaiLogoRow) {
    const footerFssaiLogo = document.createElement('div');
    footerFssaiLogo.classList.add('footer-fssai-logo');
    const fssaiLogoImageDiv = document.createElement('div');
    fssaiLogoImageDiv.classList.add('fssailogo', 'logo', 'image');
    const picture = fssaiLogoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '192' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      fssaiLogoImageDiv.append(optimizedPic);
    } else {
      moveInstrumentation(fssaiLogoRow, fssaiLogoImageDiv);
      while (fssaiLogoRow.firstChild) fssaiLogoImageDiv.append(fssaiLogoRow.firstChild);
    }
    footerFssaiLogo.append(fssaiLogoImageDiv);
    footerLogos.append(footerFssaiLogo);
  }
  colLeft.append(footerLogos);

  // Contact Details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');

  if (grievanceOfficerTitleRow) {
    const title = document.createElement('h5');
    title.classList.add('contact-details__title', 'mb-md-3', 'mb-0');
    moveInstrumentation(grievanceOfficerTitleRow, title);
    while (grievanceOfficerTitleRow.firstChild) title.append(grievanceOfficerTitleRow.firstChild);
    contactDetails.append(title);
  }

  if (grievanceOfficerNameRow) {
    const name = document.createElement('p');
    name.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
    moveInstrumentation(grievanceOfficerNameRow, name);
    while (grievanceOfficerNameRow.firstChild) name.append(grievanceOfficerNameRow.firstChild);
    contactDetails.append(name);
  }

  if (grievanceOfficerContactRow) {
    const contact = document.createElement('p');
    contact.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
    moveInstrumentation(grievanceOfficerContactRow, contact);
    while (grievanceOfficerContactRow.firstChild) contact.append(grievanceOfficerContactRow.firstChild);
    contactDetails.append(contact);
  }

  if (grievanceOfficerHoursRow) {
    const hours = document.createElement('p');
    hours.classList.add('contact-details__description', 'mb-0');
    moveInstrumentation(grievanceOfficerHoursRow, hours);
    while (grievanceOfficerHoursRow.firstChild) hours.append(grievanceOfficerHoursRow.firstChild);
    contactDetails.append(hours);
  }
  colLeft.append(contactDetails);

  // Footer Links (main)
  const footerLinksCol = document.createElement('div');
  footerLinksCol.classList.add('col-lg-6', 'col-sm-12', 'itc-footer-link-left');
  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container', 'd-flex');

  const footerLinksList1 = document.createElement('div');
  footerLinksList1.classList.add('list-4', 'list');
  const ul1 = document.createElement('ul');
  footerLinksList1.append(ul1);

  const footerLinksList2 = document.createElement('div');
  footerLinksList2.classList.add('list-3', 'list');
  const ul2 = document.createElement('ul');
  ul2.classList.add('cmp-list');
  footerLinksList2.append(ul2);

  const footerLinks = itemRows.filter((rowItem) => rowItem.children.length === 2 && !rowItem.querySelector('picture'));
  footerLinks.forEach((linkRow, index) => {
    const li = document.createElement('li');
    moveInstrumentation(linkRow, li);
    const cells = [...linkRow.children];
    const labelCell = cells.find(cell => !cell.querySelector('a'));
    const urlCell = cells.find(cell => cell.querySelector('a'));

    if (labelCell && urlCell) {
      const link = document.createElement('a');
      link.target = '_blank';
      link.setAttribute('data-cmp-clickable', '');
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      link.textContent = labelCell.textContent.trim();
      const screenReaderOnly = document.createElement('span');
      screenReaderOnly.classList.add('cmp-link__screen-reader-only');
      screenReaderOnly.textContent = 'opens in a new tab';
      link.append(screenReaderOnly);
      li.append(link);
    }
    if (index % 2 === 0) {
      ul1.append(li);
    } else {
      li.classList.add('cmp-list__item');
      const link = li.querySelector('a');
      if (link) {
        link.classList.add('cmp-list__item-link');
        const span = document.createElement('span');
        span.classList.add('cmp-list__item-title');
        span.textContent = link.textContent.replace('opens in a new tab', '');
        link.textContent = '';
        link.append(span);
        const screenReaderOnly = document.createElement('span');
        screenReaderOnly.classList.add('cmp-link__screen-reader-only');
        screenReaderOnly.textContent = 'opens in a new tab';
        link.append(screenReaderOnly);
      }
      ul2.append(li);
    }
  });

  footerListsContainer.append(footerLinksList1, footerLinksList2);
  footerLinksCol.append(footerListsContainer);

  // Social Links
  const socialLinksCol = document.createElement('div');
  socialLinksCol.classList.add('col-lg-6', 'col-sm-12', 'align-items-md-end', 'd-flex', 'flex-column', 'itc-footer-link-right');
  const socialLinksWrapper = document.createElement('div');

  const socialLinks = itemRows.filter((rowItem) => rowItem.children.length === 2 && rowItem.querySelector('picture'));
  socialLinks.forEach((socialLinkRow) => {
    const ul = document.createElement('ul');
    ul.classList.add('list-unstyled');
    const li = document.createElement('li');
    moveInstrumentation(socialLinkRow, li);

    const cells = [...socialLinkRow.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const urlCell = cells.find(cell => cell.querySelector('a'));

    if (iconCell && urlCell) {
      const link = document.createElement('a');
      link.id = 'socialIcons';
      link.target = '_blank';
      link.setAttribute('data-cmp-clickable', '');
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        link.append(optimizedPic);
      } else {
        moveInstrumentation(iconCell, link);
        while (iconCell.firstChild) link.append(iconCell.firstChild);
      }
      const screenReaderOnly = document.createElement('span');
      screenReaderOnly.classList.add('cmp-link__screen-reader-only');
      screenReaderOnly.textContent = 'opens in a new tab';
      link.append(screenReaderOnly);
      li.append(link);
    }
    ul.append(li);
    socialLinksWrapper.append(ul);
  });
  socialLinksCol.append(socialLinksWrapper);

  // Copyright
  if (copyrightRow) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-link');
    moveInstrumentation(copyrightRow, copyrightSpan);
    while (copyrightRow.firstChild) copyrightSpan.append(copyrightRow.firstChild);
    socialLinksCol.append(copyrightSpan);
  }

  row.append(colLeft, footerLinksCol, socialLinksCol);
  block.textContent = '';
  block.append(container);

  // Secondary Footer
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('itc-footer-section', 'itc-footer-secondary');
  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('itc-footer-secondary-container');

  const footerSecondaryLinks = itemRows.filter((rowItem) => rowItem.children.length === 1);
  footerSecondaryLinks.forEach((linkRow) => {
    const li = document.createElement('li');
    li.classList.add('itc-footer-secondary-lists');
    moveInstrumentation(linkRow, li);
    const urlCell = [...linkRow.children].find(cell => cell.querySelector('a'));
    if (urlCell) {
      const link = document.createElement('a');
      link.classList.add('footer-links');
      link.target = '_blank';
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.textContent = foundLink.textContent;
      }
      const screenReaderOnly = document.createElement('span');
      screenReaderOnly.classList.add('cmp-link__screen-reader-only');
      screenReaderOnly.textContent = 'opens in a new tab';
      link.append(screenReaderOnly);
      li.append(link);
    }
    secondaryUl.append(li);
  });
  secondaryFooter.append(secondaryUl);
  block.append(secondaryFooter);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
