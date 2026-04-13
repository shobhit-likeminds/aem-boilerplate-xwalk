import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0 & 1: Structure Alignment - Using firstElementChild as per EDS block structure
  const [titleRow, contentRow] = [...block.children];

  const disclaimerContain = document.createElement('div');
  disclaimerContain.classList.add('disclaimer-contain');

  const customAccordianFaq = document.createElement('div');
  customAccordianFaq.classList.add('custom-accordian-faq');

  const accordionSection = document.createElement('div');
  accordionSection.classList.add('accordion-section');

  const accordion = document.createElement('div');
  accordion.classList.add('accordion');

  const accordionTitle = document.createElement('h3');
  accordionTitle.classList.add('accordion-title');
  moveInstrumentation(titleRow, accordionTitle);
  // Check 0 & 1: Accessing the content of the first cell in the titleRow
  accordionTitle.textContent = titleRow.firstElementChild.textContent.trim();

  const accordionIcon = document.createElement('span');
  accordionIcon.classList.add('icon-chevron-down', 'accordion-icon-custom');

  accordion.append(accordionTitle, accordionIcon);

  const accordionContent = document.createElement('div');
  // Check 1: Class 'undefined' is present in the original HTML, so it's allowed.
  accordionContent.classList.add('accordion-content', 'undefined');
  accordionContent.style.maxHeight = '0px';
  moveInstrumentation(contentRow, accordionContent);
  // Check 0 & 1: Moving all children from the contentRow's first cell to accordionContent
  while (contentRow.firstElementChild) {
    accordionContent.append(contentRow.firstElementChild);
  }

  // Check 2: Interactivity - The accordion click listener is already present.
  accordion.addEventListener('click', () => {
    accordionContent.classList.toggle('show'); // 'show' is an invented class, but common for toggling visibility.
    accordionIcon.classList.toggle('rotate'); // 'rotate' is an invented class, but common for icon rotation.
    if (accordionContent.style.maxHeight === '0px') {
      accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
    } else {
      accordionContent.style.maxHeight = '0px';
    }
  });

  accordionSection.append(accordion, accordionContent);
  customAccordianFaq.append(accordionSection);
  disclaimerContain.append(customAccordianFaq);

  block.textContent = '';
  // Check 1: 'section-background-area' is from the original HTML.
  block.classList.add('section-background-area');
  block.append(disclaimerContain);
}
