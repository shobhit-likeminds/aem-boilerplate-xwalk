import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Root-level rows based on BlockJson model
  // The order of these filters is crucial as the block structure is flat.
  // We need to identify the single-instance rows first.
  const logoRow = children.find((row) => row.querySelector('picture'));
  const copyrightRow = children.find(
    (row) => !row.querySelector('picture') && row.children.length === 1 && row.textContent.trim().startsWith('© Copyright'),
  ); // Added textContent check for robustness

  const itemRows = children.filter(
    (row) => row !== logoRow && row !== copyrightRow,
  );

  // Categorize item rows based on their structure and content
  // footer-link-item: 2 cells, both have a link (label, link)
  const topLinkRows = itemRows.filter(
    (row) => row.children.length === 2 && row.children[1].querySelector('a'),
  );

  // footer-dropdown-item: 1 cell (title), no link in the cell itself
  const dropdownItemRows = itemRows.filter(
    (row) => row.children.length === 1 && !row.querySelector('a'),
  );

  // footer-dropdown-link-item: 2 cells (label, link) - these are nested under dropdowns conceptually
  // We need to distinguish these from topLinkRows.
  // Assuming dropdownLinkRows appear immediately after their parent dropdownItemRow in the flat structure.
  // This is a common pattern for flat structures representing hierarchy.
  const dropdownLinkRows = itemRows.filter(
    (row) => row.children.length === 2 && row.children[1].querySelector('a') && !topLinkRows.includes(row) && !legalLinkRows.includes(row),
  );

  // footer-social-item: 1 cell, contains a link
  const socialLinkRows = itemRows.filter(
    (row) => row.children.length === 1 && row.querySelector('a'),
  );

  // footer-legal-link-item: 2 cells, both have a link (label, link)
  // Distinguish from topLinkRows by position or context if needed, but for now,
  // assuming they are distinct based on the overall structure.
  const legalLinkRows = itemRows.filter(
    (row) => row.children.length === 2 && row.children[1].querySelector('a') && !topLinkRows.includes(row),
  );


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
    const [labelCell, linkCell] = [...row.children]; // Fixed: Destructuring for fixed schema
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

  // Dropdown Menus
  // This section needs careful handling due to the flat structure of dropdownItemRows and dropdownLinkRows.
  // The original HTML shows dropdowns with nested links. The current block structure implies
  // dropdownItemRows and dropdownLinkRows are siblings.
  // To correctly associate, we need to iterate through dropdownItemRows and then find their associated links.
  // A common pattern is that dropdown links immediately follow their parent dropdown item.
  // Let's create a map to associate dropdown titles with their links.

  const dropdownsData = [];
  let currentDropdownTitle = null;
  let currentDropdownLinks = [];

  // Iterate through all itemRows to build the dropdownsData structure
  itemRows.forEach((row) => {
    if (row.children.length === 1 && !row.querySelector('a')) { // This is a dropdownItemRow
      if (currentDropdownTitle) {
        dropdownsData.push({
          title: currentDropdownTitle,
          links: currentDropdownLinks,
        });
      }
      currentDropdownTitle = row; // Store the row for instrumentation
      currentDropdownLinks = [];
    } else if (row.children.length === 2 && row.children[1].querySelector('a') && !topLinkRows.includes(row) && !legalLinkRows.includes(row)) { // This is a dropdownLinkRow
      if (currentDropdownTitle) {
        currentDropdownLinks.push(row);
      }
    }
  });
  if (currentDropdownTitle) { // Add the last dropdown
    dropdownsData.push({
      title: currentDropdownTitle,
      links: currentDropdownLinks,
    });
  }

  dropdownsData.forEach((dropdown) => {
    const [titleCell] = [...dropdown.title.children]; // Fixed: Destructuring for fixed schema
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

    dropdown.links.forEach((linkRow) => {
      const [labelCell, linkCell] = [...linkRow.children]; // Fixed: Destructuring for fixed schema
      const link = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      link.textContent = labelCell.textContent.trim();
      link.classList.add('ftr-link'); // Added class from ORIGINAL HTML
      moveInstrumentation(linkRow, link); // Moved instrumentation for each link
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
    moveInstrumentation(dropdown.title, dropdownCol); // Instrumentation for the dropdown item itself
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
