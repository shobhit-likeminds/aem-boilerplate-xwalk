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

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');

  const containerPrimary = document.createElement('div');
  containerPrimary.classList.add('container', 'fmm-container');

  const primaryContent = document.createElement('div');
  primaryContent.classList.add(
    'footer-brand__primary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');

  // Logo
  if (logoRow && logoLinkRow && logoLinkLabelRow) {
    const logoLink = document.createElement('a');
    logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
    const foundLink = logoLinkRow.querySelector('a');
    if (foundLink) {
      logoLink.href = foundLink.href;
    }
    logoLink.setAttribute('aria-label', logoLinkLabelRow.textContent.trim());
    moveInstrumentation(logoLinkRow, logoLink);

    const logoPicture = logoRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('object-fit-contain', 'w-100', 'h-100');
      optimizedImg.removeAttribute('loading'); // Original HTML does not have loading="lazy" for primary logo
      moveInstrumentation(logoRow, optimizedPic);
      logoLink.append(optimizedPic);
    }
    footerBrandLeft.append(logoLink);
  }

  // Secondary Logo
  if (secondaryLogoRow) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
    if (secondaryLogoPicture) {
      const img = secondaryLogoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('object-fit-contain', 'w-100', 'h-100');
      optimizedImg.setAttribute('loading', 'lazy');
      moveInstrumentation(secondaryLogoRow, optimizedPic);
      secondaryLogoDiv.append(optimizedPic);
    }
    footerBrandLeft.append(secondaryLogoDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  // Section Links
  sectionLinkRows.forEach((row, index) => {
    // The footer-section model has only one field: "sectionLinks" of type richtext.
    // We can safely assume the first (and only) child of the row is the sectionLinks cell.
    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const sectionLinksCell = cells.find(cell => cell.querySelector('a'));
    if (sectionLinksCell) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('footerList');

      const ul = document.createElement('ul');
      ul.classList.add(
        'footer-list',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'align-items-md-start',
        'flex-column',
      );

      // Move instrumentation from the row to the new ul
      moveInstrumentation(row, ul);

      // Append content from the richtext cell directly to the ul
      // The richtext content can be <p> or <ul>, so we need to handle it.
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sectionLinksCell.innerHTML;
      const authoredUl = tempDiv.querySelector('ul');

      if (authoredUl) {
        // If the richtext contains a <ul>, append its list items
        [...authoredUl.children].forEach((li) => {
          li.classList.add('footer-list__item');
          const link = li.querySelector('a');
          if (link) {
            link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
            link.setAttribute('data-link-region', 'Footer');
          }
          ul.append(li);
        });
      } else {
        // If it's just plain text or <p> tags, create a single list item
        const li = document.createElement('li');
        li.classList.add('footer-list__item');
        li.innerHTML = sectionLinksCell.innerHTML; // Keep any existing formatting
        ul.append(li);
      }

      footerListDiv.append(ul);
      if (index < 2) { // Based on original HTML, first two go to left, next two to right
        footerBrandNavbarLeft.append(footerListDiv);
      } else {
        footerBrandNavbarRight.append(footerListDiv);
      }
    }
  });

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRight.append(footerBrandNavbar);
  primaryContent.append(footerBrandLeft, footerBrandRight);
  containerPrimary.append(primaryContent);
  footerBrandPrimary.append(containerPrimary);
  footerBrand.append(footerBrandPrimary);
  sectionContainer.append(footerBrand);

  block.append(sectionContainer);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
