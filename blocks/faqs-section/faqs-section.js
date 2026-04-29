import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'faqs-section');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  // Section Heading
  const headingRow = children[0];
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  // The heading text is in the first div of the headingRow, as per EDS Block Structure
  heading.textContent = headingRow.querySelector('div')?.textContent.trim() || '';
  sectionHeader.append(heading);
  container.append(sectionHeader);

  // FAQ Items
  const faqItems = children.slice(1); // All remaining rows are faq-item
  if (faqItems.length > 0) {
    const accoDiv = document.createElement('div');
    accoDiv.classList.add('acco-div');
    container.append(accoDiv);

    const ul = document.createElement('ul');
    accoDiv.append(ul);

    faqItems.forEach((row, index) => {
      // Per BlockJson model, faq-item rows have a fixed schema: [question, answer]
      const [questionCell, answerCell] = [...row.children];

      const li = document.createElement('li');
      li.classList.add('aos-init', 'aos-animate');
      li.setAttribute('data-aos', 'fade-up');
      if (index === 0) {
        li.classList.add('active'); // First item is active by default
      }
      moveInstrumentation(row, li);

      const h2 = document.createElement('h2');
      h2.setAttribute('data-once', 'faqsAccordion');
      h2.textContent = questionCell.textContent.trim();
      li.append(h2);

      const accoContentDiv = document.createElement('div');
      accoContentDiv.classList.add('acco-content-div');
      if (index === 0) {
        accoContentDiv.classList.add('show'); // First item content is shown
      }
      // FAQ Answer is a richtext field, so innerHTML is correct
      accoContentDiv.innerHTML = answerCell.innerHTML;
      li.append(accoContentDiv);

      ul.append(li);

      h2.addEventListener('click', () => {
        const currentlyActive = ul.querySelector('li.active');
        if (currentlyActive && currentlyActive !== li) {
          currentlyActive.classList.remove('active');
          currentlyActive.querySelector('.acco-content-div').classList.remove('show');
        }
        li.classList.toggle('active');
        accoContentDiv.classList.toggle('show');
      });
    });
  }

  block.replaceChildren(section);

  // Optimize images if any were created (though not expected in this block)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
