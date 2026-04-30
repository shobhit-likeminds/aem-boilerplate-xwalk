import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root rows based on BlockJson model
  const [headlineRow, description1Row, description2Row, ...blurbCardRows] = [...block.children];

  const section = document.createElement('section');
  // section.classList.add('movement-matters'); // Removed: outer block div already has this class

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  section.append(container);

  // Headline
  if (headlineRow) {
    const headline = document.createElement('h2');
    headline.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(headlineRow, headline);
    headline.textContent = headlineRow.querySelector('div').textContent.trim();
    container.append(headline);
  }

  const movementHld = document.createElement('div');
  movementHld.classList.add('movement-hld');
  container.append(movementHld);

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-lg-center', 'justify-content-lg-between');
  movementHld.append(row);

  const colLg7 = document.createElement('div');
  colLg7.classList.add('col-lg-7', 'pb-lg-0', 'pb-4', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  row.append(colLg7);

  // Description 1
  if (description1Row) {
    const p1 = document.createElement('p');
    moveInstrumentation(description1Row, p1);
    p1.innerHTML = description1Row.querySelector('div').innerHTML;
    colLg7.append(p1);
  }

  // Description 2
  if (description2Row) {
    const p2 = document.createElement('p');
    moveInstrumentation(description2Row, p2);
    p2.innerHTML = description2Row.querySelector('div').innerHTML;
    colLg7.append(p2);
  }

  const colLg4 = document.createElement('div');
  colLg4.classList.add('col-lg-4');
  row.append(colLg4);

  // Blurb Cards
  blurbCardRows.forEach((blurbRow) => {
    // Destructure cells for blurb-card based on BlockJson model
    const [blurbHeadlineCell, blurbDescriptionCell, ctaLinkCell, ctaLabelCell] = [...blurbRow.children];

    const mCardBlurb = document.createElement('div');
    mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(blurbRow, mCardBlurb);

    const textContentDiv = document.createElement('div');
    mCardBlurb.append(textContentDiv);

    if (blurbHeadlineCell) {
      const h4 = document.createElement('h4');
      h4.textContent = blurbHeadlineCell.textContent.trim();
      textContentDiv.append(h4);
    }

    if (blurbDescriptionCell) {
      const p = document.createElement('p');
      p.innerHTML = blurbDescriptionCell.innerHTML;
      textContentDiv.append(p);
    }

    if (ctaLinkCell && ctaLabelCell) {
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const btnBox = document.createElement('a');
        btnBox.classList.add('btn-box');
        btnBox.href = ctaLink.href;
        btnBox.textContent = ctaLabelCell.textContent.trim();
        mCardBlurb.append(btnBox);
      }
    }
    colLg4.append(mCardBlurb);
  });

  block.replaceChildren(section);
}
