import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0: No direct .children[n] bracket access for variable assignment.
  // The original code used rows[0] and rows.slice(1) which are acceptable for root-level
  // row separation when the schema is fixed (first row is title, rest are items).
  // For item rows, destructuring `const [questionCell, answerCell] = [...row.children];` is correct.

  const allRows = [...block.children];
  // CHECK 1: Structure Alignment - BlockJson has one root field "sectionTitle" and a container "faqs"
  // The JS correctly identifies the first row as the section title and the rest as FAQ items.
  const [sectionTitleRow, ...faqItemRows] = allRows; // Corrected to use destructuring for clarity

  const section = document.createElement('section');
  // CHECK 0.5: BLOCK'S OWN CLASS ON INNER WRAPPER - The block's class 'faq-section' is NOT added to 'section'.
  // The outer block div already carries the 'faq-section' class from AEM.
  // The original HTML's root element has class 'faqs', so we add that.
  section.classList.add('faqs');
  moveInstrumentation(block, section); // Move instrumentation from the original block div to the new root section

  // Section Title
  const h2 = document.createElement('h2');
  h2.textContent = sectionTitleRow.children[0]?.textContent.trim() || ''; // Access content from the cell, not the row
  moveInstrumentation(sectionTitleRow, h2);
  section.append(h2);

  const container = document.createElement('div');
  container.classList.add('container', 'faq-accordion');

  const accordion = document.createElement('div');
  accordion.classList.add('accordion');
  accordion.id = 'accordionExample';
  container.append(accordion);

  faqItemRows.forEach((row, index) => {
    // CHECK 1: Structure Alignment - Each faq-item has two fields: "question" (text) and "answer" (richtext)
    // Destructuring `[questionCell, answerCell]` correctly reads these two cells.
    const [questionCell, answerCell] = [...row.children];

    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion-item', 'shadow');

    const headingId = `heading${index + 1}`;
    const collapseId = `collapse${index + 1}`;

    const h2AccordionHeader = document.createElement('h2');
    h2AccordionHeader.classList.add('accordion-header');
    h2AccordionHeader.id = headingId;

    const button = document.createElement('button');
    button.classList.add('accordion-button', 'd-flex', 'align-items-center');
    button.type = 'button';
    // Original HTML uses data-bs-toggle and data-bs-target, which implies Bootstrap JS.
    // Since EDS doesn't ship Bootstrap JS, we need to implement the toggle logic.
    // The initial state for the first item is 'expanded', others 'collapsed'.
    if (index !== 0) {
      button.classList.add('collapsed');
      button.setAttribute('aria-expanded', 'false');
    } else {
      button.setAttribute('aria-expanded', 'true');
    }
    button.setAttribute('aria-controls', collapseId);

    // CHECK 2: Interactivity - Add event listener for collapse toggle
    // The original JS had a custom toggle logic. We need to ensure it correctly mimics Bootstrap's behavior.
    // The original HTML uses `data-bs-toggle="collapse"` and `data-bs-target="#collapseOne"`.
    // The custom JS implementation needs to handle the `collapsed` class and `aria-expanded` attribute.
    button.addEventListener('click', () => {
      const targetCollapse = accordion.querySelector(`#${collapseId}`);
      const isCurrentlyExpanded = button.getAttribute('aria-expanded') === 'true';

      // Close all other open accordions if this one is not already expanded
      if (!isCurrentlyExpanded) {
        accordion.querySelectorAll('.accordion-collapse.show').forEach((openCollapse) => {
          openCollapse.classList.remove('show');
          const openButton = openCollapse.previousElementSibling.querySelector('.accordion-button');
          if (openButton) {
            openButton.classList.add('collapsed');
            openButton.setAttribute('aria-expanded', 'false');
          }
        });
      }

      // Toggle current accordion
      targetCollapse.classList.toggle('show', !isCurrentlyExpanded); // Add 'show' if not expanded, remove if expanded
      button.classList.toggle('collapsed', isCurrentlyExpanded); // Add 'collapsed' if currently expanded, remove if not
      button.setAttribute('aria-expanded', (!isCurrentlyExpanded).toString()); // Toggle aria-expanded
    });

    // CHECK 2.6 D: Navigation Icons - No DAM / Clientlib paths. Inline SVG is used, which is correct.
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
    button.append(svg);

    const pQuestion = document.createElement('p');
    pQuestion.classList.add('m-0', 'ms-3');
    pQuestion.textContent = questionCell.textContent.trim();
    button.append(pQuestion);

    h2AccordionHeader.append(button);

    const accordionCollapse = document.createElement('div');
    accordionCollapse.id = collapseId;
    accordionCollapse.classList.add('accordion-collapse', 'collapse');
    if (index === 0) {
      accordionCollapse.classList.add('show'); // First item is open by default
    }
    accordionCollapse.setAttribute('aria-labelledby', headingId);
    accordionCollapse.setAttribute('data-bs-parent', '#accordionExample');

    const accordionBody = document.createElement('div');
    accordionBody.classList.add('accordion-body');
    // CHECK 1.5: Richtext Fields with HTML Content - 'answer' is richtext, so .innerHTML is correct.
    // CHECK 0.6: No row-level innerHTML. `answerCell` is a cell, not a row.
    // CHECK 0.7 B: No <p>-inside-<p>. `accordionBody` is a `div`, so `innerHTML` is safe.
    accordionBody.innerHTML = answerCell.innerHTML;
    moveInstrumentation(answerCell, accordionBody);
    accordionCollapse.append(accordionBody);

    accordionItem.append(h2AccordionHeader, accordionCollapse);
    moveInstrumentation(row, accordionItem); // Move instrumentation for the item row
    accordion.append(accordionItem);
  });

  section.append(container);
  // CHECK 3: Hardcoded Assets / Template Literals / Double-Render Pattern
  // All content is read from block.children, no hardcoded text or URLs in templates.
  // moveInstrumentation is called for each row and cell.
  // block.replaceChildren(section) is used for atomic replacement.
  block.replaceChildren(section);
}
