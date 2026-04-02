import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footer = document.createElement('div');
  footer.classList.add('container');

  const mainRow = document.createElement('div');
  mainRow.classList.add('row', 'border-dotted-bottom');

  const mainContentCol = document.createElement('div');
  mainContentCol.classList.add('col-sm-12', 'col-md-10', 'col-lg-11');

  const mainContentRow = document.createElement('div');
  mainContentRow.classList.add('row');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-sm-12', 'col-md-2', 'footer_logo');

  // Find logo image and link rows using content detection
  const logoImageRow = children.find(row => row.querySelector('picture') && !row.querySelector('a'));
  const logoLinkRow = children.find(row => row.querySelector('a') && row.querySelector('a').href.includes('nhs24.scot')); // Specific link to distinguish from other links

  const logoPicture = logoImageRow?.querySelector('picture');
  const logoLink = logoLinkRow?.querySelector('a');

  if (logoPicture && logoLink) {
    const figure = document.createElement('figure');
    figure.classList.add('wp-block-image', 'size-large', 'is-resized');
    const a = document.createElement('a');
    a.href = logoLink.href;
    a.target = '_blank';
    a.rel = ' noreferrer noopener';
    a.append(logoPicture);
    figure.append(a);
    logoCol.append(figure);
  }
  if (logoImageRow) moveInstrumentation(logoImageRow, logoCol);
  if (logoLinkRow) moveInstrumentation(logoLinkRow, logoCol);

  const navCol = document.createElement('div');
  navCol.classList.add('col-sm-12', 'col-md-10');
  const h3 = document.createElement('h3');
  h3.textContent = 'NHS inform';
  navCol.append(h3);

  const navRow = document.createElement('div');
  navRow.classList.add('row');

  mainContentRow.append(logoCol, navCol);
  mainContentCol.append(mainContentRow);

  const bslLogoCol = document.createElement('div');
  bslLogoCol.classList.add('col-sm-12', 'col-md-2', 'col-lg-1', 'text-end', 'footer_logo2');

  // Find BSL logo image and link rows using content detection
  const bslLogoImageRow = children.find(row => row.querySelector('picture') && row.querySelector('img[alt="BSL Logo"]'));
  const bslLogoLinkRow = children.find(row => row.querySelector('a') && row.querySelector('a').href.includes('contactscotland-bsl.org'));

  const bslLogoPicture = bslLogoImageRow?.querySelector('picture');
  const bslLogoLink = bslLogoLinkRow?.querySelector('a');

  if (bslLogoPicture && bslLogoLink) {
    const figure = document.createElement('figure');
    figure.classList.add('wp-block-image', 'size-large');
    const a = document.createElement('a');
    a.href = bslLogoLink.href;
    a.target = '_blank';
    a.rel = ' noreferrer noopener';
    a.append(bslLogoPicture);
    figure.append(a);
    bslLogoCol.append(figure);
  }
  if (bslLogoImageRow) moveInstrumentation(bslLogoImageRow, bslLogoCol);
  if (bslLogoLinkRow) moveInstrumentation(bslLogoLinkRow, bslLogoCol);

  mainRow.append(mainContentCol, bslLogoCol);
  footer.append(mainRow);

  const copyrightSection = document.createElement('div');
  copyrightSection.classList.add('copyright_section', 'mt-4');
  const copyrightContainer = document.createElement('div');
  copyrightContainer.classList.add('container');
  const copyrightRow = document.createElement('div');
  copyrightRow.classList.add('row');

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-6');

  // Find the copyright row
  const copyrightRowElement = children.find(row => row.textContent.includes('Copyright text content'));
  const copyrightText = copyrightRowElement?.querySelector('div p');
  if (copyrightText) {
    copyrightTextCol.append(copyrightText);
  }
  if (copyrightRowElement) moveInstrumentation(copyrightRowElement, copyrightTextCol);

  const socialLinksCol = document.createElement('div');
  socialLinksCol.classList.add('col-6', 'text-end');
  const socialList = document.createElement('ul');
  socialList.classList.add('social-list');
  socialLinksCol.append(socialList);

  copyrightRow.append(copyrightTextCol, socialLinksCol);
  copyrightContainer.append(copyrightRow);
  copyrightSection.append(copyrightContainer);
  footer.append(copyrightSection);

  const footerLinkGroups = [];
  const footerLinks = [];
  const socialLinks = [];

  // Filter out the known single-field rows (logo, bsl logo, copyright) to process item rows
  const itemRows = children.filter(row => {
    const cells = [...row.children];
    const isLogoImageRow = row === logoImageRow;
    const isLogoLinkRow = row === logoLinkRow;
    const isBslLogoImageRow = row === bslLogoImageRow;
    const isBslLogoLinkRow = row === bslLogoLinkRow;
    const isCopyrightRow = row === copyrightRowElement;
    return !isLogoImageRow && !isLogoLinkRow && !isBslLogoImageRow && !isBslLogoLinkRow && !isCopyrightRow;
  });

  // Separate item rows based on structure
  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2) {
      const groupTitle = cells[0].querySelector('div');
      const footerLinkContainer = cells[1].querySelector('div');
      // A footer link group has a text title and a container cell that does NOT contain a direct link
      if (groupTitle && footerLinkContainer && !footerLinkContainer.querySelector('a')) {
        footerLinkGroups.push(row);
      } else if (cells[0].querySelector('a') && cells[1].querySelector('div')) {
        // A footer link has a link in the first cell and a label in the second
        footerLinks.push(row);
      }
    } else if (cells.length === 1 && cells[0].querySelector('a')) {
      // A social link has a single cell with a link
      socialLinks.push(row);
    }
  });

  footerLinkGroups.forEach((groupRow, index) => {
    const groupTitleCell = groupRow.querySelector('div:first-child');
    const groupLinksCell = groupRow.querySelector('div:last-child'); // This cell contains the text content to match against footerLinks

    const groupDiv = document.createElement('div');
    groupDiv.id = `nav_menu-${7 + index}`; // Based on original HTML pattern
    groupDiv.classList.add('col-md-6', 'col-lg-3');

    const menuContainer = document.createElement('div');
    menuContainer.classList.add(`menu-footer-menu-${1 + index}-container`);

    const ul = document.createElement('ul');
    ul.id = `menu-footer-menu-${1 + index}`;
    ul.classList.add('menu', 'nhsuk-list', 'nhsuk-body-s', 'no-margin');

    const h3Element = document.createElement('h3');
    h3Element.textContent = groupTitleCell.textContent;
    groupDiv.prepend(h3Element);

    // Filter footerLinks that belong to this group by matching their label text
    const groupSpecificLinks = footerLinks.filter((linkRow) => {
      const linkLabelCell = linkRow.querySelector('div:last-child');
      return groupLinksCell.textContent.includes(linkLabelCell.textContent);
    });

    groupSpecificLinks.forEach((linkRow, linkIndex) => {
      const linkCell = linkRow.querySelector('div:first-child');
      const labelCell = linkRow.querySelector('div:last-child');

      const li = document.createElement('li');
      // IDs are generated based on the original HTML pattern, ensuring uniqueness
      li.id = `menu-item-${1288 + index * 100 + linkIndex}`;
      li.classList.add('menu-item', 'menu-item-type-post_type', 'menu-item-object-page', `menu-item-${1288 + index * 100 + linkIndex}`);

      const a = document.createElement('a');
      const originalLink = linkCell.querySelector('a');
      if (originalLink) {
        a.href = originalLink.href;
        a.textContent = labelCell.textContent;
      }
      li.append(a);
      ul.append(li);
      moveInstrumentation(linkRow, li);
    });

    menuContainer.append(ul);
    groupDiv.append(menuContainer);
    navRow.append(groupDiv);
    moveInstrumentation(groupRow, groupDiv);
  });
  navCol.append(navRow);

  socialLinks.forEach((socialLinkRow, index) => {
    const socialLinkCell = socialLinkRow.querySelector('div a');
    if (socialLinkCell) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = socialLinkCell.href;
      a.target = '_blank';

      // Determine social icon class based on href
      if (socialLinkCell.href.includes('facebook')) {
        a.classList.add('social-icon', 'facebook');
      } else if (socialLinkCell.href.includes('twitter')) {
        a.classList.add('social-icon', 'twitter');
      } else if (socialLinkCell.href.includes('youtube')) {
        a.classList.add('social-icon', 'youtube');
      }
      const span = document.createElement('span');
      span.classList.add('visuallyhidden');
      a.append(span);
      li.append(a);
      socialList.append(li);
      moveInstrumentation(socialLinkRow, li);
    }
  });

  footer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(footer);
}
