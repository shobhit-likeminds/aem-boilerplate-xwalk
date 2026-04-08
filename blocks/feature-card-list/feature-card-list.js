import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...cardRows] = [...block.children];

  const headingContainer = document.createElement('div');
  moveInstrumentation(headingRow, headingContainer);
  headingContainer.classList.add('cmp-text');
  while (headingRow.firstChild) headingContainer.append(headingRow.firstChild);
  block.append(headingContainer);

  cardRows.forEach((row) => {
    const section = document.createElement('section');
    moveInstrumentation(row, section);
    section.classList.add('d-block', 'feature_card--Section', 'feature_card', 'mx-auto');

    const cells = [...row.children];
    // Based on BLOCK JSON and EDS BLOCK STRUCTURE, cells are in a fixed order for 'feature-card'
    const imageCell = cells[0];
    const imageAltTextCell = cells[1];
    const titleCell = cells[2];
    const descriptionCell = cells[3];
    const ctaLinkCell = cells[4];
    const ctaLinkLabelCell = cells[5];

    let imageEl;
    let imageAltText = '';
    let titleText = '';
    let descriptionText = '';
    let ctaLinkHref = '';
    let ctaLinkLabel = '';

    if (imageCell && imageCell.querySelector('picture')) {
      imageEl = imageCell.querySelector('picture').querySelector('img');
    }
    if (imageAltTextCell) {
      imageAltText = imageAltTextCell.textContent.trim();
    }
    if (titleCell) {
      titleText = titleCell.textContent.trim();
    }
    if (descriptionCell) {
      descriptionText = descriptionCell.textContent.trim();
    }
    if (ctaLinkCell && ctaLinkCell.querySelector('a')) {
      ctaLinkHref = ctaLinkCell.querySelector('a').href;
      // The CTA Link Label should come from the ctaLinkLabelCell, not the ctaLinkCell's textContent
      // The original HTML shows the CTA Link Label is explicitly provided in a separate cell.
    }
    if (ctaLinkLabelCell) {
      ctaLinkLabel = ctaLinkLabelCell.textContent.trim();
      // If ctaLinkLabelCell contains an <a> tag, extract its textContent, otherwise use its direct textContent
      if (ctaLinkLabelCell.querySelector('a')) {
        ctaLinkLabel = ctaLinkLabelCell.querySelector('a').textContent.trim();
      } else {
        ctaLinkLabel = ctaLinkLabelCell.textContent.trim();
      }
    }


    const anchor = document.createElement('a');
    anchor.classList.add('d-flex', 'flex-column', 'analytics_cta_click', 'text-decoration-none');
    anchor.href = ctaLinkHref;
    anchor.title = ctaLinkLabel;
    anchor.setAttribute('data-cta-label', ctaLinkLabel);
    // Add target="_blank" if the link is external, as seen in original HTML for "Let's Play"
    if (ctaLinkHref.startsWith('http') && !ctaLinkHref.includes(window.location.hostname)) {
      anchor.setAttribute('target', '_blank');
    }

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('feature_card--image', 'w-100', 'pb-4');
    if (imageEl) {
      const optimizedPic = createOptimizedPicture(imageEl.src, imageAltText, false, [{ width: '750' }]);
      moveInstrumentation(imageEl, optimizedPic.querySelector('img'));
      imageWrapper.append(optimizedPic);
    }
    anchor.append(imageWrapper);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('text-center');

    const titleH2 = document.createElement('h2');
    titleH2.classList.add('feature_card--title', 'boing--text__heading-1');
    titleH2.textContent = titleText;
    textCenterDiv.append(titleH2);

    const descriptionWrapper = document.createElement('div');
    descriptionWrapper.classList.add('pb-5');
    const descriptionP = document.createElement('p');
    descriptionP.classList.add('feature_card--desc', 'boing--text__body-2', 'text-boing-dark');
    descriptionP.textContent = descriptionText;
    descriptionWrapper.append(descriptionP);
    textCenterDiv.append(descriptionWrapper);

    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.classList.add('redirected_btn', 'd-none'); // d-none indicates it's hidden by default

    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('arrow-icon-btn');
    // The original HTML has a hardcoded path for the SVG.
    const svgImg = document.createElement('img');
    svgImg.alt = 'svg file';
    svgImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775655821330.svg+xml';
    button.append(svgImg);
    redirectedBtnDiv.append(button);
    textCenterDiv.append(redirectedBtnDiv);

    // Add event listener for the button
    button.addEventListener('click', () => {
      // The button's action is to navigate to the anchor's href
      if (anchor.href) {
        if (anchor.target === '_blank') {
          window.open(anchor.href, '_blank');
        } else {
          window.location.href = anchor.href;
        }
      }
    });

    anchor.append(textCenterDiv);
    section.append(anchor);
    block.append(section);
  });

  // Clear original block content except for heading which was moved
  block.querySelectorAll('div:not(.cmp-text)').forEach((div) => {
    if (!div.closest('section')) { // Only remove rows that haven't been processed into sections
      div.remove();
    }
  });
}
