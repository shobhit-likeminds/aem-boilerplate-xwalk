import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure the initial rows based on the BlockJson model
  // The first row is 'logo', second is 'logo-link', third is 'copyright'.
  // All subsequent rows are item rows for 'footer-links', 'footer-social', 'footer-brands'.
  const allRows = [...block.children];

  // Identify the specific root rows by content
  const logoRow = allRows.find(row => row.querySelector('picture'));
  const logoLinkRow = allRows.find(row => row.querySelector('a') && !row.querySelector('picture'));
  const copyrightRow = allRows.find(row => row.textContent.includes('Copyright'));

  // Filter out the identified root rows to get only the item rows
  const itemRows = allRows.filter(row => row !== logoRow && row !== logoLinkRow && row !== copyrightRow);

  block.textContent = '';
  block.id = 'colophon';
  block.classList.add('site-footer');

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const row = document.createElement('div');
  row.classList.add('row');
  container.append(row);

  const colLeft = document.createElement('div');
  colLeft.classList.add('col', 'col-left');
  row.append(colLeft);

  const siteBranding = document.createElement('div');
  siteBranding.classList.add('site-branding');
  colLeft.append(siteBranding);

  const logoLink = document.createElement('a');
  if (logoLinkRow) { // Ensure logoLinkRow was found
    const foundLogoLink = logoLinkRow.querySelector('a');
    if (foundLogoLink) {
      logoLink.href = foundLogoLink.href;
    }
    moveInstrumentation(logoLinkRow, logoLink);
  }

  if (logoRow) { // Ensure logoRow was found
    const logoPicture = logoRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  siteBranding.append(logoLink);

  const colRight = document.createElement('div');
  colRight.classList.add('col', 'col-right');
  row.append(colRight);

  // Footer Links
  const footerLinks = itemRows.filter((item) => {
    const cells = [...item.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a')) && !cells.some(cell => cell.querySelector('picture'));
  });
  if (footerLinks.length > 0) {
    const menuNavFooterContainer = document.createElement('div');
    menuNavFooterContainer.classList.add('menu-nav-footer-container');
    colRight.append(menuNavFooterContainer);

    const footerMenu = document.createElement('ul');
    footerMenu.id = 'footer-menu';
    footerMenu.classList.add('menu');
    menuNavFooterContainer.append(footerMenu);

    footerLinks.forEach((linkRow, index) => {
      const li = document.createElement('li');
      moveInstrumentation(linkRow, li);
      // Use classes from ORIGINAL HTML
      li.classList.add('menu-item', 'menu-item-type-post_type_archive', 'menu-item-object-recipe', `menu-item-${828 + index}`);
      const cells = [...linkRow.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      // const labelCell = cells.find(cell => !cell.querySelector('a')); // Label cell is not used in the final HTML structure for footer links

      if (linkCell) {
        const foundLink = linkCell.querySelector('a');
        const a = document.createElement('a');
        if (foundLink) {
          a.href = foundLink.href;
          a.textContent = foundLink.textContent;
        }
        li.append(a);
      }
      footerMenu.append(li);
    });
  }

  // Social Icons
  const socialIcons = itemRows.filter((item) => {
    const cells = [...item.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('picture')) && cells.some(cell => cell.querySelector('a'));
  });
  if (socialIcons.length > 0) {
    const socialIconsUl = document.createElement('ul');
    socialIconsUl.classList.add('social-icons');
    colRight.append(socialIconsUl);

    socialIcons.forEach((socialRow) => {
      const li = document.createElement('li');
      moveInstrumentation(socialRow, li);

      const cells = [...socialRow.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const iconCell = cells.find(cell => cell.querySelector('picture'));
      const altTextCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));

      if (linkCell && iconCell) {
        const foundLink = linkCell.querySelector('a');
        const a = document.createElement('a');
        if (foundLink) {
          a.href = foundLink.href;
          a.target = '_blank';
        }

        const picture = iconCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, altTextCell ? altTextCell.textContent.trim() : img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('svg'); // Add svg class as per original HTML
          a.append(optimizedPic);
        }
        li.append(a);
      }
      socialIconsUl.append(li);
    });
  }

  // Footer Brands
  const footerBrands = itemRows.filter((item) => {
    const cells = [...item.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a')) && !cells.some(cell => cell.querySelector('picture'));
  });
  if (footerBrands.length > 0) {
    const menuNavFooterBrandsContainer = document.createElement('div');
    menuNavFooterBrandsContainer.classList.add('menu-nav-footer-brands-container');
    colRight.append(menuNavFooterBrandsContainer);

    const footerBrandsMenu = document.createElement('ul');
    footerBrandsMenu.id = 'footer-brands-menu';
    footerBrandsMenu.classList.add('menu');
    menuNavFooterBrandsContainer.append(footerBrandsMenu);

    footerBrands.forEach((brandRow, index) => {
      const li = document.createElement('li');
      moveInstrumentation(brandRow, li);
      // Use classes from ORIGINAL HTML
      li.classList.add('menu-item', 'menu-item-type-taxonomy', 'menu-item-object-product-brand', `menu-item-${174 + index}`);
      const cells = [...brandRow.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      // const labelCell = cells.find(cell => !cell.querySelector('a')); // Label cell is not used in the final HTML structure for footer brands

      if (linkCell) {
        const foundLink = linkCell.querySelector('a');
        const a = document.createElement('a');
        if (foundLink) {
          a.href = foundLink.href;
          a.textContent = foundLink.textContent;
        }
        li.append(a);
      }
      footerBrandsMenu.append(li);
    });
  }

  // Copyright
  if (copyrightRow) { // Ensure copyrightRow was found
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('copyright');
    moveInstrumentation(copyrightRow, copyrightDiv);
    while (copyrightRow.firstChild) copyrightDiv.append(copyrightRow.firstChild);
    colRight.append(copyrightDiv);
  }

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
