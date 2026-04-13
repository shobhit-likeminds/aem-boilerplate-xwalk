import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [outerButtonLabelRow, innerButtonLabelRow, ...productRows] = [...block.children];

  // Outer Button
  const outerButton = document.createElement('button');
  outerButton.classList.add('floating-product-button', 'outer-button');
  moveInstrumentation(outerButtonLabelRow, outerButton);
  outerButton.textContent = outerButtonLabelRow.firstElementChild.textContent.trim();

  // Floating Product Container
  const floatingProductContainer = document.createElement('div');
  floatingProductContainer.classList.add('floating-product', 'floating-product-2');

  // Inner Button
  const innerButton = document.createElement('button');
  innerButton.classList.add('floating-product-button', 'inner-button');
  moveInstrumentation(innerButtonLabelRow, innerButton);
  innerButton.textContent = innerButtonLabelRow.firstElementChild.textContent.trim();
  floatingProductContainer.append(innerButton);

  // Close Button
  const closeButton = document.createElement('button');
  closeButton.classList.add('floating-product-close'); // Corrected class name
  closeButton.textContent = '×';
  floatingProductContainer.append(closeButton);

  // Product Wrapper
  const productWrapper = document.createElement('div');
  productWrapper.classList.add('product-wrapper');

  productRows.forEach((row) => {
    const cells = [...row.children];
    // Using content detection instead of index access
    const headingCell = cells.find(cell => cell.querySelector('h2') || (cell.textContent.trim() && !cell.querySelector('p') && !cell.querySelector('a')));
    const descriptionCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href && !cell.querySelector('a').textContent.trim().includes('http'));
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').textContent.trim().includes('http'));
    const conditionsCell = cells.find(cell => cell.querySelector('p') && cell.textContent.includes('Click here'));
    const termsCell = cells.find(cell => cell.textContent.trim().toLowerCase().includes('t&c apply'));


    const productDiv = document.createElement('div');
    moveInstrumentation(row, productDiv);

    // Heading
    if (headingCell) {
      const heading = document.createElement('h2');
      moveInstrumentation(headingCell, heading);
      heading.textContent = headingCell.textContent.trim();
      productDiv.append(heading);
    }

    // Description
    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('pb-4');
      moveInstrumentation(descriptionCell, descriptionDiv);
      while (descriptionCell.firstChild) descriptionDiv.append(descriptionCell.firstChild);
      productDiv.append(descriptionDiv);
    }

    // CTA Link
    if (ctaLinkCell && ctaLinkLabelCell) {
      const ctaLinkWrapper = document.createElement('div');
      const ctaLinkAnchor = document.createElement('a');
      ctaLinkAnchor.classList.add('product-link');
      const originalCtaLink = ctaLinkCell.querySelector('a');
      if (originalCtaLink) {
        ctaLinkAnchor.href = originalCtaLink.href;
        if (originalCtaLink.target) ctaLinkAnchor.target = originalCtaLink.target;
      }
      ctaLinkAnchor.textContent = ctaLinkLabelCell.textContent.trim();
      moveInstrumentation(ctaLinkCell, ctaLinkAnchor);
      ctaLinkWrapper.append(ctaLinkAnchor);
      productDiv.append(ctaLinkWrapper);
    }

    // Conditions
    if (conditionsCell) {
      const conditionDiv = document.createElement('div');
      conditionDiv.classList.add('condition');
      moveInstrumentation(conditionsCell, conditionDiv);
      while (conditionsCell.firstChild) conditionDiv.append(conditionsCell.firstChild);
      productDiv.append(conditionDiv);
    }

    // Terms
    if (termsCell) {
      const termsDiv = document.createElement('div');
      termsDiv.classList.add('terms');
      moveInstrumentation(termsCell, termsDiv);
      termsDiv.textContent = termsCell.textContent.trim();
      productDiv.append(termsDiv);
    }

    productWrapper.append(productDiv);
  });

  floatingProductContainer.append(productWrapper);

  block.textContent = '';
  block.append(outerButton, floatingProductContainer);

  // Event Listeners for interaction
  outerButton.addEventListener('click', () => {
    floatingProductContainer.classList.add('show');
    outerButton.classList.add('hide');
  });

  innerButton.addEventListener('click', () => {
    floatingProductContainer.classList.remove('show');
    outerButton.classList.remove('hide');
  });

  closeButton.addEventListener('click', () => {
    floatingProductContainer.classList.remove('show');
    outerButton.classList.remove('hide');
  });
}
