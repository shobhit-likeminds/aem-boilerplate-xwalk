import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...faqItemRows] = [...block.children];

  // Heading
  const headingEl = document.createElement('h2');
  headingEl.classList.add('accordion-heading');
  moveInstrumentation(headingRow, headingEl);
  headingEl.textContent = headingRow.firstElementChild.textContent.trim();
  block.textContent = '';
  block.append(headingEl);

  const accordionContainer = document.createElement('div');
  accordionContainer.classList.add('accordion-container');
  const faqList = document.createElement('div');
  faqList.classList.add('faq-list');

  faqItemRows.forEach((row, index) => {
    // Check 0: No row.children[n] violations here, destructuring is used.
    const [questionCell, answerCell] = [...row.children];

    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item', 'block');
    moveInstrumentation(row, faqItem);

    // Hide items beyond the first 3 initially, matching the original HTML's 'hidden' class usage
    if (index >= 3) {
      faqItem.classList.add('hidden');
    }

    const customAccordionFaq = document.createElement('div');
    customAccordionFqa.classList.add('custom-accordian-faq');

    const accordionSection = document.createElement('div');
    accordionSection.classList.add('accordion-section');

    const accordion = document.createElement('div');
    accordion.classList.add('accordion');

    const accordionTitle = document.createElement('h3');
    accordionTitle.classList.add('accordion-title');
    accordionTitle.textContent = questionCell.textContent.trim();

    const accordionIcon = document.createElement('span');
    accordionIcon.classList.add('icon-chevron-down', 'accordion-icon-custom');

    accordion.append(accordionTitle, accordionIcon);

    const accordionContent = document.createElement('div');
    // The original HTML has 'undefined' as a class, which is unusual but must be preserved.
    accordionContent.classList.add('accordion-content', 'undefined');
    moveInstrumentation(answerCell, accordionContent);
    while (answerCell.firstChild) {
      accordionContent.append(answerCell.firstChild);
    }
    accordionContent.style.maxHeight = '0px'; // Initially collapsed

    accordionSection.append(accordion, accordionContent);
    customAccordionFaq.append(accordionSection);
    faqItem.append(customAccordionFaq);
    faqList.append(faqItem);

    accordion.addEventListener('click', () => {
      const isExpanded = accordionIcon.classList.contains('rotate');
      if (isExpanded) {
        accordionIcon.classList.remove('rotate');
        accordionContent.style.maxHeight = '0px';
      } else {
        // Collapse other open accordions
        faqList.querySelectorAll('.accordion-icon-custom.rotate').forEach((icon) => {
          icon.classList.remove('rotate');
          icon.closest('.accordion-section').querySelector('.accordion-content').style.maxHeight = '0px';
        });

        accordionIcon.classList.add('rotate');
        accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
      }
    });
  });

  accordionContainer.append(faqList);

  // Only add the "Read More" button if there are hidden items
  if (faqItemRows.length > 3) {
    const readMoreButton = document.createElement('button');
    readMoreButton.classList.add('accordion-read-btn');
    readMoreButton.innerHTML = 'Read More <span class="icon-arrow-down accordion-read-icon"></span>';

    readMoreButton.addEventListener('click', () => {
      const hiddenItems = faqList.querySelectorAll('.faq-item.hidden');
      hiddenItems.forEach((item) => item.classList.remove('hidden'));
      readMoreButton.remove(); // Remove button after all items are shown
    });
    accordionContainer.append(readMoreButton);
  }

  block.append(accordionContainer);

  // Image optimization (if any images are present in richtext)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
