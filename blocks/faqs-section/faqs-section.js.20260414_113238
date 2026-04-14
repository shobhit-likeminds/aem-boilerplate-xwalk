import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...faqRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'faqs-section');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');

  // Heading
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);
  container.append(sectionHeader);

  // FAQs Accordion
  const accoDiv = document.createElement('div');
  accoDiv.classList.add('acco-div');

  const ul = document.createElement('ul');

  faqRows.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('aos-init', 'aos-animate');
    li.setAttribute('data-aos', 'fade-up');

    if (index === 0) {
      li.classList.add('active');
    }

    // Content detection for question and answer cells
    const cells = [...row.children];
    const questionCell = cells.find(cell => cell.textContent.trim() !== '' && !cell.querySelector('p'));
    const answerCell = cells.find(cell => cell.querySelector('p'));

    if (!questionCell || !answerCell) {
      // Handle cases where cells might not be found as expected
      console.warn('Could not find question or answer cell for FAQ row:', row);
      return;
    }

    const h2 = document.createElement('h2');
    h2.setAttribute('data-once', 'faqsAccordion');
    h2.textContent = questionCell.textContent.trim();
    li.append(h2);

    const accoContentDiv = document.createElement('div');
    accoContentDiv.classList.add('acco-content-div');
    if (index === 0) {
      accoContentDiv.classList.add('show');
    }
    moveInstrumentation(answerCell, accoContentDiv);
    while (answerCell.firstChild) {
      accoContentDiv.append(answerCell.firstChild);
    }
    li.append(accoContentDiv);

    ul.append(li);
  });

  accoDiv.append(ul);
  container.append(accoDiv);
  section.append(container);

  // Accordion functionality
  ul.addEventListener('click', (event) => {
    const h2Element = event.target.closest('h2[data-once="faqsAccordion"]');
    if (h2Element) {
      const listItem = h2Element.closest('li');
      const accoContentDiv = listItem.querySelector('.acco-content-div');

      if (listItem.classList.contains('active')) {
        listItem.classList.remove('active');
        accoContentDiv.classList.remove('show');
      } else {
        // Close all other open accordions
        ul.querySelectorAll('li.active').forEach((activeLi) => {
          activeLi.classList.remove('active');
          activeLi.querySelector('.acco-content-div').classList.remove('show');
        });

        // Open the clicked accordion
        listItem.classList.add('active');
        accoContentDiv.classList.add('show');
      }
    }
  });

  block.textContent = '';
  block.append(section);
}
