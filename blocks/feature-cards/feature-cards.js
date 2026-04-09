import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...cardRows] = [...block.children];

  const headingContainer = document.createElement('div');
  headingContainer.classList.add('cmp-text');
  moveInstrumentation(headingRow, headingContainer);
  while (headingRow.firstChild) headingContainer.append(headingRow.firstChild);

  const headingText = headingContainer.querySelector('p');
  if (headingText) {
    const h1 = document.createElement('h1');
    h1.innerHTML = headingText.innerHTML;
    headingContainer.replaceChildren(h1);
  }

  const sectionsContainer = document.createElement('div');
  sectionsContainer.classList.add('featureCards', 'aem-GridColumn', 'aem-GridColumn--default--12');
  sectionsContainer.append(headingContainer);

  cardRows.forEach((row) => {
    // Use content detection instead of direct index access
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && !cell.querySelector('a'));
    const descriptionCell = cells.find(cell => cell.querySelector('p'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('http'));
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && !cell.querySelector('a').href.includes('http')); // Assuming ctaLinkLabel is the cell with an anchor that doesn't look like a direct link

    const section = document.createElement('section');
    section.classList.add('d-block', 'feature_card--Section', 'feature_card', 'mx-auto');
    moveInstrumentation(row, section);

    const anchor = document.createElement('a');
    anchor.classList.add('d-flex', 'flex-column', 'analytics_cta_click', 'text-decoration-none');

    const foundLink = ctaLinkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      if (foundLink.target) {
        anchor.target = foundLink.target;
      }
    }
    anchor.title = ctaLinkLabelCell?.textContent.trim() || '';
    anchor.setAttribute('data-cta-label', ctaLinkLabelCell?.textContent.trim() || '');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('feature_card--image', 'w-100', 'pb-4');
    if (imageCell) {
      moveInstrumentation(imageCell, imageWrapper);
      while (imageCell.firstChild) imageWrapper.append(imageCell.firstChild);
      imageWrapper.querySelectorAll('picture > img').forEach((img) => {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        img.closest('picture').replaceWith(optimizedPic);
        optimizedPic.querySelector('img').classList.add('w-100', 'h-100');
      });
    }
    anchor.append(imageWrapper);

    const textCenter = document.createElement('div');
    textCenter.classList.add('text-center');

    const title = document.createElement('h2');
    title.classList.add('feature_card--title', 'boing--text__heading-1');
    if (titleCell) {
      moveInstrumentation(titleCell, title);
      while (titleCell.firstChild) title.append(titleCell.firstChild);
    }
    textCenter.append(title);

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('pb-5');
    const description = document.createElement('p');
    description.classList.add('feature_card--desc', 'boing--text__body-2', 'text-boing-dark');
    if (descriptionCell) {
      moveInstrumentation(descriptionCell, description);
      while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    }
    descriptionWrapper.append(description);
    textCenter.append(descriptionWrapper);

    const redirectedBtn = document.createElement('div');
    redirectedBtn.classList.add('redirected_btn', 'd-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('arrow-icon-btn');
    // Original HTML has an img inside the button, which is an icon.
    // Since the block model doesn't have an icon field, we skip it.
    // If the model had an icon field, we would create an img from that field.
    // Add event listener for the button
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default button behavior if it's inside an anchor
      e.stopPropagation(); // Stop propagation to prevent anchor click
      if (anchor.href) {
        if (anchor.target === '_blank') {
          window.open(anchor.href, '_blank');
        } else {
          window.location.href = anchor.href;
        }
      }
    });

    redirectedBtn.append(button);
    textCenter.append(redirectedBtn);

    anchor.append(textCenter);
    section.append(anchor);
    sectionsContainer.append(section);
  });

  block.textContent = '';
  block.append(sectionsContainer);
}
