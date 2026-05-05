import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    brandNameRow,
    newsletterTitleRow,
    newsletterDescriptionRow,
    newsletterFormActionRow,
    newsletterEmailPlaceholderRow,
    newsletterButtonLabelRow,
    copyrightRow,
    ...linkSectionRows
  ] = children;

  const footer = document.createElement('footer');
  const container = document.createElement('div');
  container.classList.add('container');
  const row = document.createElement('div');
  row.classList.add('row', 'gy-5');

  // Left column (logo, brand name, newsletter)
  const leftCol = document.createElement('div');
  leftCol.classList.add('col-lg-6', 'col-12');

  const footerLogoLink = document.createElement('a');
  footerLogoLink.classList.add('footer-logo', 'd-flex', 'align-items-center');
  moveInstrumentation(logoLinkRow, footerLogoLink);
  footerLogoLink.href = logoLinkRow.querySelector('a')?.href || '#';

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    footerLogoLink.append(optimizedPic);
  }

  const brandName = document.createElement('h2');
  moveInstrumentation(brandNameRow, brandName);
  brandName.textContent = brandNameRow.textContent.trim();
  footerLogoLink.append(brandName);
  leftCol.append(footerLogoLink);

  const newsletterTitle = document.createElement('h3');
  moveInstrumentation(newsletterTitleRow, newsletterTitle);
  newsletterTitle.textContent = newsletterTitleRow.textContent.trim();
  leftCol.append(newsletterTitle);

  const newsletterDescription = document.createElement('p');
  moveInstrumentation(newsletterDescriptionRow, newsletterDescription);
  newsletterDescription.textContent = newsletterDescriptionRow.textContent.trim();
  leftCol.append(newsletterDescription);

  const newsletterForm = document.createElement('form');
  newsletterForm.classList.add('d-flex', 'flex-wrap');
  moveInstrumentation(newsletterFormActionRow, newsletterForm);
  newsletterForm.action = newsletterFormActionRow.querySelector('a')?.href || '#';
  newsletterForm.method = 'post'; // Assuming method is post from original HTML

  // Add hidden csrf token if needed, but not present in EDS input, so skip for now.
  // const csrfInput = document.createElement('input');
  // csrfInput.type = 'hidden';
  // csrfInput.name = 'csrfmiddlewaretoken';
  // csrfInput.value = 'QbTo54BlSbfKXYuUXDmLXXQ7NaQLNF7txezEwRfmLuLSPXFVZNmTOTPxSmP73wqm'; // Hardcoded, needs to be dynamic if used
  // newsletterForm.append(csrfInput);

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'email';
  moveInstrumentation(newsletterEmailPlaceholderRow, emailInput);
  emailInput.placeholder = newsletterEmailPlaceholderRow.textContent.trim();
  newsletterForm.append(emailInput);

  const subscribeButton = document.createElement('button');
  subscribeButton.classList.add('btn', 'btn-primary', 'subscribe-btn');
  moveInstrumentation(newsletterButtonLabelRow, subscribeButton);
  subscribeButton.textContent = newsletterButtonLabelRow.textContent.trim();
  newsletterForm.append(subscribeButton);
  leftCol.append(newsletterForm);

  row.append(leftCol);

  // Link sections
  linkSectionRows.forEach((sectionRow, index) => {
    const [sectionTitleCell, sectionLinksCell, hierarchyTreeCell] = [...sectionRow.children];

    const col = document.createElement('div');
    col.classList.add('col-lg-3', 'col-6');
    moveInstrumentation(sectionRow, col); // Move instrumentation from the sectionRow to the column

    const sectionTitle = document.createElement('h5');
    sectionTitle.textContent = sectionTitleCell.textContent.trim();
    col.append(sectionTitle);

    const ul = document.createElement('ul');
    ul.classList.add('d-flex', 'flex-column', 'useful-links-list');

    const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
    if (hierarchyRoot) {
      // If hierarchy-tree has content, use it
      transformNestedLists(hierarchyRoot);
      ul.append(hierarchyRoot);
    } else {
      // Fallback to sectionLinks if hierarchy-tree is empty
      const sectionLinksContent = sectionLinksCell?.innerHTML;
      if (sectionLinksContent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sectionLinksContent;
        const links = tempDiv.querySelectorAll('a');
        links.forEach((link) => {
          const li = document.createElement('li');
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.textContent = link.textContent.trim();
          li.append(anchor);
          ul.append(li);
        });
      }
    }
    col.append(ul);
    row.append(col);
  });

  container.append(row);
  footer.append(container);

  // Copyright
  const copyrightText = document.createElement('h5');
  copyrightText.classList.add('text-center', 'mt-6');
  moveInstrumentation(copyrightRow, copyrightText);
  copyrightText.textContent = copyrightRow.textContent.trim();
  footer.append(copyrightText);

  block.replaceChildren(footer);

  function transformNestedLists(rootUl) {
    rootUl.querySelectorAll('li').forEach((li) => {
      const nested = li.querySelector(':scope > ul');
      // Handle label-only nodes
      const anchor = li.querySelector(':scope > a');
      if (!anchor) {
        const textNode = [...li.childNodes].find(
          (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
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
        subWrap.classList.add('has-sub-child'); // Use a generic class as original HTML has no specific class for this
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
    });
  }
}
