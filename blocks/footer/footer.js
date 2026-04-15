import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    secondaryLogoRow,
    ...sectionLinkRows
  ] = [...block.children];

  block.textContent = '';

  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('container-hd', 'fmm-container', 'p-0');
  block.append(sectionContainer);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  sectionContainer.append(footerBrand);

  // Primary Footer Section
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrand.append(footerBrandPrimary);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container', 'fmm-container');
  footerBrandPrimary.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add(
    'footer-brand__primary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  primaryContainer.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
    logoLink.setAttribute('aria-label', logoLinkLabelRow.textContent.trim());
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  footerBrandLeft.append(logoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(secondaryLogoRow, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
  footerBrandLeft.append(secondaryLogoDiv);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  const footerNav = document.createElement('nav');
  footerNav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNav.append(footerNavLeft);

  const footerNavRight = document.createElement('div');
  footerNavRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNav.append(footerNavRight);

  // Section Links
  sectionLinkRows.forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[0] with content detection
    const sectionLinksCell = [...row.children].find(cell => cell.innerHTML.trim());
    if (!sectionLinksCell) return;

    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    moveInstrumentation(row, footerListDiv);

    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    ul.innerHTML = sectionLinksCell.innerHTML;
    footerListDiv.append(ul);

    ul.querySelectorAll('li').forEach((li) => {
      li.classList.add('footer-list__item');
      const link = li.querySelector('a');
      if (link) {
        link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        link.setAttribute('data-link-region', 'Footer');
      }
    });

    if (index < 2) { // Assuming first two go to left nav, rest to right
      footerNavLeft.append(footerListDiv);
    } else {
      footerNavRight.append(footerListDiv);
    }
  });

  // Secondary Footer Section (placeholder for now as model does not include these fields)
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  footerBrand.append(footerBrandSecondary);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container', 'fmm-container');
  footerBrandSecondary.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add(
    'footer-brand__secondary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  secondaryContainer.append(secondaryContent);

  const secondaryFooterLeft = document.createElement('section');
  secondaryFooterLeft.classList.add('footer-brand__left');
  secondaryContent.append(secondaryFooterLeft);

  const secondaryFooterLeftList = document.createElement('ul');
  secondaryFooterLeftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap',
  );
  secondaryFooterLeft.append(secondaryFooterLeftList);

  // Placeholder for ITC Portal link (not in current model)
  const itcPortalItem = document.createElement('li');
  itcPortalItem.classList.add('footer-brand__left--item');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.classList.add('footer-brand__left--link', 'cta-analytics');
  itcPortalLink.setAttribute('data-link-region', 'Footer');
  itcPortalLink.textContent = 'ITC Portal';
  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  itcPortalLink.append(screenReaderSpan);
  itcPortalItem.append(itcPortalLink);
  secondaryFooterLeftList.append(itcPortalItem);

  // Placeholder for copyright text (not in current model)
  const copyrightItem = document.createElement('li');
  copyrightItem.classList.add('footer-brand__left--item');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  copyrightSpan.textContent = '© 2025 Aashirvaad Svasti. All Rights Reserved.';
  copyrightItem.append(copyrightSpan);
  secondaryFooterLeftList.append(copyrightItem);

  const secondaryFooterRight = document.createElement('section');
  secondaryFooterRight.classList.add('footer-brand__right');
  secondaryContent.append(secondaryFooterRight);

  const secondaryFooterRightList = document.createElement('ul');
  secondaryFooterRightList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  secondaryFooterRight.append(secondaryFooterRightList);

  // Placeholder for social media links (not in current model)
  // The original HTML uses actual image paths for social icons, not just hrefs.
  // We should ideally get these from the block model if it were extended,
  // but for now, we'll use placeholders and ensure they are optimized.
  const socialLinks = [
    {
      href: 'https://www.instagram.com/aashirvaad_svastimilk',
      alt: 'Instagram',
      imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776277125988.svg+xml', // Example from original HTML
    },
    {
      href: 'https://www.facebook.com/SvastiMilkAashirvaad',
      alt: 'Facebook',
      imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776277126499.svg+xml', // Example from original HTML
    },
    {
      href: 'https://www.youtube.com/@aashirvaadsvastimilk5475',
      alt: 'Youtube',
      imgSrc: '/content/dam/aemigrate/uploaded-folder/image/1776277126096.svg+xml', // Example from original HTML
    },
  ];

  socialLinks.forEach((social) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    const link = document.createElement('a');
    link.href = social.href;
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    link.setAttribute('data-link-region', 'Footer');
    link.target = '_blank';

    // Create optimized picture for social icons
    const optimizedPic = createOptimizedPicture(social.imgSrc, social.alt, false, [{ width: '64' }]); // Assuming small icons
    const img = optimizedPic.querySelector('img');
    img.classList.add('object-fit-contain', 'w-100', 'h-100');
    img.setAttribute('aria-label', social.alt);
    moveInstrumentation(li, img); // Instrument the image within the list item

    const srOnly = document.createElement('span');
    srOnly.classList.add('cmp-link__screen-reader-only');
    srOnly.textContent = 'opens in a new tab';
    link.append(optimizedPic, srOnly); // Append optimized picture, not just img
    li.append(link);
    secondaryFooterRightList.append(li);
  });

  // Optimize all pictures within the block (this part is redundant if createOptimizedPicture is used directly)
  // Keeping it for any remaining images that might not have been caught by specific logic.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
