import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...evolutionBlurbRows] = [...block.children];

  block.classList.add('hm-eng-for-evol');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  container.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow.firstElementChild, description);
  description.innerHTML = descriptionRow.firstElementChild.innerHTML;
  container.append(description);

  // Evolution Blurbs
  const evolutionBlurbHld = document.createElement('div');
  evolutionBlurbHld.classList.add('evolution-blurb-hld');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  evolutionBlurbRows.forEach((blurbRow) => {
    // CHECK 0: NO row.children[n] usage. Destructuring is fine for fixed-field models.
    const [imageCell, titleCell, textCell, linkCell, linkLabelCell] = [...blurbRow.children];

    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');

    const evolutionBlurb = document.createElement('div');
    evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(blurbRow, evolutionBlurb);

    const blurb = document.createElement('div');
    blurb.classList.add('blurb');

    const blurbContent = document.createElement('div');

    // Image
    const figure = document.createElement('figure');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover');
        figure.append(optimizedPic);
      }
    }
    blurbContent.append(figure);

    const blurbDet = document.createElement('div');
    blurbDet.classList.add('blurb-det');

    // Title
    const title = document.createElement('h4');
    title.textContent = titleCell.textContent.trim();
    blurbDet.append(title);

    // Text
    const text = document.createElement('p');
    text.innerHTML = textCell.innerHTML;
    blurbDet.append(text);

    blurbContent.append(blurbDet);
    blurb.append(blurbContent);

    // Link
    const anchor = document.createElement('a');
    anchor.classList.add('btn-box');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      // Check if the original link had target="_blank"
      if (foundLink.target) {
        anchor.target = foundLink.target;
      }
    }
    anchor.textContent = linkLabelCell.textContent.trim(); // Link Label is from linkLabelCell
    blurb.append(anchor);

    evolutionBlurb.append(blurb);
    colLg4.append(evolutionBlurb);
    rowDiv.append(colLg4);
  });

  evolutionBlurbHld.append(rowDiv);
  container.append(evolutionBlurbHld);

  block.textContent = '';
  block.append(container);
}
