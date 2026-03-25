import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson
  const [
    footerLogosContainer, // block.children[0]
    footerLinksContainer, // block.children[1]
    footerSocialContainer, // block.children[2]
    grievanceOfficerTitleRow, // block.children[3]
    grievanceOfficerNameRow, // block.children[4]
    grievanceOfficerContactInfoRow, // block.children[5]
    grievanceOfficerTimeRow, // block.children[6]
    copyrightRow, // block.children[7]
    ...itemRows // All subsequent rows are item sub-components
  ] = [...block.children];

  // Filter item rows based on content detection
  // footer-logo: image (picture) in cell[0], link in cell[1]
  const footerLogos = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture') && row.children[1].querySelector('a'));
  // footer-link: link in cell[0], text in cell[1]
  const footerLinks = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && !row.children[1].querySelector('picture'));
  // footer-social: link in cell[0], icon (picture) in cell[1]
  const footerSocials = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].querySelector('picture'));

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Left column for logos
  const colLeft = document.createElement('div');
  colLeft.classList.add('col-lg-6', 'col-sm-12', 'd-flex', 'd-lg-block', 'justify-content-center');

  const footerLogosDiv = document.createElement('div');
  footerLogosDiv.classList.add('footer-logos');

  footerLogos.forEach((row) => {
    const logoWrapper = document.createElement('div');
    logoWrapper.classList.add('footer-itc-logo');

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('logo', 'image');

    const linkEl = document.createElement('a');
    const foundLink = row.children[1].querySelector('a'); // Link is in the second cell
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.classList.add('cmp-image__link');
      linkEl.target = '_self';
      // The link text itself is not used for logos, the image is the primary content
      // linkEl.append(foundLink.textContent); // Removed as per original HTML structure
    }
    moveInstrumentation(row.children[1], linkEl); // Move instrumentation from the link cell

    const pictureEl = row.children[0].querySelector('picture'); // Picture is in the first cell
    if (pictureEl) {
      const img = pictureEl.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        linkEl.prepend(optimizedPic);
      }
    }
    logoDiv.append(linkEl);
    logoWrapper.append(logoDiv);
    footerLogosDiv.append(logoWrapper);
  });
  colLeft.append(footerLogosDiv);
  rowDiv.append(colLeft);

  // Middle column for links and contact details
  const colMiddle = document.createElement('div');
  colMiddle.classList.add('col-lg-6', 'col-sm-12', 'itc-footer-link-left');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container', 'd-flex');

  const list4Div = document.createElement('div');
  list4Div.classList.add('list-4', 'list');
  const ul1 = document.createElement('ul');

  const list3Div = document.createElement('div');
  list3Div.classList.add('list-3', 'list');
  const ul2 = document.createElement('ul');
  ul2.classList.add('cmp-list');

  footerLinks.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const linkEl = document.createElement('a');
    const foundLink = row.children[0].querySelector('a'); // Link is in the first cell
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      linkEl.classList.add('cmp-list__item-link');
      const span = document.createElement('span');
      span.classList.add('cmp-list__item-title');
      span.textContent = row.children[1].textContent.trim(); // Text is in the second cell
      linkEl.append(span);
      const srOnlySpan = document.createElement('span');
      srOnlySpan.classList.add('cmp-link__screen-reader-only');
      srOnlySpan.textContent = 'opens in a new tab';
      linkEl.append(srOnlySpan);
    }
    li.append(linkEl);

    if (index % 2 === 0) { // Distribute links into two lists
      ul1.append(li);
    } else {
      ul2.append(li);
    }
  });

  list4Div.append(ul1);
  list3Div.append(ul2);
  footerListsContainer.append(list4Div, list3Div);
  colMiddle.append(footerListsContainer);

  // Grievance Officer details
  const contactDetailsDiv = document.createElement('div');
  contactDetailsDiv.classList.add('contact-details');

  const titleH5 = document.createElement('h5');
  moveInstrumentation(grievanceOfficerTitleRow, titleH5);
  titleH5.classList.add('contact-details__title', 'mb-md-3', 'mb-0');
  titleH5.textContent = grievanceOfficerTitleRow.textContent.trim();
  contactDetailsDiv.append(titleH5);

  const nameP = document.createElement('p');
  moveInstrumentation(grievanceOfficerNameRow, nameP);
  nameP.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  nameP.textContent = grievanceOfficerNameRow.textContent.trim();
  contactDetailsDiv.append(nameP);

  const contactP = document.createElement('p');
  moveInstrumentation(grievanceOfficerContactInfoRow, contactP);
  contactP.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  contactP.textContent = grievanceOfficerContactInfoRow.textContent.trim();
  contactDetailsDiv.append(contactP);

  const timeP = document.createElement('p');
  moveInstrumentation(grievanceOfficerTimeRow, timeP);
  timeP.classList.add('contact-details__description', 'mb-0');
  timeP.textContent = grievanceOfficerTimeRow.textContent.trim();
  contactDetailsDiv.append(timeP);

  colMiddle.append(contactDetailsDiv);
  rowDiv.append(colMiddle);

  // Right column for social icons and copyright
  const colRight = document.createElement('div');
  colRight.classList.add('col-lg-6', 'col-sm-12', 'align-items-md-end', 'd-flex', 'flex-column', 'itc-footer-link-right');

  const socialIconsWrapper = document.createElement('div');
  const socialUl = document.createElement('ul'); // Create a single UL for all social icons
  socialUl.classList.add('list-unstyled');

  footerSocials.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const linkEl = document.createElement('a');
    const foundLink = row.children[0].querySelector('a'); // Link is in the first cell
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      linkEl.setAttribute('id', 'socialIcons');
      const srOnlySpan = document.createElement('span');
      srOnlySpan.classList.add('cmp-link__screen-reader-only');
      srOnlySpan.textContent = 'opens in a new tab';
      linkEl.append(srOnlySpan);
    }

    const pictureEl = row.children[1].querySelector('picture'); // Picture is in the second cell
    if (pictureEl) {
      const img = pictureEl.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        linkEl.prepend(optimizedPic);
      }
    }
    li.append(linkEl);
    socialUl.append(li); // Append each social li to the single socialUl
  });
  socialIconsWrapper.append(socialUl); // Append the ul to the wrapper
  colRight.append(socialIconsWrapper);

  const copyrightSpan = document.createElement('span');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.classList.add('footer-link');
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  colRight.append(copyrightSpan);
  rowDiv.append(colRight);

  containerDiv.append(rowDiv);
  block.textContent = '';
  block.append(containerDiv);

  // This part seems to be a general optimization for any remaining pictures,
  // but the block structure implies pictures are handled within specific item types.
  // Keeping it for now, but it might be redundant if all pictures are processed above.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
