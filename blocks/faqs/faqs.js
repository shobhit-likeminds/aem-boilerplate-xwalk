import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('faqs');

  const titleRow = children[0];
  const title = document.createElement('h2');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  section.append(title);

  const container = document.createElement('div');
  container.classList.add('container', 'faq-accordion');

  const accordion = document.createElement('div');
  accordion.classList.add('accordion');
  accordion.id = 'accordionExample';

  const faqItems = children.slice(1); // All subsequent rows are faq-item rows

  faqItems.forEach((row, index) => {
    const [questionCell, answerCell] = [...row.children];

    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item', 'shadow');

    const accordionHeader = document.createElement('h2');
    accordionHeader.classList.add('accordion-header');
    accordionHeader.id = `heading${index + 1}`;

    const accordionButton = document.createElement('button');
    accordionButton.classList.add('accordion-button', 'd-flex', 'align-items-center');
    accordionButton.type = 'button';
    accordionButton.setAttribute('data-bs-toggle', 'collapse');
    accordionButton.setAttribute('data-bs-target', `#collapse${index + 1}`);
    accordionButton.setAttribute('aria-expanded', index === 0 ? 'true' : 'false');
    accordionButton.setAttribute('aria-controls', `collapse${index + 1}`);
    if (index !== 0) {
      accordionButton.classList.add('collapsed');
    }

    // Add SVG icon
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('width', '16');
    svgIcon.setAttribute('height', '16');
    svgIcon.setAttribute('fill', 'currentColor');
    svgIcon.classList.add('bi', 'bi-question-circle');
    svgIcon.setAttribute('viewBox', '0 0 16 16');
    svgIcon.innerHTML = `
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
    `;
    accordionButton.append(svgIcon);

    const questionText = document.createElement('p');
    questionText.classList.add('m-0', 'ms-3');
    questionText.textContent = questionCell.textContent.trim();
    accordionButton.append(questionText);

    accordionHeader.append(accordionButton);

    const accordionCollapse = document.createElement('div');
    accordionCollapse.id = `collapse${index + 1}`;
    accordionCollapse.classList.add('accordion-collapse', 'collapse');
    if (index === 0) {
      accordionCollapse.classList.add('show');
    }
    accordionCollapse.setAttribute('aria-labelledby', `heading${index + 1}`);
    accordionCollapse.setAttribute('data-bs-parent', '#accordionExample');

    const accordionBody = document.createElement('div');
    accordionBody.classList.add('accordion-body');
    accordionBody.innerHTML = answerCell.innerHTML;

    accordionCollapse.append(accordionBody);
    accordionItem.append(accordionHeader, accordionCollapse);
    accordion.append(accordionItem);

    // Add event listener for collapse toggle
    accordionButton.addEventListener('click', () => {
      const isExpanded = accordionButton.getAttribute('aria-expanded') === 'true';
      accordionButton.setAttribute('aria-expanded', !isExpanded);
      accordionButton.classList.toggle('collapsed', isExpanded);
      accordionCollapse.classList.toggle('show');

      // Collapse other open items
      accordion.querySelectorAll('.accordion-collapse.show').forEach((openCollapse) => {
        if (openCollapse !== accordionCollapse) {
          openCollapse.classList.remove('show');
          const openButton = openCollapse.previousElementSibling.querySelector('.accordion-button');
          openButton.classList.add('collapsed');
          openButton.setAttribute('aria-expanded', 'false');
        }
      });
    });

    moveInstrumentation(row, accordionItem);
  });

  container.append(accordion);
  section.append(container);

  block.replaceChildren(section);
}
