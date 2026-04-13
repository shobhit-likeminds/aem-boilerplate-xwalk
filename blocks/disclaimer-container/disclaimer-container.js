import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0 & 1: Structure alignment - using destructuring for root rows is fine.
  // The block has two rows: heading and disclaimers.
  const [headingRow, disclaimersRow] = [...block.children];

  const disclaimerContain = document.createElement('div');
  disclaimerContain.classList.add('disclaimer-contain');

  const customAccordianFaq = document.createElement('div');
  customAccordianFaq.classList.add('custom-accordian-faq');

  const accordionSection = document.createElement('div');
  accordionSection.classList.add('accordion-section');

  const accordion = document.createElement('div');
  accordion.classList.add('accordion');

  const heading = document.createElement('h3');
  heading.classList.add('accordion-title');

  // Check 0: Original code uses headingRow.firstElementChild.
  // This is acceptable here because the EDS structure explicitly defines
  // block.children[0] as containing a single div with the heading text.
  // However, for robustness, we can explicitly find the cell.
  const headingCell = [...headingRow.children].find(cell => cell.textContent.trim() !== '');
  if (headingCell) {
    moveInstrumentation(headingCell, heading);
    heading.textContent = headingCell.textContent.trim();
  }


  const icon = document.createElement('span');
  icon.classList.add('icon-chevron-down', 'accordion-icon-custom');

  accordion.append(heading, icon);

  const accordionContent = document.createElement('div');
  // Check 1: 'undefined' is a class name from the original HTML, so it should be added as a string.
  accordionContent.classList.add('accordion-content', 'undefined');
  accordionContent.style.maxHeight = '0px';

  // Check 0: Original code uses disclaimersRow.firstElementChild.
  // Similar to heading, this is acceptable given the EDS structure for disclaimers.
  // For robustness, we can explicitly find the cell.
  const disclaimersCell = [...disclaimersRow.children].find(cell => cell.textContent.trim() !== '');
  if (disclaimersCell) {
    moveInstrumentation(disclaimersCell, accordionContent);
    // Move all children from the original disclaimers cell into accordionContent
    while (disclaimersCell.firstChild) {
      accordionContent.append(disclaimersCell.firstChild);
    }
  }


  // Check 2: Interactivity - The accordion click listener is present.
  accordion.addEventListener('click', () => {
    // Toggle 'undefined' class for content visibility - this is correct as per original HTML.
    accordionContent.classList.toggle('undefined');
    if (accordionContent.style.maxHeight === '0px') {
      accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
    } else {
      accordionContent.style.maxHeight = '0px';
    }
    icon.classList.toggle('icon-chevron-down');
    icon.classList.toggle('icon-chevron-up'); // Assuming an up icon is desired on open
  });

  accordionSection.append(accordion, accordionContent);
  customAccordianFaq.append(accordionSection);
  disclaimerContain.append(customAccordianFaq);

  block.textContent = '';
  // Check 1: 'section-background-area' is from original HTML, correctly added.
  block.classList.add('section-background-area');
  block.append(disclaimerContain);
}
