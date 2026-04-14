import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...sectionRows] = [...block.children];

  // Create main container
  const container = document.createElement('div');
  container.classList.add('container');

  // --- Footer Header Section ---
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  const originalLogoLink = logoLinkRow.querySelector('a');
  if (originalLogoLink) {
    logoLink.href = originalLogoLink.href;
  } else {
    // Fallback if logoLink is empty, use logoLinkLabel if available
    const originalLogoLinkLabel = logoLinkLabelRow.querySelector('div');
    if (originalLogoLinkLabel) {
      const link = originalLogoLinkLabel.textContent.trim();
      if (link.startsWith('http')) {
        logoLink.href = link;
      }
    }
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    optimizedImg.classList.add('hiddenlogo1');
    optimizedImg.width = 200;
    optimizedImg.height = 30;
    optimizedImg.style.width = 'auto';
    optimizedImg.loading = 'lazy';
    moveInstrumentation(img, optimizedImg);
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
  moveInstrumentation(logoLinkLabelRow, logoLink);

  logoDiv.append(logoLink);
  logoCol.append(logoDiv);

  // Social icons from original HTML
  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');

  const socialLinksData = [
    { class: 'fb', href: 'https://www.facebook.com/mahindrarise', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776164450908.svg+xml' },
    { class: 'tw', href: 'https://twitter.com/mahindrarise', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776164450962.svg+xml' },
    { class: 'inst', href: 'https://instagram.com/mahindrarise', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776164451330.svg+xml' },
    { class: 'yt', href: 'https://youtube.com/c/MahindraRise', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776164451400.svg+xml' },
    { class: 'in', href: 'https://www.linkedin.com/company/mahindragroup/', imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776164451444.svg+xml' },
  ];

  socialLinksData.forEach((data) => {
    const li = document.createElement('li');
    li.classList.add(data.class);
    const a = document.createElement('a');
    a.href = data.href;
    a.target = '_blank';
    const img = document.createElement('img');
    img.alt = 'svg file';
    img.src = data.imgSrc;
    a.append(img);
    li.append(a);
    socialWrap.append(li);
  });
  socialCol.append(socialWrap);

  footerHeader.append(logoCol, socialCol);
  container.append(footerHeader);

  // --- Footer Menu Section ---
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  sectionRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection to find cells based on BlockJson model
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a') && !cell.querySelector('ul'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul'));
    const linkLabelCell = cells.find(cell => cell.textContent.trim().startsWith('http') || (cell.textContent.trim() && !cell.querySelector('a') && !cell.querySelector('ul') && cell !== labelCell));

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    const head = document.createElement('div');
    head.classList.add('head');

    const span = document.createElement('span');
    const mainLink = document.createElement('a');
    const originalLink = linkCell?.querySelector('a');
    if (originalLink) {
      mainLink.href = originalLink.href;
    }
    mainLink.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
    span.append(mainLink);

    const small = document.createElement('small');
    head.append(span, small);

    const sectionLinksUl = sectionLinksCell?.querySelector('ul');
    if (sectionLinksUl) {
      sectionLinksUl.classList.add('footer-inner-list');
      head.append(sectionLinksUl);

      // Transform nested lists
      sectionLinksUl.querySelectorAll('li').forEach((li) => {
        const nestedUl = li.querySelector(':scope > ul');
        if (nestedUl) {
          nestedUl.remove(); // Remove the original nested ul
          const subWrap = document.createElement('div');
          subWrap.classList.add('has-footer-sub-child');
          subWrap.append(nestedUl);
          li.append(subWrap);

          const trigger = li.querySelector(':scope > a') || li;
          const arrowSpan = document.createElement('span');
          const arrowImg = document.createElement('img');
          arrowImg.alt = 'svg file';
          arrowImg.src = '/etc.clientlibs/mahindra/clientlibs/clientlib-site/resources/images/down-arrow.svg';
          arrowSpan.append(arrowImg);
          trigger.append(arrowSpan);

          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            li.classList.toggle('active');
            subWrap.classList.toggle('active');
          });

          // Handle inner nested lists
          nestedUl.querySelectorAll('li').forEach((innerLi) => {
            const innerNestedUl = innerLi.querySelector(':scope > ul');
            if (innerNestedUl) {
              innerNestedUl.remove();
              const innerSubWrap = document.createElement('div');
              innerSubWrap.classList.add('has-footer-inner-sub-child');
              innerSubWrap.append(innerNestedUl);
              innerLi.append(innerSubWrap);

              const innerTrigger = innerLi.querySelector(':scope > a') || innerLi;
              const innerArrowSpan = document.createElement('span');
              const innerArrowImg = document.createElement('img');
              innerArrowImg.alt = 'svg file';
              innerArrowImg.src = '/etc.clientlibs/mahindra/clientlibs/clientlib-site/resources/images/down-arrow.svg';
              innerArrowSpan.append(innerArrowImg);
              innerTrigger.append(innerArrowSpan);

              innerTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                innerLi.classList.toggle('active');
                innerSubWrap.classList.toggle('active');
              });
            }
          });
        }
      });
    }

    linkBlocks.append(head);
    footerMenu.append(linkBlocks);
    moveInstrumentation(row, linkBlocks);
  });

  footerMenuCol.append(footerMenu);
  footerMenuBox.append(footerMenuCol);
  container.append(footerMenuBox);

  // --- Copyright Section ---
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNav = document.createElement('ul');
  secondaryNav.classList.add('secondary-nav');

  // Assuming these links are not part of the current EDS model and are static in original HTML
  const secondaryLinks = [
    { text: 'Terms of use', href: 'https://www.mahindra.com/terms-of-use' },
    { text: 'Disclaimer', href: 'https://www.mahindra.com/disclaimer' },
    { text: 'Privacy Policy', href: 'https://www.mahindra.com/privacy-policy' },
    { text: 'Sitemap', href: 'https://www.mahindra.com/sitemap' },
    { text: 'Contact Us', href: 'https://www.mahindra.com/contact-us' },
  ];

  secondaryLinks.forEach((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.text;
    li.append(a);
    secondaryNav.append(li);
  });
  secondaryNavCol.append(secondaryNav);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = 'Copyright© 2026 Mahindra&Mahindra Ltd. All Rights Reserved.';

  copyrightWrap.append(secondaryNavCol, copyrightTextCol);
  container.append(copyrightWrap);

  block.textContent = '';
  block.append(container);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
