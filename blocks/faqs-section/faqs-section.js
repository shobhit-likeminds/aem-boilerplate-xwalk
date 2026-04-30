import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...faqRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'faqs-section');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  // Heading
  const headingText = headingRow.textContent.trim();
  if (headingText) {
    const sectionHeader = document.createElement('div');
    sectionHeader.classList.add('section-header', 'text-center');
    const heading = document.createElement('h2');
    heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
    heading.textContent = headingText;
    moveInstrumentation(headingRow, heading);
    sectionHeader.append(heading);
    container.append(sectionHeader);
  }

  // FAQs
  const accoDiv = document.createElement('div');
  accoDiv.classList.add('acco-div');
  const ul = document.createElement('ul');
  accoDiv.append(ul);
  container.append(accoDiv);

  faqRows.forEach((row, index) => {
    const [questionCell, answerCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('aos-init', 'aos-animate');
    if (index === 0) {
      li.classList.add('active'); // First item is active by default
    }

    const h2 = document.createElement('h2');
    h2.textContent = questionCell.textContent.trim();
    moveInstrumentation(questionCell, h2);
    li.append(h2);

    const accoContentDiv = document.createElement('div');
    accoContentDiv.classList.add('acco-content-div');
    if (index === 0) {
      accoContentDiv.classList.add('show');
    }
    accoContentDiv.innerHTML = answerCell.innerHTML;
    moveInstrumentation(answerCell, accoContentDiv);
    li.append(accoContentDiv);

    h2.addEventListener('click', () => {
      const currentlyActive = ul.querySelector('li.active');
      const currentlyOpenContent = ul.querySelector('.acco-content-div.show');

      if (currentlyActive && currentlyActive !== li) {
        currentlyActive.classList.remove('active');
        currentlyOpenContent.classList.remove('show');
      }

      li.classList.toggle('active');
      accoContentDiv.classList.toggle('show');
    });

    ul.append(li);
  });

  block.replaceChildren(section);
}
