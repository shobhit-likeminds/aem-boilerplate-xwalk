import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson
  const [
    footerLogosContainer,
    footerLinksContainer,
    footerSocialsContainer,
    copyrightRow,
    grievanceOfficerRow,
    ...itemRows
  ] = [...block.children];

  // Filter item rows based on BlockJson structure
  // footer-link: 1 cell (link)
  const footerLinks = itemRows.filter((row) => row.children.length === 1 && row.querySelector('a'));
  // footer-social: 2 cells (link, icon)
  const footerSocials = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].querySelector('picture'));
  // footer-logo: 2 cells (image, link)
  const footerLogos = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture') && row.children[1].querySelector('a'));

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');

  // Left column for logos
  const leftCol = document.createElement('div');
  leftCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-d-flex', 'footer-d-lg-block', 'footer-justify-content-center');

  const footerLogosWrapper = document.createElement('div');
  footerLogosWrapper.classList.add('footer-footer-logos');

  footerLogos.forEach((row) => {
    const logoWrapper = document.createElement('div');
    logoWrapper.classList.add('footer-footer-itc-logo');
    moveInstrumentation(row, logoWrapper);

    const logoImageDiv = document.createElement('div');
    logoImageDiv.classList.add('footer-logo', 'footer-image');

    // Access cells directly based on BlockJson structure for footer-logo
    const pictureCell = row.children[0]; // Logo Image
    const linkCell = row.children[1];    // Logo Link

    if (pictureCell && linkCell) {
      const img = pictureCell.querySelector('img');
      const linkElement = linkCell.querySelector('a'); // Get the <a> element from the link cell
      if (img && linkElement) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));

        const link = document.createElement('a');
        link.classList.add('footer-cmp-image__link'); // Use class from original HTML
        link.href = linkElement.href;
        link.append(optimizedPic);
        logoImageDiv.append(link);
      }
    } else if (pictureCell) { // Case where only image is provided, no link
      const img = pictureCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        logoImageDiv.append(optimizedPic);
      }
    }
    logoWrapper.append(logoImageDiv);
    footerLogosWrapper.append(logoWrapper);
  });
  leftCol.append(footerLogosWrapper);

  // Middle column for links
  const middleCol = document.createElement('div');
  middleCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-itc-footer-link-left');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');

  const footerLinksList = document.createElement('ul');
  footerLinksList.classList.add('footer-list-4', 'footer-list'); // Use classes from original HTML

  footerLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const link = row.querySelector('a'); // footer-link has only one cell, containing the link
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.target = '_blank'; // Assuming links open in new tab based on original HTML
      newLink.setAttribute('data-cmp-clickable', '');
      li.append(newLink);
    }
    footerLinksList.append(li);
  });
  footerListsContainer.append(footerLinksList);
  middleCol.append(footerListsContainer);

  // Grievance Officer section
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-contact-details');
  if (grievanceOfficerRow) {
    moveInstrumentation(grievanceOfficerRow, contactDetails);
    const grievanceContent = grievanceOfficerRow.querySelector('div');
    if (grievanceContent) {
      const title = document.createElement('h5');
      title.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
      title.textContent = 'Grievance Officer:';
      contactDetails.append(title);

      [...grievanceContent.children].forEach((p) => {
        const description = document.createElement('p');
        description.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
        description.append(p.cloneNode(true));
        contactDetails.append(description);
      });
    }
  }
  middleCol.append(contactDetails);

  // Right column for socials and copyright
  const rightCol = document.createElement('div');
  rightCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-align-items-md-end', 'footer-d-flex', 'footer-flex-column', 'footer-itc-footer-link-right');

  const socialIconsWrapper = document.createElement('div');
  footerSocials.forEach((row) => {
    const ul = document.createElement('ul');
    ul.classList.add('footer-list-unstyled'); // Use class from original HTML
    moveInstrumentation(row, ul);

    const li = document.createElement('li');
    // Access cells directly based on BlockJson structure for footer-social
    const socialLinkCell = row.children[0];      // Social Link
    const socialIconPictureCell = row.children[1]; // Icon

    if (socialLinkCell && socialIconPictureCell) {
      const socialLink = socialLinkCell.querySelector('a');
      const socialIconPicture = socialIconPictureCell.querySelector('picture');

      if (socialLink && socialIconPicture) {
        const img = socialIconPicture.querySelector('img');
        const newLink = document.createElement('a');
        newLink.id = 'socialIcons'; // Use ID from original HTML
        newLink.href = socialLink.href;
        newLink.target = '_blank';
        newLink.setAttribute('data-cmp-clickable', '');

        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          newLink.append(optimizedPic);
        }
        li.append(newLink);
      }
    }
    ul.append(li);
    socialIconsWrapper.append(ul);
  });
  rightCol.append(socialIconsWrapper);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-footer-link'); // Use class from original HTML
  if (copyrightRow) {
    moveInstrumentation(copyrightRow, copyrightSpan);
    copyrightSpan.textContent = copyrightRow.textContent.trim();
  }
  rightCol.append(copyrightSpan);

  footerRow.append(leftCol, middleCol, rightCol);
  footerContainer.append(footerRow);

  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section', 'footer-itc-footer-secondary'); // Use classes from original HTML
  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-secondary-container'); // Use class from original HTML

  // Re-using footerLinks for the secondary footer, assuming the content is the same
  footerLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('footer-itc-footer-secondary-lists'); // Use class from original HTML
    moveInstrumentation(row, li);
    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.classList.add('footer-footer-links'); // Use class from original HTML
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.textContent = link.textContent;
      li.append(newLink);
    }
    secondaryUl.append(li);
  });
  secondaryFooter.append(secondaryUl);

  block.textContent = '';
  block.append(footerContainer, secondaryFooter);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
