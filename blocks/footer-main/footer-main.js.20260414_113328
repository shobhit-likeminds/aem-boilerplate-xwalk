import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  const footerHeaderRow = document.createElement('div');
  footerHeaderRow.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLinkWrapper = document.createElement('a');

  // Use content detection for logo fields
  const logoImageRow = children.find(row => row.querySelector('picture') && !row.querySelector('a'));
  const logoLinkRow = children.find(row => row.querySelector('a') && row.querySelector('a').href.includes('logoLink'));
  const logoLinkLabelRow = children.find(row => row.querySelector('a') && row.querySelector('a').href.includes('logolinklabel'));

  const logoImage = logoImageRow ? logoImageRow.querySelector('picture') : null;
  const logoLink = logoLinkRow ? logoLinkRow.querySelector('a') : null;
  const logoLinkLabel = logoLinkLabelRow ? logoLinkLabelRow.textContent.trim() : '';

  if (logoLink) {
    logoLinkWrapper.href = logoLink.href;
    moveInstrumentation(logoLinkRow, logoLinkWrapper);
  } else {
    // Fallback if logoLink is not found, use the logoLinkLabelRow for instrumentation if it exists
    moveInstrumentation(logoLinkLabelRow || logoImageRow, logoLinkWrapper);
  }
  logoLinkWrapper.textContent = logoLinkLabel;

  if (logoImage) {
    const img = logoImage.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1');
    moveInstrumentation(logoImage, optimizedPic.querySelector('img'));
    logoLinkWrapper.prepend(optimizedPic);
  }

  logoDiv.append(logoLinkWrapper);
  logoCol.append(logoDiv);
  footerHeaderRow.append(logoCol);

  const socialLinksCol = document.createElement('div');
  socialLinksCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-wrap');

  // Filter for social links: 3 cells, first cell contains a picture
  const socialLinkRows = children.filter((row) => row.children.length === 3 && row.children[0].querySelector('picture'));
  socialLinkRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const iconCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[0];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[2];
    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[2];
    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[2];

    const iconPicture = iconCell ? iconCell.querySelector('picture') : null;
    const socialLink = linkCell ? linkCell.querySelector('a') : null;
    const socialLinkLabel = labelCell ? labelCell.textContent.trim() : '';

    if (socialLink) {
      const anchor = document.createElement('a');
      anchor.href = socialLink.href;
      anchor.textContent = socialLinkLabel;
      moveInstrumentation(linkCell, anchor);

      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
        moveInstrumentation(iconPicture, optimizedPic.querySelector('img'));
        anchor.prepend(optimizedPic);
      }
      li.append(anchor);
    }
    socialUl.append(li);
  });
  socialLinksCol.append(socialUl);
  footerHeaderRow.append(socialLinksCol);
  container.append(footerHeaderRow);

  const footerMenuBoxRow = document.createElement('div');
  footerMenuBoxRow.classList.add('row', 'footer-menu-box');
  const footerMenuCol = document.createElement('div');
  footerMenuCol.classList.add('col');
  const footerMenuDiv = document.createElement('div');
  footerMenuDiv.classList.add('footer-menu');

  // Filter for footer link blocks: 3 cells, no picture in the first cell
  const footerLinkBlockRows = children.filter((row) => row.children.length === 3 && !row.children[0].querySelector('picture'));
  footerLinkBlockRows.forEach((row) => {
    const linkBlockDiv = document.createElement('div');
    linkBlockDiv.classList.add('link-blocks');
    moveInstrumentation(row, linkBlockDiv);

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const headingLinkCell = cells.find(cell => cell.querySelector('a'));
    const headingLabelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[1];
    const linksContainerCell = cells.find(cell => cell.querySelector('a'));
    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const headingLabelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[1];
    const linksContainerCell = cells.find(cell => cell.querySelector('a'));
    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const linksContainerCell = cells.find(cell => cell.querySelector('a'));

    const headingLink = headingLinkCell ? headingLinkCell.querySelector('a') : null;
    const headingLabel = headingLabelCell ? headingLabelCell.textContent.trim() : '';

    const span = document.createElement('span');
    if (headingLink) {
      const anchor = document.createElement('a');
      anchor.href = headingLink.href;
      anchor.textContent = headingLabel;
      moveInstrumentation(headingLinkCell, anchor);
      span.append(anchor);
    } else {
      span.textContent = headingLabel;
    }
    const small = document.createElement('small');
    small.setAttribute('data-once', 'footerMobileInner'); // Add data-once attribute for interactivity
    headDiv.append(span, small);

    const ul = document.createElement('ul');
    ul.classList.add('footer-inner-list');

    const footerLinkRows = [...linksContainerCell.children].filter((linkRow) => linkRow.children.length === 2);
    footerLinkRows.forEach((linkRow) => {
      const li = document.createElement('li');
      moveInstrumentation(linkRow, li);

      const linkCell = linkRow.children[0];
      const labelCell = linkRow.children[1];

      const link = linkCell ? linkCell.querySelector('a') : null;
      const label = labelCell ? labelCell.textContent.trim() : '';

      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = label;
        moveInstrumentation(linkCell, anchor);
        li.append(anchor);
      }
      ul.append(li);
    });

    headDiv.append(ul);
    linkBlockDiv.append(headDiv);
    footerMenuDiv.append(linkBlockDiv);
  });

  footerMenuCol.append(footerMenuDiv);
  footerMenuBoxRow.append(footerMenuCol);
  container.append(footerMenuBoxRow);

  const copyrightWrapRow = document.createElement('div');
  copyrightWrapRow.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');

  // Filter for secondary links: 2 cells, no picture, no direct link in the row itself (only within cells)
  const secondaryLinkRows = children.filter((row) => row.children.length === 2 && !row.querySelector('picture') && !row.querySelector('a'));
  secondaryLinkRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[1];
    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[1];

    const secondaryLink = linkCell ? linkCell.querySelector('a') : null;
    const secondaryLinkLabel = labelCell ? labelCell.textContent.trim() : '';

    if (secondaryLink) {
      const anchor = document.createElement('a');
      anchor.href = secondaryLink.href;
      anchor.textContent = secondaryLinkLabel;
      moveInstrumentation(linkCell, anchor);
      li.append(anchor);
    }
    secondaryNavUl.append(li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrapRow.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  // Find the copyright text row based on its content and single cell structure
  const copyrightTextRow = children.find((row) => row.children.length === 1 && row.textContent.includes('Copyright'));
  const copyrightTextCell = copyrightTextRow ? copyrightTextRow.querySelector('div') : null;

  if (copyrightTextCell) {
    moveInstrumentation(copyrightTextRow, copyrightTextCol); // Instrument the entire row
    while (copyrightTextCell.firstChild) {
      copyrightTextCol.append(copyrightTextCell.firstChild);
    }
  }
  copyrightWrapRow.append(copyrightTextCol);
  container.append(copyrightWrapRow);

  block.textContent = '';
  block.append(container);

  // Add event listeners for interactive elements based on original HTML
  block.querySelectorAll('.head small[data-once="footerMobileInner"]').forEach((small) => {
    small.addEventListener('click', () => {
      const parentSpan = small.closest('span');
      if (parentSpan) {
        const linkBlock = parentSpan.closest('.link-blocks');
        if (linkBlock) {
          linkBlock.classList.toggle('active'); // Toggle 'active' class for dropdown behavior
        }
      }
    });
  });

  block.querySelectorAll('.footer-inner-list span[data-once="footerClickEvent"]').forEach((span) => {
    span.addEventListener('click', () => {
      const hasSubChild = span.nextElementSibling;
      if (hasSubChild && hasSubChild.classList.contains('has-footer-sub-child')) {
        hasSubChild.classList.toggle('active'); // Toggle 'active' class for sub-menu dropdown
      }
    });
  });

  block.querySelectorAll('.has-footer-sub-child span[data-once="footerClickEvent innerFooterClickEvent"]').forEach((span) => {
    span.addEventListener('click', () => {
      const hasInnerSubChild = span.nextElementSibling;
      if (hasInnerSubChild && hasInnerSubChild.classList.contains('has-footer-inner-sub-child')) {
        hasInnerSubChild.classList.toggle('active'); // Toggle 'active' class for inner sub-menu dropdown
      }
    });
  });

  // Optimize pictures that might be added later or missed
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
