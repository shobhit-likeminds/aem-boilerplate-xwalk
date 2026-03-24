import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root rows based on BlockJson model
  const [
    logosContainer, // block.children[0]
    footerLinksContainer, // block.children[1]
    socialLinksContainer, // block.children[2]
    copyrightRow, // block.children[3]
    grievanceOfficerTitleRow, // block.children[4]
    grievanceOfficerNameRow, // block.children[5]
    grievanceOfficerContactRow, // block.children[6]
    grievanceOfficerHoursRow, // block.children[7]
  ] = [...block.children];

  // Extract item rows from their respective containers
  const logos = [...logosContainer.children];
  const footerLinks = [...footerLinksContainer.children];
  const socialLinks = [...socialLinksContainer.children];

  block.textContent = '';

  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-itc-footer-section');

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');
  footerSection.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');
  footerContainer.append(footerRow);

  // Left column for logos
  const leftCol = document.createElement('div');
  leftCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-d-flex', 'footer-d-lg-block', 'footer-justify-content-center');
  footerRow.append(leftCol);

  const footerLogosDiv = document.createElement('div');
  footerLogosDiv.classList.add('footer-footer-logos');
  leftCol.append(footerLogosDiv);

  logos.forEach((logoRow) => {
    const logoDiv = document.createElement('div');
    // Determine class based on content, assuming first logo is itc and second is fssai from original HTML
    // This is a heuristic based on the original HTML, not directly from BlockJson fields.
    // A more robust solution might involve an explicit 'type' field in the logo model if needed.
    const isItcLogo = logoRow.querySelector('img[alt="ITC logo"]');
    logoDiv.classList.add(isItcLogo ? 'footer-footer-itc-logo' : 'footer-footer-fssai-logo');
    moveInstrumentation(logoRow, logoDiv);

    const logoInnerDiv = document.createElement('div');
    logoInnerDiv.classList.add('footer-logo', 'footer-image');
    logoDiv.append(logoInnerDiv);

    const linkEl = document.createElement('a');
    const foundLink = logoRow.children[1].querySelector('a'); // Link is in the second cell
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_self';
      linkEl.classList.add('footer-cmp-image__link');
    }

    const picture = logoRow.children[0].querySelector('picture'); // Image is in the first cell
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        linkEl.append(optimizedPic);
      }
    }
    logoInnerDiv.append(linkEl);
    footerLogosDiv.append(logoDiv);
  });

  // Middle column for footer links and grievance officer
  const middleCol = document.createElement('div');
  middleCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-itc-footer-link-left'); // Corrected class from original HTML
  footerRow.append(middleCol);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');
  middleCol.append(footerListsContainer);

  const ul1 = document.createElement('ul');
  ul1.classList.add('footer-list-4', 'footer-list'); // Matching original HTML structure
  footerListsContainer.append(ul1);

  const ul2 = document.createElement('ul');
  ul2.classList.add('footer-list-3', 'footer-list'); // Matching original HTML structure
  footerListsContainer.append(ul2);

  footerLinks.forEach((linkRow, index) => {
    const li = document.createElement('li');
    moveInstrumentation(linkRow, li);

    const linkEl = document.createElement('a');
    const foundLink = linkRow.children[0].querySelector('a'); // Link is in the first cell
    const textContent = linkRow.children[1].textContent; // Text is in the second cell

    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      linkEl.setAttribute('data-cmp-clickable', '');
      linkEl.append(textContent); // Use the text content from the second cell
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('footer-cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      linkEl.append(screenReaderSpan);
    } else {
      linkEl.textContent = textContent;
    }
    li.append(linkEl);

    // Distribute links between the two ULs as per original HTML structure
    if (index < 3) { // Assuming first 3 links go to ul1, rest to ul2 based on original HTML
      ul1.append(li);
    } else {
      ul2.append(li);
    }
  });

  // Grievance Officer details
  const contactDetailsDiv = document.createElement('div');
  contactDetailsDiv.classList.add('footer-contact-details');
  middleCol.append(contactDetailsDiv);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
  moveInstrumentation(grievanceOfficerTitleRow, grievanceTitle);
  grievanceTitle.textContent = grievanceOfficerTitleRow.querySelector('div').textContent.trim(); // Get content from inner div
  contactDetailsDiv.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceOfficerNameRow, grievanceName);
  grievanceName.textContent = `Name: ${grievanceOfficerNameRow.querySelector('div').textContent.trim()}`; // Get content from inner div
  contactDetailsDiv.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceOfficerContactRow, grievanceContact);
  grievanceContact.textContent = `Contact Info: ${grievanceOfficerContactRow.querySelector('div').textContent.trim()}`; // Get content from inner div
  contactDetailsDiv.append(grievanceContact);

  const grievanceHours = document.createElement('p');
  grievanceHours.classList.add('footer-contact-details__description', 'footer-mb-0');
  moveInstrumentation(grievanceOfficerHoursRow, grievanceHours);
  grievanceHours.textContent = `(${grievanceOfficerHoursRow.querySelector('div').textContent.trim()})`; // Get content from inner div
  contactDetailsDiv.append(grievanceHours);

  // Right column for social links and copyright
  const rightCol = document.createElement('div');
  rightCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-align-items-md-end', 'footer-d-flex', 'footer-flex-column', 'footer-itc-footer-link-right');
  footerRow.append(rightCol);

  const socialLinksWrapper = document.createElement('div'); // Wrapper for social ULs
  rightCol.append(socialLinksWrapper);

  socialLinks.forEach((socialLinkRow) => {
    const ul = document.createElement('ul');
    ul.classList.add('footer-list-unstyled');
    moveInstrumentation(socialLinkRow, ul);

    const li = document.createElement('li');
    ul.append(li);

    const linkEl = document.createElement('a');
    linkEl.id = 'socialIcons';
    linkEl.target = '_blank';
    linkEl.setAttribute('data-cmp-clickable', '');

    const foundLink = socialLinkRow.children[0].querySelector('a'); // Link is in the first cell
    if (foundLink) {
      linkEl.href = foundLink.href;
    }

    const picture = socialLinkRow.children[1].querySelector('picture'); // Icon image is in the second cell
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        linkEl.append(optimizedPic);
      }
    }

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('footer-cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    linkEl.append(screenReaderSpan);

    li.append(linkEl);
    socialLinksWrapper.append(ul);
  });

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.querySelector('div').textContent.trim(); // Get content from inner div
  rightCol.append(copyrightSpan);

  block.append(footerSection);

  // Secondary footer section
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section', 'footer-itc-footer-secondary');
  block.append(secondaryFooter);

  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-secondary-container');
  secondaryFooter.append(secondaryUl);

  // Add placeholder secondary links if needed, based on original HTML structure
  // The provided EDS structure doesn't have explicit fields for these,
  // so creating them as empty placeholders matching the original HTML.
  const secondaryLi1 = document.createElement('li');
  secondaryLi1.classList.add('footer-itc-footer-secondary-lists');
  const secondaryLink1 = document.createElement('a');
  secondaryLink1.classList.add('footer-footer-links');
  secondaryLink1.target = '_blank';
  const secondarySpan1 = document.createElement('span');
  secondarySpan1.classList.add('footer-cmp-link__screen-reader-only');
  secondarySpan1.textContent = 'opens in a new tab';
  secondaryLink1.append(secondarySpan1);
  secondaryLi1.append(secondaryLink1);
  secondaryUl.append(secondaryLi1);

  const secondaryLi2 = document.createElement('li');
  secondaryLi2.classList.add('footer-itc-footer-secondary-lists');
  const secondaryLink2 = document.createElement('a');
  secondaryLink2.classList.add('footer-footer-links');
  secondaryLink2.target = '_blank';
  const secondarySpan2 = document.createElement('span');
  secondarySpan2.classList.add('footer-cmp-link__screen-reader-only');
  secondarySpan2.textContent = 'opens in a new tab';
  secondaryLink2.append(secondarySpan2);
  secondaryLi2.append(secondaryLink2);
  secondaryUl.append(secondaryLi2);
}
