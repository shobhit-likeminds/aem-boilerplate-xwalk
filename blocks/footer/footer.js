import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...sectionRows] = [...block.children];

  // Create the main footer wrapper
  const footerWrp = document.createElement('section');
  footerWrp.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  footerWrp.append(container);

  // Logo section
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  moveInstrumentation(logoRow, mobLogoWr);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobLogoWr.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('img-fluid');
    }
  }
  container.append(mobLogoWr);

  // Footer sections (f1 row)
  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');
  container.append(f1Row);

  sectionRows.forEach((row) => {
    // Use content detection instead of index access for row.children
    const cells = [...row.children];
    const titleCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('a')); // Assuming title is plain text
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p') || cell.querySelector('a')); // Assuming section links contain rich text

    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');
    moveInstrumentation(row, col);

    const titleText = titleCell ? titleCell.textContent.trim() : '';
    const sectionLinksContent = sectionLinksCell ? sectionLinksCell.innerHTML.trim() : '';

    // Check if sectionLinks contains a <ul> to determine if it's an accordion or a simple link
    const hasUl = sectionLinksCell && sectionLinksCell.querySelector('ul');

    if (hasUl) {
      // It's an accordion item
      const ttle = document.createElement('a');
      ttle.href = 'javascript:void(0)';
      ttle.classList.add('ttle', 'accordion_head2');
      ttle.textContent = titleText;

      const plusminus = document.createElement('span');
      plusminus.classList.add('plusminus2');
      plusminus.textContent = '+';
      ttle.append(plusminus);

      const ftrSubLinksCvr = document.createElement('div');
      ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');

      // Move the content from sectionLinksCell into ftrSubLinksCvr
      if (sectionLinksCell) {
        while (sectionLinksCell.firstChild) {
          ftrSubLinksCvr.append(sectionLinksCell.firstChild);
        }
      }

      // Add event listener for accordion behavior
      ttle.addEventListener('click', () => {
        ftrSubLinksCvr.classList.toggle('active');
        ttle.classList.toggle('active');
        plusminus.textContent = ftrSubLinksCvr.classList.contains('active') ? '-' : '+';
      });

      col.append(ttle, ftrSubLinksCvr);
    } else {
      // It's a simple link, assume the first <a> in the richtext is the main link
      const link = sectionLinksCell ? sectionLinksCell.querySelector('a') : null;
      if (link) {
        const ttle = document.createElement('a');
        ttle.classList.add('ttle');
        ttle.href = link.href;
        ttle.textContent = titleText; // Use the title field as the link text
        col.append(ttle);
      } else {
        // If no link is found, make it a plain text title
        const p = document.createElement('p');
        p.classList.add('ttle');
        p.textContent = titleText;
        col.append(p);
      }
    }
    f1Row.append(col);
  });

  // The original HTML shows f2 and f3 rows with specific content. Since the EDS model
  // only defines 'logo' and 'sections', we'll assume f2 and f3 are either static
  // content outside the block's scope or would be defined by additional model fields.
  // For this exercise, we'll only generate the content defined by the block's model.

  block.textContent = '';
  block.append(footerWrp);
}
