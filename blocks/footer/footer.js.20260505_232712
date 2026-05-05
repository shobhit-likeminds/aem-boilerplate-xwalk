import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, cellElement) {
  rootUl.querySelectorAll('li').forEach((li) => {
    moveInstrumentation(cellElement, li); // Instrument the li element

    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Apply classes from original HTML to anchor if it exists
    if (anchor) {
      anchor.classList.add('nav-menu-item-link'); // Assuming this class is needed for styling
      moveInstrumentation(cellElement, anchor); // Instrument the anchor element
    }

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
      moveInstrumentation(cellElement, nested); // Instrument the nested ul
      nested.remove();
      const subWrap = document.createElement('div');
      // No specific class for nested sub-child wrapper in original HTML,
      // so we'll use a generic one if needed by CSS, or leave it classless.
      // For now, leaving classless as per the provided original HTML.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // Assuming 'active' class for open state
          subWrap.classList.toggle('active'); // Assuming 'active' class for open state
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    siteTitleRow,
    newsletterHeadingRow,
    newsletterDescriptionRow,
    newsletterFormActionRow,
    newsletterEmailPlaceholderRow,
    newsletterButtonLabelRow,
    ...restRows
  ] = children;

  const copyrightRow = restRows.pop(); // Copyright is the last fixed field

  const footerSectionsRows = restRows;

  const footer = document.createElement('footer');
  const container = document.createElement('div');
  container.classList.add('container');
  const row = document.createElement('div');
  row.classList.add('row', 'gy-5');

  // Left column for logo and newsletter
  const leftCol = document.createElement('div');
  leftCol.classList.add('col-lg-6', 'col-12');

  // Footer Logo and Site Title
  const logoLink = document.createElement('a');
  logoLink.classList.add('footer-logo', 'd-flex', 'align-items-center');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('img-fluid');
    logoLink.append(optimizedPic);
  }

  const siteTitle = document.createElement('h2');
  siteTitle.textContent = siteTitleRow.textContent.trim();
  moveInstrumentation(siteTitleRow, siteTitle);
  logoLink.append(siteTitle);

  leftCol.append(logoLink);

  // Newsletter Section
  const newsletterHeading = document.createElement('h3');
  newsletterHeading.textContent = newsletterHeadingRow.textContent.trim();
  moveInstrumentation(newsletterHeadingRow, newsletterHeading);
  leftCol.append(newsletterHeading);

  const newsletterDescription = document.createElement('p');
  newsletterDescription.textContent = newsletterDescriptionRow.textContent.trim();
  moveInstrumentation(newsletterDescriptionRow, newsletterDescription);
  leftCol.append(newsletterDescription);

  const newsletterForm = document.createElement('form');
  newsletterForm.classList.add('d-flex', 'flex-wrap');
  newsletterForm.method = 'post';
  const foundFormAction = newsletterFormActionRow.querySelector('a');
  if (foundFormAction) {
    newsletterForm.action = foundFormAction.href;
  }
  moveInstrumentation(newsletterFormActionRow, newsletterForm);

  // Hidden input for CSRF token (assuming it's a static placeholder, not authored)
  // If this needs to be dynamic, it must come from a block field.
  const csrfInput = document.createElement('input');
  csrfInput.type = 'hidden';
  csrfInput.name = 'csrfmiddlewaretoken';
  csrfInput.value = 'mekPEs8k3EtANZt67bim0c8XfieNfyG0HOQIFmiJNIj22WbgZ7E9HRgz6Tbgp7bv'; // Hardcoding as per original HTML, if this is dynamic, it needs to be an authored field
  newsletterForm.append(csrfInput);

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = newsletterEmailPlaceholderRow.textContent.trim();
  moveInstrumentation(newsletterEmailPlaceholderRow, emailInput);
  newsletterForm.append(emailInput);

  const subscribeButton = document.createElement('button');
  subscribeButton.classList.add('btn', 'btn-primary', 'subscribe-btn');
  subscribeButton.textContent = newsletterButtonLabelRow.textContent.trim();
  moveInstrumentation(newsletterButtonLabelRow, subscribeButton);
  newsletterForm.append(subscribeButton);

  leftCol.append(newsletterForm);
  row.append(leftCol);

  // Right columns for footer sections
  footerSectionsRows.forEach((sectionRow) => {
    const [titleCell, sectionLinksCell, hierarchyTreeCell] = [...sectionRow.children];

    const sectionCol = document.createElement('div');
    sectionCol.classList.add('col-lg-3', 'col-6');
    moveInstrumentation(sectionRow, sectionCol);

    const sectionTitle = document.createElement('h5');
    sectionTitle.textContent = titleCell.textContent.trim();
    moveInstrumentation(titleCell, sectionTitle); // Instrument the title
    sectionCol.append(sectionTitle);

    const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
    const sectionLinksContent = sectionLinksCell?.innerHTML;

    if (hierarchyRoot) {
      const usefulLinksList = document.createElement('ul');
      usefulLinksList.classList.add('d-flex', 'flex-column', 'useful-links-list');
      // Move instrumentation from hierarchyTreeCell to the new ul
      moveInstrumentation(hierarchyTreeCell, usefulLinksList);
      // Append children from hierarchyRoot directly to usefulLinksList
      while (hierarchyRoot.firstChild) {
        usefulLinksList.append(hierarchyRoot.firstChild);
      }
      transformNestedLists(usefulLinksList, hierarchyTreeCell); // Transform the nested list structure
      sectionCol.append(usefulLinksList);
    } else if (sectionLinksContent) {
      // Fallback if hierarchy-tree is empty, but sectionLinks has content (e.g., flat links)
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sectionLinksContent;
      moveInstrumentation(sectionLinksCell, tempDiv); // Instrument the tempDiv

      const flatLinks = tempDiv.querySelectorAll('a');
      if (flatLinks.length > 0) {
        const usefulLinksList = document.createElement('ul');
        usefulLinksList.classList.add('d-flex', 'flex-column', 'useful-links-list');
        moveInstrumentation(sectionLinksCell, usefulLinksList); // Instrument the ul
        flatLinks.forEach((link) => {
          const li = document.createElement('li');
          moveInstrumentation(sectionLinksCell, li); // Instrument the li
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.textContent = link.textContent.trim();
          moveInstrumentation(sectionLinksCell, anchor); // Instrument the anchor
          li.append(anchor);
          usefulLinksList.append(li);
        });
        sectionCol.append(usefulLinksList);
      } else {
        // If sectionLinks is just text, append it as a paragraph
        const p = document.createElement('p');
        p.innerHTML = sectionLinksContent; // Use innerHTML to preserve any formatting
        moveInstrumentation(sectionLinksCell, p); // Instrument the paragraph
        sectionCol.append(p);
      }
    }
    row.append(sectionCol);
  });

  container.append(row);
  footer.append(container);

  // Copyright
  const copyright = document.createElement('h5');
  copyright.classList.add('text-center', 'mt-6');
  copyright.textContent = copyrightRow.textContent.trim();
  moveInstrumentation(copyrightRow, copyright);
  footer.append(copyright);

  block.replaceChildren(footer);
}
