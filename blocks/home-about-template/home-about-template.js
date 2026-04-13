import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('section-background-area');

  const children = [...block.children];

  // Heading
  const headingRow = children.shift(); // First row is heading
  const headingEl = document.createElement('h2');
  headingEl.classList.add('home-about-heading');
  moveInstrumentation(headingRow, headingEl);
  headingEl.textContent = headingRow.firstElementChild.textContent.trim();
  block.append(headingEl);

  // Disclaimer (now the last row after heading is shifted)
  const disclaimerRow = children.pop(); // Last remaining row is disclaimer
  const disclaimerDiv = document.createElement('div');
  const disclaimerP = document.createElement('p');
  disclaimerP.classList.add('plan-disclaimer');
  moveInstrumentation(disclaimerRow, disclaimerP);
  disclaimerP.innerHTML = disclaimerRow.firstElementChild.innerHTML;
  disclaimerDiv.append(disclaimerP);
  block.append(disclaimerDiv);

  // Plan Cards Container (remaining rows are plan cards)
  const planContainer = document.createElement('div');
  planContainer.classList.add('plan-container');

  children.forEach((row) => { // 'children' now only contains planCardRows
    const cells = [...row.children];

    // Content detection for plan card cells
    const iconClassCell = cells.find(cell => cell.textContent.trim().startsWith('icon-'));
    const planHeadCell = cells.find(cell => cell.textContent.trim().match(/^[0-9]+%?\*?$/) || cell.textContent.trim().match(/^[0-9]+x[0-9]+$/) || cell.textContent.trim().match(/^[0-9]+[A-Za-z]+$/) || cell.textContent.trim().match(/^INR [0-9,]+ Cr\+$/)); // Matches "99.18 %*", "24x7", "200+", "90 Lac+", "INR 18,507 Cr+"
    const planTitleCell = cells.find(cell => !iconClassCell || cell !== iconClassCell && !planHeadCell || cell !== planHeadCell && cell.textContent.trim().length > 0 && !cell.textContent.trim().includes(' ')); // Simple heuristic for title
    const planDescCell = cells.find(cell => !iconClassCell || cell !== iconClassCell && !planHeadCell || cell !== planHeadCell && !planTitleCell || cell !== planTitleCell && cell.textContent.trim().length > 0 && cell.textContent.trim().includes(' ')); // Simple heuristic for description

    const planCard = document.createElement('div');
    planCard.classList.add('plan-card');
    moveInstrumentation(row, planCard);

    const flexDiv = document.createElement('div');
    flexDiv.classList.add('flex', 'mr-4', 'plan-icon');

    const iconSpan = document.createElement('span');
    if (iconClassCell) {
      iconSpan.classList.add(iconClassCell.textContent.trim());
    }
    flexDiv.append(iconSpan);
    planCard.append(flexDiv);

    const contentDiv = document.createElement('div');

    const planHead = document.createElement('p');
    planHead.classList.add('plan-head');
    if (planHeadCell) {
      planHead.textContent = planHeadCell.textContent.trim();
    }

    const innerContentDiv = document.createElement('div');
    const planTitle = document.createElement('p');
    planTitle.classList.add('plan-title');
    if (planTitleCell) {
      planTitle.textContent = planTitleCell.textContent.trim();
    }

    const planDesc = document.createElement('p');
    planDesc.classList.add('plan-desc');
    if (planDescCell) {
      planDesc.textContent = planDescCell.textContent.trim();
    }

    innerContentDiv.append(planTitle, planDesc);
    contentDiv.append(planHead, innerContentDiv);
    planCard.append(contentDiv);
    planContainer.append(planCard);
  });

  block.append(planContainer);

  // Image optimization (if any images were present, though none in this specific block structure)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
