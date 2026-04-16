import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, introTextRow, ...cardBlurbRows] = [...block.children];

  // Main container
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  containerWrapper.append(heading);

  // Movement holder
  const movementHld = document.createElement('div');
  movementHld.classList.add('movement-hld');
  containerWrapper.append(movementHld);

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-lg-center', 'justify-content-lg-between');
  movementHld.append(row);

  // Intro Text column
  const introTextCol = document.createElement('div');
  introTextCol.classList.add('col-lg-7', 'pb-lg-0', 'pb-4', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(introTextRow, introTextCol);
  introTextCol.innerHTML = introTextRow.firstElementChild.innerHTML;
  row.append(introTextCol);

  // Card Blurbs column
  const cardBlurbCol = document.createElement('div');
  cardBlurbCol.classList.add('col-lg-4');
  row.append(cardBlurbCol);

  cardBlurbRows.forEach((cardBlurbRow) => {
    // The model defines 4 cells for 'card-blurb' items, so direct destructuring is safe.
    const [titleCell, descriptionCell, ctaLinkCell, ctaLinkLabelCell] = [...cardBlurbRow.children];

    const mCardBlurb = document.createElement('div');
    mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(cardBlurbRow, mCardBlurb);

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
    // For type=aem-content, the link is the first child of the cell.
    const foundLink = ctaLinkCell.firstElementChild;
    if (foundLink && foundLink.tagName === 'A') {
      ctaLink.href = foundLink.href;
    }
    ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
    mCardBlurb.append(ctaLink);

    cardBlurbCol.append(mCardBlurb);
  });

  block.textContent = '';
  block.append(containerWrapper);
}
