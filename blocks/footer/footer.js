import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    headingRow,
    secondaryLogoRow,
    secondaryLogoLinkRow,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  // Use content detection to distinguish menu groups from social links
  const menuGroups = itemRows.filter((row) => {
    const firstCell = row.firstElementChild;
    return firstCell && firstCell.children.length > 0 && !firstCell.querySelector('a');
  });
  const socialLinks = itemRows.filter((row) => {
    const firstCell = row.firstElementChild;
    return firstCell && firstCell.children.length === 1 && firstCell.querySelector('a');
  });

  block.textContent = '';
  block.classList.add('footer');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
block.append(containerDiv);

  const rowBorderDiv = document.createElement('div');
  rowBorderDiv.classList.add('row', 'border-dotted-bottom');
  containerDiv.append(rowBorderDiv);

  const colMainContent = document.createElement('div');
  colMainContent.classList.add('col-sm-12', 'col-md-10', 'col-lg-11');
  rowBorderDiv.append(colMainContent);

  const innerRow = document.createElement('div');
  innerRow.classList.add('row');
  colMainContent.append(innerRow);

  // Logo Section
  const logoCol = document.createElement('div');
  logoCol.classList.add('col-sm-12', 'col-md-2', 'footer_logo');
  innerRow.append(logoCol);

  const logoFigure = document.createElement('figure');
  logoFigure.classList.add('wp-block-image', 'size-large', 'is-resized');
  logoCol.append(logoFigure);

  const logoLink = document.createElement('a');
  moveInstrumentation(logoLinkRow.firstElementChild, logoLink);
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  logoLink.target = '_blank';
  logoLink.rel = ' noreferrer noopener';
  logoFigure.append(logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '139' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('wp-image-10173');
  }

  // Heading and Menu Groups
  const headingAndMenusCol = document.createElement('div');
  headingAndMenusCol.classList.add('col-sm-12', 'col-md-10');
  innerRow.append(headingAndMenusCol);

  const heading = document.createElement('h3');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.textContent.trim();
  headingAndMenusCol.append(heading);

  const menuGroupsRow = document.createElement('div');
  menuGroupsRow.classList.add('row');
  headingAndMenusCol.append(menuGroupsRow);

  menuGroups.forEach((menuGroupRow, index) => {
    const menuGroupCol = document.createElement('div');
    menuGroupCol.classList.add('col-md-6', 'col-lg-3');
    menuGroupCol.id = `nav_menu-${7 + index}`;
    menuGroupsRow.append(menuGroupCol);

    const menuContainer = document.createElement('div');
    menuContainer.classList.add(`menu-footer-menu-${index + 1}-container`);
    menuGroupCol.append(menuContainer);

    const ul = document.createElement('ul');
    ul.classList.add('menu', 'nhsuk-list', 'nhsuk-body-s', 'no-margin');
    ul.id = `menu-footer-menu-${index + 1}`;
    menuContainer.append(ul);

    const menuLinksCell = menuGroupRow.firstElementChild; // Corrected: use firstElementChild
    [...menuLinksCell.children].forEach((linkRow, linkIndex) => {
      const li = document.createElement('li');
      moveInstrumentation(linkRow, li);
      li.classList.add('menu-item', 'menu-item-type-post_type', 'menu-item-object-page');
      li.id = `menu-item-${1288 + index * 100 + linkIndex}`; // Placeholder ID, adjust if needed

      const link = document.createElement('a');
      const foundLink = linkRow.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.textContent = foundLink.textContent;
      } else {
        link.textContent = linkRow.textContent.trim();
      }
      li.append(link);
      ul.append(li);
    });
  });

  // Secondary Logo
  const secondaryLogoCol = document.createElement('div');
  secondaryLogoCol.classList.add('col-sm-12', 'col-md-2', 'col-lg-1', 'text-end', 'footer_logo2');
  rowBorderDiv.append(secondaryLogoCol);

  const secondaryLogoFigure = document.createElement('figure');
  secondaryLogoFigure.classList.add('wp-block-image', 'size-large');
  secondaryLogoCol.append(secondaryLogoFigure);

  const secondaryLogoLink = document.createElement('a');
  moveInstrumentation(secondaryLogoLinkRow.firstElementChild, secondaryLogoLink);
  secondaryLogoLink.href = secondaryLogoLinkRow.querySelector('a')?.href || '#';
  secondaryLogoLink.target = '_blank';
  secondaryLogoLink.rel = ' noreferrer noopener';
  secondaryLogoFigure.append(secondaryLogoLink);

  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    secondaryLogoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('wp-image-10175');
  }

  // Copyright Section
  const copyrightSection = document.createElement('div');
  copyrightSection.classList.add('copyright_section', 'mt-4');
  containerDiv.append(copyrightSection);

  const copyrightContainer = document.createElement('div');
  copyrightContainer.classList.add('container');
  copyrightSection.append(copyrightContainer);

  const copyrightRowDiv = document.createElement('div');
  copyrightRowDiv.classList.add('row');
  copyrightContainer.append(copyrightRowDiv);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-6');
  copyrightRowDiv.append(copyrightTextCol);

  const copyrightP = document.createElement('p');
  moveInstrumentation(copyrightRow.firstElementChild, copyrightP);
  copyrightP.textContent = copyrightRow.textContent.trim();
  copyrightTextCol.append(copyrightP);

  // Social Links
  const socialLinksCol = document.createElement('div');
  socialLinksCol.classList.add('col-6', 'text-end');
  copyrightRowDiv.append(socialLinksCol);

  const socialList = document.createElement('ul');
  socialList.classList.add('social-list');
  socialLinksCol.append(socialList);

  socialLinks.forEach((socialLinkRow) => {
    const li = document.createElement('li');
    moveInstrumentation(socialLinkRow, li);
    socialList.append(li);

    const socialLink = document.createElement('a');
    const foundLink = socialLinkRow.querySelector('a');
    if (foundLink) {
      socialLink.href = foundLink.href;
      socialLink.target = '_blank';
      socialLink.classList.add('social-icon');

      // Determine social icon class based on href
      if (socialLink.href.includes('facebook')) {
        socialLink.classList.add('facebook');
      } else if (socialLink.href.includes('twitter')) {
        socialLink.classList.add('twitter');
      } else if (socialLink.href.includes('youtube')) {
        socialLink.classList.add('youtube');
      }

      const visuallyHiddenSpan = document.createElement('span');
      visuallyHiddenSpan.classList.add('visuallyhidden');
      socialLink.append(visuallyHiddenSpan);
    }
    li.append(socialLink);
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
