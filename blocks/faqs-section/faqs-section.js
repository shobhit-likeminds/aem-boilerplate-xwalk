import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const sectionHeadingRow = children[0];
  const faqItemRows = children.slice(1);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Section Header
  const sectionHeaderDiv = document.createElement('div');
  sectionHeaderDiv.classList.add('section-header', 'text-center');
  moveInstrumentation(sectionHeadingRow, sectionHeaderDiv);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeaderDiv.append(heading);
  containerDiv.append(sectionHeaderDiv);

  // Accordion div
  const accoDiv = document.createElement('div');
  accoDiv.classList.add('acco-div');
  const ul = document.createElement('ul');

  faqItemRows.forEach((row, index) => {
    const [questionCell, answerCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('aos-init', 'aos-animate');
    li.setAttribute('data-aos', 'fade-up');
    moveInstrumentation(row, li);

    const h2 = document.createElement('h2');
    h2.setAttribute('data-once', 'faqsAccordion');
    h2.textContent = questionCell.textContent.trim();
    li.append(h2);

    const accoContentDiv = document.createElement('div');
    accoContentDiv.classList.add('acco-content-div');
    accoContentDiv.innerHTML = answerCell.innerHTML;
    li.append(accoContentDiv);

    if (index === 0) {
      li.classList.add('active');
      accoContentDiv.classList.add('show');
    }

    h2.addEventListener('click', () => {
      const isActive = li.classList.contains('active');
      // Close all other open accordions
      ul.querySelectorAll('li.active').forEach((activeLi) => {
        activeLi.classList.remove('active');
        activeLi.querySelector('.acco-content-div').classList.remove('show');
      });

      // Toggle current accordion
      if (!isActive) {
        li.classList.add('active');
        accoContentDiv.classList.add('show');
      }
    });

    ul.append(li);
  });

  accoDiv.append(ul);
  containerDiv.append(accoDiv);

  block.replaceChildren(containerDiv);

  block.classList.add('section', 'faqs-section'); // Add section class to the block itself
}
