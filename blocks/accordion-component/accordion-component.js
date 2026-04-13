import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...faqItemRows] = [...block.children];

  // Heading
  const headingElement = document.createElement('h2');
  headingElement.classList.add('accordion-heading');
  moveInstrumentation(headingRow, headingElement);
  headingElement.textContent = headingRow.firstElementChild.textContent.trim();

  // Accordion Container
  const accordionContainer = document.createElement('div');
  accordionContainer.classList.add('accordion-container');

  // FAQ List
  const faqList = document.createElement('div');
  faqList.classList.add('faq-list');

  faqItemRows.forEach((row, index) => {
    // Check 0 & 1: Structure Alignment - Use content detection instead of index access
    const cells = [...row.children];
    const questionCell = cells.find(cell => cell.textContent.trim() !== '' && !cell.querySelector('p')); // Assuming question is text, not rich text
    const answerCell = cells.find(cell => cell.querySelector('p')); // Assuming answer is rich text with <p>

    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item', 'block');
    if (index >= 3) { // Assuming 'hidden' class applies from the 4th item based on original HTML
      faqItem.classList.add('hidden');
    }
    moveInstrumentation(row, faqItem);

    const customAccordionFaq = document.createElement('div');
    customAccordionFaq.classList.add('custom-accordian-faq');

    const accordionSection = document.createElement('div');
    accordionSection.classList.add('accordion-section');

    const accordion = document.createElement('div');
    accordion.classList.add('accordion');

    const accordionTitle = document.createElement('h3');
    accordionTitle.classList.add('accordion-title');
    accordionTitle.textContent = questionCell ? questionCell.textContent.trim() : '';

    const accordionIcon = document.createElement('span');
    accordionIcon.classList.add('icon-chevron-down', 'accordion-icon-custom');
    if (index === 0) { // First item is open by default
      accordionIcon.classList.add('rotate');
      faqItem.classList.add('open'); // Add 'open' class for the first item
    }

    const accordionContent = document.createElement('div');
    accordionContent.classList.add('accordion-content', 'undefined'); // 'undefined' is from original HTML
    if (answerCell) {
      moveInstrumentation(answerCell, accordionContent);
      while (answerCell.firstChild) {
        accordionContent.append(answerCell.firstChild);
      }
    }
    accordionContent.style.maxHeight = (index === 0) ? '1000px' : '0px'; // First item open by default

    accordion.append(accordionTitle, accordionIcon);
    accordionSection.append(accordion, accordionContent);
    customAccordionFaq.append(accordionSection);
    faqItem.append(customAccordionFaq);
    faqList.append(faqItem);

    // Check 2: Interactivity - Accordion click listener
    accordion.addEventListener('click', () => {
      const isOpen = accordionContent.style.maxHeight !== '0px';
      accordionContent.style.maxHeight = isOpen ? '0px' : '1000px';
      accordionIcon.classList.toggle('rotate', !isOpen);
      faqItem.classList.toggle('open', !isOpen); // Add/remove 'open' class for styling
    });
  });

  accordionContainer.append(faqList);

  // Read More button
  if (faqItemRows.length > 3) { // Only add button if there are more than 3 items
    const readMoreButton = document.createElement('button');
    readMoreButton.classList.add('accordion-read-btn');
    readMoreButton.innerHTML = 'Read More <span class="icon-arrow-down accordion-read-icon"></span>';

    // Check 2: Interactivity - Read More button click listener
    readMoreButton.addEventListener('click', () => {
      const hiddenItems = faqList.querySelectorAll('.faq-item.hidden');
      if (hiddenItems.length > 0) {
        hiddenItems.forEach((item) => item.classList.remove('hidden'));
        readMoreButton.remove(); // Remove button after all items are shown
      }
    });
    accordionContainer.append(readMoreButton);
  }


  block.textContent = '';
  block.append(headingElement, accordionContainer);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
