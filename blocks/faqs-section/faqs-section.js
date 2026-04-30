import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const [headlineRow, ...faqItemRows] = children;

  const section = document.createElement('section');
  // The block already has 'faqs-section' from AEM. Only add other classes from ORIGINAL HTML.
  section.classList.add('faqs-section'); // 'section' is a tag, not a class to be added here.

  const container = document.createElement('div');
  container.classList.add('container');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headlineRow, sectionHeader); // Move instrumentation from headlineRow

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular');
  // Use named destructuring for headlineRow's cell
  const [headlineCell] = [...headlineRow.children];
  heading.textContent = headlineCell.textContent.trim();
  sectionHeader.append(heading);
  container.append(sectionHeader);

  // Accordion Div
  const accoDiv = document.createElement('div');
  accoDiv.classList.add('acco-div');

  const ul = document.createElement('ul');

  faqItemRows.forEach((row, index) => {
    const [questionCell, answerCell] = [...row.children];

    const li = document.createElement('li');
    // Apply 'active' and 'show' classes to the first item for initial display, matching ORIGINAL HTML
    if (index === 0) {
      li.classList.add('active');
    }
    // Add AOS classes from ORIGINAL HTML
    li.classList.add('aos-init', 'aos-animate');
    moveInstrumentation(row, li);

    const h2 = document.createElement('h2');
    h2.textContent = questionCell.textContent.trim();
    h2.setAttribute('data-once', 'faqsAccordion'); // Copy data attribute from ORIGINAL HTML
    li.append(h2);

    const accoContentDiv = document.createElement('div');
    accoContentDiv.classList.add('acco-content-div');
    if (index === 0) {
      accoContentDiv.classList.add('show');
    }
    accoContentDiv.innerHTML = answerCell.innerHTML; // Answer is richtext

    li.append(accoContentDiv);
    ul.append(li);

    // Add event listener for accordion functionality
    h2.addEventListener('click', () => {
      const isActive = li.classList.contains('active');

      // Close all other active items
      ul.querySelectorAll('li.active').forEach((activeLi) => {
        if (activeLi !== li) {
          activeLi.classList.remove('active');
          activeLi.querySelector('.acco-content-div').classList.remove('show');
        }
      });

      // Toggle current item
      li.classList.toggle('active', !isActive);
      accoContentDiv.classList.toggle('show', !isActive);
    });
  });

  accoDiv.append(ul);
  container.append(accoDiv);
  section.append(container);

  block.replaceChildren(section);

  // Image optimization (if any images were present in richtext, though not in this specific block)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
