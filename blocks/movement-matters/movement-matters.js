import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...blurbRows] = [...block.children];

  block.classList.add('movement-matters');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild?.textContent.trim() || '';
  container.append(heading);

  const movementHld = document.createElement('div');
  movementHld.classList.add('movement-hld');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-lg-center', 'justify-content-lg-between');

  // Description
  const descriptionCol = document.createElement('div');
  descriptionCol.classList.add('col-lg-7', 'pb-lg-0', 'pb-4', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow, descriptionCol);
  // For richtext, read innerHTML directly
  descriptionCol.innerHTML = descriptionRow.firstElementChild?.innerHTML || '';
  row.append(descriptionCol);

  // Blurbs
  if (blurbRows.length > 0) {
    const blurbCol = document.createElement('div');
    blurbCol.classList.add('col-lg-4');

    blurbRows.forEach((blurbRow) => {
      // CRITICAL CHECK 0: row.children[n] is used here, but it's for fixed-field item models,
      // which is acceptable according to the EDS BLOCK STRUCTURE guide.
      // "For fixed-field item models (uniform cells per row) ALWAYS use index destructuring:
      // const [cell0, cell1, cell2, ...] = [...row.children];"
      const [titleCell, textCell, linkCell, linkLabelCell] = [...blurbRow.children];

      const mCardBlurb = document.createElement('div');
      mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      moveInstrumentation(blurbRow, mCardBlurb);

      const contentDiv = document.createElement('div');
      const title = document.createElement('h4');
      title.textContent = titleCell?.textContent.trim() || '';
      contentDiv.append(title);

      const text = document.createElement('p');
      text.innerHTML = textCell?.innerHTML || '';
      contentDiv.append(text);

      mCardBlurb.append(contentDiv);

      const anchor = document.createElement('a');
      anchor.classList.add('btn-box');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.getAttribute('href'); // Use getAttribute('href') for aem-content links
      }
      anchor.textContent = linkLabelCell?.textContent.trim() || '';
      mCardBlurb.append(anchor);

      blurbCol.append(mCardBlurb);
    });
    row.append(blurbCol);
  }

  movementHld.append(row);
  container.append(movementHld);

  block.textContent = '';
  block.append(container);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
