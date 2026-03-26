import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    itcLogoRow,
    fssaiLogoRow,
    footerLinksContainerRow, // This row is a container, its children are the actual footer-link items
    socialLinksContainerRow, // This row is a container, its children are the actual social-link items
    copyrightRow,
    grievanceOfficerTitleRow,
    grievanceOfficerNameRow,
    grievanceContactInfoRow,
    grievanceHoursRow,
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
  const colLeft = document.createElement('div');
  colLeft.classList.add('col-lg-6', 'col-sm-12', 'd-flex', 'd-lg-block', 'justify-content-center'); // Removed 'itc-footer-link-left' as it's not present in original HTML for this div
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
  moveInstrumentation(itcLogoRow, itcLogoDiv);
  // The original HTML shows the image inside an 'a' tag, which is inside a 'div' with class 'cmp-image'
  // We need to replicate this structure for proper rendering and instrumentation.
  const itcLogoLink = itcLogoRow.querySelector('a');
  if (itcLogoLink) {
    const newLink = document.createElement('a');
    newLink.href = itcLogoLink.href;
    newLink.target = itcLogoLink.target;
    newLink.classList.add('cmp-image__link'); // Add class from original HTML
    const img = itcLogoLink.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      newLink.append(optimizedPic);
    }
    itcLogoDiv.append(newLink);
  } else {
    // Fallback if no link is found, just append the picture
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
  // The original HTML shows the image directly inside the div, or inside an 'a' tag.
  // We need to replicate this structure for proper rendering and instrumentation.
  const fssaiLogoLink = fssaiLogoRow.querySelector('a');
  if (fssaiLogoLink) {
    const newLink = document.createElement('a');
    newLink.href = fssaiLogoLink.href;
    newLink.target = fssaiLogoLink.target;
    newLink.classList.add('cmp-image__link'); // Add class from original HTML
    const img = fssaiLogoLink.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      newLink.append(optimizedPic);
    }
    fssaiLogoDiv.append(newLink);
  } else {
    // Fallback if no link is found, just append the picture
    while (fssaiLogoRow.firstChild) fssaiLogoDiv.append(fssaiLogoRow.firstChild);
  }
  footerFssaiLogo.append(fssaiLogoDiv);

  // Grievance Details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');
  colLeft.append(contactDetails);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('contact-details__title', 'mb-md-3', 'mb-0');
  moveInstrumentation(grievanceOfficerTitleRow, grievanceTitle);
  while (grievanceOfficerTitleRow.firstChild) grievanceTitle.append(grievanceOfficerTitleRow.firstChild);
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceOfficerNameRow, grievanceName);
  while (grievanceOfficerNameRow.firstChild) grievanceName.append(grievanceOfficerNameRow.firstChild);
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceContactInfoRow, grievanceContact);
  while (grievanceContactInfoRow.firstChild) grievanceContact.append(grievanceContactInfoRow.firstChild);
  contactDetails.append(grievanceContact);

  const grievanceHours = document.createElement('p');
  grievanceHours.classList.add('contact-details__description', 'mb-0');
  moveInstrumentation(grievanceHoursRow, grievanceHours);
  while (grievanceHoursRow.firstChild) grievanceHours.append(grievanceHoursRow.firstChild);
  contactDetails.append(grievanceHours);

  // Right column for footer links and social links
  const colRight = document.createElement('div');
  colRight.classList.add('col-lg-6', 'col-sm-12', 'align-items-md-end', 'd-flex', 'flex-column', 'itc-footer-link-right');
  row.append(colRight);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container', 'd-flex');
  colRight.append(footerListsContainer);

  // Process footer links (from footerLinksContainerRow)
  const footerLinks = [...footerLinksContainerRow.children]; // Get children of the container row
  if (footerLinks.length > 0) {
    const list4 = document.createElement('div');
    list4.classList.add('list-4', 'list');
    footerListsContainer.append(list4);

    const ulFooterLinks = document.createElement('ul');
    list4.append(ulFooterLinks);

    footerLinks.forEach((linkRow, index) => {
      // Each linkRow here corresponds to a 'footer-link' item, which has 1 cell
      const li = document.createElement('li');
      moveInstrumentation(linkRow, li);
      li.id = `footerLinks-${index + 1}`;
      const link = linkRow.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.textContent = link.textContent;
        newLink.setAttribute('data-cmp-clickable', '');
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        newLink.append(screenReaderSpan);
        li.append(newLink);
      }
      ulFooterLinks.append(li);
    });
  }

  // Social Links (from socialLinksContainerRow)
  const socialLinks = [...socialLinksContainerRow.children]; // Get children of the container row
  if (socialLinks.length > 0) {
    const socialLinksWrapper = document.createElement('div');
    colRight.append(socialLinksWrapper);

    socialLinks.forEach((socialLinkRow) => {
      // Each socialLinkRow here corresponds to a 'social-link' item, which has 2 cells
      const ulSocialLinks = document.createElement('ul');
      ulSocialLinks.classList.add('list-unstyled');
      moveInstrumentation(socialLinkRow, ulSocialLinks);

      const li = document.createElement('li');
      ulSocialLinks.append(li);

      const linkCell = socialLinkRow.children[0];
      const iconCell = socialLinkRow.children[1];

      const link = linkCell.querySelector('a');
      const iconPicture = iconCell.querySelector('picture');

      if (link && iconPicture) {
        const newLink = document.createElement('a');
        newLink.id = 'socialIcons';
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.setAttribute('data-cmp-clickable', '');

        const img = iconPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          newLink.append(optimizedPic);
        }

        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        newLink.append(screenReaderSpan);
        li.append(newLink);
      }
      socialLinksWrapper.append(ulSocialLinks);
    });
  }

  // Copyright
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  while (copyrightRow.firstChild) copyrightSpan.append(copyrightRow.firstChild);
  colRight.append(copyrightSpan);

  // This part is for optimizing any remaining pictures that might not have been handled
  // by specific logic above (e.g., if the initial logo handling was simplified).
  // It should be applied to all images within the block.
  block.querySelectorAll('picture > img').forEach((img) => {
    // Check if the image is already inside an optimized picture, if so, skip
    if (!img.closest('.cmp-image')) { // Avoid re-optimizing images already handled by AEM's cmp-image
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  });
}
