import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, textRow, ...cardBlurbRows] = [...block.children];

  // Create the main section wrapper
  const section = document.createElement('section');
  section.classList.add('movement-matters');
  moveInstrumentation(block, section);

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');
  section.append(containerWrapper);

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  moveInstrumentation(headingRow, heading);
  containerWrapper.append(heading);

  const movementHld = document.createElement('div');
  movementHld.classList.add('movement-hld');
  containerWrapper.append(movementHld);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'align-items-lg-center', 'justify-content-lg-between');
  movementHld.append(rowDiv);

  // Text content
  const textCol = document.createElement('div');
  textCol.classList.add('col-lg-7', 'pb-lg-0', 'pb-4', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(textRow, textCol);
  while (textRow.firstElementChild) {
    textCol.append(textRow.firstElementChild);
  }
  rowDiv.append(textCol);

  // Card Blurbs
  const cardBlurbsCol = document.createElement('div');
  cardBlurbsCol.classList.add('col-lg-4');
  rowDiv.append(cardBlurbsCol);

  cardBlurbRows.forEach((row) => {
    // Use content detection for CTA link to avoid issues with decorateButtons wrapping
    const cells = [...row.children];
    const titleCell = cells[0];
    const descriptionCell = cells[1];
    const ctaLinkCell = cells[2]; // This cell contains the <a> tag for href
    const ctaLinkLabelCell = cells[3]; // This cell contains the text label for the CTA

    const mCardBlurb = document.createElement('div');
    mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(row, mCardBlurb);

    const contentDiv = document.createElement('div');
    mCardBlurb.append(contentDiv);

    const title = document.createElement('h4');
    title.textContent = titleCell.textContent.trim();
    contentDiv.append(title);

    const description = document.createElement('p');
    description.innerHTML = descriptionCell.innerHTML;
    contentDiv.append(description);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn-box');
    const foundLink = ctaLinkCell.querySelector('a'); // Find the actual <a> tag for its href
    if (foundLink) {
      ctaLink.href = foundLink.href;
    }
    ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
    mCardBlurb.append(ctaLink);

    cardBlurbsCol.append(mCardBlurb);
  });

  block.textContent = '';
  block.append(section);
}
