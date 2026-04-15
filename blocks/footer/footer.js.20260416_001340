import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    secondaryLogoRow,
    ...sectionRows
  ] = [...block.children];

  block.innerHTML = ''; // Clear the block content

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrand.append(footerBrandPrimary);

  const containerPrimary = document.createElement('div');
  containerPrimary.classList.add('container', 'fmm-container');
  footerBrandPrimary.append(containerPrimary);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add(
    'footer-brand__primary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  containerPrimary.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  logoLink.setAttribute('data-link-region', 'Footer');
  logoLink.setAttribute('aria-label', 'logo');
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
  } else {
    logoLink.href = '#';
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
    optimizedLogo.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(logoRow, optimizedLogo.querySelector('img'));
    logoLink.append(optimizedLogo);
  }
  footerBrandLeft.append(logoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    const optimizedSecondaryLogo = createOptimizedPicture(
      secondaryLogoImg.src,
      secondaryLogoImg.alt,
      false,
      [{ width: '750' }],
    );
    optimizedSecondaryLogo.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(secondaryLogoRow, optimizedSecondaryLogo.querySelector('img'));
    secondaryLogoDiv.append(optimizedSecondaryLogo);
  }
  footerBrandLeft.append(secondaryLogoDiv);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarRight);

  // Footer Sections (Section Links)
  sectionRows.forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[0] with content detection
    const cells = [...row.children];
    const sectionLinksCell = cells.find(cell => cell.innerHTML.includes('<p>') || cell.innerHTML.includes('<ul>'));

    if (!sectionLinksCell) {
      // Handle cases where the cell might be empty or not match expected content
      return;
    }

    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    moveInstrumentation(row, footerListDiv);

    const ul = document.createElement('ul');
    ul.classList.add(
      'footer-list',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'align-items-md-start',
      'flex-column',
    );
    footerListDiv.append(ul);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sectionLinksCell.innerHTML;
    moveInstrumentation(sectionLinksCell, tempDiv);

    const listItems = tempDiv.querySelectorAll('li');
    listItems.forEach((li) => {
      const newLi = document.createElement('li');
      newLi.classList.add('footer-list__item');
      moveInstrumentation(li, newLi);

      const link = li.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent.trim();
        newLink.classList.add(
          'cta-analytics',
          'analytics_cta_click',
          'footer-list__item--link',
          'd-inline-block',
        );
        newLink.setAttribute('data-link-region', 'Footer');
        moveInstrumentation(link, newLink);
        newLi.append(newLink);
      } else {
        // If there's no link, just append the text content
        newLi.innerHTML = li.innerHTML;
      }
      ul.append(newLi);
    });

    if (index % 2 === 0) {
      footerNavbarLeft.append(footerListDiv);
    } else {
      footerNavbarRight.append(footerListDiv);
    }
  });

  block.append(footerBrand);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
