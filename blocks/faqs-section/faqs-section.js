import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'faqs-section');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  // Section Heading
  // The first row is the heading. We can detect it by checking if it has only one cell.
  const headingRow = children.find(row => row.children.length === 1);
  let faqItemsStartIndex = 0;

  if (headingRow) {
    const headingText = headingRow.children[0]?.textContent.trim();
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
    faqItemsStartIndex = children.indexOf(headingRow) + 1;
  }

  // FAQs Accordion
  const accoDiv = document.createElement('div');
  accoDiv.classList.add('acco-div');
  const ul = document.createElement('ul');
  accoDiv.append(ul);

  const faqItems = children.slice(faqItemsStartIndex); // All subsequent rows are faq-item rows

  faqItems.forEach((row, index) => {
    // Ensure we are getting exactly two cells for question and answer
    const cells = [...row.children];
    if (cells.length !== 2) {
      // Skip malformed rows
      return;
    }
    const [questionCell, answerCell] = cells;

    const li = document.createElement('li');
    li.classList.add('aos-init', 'aos-animate');
    if (index === 0) {
      li.classList.add('active'); // First item is active by default
    }

    const questionHeading = document.createElement('h2');
    questionHeading.textContent = questionCell?.textContent.trim();
    questionHeading.setAttribute('data-once', 'faqsAccordion'); // Add data-once attribute
    moveInstrumentation(questionCell, questionHeading);

    const accoContentDiv = document.createElement('div');
    accoContentDiv.classList.add('acco-content-div');
    if (index === 0) {
      accoContentDiv.classList.add('show'); // First item content is shown by default
    }
    accoContentDiv.innerHTML = answerCell?.innerHTML;
    moveInstrumentation(answerCell, accoContentDiv);

    questionHeading.addEventListener('click', () => {
      // Close all other open accordions
      ul.querySelectorAll('li.active').forEach((activeLi) => {
        if (activeLi !== li) {
          activeLi.classList.remove('active');
          activeLi.querySelector('.acco-content-div').classList.remove('show');
        }
      });

      // Toggle current accordion
      li.classList.toggle('active');
      accoContentDiv.classList.toggle('show');
    });

    li.append(questionHeading, accoContentDiv);
    ul.append(li);
  });

  container.append(accoDiv);
  block.replaceWith(section);

  // Image optimization (if any images were present in the answer rich text)
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
