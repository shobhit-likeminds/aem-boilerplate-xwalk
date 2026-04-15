import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block itself already has 'footer__links-row' from the original HTML,
  // so no need to add it again here.
  // block.classList.add('footer__links-row');

  [...block.children].forEach((row) => {
    // CHECK 0 & 1: Structure Alignment - Using destructuring for fixed-field item model
    // BlockJson indicates each item row (footer-section) has two fields: 'title' (text) and 'sectionLinks' (richtext).
    const [titleCell, sectionLinksCell] = [...row.children];

    const sectionDiv = document.createElement('div');
    // The original HTML uses inline styles for flex layout, which are not handled by JS.
    // However, the structure implies each section is a flex item.
    // The original HTML also has 'flex: 1 1 0%' on these divs.
    // For now, we'll just create the div. CSS should handle the layout.
    moveInstrumentation(row, sectionDiv);

    const title = document.createElement('h6');
    // CHECK 1: Class names - 'footer__column-title' is from ORIGINAL HTML
    title.classList.add('footer__column-title');
    title.textContent = titleCell.textContent.trim();
    sectionDiv.append(title);

    const sectionLinksList = document.createElement('ul');
    // CHECK 1: Class names - 'footer__links-list' is from ORIGINAL HTML
    sectionLinksList.classList.add('footer__links-list');

    // The richtext cell contains the <ul> structure directly or <p> with a link.
    const authoredUl = sectionLinksCell.querySelector('ul');
    if (authoredUl) {
      moveInstrumentation(sectionLinksCell, sectionLinksList);
      // Move all children from the authored <ul> to the new <ul>, wrapping each in <li> with class
      while (authoredUl.firstChild) {
        const li = document.createElement('li');
        // CHECK 1: Class names - 'footer__link' is from ORIGINAL HTML
        li.classList.add('footer__link');
        moveInstrumentation(authoredUl.firstChild, li);
        li.append(authoredUl.firstChild); // This moves the original <li> from authoredUl
        sectionLinksList.append(li);
      }
    } else {
      // If no <ul>, it might be a <p> or just text, handle as single link or text
      const link = sectionLinksCell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        // CHECK 1: Class names - 'footer__link' is from ORIGINAL HTML
        li.classList.add('footer__link');
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        moveInstrumentation(sectionLinksCell, li);
        li.append(anchor);
        sectionLinksList.append(li);
      } else if (sectionLinksCell.textContent.trim()) {
        // This case handles plain text within the richtext cell, which should ideally be a link or part of a list.
        // Given the original HTML, it seems unlikely to have just plain text here without a link or list.
        // However, the current logic handles it by creating a list item with the text.
        const li = document.createElement('li');
        // CHECK 1: Class names - 'footer__link' is from ORIGINAL HTML
        li.classList.add('footer__link');
        moveInstrumentation(sectionLinksCell, li);
        li.textContent = sectionLinksCell.textContent.trim();
        sectionLinksList.append(li);
      }
    }
    sectionDiv.append(sectionLinksList);
    block.append(sectionDiv);
  });

  // CHECK 2: Interactivity - No interactive elements found in ORIGINAL HTML.
  // No addEventListener calls are needed.
}
