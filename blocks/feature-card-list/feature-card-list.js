import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...cardRows] = [...block.children];

  // Heading
  const headingDiv = document.createElement('div');
  moveInstrumentation(headingRow, headingDiv);
  headingDiv.classList.add('cmp-text');
  while (headingRow.firstChild) headingDiv.append(headingRow.firstChild);
  block.append(headingDiv);

  const sectionsToAppend = []; // Collect sections to append later

  cardRows.forEach((row) => {
    const section = document.createElement('section');
    moveInstrumentation(row, section);
    section.classList.add('d-block', 'feature_card--Section', 'feature_card', 'mx-auto');

    let imageCell;
    let altTextCell;
    let titleCell;
    let descriptionCell;
    let ctaLinkCell;
    let ctaLinkLabelCell;

    // Use a counter or specific checks to identify cells based on their content type
    const cells = [...row.children];
    imageCell = cells.find((cell) => cell.querySelector('picture'));
    ctaLinkCell = cells.find((cell) => cell.querySelector('a'));

    // Filter out cells that are already identified as image or CTA link
    const textCells = cells.filter((cell) => !cell.querySelector('picture') && !cell.querySelector('a'));

    // Assign text cells based on their expected order
    if (textCells.length >= 1) altTextCell = textCells[0];
    if (textCells.length >= 2) titleCell = textCells[1];
    if (textCells.length >= 3) descriptionCell = textCells[2];
    if (textCells.length >= 4) ctaLinkLabelCell = textCells[3];


    const anchor = document.createElement('a');
    anchor.classList.add('d-flex', 'flex-column', 'analytics_cta_click', 'text-decoration-none');
    const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
    if (ctaLink) {
      anchor.href = ctaLink.href;
      anchor.title = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : '';
      anchor.setAttribute('data-cta-label', anchor.title);
      if (ctaLink.target) anchor.target = ctaLink.target;
    }
    moveInstrumentation(ctaLinkCell, anchor);

    const featureImageDiv = document.createElement('div');
    featureImageDiv.classList.add('feature_card--image', 'w-100', 'pb-4');
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, altTextCell ? altTextCell.textContent.trim() : '', false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          picture.replaceWith(optimizedPic);
        }
      }
      moveInstrumentation(imageCell, featureImageDiv);
      while (imageCell.firstChild) featureImageDiv.append(imageCell.firstChild);
    }
    anchor.append(featureImageDiv);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('text-center');

    const titleH2 = document.createElement('h2');
    titleH2.classList.add('feature_card--title', 'boing--text__heading-1');
    if (titleCell) {
      moveInstrumentation(titleCell, titleH2);
      titleH2.textContent = titleCell.textContent.trim();
    }
    textCenterDiv.append(titleH2);

    const descriptionWrapperDiv = document.createElement('div');
    descriptionWrapperDiv.classList.add('pb-5');
    const descriptionP = document.createElement('p');
    descriptionP.classList.add('feature_card--desc', 'boing--text__body-2', 'text-boing-dark');
    if (descriptionCell) {
      moveInstrumentation(descriptionCell, descriptionP);
      descriptionP.textContent = descriptionCell.textContent.trim();
    }
    descriptionWrapperDiv.append(descriptionP);
    textCenterDiv.append(descriptionWrapperDiv);

    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.classList.add('redirected_btn', 'd-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('arrow-icon-btn');

    const img = document.createElement('img');
    img.alt = 'svg file';
    // Use the relative path from the original HTML
    img.src = '/content/dam/aemigrate/uploaded-folder/image/1775730059234.svg+xml';
    button.append(img);
    redirectedBtnDiv.append(button);
    textCenterDiv.append(redirectedBtnDiv);

    // Add event listener for the button
    button.addEventListener('click', () => {
      if (ctaLink) {
        window.location.href = ctaLink.href;
      }
    });

    anchor.append(textCenterDiv);
    section.append(anchor);
    sectionsToAppend.push(section); // Collect the created section
  });

  // Clear original block content
  block.textContent = '';
  block.append(headingDiv);
  sectionsToAppend.forEach((section) => block.append(section)); // Append all collected sections
}
