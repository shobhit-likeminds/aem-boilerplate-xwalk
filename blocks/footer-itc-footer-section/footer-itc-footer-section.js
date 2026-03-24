import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure the block children based on the BlockJson model
  const [
    logosContainer, // block.children[0] - container for footer-logo items
    footerLinksContainer, // block.children[1] - container for footer-link items
    socialLinksContainer, // block.children[2] - container for footer-social items
    secondaryLinksContainer, // block.children[3] - container for footer-secondary-link items
    copyrightRow, // block.children[4] - richtext
    grievanceTitleRow, // block.children[5] - text
    grievanceNameRow, // block.children[6] - text
    grievanceContactRow, // block.children[7] - text
    grievanceHoursRow, // block.children[8] - text
    ...itemRows // All subsequent rows are item sub-components
  ] = [...block.children];

  // Main footer container
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');

  // Left column for logos
  const leftCol = document.createElement('div');
  leftCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-d-flex', 'footer-d-lg-block', 'footer-justify-content-center');

  const footerLogosDiv = document.createElement('div');
  footerLogosDiv.classList.add('footer-footer-logos');

  // Filter for footer-logo items: 2 cells, first cell contains a picture
  const footerLogoItems = itemRows.filter(row => row.children.length === 2 && row.children[0].querySelector('picture'));
  footerLogoItems.forEach((row) => {
    const logoDiv = document.createElement('div');
    // The original HTML has 'footer-footer-itc-logo' and 'footer-footer-fssai-logo'.
    // The model doesn't distinguish, so we'll use a generic class or infer if possible.
    // For now, using 'footer-footer-itc-logo' as a default, but ideally this would be driven by content.
    logoDiv.classList.add('footer-footer-itc-logo');
    moveInstrumentation(row, logoDiv);

    const logoImageDiv = document.createElement('div');
    logoImageDiv.classList.add('footer-logo', 'footer-image');

    const picture = row.children[0].querySelector('picture'); // Logo Image is in the first cell
    const link = row.children[1].querySelector('a'); // Logo Link is in the second cell

    if (link) {
      const linkEl = document.createElement('a');
      linkEl.href = link.href;
      linkEl.classList.add('cmp-image__link');
      moveInstrumentation(link, linkEl);
      if (picture) {
        linkEl.append(picture);
      }
      logoImageDiv.append(linkEl);
    } else if (picture) {
      logoImageDiv.append(picture);
    }

    logoDiv.append(logoImageDiv);
    footerLogosDiv.append(logoDiv);
  });

  leftCol.append(footerLogosDiv);
  footerRow.append(leftCol);

  // Middle column for footer links and grievance details
  const itcFooterLinkLeft = document.createElement('div');
  itcFooterLinkLeft.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-itc-footer-link-left');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');

  // Filter for footer-link items: 2 cells, first cell is text, second cell is a link, no picture
  const footerLinkItems = itemRows.filter(row => row.children.length === 2 && !row.children[0].querySelector('picture') && row.children[1].querySelector('a'));

  // Create lists as per original HTML structure
  const list4 = document.createElement('div');
  list4.classList.add('footer-list-4', 'footer-list');
  const ul4 = document.createElement('ul');
  list4.append(ul4);

  const list3 = document.createElement('div');
  list3.classList.add('footer-list-3', 'footer-list');
  const ul3 = document.createElement('ul'); // This ul might be populated by other logic or remain empty if no specific items for it.

  // Distribute footer links into lists. The original HTML shows them split.
  // We'll distribute them into ul4 and ul3 for now, assuming a split.
  footerLinkItems.forEach((row, index) => {
    const li = document.createElement('li');
    li.id = `footerLinks-${index + 1}`; // Match original HTML ID pattern
    moveInstrumentation(row, li);
    const labelCell = row.children[0]; // Label is in the first cell
    const linkCell = row.children[1].querySelector('a'); // Link is in the second cell

    if (linkCell) {
      const a = document.createElement('a');
      a.href = linkCell.href;
      a.target = '_blank';
      a.setAttribute('data-cmp-clickable', '');
      moveInstrumentation(linkCell, a);
      a.textContent = labelCell.textContent; // Use label from first cell
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      a.append(screenReaderSpan);
      li.append(a);
    }
    // Distribute links into two lists (example distribution, adjust as needed)
    if (index % 2 === 0) { // Example: put first half in ul4, second half in ul3
      ul4.append(li);
    } else {
      ul3.append(li);
    }
  });

  footerListsContainer.append(list4, list3);

  // Grievance details
  const grievanceDetailsDiv = document.createElement('div');
  grievanceDetailsDiv.classList.add('footer-contact-details');

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
  moveInstrumentation(grievanceTitleRow, grievanceTitle);
  grievanceTitle.textContent = grievanceTitleRow.querySelector('div').textContent;
  grievanceDetailsDiv.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceNameRow, grievanceName);
  grievanceName.textContent = `Name: ${grievanceNameRow.querySelector('div').textContent}`;
  grievanceDetailsDiv.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceContactRow, grievanceContact);
  grievanceContact.textContent = `Contact Info: ${grievanceContactRow.querySelector('div').textContent}`;
  grievanceDetailsDiv.append(grievanceContact);

  const grievanceHours = document.createElement('p');
  grievanceHours.classList.add('footer-contact-details__description', 'footer-mb-0');
  moveInstrumentation(grievanceHoursRow, grievanceHours);
  grievanceHours.textContent = `(${grievanceHoursRow.querySelector('div').textContent})`;
  grievanceDetailsDiv.append(grievanceHours);

  itcFooterLinkLeft.append(footerListsContainer, grievanceDetailsDiv);
  footerRow.append(itcFooterLinkLeft); // Append to the main footerRow

  // Right column for social links and copyright
  const rightCol = document.createElement('div');
  rightCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-align-items-md-end', 'footer-d-flex', 'footer-flex-column', 'footer-itc-footer-link-right');

  const socialLinksDiv = document.createElement('div');
  // Filter for footer-social items: 2 cells, first cell has a picture (icon), second cell has a link
  const socialLinkItems = itemRows.filter(row => row.children.length === 2 && row.children[0].querySelector('picture') && row.children[1].querySelector('a'));

  socialLinkItems.forEach((row) => {
    const ul = document.createElement('ul');
    ul.classList.add('footer-list-unstyled');
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const iconPicture = row.children[0].querySelector('picture'); // Social Icon is in the first cell
    const socialLink = row.children[1].querySelector('a'); // Social Link is in the second cell

    if (socialLink && iconPicture) {
      const a = document.createElement('a');
      a.id = 'socialIcons'; // Match original HTML ID
      a.href = socialLink.href;
      a.target = '_blank';
      a.setAttribute('data-cmp-clickable', '');
      moveInstrumentation(socialLink, a);

      const img = iconPicture.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.loading = 'lazy';
        newImg.src = img.src;
        newImg.alt = img.alt;
        moveInstrumentation(img, newImg);
        a.append(newImg);
      }

      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      a.append(screenReaderSpan);
      li.append(a);
    }
    ul.append(li);
    socialLinksDiv.append(ul);
  });
  rightCol.append(socialLinksDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.innerHTML = copyrightRow.querySelector('div').innerHTML;
  rightCol.append(copyrightSpan);

  footerRow.append(rightCol);
  footerContainer.append(footerRow);

  // Secondary footer section
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section', 'footer-itc-footer-secondary');

  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-secondary-container');

  // Filter for footer-secondary-link items: 1 cell, contains a link
  const secondaryLinkItems = itemRows.filter(row => row.children.length === 1 && row.children[0].querySelector('a'));
  secondaryLinkItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('footer-itc-footer-secondary-lists');
    moveInstrumentation(row, li);

    const linkEl = row.children[0].querySelector('a'); // Secondary Link is in the first cell
    if (linkEl) {
      const a = document.createElement('a');
      a.href = linkEl.href;
      a.classList.add('footer-footer-links');
      a.target = '_blank';
      moveInstrumentation(linkEl, a);
      a.textContent = linkEl.textContent; // Copy text content from the original link
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      a.append(screenReaderSpan);
      li.append(a);
    }
    secondaryUl.append(li);
  });
  secondaryFooter.append(secondaryUl);

  // Image optimization
  footerContainer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(footerContainer, secondaryFooter);
}
