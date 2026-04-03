import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Reordered to match the BlockJson and EDS structure
  const [
    contactAddressRow,
    telephoneRow,
    faxRow,
    footerCreditRow,
    ...itemRows
  ] = [...block.children];

  const footerLinkGroups = [];
  const footerSocialLinks = [];

  itemRows.forEach((row) => {
    const cells = [...row.children];
    // Detect footer-link-group by having 2 cells where the first cell is text and the second is a container
    if (cells.length === 2 && !cells[0].querySelector('a') && !cells[0].querySelector('picture') && !cells[1].querySelector('a') && !cells[1].querySelector('picture')) {
      footerLinkGroups.push(row);
    }
    // Detect footer-social-link by having 2 cells where the second cell contains a link
    else if (cells.length === 2 && cells[1].querySelector('a')) {
      footerSocialLinks.push(row);
    }
  });

  const footer = document.createElement('footer');
  moveInstrumentation(block, footer);

  const container = document.createElement('div');
  container.classList.add('container');

  const mainRow = document.createElement('div');
  mainRow.classList.add('row');

  const colMd7 = document.createElement('div');
  colMd7.classList.add('col-md-7');

  const linkGroupsRow = document.createElement('div');
  linkGroupsRow.classList.add('row');

  footerLinkGroups.forEach((groupRow) => {
    const groupCells = [...groupRow.children];
    const colMd3 = document.createElement('div');
    colMd3.classList.add('col-md-3');

    const heading = document.createElement('h4');
    moveInstrumentation(groupCells[0], heading);
    heading.append(...groupCells[0].childNodes);

    const ul = document.createElement('ul');
    const linksDiv = groupCells[1];
    moveInstrumentation(linksDiv, ul);
    [...linksDiv.children].forEach((linkRow) => {
      const li = document.createElement('li');
      moveInstrumentation(linkRow, li);
      const link = linkRow.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        li.append(newLink);
      } else {
        li.append(...linkRow.childNodes);
      }
      ul.append(li);
    });

    colMd3.append(heading, ul);
    linkGroupsRow.append(colMd3);
  });

  colMd7.append(linkGroupsRow);
  mainRow.append(colMd7);

  const colMd5 = document.createElement('div');
  colMd5.classList.add('col-md-5');

  const contactSocialRow = document.createElement('div');
  contactSocialRow.classList.add('row');

  const contactCol = document.createElement('div');
  contactCol.classList.add('col-md-6');
  contactCol.id = 'contact-footer';

  const contactHeading = document.createElement('h4');
  contactHeading.textContent = 'Contact Us';
  contactCol.append(contactHeading);

  const addressP = document.createElement('p');
  // Changed from firstElementChild to children[0] for consistency
  moveInstrumentation(contactAddressRow.children[0], addressP);
  addressP.append(...contactAddressRow.children[0].childNodes);
  contactCol.append(addressP);

  const telNoUl = document.createElement('ul');
  telNoUl.classList.add('tel-no');

  const telLi = document.createElement('li');
  const telLink = document.createElement('a');
  // Changed from firstElementChild to children[0] for consistency
  const telephoneValue = telephoneRow.children[0].textContent.trim();
  telLink.href = `tel:${telephoneValue.replace(/[^0-9+]/g, '')}`;
  telLink.textContent = `Tel: ${telephoneValue}`;
  // Changed from firstElementChild to children[0] for consistency
  moveInstrumentation(telephoneRow.children[0], telLink);
  telLi.append(telLink);
  telNoUl.append(telLi);

  const faxLi = document.createElement('li');
  // Changed from firstElementChild to children[0] for consistency
  const faxValue = faxRow.children[0].textContent.trim();
  faxLi.textContent = `Fax: ${faxValue}`;
  // Changed from firstElementChild to children[0] for consistency
  moveInstrumentation(faxRow.children[0], faxLi);
  telNoUl.append(faxLi);
  contactCol.append(telNoUl);
  contactSocialRow.append(contactCol);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6');

  const socialInfoDiv = document.createElement('div');
  socialInfoDiv.classList.add('social-info');

  const followUsHeading = document.createElement('h4');
  followUsHeading.textContent = 'Follow Us';
  socialInfoDiv.append(followUsHeading);

  const socialUl = document.createElement('ul');

  footerSocialLinks.forEach((socialRow) => {
    const socialCells = [...socialRow.children];
    const li = document.createElement('li');
    moveInstrumentation(socialRow, li);

    const iconClass = socialCells[0].textContent.trim();
    const socialLink = socialCells[1].querySelector('a');

    // Updated to use classList.add with the exact class names from the allowlist
    if (iconClass.includes('fa-facebook-f')) li.classList.add('fb');
    else if (iconClass.includes('fa-twitter')) li.classList.add('twit');
    else if (iconClass.includes('fa-youtube')) li.classList.add('you-t');
    else if (iconClass.includes('fa-instagram')) li.classList.add('insta');
    else if (iconClass.includes('fa-linkedin-in')) li.classList.add('linked');

    if (socialLink) {
      const newSocialLink = document.createElement('a');
      newSocialLink.href = socialLink.href;
      newSocialLink.target = '_blank';
      newSocialLink.setAttribute('aria-label', iconClass.replace('fab fa-', ''));

      const icon = document.createElement('i');
      icon.classList.add('fab', iconClass.replace('fab ', ''));
      icon.setAttribute('aria-hidden', 'true');
      newSocialLink.append(icon);
      li.append(newSocialLink);
    }
    socialUl.append(li);
  });
  socialInfoDiv.append(socialUl);

  const creditP = document.createElement('p');
  // Changed from firstElementChild to children[0] for consistency
  moveInstrumentation(footerCreditRow.children[0], creditP);
  creditP.append(...footerCreditRow.children[0].childNodes);
  socialInfoDiv.append(creditP);

  socialCol.append(socialInfoDiv);
  contactSocialRow.append(socialCol);
  colMd5.append(contactSocialRow);
  mainRow.append(colMd5);
  container.append(mainRow);
  footer.append(container);

  block.textContent = '';
  block.append(footer);
}
