import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, originalCell) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('useful-links-list'); // Using a class from the original HTML
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
    }
    // Apply instrumentation to each list item if it originated from the hierarchy-tree cell
    if (originalCell) {
      moveInstrumentation(originalCell, li);
    }
  });
}

export default async function decorate(block) {
  const allRows = [...block.children];

  const footer = document.createElement('footer');
  const container = document.createElement('div');
  container.classList.add('container');
  const row = document.createElement('div');
  row.classList.add('row', 'gy-5');

  // Fixed fields - using array destructuring for fixed schema
  const [
    logoRow,
    logoLinkRow,
    siteTitleRow,
    newsletterTitleRow,
    newsletterDescriptionRow,
    newsletterFormActionRow,
    newsletterInputPlaceholderRow,
    newsletterButtonLabelRow,
    copyrightRow,
    ...menuColumnRows
  ] = allRows;

  const logoCell = logoRow.children[0];
  const logoLinkCell = logoLinkRow.children[0];
  const siteTitleCell = siteTitleRow.children[0];
  const newsletterTitleCell = newsletterTitleRow.children[0];
  const newsletterDescriptionCell = newsletterDescriptionRow.children[0];
  const newsletterFormActionCell = newsletterFormActionRow.children[0];
  const newsletterInputPlaceholderCell = newsletterInputPlaceholderRow.children[0];
  const newsletterButtonLabelCell = newsletterButtonLabelRow.children[0];
  const copyrightCell = copyrightRow.children[0];

  // Logo and Newsletter Section
  const colLg6 = document.createElement('div');
  colLg6.classList.add('col-lg-6', 'col-12');

  const footerLogo = document.createElement('a');
  footerLogo.classList.add('footer-logo', 'd-flex', 'align-items-center');
  if (logoLinkCell.querySelector('a')) {
    footerLogo.href = logoLinkCell.querySelector('a').href;
  }
  moveInstrumentation(logoLinkRow, footerLogo);

  if (logoCell.querySelector('picture')) {
    const img = logoCell.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
    optimizedPic.querySelector('img').classList.add('img-fluid');
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    footerLogo.append(optimizedPic);
  }

  const siteTitle = document.createElement('h2');
  siteTitle.textContent = siteTitleCell?.textContent.trim() || '';
  moveInstrumentation(siteTitleRow, siteTitle);
  footerLogo.append(siteTitle);
  colLg6.append(footerLogo);

  const newsletterTitle = document.createElement('h3');
  newsletterTitle.textContent = newsletterTitleCell?.textContent.trim() || '';
  moveInstrumentation(newsletterTitleRow, newsletterTitle);
  colLg6.append(newsletterTitle);

  const newsletterDescription = document.createElement('p');
  newsletterDescription.innerHTML = newsletterDescriptionCell?.innerHTML || '';
  moveInstrumentation(newsletterDescriptionRow, newsletterDescription);
  colLg6.append(newsletterDescription);

  const form = document.createElement('form');
  form.classList.add('d-flex', 'flex-wrap');
  if (newsletterFormActionCell.querySelector('a')) {
    form.action = newsletterFormActionCell.querySelector('a').href;
  }
  form.method = 'post';
  moveInstrumentation(newsletterFormActionRow, form);

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = newsletterInputPlaceholderCell?.textContent.trim() || '';
  moveInstrumentation(newsletterInputPlaceholderRow, emailInput);
  form.append(emailInput);

  const subscribeButton = document.createElement('button');
  subscribeButton.classList.add('btn', 'btn-primary', 'subscribe-btn');
  subscribeButton.textContent = newsletterButtonLabelCell?.textContent.trim() || '';
  moveInstrumentation(newsletterButtonLabelRow, subscribeButton);
  form.append(subscribeButton);
  colLg6.append(form);
  row.append(colLg6);

  // Menu Columns
  menuColumnRows.forEach((menuRow) => {
    const [columnTitleCell, sectionLinksCell, hierarchyTreeCell] = [...menuRow.children];

    const colLg3 = document.createElement('div');
    colLg3.classList.add('col-lg-3', 'col-6');
    moveInstrumentation(menuRow, colLg3);

    const columnTitle = document.createElement('h5');
    columnTitle.textContent = columnTitleCell?.textContent.trim() || '';
    colLg3.append(columnTitle);

    const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');

    const ul = document.createElement('ul');
    ul.classList.add('d-flex', 'flex-column', 'useful-links-list');

    if (hierarchyRoot) {
      // Move instrumentation from the original hierarchyTreeCell to the new ul
      moveInstrumentation(hierarchyTreeCell, ul);
      transformNestedLists(hierarchyRoot, hierarchyTreeCell); // Pass original cell for instrumentation
      while (hierarchyRoot.firstChild) {
        ul.append(hierarchyRoot.firstChild);
      }
    } else {
      // If no hierarchy, use sectionLinks as flat list
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sectionLinksCell.innerHTML;
      const links = tempDiv.querySelectorAll('a');
      links.forEach((link) => {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        li.append(anchor);
        ul.append(li);
        moveInstrumentation(sectionLinksCell, li); // Apply instrumentation to each list item
      });
    }
    colLg3.append(ul);
    row.append(colLg3);
  });

  container.append(row);
  footer.append(container);

  // Copyright
  const copyright = document.createElement('h5');
  copyright.classList.add('text-center', 'mt-6');
  copyright.innerHTML = copyrightCell?.innerHTML || '';
  moveInstrumentation(copyrightRow, copyright);
  footer.append(copyright);

  block.replaceChildren(footer);
}
