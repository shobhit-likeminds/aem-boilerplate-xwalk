import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    itcLogoRow,
    itcLogoLinkRow,
    itcLogoLinkLabelRow,
    fssaiLogoRow,
    grievanceOfficerNameRow,
    grievanceOfficerContactRow,
    grievanceOfficerTimingRow,
    copyrightRow,
    ...itemRows
  ] = children;

  block.textContent = '';

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const row = document.createElement('div');
  row.classList.add('row');
  container.append(row);

  // Left column for logos
  const colLeft = document.createElement('div');
  colLeft.classList.add('col-lg-6', 'col-sm-12', 'd-flex', 'd-lg-block', 'justify-content-center');
  row.append(colLeft);

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');
  colLeft.append(footerLogos);

  // ITC Logo
  const footerItcLogo = document.createElement('div');
  footerItcLogo.classList.add('footer-itc-logo');
  footerLogos.append(footerItcLogo);

  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('logo', 'image');
  footerItcLogo.append(itcLogoDiv);

  const itcLogoLink = document.createElement('a');
  itcLogoLink.classList.add('cmp-image__link');
  itcLogoLink.target = '_self';
  moveInstrumentation(itcLogoLinkRow, itcLogoLink);
  const itcLinkFound = itcLogoLinkRow.querySelector('a');
  if (itcLinkFound) {
    itcLogoLink.href = itcLinkFound.href;
  }
  const itcLogoLinkLabel = itcLogoLinkLabelRow.querySelector('div');
  if (itcLogoLinkLabel) {
    itcLogoLink.textContent = itcLogoLinkLabel.textContent.trim();
  } else if (itcLinkFound) {
    itcLogoLink.textContent = itcLinkFound.href;
  }

  const itcPicture = itcLogoRow.querySelector('picture');
  if (itcPicture) {
    const itcImg = itcPicture.querySelector('img');
    if (itcImg) {
      const optimizedPic = createOptimizedPicture(itcImg.src, itcImg.alt, false, [{ width: '93' }]);
      moveInstrumentation(itcImg, optimizedPic.querySelector('img'));
      itcLogoDiv.append(optimizedPic);
    }
  }
  itcLogoDiv.append(itcLogoLink);


  // FSSAI Logo
  const footerFssaiLogo = document.createElement('div');
  footerFssaiLogo.classList.add('footer-fssai-logo');
  footerLogos.append(footerFssaiLogo);

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('fssailogo', 'logo', 'image');
  footerFssaiLogo.append(fssaiLogoDiv);

  const fssaiPicture = fssaiLogoRow.querySelector('picture');
  if (fssaiPicture) {
    const fssaiImg = fssaiPicture.querySelector('img');
    if (fssaiImg) {
      const optimizedPic = createOptimizedPicture(fssaiImg.src, fssaiImg.alt, false, [{ width: '192' }]);
      moveInstrumentation(fssaiImg, optimizedPic.querySelector('img'));
      fssaiLogoDiv.append(optimizedPic);
    }
  }

  // Middle column for footer links
  const colMiddle = document.createElement('div');
  colMiddle.classList.add('col-lg-6', 'col-sm-12', 'itc-footer-link-left');
  row.append(colMiddle);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container', 'd-flex');
  colMiddle.append(footerListsContainer);

  const footerLinksList1 = document.createElement('div');
  footerLinksList1.classList.add('list-4', 'list');
  footerListsContainer.append(footerLinksList1);
  const ul1 = document.createElement('ul');
  footerLinksList1.append(ul1);

  const footerLinksList2 = document.createElement('div');
  footerLinksList2.classList.add('list-3', 'list');
  footerListsContainer.append(footerLinksList2);
  const ul2 = document.createElement('ul');
  ul2.classList.add('cmp-list');
  footerLinksList2.append(ul2);

  const footerLinks = itemRows.filter((rowItem) => {
    const cells = [...rowItem.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a')) && !cells.some(cell => cell.querySelector('picture')) && !cells.some(cell => cell.querySelector('a')?.href.includes('secondaryLink'));
  });
  const socialLinks = itemRows.filter((rowItem) => {
    const cells = [...rowItem.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('a')) && cells.some(cell => cell.querySelector('picture'));
  });
  const footerSecondaryLinks = itemRows.filter((rowItem) => {
    const cells = [...rowItem.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a')) && !cells.some(cell => cell.querySelector('picture')) && cells.some(cell => cell.querySelector('a')?.href.includes('secondaryLink'));
  });

  footerLinks.forEach((linkRow, index) => {
    const li = document.createElement('li');
    moveInstrumentation(linkRow, li);

    const cells = [...linkRow.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a'));

    const linkEl = document.createElement('a');
    const originalLink = linkCell?.querySelector('a');
    if (originalLink) {
      linkEl.href = originalLink.href;
      linkEl.target = '_blank';
      linkEl.setAttribute('data-cmp-clickable', '');
    }
    if (labelCell) {
      linkEl.textContent = labelCell.textContent.trim();
    } else if (originalLink) {
      linkEl.textContent = originalLink.href;
    }
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    linkEl.append(screenReaderSpan);
    li.append(linkEl);

    if (index < 3) { // Distribute into two lists based on original HTML structure
      ul1.append(li);
    } else {
      li.classList.add('cmp-list__item');
      linkEl.classList.add('cmp-list__item-link');
      const spanTitle = document.createElement('span');
      spanTitle.classList.add('cmp-list__item-title');
      spanTitle.textContent = linkEl.textContent;
      linkEl.textContent = '';
      linkEl.append(spanTitle);
      ul2.append(li);
    }
  });

  // Contact details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');
  colMiddle.append(contactDetails);

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('contact-details__title', 'mb-md-3', 'mb-0');
  grievanceTitle.textContent = 'Grievance Officer:';
  contactDetails.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceOfficerNameRow, grievanceName);
  grievanceName.textContent = `Name: ${grievanceOfficerNameRow.textContent.trim()}`;
  contactDetails.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('contact-details__description', 'mb-md-1', 'mb-0');
  moveInstrumentation(grievanceOfficerContactRow, grievanceContact);
  grievanceContact.textContent = `Contact Info: ${grievanceOfficerContactRow.textContent.trim()}`;
  contactDetails.append(grievanceContact);

  const grievanceTiming = document.createElement('p');
  grievanceTiming.classList.add('contact-details__description', 'mb-0');
  moveInstrumentation(grievanceOfficerTimingRow, grievanceTiming);
  grievanceTiming.textContent = `(${grievanceOfficerTimingRow.textContent.trim()})`;
  contactDetails.append(grievanceTiming);

  // Right column for social links and copyright
  const colRight = document.createElement('div');
  colRight.classList.add('col-lg-6', 'col-sm-12', 'align-items-md-end', 'd-flex', 'flex-column', 'itc-footer-link-right');
  row.append(colRight);

  const socialLinksWrapper = document.createElement('div');
  colRight.append(socialLinksWrapper);

  socialLinks.forEach((socialRow) => {
    const ul = document.createElement('ul');
    ul.classList.add('list-unstyled');
    socialLinksWrapper.append(ul);

    const li = document.createElement('li');
    moveInstrumentation(socialRow, li);
    ul.append(li);

    const cells = [...socialRow.children];
    const socialLinkCell = cells.find(cell => cell.querySelector('a'));
    // const socialLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture')); // Not used in final render
    const iconCell = cells.find(cell => cell.querySelector('picture'));

    const socialLink = document.createElement('a');
    socialLink.id = 'socialIcons'; // This ID is from original HTML, but IDs should be unique. Consider removing or making dynamic.
    socialLink.target = '_blank';
    socialLink.setAttribute('data-cmp-clickable', '');
    const originalSocialLink = socialLinkCell?.querySelector('a');
    if (originalSocialLink) {
      socialLink.href = originalSocialLink.href;
    }

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      if (iconImg) {
        const optimizedPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '32' }]); // Assuming a small icon size
        moveInstrumentation(iconImg, optimizedPic.querySelector('img'));
        socialLink.append(optimizedPic);
      }
    }

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    socialLink.append(screenReaderSpan);

    li.append(socialLink);
  });

  // Copyright
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  colRight.append(copyrightSpan);

  // Secondary Footer
  if (footerSecondaryLinks.length > 0) {
    const secondaryFooter = document.createElement('footer');
    secondaryFooter.classList.add('itc-footer-section', 'itc-footer-secondary');
    block.append(secondaryFooter);

    const secondaryUl = document.createElement('ul');
    secondaryUl.classList.add('itc-footer-secondary-container');
    secondaryFooter.append(secondaryUl);

    footerSecondaryLinks.forEach((secondaryLinkRow) => {
      const li = document.createElement('li');
      li.classList.add('itc-footer-secondary-lists');
      moveInstrumentation(secondaryLinkRow, li);
      secondaryUl.append(li);

      const cells = [...secondaryLinkRow.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const labelCell = cells.find(cell => !cell.querySelector('a'));

      const linkEl = document.createElement('a');
      linkEl.classList.add('footer-links');
      linkEl.target = '_blank';
      const originalLink = linkCell?.querySelector('a');
      if (originalLink) {
        linkEl.href = originalLink.href;
      }
      if (labelCell) {
        linkEl.textContent = labelCell.textContent.trim();
      } else if (originalLink) {
        linkEl.textContent = originalLink.href;
      }
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      linkEl.append(screenReaderSpan);
      li.append(linkEl);
    });
  }

  // Optimize all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
