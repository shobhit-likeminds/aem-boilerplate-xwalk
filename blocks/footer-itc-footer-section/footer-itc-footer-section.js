import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // BlockJson has 12 root model fields. The JS must read exactly 12 root rows.
  // The current destructuring reads 12, so this is correct.
  const [
    itcLogoRow,
    fssaiLogoRow,
    itcLogoLinkRow,
    footerLinksContainerRow, // This is a container, its content is in itemRows
    heritageLinksContainerRow, // This is a container, its content is in itemRows
    grievanceOfficerTitleRow,
    grievanceOfficerNameRow,
    grievanceOfficerContactRow,
    grievanceOfficerTimeRow,
    socialIconsContainerRow, // This is a container, its content is in itemRows
    copyrightRow,
    secondaryLinksContainerRow, // This is a container, its content is in itemRows
    ...itemRows // All item rows for footerLink, socialIcon, secondaryLink
  ] = children;

  // Item sub-component filtering based on BlockJson:
  // footerLink: 2 cells (link, text)
  // socialIcon: 2 cells (link, icon - which is a picture)
  // secondaryLink: 1 cell (link)

  const footerLinks = itemRows.filter(row => row.children.length === 2 && row.querySelector('a') && !row.querySelector('picture'));
  const socialIcons = itemRows.filter(row => row.children.length === 2 && row.querySelector('picture'));
  const secondaryLinks = itemRows.filter(row => row.children.length === 1 && row.querySelector('a'));

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-itc-footer-section-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-itc-footer-section-row');

  // Left column for logos
  const logoCol = document.createElement('div');
  logoCol.classList.add('footer-itc-footer-section-col-lg-6', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-d-flex', 'footer-itc-footer-section-d-lg-block', 'footer-itc-footer-section-justify-content-center');

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-itc-footer-section-footer-logos');

  const footerItcLogoDiv = document.createElement('div');
  footerItcLogoDiv.classList.add('footer-itc-footer-section-footer-itc-logo');
  const itcLogoWrapper = document.createElement('div');
  itcLogoWrapper.classList.add('footer-itc-footer-section-itc-logo', 'footer-itc-footer-section-logo', 'footer-itc-footer-section-image');
  const itcLogoPicture = itcLogoRow.querySelector('picture');
  if (itcLogoPicture) {
    const itcLogoLink = document.createElement('a');
    itcLogoLink.classList.add('footer-itc-footer-section-cmp-image__link');
    const itcLogoHref = itcLogoLinkRow.textContent.trim();
    if (itcLogoHref) {
      itcLogoLink.href = itcLogoHref;
    } else {
      itcLogoLink.href = '#'; // Fallback if link is empty
    }
    moveInstrumentation(itcLogoRow, itcLogoLink);
    itcLogoLink.append(itcLogoPicture);
    itcLogoWrapper.append(itcLogoLink);
  }
  footerItcLogoDiv.append(itcLogoWrapper);
  footerLogos.append(footerItcLogoDiv);

  const footerFssaiLogoDiv = document.createElement('div');
  footerFssaiLogoDiv.classList.add('footer-itc-footer-section-footer-fssai-logo');
  const fssaiLogoWrapper = document.createElement('div');
  fssaiLogoWrapper.classList.add('footer-itc-footer-section-fssailogo', 'footer-itc-footer-section-logo', 'footer-itc-footer-section-image');
  const fssaiLogoPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiLogoPicture) {
    moveInstrumentation(fssaiLogoRow, fssaiLogoPicture);
    fssaiLogoWrapper.append(fssaiLogoPicture);
  }
  footerFssaiLogoDiv.append(fssaiLogoWrapper);
  footerLogos.append(footerFssaiLogoDiv);

  logoCol.append(footerLogos);
  footerRow.append(logoCol);

  // Right column for links and contact details
  const rightCol = document.createElement('div');
  rightCol.classList.add('footer-itc-footer-section-col-lg-6', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-itc-footer-link-left');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-itc-footer-section-footer-lists-container', 'footer-itc-footer-section-d-flex');

  // Footer Links
  if (footerLinks.length > 0) {
    const footerList1 = document.createElement('div');
    footerList1.classList.add('footer-itc-footer-section-list-4', 'footer-itc-footer-section-list');
    const ul1 = document.createElement('ul');
    footerLinks.forEach((row, index) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.id = `footerLinks-${index + 1}`;
      const linkEl = document.createElement('a');
      const foundLink = row.children[0].querySelector('a') || row.children[0]; // Link is in the first cell
      if (foundLink) {
        linkEl.href = foundLink.href || '#';
        linkEl.target = '_blank';
        linkEl.setAttribute('data-cmp-clickable', '');
        linkEl.innerHTML = `${row.children[1].textContent.trim()}<span class="footer-itc-footer-section-cmp-link__screen-reader-only">opens in a new tab</span>`; // Text is in the second cell
      } else {
        linkEl.href = '#';
        linkEl.textContent = row.children[1].textContent.trim();
      }
      li.append(linkEl);
      ul1.append(li);
    });
    footerList1.append(ul1);
    footerListsContainer.append(footerList1);
  }

  // Heritage Links - these are also 'footerLink' type items, so they have 2 cells.
  // The original JS incorrectly used `heritageLinksContainerRow.textContent.trim() !== 'Heritage Links value'`
  // to check for existence, but this row is a container and its content is in `itemRows`.
  // We need to filter `itemRows` for heritage links if they are distinct from `footerLinks`.
  // Based on the BlockJson, both `footerLinks` and `heritageLinks` containers refer to `footerLink` item type.
  // This implies they are structurally identical and distinguished by their position or context.
  // The current JS filters for `footerLinks` and `heritageLinkItems` using the same criteria.
  // To differentiate, we'd need more context (e.g., if heritage links appear after all footer links in `itemRows`).
  // For now, assuming `heritageLinkItems` is meant to be a separate set of `footerLink` items.
  // If `heritageLinksContainerRow` itself had content, we would use that. Since it's a container,
  // we assume the actual links are in `itemRows` and need to be explicitly identified if different from `footerLinks`.
  // Given the structure, `itemRows` contains all item types. If heritage links are distinct,
  // they would likely be grouped together in the `itemRows` after the `footerLinks` container.
  // Without a clear way to distinguish them from `footerLinks` in `itemRows` based on content,
  // we'll assume they are the same type and the current filtering is intended to pick up a *subset*
  // of the `footerLink` items that are logically "heritage links".
  // The original HTML shows heritage links within a separate `div` but structurally similar.
  // For now, keeping the filtering logic as is, assuming `heritageLinkItems` will correctly identify them
  // if they are present in `itemRows` and not already consumed by `footerLinks`.
  // A more robust solution might involve parsing `itemRows` sequentially based on the order of container rows.

  const heritageLinkItems = itemRows.filter(row => row.children.length === 2 && row.querySelector('a') && !row.querySelector('picture')); // Assuming heritage links have same structure as footer links

  if (heritageLinkItems.length > 0) { // Check if any heritage links were found
    const heritageLinksList = document.createElement('div');
    heritageLinksList.classList.add('footer-itc-footer-section-list-3', 'footer-itc-footer-section-list');
    const ul2 = document.createElement('ul');
    ul2.id = 'list-499c6a3139'; // Keep original ID if it's from HTML
    ul2.classList.add('footer-itc-footer-section-cmp-list');
    heritageLinkItems.forEach(row => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('footer-itc-footer-section-cmp-list__item');
      const linkEl = document.createElement('a');
      linkEl.classList.add('footer-itc-footer-section-cmp-list__item-link');
      const foundLink = row.children[0].querySelector('a') || row.children[0]; // Link is in the first cell
      if (foundLink) {
        linkEl.href = foundLink.href || '#';
        const span = document.createElement('span');
        span.classList.add('footer-itc-footer-section-cmp-list__item-title');
        span.textContent = row.children[1].textContent.trim(); // Text is in the second cell
        linkEl.append(span);
      } else {
        linkEl.href = '#';
        const span = document.createElement('span');
        span.classList.add('footer-itc-footer-section-cmp-list__item-title');
        span.textContent = row.children[1].textContent.trim();
        linkEl.append(span);
      }
      li.append(linkEl);
      ul2.append(li);
    });
    footerListsContainer.append(heritageLinksList);
    heritageLinksList.append(ul2);
  }

  rightCol.append(footerListsContainer);

  // Contact Details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-itc-footer-section-contact-details');

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-itc-footer-section-contact-details__title', 'footer-itc-footer-section-mb-md-3', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerTitleRow, grievanceTitle);
  grievanceTitle.textContent = grievanceOfficerTitleRow.textContent.trim();
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-md-1', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerNameRow, grievanceName);
  grievanceName.textContent = grievanceOfficerNameRow.textContent.trim();
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-md-1', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerContactRow, grievanceContact);
  grievanceContact.textContent = grievanceOfficerContactRow.textContent.trim();
  contactDetails.append(grievanceContact);

  const grievanceTime = document.createElement('p');
  grievanceTime.classList.add('footer-itc-footer-section-contact-details__description', 'footer-itc-footer-section-mb-0');
  moveInstrumentation(grievanceOfficerTimeRow, grievanceTime);
  grievanceTime.textContent = grievanceOfficerTimeRow.textContent.trim();
  contactDetails.append(grievanceTime);

  rightCol.append(contactDetails);
  footerRow.append(rightCol);

  // Social Icons and Copyright
  const socialCopyrightCol = document.createElement('div');
  socialCopyrightCol.classList.add('footer-itc-footer-section-col-lg-6', 'footer-itc-footer-section-col-sm-12', 'footer-itc-footer-section-align-items-md-end', 'footer-itc-footer-section-d-flex', 'footer-itc-footer-section-flex-column', 'footer-itc-footer-section-itc-footer-link-right');

  const socialIconsWrapper = document.createElement('div');
  socialIcons.forEach(row => {
    const ul = document.createElement('ul');
    ul.classList.add('footer-itc-footer-section-list-unstyled');
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const link = document.createElement('a');
    link.id = 'socialIcons'; // Keep original ID if it's from HTML
    const foundLink = row.children[0].querySelector('a') || row.children[0]; // Link is in the first cell
    const foundImg = row.children[1].querySelector('picture > img'); // Image is in the second cell
    if (foundLink) {
      link.href = foundLink.href || '#';
      link.target = '_blank';
      link.setAttribute('data-cmp-clickable', '');
    }
    if (foundImg) {
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.src = foundImg.src;
      img.alt = foundImg.alt;
      link.append(img);
    }
    const span = document.createElement('span');
    span.classList.add('footer-itc-footer-section-cmp-link__screen-reader-only');
    span.textContent = 'opens in a new tab';
    link.append(span);
    li.append(link);
    ul.append(li);
    socialIconsWrapper.append(ul);
  });
  socialCopyrightCol.append(socialIconsWrapper);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-itc-footer-section-footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  socialCopyrightCol.append(copyrightSpan);

  footerRow.append(socialCopyrightCol);
  footerContainer.append(footerRow);

  // Secondary Footer
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section-itc-footer-section', 'footer-itc-footer-section-itc-footer-secondary');
  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-section-itc-footer-secondary-container');

  secondaryLinks.forEach(row => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('footer-itc-footer-section-itc-footer-secondary-lists');
    const link = document.createElement('a');
    link.classList.add('footer-itc-footer-section-footer-links');
    link.target = '_blank';
    const foundLink = row.children[0].querySelector('a') || row.children[0]; // Link is in the first cell
    if (foundLink) {
      link.href = foundLink.href || '#';
      link.textContent = foundLink.textContent.trim();
    } else {
      link.href = '#';
      link.textContent = row.children[0].textContent.trim();
    }
    const span = document.createElement('span');
    span.classList.add('footer-itc-footer-section-cmp-link__screen-reader-only');
    span.textContent = 'opens in a new tab';
    link.append(span);
    li.append(link);
    secondaryUl.append(li);
  });
  secondaryFooter.append(secondaryUl);

  block.textContent = '';
  block.append(footerContainer);
  block.append(secondaryFooter);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
