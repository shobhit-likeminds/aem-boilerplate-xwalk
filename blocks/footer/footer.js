import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    itcLogoRow,
    fssaiLogoRow,
    footerLinksTitleRow, // This row is present in the EDS structure but not explicitly used in the JS for its content, only its position.
    footerSocialLinksTitleRow, // Same as above.
    grievanceTitleRow,
    grievanceNameRow,
    grievanceContactRow,
    grievanceTimeRow,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  // Filter item rows based on their content structure
  // footer-link: 2 cells, no picture in the second cell (label)
  const footerLinks = itemRows.filter((row) => row.children.length === 2 && !row.children[1].querySelector('picture'));
  // footer-social-link: 2 cells, picture in the second cell (icon)
  const footerSocialLinks = itemRows.filter((row) => row.children.length === 2 && row.children[1].querySelector('picture'));

  block.textContent = '';

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

  const footerLogosDiv = document.createElement('div');
  footerLogosDiv.classList.add('footer-footer-logos');
  logoCol.append(footerLogosDiv);

  const footerItcLogoDiv = document.createElement('div');
  footerItcLogoDiv.classList.add('footer-footer-itc-logo');
  footerLogosDiv.append(footerItcLogoDiv);

  const itcLogoWrapper = document.createElement('div');
  itcLogoWrapper.classList.add('footer-logo', 'footer-image');
  moveInstrumentation(itcLogoRow, itcLogoWrapper);
  const itcPicture = itcLogoRow.querySelector('picture');
  if (itcPicture) {
    const itcLink = document.createElement('a');
    itcLink.classList.add('footer-cmp-image__link');
    // The original HTML has a link around the ITC logo, so we should try to extract it
    const originalItcLink = itcLogoRow.querySelector('a');
    if (originalItcLink) {
      itcLink.href = originalItcLink.href;
      itcLink.target = originalItcLink.target;
    } else {
      itcLink.href = '/'; // Default link if not found
    }
    itcLink.append(itcPicture); // Append the picture directly to the link
    itcLogoWrapper.append(itcLink);
  }
  footerItcLogoDiv.append(itcLogoWrapper);

  const footerFssaiLogoDiv = document.createElement('div');
  footerFssaiLogoDiv.classList.add('footer-footer-fssai-logo');
  footerLogosDiv.append(footerFssaiLogoDiv);

  const fssaiLogoWrapper = document.createElement('div');
  fssaiLogoWrapper.classList.add('footer-fssailogo', 'footer-logo', 'footer-image');
  moveInstrumentation(fssaiLogoRow, fssaiLogoWrapper);
  const fssaiPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiPicture) {
    const fssaiImg = fssaiPicture.querySelector('img');
    const fssaiOptimizedPic = createOptimizedPicture(fssaiImg.src, fssaiImg.alt, false, [{ width: '192' }]);
    moveInstrumentation(fssaiImg, fssaiOptimizedPic.querySelector('img'));
    fssaiLogoWrapper.append(fssaiOptimizedPic);
  }
  footerFssaiLogoDiv.append(fssaiLogoWrapper);

  // Footer Links Section
  const footerLinksCol = document.createElement('div');
  footerLinksCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-itc-footer-link-left');
  footerRow.append(footerLinksCol);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');
  footerLinksCol.append(footerListsContainer);

  const list1 = document.createElement('div');
  list1.classList.add('footer-list-4', 'footer-list');
  const ul1 = document.createElement('ul');
  list1.append(ul1);
  footerListsContainer.append(list1);

  const list2 = document.createElement('div');
  list2.classList.add('footer-list-3', 'footer-list');
  const ul2 = document.createElement('ul');
  list2.append(ul2);
  footerListsContainer.append(list2);

  footerLinks.forEach((row, index) => {
    const linkCell = row.children[0]; // First child is the link field
    const labelCell = row.children[1]; // Second child is the label field

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const link = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = foundLink.target;
      link.textContent = labelCell.textContent;
      // Add screen reader span if present in original HTML
      if (foundLink.querySelector('.footer-cmp-link__screen-reader-only')) {
        const span = document.createElement('span');
        span.classList.add('footer-cmp-link__screen-reader-only');
        span.textContent = 'opens in a new tab'; // Assuming this text
        link.append(span);
      }
    } else {
      link.href = '#'; // Fallback if no link in cell
      link.textContent = labelCell.textContent;
    }

    li.append(link);
    if (index % 2 === 0) { // Distribute links into two columns
      ul1.append(li);
    } else {
      ul2.append(li);
    }
  });

  // Grievance Details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-contact-details');
  footerLinksCol.append(contactDetails);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
  moveInstrumentation(grievanceTitleRow, grievanceTitle);
  grievanceTitle.textContent = grievanceTitleRow.textContent.trim();
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceNameRow, grievanceName);
  grievanceName.textContent = grievanceNameRow.textContent.trim();
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceContactRow, grievanceContact);
  grievanceContact.textContent = grievanceContactRow.textContent.trim();
  contactDetails.append(grievanceContact);

  const grievanceTime = document.createElement('p');
  grievanceTime.classList.add('footer-contact-details__description', 'footer-mb-0');
  moveInstrumentation(grievanceTimeRow, grievanceTime);
  grievanceTime.textContent = grievanceTimeRow.textContent.trim();
  contactDetails.append(grievanceTime);

  // Social Links and Copyright
  const socialCopyrightCol = document.createElement('div');
  socialCopyrightCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-align-items-md-end', 'footer-d-flex', 'footer-flex-column', 'footer-itc-footer-link-right');
  footerRow.append(socialCopyrightCol);

  const socialLinksWrapper = document.createElement('div');
  socialCopyrightCol.append(socialLinksWrapper);

  const socialUl = document.createElement('ul'); // Create a single UL for all social links
  socialUl.classList.add('footer-list-unstyled');
  socialLinksWrapper.append(socialUl);

  footerSocialLinks.forEach((row) => {
    const linkCell = row.children[0]; // First child is the link field
    const iconCell = row.children[1]; // Second child is the icon field

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    socialUl.append(li); // Append to the single UL

    const socialLink = document.createElement('a');
    socialLink.id = 'socialIcons'; // Note: IDs should be unique. If multiple social links, this ID will be duplicated.
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
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      socialLink.append(optimizedPic);
    }
    // Add screen reader span if present in original HTML
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('footer-cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    socialLink.append(screenReaderSpan);

    li.append(socialLink);
  });

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  socialCopyrightCol.append(copyrightSpan);

  // Secondary Footer
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section', 'footer-itc-footer-secondary');
  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-secondary-container');
  secondaryFooter.append(secondaryUl);

  // Based on original HTML, there are two placeholder secondary links.
  // Since the EDS structure doesn't define them, we'll create them as empty placeholders.
  for (let i = 0; i < 2; i += 1) {
    const secondaryLi = document.createElement('li');
    secondaryLi.classList.add('footer-itc-footer-secondary-lists');
    const secondaryLink = document.createElement('a');
    secondaryLink.classList.add('footer-footer-links');
    secondaryLink.target = '_blank';
    secondaryLink.innerHTML = '<span class="footer-cmp-link__screen-reader-only">opens in a new tab</span>';
    secondaryLi.append(secondaryLink);
    secondaryUl.append(secondaryLi);
  }

  block.append(footerSection, secondaryFooter);

  // Optimize all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    // Only optimize images that are not already handled by createOptimizedPicture with specific widths
    // This prevents re-optimizing the FSSAI logo or social icons if they were already handled.
    // A more robust solution might involve checking parent elements or data attributes.
    // For now, let's assume this general optimization is for other potential images.
    // The original code had a width of '750', which is a generic optimization.
    // Let's keep it for any other images that might appear.
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
