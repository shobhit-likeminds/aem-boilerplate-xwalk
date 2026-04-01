import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    copyrightRow,
    privacyPolicyLinkRow,
    ...footerColumnRows
  ] = [...block.children];

  // Create footer-top section
  const footerTop = document.createElement('div');
  footerTop.classList.add('footer-top');

  const container = document.createElement('div');
  container.classList.add('container');

  const column = document.createElement('div');
  column.classList.add('column');

  // Logo
  const logoColumElement = document.createElement('div');
  logoColumElement.classList.add('colum-element');
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo');
  logoLink.setAttribute('rel', 'home');

  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoLinkRow.remove();

  const picture = logoImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '94' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoImageRow, logoLink);
  logoImageRow.remove();

  logoColumElement.append(logoLink);
  column.append(logoColumElement);

  // Footer Columns
  footerColumnRows.forEach((row) => {
    const columElement = document.createElement('div');
    columElement.classList.add('colum-element');
    moveInstrumentation(row, columElement);

    const cells = [...row.children];
    const titleCell = cells.find((cell) => cell.querySelector('h1, h2, h3, h4, h5, h6, p') || cell.textContent.trim());
    const linksCell = cells.find((cell) => cell.querySelector('ul') || cell.querySelector('a') || cell.querySelector('img')); // More robust detection for links/social

    if (titleCell) {
      const titleEl = document.createElement('ul');
      const li = document.createElement('li');
      li.classList.add('title');
      moveInstrumentation(titleCell, li);
      while (titleCell.firstChild) li.append(titleCell.firstChild);
      titleEl.append(li);
      columElement.append(titleEl);
    }

    if (linksCell) {
      // This cell contains the 'links' (a container of footer-link items) or other content like "Follow Us"
      // The structure can be a direct <ul> or a <div> containing <ul>s or other elements.
      const ulElements = linksCell.querySelectorAll('ul');
      if (ulElements.length > 0) {
        ulElements.forEach((originalUl) => {
          const newUl = document.createElement('ul');
          moveInstrumentation(originalUl, newUl);
          while (originalUl.firstChild) {
            const child = originalUl.firstChild;
            if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'LI') {
              const linkLi = document.createElement('li');
              moveInstrumentation(child, linkLi);
              while (child.firstChild) linkLi.append(child.firstChild);
              newUl.append(linkLi);
            } else {
              newUl.append(child);
            }
          }
          columElement.append(newUl);
        });
      } else {
        // Handle other content if present, e.g., "Follow Us" and social links
        // This part needs careful inspection of the actual content of the 'Links' cell
        // if it's not just a list of <a> tags.
        // For now, assume if it's not a list, it's direct content like "Follow Us" or images.
        moveInstrumentation(linksCell, columElement);
        while (linksCell.firstChild) columElement.append(linksCell.firstChild);
      }
    }

    column.append(columElement);
  });

  container.append(column);
  footerTop.append(container);

  // Create footer-bottom section
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('txt-copyright');
  moveInstrumentation(copyrightRow, copyrightDiv);
  while (copyrightRow.firstChild) copyrightDiv.append(copyrightRow.firstChild);
  const yearSpan = document.createElement('span');
  yearSpan.id = 'cyear';
  yearSpan.textContent = new Date().getFullYear();
  copyrightDiv.append(yearSpan); // Append current year dynamically
  footerBottom.append(copyrightDiv);

  const privacyDiv = document.createElement('div');
  privacyDiv.classList.add('txt-terms');
  const foundPrivacyLink = privacyPolicyLinkRow.querySelector('a');
  if (foundPrivacyLink) {
    const privacyLink = document.createElement('a');
    privacyLink.href = foundPrivacyLink.href;
    privacyLink.textContent = foundPrivacyLink.textContent;
    moveInstrumentation(privacyPolicyLinkRow, privacyLink);
    privacyDiv.append(privacyLink);
  } else {
    moveInstrumentation(privacyPolicyLinkRow, privacyDiv);
    while (privacyPolicyLinkRow.firstChild) privacyDiv.append(privacyPolicyLinkRow.firstChild);
  }
  footerBottom.append(privacyDiv);

  block.textContent = '';
  block.classList.add('footer', 'hidden-xs'); // Add classes from original block
  block.append(footerTop, footerBottom);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
