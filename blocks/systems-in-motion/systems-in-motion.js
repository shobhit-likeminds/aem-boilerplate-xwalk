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

  block.textContent = '';
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

  // Container for Heading and Description
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild?.textContent.trim() || '';
  containerWrapper.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow, description);
  // Append all children from the description cell (which might include <br> tags)
  while (descriptionRow.firstElementChild?.firstChild) {
    description.append(descriptionRow.firstElementChild.firstChild);
  }
  containerWrapper.append(description);

  block.append(containerWrapper);

  // Motion Cards Holder
  const motionCardHld = document.createElement('div');
  motionCardHld.classList.add('motion-card-hld');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  motionCardRows.forEach((row, index) => {
    // Destructure cells for clarity and to avoid direct index access
    const cells = [...row.children];
    const logoCell = cells[0];
    const titleCell = cells[1];
    const textCell = cells[2];
    const ctaLinkCell = cells[3];
    const ctaLinkLabelCell = cells[4]; // This cell contains the text for the button

    const colDiv = document.createElement('div');
    colDiv.classList.add('col-lg-6');

    const mCardBlurb = document.createElement('div');
    mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    mCardBlurb.style.animationDelay = `${0.1 + index * 0.1}s`; // Add delay based on index

    const contentDiv = document.createElement('div');

    // Logo
    const figure = document.createElement('figure');
    const logoPicture = logoCell.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }
    moveInstrumentation(logoCell, figure);
    contentDiv.append(figure);

    // Title
    const title = document.createElement('h4');
    moveInstrumentation(titleCell, title);
    title.textContent = titleCell.textContent.trim();
    contentDiv.append(title);

    // Text
    const text = document.createElement('p');
    moveInstrumentation(textCell, text);
    text.textContent = textCell.textContent.trim();
    contentDiv.append(text);

    mCardBlurb.append(contentDiv);

    // CTA Link
    const ctaLink = ctaLinkCell.querySelector('a');
    if (ctaLink) {
      const btnBox = document.createElement('a');
      btnBox.classList.add('btn-box');
      btnBox.href = ctaLink.href;
      // Use the CTA Label cell's text content for the button text
      btnBox.textContent = ctaLinkLabelCell.textContent.trim();
      moveInstrumentation(ctaLinkCell, btnBox);
      mCardBlurb.append(btnBox);
    }

    moveInstrumentation(row, mCardBlurb);
    colDiv.append(mCardBlurb);
    rowDiv.append(colDiv);
  });

  motionCardHld.append(rowDiv);
  block.append(motionCardHld);

  // Image optimization for all pictures within the block
  // This part is redundant as images are already optimized during creation or have specific widths.
  // Removing this to prevent re-optimizing or overriding specific widths.
  // block.querySelectorAll('picture > img').forEach((img) => {
  //   const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  //   moveInstrumentation(img, optimizedPic.querySelector('img'));
  //   img.closest('picture').replaceWith(optimizedPic);
  // });
}
