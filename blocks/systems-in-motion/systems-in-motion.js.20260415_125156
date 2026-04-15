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

  block.classList.add('systems-in-motion');

  // Dot Right Image
  const dotRightDiv = document.createElement('div');
  dotRightDiv.classList.add('dot-right');
  const dotRightPicture = dotRightImageRow.querySelector('picture');
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
  const dotLeftPicture = dotLeftImageRow.querySelector('picture');
  if (dotLeftPicture) {
    const img = dotLeftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotLeftDiv.append(optimizedPic);
  }
  moveInstrumentation(dotLeftImageRow, dotLeftDiv);
  block.append(dotLeftDiv);

  // Heading and Description
  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  heading.textContent = headingRow.textContent.trim();
  moveInstrumentation(headingRow, heading);
  container.append(heading);

  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  description.innerHTML = descriptionRow.innerHTML;
  moveInstrumentation(descriptionRow, description);
  container.append(description);

  block.append(container);

  // Motion Cards
  if (motionCardRows.length > 0) {
    const motionCardHld = document.createElement('div');
    motionCardHld.classList.add('motion-card-hld');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    motionCardRows.forEach((cardRow, index) => {
      // Use content detection for CTA Link as it's an aem-content type
      const cells = [...cardRow.children];
      const logoCell = cells[0];
      const titleCell = cells[1];
      const textCell = cells[2];
      const ctaLinkCell = cells[3]; // This cell contains the <a> tag for the link
      const ctaLinkLabelCell = cells[4]; // This cell contains the plain text label

      const colDiv = document.createElement('div');
      colDiv.classList.add('col-lg-6');

      const mCardBlurb = document.createElement('div');
      mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      mCardBlurb.style.animationDuration = '1s';
      mCardBlurb.style.animationDelay = `${0.1 + index * 0.1}s`;

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
      contentDiv.append(figure);

      const title = document.createElement('h4');
      title.textContent = titleCell.textContent.trim();
      contentDiv.append(title);

      const text = document.createElement('p');
      text.innerHTML = textCell.innerHTML;
      contentDiv.append(text);

      mCardBlurb.append(contentDiv);

      const ctaLink = ctaLinkCell.querySelector('a'); // Correctly get the <a> tag from the aem-content cell
      if (ctaLink) {
        const anchor = document.createElement('a');
        anchor.href = ctaLink.href; // Read href from the <a> tag
        anchor.textContent = ctaLinkLabelCell.textContent.trim(); // Read label from the separate label cell
        anchor.classList.add('btn-box');
        moveInstrumentation(ctaLinkCell, anchor);
        mCardBlurb.append(anchor);
      }

      moveInstrumentation(cardRow, mCardBlurb);
      colDiv.append(mCardBlurb);
      rowDiv.append(colDiv);
    });
    motionCardHld.append(rowDiv);
    block.append(motionCardHld);
  }
}
