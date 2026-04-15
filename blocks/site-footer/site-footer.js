import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, addressRow, phoneRow, socialIconsRow, ...itemRows] = [...block.children];
  const footerBottomRow = itemRows.pop(); // The last row is always footerBottom

  block.classList.add('site-footer');

  const container = document.createElement('div');
  container.classList.add('container');

  const siteFooterTop = document.createElement('div');
  siteFooterTop.classList.add('site-footer__top', 'clearfix');

  const row1 = document.createElement('div');
  row1.classList.add('row');

  const regionFooterFirst = document.createElement('section');
  regionFooterFirst.classList.add('region', 'region-footer-first');

  // Logo
  const logoFooterContainer = document.createElement('div');
  logoFooterContainer.id = 'logo-footer-container';
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoFooterContainer.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoFooterContainer);
  regionFooterFirst.append(logoFooterContainer);

  // Address
  const addressP = document.createElement('p');
  addressP.classList.add('small');
  addressP.textContent = `Address: ${addressRow.textContent.trim()}`;
  moveInstrumentation(addressRow, addressP);
  regionFooterFirst.append(addressP);

  // Phone
  const phoneP = document.createElement('p');
  phoneP.classList.add('small');
  phoneP.textContent = `Phone: ${phoneRow.textContent.trim()}`;
  moveInstrumentation(phoneRow, phoneP);
  regionFooterFirst.append(phoneP);

  // Social Icons
  const socialIconsDiv = document.createElement('div');
  socialIconsDiv.id = 'social-icons';
  if (socialIconsRow) {
    moveInstrumentation(socialIconsRow, socialIconsDiv);
    while (socialIconsRow.firstChild) socialIconsDiv.append(socialIconsRow.firstChild);
  }
  regionFooterFirst.append(socialIconsDiv);
  row1.append(regionFooterFirst);
  siteFooterTop.append(row1);

  // Footer Sections
  itemRows.forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...row.children];
    const headingCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('a'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p'));

    const section = document.createElement('section');
    // Ensure class names are from allowlist. 'row' is already present in original HTML for these sections.
    section.classList.add('row', `region`, `region-footer-${index === 0 ? 'second' : index === 1 ? 'third' : 'fourth'}`);

    const nav = document.createElement('nav');
    nav.classList.add('block', 'block-menu', 'navigation');

    const h2 = document.createElement('h2');
    if (headingCell) {
      h2.textContent = headingCell.textContent.trim();
    }
    nav.append(h2);

    const ul = document.createElement('ul');
    ul.classList.add('clearfix', 'nav');
    if (index === 0) { // First footer section (Menu) has flex-row
      ul.classList.add('flex-row');
      nav.classList.add('menu--footer');
    } else if (index === 1) { // Second footer section (Departments)
      nav.classList.add('menu--departments');
    } else if (index === 2) { // Third footer section (Links)
      nav.classList.add('menu--links');
    }

    if (sectionLinksCell) {
      const sectionLinksContent = sectionLinksCell.querySelector('ul') || sectionLinksCell;
      [...sectionLinksContent.children].forEach((li) => {
        const navItem = document.createElement('li');
        navItem.classList.add('nav-item');
        moveInstrumentation(li, navItem);
        while (li.firstChild) navItem.append(li.firstChild);

        const anchor = navItem.querySelector('a');
        if (anchor) {
          anchor.classList.add('nav-link');
        }
        ul.append(navItem);
      });
    }
    moveInstrumentation(row, nav);
    nav.append(ul);
    section.append(nav);
    siteFooterTop.append(section);
  });

  container.append(siteFooterTop);

  // Footer Bottom
  const siteFooterBottom = document.createElement('div');
  siteFooterBottom.classList.add('site-footer__bottom');
  const textCenter = document.createElement('div');
  textCenter.classList.add('text-center');
  if (footerBottomRow) {
    moveInstrumentation(footerBottomRow, textCenter);
    while (footerBottomRow.firstChild) textCenter.append(footerBottomRow.firstChild);
  }
  siteFooterBottom.append(textCenter);
  container.append(siteFooterBottom);

  block.textContent = '';
  block.append(container);

  // Image optimization for social icons
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
