import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...faqRows] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.textContent = headingRow.firstElementChild?.textContent.trim() || '';
  sectionHeader.append(heading);
  container.append(sectionHeader);

  // Accordion Div
  const accoDiv = document.createElement('div');
  accoDiv.classList.add('acco-div');
  const ul = document.createElement('ul');

  faqRows.forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...row.children];
    const questionCell = cells.find(cell => !cell.querySelector('p')); // Assuming question is not a paragraph
    const answerCell = cells.find(cell => cell.querySelector('p')); // Assuming answer is a paragraph

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('aos-init', 'aos-animate');
    li.setAttribute('data-aos', 'fade-up');
    if (index === 0) {
      li.classList.add('active');
    }

    const h2 = document.createElement('h2');
    h2.setAttribute('data-once', 'faqsAccordion');
    h2.textContent = questionCell?.textContent.trim() || '';
    li.append(h2);

    const accoContentDiv = document.createElement('div');
    accoContentDiv.classList.add('acco-content-div');
    if (index === 0) {
      accoContentDiv.classList.add('show');
    }
    moveInstrumentation(answerCell, accoContentDiv);
    if (answerCell) { // Ensure answerCell exists before appending children
      while (answerCell.firstChild) {
        accoContentDiv.append(answerCell.firstChild);
      }
    }
    li.append(accoContentDiv);

    h2.addEventListener('click', () => {
      const currentActive = ul.querySelector('li.active');
      if (currentActive && currentActive !== li) {
        currentActive.classList.remove('active');
        currentActive.querySelector('.acco-content-div').classList.remove('show');
      }
      li.classList.toggle('active');
      accoContentDiv.classList.toggle('show');
    });

    ul.append(li);
  });

  accoDiv.append(ul);
  container.append(accoDiv);

  block.textContent = '';
  block.append(container);
}
