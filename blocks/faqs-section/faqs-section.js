import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...faqRows] = [...block.children];

  // Create the container div
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Process heading
  const sectionHeaderDiv = document.createElement('div');
  sectionHeaderDiv.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular'); // aos-init, aos-animate are added by JS
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeaderDiv.append(heading);
  containerDiv.append(sectionHeaderDiv);

  // Process FAQs
  const accoDiv = document.createElement('div');
  accoDiv.classList.add('acco-div');
  const ul = document.createElement('ul');

  faqRows.forEach((row, index) => {
    const [questionCell, answerCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('aos-init', 'aos-animate'); // active is added by JS
    moveInstrumentation(row, li);

    const questionH2 = document.createElement('h2');
    questionH2.textContent = questionCell.textContent.trim();
    // data-once="faqsAccordion" is for JS functionality, not part of static HTML structure
    moveInstrumentation(questionCell, questionH2);
    li.append(questionH2);

    const accoContentDiv = document.createElement('div');
    accoContentDiv.classList.add('acco-content-div'); // show is added by JS
    moveInstrumentation(answerCell, accoContentDiv);
    while (answerCell.firstChild) {
      accoContentDiv.append(answerCell.firstChild);
    }
    li.append(accoContentDiv);

    // Add click listener for accordion behavior
    questionH2.addEventListener('click', () => {
      const isActive = li.classList.contains('active');
      // Close all other open accordions
      ul.querySelectorAll('li.active').forEach((activeLi) => {
        if (activeLi !== li) {
          activeLi.classList.remove('active');
          activeLi.querySelector('.acco-content-div').classList.remove('show');
        }
      });

      // Toggle current accordion
      li.classList.toggle('active', !isActive);
      accoContentDiv.classList.toggle('show', !isActive);
    });

    // Set the first item as active initially if it's the first one
    if (index === 0) {
      li.classList.add('active');
      accoContentDiv.classList.add('show');
    }

    ul.append(li);
  });

  accoDiv.append(ul);
  containerDiv.append(accoDiv);

  block.textContent = '';
  block.append(containerDiv);

  // Image optimization (if any images were present, though not in this specific block structure)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
