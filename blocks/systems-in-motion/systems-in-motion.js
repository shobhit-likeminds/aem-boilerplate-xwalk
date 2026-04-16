import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    dotRightImageRow,
    dotLeftImageRow,
    headingRow,
    descriptionRow,
    ...motionCardRows
  ] = [...block.children];

  block.innerHTML = ''; // Clear the block content

  // Dot Right Image
  const dotRightDiv = document.createElement('div');
  dotRightDiv.classList.add('dot-right');
  // The EDS structure indicates the picture is directly in the first child of the row
  const dotRightPicture = dotRightImageRow.children[0].querySelector('picture');
  if (dotRightPicture) {
    const img = dotRightPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotRightDiv.append(optimizedPic);
  }
  moveInstrumentation(dotRightImageRow, dotRightDiv);
  block.append(dotRightDiv);

  // Dot Left Image
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  // The EDS structure indicates the picture is directly in the first child of the row
  const dotLeftPicture = dotLeftImageRow.children[0].querySelector('picture');
  if (dotLeftPicture) {
    const img = dotLeftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotLeftDiv.append(optimizedPic);
  }
  moveInstrumentation(dotLeftImageRow, dotLeftDiv);
  block.append(dotLeftDiv);

  // Heading and Description
  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');

  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  // The EDS structure indicates the text content is directly in the first child of the row
  heading.textContent = headingRow.children[0].textContent.trim();
  moveInstrumentation(headingRow, heading);
  container1600Wrp.append(heading);

  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  // The EDS structure indicates the rich text HTML is directly in the first child of the row
  description.innerHTML = descriptionRow.children[0].innerHTML;
  moveInstrumentation(descriptionRow, description);
  container1600Wrp.append(description);

  block.append(container1600Wrp);

  // Motion Cards
  if (motionCardRows.length > 0) {
    const motionCardHld = document.createElement('div');
    motionCardHld.classList.add('motion-card-hld');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    motionCardRows.forEach((cardRow) => {
      const [logoCell, titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...cardRow.children];

      const colLg6 = document.createElement('div');
      colLg6.classList.add('col-lg-6');

      const mCardBlurb = document.createElement('div');
      mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

      const contentDiv = document.createElement('div');

      const figure = document.createElement('figure');
      const logoPicture = logoCell.querySelector('picture');
      if (logoPicture) {
        const img = logoPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover'); // Add class to the img inside picture
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        figure.append(optimizedPic);
      }
      moveInstrumentation(logoCell, figure);
      contentDiv.append(figure);

      const title = document.createElement('h4');
      title.textContent = titleCell.textContent.trim();
      moveInstrumentation(titleCell, title);
      contentDiv.append(title);

      const text = document.createElement('p');
      text.innerHTML = textCell.innerHTML;
      moveInstrumentation(textCell, text);
      contentDiv.append(text);

      mCardBlurb.append(contentDiv);

      // For type=aem-content, the anchor tag is usually the first child of the cell.
      // The EDS structure shows <div><a href="...">...</a></div>, so ctaLinkCell.children[0] is correct.
      const ctaLink = ctaLinkCell.children[0];
      if (ctaLink && ctaLink.tagName === 'A' && ctaLinkLabelCell.textContent.trim()) {
        const btnBox = document.createElement('a');
        btnBox.classList.add('btn-box');
        btnBox.href = ctaLink.href;
        btnBox.textContent = ctaLinkLabelCell.textContent.trim();
        moveInstrumentation(cardRow, btnBox); // Instrument the whole row to the button if it exists
        mCardBlurb.append(btnBox);
      } else {
        // If no CTA link or label, instrument the row to the mCardBlurb div
        moveInstrumentation(cardRow, mCardBlurb);
      }

      colLg6.append(mCardBlurb);
      rowDiv.append(colLg6);
    });

    motionCardHld.append(rowDiv);
    block.append(motionCardHld);
  }

  block.classList.add('systems-in-motion'); // Add the main block class
}
