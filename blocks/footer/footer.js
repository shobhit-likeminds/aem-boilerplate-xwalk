import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-section');

  const container = document.createElement('div');
  container.classList.add('container');
  footerSection.append(container);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');
  container.append(footerRow);

  // Column Left - Logos
  const footerColumnLeft = document.createElement('div');
  footerColumnLeft.classList.add('footer-column-left');
  footerRow.append(footerColumnLeft);

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');
  footerColumnLeft.append(footerLogos);

  // ITC Logo (children[0])
  const itcLogoWrapper = document.createElement('div');
  itcLogoWrapper.classList.add('footer-itc-logo');
  moveInstrumentation(children[0], itcLogoWrapper);
  const itcLogoImage = document.createElement('div');
  itcLogoImage.classList.add('logo-image');
  // Assuming children[0] contains a div with a picture element
  const itcPicture = children[0].querySelector('picture');
  if (itcPicture) {
    itcLogoImage.append(itcPicture);
  }
  itcLogoWrapper.append(itcLogoImage);
  footerLogos.append(itcLogoWrapper);

  // FSSAI Logo (children[1])
  const fssaiLogoWrapper = document.createElement('div');
  fssaiLogoWrapper.classList.add('footer-fssai-logo');
  moveInstrumentation(children[1], fssaiLogoWrapper);
  const fssaiLogoImage = document.createElement('div');
  fssaiLogoImage.classList.add('fssai-logo-image');
  // Assuming children[1] contains a div with a picture element
  const fssaiPicture = children[1].querySelector('picture');
  if (fssaiPicture) {
    fssaiLogoImage.append(fssaiPicture);
  }
  fssaiLogoWrapper.append(fssaiLogoImage);
  footerLogos.append(fssaiLogoWrapper);

  // Column Center - Empty in original HTML, but structure for future use
  const footerColumnCenter = document.createElement('div');
  footerColumnCenter.classList.add('footer-column-center');
  footerRow.append(footerColumnCenter);

  const list1Wrapper = document.createElement('div');
  list1Wrapper.classList.add('list-1-wrapper');
  footerColumnCenter.append(list1Wrapper);

  const list2Wrapper = document.createElement('div');
  list2Wrapper.classList.add('list-2-wrapper');
  footerColumnCenter.append(list2Wrapper);

  // Column Links Left
  const footerColumnLinksLeft = document.createElement('div');
  footerColumnLinksLeft.classList.add('footer-column-links-left');
  footerRow.append(footerColumnLinksLeft);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container');
  footerColumnLinksLeft.append(footerListsContainer);

  // Footer Links (children[2] is the container, items follow after root fields)
  const footerLinksWrapper = document.createElement('div');
  footerLinksWrapper.classList.add('list-4-wrapper');
  moveInstrumentation(children[2], footerLinksWrapper); // Instrument the container row
  const footerLinksUl = document.createElement('ul');

  // Collect all item rows for footer links and group links
  // FooterLink items have 2 cells, no picture
  const allFooterLinkRows = children.slice(11).filter((row) => row.children.length === 2 && !row.querySelector('picture'));

  // The BlockJson indicates children[2] (footerLinks) and children[3] (groupLinks) both use 'footerLink' items.
  // The original HTML shows 'list-4-wrapper' (footer links) and 'list-3-wrapper' (group links)
  // The JS needs to distinguish which items belong to which container.
  // Based on the original HTML, footer links appear first, then group links.
  // Let's assume the first set of 'footerLink' items belong to 'footerLinks' and the next set to 'groupLinks'.
  // We need to determine the split point. A common pattern is to have a specific number of items per container,
  // or to rely on the order in the block.children array.
  // Given the current structure, we'll assume a split based on the order of appearance in `allFooterLinkRows`.
  // Let's count how many items are expected for each from the BlockJson (maxItems: 10 for both).
  // Without a clear separator in the block.children array for these two containers,
  // we'll need to make an assumption or rely on the order.
  // The original JS had `footerLinkRows.splice(0, Math.floor(footerLinkRows.length / 2))` for group links,
  // which implies they are interleaved or follow each other.
  // Let's refine the filtering to explicitly use the container rows as markers for their respective items.

  // Find the actual item rows for footerLinks and groupLinks
  const footerLinksContainerRowIndex = children.findIndex((row) => row === children[2]);
  const groupLinksContainerRowIndex = children.findIndex((row) => row === children[3]);
  const socialIconsContainerRowIndex = children.findIndex((row) => row === children[8]);
  const secondaryLinksContainerRowIndex = children.findIndex((row) => row === children[10]);

  // Items for footerLinks (children[2]) are between children[3] and children[4]
  // This is incorrect based on the block structure. Root fields are 0-10. Item rows start from 11.
  // The item rows for footerLinks and groupLinks are interleaved or follow each other.
  // The BlockJson implies they are distinct sets of items.
  // Let's re-evaluate how items are read. The `children.filter` approach is problematic if items for different
  // containers are mixed or not clearly delineated in the `children` array.
  // The `children` array contains ALL rows from the block.
  // The root fields are children[0] to children[10].
  // Item rows start from children[11].

  // Let's collect all item rows first, then distribute them.
  const allItemRows = children.slice(11); // All rows after the 11 root fields

  const footerLinkItems = [];
  const groupLinkItems = [];
  const socialIconItems = [];
  const secondaryLinkItems = [];

  allItemRows.forEach((row) => {
    if (row.children.length === 2 && !row.querySelector('picture')) {
      // This is a footerLink item (text, url)
      // We need to distinguish between footerLinks and groupLinks.
      // The original HTML implies footerLinks come first, then groupLinks.
      // Let's assume the first N footerLink-like items belong to footerLinks, and the next M to groupLinks.
      // Without a clear marker in the block.children array, this is an assumption.
      // For now, we'll collect them and then split based on the original JS's logic (which was flawed).
      // A better approach would be to have distinct item types or a clear separator.
      // Given the BlockJson, both footerLinks and groupLinks use the 'footerLink' item model.
      // The original JS attempted to split `footerLinkRows` into two.
      // Let's collect all `footerLink` type rows and then assign them.
      footerLinkItems.push(row);
    } else if (row.children.length === 2 && row.querySelector('picture')) {
      // This is a socialIcon item (icon, url)
      socialIconItems.push(row);
    } else if (row.children.length === 1 && row.querySelector('a')) {
      // This is a footerSecondaryLink item (url)
      secondaryLinkItems.push(row);
    }
  });

  // Now, distribute the collected footerLinkItems into footerLinks and groupLinks.
  // The original JS assumed `groupLinkRows = footerLinkRows.splice(0, Math.floor(footerLinkRows.length / 2));`
  // This means `footerLinkRows` would contain the second half.
  // Let's stick to that assumption for now, as it's the only logic provided for splitting.
  const totalFooterLinkLikeItems = footerLinkItems.length;
  const groupLinkCount = Math.floor(totalFooterLinkLikeItems / 2);
  const actualGroupLinkItems = footerLinkItems.slice(0, groupLinkCount);
  const actualFooterLinkItems = footerLinkItems.slice(groupLinkCount);


  actualFooterLinkItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const linkEl = document.createElement('a');
    const linkTextCell = row.children[0]; // First cell is text
    const linkUrlCell = row.children[1]; // Second cell is url
    const foundLink = linkUrlCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      linkEl.append(linkTextCell.textContent);
      const span = document.createElement('span');
      span.classList.add('link-screen-reader-only');
      span.textContent = 'opens in a new tab';
      linkEl.append(span);
    }
    li.append(linkEl);
    footerLinksUl.append(li);
  });
  footerLinksWrapper.append(footerLinksUl);
  footerListsContainer.append(footerLinksWrapper);

  // Group Links (children[3] is the container)
  const groupLinksWrapper = document.createElement('div');
  groupLinksWrapper.classList.add('list-3-wrapper');
  moveInstrumentation(children[3], groupLinksWrapper); // Instrument the container row
  const groupLinksUl = document.createElement('ul');
  groupLinksUl.classList.add('list-group-wrapper');

  actualGroupLinkItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    moveInstrumentation(row, li);
    const linkEl = document.createElement('a');
    linkEl.classList.add('list-group-item-link');
    const linkTextCell = row.children[0]; // First cell is text
    const linkUrlCell = row.children[1]; // Second cell is url
    const foundLink = linkUrlCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      const span = document.createElement('span');
      span.classList.add('list-group-item-title');
      span.textContent = linkTextCell.textContent;
      linkEl.append(span);
    }
    li.append(linkEl);
    groupLinksUl.append(li);
  });
  groupLinksWrapper.append(groupLinksUl);
  footerListsContainer.append(groupLinksWrapper);

  // Grievance Officer Details (children[4] to children[7])
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');
  footerColumnLinksLeft.append(contactDetails);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('contact-details-title');
  moveInstrumentation(children[4], grievanceTitle);
  grievanceTitle.textContent = children[4].textContent.trim();
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('contact-details-description');
  moveInstrumentation(children[5], grievanceName);
  grievanceName.textContent = `Name: ${children[5].textContent.trim()}`;
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('contact-details-description');
  moveInstrumentation(children[6], grievanceContact);
  grievanceContact.textContent = `Contact Info: ${children[6].textContent.trim()}`;
  contactDetails.append(grievanceContact);

  const grievanceTimings = document.createElement('p');
  grievanceTimings.classList.add('contact-details-description-last');
  moveInstrumentation(children[7], grievanceTimings);
  grievanceTimings.textContent = `(${children[7].textContent.trim()})`;
  contactDetails.append(grievanceTimings);

  // Column Links Right
  const footerColumnLinksRight = document.createElement('div');
  footerColumnLinksRight.classList.add('footer-column-links-right');
  footerRow.append(footerColumnLinksRight);

  // Social Icons (children[8] is the container)
  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add('social-icons-wrapper');
  moveInstrumentation(children[8], socialIconsWrapper); // Instrument the container row

  socialIconItems.forEach((row) => {
    const ul = document.createElement('ul');
    ul.classList.add('social-list-unstyled');
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const linkEl = document.createElement('a');
    const iconCell = row.children[0]; // First cell is icon (picture)
    const urlCell = row.children[1]; // Second cell is url
    const foundLink = urlCell.querySelector('a');
    const foundPicture = iconCell.querySelector('picture');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      if (foundPicture) {
        const img = foundPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
          linkEl.append(optimizedPic);
        }
      }
      const span = document.createElement('span');
      span.classList.add('link-screen-reader-only');
      span.textContent = 'opens in a new tab';
      linkEl.append(span);
    }
    li.append(linkEl);
    ul.append(li);
    socialIconsWrapper.append(ul);
  });
  footerColumnLinksRight.append(socialIconsWrapper);

  // Copyright (children[9])
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  moveInstrumentation(children[9], copyrightSpan);
  copyrightSpan.textContent = children[9].textContent.trim();
  footerColumnLinksRight.append(copyrightSpan);

  block.textContent = '';
  block.append(footerSection);

  // Secondary Footer
  const footerSectionSecondary = document.createElement('footer');
  footerSectionSecondary.classList.add('footer-section-secondary');

  const secondaryLinksUl = document.createElement('ul');
  secondaryLinksUl.classList.add('footer-secondary-container');
  moveInstrumentation(children[10], secondaryLinksUl); // Instrument the container row

  secondaryLinkItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('footer-secondary-lists');
    moveInstrumentation(row, li);
    const linkEl = document.createElement('a');
    linkEl.classList.add('footer-links');
    const urlCell = row.children[0]; // Only one cell for URL
    const foundLink = urlCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank';
      // The original HTML had an empty <a> tag with only the screen reader span.
      // The BlockJson indicates 'url' as the only field, so the link text should come from the URL text itself or be empty.
      // Let's use the link's text content if available, otherwise keep it empty as per original HTML.
      linkEl.textContent = foundLink.textContent.trim();
      const span = document.createElement('span');
      span.classList.add('link-screen-reader-only');
      span.textContent = 'opens in a new tab';
      linkEl.append(span);
    }
    li.append(linkEl);
    secondaryLinksUl.append(li);
  });
  footerSectionSecondary.append(secondaryLinksUl);
  block.append(footerSectionSecondary);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
