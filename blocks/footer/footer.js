import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure rows based on the BlockJson model
  // block.children[0]: logoRow
  // block.children[1]: copyrightRow
  // block.children[2]: privacyPolicyLinkRow
  // block.children[3...N]: columnRows (footer-column items)
  const [logoRow, copyrightRow, privacyPolicyLinkRow, ...columnRows] = [...block.children];

  // Add initial class from original HTML
  block.classList.add('hidden-xs');

  const footerTop = document.createElement('div');
  footerTop.classList.add('footer-top');

  const container = document.createElement('div');
  container.classList.add('container');

  const column = document.createElement('div');
  column.classList.add('column');

  // Logo
  const logoElement = document.createElement('div');
  // Corrected class name from 'colum-element' to 'column-element' based on ORIGINAL HTML
  logoElement.classList.add('column-element');
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo');
  logoLink.href = '/';
  logoLink.rel = 'home';
  moveInstrumentation(logoRow, logoLink);
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    // The original HTML shows a width of 94px for the logo.
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '94' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoElement.append(logoLink);
  column.append(logoElement);

  // Columns (footer-column items)
  columnRows.forEach((row) => {
    const columnElement = document.createElement('div');
    // Corrected class name from 'colum-element' to 'column-element' based on ORIGINAL HTML
    columnElement.classList.add('column-element');
    moveInstrumentation(row, columnElement);

    // Each footer-column item row has a single cell containing rich text content.
    // The original HTML shows <ul><li> structures inside these column-elements.
    // We need to append the content of the first (and only) cell.
    const cells = [...row.children];
    if (cells.length > 0) {
      const contentCell = cells[0]; // There's only one cell per footer-column item
      while (contentCell.firstChild) {
        columnElement.append(contentCell.firstChild);
      }
    }
    column.append(columnElement);
  });

  container.append(column);
  footerTop.append(container);
  block.append(footerTop);

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  // Copyright
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('txt-copyright');
  moveInstrumentation(copyrightRow, copyrightDiv);
  // The copyrightRow contains a single cell with the copyright text.
  const copyrightCell = copyrightRow.children[0];
  if (copyrightCell) {
    while (copyrightCell.firstChild) {
      copyrightDiv.append(copyrightCell.firstChild);
    }
  }
  footerBottom.append(copyrightDiv);

  // Privacy Policy Link
  const privacyDiv = document.createElement('div');
  privacyDiv.classList.add('txt-terms');
  moveInstrumentation(privacyPolicyLinkRow, privacyDiv);
  // The privacyPolicyLinkRow contains a single cell with the link.
  const privacyPolicyLinkCell = privacyPolicyLinkRow.children[0];
  const privacyLink = privacyPolicyLinkCell ? privacyPolicyLinkCell.querySelector('a') : null;
  if (privacyLink) {
    const newLink = document.createElement('a');
    newLink.href = privacyLink.href;
    newLink.textContent = privacyLink.textContent;
    // Check if the original link had a target="_blank"
    if (privacyLink.target) {
      newLink.target = privacyLink.target;
    }
    privacyDiv.append(newLink);
  }
  footerBottom.append(privacyDiv);

  block.append(footerBottom);
}
