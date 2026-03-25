import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('section');
  wrapper.classList.add('highlights-wrapper', 'highlights-style3');
  moveInstrumentation(block, wrapper);

  const [titleRow, ...highlightRows] = [...block.children];

  // Title
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('highlights-title');
  moveInstrumentation(titleRow, titleDiv);
  while (titleRow.firstChild) titleDiv.append(titleRow.firstChild);
  wrapper.append(titleDiv);

  const container = document.createElement('div');
  container.classList.add('highlights-container');
  wrapper.append(container);

  const highlightsRow = document.createElement('div');
  highlightsRow.classList.add('highlights-row', 'highlights-aln-center');
  container.append(highlightsRow);

  highlightRows.forEach((row) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('highlights-col-4', 'highlights-col-12-medium');
    moveInstrumentation(row, colDiv);

    const section = document.createElement('section');
    section.classList.add('highlights-highlight');
    colDiv.append(section);

    const cells = [...row.children];

    // Image and Link
    const imageCell = cells[0];
    const headingCell = cells[1];
    const linkCell = cells[2];
    const descriptionCell = cells[3];
    const buttonLinkCell = cells[4];
    const buttonLabelCell = cells[5]; // Correctly identified as the 6th cell

    const imageLink = document.createElement('a');
    imageLink.classList.add('highlights-image', 'highlights-featured');
    const originalLink = linkCell.querySelector('a');
    if (originalLink) {
      imageLink.href = originalLink.href;
    } else {
      imageLink.href = '#'; // Fallback if no link provided
    }
    moveInstrumentation(imageCell, imageLink);
    while (imageCell.firstChild) imageLink.append(imageCell.firstChild);
    section.append(imageLink);

    // Heading
    const h3 = document.createElement('h3');
    const headingLink = document.createElement('a');
    if (originalLink) { // Use the same link as the image
      headingLink.href = originalLink.href;
    } else {
      headingLink.href = '#';
    }
    moveInstrumentation(headingCell, headingLink);
    while (headingCell.firstChild) headingLink.append(headingCell.firstChild);
    h3.append(headingLink);
    section.append(h3);

    // Description
    const descriptionP = document.createElement('p');
    moveInstrumentation(descriptionCell, descriptionP);
    while (descriptionCell.firstChild) descriptionP.append(descriptionCell.firstChild);
    section.append(descriptionP);

    // Button
    const ulActions = document.createElement('ul');
    ulActions.classList.add('highlights-actions');
    const liAction = document.createElement('li');
    const buttonLinkEl = document.createElement('a');
    buttonLinkEl.classList.add('highlights-button', 'highlights-style1');

    const originalButtonLink = buttonLinkCell.querySelector('a');
    if (originalButtonLink) {
      buttonLinkEl.href = originalButtonLink.href;
      // The button label should come from buttonLabelCell, not the link text
      buttonLinkEl.textContent = buttonLabelCell.textContent.trim();
    } else {
      buttonLinkEl.href = '#';
      buttonLinkEl.textContent = buttonLabelCell.textContent.trim() || 'Learn More'; // Fallback text
    }
    moveInstrumentation(buttonLinkCell, buttonLinkEl); // Instrumentation for the button link cell
    // No need to append children from buttonLinkCell if we're setting textContent from buttonLabelCell

    liAction.append(buttonLinkEl);
    ulActions.append(liAction);
    section.append(ulActions);

    highlightsRow.append(colDiv);
  });

  wrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(wrapper);
}
