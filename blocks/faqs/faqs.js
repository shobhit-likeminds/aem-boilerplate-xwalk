import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

// Function to create the SVG icon, avoiding hardcoded template literals
function createQuestionCircleSvg() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('fill', 'currentColor');
  svg.classList.add('bi', 'bi-question-circle');
  svg.setAttribute('viewBox', '0 0 16 16');
  svg.innerHTML = `
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
  `;
  return svg;
}

export default function decorate(block) {
  const children = [...block.children];

  // Use array destructuring for fixed schema root rows
  const [sectionTitleRow, ...faqItemRows] = children;

  const section = document.createElement('section');
  // The block div already has 'faqs' class from AEM. Do not add it again to the inner wrapper.
  // section.classList.add('faqs'); // Removed to prevent double padding/CSS
  moveInstrumentation(block, section);

  // Section Title
  if (sectionTitleRow) {
    const h2 = document.createElement('h2');
    moveInstrumentation(sectionTitleRow, h2);
    h2.textContent = sectionTitleRow.children[0]?.textContent.trim() || ''; // Access content from the cell
    section.append(h2);
  }

  const container = document.createElement('div');
  container.classList.add('container', 'faq-accordion');

  const accordion = document.createElement('div');
  accordion.classList.add('accordion');
  accordion.id = 'accordionExample';

  faqItemRows.forEach((row, index) => {
    const [questionCell, answerCell] = [...row.children]; // Correct: named destructuring

    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item', 'shadow');

    const headingId = `heading${index + 1}`;
    const collapseId = `collapse${index + 1}`;
    const isFirstItem = index === 0;

    const h2 = document.createElement('h2');
    h2.classList.add('accordion-header');
    h2.id = headingId;

    const button = document.createElement('button');
    button.classList.add('accordion-button', 'd-flex', 'align-items-center');
    if (!isFirstItem) {
      button.classList.add('collapsed');
    }
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'collapse'); // Added from ORIGINAL HTML
    button.setAttribute('data-bs-target', `#${collapseId}`); // Added from ORIGINAL HTML
    button.setAttribute('aria-expanded', isFirstItem ? 'true' : 'false');
    button.setAttribute('aria-controls', collapseId);

    // The original HTML uses data-bs-toggle/target for Bootstrap's JS.
    // Since EDS doesn't ship Bootstrap JS, the event listener is a custom implementation.
    // The existing event listener correctly toggles classes and aria attributes.
    // No change needed for the event listener itself, as it's a custom implementation.
    button.addEventListener('click', () => {
      const targetCollapse = document.getElementById(collapseId);
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', !isExpanded);
      button.classList.toggle('collapsed', isExpanded);
      targetCollapse.classList.toggle('show');
    });

    const svg = createQuestionCircleSvg(); // Use the function to create SVG

    const p = document.createElement('p');
    p.classList.add('m-0', 'ms-3');
    p.textContent = questionCell.textContent.trim();

    moveInstrumentation(row, accordionItem); // Move instrumentation from row to accordionItem
    button.append(svg, p);
    h2.append(button);

    const collapseDiv = document.createElement('div');
    collapseDiv.id = collapseId;
    collapseDiv.classList.add('accordion-collapse', 'collapse');
    if (isFirstItem) {
      collapseDiv.classList.add('show');
    }
    collapseDiv.setAttribute('aria-labelledby', headingId);
    collapseDiv.setAttribute('data-bs-parent', '#accordionExample');

    const accordionBody = document.createElement('div');
    accordionBody.classList.add('accordion-body');
    accordionBody.innerHTML = answerCell.innerHTML; // Correct: richtext cell uses innerHTML

    collapseDiv.append(accordionBody);
    accordionItem.append(h2, collapseDiv);
    accordion.append(accordionItem);
  });

  container.append(accordion);
  section.append(container);
  block.replaceChildren(section);
}
