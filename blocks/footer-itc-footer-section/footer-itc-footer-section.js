import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'footer-itc-footer-section';

  // There are 10 root model fields in BlockJson, so we expect 10 children for the fixed fields.
  const [
    logosContainer,
    footerLinksContainer,
    footerListItemsContainer,
    socialIconsContainer,
    secondaryFooterLinksContainer,
    copyrightRow,
    grievanceOfficerTitleRow,
    grievanceOfficerNameRow,
    grievanceOfficerContactRow,
    grievanceOfficerHoursRow,
    ...itemRows
  ] = [...block.children];

  // Item sub-components:
  // logo: 2 cells (image, link) - image is a picture, link is aem-content
  // footerLink: 2 cells (link, text) - link is aem-content, text is text
  // footerListItem: 2 cells (link, text) - link is aem-content, text is text
  // socialIcon: 2 cells (icon, link) - icon is a picture, link is aem-content
  // secondaryFooterLink: 1 cell (link) - link is aem-content

  const logoItems = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('picture') && row.children[1].querySelector('a'),
  );
  const footerLinkItems = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('a') && !row.children[0].querySelector('picture') && !row.children[1].querySelector('a'),
  );
  const footerListItemItems = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('a') && !row.children[0].querySelector('picture') && !row.children[1].querySelector('a'),
  );
  const socialIconItems = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('picture') && row.children[1].querySelector('a'),
  );
  const secondaryFooterLinkItems = itemRows.filter(
    (row) => row.children.length === 1 && row.children[0].querySelector('a'),
  );

  block.textContent = '';
  block.classList.add(`${blockName}`); // Corrected class name to match blockName

  const footerContainer = document.createElement('div');
  footerContainer.classList.add(`${blockName}-container`);
  block.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.classList.add(`${blockName}-row`);
  footerContainer.append(footerRow);

  // Column 1: Logos
  const col1 = document.createElement('div');
  col1.classList.add(
    `${blockName}-col-lg-6`,
    `${blockName}-col-sm-12`,
    `${blockName}-d-flex`,
    `${blockName}-d-lg-block`,
    `${blockName}-justify-content-center`,
  );
  footerRow.append(col1);

  const footerLogosDiv = document.createElement('div');
  footerLogosDiv.classList.add(`${blockName}-footer-logos`);
  col1.append(footerLogosDiv);

  logoItems.forEach((row) => {
    const logoDiv = document.createElement('div');
    logoDiv.classList.add(`${blockName}-footer-itc-logo`);

    const imageCell = row.children[0];
    const linkCell = row.children[1];

    if (imageCell) {
      const logoImageDiv = document.createElement('div');
      logoImageDiv.classList.add(`${blockName}-logo`, `${blockName}-image`);

      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          picture.replaceWith(optimizedPic);
        }
      }
      moveInstrumentation(imageCell, logoImageDiv);
      while (imageCell.firstChild) logoImageDiv.append(imageCell.firstChild);
      logoDiv.append(logoImageDiv);
    }

    if (linkCell) {
      const linkEl = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.target = '_blank';
      }
      moveInstrumentation(linkCell, linkEl);
      while (linkCell.firstChild) linkEl.append(linkCell.firstChild);
      logoDiv.append(linkEl);
    }
    footerLogosDiv.append(logoDiv);
  });

  // Column 2: Footer Links (List 1 & List 2)
  const col2 = document.createElement('div');
  col2.classList.add(
    `${blockName}-col-lg-3`,
    `${blockName}-col-sm-12`,
    `${blockName}-d-flex`,
    `${blockName}-justify-content-xl-between`,
    `${blockName}-footer-page-links-wrapper`,
    `${blockName}-pt-md-0`,
    `${blockName}-pt-4`,
    `${blockName}-px-1`,
  );
  footerRow.append(col2);

  const list1Div = document.createElement('div');
  list1Div.classList.add(`${blockName}-list-1`, `${blockName}-list`);
  col2.append(list1Div);

  const list2Div = document.createElement('div');
  list2Div.classList.add(`${blockName}-list-2`, `${blockName}-list`);
  col2.append(list2Div);

  const footerLinksUl = document.createElement('ul');
  footerLinksUl.classList.add(`${blockName}-cmp-list`);
  list1Div.append(footerLinksUl);

  footerLinkItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add(`${blockName}-cmp-list__item`);
    moveInstrumentation(row, li);

    const linkCell = row.children[0];
    const textCell = row.children[1];

    if (linkCell && textCell) {
      const linkEl = document.createElement('a');
      linkEl.classList.add(`${blockName}-cmp-list__item-link`);
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.target = '_blank';
      }

      const span = document.createElement('span');
      span.classList.add(`${blockName}-cmp-list__item-title`);
      span.textContent = textCell.textContent.trim();
      linkEl.append(span);
      li.append(linkEl);
    }
    footerLinksUl.append(li);
  });

  // Column 3: Footer List Items & Grievance Officer Details
  const col3 = document.createElement('div');
  col3.classList.add(`${blockName}-col-lg-6`, `${blockName}-col-sm-12`, `${blockName}-itc-footer-link-left`);
  footerRow.append(col3);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add(`${blockName}-footer-lists-container`, `${blockName}-d-flex`);
  col3.append(footerListsContainer);

  const list4Div = document.createElement('div');
  list4Div.classList.add(`${blockName}-list-4`, `${blockName}-list`);
  footerListsContainer.append(list4Div);

  const list4Ul = document.createElement('ul');
  list4Div.append(list4Ul);

  footerListItemItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const linkCell = row.children[0];
    const textCell = row.children[1];

    if (linkCell && textCell) {
      const linkEl = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.target = '_blank';
      }
      linkEl.textContent = textCell.textContent.trim();
      li.append(linkEl);
    }
    list4Ul.append(li);
  });

  const contactDetailsDiv = document.createElement('div');
  contactDetailsDiv.classList.add(`${blockName}-contact-details`);
  col3.append(contactDetailsDiv);

  if (grievanceOfficerTitleRow) {
    const title = document.createElement('h5');
    title.classList.add(`${blockName}-contact-details__title`, `${blockName}-mb-md-3`, `${blockName}-mb-0`);
    moveInstrumentation(grievanceOfficerTitleRow, title);
    title.textContent = grievanceOfficerTitleRow.textContent.trim();
    contactDetailsDiv.append(title);
  }

  if (grievanceOfficerNameRow) {
    const name = document.createElement('p');
    name.classList.add(`${blockName}-contact-details__description`, `${blockName}-mb-md-1`, `${blockName}-mb-0`);
    moveInstrumentation(grievanceOfficerNameRow, name);
    name.textContent = grievanceOfficerNameRow.textContent.trim();
    contactDetailsDiv.append(name);
  }

  if (grievanceOfficerContactRow) {
    const contact = document.createElement('p');
    contact.classList.add(`${blockName}-contact-details__description`, `${blockName}-mb-md-1`, `${blockName}-mb-0`);
    moveInstrumentation(grievanceOfficerContactRow, contact);
    contact.textContent = grievanceOfficerContactRow.textContent.trim(); // Fixed typo here
    contactDetailsDiv.append(contact);
  }

  if (grievanceOfficerHoursRow) {
    const hours = document.createElement('p');
    hours.classList.add(`${blockName}-contact-details__description`, `${blockName}-mb-0`);
    moveInstrumentation(grievanceOfficerHoursRow, hours);
    hours.textContent = grievanceOfficerHoursRow.textContent.trim();
    contactDetailsDiv.append(hours);
  }

  // Column 4: Social Icons & Copyright
  const col4 = document.createElement('div');
  col4.classList.add(
    `${blockName}-col-lg-6`,
    `${blockName}-col-sm-12`,
    `${blockName}-align-items-md-end`,
    `${blockName}-d-flex`,
    `${blockName}-flex-column`,
    `${blockName}-itc-footer-link-right`,
  );
  footerRow.append(col4);

  const socialIconsWrapper = document.createElement('div');
  col4.append(socialIconsWrapper);

  socialIconItems.forEach((row) => {
    const ul = document.createElement('ul');
    ul.classList.add(`${blockName}-list-unstyled`);
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const iconCell = row.children[0];
    const linkCell = row.children[1];

    if (iconCell && linkCell) {
      const linkEl = document.createElement('a');
      linkEl.id = 'socialIcons';
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.target = '_blank';
      }

      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          picture.replaceWith(optimizedPic);
          linkEl.append(optimizedPic);
        }
      }
      li.append(linkEl);
    }
    ul.append(li);
    socialIconsWrapper.append(ul);
  });

  if (copyrightRow) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add(`${blockName}-footer-link`);
    moveInstrumentation(copyrightRow, copyrightSpan);
    copyrightSpan.textContent = copyrightRow.textContent.trim();
    col4.append(copyrightSpan);
  }

  // Secondary Footer
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add(`${blockName}`, `${blockName}-itc-footer-secondary`); // Corrected class name
  block.append(secondaryFooter);

  const secondaryFooterUl = document.createElement('ul');
  secondaryFooterUl.classList.add(`${blockName}-itc-footer-secondary-container`);
  secondaryFooter.append(secondaryFooterUl);

  secondaryFooterLinkItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add(`${blockName}-itc-footer-secondary-lists`);
    moveInstrumentation(row, li);

    const linkCell = row.children[0];

    if (linkCell) {
      const linkEl = document.createElement('a');
      linkEl.classList.add(`${blockName}-footer-links`);
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.target = '_blank';
      }
      linkEl.textContent = foundLink.textContent.trim();
      li.append(linkEl);
    }
    secondaryFooterUl.append(li);
  });

  // Optimize all images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
