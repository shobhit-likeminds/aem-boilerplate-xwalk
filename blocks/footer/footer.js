import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-itc-footer-section');

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');
  footerSection.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');
  footerContainer.append(footerRow);

  // Root model fields (containers are block.children[0] to block.children[3], simple text fields are block.children[4] to block.children[8])
  // The content of container fields is not directly used here, but their presence defines the start of item rows.
  // The simple text fields are read directly.
  const grievanceTitleRow = children[4];
  const grievanceNameRow = children[5];
  const grievanceContactRow = children[6];
  const grievanceTimeRow = children[7];
  const copyrightRow = children[8];

  // Item rows start from index 9, after all 9 root fields (4 containers + 5 text fields)
  const itemRows = children.slice(9);

  // Content detection for item sub-components
  // footer-logo: 2 cells, first cell has picture, second cell has link
  const footerLogos = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture') && row.children[1].querySelector('a'));
  // footer-link: 2 cells, first cell has link, second cell has text label
  const footerLinks = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && !row.children[1].querySelector('picture'));
  // footer-nav-link: 2 cells, first cell has link, second cell has text label
  const navigationLinks = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && !row.children[1].querySelector('picture'));
  // footer-social-link: 2 cells, first cell has link, second cell has picture
  const socialLinks = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].querySelector('picture'));


  // Left Column for Logos
  const logoCol = document.createElement('div');
  logoCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-d-flex', 'footer-d-lg-block', 'footer-justify-content-center');
  footerRow.append(logoCol);

  const footerLogosWrapper = document.createElement('div');
  footerLogosWrapper.classList.add('footer-footer-logos');
  logoCol.append(footerLogosWrapper);

  footerLogos.forEach((row) => {
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('footer-footer-itc-logo'); // Assuming first is ITC, second is FSSAI based on original HTML
    moveInstrumentation(row, logoDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('footer-logo', 'footer-image');
    logoDiv.append(imageWrapper);

    const pictureCell = row.children[0]; // Image is the first cell for footer-logo
    const linkCell = row.children[1];    // Link is the second cell for footer-logo

    if (pictureCell) {
      const picture = pictureCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));

        const link = document.createElement('a');
        link.classList.add('footer-cmp-image__link');
        if (linkCell) {
          const foundLink = linkCell.querySelector('a');
          if (foundLink) {
            link.href = foundLink.href;
          }
        }
        link.append(optimizedPic);
        imageWrapper.append(link);
      }
    }
    footerLogosWrapper.append(logoDiv);
  });

  // Middle column for navigation links
  const navLinksCol = document.createElement('div');
  navLinksCol.classList.add('footer-col-lg-3', 'footer-col-sm-12', 'footer-d-flex', 'footer-justify-content-xl-between', 'footer-footer-page-links-wrapper', 'footer-pt-md-0', 'footer-pt-4', 'footer-px-1');
  footerRow.append(navLinksCol);

  const navList1 = document.createElement('div');
  navList1.classList.add('footer-list-1', 'footer-list');
  navLinksCol.append(navList1);

  const navList2 = document.createElement('div');
  navList2.classList.add('footer-list-2', 'footer-list');
  navLinksCol.append(navList2);

  const navUl1 = document.createElement('ul');
  navUl1.classList.add('footer-cmp-list');
  navList1.append(navUl1);

  const navUl2 = document.createElement('ul');
  navUl2.classList.add('footer-cmp-list');
  navList2.append(navUl2);

  navigationLinks.forEach((row, index) => {
    const li = document.createElement('li');
    li.classList.add('footer-cmp-list__item');
    moveInstrumentation(row, li);

    const linkEl = document.createElement('a');
    linkEl.classList.add('footer-cmp-list__item-link');
    const foundLink = row.children[0].querySelector('a'); // Link is the first cell for footer-nav-link
    if (foundLink) {
      linkEl.href = foundLink.href;
    }
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('footer-cmp-list__item-title');
    labelSpan.textContent = row.children[1].textContent; // Label is the second cell for footer-nav-link
    linkEl.append(labelSpan);
    li.append(linkEl);

    if (index % 2 === 0) {
      navUl1.append(li);
    } else {
      navUl2.append(li);
    }
  });

  // Right Column for Footer Links and Grievance
  const rightCol = document.createElement('div');
  rightCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-itc-footer-link-left');
  footerRow.append(rightCol);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');
  rightCol.append(footerListsContainer);

  const footerListDiv = document.createElement('div');
  footerListDiv.classList.add('footer-list-4', 'footer-list');
  footerListsContainer.append(footerListDiv);

  const footerUl = document.createElement('ul');
  footerListDiv.append(footerUl);

  footerLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const linkEl = document.createElement('a');
    const foundLink = row.children[0].querySelector('a'); // Link is the first cell for footer-link
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      linkEl.setAttribute('data-cmp-clickable', '');
    }
    linkEl.textContent = row.children[1].textContent; // Label is the second cell for footer-link
    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('footer-cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    linkEl.append(screenReaderOnly);
    li.append(linkEl);
    footerUl.append(li);
  });

  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-contact-details');
  rightCol.append(contactDetails);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
  moveInstrumentation(grievanceTitleRow, grievanceTitle);
  grievanceTitle.textContent = grievanceTitleRow.textContent.trim();
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceNameRow, grievanceName);
  grievanceName.textContent = `Name: ${grievanceNameRow.textContent.trim()}`;
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceContactRow, grievanceContact);
  grievanceContact.textContent = `Contact Info: ${grievanceContactRow.textContent.trim()}`;
  contactDetails.append(grievanceContact);

  const grievanceTime = document.createElement('p');
  grievanceTime.classList.add('footer-contact-details__description', 'footer-mb-0');
  moveInstrumentation(grievanceTimeRow, grievanceTime);
  grievanceTime.textContent = `(${grievanceTimeRow.textContent.trim()})`;
  contactDetails.append(grievanceTime);

  // Social Links and Copyright
  const socialCol = document.createElement('div');
  socialCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-align-items-md-end', 'footer-d-flex', 'footer-flex-column', 'footer-itc-footer-link-right');
  footerRow.append(socialCol);

  const socialWrapper = document.createElement('div');
  socialCol.append(socialWrapper);

  socialLinks.forEach((row) => {
    const ul = document.createElement('ul');
    ul.classList.add('footer-list-unstyled');
    moveInstrumentation(row, ul);

    const li = document.createElement('li');
    ul.append(li);

    const linkEl = document.createElement('a');
    linkEl.id = 'socialIcons';
    linkEl.target = '_blank';
    linkEl.setAttribute('data-cmp-clickable', '');

    const foundLink = row.children[0].querySelector('a'); // Link is the first cell for footer-social-link
    if (foundLink) {
      linkEl.href = foundLink.href;
    }

    const picture = row.children[1].querySelector('picture'); // Picture is the second cell for footer-social-link
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        linkEl.append(optimizedPic);
      }
    }
    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('footer-cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    linkEl.append(screenReaderOnly);
    li.append(linkEl);
    socialWrapper.append(ul);
  });

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  socialCol.append(copyrightSpan);

  block.textContent = '';
  block.append(footerSection);
}
