import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Correct destructuring based on BlockJson model
  const [
    logoRow,
    addressRow,
    phoneRow,
    socialIconsRow,
    ...remainingRows // This will contain footerSection item rows and the copyright row
  ] = [...block.children];

  // The last row in remainingRows is the copyright row, the rest are footerSection item rows
  const copyrightRow = remainingRows.pop();
  const footerSectionRows = remainingRows;

  block.textContent = '';
  block.classList.add('site-footer');

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const siteFooterTop = document.createElement('div');
  siteFooterTop.classList.add('site-footer__top', 'clearfix');
  container.append(siteFooterTop);

  const topRow = document.createElement('div');
  topRow.classList.add('row');
  siteFooterTop.append(topRow);

  // Footer First Section (Logo, Address, Phone, Social Icons)
  const regionFooterFirst = document.createElement('section');
  regionFooterFirst.classList.add('region', 'region-footer-first');
  topRow.append(regionFooterFirst);

  const logoContainer = document.createElement('div');
  logoContainer.id = 'logo-footer-container';
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoContainer.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoContainer);
  regionFooterFirst.append(logoContainer);

  const addressP = document.createElement('p');
  addressP.classList.add('small');
  moveInstrumentation(addressRow, addressP);
  addressP.textContent = `Address: ${addressRow.textContent.trim()}`;
  regionFooterFirst.append(addressP);

  const phoneP = document.createElement('p');
  phoneP.classList.add('small');
  moveInstrumentation(phoneRow, phoneP);
  phoneP.textContent = `Phone: ${phoneRow.textContent.trim()}`;
  regionFooterFirst.append(phoneP);

  const socialIconsDiv = document.createElement('div');
  socialIconsDiv.id = 'social-icons';
  moveInstrumentation(socialIconsRow, socialIconsDiv);
  socialIconsDiv.innerHTML = socialIconsRow.innerHTML;
  regionFooterFirst.append(socialIconsDiv);

  // Optimize social icons
  socialIconsDiv.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Footer Sections (dynamic)
  const regions = ['region-footer-second', 'region-footer-third', 'region-footer-fourth'];
  footerSectionRows.forEach((row, index) => {
    // This correctly uses destructuring for fixed-field item models
    const [headingCell, sectionLinksCell] = [...row.children];

    const sectionRow = document.createElement('section');
    sectionRow.classList.add('row', 'region', regions[index % regions.length]);
    topRow.append(sectionRow);

    const nav = document.createElement('nav');
    nav.classList.add('block', 'block-menu', 'navigation');
    nav.setAttribute('role', 'navigation');
    const menuId = `block-menu-${index}`; // Using index for unique ID
    nav.setAttribute('aria-labelledby', menuId);
    sectionRow.append(nav);

    const h2 = document.createElement('h2');
    h2.id = menuId;
    h2.textContent = headingCell.textContent.trim();
    moveInstrumentation(headingCell, h2);
    nav.append(h2);

    const ul = document.createElement('ul');
    ul.classList.add('clearfix', 'nav');
    if (index === 0) { // Only the first menu has flex-row
      ul.classList.add('flex-row');
    }
    nav.append(ul);

    const sectionLinksContent = document.createElement('div');
    sectionLinksContent.innerHTML = sectionLinksCell.innerHTML;
    moveInstrumentation(sectionLinksCell, sectionLinksContent);

    // Transform authored <ul><li><a> into nav-items
    const authoredUl = sectionLinksContent.querySelector('ul');
    if (authoredUl) {
      [...authoredUl.children].forEach((li) => {
        const navItem = document.createElement('li');
        navItem.classList.add('nav-item');
        const link = li.querySelector('a');
        if (link) {
          const navLink = document.createElement('a');
          navLink.href = link.href;
          navLink.textContent = link.textContent.trim();
          navLink.classList.add('nav-link');
          // Add specific nav-link-- classes based on href if possible, or a generic one
          const path = new URL(link.href).pathname.replace(/^\//, '').replace(/\//g, '-');
          if (path) {
            navLink.classList.add(`nav-link--${path}`);
          }
          navItem.append(navLink);
        } else {
          // If it's just text in an li, append as is or wrap in a span
          navItem.append(...li.childNodes);
        }
        ul.append(navItem);
      });
    } else {
      // Handle cases where sectionLinks might just be paragraphs or other content
      const p = document.createElement('p');
      p.innerHTML = sectionLinksContent.innerHTML;
      ul.append(p);
    }
    moveInstrumentation(row, sectionRow);
  });

  // Footer Bottom (Copyright)
  const siteFooterBottom = document.createElement('div');
  siteFooterBottom.classList.add('site-footer__bottom');
  container.append(siteFooterBottom);

  const textCenter = document.createElement('div');
  textCenter.classList.add('text-center');
  siteFooterBottom.append(textCenter);

  moveInstrumentation(copyrightRow, textCenter);
  textCenter.innerHTML = copyrightRow.innerHTML;
}
