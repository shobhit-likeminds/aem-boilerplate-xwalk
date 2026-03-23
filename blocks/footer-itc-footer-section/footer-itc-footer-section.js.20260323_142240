import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Root model fields from BlockJson
  const footerLogosContainerRow = children[0]; // container for footerLogo items
  const footerLinksContainerRow = children[1]; // container for footerLink items
  const footerSocialIconsContainerRow = children[2]; // container for footerSocialIcon items
  const grievanceOfficerTitleRow = children[3]; // text
  const grievanceOfficerNameRow = children[4]; // text
  const grievanceOfficerContactRow = children[5]; // text
  const grievanceOfficerHoursRow = children[6]; // text
  const copyrightRow = children[7]; // text
  const footerSecondaryLinksContainerRow = children[8]; // container for footerSecondaryLink items

  // All item rows start from index 9
  const itemRows = children.slice(9);

  // Filter item rows based on their structure (number of cells and content type)
  const footerLogos = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture') && row.children[1].querySelector('a'));
  const footerLinks = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && !row.children[1].querySelector('picture'));
  const footerSocialIcons = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].querySelector('picture'));
  const footerSecondaryLinks = itemRows.filter((row) => row.children.length === 1 && row.children[0].querySelector('a'));

  block.innerHTML = '';

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-itc-footer-section-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-itc-footer-section-row');

  // Left Section - Logos
  const leftCol = document.createElement('div');
  leftCol.classList.add('footer-itc-footer-section-col-lg-6', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-d-flex', 'footer-itc-footer-section-d-lg-block', 'footer-itc-footer-section-justify-content-center');

  const footerLogosWrapper = document.createElement('div');
  footerLogosWrapper.classList.add('footer-itc-footer-section-footer-logos');
  moveInstrumentation(footerLogosContainerRow, footerLogosWrapper);

  footerLogos.forEach((row) => {
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('footer-itc-footer-section-footer-itc-logo');
    moveInstrumentation(row, logoDiv);

    const logoImageDiv = document.createElement('div');
    logoImageDiv.classList.add('footer-itc-footer-section-logo', 'footer-itc-footer-section-image');
    logoDiv.append(logoImageDiv);

    const linkEl = document.createElement('a');
    linkEl.classList.add('footer-itc-footer-section-cmp-image__link');

    // Link is in cell[1], image in cell[0] for footerLogo
    const linkCell = row.children[1];
    const pictureCell = row.children[0];

    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      linkEl.href = foundLink.href;
      linkEl.target = '_blank'; // Assuming external links based on original HTML
      moveInstrumentation(linkCell, linkEl);
    }

    if (pictureCell && pictureCell.querySelector('picture')) {
      const picture = pictureCell.querySelector('picture');
      moveInstrumentation(pictureCell, linkEl);
      linkEl.append(picture);
    }
    logoImageDiv.append(linkEl);
    footerLogosWrapper.append(logoDiv);
  });
  leftCol.append(footerLogosWrapper);
  footerRow.append(leftCol);

  // Middle Section - Page Links (empty in original HTML, but structure is there)
  const middleCol = document.createElement('div');
  middleCol.classList.add('footer-itc-footer-section-col-lg-3', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-d-flex', 'footer-itc-footer-section-justify-content-xl-between', 'footer-itc-footer-section-footer-page-links-wrapper', 'footer-itc-footer-section-pt-md-0', 'footer-itc-footer-section-pt-4', 'footer-itc-footer-section-px-1');
  footerRow.append(middleCol);

  // Right Section - Footer Links and Grievance Officer
  const rightColLeft = document.createElement('div');
  rightColLeft.classList.add('footer-itc-footer-section-col-lg-6', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-itc-footer-link-left');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-itc-footer-section-footer-lists-container', 'footer-itc-footer-section-d-flex');
  moveInstrumentation(footerLinksContainerRow, footerListsContainer);

  const footerLinksUl = document.createElement('ul');
  footerLinksUl.classList.add('footer-itc-footer-section-list-4', 'footer-itc-footer-section-list');
  footerLinks.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.id = `footerLinks-${index + 1}`;

    // Link is in cell[0], label in cell[1] for footerLink
    const linkCell = row.children[0];
    const labelCell = row.children[1];

    const a = document.createElement('a');
    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      a.href = foundLink.href;
      a.target = '_blank';
      a.setAttribute('data-cmp-clickable', '');
      moveInstrumentation(linkCell, a);
      if (labelCell) {
        a.textContent = labelCell.textContent.trim();
      }
    } else if (labelCell) {
      a.textContent = labelCell.textContent.trim();
    }
    li.append(a);
    footerLinksUl.append(li);
  });
  footerListsContainer.append(footerLinksUl);
  rightColLeft.append(footerListsContainer);

  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-itc-footer-section-contact-details');

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-itc-footer-section-contact-details__title', 'footer-itc-footer-section-mb-md-3', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerTitleRow, grievanceTitle);
  grievanceTitle.textContent = grievanceOfficerTitleRow.textContent.trim();
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-md-1', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerNameRow, grievanceName);
  grievanceName.textContent = grievanceOfficerNameRow.textContent.trim();
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-md-1', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerContactRow, grievanceContact);
  grievanceContact.textContent = grievanceOfficerContactRow.textContent.trim();
  contactDetails.append(grievanceContact);

  const grievanceHours = document.createElement('p');
  grievanceHours.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerHoursRow, grievanceHours);
  grievanceHours.textContent = grievanceOfficerHoursRow.textContent.trim();
  contactDetails.append(grievanceHours);

  rightColLeft.append(contactDetails);
  footerRow.append(rightColLeft);

  // Right Section - Social Icons and Copyright
  const rightColRight = document.createElement('div');
  rightColRight.classList.add('footer-itc-footer-section-col-lg-6', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-align-items-md-end', 'footer-itc-footer-section-d-flex', 'footer-itc-footer-section-flex-column', 'footer-itc-footer-section-itc-footer-link-right');

  const socialIconsWrapper = document.createElement('div');
  moveInstrumentation(footerSocialIconsContainerRow, socialIconsWrapper);

  footerSocialIcons.forEach((row) => {
    const ul = document.createElement('ul');
    ul.classList.add('footer-itc-footer-section-list-unstyled');
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Link is in cell[0], icon in cell[1] for footerSocialIcon
    const linkCell = row.children[0];
    const iconCell = row.children[1];

    if (linkCell && iconCell) {
      const foundLink = linkCell.querySelector('a');
      const a = document.createElement('a');
      a.id = 'socialIcons';
      if (foundLink) {
        a.href = foundLink.href;
        a.target = '_blank';
        a.setAttribute('data-cmp-clickable', '');
      }
      moveInstrumentation(linkCell, a);
      if (iconCell.querySelector('picture')) {
        const picture = iconCell.querySelector('picture');
        if (picture) {
          moveInstrumentation(iconCell, a);
          a.append(picture);
        }
      }
      li.append(a);
    }
    ul.append(li);
    socialIconsWrapper.append(ul);
  });
  rightColRight.append(socialIconsWrapper);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-itc-footer-section-footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  rightColRight.append(copyrightSpan);
  footerRow.append(rightColRight);

  footerContainer.append(footerRow);
  block.append(footerContainer);

  // Secondary Footer
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section-itc-footer-section', 'footer-itc-footer-section-itc-footer-secondary');

  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-section-itc-footer-secondary-container');
  moveInstrumentation(footerSecondaryLinksContainerRow, secondaryUl);

  footerSecondaryLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('footer-itc-footer-section-itc-footer-secondary-lists');
    moveInstrumentation(row, li);
    const linkCell = row.children[0]; // Link is in cell[0] for footerSecondaryLink
    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      const a = document.createElement('a');
      a.classList.add('footer-itc-footer-section-footer-links');
      if (foundLink) {
        a.href = foundLink.href;
        a.target = '_blank';
      }
      moveInstrumentation(linkCell, a);
      while (linkCell.firstChild) a.append(linkCell.firstChild);
      li.append(a);
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
