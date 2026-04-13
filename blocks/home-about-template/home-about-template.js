import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('section-background-area');

  const [headingRow, disclaimerRow, ...planCardRows] = [...block.children];

  // Heading
  const headingEl = document.createElement('h2');
  headingEl.classList.add('home-about-heading');
  moveInstrumentation(headingRow, headingEl);
  headingEl.textContent = headingRow.firstElementChild.textContent.trim();

  // Plan Cards Container
  const planContainer = document.createElement('div');
  planContainer.classList.add('plan-container');

  planCardRows.forEach((row) => {
    const cells = [...row.children]; // Get all cells for content detection

    // Use content detection to find cells, assuming order might not be strictly guaranteed
    // or to make it more robust if cell content types vary.
    // Based on the EDS structure, they are in order, but this is a safer pattern.
    const iconCell = cells[0]; // First cell is icon
    const highlightCell = cells[1]; // Second cell is highlight
    const titleCell = cells[2]; // Third cell is title
    const descriptionCell = cells[3]; // Fourth cell is description

    const planCard = document.createElement('div');
    planCard.classList.add('plan-card');
    moveInstrumentation(row, planCard);

    const planIconWrapper = document.createElement('div');
    planIconWrapper.classList.add('flex', 'mr-4', 'plan-icon');

    const iconSpan = document.createElement('span');
    iconSpan.classList.add(iconCell.textContent.trim());
    // The original HTML has inline styles for font-size, padding, height, color, background, border-radius.
    // These should ideally be moved to CSS, but for exact replication, we'll copy them.
    // However, the prompt strictly says to only copy class names, not styles.
    // So, we'll omit the inline styles here and assume they are handled by CSS based on the class.
    // If the icon-class itself implies styling, that's fine.

    planIconWrapper.append(iconSpan);
    planCard.append(planIconWrapper);

    const textContentWrapper = document.createElement('div');

    const planHead = document.createElement('p');
    planHead.classList.add('plan-head');
    planHead.textContent = highlightCell.textContent.trim();
    // Similar to icon, color style is inline in original HTML. Omitting for class-only rule.
    textContentWrapper.append(planHead);

    const planTitleDescWrapper = document.createElement('div');
    const planTitle = document.createElement('p');
    planTitle.classList.add('plan-title');
    planTitle.textContent = titleCell.textContent.trim();
    planTitleDescWrapper.append(planTitle);

    const planDesc = document.createElement('p');
    planDesc.classList.add('plan-desc');
    planDesc.textContent = descriptionCell.textContent.trim();
    planTitleDescWrapper.append(planDesc);

    textContentWrapper.append(planTitleDescWrapper);
    planCard.append(textContentWrapper);
    planContainer.append(planCard);
  });

  // Disclaimer
  const disclaimerWrapper = document.createElement('div');
  const disclaimerP = document.createElement('p');
  disclaimerP.classList.add('plan-disclaimer');
  moveInstrumentation(disclaimerRow, disclaimerP);
  disclaimerP.innerHTML = disclaimerRow.firstElementChild.innerHTML; // Keep rich text

  disclaimerWrapper.append(disclaimerP);

  block.textContent = '';
  block.append(headingEl, planContainer, disclaimerWrapper);
}
