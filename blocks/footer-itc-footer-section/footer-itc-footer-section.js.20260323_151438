import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    fssaiLogoRow,
    footerLinksContainerRow, // This row is a container, its children are the actual items
    footerNavigationContainerRow, // This row is a container, its children are the actual items
    grievanceOfficerTitleRow,
    grievanceOfficerNameRow,
    grievanceOfficerContactRow,
    grievanceOfficerTimeRow,
    footerSocialsContainerRow, // This row is a container, its children are the actual items
    copyrightRow,
    // No 'itemRows' here, as the containers hold the items.
    // We will get items from the children of the container rows.
  ] = [...block.children];

  // Main footer container
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-itc-footer-section-container');

  // Main footer row
  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-itc-footer-section-row');

  // Column 1: Logos
  const col1 = document.createElement('div');
  col1.classList.add(
    'footer-itc-footer-section-col-lg-6',
    'footer-itc-footer-section-col-sm-12',
    'footer-itc-footer-section-d-flex',
    'footer-itc-footer-section-d-lg-block',
    'footer-itc-footer-section-justify-content-center',
  );

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-itc-footer-section-footer-logos');

  // ITC Logo
  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('footer-itc-footer-section-footer-itc-logo');
  const itcLogoWrapper = document.createElement('div');
  itcLogoWrapper.classList.add('footer-itc-footer-section-itc-logo', 'footer-itc-footer-section-logo', 'footer-itc-footer-section-image');
  moveInstrumentation(logoRow, itcLogoWrapper);
  const itcLogoLink = document.createElement('a');
  itcLogoLink.classList.add('footer-itc-footer-section-cmp-image__link');
  const itcLogoPicture = logoRow.querySelector('picture');
  if (itcLogoPicture) {
    const img = itcLogoPicture.querySelector('img');
    if (img) {
      const src = img.src;
      const alt = img.alt;
      const link = logoRow.querySelector('a');
      if (link) {
        itcLogoLink.href = link.href;
      } else {
        itcLogoLink.href = '#'; // Default or empty link
      }
      itcLogoLink.append(createOptimizedPicture(src, alt, false, [{ width: '93' }]));
    }
  }
  itcLogoWrapper.append(itcLogoLink);
  itcLogoDiv.append(itcLogoWrapper);
  footerLogos.append(itcLogoDiv);

  // FSSAI Logo
  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('footer-itc-footer-section-footer-fssai-logo');
  const fssaiLogoWrapper = document.createElement('div');
  fssaiLogoWrapper.classList.add('footer-itc-footer-section-fssailogo', 'footer-itc-footer-section-logo', 'footer-itc-footer-section-image');
  moveInstrumentation(fssaiLogoRow, fssaiLogoWrapper);
  const fssaiLogoPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiLogoPicture) {
    const img = fssaiLogoPicture.querySelector('img');
    if (img) {
      const src = img.src;
      const alt = img.alt;
      const link = fssaiLogoRow.querySelector('a');
      if (link) {
        // FSSAI logo might not have a link in the model, handle gracefully
        const fssaiLink = document.createElement('a');
        fssaiLink.href = link.href;
        fssaiLink.append(createOptimizedPicture(src, alt, false, [{ width: '192' }]));
        fssaiLogoWrapper.append(fssaiLink);
      } else {
        fssaiLogoWrapper.append(createOptimizedPicture(src, alt, false, [{ width: '192' }]));
      }
    }
  }
  fssaiLogoDiv.append(fssaiLogoWrapper);
  footerLogos.append(fssaiLogoDiv);

  col1.append(footerLogos);
  footerRow.append(col1);

  // Column 2: Footer Links and Navigation
  const col2 = document.createElement('div');
  col2.classList.add(
    'footer-itc-footer-section-col-lg-6',
    'footer-itc-footer-section-col-sm-12',
    'footer-itc-footer-section-itc-footer-link-left',
  );

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-itc-footer-section-footer-lists-container', 'footer-itc-footer-section-d-flex');

  // Footer Links (list 4)
  const footerLinksListDiv = document.createElement('div');
  footerLinksListDiv.classList.add('footer-itc-footer-section-list-4', 'footer-itc-footer-section-list');
  const footerLinksUl = document.createElement('ul');
  // Get items from the footerLinksContainerRow
  const footerLinks = [...footerLinksContainerRow.children];
  footerLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const linkCell = row.querySelector('div:first-child');
    const textCell = row.querySelector('div:last-child');

    const linkEl = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      linkEl.append(foundLink.textContent);
    } else {
      linkEl.href = '#';
      linkEl.append(textCell.textContent);
    }
    li.append(linkEl);
    footerLinksUl.append(li);
  });
  footerLinksListDiv.append(footerLinksUl);
  footerListsContainer.append(footerLinksListDiv);

  // Footer Navigation (list 3)
  const footerNavigationListDiv = document.createElement('div');
  footerNavigationListDiv.classList.add('footer-itc-footer-section-list-3', 'footer-itc-footer-section-list');
  const footerNavigationUl = document.createElement('ul');
  footerNavigationUl.classList.add('footer-itc-footer-section-cmp-list');
  // Get items from the footerNavigationContainerRow
  const footerNavigationItems = [...footerNavigationContainerRow.children];

  footerNavigationItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('footer-itc-footer-section-cmp-list__item');
    const linkCell = row.querySelector('div:first-child');
    const textCell = row.querySelector('div:last-child');

    const linkEl = document.createElement('a');
    linkEl.classList.add('footer-itc-footer-section-cmp-list__item-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      const span = document.createElement('span');
      span.classList.add('footer-itc-footer-section-cmp-list__item-title');
      span.append(textCell.textContent);
      linkEl.append(span);
    } else {
      linkEl.href = '#';
      const span = document.createElement('span');
      span.classList.add('footer-itc-footer-section-cmp-list__item-title');
      span.append(textCell.textContent);
      linkEl.append(span);
    }
    li.append(linkEl);
    footerNavigationUl.append(li);
  });
  footerNavigationListDiv.append(footerNavigationUl);
  footerListsContainer.append(footerNavigationListDiv);

  col2.append(footerListsContainer);

  // Contact Details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-itc-footer-section-contact-details');

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-itc-footer-section-contact-details__title', 'footer-itc-footer-section-mb-md-3', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerTitleRow, grievanceTitle);
  grievanceTitle.append(grievanceOfficerTitleRow.querySelector('div').textContent);
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-md-1', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerNameRow, grievanceName);
  grievanceName.append(grievanceOfficerNameRow.querySelector('div').textContent);
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-md-1', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerContactRow, grievanceContact);
  grievanceContact.append(grievanceOfficerContactRow.querySelector('div').textContent);
  contactDetails.append(grievanceContact);

  const grievanceTime = document.createElement('p');
  grievanceTime.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerTimeRow, grievanceTime);
  grievanceTime.append(grievanceOfficerTimeRow.querySelector('div').textContent);
  contactDetails.append(grievanceTime);

  col2.append(contactDetails);
  footerRow.append(col2);

  // Column 3: Socials and Copyright
  const col3 = document.createElement('div');
  col3.classList.add(
    'footer-itc-footer-section-col-lg-6',
    'footer-itc-footer-section-col-sm-12',
    'footer-itc-footer-section-align-items-md-end',
    'footer-itc-footer-section-d-flex',
    'footer-itc-footer-section-flex-column',
    'footer-itc-footer-section-itc-footer-link-right',
  );

  const socialWrapper = document.createElement('div');
  // Get items from the footerSocialsContainerRow
  const footerSocials = [...footerSocialsContainerRow.children];
  footerSocials.forEach((row) => {
    const ul = document.createElement('ul');
    ul.classList.add('footer-itc-footer-section-list-unstyled');
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const linkCell = row.querySelector('div:first-child');
    const iconCell = row.querySelector('div:last-child');

    const socialLink = document.createElement('a');
    socialLink.id = 'socialIcons';
    socialLink.target = '_blank';
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      socialLink.href = foundLink.href;
    } else {
      socialLink.href = '#';
    }

    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        socialLink.append(optimizedPic);
      }
    }
    li.append(socialLink);
    ul.append(li);
    socialWrapper.append(ul);
  });
  col3.append(socialWrapper);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-itc-footer-section-footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.append(copyrightRow.querySelector('div').textContent);
  col3.append(copyrightSpan);

  footerRow.append(col3);

  footerContainer.append(footerRow);
  block.textContent = '';
  block.append(footerContainer);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
