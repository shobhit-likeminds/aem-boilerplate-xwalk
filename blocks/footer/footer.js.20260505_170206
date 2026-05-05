import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    brandTitleRow,
    newsletterTitleRow,
    newsletterDescriptionRow,
    formActionRow,
    emailPlaceholderRow,
    subscribeButtonLabelRow,
    copyrightRow,
    ...itemRows
  ] = children;

  const footer = document.createElement('footer');
  const container = document.createElement('div');
  container.classList.add('container');
  const row = document.createElement('div');
  row.classList.add('row', 'gy-5');

  // Col 1: Logo, Newsletter
  const col1 = document.createElement('div');
  col1.classList.add('col-lg-6', 'col-12');

  const logoLink = document.createElement('a');
  logoLink.classList.add('footer-logo', 'd-flex', 'align-items-center');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
    // moveInstrumentation(img, optimizedPic.querySelector('img')); // img is not directly replaced, its parent picture is.
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoLink); // Move instrumentation for the entire logo row

  const brandTitle = document.createElement('h2');
  brandTitle.textContent = brandTitleRow.textContent.trim();
  moveInstrumentation(brandTitleRow, brandTitle);
  logoLink.append(brandTitle);
  col1.append(logoLink);

  const newsletterTitle = document.createElement('h3');
  newsletterTitle.textContent = newsletterTitleRow.textContent.trim();
  moveInstrumentation(newsletterTitleRow, newsletterTitle);
  col1.append(newsletterTitle);

  const newsletterDescription = document.createElement('p');
  newsletterDescription.textContent = newsletterDescriptionRow.textContent.trim();
  moveInstrumentation(newsletterDescriptionRow, newsletterDescription);
  col1.append(newsletterDescription);

  const form = document.createElement('form');
  form.classList.add('d-flex', 'flex-wrap');
  const foundFormAction = formActionRow.querySelector('a');
  if (foundFormAction) {
    form.action = foundFormAction.href;
  }
  form.method = 'post'; // Assuming method is post based on original HTML
  moveInstrumentation(formActionRow, form);

  // Add a placeholder for csrfmiddlewaretoken if needed, but do not hardcode the value.
  // Since the original HTML has a hardcoded value, we'll omit it for now as it's dynamic.
  // If the block model had a field for it, we would use that.

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = emailPlaceholderRow.textContent.trim();
  moveInstrumentation(emailPlaceholderRow, emailInput);
  form.append(emailInput);

  const subscribeButton = document.createElement('button');
  subscribeButton.classList.add('btn', 'btn-primary', 'subscribe-btn');
  subscribeButton.textContent = subscribeButtonLabelRow.textContent.trim();
  moveInstrumentation(subscribeButtonLabelRow, subscribeButton);
  form.append(subscribeButton);
  col1.append(form);

  row.append(col1);

  // Cols for footer links sections
  itemRows.forEach((itemRow) => {
    const [sectionTitleCell, sectionLinksCell, hierarchyTreeCell] = [...itemRow.children];

    const col = document.createElement('div');
    col.classList.add('col-lg-3', 'col-6');

    const sectionTitle = document.createElement('h5');
    sectionTitle.textContent = sectionTitleCell.textContent.trim();
    moveInstrumentation(sectionTitleCell, sectionTitle);
    col.append(sectionTitle);

    const ul = document.createElement('ul');
    ul.classList.add('d-flex', 'flex-column', 'useful-links-list');

    const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
    if (hierarchyRoot) {
      // Process hierarchy tree
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
      moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation for the hierarchy cell

      tempDiv.querySelectorAll('li').forEach((li) => {
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
          nested.remove(); // Remove from tempDiv's li to re-append
          const subWrap = document.createElement('div');
          // No specific class for sub-wrap in original HTML, using a generic one if needed
          // subWrap.classList.add('has-sub-child');
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
        // Append the processed li to the main ul
        ul.append(li);
      });
    } else {
      // Fallback to sectionLinks if hierarchy is not present or empty
      const sectionLinksContent = sectionLinksCell?.innerHTML;
      if (sectionLinksContent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sectionLinksContent;
        moveInstrumentation(sectionLinksCell, tempDiv); // Move instrumentation for the section links cell
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
    moveInstrumentation(itemRow, col); // Move instrumentation for the entire item row to its column
    col.append(ul);
    row.append(col);
  });

  container.append(row);
  footer.append(container);

  const copyright = document.createElement('h5');
  copyright.classList.add('text-center', 'mt-6');
  copyright.textContent = copyrightRow.textContent.trim();
  moveInstrumentation(copyrightRow, copyright);
  footer.append(copyright);

  block.replaceChildren(footer);
}
