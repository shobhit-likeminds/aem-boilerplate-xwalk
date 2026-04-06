import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Destructure the known fixed rows
  const [
    itcLogoImageRow,
    fssaiLogoImageRow,
    grievanceOfficerTitleRow,
    grievanceOfficerNameRow,
    grievanceOfficerContactRow,
    grievanceOfficerTimingRow,
    copyrightRow,
    ...itemRows // All remaining rows are item rows for containers
  ] = children;

  // Filter itemRows based on content detection
  const footerLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const textCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));
    return linkCell && textCell && cells.length === 2;
  });

  const footerListItems = itemRows.filter((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const titleCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture')); // Title is plain text in a div
    return linkCell && titleCell && cells.length === 2;
  });

  const socialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const pictureCell = cells.find(cell => cell.querySelector('picture'));
    return linkCell && pictureCell && cells.length === 2;
  });

  block.textContent = '';

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const row = document.createElement('div');
  row.classList.add('row');
  container.append(row);

  // Left column for logos
  const logoCol = document.createElement('div');
  logoCol.classList.add('col-lg-6', 'col-sm-12', 'd-flex', 'd-lg-block', 'justify-content-center');
  row.append(logoCol);

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');
  logoCol.append(footerLogos);

  // ITC Logo
  const footerItcLogo = document.createElement('div');
  footerItcLogo.classList.add('footer-itc-logo');
  footerLogos.append(footerItcLogo);

  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('logo', 'image');
  moveInstrumentation(itcLogoImageRow, itcLogoDiv);
  const itcPicture = itcLogoImageRow.querySelector('picture');
  if (itcPicture) {
    const itcLink = document.createElement('a');
    itcLink.classList.add('cmp-image__link');
    // The original HTML has a specific href, but the block structure implies it's from the content.
    // For now, default to '/' if not explicitly found in the cell, or try to extract from original cell.
    const originalLink = itcLogoImageRow.querySelector('a');
    itcLink.href = originalLink ? originalLink.href : '/';
    itcLink.append(itcPicture);
    itcLogoDiv.append(itcLink);
  }
  footerItcLogo.append(itcLogoDiv);

  // FSSAI Logo
  const footerFssaiLogo = document.createElement('div');
  footerFssaiLogo.classList.add('footer-fssai-logo');
  footerLogos.append(footerFssaiLogo);

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('fssailogo', 'logo', 'image');
  moveInstrumentation(fssaiLogoImageRow, fssaiLogoDiv);
  const fssaiPicture = fssaiLogoImageRow.querySelector('picture');
  if (fssaiPicture) {
    // FSSAI logo in original HTML doesn't have an explicit <a> wrapper around the image itself,
    // but rather the image is directly inside the div.
    // If a link is desired, it should come from the content.
    const fssaiLink = fssaiLogoImageRow.querySelector('a');
    if (fssaiLink) {
      fssaiLink.innerHTML = ''; // Clear existing content
      fssaiLink.append(fssaiPicture);
      fssaiLogoDiv.append(fssaiLink);
    } else {
      fssaiLogoDiv.append(fssaiPicture);
    }
  }
  footerFssaiLogo.append(fssaiLogoDiv);

  // Middle column for footer list items
  const pageLinksCol = document.createElement('div');
  pageLinksCol.classList.add('col-lg-3', 'col-sm-12', 'd-flex', 'justify-content-xl-between', 'footer-page-links-wrapper', 'pt-md-0', 'pt-4', 'px-1');
  row.append(pageLinksCol);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container', 'd-flex');
  // Append to pageLinksCol, not rightCol, as per original HTML structure
  pageLinksCol.append(footerListsContainer);

  if (footerListItems.length > 0) {
    const list4 = document.createElement('div');
    list4.classList.add('list-4', 'list');
    const ul4 = document.createElement('ul');
    footerListItems.forEach((itemRow) => {
      const li = document.createElement('li');
      moveInstrumentation(itemRow, li);
      const cells = [...itemRow.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const titleCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
      if (linkCell && titleCell) {
        const a = document.createElement('a');
        a.href = linkCell.querySelector('a').href;
        a.textContent = titleCell.textContent.trim();
        li.append(a);
      }
      ul4.append(li);
    });
    list4.append(ul4);
    footerListsContainer.append(list4);
  }

  // Right column for grievance officer, social links and copyright
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-lg-6', 'col-sm-12', 'itc-footer-link-left'); // This class name seems to be a mismatch with original HTML's rightmost column
  // Based on original HTML, this column contains contact details.
  // The original HTML has two right columns: one for footer-lists-container (which is pageLinksCol here)
  // and another for contact details + social + copyright.
  // Let's adjust to match the original HTML's structure more closely.

  // The original HTML has a `col-lg-3` for lists and then `col-lg-6` for contact details.
  // The current JS creates `pageLinksCol` as `col-lg-3` and `rightCol` as `col-lg-6`.
  // This `rightCol` should contain grievance officer details.
  // The social links and copyright are in a separate `col-lg-6` in the original HTML.

  // Re-evaluating the column structure based on original HTML:
  // 1. logoCol (col-lg-6)
  // 2. pageLinksCol (col-lg-3) - contains footerListsContainer
  // 3. A new column for Grievance Officer (let's call it grievanceCol, col-lg-6)
  // 4. A new column for Social Links & Copyright (let's call it socialCopyrightCol, col-lg-6)

  // Let's adjust the column structure to match the original HTML's `row` layout.
  // The original HTML has:
  // <div class="col-lg-6 col-sm-12 d-flex d-lg-block justify-content-center"> (logoCol)
  // <div class="col-lg-3 col-sm-12 d-flex justify-content-xl-between footer-page-links-wrapper pt-md-0 pt-4 px-1"> (pageLinksCol)
  // <div class="col-lg-6 col-sm-12 itc-footer-link-left "> (This contains footer-lists-container AND contact-details in original HTML)
  // <div class="col-lg-6 col-sm-12 align-items-md-end d-flex flex-column itc-footer-link-right"> (This contains social links and copyright)

  // This means the `footerListsContainer` should be appended to the `col-lg-6 itc-footer-link-left` column,
  // and then the `contact-details` should also be appended to it.
  // The `socialCopyrightCol` should be a separate `col-lg-6`.

  // Let's rename `rightCol` to `grievanceAndListsCol` to better reflect its content in the original HTML.
  const grievanceAndListsCol = document.createElement('div');
  grievanceAndListsCol.classList.add('col-lg-6', 'col-sm-12', 'itc-footer-link-left');
  row.append(grievanceAndListsCol);

  // Move footerListsContainer to this column, as per original HTML
  grievanceAndListsCol.append(footerListsContainer);

  // Grievance Officer Details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');
  grievanceAndListsCol.append(contactDetails);

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
  moveInstrumentation(grievanceOfficerContactRow, grievanceContact);
  while (grievanceOfficerContactRow.firstChild) grievanceContact.append(grievanceOfficerContactRow.firstChild);
  contactDetails.append(grievanceContact);

  const grievanceTiming = document.createElement('p');
  grievanceTiming.classList.add('contact-details__description', 'mb-0');
  moveInstrumentation(grievanceOfficerTimingRow, grievanceTiming);
  while (grievanceOfficerTimingRow.firstChild) grievanceTiming.append(grievanceOfficerTimingRow.firstChild);
  contactDetails.append(grievanceTiming);

  // Social Links and Copyright - This is a separate column in the original HTML
  const socialCopyrightCol = document.createElement('div');
  socialCopyrightCol.classList.add('col-lg-6', 'col-sm-12', 'align-items-md-end', 'd-flex', 'flex-column', 'itc-footer-link-right');
  row.append(socialCopyrightCol);

  if (socialLinks.length > 0) {
    const socialLinksWrapper = document.createElement('div'); // This div is present in original HTML
    socialLinks.forEach((itemRow) => {
      const ul = document.createElement('ul');
      ul.classList.add('list-unstyled');
      const li = document.createElement('li');
      moveInstrumentation(itemRow, li);
      const cells = [...itemRow.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const pictureCell = cells.find(cell => cell.querySelector('picture'));
      if (linkCell && pictureCell) {
        const a = document.createElement('a');
        a.id = 'socialIcons'; // ID from original HTML
        a.href = linkCell.querySelector('a').href;
        a.target = '_blank';
        a.append(pictureCell.querySelector('picture')); // Append the picture element itself
        li.append(a);
      }
      ul.append(li);
      socialLinksWrapper.append(ul); // Append each ul to the wrapper
    });
    socialCopyrightCol.append(socialLinksWrapper);
  }

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  while (copyrightRow.firstChild) copyrightSpan.append(copyrightRow.firstChild);
  socialCopyrightCol.append(copyrightSpan);

  // Secondary footer
  if (footerLinks.length > 0) {
    const secondaryFooter = document.createElement('footer');
    secondaryFooter.classList.add('itc-footer-section', 'itc-footer-secondary');
    const secondaryUl = document.createElement('ul');
    secondaryUl.classList.add('itc-footer-secondary-container');
    footerLinks.forEach((itemRow) => {
      const li = document.createElement('li');
      li.classList.add('itc-footer-secondary-lists');
      moveInstrumentation(itemRow, li);
      const cells = [...itemRow.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const textCell = cells.find(cell => cell.querySelector('p'));
      if (linkCell && textCell) {
        const a = document.createElement('a');
        a.classList.add('footer-links');
        a.href = linkCell.querySelector('a').href;
        a.target = '_blank';
        a.textContent = textCell.textContent.trim();
        li.append(a);
      }
      secondaryUl.append(li);
    });
    secondaryFooter.append(secondaryUl);
    block.append(secondaryFooter);
  }

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
