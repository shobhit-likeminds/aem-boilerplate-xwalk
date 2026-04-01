import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...itemRows] = [...block.children];

  // Heading
  const headingContainer = document.createElement('div');
  headingContainer.classList.add('cmp-text');
  moveInstrumentation(headingRow, headingContainer);
  while (headingRow.firstChild) {
    headingContainer.append(headingRow.firstChild);
  }
  block.textContent = '';
  block.append(headingContainer);

  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('featureCards', 'aem-GridColumn', 'aem-GridColumn--default--12');

  itemRows.forEach((row) => {
    const section = document.createElement('section');
    section.classList.add('d-block', 'feature_card--Section', 'feature_card', 'mx-auto');
    moveInstrumentation(row, section);

    const linkEl = document.createElement('a');
    linkEl.classList.add('d-flex', 'flex-column', 'analytics_cta_click', 'text-decoration-none');

    let imageCell;
    let altTextCell; // Added for the alt text field
    let titleCell;
    let descriptionCell;
    let linkCell; // Store the link cell to extract href and text

    const cells = [...row.children];

    // Content detection for cells based on BlockJson and original HTML structure
    // Order of cells in BlockJson: image, alt, title, description, link
    imageCell = cells.find(cell => cell.querySelector('picture'));
    // Alt text is usually plain text and follows the image
    altTextCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0 && cells.indexOf(cell) === cells.indexOf(imageCell) + 1);
    // Title is usually the first significant text after alt text
    titleCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0 && cells.indexOf(cell) > cells.indexOf(altTextCell));
    // Description is usually the next significant text
    descriptionCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0 && cells.indexOf(cell) > cells.indexOf(titleCell));
    // Link is the cell containing an <a> tag
    linkCell = cells.find(cell => cell.querySelector('a'));

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      const linkUrl = foundLink ? foundLink.href : '';
      linkEl.href = linkUrl;
      linkEl.title = foundLink ? foundLink.textContent.trim() : '';
      linkEl.setAttribute('data-cta-label', foundLink ? foundLink.textContent.trim() : '');
      if (linkUrl.startsWith('http')) {
        linkEl.target = '_blank';
      }
    }

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('feature_card--image', 'w-100', 'pb-4');
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const altText = altTextCell ? altTextCell.textContent.trim() : (img ? img.alt : ''); // Use altTextCell if available, otherwise fallback to img.alt
        const optimizedPic = createOptimizedPicture(img.src, altText, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageDiv.append(optimizedPic);
      }
    }
    linkEl.append(imageDiv);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('text-center');

    if (titleCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('feature_card--title', 'boing--text__heading-1');
      moveInstrumentation(titleCell, h2);
      while (titleCell.firstChild) {
        h2.append(titleCell.firstChild);
      }
      textCenterDiv.append(h2);
    }

    if (descriptionCell) {
      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('pb-5');
      const p = document.createElement('p');
      p.classList.add('feature_card--desc', 'boing--text__body-2', 'text-boing-dark');
      moveInstrumentation(descriptionCell, p);
      while (descriptionCell.firstChild) {
        p.append(descriptionCell.firstChild);
      }
      descriptionWrapper.append(p);
      textCenterDiv.append(descriptionWrapper);
    }

    // Add the button structure if needed (assuming it's always present but hidden by default)
    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.classList.add('redirected_btn', 'd-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('arrow-icon-btn');
    const buttonImg = document.createElement('img');
    buttonImg.alt = 'svg file';
    buttonImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775062202495.svg+xml';
    button.append(buttonImg);
    redirectedBtnDiv.append(button);
    textCenterDiv.append(redirectedBtnDiv);

    // Add event listener for the button to toggle 'd-none' on its parent
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default button behavior if any
      redirectedBtnDiv.classList.toggle('d-none');
      // Optionally, if the button is meant to trigger the link, you could do:
      // if (linkEl.href) window.location.href = linkEl.href;
    });

    linkEl.append(textCenterDiv);
    section.append(linkEl);
    featureCardsWrapper.append(section);
  });

  block.append(featureCardsWrapper);

  // Add the curve-container if it's a fixed element in the original HTML
  const curveContainer = document.createElement('div');
  curveContainer.classList.add('curve-container', 'd-none');
  block.append(curveContainer);
}
