import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'footer-itc-footer-section';
  const children = [...block.children];

  // Destructure root model fields based on BlockJson
  const [
    logosContainerRow, // block.children[0]
    linksContainerRow, // block.children[1]
    socialIconsContainerRow, // block.children[2]
    copyrightRow, // block.children[3]
    grievanceOfficerTitleRow, // block.children[4]
    grievanceOfficerNameRow, // block.children[5]
    grievanceOfficerContactRow, // block.children[6]
    grievanceOfficerTimingRow, // block.children[7]
    ...itemRows // All subsequent rows are item sub-components
  ] = children;

  // Filter item rows based on their content structure
  // footerLogo: 2 cells, first cell contains a picture
  const footerLogos = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture') && row.children[1].textContent.trim().startsWith('Logo Link')); // Added text content check for better distinction if needed

  // footerLink: 2 cells, first cell contains text (URL), second cell contains text (Link Text)
  const footerLinks = itemRows.filter((row) => row.children.length === 2 && !row.children[0].querySelector('picture') && row.children[0].textContent.trim().startsWith('Link URL'));

  // footerSocialIcon: 2 cells, first cell contains a picture (icon), second cell contains text (link)
  const footerSocialIcons = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture') && row.children[1].textContent.trim().startsWith('Social Link'));


  block.textContent = '';
  block.classList.add(`${blockName}`); // Corrected block class name to match blockName

  const footerContainer = document.createElement('div');
  footerContainer.classList.add(`${blockName}-container`);

  const footerRow = document.createElement('div');
  footerRow.classList.add(`${blockName}-row`);

  // Left column for logos
  const leftCol = document.createElement('div');
  leftCol.classList.add(
    `${blockName}-col-lg-6`,
    `${blockName}-col-sm-12`,
    `${blockName}-d-flex`,
    `${blockName}-d-lg-block`,
    `${blockName}-justify-content-center`,
  );

  const footerLogosWrapper = document.createElement('div');
  footerLogosWrapper.classList.add(`${blockName}-footer-logos`);

  footerLogos.forEach((row) => {
    const logoWrapper = document.createElement('div');
    logoWrapper.classList.add(`${blockName}-footer-itc-logo`);

    const logoDiv = document.createElement('div');
    logoDiv.classList.add(`${blockName}-logo`, `${blockName}-image`);
    moveInstrumentation(row, logoDiv);

    const picture = row.children[0].querySelector('picture');
    const img = picture ? picture.querySelector('img') : null;
    const linkEl = row.children[1].querySelector('a'); // Link URL is in cell[1] for footerLogo

    if (linkEl) {
      const newLink = document.createElement('a');
      newLink.classList.add(`${blockName}-cmp-image__link`);
      newLink.href = linkEl.href;
      newLink.target = '_self';
      moveInstrumentation(linkEl, newLink);
      // The link text is not used here, only the href from the linkEl
      // If there was text content for the link, it would be handled here.
      // For images, the link wraps the image.
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '93' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.prepend(optimizedPic);
      }
      logoDiv.append(newLink);
    } else if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '93' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoDiv.append(optimizedPic);
    }
    logoWrapper.append(logoDiv);
    footerLogosWrapper.append(logoWrapper);
  });

  leftCol.append(footerLogosWrapper);
  footerRow.append(leftCol);

  // Middle column for links and grievance officer
  const middleCol = document.createElement('div');
  middleCol.classList.add(
    `${blockName}-col-lg-6`,
    `${blockName}-col-sm-12`,
    `${blockName}-itc-footer-link-left`,
  );

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add(`${blockName}-footer-lists-container`, `${blockName}-d-flex`);

  const list1 = document.createElement('div');
  list1.classList.add(`${blockName}-list-4`, `${blockName}-list`);
  const ul1 = document.createElement('ul');
  list1.append(ul1);

  const list2 = document.createElement('div');
  list2.classList.add(`${blockName}-list-3`, `${blockName}-list`);
  const ul2 = document.createElement('ul');
  ul2.classList.add(`${blockName}-cmp-list`);
  list2.append(ul2);

  footerLinks.forEach((row, index) => {
    const li = document.createElement('li');
    li.classList.add(`${blockName}-cmp-list__item`);
    moveInstrumentation(row, li);

    const urlCell = row.children[0]; // Link URL is in cell[0] for footerLink
    const textCell = row.children[1]; // Link Text is in cell[1] for footerLink

    const linkEl = urlCell.querySelector('a'); // Check if the URL cell contains an actual link
    const linkText = textCell.textContent.trim();

    const newLink = document.createElement('a');
    newLink.classList.add(`${blockName}-cmp-list__item-link`);
    newLink.target = '_blank'; // Assuming all footer links open in new tab
    moveInstrumentation(urlCell, newLink); // Instrument the URL cell

    if (linkEl) {
      newLink.href = linkEl.href;
    } else {
      // If no explicit <a> tag in the URL cell, use its text content as href
      newLink.href = urlCell.textContent.trim();
    }

    const span = document.createElement('span');
    span.classList.add(`${blockName}-cmp-list__item-title`);
    span.textContent = linkText;
    newLink.append(span);

    li.append(newLink);

    // Distribute links between two lists (example: split evenly)
    if (index % 2 === 0) {
      ul1.append(li);
    } else {
      ul2.append(li);
    }
  });

  footerListsContainer.append(list1, list2);
  middleCol.append(footerListsContainer);

  const contactDetails = document.createElement('div');
  contactDetails.classList.add(`${blockName}-contact-details`);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add(`${blockName}-contact-details__title`, `${blockName}-mb-md-3`, `${blockName}-mb-0`);
  moveInstrumentation(grievanceOfficerTitleRow, grievanceTitle);
  grievanceTitle.textContent = grievanceOfficerTitleRow.children[0].textContent.trim(); // Access content from first child div
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add(`${blockName}-contact-details__description`, `${blockName}-mb-md-1`, `${blockName}-mb-0`);
  moveInstrumentation(grievanceOfficerNameRow, grievanceName);
  grievanceName.textContent = grievanceOfficerNameRow.children[0].textContent.trim(); // Access content from first child div
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add(`${blockName}-contact-details__description`, `${blockName}-mb-md-1`, `${blockName}-mb-0`);
  moveInstrumentation(grievanceOfficerContactRow, grievanceContact);
  grievanceContact.textContent = grievanceOfficerContactRow.children[0].textContent.trim(); // Access content from first child div
  contactDetails.append(grievanceContact);

  const grievanceTiming = document.createElement('p');
  grievanceTiming.classList.add(`${blockName}-contact-details__description`, `${blockName}-mb-0`);
  moveInstrumentation(grievanceOfficerTimingRow, grievanceTiming);
  grievanceTiming.textContent = grievanceOfficerTimingRow.children[0].textContent.trim(); // Access content from first child div
  contactDetails.append(grievanceTiming);

  middleCol.append(contactDetails);
  footerRow.append(middleCol);

  // Right column for social icons and copyright
  const rightCol = document.createElement('div');
  rightCol.classList.add(
    `${blockName}-col-lg-6`,
    `${blockName}-col-sm-12`,
    `${blockName}-align-items-md-end`,
    `${blockName}-d-flex`,
    `${blockName}-flex-column`,
    `${blockName}-itc-footer-link-right`,
  );

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add(`${blockName}-social-icons-wrapper`); // Added a wrapper for social icons

  footerSocialIcons.forEach((row) => {
    const ul = document.createElement('ul');
    ul.classList.add(`${blockName}-list-unstyled`);
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const iconPicture = row.children[0].querySelector('picture'); // Icon image is in cell[0] for footerSocialIcon
    const iconImg = iconPicture ? iconPicture.querySelector('img') : null;
    const socialLinkEl = row.children[1].querySelector('a'); // Social Link is in cell[1] for footerSocialIcon

    if (socialLinkEl) {
      const newLink = document.createElement('a');
      newLink.id = 'socialIcons'; // This ID should ideally be unique per icon or removed
      newLink.href = socialLinkEl.href;
      newLink.target = '_blank';
      moveInstrumentation(socialLinkEl, newLink);

      if (iconImg) {
        const optimizedPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '32' }]);
        moveInstrumentation(iconImg, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
      }
      li.append(newLink);
    } else if (iconImg) {
      // If no explicit link, just display the icon
      const optimizedPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '32' }]);
      moveInstrumentation(iconImg, optimizedPic.querySelector('img'));
      li.append(optimizedPic);
    }
    ul.append(li);
    socialIconsWrapper.append(ul);
  });

  rightCol.append(socialIconsWrapper);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add(`${blockName}-footer-link`);
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.children[0].textContent.trim(); // Access content from first child div
  rightCol.append(copyrightSpan);

  footerRow.append(rightCol);
  footerContainer.append(footerRow);
  block.append(footerContainer);

  // The secondary footer section was hardcoded in the original JS.
  // Based on the BlockJson and EDS structure, there is no explicit model field for a secondary footer.
  // If a secondary footer is needed, it should be defined in the BlockJson model.
  // For now, removing the hardcoded secondary footer elements.
  // If it's meant to be a separate block, it should be handled as such.

  // Image optimization for all pictures within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    // Only optimize if not already optimized by createOptimizedPicture with specific width
    if (!img.closest('picture').dataset.optimized) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
      optimizedPic.dataset.optimized = 'true'; // Mark as optimized
    }
  });
}
