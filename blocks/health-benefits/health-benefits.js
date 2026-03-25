import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // BlockJson has 3 root fields: block-title, h1tag, health_benefits_list (container)
  // The EDS Block Structure shows these as block.children[0], block.children[1], block.children[2]
  // The remaining children are the 'health-list' items.
  const [blockTitleRow, h1TagRow, healthListWrapperRow, ...healthListItems] = [...block.children];

  const healthBenefitsWrapper = document.createElement('div');
  healthBenefitsWrapper.classList.add('health_benefits-wrapper');

  const healthBenefitsHeading = document.createElement('div');
  healthBenefitsHeading.classList.add('health_benefits_heading');
  
  // blockTitleRow and h1TagRow are the direct children of the block,
  // their firstElementChild contains the actual text content.
  // moveInstrumentation should be applied to the parent row elements.
  moveInstrumentation(blockTitleRow, healthBenefitsHeading);
  moveInstrumentation(h1TagRow, healthBenefitsHeading);

  const blockTitle = document.createElement('h2');
  blockTitle.classList.add('block-title');
  blockTitle.textContent = blockTitleRow.firstElementChild.textContent;
  healthBenefitsHeading.append(blockTitle);

  const h1Tag = document.createElement('h2');
  h1Tag.classList.add('h1tag');
  h1Tag.textContent = h1TagRow.firstElementChild.textContent;
  healthBenefitsHeading.append(h1Tag);

  healthBenefitsWrapper.append(healthBenefitsHeading);

  const healthBenefitsList = document.createElement('div');
  healthBenefitsList.classList.add('health_benefits_list');
  moveInstrumentation(healthListWrapperRow, healthBenefitsList);

  healthListItems.forEach((row) => {
    const healthListItem = document.createElement('div');
    healthListItem.classList.add('health_list');
    moveInstrumentation(row, healthListItem);

    // BlockJson for 'health-list' item has 2 fields: title, description
    // These correspond to row.children[0] and row.children[1]
    const [titleCell, descriptionCell] = [...row.children];

    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = titleCell.textContent;
    healthListItem.append(title);

    const description = document.createElement('div');
    description.classList.add('description');
    // The description is a richtext field, so it might contain multiple child nodes (e.g., <p> tags).
    // Append all children from the descriptionCell to the new description div.
    while (descriptionCell.firstChild) {
      description.append(descriptionCell.firstChild);
    }
    healthListItem.append(description);

    healthBenefitsList.append(healthListItem);
  });

  healthBenefitsWrapper.append(healthBenefitsList);

  block.textContent = '';
  block.append(healthBenefitsWrapper);
}
