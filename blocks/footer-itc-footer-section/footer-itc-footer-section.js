import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-itc-footer-section-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-itc-footer-section-row');

  // Root model fields: logos, footerLinks, socialLinks, grievanceOfficerName, grievanceOfficerContact, grievanceOfficerTiming, copyright
  // The BlockJson has 7 root fields.
  // children[0] = logos (container)
  // children[1] = footerLinks (container)
  // children[2] = socialLinks (container)
  // children[3] = grievanceOfficerName (text)
  // children[4] = grievanceOfficerContact (text)
  // children[5] = grievanceOfficerTiming (text)
  // children[6] = copyright (text)

  const logosContainer = children[0];
  const footerLinksContainer = children[1];
  const socialLinksContainer = children[2];
  const grievanceOfficerNameRow = children[3];
  const grievanceOfficerContactRow = children[4];
  const grievanceOfficerTimingRow = children[5];
  const copyrightRow = children[6];

  // Item rows are children of their respective containers, not direct children of the block.
  // We need to extract items from the container divs.
  const footerLogos = [...logosContainer.children];
  const footerLinks = [...footerLinksContainer.children];
  const socialLinks = [...socialLinksContainer.children];

  // Left section for logos
  const logoSection = document.createElement('div');
  logoSection.classList.add('footer-itc-footer-section-col-lg-6', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-d-flex', 'footer-itc-footer-section-d-lg-block', 'footer-itc-footer-section-justify-content-center');

  const footerLogosWrapper = document.createElement('div');
  footerLogosWrapper.classList.add('footer-itc-footer-section-footer-logos');

  footerLogos.forEach((row) => {
    // Each footerLogo item row has 2 cells: logoImage (picture) and logoLink (aem-content with link)
    if (row.children.length === 2) {
      const logoDiv = document.createElement('div');
      logoDiv.classList.add('footer-itc-footer-section-footer-itc-logo');

      const logoImageDiv = document.createElement('div');
      logoImageDiv.classList.add('footer-itc-footer-section-logo', 'footer-itc-footer-section-image');
      moveInstrumentation(row.children[0], logoImageDiv);
      const picture = row.children[0].querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;

      const logoLink = document.createElement('a');
      logoLink.classList.add('footer-itc-footer-section-cmp-image__link');
      moveInstrumentation(row.children[1], logoLink);
      const foundLink = row.children[1].querySelector('a'); // The link is inside the second cell
      if (foundLink) {
        logoLink.href = foundLink.href;
        logoLink.target = foundLink.target;
      } else {
        // Fallback if no <a> tag is found, use text content as href (though less likely for a link field)
        logoLink.href = row.children[1].textContent.trim() || '#';
      }

      if (img) {
        logoLink.append(img);
      }
      logoImageDiv.append(logoLink);
      logoDiv.append(logoImageDiv);
      footerLogosWrapper.append(logoDiv);
    }
  });
  logoSection.append(footerLogosWrapper);
  footerRow.append(logoSection);

  // Middle section for footer links
  const footerLinksWrapper = document.createElement('div');
  footerLinksWrapper.classList.add('footer-itc-footer-section-col-lg-3', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-d-flex', 'footer-itc-footer-section-justify-content-xl-between', 'footer-itc-footer-section-footer-page-links-wrapper', 'footer-itc-footer-section-pt-md-0', 'footer-itc-footer-section-pt-4', 'footer-itc-footer-section-px-1');

  const list1 = document.createElement('div');
  list1.classList.add('footer-itc-footer-section-list-1', 'footer-itc-footer-section-list');
  const ul1 = document.createElement('ul');
  list1.append(ul1);

  const list2 = document.createElement('div');
  list2.classList.add('footer-itc-footer-section-list-2', 'footer-itc-footer-section-list');
  const ul2 = document.createElement('ul');
  list2.append(ul2);

  footerLinks.forEach((row, index) => {
    // Each footerLink item row has 2 cells: linkUrl (aem-content) and linkText (text, often containing an <a>)
    if (row.children.length === 2) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);

      const linkEl = document.createElement('a');
      linkEl.classList.add('footer-itc-footer-section-cmp-list__item-link');

      const linkUrlCell = row.children[0]; // linkUrl field
      const linkTextCell = row.children[1]; // linkText field

      const foundLinkInTextCell = linkTextCell.querySelector('a');
      if (foundLinkInTextCell) {
        linkEl.href = foundLinkInTextCell.href;
        linkEl.target = foundLinkInTextCell.target;
        const span = document.createElement('span');
        span.classList.add('footer-itc-footer-section-cmp-list__item-title');
        span.textContent = foundLinkInTextCell.textContent;
        linkEl.append(span);
      } else {
        // If linkText is just text, use linkUrl for href and linkText for content
        linkEl.href = linkUrlCell.textContent.trim();
        const span = document.createElement('span');
        span.classList.add('footer-itc-footer-section-cmp-list__item-title');
        span.textContent = linkTextCell.textContent.trim();
        linkEl.append(span);
      }
      li.append(linkEl);

      if (index % 2 === 0) {
        ul1.append(li);
      } else {
        ul2.append(li);
      }
    }
  });

  footerLinksWrapper.append(list1, list2);
  footerRow.append(footerLinksWrapper);

  // Right section for contact details and social links
  const rightSection = document.createElement('div');
  rightSection.classList.add('footer-itc-footer-section-col-lg-6', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-itc-footer-link-left');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-itc-footer-section-footer-lists-container', 'footer-itc-footer-section-d-flex');
  // Re-append the lists from the middle section to this container to match original HTML structure
  footerListsContainer.append(list1, list2); // Moving them here to match the example HTML structure
  rightSection.append(footerListsContainer);


  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-itc-footer-section-contact-details');

  const title = document.createElement('h5');
  title.classList.add('footer-itc-footer-section-contact-details__title', 'footer-itc-footer-section-mb-md-3', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerNameRow, title);
  title.textContent = `Grievance Officer: ${grievanceOfficerNameRow.textContent.trim()}`;
  contactDetails.append(title);

  const nameP = document.createElement('p');
  nameP.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-md-1', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerNameRow, nameP);
  nameP.textContent = `Name: ${grievanceOfficerNameRow.textContent.trim()}`;
  contactDetails.append(nameP);

  const contactP = document.createElement('p');
  contactP.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-md-1', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerContactRow, contactP);
  contactP.textContent = `Contact Info: ${grievanceOfficerContactRow.textContent.trim()}`;
  contactDetails.append(contactP);

  const timingP = document.createElement('p');
  timingP.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerTimingRow, timingP);
  timingP.textContent = `(${grievanceOfficerTimingRow.textContent.trim()})`;
  contactDetails.append(timingP);

  rightSection.append(contactDetails);
  footerRow.append(rightSection);

  // Social links and copyright
  const socialCopyrightSection = document.createElement('div');
  socialCopyrightSection.classList.add('footer-itc-footer-section-col-lg-6', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-align-items-md-end', 'footer-itc-footer-section-d-flex', 'footer-itc-footer-section-flex-column', 'footer-itc-footer-section-itc-footer-link-right');

  const socialLinksDiv = document.createElement('div');
  socialLinks.forEach((row) => {
    // Each footerSocial item row has 2 cells: socialUrl (aem-content) and socialIcon (picture)
    if (row.children.length === 2) {
      const ul = document.createElement('ul');
      ul.classList.add('footer-itc-footer-section-list-unstyled');
      const li = document.createElement('li');
      moveInstrumentation(row, li);

      const link = document.createElement('a');
      link.id = 'socialIcons'; // Keep original ID if it's used for styling/JS elsewhere
      link.target = '_blank';
      moveInstrumentation(row.children[0], link);
      const foundLink = row.children[0].querySelector('a'); // socialUrl can be a link
      if (foundLink) {
        link.href = foundLink.href;
      } else {
        link.href = row.children[0].textContent.trim();
      }

      const picture = row.children[1].querySelector('picture'); // socialIcon is a picture
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        link.append(img);
      }
      const span = document.createElement('span');
      span.classList.add('footer-itc-footer-section-cmp-link__screen-reader-only');
      span.textContent = 'opens in a new tab';
      link.append(span);

      li.append(link);
      ul.append(li);
      socialLinksDiv.append(ul);
    }
  });
  socialCopyrightSection.append(socialLinksDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-itc-footer-section-footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  socialCopyrightSection.append(copyrightSpan);

  footerRow.append(socialCopyrightSection);
  footerContainer.append(footerRow);

  // Secondary footer section
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section', 'footer-itc-footer-section-itc-footer-secondary');
  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-section-itc-footer-secondary-container');

  // The original HTML had two placeholder links here.
  // Since there's no model field for these, we should remove them or add a model field.
  // For now, removing them as they are not driven by content.
  // If they were meant to be part of 'footerLinks' or another item type,
  // there would need to be a way to distinguish them in the model.

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
