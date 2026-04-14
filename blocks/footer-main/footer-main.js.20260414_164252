import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...footerSectionRows] = [...block.children];

  block.textContent = '';

  const container = document.createElement('div');
  container.classList.add('container');

  // Footer Header Section
  const footerHeaderRow = document.createElement('div');
  footerHeaderRow.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  logoLink.textContent = logoLinkLabelRow.textContent.trim();

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      newImg.title = img.title;
      newImg.classList.add('hiddenlogo1');
      newImg.loading = 'lazy';
      logoLink.append(newImg);
      moveInstrumentation(logoRow, newImg);
    }
  }

  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeaderRow.append(logoCol);

  // Social Wrap Section (hardcoded in original HTML, not in EDS model)
  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-wrap');

  const socialLinks = [
    { class: 'fb', href: 'https://www.facebook.com/mahindrarise', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776145929009.svg+xml', alt: 'svg file' },
    { class: 'tw', href: 'https://twitter.com/mahindrarise', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776145929111.svg+xml', alt: 'svg file' },
    { class: 'inst', href: 'https://instagram.com/mahindrarise', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776145929200.svg+xml', alt: 'svg file' },
    { class: 'yt', href: 'https://youtube.com/c/MahindraRise', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776145929453.svg+xml', alt: 'svg file' },
    { class: 'in', href: 'https://www.linkedin.com/company/mahindragroup/', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776145929638.svg+xml', alt: 'svg file' },
  ];

  socialLinks.forEach((social) => {
    const li = document.createElement('li');
    li.classList.add(social.class);
    const a = document.createElement('a');
    a.href = social.href;
    a.target = '_blank';
    const img = document.createElement('img');
    img.alt = social.alt;
    img.src = social.imgSrc; // Hardcoded paths from original HTML, not from block data
    a.append(img);
    li.append(a);
    socialUl.append(li);
  });

  socialCol.append(socialUl);
  footerHeaderRow.append(socialCol);
  container.append(footerHeaderRow);

  // Footer Menu Section
  const footerMenuBoxRow = document.createElement('div');
  footerMenuBoxRow.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerSectionRows.forEach((row) => {
    const cells = [...row.children];
    const headingCell = cells.find(cell => cell.textContent.trim() !== '' && !cell.querySelector('ul'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul'));

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const headingLink = document.createElement('a');
    if (headingCell) {
      headingLink.textContent = headingCell.textContent.trim();
      const existingLink = headingCell.querySelector('a');
      if (existingLink) {
        headingLink.href = existingLink.href;
      }
    }
    span.append(headingLink);

    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner');
    span.append(small);
    headDiv.append(span);

    const sectionLinksUl = sectionLinksCell?.querySelector('ul');
    if (sectionLinksUl) {
      sectionLinksUl.classList.add('footer-inner-list');
      headDiv.append(sectionLinksUl);
    }
    linkBlocks.append(headDiv);
    footerMenu.append(linkBlocks);
    moveInstrumentation(row, linkBlocks);

    // Add event listener for accordion behavior
    headDiv.addEventListener('click', () => {
      headDiv.classList.toggle('active');
      const innerList = headDiv.querySelector('.footer-inner-list');
      if (innerList) {
        innerList.style.display = innerList.style.display === 'block' ? 'none' : 'block';
      }
    });

    // Handle nested accordions if they exist in the rich text
    headDiv.querySelectorAll('li > span[data-once="footerClickEvent"]').forEach((spanToggle) => {
      const parentLi = spanToggle.closest('li');
      const subChild = parentLi.querySelector('.has-footer-sub-child');
      if (subChild) {
        spanToggle.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent parent accordion from toggling
          parentLi.classList.toggle('active');
          subChild.style.display = subChild.style.display === 'block' ? 'none' : 'block';
        });
      }
    });

    headDiv.querySelectorAll('li > a + span[data-once="footerClickEvent.innerFooterClickEvent"]').forEach((spanToggle) => {
      const parentLi = spanToggle.closest('li');
      const innerSubChild = parentLi.querySelector('.has-footer-inner-sub-child');
      if (innerSubChild) {
        spanToggle.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent parent accordion from toggling
          parentLi.classList.toggle('active');
          innerSubChild.style.display = innerSubChild.style.display === 'block' ? 'none' : 'block';
        });
      }
    });
  });

  footerMenuCol.append(footerMenu);
  footerMenuBoxRow.append(footerMenuCol);
  container.append(footerMenuBoxRow);

  // Copyright Section
  const copyrightWrapRow = document.createElement('div');
  copyrightWrapRow.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  const secondaryNavLinks = [
    { href: 'https://www.mahindra.com/terms-of-use', text: 'Terms of use' },
    { href: 'https://www.mahindra.com/disclaimer', text: 'Disclaimer' },
    { href: 'https://www.mahindra.com/privacy-policy', text: 'Privacy Policy' },
    { href: 'https://www.mahindra.com/sitemap', text: 'Sitemap' },
    { href: 'https://www.mahindra.com/contact-us', text: 'Contact Us' },
  ];

  secondaryNavLinks.forEach((linkData) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = linkData.href;
    a.textContent = linkData.text;
    li.append(a);
    secondaryNavUl.append(li);
  });

  secondaryNavCol.append(secondaryNavUl);
  copyrightWrapRow.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = 'Copyright© 2026 Mahindra&Mahindra Ltd. All Rights Reserved.';
  copyrightWrapRow.append(copyrightTextCol);
  container.append(copyrightWrapRow);

  block.append(container);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
