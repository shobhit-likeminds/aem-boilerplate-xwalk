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

  block.textContent = '';
  block.classList.add('itc-footer-section');

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const row = document.createElement('div');
  row.classList.add('row');
  container.append(row);

  // Left column for logos and grievance details
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
  const itcPicture = itcLogoRow.querySelector('picture');
  if (itcPicture) {
    const itcLink = document.createElement('a');
    itcLink.classList.add('cmp-image__link');
    itcLink.href = '/'; // Default link, adjust if URL is in model
    while (itcPicture.firstChild) itcLink.append(itcPicture.firstChild);
    itcLogoDiv.append(itcLink);
  } else {
    while (itcLogoRow.firstChild) itcLogoDiv.append(itcLogoRow.firstChild);
  }
  footerItcLogo.append(itcLogoDiv);

  // FSSAI Logo
  const footerFssaiLogo = document.createElement('div');
  footerFssaiLogo.classList.add('footer-fssai-logo');
  footerLogos.append(footerFssaiLogo);

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('fssailogo', 'logo', 'image');
  moveInstrumentation(fssaiLogoRow, fssaiLogoDiv);
  const fssaiPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiPicture) {
    while (fssaiPicture.firstChild) fssaiLogoDiv.append(fssaiPicture.firstChild);
  } else {
    while (fssaiLogoRow.firstChild) fssaiLogoDiv.append(fssaiLogoRow.firstChild);
  }
  footerFssaiLogo.append(fssaiLogoDiv);

  // Grievance Details
  const grievanceDetailsCol = document.createElement('div');
  grievanceDetailsCol.classList.add('col-lg-6', 'col-sm-12', 'itc-footer-link-left');
  row.append(grievanceDetailsCol);

  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');
  grievanceDetailsCol.append(contactDetails);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('contact-details__title', 'mb-md-3', 'mb-0');
  grievanceTitle.textContent = 'Grievance Officer:';
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceOfficerNameRow, grievanceName);
  grievanceName.textContent = `Name: ${grievanceOfficerNameRow.textContent.trim()}`;
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceOfficerContactRow, grievanceContact);
  grievanceContact.textContent = `Contact Info: ${grievanceOfficerContactRow.textContent.trim()}`;
  contactDetails.append(grievanceContact);

  const grievanceHours = document.createElement('p');
  grievanceHours.classList.add('contact-details__description', 'mb-0');
  moveInstrumentation(grievanceOfficerHoursRow, grievanceHours);
  grievanceHours.textContent = grievanceOfficerHoursRow.textContent.trim();
  contactDetails.append(grievanceHours);

  // Footer Links and Nav Items (grouped into two lists based on original HTML)
  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container', 'd-flex');
  grievanceDetailsCol.append(footerListsContainer);

  const footerLinksList = document.createElement('div');
  footerLinksList.classList.add('list-4', 'list');
  const footerLinksUl = document.createElement('ul');
  footerLinksList.append(footerLinksUl);
  footerListsContainer.append(footerLinksList);

  const footerNavItemsList = document.createElement('div');
  footerNavItemsList.classList.add('list-3', 'list');
  const footerNavItemsUl = document.createElement('ul');
  footerNavItemsUl.classList.add('cmp-list');
  footerNavItemsList.append(footerNavItemsUl);
  footerListsContainer.append(footerNavItemsList);

  itemRows.forEach((rowEl, index) => {
    const cells = [...rowEl.children];
    if (cells.length === 2) {
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const textCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));

      if (linkCell && textCell) {
        const li = document.createElement('li');
        moveInstrumentation(rowEl, li);
        const link = document.createElement('a');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          link.href = foundLink.href;
          link.textContent = foundLink.textContent;
          link.target = '_blank';
          link.setAttribute('data-cmp-clickable', '');
          const span = document.createElement('span');
          span.classList.add('cmp-link__screen-reader-only');
          span.textContent = 'opens in a new tab';
          link.append(span);
        } else {
          link.textContent = textCell.textContent.trim();
        }

        if (textCell.textContent.trim() === linkCell.textContent.trim()) {
          // This is a footer-link item (e.g., Privacy Policy, Terms, Talk To Us)
          li.id = `footerLinks-${index + 1}`;
          footerLinksUl.append(li);
        } else {
          // This is a footer-nav-item (e.g., Our Heritage, Shop)
          li.classList.add('cmp-list__item');
          link.classList.add('cmp-list__item-link');
          const spanTitle = document.createElement('span');
          spanTitle.classList.add('cmp-list__item-title');
          spanTitle.textContent = textCell.textContent.trim();
          link.textContent = ''; // Clear text content to replace with span
          link.append(spanTitle);
          footerNavItemsUl.append(li);
        }
        li.append(link);
      }
    }
  });

  // Right column for social links and copyright
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-lg-6', 'col-sm-12', 'align-items-md-end', 'd-flex', 'flex-column', 'itc-footer-link-right');
  row.append(rightCol);

  const socialLinksWrapper = document.createElement('div');
  rightCol.append(socialLinksWrapper);

  const socialLinks = itemRows.filter(rowEl => {
    const cells = [...rowEl.children];
    // Social links have 2 cells: cell[0] is URL (a), cell[1] is Icon (picture)
    return cells.length === 2 && cells[0].querySelector('a') && cells[1].querySelector('picture');
  });

  socialLinks.forEach((socialLinkRow) => {
    const socialLinkLi = document.createElement('li');
    socialLinkLi.id = 'socialIcons';
    moveInstrumentation(socialLinkRow, socialLinkLi);

    const socialLinkA = document.createElement('a');
    socialLinkA.target = '_blank';
    socialLinkA.setAttribute('data-cmp-clickable', '');

    const urlCell = socialLinkRow.children[0]; // As per BlockJson, URL is the first cell
    const iconCell = socialLinkRow.children[1]; // As per BlockJson, Icon is the second cell

    if (urlCell && iconCell) {
      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        socialLinkA.href = foundLink.href;
      }
      const picture = iconCell.querySelector('picture');
      if (picture) {
        while (picture.firstChild) socialLinkA.append(picture.firstChild);
      }
      const span = document.createElement('span');
      span.classList.add('cmp-link__screen-reader-only');
      span.textContent = 'opens in a new tab';
      socialLinkA.append(span);
    }
    socialLinkLi.append(socialLinkA);

    const ul = document.createElement('ul');
    ul.classList.add('list-unstyled');
    ul.append(socialLinkLi);
    socialLinksWrapper.append(ul);
  });

  // Copyright
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  rightCol.append(copyrightSpan);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
