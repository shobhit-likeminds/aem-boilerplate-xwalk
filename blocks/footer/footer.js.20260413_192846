import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerComponent = document.createElement('div');
  footerComponent.classList.add('footer-component');

  const bhartiaxaFooterComponent = document.createElement('div');
  bhartiaxaFooterComponent.classList.add('bhartiaxa-footer-component');

  const bhartifooter = document.createElement('div');
  bhartifooter.classList.add('bhartifooter');

  const footer2Component = document.createElement('div');
  footer2Component.classList.add('footer2-component');

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // Check 0 & 1: Use content detection instead of index access for cells
    // Based on BlockJson and EDS Block Structure:
    // cell[0]: field="title" label="Section Title" type=text
    // cell[1]: field="sectionLinks" label="Section Links" type=richtext (can contain ul or p/a)
    const titleCell = cells.find(cell => cell.textContent.trim() && !cell.querySelector('ul') && !cell.querySelector('a'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p'));

    if (!titleCell || !sectionLinksCell) {
      // Skip rows that don't conform to the expected structure
      return;
    }

    const footerBox = document.createElement('div');
    footerBox.classList.add('footer-box');
    moveInstrumentation(row, footerBox);

    const title = document.createElement('h4');
    title.classList.add('footer-box-title');
    title.textContent = titleCell.textContent.trim();
    footerBox.append(title);

    const sectionLinksList = sectionLinksCell.querySelector('ul');
    if (sectionLinksList) {
      sectionLinksList.classList.add('MuiList-root', 'MuiList-padding', 'footer-box-list', 'mui-1wduhak');
      [...sectionLinksList.children].forEach((li) => {
        li.classList.add('MuiListItem-root', 'MuiListItem-gutters', 'MuiListItem-padding', 'footer-box-list-item', 'mui-146xefr');
        const link = li.querySelector('a');
        if (link) {
          link.classList.add('footer-listitem-link');
        }
      });
      footerBox.append(sectionLinksList);
    } else {
      // If there's no UL, it means the richtext cell contains just text or a single link.
      // We'll create a simple list with one item for consistency or just append the content.
      const p = sectionLinksCell.querySelector('p');
      if (p) {
        const link = p.querySelector('a');
        if (link) {
          const ul = document.createElement('ul');
          ul.classList.add('MuiList-root', 'MuiList-padding', 'footer-box-list', 'mui-1wduhak');
          const li = document.createElement('li');
          li.classList.add('MuiListItem-root', 'MuiListItem-gutters', 'MuiListItem-padding', 'footer-box-list-item', 'mui-146xefr');
          link.classList.add('footer-listitem-link');
          li.append(link);
          ul.append(li);
          footerBox.append(ul);
        } else {
          // If it's just plain text in the richtext cell, append it as a paragraph
          footerBox.append(p);
        }
      }
    }
    footer2Component.append(footerBox);
  });

  bhartifooter.append(footer2Component);
  bhartiaxaFooterComponent.append(bhartifooter);
  footerComponent.append(bhartiaxaFooterComponent);

  block.textContent = '';
  block.append(footerComponent);
}
