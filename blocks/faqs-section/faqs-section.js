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

  // Accordion Div
  const accoDiv = document.createElement('div');
  accoDiv.classList.add('acco-div');

  const ul = document.createElement('ul');

  faqItemRows.forEach((row, index) => {
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
      accoContentDiv.classList.add('show'); // First item content is shown by default
    }
    accoContentDiv.innerHTML = answerCell.innerHTML;
    li.append(accoContentDiv);

    h2.addEventListener('click', () => {
      const currentlyActive = ul.querySelector('li.active');
      const currentlyShown = ul.querySelector('.acco-content-div.show');

      if (currentlyActive && currentlyActive !== li) {
        currentlyActive.classList.remove('active');
        currentlyShown.classList.remove('show');
      }

      li.classList.toggle('active');
      accoContentDiv.classList.toggle('show');
    });

    ul.append(li);
  });

  accoDiv.append(ul);
  containerDiv.append(accoDiv);

  block.replaceChildren(containerDiv);

  // Image optimization (if any images were present in richtext)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
