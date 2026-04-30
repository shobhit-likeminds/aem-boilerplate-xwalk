import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Sequential single-pass categorization — processes rows in authored order so we can
  // correctly distinguish top links (before first dropdown title), dropdown links (after
  // a dropdown title, within its group), social links (1-cell with anchor), and legal
  // links (2-cell rows after all dropdown groups have closed).
  let logoRow = null;
  let copyrightRow = null;
  const topLinkRows = [];
  const dropdownGroups = []; // [{ titleRow, linkRows[] }]
  const socialLinkRows = [];
  const legalLinkRows = [];

  let foundDropdown = false;
  let foundSocial = false;
  let currentGroupTitle = null;
  let currentGroupLinks = [];

  children.forEach((row) => {
    // Logo: first row that has a picture
    if (!logoRow && row.children.length === 1 && row.querySelector('picture')) {
      logoRow = row;
      return;
    }
    // Copyright: 1 cell, no link, no picture, text starts with ©
    if (
      row.children.length === 1
      && !row.querySelector('a')
      && !row.querySelector('picture')
      && row.textContent.trim().startsWith('©')
    ) {
      if (currentGroupTitle) {
        dropdownGroups.push({ titleRow: currentGroupTitle, linkRows: currentGroupLinks });
        currentGroupTitle = null;
        currentGroupLinks = [];
      }
      copyrightRow = row;
      return;
    }
    // Social link: 1 cell with an anchor (no picture)
    if (row.children.length === 1 && row.querySelector('a') && !row.querySelector('picture')) {
      if (currentGroupTitle) {
        dropdownGroups.push({ titleRow: currentGroupTitle, linkRows: currentGroupLinks });
        currentGroupTitle = null;
        currentGroupLinks = [];
      }
      foundSocial = true;
      socialLinkRows.push(row);
      return;
    }
    // Dropdown title: 1 cell, no anchor, no picture (not copyright — length check catches that)
    if (row.children.length === 1 && !row.querySelector('a') && !row.querySelector('picture')) {
      if (currentGroupTitle) {
        dropdownGroups.push({ titleRow: currentGroupTitle, linkRows: currentGroupLinks });
      }
      foundDropdown = true;
      currentGroupTitle = row;
      currentGroupLinks = [];
      return;
    }
    // 2-cell link row — top link, dropdown child, or legal link
    if (row.children.length >= 2) {
      if (!foundDropdown && !foundSocial) {
        topLinkRows.push(row);
      } else if (currentGroupTitle) {
        currentGroupLinks.push(row);
      } else {
        legalLinkRows.push(row);
      }
    }
  });
  if (currentGroupTitle) {
    dropdownGroups.push({ titleRow: currentGroupTitle, linkRows: currentGroupLinks });
  }

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  if (logoRow) {
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobLogoWr.append(optimizedPic);
    }
    moveInstrumentation(logoRow, mobLogoWr);
  }
  container.append(mobLogoWr);

  const row1 = document.createElement('div');
  row1.classList.add('row', 'f1');

  // Top Links
  const topLinksCol = document.createElement('div');
  topLinksCol.classList.add('col', 'col-xl-3');
  topLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const link = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = labelCell.textContent.trim();
    link.classList.add('ttle');
    moveInstrumentation(row, link);
    topLinksCol.append(link);
  });
  row1.append(topLinksCol);

  // Dropdown Menus (built from sequential dropdownGroups array)
  const dropdownsData = dropdownGroups;

  dropdownsData.forEach((dropdown) => {
    const [titleCell] = [...dropdown.titleRow.children];
    const dropdownCol = document.createElement('div');
    dropdownCol.classList.add('col', 'col-xl-3');

    const titleLink = document.createElement('a');
    titleLink.href = 'javascript:void(0)';
    titleLink.classList.add('ttle', 'accordion_head2');
    titleLink.textContent = titleCell.textContent.trim();
    const plusMinus = document.createElement('span');
    plusMinus.classList.add('plusminus2');
    plusMinus.textContent = '+';
    titleLink.append(plusMinus);

    const subLinksCvr = document.createElement('div');
    subLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');

    dropdown.linkRows.forEach((linkRow) => {
      const [labelCell, linkCell] = [...linkRow.children];
      const link = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      link.textContent = labelCell.textContent.trim();
      link.classList.add('ftr-link');
      moveInstrumentation(linkRow, link);
      subLinksCvr.append(link);
    });

    dropdownCol.append(titleLink);
    dropdownCol.append(subLinksCvr);
    row1.append(dropdownCol);

    titleLink.addEventListener('click', () => {
      subLinksCvr.classList.toggle('accordion_body2');
      plusMinus.textContent = subLinksCvr.classList.contains('accordion_body2')
        ? '+'
        : '-';
    });
    moveInstrumentation(dropdown.titleRow, dropdownCol);
  });

  container.append(row1);

  const row2 = document.createElement('div');
  row2.classList.add('row', 'f2', 'justify-content-between');

  // Social Links
  const socialCol = document.createElement('div');
  socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');

  const socialTitle = document.createElement('p');
  socialTitle.classList.add('ttle', 'accordion_head2');
  socialTitle.textContent = 'Social Media'; // Hardcoded as per original HTML
  const socialPlusMinus = document.createElement('span');
  socialPlusMinus.classList.add('plusminus2');
  socialPlusMinus.textContent = '+';
  socialTitle.append(socialPlusMinus);

  const socialLinksCvr = document.createElement('div');
  socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');

  socialLinkRows.forEach((row) => {
    const [socialLinkCell] = [...row.children]; // Fixed: Destructuring for fixed schema
    const link = document.createElement('a');
    const foundLink = socialLinkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank'; // Assuming social links open in new tab as per original HTML
    }

    const icon = document.createElement('i');
    if (link.href.includes('facebook')) {
      icon.classList.add('fab', 'fa-facebook-square'); // Corrected class names
    } else if (link.href.includes('instagram')) {
      icon.classList.add('fab', 'fa-instagram'); // Corrected class names
    } else if (link.href.includes('twitter')) {
      icon.classList.add('fa-brands', 'fa-square-x-twitter'); // Corrected class names
    } else if (link.href.includes('linkedin')) {
      icon.classList.add('fab', 'fa-linkedin'); // Corrected class names
    } else if (link.href.includes('youtube')) {
      icon.classList.add('fab', 'fa-youtube-square'); // Corrected class names
    }
    link.append(icon);
    link.classList.add('ftr-link');
    moveInstrumentation(row, link);
    socialLinksCvr.append(link);
  });

  socialCol.append(socialTitle);
  socialCol.append(socialLinksCvr);
  row2.append(socialCol);

  socialTitle.addEventListener('click', () => {
    socialLinksCvr.classList.toggle('accordion_body2');
    socialPlusMinus.textContent = socialLinksCvr.classList.contains('accordion_body2')
      ? '+'
      : '-';
  });

  container.append(row2);

  const row3 = document.createElement('div');
  row3.classList.add('row', 'mt25', 'f3');

  // Legal Links
  const legalCol1 = document.createElement('div');
  legalCol1.classList.add('col-12', 'col-md-6');
  legalLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Fixed: Destructuring for fixed schema
    const link = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, link);
    legalCol1.append(link);
  });
  row3.append(legalCol1);

  // Copyright Text
  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  const copyrightP = document.createElement('p');
  copyrightP.classList.add('copy-txt', 'text-md-end');
  if (copyrightRow) {
    const [copyrightCell] = [...copyrightRow.children]; // Fixed: Destructuring for fixed schema
    copyrightP.textContent = copyrightCell.textContent.trim();
    moveInstrumentation(copyrightRow, copyrightP);
  }
  copyrightCol.append(copyrightP);
  row3.append(copyrightCol);

  container.append(row3);

  block.replaceChildren(container);
}
