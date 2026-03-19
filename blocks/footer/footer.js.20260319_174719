import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-section');
  const container = document.createElement('div');
  container.classList.add('container');
  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');

  // Footer Logos
  const footerColumnLeft = document.createElement('div');
  footerColumnLeft.classList.add('footer-column-left');
  const footerLogosDiv = document.createElement('div');
  footerLogosDiv.classList.add('footer-logos');
  const logosContainer = children[0];
  moveInstrumentation(logosContainer, footerLogosDiv);
  [...logosContainer.children].forEach((logoRow) => {
    const logoImageCell = logoRow.querySelector('div:has(picture)');
    const logoLinkCell = logoRow.querySelector('div:has(a)');
    const logoAltTextCell = logoRow.querySelector('div:not(:has(picture)):not(:has(a))');

    if (logoImageCell && logoLinkCell) {
      const logoDiv = document.createElement('div');
      logoDiv.classList.add('footer-itc-logo'); // Assuming first is ITC, others FSSAI or similar
      const logoImageDiv = document.createElement('div');
      logoImageDiv.classList.add('logo-image');

      const link = logoLinkCell.querySelector('a');
      const picture = logoImageCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;

      if (link && img) {
        const logoLink = document.createElement('a');
        logoLink.href = link.href;
        logoLink.target = '_self'; // Default target, adjust if needed from original HTML
        logoLink.classList.add('cmp-image__link'); // Apply class from original HTML

        const optimizedPic = createOptimizedPicture(img.src, logoAltTextCell ? logoAltTextCell.textContent.trim() : img.alt, false, [{ width: '93' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        logoLink.append(optimizedPic);
        logoImageDiv.append(logoLink);
      } else if (img) {
        const optimizedPic = createOptimizedPicture(img.src, logoAltTextCell ? logoAltTextCell.textContent.trim() : img.alt, false, [{ width: '93' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        logoImageDiv.append(optimizedPic);
      } else if (logoImageCell.textContent.trim()) {
        logoImageDiv.innerHTML = logoImageCell.innerHTML;
      }
      logoDiv.append(logoImageDiv);
      footerLogosDiv.append(logoDiv);
    }
  });
  footerColumnLeft.append(footerLogosDiv);
  footerRow.append(footerColumnLeft);

  // Footer Links
  const footerColumnLinksWrapper = document.createElement('div');
  footerColumnLinksWrapper.classList.add('footer-column-links-wrapper');
  const footerLinksContainer = children[1];
  moveInstrumentation(footerLinksContainer, footerColumnLinksWrapper);

  const listOneList = document.createElement('div');
  listOneList.classList.add('list-one-list');
  const ulLinks = document.createElement('ul');
  ulLinks.classList.add('cmp-list');

  [...footerLinksContainer.children].forEach((linkRow) => {
    const linkCell = linkRow.querySelector('div:has(a)');
    const textCell = linkRow.querySelector('div:not(:has(a))');

    if (linkCell && textCell) {
      const li = document.createElement('li');
      moveInstrumentation(linkRow, li);
      li.classList.add('cmp-list__item');
      const link = linkCell.querySelector('a');
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.classList.add('cmp-list__item-link');
        a.innerHTML = `<span class="cmp-list__item-title">${textCell.textContent.trim()}</span>`;
        li.append(a);
      }
      ulLinks.append(li);
    }
  });
  listOneList.append(ulLinks);
  footerColumnLinksWrapper.append(listOneList);
  footerRow.append(footerColumnLinksWrapper);

  // Grievance Officer and Secondary Links
  const footerColumnLinkLeft = document.createElement('div');
  footerColumnLinkLeft.classList.add('footer-column-link-left');

  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');

  const grievanceOfficerTitle = children[5];
  if (grievanceOfficerTitle && grievanceOfficerTitle.textContent.trim()) {
    const h5 = document.createElement('h5');
    moveInstrumentation(grievanceOfficerTitle, h5);
    h5.classList.add('contact-details__title-footer');
    h5.innerHTML = grievanceOfficerTitle.innerHTML;
    contactDetails.append(h5);
  }

  const grievanceOfficerName = children[6];
  if (grievanceOfficerName && grievanceOfficerName.textContent.trim()) {
    const p = document.createElement('p');
    moveInstrumentation(grievanceOfficerName, p);
    p.classList.add('contact-details__description-footer');
    p.innerHTML = `Name: ${grievanceOfficerName.textContent.trim()}`;
    contactDetails.append(p);
  }

  const grievanceOfficerContact = children[7];
  if (grievanceOfficerContact && grievanceOfficerContact.textContent.trim()) {
    const p = document.createElement('p');
    moveInstrumentation(grievanceOfficerContact, p);
    p.classList.add('contact-details__description-footer');
    p.innerHTML = `Contact Info: ${grievanceOfficerContact.textContent.trim()}`;
    contactDetails.append(p);
  }

  const grievanceOfficerTiming = children[8];
  if (grievanceOfficerTiming && grievanceOfficerTiming.textContent.trim()) {
    const p = document.createElement('p');
    moveInstrumentation(grievanceOfficerTiming, p);
    p.classList.add('contact-details__description-footer');
    p.innerHTML = `(${grievanceOfficerTiming.textContent.trim()})`;
    contactDetails.append(p);
  }
  footerColumnLinkLeft.append(contactDetails);
  footerRow.append(footerColumnLinkLeft);

  // Social Links and Copyright
  const footerColumnLinkRight = document.createElement('div');
  footerColumnLinkRight.classList.add('footer-column-link-right');

  const socialLinksContainer = children[2];
  moveInstrumentation(socialLinksContainer, footerColumnLinkRight);
  [...socialLinksContainer.children].forEach((socialLinkRow) => {
    const linkCell = socialLinkRow.querySelector('div:has(a)');
    const iconCell = socialLinkRow.querySelector('div:has(picture)');

    if (linkCell && iconCell) {
      const ul = document.createElement('ul');
      ul.classList.add('footer-list-unstyled');
      const li = document.createElement('li');
      moveInstrumentation(socialLinkRow, li);
      const link = linkCell.querySelector('a');
      const picture = iconCell.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;

      if (link && img) {
        const a = document.createElement('a');
        a.id = 'socialIcons';
        a.href = link.href;
        a.target = '_blank';
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '30' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        a.append(optimizedPic);
        a.innerHTML += '<span class="cmp-link__screen-reader-only">opens in a new tab</span>';
        li.append(a);
      }
      ul.append(li);
      footerColumnLinkRight.append(ul);
    }
  });

  const copyrightRow = children[4];
  if (copyrightRow && copyrightRow.textContent.trim()) {
    const span = document.createElement('span');
    moveInstrumentation(copyrightRow, span);
    span.classList.add('footer-link');
    span.innerHTML = copyrightRow.textContent.trim();
    footerColumnLinkRight.append(span);
  }
  footerRow.append(footerColumnLinkRight);

  container.append(footerRow);
  footerSection.append(container);
  block.append(footerSection);

  // Secondary Footer Section
  const footerSectionSecondary = document.createElement('footer');
  footerSectionSecondary.classList.add('footer-section-secondary');
  const ulSecondary = document.createElement('ul');
  ulSecondary.classList.add('footer-secondary-container');

  const secondaryLinksContainer = children[3];
  moveInstrumentation(secondaryLinksContainer, ulSecondary);
  [...secondaryLinksContainer.children].forEach((secondaryLinkRow) => {
    const linkCell = secondaryLinkRow.querySelector('div:has(a)');
    if (linkCell) {
      const li = document.createElement('li');
      moveInstrumentation(secondaryLinkRow, li);
      li.classList.add('footer-secondary-lists');
      const link = linkCell.querySelector('a');
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.classList.add('footer-links');
        a.innerHTML = link.textContent.trim();
        a.innerHTML += '<span class="cmp-link__screen-reader-only">opens in a new tab</span>';
        li.append(a);
      }
      ulSecondary.append(li);
    }
  });
  footerSectionSecondary.append(ulSecondary);
  block.append(footerSectionSecondary);
}
